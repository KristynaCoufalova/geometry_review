'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useBoardScale } from '../hooks/useBoardScale'

interface DraggableProtractorProps {
  x: number
  y: number
  rotation: number
  size: number
  onPositionChange: (x: number, y: number, rotation: number, size: number) => void
  isActive: boolean
  onActivate: () => void
  onUiBusyChange: (busy: boolean) => void
}

export default function DraggableProtractor({
  x,
  y,
  rotation,
  size,
  onPositionChange,
  isActive,
  onActivate,
  onUiBusyChange
}: DraggableProtractorProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isRotating, setIsRotating] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [rotationStart, setRotationStart] = useState({ x: 0, y: 0, rotation: 0, initialAngle: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, size: 0 })
  const protractorRef = useRef<HTMLDivElement>(null)
  const getScale = useBoardScale(protractorRef)
  const { pxPerUnitX, pxPerUnitY } = getScale()
  const pxPerUnit = Math.min(pxPerUnitX, pxPerUnitY)

  // Get bounding box info from scale hook
  const scaleInfo = getScale()
  const { boardLeft, boardTop, boardRight, boardBottom, boardWidth, boardHeight } = scaleInfo

  // Convert board coordinates to screen coordinates
  const boardToScreen = (boardX: number, boardY: number) => {
    // Get actual container dimensions
    const container = protractorRef.current?.closest('.jxgbox') as HTMLElement
    const containerWidth = container?.offsetWidth || 800
    const containerHeight = container?.offsetHeight || 500
    
    const screenX = ((boardX - boardLeft) / boardWidth) * containerWidth
    const screenY = containerHeight - ((boardY - boardBottom) / boardHeight) * containerHeight
    
    return { x: screenX, y: screenY }
  }

  const screenToBoard = (screenX: number, screenY: number) => {
    const container = protractorRef.current?.closest('.jxgbox') as HTMLElement
    const containerWidth = container?.offsetWidth || 800
    const containerHeight = container?.offsetHeight || 500
    
    const boardX = (screenX / containerWidth) * boardWidth + boardLeft
    const boardY = boardTop - (screenY / containerHeight) * boardHeight
    
    return { x: boardX, y: boardY }
  }

  const screenPos = boardToScreen(x, y)

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
    if (target.classList.contains('rotation-handle')) {
      setIsRotating(true)
      // Calculate initial angle from center to mouse position
      const centerX = screenPos.x
      const centerY = screenPos.y
      const initialAngle = angleDeg(centerX, centerY, e.clientX, e.clientY)
      setRotationStart({ x: e.clientX, y: e.clientY, rotation, initialAngle })
    } else if (target.classList.contains('resize-handle')) {
      setIsResizing(true)
      setResizeStart({ x: e.clientX, y: e.clientY, size })
    } else {
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
    if (target.classList.contains('rotation-handle')) {
      setIsRotating(true)
      // Calculate initial angle from center to touch position
      const centerX = screenPos.x
      const centerY = screenPos.y
      const initialAngle = angleDeg(centerX, centerY, touch.clientX, touch.clientY)
      setRotationStart({ x: touch.clientX, y: touch.clientY, rotation, initialAngle })
    } else if (target.classList.contains('resize-handle')) {
      setIsResizing(true)
      setResizeStart({ x: touch.clientX, y: touch.clientY, size })
    } else {
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
      const centerX = screenPos.x
      const centerY = screenPos.y
      
      // Calculate current angle from center to mouse
      const currentAngle = angleDeg(centerX, centerY, e.clientX, e.clientY)
      
      // Calculate the difference from the initial angle using shortest path
      const delta = shortestDelta(rotationStart.initialAngle, currentAngle)
      
      // Compute radius from center to cursor (in px)
      const r = Math.hypot(e.clientX - centerX, e.clientY - centerY)
      
      // Gain: tune these numbers; e.g., 120/r gives ~1.2x at r=100px, ~0.6x at r=200px
      const gain = clamp(120 / (r || 1), 1.2, 3.0)
      
      // Apply gain to delta, then add to initial rotation
      const newRotationRaw = rotationStart.rotation + delta * gain
      
      // Snap to 5-degree increments
      const snapped = Math.round(newRotationRaw / 5) * 5
      
      // Normalize to 0-360 range
      const normalized = ((snapped % 360) + 360) % 360
      
      onPositionChange(x, y, normalized, size)
    } else if (isResizing) {
      const deltaX = e.clientX - resizeStart.x
      const deltaY = e.clientY - resizeStart.y
      
      // Project the delta vector onto the protractor's main axis (considering rotation)
      const rotationRad = (rotation * Math.PI) / 180
      const protractorAxisX = Math.cos(rotationRad)
      const protractorAxisY = Math.sin(rotationRad)
      
      // Calculate the projection of the delta vector onto the protractor axis
      const projection = deltaX * protractorAxisX + deltaY * protractorAxisY
      const deltaSize = projection / 20 // Scale factor
      
      const newSize = Math.max(2, Math.min(6, resizeStart.size + deltaSize))
      onPositionChange(x, y, rotation, newSize)
    }
  }, [isDragging, isRotating, isResizing, dragStart, resizeStart, rotationStart, screenPos, x, y, rotation, size, onPositionChange])

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
      const centerX = screenPos.x
      const centerY = screenPos.y
      
      // Calculate current angle from center to touch
      const currentAngle = angleDeg(centerX, centerY, touch.clientX, touch.clientY)
      
      // Calculate the difference from the initial angle using shortest path
      const delta = shortestDelta(rotationStart.initialAngle, currentAngle)
      
      // Compute radius from center to cursor (in px)
      const r = Math.hypot(touch.clientX - centerX, touch.clientY - centerY)
      
      // Gain: tune these numbers; e.g., 120/r gives ~1.2x at r=100px, ~0.6x at r=200px
      const gain = clamp(120 / (r || 1), 1.2, 3.0)
      
      // Apply gain to delta, then add to initial rotation
      const newRotationRaw = rotationStart.rotation + delta * gain
      
      // Snap to 5-degree increments
      const snapped = Math.round(newRotationRaw / 5) * 5
      
      // Normalize to 0-360 range
      const normalized = ((snapped % 360) + 360) % 360
      
      onPositionChange(x, y, normalized, size)
    } else if (isResizing) {
      const deltaX = touch.clientX - resizeStart.x
      const deltaY = touch.clientY - resizeStart.y
      
      // Project the delta vector onto the protractor's main axis (considering rotation)
      const rotationRad = (rotation * Math.PI) / 180
      const protractorAxisX = Math.cos(rotationRad)
      const protractorAxisY = Math.sin(rotationRad)
      
      // Calculate the projection of the delta vector onto the protractor axis
      const projection = deltaX * protractorAxisX + deltaY * protractorAxisY
      const deltaSize = projection / 20 // Scale factor
      
      const newSize = Math.max(2, Math.min(6, resizeStart.size + deltaSize))
      onPositionChange(x, y, rotation, newSize)
    }
  }, [isDragging, isRotating, isResizing, dragStart, resizeStart, rotationStart, screenPos, x, y, rotation, size, onPositionChange])

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
    const el = protractorRef.current?.closest('.jxgbox')
    if (!el) return
    
    const ro = new ResizeObserver(() => {
      // Force a light refresh by updating dragStart state
      setDragStart(s => ({ ...s }))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Calculate protractor dimensions
  const radiusPx = size * pxPerUnit
  const centerX = size * pxPerUnit * 1.2  // Adjusted for new SVG dimensions
  const centerY = size * pxPerUnit * 1.1  // Adjusted for new SVG dimensions
  
  // Helper variables for improved design
  const R = radiusPx                               // outer radius (tick tips)
  const ring = Math.max(8, R * 0.075)              // thickness of the dark tick band
  const innerR = R - ring                          // inner edge of the tick band (rim sits here)
  const uid = React.useMemo(() => Math.random().toString(36).slice(2), [])
  const arc = (rad:number) =>
    `M ${centerX - rad} ${centerY} A ${rad} ${rad} 0 0 1 ${centerX + rad} ${centerY}`
  
  // Returns a closed path for the grey ring band between radii R and r (r < R), 0..180°
  const ringBandPath = (R: number, r: number) => {
    // Outer arc: from left outer point to right outer point (sweep=1)
    // Then line down to the right inner point
    // Inner arc back to the left inner point (sweep=0), and close.
    return `
      M ${centerX - R} ${centerY}
      A ${R} ${R} 0 0 1 ${centerX + R} ${centerY}
      L ${centerX + r} ${centerY}
      A ${r} ${r} 0 0 0 ${centerX - r} ${centerY}
      Z
    `;
  };

  // Generate protractor markings
  const generateMarkings = () => {
    const markings = []
    
    // Generate degree markings (0-180 degrees)
    for (let angle = 0; angle <= 180; angle += 1) {
      const rad = (angle * Math.PI) / 180
      
      const isMajor = angle % 10 === 0
      const isMedium = angle % 5 === 0 && !isMajor
      const isMinor = angle % 1 === 0 && !isMajor && !isMedium
      
      // Different tick lengths for different types
      let tickLength = 0
      let strokeWidth = 0.5
      
      if (isMajor) {
        tickLength = R - innerR  // Full length from inner to outer
        strokeWidth = 2.5
      } else if (isMedium) {
        tickLength = (R - innerR) * 0.7  // 70% of full length
        strokeWidth = 1.5
      } else if (isMinor) {
        tickLength = (R - innerR) * 0.4  // 40% of full length
        strokeWidth = 0.8
      }
      
      const x1 = centerX + Math.cos(rad) * (R - tickLength)
      const y1 = centerY - Math.sin(rad) * (R - tickLength)
      const x2 = centerX + Math.cos(rad) * R
      const y2 = centerY - Math.sin(rad) * R
      
      markings.push(
        <line
          key={`mark-${angle}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#374151"
          strokeWidth={strokeWidth}
        />
      )
      
      // Add degree labels for every 10 degrees
      if (isMajor) {
        const labelDistance = R + 20 // was radiusPx + 20
        const labelX = centerX + Math.cos(rad) * labelDistance
        const labelY = centerY - Math.sin(rad) * labelDistance
        
        markings.push(
          <text
            key={`label-${angle}`}
            x={labelX}
            y={labelY}
            fontSize="11"
            fill="#1f2937"
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {angle}°
          </text>
        )
      }
    }
    
    return markings
  }

  return (
    <div
      ref={protractorRef}
      className={`absolute select-none group ${isActive ? 'z-50' : 'z-40'}`}
      style={{
        left: screenPos.x,
        top: screenPos.y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        transformOrigin: '50% 50%'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Protractor body */}
      <div className="relative" style={{ pointerEvents: 'auto' }}>
        <svg
          width={size * pxPerUnit * 2.6}
          height={size * pxPerUnit * 2.4}
          className="absolute"
          style={{ 
            left: -size * pxPerUnit * 1.3, 
            top: -size * pxPerUnit * 1.2,
            pointerEvents: 'auto'
          }}
          viewBox={`0 0 ${size * pxPerUnit * 2.6} ${size * pxPerUnit * 1.4}`}
        >
          <defs>
            <filter id="protractorShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.15"/>
            </filter>
            <mask id={`innerArcMask-${uid}`}>
              <rect width="100%" height="100%" fill="white"/>
              {/* Create a larger black rectangle to completely hide the inner arc between the lines */}
              <rect 
                x={centerX - innerR * 2} 
                y={centerY - ring - 1} 
                width={innerR * 4} 
                height={ring + 20} 
                fill="black"
              />
            </mask>
          </defs>
          
          {/* Grey ring segment (curved band between arcs) */}
          <path
            d={ringBandPath(R, innerR)}
            fill="rgba(107,114,128,0.22)"
            stroke="none"
          />

          {/* Grey band between the two straight lines */}
          <rect
            x={centerX - innerR}
            y={centerY - ring}
            width={innerR * 2}
            height={ring}
            fill="rgba(107,114,128,0.22)"
          />

          {/* outer semicircle outline */}
          <path d={arc(R)} fill="none" stroke="#0f172a" strokeWidth="2.2" opacity="0.95" filter="url(#protractorShadow)"/>

          {/* baseline */}
          <line x1={centerX - R} y1={centerY} x2={centerX + R} y2={centerY}
                stroke="#000000" strokeWidth={isActive ? 1.9 : 1} strokeLinecap="round" />
          
          {/* inner horizontal line - positioned to match the arc distance */}
          <line x1={centerX - innerR} y1={centerY - ring} x2={centerX + innerR} y2={centerY - ring}
                stroke="#000000" strokeWidth="1.4" strokeLinecap="round" />

          {/* complete inner semicircle with mask to hide area between lines */}
          <path d={`M ${centerX - innerR} ${centerY} A ${innerR} ${innerR} 0 0 1 ${centerX + innerR} ${centerY} Z`} 
                fill="none" stroke="#000000" strokeWidth="1" mask={`url(#innerArcMask-${uid})`} />

          {/* center dot */}
          <circle cx={centerX} cy={centerY} r={isActive ? 4 : 3} fill="#dc2626" stroke="#fff" strokeWidth="2" filter="url(#protractorShadow)"/>

          {/* ticks and labels LAST so they stay crisp on top */}
          {generateMarkings()}
          
        </svg>
        
        {/* Rotation handle - positioned on the baseline, left of center */}
        <div
          className="rotation-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-emerald-500 shadow-md flex items-center justify-center transition-opacity duration-200"
          style={{ 
            pointerEvents: 'auto',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            opacity: isHovering ? 1 : 0, // Show on hover like ruler
            left: `${0.2 * centerX - radiusPx * 0.3}px`,
            top: `${0.36 * centerY}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 20
          }}
          title="Otočit úhloměr"
        >
          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
        </div>

        {/* Resize handle - positioned on the baseline, right of center */}
        <div
          className="resize-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-amber-500 shadow-md flex items-center justify-center transition-opacity duration-200"
          style={{ 
            pointerEvents: 'auto',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            opacity: isHovering ? 1 : 0, // Show on hover like ruler
            left: `${-0.37 * centerX + radiusPx * 0.3}px`,
            top: `${0.36 * centerY}px`,
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
