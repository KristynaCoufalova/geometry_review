(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
            if (this.suppressTracking) return;
            pts = this.definingPointsOf(obj);
            if (pts.length === 0) return;
            before = {};
            for (const p of pts)before[p.id] = this.posOf(p);
        };
        const onUp = ()=>{
            if (this.suppressTracking || !before || pts.length === 0) return;
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "moveStarts", new Map());
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
                this.createLineGrid(1.0, '#e5e7eb', 1);
                this.applyDot(false);
                break;
            case 'minor':
                this.createLineGrid(0.2, '#f3f4f6', 0.5);
                this.applyDot(false);
                break;
            case 'major-minor':
                this.createLineGrid(0.2, '#f3f4f6', 0.5);
                this.createLineGrid(1.0, '#d1d5db', 1);
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
        const bbox = this.board.getBoundingBox();
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
            this.gridLines.push(line);
        }
    }
    clearAll() {
        this.gridLines.forEach((line)=>{
            try {
                this.board.removeObject(line);
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "dotStep", void 0); // world units
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "container", void 0);
        this.board = board;
        this.gridLines = [];
        this.mode = 'none';
        this.dotStep = 0.5;
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
;
class GeometryFactory {
    /**
   * Get snap size based on grid mode
   */ getSnapSize(gridMode) {
        if (gridMode === 'none') return 0.25;
        if (gridMode === 'minor') return 0.1;
        return 0.25;
    }
    /**
   * Get EPS for finding nearby points based on grid mode
   */ getNearbyEps(gridMode) {
        let baseEps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.05;
        const snapSize = gridMode === 'none' ? 0.1 : gridMode === 'minor' ? 0.1 : 0.25;
        return Math.max(baseEps, snapSize * 0.8);
    }
    point(x, y) {
        let snap = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true, attrs = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
        const pt = this.board.create('point', [
            x,
            y
        ], {
            name: '',
            size: 2,
            strokeColor: '#444',
            fillColor: '#666',
            snapToGrid: snap,
            snapSizeX: 0.5,
            snapSizeY: 0.5,
            ...attrs
        });
        pt._rawName = '';
        return pt;
    }
    /**
   * Create a point with grid-aware snap settings
   */ pointWithGrid(x, y, gridMode) {
        let attrs = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
        const snap = gridMode !== 'none';
        const snapSize = this.getSnapSize(gridMode);
        return this.point(x, y, snap, {
            snapSizeX: snapSize,
            snapSizeY: snapSize,
            ...attrs
        });
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
"[project]/Documents/geometry_review/app/hooks/useBoardScale.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBoardScale",
    ()=>useBoardScale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useBoardScale(ref) {
    _s();
    const get = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useBoardScale.useCallback[get]": ()=>{
            var _ref_current;
            const box = (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.closest('.jxgbox');
            if (!box) return {
                pxPerUnitX: 50,
                pxPerUnitY: 50,
                uniformScale: 50
            } // fallback
            ;
            const { width: w, height: h } = box.getBoundingClientRect();
            // Must match your board bounding box:
            const left = -1, top = 8, right = 11, bottom = -1;
            const unitsX = right - left // 12
            ;
            const unitsY = top - bottom // 9
            ;
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
            const boardLeft = -1;
            const boardTop = 8;
            const boardRight = 11;
            const boardBottom = -1;
            const boardWidth = boardRight - boardLeft // 12
            ;
            const boardHeight = boardTop - boardBottom // 9
            ;
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
    }["DraggableRuler.useMemo[coordinateConverter]"], []);
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
                lineNumber: 286,
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
                    lineNumber: 301,
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
                                            lineNumber: 346,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "15%",
                                            stopColor: "rgba(255,255,255,0.4)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 347,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "30%",
                                            stopColor: "rgba(255,255,255,0.2)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 348,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "50%",
                                            stopColor: "rgba(240,245,250,0.1)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 349,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "70%",
                                            stopColor: "rgba(200,210,220,0.15)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 350,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "85%",
                                            stopColor: "rgba(150,160,170,0.2)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 351,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "rgba(100,110,120,0.25)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 352,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                    lineNumber: 345,
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
                                            lineNumber: 357,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "30%",
                                            stopColor: "rgba(255,255,255,0.4)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 358,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "60%",
                                            stopColor: "rgba(255,255,255,0.1)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 359,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "rgba(255,255,255,0)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 360,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                    lineNumber: 356,
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
                                            lineNumber: 365,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "50%",
                                            stopColor: "rgba(0,0,0,0.05)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 366,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "rgba(0,0,0,0.15)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 367,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                    lineNumber: 364,
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
                                            lineNumber: 372,
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
                                            lineNumber: 373,
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
                                            lineNumber: 374,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                    lineNumber: 371,
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
                                            lineNumber: 379,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                    in: "coloredBlur"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                                    lineNumber: 381,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                    in: "SourceGraphic"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 380,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                    lineNumber: 378,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                            lineNumber: 343,
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
                                    lineNumber: 390,
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
                                    lineNumber: 392,
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
                                    lineNumber: 394,
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
                                    lineNumber: 396,
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
                                    lineNumber: 398,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                            lineNumber: 388,
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
                                    lineNumber: 416,
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
                                            lineNumber: 433,
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
                                        lineNumber: 458,
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
                                    lineNumber: 472,
                                    columnNumber: 17
                                }, this));
                            }
                            return markings;
                        })()
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                    lineNumber: 337,
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
                            lineNumber: 498,
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
                            lineNumber: 520,
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
                        lineNumber: 555,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                    lineNumber: 542,
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
                        lineNumber: 572,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                    lineNumber: 559,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
            lineNumber: 336,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
        lineNumber: 321,
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
            const boardLeft = -1;
            const boardTop = 8;
            const boardRight = 11;
            const boardBottom = -1;
            const boardWidth = boardRight - boardLeft // 12
            ;
            const boardHeight = boardTop - boardBottom // 9
            ;
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
    }["DraggableTriangle.useMemo[coordinateConverter]"], []);
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
                lineNumber: 343,
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
                        lineNumber: 362,
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
                    lineNumber: 387,
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
                lineNumber: 401,
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
                lineNumber: 421,
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
                        lineNumber: 440,
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
                    lineNumber: 466,
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
                lineNumber: 480,
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
                    lineNumber: 494,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    transform: "translate(".concat(((_points_ = points[0]) === null || _points_ === void 0 ? void 0 : _points_.x) || 0, ",").concat(((_points_1 = points[0]) === null || _points_1 === void 0 ? void 0 : _points_1.y) || 0, ")"),
                    children: horizontalTicks
                }, void 0, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                    lineNumber: 497,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    transform: "translate(".concat(((_points_2 = points[0]) === null || _points_2 === void 0 ? void 0 : _points_2.x) || 0, ",").concat(((_points_3 = points[0]) === null || _points_3 === void 0 ? void 0 : _points_3.y) || 0, ")"),
                    children: verticalTicks
                }, void 0, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                    lineNumber: 502,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
            lineNumber: 492,
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
                                            lineNumber: 607,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "15%",
                                            stopColor: "rgba(255,255,255,0.4)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 608,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "30%",
                                            stopColor: "rgba(255,255,255,0.2)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 609,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "50%",
                                            stopColor: "rgba(240,245,250,0.1)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 610,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "70%",
                                            stopColor: "rgba(200,210,220,0.15)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 611,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "85%",
                                            stopColor: "rgba(150,160,170,0.2)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 612,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "rgba(100,110,120,0.25)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 613,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 606,
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
                                            lineNumber: 618,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "30%",
                                            stopColor: "rgba(255,255,255,0.4)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 619,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "60%",
                                            stopColor: "rgba(255,255,255,0.1)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 620,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "rgba(255,255,255,0)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 621,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 617,
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
                                            lineNumber: 626,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "50%",
                                            stopColor: "rgba(0,0,0,0.05)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 627,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "rgba(0,0,0,0.15)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 628,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 625,
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
                                            lineNumber: 633,
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
                                            lineNumber: 634,
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
                                            lineNumber: 635,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 632,
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
                                            lineNumber: 640,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                            in: "flood",
                                            in2: "SourceGraphic",
                                            operator: "in",
                                            result: "composite"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 641,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                            in: "composite",
                                            stdDeviation: "3",
                                            result: "blur"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 642,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feOffset", {
                                            in: "blur",
                                            dx: "2",
                                            dy: "2",
                                            result: "offset"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 643,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                            in: "offset",
                                            in2: "SourceGraphic",
                                            operator: "over"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 644,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 639,
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
                                            lineNumber: 649,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                            in: "flood",
                                            in2: "SourceGraphic",
                                            operator: "in",
                                            result: "composite"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 650,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                            in: "composite",
                                            stdDeviation: "5",
                                            result: "blur"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 651,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feOffset", {
                                            in: "blur",
                                            dx: "3",
                                            dy: "3",
                                            result: "offset"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 652,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                            in: "offset",
                                            in2: "SourceGraphic",
                                            operator: "over"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 653,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 648,
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
                                            lineNumber: 658,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                    in: "coloredBlur"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                                    lineNumber: 660,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                    in: "SourceGraphic"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                                    lineNumber: 661,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 659,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 657,
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
                                            lineNumber: 668,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: cut1,
                                            fill: "black"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 670,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: cut2,
                                            fill: "black"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 671,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 666,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 604,
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
                                    lineNumber: 678,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: pathData,
                                    fill: "url(#shadowGradient-".concat(type, ")"),
                                    mask: "url(#triangle-mask-".concat(type, ")")
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 680,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: pathData,
                                    fill: "url(#plasticGradient-".concat(type, ")"),
                                    mask: "url(#triangle-mask-".concat(type, ")")
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 682,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: pathData,
                                    fill: "url(#highlightGradient-".concat(type, ")"),
                                    mask: "url(#triangle-mask-".concat(type, ")")
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 684,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: pathData,
                                    fill: "none",
                                    stroke: "#000000",
                                    strokeWidth: "2.5"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 686,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 676,
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
                            lineNumber: 690,
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
                            lineNumber: 701,
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
                            lineNumber: 710,
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
                            lineNumber: 722,
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
                            lineNumber: 723,
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
                            lineNumber: 725,
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
                            lineNumber: 726,
                            columnNumber: 11
                        }, this),
                        renderRulerMarkingsSvg()
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                    lineNumber: 598,
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
                            lineNumber: 743,
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
                            lineNumber: 765,
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
                        lineNumber: 800,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                    lineNumber: 787,
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
                        lineNumber: 817,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                    lineNumber: 804,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
            lineNumber: 597,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
        lineNumber: 580,
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
    // Convert board coordinates to screen coordinates
    const boardToScreen = (boardX, boardY)=>{
        var _protractorRef_current;
        // Board bounding box: [-1, 8, 11, -1] (left, top, right, bottom)
        const boardLeft = -1;
        const boardTop = 8;
        const boardRight = 11;
        const boardBottom = -1;
        const boardWidth = boardRight - boardLeft // 12
        ;
        const boardHeight = boardTop - boardBottom // 9
        ;
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
        const boardLeft = -1;
        const boardTop = 8;
        const boardRight = 11;
        const boardBottom = -1;
        const boardWidth = boardRight - boardLeft;
        const boardHeight = boardTop - boardBottom;
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
                lineNumber: 299,
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
                    lineNumber: 317,
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
                                        lineNumber: 367,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                                    lineNumber: 366,
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
                                            lineNumber: 370,
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
                                            lineNumber: 372,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                                    lineNumber: 369,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                            lineNumber: 365,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: ringBandPath(R, innerR),
                            fill: "rgba(107,114,128,0.22)",
                            stroke: "none"
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                            lineNumber: 383,
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
                            lineNumber: 390,
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
                            lineNumber: 399,
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
                            lineNumber: 402,
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
                            lineNumber: 406,
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
                            lineNumber: 410,
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
                            lineNumber: 414,
                            columnNumber: 11
                        }, this),
                        generateMarkings()
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                    lineNumber: 354,
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
                        lineNumber: 435,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                    lineNumber: 422,
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
                        lineNumber: 452,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                    lineNumber: 439,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
            lineNumber: 353,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
        lineNumber: 338,
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
"[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GeometryConstructionTester
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/eraser.js [app-client] (ecmascript) <export default as Eraser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/ruler.js [app-client] (ecmascript) <export default as Ruler>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Triangle$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/triangle.js [app-client] (ecmascript) <export default as Triangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/gauge.js [app-client] (ecmascript) <export default as Gauge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$undo$2d$redo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/undo-redo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$board$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/board-manager.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$geometry$2d$factory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/geometry-factory.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$selection$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/selection-manager.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$rename$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/lib/rename-manager.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$components$2f$DraggableRuler$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/app/components/DraggableRuler.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$components$2f$DraggableTriangle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$components$2f$DraggableProtractor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
const EPS = 0.03;
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
function GeometryConstructionTester() {
    _s();
    const boardManagerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const undoRedoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const geometryFactoryRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selectionManagerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const renameMgrRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [tool, setTool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('mouse');
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [createdStack, setCreatedStack] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Physical tools state
    const [rulerVisible, setRulerVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [triangleVisible, setTriangleVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [protractorVisible, setProtractorVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rulerPosition, setRulerPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 5,
        y: 4,
        rotation: 0,
        length: 6
    });
    const [trianglePosition, setTrianglePosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 7,
        y: 4,
        rotation: 0,
        size: 3
    });
    const [protractorPosition, setProtractorPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 6,
        y: 3,
        rotation: 0,
        size: 3
    });
    const [activeTool, setActiveTool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [uiBusy, setUiBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Point naming state
    const [renameMode, setRenameMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedPointId, setSelectedPointId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [gridOption, setGridOption] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('major');
    const [canUndoState, setCanUndoState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [canRedoState, setCanRedoState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const toolRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(tool);
    const selectedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(selected);
    const uiBusyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(uiBusy);
    const renameModeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(renameMode);
    const handleClickRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Rename mode refs for down+up approach
    const renameArmRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        pt: null,
        wasFixed: false
    });
    const downPosRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GeometryConstructionTester.useEffect": ()=>{
            toolRef.current = tool;
        }
    }["GeometryConstructionTester.useEffect"], [
        tool
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GeometryConstructionTester.useEffect": ()=>{
            selectedRef.current = selected;
        }
    }["GeometryConstructionTester.useEffect"], [
        selected
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GeometryConstructionTester.useEffect": ()=>{
            uiBusyRef.current = uiBusy;
        }
    }["GeometryConstructionTester.useEffect"], [
        uiBusy
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GeometryConstructionTester.useEffect": ()=>{
            renameModeRef.current = renameMode;
        }
    }["GeometryConstructionTester.useEffect"], [
        renameMode
    ]);
    const givensRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    function pushCreated(obj) {
        if (obj === null || obj === void 0 ? void 0 : obj.id) setCreatedStack((s)=>[
                ...s,
                obj.id
            ]);
    }
    function getMouseCoords(brd, e) {
        const coords = brd.getUsrCoordsOfMouse(e);
        return {
            x: coords[0],
            y: coords[1]
        };
    }
    // "A_12" -> "A₁₂"
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
    // normalize and set the visible + raw name on a JSXGraph point
    const renamePoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GeometryConstructionTester.useCallback[renamePoint]": (pt, newName)=>{
            const trimmed = (newName || '').trim();
            const pretty = toSubscript(trimmed) // converts A_1 -> A₁
            ;
            pt.setAttribute({
                name: pretty,
                withLabel: !!trimmed
            });
            pt._rawName = trimmed; // keep searchable original
        // Removed pt.board.update() to prevent point attachment issues
        }
    }["GeometryConstructionTester.useCallback[renamePoint]"], []);
    // find a point under event (prefers non-fixed)
    function pointUnder(brd, e) {
        const under = brd.getAllObjectsUnderMouse(e);
        return under.find((o)=>o.elType === 'point') || null;
    }
    function isNameTaken(brd, raw, exceptId) {
        for(const k in brd.objects){
            const o = brd.objects[k];
            if (o.elType === 'point' && o.id !== exceptId) {
                var _o__rawName;
                if (((_o__rawName = o._rawName) !== null && _o__rawName !== void 0 ? _o__rawName : '') === raw) return true;
            }
        }
        return false;
    }
    function nearestFreePoint(brd, e) {
        const under = brd.getAllObjectsUnderMouse(e);
        const pt = under.find((o)=>o.elType === 'point' && !o.visProp.fixed);
        return pt || null;
    }
    const createPointSmart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GeometryConstructionTester.useCallback[createPointSmart]": (brd, xy)=>{
            const factory = geometryFactoryRef.current;
            if (!factory) return null;
            const { q } = givensRef.current;
            // If near given line q, create a glider via undo/redo
            if (pointOnLineXY(xy, q, 0.15)) {
                var _undoRedoRef_current;
                const op = (_undoRedoRef_current = undoRedoRef.current) === null || _undoRedoRef_current === void 0 ? void 0 : _undoRedoRef_current.createGliderOperation({
                    x: xy.x,
                    y: xy.y
                }, q, {
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
                if (op) {
                    var _undoRedoRef_current1, _op_createdIds;
                    (_undoRedoRef_current1 = undoRedoRef.current) === null || _undoRedoRef_current1 === void 0 ? void 0 : _undoRedoRef_current1.pushOperation(op);
                    updateUndoRedoState();
                    const gl = brd.objects[(_op_createdIds = op.createdIds) === null || _op_createdIds === void 0 ? void 0 : _op_createdIds[0]];
                    return gl !== null && gl !== void 0 ? gl : null;
                }
            }
            // Otherwise create normal point (grid-aware)
            const pt = factory.pointWithGrid(xy.x, xy.y, gridOption);
            pushCreated(pt);
            return pt;
        }
    }["GeometryConstructionTester.useCallback[createPointSmart]"], [
        gridOption
    ]);
    const handleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GeometryConstructionTester.useCallback[handleClick]": (brd, e)=>{
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
                        // Mouse tool - do nothing, just allow interaction without creating objects
                        // Check if clicking on a point and prevent default behavior
                        const under = brd.getAllObjectsUnderMouse(e);
                        const clickedPoint = under.find({
                            "GeometryConstructionTester.useCallback[handleClick].clickedPoint": (o)=>o.elType === 'point' && !o.visProp.fixed
                        }["GeometryConstructionTester.useCallback[handleClick].clickedPoint"]);
                        if (clickedPoint) {
                            // Prevent default JSXGraph behavior for points when using mouse tool
                            if (e.originalEvent) {
                                e.originalEvent.preventDefault();
                                e.originalEvent.stopPropagation();
                            }
                            setFeedback('Bod vybrán');
                        } else {
                            setFeedback('');
                        }
                        break;
                    }
                case 'point':
                    {
                        const p = createPointSmart(brd, xy);
                        if (p) setFeedback('Bod vytvořen');
                        break;
                    }
                case 'segment':
                    {
                        var _undoRedoRef_current, _undoRedoRef_current1;
                        const selectionMgr = selectionManagerRef.current;
                        if (!selectionMgr) break;
                        const first = selectionMgr.getFirst();
                        if (!first) {
                            var _undoRedoRef_current2;
                            (_undoRedoRef_current2 = undoRedoRef.current) === null || _undoRedoRef_current2 === void 0 ? void 0 : _undoRedoRef_current2.begin();
                            const p = createPointSmart(brd, xy);
                            if (!p) {
                                var _undoRedoRef_current3;
                                (_undoRedoRef_current3 = undoRedoRef.current) === null || _undoRedoRef_current3 === void 0 ? void 0 : _undoRedoRef_current3.commit();
                                break;
                            }
                            selectionMgr.select(p);
                            setFeedback('Klikněte na druhý bod');
                            break;
                        }
                        const a = first;
                        const b = createPointSmart(brd, xy);
                        if (!b) {
                            var _undoRedoRef_current4;
                            (_undoRedoRef_current4 = undoRedoRef.current) === null || _undoRedoRef_current4 === void 0 ? void 0 : _undoRedoRef_current4.commit();
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
                        const op = (_undoRedoRef_current = undoRedoRef.current) === null || _undoRedoRef_current === void 0 ? void 0 : _undoRedoRef_current.createSegmentOperation(p1, p2, attr);
                        if (op) {
                            var _undoRedoRef_current5;
                            op.pointIds = [
                                a.id,
                                b.id
                            ];
                            (_undoRedoRef_current5 = undoRedoRef.current) === null || _undoRedoRef_current5 === void 0 ? void 0 : _undoRedoRef_current5.pushOperation(op);
                        }
                        (_undoRedoRef_current1 = undoRedoRef.current) === null || _undoRedoRef_current1 === void 0 ? void 0 : _undoRedoRef_current1.commit();
                        updateUndoRedoState();
                        selectionMgr.clear();
                        setFeedback('Úsečka vytvořena');
                        break;
                    }
                case 'line':
                    {
                        var _undoRedoRef_current6, _undoRedoRef_current7;
                        const selectionMgr = selectionManagerRef.current;
                        if (!selectionMgr) break;
                        const first = selectionMgr.getFirst();
                        if (!first) {
                            var _undoRedoRef_current8;
                            (_undoRedoRef_current8 = undoRedoRef.current) === null || _undoRedoRef_current8 === void 0 ? void 0 : _undoRedoRef_current8.begin();
                            const p = createPointSmart(brd, xy);
                            if (!p) {
                                var _undoRedoRef_current9;
                                (_undoRedoRef_current9 = undoRedoRef.current) === null || _undoRedoRef_current9 === void 0 ? void 0 : _undoRedoRef_current9.commit();
                                break;
                            }
                            selectionMgr.select(p);
                            setFeedback('Klikněte na druhý bod');
                            break;
                        }
                        const a = first;
                        const b = createPointSmart(brd, xy);
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
                            strokeColor: '#059669',
                            strokeWidth: 1,
                            dash: 1
                        };
                        const op = (_undoRedoRef_current6 = undoRedoRef.current) === null || _undoRedoRef_current6 === void 0 ? void 0 : _undoRedoRef_current6.createLineOperation(p1, p2, attr);
                        if (op) {
                            var _undoRedoRef_current11;
                            op.pointIds = [
                                a.id,
                                b.id
                            ];
                            (_undoRedoRef_current11 = undoRedoRef.current) === null || _undoRedoRef_current11 === void 0 ? void 0 : _undoRedoRef_current11.pushOperation(op);
                        }
                        (_undoRedoRef_current7 = undoRedoRef.current) === null || _undoRedoRef_current7 === void 0 ? void 0 : _undoRedoRef_current7.commit();
                        updateUndoRedoState();
                        selectionMgr.clear();
                        setFeedback('Přímka vytvořena');
                        break;
                    }
                case 'circle':
                    {
                        var _undoRedoRef_current12, _undoRedoRef_current13;
                        const selectionMgr = selectionManagerRef.current;
                        if (!selectionMgr) break;
                        const first = selectionMgr.getFirst();
                        if (!first) {
                            var _undoRedoRef_current14;
                            (_undoRedoRef_current14 = undoRedoRef.current) === null || _undoRedoRef_current14 === void 0 ? void 0 : _undoRedoRef_current14.begin();
                            const c = createPointSmart(brd, xy);
                            if (!c) {
                                var _undoRedoRef_current15;
                                (_undoRedoRef_current15 = undoRedoRef.current) === null || _undoRedoRef_current15 === void 0 ? void 0 : _undoRedoRef_current15.commit();
                                break;
                            }
                            selectionMgr.select(c);
                            setFeedback('Klikněte na bod na kružnici');
                            break;
                        }
                        const c = first;
                        const p = createPointSmart(brd, xy);
                        if (!p) {
                            var _undoRedoRef_current16;
                            (_undoRedoRef_current16 = undoRedoRef.current) === null || _undoRedoRef_current16 === void 0 ? void 0 : _undoRedoRef_current16.commit();
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
                        const op = (_undoRedoRef_current12 = undoRedoRef.current) === null || _undoRedoRef_current12 === void 0 ? void 0 : _undoRedoRef_current12.createCircleOperation(center, on, attr);
                        if (op) {
                            var _undoRedoRef_current17;
                            op.pointIds = [
                                c.id,
                                p.id
                            ];
                            (_undoRedoRef_current17 = undoRedoRef.current) === null || _undoRedoRef_current17 === void 0 ? void 0 : _undoRedoRef_current17.pushOperation(op);
                        }
                        (_undoRedoRef_current13 = undoRedoRef.current) === null || _undoRedoRef_current13 === void 0 ? void 0 : _undoRedoRef_current13.commit();
                        updateUndoRedoState();
                        selectionMgr.clear();
                        setFeedback('Kružnice vytvořena');
                        break;
                    }
                case 'rubber':
                    {
                        const under = brd.getAllObjectsUnderMouse(e);
                        const toRemove = under.find({
                            "GeometryConstructionTester.useCallback[handleClick].toRemove": (o)=>{
                                var _o_visProp;
                                return !((_o_visProp = o.visProp) === null || _o_visProp === void 0 ? void 0 : _o_visProp.fixed) && o.name !== 'S' && o.name !== 'C';
                            }
                        }["GeometryConstructionTester.useCallback[handleClick].toRemove"]);
                        if (toRemove) {
                            var _undoRedoRef_current18;
                            const delOp = (_undoRedoRef_current18 = undoRedoRef.current) === null || _undoRedoRef_current18 === void 0 ? void 0 : _undoRedoRef_current18.createDeleteOperation(toRemove);
                            if (delOp) {
                                var _undoRedoRef_current19;
                                (_undoRedoRef_current19 = undoRedoRef.current) === null || _undoRedoRef_current19 === void 0 ? void 0 : _undoRedoRef_current19.pushOperation(delOp);
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
    }["GeometryConstructionTester.useCallback[handleClick]"], [
        createPointSmart
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GeometryConstructionTester.useEffect": ()=>{
            handleClickRef.current = handleClick;
        }
    }["GeometryConstructionTester.useEffect"], [
        handleClick
    ]);
    // Keyboard shortcuts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GeometryConstructionTester.useEffect": ()=>{
            const handleKeyPress = {
                "GeometryConstructionTester.useEffect.handleKeyPress": (e)=>{
                    if ((e.key === 'n' || e.key === 'N') && !uiBusyRef.current) {
                        setRenameMode({
                            "GeometryConstructionTester.useEffect.handleKeyPress": (v)=>!v
                        }["GeometryConstructionTester.useEffect.handleKeyPress"]);
                    }
                    if ((e.key === 'z' || e.key === 'Z') && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
                        var _undoRedoRef_current;
                        e.preventDefault();
                        (_undoRedoRef_current = undoRedoRef.current) === null || _undoRedoRef_current === void 0 ? void 0 : _undoRedoRef_current.undo();
                        updateUndoRedoState();
                    }
                    if ((e.key === 'z' || e.key === 'Z') && (e.ctrlKey || e.metaKey) && e.shiftKey) {
                        var _undoRedoRef_current1;
                        e.preventDefault();
                        (_undoRedoRef_current1 = undoRedoRef.current) === null || _undoRedoRef_current1 === void 0 ? void 0 : _undoRedoRef_current1.redo();
                        updateUndoRedoState();
                    }
                }
            }["GeometryConstructionTester.useEffect.handleKeyPress"];
            window.addEventListener('keydown', handleKeyPress);
            return ({
                "GeometryConstructionTester.useEffect": ()=>window.removeEventListener('keydown', handleKeyPress)
            })["GeometryConstructionTester.useEffect"];
        }
    }["GeometryConstructionTester.useEffect"], []);
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
            setTool('mouse'); // Automatically switch to mouse mode when activating ruler
        } else if (activeTool === 'ruler') {
            setActiveTool(null);
        }
    }
    function toggleTriangle() {
        setTriangleVisible(!triangleVisible);
        if (!triangleVisible) {
            setActiveTool('triangle');
            setTool('mouse'); // Automatically switch to mouse mode when activating triangle
        } else if (activeTool === 'triangle') {
            setActiveTool(null);
        }
    }
    function toggleProtractor() {
        setProtractorVisible(!protractorVisible);
        if (!protractorVisible) {
            setActiveTool('protractor');
            setTool('mouse'); // Automatically switch to mouse mode when activating protractor
        } else if (activeTool === 'protractor') {
            setActiveTool(null);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GeometryConstructionTester.useEffect": ()=>{
            if (!containerRef.current) return;
            // Create board manager
            const boardManager = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$board$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoardManager"]({
                container: containerRef.current,
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
                keepaspectratio: true
            });
            boardManagerRef.current = boardManager;
            const brd = boardManager.getBoard();
            // Geometry factory, selection, undo/redo
            geometryFactoryRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$geometry$2d$factory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GeometryFactory"](brd);
            selectionManagerRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$selection$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectionManager"]();
            undoRedoRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$undo$2d$redo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UndoRedoManager"]({
                board: brd,
                onFeedback: setFeedback,
                EPS
            });
            // Rename manager
            const renameMgr = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$lib$2f$rename$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RenameManager"](brd, {
                clickEps: 0.12,
                promptLabel: 'Název bodu (např. A, B, C, A_1, A_2):',
                eventGuard: {
                    "GeometryConstructionTester.useEffect": (ev)=>{
                        var _ev_originalEvent, _t_classList;
                        const t = ev === null || ev === void 0 ? void 0 : (_ev_originalEvent = ev.originalEvent) === null || _ev_originalEvent === void 0 ? void 0 : _ev_originalEvent.target;
                        if (t && (t.closest('.group') || ((_t_classList = t.classList) === null || _t_classList === void 0 ? void 0 : _t_classList.contains('group')))) return false;
                        return !uiBusyRef.current;
                    }
                }["GeometryConstructionTester.useEffect"],
                onRenamed: {
                    "GeometryConstructionTester.useEffect": (param)=>{
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
                }["GeometryConstructionTester.useEffect"]
            });
            renameMgrRef.current = renameMgr;
            // Down handler always forwards to our click logic
            const downHandler = {
                "GeometryConstructionTester.useEffect.downHandler": (e)=>{
                    var _handleClickRef_current;
                    (_handleClickRef_current = handleClickRef.current) === null || _handleClickRef_current === void 0 ? void 0 : _handleClickRef_current.call(handleClickRef, brd, e);
                }
            }["GeometryConstructionTester.useEffect.downHandler"];
            brd.on('down', downHandler);
            // Initialize givens
            const q = brd.create('line', [
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
            const S = brd.create('point', [
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
            const C = brd.create('point', [
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
            givensRef.current = {
                q,
                S,
                C
            };
            return ({
                "GeometryConstructionTester.useEffect": ()=>{
                    try {
                        brd.off('down', downHandler);
                    } catch (e) {}
                    try {
                        var _renameMgrRef_current;
                        (_renameMgrRef_current = renameMgrRef.current) === null || _renameMgrRef_current === void 0 ? void 0 : _renameMgrRef_current.destroy();
                    } catch (e) {}
                    renameMgrRef.current = null;
                    undoRedoRef.current = null;
                    geometryFactoryRef.current = null;
                    selectionManagerRef.current = null;
                    boardManager.free();
                    boardManagerRef.current = null;
                    givensRef.current = null;
                }
            })["GeometryConstructionTester.useEffect"];
        }
    }["GeometryConstructionTester.useEffect"], []);
    // Apply grid changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GeometryConstructionTester.useEffect": ()=>{
            var _boardManagerRef_current;
            (_boardManagerRef_current = boardManagerRef.current) === null || _boardManagerRef_current === void 0 ? void 0 : _boardManagerRef_current.setGridMode(gridOption);
        }
    }["GeometryConstructionTester.useEffect"], [
        gridOption
    ]);
    // Update event handlers when rename mode changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GeometryConstructionTester.useEffect": ()=>{
            const brd = boardRef.current;
            if (!brd) return;
            // Clean old handlers
            brd.off('down');
            brd.off('up');
            brd.off('dblclick');
            const CLICK_EPS = 0.12 // world units; tweak if needed
            ;
            const openPrompt = {
                "GeometryConstructionTester.useEffect.openPrompt": (pt, e)=>{
                    const currentRaw = pt._rawName || '';
                    var _window_prompt;
                    let proposed = ((_window_prompt = window.prompt('Název bodu (např. A, B, C, A_1, A_2):', currentRaw)) !== null && _window_prompt !== void 0 ? _window_prompt : '').trim();
                    if (proposed && isNameTaken(brd, proposed, pt.id)) {
                        let i = 2;
                        while(isNameTaken(brd, "".concat(proposed, "_").concat(i), pt.id))i++;
                        proposed = "".concat(proposed, "_").concat(i);
                    }
                    renamePoint(pt, proposed);
                    // Restore mobility
                    const arm = renameArmRef.current;
                    pt.setAttribute({
                        fixed: arm.wasFixed
                    });
                    // Stop further board interaction from this click
                    if (e === null || e === void 0 ? void 0 : e.originalEvent) {
                        e.originalEvent.stopPropagation();
                        e.originalEvent.preventDefault();
                    }
                    brd.update();
                    if (!proposed) setRenameMode(false);
                    // Clear arm
                    renameArmRef.current = {
                        pt: null,
                        wasFixed: false
                    };
                    downPosRef.current = null;
                }
            }["GeometryConstructionTester.useEffect.openPrompt"];
            // 1) DOWN: if in rename mode and on a point, FREEZE it and arm rename
            const downHandler = {
                "GeometryConstructionTester.useEffect.downHandler": (e)=>{
                    if (uiBusyRef.current) return;
                    // If not in rename mode, pass through to normal drawing handler
                    if (!renameModeRef.current) {
                        if (handleClickRef.current) handleClickRef.current(brd, e);
                        return;
                    }
                    const pt = pointUnder(brd, e);
                    if (!pt) return;
                    // Freeze now (before any drag begins)
                    const wasFixed = !!pt.visProp.fixed;
                    pt.setAttribute({
                        fixed: true
                    });
                    renameArmRef.current = {
                        pt,
                        wasFixed
                    };
                    downPosRef.current = getMouseCoords(brd, e);
                    // Kill default drag start
                    if (e.originalEvent) {
                        e.originalEvent.stopPropagation();
                        e.originalEvent.preventDefault();
                    }
                }
            }["GeometryConstructionTester.useEffect.downHandler"];
            // 2) UP: if we armed a point and movement was small → open prompt
            const upHandler = {
                "GeometryConstructionTester.useEffect.upHandler": (e)=>{
                    const arm = renameArmRef.current;
                    if (!arm.pt) return;
                    const up = getMouseCoords(brd, e);
                    const down = downPosRef.current || up;
                    const moved = Math.hypot(up.x - down.x, up.y - down.y);
                    // Only treat as rename if it was a click, not a drag
                    if (moved <= CLICK_EPS) {
                        openPrompt(arm.pt, e);
                        return;
                    }
                    // If it was a drag after all, restore the point & abort rename
                    const { pt } = arm;
                    pt.setAttribute({
                        fixed: arm.wasFixed
                    });
                    renameArmRef.current = {
                        pt: null,
                        wasFixed: false
                    };
                    downPosRef.current = null;
                }
            }["GeometryConstructionTester.useEffect.upHandler"];
            brd.on('down', downHandler);
            brd.on('up', upHandler);
            return ({
                "GeometryConstructionTester.useEffect": ()=>{
                    try {
                        brd.off('down', downHandler);
                        brd.off('up', upHandler);
                    } catch (e) {}
                }
            })["GeometryConstructionTester.useEffect"];
        }
    }["GeometryConstructionTester.useEffect"], [
        renameMode,
        renamePoint
    ]);
    function undoLast() {
        var _undoRedoRef_current;
        (_undoRedoRef_current = undoRedoRef.current) === null || _undoRedoRef_current === void 0 ? void 0 : _undoRedoRef_current.undo();
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
            if (!(o === null || o === void 0 ? void 0 : (_o_visProp = o.visProp) === null || _o_visProp === void 0 ? void 0 : _o_visProp.fixed) && o.name !== 'S' && o.name !== 'C' && o.name !== 'q') {
                toRemove.push(o);
            }
        }
        toRemove.forEach((o)=>brd.removeObject(o));
        setSelected([]);
        setFeedback('');
        setData(null);
        setCreatedStack([]);
    }
    function validateNow() {
        const brd = boardRef.current;
        const { q, S, C } = givensRef.current;
        const pts = Object.values(brd.objects).filter((o)=>o.elType === 'point');
        const getRaw = (p)=>{
            var _p__rawName, _ref;
            return (_ref = (_p__rawName = p === null || p === void 0 ? void 0 : p._rawName) !== null && _p__rawName !== void 0 ? _p__rawName : p === null || p === void 0 ? void 0 : p.name) !== null && _ref !== void 0 ? _ref : '';
        };
        const A = pts.find((p)=>getRaw(p) === 'A');
        const B = pts.find((p)=>getRaw(p) === 'B');
        if (!A || !B) {
            return {
                passed: false,
                message: 'Označte vrcholy A a B.',
                score: 0
            };
        }
        const AonQ = pointOnLineXY(coordsOfPoint(A), q, EPS);
        const BonQ = pointOnLineXY(coordsOfPoint(B), q, EPS);
        if (!(AonQ && BonQ)) {
            return {
                passed: false,
                message: 'A i B musí ležet na přímce q.',
                score: 1
            };
        }
        const AC = dist(coordsOfPoint(A), coordsOfPoint(C));
        const BC = dist(coordsOfPoint(B), coordsOfPoint(C));
        const isIso = Math.abs(AC - BC) < EPS;
        const SA = dist(coordsOfPoint(S), coordsOfPoint(A));
        const SB = dist(coordsOfPoint(S), coordsOfPoint(B));
        const SC = dist(coordsOfPoint(S), coordsOfPoint(C));
        const midOnAC = Math.abs(SA - SC) < EPS;
        const midOnBC = Math.abs(SB - SC) < EPS;
        if (!(isIso && (midOnAC || midOnBC))) {
            return {
                passed: false,
                message: 'Zkontrolujte: AC = BC a S je střed ramene.',
                score: 2
            };
        }
        const segs = Object.values(brd.objects).filter((o)=>o.elType === 'segment');
        const hasAB = segs.some((s)=>hasEndpoints(s, [
                A,
                B
            ]));
        const hasAC = segs.some((s)=>hasEndpoints(s, [
                A,
                C
            ]));
        const hasBC = segs.some((s)=>hasEndpoints(s, [
                B,
                C
            ]));
        if (!(hasAB && hasAC && hasBC)) {
            return {
                passed: true,
                message: 'Správně, ale chybí narýsované strany.',
                score: 3
            };
        }
        return {
            passed: true,
            message: '✅ Výborně! Podmínky splněny.',
            score: 3
        };
    }
    function saveConstruction() {
        var _boardManagerRef_current;
        const brd = (_boardManagerRef_current = boardManagerRef.current) === null || _boardManagerRef_current === void 0 ? void 0 : _boardManagerRef_current.getBoard();
        if (!brd) return;
        const validation = validateNow();
        setData({
            validation,
            timestamp: new Date().toISOString()
        });
        setFeedback(validation.message);
    }
    function updateUndoRedoState() {
        var _undoRedoRef_current, _undoRedoRef_current1;
        var _undoRedoRef_current_canUndo;
        setCanUndoState((_undoRedoRef_current_canUndo = (_undoRedoRef_current = undoRedoRef.current) === null || _undoRedoRef_current === void 0 ? void 0 : _undoRedoRef_current.canUndo()) !== null && _undoRedoRef_current_canUndo !== void 0 ? _undoRedoRef_current_canUndo : false);
        var _undoRedoRef_current_canRedo;
        setCanRedoState((_undoRedoRef_current_canRedo = (_undoRedoRef_current1 = undoRedoRef.current) === null || _undoRedoRef_current1 === void 0 ? void 0 : _undoRedoRef_current1.canRedo()) !== null && _undoRedoRef_current_canRedo !== void 0 ? _undoRedoRef_current_canRedo : false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg shadow-lg p-6 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-gray-800 mb-4",
                        children: "Úloha 9: Konstrukce trojúhelníku"
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                        lineNumber: 653,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-50 border-l-4 border-blue-500 p-4 mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-700",
                            children: "Sestrojte rovnoramenný trojúhelník ABC. Bod C je vrchol, S je střed ramene, AB leží na přímce q."
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                            lineNumber: 658,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                        lineNumber: 657,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2 mb-4 p-4 bg-gray-100 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTool('mouse'),
                                className: "px-3 py-2 rounded flex items-center gap-2 ".concat(tool === 'mouse' ? 'bg-gray-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'),
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
                                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                                lineNumber: 672,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M13 13l6 6"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                                lineNumber: 673,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                        lineNumber: 671,
                                        columnNumber: 15
                                    }, this),
                                    "Myš"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                lineNumber: 665,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTool('point'),
                                className: "px-3 py-2 rounded flex items-center gap-2 ".concat(tool === 'point' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                        lineNumber: 683,
                                        columnNumber: 15
                                    }, this),
                                    " Bod"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                lineNumber: 677,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTool('segment'),
                                className: "px-3 py-2 rounded flex items-center gap-2 ".concat(tool === 'segment' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                        lineNumber: 691,
                                        columnNumber: 15
                                    }, this),
                                    " Úsečka"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                lineNumber: 685,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTool('line'),
                                className: "px-3 py-2 rounded flex items-center gap-2 ".concat(tool === 'line' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                        lineNumber: 699,
                                        columnNumber: 15
                                    }, this),
                                    " Přímka"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                lineNumber: 693,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTool('circle'),
                                className: "px-3 py-2 rounded flex items-center gap-2 ".concat(tool === 'circle' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                        lineNumber: 707,
                                        columnNumber: 15
                                    }, this),
                                    " Kružnice"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                lineNumber: 701,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTool('rubber'),
                                className: "px-3 py-2 rounded flex items-center gap-2 ".concat(tool === 'rubber' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__["Eraser"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                        lineNumber: 715,
                                        columnNumber: 15
                                    }, this),
                                    " Guma"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                lineNumber: 709,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setRenameMode((v)=>!v),
                                className: "px-3 py-2 rounded flex items-center gap-2 ".concat(renameMode ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'),
                                title: "Přejmenovat bod (klikněte na bod)",
                                children: "✎ Název bodu"
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                lineNumber: 717,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-l-2 border-gray-300 mx-2"
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                lineNumber: 727,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleRuler,
                                className: "px-3 py-2 rounded flex items-center gap-2 ".concat(rulerVisible ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                        lineNumber: 735,
                                        columnNumber: 15
                                    }, this),
                                    " Pravítko"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                lineNumber: 729,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleTriangle,
                                className: "px-3 py-2 rounded flex items-center gap-2 ".concat(triangleVisible ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Triangle$3e$__["Triangle"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                        lineNumber: 743,
                                        columnNumber: 15
                                    }, this),
                                    " Trojúhelník"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                lineNumber: 737,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleProtractor,
                                className: "px-3 py-2 rounded flex items-center gap-2 ".concat(protractorVisible ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__["Gauge"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                        lineNumber: 751,
                                        columnNumber: 15
                                    }, this),
                                    " Úhloměr"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                lineNumber: 745,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1"
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                lineNumber: 754,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: undoLast,
                                disabled: !canUndoState,
                                className: "px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                        lineNumber: 761,
                                        columnNumber: 15
                                    }, this),
                                    " Zpět"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                lineNumber: 756,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: clearAll,
                                className: "px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                        lineNumber: 764,
                                        columnNumber: 15
                                    }, this),
                                    " Vymazat"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                lineNumber: 763,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: saveConstruction,
                                className: "px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                        lineNumber: 767,
                                        columnNumber: 15
                                    }, this),
                                    " Uložit"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                lineNumber: 766,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                        lineNumber: 664,
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
                            rulerVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$components$2f$DraggableRuler$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                x: rulerPosition.x,
                                y: rulerPosition.y,
                                rotation: rulerPosition.rotation,
                                length: rulerPosition.length,
                                onPositionChange: handleRulerPositionChange,
                                isActive: activeTool === 'ruler',
                                onActivate: ()=>{
                                    setActiveTool('ruler');
                                    setTool('mouse'); // Automatically switch to mouse mode when clicking ruler
                                },
                                onUiBusyChange: setUiBusy
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                lineNumber: 779,
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
                                onActivate: ()=>{
                                    setActiveTool('triangle');
                                    setTool('mouse'); // Automatically switch to mouse mode when clicking triangle
                                },
                                onUiBusyChange: setUiBusy
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                lineNumber: 796,
                                columnNumber: 15
                            }, this),
                            protractorVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$components$2f$DraggableProtractor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                x: protractorPosition.x,
                                y: protractorPosition.y,
                                rotation: protractorPosition.rotation,
                                size: protractorPosition.size,
                                onPositionChange: handleProtractorPositionChange,
                                isActive: activeTool === 'protractor',
                                onActivate: ()=>{
                                    setActiveTool('protractor');
                                    setTool('mouse'); // Automatically switch to mouse mode when clicking protractor
                                },
                                onUiBusyChange: setUiBusy
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                                lineNumber: 814,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                        lineNumber: 771,
                        columnNumber: 11
                    }, this),
                    feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 p-4 rounded-lg ".concat(feedback.includes('✅') ? 'bg-green-50 border-l-4 border-green-500' : 'bg-yellow-50 border-l-4 border-yellow-500'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-800",
                            children: feedback
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                            lineNumber: 835,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                        lineNumber: 832,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
                lineNumber: 652,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
            lineNumber: 651,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/geometry_review/app/components/GeometryConstructionTester.tsx",
        lineNumber: 650,
        columnNumber: 5
    }, this);
}
_s(GeometryConstructionTester, "BT+YgzxQlCQRk3yQ7KJxdYyfKNE=");
_c = GeometryConstructionTester;
var _c;
__turbopack_context__.k.register(_c, "GeometryConstructionTester");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_geometry_review_07f35fbf._.js.map