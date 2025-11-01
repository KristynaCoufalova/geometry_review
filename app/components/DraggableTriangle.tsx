'use client'

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useBoardScale } from '../hooks/useBoardScale'

interface DraggableTriangleProps {
  x: number
  y: number
  rotation: number
  size: number
  type: '45-45-90' | '30-60-90'
  onPositionChange: (x: number, y: number, rotation: number, size: number) => void
  isActive: boolean
  onActivate: () => void
  onUiBusyChange: (busy: boolean) => void
}

export default function DraggableTriangle({
  x,
  y,
  rotation,
  size,
  type,
  onPositionChange,
  isActive,
  onActivate,
  onUiBusyChange
}: DraggableTriangleProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isRotatingResizing, setIsRotatingResizing] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [rotateResizeStart, setRotateResizeStart] = useState({ 
    x: 0, 
    y: 0, 
    rotation: 0, 
    size: 0, 
    initialMouseX: 0,
    initialMouseY: 0,
    pivotScreen: { x: 0, y: 0 },
    initialHandleAngle: 0,
    initialHandleDistance: 0
  })
  const triangleRef = useRef<HTMLDivElement>(null)
  
  // Refs to avoid state lag
  const isGlueActiveRef = useRef(false)
  const lastPointerIdRef = useRef<number | null>(null)
  const dragModeRef = useRef<'move' | 'glue' | null>(null)
  const dragOffsetRef = useRef({ dx: 0, dy: 0 }) // for move (drag) only
  const rafIdRef = useRef<number | null>(null)
  const glueCalibRef = useRef<{ 
    k: number; 
    rotationOffset: number; 
    localAngleDeg: number;
    initialMouseR: number;  // Initial mouse distance from pivot
    initialSize: number;     // Initial size
    initialRotation: number; // Initial rotation
  } | null>(null)
  const getScale = useBoardScale(triangleRef)
  const { pxPerUnitX, pxPerUnitY } = getScale()
  const pxPerUnit = Math.min(pxPerUnitX, pxPerUnitY)
  
  // Pivot offset: the right-angle vertex sits at (50, 50) in wrapper coords
  // due to SVG offset of (-50, -50), matching where (0, 0) in SVG coords is
  const PIVOT_OFFSET = { x: 50, y: 50 }

  // Memoized coordinate conversion functions for better performance
  const coordinateConverter = useMemo(() => {
    const scaleInfo = getScale()
    const { boardLeft, boardTop, boardRight, boardBottom, boardWidth, boardHeight } = scaleInfo
    
    return {
      boardToScreen: (boardX: number, boardY: number) => {
        // Get actual container dimensions
        const container = triangleRef.current?.closest('.jxgbox') as HTMLElement
        const containerWidth = container?.offsetWidth || 800
        const containerHeight = container?.offsetHeight || 500
        
        const screenX = ((boardX - boardLeft) / boardWidth) * containerWidth
        const screenY = containerHeight - ((boardY - boardBottom) / boardHeight) * containerHeight
        
        return { x: screenX, y: screenY }
      },
      screenToBoard: (screenX: number, screenY: number) => {
        const container = triangleRef.current?.closest('.jxgbox') as HTMLElement
        const containerWidth = container?.offsetWidth || 800
        const containerHeight = container?.offsetHeight || 500
        
        const boardX = (screenX / containerWidth) * boardWidth + boardLeft
        const boardY = boardTop - (screenY / containerHeight) * boardHeight
        
        return { x: boardX, y: boardY }
      }
    }
  }, [getScale])

  const boardToScreen = coordinateConverter.boardToScreen
  const screenToBoard = coordinateConverter.screenToBoard

  // Helper functions for rotation with gain
  const shortestDelta = (a: number, b: number) => {
    return ((b - a + 540) % 360) - 180
  }

  const angleDeg = (px: number, py: number, mx: number, my: number) => {
    return Math.atan2(my - py, mx - px) * 180 / Math.PI
  }

  const clamp = (v: number, lo: number, hi: number) => {
    return Math.max(lo, Math.min(hi, v))
  }

  // Calculate screen position with state to ensure it updates after mount
  const [screenPos, setScreenPos] = useState(() => {
    const pos = boardToScreen(x, y)
    // Ensure valid numbers
    return {
      x: isNaN(pos.x) ? 0 : pos.x,
      y: isNaN(pos.y) ? 0 : pos.y
    }
  })

  // Update screen position when coordinates or scale changes
  useEffect(() => {
    const pos = boardToScreen(x, y)
    // Ensure valid numbers
    setScreenPos({
      x: isNaN(pos.x) ? 0 : pos.x,
      y: isNaN(pos.y) ? 0 : pos.y
    })
  }, [x, y, boardToScreen])

  // Ensure position is recalculated after mount when ref is ready
  useEffect(() => {
    // Use a small timeout to ensure the DOM is fully mounted
    const timeoutId = setTimeout(() => {
      if (triangleRef.current) {
        const pos = boardToScreen(x, y)
        // Ensure valid numbers
        setScreenPos({
          x: isNaN(pos.x) ? 0 : pos.x,
          y: isNaN(pos.y) ? 0 : pos.y
        })
      }
    }, 0)
    return () => clearTimeout(timeoutId)
  }, [boardToScreen, x, y])

  // Smooth movement without grid snapping
  const smoothPosition = (boardX: number, boardY: number) => {
    return { x: boardX, y: boardY }
  }

  // Calculate handle position in screen coordinates for given size and rotation
  const getHandleScreenPosition = useCallback((sizeValue: number, rotationValue: number) => {
    // Calculate handle position in triangle's local coordinate system (SVG coords)
    const basePxLocal = sizeValue * pxPerUnit
    const heightPxLocal = type === '45-45-90' ? basePxLocal : basePxLocal * Math.sqrt(3) / 2
    const hypMidXLocal = basePxLocal / 2
    const hypMidYLocal = heightPxLocal / 2
    
    // Handle offset in SVG coordinates (relative to right-angle vertex at 0,0)
    const handleXLocal = 1.35 * hypMidXLocal - basePxLocal * 0.2
    const handleYLocal = 1.35 * hypMidYLocal - heightPxLocal * 0.2
    
    // Rotate the handle position by rotationValue degrees
    const rotationRad = (rotationValue * Math.PI) / 180
    const cosR = Math.cos(rotationRad)
    const sinR = Math.sin(rotationRad)
    const rotatedX = handleXLocal * cosR - handleYLocal * sinR
    const rotatedY = handleXLocal * sinR + handleYLocal * cosR
    
    // Convert to board coordinates (handle is in pixels, convert to units)
    const handleBoardX = x + rotatedX / pxPerUnit
    const handleBoardY = y + rotatedY / pxPerUnit
    
    // Convert to screen coordinates
    return boardToScreen(handleBoardX, handleBoardY)
  }, [pxPerUnit, type, x, y, boardToScreen])

  // Distance from pivot to the handle for a given size (in *pixels*)
  const handleDistanceForSize = useCallback((s: number) => {
    const base = s * pxPerUnit
    const height = type === '45-45-90' ? base : base * Math.sqrt(3) / 2
    const localHandleX = 1.35 * (base / 2) - base * 0.2
    const localHandleY = 1.35 * (height / 2) - height * 0.2
    return Math.hypot(localHandleX, localHandleY)
  }, [pxPerUnit, type])

  // Angle (deg) of the handle in local (unrotated) coords for a given size
  const handleLocalAngleForSize = useCallback((s: number) => {
    const base = s * pxPerUnit
    const h = type === '45-45-90' ? base : base * Math.sqrt(3) / 2
    const localHandleX = 1.35 * (base / 2) - base * 0.2
    const localHandleY = 1.35 * (h / 2) - h * 0.2
    return Math.atan2(localHandleY, localHandleX) * (180 / Math.PI)
  }, [pxPerUnit, type])

  // Clamp size to your current min/max "height" constraints
  const clampSizeByHeight = useCallback((s: number) => {
    const heightFrom = (ss: number) => (type === '45-45-90' ? ss : ss * Math.sqrt(3) / 2)
    const minH = 3
    const maxH = 10
    const h0 = heightFrom(s)
    if (h0 < minH) return (type === '45-45-90') ? minH : minH / (Math.sqrt(3) / 2)
    if (h0 > maxH) return (type === '45-45-90') ? maxH : maxH / (Math.sqrt(3) / 2)
    return s
  }, [type])

  // Clamp size strictly (for use on release only)
  const clampSizeByHeightStrict = useCallback((s: number) => {
    const heightFrom = (ss: number) => (type === '45-45-90' ? ss : ss * Math.sqrt(3) / 2)
    const minH = 3
    const maxH = 10
    const h = heightFrom(s)
    if (h < minH) return (type === '45-45-90') ? minH : minH / (Math.sqrt(3) / 2)
    if (h > maxH) return (type === '45-45-90') ? maxH : maxH / (Math.sqrt(3) / 2)
    return s
  }, [type])

  // Local handle vector in *unrotated* SVG coords for a given size (in px)
  const handleLocalVecPx = useCallback((sizePx: number, is454590: boolean) => {
    const base = sizePx
    const height = is454590 ? base : base * Math.sqrt(3) / 2
    const vx = 1.35 * (base / 2) - base * 0.2
    const vy = 1.35 * (height / 2) - height * 0.2
    return { vx, vy }
  }, [])

  // Length and angle (deg) of that vector. Angle is size-invariant (vx,vy scale by size).
  const handleLocalPolar = useCallback((sizePx: number, is454590: boolean) => {
    const { vx, vy } = handleLocalVecPx(sizePx, is454590)
    const r = Math.hypot(vx, vy)
    const a = Math.atan2(vy, vx) * 180 / Math.PI
    return { r, a }
  }, [handleLocalVecPx])

  // Pointer down handler - replaces mouse/touch handlers
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const target = e.target as HTMLElement
    if (target.setPointerCapture) {
      target.setPointerCapture(e.pointerId)
    }
    lastPointerIdRef.current = e.pointerId
    onActivate()
    onUiBusyChange(true)

    const isHandle = target.classList.contains('rotate-resize-handle') || !!target.closest('.rotate-resize-handle')

    if (isHandle) {
      // --- GLUE start: Store initial state ---
      const pivot = boardToScreen(x, y)
      
      // Where the mouse actually is right now
      const dx = e.clientX - pivot.x
      const dy = e.clientY - pivot.y
      const initialMouseR = Math.hypot(dx, dy)
      const mouseAngle = Math.atan2(dy, dx) * 180 / Math.PI
      
      // Handle geometry at current size
      const handleR = handleDistanceForSize(size)
      const localHandleAngleDeg = handleLocalAngleForSize(size)

      // k calibration: we want the formula newSize = initialSize + k * (mouseR - initialMouseR)
      // At initialMouseR, we want initialSize (deltaR = 0), so newSize = initialSize ✓
      // For proportional scaling: newSize = initialSize * (mouseR / initialMouseR)
      // = initialSize + initialSize * (mouseR / initialMouseR - 1)
      // = initialSize + initialSize * (mouseR - initialMouseR) / initialMouseR
      // So: k = initialSize / initialMouseR
      const k = size / (initialMouseR || 1)

      // Rotation calibration
      const rotationOffset = rotation - (mouseAngle - localHandleAngleDeg)

      glueCalibRef.current = { 
        k, 
        rotationOffset, 
        localAngleDeg: localHandleAngleDeg,
        initialMouseR,        // Store where we started
        initialSize: size,    // Store initial size
        initialRotation: rotation  // Store initial rotation
      }

      dragModeRef.current = 'glue'
      isGlueActiveRef.current = true
      setIsRotatingResizing(true)

    } else {
      // --- MOVE: drag whole triangle; remember offset in screen space ---
      const startLeft = screenPos.x
      const startTop = screenPos.y
      dragOffsetRef.current = { dx: e.clientX - startLeft, dy: e.clientY - startTop }
      if (isDragging) setIsDragging(false) // ensure React state not fighting us
      dragModeRef.current = 'move'
    }

    // Start listening
    setIsDragging(true)
  }

  // Global pointer move (single source of truth), + requestAnimationFrame
  const onPointerMoveDoc = useCallback((e: PointerEvent) => {
    if (!isDragging || !dragModeRef.current) return

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    rafIdRef.current = requestAnimationFrame(() => {
      if (dragModeRef.current === 'move') {
        const { dx, dy } = dragOffsetRef.current
        const newScreenX = e.clientX - dx
        const newScreenY = e.clientY - dy
        const pos = screenToBoard(newScreenX, newScreenY)
        onPositionChange(pos.x, pos.y, rotation, size)
      } else if (dragModeRef.current === 'glue') {
        const pivot = boardToScreen(x, y)
        const dx = e.clientX - pivot.x
        const dy = e.clientY - pivot.y
        const mouseAngle = Math.atan2(dy, dx) * 180 / Math.PI
        const mouseR = Math.hypot(dx, dy)

        const calib = glueCalibRef.current
        if (!calib) return

        // Calculate relative to where we started
        const deltaR = mouseR - calib.initialMouseR
        const newSize = calib.initialSize + calib.k * deltaR
        
        // Recalculate local angle for the new size
        const newLocalAngle = handleLocalAngleForSize(newSize)
        const newRotation = (mouseAngle - newLocalAngle) + calib.rotationOffset

        onPositionChange(x, y, newRotation, newSize)
      }
    })
  }, [isDragging, x, y, screenToBoard, boardToScreen, onPositionChange, rotation, size, handleLocalAngleForSize])

  // Pointer up: stop, then clamp once
  const onPointerUpDoc = useCallback((e: PointerEvent) => {
    if (!isDragging) return

    // Clamp only once at the end if we were glue-dragging
    if (dragModeRef.current === 'glue') {
      const clamped = clampSizeByHeightStrict(size)
      if (clamped !== size) {
        // Keep current rotation, only snap size to limit
        onPositionChange(x, y, rotation, clamped)
      }
    }

    isGlueActiveRef.current = false
    dragModeRef.current = null
    glueCalibRef.current = null // Clear calibration
    setIsDragging(false)
    setIsRotatingResizing(false)
    onUiBusyChange(false)

    if (lastPointerIdRef.current != null && triangleRef.current) {
      triangleRef.current.releasePointerCapture?.(lastPointerIdRef.current)
    }
  }, [isDragging, clampSizeByHeightStrict, size, rotation, x, y, onPositionChange, onUiBusyChange])

  useEffect(() => {
    if (!isDragging) return
    const move = (e: PointerEvent) => onPointerMoveDoc(e)
    const up = (e: PointerEvent) => onPointerUpDoc(e)
    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerup', up, { passive: true })
    return () => {
      document.removeEventListener('pointermove', move as any)
      document.removeEventListener('pointerup', up as any)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [isDragging, onPointerMoveDoc, onPointerUpDoc])

  // ResizeObserver to handle container size changes
  useEffect(() => {
    const el = triangleRef.current?.closest('.jxgbox')
    if (!el) return
    
    const ro = new ResizeObserver(() => {
      // Recalculate screen position when container resizes
      const pos = boardToScreen(x, y)
      setScreenPos({
        x: isNaN(pos.x) ? 0 : pos.x,
        y: isNaN(pos.y) ? 0 : pos.y
      })
      // Force a light refresh by updating dragStart state
      setDragStart(s => ({ ...s }))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [x, y, boardToScreen])

  // Generate triangle points based on type
  const getTrianglePoints = () => {
    const screenSize = size * pxPerUnit
    const halfSize = screenSize / 2
    
    if (type === '45-45-90') {
      // Right triangle with 45-45-90 angles
      return [
        { x: 0, y: 0 },           // Right angle vertex
        { x: screenSize, y: 0 },  // Bottom right
        { x: 0, y: screenSize }   // Top left
      ]
    } else {
      // Right triangle with 30-60-90 angles
      const height = screenSize * Math.sqrt(3) / 2
      return [
        { x: 0, y: 0 },           // Right angle vertex
        { x: screenSize, y: 0 },  // Bottom right
        { x: 0, y: height }       // Top left (60° angle)
      ]
    }
  }

  // Generate enhanced ruler markings as SVG elements matching the detailed specifications
  const renderRulerMarkingsSvg = () => {
    const screenSize = size * pxPerUnit
    const pxPerCm = pxPerUnit // 1 cm = pxPerUnit pixels
    const verticalLength = type === '45-45-90' ? screenSize : (screenSize * Math.sqrt(3)) / 2
    const maxCm = Math.min(16, Math.floor(size)) // Use floor to stop at or before actual size
    const maxVerticalCm = Math.min(16, Math.floor(type === '45-45-90' ? size : size * Math.sqrt(3) / 2))

    // Horizontal ruler (bottom edge) - 0 to maxCm
    const horizontalTicks: React.ReactNode[] = []
    for (let cm = 0; cm <= maxCm; cm++) {
      const x = cm * pxPerCm
      const isFive = cm % 5 === 0
      const majorLen = isFive ? 18 : 12 // Length of tick mark
      
      // Main centimeter tick mark
      horizontalTicks.push(
        <rect
          key={`h-cm-${cm}`}
          x={x - 0.75}
          y={0}
          width={1.5}
          height={majorLen}
          fill="#000"
        />
      )
      
      // Number labels will be handled separately as HTML elements
      
      // Millimeter marks (9 small ticks between each centimeter)
      if (cm < maxCm) {
        for (let mm = 1; mm < 10; mm++) {
          const xx = x + (pxPerCm * mm) / 10
          const mmLen = mm === 5 ? 8 : 5 // 5mm mark is longer
          
          horizontalTicks.push(
            <rect
              key={`h-mm-${cm}-${mm}`}
              x={xx - 0.5}
              y={0}
              width={1}
              height={mmLen}
              fill="#000"
              opacity="0.75"
            />
          )
        }
      }
    }

    // Add millimeter marks between last whole centimeter and final size value
    if (size % 1 !== 0) {
      const lastWholeCm = Math.floor(size)
      const finalX = size * pxPerCm
      
      // Add millimeter marks from last whole cm to final size
      for (let mm = 1; mm <= Math.floor((size - lastWholeCm) * 10); mm++) {
        const xx = (lastWholeCm + mm / 10) * pxPerCm
        const mmLen = mm === 5 ? 8 : 5 // 5mm mark is longer
        
        horizontalTicks.push(
          <rect
            key={`h-mm-final-${mm}`}
            x={xx - 0.5}
            y={0}
            width={1}
            height={mmLen}
            fill="#000"
            opacity="0.75"
          />
        )
      }
      
      // Add final marking at exact size value
      horizontalTicks.push(
        <rect
          key={`h-cm-final`}
          x={finalX - 0.75}
          y={0}
          width={1.5}
          height={12}
          fill="#000"
        />
      )
    }

    // Vertical ruler (left edge) - 0 to maxVerticalCm
    const verticalTicks: React.ReactNode[] = []
    for (let cm = 0; cm <= maxVerticalCm; cm++) {
      const y = cm * pxPerCm
      const isFive = cm % 5 === 0
      const majorLen = isFive ? 18 : 12 // Length of tick mark
      
      // Main centimeter tick mark (extends LEFT from the edge)
      verticalTicks.push(
        <rect
          key={`v-cm-${cm}`}
          x={-majorLen}
          y={y - 0.75}
          width={majorLen}
          height={1.5}
          fill="#000"
        />
      )
      
      // No number labels on the vertical ruler (left side)
      
      // Millimeter marks (9 small ticks between each centimeter)
      if (cm < maxVerticalCm) {
        for (let mm = 1; mm < 10; mm++) {
          const yy = y + (pxPerCm * mm) / 10
          const mmLen = mm === 5 ? 8 : 5 // 5mm mark is longer
          
          verticalTicks.push(
            <rect
              key={`v-mm-${cm}-${mm}`}
              x={-mmLen}
              y={yy - 0.5}
              width={mmLen}
              height={1}
              fill="#000"
              opacity="0.75"
            />
          )
        }
      }
    }

    // Add millimeter marks between last whole centimeter and final height value
    const actualHeight = type === '45-45-90' ? size : size * Math.sqrt(3) / 2
    if (actualHeight % 1 !== 0) {
      const lastWholeCm = Math.floor(actualHeight)
      const finalY = actualHeight * pxPerCm
      
      // Add millimeter marks from last whole cm to final height
      for (let mm = 1; mm <= Math.floor((actualHeight - lastWholeCm) * 10); mm++) {
        const yy = (lastWholeCm + mm / 10) * pxPerCm
        const mmLen = mm === 5 ? 8 : 5 // 5mm mark is longer
        
        verticalTicks.push(
          <rect
            key={`v-mm-final-${mm}`}
            x={-mmLen}
            y={yy - 0.5}
            width={mmLen}
            height={1}
            fill="#000"
            opacity="0.75"
          />
        )
      }
      
      // Add final marking at exact height value
      verticalTicks.push(
        <rect
          key={`v-cm-final`}
          x={-12}
          y={finalY - 0.75}
          width={12}
          height={1.5}
          fill="#000"
        />
      )
    }

    return (
      <g>
        {/* Origin label with "0" */}
        <text x={4} y={-8} fontSize="11" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#000">0</text>
        
        {/* Bottom edge ruler (horizontal) */}
        <g transform={`translate(${points[0]?.x || 0},${points[0]?.y || 0})`}>
          {horizontalTicks}
        </g>
        
        {/* Left edge ruler (vertical) */}
        <g transform={`translate(${points[0]?.x || 0},${points[0]?.y || 0})`}>
          {verticalTicks}
        </g>
      </g>
    )
  }

  const points = getTrianglePoints()
  const pathData = `M ${points[0]?.x || 0} ${points[0]?.y || 0} L ${points[1]?.x || 0} ${points[1]?.y || 0} L ${points[2]?.x || 0} ${points[2]?.y || 0} Z`

  // Calculate triangle dimensions for dynamic handle positioning
  const basePx = size * pxPerUnit
  const heightPx = type === '45-45-90' ? basePx : basePx * Math.sqrt(3) / 2
  
  // Calculate hypotenuse midpoint (relative to SVG origin at 50, 50)
  const hypMidX = basePx / 2
  const hypMidY = heightPx / 2
  
  // Calculate handle position using the same function used in drag calculations
  const { vx, vy } = handleLocalVecPx(basePx, type === '45-45-90')

  // Derived geometry for inner triangular cutouts (proportional to size)
  const baseLength = size * pxPerUnit
  const verticalLength = type === '45-45-90' ? baseLength : (baseLength * Math.sqrt(3)) / 2
  // Diagonal unit direction (ux, uy) from right-angle vertex and its origin point
  const origin = { x: points[0]?.x || 0, y: points[0]?.y || 0 }
  const mDiag = verticalLength / baseLength
  const len = Math.sqrt(1 + mDiag * mDiag)
  const ux = 1 / len
  const uy = mDiag / len
  // Reflect a point across the diagonal line through origin with unit direction (ux, uy)
  const reflectAcrossDiagonal = (px: number, py: number) => {
    const rx = px - origin.x
    const ry = py - origin.y
    const dot = rx * ux + ry * uy
    const rpx = 2 * dot * ux - rx
    const rpy = 2 * dot * uy - ry
    return { x: origin.x + rpx, y: origin.y + rpy }
  }
  
  // Construct cutouts similar to the two half-triangles split by the diagonal
  // Unit normal to diagonal
  const nx = -uy
  const ny = ux
  // Hypotenuse unit direction (from top-left to bottom-right corner)
  const hypX = baseLength
  const hypY = -verticalLength
  const hypLen = Math.hypot(hypX, hypY) || 1
  const hx = hypX / hypLen
  const hy = hypY / hypLen
  // Length of diagonal segment OM (origin to hypotenuse midpoint)
  const OMlen = 0.5 * Math.hypot(baseLength, verticalLength)
  // Choose base length along diagonal as a fraction of OM
  const L = OMlen * 0.7
  // Position along diagonal from origin and small gap offset
  const tAlong = OMlen * 0.55
  const gap = Math.max(-11, -baseLength * 0.12) // increased perpendicular offset from diagonal; no rotation or along-diagonal change

  // First cutout (similar to triangle O-P1-M): base parallel to diagonal, other sides // x-axis and // hypotenuse
  const c1x = origin.x + ux * tAlong + nx * gap
  const c1y = origin.y + uy * tAlong + ny * gap
  const a1 = { x: c1x - (L / 2) * ux, y: c1y - (L / 2) * uy }
  const b1 = { x: c1x + (L / 2) * ux, y: c1y + (L / 2) * uy }
  // Apex c1 is intersection of: line through a1 parallel to x-axis and line through b1 parallel to hypotenuse
  const s1 = (a1.y - b1.y) / (hy || 1e-6)
  const c1 = { x: b1.x + s1 * hx, y: b1.y + s1 * hy }
  const cut1 = `M ${a1.x} ${a1.y} L ${b1.x} ${b1.y} L ${c1.x} ${c1.y} Z`

  // Second cutout is mirror image of the first across the diagonal (perfect symmetry)
  const a2r = reflectAcrossDiagonal(a1.x, a1.y)
  const b2r = reflectAcrossDiagonal(b1.x, b1.y)
  const c2r = reflectAcrossDiagonal(c1.x, c1.y)
  const cut2 = `M ${a2r.x} ${a2r.y} L ${b2r.x} ${b2r.y} L ${c2r.x} ${c2r.y} Z`

  // Diagonal from right-angle vertex to the midpoint of the hypotenuse
  const hypMid = {
    x: ((points[1]?.x || 0) + (points[2]?.x || 0)) / 2,
    y: ((points[1]?.y || 0) + (points[2]?.y || 0)) / 2
  }

  return (
    <div
      ref={triangleRef}
      className={`absolute select-none group ${isActive ? 'z-50' : 'z-40'}`}
      style={{
        // (x,y) is the right-angle vertex in BOARD coords.
        // Place the wrapper so that this vertex lands at the wrapper's transform origin.
        left: screenPos.x - PIVOT_OFFSET.x,
        top: screenPos.y - PIVOT_OFFSET.y,
        // rotate around the right-angle vertex
        transform: `rotate(${rotation}deg)`,
        transformOrigin: `${-PIVOT_OFFSET.x}px ${-PIVOT_OFFSET.y}px`,
        // Debug: add background to see hover area
        backgroundColor: isHovering ? 'rgba(255, 0, 0, 0.1)' : 'transparent'
      }}
      onPointerDown={onPointerDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Triangle SVG */}
      <div className="relative" style={{ pointerEvents: 'auto' }}>
        <svg
          width={size * pxPerUnit + 100}
          height={type === '45-45-90' ? size * pxPerUnit + 100 : size * pxPerUnit * Math.sqrt(3) / 2 + 100}
          className="absolute"
          style={{ left: -50, top: -50, pointerEvents: 'auto' }}
        >
          <defs>
            {/* Main plastic gradient with enhanced depth and contrast */}
            <linearGradient id={`plasticGradient-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="15%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="50%" stopColor="rgba(240,245,250,0.1)" />
              <stop offset="70%" stopColor="rgba(200,210,220,0.15)" />
              <stop offset="85%" stopColor="rgba(150,160,170,0.2)" />
              <stop offset="100%" stopColor="rgba(100,110,120,0.25)" />
            </linearGradient>

            {/* Secondary highlight gradient for more realistic plastic look */}
            <linearGradient id={`highlightGradient-${type}`} x1="0%" y1="0%" x2="60%" y2="40%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="60%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>

            {/* Shadow gradient for depth */}
            <linearGradient id={`shadowGradient-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <stop offset="50%" stopColor="rgba(0,0,0,0.05)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
            </linearGradient>

            {/* Enhanced drop shadow with more depth and realism */}
            <filter id={`softShadow-${type}`} x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#000" floodOpacity="0.3" />
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.2" />
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.1" />
            </filter>

            {/* Enhanced inner shadow for cutout edges with more depth */}
            <filter id={`innerShadow-${type}`} x="-50%" y="-50%" width="200%" height="200%">
              <feFlood floodColor="#000" floodOpacity="0.2" result="flood"/>
              <feComposite in="flood" in2="SourceGraphic" operator="in" result="composite"/>
              <feGaussianBlur in="composite" stdDeviation="3" result="blur"/>
              <feOffset in="blur" dx="2" dy="2" result="offset"/>
              <feComposite in="offset" in2="SourceGraphic" operator="over"/>
            </filter>

            {/* Additional depth shadow for inner cutouts */}
            <filter id={`deepInnerShadow-${type}`} x="-50%" y="-50%" width="200%" height="200%">
              <feFlood floodColor="#000" floodOpacity="0.15" result="flood"/>
              <feComposite in="flood" in2="SourceGraphic" operator="in" result="composite"/>
              <feGaussianBlur in="composite" stdDeviation="5" result="blur"/>
              <feOffset in="blur" dx="3" dy="3" result="offset"/>
              <feComposite in="offset" in2="SourceGraphic" operator="over"/>
            </filter>
            
            {/* Glow effect for active state */}
            <filter id={`glow-${type}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Create mask for main triangle with inner cutouts as holes */}
            <mask id={`triangle-mask-${type}`}>
              {/* Reveal main triangle */}
              <path d={pathData} fill="white" />
              {/* Hide inner similar triangles to make them transparent */}
              <path d={cut1} fill="black" />
              <path d={cut2} fill="black" />
            </mask>
          </defs>
          
          {/* Triangle plastic look: base fill, shine gradient overlay, and stroke */}
          <g filter={isActive ? `url(#glow-${type})` : `url(#softShadow-${type})`}>
            {/* Base fill with enhanced opacity for better depth */}
            <path d={pathData} fill="rgba(240,245,250,0.25)" mask={`url(#triangle-mask-${type})`} />
            {/* Shadow gradient for depth */}
            <path d={pathData} fill={`url(#shadowGradient-${type})`} mask={`url(#triangle-mask-${type})`} />
            {/* Main plastic gradient overlay */}
            <path d={pathData} fill={`url(#plasticGradient-${type})`} mask={`url(#triangle-mask-${type})`} />
            {/* Highlight gradient for realistic plastic shine */}
            <path d={pathData} fill={`url(#highlightGradient-${type})`} mask={`url(#triangle-mask-${type})`} />
            {/* Enhanced outline with subtle inner shadow */}
            <path d={pathData} fill="none" stroke="#000000" strokeWidth="2.5"/>
          </g>

          {/* Internal diagonal (median to hypotenuse) */}
          <line
            x1={origin.x}
            y1={origin.y}
            x2={hypMid.x}
            y2={hypMid.y}
            stroke="#000000"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          
          {/* Right angle indicator with 90° label - properly aligned */}
          <path
            d={`M ${(points[0]?.x || 0) + 6} ${points[0]?.y || 0} L ${(points[0]?.x || 0) + 6} ${(points[0]?.y || 0) + 6} L ${points[0]?.x || 0} ${(points[0]?.y || 0) + 6}`}
            fill="none"
            stroke="#000000"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          
          {/* 90° text label - properly positioned */}
          <text
            x={(points[0]?.x || 0) + 10}
            y={(points[0]?.y || 0) + 3}
            fontSize="8"
            fill="#000000"
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
          >
            90°
          </text>

          {/* Inner similar triangles as transparent holes: stroke only with enhanced inner shadows */}
          <path d={cut1} fill="none" stroke="#000000" strokeWidth="1.2" filter={`url(#deepInnerShadow-${type})`} />
          <path d={cut2} fill="none" stroke="#000000" strokeWidth="1.2" filter={`url(#deepInnerShadow-${type})`} />
          {/* Additional inner shadow layer for more depth */}
          <path d={cut1} fill="none" stroke="#000000" strokeWidth="1.2" filter={`url(#innerShadow-${type})`} />
          <path d={cut2} fill="none" stroke="#000000" strokeWidth="1.2" filter={`url(#innerShadow-${type})`} />
          {/* SVG ruler markings glued to the right-angle corner */}
          {renderRulerMarkingsSvg()}
        </svg>
        
        {/* Ruler numbers - positioned as HTML elements like in the ruler component */}
        {(() => {
          const screenSize = size * pxPerUnit
          const pxPerCm = pxPerUnit
          const maxCm = Math.min(16, Math.floor(size)) // Use floor to stop at or before actual size
          const numbers = []
          
          for (let cm = 1; cm <= maxCm; cm++) {
            const x = cm * pxPerCm
            const isFive = cm % 5 === 0
            
            numbers.push(
              <div
                key={`h-number-${cm}`}
                className="absolute text-xs text-gray-800 font-mono"
                style={{
                  left: x - 50, // Account for SVG container offset
                  top: -65, // Position well above the triangle
                  transform: 'translateX(-50%)',
                  fontWeight: isFive ? 'bold' : 'normal',
                  fontSize: '11px',
                  fontFamily: 'Arial, sans-serif',
                  pointerEvents: 'none'
                }}
              >
                {cm}
              </div>
            )
          }

          // Add final number at exact size value (only if not a whole number)
          if (size % 1 !== 0) {
            const finalX = size * pxPerCm
            numbers.push(
              <div
                key={`h-number-final`}
                className="absolute text-xs text-gray-800 font-mono"
                style={{
                  left: finalX - 50, // Account for SVG container offset
                  top: -65, // Position well above the triangle
                  transform: 'translateX(-50%)',
                  fontWeight: 'normal',
                  fontSize: '11px',
                  fontFamily: 'Arial, sans-serif',
                  pointerEvents: 'none'
                }}
              >
                {size.toFixed(1)}
              </div>
            )
          }
          
          return numbers
        })()}
        
        {/* Combined rotation and resize handle - positioned relative to hypotenuse midpoint */}
        <div
          className="rotate-resize-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-blue-500 shadow-md flex items-center justify-center transition-opacity duration-200"
          style={{ 
            pointerEvents: 'auto',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            opacity: isHovering ? 1 : 0, // Temporarily only show on hover
            left: `${vx - 50}px`,  // (-50,-50) is your SVG offset
            top: `${vy - 50}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 20
          }}
          title="Otočit a změnit velikost"
        >
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
        </div>
      </div>
      
    </div>
  )
}
