/**
 * Standalone Undo/Redo System for JSXGraph Geometry
 * 
 * This module provides a clean, isolated undo/redo system that can be easily
 * integrated into any JSXGraph-based geometry application.
 */

import JXG from 'jsxgraph'

type JBoard = JXG.Board & { renderer: any }

// Operation types
export type CreateOp = {
  kind: 'create'
  elType: 'point' | 'segment' | 'line' | 'circle'
  payload: any
  _id?: string
  pointIds?: string[]
}

export type DeleteOp = {
  kind: 'delete'
  elType: 'point' | 'segment' | 'line' | 'circle'
  payload: any
  _id?: string
  pointIds?: string[]
}

export type ModifyOp = {
  kind: 'modify'
  pointId: string
  before: { x: number; y: number; name: string }
  after: { x: number; y: number; name: string }
}

export type BundleOp = {
  kind: 'bundle'
  ops: Operation[]
}

export type Operation = CreateOp | DeleteOp | ModifyOp | BundleOp

// Configuration for the undo/redo system
export interface UndoRedoConfig {
  board: JBoard
  onFeedback?: (message: string) => void
  EPS?: number
}

export class UndoRedoManager {
  private board: JBoard
  private undoStack: Operation[] = []
  private redoStack: Operation[] = []
  private onFeedback: ((message: string) => void) | undefined
  private EPS: number
  private txnDepth = 0
  private pendingOps: Operation[] = []
  private suppressTracking = false
  private moveStarts = new Map<string, { x: number; y: number; name: string }>()
  private trackingInterval: NodeJS.Timeout | null = null
  private withinTol(a: number, b: number, tol = this.EPS): boolean { 
    return Math.abs(a - b) <= tol 
  }

  private withSuppressed<T>(fn: () => T): T {
    const prev = this.suppressTracking
    this.suppressTracking = true
    try { return fn() } finally { this.suppressTracking = prev }
  }

  constructor(config: UndoRedoConfig) {
    this.board = config.board
    this.onFeedback = config.onFeedback
    this.EPS = config.EPS || 0.03
    this.setupGlobalPointTracking()
  }

  // Public API
  public pushOperation(op: Operation): void {
    const frozen = structuredClone(op)
    this.withSuppressed(() => this.performOperation(frozen))
    if (this.txnDepth > 0) {
      this.pendingOps.push(frozen)
    } else {
      this.undoStack.push(frozen)
      this.redoStack = [] // Clear redo stack on new operation
    }
  }

  public begin(): void { 
    this.txnDepth++ 
  }

  public commit(): void {
    if (this.txnDepth === 0) return
    this.txnDepth--
    if (this.txnDepth > 0) return
    if (this.pendingOps.length === 0) return
    // compress: push a synthetic op that replays the batch
    const bundle = structuredClone(this.pendingOps)
    this.pendingOps = []
    this.undoStack.push({ kind: 'bundle', ops: bundle } as BundleOp)
    this.redoStack = []
  }

  public undo(): void {
    if (this.undoStack.length === 0) return
    
    const op = this.undoStack.pop()!
    const frozen = structuredClone(op)
    this.suppressTracking = true
    try {
      this.rollbackOperation(frozen)
    } finally {
      this.suppressTracking = false
    }
    this.redoStack.push(frozen)
    this.board.update()
    this.onFeedback?.('')
  }

  public redo(): void {
    if (this.redoStack.length === 0) return
    
    const op = this.redoStack.pop()!
    const frozen = structuredClone(op)
    this.suppressTracking = true
    try {
      this.performOperation(frozen)
    } finally {
      this.suppressTracking = false
    }
    this.undoStack.push(frozen)
    this.board.update()
    this.onFeedback?.('')
  }

  public canUndo(): boolean {
    return this.undoStack.length > 0
  }

  public canRedo(): boolean {
    return this.redoStack.length > 0
  }

  public clear(): void {
    this.undoStack = []
    this.redoStack = []
  }

  public dispose(): void {
    this.moveStarts.clear()
    if (this.trackingInterval) {
      clearInterval(this.trackingInterval)
      this.trackingInterval = null
    }
  }

  private setupGlobalPointTracking(): void {
    // Attach tracking to all existing points
    this.attachTrackingToAllPoints()
    
    // Set up a periodic check to attach tracking to any new points
    this.trackingInterval = setInterval(() => {
      this.attachTrackingToAllPoints()
    }, 1000) // Check every second
  }

  private attachTrackingToAllPoints(): void {
    const objects = Object.values(this.board.objects) as any[]
    for (const obj of objects) {
      if (obj?.elType === 'point' && !obj.visProp?.fixed) {
        this.attachPointTracking(obj)
      }
    }
  }

  private posOf(pt: any): { x: number; y: number; name: string } {
    return { x: pt.X(), y: pt.Y(), name: (pt as any)._rawName || '' }
  }

  private definingPointsOf(obj: any): any[] {
    if (!obj) return []
    if (obj.elType === 'segment' || obj.elType === 'line') {
      const a: any = obj.point1 || obj.A || obj.points?.[0]
      const b: any = obj.point2 || obj.B || obj.points?.[1]
      return [a, b].filter(Boolean)
    }
    if (obj.elType === 'circle') {
      const c: any = obj.center || obj.points?.[0]
      const p: any = obj.point2 || obj.points?.[1]
      return [c, p].filter(Boolean)
    }
    return []
  }

  private attachPointTracking(pt: any): void {
    // Avoid double-binding
    if ((pt as any)._undoRedoBound) return
    ;(pt as any)._undoRedoBound = true

    pt.on('down', () => {
      if (this.suppressTracking) return
      this.moveStarts.set(pt.id, this.posOf(pt))
    })

    pt.on('up', () => {
      if (this.suppressTracking) return
      const start = this.moveStarts.get(pt.id)
      if (!start) return
      const end = this.posOf(pt)

      const moved = !this.withinTol(start.x, end.x) || !this.withinTol(start.y, end.y) || start.name !== end.name
      if (moved) {
        const op: ModifyOp = { kind: 'modify', pointId: pt.id, before: start, after: end }
        this.pushOperation(op)
      }
      this.moveStarts.delete(pt.id)
    })
  }

  private attachShapeTracking(obj: any): void {
    // For segment/line/circle: record a BUNDLE of point moves
    let before: Record<string, { x: number; y: number; name: string }> | null = null
    let pts: any[] = []

    const onDown = () => {
      if (this.suppressTracking) return
      pts = this.definingPointsOf(obj)
      if (pts.length === 0) return
      before = {}
      for (const p of pts) before[p.id] = this.posOf(p)
    }

    const onUp = () => {
      if (this.suppressTracking || !before || pts.length === 0) return
      const ops: Operation[] = []
      for (const p of pts) {
        const b = before![p.id]
        if (!b) continue
        const a = this.posOf(p)
        if (b.x !== a.x || b.y !== a.y || b.name !== a.name) {
          ops.push({
            kind: 'modify',
            pointId: p.id,
            before: b,
            after: a
          } as ModifyOp)
        }
      }
      if (ops.length === 1 && ops[0]) {
        this.pushOperation(ops[0])                 // single move
      } else if (ops.length > 1) {
        this.pushOperation({ kind: 'bundle', ops }) // move both endpoints / center+radius
      }
      before = null
      pts = []
    }

    obj.on('down', onDown)
    obj.on('up', onUp)
  }

  private findPointNear(xy: { x: number; y: number }, tol = this.EPS): any {
    const objs = Object.values(this.board.objects) as any[]
    for (const o of objs) {
      if (o?.elType === 'point') {
        const p = { x: o.X(), y: o.Y() }
        if (Math.hypot(p.x - xy.x, p.y - xy.y) <= tol) return o
      }
    }
    return null
  }

  private isJXGPoint(p: any): boolean {
    return !!(
      p &&
      p.elType === 'point' &&
      typeof p.X === 'function' &&
      typeof p.Y === 'function' &&
      p.board === this.board
    )
  }

  private getPointByIdOrNear(prefId: string | undefined, xy: { x: number; y: number }, tol = this.EPS): any {
    if (prefId) {
      const byId = (this.board.objects as any)[prefId]
      if (byId?.elType === 'point') return byId
    }
    // exact coordinate match first
    for (const o of Object.values(this.board.objects) as any[]) {
      if (o?.elType === 'point' && o.X() === xy.x && o.Y() === xy.y) return o
    }
    // then proximity
    const nearPoint = this.findPointNear(xy, tol)
    if (nearPoint) return nearPoint
    
    // If no point found, return null (will be handled by fallback in calling code)
    return null
  }

  private ensurePoint(
    xy: { x: number; y: number },
    attr: any = { name: '', size: 2, strokeColor: '#444', fillColor: '#666' }
  ): any | null {
    const existing = this.findPointNear(xy)
    if (existing) {
      this.attachPointTracking(existing)
      return existing
    }

    try {
      const pt = this.board.create('point', [xy.x, xy.y], attr)
      if (!this.isJXGPoint(pt)) throw new Error('Invalid point')
      ;(pt as any)._rawName = attr?.name ?? ''
      if (attr?.fixed !== undefined) pt.setAttribute({ fixed: attr.fixed })
      if (attr?.withLabel !== undefined) pt.setAttribute({ withLabel: attr.withLabel })
      
      // Attach move tracking to the new point
      this.attachPointTracking(pt)
      
      return pt
    } catch (error) {
      console.error('Failed to create point:', error)
      return null
    }
  }

  private performOperation(op: Operation): void {
    if (op.kind === 'create') {
      this.performCreate(op)
    } else if (op.kind === 'delete') {
      this.performDelete(op)
    } else if (op.kind === 'modify') {
      this.performModify(op)
    } else if (op.kind === 'bundle') {
      this.performBundle(op)
    }
  }

  private rollbackOperation(op: Operation): void {
    if (op.kind === 'create') {
      this.rollbackCreate(op)
    } else if (op.kind === 'delete') {
      this.rollbackDelete(op)
    } else if (op.kind === 'modify') {
      this.rollbackModify(op)
    } else if (op.kind === 'bundle') {
      this.rollbackBundle(op)
    }
  }

  private performCreate(op: CreateOp): void {
    if (op.elType === 'point') {
      const { x, y, attr } = op.payload
      const pt = this.ensurePoint({ x, y }, attr)
      if (!pt) return
      op._id = pt.id
      // Force board update to ensure point is created immediately
      this.board.update()
      return
    }

    if (op.elType === 'segment' || op.elType === 'line') {
      const { p1, p2, attr } = op.payload
      const a = this.getPointByIdOrNear(op.pointIds?.[0], p1) || this.ensurePoint(p1, attr)
      const b = this.getPointByIdOrNear(op.pointIds?.[1], p2) || this.ensurePoint(p2, attr)

      // If either isn't a real JSXGraph point, fall back to coordinate parents
      const useCoords = !(this.isJXGPoint(a) && this.isJXGPoint(b))
      const parents = useCoords ? [[p1.x, p1.y], [p2.x, p2.y]] : [a, b]

      try {
        const el = this.board.create(op.elType, parents as any, attr)
        op._id = (el as any).id
        // capture actual point ids (works for both segment & line)
        const pA: any = (el as any).point1 || (el as any).A || (el as any).points?.[0]
        const pB: any = (el as any).point2 || (el as any).B || (el as any).points?.[1]
        if (this.isJXGPoint(pA) && this.isJXGPoint(pB)) {
          op.pointIds = [pA.id, pB.id]
          // Attach tracking to the endpoint points if they don't have it yet
          this.attachPointTracking(pA)
          this.attachPointTracking(pB)
        }
        // Attach shape tracking to the element itself
        this.attachShapeTracking(el)
        // Force board update to ensure object is created immediately
        this.board.update()
      } catch (e) {
        console.error(`Failed to create ${op.elType}:`, e, { parents })
      }
      return
    }

    if (op.elType === 'circle') {
      const { center, on, attr } = op.payload
      const c = this.getPointByIdOrNear(op.pointIds?.[0], center) || this.ensurePoint(center, attr)
      const p = this.getPointByIdOrNear(op.pointIds?.[1], on) || this.ensurePoint(on, attr)

      const useCoords = !(this.isJXGPoint(c) && this.isJXGPoint(p))
      const parents = useCoords ? [[center.x, center.y], [on.x, on.y]] : [c, p]

      try {
        const el = this.board.create('circle', parents as any, attr)
        op._id = (el as any).id
        const pc: any = (el as any).center || (el as any).points?.[0]
        const pp: any = (el as any).point2 || (el as any).points?.[1]
        if (this.isJXGPoint(pc) && this.isJXGPoint(pp)) {
          op.pointIds = [pc.id, pp.id]
          // Attach tracking to the center and on-point if they don't have it yet
          this.attachPointTracking(pc)
          this.attachPointTracking(pp)
        }
        // Attach shape tracking to the circle element itself
        this.attachShapeTracking(el)
        // Force board update to ensure object is created immediately
        this.board.update()
      } catch (e) {
        console.error('Failed to create circle:', e, { parents })
      }
      return
    }
  }

  private rollbackCreate(op: CreateOp): void {
    if (!op._id) return
    
    const obj = (this.board.objects as any)[op._id]
    if (obj) {
      try {
        this.board.removeObject(obj as JXG.GeometryElement)
      } catch (error) {
        console.error('Failed to remove object:', error, op._id)
      }
    } else {
      // Try to find and remove by matching definition as fallback
      this.removeByMatchingDefinition({
        kind: 'delete',
        elType: op.elType,
        payload: op.payload,
        _id: op._id,
        pointIds: op.pointIds || []
      })
    }
    
    // Remove associated points if they're not used elsewhere
    if (op.pointIds && (op.elType === 'segment' || op.elType === 'line' || op.elType === 'circle')) {
      op.pointIds.forEach((pointId: string) => {
        const pointObj = (this.board.objects as any)[pointId]
        if (pointObj && !this.isPointUsedElsewhere(pointId, pointObj)) {
          try {
            this.board.removeObject(pointObj as JXG.GeometryElement)
          } catch (error) {
            console.error('Failed to remove point:', error, pointId)
          }
        }
      })
    }
  }

  private performDelete(op: DeleteOp): void {
    if (op._id) {
      const target = (this.board.objects as any)[op._id]
      if (target) {
        this.board.removeObject(target as JXG.GeometryElement)
        // Force board update to ensure object is removed immediately
        this.board.update()
      }
    } else {
      // If _id is missing, try to find and remove by matching defining points and attributes
      this.removeByMatchingDefinition(op)
      // Force board update after removing by matching
      this.board.update()
    }
    
    // Remove associated points if they're not used elsewhere
    if (op.pointIds && (op.elType === 'segment' || op.elType === 'line' || op.elType === 'circle')) {
      op.pointIds.forEach((pointId: string) => {
        const pointObj = (this.board.objects as any)[pointId]
        if (pointObj && !this.isPointUsedElsewhere(pointId, pointObj)) {
          this.board.removeObject(pointObj as JXG.GeometryElement)
        }
      })
      // Force board update after removing points
      this.board.update()
    }
  }

  private removeByMatchingDefinition(op: DeleteOp): void {
    const objects = Object.values(this.board.objects) as any[]
    
    for (const obj of objects) {
      if (obj.elType !== op.elType) continue
      
      let matches = false
      
      if (op.elType === 'point') {
        const { x, y } = op.payload
        matches = Math.abs(obj.X() - x) < this.EPS && Math.abs(obj.Y() - y) < this.EPS
      } else if (op.elType === 'segment' || op.elType === 'line') {
        const { p1, p2 } = op.payload
        const a = obj.point1 || obj.A || obj.points?.[0]
        const b = obj.point2 || obj.B || obj.points?.[1]
        if (a && b) {
          matches = Math.abs(a.X() - p1.x) < this.EPS && Math.abs(a.Y() - p1.y) < this.EPS &&
                   Math.abs(b.X() - p2.x) < this.EPS && Math.abs(b.Y() - p2.y) < this.EPS
        }
      } else if (op.elType === 'circle') {
        const { center, on } = op.payload
        const c = obj.center || obj.midpoint || obj.points?.[0]
        const p = obj.point2 || obj.points?.[1]
        if (c) {
          const centerMatches = Math.abs(c.X() - center.x) < this.EPS && Math.abs(c.Y() - center.y) < this.EPS
          if (p) {
            matches = centerMatches && Math.abs(p.X() - on.x) < this.EPS && Math.abs(p.Y() - on.y) < this.EPS
          } else {
            // For circles defined by center and radius
            const R = (typeof obj.R === 'function' ? obj.R() : obj.radius) ?? 1
            const expectedRadius = Math.hypot(on.x - center.x, on.y - center.y)
            matches = centerMatches && Math.abs(R - expectedRadius) < this.EPS
          }
        }
      }
      
      if (matches) {
        this.board.removeObject(obj as JXG.GeometryElement)
        break
      }
    }
  }

  private rollbackDelete(op: DeleteOp): void {
    if (op.elType === 'point') {
      const { x, y, attr } = op.payload
      const pt = this.ensurePoint({ x, y }, attr)
      if (!pt) return
      op._id = pt.id
      // Force board update to ensure point is created immediately
      this.board.update()
      return
    }

    if (op.elType === 'segment' || op.elType === 'line') {
      const { p1, p2, attr } = op.payload
      const a = this.getPointByIdOrNear(op.pointIds?.[0], p1) || this.ensurePoint(p1, attr)
      const b = this.getPointByIdOrNear(op.pointIds?.[1], p2) || this.ensurePoint(p2, attr)
      
      const useCoords = !(this.isJXGPoint(a) && this.isJXGPoint(b))
      const parents = useCoords ? [[p1.x, p1.y], [p2.x, p2.y]] : [a, b]
      
      try {
        const el = this.board.create(op.elType, parents as any, attr)
        op._id = (el as any).id
        const pA: any = (el as any).point1 || (el as any).A || (el as any).points?.[0]
        const pB: any = (el as any).point2 || (el as any).B || (el as any).points?.[1]
        if (this.isJXGPoint(pA) && this.isJXGPoint(pB)) {
          op.pointIds = [pA.id, pB.id]
        }
        // Attach shape tracking to the recreated element
        this.attachShapeTracking(el)
        // Force board update to ensure object is created immediately
        this.board.update()
      } catch (e) {
        console.error(`Failed to recreate ${op.elType}:`, e, { parents })
      }
      return
    }

    if (op.elType === 'circle') {
      const { center, on, attr } = op.payload
      const c = this.getPointByIdOrNear(op.pointIds?.[0], center) || this.ensurePoint(center, attr)
      const p = this.getPointByIdOrNear(op.pointIds?.[1], on) || this.ensurePoint(on, attr)

      const useCoords = !(this.isJXGPoint(c) && this.isJXGPoint(p))
      const parents = useCoords ? [[center.x, center.y], [on.x, on.y]] : [c, p]

      try {
        const el = this.board.create('circle', parents as any, attr)
        op._id = (el as any).id
        const pc: any = (el as any).center || (el as any).points?.[0]
        const pp: any = (el as any).point2 || (el as any).points?.[1]
        if (this.isJXGPoint(pc) && this.isJXGPoint(pp)) {
          op.pointIds = [pc.id, pp.id]
        }
        // Attach shape tracking to the recreated circle element
        this.attachShapeTracking(el)
        // Force board update to ensure object is created immediately
        this.board.update()
      } catch (e) {
        console.error('Failed to recreate circle:', e, { parents })
      }
      return
    }
  }

  private performModify(op: ModifyOp): void {
    const pointObj = (this.board.objects as any)[op.pointId]
    if (pointObj) {
      // Use moveTo instead of setPosition to avoid draggable function issues
      try {
        pointObj.moveTo([op.after.x, op.after.y])
      } catch (e) {
        // Fallback to direct coordinate setting
        pointObj.coords.setCoordinates(JXG.COORDS_BY_USER, [op.after.x, op.after.y])
        this.board.update()
      }
      this.setPointName(pointObj, op.after.name)
    }
  }

  private rollbackModify(op: ModifyOp): void {
    const pointObj = (this.board.objects as any)[op.pointId]
    if (pointObj) {
      // Use moveTo instead of setPosition to avoid draggable function issues
      try {
        pointObj.moveTo([op.before.x, op.before.y])
      } catch (e) {
        // Fallback to direct coordinate setting
        pointObj.coords.setCoordinates(JXG.COORDS_BY_USER, [op.before.x, op.before.y])
        this.board.update()
      }
      this.setPointName(pointObj, op.before.name)
    }
  }

  private performBundle(op: BundleOp): void {
    // Execute operations in forward order
    for (const subOp of op.ops) {
      if (subOp) {
        try {
          // Create a fresh copy of the operation to avoid stale IDs
          const freshOp = structuredClone(subOp)
          // Keep IDs intact - don't delete them
          this.performOperation(freshOp)
          // Write back the realized IDs to the original operation
          if (freshOp.kind === 'create' || freshOp.kind === 'delete') {
            const freshOpTyped = freshOp as CreateOp | DeleteOp
            const subOpTyped = subOp as CreateOp | DeleteOp
            if (freshOpTyped._id !== undefined) {
              subOpTyped._id = freshOpTyped._id
            }
            if (freshOpTyped.pointIds !== undefined) {
              subOpTyped.pointIds = freshOpTyped.pointIds
            }
          }
        } catch (error) {
          console.error('Error executing bundled operation:', error, subOp)
          // Continue with other operations even if one fails
        }
      }
    }
    // Force board update after all bundle operations
    this.board.update()
  }

  private rollbackBundle(op: BundleOp): void {
    // Rollback operations in reverse order
    for (let i = op.ops.length - 1; i >= 0; i--) {
      const subOp = op.ops[i]
      if (subOp) {
        try {
          // Create a fresh copy of the operation to avoid stale IDs
          const freshOp = structuredClone(subOp)
          // Keep IDs intact - don't delete them
          this.rollbackOperation(freshOp)
          // Write back the realized IDs to the original operation
          if (freshOp.kind === 'create' || freshOp.kind === 'delete') {
            const freshOpTyped = freshOp as CreateOp | DeleteOp
            const subOpTyped = subOp as CreateOp | DeleteOp
            if (freshOpTyped._id !== undefined) {
              subOpTyped._id = freshOpTyped._id
            }
            if (freshOpTyped.pointIds !== undefined) {
              subOpTyped.pointIds = freshOpTyped.pointIds
            }
          }
        } catch (error) {
          console.error('Error rolling back bundled operation:', error, subOp)
          // Continue with other operations even if one fails
        }
      }
    }
    // Force board update after all bundle rollback operations
    this.board.update()
  }

  private setPointName(pointObj: any, name: string): void {
    const trimmed = (name || '').trim()
    const pretty = this.toSubscript(trimmed)
    pointObj.setAttribute({ name: pretty, withLabel: !!trimmed })
    ;(pointObj as any)._rawName = trimmed
  }

  private toSubscript(name: string): string {
    const map: Record<string, string> = { 
      '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', 
      '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉' 
    }
    return name.replace(/_(\d+)/g, (_, d) => d.split('').map((ch: string) => map[ch] ?? ch).join(''))
  }

  private isPointUsedElsewhere(pointId: string, pointObj: any): boolean {
    return Object.values(this.board.objects).some((otherObj: any) => {
      if (otherObj === pointObj || otherObj.id === pointId) return false
      if (otherObj.point1?.id === pointId || otherObj.point2?.id === pointId) return true
      if (otherObj.center?.id === pointId) return true
      if (otherObj.points && Array.isArray(otherObj.points)) {
        return otherObj.points.some((p: any) => p?.id === pointId)
      }
      return false
    })
  }

  // Helper methods for creating operations
  public createPointOperation(x: number, y: number, attr: any = { name: '', size: 2, strokeColor: '#444', fillColor: '#666' }): CreateOp {
    return {
      kind: 'create',
      elType: 'point',
      payload: { x, y, attr }
    }
  }

  public createSegmentOperation(p1: { x: number; y: number }, p2: { x: number; y: number }, attr: any): CreateOp {
    return {
      kind: 'create',
      elType: 'segment',
      payload: { p1, p2, attr }
    }
  }

  public createLineOperation(p1: { x: number; y: number }, p2: { x: number; y: number }, attr: any): CreateOp {
    return {
      kind: 'create',
      elType: 'line',
      payload: { p1, p2, attr }
    }
  }

  public createCircleOperation(center: { x: number; y: number }, on: { x: number; y: number }, attr: any): CreateOp {
    return {
      kind: 'create',
      elType: 'circle',
      payload: { center, on, attr }
    }
  }

  public createDeleteOperation(obj: any): DeleteOp | null {
    try {
      const attr = this.getCommonAttr(obj)
      if (obj.elType === 'point') {
        return {
          kind: 'delete',
          elType: 'point',
          payload: { x: obj.X(), y: obj.Y(), attr },
          _id: obj.id
        }
      }
      if (obj.elType === 'segment' || obj.elType === 'line') {
        const a: any = obj.point1 || obj.A || obj.points?.[0]
        const b: any = obj.point2 || obj.B || obj.points?.[1]
        if (!a || !b) return null
        return {
          kind: 'delete',
          elType: obj.elType,
          payload: { p1: { x: a.X(), y: a.Y() }, p2: { x: b.X(), y: b.Y() }, attr },
          _id: obj.id,
          pointIds: [a.id, b.id]
        }
      }
      if (obj.elType === 'circle') {
        const c: any = obj.center || obj.midpoint || obj.points?.[0]
        const p: any = obj.point2 || obj.points?.[1]
        const center = c ? { x: c.X(), y: c.Y() } : { x: obj.center?.X?.() ?? 0, y: obj.center?.Y?.() ?? 0 }
        let on
        if (p) {
          on = { x: p.X(), y: p.Y() }
        } else {
          const R = (typeof obj.R === 'function' ? obj.R() : obj.radius) ?? 1
          on = { x: center.x + R, y: center.y }
        }
        return {
          kind: 'delete',
          elType: 'circle',
          payload: { center, on, attr },
          _id: obj.id,
          pointIds: c && p ? [c.id, p.id] : []
        }
      }
    } catch {
      return null
    }
    return null
  }

  private getCommonAttr(o: any): any {
    return {
      name: o?._rawName ?? '',
      withLabel: !!(o?.visProp?.withlabel || o?.visProp?.withLabel),
      fixed: !!o?.visProp?.fixed,
      size: o?.visProp?.size,
      strokeColor: o?.visProp?.strokecolor ?? o?.visProp?.strokeColor,
      strokeWidth: o?.visProp?.strokewidth ?? o?.visProp?.strokeWidth,
      fillColor: o?.visProp?.fillcolor ?? o?.visProp?.fillColor,
      dash: o?.visProp?.dash
    }
  }

  // Helper methods for UI integration
  public fromBoardDeleteUnderMouse(e: any): DeleteOp | null {
    const under = this.board.getAllObjectsUnderMouse(e)
    const o: any = under.find((x: any) => !x?.visProp?.fixed)
    return o ? this.createDeleteOperation(o) : null
  }

  public createModifyOperation(pointId: string, before: { x: number; y: number; name: string }, after: { x: number; y: number; name: string }): ModifyOp {
    return {
      kind: 'modify',
      pointId,
      before,
      after
    }
  }
}
