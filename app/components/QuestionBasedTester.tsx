'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import JXG from 'jsxgraph'
import { Save, Trash2, Circle, Pencil, RotateCcw, Eraser, Ruler, Triangle, Gauge, ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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
          // User is authenticated, use their real UUID
          userId = authUser.id
          console.debug('Using authenticated user:', authUser.email, 'ID:', authUser.id)
        } else if (studentId === 'anonymous') {
          // For anonymous users, we'll use a fallback approach
          userId = 'anonymous-user-' + Date.now()
          console.debug('Using anonymous fallback userId:', userId)
        } else {
          // Use the provided studentId as-is (should be a valid UUID)
          userId = studentId
          console.debug('Using provided studentId:', userId)
        }
        
        // Validate userId looks like a UUID before using it for sessions.user_id
        // Allow authenticated users (real UUIDs) or anonymous fallback IDs
        if (!userId || (typeof userId === 'string' && !/^[0-9a-fA-F-]{36}$/.test(userId) && !userId.startsWith('anonymous-user-'))) {
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

  // Initialize board AFTER the loading phase so the container actually exists
  useEffect(() => {
    // wait until question has finished loading AND there's no error
    if (loading || error) return;

    // only init once, and only when the container is mounted
    if (!containerRef.current || boardRef.current) return;

    console.debug('Initializing board (post-loading), container:', containerRef.current);

    // Calculate proper bounding box to maintain uniform scaling
    const containerRect = containerRef.current.getBoundingClientRect()
    const worldWidth = 12  // 11 - (-1) = 12
    const worldHeight = 9  // 8 - (-1) = 9
    
    // Calculate uniform scale to maintain aspect ratio
    const scaleX = containerRect.width / worldWidth
    const scaleY = containerRect.height / worldHeight
    const uniformScale = Math.min(scaleX, scaleY)
    
    // Calculate centered bounding box
    const scaledWidth = worldWidth * uniformScale
    const scaledHeight = worldHeight * uniformScale
    const offsetX = (containerRect.width - scaledWidth) / 2
    const offsetY = (containerRect.height - scaledHeight) / 2
    
    // Convert back to world coordinates
    const left = -1 - (offsetX / uniformScale)
    const right = 11 + (offsetX / uniformScale)
    const top = 8 + (offsetY / uniformScale)
    const bottom = -1 - (offsetY / uniformScale)

    const brd = JXG.JSXGraph.initBoard(containerRef.current, {
      boundingbox: [left, top, right, bottom],
      axis: false,
      showNavigation: false,
      showCopyright: false,
      grid: true,
      pan: { enabled: false },
      zoom: false,
      keepaspectratio: true
    }) as JBoard;

    boardRef.current = brd;

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
      try { JXG.JSXGraph.freeBoard(brd); } catch {}
      boardRef.current = null;
      givensRef.current = null;
    };
  }, [loading, error]); // 👈 key change

  // Create givens when question loads AND the board is ready
  useEffect(() => {
    if (loading || error) return;                 // wait until data phase is done
    if (!boardRef.current || !question) return;   // wait until board exists

    console.debug('Creating givens for question:', question.title, 'givens:', question.givens)

    // Clear any existing givens first
    if (givensRef.current) {
      Object.values(givensRef.current).forEach((obj: any) => {
        if (obj && typeof obj.removeObject === 'function') {
          try {
            boardRef.current!.removeObject(obj)
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
    } else {
      // Fallback: create default givens for the isosceles triangle problem
      console.debug('No givens data found, creating default givens for isosceles triangle problem')
      const q = boardRef.current!.create('line', [[0, 7], [10, 7]], {
        strokeColor: '#000', strokeWidth: 2,
        name: 'q', withLabel: true, fixed: true,
        label: { position: 'rt', offset: [10, 0] }
      })
      const S = boardRef.current!.create('point', [5, 5], {
        name: 'S', size: 3, strokeColor: '#000', fillColor: '#000', fixed: true, 
        label: { offset: [5, 10] }
      })
      const C = boardRef.current!.create('point', [4.5, 3], {
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
    if (boardRef.current) {
      boardRef.current.renderer.resize();
      boardRef.current.fullUpdate();
      console.debug('Board updated to display givens')
    }
    
    // Additional debugging
    console.debug('Board objects after givens creation:', Object.keys(boardRef.current!.objects))
  }, [question, loading, error]); // 👈 key change

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

