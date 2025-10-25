'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import JXG from 'jsxgraph'
import { Save, Trash2, Circle, Pencil, RotateCcw, Eraser, Ruler, Triangle, Gauge, ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react'
import DraggableRuler from './DraggableRuler'
import DraggableTriangle from './DraggableTriangle'
import DraggableProtractor from './DraggableProtractor'
import { supabase } from '../../lib/supabase'

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
  const boardRef = useRef<JBoard | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [tool, setTool] = useState<'mouse'|'point'|'segment'|'line'|'circle'|'rubber'>('mouse')
  const [selected, setSelected] = useState<any[]>([])
  const [feedback, setFeedback] = useState('')
  const [data, setData] = useState<any>(null)
  const [createdStack, setCreatedStack] = useState<string[]>([])
  
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
  const [rulerPosition, setRulerPosition] = useState({ x: 5, y: 4, rotation: 0, length: 6 })
  const [trianglePosition, setTrianglePosition] = useState({ x: 7, y: 4, rotation: 0, size: 3 })
  const [protractorPosition, setProtractorPosition] = useState({ x: 6, y: 3, rotation: 0, size: 3 })
  const [activeTool, setActiveTool] = useState<'ruler' | 'triangle' | 'protractor' | null>(null)
  const [uiBusy, setUiBusy] = useState(false)

  const toolRef = useRef(tool)
  const selectedRef = useRef(selected)
  const uiBusyRef = useRef(uiBusy)
  const handleClickRef = useRef<((brd: JBoard, e: any) => void) | null>(null)
  const givensRef = useRef<any>(null)
  
  useEffect(() => { toolRef.current = tool }, [tool])
  useEffect(() => { selectedRef.current = selected }, [selected])
  useEffect(() => { uiBusyRef.current = uiBusy }, [uiBusy])

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
        const qResp = await supabase.from('gq_questions').select('*').eq('id', questionId).single()
        console.debug('gq_questions response', qResp)
        
        if (qResp.error) {
          console.error('gq_questions error detailed', JSON.stringify(qResp.error, Object.getOwnPropertyNames(qResp.error)))
          throw qResp.error
        }
        
        if (!qResp.data) throw new Error('Question not found')
        setQuestion(qResp.data)
        
        // --- ensure user ---
        let userId = studentId
        
        if (studentId === 'anonymous') {
          // For anonymous users, we'll use a fallback approach
          userId = 'anonymous-user-' + Date.now()
          console.debug('Using anonymous fallback userId:', userId)
        } else {
          // For authenticated users, validate the user exists
          const { data: { user: authUser } } = await supabase.auth.getUser()
          if (authUser && authUser.id === studentId) {
            userId = authUser.id
            console.debug('Using authenticated user:', authUser.email, 'ID:', authUser.id)
          } else {
            console.warn('Specified studentId not found in auth, using as-is:', studentId)
            userId = studentId
          }
        }
        
        // Validate userId looks like a UUID before using it for sessions.user_id
        // Allow authenticated users (real UUIDs) or anonymous fallback IDs
        if (!userId || (typeof userId === 'string' && !/^[0-9a-fA-F-]{36}$/.test(userId) && !userId.startsWith('anonymous-user-'))) {
          console.error('Invalid userId before creating session:', userId)
          throw new Error('Invalid userId for session creation')
        }
        
        // --- create session ---
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
    if (!question?.givens) {
      const pt = brd.create('point', [xy.x, xy.y], {
        name: '', size: 2, strokeColor: '#444', fillColor: '#666'
      })
      pushCreated(pt)
      return pt
    }

    // Check if point should be on any given lines
    const givens = givensRef.current
    if (givens) {
      for (const [key, line] of Object.entries(givens)) {
        if (line && typeof line === 'object' && 'elType' in line && line.elType === 'line') {
          if (pointOnLineXY(xy, line, 0.15)) {
            const existingNames = Object.values(brd.objects)
              .filter((o:any) => o.elType === 'point')
              .map((o:any) => o.name)
            const name = String.fromCharCode(65 + existingNames.length) // A, B, C, etc.
            
            const glider = brd.create('glider', [xy.x, xy.y, line], {
              name, size: 3, strokeColor: '#e11d48', fillColor: '#e11d48',
              label: { offset: [5, 10] }
            })
            pushCreated(glider)
            return glider
          }
        }
      }
    }
    
    const pt = brd.create('point', [xy.x, xy.y], {
      name: '', size: 2, strokeColor: '#444', fillColor: '#666'
    })
    pushCreated(pt)
    return pt
  }, [question])

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
        const toRemove = under.find((o:any) => !o.visProp?.fixed)
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

  // Initialize board immediately (like GeneralGeometryTester)
  useEffect(() => {
    if (!containerRef.current) return

    console.debug('Initializing board immediately')

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
    console.debug('Board created successfully:', brd)

    const downHandler = (e: any) => {
      if (handleClickRef.current) {
        handleClickRef.current(brd, e)
      }
    }

    brd.on('down', downHandler)
    console.debug('Event handler attached to board')

    return () => {
      try { 
        JXG.JSXGraph.freeBoard(brd) 
      } catch {}
      boardRef.current = null
      givensRef.current = null
    }
  }, []) // Initialize once, like GeneralGeometryTester

  // Create givens when question loads
  useEffect(() => {
    if (!boardRef.current || !question) {
      console.debug('Givens creation skipped - board:', !!boardRef.current, 'question:', !!question)
      return
    }

    console.debug('Creating givens for question:', question.title, 'givens:', question.givens)

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
            const point = boardRef.current!.create('point', [coords.x, coords.y], {
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
            const line = boardRef.current!.create('line', [[lineData.p1.x, lineData.p1.y], [lineData.p2.x, lineData.p2.y]], {
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
            const center = givens[circleData.center] || boardRef.current!.create('point', [circleData.center.x, circleData.center.y], {
              name: circleData.center, size: 2, strokeColor: '#000', fillColor: '#000', fixed: true
            })
            const circle = boardRef.current!.create('circle', [center, circleData.radius], {
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
    }
    
    givensRef.current = givens
    console.debug('Givens created:', givens)
  }, [question])

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

  // Generic validation function that works with any question
  function validateConstruction() {
    if (!question?.constraints) {
      return { passed: true, message: 'Konstrukce uložena', score: question?.max_score || 3 }
    }

    const brd = boardRef.current!
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
    if (!boardRef.current || !attempt) return

    const validation = validateConstruction()
    const currentState = {
      objects: Object.values(boardRef.current.objects).map((obj: any) => ({
        id: obj.id,
        type: obj.elType,
        name: obj.name,
        properties: obj.visProp
      })),
      createdStack,
      timestamp: new Date().toISOString()
    }

    try {
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
    } catch (err) {
      console.error('Error saving attempt:', err)
      setFeedback('Chyba při ukládání')
    }
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
            <div 
              className="text-gray-700 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: question.prompt_md }}
            />
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

