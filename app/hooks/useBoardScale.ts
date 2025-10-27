import { useCallback } from 'react'

export function useBoardScale(ref: React.RefObject<HTMLDivElement | null>) {
  const get = useCallback(() => {
    const box = ref.current?.closest('.jxgbox') as HTMLElement | null
    if (!box) return { pxPerUnitX: 50, pxPerUnitY: 50, uniformScale: 50 } // fallback
    
    const { width: w, height: h } = box.getBoundingClientRect()
    // Must match your board bounding box:
    const left = -1, top = 8, right = 11, bottom = -1
    const unitsX = right - left   // 12
    const unitsY = top - bottom   // 9
    
    // Calculate uniform scale to maintain aspect ratio
    const scaleX = w / unitsX
    const scaleY = h / unitsY
    const uniformScale = Math.min(scaleX, scaleY)
    
    return { 
      pxPerUnitX: uniformScale, 
      pxPerUnitY: uniformScale, 
      uniformScale,
      boardLeft: left,
      boardTop: top,
      boardRight: right,
      boardBottom: bottom,
      boardWidth: unitsX,
      boardHeight: unitsY
    }
  }, [ref])
  
  return get
}
