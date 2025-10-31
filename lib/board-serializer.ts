import JXG from 'jsxgraph'
import { UNIT_LABEL } from './measurement-scale'

export type Snapshot = {
  version: 1
  timestamp: string
  unit: string
  bbox: number[]
  objects: Array<
    | { id?: string; type: 'point'; name?: string; properties?: any; x: number; y: number }
    | { id?: string; type: 'segment'|'line'; name?: string; properties?: any;
        x1: number; y1: number; x2: number; y2: number }
    | { id?: string; type: 'circle'; name?: string; properties?: any;
        center:{x:number;y:number}; radius:number }
    | { id?: string; type: 'polygon'; name?: string; properties?: any;
        vertices:{x:number;y:number}[] }
  >
  meta?: Record<string, any> // tool positions, gridMode, etc.
}

// Robust circle geometry extraction
function circleGeometry(obj: any) {
  const c = obj.center
  const on = obj.point2 ?? obj.points?.[1] ?? null

  if (c && on) {
    return {
      center: { x: c.X(), y: c.Y() },
      radius: Math.hypot(on.X() - c.X(), on.Y() - c.Y()),
    }
  }

  // Last resort: try method name variants if present
  const r =
    (typeof obj.Radius === 'function' && obj.Radius()) ||
    (typeof obj.getRadius === 'function' && obj.getRadius())

  if (c && Number.isFinite(r)) {
    return { center: { x: c.X(), y: c.Y() }, radius: r }
  }

  // If we can't guarantee a valid radius, return null (so you notice in logs)
  return null
}

export function exportBoard(brd: JXG.Board, meta?: Record<string, any>): Snapshot {
  const bbox = brd.getBoundingBox()
  const [left, top, right, bottom] = bbox
  const EPS = 1e-9
  const isOnBorder = (x:number, y:number) => (
    Math.abs(x - left) < EPS || Math.abs(x - right) < EPS ||
    Math.abs(y - top) < EPS || Math.abs(y - bottom) < EPS
  )

  const objects = Object.values(brd.objects).flatMap((o: any): Snapshot['objects'] => {
    if (!o || !o.elType) return []
    const t = o.elType
    try {
      if (t === 'point') {
        if (typeof o.X !== 'function' || typeof o.Y !== 'function') return []
        const x = o.X()
        const y = o.Y()
        if (!isFinite(x) || !isFinite(y)) return []
        // Drop unnamed border points to avoid exporting grid/bbox helpers
        if (!o.name && isOnBorder(x, y)) return []
        
        // Export point properties
        const props: any = {}
        if (o.visProp) {
          if (o.visProp.strokeColor) props.strokeColor = o.visProp.strokeColor
          if (o.visProp.fillColor) props.fillColor = o.visProp.fillColor
          if (o.visProp.size !== undefined) props.size = o.visProp.size
          if (o.visProp.fixed !== undefined) props.fixed = o.visProp.fixed
        }
        
        return [{ 
          id: o.id, 
          type: 'point' as const, 
          name: o.name || '', 
          properties: Object.keys(props).length > 0 ? props : undefined,
          x, 
          y 
        }]
      }
      if (t === 'segment' || t === 'line') {
        const p1 = o.points?.[0] ?? o.point1
        const p2 = o.points?.[1] ?? o.point2
        if (!p1 || !p2 || typeof p1.X !== 'function' || typeof p2.X !== 'function') return []
        try {
          const x1 = p1.X(), y1 = p1.Y()
          const x2 = p2.X(), y2 = p2.Y()
          if (!isFinite(x1) || !isFinite(y1) || !isFinite(x2) || !isFinite(y2)) return []
          
          // Export line/segment properties
          const props: any = {}
          if (o.visProp) {
            if (o.visProp.strokeColor) props.strokeColor = o.visProp.strokeColor
            if (o.visProp.strokeWidth !== undefined) props.strokeWidth = o.visProp.strokeWidth
            if (o.visProp.dash !== undefined) props.dash = o.visProp.dash
          }
          
          return [{ 
            id: o.id, 
            type: t, 
            name: o.name || '', 
            properties: Object.keys(props).length > 0 ? props : undefined,
            x1, y1, x2, y2 
          }]
        } catch {
          return []
        }
      }
      if (t === 'circle') {
        const geom = circleGeometry(o)
        if (!geom) return []
        
        // Export circle properties
        const props: any = {}
        if (o.visProp) {
          if (o.visProp.strokeColor) props.strokeColor = o.visProp.strokeColor
          if (o.visProp.strokeWidth !== undefined) props.strokeWidth = o.visProp.strokeWidth
        }
        
        return [{ 
          id: o.id, 
          type: 'circle' as const, 
          name: o.name || '', 
          properties: Object.keys(props).length > 0 ? props : undefined,
          center: geom.center, 
          radius: geom.radius 
        }]
      }
      if (t === 'polygon') {
        const vertices = o.vertices ?? []
        if (!Array.isArray(vertices) || vertices.length < 3) return []
        try {
          const verts: {x: number; y: number}[] = []
          for (const v of vertices) {
            if (!v || typeof v.X !== 'function' || typeof v.Y !== 'function') continue
            try {
              const x = v.X()
              const y = v.Y()
              if (isFinite(x) && isFinite(y)) {
                verts.push({x, y})
              }
            } catch {
              continue
            }
          }
          if (verts.length < 3) return []
          
          // Export polygon properties
          const props: any = {}
          if (o.visProp) {
            if (o.visProp.strokeColor) props.strokeColor = o.visProp.strokeColor
            if (o.visProp.fillColor) props.fillColor = o.visProp.fillColor
            if (o.visProp.strokeWidth !== undefined) props.strokeWidth = o.visProp.strokeWidth
          }
          
          return [{ 
            id: o.id, 
            type: 'polygon' as const, 
            name: o.name || '', 
            properties: Object.keys(props).length > 0 ? props : undefined,
            vertices: verts 
          }]
        } catch {
          return []
        }
      }
    } catch {
      // Skip objects that throw errors during export
      return []
    }
    return []
  })

  const result: Snapshot = {
    version: 1,
    timestamp: new Date().toISOString(),
    unit: UNIT_LABEL,
    bbox,
    objects,
  }
  if (meta) result.meta = meta
  return result
}

// Convert old format (with geometry nested) to new format
function normalizeSnapshot(data: any): Snapshot | null {
  // Already new format
  if (data && data.version === 1 && Array.isArray(data.objects)) {
    return data as Snapshot
  }
  
  // Old format: objects have geometry nested
  if (Array.isArray(data.objects)) {
    const normalized: Snapshot = {
      version: 1,
      timestamp: data.timestamp || new Date().toISOString(),
      unit: data.unit || 'cm',
      bbox: data.boundingBoxCm || data.bbox || [-1, 8, 11, -1],
      objects: []
    }
    
    for (const o of data.objects) {
      if (!o || !o.type || o.geometry === null) continue
      
      const g = o.geometry
      if (!g) continue
      
      if (o.type === 'point' && g.x != null && g.y != null) {
        normalized.objects.push({ 
          type: 'point', 
          id: o.id, 
          name: o.name || '', 
          properties: o.properties,
          x: g.x, 
          y: g.y 
        })
      } else if ((o.type === 'segment' || o.type === 'line') && g.x1 != null && g.y1 != null && g.x2 != null && g.y2 != null) {
        normalized.objects.push({ 
          type: o.type, 
          id: o.id, 
          name: o.name || '', 
          properties: o.properties,
          x1: g.x1, 
          y1: g.y1, 
          x2: g.x2, 
          y2: g.y2 
        })
      } else if (o.type === 'circle' && g.center && g.radius != null) {
        normalized.objects.push({ 
          type: 'circle', 
          id: o.id, 
          name: o.name || '', 
          properties: o.properties,
          center: g.center, 
          radius: g.radius 
        })
      } else if (o.type === 'polygon' && Array.isArray(g.vertices) && g.vertices.length >= 3) {
        normalized.objects.push({ 
          type: 'polygon', 
          id: o.id, 
          name: o.name || '', 
          properties: o.properties,
          vertices: g.vertices 
        })
      }
    }
    
    if (data.meta) {
      normalized.meta = data.meta
    } else if (data.gridOption || data.rulerPosition || data.trianglePosition || data.protractorPosition) {
      normalized.meta = {
        gridOption: data.gridOption,
        rulerPosition: data.rulerPosition,
        trianglePosition: data.trianglePosition,
        protractorPosition: data.protractorPosition,
        rulerVisible: data.rulerVisible,
        triangleVisible: data.triangleVisible,
        protractorVisible: data.protractorVisible,
        createdStack: data.createdStack
      }
    }
    
    return normalized
  }
  
  return null
}

// Strict, whitelisted import. No DOM here.
export function importBoard(brd: JXG.Board, snapshot: any) {
  const normalized = normalizeSnapshot(snapshot)
  if (!normalized || normalized.version !== 1) {
    throw new Error('Unsupported snapshot version or invalid format')
  }
  
  const data = normalized

  // Remove current (non-fixed) objects first
  const remove: any[] = []
  for (const k in brd.objects) {
    const o: any = (brd.objects as any)[k]
    if (!o?.visProp?.fixed) remove.push(o)
  }
  remove.forEach(o => {
    try {
      brd.removeObject(o)
    } catch (e) {
      console.warn('Failed to remove object:', e)
    }
  })

  // Disable grid snapping during import
  const prevSnapToGrid = JXG.Options?.point?.snapToGrid
  const prevSnapX = JXG.Options?.point?.snapSizeX
  const prevSnapY = JXG.Options?.point?.snapSizeY
  if (JXG.Options?.point) {
    JXG.Options.point.snapToGrid = false
  }

  try {
    const pointMap = new Map<string, any>() // key: "x:y" -> point element
    const HASH = 1e-5 // precision for point deduplication (0.00001 world units)

    // Helper to generate point key
    const keyOf = (x:number, y:number) => `${Math.round(x / HASH)}:${Math.round(y / HASH)}`

    // Helper to find or create point (deduplication)
    const findOrCreatePoint = (x:number, y:number, name?:string, props?:any): any => {
      if (x == null || y == null || !isFinite(x) || !isFinite(y)) return null
      const key = keyOf(x, y)
      
      // Check if point already exists at this location
      if (pointMap.has(key)) {
        const existing = pointMap.get(key)
        if (existing && typeof existing.X === 'function') {
          // Update name if provided and not empty
          if (name && name.trim()) {
            try {
              existing.setAttribute({ name, withLabel: true })
            } catch {}
          }
          return existing
        }
      }
      
      // Create new point
      try {
        const attrs: any = {
          name: name || '',
          withLabel: !!(name && name.trim()),
          snapToGrid: false,
          fixed: false,
          size: 2,
          strokeColor: '#444',
          fillColor: '#666',
          visible: true
        }
        
        // Apply saved properties
        if (props) {
          if (props.strokeColor) attrs.strokeColor = props.strokeColor
          if (props.fillColor) attrs.fillColor = props.fillColor
          if (props.size !== undefined) attrs.size = props.size
          if (props.fixed !== undefined) attrs.fixed = props.fixed
        }
        
        const pt = brd.create('point', [x, y], attrs)
        if (pt && typeof pt.X === 'function') {
          pointMap.set(key, pt)
          return pt
        }
      } catch (e) {
        console.warn('Failed to create point:', e)
      }
      return null
    }

    const baseStyle = (kind:string, props?:any) => {
      const base:any = { visible:true, snapToGrid: false }
      if (kind==='segment') base.strokeWidth=2
      if (kind==='line')    base.strokeWidth=1
      if (kind==='circle')  base.strokeWidth=2
      
      // Apply saved properties
      if (props) {
        if (props.strokeColor) base.strokeColor = props.strokeColor
        if (props.strokeWidth !== undefined) base.strokeWidth = props.strokeWidth
        if (props.dash !== undefined) base.dash = props.dash
        if (props.fillColor) base.fillColor = props.fillColor
      }
      
      return base
    }

    // Process objects in order: points first, then shapes
    const points = data.objects.filter(o => o.type === 'point')
    const shapes = data.objects.filter(o => o.type !== 'point')

    // Create all points first
    for (const o of points) {
      if (o.type === 'point') {
        findOrCreatePoint(o.x, o.y, o.name, o.properties)
      }
    }

    // Update board after creating points to ensure they're initialized
    try {
      brd.update()
    } catch (e) {
      console.warn('Board update after points failed:', e)
    }

    // Now create shapes (segments, lines, circles, polygons)
    for (const o of shapes) {
      try {
        if (o.type === 'segment' || o.type === 'line') {
          const p1 = findOrCreatePoint(o.x1, o.y1)
          const p2 = findOrCreatePoint(o.x2, o.y2)
          
          if (!p1 || !p2) {
            console.warn(`Skipping ${o.type}: invalid points at (${o.x1}, ${o.y1}), (${o.x2}, ${o.y2})`)
            continue
          }
          
          const el = brd.create(o.type, [p1, p2], baseStyle(o.type, o.properties))
          if (!el) {
            console.warn(`Failed to create ${o.type}`)
            continue
          }
          
          if (o.id) {
            try { (el as any).id = o.id } catch {}
          }
          
          if (o.name && o.name.trim() && 'setAttribute' in el) {
            try {
              el.setAttribute({ name: o.name, withLabel: true })
            } catch {}
          }
        } else if (o.type === 'circle') {
          const c = findOrCreatePoint(o.center.x, o.center.y)
          
          if (!c) {
            console.warn('Skipping circle: invalid center')
            continue
          }
          
          // Create on-point for circle
          const onX = o.center.x + o.radius
          const onY = o.center.y
          const on = brd.create('point', [onX, onY], {
            visible: false,
            fixed: true,
            snapToGrid: false
          })
          
          if (!on) {
            console.warn('Skipping circle: failed to create on-point')
            continue
          }
          
          const el = brd.create('circle', [c, on], baseStyle('circle', o.properties))
          if (!el) {
            console.warn('Failed to create circle')
            // Clean up on-point
            try {
              brd.removeObject(on)
            } catch {}
            continue
          }
          
          if (o.id) {
            try { (el as any).id = o.id } catch {}
          }
          
          if (o.name && o.name.trim() && 'setAttribute' in el) {
            try {
              el.setAttribute({ name: o.name, withLabel: true })
            } catch {}
          }
        } else if (o.type === 'polygon') {
          const pts = o.vertices.map((v:any) => findOrCreatePoint(v.x, v.y)).filter(p => p !== null)
          
          if (pts.length < 3) {
            console.warn('Skipping polygon: need at least 3 points, got', pts.length)
            continue
          }
          
          const el = brd.create('polygon', pts, baseStyle('polygon', o.properties))
          if (!el) {
            console.warn('Failed to create polygon')
            continue
          }
          
          if (o.id) {
            try { (el as any).id = o.id } catch {}
          }
          
          if (o.name && o.name.trim() && 'setAttribute' in el) {
            try {
              el.setAttribute({ name: o.name, withLabel: true })
            } catch {}
          }
        }
      } catch (e) {
        console.warn('Failed to create object:', o, e)
      }
    }

    // Final update to render everything
    try {
      brd.update()
    } catch (e) {
      console.error('Final board update failed:', e)
    }
  } finally {
    // Restore global options
    if (JXG.Options?.point) {
      if (prevSnapToGrid !== undefined) JXG.Options.point.snapToGrid = prevSnapToGrid
      if (prevSnapX !== undefined) JXG.Options.point.snapSizeX = prevSnapX
      if (prevSnapY !== undefined) JXG.Options.point.snapSizeY = prevSnapY
    }
  }
}
