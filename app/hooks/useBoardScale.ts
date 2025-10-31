import { useCallback } from 'react'
import { calculateCenteredBoundingBoxCm } from '../../lib/measurement-scale'

export function useBoardScale(ref: React.RefObject<HTMLDivElement | null>) {
  const get = useCallback(() => {
    const box = ref.current?.closest('.jxgbox') as HTMLElement | null
    if (!box) {
      // Fallback with default bounding box
      const [left, top, right, bottom] = calculateCenteredBoundingBoxCm(800, 500)
      const unitsX = right - left
      const unitsY = top - bottom
      return { 
        pxPerUnitX: 50, 
        pxPerUnitY: 50, 
        uniformScale: 50,
        boardLeft: left,
        boardTop: top,
        boardRight: right,
        boardBottom: bottom,
        boardWidth: unitsX,
        boardHeight: unitsY
      }
    }
    
    const { width: w, height: h } = box.getBoundingClientRect()
    
    // Calculate bounding box in whole centimeters, centered at (0,0)
    const [left, top, right, bottom] = calculateCenteredBoundingBoxCm(w, h)
    const unitsX = right - left
    const unitsY = top - bottom
    
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
