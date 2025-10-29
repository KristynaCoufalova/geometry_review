module.exports = [
"[project]/Documents/geometry_review/app/hooks/useBoardScale.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBoardScale",
    ()=>useBoardScale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useBoardScale(ref) {
    const get = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const box = ref.current?.closest('.jxgbox');
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
    }, [
        ref
    ]);
    return get;
}
}),
"[project]/Documents/geometry_review/app/components/DraggableRuler.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DraggableRuler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$hooks$2f$useBoardScale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/app/hooks/useBoardScale.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function DraggableRuler({ x, y, rotation, length, onPositionChange, isActive, onActivate, onUiBusyChange }) {
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isRotating, setIsRotating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isResizing, setIsResizing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isHovering, setIsHovering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dragStart, setDragStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [rotationStart, setRotationStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        rotation: 0,
        initialAngle: 0
    });
    const [resizeStart, setResizeStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        length: 0
    });
    const rulerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const getScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$hooks$2f$useBoardScale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBoardScale"])(rulerRef);
    const { pxPerUnitX, pxPerUnitY } = getScale();
    const pxPerUnit = Math.min(pxPerUnitX, pxPerUnitY);
    // Memoized coordinate conversion functions for better performance
    const coordinateConverter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const boardLeft = -1;
        const boardTop = 8;
        const boardRight = 11;
        const boardBottom = -1;
        const boardWidth = boardRight - boardLeft // 12
        ;
        const boardHeight = boardTop - boardBottom // 9
        ;
        return {
            boardToScreen: (boardX, boardY)=>{
                // Get actual container dimensions
                const container = rulerRef.current?.closest('.jxgbox');
                const containerWidth = container?.offsetWidth || 800;
                const containerHeight = container?.offsetHeight || 500;
                const screenX = (boardX - boardLeft) / boardWidth * containerWidth;
                const screenY = containerHeight - (boardY - boardBottom) / boardHeight * containerHeight;
                return {
                    x: screenX,
                    y: screenY
                };
            },
            screenToBoard: (screenX, screenY)=>{
                const container = rulerRef.current?.closest('.jxgbox');
                const containerWidth = container?.offsetWidth || 800;
                const containerHeight = container?.offsetHeight || 500;
                const boardX = screenX / containerWidth * boardWidth + boardLeft;
                const boardY = boardTop - screenY / containerHeight * boardHeight;
                return {
                    x: boardX,
                    y: boardY
                };
            }
        };
    }, []);
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
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
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
    }, [
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
    const handleTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
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
    }, [
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
    const handleMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsDragging(false);
        setIsRotating(false);
        setIsResizing(false);
        onUiBusyChange(false);
    }, [
        onUiBusyChange
    ]);
    const handleTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsDragging(false);
        setIsRotating(false);
        setIsResizing(false);
        onUiBusyChange(false);
    }, [
        onUiBusyChange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isDragging || isRotating || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove, {
                passive: false
            });
            document.addEventListener('touchend', handleTouchEnd);
            return ()=>{
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('touchmove', handleTouchMove, {
                    passive: false
                });
                document.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [
        isDragging,
        isRotating,
        isResizing,
        handleMouseMove,
        handleTouchMove,
        handleMouseUp,
        handleTouchEnd
    ]);
    // ResizeObserver to handle container size changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = rulerRef.current?.closest('.jxgbox');
        if (!el) return;
        const ro = new ResizeObserver(()=>{
            // Force a light refresh by updating dragStart state
            setDragStart((s)=>({
                    ...s
                }));
        });
        ro.observe(el);
        return ()=>ro.disconnect();
    }, []);
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
            markings.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute w-[1px] ${height} bg-black transition-all duration-200`,
                style: {
                    left: position,
                    top: -1,
                    transform: 'translateX(-50%)',
                    opacity
                }
            }, `mark-${i}`, false, {
                fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                lineNumber: 286,
                columnNumber: 9
            }, this));
            // Add labels for major marks (every 1 unit)
            if (isMajor && unitValue > 0) {
                markings.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute text-[10px] text-slate-600 font-medium tracking-tight",
                    style: {
                        left: position,
                        top: -16,
                        transform: 'translateX(-50%)',
                        fontFeatureSettings: '"tnum"'
                    },
                    children: unitValue
                }, `label-${i}`, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                    lineNumber: 301,
                    columnNumber: 11
                }, this));
            }
        }
        return markings;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: rulerRef,
        className: `absolute select-none group ${isActive ? 'z-50' : 'z-40'}`,
        style: {
            left: screenPos.x,
            top: screenPos.y,
            transform: `rotate(${rotation}deg)`,
            transformOrigin: '0 0'
        },
        onMouseDown: handleMouseDown,
        onTouchStart: handleTouchStart,
        onMouseEnter: ()=>setIsHovering(true),
        onMouseLeave: ()=>setIsHovering(false),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            style: {
                pointerEvents: 'none'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: length * pxPerUnit + 100,
                    height: 40,
                    className: "absolute",
                    style: {
                        left: -50,
                        top: -10,
                        pointerEvents: 'auto'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "rulerPlasticGradient",
                                    x1: "0%",
                                    y1: "0%",
                                    x2: "100%",
                                    y2: "100%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "rgba(255,255,255,0.6)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 346,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "15%",
                                            stopColor: "rgba(255,255,255,0.4)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 347,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "30%",
                                            stopColor: "rgba(255,255,255,0.2)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 348,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "50%",
                                            stopColor: "rgba(240,245,250,0.1)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 349,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "70%",
                                            stopColor: "rgba(200,210,220,0.15)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 350,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "85%",
                                            stopColor: "rgba(150,160,170,0.2)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 351,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "rulerHighlightGradient",
                                    x1: "0%",
                                    y1: "0%",
                                    x2: "60%",
                                    y2: "40%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "rgba(255,255,255,0.8)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 357,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "30%",
                                            stopColor: "rgba(255,255,255,0.4)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 358,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "60%",
                                            stopColor: "rgba(255,255,255,0.1)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 359,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "rulerShadowGradient",
                                    x1: "0%",
                                    y1: "0%",
                                    x2: "100%",
                                    y2: "100%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "rgba(0,0,0,0)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 365,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "50%",
                                            stopColor: "rgba(0,0,0,0.05)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 366,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: "rulerSoftShadow",
                                    x: "-50%",
                                    y: "-50%",
                                    width: "200%",
                                    height: "200%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: "rulerGlow",
                                    x: "-50%",
                                    y: "-50%",
                                    width: "200%",
                                    height: "200%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                            stdDeviation: "3",
                                            result: "coloredBlur"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                            lineNumber: 379,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                    in: "coloredBlur"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                                    lineNumber: 381,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            filter: isActive ? "url(#rulerGlow)" : "url(#rulerSoftShadow)",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
                                markings.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: x - 0.5,
                                    y: 10,
                                    width: 1,
                                    height: majorLen,
                                    fill: "#000"
                                }, `cm-${cm}`, false, {
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
                                        markings.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: xx - 0.25,
                                            y: 10,
                                            width: 0.5,
                                            height: mmLen,
                                            fill: "#000",
                                            opacity: "0.75"
                                        }, `mm-${cm}-${mm}`, false, {
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
                                    markings.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: xx - 0.25,
                                        y: 10,
                                        width: 0.5,
                                        height: mmLen,
                                        fill: "#000",
                                        opacity: "0.75"
                                    }, `mm-final-${mm}`, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                                        lineNumber: 458,
                                        columnNumber: 19
                                    }, this));
                                }
                                // Add final marking at exact length value
                                markings.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: finalX - 0.5,
                                    y: 10,
                                    width: 1,
                                    height: 12,
                                    fill: "#000"
                                }, `cm-final`, false, {
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
                        numbers.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        }, `ruler-number-${cm}`, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                            lineNumber: 498,
                            columnNumber: 15
                        }, this));
                    }
                    // Add final number at exact length value (only if not a whole number)
                    if (length % 1 !== 0) {
                        const finalX = length * pxPerCm;
                        numbers.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        }, `ruler-number-final`, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableRuler.tsx",
                            lineNumber: 520,
                            columnNumber: 15
                        }, this));
                    }
                    return numbers;
                })(),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
}),
"[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DraggableTriangle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$hooks$2f$useBoardScale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/app/hooks/useBoardScale.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function DraggableTriangle({ x, y, rotation, size, type, onPositionChange, isActive, onActivate, onUiBusyChange }) {
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isRotating, setIsRotating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isResizing, setIsResizing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isHovering, setIsHovering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dragStart, setDragStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [rotationStart, setRotationStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        rotation: 0,
        initialAngle: 0
    });
    const [resizeStart, setResizeStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        size: 0
    });
    const triangleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const getScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$hooks$2f$useBoardScale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBoardScale"])(triangleRef);
    const { pxPerUnitX, pxPerUnitY } = getScale();
    const pxPerUnit = Math.min(pxPerUnitX, pxPerUnitY);
    // Memoized coordinate conversion functions for better performance
    const coordinateConverter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const boardLeft = -1;
        const boardTop = 8;
        const boardRight = 11;
        const boardBottom = -1;
        const boardWidth = boardRight - boardLeft // 12
        ;
        const boardHeight = boardTop - boardBottom // 9
        ;
        return {
            boardToScreen: (boardX, boardY)=>{
                // Get actual container dimensions
                const container = triangleRef.current?.closest('.jxgbox');
                const containerWidth = container?.offsetWidth || 800;
                const containerHeight = container?.offsetHeight || 500;
                const screenX = (boardX - boardLeft) / boardWidth * containerWidth;
                const screenY = containerHeight - (boardY - boardBottom) / boardHeight * containerHeight;
                return {
                    x: screenX,
                    y: screenY
                };
            },
            screenToBoard: (screenX, screenY)=>{
                const container = triangleRef.current?.closest('.jxgbox');
                const containerWidth = container?.offsetWidth || 800;
                const containerHeight = container?.offsetHeight || 500;
                const boardX = screenX / containerWidth * boardWidth + boardLeft;
                const boardY = boardTop - screenY / containerHeight * boardHeight;
                return {
                    x: boardX,
                    y: boardY
                };
            }
        };
    }, []);
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
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
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
    }, [
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
    const handleTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
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
    }, [
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
    const handleMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsDragging(false);
        setIsRotating(false);
        setIsResizing(false);
        onUiBusyChange(false);
    }, [
        onUiBusyChange
    ]);
    const handleTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsDragging(false);
        setIsRotating(false);
        setIsResizing(false);
        onUiBusyChange(false);
    }, [
        onUiBusyChange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isDragging || isRotating || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove, {
                passive: false
            });
            document.addEventListener('touchend', handleTouchEnd);
            return ()=>{
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('touchmove', handleTouchMove, {
                    passive: false
                });
                document.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [
        isDragging,
        isRotating,
        isResizing,
        handleMouseMove,
        handleTouchMove,
        handleMouseUp,
        handleTouchEnd
    ]);
    // ResizeObserver to handle container size changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = triangleRef.current?.closest('.jxgbox');
        if (!el) return;
        const ro = new ResizeObserver(()=>{
            // Force a light refresh by updating dragStart state
            setDragStart((s)=>({
                    ...s
                }));
        });
        ro.observe(el);
        return ()=>ro.disconnect();
    }, []);
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
            horizontalTicks.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: x - 0.75,
                y: 0,
                width: 1.5,
                height: majorLen,
                fill: "#000"
            }, `h-cm-${cm}`, false, {
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
                    horizontalTicks.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: xx - 0.5,
                        y: 0,
                        width: 1,
                        height: mmLen,
                        fill: "#000",
                        opacity: "0.75"
                    }, `h-mm-${cm}-${mm}`, false, {
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
                horizontalTicks.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: xx - 0.5,
                    y: 0,
                    width: 1,
                    height: mmLen,
                    fill: "#000",
                    opacity: "0.75"
                }, `h-mm-final-${mm}`, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                    lineNumber: 387,
                    columnNumber: 11
                }, this));
            }
            // Add final marking at exact size value
            horizontalTicks.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: finalX - 0.75,
                y: 0,
                width: 1.5,
                height: 12,
                fill: "#000"
            }, `h-cm-final`, false, {
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
            verticalTicks.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: -majorLen,
                y: y - 0.75,
                width: majorLen,
                height: 1.5,
                fill: "#000"
            }, `v-cm-${cm}`, false, {
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
                    verticalTicks.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: -mmLen,
                        y: yy - 0.5,
                        width: mmLen,
                        height: 1,
                        fill: "#000",
                        opacity: "0.75"
                    }, `v-mm-${cm}-${mm}`, false, {
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
                verticalTicks.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: -mmLen,
                    y: yy - 0.5,
                    width: mmLen,
                    height: 1,
                    fill: "#000",
                    opacity: "0.75"
                }, `v-mm-final-${mm}`, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                    lineNumber: 466,
                    columnNumber: 11
                }, this));
            }
            // Add final marking at exact height value
            verticalTicks.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: -12,
                y: finalY - 0.75,
                width: 12,
                height: 1.5,
                fill: "#000"
            }, `v-cm-final`, false, {
                fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                lineNumber: 480,
                columnNumber: 9
            }, this));
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    transform: `translate(${points[0]?.x || 0},${points[0]?.y || 0})`,
                    children: horizontalTicks
                }, void 0, false, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                    lineNumber: 497,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    transform: `translate(${points[0]?.x || 0},${points[0]?.y || 0})`,
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
    const pathData = `M ${points[0]?.x || 0} ${points[0]?.y || 0} L ${points[1]?.x || 0} ${points[1]?.y || 0} L ${points[2]?.x || 0} ${points[2]?.y || 0} Z`;
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
        x: points[0]?.x || 0,
        y: points[0]?.y || 0
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
    const cut1 = `M ${a1.x} ${a1.y} L ${b1.x} ${b1.y} L ${c1.x} ${c1.y} Z`;
    // Second cutout is mirror image of the first across the diagonal (perfect symmetry)
    const a2r = reflectAcrossDiagonal(a1.x, a1.y);
    const b2r = reflectAcrossDiagonal(b1.x, b1.y);
    const c2r = reflectAcrossDiagonal(c1.x, c1.y);
    const cut2 = `M ${a2r.x} ${a2r.y} L ${b2r.x} ${b2r.y} L ${c2r.x} ${c2r.y} Z`;
    // Diagonal from right-angle vertex to the midpoint of the hypotenuse
    const hypMid = {
        x: ((points[1]?.x || 0) + (points[2]?.x || 0)) / 2,
        y: ((points[1]?.y || 0) + (points[2]?.y || 0)) / 2
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: triangleRef,
        className: `absolute select-none group ${isActive ? 'z-50' : 'z-40'}`,
        style: {
            left: screenPos.x,
            top: screenPos.y,
            transform: `rotate(${rotation}deg)`,
            transformOrigin: '0 0',
            // Debug: add background to see hover area
            backgroundColor: isHovering ? 'rgba(255, 0, 0, 0.1)' : 'transparent'
        },
        onMouseDown: handleMouseDown,
        onTouchStart: handleTouchStart,
        onMouseEnter: ()=>setIsHovering(true),
        onMouseLeave: ()=>setIsHovering(false),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            style: {
                pointerEvents: 'auto'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: size * pxPerUnit + 100,
                    height: type === '45-45-90' ? size * pxPerUnit + 100 : size * pxPerUnit * Math.sqrt(3) / 2 + 100,
                    className: "absolute",
                    style: {
                        left: -50,
                        top: -50,
                        pointerEvents: 'auto'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: `plasticGradient-${type}`,
                                    x1: "0%",
                                    y1: "0%",
                                    x2: "100%",
                                    y2: "100%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "rgba(255,255,255,0.6)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 607,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "15%",
                                            stopColor: "rgba(255,255,255,0.4)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 608,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "30%",
                                            stopColor: "rgba(255,255,255,0.2)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 609,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "50%",
                                            stopColor: "rgba(240,245,250,0.1)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 610,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "70%",
                                            stopColor: "rgba(200,210,220,0.15)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 611,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "85%",
                                            stopColor: "rgba(150,160,170,0.2)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 612,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: `highlightGradient-${type}`,
                                    x1: "0%",
                                    y1: "0%",
                                    x2: "60%",
                                    y2: "40%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "rgba(255,255,255,0.8)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 618,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "30%",
                                            stopColor: "rgba(255,255,255,0.4)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 619,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "60%",
                                            stopColor: "rgba(255,255,255,0.1)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 620,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: `shadowGradient-${type}`,
                                    x1: "0%",
                                    y1: "0%",
                                    x2: "100%",
                                    y2: "100%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "rgba(0,0,0,0)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 626,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "50%",
                                            stopColor: "rgba(0,0,0,0.05)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 627,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: `softShadow-${type}`,
                                    x: "-50%",
                                    y: "-50%",
                                    width: "200%",
                                    height: "200%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: `innerShadow-${type}`,
                                    x: "-50%",
                                    y: "-50%",
                                    width: "200%",
                                    height: "200%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feFlood", {
                                            floodColor: "#000",
                                            floodOpacity: "0.2",
                                            result: "flood"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 640,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                            in: "flood",
                                            in2: "SourceGraphic",
                                            operator: "in",
                                            result: "composite"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 641,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                            in: "composite",
                                            stdDeviation: "3",
                                            result: "blur"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 642,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feOffset", {
                                            in: "blur",
                                            dx: "2",
                                            dy: "2",
                                            result: "offset"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 643,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: `deepInnerShadow-${type}`,
                                    x: "-50%",
                                    y: "-50%",
                                    width: "200%",
                                    height: "200%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feFlood", {
                                            floodColor: "#000",
                                            floodOpacity: "0.15",
                                            result: "flood"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 649,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                            in: "flood",
                                            in2: "SourceGraphic",
                                            operator: "in",
                                            result: "composite"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 650,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                            in: "composite",
                                            stdDeviation: "5",
                                            result: "blur"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 651,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feOffset", {
                                            in: "blur",
                                            dx: "3",
                                            dy: "3",
                                            result: "offset"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 652,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: `glow-${type}`,
                                    x: "-50%",
                                    y: "-50%",
                                    width: "200%",
                                    height: "200%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                            stdDeviation: "3",
                                            result: "coloredBlur"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 658,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                    in: "coloredBlur"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                                    lineNumber: 660,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mask", {
                                    id: `triangle-mask-${type}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: pathData,
                                            fill: "white"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 668,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: cut1,
                                            fill: "black"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                            lineNumber: 670,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            filter: isActive ? `url(#glow-${type})` : `url(#softShadow-${type})`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: pathData,
                                    fill: "rgba(240,245,250,0.25)",
                                    mask: `url(#triangle-mask-${type})`
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 678,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: pathData,
                                    fill: `url(#shadowGradient-${type})`,
                                    mask: `url(#triangle-mask-${type})`
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 680,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: pathData,
                                    fill: `url(#plasticGradient-${type})`,
                                    mask: `url(#triangle-mask-${type})`
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 682,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: pathData,
                                    fill: `url(#highlightGradient-${type})`,
                                    mask: `url(#triangle-mask-${type})`
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                                    lineNumber: 684,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `M ${(points[0]?.x || 0) + 6} ${points[0]?.y || 0} L ${(points[0]?.x || 0) + 6} ${(points[0]?.y || 0) + 6} L ${points[0]?.x || 0} ${(points[0]?.y || 0) + 6}`,
                            fill: "none",
                            stroke: "#000000",
                            strokeWidth: "1.2",
                            strokeLinecap: "round"
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 701,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            x: (points[0]?.x || 0) + 10,
                            y: (points[0]?.y || 0) + 3,
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: cut1,
                            fill: "none",
                            stroke: "#000000",
                            strokeWidth: "1.2",
                            filter: `url(#deepInnerShadow-${type})`
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 722,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: cut2,
                            fill: "none",
                            stroke: "#000000",
                            strokeWidth: "1.2",
                            filter: `url(#deepInnerShadow-${type})`
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 723,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: cut1,
                            fill: "none",
                            stroke: "#000000",
                            strokeWidth: "1.2",
                            filter: `url(#innerShadow-${type})`
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 725,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: cut2,
                            fill: "none",
                            stroke: "#000000",
                            strokeWidth: "1.2",
                            filter: `url(#innerShadow-${type})`
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
                        numbers.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        }, `h-number-${cm}`, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 743,
                            columnNumber: 15
                        }, this));
                    }
                    // Add final number at exact size value (only if not a whole number)
                    if (size % 1 !== 0) {
                        const finalX = size * pxPerCm;
                        numbers.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        }, `h-number-final`, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx",
                            lineNumber: 765,
                            columnNumber: 15
                        }, this));
                    }
                    return numbers;
                })(),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rotation-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-emerald-500 shadow-md flex items-center justify-center transition-opacity duration-200",
                    style: {
                        pointerEvents: 'auto',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                        opacity: isHovering ? 1 : 0,
                        left: `${1.35 * hypMidX - 50 - basePx * 0.2}px`,
                        top: `${1.35 * hypMidY - 50 - heightPx * 0.2}px`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 20
                    },
                    title: "Otočit trojúhelník",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "resize-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-amber-500 shadow-md flex items-center justify-center transition-opacity duration-200",
                    style: {
                        pointerEvents: 'auto',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                        opacity: isHovering ? 1 : 0,
                        left: `${0.6 * hypMidX - 50 + basePx * 0.2}px`,
                        top: `${0.6 * hypMidY - 50 + heightPx * 0.2}px`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 15
                    },
                    title: "Změnit velikost",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
}),
"[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DraggableProtractor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$hooks$2f$useBoardScale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/app/hooks/useBoardScale.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function DraggableProtractor({ x, y, rotation, size, onPositionChange, isActive, onActivate, onUiBusyChange }) {
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isRotating, setIsRotating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isResizing, setIsResizing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isHovering, setIsHovering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dragStart, setDragStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [rotationStart, setRotationStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        rotation: 0
    });
    const [resizeStart, setResizeStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        size: 0
    });
    const protractorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const getScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$hooks$2f$useBoardScale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBoardScale"])(protractorRef);
    const { pxPerUnitX, pxPerUnitY } = getScale();
    const pxPerUnit = Math.min(pxPerUnitX, pxPerUnitY);
    // Convert board coordinates to screen coordinates
    const boardToScreen = (boardX, boardY)=>{
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
        const container = protractorRef.current?.closest('.jxgbox');
        const containerWidth = container?.offsetWidth || 800;
        const containerHeight = container?.offsetHeight || 500;
        const screenX = (boardX - boardLeft) / boardWidth * containerWidth;
        const screenY = containerHeight - (boardY - boardBottom) / boardHeight * containerHeight;
        return {
            x: screenX,
            y: screenY
        };
    };
    const screenToBoard = (screenX, screenY)=>{
        const boardLeft = -1;
        const boardTop = 8;
        const boardRight = 11;
        const boardBottom = -1;
        const boardWidth = boardRight - boardLeft;
        const boardHeight = boardTop - boardBottom;
        const container = protractorRef.current?.closest('.jxgbox');
        const containerWidth = container?.offsetWidth || 800;
        const containerHeight = container?.offsetHeight || 500;
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
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
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
    }, [
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
    const handleTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
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
    }, [
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
    const handleMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsDragging(false);
        setIsRotating(false);
        setIsResizing(false);
        onUiBusyChange(false);
    }, [
        onUiBusyChange
    ]);
    const handleTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsDragging(false);
        setIsRotating(false);
        setIsResizing(false);
        onUiBusyChange(false);
    }, [
        onUiBusyChange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isDragging || isRotating || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove, {
                passive: false
            });
            document.addEventListener('touchend', handleTouchEnd);
            return ()=>{
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('touchmove', handleTouchMove, {
                    passive: false
                });
                document.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [
        isDragging,
        isRotating,
        isResizing,
        handleMouseMove,
        handleTouchMove,
        handleMouseUp,
        handleTouchEnd
    ]);
    // ResizeObserver to handle container size changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = protractorRef.current?.closest('.jxgbox');
        if (!el) return;
        const ro = new ResizeObserver(()=>{
            // Force a light refresh by updating dragStart state
            setDragStart((s)=>({
                    ...s
                }));
        });
        ro.observe(el);
        return ()=>ro.disconnect();
    }, []);
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
    const uid = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>Math.random().toString(36).slice(2), []);
    const arc = (rad)=>`M ${centerX - rad} ${centerY} A ${rad} ${rad} 0 0 1 ${centerX + rad} ${centerY}`;
    // Returns a closed path for the grey ring band between radii R and r (r < R), 0..180°
    const ringBandPath = (R, r)=>{
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
            markings.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                stroke: "#374151",
                strokeWidth: strokeWidth
            }, `mark-${angle}`, false, {
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
                markings.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
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
                }, `label-${angle}`, true, {
                    fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                    lineNumber: 317,
                    columnNumber: 11
                }, this));
            }
        }
        return markings;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: protractorRef,
        className: `absolute select-none group ${isActive ? 'z-50' : 'z-40'}`,
        style: {
            left: screenPos.x,
            top: screenPos.y,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            transformOrigin: '50% 50%'
        },
        onMouseDown: handleMouseDown,
        onTouchStart: handleTouchStart,
        onMouseEnter: ()=>setIsHovering(true),
        onMouseLeave: ()=>setIsHovering(false),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            style: {
                pointerEvents: 'auto'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: size * pxPerUnit * 2.6,
                    height: size * pxPerUnit * 2.4,
                    className: "absolute",
                    style: {
                        left: -size * pxPerUnit * 1.3,
                        top: -size * pxPerUnit * 1.2,
                        pointerEvents: 'auto'
                    },
                    viewBox: `0 0 ${size * pxPerUnit * 2.6} ${size * pxPerUnit * 1.4}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: "protractorShadow",
                                    x: "-20%",
                                    y: "-20%",
                                    width: "140%",
                                    height: "140%",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mask", {
                                    id: `innerArcMask-${uid}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            width: "100%",
                                            height: "100%",
                                            fill: "white"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                                            lineNumber: 370,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: ringBandPath(R, innerR),
                            fill: "rgba(107,114,128,0.22)",
                            stroke: "none"
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                            lineNumber: 383,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `M ${centerX - innerR} ${centerY} A ${innerR} ${innerR} 0 0 1 ${centerX + innerR} ${centerY} Z`,
                            fill: "none",
                            stroke: "#000000",
                            strokeWidth: "1",
                            mask: `url(#innerArcMask-${uid})`
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx",
                            lineNumber: 410,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rotation-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-emerald-500 shadow-md flex items-center justify-center transition-opacity duration-200",
                    style: {
                        pointerEvents: 'auto',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                        opacity: isHovering ? 1 : 0,
                        left: `${0.2 * centerX - radiusPx * 0.3}px`,
                        top: `${0.36 * centerY}px`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 20
                    },
                    title: "Otočit úhloměr",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "resize-handle absolute w-6 h-6 bg-white rounded-full cursor-grab hover:scale-110 border-2 border-amber-500 shadow-md flex items-center justify-center transition-opacity duration-200",
                    style: {
                        pointerEvents: 'auto',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                        opacity: isHovering ? 1 : 0,
                        left: `${-0.37 * centerX + radiusPx * 0.3}px`,
                        top: `${0.36 * centerY}px`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 15
                    },
                    title: "Změnit velikost",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
}),
"[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GeneralGeometryTester
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/circle.js [app-ssr] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/pencil.js [app-ssr] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/rotate-cw.js [app-ssr] (ecmascript) <export default as RotateCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/eraser.js [app-ssr] (ecmascript) <export default as Eraser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/ruler.js [app-ssr] (ecmascript) <export default as Ruler>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Triangle$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/triangle.js [app-ssr] (ecmascript) <export default as Triangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/gauge.js [app-ssr] (ecmascript) <export default as Gauge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/settings.js [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$components$2f$DraggableRuler$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/app/components/DraggableRuler.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$components$2f$DraggableTriangle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/app/components/DraggableTriangle.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$components$2f$DraggableProtractor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/app/components/DraggableProtractor.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function dist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}
function coordsOfPoint(p) {
    return {
        x: p.X(),
        y: p.Y()
    };
}
function GeneralGeometryTester() {
    // Refs for managers
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const boardManagerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const toolControllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selectionManagerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const renameManagerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hotkeyManagerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const serializerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // State
    const [tool, setTool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('mouse');
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showHelp, setShowHelp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [constructionHistory, setConstructionHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Physical tools state
    const [rulerVisible, setRulerVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [triangleVisible, setTriangleVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [protractorVisible, setProtractorVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rulerPosition, setRulerPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 5,
        y: 4,
        rotation: 0,
        length: 6
    });
    const [trianglePosition, setTrianglePosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 7,
        y: 4,
        rotation: 0,
        size: 3
    });
    const [protractorPosition, setProtractorPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 6,
        y: 3,
        rotation: 0,
        size: 3
    });
    const [activeTool, setActiveTool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [uiBusy, setUiBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Grid settings state
    const [showSettings, setShowSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [gridOption, setGridOption] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('major');
    // Callbacks for managers
    const handleFeedback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((message)=>{
        setFeedback(message);
    }, []);
    const handleSelectionChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((selected)=>{
    // Selection is now managed by SelectionManager
    }, []);
    const handleToggleRename = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        renameManagerRef.current?.toggleRenameMode();
    }, []);
    const handleUndo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        boardManagerRef.current?.getUndoRedoManager()?.undo();
    }, []);
    const handleRedo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        boardManagerRef.current?.getUndoRedoManager()?.redo();
    }, []);
    const handleToolChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((newTool)=>{
        setTool(newTool);
    }, []);
    const handlePhysicalToolToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((physicalTool)=>{
        // Handle physical tool toggles
        if (physicalTool === 'ruler') {
            setRulerVisible(!rulerVisible);
            setActiveTool(rulerVisible ? null : 'ruler');
        } else if (physicalTool === 'triangle') {
            setTriangleVisible(!triangleVisible);
            setActiveTool(triangleVisible ? null : 'triangle');
        } else if (physicalTool === 'protractor') {
            setProtractorVisible(!protractorVisible);
            setActiveTool(protractorVisible ? null : 'protractor');
        }
    }, [
        rulerVisible,
        triangleVisible,
        protractorVisible
    ]);
    const handleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((brd, e)=>{
        if (uiBusyRef.current) return;
        // Prevent tools from firing while in rename mode
        if (renameModeRef.current) return;
        // Check if the click is on a physical tool - if so, don't handle it
        const target = e.originalEvent?.target;
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
                    const clickedPoint = under.find((o)=>o.elType === 'point' && !o.visProp.fixed);
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
                    const attr = {
                        name: '',
                        size: 2,
                        strokeColor: '#444',
                        fillColor: '#666'
                    };
                    const op = undoRedoRef.current?.createPointOperation(xy.x, xy.y, attr);
                    if (op) undoRedoRef.current?.pushOperation(op);
                    setFeedback('Bod vytvořen');
                    break;
                }
            case 'segment':
                {
                    const first = selectedRef.current[0];
                    if (!first) {
                        // first click
                        undoRedoRef.current?.begin();
                        const p = getOrCreatePointViaHistory(brd, xy);
                        if (!p) {
                            undoRedoRef.current?.commit();
                            break;
                        }
                        setSelected([
                            p
                        ]);
                        setFeedback('Klikněte na druhý bod');
                        break;
                    }
                    // second click
                    const a = first;
                    const b = getOrCreatePointViaHistory(brd, xy);
                    if (!b) {
                        undoRedoRef.current?.commit();
                        setSelected([]);
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
                    const op = undoRedoRef.current?.createSegmentOperation(p1, p2, attr);
                    if (op) {
                        op.pointIds = [
                            a.id,
                            b.id
                        ]; // <-- bind exact endpoints
                        undoRedoRef.current?.pushOperation(op);
                    }
                    undoRedoRef.current?.commit();
                    setSelected([]);
                    setFeedback('Úsečka vytvořena');
                    break;
                }
            case 'line':
                {
                    const first = selectedRef.current[0];
                    if (!first) {
                        undoRedoRef.current?.begin();
                        const p = getOrCreatePointViaHistory(brd, xy);
                        if (!p) {
                            undoRedoRef.current?.commit();
                            break;
                        }
                        setSelected([
                            p
                        ]);
                        setFeedback('Klikněte na druhý bod');
                        break;
                    }
                    const a = first;
                    const b = getOrCreatePointViaHistory(brd, xy);
                    if (!b) {
                        undoRedoRef.current?.commit();
                        setSelected([]);
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
                    const op = undoRedoRef.current?.createLineOperation(p1, p2, attr);
                    if (op) {
                        op.pointIds = [
                            a.id,
                            b.id
                        ];
                        undoRedoRef.current?.pushOperation(op);
                    }
                    undoRedoRef.current?.commit();
                    setSelected([]);
                    setFeedback('Přímka vytvořena');
                    break;
                }
            case 'circle':
                {
                    const first = selectedRef.current[0];
                    if (!first) {
                        undoRedoRef.current?.begin();
                        const c = getOrCreatePointViaHistory(brd, xy);
                        if (!c) {
                            undoRedoRef.current?.commit();
                            break;
                        }
                        setSelected([
                            c
                        ]);
                        setFeedback('Klikněte na bod na kružnici');
                        break;
                    }
                    const c = first;
                    const p = getOrCreatePointViaHistory(brd, xy);
                    if (!p) {
                        undoRedoRef.current?.commit();
                        setSelected([]);
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
                    const op = undoRedoRef.current?.createCircleOperation(center, on, attr);
                    if (op) {
                        op.pointIds = [
                            c.id,
                            p.id
                        ];
                        undoRedoRef.current?.pushOperation(op);
                    }
                    undoRedoRef.current?.commit();
                    setSelected([]);
                    setFeedback('Kružnice vytvořena');
                    break;
                }
            case 'rubber':
                {
                    const under = brd.getAllObjectsUnderMouse(e);
                    const toRemove = under.find((o)=>!o.visProp?.fixed);
                    if (toRemove) {
                        const delOp = undoRedoRef.current?.createDeleteOperation(toRemove);
                        if (delOp) {
                            undoRedoRef.current?.pushOperation(delOp);
                            setFeedback('Objekt smazán');
                        } else {
                            // fallback: hard remove (won't be undoable)
                            brd.removeObject(toRemove);
                            setFeedback('Objekt smazán (bez historie)');
                        }
                    }
                    break;
                }
        }
    }, [
        getOrCreatePointViaHistory
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        handleClickRef.current = handleClick;
    }, [
        handleClick
    ]);
    // Keyboard shortcuts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyPress = (e)=>{
            if ((e.key === 'n' || e.key === 'N') && !uiBusyRef.current) {
                setRenameMode((v)=>!v);
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return ()=>window.removeEventListener('keydown', handleKeyPress);
    }, []);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!containerRef.current) return;
        const brd = JXG.JSXGraph.initBoard(containerRef.current, {
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
        boardRef.current = brd;
        gridMgrRef.current = new GridManager(brd, containerRef.current);
        // Optional: global snap-to-grid defaults for points
        // (You can still override per element in your creators.)
        JXG.Options.point.snapToGrid = true;
        JXG.Options.point.snapSizeX = 0.5;
        JXG.Options.point.snapSizeY = 0.5;
        // Init undo/redo
        undoRedoRef.current = new UndoRedoManager({
            board: brd,
            onFeedback: setFeedback,
            EPS: EPS
        });
        // First grid application
        gridMgrRef.current.setMode(gridOption);
        // If you ever enable resize/pan/zoom, keep the dot grid in sync:
        // brd.on('boundingbox', () => gridMgrRef.current?.sync())
        return ()=>{
            try {
                JXG.JSXGraph.freeBoard(brd);
            } catch  {}
            boardRef.current = null;
            undoRedoRef.current = null;
            gridMgrRef.current = null;
        };
    }, [
        gridOption
    ]); // <-- include gridOption for initial setup
    // When user changes the option, just update the grid manager
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        gridMgrRef.current?.setMode(gridOption);
    }, [
        gridOption
    ]);
    // Close settings dropdown when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            const target = event.target;
            if (showSettings && !target.closest('.settings-dropdown')) {
                setShowSettings(false);
            }
        };
        if (showSettings) {
            document.addEventListener('mousedown', handleClickOutside);
            return ()=>document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [
        showSettings
    ]);
    // Update event handlers when rename mode changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const brd = boardRef.current;
        if (!brd) return;
        // Store references to our specific handlers so we can remove them properly
        let currentDownHandler = null;
        let currentUpHandler = null;
        const CLICK_EPS = 0.12 // world units; tweak if needed
        ;
        const openPrompt = (pt, e)=>{
            const currentRaw = pt._rawName || '';
            let proposed = (window.prompt('Název bodu (např. A, B, C, A_1, A_2):', currentRaw) ?? '').trim();
            if (proposed && isNameTaken(brd, proposed, pt.id)) {
                let i = 2;
                while(isNameTaken(brd, `${proposed}_${i}`, pt.id))i++;
                proposed = `${proposed}_${i}`;
            }
            renamePoint(pt, proposed);
            // Restore mobility
            const arm = renameArmRef.current;
            pt.setAttribute({
                fixed: arm.wasFixed
            });
            pt.draggable = arm.wasDraggable;
            // Stop further board interaction from this click
            if (e?.originalEvent) {
                e.originalEvent.stopPropagation();
                e.originalEvent.preventDefault();
            }
            brd.update();
            if (!proposed) setRenameMode(false);
            // Clear arm
            renameArmRef.current = {
                pt: null,
                wasFixed: false,
                wasDraggable: true
            };
            downPosRef.current = null;
        };
        // 1) DOWN: if in rename mode and on a point, FREEZE it and arm rename
        currentDownHandler = (e)=>{
            if (uiBusyRef.current) return;
            // If not in rename mode, pass through to normal drawing handler and let undo-redo system handle drags
            if (!renameModeRef.current) {
                if (handleClickRef.current) handleClickRef.current(brd, e);
                return;
            }
            const pt = pointUnder(brd, e);
            if (!pt) return;
            // Freeze now (before any drag begins)
            const wasFixed = !!pt.visProp.fixed;
            const wasDraggable = !!pt.draggable;
            pt.setAttribute({
                fixed: true
            });
            pt.draggable = false;
            renameArmRef.current = {
                pt,
                wasFixed,
                wasDraggable
            };
            downPosRef.current = getMouseCoords(brd, e);
            // Only prevent default behavior in rename mode
            if (e.originalEvent) {
                e.originalEvent.stopPropagation();
                e.originalEvent.preventDefault();
            }
        };
        // 2) UP: if we armed a point and movement was small → open prompt
        currentUpHandler = (e)=>{
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
            pt.draggable = arm.wasDraggable;
            renameArmRef.current = {
                pt: null,
                wasFixed: false,
                wasDraggable: true
            };
            downPosRef.current = null;
        };
        brd.on('down', currentDownHandler);
        brd.on('up', currentUpHandler);
        return ()=>{
            try {
                if (currentDownHandler) brd.off('down', currentDownHandler);
                if (currentUpHandler) brd.off('up', currentUpHandler);
            } catch  {}
        };
    }, [
        renameMode,
        renamePoint
    ]);
    function undoLast() {
        undoRedoRef.current?.undo();
    }
    function redoLast() {
        undoRedoRef.current?.redo();
    }
    function clearAll() {
        const brd = boardRef.current;
        if (!brd) return;
        const toRemove = [];
        for(const key in brd.objects){
            const o = brd.objects[key];
            if (!o?.visProp?.fixed) {
                toRemove.push(o);
            }
        }
        toRemove.forEach((o)=>brd.removeObject(o));
        setSelected([]);
        setFeedback('');
        setData(null);
        setCreatedStack([]);
    }
    function saveConstruction() {
        if (!boardRef.current) return;
        const timestamp = new Date().toISOString();
        const constructionData = {
            timestamp,
            objects: Object.values(boardRef.current.objects).map((obj)=>({
                    id: obj.id,
                    type: obj.elType,
                    name: obj.name,
                    properties: obj.visProp
                })),
            createdStack: [
                ...createdStack
            ]
        };
        setData(constructionData);
        setConstructionHistory((prev)=>[
                ...prev,
                constructionData
            ]);
        setFeedback('Konstrukce uložena');
    }
    function exportConstruction() {
        if (!data) return;
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([
            dataStr
        ], {
            type: 'application/json'
        });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `construction_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        setFeedback('Konstrukce exportována');
    }
    function importConstruction(event) {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e)=>{
            try {
                const importedData = JSON.parse(e.target?.result);
                setData(importedData);
                setFeedback('Konstrukce načtena - klikněte na "Načíst" pro obnovení');
            } catch (err) {
                setFeedback('Chyba při načítání souboru');
            }
        };
        reader.readAsText(file);
    }
    function loadConstruction() {
        if (!data || !boardRef.current) return;
        // Clear current construction
        clearAll();
        // Restore objects from data
        // This is a simplified restoration - in a real implementation you'd need more sophisticated logic
        setFeedback('Konstrukce načtena');
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg shadow-lg p-6 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-gray-800 mb-4",
                        children: "Obecné geometrické testování"
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                        lineNumber: 556,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-green-50 border-l-4 border-green-500 p-4 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-700",
                                children: "Volné testovací pole pro geometrické konstrukce. Můžete používat všechny dostupné nástroje bez specifických požadavků."
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 561,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex items-center gap-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowHelp(!showHelp),
                                    className: "flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                            lineNumber: 569,
                                            columnNumber: 17
                                        }, this),
                                        showHelp ? 'Skrýt nápovědu' : 'Zobrazit nápovědu'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                    lineNumber: 565,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 564,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                        lineNumber: 560,
                        columnNumber: 11
                    }, this),
                    showHelp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-50 border-l-4 border-blue-500 p-4 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-blue-800 mb-2",
                                children: "Nápověda k nástrojům:"
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 577,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid md:grid-cols-2 gap-4 text-sm text-blue-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-medium mb-1",
                                                children: "Základní nástroje:"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                lineNumber: 580,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Myš:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                lineNumber: 582,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Interakce s objekty bez vytváření"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 582,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Bod:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                lineNumber: 583,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Vytvoření bodu kliknutím"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 583,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Úsečka:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                lineNumber: 584,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Klikněte na dva body"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 584,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Přímka:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                lineNumber: 585,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Klikněte na dva body"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 585,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Kružnice:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                lineNumber: 586,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Střed a bod na kružnici"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 586,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Guma:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                lineNumber: 587,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Smazání objektu"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 587,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                lineNumber: 581,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 579,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-medium mb-1",
                                                children: "Fyzické nástroje:"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                lineNumber: 591,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Pravítko:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                lineNumber: 593,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Měření vzdáleností"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 593,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Trojúhelník:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                lineNumber: 594,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Rýsování úhlů"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 594,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Úhloměr:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                lineNumber: 595,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Měření úhlů"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 595,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Modrý bod:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                lineNumber: 596,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Přesun nástroje"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 596,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Zelený bod:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                lineNumber: 597,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Otočení nástroje"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 597,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "• ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Oranžový bod:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                lineNumber: 598,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Změna velikosti"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 598,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                lineNumber: 592,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 590,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 578,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                        lineNumber: 576,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2 mb-4 p-4 bg-gray-100 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTool('mouse'),
                                className: `px-3 py-2 rounded flex items-center gap-2 ${tool === 'mouse' ? 'bg-gray-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "18",
                                        height: "18",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                lineNumber: 614,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M13 13l6 6"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                lineNumber: 615,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 613,
                                        columnNumber: 15
                                    }, this),
                                    "Myš"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 607,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTool('point'),
                                className: `px-3 py-2 rounded flex items-center gap-2 ${tool === 'point' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 625,
                                        columnNumber: 15
                                    }, this),
                                    " Bod"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 619,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTool('segment'),
                                className: `px-3 py-2 rounded flex items-center gap-2 ${tool === 'segment' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 633,
                                        columnNumber: 15
                                    }, this),
                                    " Úsečka"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 627,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTool('line'),
                                className: `px-3 py-2 rounded flex items-center gap-2 ${tool === 'line' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 641,
                                        columnNumber: 15
                                    }, this),
                                    " Přímka"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 635,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTool('circle'),
                                className: `px-3 py-2 rounded flex items-center gap-2 ${tool === 'circle' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 649,
                                        columnNumber: 15
                                    }, this),
                                    " Kružnice"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 643,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTool('rubber'),
                                className: `px-3 py-2 rounded flex items-center gap-2 ${tool === 'rubber' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__["Eraser"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 657,
                                        columnNumber: 15
                                    }, this),
                                    " Guma"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 651,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setRenameMode((v)=>!v),
                                className: `px-3 py-2 rounded flex items-center gap-2 ${renameMode ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`,
                                title: "Přejmenovat bod (klikněte na bod)",
                                children: "✎ Název bodu"
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 659,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-l-2 border-gray-300 mx-2"
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 669,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleRuler,
                                className: `px-3 py-2 rounded flex items-center gap-2 ${rulerVisible ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 677,
                                        columnNumber: 15
                                    }, this),
                                    " Pravítko"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 671,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleTriangle,
                                className: `px-3 py-2 rounded flex items-center gap-2 ${triangleVisible ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Triangle$3e$__["Triangle"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 685,
                                        columnNumber: 15
                                    }, this),
                                    " Trojúhelník"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 679,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleProtractor,
                                className: `px-3 py-2 rounded flex items-center gap-2 ${protractorVisible ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__["Gauge"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 693,
                                        columnNumber: 15
                                    }, this),
                                    " Úhloměr"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 687,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1"
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 696,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: undoLast,
                                className: "px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 699,
                                        columnNumber: 15
                                    }, this),
                                    " Zpět"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 698,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: redoLast,
                                className: "px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 702,
                                        columnNumber: 15
                                    }, this),
                                    " Znovu"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 701,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: clearAll,
                                className: "px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 705,
                                        columnNumber: 15
                                    }, this),
                                    " Vymazat"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 704,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: saveConstruction,
                                className: "px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 708,
                                        columnNumber: 15
                                    }, this),
                                    " Uložit"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 707,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: exportConstruction,
                                disabled: !data,
                                className: "px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 711,
                                        columnNumber: 15
                                    }, this),
                                    " Export"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 710,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "px-3 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 cursor-pointer flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 714,
                                        columnNumber: 15
                                    }, this),
                                    " Import",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        accept: ".json",
                                        onChange: importConstruction,
                                        className: "hidden"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 715,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 713,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: loadConstruction,
                                disabled: !data,
                                className: "px-3 py-2 rounded bg-orange-600 text-white hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 723,
                                        columnNumber: 15
                                    }, this),
                                    " Načíst"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 722,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                        lineNumber: 606,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-2 right-2 z-50 settings-dropdown",
                                style: {
                                    zIndex: 9999
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowSettings(!showSettings),
                                        className: "p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-lg transition-colors",
                                        title: "Nastavení mřížky",
                                        style: {
                                            zIndex: 10000
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                            lineNumber: 736,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 730,
                                        columnNumber: 15
                                    }, this),
                                    showSettings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-12 right-0 bg-white border border-gray-300 rounded-lg shadow-lg min-w-48 z-20",
                                        style: {
                                            zIndex: 10001
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 border-b border-gray-200",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-gray-700 font-medium",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "16",
                                                            height: "16",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: "2",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M3 3h18v18H3z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                    lineNumber: 745,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M9 9h6v6H9z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                    lineNumber: 746,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M3 9h6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                    lineNumber: 747,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M15 9h6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                    lineNumber: 748,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M3 15h6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                    lineNumber: 749,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M15 15h6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                    lineNumber: 750,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M9 3v6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                    lineNumber: 751,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M9 15v6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                    lineNumber: 752,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M15 3v6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                    lineNumber: 753,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M15 15v6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                                    lineNumber: 754,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                            lineNumber: 744,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Zobrazit mřížku",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                            lineNumber: 757,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                    lineNumber: 743,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                lineNumber: 742,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "py-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setGridOption('none');
                                                            setShowSettings(false);
                                                        },
                                                        className: `w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${gridOption === 'none' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`,
                                                        children: "Žádná mřížka"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 761,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setGridOption('major');
                                                            setShowSettings(false);
                                                        },
                                                        className: `w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${gridOption === 'major' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`,
                                                        children: "Hlavní mřížka"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 772,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setGridOption('minor');
                                                            setShowSettings(false);
                                                        },
                                                        className: `w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${gridOption === 'minor' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`,
                                                        children: "Vedlejší mřížka"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 783,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setGridOption('major-minor');
                                                            setShowSettings(false);
                                                        },
                                                        className: `w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${gridOption === 'major-minor' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`,
                                                        children: "Hlavní a vedlejší mřížka"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 794,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setGridOption('dot');
                                                            setShowSettings(false);
                                                        },
                                                        className: `w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${gridOption === 'dot' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`,
                                                        children: "Bodová mřížka"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 805,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                lineNumber: 760,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 741,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 729,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: containerRef,
                                id: "jxgbox",
                                className: "w-full border-2 border-gray-300 rounded-lg bg-white jxgbox",
                                style: {
                                    height: 500,
                                    touchAction: 'none'
                                },
                                children: [
                                    rulerVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$components$2f$DraggableRuler$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 829,
                                        columnNumber: 15
                                    }, this),
                                    triangleVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$components$2f$DraggableTriangle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 846,
                                        columnNumber: 15
                                    }, this),
                                    protractorVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$app$2f$components$2f$DraggableProtractor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 864,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 821,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                        lineNumber: 727,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-blue-700 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "Nápověda:"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                    lineNumber: 883,
                                    columnNumber: 15
                                }, this),
                                " Modrý bod = přesun • Zelený bod = otočení • Oranžový bod = změna velikosti"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                            lineNumber: 882,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                        lineNumber: 881,
                        columnNumber: 11
                    }, this),
                    feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-4 p-4 rounded-lg ${feedback.includes('✅') ? 'bg-green-50 border-l-4 border-green-500' : 'bg-yellow-50 border-l-4 border-yellow-500'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-800",
                            children: feedback
                        }, void 0, false, {
                            fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                            lineNumber: 891,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                        lineNumber: 888,
                        columnNumber: 13
                    }, this),
                    constructionHistory.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 bg-gray-50 rounded-lg p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-gray-800 mb-3",
                                children: "Historie konstrukcí"
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 898,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 max-h-40 overflow-y-auto",
                                children: constructionHistory.map((construction, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between p-2 bg-white rounded border",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium",
                                                        children: [
                                                            "Konstrukce ",
                                                            index + 1
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 903,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-gray-500 ml-2",
                                                        children: new Date(construction.timestamp).toLocaleString('cs-CZ')
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                        lineNumber: 904,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                lineNumber: 902,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500",
                                                children: [
                                                    construction.objects?.length || 0,
                                                    " objektů"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                                lineNumber: 908,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                        lineNumber: 901,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                                lineNumber: 899,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                        lineNumber: 897,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
                lineNumber: 555,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
            lineNumber: 554,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/geometry_review/app/components/GeneralGeometryTester.tsx",
        lineNumber: 553,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Documents_geometry_review_app_58a18920._.js.map