import { UNIT_LABEL } from './measurement-scale'

type JBoard = any

const ALLOWED_TYPES = new Set(['point', 'segment', 'line', 'circle', 'polygon'])

function serializeGeometry(obj: any) {
  const type = obj?.elType
  if (type === 'point') {
    return { x: obj.X(), y: obj.Y() }
  }
  if (type === 'segment' || type === 'line') {
    const p1 = (obj.points && obj.points[0]) ? obj.points[0] : (obj.point1 || null)
    const p2 = (obj.points && obj.points[1]) ? obj.points[1] : (obj.point2 || null)
    return p1 && p2 ? { x1: p1.X(), y1: p1.Y(), x2: p2.X(), y2: p2.Y() } : null
  }
  if (type === 'circle') {
    const c = obj.center
    const on = obj.point2 || (obj.points && obj.points[1]) || null
    const center = c ? { x: c.X(), y: c.Y() } : null
    const radius = (c && on) ? Math.hypot(on.X() - c.X(), on.Y() - c.Y()) : (typeof obj.R === 'function' ? obj.R() : undefined)
    return center && radius != null ? { center, radius } : null
  }
  if (type === 'polygon') {
    const verts = Array.isArray(obj.vertices) ? obj.vertices.map((v:any)=>({ x: v.X(), y: v.Y() })) : []
    return verts.length >= 3 ? { vertices: verts } : null
  }
  return null
}

export function exportBoard(brd: JBoard) {
  const bbox = brd.getBoundingBox()
  const [left, top, right, bottom] = bbox
  const EPS = 1e-9
  const isOnBorder = (x:number, y:number) => (
    Math.abs(x - left) < EPS || Math.abs(x - right) < EPS ||
    Math.abs(y - top) < EPS || Math.abs(y - bottom) < EPS
  )

  const snapshot = {
    timestamp: new Date().toISOString(),
    unit: UNIT_LABEL,
    boundingBoxCm: bbox,
    objects: Object.values(brd.objects)
      .filter((obj: any) => ALLOWED_TYPES.has(obj.elType))
      .map((obj: any) => {
        const geometry = serializeGeometry(obj)
        // Drop unnamed border points to avoid exporting grid/bbox helpers
        if (obj.elType === 'point' && geometry && !obj.name) {
          if (isOnBorder(geometry.x, geometry.y)) return null
        }
        return {
          id: obj.id,
          type: obj.elType,
          name: obj.name,
          geometry
        }
      })
      .filter(Boolean as any)
      .filter((o:any) => o.geometry !== null)
  }
  return snapshot
}

export function importBoard(brd: JBoard, data: any) {
  if (!data || !Array.isArray(data.objects)) return
  const objs = data.objects
  const createdById: Record<string, any> = {}

  const applyAttrs = (el: any, src: any) => {
    try {
      el?.setAttribute?.({ visible: true })
      const name = src?.name || ''
      el?.setAttribute?.({ name, withLabel: !!name })
      if (src?.id) { try { (el as any).id = src.id } catch {} }
    } catch {}
  }

  // Points first
  for (const o of objs) {
    if (o?.type === 'point') {
      const g = o.geometry
      if (g?.x == null || g?.y == null) continue
      const pt = brd.create('point', [g.x, g.y], { snapToGrid: false })
      applyAttrs(pt, o)
      createdById[o.id] = pt
    }
  }

  // Segments and lines
  for (const o of objs) {
    if (o?.type === 'segment' || o?.type === 'line') {
      const g = o.geometry
      if (!(g && g.x1 != null && g.y1 != null && g.x2 != null && g.y2 != null)) continue
      const a = brd.create('point', [g.x1, g.y1], { name: '', snapToGrid: false })
      const b = brd.create('point', [g.x2, g.y2], { name: '', snapToGrid: false })
      const el = brd.create(o.type, [a, b])
      applyAttrs(el, o)
      createdById[o.id] = el
    }
  }

  // Circles
  for (const o of objs) {
    if (o?.type === 'circle') {
      const g = o.geometry
      if (!(g?.center && g?.radius != null)) continue
      const center = brd.create('point', [g.center.x, g.center.y], { name: '', snapToGrid: false })
      const on = brd.create('point', [g.center.x + g.radius, g.center.y], { name: '', snapToGrid: false })
      const el = brd.create('circle', [center, on])
      applyAttrs(el, o)
      createdById[o.id] = el
    }
  }

  // Polygons
  for (const o of objs) {
    if (o?.type === 'polygon') {
      const g = o.geometry
      if (!(g?.vertices && Array.isArray(g.vertices) && g.vertices.length >= 3)) continue
      const vertices = g.vertices.map((v:any)=> brd.create('point', [v.x, v.y], { name: '', snapToGrid: false }))
      const el = brd.create('polygon', vertices)
      applyAttrs(el, o)
      createdById[o.id] = el
    }
  }

  brd.update?.()
}


