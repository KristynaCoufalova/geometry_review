// lib/geometry-factory.ts
import JXG from 'jsxgraph'
import { JBoard } from './board-manager'
import { GridMode } from './grid-manager'

export type CreateAttrs = Partial<JXG.Options>

export class GeometryFactory {
  constructor(private board: JBoard) {}

  /**
   * Get snap size based on grid mode
   */
  getSnapSize(gridMode: GridMode): number {
    if (gridMode === 'none') return 0.25
    if (gridMode === 'minor') return 0.1
    return 0.25
  }

  /**
   * Get EPS for finding nearby points based on grid mode
   */
  getNearbyEps(gridMode: GridMode, baseEps: number = 0.05): number {
    const snapSize = gridMode === 'none' ? 0.1 : (gridMode === 'minor' ? 0.1 : 0.25)
    return Math.max(baseEps, snapSize * 0.8)
  }

  point(x: number, y: number, snap = true, attrs: CreateAttrs = {}) {
    const pt = this.board.create('point', [x, y], {
      name: '', size: 2, strokeColor: '#444', fillColor: '#666',
      snapToGrid: snap, snapSizeX: 0.5, snapSizeY: 0.5,
      ...attrs
    })
    ;(pt as any)._rawName = ''
    return pt
  }

  /**
   * Create a point with grid-aware snap settings
   */
  pointWithGrid(x: number, y: number, gridMode: GridMode, attrs: CreateAttrs = {}) {
    const snap = gridMode !== 'none'
    const snapSize = this.getSnapSize(gridMode)
    return this.point(x, y, snap, {
      snapSizeX: snapSize,
      snapSizeY: snapSize,
      ...attrs
    })
  }

  segment(a: any, b: any, attrs: CreateAttrs = {}) {
    return this.board.create('segment', [a, b], {
      strokeColor:'#2563eb', strokeWidth:2, ...attrs
    })
  }

  line(a: any, b: any, attrs: CreateAttrs = {}) {
    return this.board.create('line', [a, b], {
      strokeColor:'#059669', strokeWidth:1, dash:1, ...attrs
    })
  }

  circle(center: any, on: any, attrs: CreateAttrs = {}) {
    return this.board.create('circle', [center, on], {
      strokeColor:'#dc2626', strokeWidth:2, ...attrs
    })
  }

  findNearbyPoint(x: number, y: number, eps: number) {
    const objs = Object.values(this.board.objects) as any[]
    return objs.find(o => o?.elType === 'point' && !o.visProp?.fixed &&
      Math.hypot(o.X() - x, o.Y() - y) <= eps) || null
  }
}

