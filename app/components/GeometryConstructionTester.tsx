  'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import JXG from 'jsxgraph'
import { Save, Trash2, Circle, Pencil, RotateCcw, Eraser, Ruler, Triangle, Gauge, ZoomIn, ZoomOut } from 'lucide-react'
import DraggableRuler from './DraggableRuler'
import DraggableTriangle from './DraggableTriangle'
import DraggableProtractor from './DraggableProtractor'

type JBoard = JXG.Board & { renderer: any }

const EPS = 0.03

function dist(a: {x:number,y:number}, b:{x:number,y:number}) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

function coordsOfPoint(p: any) { return { x: p.X(), y: p.Y() } }

function pointOnLineXY(p:{x:number,y:number}, line:any, eps=EPS){
  const P = coordsOfPoint(line.point1)
  const Q = coordsOfPoint(line.point2)
  const A = Q.y - P.y, B = P.x - Q.x, C = -(A*P.x + B*P.y)
  return Math.abs(A*p.x + B*p.y + C) / Math.hypot(A,B) < eps
}

function hasEndpoints(seg:any, [P,Q]:any[], eps=EPS){
  const pts = [coordsOfPoint(seg.point1), coordsOfPoint(seg.point2)]
  const d = (u:any,v:any)=>dist(u,v)
  return (d(pts[0],coordsOfPoint(P))<eps && d(pts[1],coordsOfPoint(Q))<eps) ||
         (d(pts[1],coordsOfPoint(P))<eps && d(pts[0],coordsOfPoint(Q))<eps)
}

export default function GeometryConstructionTester() {
  const boardRef = useRef<JBoard | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [tool, setTool] = useState<'mouse'|'point'|'segment'|'line'|'circle'|'rubber'>('mouse')
  const [selected, setSelected] = useState<any[]>([])
  const [feedback, setFeedback] = useState('')
  const [data, setData] = useState<any>(null)
  const [createdStack, setCreatedStack] = useState<string[]>([])
  
  // Physical tools state
  const [rulerVisible, setRulerVisible] = useState(false)
  const [triangleVisible, setTriangleVisible] = useState(false)
  const [protractorVisible, setProtractorVisible] = useState(false)
  const [rulerPosition, setRulerPosition] = useState({ x: 5, y: 4, rotation: 0, length: 6 })
  const [trianglePosition, setTrianglePosition] = useState({ x: 7, y: 4, rotation: 0, size: 3 })
  const [protractorPosition, setProtractorPosition] = useState({ x: 6, y: 3, rotation: 0, size: 3 })
  const [activeTool, setActiveTool] = useState<'ruler' | 'triangle' | 'protractor' | null>(null)
  const [uiBusy, setUiBusy] = useState(false)

  const toolRef = useRef(tool)
  const selectedRef = useRef(selected)
  const uiBusyRef = useRef(uiBusy)
  const handleClickRef = useRef<((brd: JBoard, e: any) => void) | null>(null)
  
  useEffect(() => { toolRef.current = tool }, [tool])
  useEffect(() => { selectedRef.current = selected }, [selected])
  useEffect(() => { uiBusyRef.current = uiBusy }, [uiBusy])

  const givensRef = useRef<{ q:any, S:any, C:any } | null>(null)

  function pushCreated(obj: any) {
    if (obj?.id) setCreatedStack(s => [...s, obj.id])
  }

  function getMouseCoords(brd: JBoard, e: any): {x: number, y: number} {
    const coords = brd.getUsrCoordsOfMouse(e)
    return { x: coords[0], y: coords[1] }
  }

  function nearestFreePoint(brd: JBoard, e: any) {
    const under = brd.getAllObjectsUnderMouse(e)
    const pt = under.find((o:any) => o.elType === 'point' && !o.visProp.fixed)
    return pt || null
  }

  const createPointSmart = useCallback((brd: JBoard, xy: {x:number, y:number}) => {
    const { q } = givensRef.current!
    
    if (pointOnLineXY(xy, q, 0.15)) {
      const existingNames = Object.values(brd.objects)
        .filter((o:any) => o.elType === 'point')
        .map((o:any) => o.name)
      const name = !existingNames.includes('A') ? 'A' : (!existingNames.includes('B') ? 'B' : '')
      
      const glider = brd.create('glider', [xy.x, xy.y, q], {
        name, size: 3, strokeColor: '#e11d48', fillColor: '#e11d48',
        label: { offset: [5, 10] }
      })
      pushCreated(glider)
      return glider
    }
    
    const pt = brd.create('point', [xy.x, xy.y], {
      name: '', size: 2, strokeColor: '#444', fillColor: '#666'
    })
    pushCreated(pt)
    return pt
  }, [])

  const handleClick = useCallback((brd: JBoard, e: any) => {
    if (uiBusyRef.current) return
    
    // Check if the click is on a physical tool - if so, don't handle it
    const target = e.originalEvent?.target as HTMLElement
    if (target && (target.closest('.group') || target.classList.contains('group'))) {
      return // Let the physical tool handle the interaction
    }
    
    const xy = getMouseCoords(brd, e)
    const currentTool = toolRef.current

    switch (currentTool) {
      case 'mouse': {
        // Mouse tool - do nothing, just allow interaction without creating objects
        setFeedback('')
        break
      }
      case 'point': {
        createPointSmart(brd, xy)
        setFeedback('Bod vytvořen')
        break
      }
      case 'segment': {
        let p = nearestFreePoint(brd, e)
        if (!p) p = createPointSmart(brd, xy)

        setSelected(prev => {
          const arr = [...prev, p]
          if (arr.length === 1) {
            setFeedback('Klikněte na druhý bod')
          } else if (arr.length === 2) {
            const seg = brd.create('segment', [arr[0], arr[1]], {
              strokeColor: '#2563eb', strokeWidth: 2
            })
            pushCreated(seg)
            setFeedback('Úsečka vytvořena')
            return []
          }
          return arr
        })
        break
      }
      case 'line': {
        let p = nearestFreePoint(brd, e)
        if (!p) p = createPointSmart(brd, xy)

        setSelected(prev => {
          const arr = [...prev, p]
          if (arr.length === 1) {
            setFeedback('Klikněte na druhý bod')
          } else if (arr.length === 2) {
            const line = brd.create('line', [arr[0], arr[1]], {
              strokeColor: '#059669', strokeWidth: 1, dash: 1
            })
            pushCreated(line)
            setFeedback('Přímka vytvořena')
            return []
          }
          return arr
        })
        break
      }
      case 'circle': {
        let p = nearestFreePoint(brd, e)
        if (!p) p = createPointSmart(brd, xy)

        setSelected(prev => {
          const arr = [...prev, p]
          if (arr.length === 1) {
            setFeedback('Klikněte na bod na kružnici')
          } else if (arr.length === 2) {
            const circ = brd.create('circle', [arr[0], arr[1]], {
              strokeColor: '#dc2626', strokeWidth: 2
            })
            pushCreated(circ)
            setFeedback('Kružnice vytvořena')
            return []
          }
          return arr
        })
        break
      }
      case 'rubber': {
        const under = brd.getAllObjectsUnderMouse(e)
        const toRemove = under.find((o:any) => !o.visProp?.fixed && o.name !== 'S' && o.name !== 'C')
        if (toRemove) {
          brd.removeObject(toRemove as JXG.GeometryElement)
          setFeedback('Objekt smazán')
        }
        break
      }
    }
  }, [createPointSmart])

  useEffect(() => { handleClickRef.current = handleClick }, [handleClick])

  // Handle ruler position changes
  const handleRulerPositionChange = (x: number, y: number, rotation: number, length: number) => {
    setRulerPosition({ x, y, rotation, length })
  }

  // Handle triangle position changes
  const handleTrianglePositionChange = (x: number, y: number, rotation: number, size: number) => {
    setTrianglePosition({ x, y, rotation, size })
  }

  // Handle protractor position changes
  const handleProtractorPositionChange = (x: number, y: number, rotation: number, size: number) => {
    setProtractorPosition({ x, y, rotation, size })
  }

  function toggleRuler() {
    setRulerVisible(!rulerVisible)
    if (!rulerVisible) {
      setActiveTool('ruler')
    } else if (activeTool === 'ruler') {
      setActiveTool(null)
    }
  }

  function toggleTriangle() {
    setTriangleVisible(!triangleVisible)
    if (!triangleVisible) {
      setActiveTool('triangle')
    } else if (activeTool === 'triangle') {
      setActiveTool(null)
    }
  }

  function toggleProtractor() {
    setProtractorVisible(!protractorVisible)
    if (!protractorVisible) {
      setActiveTool('protractor')
    } else if (activeTool === 'protractor') {
      setActiveTool(null)
    }
  }

  useEffect(() => {
    if (!containerRef.current) return

    const brd = JXG.JSXGraph.initBoard(containerRef.current, {
      boundingbox: [-1, 8, 11, -1], 
      axis: false,
      showNavigation: false, 
      showCopyright: false,
      grid: true,
      pan: { enabled: false },
      zoom: false,
      keepaspectratio: true
    }) as JBoard
    
    boardRef.current = brd

    // Givens
    const q = brd.create('line', [[0, 7], [10, 7]], {
      strokeColor: '#000', strokeWidth: 2,
      name: 'q', withLabel: true, fixed: true,
      label: { position: 'rt', offset: [10, 0] }
    })
    const S = brd.create('point', [5, 5], {
      name: 'S', size: 3, strokeColor: '#000', fillColor: '#000', fixed: true, 
      label: { offset: [5, 10] }
    })
    const C = brd.create('point', [4.5, 3], {
      name: 'C', size: 3, strokeColor: '#000', fillColor: '#000', fixed: true, 
      label: { offset: [5, -15] }
    })
    
    givensRef.current = { q, S, C }

    const downHandler = (e: any) => {
      if (handleClickRef.current) {
        handleClickRef.current(brd, e)
      }
    }

    brd.on('down', downHandler)

    return () => {
      try { 
        JXG.JSXGraph.freeBoard(brd) 
      } catch {}
      boardRef.current = null
      givensRef.current = null
    }
  }, []) // Only initialize once

  function undoLast() {
    const brd = boardRef.current
    if (!brd || createdStack.length === 0) return
    const lastId = createdStack[createdStack.length - 1]
    const obj = lastId ? brd.objects[lastId] : undefined
    if (obj) brd.removeObject(obj as JXG.GeometryElement)
    setCreatedStack(s => s.slice(0, -1))
    setFeedback('')
  }

  function clearAll() {
    const brd = boardRef.current
    if (!brd) return
    const toRemove: any[] = []
    for (const key in brd.objects) {
      const o: any = brd.objects[key]
      if (!o?.visProp?.fixed && o.name !== 'S' && o.name !== 'C' && o.name !== 'q') {
        toRemove.push(o)
      }
    }
    toRemove.forEach(o => brd.removeObject(o))
    setSelected([])
    setFeedback('')
    setData(null)
    setCreatedStack([])
  }

  function validateNow() {
    const brd = boardRef.current!
    const { q, S, C } = givensRef.current!

    const pts = Object.values(brd.objects).filter((o:any) => o.elType === 'point') as any[]
    const A = pts.find(p => p.name === 'A')
    const B = pts.find(p => p.name === 'B')
    if (!A || !B) {
      return { 
        passed:false, 
        message:'Označte vrcholy A a B.', 
        score:0 
      }
    }

    const AonQ = pointOnLineXY(coordsOfPoint(A), q, EPS)
    const BonQ = pointOnLineXY(coordsOfPoint(B), q, EPS)
    if (!(AonQ && BonQ)) {
      return { passed:false, message:'A i B musí ležet na přímce q.', score:1 }
    }

    const AC = dist(coordsOfPoint(A), coordsOfPoint(C))
    const BC = dist(coordsOfPoint(B), coordsOfPoint(C))
    const isIso = Math.abs(AC - BC) < EPS
    
    const SA = dist(coordsOfPoint(S), coordsOfPoint(A))
    const SB = dist(coordsOfPoint(S), coordsOfPoint(B))
    const SC = dist(coordsOfPoint(S), coordsOfPoint(C))
    const midOnAC = Math.abs(SA - SC) < EPS
    const midOnBC = Math.abs(SB - SC) < EPS

    if (!(isIso && (midOnAC || midOnBC))) {
      return { 
        passed:false, 
        message:'Zkontrolujte: AC = BC a S je střed ramene.', 
        score:2 
      }
    }

    const segs = Object.values(brd.objects).filter((o:any) => o.elType === 'segment')
    const hasAB = segs.some(s => hasEndpoints(s, [A, B]))
    const hasAC = segs.some(s => hasEndpoints(s, [A, C]))
    const hasBC = segs.some(s => hasEndpoints(s, [B, C]))
    
    if (!(hasAB && hasAC && hasBC)) {
      return { 
        passed:true, 
        message:'Správně, ale chybí narýsované strany.', 
        score:3 
      }
    }
    
    return { passed:true, message:'✅ Výborně! Podmínky splněny.', score:3 }
  }

  function saveConstruction() {
    if (!boardRef.current) return
    const validation = validateNow()
    setData({ validation, timestamp: new Date().toISOString() })
    setFeedback(validation.message)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Úloha 9: Konstrukce trojúhelníku
          </h1>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <p className="text-gray-700">
              Sestrojte rovnoramenný trojúhelník ABC. Bod C je vrchol, S je střed ramene, AB leží na přímce q.
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap gap-2 mb-4 p-4 bg-gray-100 rounded-lg">
            <button 
              onClick={() => setTool('mouse')}
              className={`px-3 py-2 rounded flex items-center gap-2 ${
                tool === 'mouse' ? 'bg-gray-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
                <path d="M13 13l6 6"/>
              </svg>
              Myš
            </button>
            <button 
              onClick={() => setTool('point')}
              className={`px-3 py-2 rounded flex items-center gap-2 ${
                tool === 'point' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Circle size={18}/> Bod
            </button>
            <button 
              onClick={() => setTool('segment')}
              className={`px-3 py-2 rounded flex items-center gap-2 ${
                tool === 'segment' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Pencil size={18}/> Úsečka
            </button>
            <button 
              onClick={() => setTool('line')}
              className={`px-3 py-2 rounded flex items-center gap-2 ${
                tool === 'line' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Pencil size={18}/> Přímka
            </button>
            <button 
              onClick={() => setTool('circle')}
              className={`px-3 py-2 rounded flex items-center gap-2 ${
                tool === 'circle' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Circle size={18}/> Kružnice
            </button>
            <button 
              onClick={() => setTool('rubber')}
              className={`px-3 py-2 rounded flex items-center gap-2 ${
                tool === 'rubber' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Eraser size={18}/> Guma
            </button>
            
            <div className="border-l-2 border-gray-300 mx-2"></div>
            
            <button 
              onClick={toggleRuler}
              className={`px-3 py-2 rounded flex items-center gap-2 ${
                rulerVisible ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Ruler size={18}/> Pravítko
            </button>
            <button 
              onClick={toggleTriangle}
              className={`px-3 py-2 rounded flex items-center gap-2 ${
                triangleVisible ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Triangle size={18}/> Trojúhelník
            </button>
            <button 
              onClick={toggleProtractor}
              className={`px-3 py-2 rounded flex items-center gap-2 ${
                protractorVisible ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Gauge size={18}/> Úhloměr
            </button>

            <div className="flex-1"></div>

            <button onClick={undoLast} className="px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 flex items-center gap-2">
              <RotateCcw size={18}/> Zpět
            </button>
            <button onClick={clearAll} className="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 flex items-center gap-2">
              <Trash2 size={18}/> Vymazat
            </button>
            <button onClick={saveConstruction} className="px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700 flex items-center gap-2">
              <Save size={18}/> Uložit
            </button>
          </div>

          <div 
            ref={containerRef} 
            id="jxgbox" 
            className="w-full border-2 border-gray-300 rounded-lg bg-white jxgbox relative" 
            style={{ height: 500, touchAction: 'none' }} 
          >
            {/* Draggable Ruler */}
            {rulerVisible && (
              <DraggableRuler
                x={rulerPosition.x}
                y={rulerPosition.y}
                rotation={rulerPosition.rotation}
                length={rulerPosition.length}
                onPositionChange={handleRulerPositionChange}
                isActive={activeTool === 'ruler'}
                onActivate={() => setActiveTool('ruler')}
                onUiBusyChange={setUiBusy}
              />
            )}
            
            {/* Draggable Triangle */}
            {triangleVisible && (
              <DraggableTriangle
                x={trianglePosition.x}
                y={trianglePosition.y}
                rotation={trianglePosition.rotation}
                size={trianglePosition.size}
                type="45-45-90"
                onPositionChange={handleTrianglePositionChange}
                isActive={activeTool === 'triangle'}
                onActivate={() => setActiveTool('triangle')}
                onUiBusyChange={setUiBusy}
              />
            )}
            
            {/* Draggable Protractor */}
            {protractorVisible && (
              <DraggableProtractor
                x={protractorPosition.x}
                y={protractorPosition.y}
                rotation={protractorPosition.rotation}
                size={protractorPosition.size}
                onPositionChange={handleProtractorPositionChange}
                isActive={activeTool === 'protractor'}
                onActivate={() => setActiveTool('protractor')}
                onUiBusyChange={setUiBusy}
              />
            )}
          </div>

          <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <p className="text-blue-700 text-sm">
              <strong>Nápověda:</strong> Modrý bod = přesun • Zelený bod = otočení • Oranžový bod = změna velikosti
            </p>
          </div>

          {feedback && (
            <div className={`mt-4 p-4 rounded-lg ${
              feedback.includes('✅') ? 'bg-green-50 border-l-4 border-green-500' : 'bg-yellow-50 border-l-4 border-yellow-500'
            }`}>
              <p className="text-gray-800">{feedback}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}