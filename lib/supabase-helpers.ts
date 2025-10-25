import { supabase } from './supabase'

export interface Question {
  id: string
  code: string
  title: string
  prompt_md: string
  max_score: number
  givens: any
  constraints: any
  difficulty: number
  tags: string[]
  created_at: string
  updated_at: string
}

export interface Attempt {
  id: string
  question_id: string
  session_id: string
  state: any
  score?: number
  passed?: boolean
  feedback?: any
  student_id: string
  is_complete: boolean
  time_spent: number
  created_at: string
  updated_at: string
}

export interface Session {
  id: string
  user_id: string
  question_id: string
  session_data: any
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  name: string
  role: string
  created_at: string
  updated_at: string
}

// Question operations
export async function getQuestions(): Promise<Question[]> {
  const { data, error } = await supabase
    .from('gq_questions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getQuestion(id: string): Promise<Question | null> {
  const { data, error } = await supabase
    .from('gq_questions')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// User operations
export async function getOrCreateUser(email: string, name?: string): Promise<User> {
  // Try to get existing user
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (existingUser && !fetchError) {
    return existingUser
  }

  // Create new user if doesn't exist
  const { data: newUser, error: createError } = await supabase
    .from('users')
    .insert({
      email,
      name: name || email.split('@')[0],
      role: 'student'
    })
    .select()
    .single()

  if (createError) throw createError
  return newUser
}

// Session operations
export async function createSession(userId: string, questionId: string): Promise<Session> {
  const { data, error } = await supabase
    .from('sessions')
    .insert({
      user_id: userId,
      question_id: questionId,
      session_data: {},
      is_active: true
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateSession(sessionId: string, sessionData: any): Promise<void> {
  const { error } = await supabase
    .from('sessions')
    .update({ session_data: sessionData })
    .eq('id', sessionId)

  if (error) throw error
}

export async function endSession(sessionId: string): Promise<void> {
  const { error } = await supabase
    .from('sessions')
    .update({ is_active: false })
    .eq('id', sessionId)

  if (error) throw error
}

// Attempt operations
export async function createAttempt(
  questionId: string,
  sessionId: string,
  studentId: string
): Promise<Attempt> {
  const { data, error } = await supabase
    .from('gq_attempts')
    .insert({
      question_id: questionId,
      session_id: sessionId,
      state: {},
      student_id: studentId,
      is_complete: false,
      time_spent: 0
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateAttempt(
  attemptId: string,
  updates: Partial<Attempt>
): Promise<void> {
  const { error } = await supabase
    .from('gq_attempts')
    .update(updates)
    .eq('id', attemptId)

  if (error) throw error
}

export async function getAttemptsByUser(userId: string): Promise<Attempt[]> {
  const { data, error } = await supabase
    .from('gq_attempts')
    .select(`
      *,
      gq_questions (
        title,
        code,
        difficulty
      )
    `)
    .eq('student_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getAttemptsByQuestion(questionId: string): Promise<Attempt[]> {
  const { data, error } = await supabase
    .from('gq_attempts')
    .select(`
      *,
      sessions (
        user_id
      )
    `)
    .eq('question_id', questionId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// Sample question data for testing
export const sampleQuestions = [
  {
    code: 'TRIANGLE_001',
    title: 'Konstrukce rovnoramenného trojúhelníku',
    prompt_md: `
# Konstrukce rovnoramenného trojúhelníku

Sestrojte rovnoramenný trojúhelník ABC tak, aby:
- Bod C je vrchol trojúhelníku
- Bod S je střed ramene
- Základna AB leží na přímce q

## Postup:
1. Označte body A a B na přímce q
2. Sestrojte úsečky AC a BC
3. Ověřte, že AC = BC
    `,
    max_score: 3,
    givens: {
      points: {
        S: { x: 5, y: 5 },
        C: { x: 4.5, y: 3 }
      },
      lines: {
        q: { p1: { x: 0, y: 7 }, p2: { x: 10, y: 7 } }
      }
    },
    constraints: {
      requiredPoints: 2,
      requiredSegments: 3,
      minScore: 2
    },
    difficulty: 2,
    tags: ['trojúhelník', 'rovnoramenný', 'konstrukce']
  },
  {
    code: 'CIRCLE_001',
    title: 'Konstrukce kružnice procházející třemi body',
    prompt_md: `
# Konstrukce kružnice procházející třemi body

Sestrojte kružnici, která prochází body A, B a C.

## Postup:
1. Sestrojte osy úseček AB a BC
2. Najděte průsečík os - střed kružnice
3. Sestrojte kružnici se středem v průsečíku os
    `,
    max_score: 4,
    givens: {
      points: {
        A: { x: 2, y: 6 },
        B: { x: 6, y: 6 },
        C: { x: 4, y: 3 }
      }
    },
    constraints: {
      requiredPoints: 1,
      requiredLines: 2,
      requiredCircles: 1,
      minScore: 3
    },
    difficulty: 3,
    tags: ['kružnice', 'tři body', 'osy úseček']
  },
  {
    code: 'ANGLE_001',
    title: 'Konstrukce úhlu',
    prompt_md: `
# Konstrukce úhlu

Sestrojte úhel o velikosti 60° s vrcholem v bodě A a jedním ramenem na přímce p.

## Postup:
1. Označte bod B na přímce p
2. Sestrojte kružnici se středem A a poloměrem AB
3. Sestrojte druhé rameno úhlu
    `,
    max_score: 3,
    givens: {
      points: {
        A: { x: 3, y: 4 }
      },
      lines: {
        p: { p1: { x: 0, y: 4 }, p2: { x: 8, y: 4 } }
      }
    },
    constraints: {
      requiredPoints: 1,
      requiredLines: 1,
      requiredCircles: 1,
      minScore: 2
    },
    difficulty: 2,
    tags: ['úhel', '60°', 'konstrukce']
  }
]

// Function to seed the database with sample questions
export async function seedSampleQuestions(): Promise<void> {
  try {
    // Check if questions already exist
    const existingQuestions = await getQuestions()
    if (existingQuestions.length > 0) {
      console.log('Questions already exist, skipping seed')
      return
    }

    // Insert sample questions
    const { error } = await supabase
      .from('gq_questions')
      .insert(sampleQuestions)

    if (error) throw error
    console.log('Sample questions seeded successfully')
  } catch (err) {
    console.error('Error seeding questions:', err)
    throw err
  }
}
