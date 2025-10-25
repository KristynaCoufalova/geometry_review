'use client'

import React, { useState } from 'react'
import { Database, Plus, Trash2, RefreshCw, CheckCircle, XCircle } from 'lucide-react'
import { seedSampleQuestions, getQuestions } from '../../lib/supabase-helpers'

export default function AdminPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [questions, setQuestions] = useState<any[]>([])

  const handleSeedQuestions = async () => {
    try {
      setLoading(true)
      setMessage(null)
      await seedSampleQuestions()
      setMessage({ type: 'success', text: 'Ukázkové úlohy byly úspěšně přidány do databáze' })
      await loadQuestions()
    } catch (error) {
      console.error('Error seeding questions:', error)
      setMessage({ type: 'error', text: 'Chyba při přidávání úloh: ' + (error instanceof Error ? error.message : 'Neznámá chyba') })
    } finally {
      setLoading(false)
    }
  }

  const loadQuestions = async () => {
    try {
      setLoading(true)
      const data = await getQuestions()
      setQuestions(data)
    } catch (error) {
      console.error('Error loading questions:', error)
      setMessage({ type: 'error', text: 'Chyba při načítání úloh' })
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    loadQuestions()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="text-blue-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-800">Správa databáze</h1>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={handleSeedQuestions}
              disabled={loading}
              className="flex items-center gap-3 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={20} />
              <div className="text-left">
                <div className="font-semibold">Přidat ukázkové úlohy</div>
                <div className="text-sm opacity-90">Přidá ukázkové geometrické úlohy do databáze</div>
              </div>
            </button>

            <button
              onClick={loadQuestions}
              disabled={loading}
              className="flex items-center gap-3 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw size={20} />
              <div className="text-left">
                <div className="font-semibold">Obnovit seznam</div>
                <div className="text-sm opacity-90">Načte aktuální seznam úloh z databáze</div>
              </div>
            </button>
          </div>

          {/* Status Messages */}
          {message && (
            <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${
              message.type === 'success' 
                ? 'bg-green-50 border-l-4 border-green-500' 
                : 'bg-red-50 border-l-4 border-red-500'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="text-green-600" size={20} />
              ) : (
                <XCircle className="text-red-600" size={20} />
              )}
              <span className={message.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                {message.text}
              </span>
            </div>
          )}

          {/* Questions List */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Úlohy v databázi ({questions.length})
            </h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Načítání...</p>
              </div>
            ) : questions.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Žádné úlohy v databázi</p>
                <p className="text-sm text-gray-500 mt-2">
                  Klikněte na &quot;Přidat ukázkové úlohy&quot; pro přidání ukázkových úloh
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {questions.map((question) => (
                  <div key={question.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{question.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>Kód: {question.code}</span>
                          <span>Obtížnost: {'★'.repeat(question.difficulty)}</span>
                          <span>Max skóre: {question.max_score}</span>
                          <span>Tagy: {question.tags?.join(', ') || 'žádné'}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                          Vytvořeno: {new Date(question.created_at).toLocaleString('cs-CZ')}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          question.difficulty <= 2 ? 'bg-green-100 text-green-700' :
                          question.difficulty <= 3 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {question.difficulty <= 2 ? 'Snadná' :
                           question.difficulty <= 3 ? 'Střední' :
                           question.difficulty <= 4 ? 'Těžká' : 'Expertní'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
