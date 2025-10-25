import { useCallback } from 'react'

export function useBoardScale(ref: React.RefObject<HTMLDivElement | null>) {
  const get = useCallback(() => {
    const box = ref.current?.closest('.jxgbox') as HTMLElement | null
    if (!box) return { pxPerUnitX: 50, pxPerUnitY: 50 } // fallback
    
    const { width: w, height: h } = box.getBoundingClientRect()
    // Must match your board bounding box:
    const left = -1, top = 8, right = 11, bottom = -1
    const unitsX = right - left   // 12
    const unitsY = top - bottom   // 9
    
    return { pxPerUnitX: w / unitsX, pxPerUnitY: h / unitsY }
  }, [ref])
  
  return get
}
