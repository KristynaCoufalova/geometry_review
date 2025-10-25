'use client'

// app/page.tsx
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { BookOpen, Wrench } from 'lucide-react'

const GeometryConstructionTester = dynamic(
  () => import('@/components/GeometryConstructionTester'),
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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Geometrické testování
          </h1>
          <div className="grid md:grid-cols-2 gap-6">
            <Link 
              href="/geometry" 
              className="p-6 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="text-blue-600 group-hover:text-blue-700" size={24} />
                <h2 className="text-xl font-semibold text-gray-800">Konkrétní úloha</h2>
              </div>
              <p className="text-gray-600">
                Testování s konkrétní geometrickou úlohou - konstrukce rovnoramenného trojúhelníku
              </p>
            </Link>
            
            <Link 
              href="/general-testing" 
              className="p-6 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <Wrench className="text-green-600 group-hover:text-green-700" size={24} />
                <h2 className="text-xl font-semibold text-gray-800">Obecné testování</h2>
              </div>
              <p className="text-gray-600">
                Volné testovací pole pro geometrické konstrukce bez specifických požadavků
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
