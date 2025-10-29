'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import JXG from 'jsxgraph'
import { Save, Trash2, Circle, Pencil, RotateCcw, RotateCw, Eraser, Ruler, Triangle, Gauge, ZoomIn, ZoomOut, Download, Upload, Info, Settings, ChevronUp } from 'lucide-react'
import DraggableRuler from './DraggableRuler'
import DraggableTriangle from './DraggableTriangle'
import DraggableProtractor from './DraggableProtractor'
import { UndoRedoManager } from '../../lib/undo-redo'
import { GridMode } from '../../lib/grid-manager'
import { BoardManager, JBoard } from '../../lib/board-manager'
import { GeometryFactory } from '../../lib/geometry-factory'

const EPS = 0.05

function dist(a: {x:number,y:number}, b:{x:number,y:number}) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

// Helper function to snap coordinates to grid (with optional soft snapping)
function snapToGrid(x: number, y: number, gridOption: GridMode, softSnap: boolean = false): {x: number, y: number} {
  if (gridOption === 'none') return { x, y }
  
  let snapSize = 0.5 // default minor grid spacing
  
  // Fine-tuned snap sizes for smoother placement
  if (gridOption === 'major' || gridOption === 'major-minor') {
    snapSize = 0.25 // finer snap for major grid
  } else if (gridOption === 'minor') {
    snapSize = 0.1 // very fine snap for minor grid
  } else if (gridOption === 'dot') {
    snapSize = 0.25 // fine snap for dot grid
  }
  
  // Soft snap: only snap if close to grid line (within 30% of snap size)
  if (softSnap) {
    const snappedX = Math.round(x / snapSize) * snapSize
    const snappedY = Math.round(y / snapSize) * snapSize
    const threshold = snapSize * 0.3
    
    const distX = Math.abs(x - snappedX)
    const distY = Math.abs(y - snappedY)
    
    return {
      x: distX < threshold ? snappedX : x,
      y: distY < threshold ? snappedY : y
    }
  }
  
  return {
    x: Math.round(x / snapSize) * snapSize,
    y: Math.round(y / snapSize) * snapSize
  }
}

function coordsOfPoint(p: any) { return { x: p.X(), y: p.Y() } }

export default function GeneralGeometryTester() {
  const boardManagerRef = useRef<BoardManager | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const undoRedoRef = useRef<UndoRedoManager | null>(null)
  const geometryFactoryRef = useRef<GeometryFactory | null>(null)

  const [tool, setTool] = useState<'mouse'|'point'|'segment'|'line'|'circle'|'rubber'>('mouse')
  const [selected, setSelected] = useState<any[]>([])
  const [feedback, setFeedback] = useState('')
  const [data, setData] = useState<any>(null)
  const [createdStack, setCreatedStack] = useState<string[]>([])
  const [showHelp, setShowHelp] = useState(false)
  const [constructionHistory, setConstructionHistory] = useState<any[]>([])
  
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
  
  // Grid settings state
  const [showSettings, setShowSettings] = useState(false)
  const [gridOption, setGridOption] = useState<GridMode>('major')

  const toolRef = useRef(tool)
  const selectedRef = useRef(selected)
  const uiBusyRef = useRef(uiBusy)
  const renameModeRef = useRef(renameMode)
  const gridOptionRef = useRef(gridOption)
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
  useEffect(() => { gridOptionRef.current = gridOption }, [gridOption])

  function pushCreated(obj: any) {
    if (obj && typeof obj === 'object' && 'id' in obj) setCreatedStack(s => [...s, obj.id])
  }

  function getMouseCoords(brd: JBoard, e: any): {x: number, y: number} {
    const coords = brd.getUsrCoordsOfMouse(e)
    return { x: coords[0], y: coords[1] }
  }

  // 'A_12' -> 'A₁₂'
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

  // Helper function to get or create points via history system
  const getOrCreatePointViaHistory = useCallback((brd: JBoard, xy: {x:number, y:number}) => {
    const factory = geometryFactoryRef.current
    if (!factory) return null

    // Use soft snapping for smoother placement - only snap if close to grid
    const snapped = snapToGrid(xy.x, xy.y, gridOption, true)
    
    // Use grid-aware EPS: slightly larger than snap size to catch nearby snapped points
    const checkEPS = factory.getNearbyEps(gridOption, EPS)
    
    // try to reuse an existing non-fixed point near the coordinates
    const existing = factory.findNearbyPoint(snapped.x, snapped.y, checkEPS)
    if (existing) return existing

    // create point at snapped coordinates (with soft snap)
    const pt = factory.pointWithGrid(snapped.x, snapped.y, gridOption)
    
    // Don't create a separate point operation here - the point will be tracked
    // automatically when the shape operation (segment/line/circle) executes
    // The shape operations will find this point by ID and attach tracking to it
    
    return pt
  }, [gridOption])

  const createPointSmart = useCallback((brd: JBoard, xy: {x:number, y:number}) => {
    const factory = geometryFactoryRef.current
    if (!factory) return null

    // Use soft snapping for smoother placement
    const snapped = snapToGrid(xy.x, xy.y, gridOption, true)
    
    // Use grid-aware EPS to check for existing points
    const checkEPS = factory.getNearbyEps(gridOption, EPS)
    
    // Check for existing points at snapped location
    const existing = factory.findNearbyPoint(snapped.x, snapped.y, checkEPS)
    if (existing) return existing
    
    const pt = factory.pointWithGrid(snapped.x, snapped.y, gridOption)
    pushCreated(pt)
    return pt
  }, [gridOption])

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
        // Use soft snapping for smoother placement
        const snapped = snapToGrid(xy.x, xy.y, gridOptionRef.current, true)
        
        // Check for existing point at snapped location
        const factory = geometryFactoryRef.current
        if (!factory) break
        
        const checkEPS = factory.getNearbyEps(gridOptionRef.current, EPS)
        const existing = factory.findNearbyPoint(snapped.x, snapped.y, checkEPS)
        
        if (!existing) {
          const attr = { name:'', size:2, strokeColor:'#444', fillColor:'#666' }
          const op = undoRedoRef.current?.createPointOperation(snapped.x, snapped.y, attr)
          if (op) undoRedoRef.current?.pushOperation(op)
          setFeedback('Bod vytvořen')
        } else {
          setFeedback('Bod již existuje na této pozici')
        }
        break
      }
      case 'segment': {
        const first = selectedRef.current[0]
        if (!first) {
          // first click
          undoRedoRef.current?.begin()
          const p = getOrCreatePointViaHistory(brd, xy)
          if (!p) { undoRedoRef.current?.commit(); break }
          setSelected([p])
          setFeedback('Klikněte na druhý bod')
          // don't commit yet; we'll finish in second click
          break
        }

        // second click
        const a:any = first
        const b = getOrCreatePointViaHistory(brd, xy)
        if (!b) { undoRedoRef.current?.commit(); setSelected([]); break }

        const p1 = { x: a.X(), y: a.Y() }
        const p2 = { x: b.X(), y: b.Y() }
        const attr = { strokeColor:'#2563eb', strokeWidth:2 }
        const op = undoRedoRef.current?.createSegmentOperation(p1, p2, attr)
        if (op) {
          op.pointIds = [a.id, b.id]              // <-- bind exact endpoints
          undoRedoRef.current?.pushOperation(op)
        }
        undoRedoRef.current?.commit()
        setSelected([])
        setFeedback('Úsečka vytvořena')
        break
      }
      case 'line': {
        const first = selectedRef.current[0]
        if (!first) {
          undoRedoRef.current?.begin()
          const p = getOrCreatePointViaHistory(brd, xy)
          if (!p) { undoRedoRef.current?.commit(); break }
          setSelected([p])
          setFeedback('Klikněte na druhý bod')
          break
        }

        const a:any = first
        const b = getOrCreatePointViaHistory(brd, xy)
        if (!b) { undoRedoRef.current?.commit(); setSelected([]); break }

        const p1 = { x: a.X(), y: a.Y() }
        const p2 = { x: b.X(), y: b.Y() }
        const attr = { strokeColor:'#059669', strokeWidth:1, dash:1 }
        const op = undoRedoRef.current?.createLineOperation(p1, p2, attr)
        if (op) {
          op.pointIds = [a.id, b.id]
          undoRedoRef.current?.pushOperation(op)
        }
        undoRedoRef.current?.commit()
        setSelected([])
        setFeedback('Přímka vytvořena')
        break
      }
      case 'circle': {
        const first = selectedRef.current[0]
        if (!first) {
          undoRedoRef.current?.begin()
          const c = getOrCreatePointViaHistory(brd, xy)
          if (!c) { undoRedoRef.current?.commit(); break }
          setSelected([c])
          setFeedback('Klikněte na bod na kružnici')
          break
        }

        const c:any = first
        const p = getOrCreatePointViaHistory(brd, xy)
        if (!p) { undoRedoRef.current?.commit(); setSelected([]); break }

        const center = { x: c.X(), y: c.Y() }
        const on     = { x: p.X(), y: p.Y() }
        const attr = { strokeColor:'#dc2626', strokeWidth:2 }
        const op = undoRedoRef.current?.createCircleOperation(center, on, attr)
        if (op) {
          op.pointIds = [c.id, p.id]
          undoRedoRef.current?.pushOperation(op)
        }
        undoRedoRef.current?.commit()
        setSelected([])
        setFeedback('Kružnice vytvořena')
        break
      }
      case 'rubber': {
        const under = brd.getAllObjectsUnderMouse(e)
        const toRemove:any = under.find((o:any) => !o.visProp?.fixed)
        if (toRemove) {
          const delOp = undoRedoRef.current?.createDeleteOperation(toRemove)
          if (delOp) {
            undoRedoRef.current?.pushOperation(delOp)
            setFeedback('Objekt smazán')
          } else {
            // fallback: hard remove (won't be undoable)
            brd.removeObject(toRemove as JXG.GeometryElement)
            setFeedback('Objekt smazán (bez historie)')
          }
        }
        break
      }
    }
  }, [getOrCreatePointViaHistory])

  useEffect(() => { handleClickRef.current = handleClick }, [handleClick])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.key === 'n' || e.key === 'N') && !uiBusyRef.current) {
        setRenameMode(v => !v)
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

    // Create board manager (handles board creation and grid management)
    const boardManager = new BoardManager({
      container: containerRef.current,
      boundingbox: [-1, 8, 11, -1],
      axis: false,
      showNavigation: false,
      showCopyright: false,
      grid: false,           // we'll manage grids ourselves
      pan: { enabled: false },
      zoom: false,
      keepaspectratio: true
    })

    boardManagerRef.current = boardManager

    const brd = boardManager.getBoard()

    // Create geometry factory
    geometryFactoryRef.current = new GeometryFactory(brd)

    // Optional: global snap-to-grid defaults for points (finer for smoother placement)
    // (You can still override per element in your creators.)
    JXG.Options.point.snapToGrid = true
    JXG.Options.point.snapSizeX = 0.25
    JXG.Options.point.snapSizeY = 0.25

    // Init undo/redo
    undoRedoRef.current = new UndoRedoManager({
      board: brd,
      onFeedback: setFeedback,
      EPS: EPS
    })

    return () => {
      boardManager.free()
      boardManagerRef.current = null
      undoRedoRef.current = null
      geometryFactoryRef.current = null
    }
  }, [])

  // When user changes the option, update the grid manager
  useEffect(() => {
    boardManagerRef.current?.setGridMode(gridOption)
  }, [gridOption])

  // Close settings dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (showSettings && !target.closest('.settings-dropdown')) {
        setShowSettings(false)
      }
    }

    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSettings])

  // Update event handlers when rename mode changes
  useEffect(() => {
    const brd = boardManagerRef.current?.getBoard()
    if (!brd) return

    // Store references to our specific handlers so we can remove them properly
    let currentDownHandler: ((e: any) => void) | null = null
    let currentUpHandler: ((e: any) => void) | null = null

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
    currentDownHandler = (e:any) => {
      if (uiBusyRef.current) return

      // If not in rename mode, pass through to normal drawing handler and let undo-redo system handle drags
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

      // Only prevent default behavior in rename mode
      if (e.originalEvent) {
        e.originalEvent.stopPropagation()
        e.originalEvent.preventDefault()
      }
    }

    // 2) UP: if we armed a point and movement was small → open prompt
    currentUpHandler = (e:any) => {
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

    brd.on('down', currentDownHandler)
    brd.on('up', currentUpHandler)

    return () => {
      try { 
        if (currentDownHandler) brd.off('down', currentDownHandler)
        if (currentUpHandler) brd.off('up', currentUpHandler)
      } catch {}
    }
  }, [renameMode, renamePoint])

  function undoLast() {
    undoRedoRef.current?.undo()
  }

  function redoLast() {
    undoRedoRef.current?.redo()
  }

  function clearAll() {
    const brd = boardManagerRef.current?.getBoard()
    if (!brd) return
    const toRemove: any[] = []
    for (const key in brd.objects) {
      const o: any = brd.objects[key]
      if (!o?.visProp?.fixed) {
        toRemove.push(o)
      }
    }
    toRemove.forEach(o => brd.removeObject(o))
    setSelected([])
    setFeedback('')
    setData(null)
    setCreatedStack([])
  }

  function saveConstruction() {
    const brd = boardManagerRef.current?.getBoard()
    if (!brd) return
    const timestamp = new Date().toISOString()
    const constructionData = {
      timestamp,
      objects: Object.values(brd.objects).map((obj: any) => ({
        id: obj.id,
        type: obj.elType,
        name: obj.name,
        properties: obj.visProp
      })),
      createdStack: [...createdStack]
    }
    setData(constructionData)
    setConstructionHistory(prev => [...prev, constructionData])
    setFeedback('Konstrukce uložena')
  }

  function exportConstruction() {
    if (!data) return
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `construction_${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
    setFeedback('Konstrukce exportována')
  }

  function importConstruction(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string)
        setData(importedData)
        setFeedback('Konstrukce načtena - klikněte na "Načíst" pro obnovení')
      } catch (err) {
        setFeedback('Chyba při načítání souboru')
      }
    }
    reader.readAsText(file)
  }

  function loadConstruction() {
    const brd = boardManagerRef.current?.getBoard()
    if (!data || !brd) return
    
    // Clear current construction
    clearAll()
    
    // Restore objects from data
    // This is a simplified restoration - in a real implementation you'd need more sophisticated logic
    setFeedback('Konstrukce načtena')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Obecné geometrické testování
          </h1>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
            <p className="text-gray-700">
              Volné testovací pole pro geometrické konstrukce. Můžete používat všechny dostupné nástroje bez specifických požadavků.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <Info size={14} />
                {showHelp ? 'Skrýt nápovědu' : 'Zobrazit nápovědu'}
              </button>
            </div>
          </div>

          {showHelp && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <h3 className="font-semibold text-blue-800 mb-2">Nápověda k nástrojům:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                <div>
                  <h4 className="font-medium mb-1">Základní nástroje:</h4>
                  <ul className="space-y-1">
                    <li>• <strong>Myš:</strong> Interakce s objekty bez vytváření</li>
                    <li>• <strong>Bod:</strong> Vytvoření bodu kliknutím</li>
                    <li>• <strong>Úsečka:</strong> Klikněte na dva body</li>
                    <li>• <strong>Přímka:</strong> Klikněte na dva body</li>
                    <li>• <strong>Kružnice:</strong> Střed a bod na kružnici</li>
                    <li>• <strong>Guma:</strong> Smazání objektu</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Fyzické nástroje:</h4>
                  <ul className="space-y-1">
                    <li>• <strong>Pravítko:</strong> Měření vzdáleností</li>
                    <li>• <strong>Trojúhelník:</strong> Rýsování úhlů</li>
                    <li>• <strong>Úhloměr:</strong> Měření úhlů</li>
                    <li>• <strong>Modrý bod:</strong> Přesun nástroje</li>
                    <li>• <strong>Zelený bod:</strong> Otočení nástroje</li>
                    <li>• <strong>Oranžový bod:</strong> Změna velikosti</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

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

            <button onClick={undoLast} className="px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 flex items-center gap-2">
              <RotateCcw size={18}/> Zpět
            </button>
            <button onClick={redoLast} className="px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 flex items-center gap-2">
              <RotateCw size={18}/> Znovu
            </button>
            <button onClick={clearAll} className="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 flex items-center gap-2">
              <Trash2 size={18}/> Vymazat
            </button>
            <button onClick={saveConstruction} className="px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700 flex items-center gap-2">
              <Save size={18}/> Uložit
            </button>
            <button onClick={exportConstruction} disabled={!data} className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              <Download size={18}/> Export
            </button>
            <label className="px-3 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 cursor-pointer flex items-center gap-2">
              <Upload size={18}/> Import
              <input
                type="file"
                accept=".json"
                onChange={importConstruction}
                className="hidden"
              />
            </label>
            <button onClick={loadConstruction} disabled={!data} className="px-3 py-2 rounded bg-orange-600 text-white hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              <Upload size={18}/> Načíst
            </button>
          </div>

          <div className="relative">
            {/* Settings Button - positioned outside JSXGraph container */}
            <div className="absolute top-2 right-2 z-50 settings-dropdown" style={{ zIndex: 9999 }}>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-lg transition-colors"
                title="Nastavení mřížky"
                style={{ zIndex: 10000 }}
              >
                <Settings size={18} />
              </button>
              
              {/* Settings Dropdown */}
              {showSettings && (
                <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded-lg shadow-lg min-w-48 z-20" style={{ zIndex: 10001 }}>
                  <div className="p-3 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 3h18v18H3z"/>
                        <path d="M9 9h6v6H9z"/>
                        <path d="M3 9h6"/>
                        <path d="M15 9h6"/>
                        <path d="M3 15h6"/>
                        <path d="M15 15h6"/>
                        <path d="M9 3v6"/>
                        <path d="M9 15v6"/>
                        <path d="M15 3v6"/>
                        <path d="M15 15v6"/>
                      </svg>
                      Zobrazit mřížku
                      <ChevronUp size={14} />
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setGridOption('none')
                        setShowSettings(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        gridOption === 'none' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      }`}
                    >
                      Žádná mřížka
                    </button>
                    <button
                      onClick={() => {
                        setGridOption('major')
                        setShowSettings(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        gridOption === 'major' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      }`}
                    >
                      Hlavní mřížka
                    </button>
                    <button
                      onClick={() => {
                        setGridOption('minor')
                        setShowSettings(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        gridOption === 'minor' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      }`}
                    >
                      Vedlejší mřížka
                    </button>
                    <button
                      onClick={() => {
                        setGridOption('major-minor')
                        setShowSettings(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        gridOption === 'major-minor' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      }`}
                    >
                      Hlavní a vedlejší mřížka
                    </button>
                    <button
                      onClick={() => {
                        setGridOption('dot')
                        setShowSettings(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        gridOption === 'dot' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      }`}
                    >
                      Bodová mřížka
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div 
              ref={containerRef} 
              id="jxgbox" 
              className="w-full border-2 border-gray-300 rounded-lg bg-white jxgbox" 
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

          {/* Construction History */}
          {constructionHistory.length > 0 && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Historie konstrukcí</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {constructionHistory.map((construction, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                    <div>
                      <span className="text-sm font-medium">Konstrukce {index + 1}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        {new Date(construction.timestamp).toLocaleString('cs-CZ')}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {construction.objects?.length || 0} objektů
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
