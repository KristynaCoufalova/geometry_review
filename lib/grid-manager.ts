// lib/grid-manager.ts
import JXG from 'jsxgraph'

export type GridMode = 'none' | 'major' | 'minor' | 'major-minor' | 'dot'
type JBoard = JXG.Board & { renderer: any }

export class GridManager {
  private gridLines: any[] = []
  private mode: GridMode = 'none'
  private dotStep = 0.5 // world units
  private container: HTMLElement

  constructor(private board: JBoard, container: HTMLElement) {
    this.container = container
    // ensure background sits below the canvas
    this.container.style.position = this.container.style.position || 'relative'
  }

  setMode(mode: GridMode) {
    if (this.mode === mode) return
    this.mode = mode
    this.clearAll()
    switch (mode) {
      case 'none':
        this.applyDot(false)
        break
      case 'major':
        this.createLineGrid(1.0, '#e5e7eb', 1)
        this.applyDot(false)
        break
      case 'minor':
        this.createLineGrid(0.2, '#f3f4f6', 0.5)
        this.applyDot(false)
        break
      case 'major-minor':
        this.createLineGrid(0.2, '#f3f4f6', 0.5)
        this.createLineGrid(1.0, '#d1d5db', 1)
        this.applyDot(false)
        break
      case 'dot':
        this.applyDot(true)
        break
    }
    this.board.update()
  }

  setDotStep(stepWorldUnits: number) {
    this.dotStep = Math.max(0.1, stepWorldUnits)
    if (this.mode === 'dot') this.applyDot(true)
  }

  /** Keep the dot background in sync with pixel scaling */
  sync() {
    if (this.mode !== 'dot') return
    this.applyDot(true)
  }

  private createLineGrid(step: number, color: string, strokeWidth: number) {
    const bbox = this.board.getBoundingBox()
    
    // Create vertical lines
    for (let x = bbox[0]; x <= bbox[2]; x += step) {
      const line = this.board.create('line', [[x, bbox[1]], [x, bbox[3]]], {
        strokeColor: color,
        strokeWidth: strokeWidth,
        fixed: true,
        highlight: false,
        layer: 0,
        withLabel: false,
        showInfobox: false,
        visible: true,
        trace: false,
        track: false,
        draggable: false
      })
      this.gridLines.push(line)
    }
    
    // Create horizontal lines
    for (let y = bbox[3]; y <= bbox[1]; y += step) {
      const line = this.board.create('line', [[bbox[0], y], [bbox[2], y]], {
        strokeColor: color,
        strokeWidth: strokeWidth,
        fixed: true,
        highlight: false,
        layer: 0,
        withLabel: false,
        showInfobox: false,
        visible: true,
        trace: false,
        track: false,
        draggable: false
      })
      this.gridLines.push(line)
    }
  }

  private clearAll() {
    this.gridLines.forEach(line => {
      try { this.board.removeObject(line) } catch {}
    })
    this.gridLines = []
  }

  private applyDot(enabled: boolean) {
    if (!enabled) {
      this.container.style.backgroundImage = ''
      this.container.style.backgroundSize = ''
      this.container.style.backgroundPosition = ''
      return
    }
    // Convert world units to pixels using board.unitX/unitY
    const pxX = this.dotStep * this.board.unitX
    const pxY = this.dotStep * this.board.unitY
    // Subtle dot (1px) using radial gradient
    this.container.style.backgroundImage =
      'radial-gradient(circle, #e5e7eb 1px, transparent 1px)'
    this.container.style.backgroundSize = `${pxX}px ${pxY}px`
    // Keep the pattern aligned to the origin
    // If you allow pan/zoom, you could compute an offset from the bbox.
    this.container.style.backgroundPosition = `0 0`
  }
}
