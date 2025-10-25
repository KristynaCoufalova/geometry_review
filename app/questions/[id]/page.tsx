'use client'

import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'

const QuestionBasedTester = dynamic(
  () => import('../../components/QuestionBasedTester'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-6xl w-full">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
            <p className="text-center text-gray-600 mt-4">Načítání geometrického editoru...</p>
          </div>
        </div>
      </div>
    )
  }
)

export default function QuestionPage() {
  const params = useParams()
  const questionId = params.id as string
  const { user } = useAuth()

  const handleBack = () => {
    window.history.back()
  }

  // Use authenticated user ID if available, otherwise fall back to anonymous
  const studentId = user?.id || 'anonymous'

  return (
    <QuestionBasedTester 
      questionId={questionId}
      studentId={studentId}
      onBack={handleBack}
    />
  )
}
