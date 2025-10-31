(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/geometry_review/lib/measurement-scale.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/measurement-scale.ts
// Centralized logical measurement scale: 1 world unit = 1 cm
__turbopack_context__.s([
    "CM_PER_WORLD",
    ()=>CM_PER_WORLD,
    "UNIT_LABEL",
    ()=>UNIT_LABEL,
    "WORLD_PER_CM",
    ()=>WORLD_PER_CM,
    "WORLD_PER_MM",
    ()=>WORLD_PER_MM,
    "calculateCenteredBoundingBoxCm",
    ()=>calculateCenteredBoundingBoxCm,
    "defaultBoundingBoxCm",
    ()=>defaultBoundingBoxCm,
    "fromCm",
    ()=>fromCm,
    "toCm",
    ()=>toCm
]);
const WORLD_PER_CM = 1;
const CM_PER_WORLD = 1 / WORLD_PER_CM;
const WORLD_PER_MM = WORLD_PER_CM / 10;
const UNIT_LABEL = 'cm';
function toCm(valueInWorld) {
    return valueInWorld * CM_PER_WORLD;
}
function fromCm(valueInCm) {
    return valueInCm * WORLD_PER_CM;
}
function defaultBoundingBoxCm(widthCm, heightCm) {
    let marginCm = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    return [
        0 - marginCm,
        heightCm + marginCm,
        widthCm + marginCm,
        0 - marginCm
    ];
}
function calculateCenteredBoundingBoxCm(screenWidthPx, screenHeightPx) {
    let minSizeCm = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 10;
    // Calculate aspect ratio
    const screenAspect = screenWidthPx / screenHeightPx;
    // Start with a reasonable default size
    // We'll calculate whole centimeters that fit
    const idealWidthCm = Math.max(minSizeCm, Math.floor(screenWidthPx / 30)) // ~30px per cm minimum
    ;
    const idealHeightCm = Math.max(minSizeCm, Math.floor(screenHeightPx / 30));
    // Determine which dimension to constrain by
    let widthCm;
    let heightCm;
    if (screenAspect > 1) {
        // Landscape: width is larger, constrain by height
        heightCm = idealHeightCm;
        widthCm = Math.floor(heightCm * screenAspect);
    } else {
        // Portrait: height is larger, constrain by width
        widthCm = idealWidthCm;
        heightCm = Math.floor(widthCm / screenAspect);
    }
    // Ensure we have at least minSizeCm in both dimensions
    widthCm = Math.max(widthCm, minSizeCm);
    heightCm = Math.max(heightCm, minSizeCm);
    // Ensure both are whole centimeters (already are from Math.floor, but be explicit)
    widthCm = Math.floor(widthCm);
    heightCm = Math.floor(heightCm);
    // Create bounding box centered at (0,0)
    // JSXGraph format: [left, top, right, bottom]
    const halfWidth = widthCm / 2;
    const halfHeight = heightCm / 2;
    return [
        -halfWidth,
        halfHeight,
        halfWidth,
        -halfHeight // bottom
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/geometry_review/lib/board-serializer.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "exportBoard",
    ()=>exportBoard,
    "importBoard",
    ()=>importBoard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/measurement-scale.ts [app-client] (ecmascript)");
;
;
// Robust circle geometry extraction
function circleGeometry(obj) {
    var _obj_points;
    const c = obj.center;
    var _obj_point2, _ref;
    const on = (_ref = (_obj_point2 = obj.point2) !== null && _obj_point2 !== void 0 ? _obj_point2 : (_obj_points = obj.points) === null || _obj_points === void 0 ? void 0 : _obj_points[1]) !== null && _ref !== void 0 ? _ref : null;
    if (c && on) {
        return {
            center: {
                x: c.X(),
                y: c.Y()
            },
            radius: Math.hypot(on.X() - c.X(), on.Y() - c.Y())
        };
    }
    // Last resort: try method name variants if present
    const r = typeof obj.Radius === 'function' && obj.Radius() || typeof obj.getRadius === 'function' && obj.getRadius();
    if (c && Number.isFinite(r)) {
        return {
            center: {
                x: c.X(),
                y: c.Y()
            },
            radius: r
        };
    }
    // If we can't guarantee a valid radius, return null (so you notice in logs)
    return null;
}
function exportBoard(brd, meta) {
    const bbox = brd.getBoundingBox();
    const [left, top, right, bottom] = bbox;
    const EPS = 1e-9;
    const isOnBorder = (x, y)=>Math.abs(x - left) < EPS || Math.abs(x - right) < EPS || Math.abs(y - top) < EPS || Math.abs(y - bottom) < EPS;
    const objects = Object.values(brd.objects).flatMap((o)=>{
        if (!o || !o.elType) return [];
        const t = o.elType;
        try {
            if (t === 'point') {
                if (typeof o.X !== 'function' || typeof o.Y !== 'function') return [];
                const x = o.X();
                const y = o.Y();
                if (!isFinite(x) || !isFinite(y)) return [];
                // Drop unnamed border points to avoid exporting grid/bbox helpers
                if (!o.name && isOnBorder(x, y)) return [];
                // Export point properties
                const props = {};
                if (o.visProp) {
                    if (o.visProp.strokeColor) props.strokeColor = o.visProp.strokeColor;
                    if (o.visProp.fillColor) props.fillColor = o.visProp.fillColor;
                    if (o.visProp.size !== undefined) props.size = o.visProp.size;
                    if (o.visProp.fixed !== undefined) props.fixed = o.visProp.fixed;
                }
                return [
                    {
                        id: o.id,
                        type: 'point',
                        name: o.name || '',
                        properties: Object.keys(props).length > 0 ? props : undefined,
                        x,
                        y
                    }
                ];
            }
            if (t === 'segment' || t === 'line') {
                var _o_points, _o_points1;
                var _o_points_;
                const p1 = (_o_points_ = (_o_points = o.points) === null || _o_points === void 0 ? void 0 : _o_points[0]) !== null && _o_points_ !== void 0 ? _o_points_ : o.point1;
                var _o_points_1;
                const p2 = (_o_points_1 = (_o_points1 = o.points) === null || _o_points1 === void 0 ? void 0 : _o_points1[1]) !== null && _o_points_1 !== void 0 ? _o_points_1 : o.point2;
                if (!p1 || !p2 || typeof p1.X !== 'function' || typeof p2.X !== 'function') return [];
                try {
                    const x1 = p1.X(), y1 = p1.Y();
                    const x2 = p2.X(), y2 = p2.Y();
                    if (!isFinite(x1) || !isFinite(y1) || !isFinite(x2) || !isFinite(y2)) return [];
                    // Export line/segment properties
                    const props = {};
                    if (o.visProp) {
                        if (o.visProp.strokeColor) props.strokeColor = o.visProp.strokeColor;
                        if (o.visProp.strokeWidth !== undefined) props.strokeWidth = o.visProp.strokeWidth;
                        if (o.visProp.dash !== undefined) props.dash = o.visProp.dash;
                    }
                    return [
                        {
                            id: o.id,
                            type: t,
                            name: o.name || '',
                            properties: Object.keys(props).length > 0 ? props : undefined,
                            x1,
                            y1,
                            x2,
                            y2
                        }
                    ];
                } catch (e) {
                    return [];
                }
            }
            if (t === 'circle') {
                const geom = circleGeometry(o);
                if (!geom) return [];
                // Export circle properties
                const props = {};
                if (o.visProp) {
                    if (o.visProp.strokeColor) props.strokeColor = o.visProp.strokeColor;
                    if (o.visProp.strokeWidth !== undefined) props.strokeWidth = o.visProp.strokeWidth;
                }
                return [
                    {
                        id: o.id,
                        type: 'circle',
                        name: o.name || '',
                        properties: Object.keys(props).length > 0 ? props : undefined,
                        center: geom.center,
                        radius: geom.radius
                    }
                ];
            }
            if (t === 'polygon') {
                var _o_vertices;
                const vertices = (_o_vertices = o.vertices) !== null && _o_vertices !== void 0 ? _o_vertices : [];
                if (!Array.isArray(vertices) || vertices.length < 3) return [];
                try {
                    const verts = [];
                    for (const v of vertices){
                        if (!v || typeof v.X !== 'function' || typeof v.Y !== 'function') continue;
                        try {
                            const x = v.X();
                            const y = v.Y();
                            if (isFinite(x) && isFinite(y)) {
                                verts.push({
                                    x,
                                    y
                                });
                            }
                        } catch (e) {
                            continue;
                        }
                    }
                    if (verts.length < 3) return [];
                    // Export polygon properties
                    const props = {};
                    if (o.visProp) {
                        if (o.visProp.strokeColor) props.strokeColor = o.visProp.strokeColor;
                        if (o.visProp.fillColor) props.fillColor = o.visProp.fillColor;
                        if (o.visProp.strokeWidth !== undefined) props.strokeWidth = o.visProp.strokeWidth;
                    }
                    return [
                        {
                            id: o.id,
                            type: 'polygon',
                            name: o.name || '',
                            properties: Object.keys(props).length > 0 ? props : undefined,
                            vertices: verts
                        }
                    ];
                } catch (e) {
                    return [];
                }
            }
        } catch (e) {
            // Skip objects that throw errors during export
            return [];
        }
        return [];
    });
    const result = {
        version: 1,
        timestamp: new Date().toISOString(),
        unit: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNIT_LABEL"],
        bbox,
        objects
    };
    if (meta) result.meta = meta;
    return result;
}
// Convert old format (with geometry nested) to new format
function normalizeSnapshot(data) {
    // Already new format
    if (data && data.version === 1 && Array.isArray(data.objects)) {
        return data;
    }
    // Old format: objects have geometry nested
    if (Array.isArray(data.objects)) {
        const normalized = {
            version: 1,
            timestamp: data.timestamp || new Date().toISOString(),
            unit: data.unit || 'cm',
            bbox: data.boundingBoxCm || data.bbox || [
                -1,
                8,
                11,
                -1
            ],
            objects: []
        };
        for (const o of data.objects){
            if (!o || !o.type || o.geometry === null) continue;
            const g = o.geometry;
            if (!g) continue;
            if (o.type === 'point' && g.x != null && g.y != null) {
                normalized.objects.push({
                    type: 'point',
                    id: o.id,
                    name: o.name || '',
                    properties: o.properties,
                    x: g.x,
                    y: g.y
                });
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
                });
            } else if (o.type === 'circle' && g.center && g.radius != null) {
                normalized.objects.push({
                    type: 'circle',
                    id: o.id,
                    name: o.name || '',
                    properties: o.properties,
                    center: g.center,
                    radius: g.radius
                });
            } else if (o.type === 'polygon' && Array.isArray(g.vertices) && g.vertices.length >= 3) {
                normalized.objects.push({
                    type: 'polygon',
                    id: o.id,
                    name: o.name || '',
                    properties: o.properties,
                    vertices: g.vertices
                });
            }
        }
        if (data.meta) {
            normalized.meta = data.meta;
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
            };
        }
        return normalized;
    }
    return null;
}
function importBoard(brd, snapshot) {
    var _JXG_Options_point, _JXG_Options, _JXG_Options_point1, _JXG_Options1, _JXG_Options_point2, _JXG_Options2, _JXG_Options3;
    const normalized = normalizeSnapshot(snapshot);
    if (!normalized || normalized.version !== 1) {
        throw new Error('Unsupported snapshot version or invalid format');
    }
    const data = normalized;
    // Remove current (non-fixed) objects first
    const remove = [];
    for(const k in brd.objects){
        var _o_visProp;
        const o = brd.objects[k];
        if (!(o === null || o === void 0 ? void 0 : (_o_visProp = o.visProp) === null || _o_visProp === void 0 ? void 0 : _o_visProp.fixed)) remove.push(o);
    }
    remove.forEach((o)=>{
        try {
            brd.removeObject(o);
        } catch (e) {
            console.warn('Failed to remove object:', e);
        }
    });
    // Disable grid snapping during import
    const prevSnapToGrid = (_JXG_Options = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options) === null || _JXG_Options === void 0 ? void 0 : (_JXG_Options_point = _JXG_Options.point) === null || _JXG_Options_point === void 0 ? void 0 : _JXG_Options_point.snapToGrid;
    const prevSnapX = (_JXG_Options1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options) === null || _JXG_Options1 === void 0 ? void 0 : (_JXG_Options_point1 = _JXG_Options1.point) === null || _JXG_Options_point1 === void 0 ? void 0 : _JXG_Options_point1.snapSizeX;
    const prevSnapY = (_JXG_Options2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options) === null || _JXG_Options2 === void 0 ? void 0 : (_JXG_Options_point2 = _JXG_Options2.point) === null || _JXG_Options_point2 === void 0 ? void 0 : _JXG_Options_point2.snapSizeY;
    if ((_JXG_Options3 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options) === null || _JXG_Options3 === void 0 ? void 0 : _JXG_Options3.point) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.point.snapToGrid = false;
    }
    try {
        const pointMap = new Map() // key: "x:y" -> point element
        ;
        const HASH = 1e-5 // precision for point deduplication (0.00001 world units)
        ;
        // Helper to generate point key
        const keyOf = (x, y)=>"".concat(Math.round(x / HASH), ":").concat(Math.round(y / HASH));
        // Helper to find or create point (deduplication)
        const findOrCreatePoint = (x, y, name, props)=>{
            if (x == null || y == null || !isFinite(x) || !isFinite(y)) return null;
            const key = keyOf(x, y);
            // Check if point already exists at this location
            if (pointMap.has(key)) {
                const existing = pointMap.get(key);
                if (existing && typeof existing.X === 'function') {
                    // Update name if provided and not empty
                    if (name && name.trim()) {
                        try {
                            existing.setAttribute({
                                name,
                                withLabel: true
                            });
                        } catch (e) {}
                    }
                    return existing;
                }
            }
            // Create new point
            try {
                const attrs = {
                    name: name || '',
                    withLabel: !!(name && name.trim()),
                    snapToGrid: false,
                    fixed: false,
                    size: 2,
                    strokeColor: '#444',
                    fillColor: '#666',
                    visible: true
                };
                // Apply saved properties
                if (props) {
                    if (props.strokeColor) attrs.strokeColor = props.strokeColor;
                    if (props.fillColor) attrs.fillColor = props.fillColor;
                    if (props.size !== undefined) attrs.size = props.size;
                    if (props.fixed !== undefined) attrs.fixed = props.fixed;
                }
                const pt = brd.create('point', [
                    x,
                    y
                ], attrs);
                if (pt && typeof pt.X === 'function') {
                    pointMap.set(key, pt);
                    return pt;
                }
            } catch (e) {
                console.warn('Failed to create point:', e);
            }
            return null;
        };
        const baseStyle = (kind, props)=>{
            const base = {
                visible: true,
                snapToGrid: false
            };
            if (kind === 'segment') base.strokeWidth = 2;
            if (kind === 'line') base.strokeWidth = 1;
            if (kind === 'circle') base.strokeWidth = 2;
            // Apply saved properties
            if (props) {
                if (props.strokeColor) base.strokeColor = props.strokeColor;
                if (props.strokeWidth !== undefined) base.strokeWidth = props.strokeWidth;
                if (props.dash !== undefined) base.dash = props.dash;
                if (props.fillColor) base.fillColor = props.fillColor;
            }
            return base;
        };
        // Process objects in order: points first, then shapes
        const points = data.objects.filter((o)=>o.type === 'point');
        const shapes = data.objects.filter((o)=>o.type !== 'point');
        // Create all points first
        for (const o of points){
            if (o.type === 'point') {
                findOrCreatePoint(o.x, o.y, o.name, o.properties);
            }
        }
        // Update board after creating points to ensure they're initialized
        try {
            brd.update();
        } catch (e) {
            console.warn('Board update after points failed:', e);
        }
        // Now create shapes (segments, lines, circles, polygons)
        for (const o of shapes){
            try {
                if (o.type === 'segment' || o.type === 'line') {
                    const p1 = findOrCreatePoint(o.x1, o.y1);
                    const p2 = findOrCreatePoint(o.x2, o.y2);
                    if (!p1 || !p2) {
                        console.warn("Skipping ".concat(o.type, ": invalid points at (").concat(o.x1, ", ").concat(o.y1, "), (").concat(o.x2, ", ").concat(o.y2, ")"));
                        continue;
                    }
                    const el = brd.create(o.type, [
                        p1,
                        p2
                    ], baseStyle(o.type, o.properties));
                    if (!el) {
                        console.warn("Failed to create ".concat(o.type));
                        continue;
                    }
                    if (o.id) {
                        try {
                            el.id = o.id;
                        } catch (e) {}
                    }
                    if (o.name && o.name.trim() && 'setAttribute' in el) {
                        try {
                            el.setAttribute({
                                name: o.name,
                                withLabel: true
                            });
                        } catch (e) {}
                    }
                } else if (o.type === 'circle') {
                    const c = findOrCreatePoint(o.center.x, o.center.y);
                    if (!c) {
                        console.warn('Skipping circle: invalid center');
                        continue;
                    }
                    // Create on-point for circle
                    const onX = o.center.x + o.radius;
                    const onY = o.center.y;
                    const on = brd.create('point', [
                        onX,
                        onY
                    ], {
                        visible: false,
                        fixed: true,
                        snapToGrid: false
                    });
                    if (!on) {
                        console.warn('Skipping circle: failed to create on-point');
                        continue;
                    }
                    const el = brd.create('circle', [
                        c,
                        on
                    ], baseStyle('circle', o.properties));
                    if (!el) {
                        console.warn('Failed to create circle');
                        // Clean up on-point
                        try {
                            brd.removeObject(on);
                        } catch (e) {}
                        continue;
                    }
                    if (o.id) {
                        try {
                            el.id = o.id;
                        } catch (e) {}
                    }
                    if (o.name && o.name.trim() && 'setAttribute' in el) {
                        try {
                            el.setAttribute({
                                name: o.name,
                                withLabel: true
                            });
                        } catch (e) {}
                    }
                } else if (o.type === 'polygon') {
                    const pts = o.vertices.map((v)=>findOrCreatePoint(v.x, v.y)).filter((p)=>p !== null);
                    if (pts.length < 3) {
                        console.warn('Skipping polygon: need at least 3 points, got', pts.length);
                        continue;
                    }
                    const el = brd.create('polygon', pts, baseStyle('polygon', o.properties));
                    if (!el) {
                        console.warn('Failed to create polygon');
                        continue;
                    }
                    if (o.id) {
                        try {
                            el.id = o.id;
                        } catch (e) {}
                    }
                    if (o.name && o.name.trim() && 'setAttribute' in el) {
                        try {
                            el.setAttribute({
                                name: o.name,
                                withLabel: true
                            });
                        } catch (e) {}
                    }
                }
            } catch (e) {
                console.warn('Failed to create object:', o, e);
            }
        }
        // Final update to render everything
        try {
            brd.update();
        } catch (e) {
            console.error('Final board update failed:', e);
        }
    } finally{
        var _JXG_Options4;
        // Restore global options
        if ((_JXG_Options4 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options) === null || _JXG_Options4 === void 0 ? void 0 : _JXG_Options4.point) {
            if (prevSnapToGrid !== undefined) __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.point.snapToGrid = prevSnapToGrid;
            if (prevSnapX !== undefined) __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.point.snapSizeX = prevSnapX;
            if (prevSnapY !== undefined) __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.point.snapSizeY = prevSnapY;
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/geometry_review/app/hooks/useBoardScale.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBoardScale",
    ()=>useBoardScale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/measurement-scale.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useBoardScale(ref) {
    _s();
    const get = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useBoardScale.useCallback[get]": ()=>{
            var _ref_current;
            const box = (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.closest('.jxgbox');
            if (!box) {
                // Fallback with default bounding box
                const [left, top, right, bottom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateCenteredBoundingBoxCm"])(800, 500);
                const unitsX = right - left;
                const unitsY = top - bottom;
                return {
                    pxPerUnitX: 50,
                    pxPerUnitY: 50,
                    uniformScale: 50,
                    boardLeft: left,
                    boardTop: top,
                    boardRight: right,
                    boardBottom: bottom,
                    boardWidth: unitsX,
                    boardHeight: unitsY
                };
            }
            const { width: w, height: h } = box.getBoundingClientRect();
            // Calculate bounding box in whole centimeters, centered at (0,0)
            const [left, top, right, bottom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateCenteredBoundingBoxCm"])(w, h);
            const unitsX = right - left;
            const unitsY = top - bottom;
            // Calculate uniform scale to maintain aspect ratio
            const scaleX = w / unitsX;
            const scaleY = h / unitsY;
            const uniformScale = Math.min(scaleX, scaleY);
            return {
                pxPerUnitX: uniformScale,
                pxPerUnitY: uniformScale,
                uniformScale,
                boardLeft: left,
                boardTop: top,
                boardRight: right,
                boardBottom: bottom,
                boardWidth: unitsX,
                boardHeight: unitsY
            };
        }
    }["useBoardScale.useCallback[get]"], [
        ref
    ]);
    return get;
}
_s(useBoardScale, "ezK9IK4F8eJ7AdGssZHvmyQUPfc=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/geometry_review/app/components/DraggableRuler.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DraggableRuler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$hooks$2f$useBoardScale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/app/hooks/useBoardScale.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function DraggableRuler(param) {
    let { x, y, rotation, length, onPositionChange, isActive, onActivate, onUiBusyChange } = param;
    _s();
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isRotating, setIsRotating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isResizing, setIsResizing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isHovering, setIsHovering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dragStart, setDragStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [rotationStart, setRotationStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        rotation: 0,
        initialAngle: 0
    });
    const [resizeStart, setResizeStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        length: 0
    });
    const rulerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const getScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$hooks$2f$useBoardScale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardScale"])(rulerRef);
    const { pxPerUnitX, pxPerUnitY } = getScale();
    const pxPerUnit = Math.min(pxPerUnitX, pxPerUnitY);
    // Memoized coordinate conversion functions for better performance
    const coordinateConverter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DraggableRuler.useMemo[coordinateConverter]": ()=>{
            const scaleInfo = getScale();
            const { boardLeft, boardTop, boardRight, boardBottom, boardWidth, boardHeight } = scaleInfo;
            return {
                boardToScreen: ({
                    "DraggableRuler.useMemo[coordinateConverter]": (boardX, boardY)=>{
                        var _rulerRef_current;
                        // Get actual container dimensions
                        const container = (_rulerRef_current = rulerRef.current) === null || _rulerRef_current === void 0 ? void 0 : _rulerRef_current.closest('.jxgbox');
                        const containerWidth = (container === null || container === void 0 ? void 0 : container.offsetWidth) || 800;
                        const containerHeight = (container === null || container === void 0 ? void 0 : container.offsetHeight) || 500;
                        const screenX = (boardX - boardLeft) / boardWidth * containerWidth;
                        const screenY = containerHeight - (boardY - boardBottom) / boardHeight * containerHeight;
                        return {
                            x: screenX,
                            y: screenY
                        };
                    }
                })["DraggableRuler.useMemo[coordinateConverter]"],
                screenToBoard: ({
                    "DraggableRuler.useMemo[coordinateConverter]": (screenX, screenY)=>{
                        var _rulerRef_current;
                        const container = (_rulerRef_current = rulerRef.current) === null || _rulerRef_current === void 0 ? void 0 : _rulerRef_current.closest('.jxgbox');
                        const containerWidth = (container === null || container === void 0 ? void 0 : container.offsetWidth) || 800;
                        const containerHeight = (container === null || container === void 0 ? void 0 : container.offsetHeight) || 500;
                        const boardX = screenX / containerWidth * boardWidth + boardLeft;
                        const boardY = boardTop - screenY / containerHeight * boardHeight;
                        return {
                            x: boardX,
                            y: boardY
                        };
                    }
                })["DraggableRuler.useMemo[coordinateConverter]"]
            };
        }
    }["DraggableRuler.useMemo[coordinateConverter]"], [
        getScale
    ]);
    const boardToScreen = coordinateConverter.boardToScreen;
    const screenToBoard = coordinateConverter.screenToBoard;
    const screenPos = boardToScreen(x, y);
    // Smooth movement without grid snapping
    const smoothPosition = (boardX, boardY)=>{
        return {
            x: boardX,
            y: boardY
        };
    };
    const handleMouseDown = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        onActivate();
        onUiBusyChange(true);
        const target = e.target;
        if (target.classList.contains('rotation-handle') || target.closest('.rotation-handle')) {
            setIsRotating(true);
            // Calculate initial angle from ruler center to mouse position
            const centerX = screenPos.x;
            const centerY = screenPos.y;
            const initialAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
            setRotationStart({
                x: e.clientX,
                y: e.clientY,
                rotation,
                initialAngle
            });
        } else if (target.classList.contains('resize-handle') || target.closest('.resize-handle')) {
            setIsResizing(true);
            setResizeStart({
                x: e.clientX,
                y: e.clientY,
                length
            });
        } else {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - screenPos.x,
                y: e.clientY - screenPos.y
            });
        }
    };
    const handleTouchStart = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        onActivate();
        onUiBusyChange(true);
        const touch = e.touches[0];
        if (!touch) return;
        const target = e.target;
        if (target.classList.contains('rotation-handle') || target.closest('.rotation-handle')) {
            setIsRotating(true);
            // Calculate initial angle from ruler center to touch position
            const centerX = screenPos.x;
            const centerY = screenPos.y;
            const initialAngle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * (180 / Math.PI);
            setRotationStart({
                x: touch.clientX,
                y: touch.clientY,
                rotation,
                initialAngle
            });
        } else if (target.classList.contains('resize-handle') || target.closest('.resize-handle')) {
            setIsResizing(true);
            setResizeStart({
                x: touch.clientX,
                y: touch.clientY,
                length
            });
        } else {
            setIsDragging(true);
            setDragStart({
                x: touch.clientX - screenPos.x,
                y: touch.clientY - screenPos.y
            });
        }
    };
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DraggableRuler.useCallback[handleMouseMove]": (e)=>{
            if (isDragging) {
                const newScreenX = e.clientX - dragStart.x;
                const newScreenY = e.clientY - dragStart.y;
                const newBoardPos = screenToBoard(newScreenX, newScreenY);
                const smoothPos = smoothPosition(newBoardPos.x, newBoardPos.y);
                onPositionChange(smoothPos.x, smoothPos.y, rotation, length);
            } else if (isRotating) {
                const centerX = screenPos.x;
                const centerY = screenPos.y;
                // Calculate current angle from center to mouse
                const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
                // Calculate the difference from the initial angle
                let deltaAngle = currentAngle - rotationStart.initialAngle;
                // Handle angle wrapping (ensure we take the shorter path)
                while(deltaAngle > 180)deltaAngle -= 360;
                while(deltaAngle < -180)deltaAngle += 360;
                const newRotation = rotationStart.rotation + deltaAngle;
                onPositionChange(x, y, newRotation, length);
            } else if (isResizing) {
                const deltaX = e.clientX - resizeStart.x;
                const deltaY = e.clientY - resizeStart.y;
                // Project the delta vector onto the ruler's axis (considering rotation)
                const rotationRad = rotation * Math.PI / 180;
                const rulerAxisX = Math.cos(rotationRad);
                const rulerAxisY = Math.sin(rotationRad);
                // Calculate the projection of the delta vector onto the ruler axis
                const projection = deltaX * rulerAxisX + deltaY * rulerAxisY;
                const deltaDistance = projection / pxPerUnit;
                const newLength = Math.max(2, Math.min(10, resizeStart.length + deltaDistance));
                onPositionChange(x, y, rotation, newLength);
            }
        }
    }["DraggableRuler.useCallback[handleMouseMove]"], [
        isDragging,
        isRotating,
        isResizing,
        dragStart,
        resizeStart,
        rotationStart,
        screenPos,
        x,
        y,
        rotation,
        length,
        onPositionChange,
        pxPerUnit,
        screenToBoard
    ]);
    const handleTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DraggableRuler.useCallback[handleTouchMove]": (e)=>{
            const touch = e.touches[0];
            if (!touch) return;
            if (isDragging) {
                const newScreenX = touch.clientX - dragStart.x;
                const newScreenY = touch.clientY - dragStart.y;
                const newBoardPos = screenToBoard(newScreenX, newScreenY);
                const smoothPos = smoothPosition(newBoardPos.x, newBoardPos.y);
                onPositionChange(smoothPos.x, smoothPos.y, rotation, length);
            } else if (isRotating) {
                const centerX = screenPos.x;
                const centerY = screenPos.y;
                // Calculate current angle from center to touch
                const currentAngle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * (180 / Math.PI);
                // Calculate the difference from the initial angle
                let deltaAngle = currentAngle - rotationStart.initialAngle;
                // Handle angle wrapping (ensure we take the shorter path)
                while(deltaAngle > 180)deltaAngle -= 360;
                while(deltaAngle < -180)deltaAngle += 360;
                const newRotation = rotationStart.rotation + deltaAngle;
                onPositionChange(x, y, newRotation, length);
            } else if (isResizing) {
                const deltaX = touch.clientX - resizeStart.x;
                const deltaY = touch.clientY - resizeStart.y;
                // Project the delta vector onto the ruler's axis (considering rotation)
                const rotationRad = rotation * Math.PI / 180;
                const rulerAxisX = Math.cos(rotationRad);
                const rulerAxisY = Math.sin(rotationRad);
                // Calculate the projection of the delta vector onto the ruler axis
                const projection = deltaX * rulerAxisX + deltaY * rulerAxisY;
                const deltaDistance = projection / pxPerUnit;
                const newLength = Math.max(2, Math.min(10, resizeStart.length + deltaDistance));
                onPositionChange(x, y, rotation, newLength);
            }
        }
    }["DraggableRuler.useCallback[handleTouchMove]"], [
        isDragging,
        isRotating,
        isResizing,
        dragStart,
        resizeStart,
        rotationStart,
        screenPos,
        x,
        y,
        rotation,
        length,
        onPositionChange,
        pxPerUnit,
        screenToBoard
    ]);
    const handleMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DraggableRuler.useCallback[handleMouseUp]": ()=>{
            setIsDragging(false);
            setIsRotating(false);
            setIsResizing(false);
            onUiBusyChange(false);
        }
    }["DraggableRuler.useCallback[handleMouseUp]"], [
        onUiBusyChange
    ]);
    const handleTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DraggableRuler.useCallback[handleTouchEnd]": ()=>{
            setIsDragging(false);
            setIsRotating(false);
            setIsResizing(false);
            onUiBusyChange(false);
        }
    }["DraggableRuler.useCallback[handleTouchEnd]"], [
        onUiBusyChange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DraggableRuler.useEffect": ()=>{
            if (isDragging || isRotating || isResizing) {
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
                document.addEventListener('touchmove', handleTouchMove, {
                    passive: false
                });
                document.addEventListener('touchend', handleTouchEnd);
                return ({
                    "DraggableRuler.useEffect": ()=>{
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                        document.removeEventListener('touchmove', handleTouchMove, {
                            passive: false
                        });
                        document.removeEventListener('touchend', handleTouchEnd);
                    }
                })["DraggableRuler.useEffect"];
            }
        }
    }["DraggableRuler.useEffect"], [
        isDragging,
        isRotating,
        isResizing,
        handleMouseMove,
        handleTouchMove,
        handleMouseUp,
        handleTouchEnd
    ]);
    // ResizeObserver to handle container size changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DraggableRuler.useEffect": ()=>{
            var _rulerRef_current;
            const el = (_rulerRef_current = rulerRef.current) === null || _rulerRef_current === void 0 ? void 0 : _rulerRef_current.closest('.jxgbox');
            if (!el) return;
            const ro = new ResizeObserver({
                "DraggableRuler.useEffect": ()=>{
                    // Force a light refresh by updating dragStart state
                    setDragStart({
                        "DraggableRuler.useEffect": (s)=>({
                                ...s
                            })
                    }["DraggableRuler.useEffect"]);
                }
            }["DraggableRuler.useEffect"]);
            ro.observe(el);
            return ({
                "DraggableRuler.useEffect": ()=>ro.disconnect()
            })["DraggableRuler.useEffect"];
        }
    }["DraggableRuler.useEffect"], []);
    // Generate ruler markings based on actual length units
    const generateMarkings = ()=>{
        const markings = [];
        const rulerWidthPx = length * pxPerUnit;
        // Create markings every 0.1 units, with major marks at 1.0 and medium at 0.5
        const markInterval = 0.1 // Mark every 0.1 units
        ;
        const numMarks = Math.floor(length / markInterval);
        for(let i = 0; i <= numMarks; i++){
            const unitValue = i * markInterval;
            const position = unitValue / length * rulerWidthPx;
            const isMajor = unitValue % 1 === 0 // Major marks every 1 unit
            ;
            const isMedium = unitValue % 0.5 === 0 && !isMajor // Medium marks every 0.5 units
            ;
            let height = 'h-1';
            let opacity = 0.3;
            if (isMajor) {
                height = 'h-5';
                opacity = 0.8;
            } else if (isMedium) {
                height = 'h-3';
                opacity = 0.6;
            }
            markings.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute w-[1px] ".concat(height, " bg-black transition-all duration-200"),
                style: {
                    left: position,
                    top: -1,
                    transform: 'translateX(-50%)',
                    opacity
                }
            }, "mark-".concat(i), false, {
                fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                lineNumber: 282,
                columnNumber: 9
            }, this));
            // Add labels for major marks (every 1 unit)
            if (isMajor && unitValue > 0) {
                markings.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute text-[10px] text-slate-600 font-medium tracking-tight",
                    style: {
                        left: position,
                        top: -16,
                        transform: 'translateX(-50%)',
                        fontFeatureSettings: '"tnum"'
                    },
                    children: unitValue
                }, "label-".concat(i), false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                    lineNumber: 297,
                    columnNumber: 11
                }, this));
            }
        }
        return markings;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: rulerRef,
        className: "absolute select-none group ".concat(isActive ? 'z-50' : 'z-40'),
        style: {
            left: screenPos.x,
            top: screenPos.y,
            transform: "rotate(".concat(rotation, "deg)"),
            transformOrigin: '0 0'
        },
        onMouseDown: handleMouseDown,
        onTouchStart: handleTouchStart,
        onMouseEnter: ()=>setIsHovering(true),
        onMouseLeave: ()=>setIsHovering(false),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            style: {
                pointerEvents: 'none'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: length * pxPerUnit + 100,
                    height: 40,
                    className: "absolute",
                    style: {
                        left: -50,
                        top: -10,
                        pointerEvents: 'auto'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "rulerPlasticGradient",
                                    x1: "0%",
                                    y1: "0%",
                                    x2: "100%",
                                    y2: "100%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "rgba(255,255,255,0.6)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 342,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "15%",
                                            stopColor: "rgba(255,255,255,0.4)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 343,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "30%",
                                            stopColor: "rgba(255,255,255,0.2)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 344,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "50%",
                                            stopColor: "rgba(240,245,250,0.1)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 345,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "70%",
                                            stopColor: "rgba(200,210,220,0.15)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 346,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "85%",
                                            stopColor: "rgba(150,160,170,0.2)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 347,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "rgba(100,110,120,0.25)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 348,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                    lineNumber: 341,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "rulerHighlightGradient",
                                    x1: "0%",
                                    y1: "0%",
                                    x2: "60%",
                                    y2: "40%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "rgba(255,255,255,0.8)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 353,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "30%",
                                            stopColor: "rgba(255,255,255,0.4)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 354,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "60%",
                                            stopColor: "rgba(255,255,255,0.1)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 355,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "rgba(255,255,255,0)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 356,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                    lineNumber: 352,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "rulerShadowGradient",
                                    x1: "0%",
                                    y1: "0%",
                                    x2: "100%",
                                    y2: "100%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "rgba(0,0,0,0)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 361,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "50%",
                                            stopColor: "rgba(0,0,0,0.05)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 362,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "rgba(0,0,0,0.15)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 363,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                    lineNumber: 360,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: "rulerSoftShadow",
                                    x: "-50%",
                                    y: "-50%",
                                    width: "200%",
                                    height: "200%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
                                            dx: "0",
                                            dy: "8",
                                            stdDeviation: "16",
                                            floodColor: "#000",
                                            floodOpacity: "0.3"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 368,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
                                            dx: "0",
                                            dy: "4",
                                            stdDeviation: "8",
                                            floodColor: "#000",
                                            floodOpacity: "0.2"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 369,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
                                            dx: "0",
                                            dy: "2",
                                            stdDeviation: "4",
                                            floodColor: "#000",
                                            floodOpacity: "0.1"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 370,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                    lineNumber: 367,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: "rulerGlow",
                                    x: "-50%",
                                    y: "-50%",
                                    width: "200%",
                                    height: "200%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                            stdDeviation: "3",
                                            result: "coloredBlur"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 375,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                    in: "coloredBlur"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                                    lineNumber: 377,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                    in: "SourceGraphic"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                                    lineNumber: 378,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 376,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                    lineNumber: 374,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                            lineNumber: 339,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            filter: isActive ? "url(#rulerGlow)" : "url(#rulerSoftShadow)",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: 50,
                                    y: 10,
                                    width: length * pxPerUnit,
                                    height: 20,
                                    fill: "rgba(240,245,250,0.25)"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                    lineNumber: 386,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: 50,
                                    y: 10,
                                    width: length * pxPerUnit,
                                    height: 20,
                                    fill: "url(#rulerShadowGradient)"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                    lineNumber: 388,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: 50,
                                    y: 10,
                                    width: length * pxPerUnit,
                                    height: 20,
                                    fill: "url(#rulerPlasticGradient)"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                    lineNumber: 390,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: 50,
                                    y: 10,
                                    width: length * pxPerUnit,
                                    height: 20,
                                    fill: "url(#rulerHighlightGradient)"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                    lineNumber: 392,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: 50,
                                    y: 10,
                                    width: length * pxPerUnit,
                                    height: 20,
                                    fill: "none",
                                    stroke: "#000000",
                                    strokeWidth: "1.2"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                    lineNumber: 394,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                            lineNumber: 384,
                            columnNumber: 11
                        }, this),
                        (()=>{
                            const markings = [];
                            const rulerWidthPx = length * pxPerUnit;
                            const pxPerCm = pxPerUnit;
                            const maxCm = Math.floor(length);
                            // Create markings every 0.1cm (1mm)
                            for(let cm = 0; cm <= maxCm; cm++){
                                const x = 50 + cm * pxPerCm;
                                const isFive = cm % 5 === 0;
                                const majorLen = isFive ? 18 : 12;
                                // Main centimeter tick mark
                                markings.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: x - 0.5,
                                    y: 10,
                                    width: 1,
                                    height: majorLen,
                                    fill: "#000"
                                }, "cm-".concat(cm), false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                    lineNumber: 412,
                                    columnNumber: 17
                                }, this));
                                // Millimeter marks (9 small ticks between each centimeter)
                                if (cm < maxCm) {
                                    for(let mm = 1; mm < 10; mm++){
                                        const xx = x + pxPerCm * mm / 10;
                                        const mmLen = mm === 5 ? 8 : 5 // 5mm mark is longer
                                        ;
                                        markings.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: xx - 0.25,
                                            y: 10,
                                            width: 0.5,
                                            height: mmLen,
                                            fill: "#000",
                                            opacity: "0.75"
                                        }, "mm-".concat(cm, "-").concat(mm), false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 429,
                                            columnNumber: 21
                                        }, this));
                                    }
                                }
                            }
                            // Add millimeter marks between last whole centimeter and final length value
                            if (length % 1 !== 0) {
                                const lastWholeCm = Math.floor(length);
                                const finalX = 50 + length * pxPerCm;
                                // Add millimeter marks from last whole cm to final length
                                for(let mm = 1; mm <= Math.floor((length - lastWholeCm) * 10); mm++){
                                    const xx = 50 + (lastWholeCm + mm / 10) * pxPerCm;
                                    const mmLen = mm === 5 ? 8 : 5 // 5mm mark is longer
                                    ;
                                    markings.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: xx - 0.25,
                                        y: 10,
                                        width: 0.5,
                                        height: mmLen,
                                        fill: "#000",
                                        opacity: "0.75"
                                    }, "mm-final-".concat(mm), false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                        lineNumber: 454,
                                        columnNumber: 19
                                    }, this));
                                }
                                // Add final marking at exact length value
                                markings.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: finalX - 0.5,
                                    y: 10,
                                    width: 1,
                                    height: 12,
                                    fill: "#000"
                                }, "cm-final", false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                    lineNumber: 468,
                                    columnNumber: 17
                                }, this));
                            }
                            return markings;
                        })()
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                    lineNumber: 333,
                    columnNumber: 9
                }, this),
                (()=>{
                    const pxPerCm = pxPerUnit;
                    const maxCm = Math.floor(length);
                    const numbers = [];
                    for(let cm = 1; cm <= maxCm; cm++){
                        const x = cm * pxPerCm;
                        const isFive = cm % 5 === 0;
                        numbers.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute text-xs text-gray-800 font-mono",
                            style: {
                                left: x,
                                top: -25,
                                transform: 'translateX(-50%)',
                                fontWeight: isFive ? 'bold' : 'normal',
                                fontSize: '11px',
                                fontFamily: 'Arial, sans-serif',
                                pointerEvents: 'none'
                            },
                            children: cm
                        }, "ruler-number-".concat(cm), false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                            lineNumber: 494,
                            columnNumber: 15
                        }, this));
                    }
                    // Add final number at exact length value (only if not a whole number)
                    if (length % 1 !== 0) {
                        const finalX = length * pxPerCm;
                        numbers.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute text-xs text-gray-800 font-mono",
                            style: {
                                left: finalX,
                                top: -25,
                                transform: 'translateX(-50%)',
                                fontWeight: 'normal',
                                fontSize: '11px',
                                fontFamily: 'Arial, sans-serif',
                                pointerEvents: 'none'
                            },
                            children: length.toFixed(1)
                        }, "ruler-number-final", false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                            lineNumber: 516,
                            columnNumber: 15
                        }, this));
                    }
                    return numbers;
                })(),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rotation-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-emerald-500 shadow-md flex items-center justify-center transition-opacity duration-200",
                    style: {
                        pointerEvents: 'auto',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                        opacity: isHovering ? 1 : 0,
                        left: length * pxPerUnit - 2,
                        top: 2,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 20
                    },
                    title: "Otočit pravítko",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-2 h-2 bg-emerald-500 rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                        lineNumber: 551,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                    lineNumber: 538,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "resize-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-amber-500 shadow-md flex items-center justify-center transition-opacity duration-200",
                    style: {
                        pointerEvents: 'auto',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                        opacity: isHovering ? 1 : 0,
                        left: length * pxPerUnit - 2,
                        top: 14,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 15
                    },
                    title: "Změnit délku",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-2 h-2 bg-amber-500 rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                        lineNumber: 568,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                    lineNumber: 555,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
            lineNumber: 332,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
        lineNumber: 317,
        columnNumber: 5
    }, this);
}
_s(DraggableRuler, "hoLPpDn4MgDS5TwoObAdVFrhVuQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$hooks$2f$useBoardScale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardScale"]
    ];
});
_c = DraggableRuler;
var _c;
__turbopack_context__.k.register(_c, "DraggableRuler");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DraggableTriangle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$hooks$2f$useBoardScale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/app/hooks/useBoardScale.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function DraggableTriangle(param) {
    let { x, y, rotation, size, type, onPositionChange, isActive, onActivate, onUiBusyChange } = param;
    var _points_, _points_1, _points_2, _points_3, _points_4, _points_5, _points_6, _points_7, _points_8, _points_9, _points_10, _points_11, _points_12, _points_13, _points_14, _points_15, _points_16, _points_17, _points_18, _points_19;
    _s();
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isRotating, setIsRotating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isResizing, setIsResizing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isHovering, setIsHovering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dragStart, setDragStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [rotationStart, setRotationStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        rotation: 0,
        initialAngle: 0
    });
    const [resizeStart, setResizeStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        size: 0
    });
    const triangleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const getScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$hooks$2f$useBoardScale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardScale"])(triangleRef);
    const { pxPerUnitX, pxPerUnitY } = getScale();
    const pxPerUnit = Math.min(pxPerUnitX, pxPerUnitY);
    // Memoized coordinate conversion functions for better performance
    const coordinateConverter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DraggableTriangle.useMemo[coordinateConverter]": ()=>{
            const scaleInfo = getScale();
            const { boardLeft, boardTop, boardRight, boardBottom, boardWidth, boardHeight } = scaleInfo;
            return {
                boardToScreen: ({
                    "DraggableTriangle.useMemo[coordinateConverter]": (boardX, boardY)=>{
                        var _triangleRef_current;
                        // Get actual container dimensions
                        const container = (_triangleRef_current = triangleRef.current) === null || _triangleRef_current === void 0 ? void 0 : _triangleRef_current.closest('.jxgbox');
                        const containerWidth = (container === null || container === void 0 ? void 0 : container.offsetWidth) || 800;
                        const containerHeight = (container === null || container === void 0 ? void 0 : container.offsetHeight) || 500;
                        const screenX = (boardX - boardLeft) / boardWidth * containerWidth;
                        const screenY = containerHeight - (boardY - boardBottom) / boardHeight * containerHeight;
                        return {
                            x: screenX,
                            y: screenY
                        };
                    }
                })["DraggableTriangle.useMemo[coordinateConverter]"],
                screenToBoard: ({
                    "DraggableTriangle.useMemo[coordinateConverter]": (screenX, screenY)=>{
                        var _triangleRef_current;
                        const container = (_triangleRef_current = triangleRef.current) === null || _triangleRef_current === void 0 ? void 0 : _triangleRef_current.closest('.jxgbox');
                        const containerWidth = (container === null || container === void 0 ? void 0 : container.offsetWidth) || 800;
                        const containerHeight = (container === null || container === void 0 ? void 0 : container.offsetHeight) || 500;
                        const boardX = screenX / containerWidth * boardWidth + boardLeft;
                        const boardY = boardTop - screenY / containerHeight * boardHeight;
                        return {
                            x: boardX,
                            y: boardY
                        };
                    }
                })["DraggableTriangle.useMemo[coordinateConverter]"]
            };
        }
    }["DraggableTriangle.useMemo[coordinateConverter]"], [
        getScale
    ]);
    const boardToScreen = coordinateConverter.boardToScreen;
    const screenToBoard = coordinateConverter.screenToBoard;
    const screenPos = boardToScreen(x, y);
    // Smooth movement without grid snapping
    const smoothPosition = (boardX, boardY)=>{
        return {
            x: boardX,
            y: boardY
        };
    };
    const handleMouseDown = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        onActivate();
        onUiBusyChange(true);
        const target = e.target;
        if (target.classList.contains('rotation-handle') || target.closest('.rotation-handle')) {
            setIsRotating(true);
            // Calculate initial angle from triangle center to mouse position
            const currentScreenPos = boardToScreen(x, y);
            const centerX = currentScreenPos.x;
            const centerY = currentScreenPos.y;
            const initialAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
            setRotationStart({
                x: e.clientX,
                y: e.clientY,
                rotation,
                initialAngle
            });
        } else if (target.classList.contains('resize-handle') || target.closest('.resize-handle')) {
            setIsResizing(true);
            setResizeStart({
                x: e.clientX,
                y: e.clientY,
                size
            });
        } else if (target.classList.contains('drag-handle') || target.closest('.drag-handle')) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - screenPos.x,
                y: e.clientY - screenPos.y
            });
        } else {
            // Allow dragging from anywhere on the triangle
            setIsDragging(true);
            setDragStart({
                x: e.clientX - screenPos.x,
                y: e.clientY - screenPos.y
            });
        }
    };
    const handleTouchStart = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        onActivate();
        onUiBusyChange(true);
        const touch = e.touches[0];
        if (!touch) return;
        const target = e.target;
        if (target.classList.contains('rotation-handle') || target.closest('.rotation-handle')) {
            setIsRotating(true);
            // Calculate initial angle from triangle center to touch position
            const currentScreenPos = boardToScreen(x, y);
            const centerX = currentScreenPos.x;
            const centerY = currentScreenPos.y;
            const initialAngle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * (180 / Math.PI);
            setRotationStart({
                x: touch.clientX,
                y: touch.clientY,
                rotation,
                initialAngle
            });
        } else if (target.classList.contains('resize-handle') || target.closest('.resize-handle')) {
            setIsResizing(true);
            setResizeStart({
                x: touch.clientX,
                y: touch.clientY,
                size
            });
        } else if (target.classList.contains('drag-handle') || target.closest('.drag-handle')) {
            setIsDragging(true);
            setDragStart({
                x: touch.clientX - screenPos.x,
                y: touch.clientY - screenPos.y
            });
        } else {
            // Allow dragging from anywhere on the triangle
            setIsDragging(true);
            setDragStart({
                x: touch.clientX - screenPos.x,
                y: touch.clientY - screenPos.y
            });
        }
    };
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DraggableTriangle.useCallback[handleMouseMove]": (e)=>{
            if (isDragging) {
                const newScreenX = e.clientX - dragStart.x;
                const newScreenY = e.clientY - dragStart.y;
                const newBoardPos = screenToBoard(newScreenX, newScreenY);
                const smoothPos = smoothPosition(newBoardPos.x, newBoardPos.y);
                onPositionChange(smoothPos.x, smoothPos.y, rotation, size);
            } else if (isRotating) {
                // Get the current screen position of the triangle center
                const currentScreenPos = boardToScreen(x, y);
                const centerX = currentScreenPos.x;
                const centerY = currentScreenPos.y;
                // Calculate current angle from center to mouse
                const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
                // Calculate the difference from the initial angle
                let deltaAngle = currentAngle - rotationStart.initialAngle;
                // Handle angle wrapping (ensure we take the shorter path)
                while(deltaAngle > 180)deltaAngle -= 360;
                while(deltaAngle < -180)deltaAngle += 360;
                const newRotation = rotationStart.rotation + deltaAngle;
                onPositionChange(x, y, newRotation, size);
            } else if (isResizing) {
                const deltaX = e.clientX - resizeStart.x;
                const deltaY = e.clientY - resizeStart.y;
                // Project the delta vector onto the triangle's main axis (considering rotation)
                const rotationRad = rotation * Math.PI / 180;
                const triangleAxisX = Math.cos(rotationRad);
                const triangleAxisY = Math.sin(rotationRad);
                // Calculate the projection of the delta vector onto the triangle axis
                const projection = deltaX * triangleAxisX + deltaY * triangleAxisY;
                const deltaSize = projection / 20 // Scale factor
                ;
                const proposedSize = resizeStart.size + deltaSize;
                // Calculate height based on triangle type
                const height = type === '45-45-90' ? proposedSize : proposedSize * Math.sqrt(3) / 2;
                // Enforce height constraints: minimum 3cm, maximum 10cm
                let constrainedSize = proposedSize;
                if (height < 3) {
                    // Calculate size needed for 3cm height
                    constrainedSize = type === '45-45-90' ? 3 : 3 / (Math.sqrt(3) / 2);
                } else if (height > 10) {
                    // Calculate size needed for 10cm height
                    constrainedSize = type === '45-45-90' ? 10 : 10 / (Math.sqrt(3) / 2);
                }
                onPositionChange(x, y, rotation, constrainedSize);
            }
        }
    }["DraggableTriangle.useCallback[handleMouseMove]"], [
        isDragging,
        isRotating,
        isResizing,
        dragStart,
        resizeStart,
        rotationStart,
        x,
        y,
        rotation,
        size,
        type,
        onPositionChange,
        screenToBoard,
        boardToScreen
    ]);
    const handleTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DraggableTriangle.useCallback[handleTouchMove]": (e)=>{
            const touch = e.touches[0];
            if (!touch) return;
            if (isDragging) {
                const newScreenX = touch.clientX - dragStart.x;
                const newScreenY = touch.clientY - dragStart.y;
                const newBoardPos = screenToBoard(newScreenX, newScreenY);
                const smoothPos = smoothPosition(newBoardPos.x, newBoardPos.y);
                onPositionChange(smoothPos.x, smoothPos.y, rotation, size);
            } else if (isRotating) {
                // Get the current screen position of the triangle center
                const currentScreenPos = boardToScreen(x, y);
                const centerX = currentScreenPos.x;
                const centerY = currentScreenPos.y;
                // Calculate current angle from center to touch
                const currentAngle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * (180 / Math.PI);
                // Calculate the difference from the initial angle
                let deltaAngle = currentAngle - rotationStart.initialAngle;
                // Handle angle wrapping (ensure we take the shorter path)
                while(deltaAngle > 180)deltaAngle -= 360;
                while(deltaAngle < -180)deltaAngle += 360;
                const newRotation = rotationStart.rotation + deltaAngle;
                onPositionChange(x, y, newRotation, size);
            } else if (isResizing) {
                const deltaX = touch.clientX - resizeStart.x;
                const deltaY = touch.clientY - resizeStart.y;
                // Project the delta vector onto the triangle's main axis (considering rotation)
                const rotationRad = rotation * Math.PI / 180;
                const triangleAxisX = Math.cos(rotationRad);
                const triangleAxisY = Math.sin(rotationRad);
                // Calculate the projection of the delta vector onto the triangle axis
                const projection = deltaX * triangleAxisX + deltaY * triangleAxisY;
                const deltaSize = projection / 20 // Scale factor
                ;
                const proposedSize = resizeStart.size + deltaSize;
                // Calculate height based on triangle type
                const height = type === '45-45-90' ? proposedSize : proposedSize * Math.sqrt(3) / 2;
                // Enforce height constraints: minimum 3cm, maximum 10cm
                let constrainedSize = proposedSize;
                if (height < 3) {
                    // Calculate size needed for 3cm height
                    constrainedSize = type === '45-45-90' ? 3 : 3 / (Math.sqrt(3) / 2);
                } else if (height > 10) {
                    // Calculate size needed for 10cm height
                    constrainedSize = type === '45-45-90' ? 10 : 10 / (Math.sqrt(3) / 2);
                }
                onPositionChange(x, y, rotation, constrainedSize);
            }
        }
    }["DraggableTriangle.useCallback[handleTouchMove]"], [
        isDragging,
        isRotating,
        isResizing,
        dragStart,
        resizeStart,
        rotationStart,
        x,
        y,
        rotation,
        size,
        type,
        onPositionChange,
        screenToBoard,
        boardToScreen
    ]);
    const handleMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DraggableTriangle.useCallback[handleMouseUp]": ()=>{
            setIsDragging(false);
            setIsRotating(false);
            setIsResizing(false);
            onUiBusyChange(false);
        }
    }["DraggableTriangle.useCallback[handleMouseUp]"], [
        onUiBusyChange
    ]);
    const handleTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DraggableTriangle.useCallback[handleTouchEnd]": ()=>{
            setIsDragging(false);
            setIsRotating(false);
            setIsResizing(false);
            onUiBusyChange(false);
        }
    }["DraggableTriangle.useCallback[handleTouchEnd]"], [
        onUiBusyChange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DraggableTriangle.useEffect": ()=>{
            if (isDragging || isRotating || isResizing) {
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
                document.addEventListener('touchmove', handleTouchMove, {
                    passive: false
                });
                document.addEventListener('touchend', handleTouchEnd);
                return ({
                    "DraggableTriangle.useEffect": ()=>{
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                        document.removeEventListener('touchmove', handleTouchMove, {
                            passive: false
                        });
                        document.removeEventListener('touchend', handleTouchEnd);
                    }
                })["DraggableTriangle.useEffect"];
            }
        }
    }["DraggableTriangle.useEffect"], [
        isDragging,
        isRotating,
        isResizing,
        handleMouseMove,
        handleTouchMove,
        handleMouseUp,
        handleTouchEnd
    ]);
    // ResizeObserver to handle container size changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DraggableTriangle.useEffect": ()=>{
            var _triangleRef_current;
            const el = (_triangleRef_current = triangleRef.current) === null || _triangleRef_current === void 0 ? void 0 : _triangleRef_current.closest('.jxgbox');
            if (!el) return;
            const ro = new ResizeObserver({
                "DraggableTriangle.useEffect": ()=>{
                    // Force a light refresh by updating dragStart state
                    setDragStart({
                        "DraggableTriangle.useEffect": (s)=>({
                                ...s
                            })
                    }["DraggableTriangle.useEffect"]);
                }
            }["DraggableTriangle.useEffect"]);
            ro.observe(el);
            return ({
                "DraggableTriangle.useEffect": ()=>ro.disconnect()
            })["DraggableTriangle.useEffect"];
        }
    }["DraggableTriangle.useEffect"], []);
    // Generate triangle points based on type
    const getTrianglePoints = ()=>{
        const screenSize = size * pxPerUnit;
        const halfSize = screenSize / 2;
        if (type === '45-45-90') {
            // Right triangle with 45-45-90 angles
            return [
                {
                    x: 0,
                    y: 0
                },
                {
                    x: screenSize,
                    y: 0
                },
                {
                    x: 0,
                    y: screenSize
                } // Top left
            ];
        } else {
            // Right triangle with 30-60-90 angles
            const height = screenSize * Math.sqrt(3) / 2;
            return [
                {
                    x: 0,
                    y: 0
                },
                {
                    x: screenSize,
                    y: 0
                },
                {
                    x: 0,
                    y: height
                } // Top left (60° angle)
            ];
        }
    };
    // Generate enhanced ruler markings as SVG elements matching the detailed specifications
    const renderRulerMarkingsSvg = ()=>{
        var _points_, _points_1, _points_2, _points_3;
        const screenSize = size * pxPerUnit;
        const pxPerCm = pxPerUnit // 1 cm = pxPerUnit pixels
        ;
        const verticalLength = type === '45-45-90' ? screenSize : screenSize * Math.sqrt(3) / 2;
        const maxCm = Math.min(16, Math.floor(size)) // Use floor to stop at or before actual size
        ;
        const maxVerticalCm = Math.min(16, Math.floor(type === '45-45-90' ? size : size * Math.sqrt(3) / 2));
        // Horizontal ruler (bottom edge) - 0 to maxCm
        const horizontalTicks = [];
        for(let cm = 0; cm <= maxCm; cm++){
            const x = cm * pxPerCm;
            const isFive = cm % 5 === 0;
            const majorLen = isFive ? 18 : 12 // Length of tick mark
            ;
            // Main centimeter tick mark
            horizontalTicks.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: x - 0.75,
                y: 0,
                width: 1.5,
                height: majorLen,
                fill: "#000"
            }, "h-cm-".concat(cm), false, {
                fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                lineNumber: 339,
                columnNumber: 9
            }, this));
            // Number labels will be handled separately as HTML elements
            // Millimeter marks (9 small ticks between each centimeter)
            if (cm < maxCm) {
                for(let mm = 1; mm < 10; mm++){
                    const xx = x + pxPerCm * mm / 10;
                    const mmLen = mm === 5 ? 8 : 5 // 5mm mark is longer
                    ;
                    horizontalTicks.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: xx - 0.5,
                        y: 0,
                        width: 1,
                        height: mmLen,
                        fill: "#000",
                        opacity: "0.75"
                    }, "h-mm-".concat(cm, "-").concat(mm), false, {
                        fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                        lineNumber: 358,
                        columnNumber: 13
                    }, this));
                }
            }
        }
        // Add millimeter marks between last whole centimeter and final size value
        if (size % 1 !== 0) {
            const lastWholeCm = Math.floor(size);
            const finalX = size * pxPerCm;
            // Add millimeter marks from last whole cm to final size
            for(let mm = 1; mm <= Math.floor((size - lastWholeCm) * 10); mm++){
                const xx = (lastWholeCm + mm / 10) * pxPerCm;
                const mmLen = mm === 5 ? 8 : 5 // 5mm mark is longer
                ;
                horizontalTicks.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: xx - 0.5,
                    y: 0,
                    width: 1,
                    height: mmLen,
                    fill: "#000",
                    opacity: "0.75"
                }, "h-mm-final-".concat(mm), false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                    lineNumber: 383,
                    columnNumber: 11
                }, this));
            }
            // Add final marking at exact size value
            horizontalTicks.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: finalX - 0.75,
                y: 0,
                width: 1.5,
                height: 12,
                fill: "#000"
            }, "h-cm-final", false, {
                fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                lineNumber: 397,
                columnNumber: 9
            }, this));
        }
        // Vertical ruler (left edge) - 0 to maxVerticalCm
        const verticalTicks = [];
        for(let cm = 0; cm <= maxVerticalCm; cm++){
            const y = cm * pxPerCm;
            const isFive = cm % 5 === 0;
            const majorLen = isFive ? 18 : 12 // Length of tick mark
            ;
            // Main centimeter tick mark (extends LEFT from the edge)
            verticalTicks.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: -majorLen,
                y: y - 0.75,
                width: majorLen,
                height: 1.5,
                fill: "#000"
            }, "v-cm-".concat(cm), false, {
                fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                lineNumber: 417,
                columnNumber: 9
            }, this));
            // No number labels on the vertical ruler (left side)
            // Millimeter marks (9 small ticks between each centimeter)
            if (cm < maxVerticalCm) {
                for(let mm = 1; mm < 10; mm++){
                    const yy = y + pxPerCm * mm / 10;
                    const mmLen = mm === 5 ? 8 : 5 // 5mm mark is longer
                    ;
                    verticalTicks.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: -mmLen,
                        y: yy - 0.5,
                        width: mmLen,
                        height: 1,
                        fill: "#000",
                        opacity: "0.75"
                    }, "v-mm-".concat(cm, "-").concat(mm), false, {
                        fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                        lineNumber: 436,
                        columnNumber: 13
                    }, this));
                }
            }
        }
        // Add millimeter marks between last whole centimeter and final height value
        const actualHeight = type === '45-45-90' ? size : size * Math.sqrt(3) / 2;
        if (actualHeight % 1 !== 0) {
            const lastWholeCm = Math.floor(actualHeight);
            const finalY = actualHeight * pxPerCm;
            // Add millimeter marks from last whole cm to final height
            for(let mm = 1; mm <= Math.floor((actualHeight - lastWholeCm) * 10); mm++){
                const yy = (lastWholeCm + mm / 10) * pxPerCm;
                const mmLen = mm === 5 ? 8 : 5 // 5mm mark is longer
                ;
                verticalTicks.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: -mmLen,
                    y: yy - 0.5,
                    width: mmLen,
                    height: 1,
                    fill: "#000",
                    opacity: "0.75"
                }, "v-mm-final-".concat(mm), false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                    lineNumber: 462,
                    columnNumber: 11
                }, this));
            }
            // Add final marking at exact height value
            verticalTicks.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: -12,
                y: finalY - 0.75,
                width: 12,
                height: 1.5,
                fill: "#000"
            }, "v-cm-final", false, {
                fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                lineNumber: 476,
                columnNumber: 9
            }, this));
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                    x: 4,
                    y: -8,
                    fontSize: "11",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    fill: "#000",
                    children: "0"
                }, void 0, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                    lineNumber: 490,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    transform: "translate(".concat(((_points_ = points[0]) === null || _points_ === void 0 ? void 0 : _points_.x) || 0, ",").concat(((_points_1 = points[0]) === null || _points_1 === void 0 ? void 0 : _points_1.y) || 0, ")"),
                    children: horizontalTicks
                }, void 0, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                    lineNumber: 493,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    transform: "translate(".concat(((_points_2 = points[0]) === null || _points_2 === void 0 ? void 0 : _points_2.x) || 0, ",").concat(((_points_3 = points[0]) === null || _points_3 === void 0 ? void 0 : _points_3.y) || 0, ")"),
                    children: verticalTicks
                }, void 0, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                    lineNumber: 498,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
            lineNumber: 488,
            columnNumber: 7
        }, this);
    };
    const points = getTrianglePoints();
    const pathData = "M ".concat(((_points_ = points[0]) === null || _points_ === void 0 ? void 0 : _points_.x) || 0, " ").concat(((_points_1 = points[0]) === null || _points_1 === void 0 ? void 0 : _points_1.y) || 0, " L ").concat(((_points_2 = points[1]) === null || _points_2 === void 0 ? void 0 : _points_2.x) || 0, " ").concat(((_points_3 = points[1]) === null || _points_3 === void 0 ? void 0 : _points_3.y) || 0, " L ").concat(((_points_4 = points[2]) === null || _points_4 === void 0 ? void 0 : _points_4.x) || 0, " ").concat(((_points_5 = points[2]) === null || _points_5 === void 0 ? void 0 : _points_5.y) || 0, " Z");
    // Calculate triangle dimensions for dynamic handle positioning
    const basePx = size * pxPerUnit;
    const heightPx = type === '45-45-90' ? basePx : basePx * Math.sqrt(3) / 2;
    // Calculate hypotenuse midpoint (relative to SVG origin at 50, 50)
    const hypMidX = basePx / 2;
    const hypMidY = heightPx / 2;
    // Derived geometry for inner triangular cutouts (proportional to size)
    const baseLength = size * pxPerUnit;
    const verticalLength = type === '45-45-90' ? baseLength : baseLength * Math.sqrt(3) / 2;
    // Diagonal unit direction (ux, uy) from right-angle vertex and its origin point
    const origin = {
        x: ((_points_6 = points[0]) === null || _points_6 === void 0 ? void 0 : _points_6.x) || 0,
        y: ((_points_7 = points[0]) === null || _points_7 === void 0 ? void 0 : _points_7.y) || 0
    };
    const mDiag = verticalLength / baseLength;
    const len = Math.sqrt(1 + mDiag * mDiag);
    const ux = 1 / len;
    const uy = mDiag / len;
    // Reflect a point across the diagonal line through origin with unit direction (ux, uy)
    const reflectAcrossDiagonal = (px, py)=>{
        const rx = px - origin.x;
        const ry = py - origin.y;
        const dot = rx * ux + ry * uy;
        const rpx = 2 * dot * ux - rx;
        const rpy = 2 * dot * uy - ry;
        return {
            x: origin.x + rpx,
            y: origin.y + rpy
        };
    };
    // Construct cutouts similar to the two half-triangles split by the diagonal
    // Unit normal to diagonal
    const nx = -uy;
    const ny = ux;
    // Hypotenuse unit direction (from top-left to bottom-right corner)
    const hypX = baseLength;
    const hypY = -verticalLength;
    const hypLen = Math.hypot(hypX, hypY) || 1;
    const hx = hypX / hypLen;
    const hy = hypY / hypLen;
    // Length of diagonal segment OM (origin to hypotenuse midpoint)
    const OMlen = 0.5 * Math.hypot(baseLength, verticalLength);
    // Choose base length along diagonal as a fraction of OM
    const L = OMlen * 0.7;
    // Position along diagonal from origin and small gap offset
    const tAlong = OMlen * 0.55;
    const gap = Math.max(-11, -baseLength * 0.12) // increased perpendicular offset from diagonal; no rotation or along-diagonal change
    ;
    // First cutout (similar to triangle O-P1-M): base parallel to diagonal, other sides // x-axis and // hypotenuse
    const c1x = origin.x + ux * tAlong + nx * gap;
    const c1y = origin.y + uy * tAlong + ny * gap;
    const a1 = {
        x: c1x - L / 2 * ux,
        y: c1y - L / 2 * uy
    };
    const b1 = {
        x: c1x + L / 2 * ux,
        y: c1y + L / 2 * uy
    };
    // Apex c1 is intersection of: line through a1 parallel to x-axis and line through b1 parallel to hypotenuse
    const s1 = (a1.y - b1.y) / (hy || 1e-6);
    const c1 = {
        x: b1.x + s1 * hx,
        y: b1.y + s1 * hy
    };
    const cut1 = "M ".concat(a1.x, " ").concat(a1.y, " L ").concat(b1.x, " ").concat(b1.y, " L ").concat(c1.x, " ").concat(c1.y, " Z");
    // Second cutout is mirror image of the first across the diagonal (perfect symmetry)
    const a2r = reflectAcrossDiagonal(a1.x, a1.y);
    const b2r = reflectAcrossDiagonal(b1.x, b1.y);
    const c2r = reflectAcrossDiagonal(c1.x, c1.y);
    const cut2 = "M ".concat(a2r.x, " ").concat(a2r.y, " L ").concat(b2r.x, " ").concat(b2r.y, " L ").concat(c2r.x, " ").concat(c2r.y, " Z");
    // Diagonal from right-angle vertex to the midpoint of the hypotenuse
    const hypMid = {
        x: ((((_points_8 = points[1]) === null || _points_8 === void 0 ? void 0 : _points_8.x) || 0) + (((_points_9 = points[2]) === null || _points_9 === void 0 ? void 0 : _points_9.x) || 0)) / 2,
        y: ((((_points_10 = points[1]) === null || _points_10 === void 0 ? void 0 : _points_10.y) || 0) + (((_points_11 = points[2]) === null || _points_11 === void 0 ? void 0 : _points_11.y) || 0)) / 2
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: triangleRef,
        className: "absolute select-none group ".concat(isActive ? 'z-50' : 'z-40'),
        style: {
            left: screenPos.x,
            top: screenPos.y,
            transform: "rotate(".concat(rotation, "deg)"),
            transformOrigin: '0 0',
            // Debug: add background to see hover area
            backgroundColor: isHovering ? 'rgba(255, 0, 0, 0.1)' : 'transparent'
        },
        onMouseDown: handleMouseDown,
        onTouchStart: handleTouchStart,
        onMouseEnter: ()=>setIsHovering(true),
        onMouseLeave: ()=>setIsHovering(false),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            style: {
                pointerEvents: 'auto'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: size * pxPerUnit + 100,
                    height: type === '45-45-90' ? size * pxPerUnit + 100 : size * pxPerUnit * Math.sqrt(3) / 2 + 100,
                    className: "absolute",
                    style: {
                        left: -50,
                        top: -50,
                        pointerEvents: 'auto'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "plasticGradient-".concat(type),
                                    x1: "0%",
                                    y1: "0%",
                                    x2: "100%",
                                    y2: "100%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "rgba(255,255,255,0.6)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 603,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "15%",
                                            stopColor: "rgba(255,255,255,0.4)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 604,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "30%",
                                            stopColor: "rgba(255,255,255,0.2)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 605,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "50%",
                                            stopColor: "rgba(240,245,250,0.1)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 606,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "70%",
                                            stopColor: "rgba(200,210,220,0.15)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 607,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "85%",
                                            stopColor: "rgba(150,160,170,0.2)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 608,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "rgba(100,110,120,0.25)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 609,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 602,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "highlightGradient-".concat(type),
                                    x1: "0%",
                                    y1: "0%",
                                    x2: "60%",
                                    y2: "40%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "rgba(255,255,255,0.8)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 614,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "30%",
                                            stopColor: "rgba(255,255,255,0.4)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 615,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "60%",
                                            stopColor: "rgba(255,255,255,0.1)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 616,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "rgba(255,255,255,0)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 617,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 613,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "shadowGradient-".concat(type),
                                    x1: "0%",
                                    y1: "0%",
                                    x2: "100%",
                                    y2: "100%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "rgba(0,0,0,0)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 622,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "50%",
                                            stopColor: "rgba(0,0,0,0.05)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 623,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "rgba(0,0,0,0.15)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 624,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 621,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: "softShadow-".concat(type),
                                    x: "-50%",
                                    y: "-50%",
                                    width: "200%",
                                    height: "200%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
                                            dx: "0",
                                            dy: "8",
                                            stdDeviation: "16",
                                            floodColor: "#000",
                                            floodOpacity: "0.3"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 629,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
                                            dx: "0",
                                            dy: "4",
                                            stdDeviation: "8",
                                            floodColor: "#000",
                                            floodOpacity: "0.2"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 630,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
                                            dx: "0",
                                            dy: "2",
                                            stdDeviation: "4",
                                            floodColor: "#000",
                                            floodOpacity: "0.1"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 631,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 628,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: "innerShadow-".concat(type),
                                    x: "-50%",
                                    y: "-50%",
                                    width: "200%",
                                    height: "200%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feFlood", {
                                            floodColor: "#000",
                                            floodOpacity: "0.2",
                                            result: "flood"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 636,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                            in: "flood",
                                            in2: "SourceGraphic",
                                            operator: "in",
                                            result: "composite"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 637,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                            in: "composite",
                                            stdDeviation: "3",
                                            result: "blur"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 638,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feOffset", {
                                            in: "blur",
                                            dx: "2",
                                            dy: "2",
                                            result: "offset"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 639,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                            in: "offset",
                                            in2: "SourceGraphic",
                                            operator: "over"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 640,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 635,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: "deepInnerShadow-".concat(type),
                                    x: "-50%",
                                    y: "-50%",
                                    width: "200%",
                                    height: "200%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feFlood", {
                                            floodColor: "#000",
                                            floodOpacity: "0.15",
                                            result: "flood"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 645,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                            in: "flood",
                                            in2: "SourceGraphic",
                                            operator: "in",
                                            result: "composite"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 646,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                            in: "composite",
                                            stdDeviation: "5",
                                            result: "blur"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 647,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feOffset", {
                                            in: "blur",
                                            dx: "3",
                                            dy: "3",
                                            result: "offset"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 648,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                            in: "offset",
                                            in2: "SourceGraphic",
                                            operator: "over"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 649,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 644,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: "glow-".concat(type),
                                    x: "-50%",
                                    y: "-50%",
                                    width: "200%",
                                    height: "200%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                            stdDeviation: "3",
                                            result: "coloredBlur"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 654,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                    in: "coloredBlur"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                                    lineNumber: 656,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                    in: "SourceGraphic"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                                    lineNumber: 657,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 655,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 653,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mask", {
                                    id: "triangle-mask-".concat(type),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: pathData,
                                            fill: "white"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 664,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: cut1,
                                            fill: "black"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 666,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: cut2,
                                            fill: "black"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 667,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 662,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 600,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            filter: isActive ? "url(#glow-".concat(type, ")") : "url(#softShadow-".concat(type, ")"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: pathData,
                                    fill: "rgba(240,245,250,0.25)",
                                    mask: "url(#triangle-mask-".concat(type, ")")
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 674,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: pathData,
                                    fill: "url(#shadowGradient-".concat(type, ")"),
                                    mask: "url(#triangle-mask-".concat(type, ")")
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 676,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: pathData,
                                    fill: "url(#plasticGradient-".concat(type, ")"),
                                    mask: "url(#triangle-mask-".concat(type, ")")
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 678,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: pathData,
                                    fill: "url(#highlightGradient-".concat(type, ")"),
                                    mask: "url(#triangle-mask-".concat(type, ")")
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 680,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: pathData,
                                    fill: "none",
                                    stroke: "#000000",
                                    strokeWidth: "2.5"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 682,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 672,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: origin.x,
                            y1: origin.y,
                            x2: hypMid.x,
                            y2: hypMid.y,
                            stroke: "#000000",
                            strokeWidth: "1.2",
                            strokeDasharray: "4 3"
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 686,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M ".concat((((_points_12 = points[0]) === null || _points_12 === void 0 ? void 0 : _points_12.x) || 0) + 6, " ").concat(((_points_13 = points[0]) === null || _points_13 === void 0 ? void 0 : _points_13.y) || 0, " L ").concat((((_points_14 = points[0]) === null || _points_14 === void 0 ? void 0 : _points_14.x) || 0) + 6, " ").concat((((_points_15 = points[0]) === null || _points_15 === void 0 ? void 0 : _points_15.y) || 0) + 6, " L ").concat(((_points_16 = points[0]) === null || _points_16 === void 0 ? void 0 : _points_16.x) || 0, " ").concat((((_points_17 = points[0]) === null || _points_17 === void 0 ? void 0 : _points_17.y) || 0) + 6),
                            fill: "none",
                            stroke: "#000000",
                            strokeWidth: "1.2",
                            strokeLinecap: "round"
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 697,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            x: (((_points_18 = points[0]) === null || _points_18 === void 0 ? void 0 : _points_18.x) || 0) + 10,
                            y: (((_points_19 = points[0]) === null || _points_19 === void 0 ? void 0 : _points_19.y) || 0) + 3,
                            fontSize: "8",
                            fill: "#000000",
                            fontFamily: "Arial, sans-serif",
                            fontWeight: "bold",
                            children: "90°"
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 706,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: cut1,
                            fill: "none",
                            stroke: "#000000",
                            strokeWidth: "1.2",
                            filter: "url(#deepInnerShadow-".concat(type, ")")
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 718,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: cut2,
                            fill: "none",
                            stroke: "#000000",
                            strokeWidth: "1.2",
                            filter: "url(#deepInnerShadow-".concat(type, ")")
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 719,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: cut1,
                            fill: "none",
                            stroke: "#000000",
                            strokeWidth: "1.2",
                            filter: "url(#innerShadow-".concat(type, ")")
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 721,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: cut2,
                            fill: "none",
                            stroke: "#000000",
                            strokeWidth: "1.2",
                            filter: "url(#innerShadow-".concat(type, ")")
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 722,
                            columnNumber: 11
                        }, this),
                        renderRulerMarkingsSvg()
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                    lineNumber: 594,
                    columnNumber: 9
                }, this),
                (()=>{
                    const screenSize = size * pxPerUnit;
                    const pxPerCm = pxPerUnit;
                    const maxCm = Math.min(16, Math.floor(size)) // Use floor to stop at or before actual size
                    ;
                    const numbers = [];
                    for(let cm = 1; cm <= maxCm; cm++){
                        const x = cm * pxPerCm;
                        const isFive = cm % 5 === 0;
                        numbers.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute text-xs text-gray-800 font-mono",
                            style: {
                                left: x - 50,
                                top: -65,
                                transform: 'translateX(-50%)',
                                fontWeight: isFive ? 'bold' : 'normal',
                                fontSize: '11px',
                                fontFamily: 'Arial, sans-serif',
                                pointerEvents: 'none'
                            },
                            children: cm
                        }, "h-number-".concat(cm), false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 739,
                            columnNumber: 15
                        }, this));
                    }
                    // Add final number at exact size value (only if not a whole number)
                    if (size % 1 !== 0) {
                        const finalX = size * pxPerCm;
                        numbers.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute text-xs text-gray-800 font-mono",
                            style: {
                                left: finalX - 50,
                                top: -65,
                                transform: 'translateX(-50%)',
                                fontWeight: 'normal',
                                fontSize: '11px',
                                fontFamily: 'Arial, sans-serif',
                                pointerEvents: 'none'
                            },
                            children: size.toFixed(1)
                        }, "h-number-final", false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 761,
                            columnNumber: 15
                        }, this));
                    }
                    return numbers;
                })(),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rotation-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-emerald-500 shadow-md flex items-center justify-center transition-opacity duration-200",
                    style: {
                        pointerEvents: 'auto',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                        opacity: isHovering ? 1 : 0,
                        left: "".concat(1.35 * hypMidX - 50 - basePx * 0.2, "px"),
                        top: "".concat(1.35 * hypMidY - 50 - heightPx * 0.2, "px"),
                        transform: 'translate(-50%, -50%)',
                        zIndex: 20
                    },
                    title: "Otočit trojúhelník",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-2 h-2 bg-emerald-500 rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                        lineNumber: 796,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                    lineNumber: 783,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "resize-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-amber-500 shadow-md flex items-center justify-center transition-opacity duration-200",
                    style: {
                        pointerEvents: 'auto',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                        opacity: isHovering ? 1 : 0,
                        left: "".concat(0.6 * hypMidX - 50 + basePx * 0.2, "px"),
                        top: "".concat(0.6 * hypMidY - 50 + heightPx * 0.2, "px"),
                        transform: 'translate(-50%, -50%)',
                        zIndex: 15
                    },
                    title: "Změnit velikost",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-2 h-2 bg-amber-500 rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                        lineNumber: 813,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                    lineNumber: 800,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
            lineNumber: 593,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
        lineNumber: 576,
        columnNumber: 5
    }, this);
}
_s(DraggableTriangle, "aG8nZdPbLNOSPchCRJRi5Cz12tc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$hooks$2f$useBoardScale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardScale"]
    ];
});
_c = DraggableTriangle;
var _c;
__turbopack_context__.k.register(_c, "DraggableTriangle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DraggableProtractor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$hooks$2f$useBoardScale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/app/hooks/useBoardScale.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function DraggableProtractor(param) {
    let { x, y, rotation, size, onPositionChange, isActive, onActivate, onUiBusyChange } = param;
    _s();
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isRotating, setIsRotating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isResizing, setIsResizing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isHovering, setIsHovering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dragStart, setDragStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [rotationStart, setRotationStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        rotation: 0
    });
    const [resizeStart, setResizeStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        size: 0
    });
    const protractorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const getScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$hooks$2f$useBoardScale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardScale"])(protractorRef);
    const { pxPerUnitX, pxPerUnitY } = getScale();
    const pxPerUnit = Math.min(pxPerUnitX, pxPerUnitY);
    // Get bounding box info from scale hook
    const scaleInfo = getScale();
    const { boardLeft, boardTop, boardRight, boardBottom, boardWidth, boardHeight } = scaleInfo;
    // Convert board coordinates to screen coordinates
    const boardToScreen = (boardX, boardY)=>{
        var _protractorRef_current;
        // Get actual container dimensions
        const container = (_protractorRef_current = protractorRef.current) === null || _protractorRef_current === void 0 ? void 0 : _protractorRef_current.closest('.jxgbox');
        const containerWidth = (container === null || container === void 0 ? void 0 : container.offsetWidth) || 800;
        const containerHeight = (container === null || container === void 0 ? void 0 : container.offsetHeight) || 500;
        const screenX = (boardX - boardLeft) / boardWidth * containerWidth;
        const screenY = containerHeight - (boardY - boardBottom) / boardHeight * containerHeight;
        return {
            x: screenX,
            y: screenY
        };
    };
    const screenToBoard = (screenX, screenY)=>{
        var _protractorRef_current;
        const container = (_protractorRef_current = protractorRef.current) === null || _protractorRef_current === void 0 ? void 0 : _protractorRef_current.closest('.jxgbox');
        const containerWidth = (container === null || container === void 0 ? void 0 : container.offsetWidth) || 800;
        const containerHeight = (container === null || container === void 0 ? void 0 : container.offsetHeight) || 500;
        const boardX = screenX / containerWidth * boardWidth + boardLeft;
        const boardY = boardTop - screenY / containerHeight * boardHeight;
        return {
            x: boardX,
            y: boardY
        };
    };
    const screenPos = boardToScreen(x, y);
    // Smooth movement without grid snapping
    const smoothPosition = (boardX, boardY)=>{
        return {
            x: boardX,
            y: boardY
        };
    };
    const handleMouseDown = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        onActivate();
        onUiBusyChange(true);
        const target = e.target;
        if (target.classList.contains('rotation-handle')) {
            setIsRotating(true);
            setRotationStart({
                x: e.clientX,
                y: e.clientY,
                rotation
            });
        } else if (target.classList.contains('resize-handle')) {
            setIsResizing(true);
            setResizeStart({
                x: e.clientX,
                y: e.clientY,
                size
            });
        } else {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - screenPos.x,
                y: e.clientY - screenPos.y
            });
        }
    };
    const handleTouchStart = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        onActivate();
        onUiBusyChange(true);
        const touch = e.touches[0];
        if (!touch) return;
        const target = e.target;
        if (target.classList.contains('rotation-handle')) {
            setIsRotating(true);
            setRotationStart({
                x: touch.clientX,
                y: touch.clientY,
                rotation
            });
        } else if (target.classList.contains('resize-handle')) {
            setIsResizing(true);
            setResizeStart({
                x: touch.clientX,
                y: touch.clientY,
                size
            });
        } else {
            setIsDragging(true);
            setDragStart({
                x: touch.clientX - screenPos.x,
                y: touch.clientY - screenPos.y
            });
        }
    };
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DraggableProtractor.useCallback[handleMouseMove]": (e)=>{
            if (isDragging) {
                const newScreenX = e.clientX - dragStart.x;
                const newScreenY = e.clientY - dragStart.y;
                const newBoardPos = screenToBoard(newScreenX, newScreenY);
                const smoothPos = smoothPosition(newBoardPos.x, newBoardPos.y);
                onPositionChange(smoothPos.x, smoothPos.y, rotation, size);
            } else if (isRotating) {
                const centerX = screenPos.x;
                const centerY = screenPos.y;
                const deltaX = e.clientX - centerX;
                const deltaY = e.clientY - centerY;
                const aRaw = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
                const a360 = (aRaw + 360) % 360;
                const snapped = Math.round(a360 / 5) * 5;
                onPositionChange(x, y, snapped, size);
            } else if (isResizing) {
                const deltaX = e.clientX - resizeStart.x;
                const deltaY = e.clientY - resizeStart.y;
                // Project the delta vector onto the protractor's main axis (considering rotation)
                const rotationRad = rotation * Math.PI / 180;
                const protractorAxisX = Math.cos(rotationRad);
                const protractorAxisY = Math.sin(rotationRad);
                // Calculate the projection of the delta vector onto the protractor axis
                const projection = deltaX * protractorAxisX + deltaY * protractorAxisY;
                const deltaSize = projection / 20 // Scale factor
                ;
                const newSize = Math.max(2, Math.min(6, resizeStart.size + deltaSize));
                onPositionChange(x, y, rotation, newSize);
            }
        }
    }["DraggableProtractor.useCallback[handleMouseMove]"], [
        isDragging,
        isRotating,
        isResizing,
        dragStart,
        resizeStart,
        screenPos,
        x,
        y,
        rotation,
        size,
        onPositionChange
    ]);
    const handleTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DraggableProtractor.useCallback[handleTouchMove]": (e)=>{
            const touch = e.touches[0];
            if (!touch) return;
            if (isDragging) {
                const newScreenX = touch.clientX - dragStart.x;
                const newScreenY = touch.clientY - dragStart.y;
                const newBoardPos = screenToBoard(newScreenX, newScreenY);
                const smoothPos = smoothPosition(newBoardPos.x, newBoardPos.y);
                onPositionChange(smoothPos.x, smoothPos.y, rotation, size);
            } else if (isRotating) {
                const centerX = screenPos.x;
                const centerY = screenPos.y;
                const deltaX = touch.clientX - centerX;
                const deltaY = touch.clientY - centerY;
                const aRaw = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
                const a360 = (aRaw + 360) % 360;
                const snapped = Math.round(a360 / 5) * 5;
                onPositionChange(x, y, snapped, size);
            } else if (isResizing) {
                const deltaX = touch.clientX - resizeStart.x;
                const deltaY = touch.clientY - resizeStart.y;
                // Project the delta vector onto the protractor's main axis (considering rotation)
                const rotationRad = rotation * Math.PI / 180;
                const protractorAxisX = Math.cos(rotationRad);
                const protractorAxisY = Math.sin(rotationRad);
                // Calculate the projection of the delta vector onto the protractor axis
                const projection = deltaX * protractorAxisX + deltaY * protractorAxisY;
                const deltaSize = projection / 20 // Scale factor
                ;
                const newSize = Math.max(2, Math.min(6, resizeStart.size + deltaSize));
                onPositionChange(x, y, rotation, newSize);
            }
        }
    }["DraggableProtractor.useCallback[handleTouchMove]"], [
        isDragging,
        isRotating,
        isResizing,
        dragStart,
        resizeStart,
        screenPos,
        x,
        y,
        rotation,
        size,
        onPositionChange
    ]);
    const handleMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DraggableProtractor.useCallback[handleMouseUp]": ()=>{
            setIsDragging(false);
            setIsRotating(false);
            setIsResizing(false);
            onUiBusyChange(false);
        }
    }["DraggableProtractor.useCallback[handleMouseUp]"], [
        onUiBusyChange
    ]);
    const handleTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DraggableProtractor.useCallback[handleTouchEnd]": ()=>{
            setIsDragging(false);
            setIsRotating(false);
            setIsResizing(false);
            onUiBusyChange(false);
        }
    }["DraggableProtractor.useCallback[handleTouchEnd]"], [
        onUiBusyChange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DraggableProtractor.useEffect": ()=>{
            if (isDragging || isRotating || isResizing) {
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
                document.addEventListener('touchmove', handleTouchMove, {
                    passive: false
                });
                document.addEventListener('touchend', handleTouchEnd);
                return ({
                    "DraggableProtractor.useEffect": ()=>{
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                        document.removeEventListener('touchmove', handleTouchMove, {
                            passive: false
                        });
                        document.removeEventListener('touchend', handleTouchEnd);
                    }
                })["DraggableProtractor.useEffect"];
            }
        }
    }["DraggableProtractor.useEffect"], [
        isDragging,
        isRotating,
        isResizing,
        handleMouseMove,
        handleTouchMove,
        handleMouseUp,
        handleTouchEnd
    ]);
    // ResizeObserver to handle container size changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DraggableProtractor.useEffect": ()=>{
            var _protractorRef_current;
            const el = (_protractorRef_current = protractorRef.current) === null || _protractorRef_current === void 0 ? void 0 : _protractorRef_current.closest('.jxgbox');
            if (!el) return;
            const ro = new ResizeObserver({
                "DraggableProtractor.useEffect": ()=>{
                    // Force a light refresh by updating dragStart state
                    setDragStart({
                        "DraggableProtractor.useEffect": (s)=>({
                                ...s
                            })
                    }["DraggableProtractor.useEffect"]);
                }
            }["DraggableProtractor.useEffect"]);
            ro.observe(el);
            return ({
                "DraggableProtractor.useEffect": ()=>ro.disconnect()
            })["DraggableProtractor.useEffect"];
        }
    }["DraggableProtractor.useEffect"], []);
    // Calculate protractor dimensions
    const radiusPx = size * pxPerUnit;
    const centerX = size * pxPerUnit * 1.2 // Adjusted for new SVG dimensions
    ;
    const centerY = size * pxPerUnit * 1.1 // Adjusted for new SVG dimensions
    ;
    // Helper variables for improved design
    const R = radiusPx // outer radius (tick tips)
    ;
    const ring = Math.max(8, R * 0.075) // thickness of the dark tick band
    ;
    const innerR = R - ring // inner edge of the tick band (rim sits here)
    ;
    const uid = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "DraggableProtractor.useMemo[uid]": ()=>Math.random().toString(36).slice(2)
    }["DraggableProtractor.useMemo[uid]"], []);
    const arc = (rad)=>"M ".concat(centerX - rad, " ").concat(centerY, " A ").concat(rad, " ").concat(rad, " 0 0 1 ").concat(centerX + rad, " ").concat(centerY);
    // Returns a closed path for the grey ring band between radii R and r (r < R), 0..180°
    const ringBandPath = (R, r)=>{
        // Outer arc: from left outer point to right outer point (sweep=1)
        // Then line down to the right inner point
        // Inner arc back to the left inner point (sweep=0), and close.
        return "\n      M ".concat(centerX - R, " ").concat(centerY, "\n      A ").concat(R, " ").concat(R, " 0 0 1 ").concat(centerX + R, " ").concat(centerY, "\n      L ").concat(centerX + r, " ").concat(centerY, "\n      A ").concat(r, " ").concat(r, " 0 0 0 ").concat(centerX - r, " ").concat(centerY, "\n      Z\n    ");
    };
    // Generate protractor markings
    const generateMarkings = ()=>{
        const markings = [];
        // Generate degree markings (0-180 degrees)
        for(let angle = 0; angle <= 180; angle += 1){
            const rad = angle * Math.PI / 180;
            const isMajor = angle % 10 === 0;
            const isMedium = angle % 5 === 0 && !isMajor;
            const isMinor = angle % 1 === 0 && !isMajor && !isMedium;
            // Different tick lengths for different types
            let tickLength = 0;
            let strokeWidth = 0.5;
            if (isMajor) {
                tickLength = R - innerR; // Full length from inner to outer
                strokeWidth = 2.5;
            } else if (isMedium) {
                tickLength = (R - innerR) * 0.7; // 70% of full length
                strokeWidth = 1.5;
            } else if (isMinor) {
                tickLength = (R - innerR) * 0.4; // 40% of full length
                strokeWidth = 0.8;
            }
            const x1 = centerX + Math.cos(rad) * (R - tickLength);
            const y1 = centerY - Math.sin(rad) * (R - tickLength);
            const x2 = centerX + Math.cos(rad) * R;
            const y2 = centerY - Math.sin(rad) * R;
            markings.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                stroke: "#374151",
                strokeWidth: strokeWidth
            }, "mark-".concat(angle), false, {
                fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                lineNumber: 288,
                columnNumber: 9
            }, this));
            // Add degree labels for every 10 degrees
            if (isMajor) {
                const labelDistance = R + 20 // was radiusPx + 20
                ;
                const labelX = centerX + Math.cos(rad) * labelDistance;
                const labelY = centerY - Math.sin(rad) * labelDistance;
                markings.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                    x: labelX,
                    y: labelY,
                    fontSize: "11",
                    fill: "#1f2937",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    textAnchor: "middle",
                    dominantBaseline: "middle",
                    children: [
                        angle,
                        "°"
                    ]
                }, "label-".concat(angle), true, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                    lineNumber: 306,
                    columnNumber: 11
                }, this));
            }
        }
        return markings;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: protractorRef,
        className: "absolute select-none group ".concat(isActive ? 'z-50' : 'z-40'),
        style: {
            left: screenPos.x,
            top: screenPos.y,
            transform: "translate(-50%, -50%) rotate(".concat(rotation, "deg)"),
            transformOrigin: '50% 50%'
        },
        onMouseDown: handleMouseDown,
        onTouchStart: handleTouchStart,
        onMouseEnter: ()=>setIsHovering(true),
        onMouseLeave: ()=>setIsHovering(false),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            style: {
                pointerEvents: 'auto'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: size * pxPerUnit * 2.6,
                    height: size * pxPerUnit * 2.4,
                    className: "absolute",
                    style: {
                        left: -size * pxPerUnit * 1.3,
                        top: -size * pxPerUnit * 1.2,
                        pointerEvents: 'auto'
                    },
                    viewBox: "0 0 ".concat(size * pxPerUnit * 2.6, " ").concat(size * pxPerUnit * 1.4),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: "protractorShadow",
                                    x: "-20%",
                                    y: "-20%",
                                    width: "140%",
                                    height: "140%",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
                                        dx: "1",
                                        dy: "1",
                                        stdDeviation: "2",
                                        floodColor: "#000",
                                        floodOpacity: "0.15"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                                        lineNumber: 356,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                                    lineNumber: 355,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mask", {
                                    id: "innerArcMask-".concat(uid),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            width: "100%",
                                            height: "100%",
                                            fill: "white"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                                            lineNumber: 359,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: centerX - innerR * 2,
                                            y: centerY - ring - 1,
                                            width: innerR * 4,
                                            height: ring + 20,
                                            fill: "black"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                                            lineNumber: 361,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                                    lineNumber: 358,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                            lineNumber: 354,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: ringBandPath(R, innerR),
                            fill: "rgba(107,114,128,0.22)",
                            stroke: "none"
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                            lineNumber: 372,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                            x: centerX - innerR,
                            y: centerY - ring,
                            width: innerR * 2,
                            height: ring,
                            fill: "rgba(107,114,128,0.22)"
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                            lineNumber: 379,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: arc(R),
                            fill: "none",
                            stroke: "#0f172a",
                            strokeWidth: "2.2",
                            opacity: "0.95",
                            filter: "url(#protractorShadow)"
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                            lineNumber: 388,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: centerX - R,
                            y1: centerY,
                            x2: centerX + R,
                            y2: centerY,
                            stroke: "#000000",
                            strokeWidth: isActive ? 1.9 : 1,
                            strokeLinecap: "round"
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                            lineNumber: 391,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: centerX - innerR,
                            y1: centerY - ring,
                            x2: centerX + innerR,
                            y2: centerY - ring,
                            stroke: "#000000",
                            strokeWidth: "1.4",
                            strokeLinecap: "round"
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                            lineNumber: 395,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M ".concat(centerX - innerR, " ").concat(centerY, " A ").concat(innerR, " ").concat(innerR, " 0 0 1 ").concat(centerX + innerR, " ").concat(centerY, " Z"),
                            fill: "none",
                            stroke: "#000000",
                            strokeWidth: "1",
                            mask: "url(#innerArcMask-".concat(uid, ")")
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                            lineNumber: 399,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: centerX,
                            cy: centerY,
                            r: isActive ? 4 : 3,
                            fill: "#dc2626",
                            stroke: "#fff",
                            strokeWidth: "2",
                            filter: "url(#protractorShadow)"
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                            lineNumber: 403,
                            columnNumber: 11
                        }, this),
                        generateMarkings()
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                    lineNumber: 343,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rotation-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-emerald-500 shadow-md flex items-center justify-center transition-opacity duration-200",
                    style: {
                        pointerEvents: 'auto',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                        opacity: isHovering ? 1 : 0,
                        left: "".concat(0.2 * centerX - radiusPx * 0.3, "px"),
                        top: "".concat(0.36 * centerY, "px"),
                        transform: 'translate(-50%, -50%)',
                        zIndex: 20
                    },
                    title: "Otočit úhloměr",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-2 h-2 bg-emerald-500 rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                        lineNumber: 424,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                    lineNumber: 411,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "resize-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-amber-500 shadow-md flex items-center justify-center transition-opacity duration-200",
                    style: {
                        pointerEvents: 'auto',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                        opacity: isHovering ? 1 : 0,
                        left: "".concat(-0.37 * centerX + radiusPx * 0.3, "px"),
                        top: "".concat(0.36 * centerY, "px"),
                        transform: 'translate(-50%, -50%)',
                        zIndex: 15
                    },
                    title: "Změnit velikost",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-2 h-2 bg-amber-500 rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                        lineNumber: 441,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                    lineNumber: 428,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
            lineNumber: 342,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
        lineNumber: 327,
        columnNumber: 5
    }, this);
}
_s(DraggableProtractor, "/dsBBLLzZkPk6+k7UPhD/NlGkpY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$hooks$2f$useBoardScale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardScale"]
    ];
});
_c = DraggableProtractor;
var _c;
__turbopack_context__.k.register(_c, "DraggableProtractor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/geometry_review/lib/supabase-helpers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAttempt",
    ()=>createAttempt,
    "createSession",
    ()=>createSession,
    "endSession",
    ()=>endSession,
    "ensureAuthenticatedUserExists",
    ()=>ensureAuthenticatedUserExists,
    "getAttemptsByQuestion",
    ()=>getAttemptsByQuestion,
    "getAttemptsByUser",
    ()=>getAttemptsByUser,
    "getOrCreateUser",
    ()=>getOrCreateUser,
    "getQuestion",
    ()=>getQuestion,
    "getQuestions",
    ()=>getQuestions,
    "sampleQuestions",
    ()=>sampleQuestions,
    "seedSampleQuestions",
    ()=>seedSampleQuestions,
    "updateAttempt",
    ()=>updateAttempt,
    "updateSession",
    ()=>updateSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/supabase.ts [app-client] (ecmascript)");
;
async function getQuestions() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('gq_questions').select('*').order('created_at', {
        ascending: false
    });
    if (error) throw error;
    return data || [];
}
async function getQuestion(id) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('gq_questions').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
}
async function getOrCreateUser(email, name) {
    // Try to get existing user
    const { data: existingUser, error: fetchError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').select('*').eq('email', email).single();
    if (existingUser && !fetchError) {
        return existingUser;
    }
    // Create new user if doesn't exist
    const { data: newUser, error: createError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').insert({
        email,
        name: name || email.split('@')[0],
        role: 'student'
    }).select().single();
    if (createError) throw createError;
    return newUser;
}
async function ensureAuthenticatedUserExists(authUserId, email, name) {
    // Try to get existing user by ID (should match auth user ID)
    const { data: existingUser, error: fetchError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').select('*').eq('id', authUserId).single();
    if (existingUser && !fetchError) {
        return existingUser;
    }
    // Create new user record with the auth user's ID
    const { data: newUser, error: createError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').insert({
        id: authUserId,
        email,
        name: name || email.split('@')[0],
        role: 'student'
    }).select().single();
    if (createError) {
        // If error is due to duplicate, try fetching again
        if (createError.code === '23505') {
            const { data: user } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').select('*').eq('id', authUserId).single();
            if (user) return user;
        }
        throw createError;
    }
    return newUser;
}
async function createSession(userId, questionId) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('sessions').insert({
        user_id: userId,
        question_id: questionId,
        session_data: {},
        is_active: true
    }).select().single();
    if (error) throw error;
    return data;
}
async function updateSession(sessionId, sessionData) {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('sessions').update({
        session_data: sessionData
    }).eq('id', sessionId);
    if (error) throw error;
}
async function endSession(sessionId) {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('sessions').update({
        is_active: false
    }).eq('id', sessionId);
    if (error) throw error;
}
async function createAttempt(questionId, sessionId, studentId) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('gq_attempts').insert({
        question_id: questionId,
        session_id: sessionId,
        state: {},
        student_id: studentId,
        is_complete: false,
        time_spent: 0
    }).select().single();
    if (error) throw error;
    return data;
}
async function updateAttempt(attemptId, updates) {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('gq_attempts').update(updates).eq('id', attemptId);
    if (error) throw error;
}
async function getAttemptsByUser(userId) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('gq_attempts').select("\n      *,\n      gq_questions (\n        title,\n        code,\n        difficulty\n      )\n    ").eq('student_id', userId).order('created_at', {
        ascending: false
    });
    if (error) throw error;
    return data || [];
}
async function getAttemptsByQuestion(questionId) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('gq_attempts').select("\n      *,\n      sessions (\n        user_id\n      )\n    ").eq('question_id', questionId).order('created_at', {
        ascending: false
    });
    if (error) throw error;
    return data || [];
}
const sampleQuestions = [
    {
        code: 'TRIANGLE_001',
        title: 'Konstrukce rovnoramenného trojúhelníku',
        prompt_md: "\n# Konstrukce rovnoramenného trojúhelníku\n\nSestrojte rovnoramenný trojúhelník ABC tak, aby:\n- Bod C je vrchol trojúhelníku\n- Bod S je střed ramene\n- Základna AB leží na přímce q\n\n## Postup:\n1. Označte body A a B na přímce q\n2. Sestrojte úsečky AC a BC\n3. Ověřte, že AC = BC\n    ",
        max_score: 3,
        givens: {
            points: {
                S: {
                    x: 5,
                    y: 5
                },
                C: {
                    x: 4.5,
                    y: 3
                }
            },
            lines: {
                q: {
                    p1: {
                        x: 0,
                        y: 7
                    },
                    p2: {
                        x: 10,
                        y: 7
                    }
                }
            }
        },
        constraints: {
            requiredPoints: 2,
            requiredSegments: 3,
            minScore: 2
        },
        difficulty: 2,
        tags: [
            'trojúhelník',
            'rovnoramenný',
            'konstrukce'
        ]
    },
    {
        code: 'CIRCLE_001',
        title: 'Konstrukce kružnice procházející třemi body',
        prompt_md: "\n# Konstrukce kružnice procházející třemi body\n\nSestrojte kružnici, která prochází body A, B a C.\n\n## Postup:\n1. Sestrojte osy úseček AB a BC\n2. Najděte průsečík os - střed kružnice\n3. Sestrojte kružnici se středem v průsečíku os\n    ",
        max_score: 4,
        givens: {
            points: {
                A: {
                    x: 2,
                    y: 6
                },
                B: {
                    x: 6,
                    y: 6
                },
                C: {
                    x: 4,
                    y: 3
                }
            }
        },
        constraints: {
            requiredPoints: 1,
            requiredLines: 2,
            requiredCircles: 1,
            minScore: 3
        },
        difficulty: 3,
        tags: [
            'kružnice',
            'tři body',
            'osy úseček'
        ]
    },
    {
        code: 'ANGLE_001',
        title: 'Konstrukce úhlu',
        prompt_md: "\n# Konstrukce úhlu\n\nSestrojte úhel o velikosti 60° s vrcholem v bodě A a jedním ramenem na přímce p.\n\n## Postup:\n1. Označte bod B na přímce p\n2. Sestrojte kružnici se středem A a poloměrem AB\n3. Sestrojte druhé rameno úhlu\n    ",
        max_score: 3,
        givens: {
            points: {
                A: {
                    x: 3,
                    y: 4
                }
            },
            lines: {
                p: {
                    p1: {
                        x: 0,
                        y: 4
                    },
                    p2: {
                        x: 8,
                        y: 4
                    }
                }
            }
        },
        constraints: {
            requiredPoints: 1,
            requiredLines: 1,
            requiredCircles: 1,
            minScore: 2
        },
        difficulty: 2,
        tags: [
            'úhel',
            '60°',
            'konstrukce'
        ]
    }
];
async function seedSampleQuestions() {
    try {
        // Check if questions already exist
        const existingQuestions = await getQuestions();
        if (existingQuestions.length > 0) {
            console.log('Questions already exist, skipping seed');
            return;
        }
        // Insert sample questions
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('gq_questions').insert(sampleQuestions);
        if (error) throw error;
        console.log('Sample questions seeded successfully');
    } catch (err) {
        console.error('Error seeding questions:', err);
        throw err;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/geometry_review/lib/undo-redo.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Standalone Undo/Redo System for JSXGraph Geometry
 * 
 * This module provides a clean, isolated undo/redo system that can be easily
 * integrated into any JSXGraph-based geometry application.
 */ __turbopack_context__.s([
    "UndoRedoManager",
    ()=>UndoRedoManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/index.js [app-client] (ecmascript)");
;
;
class UndoRedoManager {
    withinTol(a, b) {
        let tol = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.EPS;
        return Math.abs(a - b) <= tol;
    }
    withSuppressed(fn) {
        const prev = this.suppressTracking;
        this.suppressTracking = true;
        try {
            return fn();
        } finally{
            this.suppressTracking = prev;
        }
    }
    // Public API
    pushOperation(op) {
        const frozen = structuredClone(op);
        this.withSuppressed(()=>this.performOperation(frozen));
        if (this.txnDepth > 0) {
            this.pendingOps.push(frozen);
        } else {
            this.undoStack.push(frozen);
            this.redoStack = []; // Clear redo stack on new operation
        }
    }
    begin() {
        this.txnDepth++;
    }
    commit() {
        if (this.txnDepth === 0) return;
        this.txnDepth--;
        if (this.txnDepth > 0) return;
        if (this.pendingOps.length === 0) return;
        // compress: push a synthetic op that replays the batch
        const bundle = structuredClone(this.pendingOps);
        this.pendingOps = [];
        this.undoStack.push({
            kind: 'bundle',
            ops: bundle
        });
        this.redoStack = [];
    }
    undo() {
        var _this_onFeedback, _this;
        if (this.undoStack.length === 0) return;
        const op = this.undoStack.pop();
        const frozen = structuredClone(op);
        this.suppressTracking = true;
        try {
            this.rollbackOperation(frozen);
        } finally{
            this.suppressTracking = false;
        }
        this.redoStack.push(frozen);
        this.board.update();
        (_this_onFeedback = (_this = this).onFeedback) === null || _this_onFeedback === void 0 ? void 0 : _this_onFeedback.call(_this, '');
    }
    redo() {
        var _this_onFeedback, _this;
        if (this.redoStack.length === 0) return;
        const op = this.redoStack.pop();
        const frozen = structuredClone(op);
        this.suppressTracking = true;
        try {
            this.performOperation(frozen);
        } finally{
            this.suppressTracking = false;
        }
        this.undoStack.push(frozen);
        this.board.update();
        (_this_onFeedback = (_this = this).onFeedback) === null || _this_onFeedback === void 0 ? void 0 : _this_onFeedback.call(_this, '');
    }
    canUndo() {
        return this.undoStack.length > 0;
    }
    canRedo() {
        return this.redoStack.length > 0;
    }
    clear() {
        this.undoStack = [];
        this.redoStack = [];
    }
    clearPendingMovesForPoints(pointIds) {
        for (const id of pointIds){
            this.moveStarts.delete(id);
        }
    }
    markPointsForGroupDrag(pointIds) {
        for (const id of pointIds){
            this.groupDraggedPoints.add(id);
            // Also clear any pending move starts to be safe
            this.moveStarts.delete(id);
        }
    }
    unmarkPointsForGroupDrag(pointIds) {
        for (const id of pointIds){
            this.groupDraggedPoints.delete(id);
        }
    }
    suppressTrackingDuring(fn) {
        return this.withSuppressed(fn);
    }
    setSuppressShapeTracking(on) {
        this.suppressShapeTracking = on;
    }
    dispose() {
        this.moveStarts.clear();
        if (this.trackingInterval) {
            clearInterval(this.trackingInterval);
            this.trackingInterval = null;
        }
    }
    setupGlobalPointTracking() {
        // Attach tracking to all existing points
        this.attachTrackingToAllPoints();
        // Set up a periodic check to attach tracking to any new points
        this.trackingInterval = setInterval(()=>{
            this.attachTrackingToAllPoints();
        }, 1000); // Check every second
    }
    attachTrackingToAllPoints() {
        const objects = Object.values(this.board.objects);
        for (const obj of objects){
            var _obj_visProp;
            if ((obj === null || obj === void 0 ? void 0 : obj.elType) === 'point' && !((_obj_visProp = obj.visProp) === null || _obj_visProp === void 0 ? void 0 : _obj_visProp.fixed)) {
                this.attachPointTracking(obj);
            }
        }
    }
    posOf(pt) {
        return {
            x: pt.X(),
            y: pt.Y(),
            name: pt._rawName || ''
        };
    }
    definingPointsOf(obj) {
        if (!obj) return [];
        if (obj.elType === 'segment' || obj.elType === 'line') {
            var _obj_points, _obj_points1;
            const a = obj.point1 || obj.A || ((_obj_points = obj.points) === null || _obj_points === void 0 ? void 0 : _obj_points[0]);
            const b = obj.point2 || obj.B || ((_obj_points1 = obj.points) === null || _obj_points1 === void 0 ? void 0 : _obj_points1[1]);
            return [
                a,
                b
            ].filter(Boolean);
        }
        if (obj.elType === 'circle') {
            var _obj_points2, _obj_points3;
            const c = obj.center || ((_obj_points2 = obj.points) === null || _obj_points2 === void 0 ? void 0 : _obj_points2[0]);
            const p = obj.point2 || ((_obj_points3 = obj.points) === null || _obj_points3 === void 0 ? void 0 : _obj_points3[1]);
            return [
                c,
                p
            ].filter(Boolean);
        }
        return [];
    }
    attachPointTracking(pt) {
        // Avoid double-binding
        if (pt._undoRedoBound) return;
        pt._undoRedoBound = true;
        pt.on('down', ()=>{
            if (this.suppressTracking) return;
            this.moveStarts.set(pt.id, this.posOf(pt));
        });
        pt.on('up', ()=>{
            if (this.suppressTracking) return;
            // Skip if this point is being group-dragged (will be handled by group drag handler)
            if (this.groupDraggedPoints.has(pt.id)) {
                this.moveStarts.delete(pt.id);
                return;
            }
            const start = this.moveStarts.get(pt.id);
            if (!start) return;
            const end = this.posOf(pt);
            const moved = !this.withinTol(start.x, end.x) || !this.withinTol(start.y, end.y) || start.name !== end.name;
            if (moved) {
                const op = {
                    kind: 'modify',
                    pointId: pt.id,
                    before: start,
                    after: end
                };
                this.pushOperation(op);
            }
            this.moveStarts.delete(pt.id);
        });
    }
    attachShapeTracking(obj) {
        // For segment/line/circle: record a BUNDLE of point moves
        let before = null;
        let pts = [];
        const onDown = ()=>{
            if (this.suppressTracking || this.suppressShapeTracking) return;
            pts = this.definingPointsOf(obj);
            if (pts.length === 0) return;
            before = {};
            for (const p of pts)before[p.id] = this.posOf(p);
        };
        const onUp = ()=>{
            if (this.suppressTracking || this.suppressShapeTracking) {
                before = null;
                pts = [];
                return;
            }
            if (!before || pts.length === 0) return;
            const ops = [];
            for (const p of pts){
                const b = before[p.id];
                if (!b) continue;
                const a = this.posOf(p);
                if (b.x !== a.x || b.y !== a.y || b.name !== a.name) {
                    ops.push({
                        kind: 'modify',
                        pointId: p.id,
                        before: b,
                        after: a
                    });
                }
            }
            if (ops.length === 1 && ops[0]) {
                this.pushOperation(ops[0]); // single move
            } else if (ops.length > 1) {
                this.pushOperation({
                    kind: 'bundle',
                    ops
                }); // move both endpoints / center+radius
            }
            before = null;
            pts = [];
        };
        obj.on('down', onDown);
        obj.on('up', onUp);
    }
    findPointNear(xy) {
        let tol = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.EPS;
        const objs = Object.values(this.board.objects);
        for (const o of objs){
            if ((o === null || o === void 0 ? void 0 : o.elType) === 'point') {
                const p = {
                    x: o.X(),
                    y: o.Y()
                };
                if (Math.hypot(p.x - xy.x, p.y - xy.y) <= tol) return o;
            }
        }
        return null;
    }
    isJXGPoint(p) {
        return !!(p && p.elType === 'point' && typeof p.X === 'function' && typeof p.Y === 'function' && p.board === this.board);
    }
    getPointByIdOrNear(prefId, xy) {
        let tol = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.EPS;
        if (prefId) {
            const byId = this.board.objects[prefId];
            if ((byId === null || byId === void 0 ? void 0 : byId.elType) === 'point') return byId;
        }
        // exact coordinate match first
        for (const o of Object.values(this.board.objects)){
            if ((o === null || o === void 0 ? void 0 : o.elType) === 'point' && o.X() === xy.x && o.Y() === xy.y) return o;
        }
        // then proximity
        const nearPoint = this.findPointNear(xy, tol);
        if (nearPoint) return nearPoint;
        // If no point found, return null (will be handled by fallback in calling code)
        return null;
    }
    ensurePoint(xy) {
        let attr = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
            name: '',
            size: 2,
            strokeColor: '#444',
            fillColor: '#666'
        };
        const existing = this.findPointNear(xy);
        if (existing) {
            this.attachPointTracking(existing);
            return existing;
        }
        try {
            const pt = this.board.create('point', [
                xy.x,
                xy.y
            ], attr);
            if (!this.isJXGPoint(pt)) throw new Error('Invalid point');
            var _attr_name;
            pt._rawName = (_attr_name = attr === null || attr === void 0 ? void 0 : attr.name) !== null && _attr_name !== void 0 ? _attr_name : '';
            if ((attr === null || attr === void 0 ? void 0 : attr.fixed) !== undefined) pt.setAttribute({
                fixed: attr.fixed
            });
            if ((attr === null || attr === void 0 ? void 0 : attr.withLabel) !== undefined) pt.setAttribute({
                withLabel: attr.withLabel
            });
            // Attach move tracking to the new point
            this.attachPointTracking(pt);
            return pt;
        } catch (error) {
            console.error('Failed to create point:', error);
            return null;
        }
    }
    performOperation(op) {
        if (op.kind === 'create') {
            this.performCreate(op);
        } else if (op.kind === 'delete') {
            this.performDelete(op);
        } else if (op.kind === 'modify') {
            this.performModify(op);
        } else if (op.kind === 'bundle') {
            this.performBundle(op);
        }
    }
    rollbackOperation(op) {
        if (op.kind === 'create') {
            this.rollbackCreate(op);
        } else if (op.kind === 'delete') {
            this.rollbackDelete(op);
        } else if (op.kind === 'modify') {
            this.rollbackModify(op);
        } else if (op.kind === 'bundle') {
            this.rollbackBundle(op);
        }
    }
    performCreate(op) {
        if (op.elType === 'point') {
            const { x, y, attr } = op.payload;
            const pt = this.ensurePoint({
                x,
                y
            }, attr);
            if (!pt) return;
            op._id = pt.id;
            // Force board update to ensure point is created immediately
            this.board.update();
            return;
        }
        if (op.elType === 'segment' || op.elType === 'line') {
            var _op_pointIds, _op_pointIds1;
            const { p1, p2, attr } = op.payload;
            const a = this.getPointByIdOrNear((_op_pointIds = op.pointIds) === null || _op_pointIds === void 0 ? void 0 : _op_pointIds[0], p1) || this.ensurePoint(p1, attr);
            const b = this.getPointByIdOrNear((_op_pointIds1 = op.pointIds) === null || _op_pointIds1 === void 0 ? void 0 : _op_pointIds1[1], p2) || this.ensurePoint(p2, attr);
            // If either isn't a real JSXGraph point, fall back to coordinate parents
            const useCoords = !(this.isJXGPoint(a) && this.isJXGPoint(b));
            const parents = useCoords ? [
                [
                    p1.x,
                    p1.y
                ],
                [
                    p2.x,
                    p2.y
                ]
            ] : [
                a,
                b
            ];
            try {
                var _points, _points1;
                const el = this.board.create(op.elType, parents, attr);
                op._id = el.id;
                // capture actual point ids (works for both segment & line)
                const pA = el.point1 || el.A || ((_points = el.points) === null || _points === void 0 ? void 0 : _points[0]);
                const pB = el.point2 || el.B || ((_points1 = el.points) === null || _points1 === void 0 ? void 0 : _points1[1]);
                if (this.isJXGPoint(pA) && this.isJXGPoint(pB)) {
                    op.pointIds = [
                        pA.id,
                        pB.id
                    ];
                    // Attach tracking to the endpoint points if they don't have it yet
                    this.attachPointTracking(pA);
                    this.attachPointTracking(pB);
                }
                // Attach shape tracking to the element itself
                this.attachShapeTracking(el);
                // Force board update to ensure object is created immediately
                this.board.update();
            } catch (e) {
                console.error("Failed to create ".concat(op.elType, ":"), e, {
                    parents
                });
            }
            return;
        }
        if (op.elType === 'circle') {
            var _op_pointIds2, _op_pointIds3;
            const { center, on, attr } = op.payload;
            const c = this.getPointByIdOrNear((_op_pointIds2 = op.pointIds) === null || _op_pointIds2 === void 0 ? void 0 : _op_pointIds2[0], center) || this.ensurePoint(center, attr);
            const p = this.getPointByIdOrNear((_op_pointIds3 = op.pointIds) === null || _op_pointIds3 === void 0 ? void 0 : _op_pointIds3[1], on) || this.ensurePoint(on, attr);
            const useCoords = !(this.isJXGPoint(c) && this.isJXGPoint(p));
            const parents = useCoords ? [
                [
                    center.x,
                    center.y
                ],
                [
                    on.x,
                    on.y
                ]
            ] : [
                c,
                p
            ];
            try {
                var _points2, _points3;
                const el = this.board.create('circle', parents, attr);
                op._id = el.id;
                const pc = el.center || ((_points2 = el.points) === null || _points2 === void 0 ? void 0 : _points2[0]);
                const pp = el.point2 || ((_points3 = el.points) === null || _points3 === void 0 ? void 0 : _points3[1]);
                if (this.isJXGPoint(pc) && this.isJXGPoint(pp)) {
                    op.pointIds = [
                        pc.id,
                        pp.id
                    ];
                    // Attach tracking to the center and on-point if they don't have it yet
                    this.attachPointTracking(pc);
                    this.attachPointTracking(pp);
                }
                // Attach shape tracking to the circle element itself
                this.attachShapeTracking(el);
                // Force board update to ensure object is created immediately
                this.board.update();
            } catch (e) {
                console.error('Failed to create circle:', e, {
                    parents
                });
            }
            return;
        }
    }
    rollbackCreate(op) {
        if (!op._id) return;
        const obj = this.board.objects[op._id];
        if (obj) {
            try {
                this.board.removeObject(obj);
            } catch (error) {
                console.error('Failed to remove object:', error, op._id);
            }
        } else {
            // Try to find and remove by matching definition as fallback
            this.removeByMatchingDefinition({
                kind: 'delete',
                elType: op.elType,
                payload: op.payload,
                _id: op._id,
                pointIds: op.pointIds || []
            });
        }
        // Remove associated points if they're not used elsewhere
        if (op.pointIds && (op.elType === 'segment' || op.elType === 'line' || op.elType === 'circle')) {
            op.pointIds.forEach((pointId)=>{
                const pointObj = this.board.objects[pointId];
                if (pointObj && !this.isPointUsedElsewhere(pointId, pointObj)) {
                    try {
                        this.board.removeObject(pointObj);
                    } catch (error) {
                        console.error('Failed to remove point:', error, pointId);
                    }
                }
            });
        }
    }
    performDelete(op) {
        if (op._id) {
            const target = this.board.objects[op._id];
            if (target) {
                this.board.removeObject(target);
                // Force board update to ensure object is removed immediately
                this.board.update();
            }
        } else {
            // If _id is missing, try to find and remove by matching defining points and attributes
            this.removeByMatchingDefinition(op);
            // Force board update after removing by matching
            this.board.update();
        }
        // Remove associated points if they're not used elsewhere
        if (op.pointIds && (op.elType === 'segment' || op.elType === 'line' || op.elType === 'circle')) {
            op.pointIds.forEach((pointId)=>{
                const pointObj = this.board.objects[pointId];
                if (pointObj && !this.isPointUsedElsewhere(pointId, pointObj)) {
                    this.board.removeObject(pointObj);
                }
            });
            // Force board update after removing points
            this.board.update();
        }
    }
    removeByMatchingDefinition(op) {
        const objects = Object.values(this.board.objects);
        for (const obj of objects){
            if (obj.elType !== op.elType) continue;
            let matches = false;
            if (op.elType === 'point') {
                const { x, y } = op.payload;
                matches = Math.abs(obj.X() - x) < this.EPS && Math.abs(obj.Y() - y) < this.EPS;
            } else if (op.elType === 'segment' || op.elType === 'line') {
                var _obj_points, _obj_points1;
                const { p1, p2 } = op.payload;
                const a = obj.point1 || obj.A || ((_obj_points = obj.points) === null || _obj_points === void 0 ? void 0 : _obj_points[0]);
                const b = obj.point2 || obj.B || ((_obj_points1 = obj.points) === null || _obj_points1 === void 0 ? void 0 : _obj_points1[1]);
                if (a && b) {
                    matches = Math.abs(a.X() - p1.x) < this.EPS && Math.abs(a.Y() - p1.y) < this.EPS && Math.abs(b.X() - p2.x) < this.EPS && Math.abs(b.Y() - p2.y) < this.EPS;
                }
            } else if (op.elType === 'circle') {
                var _obj_points2, _obj_points3;
                const { center, on } = op.payload;
                const c = obj.center || obj.midpoint || ((_obj_points2 = obj.points) === null || _obj_points2 === void 0 ? void 0 : _obj_points2[0]);
                const p = obj.point2 || ((_obj_points3 = obj.points) === null || _obj_points3 === void 0 ? void 0 : _obj_points3[1]);
                if (c) {
                    const centerMatches = Math.abs(c.X() - center.x) < this.EPS && Math.abs(c.Y() - center.y) < this.EPS;
                    if (p) {
                        matches = centerMatches && Math.abs(p.X() - on.x) < this.EPS && Math.abs(p.Y() - on.y) < this.EPS;
                    } else {
                        var _ref;
                        // For circles defined by center and radius
                        const R = (_ref = typeof obj.R === 'function' ? obj.R() : obj.radius) !== null && _ref !== void 0 ? _ref : 1;
                        const expectedRadius = Math.hypot(on.x - center.x, on.y - center.y);
                        matches = centerMatches && Math.abs(R - expectedRadius) < this.EPS;
                    }
                }
            }
            if (matches) {
                this.board.removeObject(obj);
                break;
            }
        }
    }
    rollbackDelete(op) {
        if (op.elType === 'point') {
            const { x, y, attr } = op.payload;
            const pt = this.ensurePoint({
                x,
                y
            }, attr);
            if (!pt) return;
            op._id = pt.id;
            // Force board update to ensure point is created immediately
            this.board.update();
            return;
        }
        if (op.elType === 'segment' || op.elType === 'line') {
            var _op_pointIds, _op_pointIds1;
            const { p1, p2, attr } = op.payload;
            const a = this.getPointByIdOrNear((_op_pointIds = op.pointIds) === null || _op_pointIds === void 0 ? void 0 : _op_pointIds[0], p1) || this.ensurePoint(p1, attr);
            const b = this.getPointByIdOrNear((_op_pointIds1 = op.pointIds) === null || _op_pointIds1 === void 0 ? void 0 : _op_pointIds1[1], p2) || this.ensurePoint(p2, attr);
            const useCoords = !(this.isJXGPoint(a) && this.isJXGPoint(b));
            const parents = useCoords ? [
                [
                    p1.x,
                    p1.y
                ],
                [
                    p2.x,
                    p2.y
                ]
            ] : [
                a,
                b
            ];
            try {
                var _points, _points1;
                const el = this.board.create(op.elType, parents, attr);
                op._id = el.id;
                const pA = el.point1 || el.A || ((_points = el.points) === null || _points === void 0 ? void 0 : _points[0]);
                const pB = el.point2 || el.B || ((_points1 = el.points) === null || _points1 === void 0 ? void 0 : _points1[1]);
                if (this.isJXGPoint(pA) && this.isJXGPoint(pB)) {
                    op.pointIds = [
                        pA.id,
                        pB.id
                    ];
                }
                // Attach shape tracking to the recreated element
                this.attachShapeTracking(el);
                // Force board update to ensure object is created immediately
                this.board.update();
            } catch (e) {
                console.error("Failed to recreate ".concat(op.elType, ":"), e, {
                    parents
                });
            }
            return;
        }
        if (op.elType === 'circle') {
            var _op_pointIds2, _op_pointIds3;
            const { center, on, attr } = op.payload;
            const c = this.getPointByIdOrNear((_op_pointIds2 = op.pointIds) === null || _op_pointIds2 === void 0 ? void 0 : _op_pointIds2[0], center) || this.ensurePoint(center, attr);
            const p = this.getPointByIdOrNear((_op_pointIds3 = op.pointIds) === null || _op_pointIds3 === void 0 ? void 0 : _op_pointIds3[1], on) || this.ensurePoint(on, attr);
            const useCoords = !(this.isJXGPoint(c) && this.isJXGPoint(p));
            const parents = useCoords ? [
                [
                    center.x,
                    center.y
                ],
                [
                    on.x,
                    on.y
                ]
            ] : [
                c,
                p
            ];
            try {
                var _points2, _points3;
                const el = this.board.create('circle', parents, attr);
                op._id = el.id;
                const pc = el.center || ((_points2 = el.points) === null || _points2 === void 0 ? void 0 : _points2[0]);
                const pp = el.point2 || ((_points3 = el.points) === null || _points3 === void 0 ? void 0 : _points3[1]);
                if (this.isJXGPoint(pc) && this.isJXGPoint(pp)) {
                    op.pointIds = [
                        pc.id,
                        pp.id
                    ];
                }
                // Attach shape tracking to the recreated circle element
                this.attachShapeTracking(el);
                // Force board update to ensure object is created immediately
                this.board.update();
            } catch (e) {
                console.error('Failed to recreate circle:', e, {
                    parents
                });
            }
            return;
        }
    }
    performModify(op) {
        const pointObj = this.board.objects[op.pointId];
        if (pointObj) {
            // Use moveTo instead of setPosition to avoid draggable function issues
            try {
                pointObj.moveTo([
                    op.after.x,
                    op.after.y
                ]);
            } catch (e) {
                // Fallback to direct coordinate setting
                pointObj.coords.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                    op.after.x,
                    op.after.y
                ]);
                this.board.update();
            }
            this.setPointName(pointObj, op.after.name);
        }
    }
    rollbackModify(op) {
        const pointObj = this.board.objects[op.pointId];
        if (pointObj) {
            // Use moveTo instead of setPosition to avoid draggable function issues
            try {
                pointObj.moveTo([
                    op.before.x,
                    op.before.y
                ]);
            } catch (e) {
                // Fallback to direct coordinate setting
                pointObj.coords.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                    op.before.x,
                    op.before.y
                ]);
                this.board.update();
            }
            this.setPointName(pointObj, op.before.name);
        }
    }
    performBundle(op) {
        // Execute operations in forward order
        for (const subOp of op.ops){
            if (subOp) {
                try {
                    // Create a fresh copy of the operation to avoid stale IDs
                    const freshOp = structuredClone(subOp);
                    // Keep IDs intact - don't delete them
                    this.performOperation(freshOp);
                    // Write back the realized IDs to the original operation
                    if (freshOp.kind === 'create' || freshOp.kind === 'delete') {
                        const freshOpTyped = freshOp;
                        const subOpTyped = subOp;
                        if (freshOpTyped._id !== undefined) {
                            subOpTyped._id = freshOpTyped._id;
                        }
                        if (freshOpTyped.pointIds !== undefined) {
                            subOpTyped.pointIds = freshOpTyped.pointIds;
                        }
                    }
                } catch (error) {
                    console.error('Error executing bundled operation:', error, subOp);
                // Continue with other operations even if one fails
                }
            }
        }
        // Force board update after all bundle operations
        this.board.update();
    }
    rollbackBundle(op) {
        // Rollback operations in reverse order
        for(let i = op.ops.length - 1; i >= 0; i--){
            const subOp = op.ops[i];
            if (subOp) {
                try {
                    // Create a fresh copy of the operation to avoid stale IDs
                    const freshOp = structuredClone(subOp);
                    // Keep IDs intact - don't delete them
                    this.rollbackOperation(freshOp);
                    // Write back the realized IDs to the original operation
                    if (freshOp.kind === 'create' || freshOp.kind === 'delete') {
                        const freshOpTyped = freshOp;
                        const subOpTyped = subOp;
                        if (freshOpTyped._id !== undefined) {
                            subOpTyped._id = freshOpTyped._id;
                        }
                        if (freshOpTyped.pointIds !== undefined) {
                            subOpTyped.pointIds = freshOpTyped.pointIds;
                        }
                    }
                } catch (error) {
                    console.error('Error rolling back bundled operation:', error, subOp);
                // Continue with other operations even if one fails
                }
            }
        }
        // Force board update after all bundle rollback operations
        this.board.update();
    }
    setPointName(pointObj, name) {
        const trimmed = (name || '').trim();
        const pretty = this.toSubscript(trimmed);
        pointObj.setAttribute({
            name: pretty,
            withLabel: !!trimmed
        });
        pointObj._rawName = trimmed;
    }
    toSubscript(name) {
        const map = {
            '0': '₀',
            '1': '₁',
            '2': '₂',
            '3': '₃',
            '4': '₄',
            '5': '₅',
            '6': '₆',
            '7': '₇',
            '8': '₈',
            '9': '₉'
        };
        return name.replace(/_(\d+)/g, (_, d)=>d.split('').map((ch)=>{
                var _map_ch;
                return (_map_ch = map[ch]) !== null && _map_ch !== void 0 ? _map_ch : ch;
            }).join(''));
    }
    isPointUsedElsewhere(pointId, pointObj) {
        return Object.values(this.board.objects).some((otherObj)=>{
            var _otherObj_point1, _otherObj_point2, _otherObj_center;
            if (otherObj === pointObj || otherObj.id === pointId) return false;
            if (((_otherObj_point1 = otherObj.point1) === null || _otherObj_point1 === void 0 ? void 0 : _otherObj_point1.id) === pointId || ((_otherObj_point2 = otherObj.point2) === null || _otherObj_point2 === void 0 ? void 0 : _otherObj_point2.id) === pointId) return true;
            if (((_otherObj_center = otherObj.center) === null || _otherObj_center === void 0 ? void 0 : _otherObj_center.id) === pointId) return true;
            if (otherObj.points && Array.isArray(otherObj.points)) {
                return otherObj.points.some((p)=>(p === null || p === void 0 ? void 0 : p.id) === pointId);
            }
            return false;
        });
    }
    // Helper methods for creating operations
    createPointOperation(x, y) {
        let attr = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
            name: '',
            size: 2,
            strokeColor: '#444',
            fillColor: '#666'
        };
        return {
            kind: 'create',
            elType: 'point',
            payload: {
                x,
                y,
                attr
            }
        };
    }
    createSegmentOperation(p1, p2, attr) {
        return {
            kind: 'create',
            elType: 'segment',
            payload: {
                p1,
                p2,
                attr
            }
        };
    }
    createLineOperation(p1, p2, attr) {
        return {
            kind: 'create',
            elType: 'line',
            payload: {
                p1,
                p2,
                attr
            }
        };
    }
    createCircleOperation(center, on, attr) {
        return {
            kind: 'create',
            elType: 'circle',
            payload: {
                center,
                on,
                attr
            }
        };
    }
    createDeleteOperation(obj) {
        try {
            const attr = this.getCommonAttr(obj);
            if (obj.elType === 'point') {
                return {
                    kind: 'delete',
                    elType: 'point',
                    payload: {
                        x: obj.X(),
                        y: obj.Y(),
                        attr
                    },
                    _id: obj.id
                };
            }
            if (obj.elType === 'segment' || obj.elType === 'line') {
                var _obj_points, _obj_points1;
                const a = obj.point1 || obj.A || ((_obj_points = obj.points) === null || _obj_points === void 0 ? void 0 : _obj_points[0]);
                const b = obj.point2 || obj.B || ((_obj_points1 = obj.points) === null || _obj_points1 === void 0 ? void 0 : _obj_points1[1]);
                if (!a || !b) return null;
                return {
                    kind: 'delete',
                    elType: obj.elType,
                    payload: {
                        p1: {
                            x: a.X(),
                            y: a.Y()
                        },
                        p2: {
                            x: b.X(),
                            y: b.Y()
                        },
                        attr
                    },
                    _id: obj.id,
                    pointIds: [
                        a.id,
                        b.id
                    ]
                };
            }
            if (obj.elType === 'circle') {
                var _obj_points2, _obj_points3, _obj_center_X, _obj_center, _obj_center_Y, _obj_center1;
                const c = obj.center || obj.midpoint || ((_obj_points2 = obj.points) === null || _obj_points2 === void 0 ? void 0 : _obj_points2[0]);
                const p = obj.point2 || ((_obj_points3 = obj.points) === null || _obj_points3 === void 0 ? void 0 : _obj_points3[1]);
                var _obj_center_X1, _obj_center_Y1;
                const center = c ? {
                    x: c.X(),
                    y: c.Y()
                } : {
                    x: (_obj_center_X1 = (_obj_center = obj.center) === null || _obj_center === void 0 ? void 0 : (_obj_center_X = _obj_center.X) === null || _obj_center_X === void 0 ? void 0 : _obj_center_X.call(_obj_center)) !== null && _obj_center_X1 !== void 0 ? _obj_center_X1 : 0,
                    y: (_obj_center_Y1 = (_obj_center1 = obj.center) === null || _obj_center1 === void 0 ? void 0 : (_obj_center_Y = _obj_center1.Y) === null || _obj_center_Y === void 0 ? void 0 : _obj_center_Y.call(_obj_center1)) !== null && _obj_center_Y1 !== void 0 ? _obj_center_Y1 : 0
                };
                let on;
                if (p) {
                    on = {
                        x: p.X(),
                        y: p.Y()
                    };
                } else {
                    var _ref;
                    const R = (_ref = typeof obj.R === 'function' ? obj.R() : obj.radius) !== null && _ref !== void 0 ? _ref : 1;
                    on = {
                        x: center.x + R,
                        y: center.y
                    };
                }
                return {
                    kind: 'delete',
                    elType: 'circle',
                    payload: {
                        center,
                        on,
                        attr
                    },
                    _id: obj.id,
                    pointIds: c && p ? [
                        c.id,
                        p.id
                    ] : []
                };
            }
        } catch (e) {
            return null;
        }
        return null;
    }
    getCommonAttr(o) {
        var _o_visProp, _o_visProp1, _o_visProp2, _o_visProp3, _o_visProp4, _o_visProp5, _o_visProp6, _o_visProp7, _o_visProp8, _o_visProp9, _o_visProp10;
        var _o__rawName, _o_visProp_strokecolor, _o_visProp_strokewidth, _o_visProp_fillcolor;
        return {
            name: (_o__rawName = o === null || o === void 0 ? void 0 : o._rawName) !== null && _o__rawName !== void 0 ? _o__rawName : '',
            withLabel: !!((o === null || o === void 0 ? void 0 : (_o_visProp = o.visProp) === null || _o_visProp === void 0 ? void 0 : _o_visProp.withlabel) || (o === null || o === void 0 ? void 0 : (_o_visProp1 = o.visProp) === null || _o_visProp1 === void 0 ? void 0 : _o_visProp1.withLabel)),
            fixed: !!(o === null || o === void 0 ? void 0 : (_o_visProp2 = o.visProp) === null || _o_visProp2 === void 0 ? void 0 : _o_visProp2.fixed),
            size: o === null || o === void 0 ? void 0 : (_o_visProp3 = o.visProp) === null || _o_visProp3 === void 0 ? void 0 : _o_visProp3.size,
            strokeColor: (_o_visProp_strokecolor = o === null || o === void 0 ? void 0 : (_o_visProp4 = o.visProp) === null || _o_visProp4 === void 0 ? void 0 : _o_visProp4.strokecolor) !== null && _o_visProp_strokecolor !== void 0 ? _o_visProp_strokecolor : o === null || o === void 0 ? void 0 : (_o_visProp5 = o.visProp) === null || _o_visProp5 === void 0 ? void 0 : _o_visProp5.strokeColor,
            strokeWidth: (_o_visProp_strokewidth = o === null || o === void 0 ? void 0 : (_o_visProp6 = o.visProp) === null || _o_visProp6 === void 0 ? void 0 : _o_visProp6.strokewidth) !== null && _o_visProp_strokewidth !== void 0 ? _o_visProp_strokewidth : o === null || o === void 0 ? void 0 : (_o_visProp7 = o.visProp) === null || _o_visProp7 === void 0 ? void 0 : _o_visProp7.strokeWidth,
            fillColor: (_o_visProp_fillcolor = o === null || o === void 0 ? void 0 : (_o_visProp8 = o.visProp) === null || _o_visProp8 === void 0 ? void 0 : _o_visProp8.fillcolor) !== null && _o_visProp_fillcolor !== void 0 ? _o_visProp_fillcolor : o === null || o === void 0 ? void 0 : (_o_visProp9 = o.visProp) === null || _o_visProp9 === void 0 ? void 0 : _o_visProp9.fillColor,
            dash: o === null || o === void 0 ? void 0 : (_o_visProp10 = o.visProp) === null || _o_visProp10 === void 0 ? void 0 : _o_visProp10.dash
        };
    }
    // Helper methods for UI integration
    fromBoardDeleteUnderMouse(e) {
        const under = this.board.getAllObjectsUnderMouse(e);
        const o = under.find((x)=>{
            var _x_visProp;
            return !(x === null || x === void 0 ? void 0 : (_x_visProp = x.visProp) === null || _x_visProp === void 0 ? void 0 : _x_visProp.fixed);
        });
        return o ? this.createDeleteOperation(o) : null;
    }
    createModifyOperation(pointId, before, after) {
        return {
            kind: 'modify',
            pointId,
            before,
            after
        };
    }
    constructor(config){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "board", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "undoStack", []);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "redoStack", []);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "onFeedback", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "EPS", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "txnDepth", 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "pendingOps", []);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "suppressTracking", false);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "suppressShapeTracking", false);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "moveStarts", new Map());
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "groupDraggedPoints", new Set());
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "trackingInterval", null);
        this.board = config.board;
        this.onFeedback = config.onFeedback;
        this.EPS = config.EPS || 0.03;
        this.setupGlobalPointTracking();
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/geometry_review/lib/grid-manager.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/grid-manager.ts
__turbopack_context__.s([
    "GridManager",
    ()=>GridManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/measurement-scale.ts [app-client] (ecmascript)");
;
;
class GridManager {
    setMode(mode) {
        if (this.mode === mode) return;
        this.mode = mode;
        this.clearAll();
        switch(mode){
            case 'none':
                this.applyDot(false);
                break;
            case 'major':
                this.createLineGrid(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORLD_PER_CM"], '#e5e7eb', 1);
                this.applyDot(false);
                break;
            case 'minor':
                this.createLineGrid(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORLD_PER_MM"], '#f3f4f6', 0.5);
                this.applyDot(false);
                break;
            case 'major-minor':
                this.createLineGrid(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORLD_PER_MM"], '#f3f4f6', 0.5);
                this.createLineGrid(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORLD_PER_CM"], '#d1d5db', 1);
                this.applyDot(false);
                break;
            case 'dot':
                this.applyDot(true);
                break;
        }
        this.board.update();
    }
    setDotStep(stepWorldUnits) {
        this.dotStep = Math.max(0.1, stepWorldUnits);
        if (this.mode === 'dot') this.applyDot(true);
    }
    /** Keep the dot background in sync with pixel scaling */ sync() {
        if (this.mode !== 'dot') return;
        this.applyDot(true);
    }
    createLineGrid(step, color, strokeWidth) {
        var _ref;
        const bbox = this.board.getBoundingBox();
        // Ensure a shared Set on the board to track grid object ids
        const gridIds = (_ref = this.board).__gridIds || (_ref.__gridIds = new Set());
        // Create vertical lines
        for(let x = bbox[0]; x <= bbox[2]; x += step){
            const line = this.board.create('line', [
                [
                    x,
                    bbox[1]
                ],
                [
                    x,
                    bbox[3]
                ]
            ], {
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
            });
            try {
                gridIds.add(line.id);
            } catch (e) {}
            try {
                var _ref1;
                ((_ref1 = line).visProp || (_ref1.visProp = {})).pointerEvents = 'none';
                const node = line.rendNode;
                if (node) node.style.pointerEvents = 'none';
            } catch (e) {}
            this.gridLines.push(line);
        }
        // Create horizontal lines
        for(let y = bbox[3]; y <= bbox[1]; y += step){
            const line = this.board.create('line', [
                [
                    bbox[0],
                    y
                ],
                [
                    bbox[2],
                    y
                ]
            ], {
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
            });
            try {
                gridIds.add(line.id);
            } catch (e) {}
            try {
                var _ref2;
                ((_ref2 = line).visProp || (_ref2.visProp = {})).pointerEvents = 'none';
                const node = line.rendNode;
                if (node) node.style.pointerEvents = 'none';
            } catch (e) {}
            this.gridLines.push(line);
        }
    }
    clearAll() {
        const gridIds = this.board.__gridIds;
        this.gridLines.forEach((line)=>{
            try {
                this.board.removeObject(line);
            } catch (e) {}
            try {
                gridIds === null || gridIds === void 0 ? void 0 : gridIds.delete(line.id);
            } catch (e) {}
        });
        this.gridLines = [];
    }
    applyDot(enabled) {
        if (!enabled) {
            this.container.style.backgroundImage = '';
            this.container.style.backgroundSize = '';
            this.container.style.backgroundPosition = '';
            return;
        }
        // Convert world units to pixels using board.unitX/unitY
        const pxX = this.dotStep * this.board.unitX;
        const pxY = this.dotStep * this.board.unitY;
        // Subtle dot (1px) using radial gradient
        this.container.style.backgroundImage = 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)';
        this.container.style.backgroundSize = "".concat(pxX, "px ").concat(pxY, "px");
        // Keep the pattern aligned to the origin
        // If you allow pan/zoom, you could compute an offset from the bbox.
        this.container.style.backgroundPosition = "0 0";
    }
    constructor(board, container){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "board", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "gridLines", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "mode", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "dotStep", void 0); // world units (1 mm)
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "container", void 0);
        this.board = board;
        this.gridLines = [];
        this.mode = 'none';
        this.dotStep = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORLD_PER_MM"];
        this.container = container;
        // ensure background sits below the canvas
        this.container.style.position = this.container.style.position || 'relative';
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/geometry_review/lib/board-manager.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/board-manager.ts
__turbopack_context__.s([
    "BoardManager",
    ()=>BoardManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$grid$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/grid-manager.ts [app-client] (ecmascript)");
;
;
;
class BoardManager {
    init(boardOptions, defaultGridMode) {
        if (!this.container) {
            throw new Error('Container element is required');
        }
        if (this.board) {
            throw new Error('Board already initialized');
        }
        // Create board
        this.board = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].JSXGraph.initBoard(this.container, {
            ...this.options,
            ...boardOptions
        });
        // Create grid manager
        this.gridManager = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$grid$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GridManager"](this.board, this.container);
        // Set initial grid mode if provided
        if (defaultGridMode) {
            this.gridManager.setMode(defaultGridMode);
        }
        // Set up global event wiring for future pan/zoom support
        // This can be extended later for pan/zoom functionality
        this.setupGlobalEvents();
    }
    /**
   * Get the board instance (typed getter)
   */ getBoard() {
        if (!this.board) {
            throw new Error('Board not initialized');
        }
        return this.board;
    }
    /**
   * Get the grid manager instance
   */ getGridManager() {
        if (!this.gridManager) {
            throw new Error('GridManager not initialized');
        }
        return this.gridManager;
    }
    /**
   * Set grid mode via GridManager
   */ setGridMode(mode) {
        var _this_gridManager;
        (_this_gridManager = this.gridManager) === null || _this_gridManager === void 0 ? void 0 : _this_gridManager.setMode(mode);
    }
    /**
   * Setup global event wiring (for later pan/zoom support)
   */ setupGlobalEvents() {
        if (!this.board) return;
    // If you ever enable pan/zoom, keep the dot grid in sync:
    // this.board.on('boundingbox', () => {
    //   this.gridManager?.sync()
    // })
    // Add other global event handlers here as needed
    }
    /**
   * Update board options (for dynamic changes like pan/zoom)
   */ updateOptions(options) {
        if (!this.board) {
            throw new Error('Board not initialized');
        }
        this.options = {
            ...this.options,
            ...options
        };
    // Apply options to board as needed
    // Note: Some options may require board recreation
    }
    /**
   * Free the board and clean up resources
   */ free() {
        if (this.board) {
            try {
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].JSXGraph.freeBoard(this.board);
            } catch (e) {
            // Ignore errors during cleanup
            }
            this.board = null;
        }
        this.gridManager = null;
        this.container = null;
    }
    constructor(options){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "board", null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "gridManager", null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "container", null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "options", void 0);
        this.container = options.container;
        const { container, defaultGridMode, ...boardOptions } = options;
        this.options = {
            boundingbox: [
                -1,
                8,
                11,
                -1
            ],
            axis: false,
            showNavigation: false,
            showCopyright: false,
            grid: false,
            pan: {
                enabled: false
            },
            zoom: false,
            keepaspectratio: true,
            ...boardOptions
        };
        this.init(boardOptions, defaultGridMode);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/geometry_review/lib/geometry-factory.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/geometry-factory.ts
__turbopack_context__.s([
    "GeometryFactory",
    ()=>GeometryFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/measurement-scale.ts [app-client] (ecmascript)");
;
;
class GeometryFactory {
    /**
   * Get snap size based on grid mode
   */ getSnapSize(gridMode) {
        if (gridMode === 'none') return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORLD_PER_MM"];
        if (gridMode === 'minor') return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORLD_PER_MM"];
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORLD_PER_CM"];
    }
    /**
   * Get EPS for finding nearby points based on grid mode
   */ getNearbyEps(gridMode) {
        let baseEps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.05;
        const snapSize = this.getSnapSize(gridMode);
        return Math.max(baseEps, snapSize * 0.8);
    }
    point(x, y) {
        let snap = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, attrs = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
        const pt = this.board.create('point', [
            x,
            y
        ], {
            name: '',
            size: 2,
            strokeColor: '#444',
            fillColor: '#666',
            snapToGrid: false,
            ...attrs
        });
        pt._rawName = '';
        return pt;
    }
    /**
   * Create a point with grid-aware snap settings
   */ pointWithGrid(x, y, gridMode) {
        let attrs = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
        // Always disable snapping for user-created points
        return this.point(x, y, false, attrs);
    }
    segment(a, b) {
        let attrs = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return this.board.create('segment', [
            a,
            b
        ], {
            strokeColor: '#2563eb',
            strokeWidth: 2,
            ...attrs
        });
    }
    line(a, b) {
        let attrs = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return this.board.create('line', [
            a,
            b
        ], {
            strokeColor: '#059669',
            strokeWidth: 1,
            dash: 1,
            ...attrs
        });
    }
    circle(center, on) {
        let attrs = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return this.board.create('circle', [
            center,
            on
        ], {
            strokeColor: '#dc2626',
            strokeWidth: 2,
            ...attrs
        });
    }
    findNearbyPoint(x, y, eps) {
        const objs = Object.values(this.board.objects);
        return objs.find((o)=>{
            var _o_visProp;
            return (o === null || o === void 0 ? void 0 : o.elType) === 'point' && !((_o_visProp = o.visProp) === null || _o_visProp === void 0 ? void 0 : _o_visProp.fixed) && Math.hypot(o.X() - x, o.Y() - y) <= eps;
        }) || null;
    }
    constructor(board){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "board", void 0);
        this.board = board;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/geometry_review/lib/selection-manager.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/selection-manager.ts
/**
 * SelectionManager - manages temporary selection state for multi-step tools
 * 
 * Responsibility: hold "first click" temporary selection, expose select, clear, getFirst.
 * Why: simplifies selected state + refs and makes it tool-agnostic.
 */ __turbopack_context__.s([
    "SelectionManager",
    ()=>SelectionManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
;
class SelectionManager {
    /**
   * Select an item (typically used for first click in multi-step tools)
   */ select(item) {
        this.first = item;
    }
    /**
   * Get the first selected item (for two-click tools like segment/line/circle)
   */ getFirst() {
        return this.first;
    }
    /**
   * Clear the selection
   */ clear() {
        this.first = null;
    }
    /**
   * Check if there is a selection
   */ hasSelection() {
        return this.first !== null;
    }
    /**
   * Get all selected items (for potential future multi-selection support)
   * Currently returns array with first item or empty array
   */ getAll() {
        return this.first ? [
            this.first
        ] : [];
    }
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "first", null);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/geometry_review/lib/rename-manager.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RenameManager",
    ()=>RenameManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
;
class RenameManager {
    /** Attach event listeners */ enable() {
        if (this.enabled) return;
        this.enabled = true;
        this.downHandler = (e)=>{
            if (!this.opts.eventGuard(e)) return;
            const pt = this.pointUnder(e);
            if (!pt) return;
            // Freeze to prevent accidental drags while we decide if it's a click
            const wasFixed = !!pt.visProp.fixed;
            pt.setAttribute({
                fixed: true
            });
            this.armed = {
                pt,
                wasFixed
            };
            this.downPos = this.getMouseXY(e);
            // stop normal board interaction for this click
            stopEvent(e);
        };
        this.upHandler = (e)=>{
            if (!this.armed.pt) return;
            const up = this.getMouseXY(e);
            var _this_downPos;
            const down = (_this_downPos = this.downPos) !== null && _this_downPos !== void 0 ? _this_downPos : up;
            const moved = Math.hypot(up.x - down.x, up.y - down.y);
            if (moved <= this.opts.clickEps) {
                // Treat as click -> prompt & rename
                this.promptAndRename(this.armed.pt, e);
            } else {
                // Treat as drag -> restore and do nothing
                this.armed.pt.setAttribute({
                    fixed: this.armed.wasFixed
                });
            }
            // clear arm
            this.armed = {
                pt: null,
                wasFixed: false
            };
            this.downPos = null;
        };
        this.brd.on('down', this.downHandler);
        this.brd.on('up', this.upHandler);
    }
    /** Detach event listeners */ disable() {
        if (!this.enabled) return;
        this.enabled = false;
        try {
            if (this.downHandler) this.brd.off('down', this.downHandler);
            if (this.upHandler) this.brd.off('up', this.upHandler);
        } catch (e) {}
        this.downHandler = null;
        this.upHandler = null;
        this.armed = {
            pt: null,
            wasFixed: false
        };
        this.downPos = null;
    }
    toggle() {
        this.enabled ? this.disable() : this.enable();
    }
    destroy() {
        this.disable();
    }
    // ---------- helpers ----------
    getMouseXY(e) {
        const c = this.brd.getUsrCoordsOfMouse(e);
        return {
            x: c[0],
            y: c[1]
        };
    }
    pointUnder(e) {
        const under = this.brd.getAllObjectsUnderMouse(e);
        return under.find((o)=>o.elType === 'point') || null;
    }
    isNameTaken(raw, exceptId) {
        for(const key in this.brd.objects){
            const o = this.brd.objects[key];
            if ((o === null || o === void 0 ? void 0 : o.elType) === 'point' && o.id !== exceptId) {
                var _o__rawName;
                if (((_o__rawName = o._rawName) !== null && _o__rawName !== void 0 ? _o__rawName : '') === raw) return true;
            }
        }
        return false;
    }
    toSubscript(name) {
        const map = {
            '0': '₀',
            '1': '₁',
            '2': '₂',
            '3': '₃',
            '4': '₄',
            '5': '₅',
            '6': '₆',
            '7': '₇',
            '8': '₈',
            '9': '₉'
        };
        return (name || '').replace(/_(\d+)/g, (_, d)=>d.split('').map((ch)=>{
                var _map_ch;
                return (_map_ch = map[ch]) !== null && _map_ch !== void 0 ? _map_ch : ch;
            }).join(''));
    }
    normalizeAndApplyName(pt, raw) {
        const trimmed = (raw || '').trim();
        const pretty = this.toSubscript(trimmed);
        pt.setAttribute({
            name: pretty,
            withLabel: !!trimmed
        });
        pt._rawName = trimmed;
    }
    promptAndRename(pt, e) {
        const beforeRaw = pt._rawName || '';
        var _window_prompt;
        let proposed = ((_window_prompt = window.prompt(this.opts.promptLabel, beforeRaw)) !== null && _window_prompt !== void 0 ? _window_prompt : '').trim();
        // Deduplicate if necessary
        if (proposed) {
            if (this.isNameTaken(proposed, pt.id)) {
                let i = 2;
                while(this.isNameTaken("".concat(proposed, "_").concat(i), pt.id))i++;
                proposed = "".concat(proposed, "_").concat(i);
            }
        }
        this.normalizeAndApplyName(pt, proposed);
        // Restore mobility
        pt.setAttribute({
            fixed: this.armed.wasFixed
        });
        // Push the rename event upward for undo/redo
        this.opts.onRenamed({
            pointId: pt.id,
            beforeRaw,
            afterRaw: proposed || ''
        });
        if (this.opts.updateBoard) this.brd.update();
        // stop this click from leaking into normal handlers
        stopEvent(e);
    }
    constructor(board, options){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "brd", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "opts", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "enabled", false);
        // internal state for down/up logic
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "armed", {
            pt: null,
            wasFixed: false
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "downPos", null);
        // handlers references so we can cleanly detach
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "downHandler", null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "upHandler", null);
        this.brd = board;
        var _options_clickEps, _options_promptLabel, _options_onRenamed, _options_updateBoard, _options_eventGuard;
        this.opts = {
            clickEps: (_options_clickEps = options === null || options === void 0 ? void 0 : options.clickEps) !== null && _options_clickEps !== void 0 ? _options_clickEps : 0.12,
            promptLabel: (_options_promptLabel = options === null || options === void 0 ? void 0 : options.promptLabel) !== null && _options_promptLabel !== void 0 ? _options_promptLabel : 'Název bodu (např. A, B, C, A_1, A_2):',
            onRenamed: (_options_onRenamed = options === null || options === void 0 ? void 0 : options.onRenamed) !== null && _options_onRenamed !== void 0 ? _options_onRenamed : ()=>{},
            updateBoard: (_options_updateBoard = options === null || options === void 0 ? void 0 : options.updateBoard) !== null && _options_updateBoard !== void 0 ? _options_updateBoard : true,
            eventGuard: (_options_eventGuard = options === null || options === void 0 ? void 0 : options.eventGuard) !== null && _options_eventGuard !== void 0 ? _options_eventGuard : defaultEventGuard
        };
    }
}
// ---------- small utilities ----------
function stopEvent(e) {
    if (e === null || e === void 0 ? void 0 : e.originalEvent) {
        var _e_originalEvent_stopPropagation, _e_originalEvent, _e_originalEvent_preventDefault, _e_originalEvent1;
        (_e_originalEvent_stopPropagation = (_e_originalEvent = e.originalEvent).stopPropagation) === null || _e_originalEvent_stopPropagation === void 0 ? void 0 : _e_originalEvent_stopPropagation.call(_e_originalEvent);
        (_e_originalEvent_preventDefault = (_e_originalEvent1 = e.originalEvent).preventDefault) === null || _e_originalEvent_preventDefault === void 0 ? void 0 : _e_originalEvent_preventDefault.call(_e_originalEvent1);
    }
}
/** Default guard: ignore clicks on anything inside your physical tools (elements with .group) */ function defaultEventGuard(e) {
    var _e_originalEvent, _t_classList;
    const t = e === null || e === void 0 ? void 0 : (_e_originalEvent = e.originalEvent) === null || _e_originalEvent === void 0 ? void 0 : _e_originalEvent.target;
    if (!t) return true;
    return !(t.closest('.group') || ((_t_classList = t.classList) === null || _t_classList === void 0 ? void 0 : _t_classList.contains('group')));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/geometry_review/lib/select-objects-tool.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SelectObjectsTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
;
function dist2(a, b) {
    return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
}
class SelectObjectsTool {
    activate() {
        if (this.onDown) return;
        this.onDown = this.handleDown;
        this.onMove = this.handleMove;
        this.onUp = this.handleUp;
        this.board.on('down', this.onDown);
        this.board.on('move', this.onMove);
        this.board.on('up', this.onUp);
        // 🔒 Kill native selection / drag on the container (Safari-friendly)
        const el = this.board.containerObj;
        if (el) {
            el.style.cursor = 'default';
            el.style.userSelect = 'none';
            el.style.webkitUserSelect = 'none';
            el.style.msUserSelect = 'none';
            el.style.touchAction = 'none';
            el.style.webkitUserDrag = 'none';
            el.setAttribute('draggable', 'false');
        }
        this.onKey = this.handleKey;
        window.addEventListener('keydown', this.onKey, {
            capture: true
        });
    }
    deactivate() {
        if (this.onDown) this.board.off('down', this.onDown);
        if (this.onMove) this.board.off('move', this.onMove);
        if (this.onUp) this.board.off('up', this.onUp);
        this.onDown = this.onMove = this.onUp = undefined;
        if (this.onKey) window.removeEventListener('keydown', this.onKey, {
            capture: true
        });
        this.clearSelection();
        this.clearHover();
        this.destroyMarquee();
        if (this.board.containerObj) {
            this.board.containerObj.style.cursor = '';
        }
    }
    /**
   * Identify grid lines created by GridManager regardless of stroke width.
   * Matches exact properties set in GridManager: layer 0, fixed, no label/infobox, not draggable.
   */ isGridLine(obj) {
        if (!obj) return false;
        // Prefer authoritative ID-based check written by GridManager
        try {
            const gridIds = this.board.__gridIds;
            if (gridIds && gridIds.has(obj.id)) return true;
        } catch (e) {}
        // Fallback: property-based detection
        if (obj.elType !== 'line') return false;
        const vp = obj.visProp || {};
        if (vp.layer !== 0) return false;
        if (vp.fixed !== true) return false;
        if (vp.withLabel !== false) return false;
        if (vp.showInfobox !== false) return false;
        if (vp.draggable !== false) return false;
        return true;
    }
    /** Return true if object is user-selectable (not a grid line or selection helper). */ isSelectableObject(obj) {
        var _obj_visProp;
        if (!obj || ((_obj_visProp = obj.visProp) === null || _obj_visProp === void 0 ? void 0 : _obj_visProp.visible) === false) return false;
        try {
            if (this.selectionHelperIds.has(obj.id)) return false;
        } catch (e) {}
        if (this.isGridLine(obj)) return false;
        return true;
    }
    // -----------------------
    // Hover logic
    // -----------------------
    setHover(obj) {
        if (obj === this.hoverObj) return;
        if (this.hoverObj) this.setTempHighlight(this.hoverObj, false);
        this.hoverObj = obj;
        if (obj) this.setTempHighlight(obj, true);
        this.board.update();
    }
    clearHover() {
        this.setHover(null);
    }
    // -----------------------
    // Selection logic
    // -----------------------
    replaceSelectionWith(obj) {
        var _this_onFeedback, _this;
        this.clearSelection();
        this.addToSelection(obj);
        (_this_onFeedback = (_this = this).onFeedback) === null || _this_onFeedback === void 0 ? void 0 : _this_onFeedback.call(_this, 'Objekt vybrán');
    }
    toggleSelect(obj) {
        var _this_onFeedback, _this;
        if (this.selected.has(obj)) {
            this.removeFromSelection(obj);
        } else {
            this.addToSelection(obj);
        }
        (_this_onFeedback = (_this = this).onFeedback) === null || _this_onFeedback === void 0 ? void 0 : _this_onFeedback.call(_this, "".concat(this.selected.size, " vybráno"));
    }
    addToSelection(obj) {
        if (this.selected.has(obj)) return;
        this.selected.add(obj);
        if (!this.savedStyle.has(obj)) {
            var _visProp;
            const vp = (_visProp = obj.visProp) !== null && _visProp !== void 0 ? _visProp : {};
            this.savedStyle.set(obj, {
                strokeColor: vp.strokeColor,
                strokeWidth: vp.strokeWidth,
                fillColor: vp.fillColor,
                fillOpacity: vp.fillOpacity,
                highlight: vp.highlight,
                size: vp.size // Save point size for restoration
            });
        }
        this.applySelectedStyle(obj, true);
    }
    removeFromSelection(obj) {
        if (!this.selected.has(obj)) return;
        this.applySelectedStyle(obj, false);
        this.selected.delete(obj);
    }
    clearSelection() {
        this.selected.forEach((o)=>this.applySelectedStyle(o, false));
        this.selected.clear();
        this.board.update(); // ensure deselection happens instantly
    }
    applySelectedStyle(obj, on) {
        const saved = this.savedStyle.get(obj);
        var _visProp;
        const vp = (_visProp = obj.visProp) !== null && _visProp !== void 0 ? _visProp : {};
        if (typeof obj.setProperty === 'function') {
            if (on) {
                // For points: enlarge them
                if (obj.elType === 'point') {
                    var _this;
                    var _size, _ref;
                    const originalSize = (_ref = (_size = (_this = saved) === null || _this === void 0 ? void 0 : _this.size) !== null && _size !== void 0 ? _size : vp.size) !== null && _ref !== void 0 ? _ref : 2;
                    obj.setProperty({
                        highlight: true,
                        size: Math.max(originalSize * 1.8, 4) // Enlarge point by 80% or minimum 4
                    });
                } else {
                    var _this1;
                    var _strokeWidth, _ref1;
                    // For other objects: keep original color, increase stroke width slightly, add highlight
                    const originalStrokeWidth = (_ref1 = (_strokeWidth = (_this1 = saved) === null || _this1 === void 0 ? void 0 : _this1.strokeWidth) !== null && _strokeWidth !== void 0 ? _strokeWidth : vp.strokeWidth) !== null && _ref1 !== void 0 ? _ref1 : 1;
                    obj.setProperty({
                        highlight: true,
                        strokeWidth: Math.max(originalStrokeWidth * 1.5, originalStrokeWidth + 1)
                    });
                }
            } else {
                var _this2, _this3, _this4, _this5, _this6;
                var _strokeColor, _strokeWidth1, _fillColor, _fillOpacity, _size1;
                // Restore original style
                obj.setProperty({
                    strokeColor: (_strokeColor = (_this2 = saved) === null || _this2 === void 0 ? void 0 : _this2.strokeColor) !== null && _strokeColor !== void 0 ? _strokeColor : vp.strokeColor,
                    strokeWidth: (_strokeWidth1 = (_this3 = saved) === null || _this3 === void 0 ? void 0 : _this3.strokeWidth) !== null && _strokeWidth1 !== void 0 ? _strokeWidth1 : vp.strokeWidth,
                    fillColor: (_fillColor = (_this4 = saved) === null || _this4 === void 0 ? void 0 : _this4.fillColor) !== null && _fillColor !== void 0 ? _fillColor : vp.fillColor,
                    fillOpacity: (_fillOpacity = (_this5 = saved) === null || _this5 === void 0 ? void 0 : _this5.fillOpacity) !== null && _fillOpacity !== void 0 ? _fillOpacity : vp.fillOpacity,
                    highlight: false,
                    size: (_size1 = (_this6 = saved) === null || _this6 === void 0 ? void 0 : _this6.size) !== null && _size1 !== void 0 ? _size1 : vp.size
                });
            }
        } else if (obj.visProp) {
            var _obj_update;
            if (on) {
                if (obj.elType === 'point') {
                    var _this7;
                    var _size2, _ref2;
                    // Enlarge point
                    const originalSize = (_ref2 = (_size2 = (_this7 = saved) === null || _this7 === void 0 ? void 0 : _this7.size) !== null && _size2 !== void 0 ? _size2 : vp.size) !== null && _ref2 !== void 0 ? _ref2 : 2;
                    obj.visProp.highlight = true;
                    obj.visProp.size = Math.max(originalSize * 1.8, 4);
                } else {
                    var _this8;
                    var _strokeWidth2, _ref3;
                    // Keep original color, increase stroke width slightly, add highlight
                    const originalStrokeWidth = (_ref3 = (_strokeWidth2 = (_this8 = saved) === null || _this8 === void 0 ? void 0 : _this8.strokeWidth) !== null && _strokeWidth2 !== void 0 ? _strokeWidth2 : vp.strokeWidth) !== null && _ref3 !== void 0 ? _ref3 : 1;
                    obj.visProp.highlight = true;
                    obj.visProp.strokeWidth = Math.max(originalStrokeWidth * 1.5, originalStrokeWidth + 1);
                }
            } else {
                var _this9, _this10, _this11, _this12, _this13;
                // Restore original style
                const objVp = obj.visProp;
                var _strokeColor1;
                objVp.strokeColor = (_strokeColor1 = (_this9 = saved) === null || _this9 === void 0 ? void 0 : _this9.strokeColor) !== null && _strokeColor1 !== void 0 ? _strokeColor1 : objVp.strokeColor;
                var _strokeWidth3;
                objVp.strokeWidth = (_strokeWidth3 = (_this10 = saved) === null || _this10 === void 0 ? void 0 : _this10.strokeWidth) !== null && _strokeWidth3 !== void 0 ? _strokeWidth3 : objVp.strokeWidth;
                var _fillColor1;
                objVp.fillColor = (_fillColor1 = (_this11 = saved) === null || _this11 === void 0 ? void 0 : _this11.fillColor) !== null && _fillColor1 !== void 0 ? _fillColor1 : objVp.fillColor;
                var _fillOpacity1;
                objVp.fillOpacity = (_fillOpacity1 = (_this12 = saved) === null || _this12 === void 0 ? void 0 : _this12.fillOpacity) !== null && _fillOpacity1 !== void 0 ? _fillOpacity1 : objVp.fillOpacity;
                objVp.highlight = false;
                var _size3;
                objVp.size = (_size3 = (_this13 = saved) === null || _this13 === void 0 ? void 0 : _this13.size) !== null && _size3 !== void 0 ? _size3 : objVp.size;
            }
            (_obj_update = obj.update) === null || _obj_update === void 0 ? void 0 : _obj_update.call(obj);
        }
    }
    setTempHighlight(obj, on) {
        if (this.selected.has(obj)) return;
        if (typeof obj.setProperty === 'function') {
            obj.setProperty(on ? {
                highlight: true
            } : {
                highlight: false
            });
        } else if (obj.visProp) {
            var _obj_update;
            obj.visProp.highlight = !!on;
            (_obj_update = obj.update) === null || _obj_update === void 0 ? void 0 : _obj_update.call(obj);
        }
    }
    // -----------------------
    // Marquee helpers
    // -----------------------
    createMarquee(start) {
        const data = {
            x1: start.x,
            y1: start.y,
            x2: start.x,
            y2: start.y
        };
        this._marqueeData = data;
        // Create 4 corner points for the rectangle
        const p1 = this.board.create('point', [
            ()=>data.x1,
            ()=>data.y1
        ], {
            visible: false,
            fixed: true,
            withLabel: false
        });
        try {
            this.selectionHelperIds.add(p1.id);
        } catch (e) {}
        const p2 = this.board.create('point', [
            ()=>data.x2,
            ()=>data.y1
        ], {
            visible: false,
            fixed: true,
            withLabel: false
        });
        try {
            this.selectionHelperIds.add(p2.id);
        } catch (e) {}
        const p3 = this.board.create('point', [
            ()=>data.x2,
            ()=>data.y2
        ], {
            visible: false,
            fixed: true,
            withLabel: false
        });
        try {
            this.selectionHelperIds.add(p3.id);
        } catch (e) {}
        const p4 = this.board.create('point', [
            ()=>data.x1,
            ()=>data.y2
        ], {
            visible: false,
            fixed: true,
            withLabel: false
        });
        try {
            this.selectionHelperIds.add(p4.id);
        } catch (e) {}
        // Create polygon from the 4 points - GeoGebra style (purple/blue with low opacity)
        this.marqueeCurve = this.board.create('polygon', [
            p1,
            p2,
            p3,
            p4
        ], {
            strokeColor: '#7c3aed',
            strokeWidth: 2,
            dash: 1,
            fillColor: '#c4b5fd',
            fillOpacity: 0.2,
            highlight: false,
            fixed: true,
            layer: 100,
            borders: {
                strokeColor: '#7c3aed',
                strokeWidth: 2,
                dash: 1
            }
        });
        try {
            this.selectionHelperIds.add(this.marqueeCurve.id);
        } catch (e) {}
        // Store the corner points for cleanup
        this.marqueeCurve._marqueePoints = [
            p1,
            p2,
            p3,
            p4
        ];
        try {
            this.marqueeCurve._noHighlight = true;
            const vp = this.marqueeCurve.visProp || (this.marqueeCurve.visProp = {});
            vp.pointerEvents = 'none';
            const node = this.marqueeCurve.rendNode;
            if (node) {
                node.style.pointerEvents = 'none';
            }
        } catch (e) {}
        try {
            this.board.containerObj.style.cursor = 'crosshair';
        } catch (e) {}
        this.board.update();
    }
    updateMarquee(e) {
        if (!this.marqueeCurve || !this.dragStartWorld) return;
        const p = this.toWorld(e);
        const d = this._marqueeData;
        if (!d) return;
        d.x2 = p.x;
        d.y2 = p.y;
        this.board.update();
    }
    destroyMarquee() {
        if (this.marqueeCurve) {
            try {
                // Remove the corner points first
                const points = this.marqueeCurve._marqueePoints;
                if (points && Array.isArray(points)) {
                    points.forEach((pt)=>{
                        try {
                            this.board.removeObject(pt);
                        } catch (e) {}
                    });
                }
                // Then remove the polygon
                this.board.removeObject(this.marqueeCurve);
            } catch (e) {}
            this.marqueeCurve = null;
        }
        ;
        this._marqueeData = null;
        // Restore pointer
        try {
            this.board.containerObj.style.cursor = 'default';
        } catch (e) {}
    }
    objectsInMarquee() {
        // Get box data from the Tool class instance, not the polygon
        const d = this._marqueeData;
        if (!this.marqueeCurve || !d) return [];
        const minx = Math.min(d.x1, d.x2), maxx = Math.max(d.x1, d.x2);
        const miny = Math.min(d.y1, d.y2), maxy = Math.max(d.y1, d.y2);
        const objs = Object.values(this.board.objects);
        const inside = [];
        for (const o of objs){
            if (!this.isSelectableObject(o)) continue;
            if (o.elType === 'point') {
                const x = o.X(), y = o.Y();
                if (x >= minx && x <= maxx && y >= miny && y <= maxy) inside.push(o);
            } else if (o.elType === 'segment' || o.elType === 'line' || o.elType === 'circle' || o.elType === 'polygon') {
                const bb = o.bounds && o.bounds();
                if (bb) {
                    const [lx, ux, ly, uy] = bb;
                    if (ux >= minx && lx <= maxx && uy >= miny && ly <= maxy) inside.push(o);
                } else {
                    inside.push(o);
                }
            }
        }
        return this.sortByPreference(inside);
    }
    // -----------------------
    // Utilities
    // -----------------------
    getUnderMouse(e) {
        const arr = this.board.getAllObjectsUnderMouse(e);
        return this.sortByPreference(arr.filter((o)=>this.isSelectableObject(o)));
    }
    sortByPreference(arr) {
        const rank = (o)=>{
            var _o_visProp;
            if (o.elType === 'point' && !((_o_visProp = o.visProp) === null || _o_visProp === void 0 ? void 0 : _o_visProp.fixed)) return 0;
            if (o.elType === 'segment') return 1;
            if (o.elType === 'line') return 2;
            if (o.elType === 'circle') return 3;
            return 4;
        };
        return [
            ...arr
        ].sort((a, b)=>rank(a) - rank(b));
    }
    toWorld(e) {
        // Preferred: use JSXGraph's helper with event
        if (typeof this.board.getUsrCoordsOfMouse === 'function') {
            var _e_ev;
            const coords = this.board.getUsrCoordsOfMouse((_e_ev = e === null || e === void 0 ? void 0 : e.ev) !== null && _e_ev !== void 0 ? _e_ev : e);
            var _coords_, _coords_1;
            return {
                x: (_coords_ = coords[0]) !== null && _coords_ !== void 0 ? _coords_ : 0,
                y: (_coords_1 = coords[1]) !== null && _coords_1 !== void 0 ? _coords_1 : 0
            };
        }
        // Fallback: canvasToXS/YS with clientX/clientY
        if (typeof this.board.canvasToXS === 'function' && typeof this.board.canvasToYS === 'function') {
            var _e_ev1;
            const c = this.board.getCoordsTopLeftCorner((_e_ev1 = e === null || e === void 0 ? void 0 : e.ev) !== null && _e_ev1 !== void 0 ? _e_ev1 : e);
            var _e_ev2;
            const ev = (_e_ev2 = e === null || e === void 0 ? void 0 : e.ev) !== null && _e_ev2 !== void 0 ? _e_ev2 : e;
            const absX = (ev === null || ev === void 0 ? void 0 : ev.clientX) - c[0];
            const absY = (ev === null || ev === void 0 ? void 0 : ev.clientY) - c[1];
            return {
                x: this.board.canvasToXS(absX),
                y: this.board.canvasToYS(absY)
            };
        }
        return {
            x: 0,
            y: 0
        };
    }
    constructor(board, onFeedback, undoRedo){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "board", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "onFeedback", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "undoRedo", void 0);
        // Handlers
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "onDown", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "onMove", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "onUp", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "onKey", void 0);
        // Hover & click-cycle
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "hoverObj", null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "cycleCandidates", []);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "cycleIndex", 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "lastClickWorld", {
            x: 0,
            y: 0
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "lastClickWasCycle", false);
        // Selection
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "selected", new Set());
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "savedStyle", new Map());
        // Marquee
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "dragging", false);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "dragStartWorld", null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "marqueeCurve", null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "selectionHelperIds", new Set());
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "isGroupDragging", false);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "dragStartPointer", null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "dragStartObjPositions", new Map());
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "dragTargetObj", null);
        // -----------------------
        // Core interaction
        // -----------------------
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "handleMove", (e)=>{
            // When dragging marquee, always block native behavior
            if (this.dragging) {
                if (e === null || e === void 0 ? void 0 : e.ev) {
                    var _e_ev_preventDefault, _e_ev, _e_ev_stopPropagation, _e_ev1;
                    (_e_ev_preventDefault = (_e_ev = e.ev).preventDefault) === null || _e_ev_preventDefault === void 0 ? void 0 : _e_ev_preventDefault.call(_e_ev);
                    (_e_ev_stopPropagation = (_e_ev1 = e.ev).stopPropagation) === null || _e_ev_stopPropagation === void 0 ? void 0 : _e_ev_stopPropagation.call(_e_ev1);
                }
                this.updateMarquee(e);
                return;
            }
            // Group dragging block
            if (this.isGroupDragging && this.dragStartPointer) {
                if (e === null || e === void 0 ? void 0 : e.ev) {
                    var _e_ev_preventDefault1, _e_ev2, _e_ev_stopPropagation1, _e_ev3;
                    (_e_ev_preventDefault1 = (_e_ev2 = e.ev).preventDefault) === null || _e_ev_preventDefault1 === void 0 ? void 0 : _e_ev_preventDefault1.call(_e_ev2);
                    (_e_ev_stopPropagation1 = (_e_ev3 = e.ev).stopPropagation) === null || _e_ev_stopPropagation1 === void 0 ? void 0 : _e_ev_stopPropagation1.call(_e_ev3);
                }
                const pointer = this.toWorld(e);
                const dx = pointer.x - this.dragStartPointer.x;
                const dy = pointer.y - this.dragStartPointer.y;
                for (const obj of this.selected){
                    var _obj_visProp;
                    if ((_obj_visProp = obj.visProp) === null || _obj_visProp === void 0 ? void 0 : _obj_visProp.fixed) continue;
                    const start = this.dragStartObjPositions.get(obj);
                    switch(obj.elType){
                        case 'point':
                            if (start) obj.moveTo([
                                start.x + dx,
                                start.y + dy
                            ]);
                            break;
                        case 'line':
                        case 'segment':
                            if (start && obj.points && obj.points.length === start.length) {
                                obj.points.forEach((pt, idx)=>{
                                    pt.moveTo([
                                        start[idx].x + dx,
                                        start[idx].y + dy
                                    ]);
                                });
                            }
                            break;
                        case 'circle':
                            var _obj_center;
                            if (start && ((_obj_center = obj.center) === null || _obj_center === void 0 ? void 0 : _obj_center.moveTo)) {
                                obj.center.moveTo([
                                    start.center.x + dx,
                                    start.center.y + dy
                                ]);
                            }
                            break;
                        case 'polygon':
                            if (start && obj.vertices && obj.vertices.length === start.length) {
                                obj.vertices.forEach((pt, idx)=>{
                                    pt.moveTo([
                                        start[idx].x + dx,
                                        start[idx].y + dy
                                    ]);
                                });
                            }
                            break;
                        default:
                            if (start && obj.moveTo) obj.moveTo([
                                start.x + dx,
                                start.y + dy
                            ]);
                    }
                }
                this.board.update();
                return;
            }
            // Hover highlight
            const under = this.getUnderMouse(e);
            const top = under[0] || null;
            this.setHover(top);
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "handleDown", (e)=>{
            // 🚫 stop native selection right away
            if (e === null || e === void 0 ? void 0 : e.ev) {
                var _e_ev_preventDefault, _e_ev, _e_ev_stopPropagation, _e_ev1;
                (_e_ev_preventDefault = (_e_ev = e.ev).preventDefault) === null || _e_ev_preventDefault === void 0 ? void 0 : _e_ev_preventDefault.call(_e_ev);
                (_e_ev_stopPropagation = (_e_ev1 = e.ev).stopPropagation) === null || _e_ev_stopPropagation === void 0 ? void 0 : _e_ev_stopPropagation.call(_e_ev1);
            }
            const under = this.getUnderMouse(e);
            const world = this.toWorld(e);
            // --- check for marquee init as before ---
            if (under.length) {
                var _top_visProp, _e_ev2, _e_ev3, _e_ev4;
                // Drag start on a selected object: prep group drag
                const top = under[0];
                if (this.selected.has(top) && !((_top_visProp = top.visProp) === null || _top_visProp === void 0 ? void 0 : _top_visProp.fixed)) {
                    this.isGroupDragging = true;
                    this.dragStartPointer = {
                        ...world
                    };
                    this.dragTargetObj = top;
                    // Record each selected's initial world position(s)
                    this.dragStartObjPositions.clear();
                    // Collect all point IDs that will be moved, so we can clear their pending moves
                    const pointIdsToClear = [];
                    for (const obj of this.selected){
                        switch(obj.elType){
                            case 'point':
                                this.dragStartObjPositions.set(obj, {
                                    x: obj.X(),
                                    y: obj.Y()
                                });
                                if (obj.id) pointIdsToClear.push(obj.id);
                                break;
                            case 'line':
                            case 'segment':
                                // PATCH: Only if points exists and is array
                                if (Array.isArray(obj.points)) {
                                    this.dragStartObjPositions.set(obj, obj.points.map((pt)=>{
                                        if (pt && pt.id) pointIdsToClear.push(pt.id);
                                        return {
                                            x: pt.X(),
                                            y: pt.Y()
                                        };
                                    }));
                                }
                                break;
                            case 'circle':
                                {
                                    var _points;
                                    const onPt = obj.point2 || ((_points = obj.points) === null || _points === void 0 ? void 0 : _points[1]);
                                    const centerPos = {
                                        x: obj.center.X(),
                                        y: obj.center.Y()
                                    };
                                    const radiusPtPos = onPt && typeof onPt.X === 'function' && typeof onPt.Y === 'function' ? {
                                        x: onPt.X(),
                                        y: onPt.Y()
                                    } : null;
                                    if (obj.center && obj.center.id) pointIdsToClear.push(obj.center.id);
                                    if (onPt && onPt.id) pointIdsToClear.push(onPt.id);
                                    this.dragStartObjPositions.set(obj, {
                                        center: centerPos,
                                        radiusPoint: radiusPtPos,
                                        radius: typeof obj.R === 'function' ? obj.R() : radiusPtPos ? Math.hypot(radiusPtPos.x - centerPos.x, radiusPtPos.y - centerPos.y) : undefined
                                    });
                                }
                                break;
                            case 'polygon':
                                this.dragStartObjPositions.set(obj, obj.vertices.map((pt)=>{
                                    if (pt && pt.id) pointIdsToClear.push(pt.id);
                                    return {
                                        x: pt.X(),
                                        y: pt.Y()
                                    };
                                }));
                                break;
                            default:
                                // Fallback: try to record all .X(), .Y() if any
                                if (obj.X && obj.Y) {
                                    this.dragStartObjPositions.set(obj, {
                                        x: obj.X(),
                                        y: obj.Y()
                                    });
                                    if (obj.id) pointIdsToClear.push(obj.id);
                                }
                        }
                    }
                    // Mark all points as being group-dragged and clear their pending moves
                    // This prevents individual point tracking from creating separate undo operations
                    if (this.undoRedo && pointIdsToClear.length > 0) {
                        this.undoRedo.markPointsForGroupDrag(pointIdsToClear);
                        this.undoRedo.setSuppressShapeTracking(true);
                    }
                    // PREVENT DEFAULT: don't allow picked object's drag
                    if (e === null || e === void 0 ? void 0 : e.ev) {
                        var _e_ev_preventDefault1, _e_ev5, _e_ev_stopPropagation1, _e_ev6;
                        (_e_ev_preventDefault1 = (_e_ev5 = e.ev).preventDefault) === null || _e_ev_preventDefault1 === void 0 ? void 0 : _e_ev_preventDefault1.call(_e_ev5);
                        (_e_ev_stopPropagation1 = (_e_ev6 = e.ev).stopPropagation) === null || _e_ev_stopPropagation1 === void 0 ? void 0 : _e_ev_stopPropagation1.call(_e_ev6);
                    }
                    return;
                }
                // ... normal select/cycle/additive ...
                const sameSpot = dist2(world, this.lastClickWorld) < 1e-6;
                if (!sameSpot) {
                    this.cycleCandidates = this.sortByPreference(under);
                    this.cycleIndex = 0;
                }
                var _this_cycleCandidates_this_cycleIndex;
                const candidate = (_this_cycleCandidates_this_cycleIndex = this.cycleCandidates[this.cycleIndex]) !== null && _this_cycleCandidates_this_cycleIndex !== void 0 ? _this_cycleCandidates_this_cycleIndex : this.sortByPreference(under)[0];
                const additive = (e === null || e === void 0 ? void 0 : (_e_ev2 = e.ev) === null || _e_ev2 === void 0 ? void 0 : _e_ev2.shiftKey) || (e === null || e === void 0 ? void 0 : (_e_ev3 = e.ev) === null || _e_ev3 === void 0 ? void 0 : _e_ev3.metaKey) || (e === null || e === void 0 ? void 0 : (_e_ev4 = e.ev) === null || _e_ev4 === void 0 ? void 0 : _e_ev4.ctrlKey);
                if (additive) {
                    this.toggleSelect(candidate);
                } else {
                    if (sameSpot) {
                        this.cycleIndex = (this.cycleIndex + 1) % this.cycleCandidates.length;
                    }
                    const chosen = sameSpot ? this.cycleCandidates[this.cycleIndex] : candidate;
                    this.replaceSelectionWith(chosen);
                }
                this.lastClickWorld = world;
                this.lastClickWasCycle = true;
                this.board.update();
                return;
            } else {
                // If blank space and not already dragging marquee, clear selection
                if (!this.dragging && !this.isGroupDragging) {
                    this.clearSelection();
                    this.board.update(); // ensure immediate deselect
                }
                // Empty space -> start marquee
                this.lastClickWasCycle = false;
                this.dragging = true;
                this.dragStartWorld = world;
                this.createMarquee(world);
                // extra safety for Safari holding click-and-drag
                if (e === null || e === void 0 ? void 0 : e.ev) {
                    var _e_ev_preventDefault2, _e_ev7, _e_ev_stopPropagation2, _e_ev8;
                    (_e_ev_preventDefault2 = (_e_ev7 = e.ev).preventDefault) === null || _e_ev_preventDefault2 === void 0 ? void 0 : _e_ev_preventDefault2.call(_e_ev7);
                    (_e_ev_stopPropagation2 = (_e_ev8 = e.ev).stopPropagation) === null || _e_ev_stopPropagation2 === void 0 ? void 0 : _e_ev_stopPropagation2.call(_e_ev8);
                }
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "handleUp", (e)=>{
            // End group drag if active
            if (this.isGroupDragging) {
                // Collect all moved points and create undo operation
                if (this.undoRedo && this.dragStartObjPositions.size > 0) {
                    const movedPoints = new Map();
                    // Collect all points that were moved
                    for (const obj of this.selected){
                        var _obj_visProp;
                        if ((_obj_visProp = obj.visProp) === null || _obj_visProp === void 0 ? void 0 : _obj_visProp.fixed) continue;
                        const startPos = this.dragStartObjPositions.get(obj);
                        if (!startPos) continue;
                        const posOf = (pt)=>{
                            var _getName, _this;
                            return {
                                x: pt.X(),
                                y: pt.Y(),
                                name: pt._rawName || ((_getName = (_this = pt).getName) === null || _getName === void 0 ? void 0 : _getName.call(_this)) || ''
                            };
                        };
                        switch(obj.elType){
                            case 'point':
                                {
                                    const before = {
                                        x: startPos.x,
                                        y: startPos.y,
                                        name: posOf(obj).name
                                    };
                                    const after = posOf(obj);
                                    // Only record if actually moved
                                    if (Math.abs(before.x - after.x) > 0.001 || Math.abs(before.y - after.y) > 0.001 || before.name !== after.name) {
                                        movedPoints.set(obj.id, {
                                            before,
                                            after
                                        });
                                    }
                                }
                                break;
                            case 'line':
                            case 'segment':
                                if (Array.isArray(obj.points) && Array.isArray(startPos)) {
                                    obj.points.forEach((pt, idx)=>{
                                        if (!pt || !pt.id) return;
                                        const before = {
                                            x: startPos[idx].x,
                                            y: startPos[idx].y,
                                            name: posOf(pt).name
                                        };
                                        const after = posOf(pt);
                                        if (Math.abs(before.x - after.x) > 0.001 || Math.abs(before.y - after.y) > 0.001 || before.name !== after.name) {
                                            movedPoints.set(pt.id, {
                                                before,
                                                after
                                            });
                                        }
                                    });
                                }
                                break;
                            case 'circle':
                                {
                                    var _points;
                                    const center = obj.center;
                                    if (center && center.id && startPos.center) {
                                        const before = {
                                            x: startPos.center.x,
                                            y: startPos.center.y,
                                            name: posOf(center).name
                                        };
                                        const after = posOf(center);
                                        if (Math.abs(before.x - after.x) > 0.001 || Math.abs(before.y - after.y) > 0.001 || before.name !== after.name) {
                                            movedPoints.set(center.id, {
                                                before,
                                                after
                                            });
                                        }
                                    }
                                    // Also check radius point if it exists
                                    const radiusPt = obj.point2 || ((_points = obj.points) === null || _points === void 0 ? void 0 : _points[1]);
                                    if (radiusPt && radiusPt.id && startPos.radiusPoint) {
                                        const before = {
                                            x: startPos.radiusPoint.x,
                                            y: startPos.radiusPoint.y,
                                            name: posOf(radiusPt).name
                                        };
                                        const after = posOf(radiusPt);
                                        if (Math.abs(before.x - after.x) > 0.001 || Math.abs(before.y - after.y) > 0.001 || before.name !== after.name) {
                                            movedPoints.set(radiusPt.id, {
                                                before,
                                                after
                                            });
                                        }
                                    }
                                }
                                break;
                            case 'polygon':
                                if (Array.isArray(obj.vertices) && Array.isArray(startPos)) {
                                    obj.vertices.forEach((pt, idx)=>{
                                        if (!pt || !pt.id) return;
                                        const before = {
                                            x: startPos[idx].x,
                                            y: startPos[idx].y,
                                            name: posOf(pt).name
                                        };
                                        const after = posOf(pt);
                                        if (Math.abs(before.x - after.x) > 0.001 || Math.abs(before.y - after.y) > 0.001 || before.name !== after.name) {
                                            movedPoints.set(pt.id, {
                                                before,
                                                after
                                            });
                                        }
                                    });
                                }
                                break;
                            default:
                                if (obj.X && obj.Y && obj.id && startPos.x !== undefined && startPos.y !== undefined) {
                                    const before = {
                                        x: startPos.x,
                                        y: startPos.y,
                                        name: posOf(obj).name
                                    };
                                    const after = posOf(obj);
                                    if (Math.abs(before.x - after.x) > 0.001 || Math.abs(before.y - after.y) > 0.001 || before.name !== after.name) {
                                        movedPoints.set(obj.id, {
                                            before,
                                            after
                                        });
                                    }
                                }
                        }
                    }
                    // Create bundle operation if there are multiple moves, or single operation if only one
                    // Suppress tracking during this operation to prevent duplicate entries
                    if (movedPoints.size > 0 && this.undoRedo) {
                        const undoRedo = this.undoRedo; // Store in local variable for closure
                        const pointIdsMoved = Array.from(movedPoints.keys());
                        // Unmark points from group drag tracking before creating the operation
                        undoRedo.unmarkPointsForGroupDrag(pointIdsMoved);
                        undoRedo.suppressTrackingDuring(()=>{
                            const ops = [];
                            movedPoints.forEach((param, pointId)=>{
                                let { before, after } = param;
                                ops.push({
                                    kind: 'modify',
                                    pointId,
                                    before,
                                    after
                                });
                            });
                            if (ops.length === 1 && ops[0]) {
                                undoRedo.pushOperation(ops[0]);
                            } else if (ops.length > 1) {
                                undoRedo.pushOperation({
                                    kind: 'bundle',
                                    ops
                                });
                            }
                        });
                    } else if (this.undoRedo) {
                        // Even if no points moved, unmark them to clean up
                        const pointIdsToUnmark = [];
                        for (const obj of this.selected){
                            var _obj_visProp1;
                            if ((_obj_visProp1 = obj.visProp) === null || _obj_visProp1 === void 0 ? void 0 : _obj_visProp1.fixed) continue;
                            const collectPointIds = (pts)=>{
                                if (Array.isArray(pts)) {
                                    pts.forEach((pt)=>{
                                        if (pt && pt.id) pointIdsToUnmark.push(pt.id);
                                    });
                                }
                            };
                            switch(obj.elType){
                                case 'point':
                                    if (obj.id) pointIdsToUnmark.push(obj.id);
                                    break;
                                case 'line':
                                case 'segment':
                                    collectPointIds(obj.points);
                                    break;
                                case 'circle':
                                    var _points1;
                                    if (obj.center && obj.center.id) pointIdsToUnmark.push(obj.center.id);
                                    const onPt = obj.point2 || ((_points1 = obj.points) === null || _points1 === void 0 ? void 0 : _points1[1]);
                                    if (onPt && onPt.id) pointIdsToUnmark.push(onPt.id);
                                    break;
                                case 'polygon':
                                    collectPointIds(obj.vertices);
                                    break;
                            }
                        }
                        if (pointIdsToUnmark.length > 0) {
                            this.undoRedo.unmarkPointsForGroupDrag(pointIdsToUnmark);
                        }
                    }
                }
                // Always turn off shape tracking suppression when ending group drag
                if (this.undoRedo) {
                    this.undoRedo.setSuppressShapeTracking(false);
                }
                this.isGroupDragging = false;
                this.dragTargetObj = null;
                this.dragStartPointer = null;
                this.dragStartObjPositions.clear();
                return;
            }
            if (!this.dragging) {
                var _e_ev, _e_ev1, _e_ev2;
                // If we released without dragging and didn't cycle-select anything, clear selection
                if (!this.lastClickWasCycle && !((e === null || e === void 0 ? void 0 : (_e_ev = e.ev) === null || _e_ev === void 0 ? void 0 : _e_ev.shiftKey) || (e === null || e === void 0 ? void 0 : (_e_ev1 = e.ev) === null || _e_ev1 === void 0 ? void 0 : _e_ev1.metaKey) || (e === null || e === void 0 ? void 0 : (_e_ev2 = e.ev) === null || _e_ev2 === void 0 ? void 0 : _e_ev2.ctrlKey))) {
                    var // Selection was already cleared in handleDown for empty space
                    _this_onFeedback, _this;
                    (_this_onFeedback = (_this = this).onFeedback) === null || _this_onFeedback === void 0 ? void 0 : _this_onFeedback.call(_this, '');
                }
                return;
            }
            this.dragging = false;
            const chosen = this.objectsInMarquee();
            this.destroyMarquee();
            if (chosen.length) {
                var _e_ev3, _e_ev4, _e_ev5, _this_onFeedback1, _this1;
                const additive = (e === null || e === void 0 ? void 0 : (_e_ev3 = e.ev) === null || _e_ev3 === void 0 ? void 0 : _e_ev3.shiftKey) || (e === null || e === void 0 ? void 0 : (_e_ev4 = e.ev) === null || _e_ev4 === void 0 ? void 0 : _e_ev4.metaKey) || (e === null || e === void 0 ? void 0 : (_e_ev5 = e.ev) === null || _e_ev5 === void 0 ? void 0 : _e_ev5.ctrlKey);
                if (!additive) this.clearSelection();
                chosen.forEach((o)=>this.addToSelection(o));
                (_this_onFeedback1 = (_this1 = this).onFeedback) === null || _this_onFeedback1 === void 0 ? void 0 : _this_onFeedback1.call(_this1, "".concat(this.selected.size, " objekt(y) vybrány"));
            } else {
                var _this_onFeedback2, _this2;
                // No objects in marquee - clear selection
                this.clearSelection();
                (_this_onFeedback2 = (_this2 = this).onFeedback) === null || _this_onFeedback2 === void 0 ? void 0 : _this_onFeedback2.call(_this2, '');
            }
            this.board.update();
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "handleKey", (e)=>{
            if (e.key === 'Backspace' || e.key === 'Delete') {
                if (!this.selected.size) return;
                Array.from(this.selected).forEach((o)=>{
                    try {
                        var _o_remove;
                        (_o_remove = o.remove) === null || _o_remove === void 0 ? void 0 : _o_remove.call(o);
                    } catch (e) {}
                });
                this.selected.clear();
                this.board.update();
                e.preventDefault();
            }
        });
        this.board = board;
        this.onFeedback = onFeedback;
        this.undoRedo = undoRedo;
    }
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuestionBasedTester
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$board$2d$serializer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/board-serializer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/rotate-cw.js [app-client] (ecmascript) <export default as RotateCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/eraser.js [app-client] (ecmascript) <export default as Eraser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/ruler.js [app-client] (ecmascript) <export default as Ruler>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Triangle$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/triangle.js [app-client] (ecmascript) <export default as Triangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/gauge.js [app-client] (ecmascript) <export default as Gauge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Keyboard$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/keyboard.js [app-client] (ecmascript) <export default as Keyboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/react-markdown/lib/index.js [app-client] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/remark-gfm/lib/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$components$2f$DraggableRuler$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/app/components/DraggableRuler.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$components$2f$DraggableTriangle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$components$2f$DraggableProtractor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/supabase-helpers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$undo$2d$redo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/undo-redo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$board$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/board-manager.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$geometry$2d$factory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/geometry-factory.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$selection$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/selection-manager.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$rename$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/rename-manager.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$select$2d$objects$2d$tool$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/select-objects-tool.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/measurement-scale.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// Using JBoard from BoardManager
const EPS = 0.03;
// Helper function to snap coordinates to grid (with optional soft snapping)
function snapToGrid(x, y, gridOption) {
    let softSnap = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
    if (gridOption === 'none') return {
        x,
        y
    };
    let snapSize = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORLD_PER_MM"] // default fine snap = 1 mm
    ;
    // Fine-tuned snap sizes for smoother placement
    if (gridOption === 'major' || gridOption === 'major-minor') {
        snapSize = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORLD_PER_CM"]; // snap to 1 cm for major
    } else if (gridOption === 'minor') {
        snapSize = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORLD_PER_MM"]; // 1 mm
    } else if (gridOption === 'dot') {
        snapSize = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORLD_PER_MM"];
    }
    // Soft snap: only snap if close to grid line (within 30% of snap size)
    if (softSnap) {
        const snappedX = Math.round(x / snapSize) * snapSize;
        const snappedY = Math.round(y / snapSize) * snapSize;
        const threshold = snapSize * 0.3;
        const distX = Math.abs(x - snappedX);
        const distY = Math.abs(y - snappedY);
        return {
            x: distX < threshold ? snappedX : x,
            y: distY < threshold ? snappedY : y
        };
    }
    return {
        x: Math.round(x / snapSize) * snapSize,
        y: Math.round(y / snapSize) * snapSize
    };
}
function dist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}
function coordsOfPoint(p) {
    return {
        x: p.X(),
        y: p.Y()
    };
}
function pointOnLineXY(p, line) {
    let eps = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : EPS;
    const P = coordsOfPoint(line.point1);
    const Q = coordsOfPoint(line.point2);
    const A = Q.y - P.y, B = P.x - Q.x, C = -(A * P.x + B * P.y);
    return Math.abs(A * p.x + B * p.y + C) / Math.hypot(A, B) < eps;
}
function hasEndpoints(seg, param) {
    let [P, Q] = param, eps = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : EPS;
    const pts = [
        coordsOfPoint(seg.point1),
        coordsOfPoint(seg.point2)
    ];
    const d = (u, v)=>dist(u, v);
    return d(pts[0], coordsOfPoint(P)) < eps && d(pts[1], coordsOfPoint(Q)) < eps || d(pts[1], coordsOfPoint(P)) < eps && d(pts[0], coordsOfPoint(Q)) < eps;
}
function QuestionBasedTester(param) {
    let { questionId, studentId = 'anonymous', onBack } = param;
    var _data_validation;
    _s();
    const boardManagerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const undoRedoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const geometryFactoryRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selectionManagerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [tool, setTool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('mouse');
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Question and session state
    const [question, setQuestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [attempt, setAttempt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [timeSpent, setTimeSpent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [startTime, setStartTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Physical tools state
    const [rulerVisible, setRulerVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [triangleVisible, setTriangleVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [protractorVisible, setProtractorVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rulerPosition, setRulerPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        rotation: 0,
        length: 6
    });
    const [trianglePosition, setTrianglePosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 2,
        y: 0,
        rotation: 0,
        size: 3
    });
    const [protractorPosition, setProtractorPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: -2,
        y: 0,
        rotation: 0,
        size: 3
    });
    const [activeTool, setActiveTool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [uiBusy, setUiBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [gridOption, setGridOption] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('major');
    const [canUndoState, setCanUndoState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [canRedoState, setCanRedoState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSettings, setShowSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showHelp, setShowHelp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [renameMode, setRenameMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const toolRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(tool);
    const selectedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(selected);
    const uiBusyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(uiBusy);
    const gridOptionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(gridOption);
    const renameModeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(renameMode);
    const handleClickRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const givensRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const renameMgrRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selectToolRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionBasedTester.useEffect": ()=>{
            toolRef.current = tool;
        }
    }["QuestionBasedTester.useEffect"], [
        tool
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionBasedTester.useEffect": ()=>{
            selectedRef.current = selected;
        }
    }["QuestionBasedTester.useEffect"], [
        selected
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionBasedTester.useEffect": ()=>{
            uiBusyRef.current = uiBusy;
        }
    }["QuestionBasedTester.useEffect"], [
        uiBusy
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionBasedTester.useEffect": ()=>{
            gridOptionRef.current = gridOption;
        }
    }["QuestionBasedTester.useEffect"], [
        gridOption
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionBasedTester.useEffect": ()=>{
            renameModeRef.current = renameMode;
        }
    }["QuestionBasedTester.useEffect"], [
        renameMode
    ]);
    function setRenameEnabled(next) {
        var _renameMgrRef_current, _renameMgrRef_current1;
        if (next) (_renameMgrRef_current = renameMgrRef.current) === null || _renameMgrRef_current === void 0 ? void 0 : _renameMgrRef_current.enable();
        else (_renameMgrRef_current1 = renameMgrRef.current) === null || _renameMgrRef_current1 === void 0 ? void 0 : _renameMgrRef_current1.disable();
        setRenameMode(next);
    }
    // Timer effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionBasedTester.useEffect": ()=>{
            if (!startTime) return;
            const interval = setInterval({
                "QuestionBasedTester.useEffect.interval": ()=>{
                    setTimeSpent(Math.floor((Date.now() - startTime.getTime()) / 1000));
                }
            }["QuestionBasedTester.useEffect.interval"], 1000);
            return ({
                "QuestionBasedTester.useEffect": ()=>clearInterval(interval)
            })["QuestionBasedTester.useEffect"];
        }
    }["QuestionBasedTester.useEffect"], [
        startTime
    ]);
    // Load question and create session
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionBasedTester.useEffect": ()=>{
            const loadQuestion = {
                "QuestionBasedTester.useEffect.loadQuestion": async ()=>{
                    try {
                        setLoading(true);
                        setError(null);
                        console.debug('loadQuestion id=', questionId, 'studentId=', studentId);
                        // --- fetch question ---
                        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"]) {
                            // Fallback: create a mock question for testing
                            const mockQuestion = {
                                id: questionId || 'mock-question',
                                code: 'Q9',
                                title: 'Úloha 9: rovnoramenný ABC (C vrchol, AB na q, S střed ramene)',
                                prompt_md: 'V rovině leží body **C**, **S** a přímka **q**. Najděte vrcholy **A**, **B** rovnoramenného trojúhelníku **ABC** tak, že **C** je vrchol, **AB** leží na **q** a **S** je střed **jednoho** ramene.',
                                max_score: 3,
                                givens: {
                                    "lines": {
                                        "q": {
                                            "p1": {
                                                "x": 0,
                                                "y": 7
                                            },
                                            "p2": {
                                                "x": 10,
                                                "y": 7
                                            }
                                        }
                                    },
                                    "points": {
                                        "C": {
                                            "x": 4.5,
                                            "y": 3
                                        },
                                        "S": {
                                            "x": 5,
                                            "y": 5
                                        }
                                    },
                                    "tolerance": 0.06
                                },
                                constraints: [
                                    {
                                        "id": "A_on_q",
                                        "line": "q",
                                        "type": "point_on_line",
                                        "point": "A"
                                    },
                                    {
                                        "id": "B_on_q",
                                        "line": "q",
                                        "type": "point_on_line",
                                        "point": "B"
                                    },
                                    {
                                        "a": "A",
                                        "b": "C",
                                        "c": "B",
                                        "d": "C",
                                        "id": "iso",
                                        "type": "distance_equal"
                                    },
                                    {
                                        "id": "S_mid",
                                        "type": "any_of",
                                        "children": [
                                            {
                                                "a": "A",
                                                "b": "C",
                                                "type": "midpoint_of",
                                                "midpoint": "S"
                                            },
                                            {
                                                "a": "B",
                                                "b": "C",
                                                "type": "midpoint_of",
                                                "midpoint": "S"
                                            }
                                        ]
                                    }
                                ],
                                difficulty: 3,
                                tags: [
                                    "triangle",
                                    "isosceles",
                                    "construction",
                                    "geometry"
                                ]
                            };
                            console.debug('Using mock question (Supabase not available):', mockQuestion);
                            setQuestion(mockQuestion);
                        } else {
                            const qResp = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('gq_questions').select('*').eq('id', questionId).single();
                            console.debug('gq_questions response', qResp);
                            if (qResp.error) {
                                console.error('gq_questions error detailed', JSON.stringify(qResp.error, Object.getOwnPropertyNames(qResp.error)));
                                throw qResp.error;
                            }
                            if (!qResp.data) throw new Error('Question not found');
                            console.debug('Question loaded successfully:', qResp.data);
                            setQuestion(qResp.data);
                        }
                        // --- ensure user ---
                        let userId = studentId;
                        // Always check for authenticated user first
                        const { data: { user: authUser } } = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"] ? await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser() : {
                            data: {
                                user: null
                            }
                        };
                        if (authUser) {
                            // User is authenticated - ensure they exist in the users table
                            try {
                                var _authUser_user_metadata, _authUser_email;
                                const userRecord = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureAuthenticatedUserExists"])(authUser.id, authUser.email || '', ((_authUser_user_metadata = authUser.user_metadata) === null || _authUser_user_metadata === void 0 ? void 0 : _authUser_user_metadata.name) || ((_authUser_email = authUser.email) === null || _authUser_email === void 0 ? void 0 : _authUser_email.split('@')[0]));
                                userId = userRecord.id;
                                console.debug('Using authenticated user:', authUser.email, 'ID:', userId);
                            } catch (err) {
                                console.error('Error ensuring authenticated user exists:', err);
                                throw new Error('Failed to create user record for authenticated user');
                            }
                        } else if (studentId === 'anonymous') {
                            // For anonymous users, we need to handle this differently
                            // Since sessions.user_id requires a foreign key to users, we cannot use a random UUID
                            // For now, throw an error - anonymous sessions should be handled differently
                            // or you could create a system/anonymous user in the DB
                            throw new Error('Anonymous users are not supported. Please log in to continue.');
                        } else {
                            // Use the provided studentId as-is (should be a valid UUID that exists in users table)
                            userId = studentId;
                            console.debug('Using provided studentId:', userId);
                        }
                        // Validate userId looks like a UUID before using it for sessions.user_id
                        if (!userId || typeof userId === 'string' && !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(userId)) {
                            console.error('Invalid userId before creating session:', userId);
                            throw new Error('Invalid userId for session creation');
                        }
                        // --- create session ---
                        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"]) {
                            // Mock session and attempt for testing
                            const mockSession = {
                                id: 'mock-session-' + Date.now(),
                                user_id: userId,
                                question_id: questionId || 'mock-question',
                                session_data: {},
                                is_active: true
                            };
                            const mockAttempt = {
                                id: 'mock-attempt-' + Date.now(),
                                question_id: questionId || 'mock-question',
                                session_id: mockSession.id,
                                state: {},
                                student_id: userId,
                                is_complete: false,
                                time_spent: 0
                            };
                            console.debug('Using mock session and attempt (Supabase not available)');
                            setSession(mockSession);
                            setAttempt(mockAttempt);
                        } else {
                            const sResp = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('sessions').insert({
                                user_id: userId,
                                question_id: questionId,
                                session_data: {},
                                is_active: true
                            }).select().single();
                            console.debug('sessions insert response', sResp);
                            if (sResp.error) {
                                console.error('sessions insert error', JSON.stringify(sResp.error, Object.getOwnPropertyNames(sResp.error)));
                                throw sResp.error;
                            }
                            setSession(sResp.data);
                            // --- create attempt ---
                            const aResp = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('gq_attempts').insert({
                                question_id: questionId,
                                session_id: sResp.data.id,
                                state: {},
                                student_id: userId,
                                is_complete: false,
                                time_spent: 0
                            }).select().single();
                            console.debug('gq_attempts insert response', aResp);
                            if (aResp.error) {
                                console.error('gq_attempts insert error', JSON.stringify(aResp.error, Object.getOwnPropertyNames(aResp.error)));
                                throw aResp.error;
                            }
                            setAttempt(aResp.data);
                        }
                        setStartTime(new Date());
                    } catch (err) {
                        // Log more informative detail for non-Error objects
                        try {
                            console.error('Error loading question (detailed):', err && typeof err === 'object' ? JSON.stringify(err, Object.getOwnPropertyNames(err)) : err);
                        } catch (e) {
                            console.error('Error logging err', e);
                            console.error('Original err:', err);
                        }
                        setError(err instanceof Error ? err.message : 'Failed to load question');
                    } finally{
                        setLoading(false);
                    }
                }
            }["QuestionBasedTester.useEffect.loadQuestion"];
            if (questionId) {
                loadQuestion();
            }
        }
    }["QuestionBasedTester.useEffect"], [
        questionId,
        studentId
    ]);
    // removed createdStack; rely solely on UndoRedoManager
    function getMouseCoords(brd, e) {
        const coords = brd.getUsrCoordsOfMouse(e);
        return {
            x: coords[0],
            y: coords[1]
        };
    }
    function nearestFreePoint(brd, e) {
        const under = brd.getAllObjectsUnderMouse(e);
        const pt = under.find((o)=>o.elType === 'point' && !o.visProp.fixed);
        return pt || null;
    }
    // Helper function to get or create points via history system
    const getOrCreatePointViaHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "QuestionBasedTester.useCallback[getOrCreatePointViaHistory]": (brd, xy)=>{
            const factory = geometryFactoryRef.current;
            if (!factory) return null;
            // Use soft snapping for smoother placement - only snap if close to grid
            const snapped = snapToGrid(xy.x, xy.y, gridOptionRef.current, true);
            // Use grid-aware EPS: slightly larger than snap size to catch nearby snapped points
            const checkEPS = factory.getNearbyEps(gridOptionRef.current, EPS);
            // try to reuse an existing non-fixed point near the coordinates
            const existing = factory.findNearbyPoint(snapped.x, snapped.y, checkEPS);
            if (existing) return existing;
            // create point at snapped coordinates (with soft snap)
            const pt = factory.pointWithGrid(snapped.x, snapped.y, gridOptionRef.current);
            // Don't create a separate point operation here - the point will be tracked
            // automatically when the shape operation (segment/line/circle) executes
            // The shape operations will find this point by ID and attach tracking to it
            return pt;
        }
    }["QuestionBasedTester.useCallback[getOrCreatePointViaHistory]"], []);
    const createPointSmart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "QuestionBasedTester.useCallback[createPointSmart]": (brd, xy)=>{
            const factory = geometryFactoryRef.current;
            if (!factory) return null;
            // Use soft snapping for smoother placement
            const snapped = snapToGrid(xy.x, xy.y, gridOption, true);
            // Use grid-aware EPS to check for existing points
            const checkEPS = factory.getNearbyEps(gridOption, EPS);
            // Check for existing points at snapped location
            const existing = factory.findNearbyPoint(snapped.x, snapped.y, checkEPS);
            if (existing) return existing;
            // Prefer reusing existing point under cursor
            const under = brd.getAllObjectsUnderMouse({});
            const existingUnder = under === null || under === void 0 ? void 0 : under.find({
                "QuestionBasedTester.useCallback[createPointSmart]": (o)=>{
                    var _o_visProp;
                    return (o === null || o === void 0 ? void 0 : o.elType) === 'point' && !((_o_visProp = o.visProp) === null || _o_visProp === void 0 ? void 0 : _o_visProp.fixed);
                }
            }["QuestionBasedTester.useCallback[createPointSmart]"]);
            if (existingUnder) return existingUnder;
            // Create free point (grid-aware with soft snap)
            const pt = factory.pointWithGrid(snapped.x, snapped.y, gridOption);
            return pt;
        }
    }["QuestionBasedTester.useCallback[createPointSmart]"], [
        gridOption
    ]);
    // 'A_12' -> 'A₁₂'
    function toSubscript(name) {
        const map = {
            '0': '₀',
            '1': '₁',
            '2': '₂',
            '3': '₃',
            '4': '₄',
            '5': '₅',
            '6': '₆',
            '7': '₇',
            '8': '₈',
            '9': '₉'
        };
        return name.replace(/_(\d+)/g, (_, d)=>d.split('').map((ch)=>{
                var _map_ch;
                return (_map_ch = map[ch]) !== null && _map_ch !== void 0 ? _map_ch : ch;
            }).join(''));
    }
    const handleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "QuestionBasedTester.useCallback[handleClick]": (brd, e)=>{
            var _e_originalEvent;
            if (uiBusyRef.current) return;
            // Prevent tools from firing while in rename mode
            if (renameModeRef.current) return;
            // Check if the click is on a physical tool - if so, don't handle it
            const target = (_e_originalEvent = e.originalEvent) === null || _e_originalEvent === void 0 ? void 0 : _e_originalEvent.target;
            if (target && (target.closest('.group') || target.classList.contains('group'))) {
                return; // Let the physical tool handle the interaction
            }
            const xy = getMouseCoords(brd, e);
            const currentTool = toolRef.current;
            switch(currentTool){
                case 'mouse':
                    {
                        setFeedback('');
                        break;
                    }
                case 'point':
                    {
                        var _undoRedoRef_current;
                        (_undoRedoRef_current = undoRedoRef.current) === null || _undoRedoRef_current === void 0 ? void 0 : _undoRedoRef_current.begin();
                        // try to reuse an existing point under mouse
                        const under = brd.getAllObjectsUnderMouse(e);
                        const existing = under.find({
                            "QuestionBasedTester.useCallback[handleClick].existing": (o)=>o.elType === 'point' && !o.visProp.fixed
                        }["QuestionBasedTester.useCallback[handleClick].existing"]);
                        if (existing) {
                            var _undoRedoRef_current1;
                            (_undoRedoRef_current1 = undoRedoRef.current) === null || _undoRedoRef_current1 === void 0 ? void 0 : _undoRedoRef_current1.commit();
                            setFeedback('Vybrán existující bod');
                            break;
                        }
                        const pt = createPointSmart(brd, xy);
                        if (pt) {
                            var _undoRedoRef_current2, _undoRedoRef_current3, _undoRedoRef_current4;
                            const op = (_undoRedoRef_current2 = undoRedoRef.current) === null || _undoRedoRef_current2 === void 0 ? void 0 : _undoRedoRef_current2.createPointOperation(pt.X(), pt.Y(), {
                                name: '',
                                size: 3,
                                strokeColor: '#e11d48',
                                fillColor: '#e11d48',
                                label: {
                                    offset: [
                                        5,
                                        10
                                    ]
                                }
                            });
                            if (op) (_undoRedoRef_current3 = undoRedoRef.current) === null || _undoRedoRef_current3 === void 0 ? void 0 : _undoRedoRef_current3.pushOperation(op);
                            (_undoRedoRef_current4 = undoRedoRef.current) === null || _undoRedoRef_current4 === void 0 ? void 0 : _undoRedoRef_current4.commit();
                            updateUndoRedoState();
                            setFeedback('Bod vytvořen');
                        } else {
                            var _undoRedoRef_current5;
                            (_undoRedoRef_current5 = undoRedoRef.current) === null || _undoRedoRef_current5 === void 0 ? void 0 : _undoRedoRef_current5.commit();
                        }
                        break;
                    }
                case 'segment':
                    {
                        var _undoRedoRef_current6, _undoRedoRef_current7;
                        const selectionMgr = selectionManagerRef.current;
                        if (!selectionMgr) break;
                        const first = selectionMgr.getFirst();
                        if (!first) {
                            var // first click
                            _undoRedoRef_current8;
                            (_undoRedoRef_current8 = undoRedoRef.current) === null || _undoRedoRef_current8 === void 0 ? void 0 : _undoRedoRef_current8.begin();
                            const p = getOrCreatePointViaHistory(brd, xy);
                            if (!p) {
                                var _undoRedoRef_current9;
                                (_undoRedoRef_current9 = undoRedoRef.current) === null || _undoRedoRef_current9 === void 0 ? void 0 : _undoRedoRef_current9.commit();
                                break;
                            }
                            selectionMgr.select(p);
                            setFeedback('Klikněte na druhý bod');
                            break;
                        }
                        // second click
                        const a = first;
                        const b = getOrCreatePointViaHistory(brd, xy);
                        if (!b) {
                            var _undoRedoRef_current10;
                            (_undoRedoRef_current10 = undoRedoRef.current) === null || _undoRedoRef_current10 === void 0 ? void 0 : _undoRedoRef_current10.commit();
                            selectionMgr.clear();
                            break;
                        }
                        const p1 = {
                            x: a.X(),
                            y: a.Y()
                        };
                        const p2 = {
                            x: b.X(),
                            y: b.Y()
                        };
                        const attr = {
                            strokeColor: '#2563eb',
                            strokeWidth: 2
                        };
                        const op = (_undoRedoRef_current6 = undoRedoRef.current) === null || _undoRedoRef_current6 === void 0 ? void 0 : _undoRedoRef_current6.createSegmentOperation(p1, p2, attr);
                        if (op) {
                            var _undoRedoRef_current11;
                            op.pointIds = [
                                a.id,
                                b.id
                            ]; // <-- bind exact endpoints
                            (_undoRedoRef_current11 = undoRedoRef.current) === null || _undoRedoRef_current11 === void 0 ? void 0 : _undoRedoRef_current11.pushOperation(op);
                        }
                        (_undoRedoRef_current7 = undoRedoRef.current) === null || _undoRedoRef_current7 === void 0 ? void 0 : _undoRedoRef_current7.commit();
                        updateUndoRedoState();
                        selectionMgr.clear();
                        setFeedback('Úsečka vytvořena');
                        break;
                    }
                case 'line':
                    {
                        var _undoRedoRef_current12, _undoRedoRef_current13;
                        const selectionMgr = selectionManagerRef.current;
                        if (!selectionMgr) break;
                        const first = selectionMgr.getFirst();
                        if (!first) {
                            var _undoRedoRef_current14;
                            (_undoRedoRef_current14 = undoRedoRef.current) === null || _undoRedoRef_current14 === void 0 ? void 0 : _undoRedoRef_current14.begin();
                            const p = getOrCreatePointViaHistory(brd, xy);
                            if (!p) {
                                var _undoRedoRef_current15;
                                (_undoRedoRef_current15 = undoRedoRef.current) === null || _undoRedoRef_current15 === void 0 ? void 0 : _undoRedoRef_current15.commit();
                                break;
                            }
                            selectionMgr.select(p);
                            setFeedback('Klikněte na druhý bod');
                            break;
                        }
                        const a = first;
                        const b = getOrCreatePointViaHistory(brd, xy);
                        if (!b) {
                            var _undoRedoRef_current16;
                            (_undoRedoRef_current16 = undoRedoRef.current) === null || _undoRedoRef_current16 === void 0 ? void 0 : _undoRedoRef_current16.commit();
                            selectionMgr.clear();
                            break;
                        }
                        const p1 = {
                            x: a.X(),
                            y: a.Y()
                        };
                        const p2 = {
                            x: b.X(),
                            y: b.Y()
                        };
                        const attr = {
                            strokeColor: '#059669',
                            strokeWidth: 1,
                            dash: 1
                        };
                        const op = (_undoRedoRef_current12 = undoRedoRef.current) === null || _undoRedoRef_current12 === void 0 ? void 0 : _undoRedoRef_current12.createLineOperation(p1, p2, attr);
                        if (op) {
                            var _undoRedoRef_current17;
                            op.pointIds = [
                                a.id,
                                b.id
                            ];
                            (_undoRedoRef_current17 = undoRedoRef.current) === null || _undoRedoRef_current17 === void 0 ? void 0 : _undoRedoRef_current17.pushOperation(op);
                        }
                        (_undoRedoRef_current13 = undoRedoRef.current) === null || _undoRedoRef_current13 === void 0 ? void 0 : _undoRedoRef_current13.commit();
                        updateUndoRedoState();
                        selectionMgr.clear();
                        setFeedback('Přímka vytvořena');
                        break;
                    }
                case 'circle':
                    {
                        var _undoRedoRef_current18, _undoRedoRef_current19;
                        const selectionMgr = selectionManagerRef.current;
                        if (!selectionMgr) break;
                        const first = selectionMgr.getFirst();
                        if (!first) {
                            var _undoRedoRef_current20;
                            (_undoRedoRef_current20 = undoRedoRef.current) === null || _undoRedoRef_current20 === void 0 ? void 0 : _undoRedoRef_current20.begin();
                            const c = getOrCreatePointViaHistory(brd, xy);
                            if (!c) {
                                var _undoRedoRef_current21;
                                (_undoRedoRef_current21 = undoRedoRef.current) === null || _undoRedoRef_current21 === void 0 ? void 0 : _undoRedoRef_current21.commit();
                                break;
                            }
                            selectionMgr.select(c);
                            setFeedback('Klikněte na bod na kružnici');
                            break;
                        }
                        const c = first;
                        const p = getOrCreatePointViaHistory(brd, xy);
                        if (!p) {
                            var _undoRedoRef_current22;
                            (_undoRedoRef_current22 = undoRedoRef.current) === null || _undoRedoRef_current22 === void 0 ? void 0 : _undoRedoRef_current22.commit();
                            selectionMgr.clear();
                            break;
                        }
                        const center = {
                            x: c.X(),
                            y: c.Y()
                        };
                        const on = {
                            x: p.X(),
                            y: p.Y()
                        };
                        const attr = {
                            strokeColor: '#dc2626',
                            strokeWidth: 2
                        };
                        const op = (_undoRedoRef_current18 = undoRedoRef.current) === null || _undoRedoRef_current18 === void 0 ? void 0 : _undoRedoRef_current18.createCircleOperation(center, on, attr);
                        if (op) {
                            var _undoRedoRef_current23;
                            op.pointIds = [
                                c.id,
                                p.id
                            ];
                            (_undoRedoRef_current23 = undoRedoRef.current) === null || _undoRedoRef_current23 === void 0 ? void 0 : _undoRedoRef_current23.pushOperation(op);
                        }
                        (_undoRedoRef_current19 = undoRedoRef.current) === null || _undoRedoRef_current19 === void 0 ? void 0 : _undoRedoRef_current19.commit();
                        updateUndoRedoState();
                        selectionMgr.clear();
                        setFeedback('Kružnice vytvořena');
                        break;
                    }
                case 'rubber':
                    {
                        const under = brd.getAllObjectsUnderMouse(e);
                        const toRemove = under.find({
                            "QuestionBasedTester.useCallback[handleClick].toRemove": (o)=>{
                                var _o_visProp;
                                return !((_o_visProp = o.visProp) === null || _o_visProp === void 0 ? void 0 : _o_visProp.fixed);
                            }
                        }["QuestionBasedTester.useCallback[handleClick].toRemove"]);
                        if (toRemove) {
                            var _undoRedoRef_current24;
                            const delOp = (_undoRedoRef_current24 = undoRedoRef.current) === null || _undoRedoRef_current24 === void 0 ? void 0 : _undoRedoRef_current24.createDeleteOperation(toRemove);
                            if (delOp) {
                                var _undoRedoRef_current25;
                                (_undoRedoRef_current25 = undoRedoRef.current) === null || _undoRedoRef_current25 === void 0 ? void 0 : _undoRedoRef_current25.pushOperation(delOp);
                                updateUndoRedoState();
                                setFeedback('Objekt smazán');
                            } else {
                                brd.removeObject(toRemove);
                                setFeedback('Objekt smazán (bez historie)');
                            }
                        }
                        break;
                    }
            }
        }
    }["QuestionBasedTester.useCallback[handleClick]"], [
        getOrCreatePointViaHistory,
        createPointSmart
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionBasedTester.useEffect": ()=>{
            handleClickRef.current = handleClick;
        }
    }["QuestionBasedTester.useEffect"], [
        handleClick
    ]);
    // Keyboard shortcuts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionBasedTester.useEffect": ()=>{
            const handleKeyPress = {
                "QuestionBasedTester.useEffect.handleKeyPress": (e)=>{
                    if (uiBusyRef.current) return;
                    // Rename mode toggle
                    if ((e.key === 'n' || e.key === 'N') && !e.ctrlKey && !e.metaKey) {
                        setRenameEnabled(!renameModeRef.current);
                        return;
                    }
                    // Undo (Ctrl+Z or Cmd+Z)
                    if ((e.key === 'z' || e.key === 'Z') && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
                        var _undoRedoRef_current;
                        e.preventDefault();
                        (_undoRedoRef_current = undoRedoRef.current) === null || _undoRedoRef_current === void 0 ? void 0 : _undoRedoRef_current.undo();
                        updateUndoRedoState();
                        return;
                    }
                    // Redo (Ctrl+Shift+Z or Cmd+Shift+Z)
                    if ((e.key === 'z' || e.key === 'Z') && (e.ctrlKey || e.metaKey) && e.shiftKey) {
                        var _undoRedoRef_current1;
                        e.preventDefault();
                        (_undoRedoRef_current1 = undoRedoRef.current) === null || _undoRedoRef_current1 === void 0 ? void 0 : _undoRedoRef_current1.redo();
                        updateUndoRedoState();
                        return;
                    }
                }
            }["QuestionBasedTester.useEffect.handleKeyPress"];
            window.addEventListener('keydown', handleKeyPress);
            return ({
                "QuestionBasedTester.useEffect": ()=>window.removeEventListener('keydown', handleKeyPress)
            })["QuestionBasedTester.useEffect"];
        }
    }["QuestionBasedTester.useEffect"], []);
    // Close settings dropdown when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionBasedTester.useEffect": ()=>{
            const handleClickOutside = {
                "QuestionBasedTester.useEffect.handleClickOutside": (event)=>{
                    const target = event.target;
                    if (showSettings && !target.closest('.settings-dropdown')) {
                        setShowSettings(false);
                    }
                }
            }["QuestionBasedTester.useEffect.handleClickOutside"];
            if (showSettings) {
                document.addEventListener('mousedown', handleClickOutside);
                return ({
                    "QuestionBasedTester.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
                })["QuestionBasedTester.useEffect"];
            }
        }
    }["QuestionBasedTester.useEffect"], [
        showSettings
    ]);
    // Handle ruler position changes
    const handleRulerPositionChange = (x, y, rotation, length)=>{
        setRulerPosition({
            x,
            y,
            rotation,
            length
        });
    };
    // Handle triangle position changes
    const handleTrianglePositionChange = (x, y, rotation, size)=>{
        setTrianglePosition({
            x,
            y,
            rotation,
            size
        });
    };
    // Handle protractor position changes
    const handleProtractorPositionChange = (x, y, rotation, size)=>{
        setProtractorPosition({
            x,
            y,
            rotation,
            size
        });
    };
    function toggleRuler() {
        setRulerVisible(!rulerVisible);
        if (!rulerVisible) {
            setActiveTool('ruler');
        } else if (activeTool === 'ruler') {
            setActiveTool(null);
        }
    }
    function toggleTriangle() {
        setTriangleVisible(!triangleVisible);
        if (!triangleVisible) {
            setActiveTool('triangle');
        } else if (activeTool === 'triangle') {
            setActiveTool(null);
        }
    }
    function toggleProtractor() {
        setProtractorVisible(!protractorVisible);
        if (!protractorVisible) {
            setActiveTool('protractor');
        } else if (activeTool === 'protractor') {
            setActiveTool(null);
        }
    }
    // Initialize board AFTER the loading phase so the container actually exists
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionBasedTester.useEffect": ()=>{
            // wait until question has finished loading AND there's no error
            if (loading || error) return;
            // only init once, and only when the container is mounted
            if (!containerRef.current || boardManagerRef.current) return;
            console.debug('Initializing board (post-loading), container:', containerRef.current);
            // Calculate dynamic bounding box in whole centimeters, centered at (0,0)
            const containerRect = containerRef.current.getBoundingClientRect();
            const boundingBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$measurement$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateCenteredBoundingBoxCm"])(containerRect.width, containerRect.height);
            const boardManager = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$board$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoardManager"]({
                container: containerRef.current,
                boundingbox: boundingBox,
                axis: false,
                showNavigation: false,
                showCopyright: false,
                grid: false,
                pan: {
                    enabled: false
                },
                zoom: false,
                keepaspectratio: true
            });
            boardManagerRef.current = boardManager;
            const brd = boardManager.getBoard();
            geometryFactoryRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$geometry$2d$factory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GeometryFactory"](brd);
            selectionManagerRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$selection$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectionManager"]();
            undoRedoRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$undo$2d$redo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UndoRedoManager"]({
                board: brd,
                onFeedback: setFeedback,
                EPS
            });
            // Create rename manager and wire into undo/redo
            const renameMgr = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$rename$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RenameManager"](brd, {
                clickEps: 0.12,
                promptLabel: 'Název bodu (např. A, B, C, A_1, A_2):',
                eventGuard: {
                    "QuestionBasedTester.useEffect": (ev)=>{
                        var _ev_originalEvent, _t_classList;
                        const t = ev === null || ev === void 0 ? void 0 : (_ev_originalEvent = ev.originalEvent) === null || _ev_originalEvent === void 0 ? void 0 : _ev_originalEvent.target;
                        if (t && (t.closest('.group') || ((_t_classList = t.classList) === null || _t_classList === void 0 ? void 0 : _t_classList.contains('group')))) return false;
                        return !uiBusyRef.current;
                    }
                }["QuestionBasedTester.useEffect"],
                onRenamed: {
                    "QuestionBasedTester.useEffect": (param)=>{
                        let { pointId, beforeRaw, afterRaw } = param;
                        var _undoRedoRef_current;
                        if (beforeRaw === afterRaw) return;
                        const pt = brd.objects[pointId];
                        if (!pt) return;
                        const before = {
                            x: pt.X(),
                            y: pt.Y(),
                            name: beforeRaw
                        };
                        const after = {
                            x: pt.X(),
                            y: pt.Y(),
                            name: afterRaw
                        };
                        const op = (_undoRedoRef_current = undoRedoRef.current) === null || _undoRedoRef_current === void 0 ? void 0 : _undoRedoRef_current.createModifyOperation(pointId, before, after);
                        if (op) {
                            undoRedoRef.current.pushOperation(op);
                            updateUndoRedoState();
                        }
                    }
                }["QuestionBasedTester.useEffect"]
            });
            renameMgrRef.current = renameMgr;
            // Create SelectObjectsTool
            selectToolRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$select$2d$objects$2d$tool$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](brd, setFeedback, undoRedoRef.current);
            // Track point moves as modify operations
            function attachModifyListeners(el) {
                var _el_visProp;
                if (!el || el.elType !== 'point' || ((_el_visProp = el.visProp) === null || _el_visProp === void 0 ? void 0 : _el_visProp.fixed)) return;
                let before = null;
                el.on('down', {
                    "QuestionBasedTester.useEffect.attachModifyListeners": ()=>{
                        var _el_name;
                        before = {
                            x: el.X(),
                            y: el.Y(),
                            name: (_el_name = el.name) !== null && _el_name !== void 0 ? _el_name : ''
                        };
                    }
                }["QuestionBasedTester.useEffect.attachModifyListeners"]);
                el.on('up', {
                    "QuestionBasedTester.useEffect.attachModifyListeners": ()=>{
                        if (!before) return;
                        var _el_name;
                        const after = {
                            x: el.X(),
                            y: el.Y(),
                            name: (_el_name = el.name) !== null && _el_name !== void 0 ? _el_name : ''
                        };
                        if (Math.hypot(after.x - before.x, after.y - before.y) > 1e-9) {
                            var _undoRedoRef_current;
                            const op = (_undoRedoRef_current = undoRedoRef.current) === null || _undoRedoRef_current === void 0 ? void 0 : _undoRedoRef_current.createModifyOperation(el.id, before, after);
                            if (op) {
                                undoRedoRef.current.pushOperation(op);
                                updateUndoRedoState();
                            }
                        }
                        before = null;
                    }
                }["QuestionBasedTester.useEffect.attachModifyListeners"]);
            }
            Object.values(brd.objects).forEach({
                "QuestionBasedTester.useEffect": (o)=>attachModifyListeners(o)
            }["QuestionBasedTester.useEffect"]);
            brd.on('add', {
                "QuestionBasedTester.useEffect": (id)=>{
                    const o = brd.objects[id];
                    attachModifyListeners(o);
                }
            }["QuestionBasedTester.useEffect"]);
            // Always forward board 'down' events to drawing handler
            const boardDownHandler = {
                "QuestionBasedTester.useEffect.boardDownHandler": (e)=>{
                    var _handleClickRef_current;
                    // Do not trigger drawing handler when select tool is active
                    if (toolRef.current === 'select') return;
                    (_handleClickRef_current = handleClickRef.current) === null || _handleClickRef_current === void 0 ? void 0 : _handleClickRef_current.call(handleClickRef, brd, e);
                }
            }["QuestionBasedTester.useEffect.boardDownHandler"];
            brd.on('down', boardDownHandler);
            // Make sure the SVG sizes correctly once visible
            setTimeout({
                "QuestionBasedTester.useEffect": ()=>{
                    try {
                        var _brd_renderer_resize, _brd_renderer, _brd_fullUpdate;
                        brd === null || brd === void 0 ? void 0 : (_brd_renderer = brd.renderer) === null || _brd_renderer === void 0 ? void 0 : (_brd_renderer_resize = _brd_renderer.resize) === null || _brd_renderer_resize === void 0 ? void 0 : _brd_renderer_resize.call(_brd_renderer);
                        brd === null || brd === void 0 ? void 0 : (_brd_fullUpdate = brd.fullUpdate) === null || _brd_fullUpdate === void 0 ? void 0 : _brd_fullUpdate.call(brd);
                    } catch (e) {}
                }
            }["QuestionBasedTester.useEffect"], 0);
            return ({
                "QuestionBasedTester.useEffect": ()=>{
                    try {
                        brd.off('down', boardDownHandler);
                    } catch (e) {}
                    undoRedoRef.current = null;
                    geometryFactoryRef.current = null;
                    selectionManagerRef.current = null;
                    try {
                        var _renameMgrRef_current;
                        (_renameMgrRef_current = renameMgrRef.current) === null || _renameMgrRef_current === void 0 ? void 0 : _renameMgrRef_current.destroy();
                    } catch (e) {}
                    renameMgrRef.current = null;
                    // On component cleanup/unmount, only use deactivate on selectToolRef
                    if (selectToolRef.current) selectToolRef.current.deactivate();
                    selectToolRef.current = null;
                    boardManager.free();
                    boardManagerRef.current = null;
                    givensRef.current = null;
                }
            })["QuestionBasedTester.useEffect"];
        }
    }["QuestionBasedTester.useEffect"], [
        loading,
        error
    ]); // 👈 key change
    // When user changes the option, update the grid manager
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionBasedTester.useEffect": ()=>{
            var _boardManagerRef_current;
            (_boardManagerRef_current = boardManagerRef.current) === null || _boardManagerRef_current === void 0 ? void 0 : _boardManagerRef_current.setGridMode(gridOption);
        }
    }["QuestionBasedTester.useEffect"], [
        gridOption
    ]);
    // Hook rename mode state to manager enable/disable
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionBasedTester.useEffect": ()=>{
            if (!renameMgrRef.current) return;
            if (renameMode) renameMgrRef.current.enable();
            else renameMgrRef.current.disable();
        }
    }["QuestionBasedTester.useEffect"], [
        renameMode
    ]);
    // Activate/deactivate select tool when tool changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionBasedTester.useEffect": ()=>{
            var _boardManagerRef_current;
            const brd = (_boardManagerRef_current = boardManagerRef.current) === null || _boardManagerRef_current === void 0 ? void 0 : _boardManagerRef_current.getBoard();
            if (!brd) return;
            if (!selectToolRef.current) {
                selectToolRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$select$2d$objects$2d$tool$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](brd, setFeedback, undoRedoRef.current || undefined);
            }
            if (tool === 'select') {
                selectToolRef.current.activate();
            } else {
                selectToolRef.current.deactivate();
            }
        }
    }["QuestionBasedTester.useEffect"], [
        tool
    ]);
    // Create givens when question loads AND the board is ready
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionBasedTester.useEffect": ()=>{
            if (loading || error) return; // wait until data phase is done
            if (!boardManagerRef.current || !question) return; // wait until board exists
            console.debug('Creating givens for question:', question.title, 'givens:', question.givens);
            // Clear any existing givens first
            if (givensRef.current) {
                Object.values(givensRef.current).forEach({
                    "QuestionBasedTester.useEffect": (obj)=>{
                        if (obj && typeof obj.removeObject === 'function') {
                            try {
                                boardManagerRef.current.getBoard().removeObject(obj);
                            } catch (e) {
                                console.warn('Error removing existing givens:', e);
                            }
                        }
                    }
                }["QuestionBasedTester.useEffect"]);
            }
            const givens = {};
            if (question.givens) {
                try {
                    console.debug('Parsing givens:', question.givens);
                    const givensData = typeof question.givens === 'string' ? JSON.parse(question.givens) : question.givens;
                    console.debug('Parsed givens data:', givensData);
                    // Create points
                    if (givensData.points) {
                        console.debug('Creating points:', givensData.points);
                        Object.entries(givensData.points).forEach({
                            "QuestionBasedTester.useEffect": (param)=>{
                                let [name, coords] = param;
                                const point = boardManagerRef.current.getBoard().create('point', [
                                    coords.x,
                                    coords.y
                                ], {
                                    name,
                                    size: 3,
                                    strokeColor: '#000',
                                    fillColor: '#000',
                                    fixed: true,
                                    label: {
                                        offset: [
                                            5,
                                            10
                                        ]
                                    }
                                });
                                givens[name] = point;
                                console.debug('Created point:', name, coords);
                            }
                        }["QuestionBasedTester.useEffect"]);
                    }
                    // Create lines
                    if (givensData.lines) {
                        console.debug('Creating lines:', givensData.lines);
                        Object.entries(givensData.lines).forEach({
                            "QuestionBasedTester.useEffect": (param)=>{
                                let [name, lineData] = param;
                                const line = boardManagerRef.current.getBoard().create('line', [
                                    [
                                        lineData.p1.x,
                                        lineData.p1.y
                                    ],
                                    [
                                        lineData.p2.x,
                                        lineData.p2.y
                                    ]
                                ], {
                                    strokeColor: '#000',
                                    strokeWidth: 2,
                                    name,
                                    withLabel: true,
                                    fixed: true,
                                    label: {
                                        position: 'rt',
                                        offset: [
                                            10,
                                            0
                                        ]
                                    }
                                });
                                givens[name] = line;
                                console.debug('Created line:', name, lineData);
                            }
                        }["QuestionBasedTester.useEffect"]);
                    }
                    // Create circles
                    if (givensData.circles) {
                        console.debug('Creating circles:', givensData.circles);
                        Object.entries(givensData.circles).forEach({
                            "QuestionBasedTester.useEffect": (param)=>{
                                let [name, circleData] = param;
                                const center = givens[circleData.center] || boardManagerRef.current.getBoard().create('point', [
                                    circleData.center.x,
                                    circleData.center.y
                                ], {
                                    name: circleData.center,
                                    size: 2,
                                    strokeColor: '#000',
                                    fillColor: '#000',
                                    fixed: true
                                });
                                const circle = boardManagerRef.current.getBoard().create('circle', [
                                    center,
                                    circleData.radius
                                ], {
                                    strokeColor: '#000',
                                    strokeWidth: 2,
                                    name,
                                    withLabel: true,
                                    fixed: true
                                });
                                givens[name] = circle;
                                console.debug('Created circle:', name, circleData);
                            }
                        }["QuestionBasedTester.useEffect"]);
                    }
                } catch (err) {
                    console.error('Error parsing givens:', err);
                }
            } else {
                // Fallback: create default givens for the isosceles triangle problem
                console.debug('No givens data found, creating default givens for isosceles triangle problem');
                const q = boardManagerRef.current.getBoard().create('line', [
                    [
                        0,
                        7
                    ],
                    [
                        10,
                        7
                    ]
                ], {
                    strokeColor: '#000',
                    strokeWidth: 2,
                    name: 'q',
                    withLabel: true,
                    fixed: true,
                    label: {
                        position: 'rt',
                        offset: [
                            10,
                            0
                        ]
                    }
                });
                const S = boardManagerRef.current.getBoard().create('point', [
                    5,
                    5
                ], {
                    name: 'S',
                    size: 3,
                    strokeColor: '#000',
                    fillColor: '#000',
                    fixed: true,
                    label: {
                        offset: [
                            5,
                            10
                        ]
                    }
                });
                const C = boardManagerRef.current.getBoard().create('point', [
                    4.5,
                    3
                ], {
                    name: 'C',
                    size: 3,
                    strokeColor: '#000',
                    fillColor: '#000',
                    fixed: true,
                    label: {
                        offset: [
                            5,
                            -15
                        ]
                    }
                });
                givens.q = q;
                givens.S = S;
                givens.C = C;
            }
            givensRef.current = givens;
            console.debug('Givens created:', givens);
            // Force board update to render the newly created givens
            if (boardManagerRef.current) {
                const brd = boardManagerRef.current.getBoard();
                brd.renderer.resize();
                brd.fullUpdate();
                console.debug('Board updated to display givens');
            }
            // Additional debugging
            console.debug('Board objects after givens creation:', Object.keys(boardManagerRef.current.getBoard().objects));
        }
    }["QuestionBasedTester.useEffect"], [
        question,
        loading,
        error
    ]); // 👈 key change
    function undoLast() {
        var _undoRedoRef_current;
        (_undoRedoRef_current = undoRedoRef.current) === null || _undoRedoRef_current === void 0 ? void 0 : _undoRedoRef_current.undo();
        updateUndoRedoState();
    }
    function redoLast() {
        var _undoRedoRef_current;
        (_undoRedoRef_current = undoRedoRef.current) === null || _undoRedoRef_current === void 0 ? void 0 : _undoRedoRef_current.redo();
        updateUndoRedoState();
    }
    function clearAll() {
        var _boardManagerRef_current;
        const brd = (_boardManagerRef_current = boardManagerRef.current) === null || _boardManagerRef_current === void 0 ? void 0 : _boardManagerRef_current.getBoard();
        if (!brd) return;
        const toRemove = [];
        for(const key in brd.objects){
            var _o_visProp;
            const o = brd.objects[key];
            if (!(o === null || o === void 0 ? void 0 : (_o_visProp = o.visProp) === null || _o_visProp === void 0 ? void 0 : _o_visProp.fixed)) {
                toRemove.push(o);
            }
        }
        toRemove.forEach((o)=>brd.removeObject(o));
        setSelected([]);
        setFeedback('');
        setData(null);
        // fully reset undo history if supported
        try {
            var _reset, _this;
            (_this = undoRedoRef.current) === null || _this === void 0 ? void 0 : (_reset = _this.reset) === null || _reset === void 0 ? void 0 : _reset.call(_this);
        } catch (e) {}
        updateUndoRedoState();
    }
    // Generic validation function that works with any question
    function validateConstruction() {
        if (!(question === null || question === void 0 ? void 0 : question.constraints)) {
            return {
                passed: true,
                message: 'Konstrukce uložena',
                score: (question === null || question === void 0 ? void 0 : question.max_score) || 3
            };
        }
        const brd = boardManagerRef.current.getBoard();
        const givens = givensRef.current;
        try {
            const constraints = typeof question.constraints === 'string' ? JSON.parse(question.constraints) : question.constraints;
            // This is a simplified validation - in a real implementation, you'd have more sophisticated validation logic
            // based on the question's constraints structure
            let score = 0;
            let passed = false;
            let message = '';
            // Basic validation - check if required objects exist
            const points = Object.values(brd.objects).filter((o)=>{
                var _o_visProp;
                return o.elType === 'point' && !((_o_visProp = o.visProp) === null || _o_visProp === void 0 ? void 0 : _o_visProp.fixed);
            });
            const segments = Object.values(brd.objects).filter((o)=>o.elType === 'segment');
            const lines = Object.values(brd.objects).filter((o)=>{
                var _o_visProp;
                return o.elType === 'line' && !((_o_visProp = o.visProp) === null || _o_visProp === void 0 ? void 0 : _o_visProp.fixed);
            });
            const circles = Object.values(brd.objects).filter((o)=>{
                var _o_visProp;
                return o.elType === 'circle' && !((_o_visProp = o.visProp) === null || _o_visProp === void 0 ? void 0 : _o_visProp.fixed);
            });
            if (constraints.requiredPoints && points.length >= constraints.requiredPoints) {
                score += 1;
            }
            if (constraints.requiredSegments && segments.length >= constraints.requiredSegments) {
                score += 1;
            }
            if (constraints.requiredLines && lines.length >= constraints.requiredLines) {
                score += 1;
            }
            if (constraints.requiredCircles && circles.length >= constraints.requiredCircles) {
                score += 1;
            }
            if (score >= (constraints.minScore || 2)) {
                passed = true;
                message = '✅ Výborně! Konstrukce splňuje požadavky.';
            } else {
                message = 'Konstrukce neúplná. Zkuste přidat více objektů.';
            }
            return {
                passed,
                message,
                score: Math.min(score, question.max_score)
            };
        } catch (err) {
            return {
                passed: false,
                message: 'Chyba při validaci',
                score: 0
            };
        }
    }
    async function saveConstruction() {
        if (!boardManagerRef.current || !attempt) return;
        const validation = validateConstruction();
        const brd = boardManagerRef.current.getBoard();
        const serializeGeometry = (obj)=>{
            const type = obj.elType;
            if (type === 'point') {
                return {
                    x: obj.X(),
                    y: obj.Y()
                };
            }
            if (type === 'segment' || type === 'line') {
                const p1 = obj.points && obj.points[0] ? obj.points[0] : null;
                const p2 = obj.points && obj.points[1] ? obj.points[1] : null;
                return p1 && p2 ? {
                    x1: p1.X(),
                    y1: p1.Y(),
                    x2: p2.X(),
                    y2: p2.Y()
                } : null;
            }
            if (type === 'circle') {
                const c = obj.center;
                const on = obj.point2 || obj.points && obj.points[1] || null;
                const center = c ? {
                    x: c.X(),
                    y: c.Y()
                } : null;
                const radius = c && on ? Math.hypot(on.X() - c.X(), on.Y() - c.Y()) : typeof obj.R === 'function' ? obj.R() : undefined;
                return {
                    center,
                    radius
                };
            }
            if (type === 'polygon') {
                const verts = Array.isArray(obj.vertices) ? obj.vertices.map((v)=>({
                        x: v.X(),
                        y: v.Y()
                    })) : [];
                return {
                    vertices: verts
                };
            }
            return null;
        };
        const snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$board$2d$serializer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exportBoard"])(brd);
        const currentState = {
            ...snapshot,
            timestamp: new Date().toISOString()
        };
        try {
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"]) {
                // Mock save for testing
                console.log('Mock save (Supabase not available):', {
                    validation,
                    currentState
                });
                setData({
                    validation,
                    timestamp: new Date().toISOString()
                });
                setFeedback(validation.message);
            } else {
                const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('gq_attempts').update({
                    state: currentState,
                    score: validation.score,
                    passed: validation.passed,
                    feedback: {
                        message: validation.message,
                        validation
                    },
                    is_complete: true,
                    time_spent: timeSpent
                }).eq('id', attempt.id);
                if (error) throw error;
                setData({
                    validation,
                    timestamp: new Date().toISOString()
                });
                setFeedback(validation.message);
            }
        } catch (err) {
            console.error('Error saving attempt:', err);
            setFeedback('Chyba při ukládání');
        }
    }
    function updateUndoRedoState() {
        var _undoRedoRef_current, _undoRedoRef_current1;
        var _undoRedoRef_current_canUndo;
        setCanUndoState((_undoRedoRef_current_canUndo = (_undoRedoRef_current = undoRedoRef.current) === null || _undoRedoRef_current === void 0 ? void 0 : _undoRedoRef_current.canUndo()) !== null && _undoRedoRef_current_canUndo !== void 0 ? _undoRedoRef_current_canUndo : false);
        var _undoRedoRef_current_canRedo;
        setCanRedoState((_undoRedoRef_current_canRedo = (_undoRedoRef_current1 = undoRedoRef.current) === null || _undoRedoRef_current1 === void 0 ? void 0 : _undoRedoRef_current1.canRedo()) !== null && _undoRedoRef_current_canRedo !== void 0 ? _undoRedoRef_current_canRedo : false);
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                        lineNumber: 1080,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Načítání úlohy..."
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                        lineNumber: 1081,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                lineNumber: 1079,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
            lineNumber: 1078,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                        className: "h-12 w-12 text-red-500 mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                        lineNumber: 1091,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-red-600 mb-4",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                        lineNumber: 1092,
                        columnNumber: 11
                    }, this),
                    onBack && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",
                        children: "Zpět"
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                        lineNumber: 1094,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                lineNumber: 1090,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
            lineNumber: 1089,
            columnNumber: 7
        }, this);
    }
    if (!question) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mb-4",
                        children: "Úloha nebyla nalezena"
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                        lineNumber: 1110,
                        columnNumber: 11
                    }, this),
                    onBack && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",
                        children: "Zpět"
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                        lineNumber: 1112,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                lineNumber: 1109,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
            lineNumber: 1108,
            columnNumber: 7
        }, this);
    }
    var _question_prompt_md;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg shadow-lg p-6 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    onBack && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onBack,
                                        className: "flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1136,
                                                columnNumber: 19
                                            }, this),
                                            "Zpět"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                        lineNumber: 1132,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-2xl font-bold text-gray-800",
                                                children: question.title
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1141,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 text-sm text-gray-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Kód: ",
                                                            question.code
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1145,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Obtížnost: ",
                                                            '★'.repeat(question.difficulty)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1146,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1148,
                                                                columnNumber: 21
                                                            }, this),
                                                            Math.floor(timeSpent / 60),
                                                            ":",
                                                            (timeSpent % 60).toString().padStart(2, '0')
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1147,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1144,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                        lineNumber: 1140,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                lineNumber: 1130,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-600",
                                        children: [
                                            "Maximální skóre: ",
                                            question.max_score
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                        lineNumber: 1155,
                                        columnNumber: 15
                                    }, this),
                                    attempt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-600",
                                        children: [
                                            "Skóre: ",
                                            (data === null || data === void 0 ? void 0 : (_data_validation = data.validation) === null || _data_validation === void 0 ? void 0 : _data_validation.score) || 0,
                                            " / ",
                                            question.max_score
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                        lineNumber: 1157,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                lineNumber: 1154,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                        lineNumber: 1129,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-50 border-l-4 border-blue-500 p-4 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-gray-700 text-sm markdown-content",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                                    remarkPlugins: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
                                    ],
                                    children: (_question_prompt_md = question.prompt_md) !== null && _question_prompt_md !== void 0 ? _question_prompt_md : ''
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                    lineNumber: 1167,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                lineNumber: 1166,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex items-center gap-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowHelp(!showHelp),
                                    className: "flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                            lineNumber: 1176,
                                            columnNumber: 17
                                        }, this),
                                        showHelp ? 'Skrýt nápovědu' : 'Zobrazit nápovědu'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                    lineNumber: 1172,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                lineNumber: 1171,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                        lineNumber: 1165,
                        columnNumber: 11
                    }, this),
                    showHelp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-50 border-l-4 border-blue-500 p-4 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-blue-800 mb-2",
                                children: "Nápověda k nástrojům:"
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                lineNumber: 1184,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid md:grid-cols-2 gap-4 text-sm text-blue-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-medium mb-1",
                                                children: "Základní nástroje:"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1187,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Myš:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1189,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Interakce s objekty bez vytváření"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1189,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Bod:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1190,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Vytvoření bodu kliknutím"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1190,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Úsečka:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1191,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Klikněte na dva body"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1191,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Přímka:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1192,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Klikněte na dva body"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1192,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Kružnice:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1193,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Střed a bod na kružnici"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1193,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Vybrat objekty:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1194,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Výběr a přesun více objektů"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1194,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Guma:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1195,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Smazání objektu"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1195,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1188,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                        lineNumber: 1186,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-medium mb-1",
                                                children: "Fyzické nástroje:"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1199,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Pravítko:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1201,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Měření vzdáleností"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1201,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Trojúhelník:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1202,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Rýsování úhlů"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1202,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Úhloměr:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1203,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Měření úhlů"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1203,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Modrý bod:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1204,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Přesun nástroje"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1204,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Zelený bod:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1205,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Otočení nástroje"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1205,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Oranžový bod:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1206,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Změna velikosti"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1206,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1200,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                        lineNumber: 1198,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                lineNumber: 1185,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 pt-3 border-t border-blue-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-medium mb-2 text-blue-800 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Keyboard$3e$__["Keyboard"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1212,
                                                columnNumber: 19
                                            }, this),
                                            "Klávesové zkratky:"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                        lineNumber: 1211,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-1 text-sm text-blue-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    "• ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "N:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1216,
                                                        columnNumber: 25
                                                    }, this),
                                                    " Režim přejmenování bodů"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1216,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    "• ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Ctrl/Cmd + Z:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1217,
                                                        columnNumber: 25
                                                    }, this),
                                                    " Zpět (Undo)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1217,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    "• ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Ctrl/Cmd + Shift + Z:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1218,
                                                        columnNumber: 25
                                                    }, this),
                                                    " Znovu (Redo)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1218,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    "• ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Delete:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1219,
                                                        columnNumber: 25
                                                    }, this),
                                                    " Smazat vybraný objekt (když je aktivní guma)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1219,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                        lineNumber: 1215,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                lineNumber: 1210,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                        lineNumber: 1183,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2.5 p-4 border-b border-gray-200 bg-white/50 rounded-t-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 pr-2 border-r border-gray-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-semibold text-gray-500 uppercase tracking-wide px-2",
                                                children: "Kreslení"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1231,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setTool('mouse'),
                                                className: "px-3 py-2 rounded-md flex items-center gap-2 transition-all text-sm font-medium shadow-sm ".concat(tool === 'mouse' ? 'bg-gray-700 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'),
                                                title: "Myš - Interakce s objekty bez vytváření",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "18",
                                                        height: "18",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        strokeWidth: "2",
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1240,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M13 13l6 6"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1241,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1239,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Myš"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1232,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setTool('point'),
                                                className: "px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md ".concat(tool === 'point' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'),
                                                title: "Bod - Vytvoření bodu kliknutím",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1252,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Bod"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1245,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setTool('segment'),
                                                className: "px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md ".concat(tool === 'segment' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'),
                                                title: "Úsečka - Klikněte na dva body",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1261,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Úsečka"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1254,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setTool('line'),
                                                className: "px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md ".concat(tool === 'line' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'),
                                                title: "Přímka - Klikněte na dva body",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1270,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Přímka"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1263,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setTool('circle'),
                                                className: "px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md ".concat(tool === 'circle' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'),
                                                title: "Kružnice - Střed a bod na kružnici",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1279,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Kružnice"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1272,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                        lineNumber: 1230,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 pr-2 border-r border-gray-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-semibold text-gray-500 uppercase tracking-wide px-2",
                                                children: "Úpravy"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1285,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setTool('select'),
                                                className: "px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md ".concat(tool === 'select' ? 'bg-purple-700 text-white shadow-md' : 'bg-white text-purple-700 hover:bg-purple-50 border border-purple-300'),
                                                title: "Vybrat objekty",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "18",
                                                        height: "18",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        strokeWidth: "2",
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        style: {
                                                            marginRight: '2px'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                x: "4",
                                                                y: "4",
                                                                width: "12",
                                                                height: "12",
                                                                rx: "2",
                                                                fill: "none",
                                                                strokeDasharray: "3 2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1296,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                points: "11,13 15,13 15,17",
                                                                strokeDasharray: "0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1297,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                points: "15,17 17,15 13,15",
                                                                strokeDasharray: "0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                lineNumber: 1298,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1295,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Vybrat objekty"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1287,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setTool('rubber'),
                                                className: "px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md ".concat(tool === 'rubber' ? 'bg-red-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-red-50 border border-gray-300'),
                                                title: "Guma - Smazání objektu",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__["Eraser"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1309,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Guma"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1302,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setRenameEnabled(!renameMode),
                                                className: "px-3 py-2 rounded flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md ".concat(renameMode ? 'bg-teal-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-teal-50 border border-gray-300'),
                                                title: "Přejmenovat bod (klikněte na bod)",
                                                children: "✎ Název bodu"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1311,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                        lineNumber: 1284,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-semibold text-gray-500 uppercase tracking-wide px-2",
                                                children: "Nástroje"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1324,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: toggleRuler,
                                                className: "px-3 py-2 rounded flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md ".concat(rulerVisible ? 'bg-yellow-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-300'),
                                                title: "Pravítko - Měření vzdáleností",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1332,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Pravítko"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1325,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: toggleTriangle,
                                                className: "px-3 py-2 rounded flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md ".concat(triangleVisible ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-300'),
                                                title: "Trojúhelník - Rýsování úhlů",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Triangle$3e$__["Triangle"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1341,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Trojúhelník"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1334,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: toggleProtractor,
                                                className: "px-3 py-2 rounded flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md ".concat(protractorVisible ? 'bg-orange-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-300'),
                                                title: "Úhloměr - Měření úhlů",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__["Gauge"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1350,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Úhloměr"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1343,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                        lineNumber: 1323,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                lineNumber: 1228,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2.5 p-4 bg-white/30 rounded-b-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: undoLast,
                                        disabled: !canUndoState,
                                        className: "px-3.5 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md",
                                        title: "Zpět (Ctrl/Cmd + Z)",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1363,
                                                columnNumber: 17
                                            }, this),
                                            " Zpět"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                        lineNumber: 1357,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: redoLast,
                                        disabled: !canRedoState,
                                        className: "px-3.5 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md",
                                        title: "Znovu (Ctrl/Cmd + Shift + Z)",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1371,
                                                columnNumber: 17
                                            }, this),
                                            " Znovu"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                        lineNumber: 1365,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: clearAll,
                                        className: "px-3.5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1374,
                                                columnNumber: 17
                                            }, this),
                                            " Vymazat"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                        lineNumber: 1373,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: saveConstruction,
                                        className: "px-3.5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center gap-2 transition-all text-sm font-medium shadow-sm hover:shadow-md",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1377,
                                                columnNumber: 17
                                            }, this),
                                            " Uložit"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                        lineNumber: 1376,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                lineNumber: 1356,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                        lineNumber: 1226,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: containerRef,
                        id: "jxgbox",
                        className: "w-full border-2 border-gray-300 rounded-lg bg-white jxgbox relative",
                        style: {
                            height: 500,
                            touchAction: 'none'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-2 right-2 z-50 settings-dropdown",
                                style: {
                                    zIndex: 9999
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-2 py-1 bg-white bg-opacity-80 rounded text-xs text-gray-700 border border-gray-300",
                                                children: [
                                                    gridOption === 'none' && 'Žádná mřížka',
                                                    gridOption === 'major' && 'Hlavní',
                                                    gridOption === 'minor' && 'Vedlejší',
                                                    gridOption === 'major-minor' && 'Hlavní+Vedlejší',
                                                    gridOption === 'dot' && 'Bodová'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1392,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowSettings(!showSettings),
                                                className: "p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-lg transition-colors",
                                                title: "Nastavení mřížky",
                                                style: {
                                                    zIndex: 10000
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                    lineNumber: 1405,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1399,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                        lineNumber: 1390,
                                        columnNumber: 15
                                    }, this),
                                    showSettings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-12 right-0 bg-white border border-gray-300 rounded-lg shadow-lg min-w-48 z-20",
                                        style: {
                                            zIndex: 10001
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 border-b border-gray-200",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-gray-700 font-medium",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "16",
                                                            height: "16",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: "2",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M3 3h18v18H3z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                    lineNumber: 1413,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M9 9h6v6H9z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                    lineNumber: 1414,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M3 9h6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                    lineNumber: 1415,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M15 9h6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                    lineNumber: 1416,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M3 15h6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                    lineNumber: 1417,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M15 15h6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                    lineNumber: 1418,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M9 3v6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                    lineNumber: 1419,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M9 15v6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                    lineNumber: 1420,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M15 3v6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                    lineNumber: 1421,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M15 15v6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                                    lineNumber: 1422,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                            lineNumber: 1412,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Zobrazit mřížku",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                            lineNumber: 1425,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                    lineNumber: 1411,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1410,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "py-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setGridOption('none');
                                                            setShowSettings(false);
                                                        },
                                                        className: "w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ".concat(gridOption === 'none' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'),
                                                        children: "Žádná mřížka"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1429,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setGridOption('major');
                                                            setShowSettings(false);
                                                        },
                                                        className: "w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ".concat(gridOption === 'major' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'),
                                                        children: "Hlavní mřížka"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1435,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setGridOption('minor');
                                                            setShowSettings(false);
                                                        },
                                                        className: "w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ".concat(gridOption === 'minor' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'),
                                                        children: "Vedlejší mřížka"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1441,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setGridOption('major-minor');
                                                            setShowSettings(false);
                                                        },
                                                        className: "w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ".concat(gridOption === 'major-minor' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'),
                                                        children: "Hlavní a vedlejší mřížka"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1447,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setGridOption('dot');
                                                            setShowSettings(false);
                                                        },
                                                        className: "w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ".concat(gridOption === 'dot' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'),
                                                        children: "Bodová mřížka"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                        lineNumber: 1453,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                                lineNumber: 1428,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                        lineNumber: 1409,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                lineNumber: 1389,
                                columnNumber: 13
                            }, this),
                            rulerVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$components$2f$DraggableRuler$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                x: rulerPosition.x,
                                y: rulerPosition.y,
                                rotation: rulerPosition.rotation,
                                length: rulerPosition.length,
                                onPositionChange: handleRulerPositionChange,
                                isActive: activeTool === 'ruler',
                                onActivate: ()=>setActiveTool('ruler'),
                                onUiBusyChange: setUiBusy
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                lineNumber: 1465,
                                columnNumber: 15
                            }, this),
                            triangleVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$components$2f$DraggableTriangle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                x: trianglePosition.x,
                                y: trianglePosition.y,
                                rotation: trianglePosition.rotation,
                                size: trianglePosition.size,
                                type: "45-45-90",
                                onPositionChange: handleTrianglePositionChange,
                                isActive: activeTool === 'triangle',
                                onActivate: ()=>setActiveTool('triangle'),
                                onUiBusyChange: setUiBusy
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                lineNumber: 1479,
                                columnNumber: 15
                            }, this),
                            protractorVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$components$2f$DraggableProtractor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                x: protractorPosition.x,
                                y: protractorPosition.y,
                                rotation: protractorPosition.rotation,
                                size: protractorPosition.size,
                                onPositionChange: handleProtractorPositionChange,
                                isActive: activeTool === 'protractor',
                                onActivate: ()=>setActiveTool('protractor'),
                                onUiBusyChange: setUiBusy
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                                lineNumber: 1494,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                        lineNumber: 1382,
                        columnNumber: 11
                    }, this),
                    feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 p-4 rounded-lg ".concat(feedback.includes('✅') ? 'bg-green-50 border-l-4 border-green-500' : 'bg-yellow-50 border-l-4 border-yellow-500'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-800",
                            children: feedback
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                            lineNumber: 1512,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                        lineNumber: 1509,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
                lineNumber: 1127,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
            lineNumber: 1126,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx",
        lineNumber: 1125,
        columnNumber: 5
    }, this);
}
_s(QuestionBasedTester, "GTU6wa0GeVmDT4rgS797Zrwn6nM=");
_c = QuestionBasedTester;
var _c;
__turbopack_context__.k.register(_c, "QuestionBasedTester");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/geometry_review/app/components/QuestionBasedTester.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=Documents_geometry_review_451e0bc8._.js.map