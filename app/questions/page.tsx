'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, Clock, Target, BookOpen } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface Question {
  id: string
  code: string
  title: string
  prompt_md: string
  max_score: number
  difficulty: number
  tags: string[]
  created_at: string
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('gq_questions')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setQuestions(data || [])
      } catch (err) {
        console.error('Error loading questions:', err)
        setError(err instanceof Error ? err.message : 'Failed to load questions')
      } finally {
        setLoading(false)
      }
    }

    loadQuestions()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Načítání úloh...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
            >
              <ArrowLeft size={18} />
              Zpět
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Geometrické úlohy</h1>
              <p className="text-gray-600">Vyberte si úlohu k řešení</p>
            </div>
          </div>
        </div>

        {/* Questions Grid */}
        {questions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Žádné úlohy</h2>
            <p className="text-gray-500">V databázi nejsou k dispozici žádné úlohy.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questions.map((question) => (
              <Link
                key={question.id}
                href={`/questions/${question.id}`}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {question.title}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < question.difficulty ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Target size={14} />
                    {question.max_score} bodů
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {question.difficulty === 1 ? 'Snadná' : 
                     question.difficulty === 2 ? 'Střední' :
                     question.difficulty === 3 ? 'Těžká' :
                     question.difficulty === 4 ? 'Velmi těžká' : 'Expertní'}
                  </span>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: question.prompt_md.length > 100 
                        ? question.prompt_md.substring(0, 100) + '...'
                        : question.prompt_md 
                    }}
                  />
                </div>

                {question.tags && question.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {question.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {question.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{question.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="text-sm text-gray-500">
                  Kód: {question.code}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
