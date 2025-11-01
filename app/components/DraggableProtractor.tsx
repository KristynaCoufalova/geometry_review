'use client'

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
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

  // ------- Coordinate conversion (memoized) -------
  const { boardToScreen, screenToBoard } = useMemo(() => {
    const s = getScale()
    const { boardLeft, boardTop, boardBottom, boardWidth, boardHeight } = s

    return {
      boardToScreen: (boardX: number, boardY: number) => {
        const container = protractorRef.current?.closest('.jxgbox') as HTMLElement
        const cw = container?.offsetWidth || 800
        const ch = container?.offsetHeight || 500
        const sx = ((boardX - boardLeft) / boardWidth) * cw
        const sy = ch - ((boardY - boardBottom) / boardHeight) * ch
        return { x: sx, y: sy }
      },
      screenToBoard: (screenX: number, screenY: number) => {
        const container = protractorRef.current?.closest('.jxgbox') as HTMLElement
        const cw = container?.offsetWidth || 800
        const ch = container?.offsetHeight || 500
        const bx = (screenX / cw) * boardWidth + boardLeft
        const by = boardTop - (screenY / ch) * boardHeight
        return { x: bx, y: by }
      }
    }
  }, [getScale])

  const screenPos = boardToScreen(x, y)

  // ------- Box + pivot (with bleed) -----
  // Add extra padding around the drawing so the box is larger than the semicircle + labels + shadow
  const bleed = Math.max(24, (size * pxPerUnit) * 0.25) // 24px or 25% of radius
  
  const radiusPx = size * pxPerUnit
  const boxW = radiusPx * 2.6 + bleed * 2
  const boxH = radiusPx * 2.4 + bleed * 2
  
  // Red dot position inside the box (shifted by bleed)
  const centerX = bleed + radiusPx * 1.2
  const centerY = bleed + radiusPx * 1.1

  // Red dot in screen coordinates (true pivot for rotation math):
  const pivotScreen = useMemo(() => ({
    x: screenPos.x - boxW / 2 + centerX,
    y: screenPos.y - boxH / 2 + centerY,
  }), [screenPos.x, screenPos.y, boxW, boxH, centerX, centerY])

  // ------- Helpers -------
  const shortestDelta = (a: number, b: number) => ((b - a + 540) % 360) - 180
  const angleDeg = (px: number, py: number, mx: number, my: number) =>
    Math.atan2(my - py, mx - px) * 180 / Math.PI
  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
  const smoothPosition = (bx: number, by: number) => ({ x: bx, y: by })

  // ------- Events -------
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onActivate()
    onUiBusyChange(true)

    const target = e.target as HTMLElement
    if (target.classList.contains('rotation-handle')) {
      setIsRotating(true)
      const initialAngle = angleDeg(pivotScreen.x, pivotScreen.y, e.clientX, e.clientY)
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
      const initialAngle = angleDeg(pivotScreen.x, pivotScreen.y, touch.clientX, touch.clientY)
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
      const p = smoothPosition(newBoardPos.x, newBoardPos.y)
      onPositionChange(p.x, p.y, rotation, size)
      return
    }

    if (isRotating) {
      const currentAngle = angleDeg(pivotScreen.x, pivotScreen.y, e.clientX, e.clientY)
      const delta = shortestDelta(rotationStart.initialAngle, currentAngle)
      const r = Math.hypot(e.clientX - pivotScreen.x, e.clientY - pivotScreen.y)
      const gain = clamp(120 / (r || 1), 1.2, 3.0)
      const newRotationRaw = rotationStart.rotation + delta * gain
      const snapped = Math.round(newRotationRaw / 5) * 5
      const normalized = ((snapped % 360) + 360) % 360
      onPositionChange(x, y, normalized, size)
      return
    }

    if (isResizing) {
      const dx = e.clientX - resizeStart.x
      const dy = e.clientY - resizeStart.y
      const rotRad = (rotation * Math.PI) / 180
      const ax = Math.cos(rotRad)
      const ay = Math.sin(rotRad)
      const projection = dx * ax + dy * ay
      const deltaSize = projection / 20
      const newSize = Math.max(2, Math.min(6, resizeStart.size + deltaSize))
      onPositionChange(x, y, rotation, newSize)
    }
  }, [isDragging, isRotating, isResizing, dragStart, resizeStart, rotationStart, pivotScreen, screenToBoard, x, y, rotation, size, onPositionChange])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    if (!touch) return

    if (isDragging) {
      const newScreenX = touch.clientX - dragStart.x
      const newScreenY = touch.clientY - dragStart.y
      const newBoardPos = screenToBoard(newScreenX, newScreenY)
      const p = smoothPosition(newBoardPos.x, newBoardPos.y)
      onPositionChange(p.x, p.y, rotation, size)
      return
    }

    if (isRotating) {
      const currentAngle = angleDeg(pivotScreen.x, pivotScreen.y, touch.clientX, touch.clientY)
      const delta = shortestDelta(rotationStart.initialAngle, currentAngle)
      const r = Math.hypot(touch.clientX - pivotScreen.x, touch.clientY - pivotScreen.y)
      const gain = clamp(120 / (r || 1), 1.2, 3.0)
      const newRotationRaw = rotationStart.rotation + delta * gain
      const snapped = Math.round(newRotationRaw / 5) * 5
      const normalized = ((snapped % 360) + 360) % 360
      onPositionChange(x, y, normalized, size)
      return
    }

    if (isResizing) {
      const dx = touch.clientX - resizeStart.x
      const dy = touch.clientY - resizeStart.y
      const rotRad = (rotation * Math.PI) / 180
      const ax = Math.cos(rotRad)
      const ay = Math.sin(rotRad)
      const projection = dx * ax + dy * ay
      const deltaSize = projection / 20
      const newSize = Math.max(2, Math.min(6, resizeStart.size + deltaSize))
      onPositionChange(x, y, rotation, newSize)
    }
  }, [isDragging, isRotating, isResizing, dragStart, resizeStart, rotationStart, pivotScreen, screenToBoard, x, y, rotation, size, onPositionChange])

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
        document.removeEventListener('touchmove', handleTouchMove as any)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, isRotating, isResizing, handleMouseMove, handleTouchMove, handleMouseUp, handleTouchEnd])

  // Keep layout responsive
  useEffect(() => {
    const el = protractorRef.current?.closest('.jxgbox')
    if (!el) return
    const ro = new ResizeObserver(() => setDragStart(s => ({ ...s })))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // ----- Visual geometry -----
  const R = radiusPx
  const ring = Math.max(8, R * 0.075)
  const innerR = R - ring
  const uid = useMemo(() => Math.random().toString(36).slice(2), [])
  const arc = (rad:number) => `M ${centerX - rad} ${centerY} A ${rad} ${rad} 0 0 1 ${centerX + rad} ${centerY}`
  const ringBandPath = (RR: number, r: number) => `
    M ${centerX - RR} ${centerY}
    A ${RR} ${RR} 0 0 1 ${centerX + RR} ${centerY}
    L ${centerX + r} ${centerY}
    A ${r} ${r} 0 0 0 ${centerX - r} ${centerY}
    Z
  `

  const generateMarkings = () => {
    const m = []
    for (let angle = 0; angle <= 180; angle += 1) {
      const rad = (angle * Math.PI) / 180
      const isMajor = angle % 10 === 0
      const isMedium = angle % 5 === 0 && !isMajor
      const isMinor = !isMajor && !isMedium

      let tickLength = 0
      let strokeWidth = 0.5
      if (isMajor) { tickLength = R - innerR; strokeWidth = 2.5 }
      else if (isMedium) { tickLength = (R - innerR) * 0.7; strokeWidth = 1.5 }
      else if (isMinor) { tickLength = (R - innerR) * 0.4; strokeWidth = 0.8 }

      const x1 = centerX + Math.cos(rad) * (R - tickLength)
      const y1 = centerY - Math.sin(rad) * (R - tickLength)
      const x2 = centerX + Math.cos(rad) * R
      const y2 = centerY - Math.sin(rad) * R

      m.push(<line key={`mark-${angle}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#374151" strokeWidth={strokeWidth} />)

      if (isMajor) {
        const labelDistance = R + 20
        const lx = centerX + Math.cos(rad) * labelDistance
        const ly = centerY - Math.sin(rad) * labelDistance
        m.push(
          <text key={`label-${angle}`} x={lx} y={ly} fontSize="11" fill="#1f2937" fontFamily="Arial, sans-serif"
                fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
            {angle}°
          </text>
        )
      }
    }
    return m
  }

  return (
    <div
      ref={protractorRef}
      className={`absolute select-none group ${isActive ? 'z-50' : 'z-40'}`}
      style={{
        left: screenPos.x,
        top: screenPos.y,
        width: boxW,
        height: boxH,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        // Crucial: rotate around red dot defined in local (box) pixels
        transformOrigin: `${centerX}px ${centerY}px`,
        overflow: 'visible', // important: allow rotated content to extend outside
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative" style={{ pointerEvents: 'auto', width: boxW, height: boxH, overflow: 'visible' }}>
        <svg
          width={boxW}
          height={boxH}
          className="absolute"
          style={{ left: 0, top: 0, pointerEvents: 'auto', overflow: 'visible' }}
          viewBox={`0 0 ${boxW} ${boxH}`}
        >
          <defs>
            <filter 
              id="protractorShadow"
              filterUnits="userSpaceOnUse"
              x={-bleed} 
              y={-bleed}
              width={boxW + bleed * 2}
              height={boxH + bleed * 2}>
              <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.15"/>
            </filter>
            <mask id={`innerArcMask-${uid}`}>
              <rect width="100%" height="100%" fill="white"/>
              <rect x={centerX - innerR * 2} y={centerY - ring - 1} width={innerR * 4} height={ring + 20} fill="black"/>
            </mask>
          </defs>

          <path d={ringBandPath(R, innerR)} fill="rgba(107,114,128,0.22)" stroke="none" />
          <rect x={centerX - innerR} y={centerY - ring} width={innerR * 2} height={ring} fill="rgba(107,114,128,0.22)"/>
          <path d={arc(R)} fill="none" stroke="#0f172a" strokeWidth="2.2" opacity="0.95" filter="url(#protractorShadow)"/>
          <line x1={centerX - R} y1={centerY} x2={centerX + R} y2={centerY} stroke="#000" strokeWidth={isActive ? 1.9 : 1} strokeLinecap="round" />
          <line x1={centerX - innerR} y1={centerY - ring} x2={centerX + innerR} y2={centerY - ring} stroke="#000" strokeWidth="1.4" strokeLinecap="round" />
          <path d={`M ${centerX - innerR} ${centerY} A ${innerR} ${innerR} 0 0 1 ${centerX + innerR} ${centerY} Z`} fill="none" stroke="#000" strokeWidth="1" mask={`url(#innerArcMask-${uid})`} />

          {/* Red pivot dot */}
          <circle cx={centerX} cy={centerY} r={isActive ? 4 : 3} fill="#dc2626" stroke="#fff" strokeWidth="2" filter="url(#protractorShadow)"/>

          {generateMarkings()}
        </svg>

        {/* Rotation handle aligned around the pivot horizontally */}
        <div
          className="rotation-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-emerald-500 shadow-md flex items-center justify-center transition-opacity duration-200"
          style={{
            pointerEvents: 'auto',
            opacity: isHovering ? 1 : 0,
            left: `${centerX - radiusPx * 0.08}px`,
            top: `${centerY + radiusPx * 0.01}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 20
          }}
          title="Otočit úhloměr"
        >
          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
        </div>

        {/* Resize handle symmetric to the other side */}
        <div
          className="resize-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-amber-500 shadow-md flex items-center justify-center transition-opacity duration-200"
          style={{
            pointerEvents: 'auto',
            opacity: isHovering ? 1 : 0,
            left: `${centerX + radiusPx * 0.08}px`,
            top: `${centerY + radiusPx * 0.01}px`,
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
