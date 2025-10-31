'use client'

// lib/file-io.ts
// Browser-only file I/O helpers (no DOM operations in board-serializer)

export async function readJsonFile<T=any>(file: File): Promise<T> {
  const text = await file.text()
  return JSON.parse(text) as T
}

export function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

