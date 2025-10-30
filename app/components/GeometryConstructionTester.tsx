  'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import JXG from 'jsxgraph'
import { Save, Trash2, Circle, Pencil, RotateCcw, Eraser, Ruler, Triangle, Gauge, ZoomIn, ZoomOut } from 'lucide-react'
import { UndoRedoManager } from '../../lib/undo-redo'
import { GridMode } from '../../lib/grid-manager'
import { BoardManager, JBoard } from '../../lib/board-manager'
import { GeometryFactory } from '../../lib/geometry-factory'
import { SelectionManager } from '../../lib/selection-manager'
import { RenameManager } from '../../lib/rename-manager'
import DraggableRuler from './DraggableRuler'
import DraggableTriangle from './DraggableTriangle'
import DraggableProtractor from './DraggableProtractor'

type JBoardLocal = JXG.Board & { renderer: any }

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
  const boardManagerRef = useRef<BoardManager | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const undoRedoRef = useRef<UndoRedoManager | null>(null)
  const geometryFactoryRef = useRef<GeometryFactory | null>(null)
  const selectionManagerRef = useRef<SelectionManager | null>(null)
  const renameMgrRef = useRef<RenameManager | null>(null)

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
  
  // Point naming state
  const [renameMode, setRenameMode] = useState(false)
  const [selectedPointId, setSelectedPointId] = useState<string|null>(null)

  const [gridOption, setGridOption] = useState<GridMode>('major')
  const [canUndoState, setCanUndoState] = useState(false)
  const [canRedoState, setCanRedoState] = useState(false)

  const toolRef = useRef(tool)
  const selectedRef = useRef(selected)
  const uiBusyRef = useRef(uiBusy)
  const renameModeRef = useRef(renameMode)
  const handleClickRef = useRef<((brd: JBoard, e: any) => void) | null>(null)
  
  // Rename mode refs for down+up approach
  const renameArmRef = useRef<{ pt:any|null, wasFixed:boolean }>(
    { pt:null, wasFixed:false }
  )
  const downPosRef = useRef<{x:number,y:number}|null>(null)
  
  useEffect(() => { toolRef.current = tool }, [tool])
  useEffect(() => { selectedRef.current = selected }, [selected])
  useEffect(() => { uiBusyRef.current = uiBusy }, [uiBusy])
  useEffect(() => { renameModeRef.current = renameMode }, [renameMode])

  const givensRef = useRef<{ q:any, S:any, C:any } | null>(null)

  function pushCreated(obj: any) {
    if (obj?.id) setCreatedStack(s => [...s, obj.id])
  }

  function getMouseCoords(brd: JBoard, e: any): {x: number, y: number} {
    const coords = brd.getUsrCoordsOfMouse(e)
    return { x: coords[0], y: coords[1] }
  }

  // "A_12" -> "A₁₂"
  function toSubscript(name: string) {
    const map: Record<string,string> = { '0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉' }
    return name.replace(/_(\d+)/g, (_, d) => d.split('').map((ch: string) => map[ch] ?? ch).join(''))
  }

  // normalize and set the visible + raw name on a JSXGraph point
  const renamePoint = useCallback((pt:any, newName:string) => {
    const trimmed = (newName || '').trim()
    const pretty = toSubscript(trimmed)                 // converts A_1 -> A₁
    pt.setAttribute({ name: pretty, withLabel: !!trimmed })
    ;(pt as any)._rawName = trimmed                      // keep searchable original
    // Removed pt.board.update() to prevent point attachment issues
  }, [])

  // find a point under event (prefers non-fixed)
  function pointUnder(brd:JBoard, e:any) {
    const under = brd.getAllObjectsUnderMouse(e)
    return under.find((o:any)=>o.elType==='point') || null
  }

  function isNameTaken(brd:JBoard, raw:string, exceptId?:string) {
    for (const k in brd.objects) {
      const o:any = (brd.objects as any)[k]
      if (o.elType === 'point' && o.id !== exceptId) {
        if ((o._rawName ?? '') === raw) return true
      }
    }
    return false
  }

  function nearestFreePoint(brd: JBoard, e: any) {
    const under = brd.getAllObjectsUnderMouse(e)
    const pt = under.find((o:any) => o.elType === 'point' && !o.visProp.fixed)
    return pt || null
  }

  const createPointSmart = useCallback((brd: JBoard, xy: {x:number, y:number}) => {
    const factory = geometryFactoryRef.current
    if (!factory) return null
    const { q } = givensRef.current!

    // If near given line q, create a glider via undo/redo
    if (pointOnLineXY(xy, q, 0.15)) {
      const glider = brd.create('glider', [xy.x, xy.y, q], {
        name: '', size: 3, strokeColor: '#e11d48', fillColor: '#e11d48', label: { offset: [5, 10] }
      })
      ;(glider as any)._rawName = ''
      pushCreated(glider)
      return glider
    }

    // Otherwise create normal point (always without snap)
    const pt = factory.pointWithGrid(xy.x, xy.y, 'none')
    pushCreated(pt)
    return pt
  }, [])

  const handleClick = useCallback((brd: JBoard, e: any) => {
    if (uiBusyRef.current) return
    
    // Prevent tools from firing while in rename mode
    if (renameModeRef.current) return
    
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
        // Check if clicking on a point and prevent default behavior
        const under = brd.getAllObjectsUnderMouse(e)
        const clickedPoint = under.find((o:any) => o.elType === 'point' && !o.visProp.fixed)
        if (clickedPoint) {
          // Prevent default JSXGraph behavior for points when using mouse tool
          if (e.originalEvent) {
            e.originalEvent.preventDefault()
            e.originalEvent.stopPropagation()
          }
          setFeedback('Bod vybrán')
        } else {
          setFeedback('')
        }
        break
      }
      case 'point': {
        const p = createPointSmart(brd, xy)
        if (p) setFeedback('Bod vytvořen')
        break
      }
      case 'segment': {
        const selectionMgr = selectionManagerRef.current
        if (!selectionMgr) break
        const first = selectionMgr.getFirst()
        if (!first) {
          undoRedoRef.current?.begin()
          const p = createPointSmart(brd, xy)
          if (!p) { undoRedoRef.current?.commit(); break }
          selectionMgr.select(p)
          setFeedback('Klikněte na druhý bod')
          break
        }
        const a:any = first
        const b = createPointSmart(brd, xy)
        if (!b) { undoRedoRef.current?.commit(); selectionMgr.clear(); break }
        const p1 = { x: a.X(), y: a.Y() }
        const p2 = { x: (b as any).X(), y: (b as any).Y() }
        const attr = { strokeColor:'#2563eb', strokeWidth:2 }
        const op = undoRedoRef.current?.createSegmentOperation(p1, p2, attr)
        if (op) {
          op.pointIds = [a.id, (b as any).id]
          undoRedoRef.current?.pushOperation(op)
        }
        undoRedoRef.current?.commit()
        updateUndoRedoState()
        selectionMgr.clear()
        setFeedback('Úsečka vytvořena')
        break
      }
      case 'line': {
        const selectionMgr = selectionManagerRef.current
        if (!selectionMgr) break
        const first = selectionMgr.getFirst()
        if (!first) {
          undoRedoRef.current?.begin()
          const p = createPointSmart(brd, xy)
          if (!p) { undoRedoRef.current?.commit(); break }
          selectionMgr.select(p)
          setFeedback('Klikněte na druhý bod')
          break
        }
        const a:any = first
        const b = createPointSmart(brd, xy)
        if (!b) { undoRedoRef.current?.commit(); selectionMgr.clear(); break }
        const p1 = { x: a.X(), y: a.Y() }
        const p2 = { x: (b as any).X(), y: (b as any).Y() }
        const attr = { strokeColor:'#059669', strokeWidth:1, dash:1 }
        const op = undoRedoRef.current?.createLineOperation(p1, p2, attr)
        if (op) {
          op.pointIds = [a.id, (b as any).id]
          undoRedoRef.current?.pushOperation(op)
        }
        undoRedoRef.current?.commit()
        updateUndoRedoState()
        selectionMgr.clear()
        setFeedback('Přímka vytvořena')
        break
      }
      case 'circle': {
        const selectionMgr = selectionManagerRef.current
        if (!selectionMgr) break
        const first = selectionMgr.getFirst()
        if (!first) {
          undoRedoRef.current?.begin()
          const c = createPointSmart(brd, xy)
          if (!c) { undoRedoRef.current?.commit(); break }
          selectionMgr.select(c)
          setFeedback('Klikněte na bod na kružnici')
          break
        }
        const c:any = first
        const p = createPointSmart(brd, xy)
        if (!p) { undoRedoRef.current?.commit(); selectionMgr.clear(); break }
        const center = { x: c.X(), y: c.Y() }
        const on = { x: (p as any).X(), y: (p as any).Y() }
        const attr = { strokeColor:'#dc2626', strokeWidth:2 }
        const op = undoRedoRef.current?.createCircleOperation(center, on, attr)
        if (op) {
          op.pointIds = [c.id, (p as any).id]
          undoRedoRef.current?.pushOperation(op)
        }
        undoRedoRef.current?.commit()
        updateUndoRedoState()
        selectionMgr.clear()
        setFeedback('Kružnice vytvořena')
        break
      }
      case 'rubber': {
        const under = brd.getAllObjectsUnderMouse(e)
        const toRemove = under.find((o:any) => !o.visProp?.fixed && o.name !== 'S' && o.name !== 'C')
        if (toRemove) {
          const delOp = undoRedoRef.current?.createDeleteOperation(toRemove)
          if (delOp) {
            undoRedoRef.current?.pushOperation(delOp)
            updateUndoRedoState()
            setFeedback('Objekt smazán')
          } else {
            brd.removeObject(toRemove as JXG.GeometryElement)
            setFeedback('Objekt smazán (bez historie)')
          }
        }
        break
      }
    }
  }, [createPointSmart])

  useEffect(() => { handleClickRef.current = handleClick }, [handleClick])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.key === 'n' || e.key === 'N') && !uiBusyRef.current) {
        setRenameMode(v => !v)
      }
      if ((e.key === 'z' || e.key === 'Z') && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
        e.preventDefault()
        undoRedoRef.current?.undo()
        updateUndoRedoState()
      }
      if ((e.key === 'z' || e.key === 'Z') && (e.ctrlKey || e.metaKey) && e.shiftKey) {
        e.preventDefault()
        undoRedoRef.current?.redo()
        updateUndoRedoState()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

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
      setTool('mouse') // Automatically switch to mouse mode when activating ruler
    } else if (activeTool === 'ruler') {
      setActiveTool(null)
    }
  }

  function toggleTriangle() {
    setTriangleVisible(!triangleVisible)
    if (!triangleVisible) {
      setActiveTool('triangle')
      setTool('mouse') // Automatically switch to mouse mode when activating triangle
    } else if (activeTool === 'triangle') {
      setActiveTool(null)
    }
  }

  function toggleProtractor() {
    setProtractorVisible(!protractorVisible)
    if (!protractorVisible) {
      setActiveTool('protractor')
      setTool('mouse') // Automatically switch to mouse mode when activating protractor
    } else if (activeTool === 'protractor') {
      setActiveTool(null)
    }
  }

  useEffect(() => {
    if (!containerRef.current) return

    // Create board manager
    const boardManager = new BoardManager({
      container: containerRef.current,
      boundingbox: [-1, 8, 11, -1],
      axis: false,
      showNavigation: false,
      showCopyright: false,
      grid: false,
      pan: { enabled: false },
      zoom: false,
      keepaspectratio: true
    })
    boardManagerRef.current = boardManager
    const brd = boardManager.getBoard()

    // Geometry factory, selection, undo/redo
    geometryFactoryRef.current = new GeometryFactory(brd)
    selectionManagerRef.current = new SelectionManager()
    undoRedoRef.current = new UndoRedoManager({ board: brd, onFeedback: setFeedback, EPS })

    // Rename manager
    const renameMgr = new RenameManager(brd, {
      clickEps: 0.12,
      promptLabel: 'Název bodu (např. A, B, C, A_1, A_2):',
      eventGuard: (ev) => {
        const t = ev?.originalEvent?.target as HTMLElement | null
        if (t && (t.closest('.group') || t.classList?.contains('group'))) return false
        return !uiBusyRef.current
      },
      onRenamed: ({ pointId, beforeRaw, afterRaw }) => {
        if (beforeRaw === afterRaw) return
        const pt: any = (brd.objects as any)[pointId]
        if (!pt) return
        const before = { x: pt.X(), y: pt.Y(), name: beforeRaw }
        const after = { x: pt.X(), y: pt.Y(), name: afterRaw }
        const op = undoRedoRef.current?.createModifyOperation(pointId, before, after)
        if (op) {
          undoRedoRef.current!.pushOperation(op)
          updateUndoRedoState()
        }
      },
    })
    renameMgrRef.current = renameMgr

    // Down handler always forwards to our click logic
    const downHandler = (e:any) => { handleClickRef.current?.(brd, e) }
    brd.on('down', downHandler)

    // Initialize givens
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

    return () => {
      try { brd.off('down', downHandler) } catch {}
      try { renameMgrRef.current?.destroy() } catch {}
      renameMgrRef.current = null
      undoRedoRef.current = null
      geometryFactoryRef.current = null
      selectionManagerRef.current = null
      boardManager.free()
      boardManagerRef.current = null
      givensRef.current = null
    }
  }, [])

  // Apply grid changes
  useEffect(() => {
    boardManagerRef.current?.setGridMode(gridOption)
  }, [gridOption])

  // Update event handlers when rename mode changes
  useEffect(() => {
    const brd = boardManagerRef.current?.getBoard()
    if (!brd) return

    // Clean old handlers
    brd.off('down')
    brd.off('up')
    brd.off('dblclick')

    const CLICK_EPS = 0.12 // world units; tweak if needed

    const openPrompt = (pt:any, e:any) => {
      const currentRaw = (pt as any)._rawName || ''
      let proposed = (window.prompt('Název bodu (např. A, B, C, A_1, A_2):', currentRaw) ?? '').trim()

      if (proposed && isNameTaken(brd, proposed, (pt as any).id)) {
        let i = 2
        while (isNameTaken(brd, `${proposed}_${i}`, (pt as any).id)) i++
        proposed = `${proposed}_${i}`
      }

      renamePoint(pt, proposed)

      // Restore mobility
      const arm = renameArmRef.current
      ;(pt as any).setAttribute({ fixed: arm.wasFixed })

      // Stop further board interaction from this click
      if (e?.originalEvent) {
        e.originalEvent.stopPropagation()
        e.originalEvent.preventDefault()
      }
      brd.update()

      if (!proposed) setRenameMode(false)

      // Clear arm
      renameArmRef.current = { pt:null, wasFixed:false }
      downPosRef.current = null
    }

    // 1) DOWN: if in rename mode and on a point, FREEZE it and arm rename
    const downHandler = (e:any) => {
      if (uiBusyRef.current) return

      // If not in rename mode, pass through to normal drawing handler
      if (!renameModeRef.current) {
        if (handleClickRef.current) handleClickRef.current(brd, e)
        return
      }

      const pt = pointUnder(brd, e)
      if (!pt) return

      // Freeze now (before any drag begins)
      const wasFixed = !!(pt as any).visProp.fixed
      ;(pt as any).setAttribute({ fixed: true })

      renameArmRef.current = { pt, wasFixed }
      downPosRef.current = getMouseCoords(brd, e)

      // Kill default drag start
      if (e.originalEvent) {
        e.originalEvent.stopPropagation()
        e.originalEvent.preventDefault()
      }
    }

    // 2) UP: if we armed a point and movement was small → open prompt
    const upHandler = (e:any) => {
      const arm = renameArmRef.current
      if (!arm.pt) return

      const up = getMouseCoords(brd, e)
      const down = downPosRef.current || up
      const moved = Math.hypot(up.x - down.x, up.y - down.y)

      // Only treat as rename if it was a click, not a drag
      if (moved <= CLICK_EPS) {
        openPrompt(arm.pt, e)
        return
      }

      // If it was a drag after all, restore the point & abort rename
      const { pt } = arm
      ;(pt as any).setAttribute({ fixed: arm.wasFixed })
      renameArmRef.current = { pt:null, wasFixed:false }
      downPosRef.current = null
    }

    brd.on('down', downHandler)
    brd.on('up', upHandler)

    return () => {
      try { brd.off('down', downHandler); brd.off('up', upHandler) } catch {}
    }
  }, [renameMode, renamePoint])

  function undoLast() {
    undoRedoRef.current?.undo()
    updateUndoRedoState()
  }

  function clearAll() {
    const brd = boardManagerRef.current?.getBoard()
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
    const brd = boardManagerRef.current!.getBoard()!
    const { q, S, C } = givensRef.current!

    const pts = Object.values(brd.objects).filter((o:any) => o.elType === 'point') as any[]
    const getRaw = (p:any) => (p?._rawName ?? p?.name ?? '')
    const A = pts.find(p => getRaw(p) === 'A')
    const B = pts.find(p => getRaw(p) === 'B')
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
    const brd = boardManagerRef.current?.getBoard()
    if (!brd) return
    const validation = validateNow()
    setData({ validation, timestamp: new Date().toISOString() })
    setFeedback(validation.message)
  }

  function updateUndoRedoState() {
    setCanUndoState(undoRedoRef.current?.canUndo() ?? false)
    setCanRedoState(undoRedoRef.current?.canRedo() ?? false)
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
            <button 
              onClick={() => setRenameMode(v => !v)}
              className={`px-3 py-2 rounded flex items-center gap-2 ${
                renameMode ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
              title="Přejmenovat bod (klikněte na bod)"
            >
              ✎ Název bodu
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

            <button 
              onClick={undoLast}
              disabled={!canUndoState}
              className="px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
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
                onActivate={() => {
                  setActiveTool('ruler')
                  setTool('mouse') // Automatically switch to mouse mode when clicking ruler
                }}
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
                onActivate={() => {
                  setActiveTool('triangle')
                  setTool('mouse') // Automatically switch to mouse mode when clicking triangle
                }}
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
                onActivate={() => {
                  setActiveTool('protractor')
                  setTool('mouse') // Automatically switch to mouse mode when clicking protractor
                }}
                onUiBusyChange={setUiBusy}
              />
            )}
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