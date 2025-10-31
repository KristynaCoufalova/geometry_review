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
  const [isRotating, setIsRotating] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [rotationStart, setRotationStart] = useState({ x: 0, y: 0, rotation: 0, initialAngle: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, size: 0 })
  const triangleRef = useRef<HTMLDivElement>(null)
  const getScale = useBoardScale(triangleRef)
  const { pxPerUnitX, pxPerUnitY } = getScale()
  const pxPerUnit = Math.min(pxPerUnitX, pxPerUnitY)

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

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onActivate()
    onUiBusyChange(true)
    
    const target = e.target as HTMLElement
    if (target.classList.contains('rotation-handle') || target.closest('.rotation-handle')) {
      setIsRotating(true)
      // Calculate initial angle from triangle center to mouse position
      const currentScreenPos = boardToScreen(x, y)
      const centerX = currentScreenPos.x
      const centerY = currentScreenPos.y
      const initialAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI)
      setRotationStart({ x: e.clientX, y: e.clientY, rotation, initialAngle })
    } else if (target.classList.contains('resize-handle') || target.closest('.resize-handle')) {
      setIsResizing(true)
      setResizeStart({ x: e.clientX, y: e.clientY, size })
    } else if (target.classList.contains('drag-handle') || target.closest('.drag-handle')) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - screenPos.x, y: e.clientY - screenPos.y })
    } else {
      // Allow dragging from anywhere on the triangle
      setIsDragging(true)
      setDragStart({ x: e.clientX - screenPos.x, y: e.clientY - screenPos.y })
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onActivate()
    onUiBusyChange(true)
    
    const touch = e.touches[0]
    if (!touch) return
    
    const target = e.target as HTMLElement
    if (target.classList.contains('rotation-handle') || target.closest('.rotation-handle')) {
      setIsRotating(true)
      // Calculate initial angle from triangle center to touch position
      const currentScreenPos = boardToScreen(x, y)
      const centerX = currentScreenPos.x
      const centerY = currentScreenPos.y
      const initialAngle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * (180 / Math.PI)
      setRotationStart({ x: touch.clientX, y: touch.clientY, rotation, initialAngle })
    } else if (target.classList.contains('resize-handle') || target.closest('.resize-handle')) {
      setIsResizing(true)
      setResizeStart({ x: touch.clientX, y: touch.clientY, size })
    } else if (target.classList.contains('drag-handle') || target.closest('.drag-handle')) {
      setIsDragging(true)
      setDragStart({ x: touch.clientX - screenPos.x, y: touch.clientY - screenPos.y })
    } else {
      // Allow dragging from anywhere on the triangle
      setIsDragging(true)
      setDragStart({ x: touch.clientX - screenPos.x, y: touch.clientY - screenPos.y })
    }
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newScreenX = e.clientX - dragStart.x
      const newScreenY = e.clientY - dragStart.y
      const newBoardPos = screenToBoard(newScreenX, newScreenY)
      const smoothPos = smoothPosition(newBoardPos.x, newBoardPos.y)
      onPositionChange(smoothPos.x, smoothPos.y, rotation, size)
    } else if (isRotating) {
      // Get the current screen position of the triangle center
      const currentScreenPos = boardToScreen(x, y)
      const centerX = currentScreenPos.x
      const centerY = currentScreenPos.y
      
      // Calculate current angle from center to mouse
      const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI)
      
      // Calculate the difference from the initial angle
      let deltaAngle = currentAngle - rotationStart.initialAngle
      
      // Handle angle wrapping (ensure we take the shorter path)
      while (deltaAngle > 180) deltaAngle -= 360
      while (deltaAngle < -180) deltaAngle += 360
      
      const newRotation = rotationStart.rotation + deltaAngle
      onPositionChange(x, y, newRotation, size)
    } else if (isResizing) {
      const deltaX = e.clientX - resizeStart.x
      const deltaY = e.clientY - resizeStart.y
      
      // Project the delta vector onto the triangle's main axis (considering rotation)
      const rotationRad = (rotation * Math.PI) / 180
      const triangleAxisX = Math.cos(rotationRad)
      const triangleAxisY = Math.sin(rotationRad)
      
      // Calculate the projection of the delta vector onto the triangle axis
      const projection = deltaX * triangleAxisX + deltaY * triangleAxisY
      const deltaSize = projection / 20 // Scale factor
      
      const proposedSize = resizeStart.size + deltaSize
      
      // Calculate height based on triangle type
      const height = type === '45-45-90' ? proposedSize : proposedSize * Math.sqrt(3) / 2
      
      // Enforce height constraints: minimum 3cm, maximum 10cm
      let constrainedSize = proposedSize
      if (height < 3) {
        // Calculate size needed for 3cm height
        constrainedSize = type === '45-45-90' ? 3 : 3 / (Math.sqrt(3) / 2)
      } else if (height > 10) {
        // Calculate size needed for 10cm height
        constrainedSize = type === '45-45-90' ? 10 : 10 / (Math.sqrt(3) / 2)
      }
      
      onPositionChange(x, y, rotation, constrainedSize)
    }
  }, [isDragging, isRotating, isResizing, dragStart, resizeStart, rotationStart, x, y, rotation, size, type, onPositionChange, screenToBoard, boardToScreen])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    if (!touch) return
    
    if (isDragging) {
      const newScreenX = touch.clientX - dragStart.x
      const newScreenY = touch.clientY - dragStart.y
      const newBoardPos = screenToBoard(newScreenX, newScreenY)
      const smoothPos = smoothPosition(newBoardPos.x, newBoardPos.y)
      onPositionChange(smoothPos.x, smoothPos.y, rotation, size)
    } else if (isRotating) {
      // Get the current screen position of the triangle center
      const currentScreenPos = boardToScreen(x, y)
      const centerX = currentScreenPos.x
      const centerY = currentScreenPos.y
      
      // Calculate current angle from center to touch
      const currentAngle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * (180 / Math.PI)
      
      // Calculate the difference from the initial angle
      let deltaAngle = currentAngle - rotationStart.initialAngle
      
      // Handle angle wrapping (ensure we take the shorter path)
      while (deltaAngle > 180) deltaAngle -= 360
      while (deltaAngle < -180) deltaAngle += 360
      
      const newRotation = rotationStart.rotation + deltaAngle
      onPositionChange(x, y, newRotation, size)
    } else if (isResizing) {
      const deltaX = touch.clientX - resizeStart.x
      const deltaY = touch.clientY - resizeStart.y
      
      // Project the delta vector onto the triangle's main axis (considering rotation)
      const rotationRad = (rotation * Math.PI) / 180
      const triangleAxisX = Math.cos(rotationRad)
      const triangleAxisY = Math.sin(rotationRad)
      
      // Calculate the projection of the delta vector onto the triangle axis
      const projection = deltaX * triangleAxisX + deltaY * triangleAxisY
      const deltaSize = projection / 20 // Scale factor
      
      const proposedSize = resizeStart.size + deltaSize
      
      // Calculate height based on triangle type
      const height = type === '45-45-90' ? proposedSize : proposedSize * Math.sqrt(3) / 2
      
      // Enforce height constraints: minimum 3cm, maximum 10cm
      let constrainedSize = proposedSize
      if (height < 3) {
        // Calculate size needed for 3cm height
        constrainedSize = type === '45-45-90' ? 3 : 3 / (Math.sqrt(3) / 2)
      } else if (height > 10) {
        // Calculate size needed for 10cm height
        constrainedSize = type === '45-45-90' ? 10 : 10 / (Math.sqrt(3) / 2)
      }
      
      onPositionChange(x, y, rotation, constrainedSize)
    }
  }, [isDragging, isRotating, isResizing, dragStart, resizeStart, rotationStart, x, y, rotation, size, type, onPositionChange, screenToBoard, boardToScreen])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsRotating(false)
    setIsResizing(false)
    onUiBusyChange(false)
  }, [onUiBusyChange])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
    setIsRotating(false)
    setIsResizing(false)
    onUiBusyChange(false)
  }, [onUiBusyChange])

  useEffect(() => {
    if (isDragging || isRotating || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchmove', handleTouchMove, { passive: false } as any)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, isRotating, isResizing, handleMouseMove, handleTouchMove, handleMouseUp, handleTouchEnd])

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
        left: screenPos.x,
        top: screenPos.y,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: '0 0',
        // Debug: add background to see hover area
        backgroundColor: isHovering ? 'rgba(255, 0, 0, 0.1)' : 'transparent'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
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
        
        {/* Rotation handle - positioned relative to hypotenuse midpoint */}
        <div
          className="rotation-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-emerald-500 shadow-md flex items-center justify-center transition-opacity duration-200"
          style={{ 
            pointerEvents: 'auto',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            opacity: isHovering ? 1 : 0, // Temporarily only show on hover
            left: `${1.35 * hypMidX - 50 - basePx * 0.2}px`,
            top: `${1.35 * hypMidY - 50 - heightPx * 0.2}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 20
          }}
          title="Otočit trojúhelník"
        >
          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
        </div>
        
        {/* Resize handle - positioned relative to hypotenuse midpoint */}
        <div
          className="resize-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-amber-500 shadow-md flex items-center justify-center transition-opacity duration-200"
          style={{ 
            pointerEvents: 'auto',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            opacity: isHovering ? 1 : 0, // Temporarily only show on hover
            left: `${0.6 * hypMidX - 50 + basePx * 0.2}px`,
            top: `${0.6 * hypMidY - 50 + heightPx * 0.2}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 15
          }}
          title="Změnit velikost"
        >
          <div className="w-2 h-2 bg-amber-500 rounded-full" />
        </div>
      </div>
      
    </div>
  )
}
