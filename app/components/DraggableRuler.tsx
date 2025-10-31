'use client'

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useBoardScale } from '../hooks/useBoardScale'

interface DraggableRulerProps {
  x: number
  y: number
  rotation: number
  length: number
  onPositionChange: (x: number, y: number, rotation: number, length: number) => void
  isActive: boolean
  onActivate: () => void
  onUiBusyChange: (busy: boolean) => void
}

export default function DraggableRuler({
  x,
  y,
  rotation,
  length,
  onPositionChange,
  isActive,
  onActivate,
  onUiBusyChange
}: DraggableRulerProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isRotating, setIsRotating] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [rotationStart, setRotationStart] = useState({ x: 0, y: 0, rotation: 0, initialAngle: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, length: 0 })
  const rulerRef = useRef<HTMLDivElement>(null)
  const getScale = useBoardScale(rulerRef)
  const { pxPerUnitX, pxPerUnitY } = getScale()
  const pxPerUnit = Math.min(pxPerUnitX, pxPerUnitY)

  // Memoized coordinate conversion functions for better performance
  const coordinateConverter = useMemo(() => {
    const scaleInfo = getScale()
    const { boardLeft, boardTop, boardRight, boardBottom, boardWidth, boardHeight } = scaleInfo
    
    return {
      boardToScreen: (boardX: number, boardY: number) => {
        // Get actual container dimensions
        const container = rulerRef.current?.closest('.jxgbox') as HTMLElement
        const containerWidth = container?.offsetWidth || 800
        const containerHeight = container?.offsetHeight || 500
        
        const screenX = ((boardX - boardLeft) / boardWidth) * containerWidth
        const screenY = containerHeight - ((boardY - boardBottom) / boardHeight) * containerHeight
        
        return { x: screenX, y: screenY }
      },
      screenToBoard: (screenX: number, screenY: number) => {
        const container = rulerRef.current?.closest('.jxgbox') as HTMLElement
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

  const screenPos = boardToScreen(x, y)

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
      // Calculate initial angle from ruler center to mouse position
      const centerX = screenPos.x
      const centerY = screenPos.y
      const initialAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI)
      setRotationStart({ x: e.clientX, y: e.clientY, rotation, initialAngle })
    } else if (target.classList.contains('resize-handle') || target.closest('.resize-handle')) {
      setIsResizing(true)
      setResizeStart({ x: e.clientX, y: e.clientY, length })
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
    if (target.classList.contains('rotation-handle') || target.closest('.rotation-handle')) {
      setIsRotating(true)
      // Calculate initial angle from ruler center to touch position
      const centerX = screenPos.x
      const centerY = screenPos.y
      const initialAngle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * (180 / Math.PI)
      setRotationStart({ x: touch.clientX, y: touch.clientY, rotation, initialAngle })
    } else if (target.classList.contains('resize-handle') || target.closest('.resize-handle')) {
      setIsResizing(true)
      setResizeStart({ x: touch.clientX, y: touch.clientY, length })
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
      onPositionChange(smoothPos.x, smoothPos.y, rotation, length)
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
      
      const newRotation = rotationStart.rotation + delta * gain
      onPositionChange(x, y, newRotation, length)
    } else if (isResizing) {
      const deltaX = e.clientX - resizeStart.x
      const deltaY = e.clientY - resizeStart.y
      
      // Project the delta vector onto the ruler's axis (considering rotation)
      const rotationRad = (rotation * Math.PI) / 180
      const rulerAxisX = Math.cos(rotationRad)
      const rulerAxisY = Math.sin(rotationRad)
      
      // Calculate the projection of the delta vector onto the ruler axis
      const projection = deltaX * rulerAxisX + deltaY * rulerAxisY
      const deltaDistance = projection / pxPerUnit
      
      const newLength = Math.max(2, Math.min(10, resizeStart.length + deltaDistance))
      onPositionChange(x, y, rotation, newLength)
    }
  }, [isDragging, isRotating, isResizing, dragStart, resizeStart, rotationStart, screenPos, x, y, rotation, length, onPositionChange, pxPerUnit, screenToBoard])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    if (!touch) return
    
    if (isDragging) {
      const newScreenX = touch.clientX - dragStart.x
      const newScreenY = touch.clientY - dragStart.y
      const newBoardPos = screenToBoard(newScreenX, newScreenY)
      const smoothPos = smoothPosition(newBoardPos.x, newBoardPos.y)
      onPositionChange(smoothPos.x, smoothPos.y, rotation, length)
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
      
      const newRotation = rotationStart.rotation + delta * gain
      onPositionChange(x, y, newRotation, length)
    } else if (isResizing) {
      const deltaX = touch.clientX - resizeStart.x
      const deltaY = touch.clientY - resizeStart.y
      
      // Project the delta vector onto the ruler's axis (considering rotation)
      const rotationRad = (rotation * Math.PI) / 180
      const rulerAxisX = Math.cos(rotationRad)
      const rulerAxisY = Math.sin(rotationRad)
      
      // Calculate the projection of the delta vector onto the ruler axis
      const projection = deltaX * rulerAxisX + deltaY * rulerAxisY
      const deltaDistance = projection / pxPerUnit
      
      const newLength = Math.max(2, Math.min(10, resizeStart.length + deltaDistance))
      onPositionChange(x, y, rotation, newLength)
    }
  }, [isDragging, isRotating, isResizing, dragStart, resizeStart, rotationStart, screenPos, x, y, rotation, length, onPositionChange, pxPerUnit, screenToBoard])

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
    const el = rulerRef.current?.closest('.jxgbox')
    if (!el) return
    
    const ro = new ResizeObserver(() => {
      // Force a light refresh by updating dragStart state
      setDragStart(s => ({ ...s }))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Generate ruler markings based on actual length units
  const generateMarkings = () => {
    const markings = []
    const rulerWidthPx = length * pxPerUnit
    
    // Create markings every 0.1 units, with major marks at 1.0 and medium at 0.5
    const markInterval = 0.1 // Mark every 0.1 units
    const numMarks = Math.floor(length / markInterval)
    
    for (let i = 0; i <= numMarks; i++) {
      const unitValue = i * markInterval
      const position = (unitValue / length) * rulerWidthPx
      
      const isMajor = unitValue % 1 === 0 // Major marks every 1 unit
      const isMedium = unitValue % 0.5 === 0 && !isMajor // Medium marks every 0.5 units
      
      let height = 'h-1'
      let opacity = 0.3
      if (isMajor) {
        height = 'h-5'
        opacity = 0.8
      } else if (isMedium) {
        height = 'h-3'
        opacity = 0.6
      }
      
      markings.push(
        <div
          key={`mark-${i}`}
          className={`absolute w-[1px] ${height} bg-black transition-all duration-200`}
          style={{
            left: position,
            top: -1,
            transform: 'translateX(-50%)',
            opacity
          }}
        />
      )
      
      // Add labels for major marks (every 1 unit)
      if (isMajor && unitValue > 0) {
        markings.push(
          <div
            key={`label-${i}`}
            className="absolute text-[10px] text-slate-600 font-medium tracking-tight"
            style={{
              left: position,
              top: -16,
              transform: 'translateX(-50%)',
              fontFeatureSettings: '"tnum"'
            }}
          >
            {unitValue}
          </div>
        )
      }
    }
    
    return markings
  }

  return (
    <div
      ref={rulerRef}
      className={`absolute select-none group ${isActive ? 'z-50' : 'z-40'}`}
      style={{
        left: screenPos.x,
        top: screenPos.y,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: '0 0'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Ruler body with enhanced SVG styling */}
      <div className="relative" style={{ pointerEvents: 'none' }}>
        <svg
          width={length * pxPerUnit + 100}
          height={40}
          className="absolute"
          style={{ left: -50, top: -10, pointerEvents: 'auto' }}
        >
          <defs>
            {/* Main plastic gradient with enhanced depth and contrast */}
            <linearGradient id="rulerPlasticGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="15%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="50%" stopColor="rgba(240,245,250,0.1)" />
              <stop offset="70%" stopColor="rgba(200,210,220,0.15)" />
              <stop offset="85%" stopColor="rgba(150,160,170,0.2)" />
              <stop offset="100%" stopColor="rgba(100,110,120,0.25)" />
            </linearGradient>

            {/* Secondary highlight gradient for more realistic plastic look */}
            <linearGradient id="rulerHighlightGradient" x1="0%" y1="0%" x2="60%" y2="40%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="60%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>

            {/* Shadow gradient for depth */}
            <linearGradient id="rulerShadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <stop offset="50%" stopColor="rgba(0,0,0,0.05)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
            </linearGradient>

            {/* Enhanced drop shadow with more depth and realism */}
            <filter id="rulerSoftShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#000" floodOpacity="0.3" />
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.2" />
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.1" />
            </filter>

            {/* Glow effect for active state */}
            <filter id="rulerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Ruler plastic look: base fill, shine gradient overlay, and stroke */}
          <g filter={isActive ? "url(#rulerGlow)" : "url(#rulerSoftShadow)"}>
            {/* Base fill with enhanced opacity for better depth */}
            <rect x={50} y={10} width={length * pxPerUnit} height={20} fill="rgba(240,245,250,0.25)" />
            {/* Shadow gradient for depth */}
            <rect x={50} y={10} width={length * pxPerUnit} height={20} fill="url(#rulerShadowGradient)" />
            {/* Main plastic gradient overlay */}
            <rect x={50} y={10} width={length * pxPerUnit} height={20} fill="url(#rulerPlasticGradient)" />
            {/* Highlight gradient for realistic plastic shine */}
            <rect x={50} y={10} width={length * pxPerUnit} height={20} fill="url(#rulerHighlightGradient)" />
            {/* Enhanced outline with subtle inner shadow */}
            <rect x={50} y={10} width={length * pxPerUnit} height={20} fill="none" stroke="#000000" strokeWidth="1.2"/>
          </g>
          
          {/* Enhanced ruler markings with 0.1cm precision */}
          {(() => {
            const markings = []
            const rulerWidthPx = length * pxPerUnit
            const pxPerCm = pxPerUnit
            const maxCm = Math.floor(length)
            
            // Create markings every 0.1cm (1mm)
            for (let cm = 0; cm <= maxCm; cm++) {
              const x = 50 + cm * pxPerCm
              const isFive = cm % 5 === 0
              const majorLen = isFive ? 18 : 12
              
              // Main centimeter tick mark
              markings.push(
                <rect
                  key={`cm-${cm}`}
                  x={x - 0.5}
                  y={10}
                  width={1}
                  height={majorLen}
                  fill="#000"
                />
              )
              
              // Millimeter marks (9 small ticks between each centimeter)
              if (cm < maxCm) {
                for (let mm = 1; mm < 10; mm++) {
                  const xx = x + (pxPerCm * mm) / 10
                  const mmLen = mm === 5 ? 8 : 5 // 5mm mark is longer
                  
                  markings.push(
                    <rect
                      key={`mm-${cm}-${mm}`}
                      x={xx - 0.25}
                      y={10}
                      width={0.5}
                      height={mmLen}
                      fill="#000"
                      opacity="0.75"
                    />
                  )
                }
              }
            }
            
            // Add millimeter marks between last whole centimeter and final length value
            if (length % 1 !== 0) {
              const lastWholeCm = Math.floor(length)
              const finalX = 50 + length * pxPerCm
              
              // Add millimeter marks from last whole cm to final length
              for (let mm = 1; mm <= Math.floor((length - lastWholeCm) * 10); mm++) {
                const xx = 50 + (lastWholeCm + mm / 10) * pxPerCm
                const mmLen = mm === 5 ? 8 : 5 // 5mm mark is longer
                
                markings.push(
                  <rect
                    key={`mm-final-${mm}`}
                    x={xx - 0.25}
                    y={10}
                    width={0.5}
                    height={mmLen}
                    fill="#000"
                    opacity="0.75"
                  />
                )
              }
              
              // Add final marking at exact length value
              markings.push(
                <rect
                  key={`cm-final`}
                  x={finalX - 0.5}
                  y={10}
                  width={1}
                  height={12}
                  fill="#000"
                />
              )
            }
            
            return markings
          })()}
        </svg>
        
        {/* Ruler numbers - positioned as HTML elements like in the triangle component */}
        {(() => {
          const pxPerCm = pxPerUnit
          const maxCm = Math.floor(length)
          const numbers = []
          
          for (let cm = 1; cm <= maxCm; cm++) {
            const x = cm * pxPerCm
            const isFive = cm % 5 === 0
            
            numbers.push(
              <div
                key={`ruler-number-${cm}`}
                className="absolute text-xs text-gray-800 font-mono"
                style={{
                  left: x, // Direct positioning without SVG offset
                  top: -25, // Position above the ruler
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

          // Add final number at exact length value (only if not a whole number)
          if (length % 1 !== 0) {
            const finalX = length * pxPerCm
            numbers.push(
              <div
                key={`ruler-number-final`}
                className="absolute text-xs text-gray-800 font-mono"
                style={{
                  left: finalX, // Direct positioning without SVG offset
                  top: -25, // Position above the ruler
                  transform: 'translateX(-50%)',
                  fontWeight: 'normal',
                  fontSize: '11px',
                  fontFamily: 'Arial, sans-serif',
                  pointerEvents: 'none'
                }}
              >
                {length.toFixed(1)}
              </div>
            )
          }
          
          return numbers
        })()}
        
        {/* Rotation handle - enhanced styling to match triangle */}
        <div
          className="rotation-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-emerald-500 shadow-md flex items-center justify-center transition-opacity duration-200"
          style={{ 
            pointerEvents: 'auto',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            opacity: isHovering ? 1 : 0, // Show on hover like triangle
            left: length * pxPerUnit - 2,
            top: 2,
            transform: 'translate(-50%, -50%)',
            zIndex: 20
          }}
          title="Otočit pravítko"
        >
          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
        </div>
        
        {/* Resize handle - enhanced styling to match triangle */}
        <div
          className="resize-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-amber-500 shadow-md flex items-center justify-center transition-opacity duration-200"
          style={{ 
            pointerEvents: 'auto',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            opacity: isHovering ? 1 : 0, // Show on hover like triangle
            left: length * pxPerUnit - 2,
            top: 14,
            transform: 'translate(-50%, -50%)',
            zIndex: 15
          }}
          title="Změnit délku"
        >
          <div className="w-2 h-2 bg-amber-500 rounded-full" />
        </div>
      </div>
      
    </div>
  )
}