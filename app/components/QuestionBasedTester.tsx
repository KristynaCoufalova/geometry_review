import { exportBoard } from '../../lib/board-serializer'
'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import JXG from 'jsxgraph'
import { Save, Trash2, Circle, Pencil, RotateCcw, RotateCw, Eraser, Ruler, Triangle, Gauge, ArrowLeft, CheckCircle, XCircle, Clock, Settings, ChevronUp, Info, Keyboard } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import DraggableRuler from './DraggableRuler'
import DraggableTriangle from './DraggableTriangle'
import DraggableProtractor from './DraggableProtractor'
import { supabase } from '../../lib/supabase'
import { ensureAuthenticatedUserExists } from '../../lib/supabase-helpers'
import { UndoRedoManager } from '../../lib/undo-redo'
import { GridMode } from '../../lib/grid-manager'
import { BoardManager, JBoard } from '../../lib/board-manager'
import { GeometryFactory } from '../../lib/geometry-factory'
import { SelectionManager } from '../../lib/selection-manager'
import { calculateCenteredBoundingBoxCm, WORLD_PER_MM, WORLD_PER_CM } from '../../lib/measurement-scale'

// Using JBoard from BoardManager

const EPS = 0.03

// Helper function to snap coordinates to grid (with optional soft snapping)
function snapToGrid(x: number, y: number, gridOption: GridMode, softSnap: boolean = false): {x: number, y: number} {
  if (gridOption === 'none') return { x, y }
  
  let snapSize = WORLD_PER_MM // default fine snap = 1 mm
  
  // Fine-tuned snap sizes for smoother placement
  if (gridOption === 'major' || gridOption === 'major-minor') {
    snapSize = WORLD_PER_CM // snap to 1 cm for major
  } else if (gridOption === 'minor') {
    snapSize = WORLD_PER_MM // 1 mm
  } else if (gridOption === 'dot') {
    snapSize = WORLD_PER_MM
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

interface Question {
  id: string
  code: string
  title: string
  prompt_md: string
  max_score: number
  givens: any
  constraints: any
  difficulty: number
  tags: string[]
}

interface Attempt {
  id?: string
  question_id: string
  session_id: string
  state: any
  score?: number
  passed?: boolean
  feedback?: any
  student_id: string
  is_complete: boolean
  time_spent: number
}

interface Session {
  id: string
  user_id: string
  question_id: string
  session_data: any
  is_active: boolean
}

interface QuestionBasedTesterProps {
  questionId?: string
  studentId?: string
  onBack?: () => void
}

export default function QuestionBasedTester({ questionId, studentId = 'anonymous', onBack }: QuestionBasedTesterProps) {
  const boardManagerRef = useRef<BoardManager | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const undoRedoRef = useRef<UndoRedoManager | null>(null)
  const geometryFactoryRef = useRef<GeometryFactory | null>(null)
  const selectionManagerRef = useRef<SelectionManager | null>(null)

  const [tool, setTool] = useState<'mouse'|'point'|'segment'|'line'|'circle'|'rubber'>('mouse')
  const [selected, setSelected] = useState<any[]>([])
  const [feedback, setFeedback] = useState('')
  const [data, setData] = useState<any>(null)
  
  // Question and session state
  const [question, setQuestion] = useState<Question | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [attempt, setAttempt] = useState<Attempt | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeSpent, setTimeSpent] = useState(0)
  const [startTime, setStartTime] = useState<Date | null>(null)
  
  // Physical tools state
  const [rulerVisible, setRulerVisible] = useState(false)
  const [triangleVisible, setTriangleVisible] = useState(false)
  const [protractorVisible, setProtractorVisible] = useState(false)
  const [rulerPosition, setRulerPosition] = useState({ x: 0, y: 0, rotation: 0, length: 6 })
  const [trianglePosition, setTrianglePosition] = useState({ x: 2, y: 0, rotation: 0, size: 3 })
  const [protractorPosition, setProtractorPosition] = useState({ x: -2, y: 0, rotation: 0, size: 3 })
  const [activeTool, setActiveTool] = useState<'ruler' | 'triangle' | 'protractor' | null>(null)
  const [uiBusy, setUiBusy] = useState(false)
  const [gridOption, setGridOption] = useState<GridMode>('major')
  const [canUndoState, setCanUndoState] = useState(false)
  const [canRedoState, setCanRedoState] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const toolRef = useRef(tool)
  const selectedRef = useRef(selected)
  const uiBusyRef = useRef(uiBusy)
  const gridOptionRef = useRef(gridOption)
  const handleClickRef = useRef<((brd: JBoard, e: any) => void) | null>(null)
  const givensRef = useRef<any>(null)
  
  useEffect(() => { toolRef.current = tool }, [tool])
  useEffect(() => { selectedRef.current = selected }, [selected])
  useEffect(() => { uiBusyRef.current = uiBusy }, [uiBusy])
  useEffect(() => { gridOptionRef.current = gridOption }, [gridOption])
  

  // Timer effect
  useEffect(() => {
    if (!startTime) return
    
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime.getTime()) / 1000))
    }, 1000)
    
    return () => clearInterval(interval)
  }, [startTime])

  // Load question and create session
  useEffect(() => {
    const loadQuestion = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.debug('loadQuestion id=', questionId, 'studentId=', studentId)
        
        // --- fetch question ---
        if (!supabase) {
          // Fallback: create a mock question for testing
          const mockQuestion = {
            id: questionId || 'mock-question',
            code: 'Q9',
            title: 'Úloha 9: rovnoramenný ABC (C vrchol, AB na q, S střed ramene)',
            prompt_md: 'V rovině leží body **C**, **S** a přímka **q**. Najděte vrcholy **A**, **B** rovnoramenného trojúhelníku **ABC** tak, že **C** je vrchol, **AB** leží na **q** a **S** je střed **jednoho** ramene.',
            max_score: 3,
            givens: {
              "lines": { "q": { "p1": { "x": 0, "y": 7 }, "p2": { "x": 10, "y": 7 } } },
              "points": { "C": { "x": 4.5, "y": 3 }, "S": { "x": 5, "y": 5 } },
              "tolerance": 0.06
            },
            constraints: [
              { "id": "A_on_q", "line": "q", "type": "point_on_line", "point": "A" },
              { "id": "B_on_q", "line": "q", "type": "point_on_line", "point": "B" },
              { "a": "A", "b": "C", "c": "B", "d": "C", "id": "iso", "type": "distance_equal" },
              { "id": "S_mid", "type": "any_of", "children": [
                { "a": "A", "b": "C", "type": "midpoint_of", "midpoint": "S" },
                { "a": "B", "b": "C", "type": "midpoint_of", "midpoint": "S" }
              ]}
            ],
            difficulty: 3,
            tags: ["triangle", "isosceles", "construction", "geometry"]
          }
          console.debug('Using mock question (Supabase not available):', mockQuestion)
          setQuestion(mockQuestion)
        } else {
          const qResp = await supabase.from('gq_questions').select('*').eq('id', questionId).single()
          console.debug('gq_questions response', qResp)
          
          if (qResp.error) {
            console.error('gq_questions error detailed', JSON.stringify(qResp.error, Object.getOwnPropertyNames(qResp.error)))
            throw qResp.error
          }
          
          if (!qResp.data) throw new Error('Question not found')
          console.debug('Question loaded successfully:', qResp.data)
          setQuestion(qResp.data)
        }
        
        // --- ensure user ---
        let userId = studentId
        
        // Always check for authenticated user first
        const { data: { user: authUser } } = supabase 
          ? await supabase.auth.getUser() 
          : { data: { user: null } }
        
        if (authUser) {
          // User is authenticated - ensure they exist in the users table
          try {
            const userRecord = await ensureAuthenticatedUserExists(
              authUser.id,
              authUser.email || '',
              authUser.user_metadata?.name || authUser.email?.split('@')[0]
            )
            userId = userRecord.id
            console.debug('Using authenticated user:', authUser.email, 'ID:', userId)
          } catch (err) {
            console.error('Error ensuring authenticated user exists:', err)
            throw new Error('Failed to create user record for authenticated user')
          }
        } else if (studentId === 'anonymous') {
          // For anonymous users, we need to handle this differently
          // Since sessions.user_id requires a foreign key to users, we cannot use a random UUID
          // For now, throw an error - anonymous sessions should be handled differently
          // or you could create a system/anonymous user in the DB
          throw new Error('Anonymous users are not supported. Please log in to continue.')
        } else {
          // Use the provided studentId as-is (should be a valid UUID that exists in users table)
          userId = studentId
          console.debug('Using provided studentId:', userId)
        }
        
        // Validate userId looks like a UUID before using it for sessions.user_id
        if (!userId || (typeof userId === 'string' && !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(userId))) {
          console.error('Invalid userId before creating session:', userId)
          throw new Error('Invalid userId for session creation')
        }
        
        // --- create session ---
        if (!supabase) {
          // Mock session and attempt for testing
          const mockSession = {
            id: 'mock-session-' + Date.now(),
            user_id: userId,
            question_id: questionId || 'mock-question',
            session_data: {},
            is_active: true
          }
          const mockAttempt = {
            id: 'mock-attempt-' + Date.now(),
            question_id: questionId || 'mock-question',
            session_id: mockSession.id,
            state: {},
            student_id: userId,
            is_complete: false,
            time_spent: 0
          }
          console.debug('Using mock session and attempt (Supabase not available)')
          setSession(mockSession)
          setAttempt(mockAttempt)
        } else {
          const sResp = await supabase.from('sessions').insert({
            user_id: userId,
            question_id: questionId,
            session_data: {},
            is_active: true
          }).select().single()
          console.debug('sessions insert response', sResp)
          
          if (sResp.error) {
            console.error('sessions insert error', JSON.stringify(sResp.error, Object.getOwnPropertyNames(sResp.error)))
            throw sResp.error
          }
          setSession(sResp.data)
          
          // --- create attempt ---
          const aResp = await supabase.from('gq_attempts').insert({
            question_id: questionId,
            session_id: sResp.data.id,
            state: {},
            student_id: userId,
            is_complete: false,
            time_spent: 0
          }).select().single()
          console.debug('gq_attempts insert response', aResp)
          
          if (aResp.error) {
            console.error('gq_attempts insert error', JSON.stringify(aResp.error, Object.getOwnPropertyNames(aResp.error)))
            throw aResp.error
          }
          setAttempt(aResp.data)
        }
        setStartTime(new Date())
      } catch (err) {
        // Log more informative detail for non-Error objects
        try {
          console.error('Error loading question (detailed):', err && typeof err === 'object' ? JSON.stringify(err, Object.getOwnPropertyNames(err)) : err)
        } catch (e) {
          console.error('Error logging err', e)
          console.error('Original err:', err)
        }
        setError(err instanceof Error ? err.message : 'Failed to load question')
      } finally {
        setLoading(false)
      }
    }

    if (questionId) {
      loadQuestion()
    }
  }, [questionId, studentId])

  // removed createdStack; rely solely on UndoRedoManager

  function getMouseCoords(brd: JBoard, e: any): {x: number, y: number} {
    const coords = brd.getUsrCoordsOfMouse(e)
    return { x: coords[0], y: coords[1] }
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
    const snapped = snapToGrid(xy.x, xy.y, gridOptionRef.current, true)
    
    // Use grid-aware EPS: slightly larger than snap size to catch nearby snapped points
    const checkEPS = factory.getNearbyEps(gridOptionRef.current, EPS)
    
    // try to reuse an existing non-fixed point near the coordinates
    const existing = factory.findNearbyPoint(snapped.x, snapped.y, checkEPS)
    if (existing) return existing

    // create point at snapped coordinates (with soft snap)
    const pt = factory.pointWithGrid(snapped.x, snapped.y, gridOptionRef.current)
    
    // Don't create a separate point operation here - the point will be tracked
    // automatically when the shape operation (segment/line/circle) executes
    // The shape operations will find this point by ID and attach tracking to it
    
    return pt
  }, [])

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

    // Prefer reusing existing point under cursor
    const under = brd.getAllObjectsUnderMouse({}) as any[]
    const existingUnder = under?.find((o:any)=> o?.elType==='point' && !o.visProp?.fixed)
    if (existingUnder) return existingUnder

    // Create free point (grid-aware with soft snap)
    const pt = factory.pointWithGrid(snapped.x, snapped.y, gridOption)
    return pt
  }, [gridOption])

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
        setFeedback('')
        break
      }
      case 'point': {
        undoRedoRef.current?.begin()
        // try to reuse an existing point under mouse
        const under = brd.getAllObjectsUnderMouse(e)
        const existing = under.find((o:any)=> o.elType==='point' && !o.visProp.fixed)
        if (existing) {
          undoRedoRef.current?.commit()
          setFeedback('Vybrán existující bod')
          break
        }
        const pt:any = createPointSmart(brd, xy)
        if (pt) {
          const op = undoRedoRef.current?.createPointOperation(pt.X(), pt.Y(), {
            name: '', size: 3, strokeColor: '#e11d48', fillColor: '#e11d48', label: { offset: [5, 10] }
          })
          if (op) undoRedoRef.current?.pushOperation(op)
          undoRedoRef.current?.commit()
          updateUndoRedoState()
          setFeedback('Bod vytvořen')
        } else {
          undoRedoRef.current?.commit()
        }
        break
      }
      case 'segment': {
        const selectionMgr = selectionManagerRef.current
        if (!selectionMgr) break

        const first = selectionMgr.getFirst()
        if (!first) {
          // first click
          undoRedoRef.current?.begin()
          const p = getOrCreatePointViaHistory(brd, xy)
          if (!p) { undoRedoRef.current?.commit(); break }
          selectionMgr.select(p)
          setFeedback('Klikněte na druhý bod')
          // don't commit yet; we'll finish in second click
          break
        }

        // second click
        const a:any = first
        const b = getOrCreatePointViaHistory(brd, xy)
        if (!b) { undoRedoRef.current?.commit(); selectionMgr.clear(); break }

        const p1 = { x: a.X(), y: a.Y() }
        const p2 = { x: b.X(), y: b.Y() }
        const attr = { strokeColor:'#2563eb', strokeWidth:2 }
        const op = undoRedoRef.current?.createSegmentOperation(p1, p2, attr)
        if (op) {
          op.pointIds = [a.id, b.id]              // <-- bind exact endpoints
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
          const p = getOrCreatePointViaHistory(brd, xy)
          if (!p) { undoRedoRef.current?.commit(); break }
          selectionMgr.select(p)
          setFeedback('Klikněte na druhý bod')
          break
        }

        const a:any = first
        const b = getOrCreatePointViaHistory(brd, xy)
        if (!b) { undoRedoRef.current?.commit(); selectionMgr.clear(); break }

        const p1 = { x: a.X(), y: a.Y() }
        const p2 = { x: b.X(), y: b.Y() }
        const attr = { strokeColor:'#059669', strokeWidth:1, dash:1 }
        const op = undoRedoRef.current?.createLineOperation(p1, p2, attr)
        if (op) {
          op.pointIds = [a.id, b.id]
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
          const c = getOrCreatePointViaHistory(brd, xy)
          if (!c) { undoRedoRef.current?.commit(); break }
          selectionMgr.select(c)
          setFeedback('Klikněte na bod na kružnici')
          break
        }

        const c:any = first
        const p = getOrCreatePointViaHistory(brd, xy)
        if (!p) { undoRedoRef.current?.commit(); selectionMgr.clear(); break }

        const center = { x: c.X(), y: c.Y() }
        const on     = { x: p.X(), y: p.Y() }
        const attr = { strokeColor:'#dc2626', strokeWidth:2 }
        const op = undoRedoRef.current?.createCircleOperation(center, on, attr)
        if (op) {
          op.pointIds = [c.id, p.id]
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
        const toRemove = under.find((o:any) => !o.visProp?.fixed)
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
  }, [getOrCreatePointViaHistory, createPointSmart])

  useEffect(() => { handleClickRef.current = handleClick }, [handleClick])

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
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

  // Initialize board AFTER the loading phase so the container actually exists
  useEffect(() => {
    // wait until question has finished loading AND there's no error
    if (loading || error) return;

    // only init once, and only when the container is mounted
    if (!containerRef.current || boardManagerRef.current) return;

    console.debug('Initializing board (post-loading), container:', containerRef.current);

    // Calculate dynamic bounding box in whole centimeters, centered at (0,0)
    const containerRect = containerRef.current.getBoundingClientRect()
    const boundingBox = calculateCenteredBoundingBoxCm(containerRect.width, containerRect.height)

    const boardManager = new BoardManager({
      container: containerRef.current,
      boundingbox: boundingBox,
      axis: false,
      showNavigation: false,
      showCopyright: false,
      grid: false,
      pan: { enabled: false },
      zoom: false,
      keepaspectratio: true
    })
    boardManagerRef.current = boardManager
    const brd = boardManager.getBoard() as JBoard

    geometryFactoryRef.current = new GeometryFactory(brd)
    selectionManagerRef.current = new SelectionManager()
    undoRedoRef.current = new UndoRedoManager({ board: brd, onFeedback: setFeedback, EPS })

    // Track point moves as modify operations
    function attachModifyListeners(el:any) {
      if (!el || el.elType !== 'point' || el.visProp?.fixed) return
      let before: null | { x:number; y:number; name:string } = null
      el.on('down', () => { before = { x: el.X(), y: el.Y(), name: el.name ?? '' } })
      el.on('up', () => {
        if (!before) return
        const after = { x: el.X(), y: el.Y(), name: el.name ?? '' }
        if (Math.hypot(after.x - before.x, after.y - before.y) > 1e-9) {
          const op = undoRedoRef.current?.createModifyOperation(el.id, before, after)
          if (op) {
            undoRedoRef.current!.pushOperation(op)
            updateUndoRedoState()
          }
        }
        before = null
      })
    }

    Object.values(brd.objects).forEach((o:any) => attachModifyListeners(o))
    ;(brd as any).on('add', (id: any) => {
      const o:any = (brd.objects as any)[id]
      attachModifyListeners(o)
    })

    const downHandler = (e: any) => {
      if (handleClickRef.current) handleClickRef.current(brd, e);
    };
    brd.on('down', downHandler);

    // Make sure the SVG sizes correctly once visible
    setTimeout(() => {
      try {
        brd?.renderer?.resize?.();
        brd?.fullUpdate?.();
      } catch {}
    }, 0);

    return () => {
      try { brd.off('down', downHandler) } catch {}
      undoRedoRef.current = null
      geometryFactoryRef.current = null
      selectionManagerRef.current = null
      boardManager.free()
      boardManagerRef.current = null
      givensRef.current = null;
    };
  }, [loading, error]); // 👈 key change

  // When user changes the option, update the grid manager
  useEffect(() => {
    boardManagerRef.current?.setGridMode(gridOption)
  }, [gridOption])

  // Create givens when question loads AND the board is ready
  useEffect(() => {
    if (loading || error) return;                 // wait until data phase is done
    if (!boardManagerRef.current || !question) return;   // wait until board exists

    console.debug('Creating givens for question:', question.title, 'givens:', question.givens)

    // Clear any existing givens first
    if (givensRef.current) {
      Object.values(givensRef.current).forEach((obj: any) => {
        if (obj && typeof obj.removeObject === 'function') {
          try {
            boardManagerRef.current!.getBoard()!.removeObject(obj)
          } catch (e) {
            console.warn('Error removing existing givens:', e)
          }
        }
      })
    }

    const givens: any = {}
    if (question.givens) {
      try {
        console.debug('Parsing givens:', question.givens)
        const givensData = typeof question.givens === 'string' ? JSON.parse(question.givens) : question.givens
        console.debug('Parsed givens data:', givensData)
        
        // Create points
        if (givensData.points) {
          console.debug('Creating points:', givensData.points)
          Object.entries(givensData.points).forEach(([name, coords]: [string, any]) => {
            const point = boardManagerRef.current!.getBoard()!.create('point', [coords.x, coords.y], {
              name, size: 3, strokeColor: '#000', fillColor: '#000', fixed: true,
              label: { offset: [5, 10] }
            })
            givens[name] = point
            console.debug('Created point:', name, coords)
          })
        }

        // Create lines
        if (givensData.lines) {
          console.debug('Creating lines:', givensData.lines)
          Object.entries(givensData.lines).forEach(([name, lineData]: [string, any]) => {
            const line = boardManagerRef.current!.getBoard()!.create('line', [[lineData.p1.x, lineData.p1.y], [lineData.p2.x, lineData.p2.y]], {
              strokeColor: '#000', strokeWidth: 2,
              name, withLabel: true, fixed: true,
              label: { position: 'rt', offset: [10, 0] }
            })
            givens[name] = line
            console.debug('Created line:', name, lineData)
          })
        }

        // Create circles
        if (givensData.circles) {
          console.debug('Creating circles:', givensData.circles)
          Object.entries(givensData.circles).forEach(([name, circleData]: [string, any]) => {
            const center = givens[circleData.center] || boardManagerRef.current!.getBoard()!.create('point', [circleData.center.x, circleData.center.y], {
              name: circleData.center, size: 2, strokeColor: '#000', fillColor: '#000', fixed: true
            })
            const circle = boardManagerRef.current!.getBoard()!.create('circle', [center, circleData.radius], {
              strokeColor: '#000', strokeWidth: 2,
              name, withLabel: true, fixed: true
            })
            givens[name] = circle
            console.debug('Created circle:', name, circleData)
          })
        }
      } catch (err) {
        console.error('Error parsing givens:', err)
      }
    } else {
      // Fallback: create default givens for the isosceles triangle problem
      console.debug('No givens data found, creating default givens for isosceles triangle problem')
      const q = boardManagerRef.current!.getBoard()!.create('line', [[0, 7], [10, 7]], {
        strokeColor: '#000', strokeWidth: 2,
        name: 'q', withLabel: true, fixed: true,
        label: { position: 'rt', offset: [10, 0] }
      })
      const S = boardManagerRef.current!.getBoard()!.create('point', [5, 5], {
        name: 'S', size: 3, strokeColor: '#000', fillColor: '#000', fixed: true, 
        label: { offset: [5, 10] }
      })
      const C = boardManagerRef.current!.getBoard()!.create('point', [4.5, 3], {
        name: 'C', size: 3, strokeColor: '#000', fillColor: '#000', fixed: true, 
        label: { offset: [5, -15] }
      })
      
      givens.q = q
      givens.S = S
      givens.C = C
    }
    
    givensRef.current = givens
    console.debug('Givens created:', givens)
    
    // Force board update to render the newly created givens
    if (boardManagerRef.current) {
      const brd = boardManagerRef.current.getBoard()
      brd.renderer.resize();
      brd.fullUpdate();
      console.debug('Board updated to display givens')
    }
    
    // Additional debugging
    console.debug('Board objects after givens creation:', Object.keys(boardManagerRef.current!.getBoard()!.objects))
  }, [question, loading, error]); // 👈 key change

  function undoLast() {
    undoRedoRef.current?.undo()
    updateUndoRedoState()
  }

  function redoLast() {
    undoRedoRef.current?.redo()
    updateUndoRedoState()
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
    // fully reset undo history if supported
    try { (undoRedoRef.current as any)?.reset?.() } catch {}
    updateUndoRedoState()
  }

  // Generic validation function that works with any question
  function validateConstruction() {
    if (!question?.constraints) {
      return { passed: true, message: 'Konstrukce uložena', score: question?.max_score || 3 }
    }

    const brd = boardManagerRef.current!.getBoard()!
    const givens = givensRef.current

    try {
      const constraints = typeof question.constraints === 'string' ? JSON.parse(question.constraints) : question.constraints
      
      // This is a simplified validation - in a real implementation, you'd have more sophisticated validation logic
      // based on the question's constraints structure
      let score = 0
      let passed = false
      let message = ''

      // Basic validation - check if required objects exist
      const points = Object.values(brd.objects).filter((o:any) => o.elType === 'point' && !o.visProp?.fixed)
      const segments = Object.values(brd.objects).filter((o:any) => o.elType === 'segment')
      const lines = Object.values(brd.objects).filter((o:any) => o.elType === 'line' && !o.visProp?.fixed)
      const circles = Object.values(brd.objects).filter((o:any) => o.elType === 'circle' && !o.visProp?.fixed)

      if (constraints.requiredPoints && points.length >= constraints.requiredPoints) {
        score += 1
      }
      if (constraints.requiredSegments && segments.length >= constraints.requiredSegments) {
        score += 1
      }
      if (constraints.requiredLines && lines.length >= constraints.requiredLines) {
        score += 1
      }
      if (constraints.requiredCircles && circles.length >= constraints.requiredCircles) {
        score += 1
      }

      if (score >= (constraints.minScore || 2)) {
        passed = true
        message = '✅ Výborně! Konstrukce splňuje požadavky.'
      } else {
        message = 'Konstrukce neúplná. Zkuste přidat více objektů.'
      }

      return { passed, message, score: Math.min(score, question.max_score) }
    } catch (err) {
      return { passed: false, message: 'Chyba při validaci', score: 0 }
    }
  }

  async function saveConstruction() {
    if (!boardManagerRef.current || !attempt) return

    const validation = validateConstruction()
    const brd = boardManagerRef.current.getBoard()
    const serializeGeometry = (obj: any) => {
      const type = obj.elType
      if (type === 'point') {
        return { x: obj.X(), y: obj.Y() }
      }
      if (type === 'segment' || type === 'line') {
        const p1 = (obj.points && obj.points[0]) ? obj.points[0] : null
        const p2 = (obj.points && obj.points[1]) ? obj.points[1] : null
        return p1 && p2 ? { x1: p1.X(), y1: p1.Y(), x2: p2.X(), y2: p2.Y() } : null
      }
      if (type === 'circle') {
        const c = obj.center
        const on = obj.point2 || (obj.points && obj.points[1]) || null
        const center = c ? { x: c.X(), y: c.Y() } : null
        const radius = (c && on) ? Math.hypot(on.X() - c.X(), on.Y() - c.Y()) : (typeof obj.R === 'function' ? obj.R() : undefined)
        return { center, radius }
      }
      if (type === 'polygon') {
        const verts = Array.isArray(obj.vertices) ? obj.vertices.map((v:any)=>({ x: v.X(), y: v.Y() })) : []
        return { vertices: verts }
      }
      return null
    }
    const snapshot = exportBoard(brd)
    const currentState = {
      ...snapshot,
      timestamp: new Date().toISOString()
    }

    try {
      if (!supabase) {
        // Mock save for testing
        console.log('Mock save (Supabase not available):', { validation, currentState })
        setData({ validation, timestamp: new Date().toISOString() })
        setFeedback(validation.message)
      } else {
        const { error } = await supabase
          .from('gq_attempts')
          .update({
            state: currentState,
            score: validation.score,
            passed: validation.passed,
            feedback: { message: validation.message, validation },
            is_complete: true,
            time_spent: timeSpent
          })
          .eq('id', attempt.id)

        if (error) throw error

        setData({ validation, timestamp: new Date().toISOString() })
        setFeedback(validation.message)
      }
    } catch (err) {
      console.error('Error saving attempt:', err)
      setFeedback('Chyba při ukládání')
    }
  }

  function updateUndoRedoState() {
    setCanUndoState(undoRedoRef.current?.canUndo() ?? false)
    setCanRedoState(undoRedoRef.current?.canRedo() ?? false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Načítání úlohy...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Zpět
            </button>
          )}
        </div>
      </div>
    )
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Úloha nebyla nalezena</p>
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Zpět
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                >
                  <ArrowLeft size={18} />
                  Zpět
                </button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {question.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Kód: {question.code}</span>
                  <span>Obtížnost: {'★'.repeat(question.difficulty)}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Maximální skóre: {question.max_score}</div>
              {attempt && (
                <div className="text-sm text-gray-600">
                  Skóre: {data?.validation?.score || 0} / {question.max_score}
                </div>
              )}
            </div>
          </div>

          {/* Question prompt */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <div className="text-gray-700 text-sm markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {question.prompt_md ?? ''}
              </ReactMarkdown>
            </div>
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
              <div className="mt-4 pt-3 border-t border-blue-300">
                <h4 className="font-medium mb-2 text-blue-800 flex items-center gap-2">
                  <Keyboard size={16} />
                  Klávesové zkratky:
                </h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• <strong>Ctrl/Cmd + Z:</strong> Zpět (Undo)</li>
                  <li>• <strong>Ctrl/Cmd + Shift + Z:</strong> Znovu (Redo)</li>
                  <li>• <strong>Delete:</strong> Smazat vybraný objekt (když je aktivní guma)</li>
                </ul>
              </div>
            </div>
          )}

          {/* Toolbar */}
          <div className="mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-md">
            {/* First Row: Drawing Tools & Physical Tools */}
            <div className="flex flex-wrap items-center gap-2.5 p-4 border-b border-gray-200 bg-white/50 rounded-t-xl">
              {/* Drawing Tools Section */}
              <div className="flex items-center gap-2 pr-2 border-r border-gray-300">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2">Kreslení</span>
                <button 
                  onClick={() => setTool('mouse')}
                  className={`px-3 py-2 rounded-md flex items-center gap-2 transition-all text-sm font-medium shadow-sm ${
                    tool === 'mouse' ? 'bg-gray-700 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                  title="Myš - Interakce s objekty bez vytváření"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
                    <path d="M13 13l6 6"/>
                  </svg>
                  Myš
                </button>
                <button 
                  onClick={() => setTool('point')}
                  className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md ${
                    tool === 'point' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                  }`}
                  title="Bod - Vytvoření bodu kliknutím"
                >
                  <Circle size={18}/> Bod
                </button>
                <button 
                  onClick={() => setTool('segment')}
                  className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md ${
                    tool === 'segment' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                  }`}
                  title="Úsečka - Klikněte na dva body"
                >
                  <Pencil size={18}/> Úsečka
                </button>
                <button 
                  onClick={() => setTool('line')}
                  className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md ${
                    tool === 'line' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                  }`}
                  title="Přímka - Klikněte na dva body"
                >
                  <Pencil size={18}/> Přímka
                </button>
                <button 
                  onClick={() => setTool('circle')}
                  className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md ${
                    tool === 'circle' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                  }`}
                  title="Kružnice - Střed a bod na kružnici"
                >
                  <Circle size={18}/> Kružnice
                </button>
              </div>

              {/* Editing Tools Section */}
              <div className="flex items-center gap-2 pr-2 border-r border-gray-300">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2">Úpravy</span>
                <button 
                  onClick={() => setTool('rubber')}
                  className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md ${
                    tool === 'rubber' ? 'bg-red-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-red-50 border border-gray-300'
                  }`}
                  title="Guma - Smazání objektu"
                >
                  <Eraser size={18}/> Guma
                </button>
              </div>
            
              {/* Physical Tools Section */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2">Nástroje</span>
                <button 
                  onClick={toggleRuler}
                  className={`px-3 py-2 rounded flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md ${
                    rulerVisible ? 'bg-yellow-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-300'
                  }`}
                  title="Pravítko - Měření vzdáleností"
                >
                  <Ruler size={18}/> Pravítko
                </button>
                <button 
                  onClick={toggleTriangle}
                  className={`px-3 py-2 rounded flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md ${
                    triangleVisible ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-300'
                  }`}
                  title="Trojúhelník - Rýsování úhlů"
                >
                  <Triangle size={18}/> Trojúhelník
                </button>
                <button 
                  onClick={toggleProtractor}
                  className={`px-3 py-2 rounded flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md ${
                    protractorVisible ? 'bg-orange-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-300'
                  }`}
                  title="Úhloměr - Měření úhlů"
                >
                  <Gauge size={18}/> Úhloměr
                </button>
              </div>
            </div>

            {/* Second Row: History & File Operations */}
            <div className="flex flex-wrap items-center gap-2.5 p-4 bg-white/30 rounded-b-xl">
              <button 
                onClick={undoLast} 
                disabled={!canUndoState}
                className="px-3.5 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md"
                title="Zpět (Ctrl/Cmd + Z)"
              >
                <RotateCcw size={16}/> Zpět
              </button>
              <button 
                onClick={redoLast} 
                disabled={!canRedoState}
                className="px-3.5 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md"
                title="Znovu (Ctrl/Cmd + Shift + Z)"
              >
                <RotateCw size={16}/> Znovu
              </button>
              <button onClick={clearAll} className="px-3.5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md">
                <Trash2 size={16}/> Vymazat
              </button>
              <button onClick={saveConstruction} className="px-3.5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md">
                <Save size={16}/> Uložit
              </button>
            </div>
          </div>

          <div 
            ref={containerRef} 
            id="jxgbox" 
            className="w-full border-2 border-gray-300 rounded-lg bg-white jxgbox relative" 
            style={{ height: 500, touchAction: 'none' }} 
          >
            {/* Settings Button - positioned outside JSXGraph container */}
            <div className="absolute top-2 right-2 z-50 settings-dropdown" style={{ zIndex: 9999 }}>
              <div className="flex items-center gap-2">
                {/* Grid mode indicator */}
                <div className="px-2 py-1 bg-white bg-opacity-80 rounded text-xs text-gray-700 border border-gray-300">
                  {gridOption === 'none' && 'Žádná mřížka'}
                  {gridOption === 'major' && 'Hlavní'}
                  {gridOption === 'minor' && 'Vedlejší'}
                  {gridOption === 'major-minor' && 'Hlavní+Vedlejší'}
                  {gridOption === 'dot' && 'Bodová'}
                </div>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-lg transition-colors"
                  title="Nastavení mřížky"
                  style={{ zIndex: 10000 }}
                >
                  <Settings size={18} />
                </button>
              </div>
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
                      onClick={() => { setGridOption('none'); setShowSettings(false) }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${gridOption === 'none' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                    >
                      Žádná mřížka
                    </button>
                    <button
                      onClick={() => { setGridOption('major'); setShowSettings(false) }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${gridOption === 'major' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                    >
                      Hlavní mřížka
                    </button>
                    <button
                      onClick={() => { setGridOption('minor'); setShowSettings(false) }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${gridOption === 'minor' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                    >
                      Vedlejší mřížka
                    </button>
                    <button
                      onClick={() => { setGridOption('major-minor'); setShowSettings(false) }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${gridOption === 'major-minor' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                    >
                      Hlavní a vedlejší mřížka
                    </button>
                    <button
                      onClick={() => { setGridOption('dot'); setShowSettings(false) }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${gridOption === 'dot' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                    >
                      Bodová mřížka
                    </button>
                  </div>
                </div>
              )}
            </div>
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

