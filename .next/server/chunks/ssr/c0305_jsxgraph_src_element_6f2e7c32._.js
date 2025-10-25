module.exports = [
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/conic.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software dual licensed under the GNU LGPL or MIT License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License and
    the MIT License along with JSXGraph. If not, see <https://www.gnu.org/licenses/>
    and <https://opensource.org/licenses/MIT/>.
 */ /*global JXG: true, define: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview In this file the conic sections defined.
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coords.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/numerics.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
/**
 * @class An ellipse is a special conic section given by two points (the foci) and a third point on the ellipse or
 * the length of the major axis.
 * @pseudo
 * @name Ellipse
 * @augments Conic
 * @constructor
 * @type JXG.Curve
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point,array_JXG.Point,array_JXG.Point,array} point1,point2,point3 Parent elements can be three elements either of type {@link JXG.Point} or array of
 * numbers describing the coordinates of a point. In the latter case the point will be constructed automatically as a fixed invisible point.
 * @param {JXG.Point,array_JXG.Point,array_number,function} point1,point2,number Parent elements can be two elements either of type {@link JXG.Point} or array of
 * numbers describing the coordinates of a point. The third parameter is a number/function which defines the length of the major axis
 * @param {Number} start (Optional) parameter of the curve start, default: 0.
 * @param {Number} end (Optional) parameter for the curve end, default: 2&pi;.
 * @example
 * // Create an Ellipse by three points
 * var A = board.create('point', [-1,4]);
 * var B = board.create('point', [-1,-4]);
 * var C = board.create('point', [1,1]);
 * var el = board.create('ellipse',[A,B,C]);
 * </pre><div class="jxgbox" id="JXGa4d7fb6f-8708-4e45-87f2-2379ae2bd2c0" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *   (function() {
 *   var glex1_board = JXG.JSXGraph.initBoard('JXGa4d7fb6f-8708-4e45-87f2-2379ae2bd2c0', {boundingbox:[-6,6,6,-6], keepaspectratio:true, showcopyright: false, shownavigation: false});
 *   var A = glex1_board.create('point', [-1,4]);
 *   var B = glex1_board.create('point', [-1,-4]);
 *   var C = glex1_board.create('point', [1,1]);
 *   var el = glex1_board.create('ellipse',[A,B,C]);
 * })();
 * </script><pre>
 *
 * @example
 * // Create an elliptical arc
 * var p1 = board.create('point', [-1, 2]);
 * var p2 = board.create('point', [ 1, 2]);
 * var p3 = board.create('point', [0, 3]);
 *
 * var ell = board.create('ellipse', [
 *   p1, p2, p3, 0, Math.PI], {
 *   lastArrow: {type: 7}
 * });
 *
 * </pre><div id="JXG950f7c07-27a4-4c67-9505-c73c22ce9345" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG950f7c07-27a4-4c67-9505-c73c22ce9345',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var p1 = board.create('point', [-1, 2]);
 *     var p2 = board.create('point', [ 1, 2]);
 *     var p3 = board.create('point', [0, 3]);
 *
 *     var ell = board.create('ellipse', [
 *       p1, p2, p3, 0, Math.PI], {
 *       lastArrow: {type: 7}
 *     });
 *
 *     })();
 *
 * </script><pre>
 *
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createEllipse = function(board, parents, attributes) {
    var polarForm, curve, M, C, majorAxis, i, hasPointOrg, // focus 1 and focus 2
    F = [], attr_foci = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "conic", "foci"), attr_center = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "conic", "center"), attr_curve = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "conic");
    // The foci and the third point are either points or coordinate arrays.
    for(i = 0; i < 2; i++){
        // focus i given by coordinates
        if (parents[i].length > 1) {
            F[i] = board.create("point", parents[i], attr_foci);
        // focus i given by point
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[i])) {
            F[i] = board.select(parents[i]);
        // given by function
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[i]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[i]())) {
            F[i] = parents[i]();
        // focus i given by point name
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(parents[i])) {
            F[i] = board.select(parents[i]);
        } else {
            throw new Error("JSXGraph: Can't create Ellipse with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [point,point,point], [point,point,number|function]");
        }
    }
    // length of major axis
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(parents[2])) {
        majorAxis = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunction(parents[2], board);
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[2]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(parents[2]())) {
        majorAxis = parents[2];
    } else {
        // point on ellipse
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[2])) {
            C = board.select(parents[2]);
        // point on ellipse given by coordinates
        } else if (parents[2].length > 1) {
            C = board.create("point", parents[2], attr_foci);
        // given by function
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[2]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[2]())) {
            C = parents[2]();
        // focus i given by point name
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(parents[2])) {
            C = board.select(parents[2]);
        } else {
            throw new Error("JSXGraph: Can't create Ellipse with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "' and '" + typeof parents[2] + "'." + "\nPossible parent types: [point,point,point], [point,point,number|function]");
        }
        /** @ignore */ majorAxis = function() {
            return C.Dist(F[0]) + C.Dist(F[1]);
        };
    }
    // to
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parents[4])) {
        parents[4] = 2 * Math.PI;
    }
    // from
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parents[3])) {
        parents[3] = 0.0;
    }
    M = board.create("point", [
        function() {
            return (F[0].X() + F[1].X()) * 0.5;
        },
        function() {
            return (F[0].Y() + F[1].Y()) * 0.5;
        }
    ], attr_center);
    /**
     * @class
     * @ignore
     */ curve = board.create("curve", [
        function(x) {
            return 0;
        },
        function(x) {
            return 0;
        },
        parents[3],
        parents[4]
    ], attr_curve);
    curve.majorAxis = majorAxis;
    // Save the original hasPoint method. It will be called inside of the new hasPoint method.
    hasPointOrg = curve.hasPoint;
    /** @ignore */ polarForm = function(phi, suspendUpdate) {
        var r, rr, ax, ay, bx, by, axbx, ayby, f;
        if (!suspendUpdate) {
            r = majorAxis();
            rr = r * r;
            ax = F[0].X();
            ay = F[0].Y();
            bx = F[1].X();
            by = F[1].Y();
            axbx = ax - bx;
            ayby = ay - by;
            f = (rr - ax * ax - ay * ay + bx * bx + by * by) / (2 * r);
            curve.quadraticform = [
                [
                    f * f - bx * bx - by * by,
                    f * axbx / r + bx,
                    f * ayby / r + by
                ],
                [
                    f * axbx / r + bx,
                    axbx * axbx / rr - 1,
                    axbx * ayby / rr
                ],
                [
                    f * ayby / r + by,
                    axbx * ayby / rr,
                    ayby * ayby / rr - 1
                ]
            ];
        }
    };
    /** @ignore */ curve.X = function(phi, suspendUpdate) {
        var r = majorAxis(), c = F[1].Dist(F[0]), b = 0.5 * (c * c - r * r) / (c * Math.cos(phi) - r), beta = Math.atan2(F[1].Y() - F[0].Y(), F[1].X() - F[0].X());
        if (!suspendUpdate) {
            polarForm(phi, suspendUpdate);
        }
        return F[0].X() + Math.cos(beta + phi) * b;
    };
    /** @ignore */ curve.Y = function(phi, suspendUpdate) {
        var r = majorAxis(), c = F[1].Dist(F[0]), b = 0.5 * (c * c - r * r) / (c * Math.cos(phi) - r), beta = Math.atan2(F[1].Y() - F[0].Y(), F[1].X() - F[0].X());
        return F[0].Y() + Math.sin(beta + phi) * b;
    };
    curve.midpoint = curve.center = M;
    curve.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_CONIC;
    curve.subs = {
        center: curve.center
    };
    curve.inherits.push(curve.center, F[0], F[1]);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(C)) {
        curve.inherits.push(C);
    }
    /**
     * Checks whether (x,y) is near the ellipse line or inside of the ellipse
     * (in case JXG.Options.conic#hasInnerPoints is true).
     * @param {Number} x Coordinate in x direction, screen coordinates.
     * @param {Number} y Coordinate in y direction, screen coordinates.
     * @returns {Boolean} True if (x,y) is near the ellipse, False otherwise.
     * @private
     * @ignore
     */ curve.hasPoint = function(x, y) {
        var ac, bc, r, p, dist;
        if (this.evalVisProp('hasinnerpoints')) {
            ac = F[0].coords;
            bc = F[1].coords;
            r = this.majorAxis();
            p = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, [
                x,
                y
            ], this.board);
            dist = p.distance(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, ac) + p.distance(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, bc);
            return dist <= r;
        }
        return hasPointOrg.apply(this, arguments);
    };
    M.addChild(curve);
    for(i = 0; i < 2; i++){
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(F[i])) {
            F[i].addChild(curve);
        }
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(C)) {
        C.addChild(curve);
    }
    curve.setParents(parents);
    return curve;
};
/**
 * @class A hyperbola is a special conic section given by two points (the foci) and a third point on the hyperbola or
 * the length of the major axis.
 * @pseudo
 * @name Hyperbola
 * @augments Conic
 * @constructor
 * @type JXG.Curve
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point,array_JXG.Point,array_JXG.Point,array} point1,point2,point3 Parent elements can be three elements either of type {@link JXG.Point} or array of
 * numbers describing the coordinates of a point. In the latter case the point will be constructed automatically as a fixed invisible point.
 * @param {JXG.Point,array_JXG.Point,array_number,function} point1,point2,number Parent elements can be two elements either of type {@link JXG.Point} or array of
 * numbers describing the coordinates of a point. The third parameter is a number/function which defines the length of the major axis
 * @param {Number} start (Optional) parameter of the curve start, default: -&pi;.
 * @param {Number} end (Optional) parameter for the curve end, default: &pi;.
 * @example
 * // Create an Hyperbola by three points
 * var A = board.create('point', [-1,4]);
 * var B = board.create('point', [-1,-4]);
 * var C = board.create('point', [1,1]);
 * var el = board.create('hyperbola',[A,B,C]);
 * </pre><div class="jxgbox" id="JXGcf99049d-a3fe-407f-b936-27d76550f8c4" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *   (function(){
 *   var glex1_board = JXG.JSXGraph.initBoard('JXGcf99049d-a3fe-407f-b936-27d76550f8c4', {boundingbox:[-6,6,6,-6], keepaspectratio:true, showcopyright: false, shownavigation: false});
 *   var A = glex1_board.create('point', [-1,4]);
 *   var B = glex1_board.create('point', [-1,-4]);
 *   var C = glex1_board.create('point', [1,1]);
 *   var el = glex1_board.create('hyperbola',[A,B,C]);
 * })();
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createHyperbola = function(board, parents, attributes) {
    var polarForm, curve, M, C, majorAxis, i, // focus 1 and focus 2
    F = [], attr_foci = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "conic", "foci"), attr_center = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "conic", "center"), attr_curve = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "conic");
    // The foci and the third point are either points or coordinate arrays.
    for(i = 0; i < 2; i++){
        // focus i given by coordinates
        if (parents[i].length > 1) {
            F[i] = board.create("point", parents[i], attr_foci);
        // focus i given by point
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[i])) {
            F[i] = board.select(parents[i]);
        // given by function
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[i]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[i]())) {
            F[i] = parents[i]();
        // focus i given by point name
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(parents[i])) {
            F[i] = board.select(parents[i]);
        } else {
            throw new Error("JSXGraph: Can't create Hyperbola with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [point,point,point], [point,point,number|function]");
        }
    }
    // length of major axis
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(parents[2])) {
        majorAxis = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunction(parents[2], board);
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[2]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(parents[2]())) {
        majorAxis = parents[2];
    } else {
        // point on ellipse
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[2])) {
            C = board.select(parents[2]);
        // point on ellipse given by coordinates
        } else if (parents[2].length > 1) {
            C = board.create("point", parents[2], attr_foci);
        // given by function
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[2]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[2]())) {
            C = parents[2]();
        // focus i given by point name
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(parents[2])) {
            C = board.select(parents[2]);
        } else {
            throw new Error("JSXGraph: Can't create Hyperbola with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "' and '" + typeof parents[2] + "'." + "\nPossible parent types: [point,point,point], [point,point,number|function]");
        }
        /** @ignore */ majorAxis = function() {
            return C.Dist(F[0]) - C.Dist(F[1]);
        };
    }
    // to
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parents[4])) {
        parents[4] = 1.0001 * Math.PI;
    }
    // from
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parents[3])) {
        parents[3] = -1.0001 * Math.PI;
    }
    M = board.create("point", [
        function() {
            return (F[0].X() + F[1].X()) * 0.5;
        },
        function() {
            return (F[0].Y() + F[1].Y()) * 0.5;
        }
    ], attr_center);
    /**
     * @class
     * @ignore
     */ curve = board.create("curve", [
        function(x) {
            return 0;
        },
        function(x) {
            return 0;
        },
        parents[3],
        parents[4]
    ], attr_curve);
    curve.majorAxis = majorAxis;
    // Hyperbola is defined by (a*sec(t),b*tan(t)) and sec(t) = 1/cos(t)
    /** @ignore */ polarForm = function(phi, suspendUpdate) {
        var r, rr, ax, ay, bx, by, axbx, ayby, f;
        if (!suspendUpdate) {
            r = majorAxis();
            rr = r * r;
            ax = F[0].X();
            ay = F[0].Y();
            bx = F[1].X();
            by = F[1].Y();
            axbx = ax - bx;
            ayby = ay - by;
            f = (rr - ax * ax - ay * ay + bx * bx + by * by) / (2 * r);
            curve.quadraticform = [
                [
                    f * f - bx * bx - by * by,
                    f * axbx / r + bx,
                    f * ayby / r + by
                ],
                [
                    f * axbx / r + bx,
                    axbx * axbx / rr - 1,
                    axbx * ayby / rr
                ],
                [
                    f * ayby / r + by,
                    axbx * ayby / rr,
                    ayby * ayby / rr - 1
                ]
            ];
        }
    };
    /** @ignore */ curve.X = function(phi, suspendUpdate) {
        var r = majorAxis(), c = F[1].Dist(F[0]), b = 0.5 * (c * c - r * r) / (c * Math.cos(phi) + r), beta = Math.atan2(F[1].Y() - F[0].Y(), F[1].X() - F[0].X());
        if (!suspendUpdate) {
            polarForm(phi, suspendUpdate);
        }
        return F[0].X() + Math.cos(beta + phi) * b;
    };
    /** @ignore */ curve.Y = function(phi, suspendUpdate) {
        var r = majorAxis(), c = F[1].Dist(F[0]), b = 0.5 * (c * c - r * r) / (c * Math.cos(phi) + r), beta = Math.atan2(F[1].Y() - F[0].Y(), F[1].X() - F[0].X());
        return F[0].Y() + Math.sin(beta + phi) * b;
    };
    curve.midpoint = curve.center = M;
    curve.subs = {
        center: curve.center
    };
    curve.inherits.push(curve.center, F[0], F[1]);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(C)) {
        curve.inherits.push(C);
    }
    curve.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_CONIC;
    M.addChild(curve);
    for(i = 0; i < 2; i++){
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(F[i])) {
            F[i].addChild(curve);
        }
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(C)) {
        C.addChild(curve);
    }
    curve.setParents(parents);
    return curve;
};
/**
 * @class A parabola is a special conic section given by one point (the focus) and a line (the directrix).
 * @pseudo
 * @name Parabola
 * @augments Conic
 * @constructor
 * @type Object
 * @description JXG.Curve
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point,array_JXG.Line} point,line Parent elements are a point and a line or a pair of coordinates.
 * Optional parameters three and four are numbers which define the curve length (e.g. start/end). Default values are -pi and pi.
 * @example
 * // Create a parabola by a point C and a line l.
 * var A = board.create('point', [-1,4]);
 * var B = board.create('point', [-1,-4]);
 * var l = board.create('line', [A,B]);
 * var C = board.create('point', [1,1]);
 * var el = board.create('parabola',[C,l]);
 * </pre><div class="jxgbox" id="JXG524d1aae-217d-44d4-ac58-a19c7ab1de36" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function() {
 *   var glex1_board = JXG.JSXGraph.initBoard('JXG524d1aae-217d-44d4-ac58-a19c7ab1de36', {boundingbox:[-6,6,6,-6], keepaspectratio:true, showcopyright: false, shownavigation: false});
 *   var A = glex1_board.create('point', [-1,4]);
 *   var B = glex1_board.create('point', [-1,-4]);
 *   var l = glex1_board.create('line', [A,B]);
 *   var C = glex1_board.create('point', [1,1]);
 *   var el = glex1_board.create('parabola',[C,l]);
 * })();
 * </script><pre>
 *
 * @example
 * var par = board.create('parabola',[[3.25, 0], [[0.25, 1],[0.25, 0]]]);
 *
 * </pre><div id="JXG09252542-b77a-4990-a109-66ffb649a472" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG09252542-b77a-4990-a109-66ffb649a472',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var par = board.create('parabola',[[3.25, 0], [[0.25, 1],[0.25, 0]]]);
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createParabola = function(board, parents, attributes) {
    var polarForm, curve, M, // focus
    F1 = parents[0], // directrix
    l = parents[1], attr_foci = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "conic", "foci"), attr_center = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "conic", "center"), attr_curve = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "conic"), attr_line;
    // focus 1 given by coordinates
    if (parents[0].length > 1) {
        F1 = board.create("point", parents[0], attr_foci);
    // focus 1 given by point
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[0])) {
        F1 = board.select(parents[0]);
    // given by function
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[0]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[0]())) {
        F1 = parents[0]();
    // focus 1 given by point name
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(parents[0])) {
        F1 = board.select(parents[0]);
    } else {
        throw new Error("JSXGraph: Can't create Parabola with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [point,line]");
    }
    // Create line if given as array of two points.
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(l) && l.length === 2) {
        attr_line = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "conic", "line");
        l = board.create("line", l, attr_line);
    }
    // to
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parents[3])) {
        parents[3] = 2 * Math.PI;
    }
    // from
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parents[2])) {
        parents[2] = 0;
    }
    M = board.create("point", [
        function() {
            /*
                var v = [0, l.stdform[1], l.stdform[2]];
                v = Mat.crossProduct(v, F1.coords.usrCoords);
                return Geometry.meetLineLine(v, l.stdform, 0, board).usrCoords;
                */ return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].projectPointToLine(F1, l, board).usrCoords;
        }
    ], attr_center);
    /**
     * @class
     * @ignore
     */ curve = board.create("curve", [
        function(x) {
            return 0;
        },
        function(x) {
            return 0;
        },
        parents[2],
        parents[3]
    ], attr_curve);
    curve.midpoint = curve.center = M;
    curve.subs = {
        center: curve.center
    };
    curve.inherits.push(curve.center);
    /** @ignore */ polarForm = function(t, suspendUpdate) {
        var a, b, c, ab, px, py;
        if (!suspendUpdate) {
            a = l.stdform[1];
            b = l.stdform[2];
            c = l.stdform[0];
            ab = a * a + b * b;
            px = F1.X();
            py = F1.Y();
            curve.quadraticform = [
                [
                    c * c - ab * (px * px + py * py),
                    c * a + ab * px,
                    c * b + ab * py
                ],
                [
                    c * a + ab * px,
                    -b * b,
                    a * b
                ],
                [
                    c * b + ab * py,
                    a * b,
                    -a * a
                ]
            ];
        }
    };
    /** @ignore */ curve.X = function(phi, suspendUpdate) {
        var a, det, beta = l.getAngle(), d = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distPointLine(F1.coords.usrCoords, l.stdform), A = l.point1.coords.usrCoords, B = l.point2.coords.usrCoords, M = F1.coords.usrCoords;
        // Handle the case if one of the two defining points of the line is an ideal point
        if (A[0] === 0) {
            A = [
                1,
                B[1] + l.stdform[2],
                B[2] - l.stdform[1]
            ];
        } else if (B[0] === 0) {
            B = [
                1,
                A[1] + l.stdform[2],
                A[2] - l.stdform[1]
            ];
        }
        det = (B[1] - A[1]) * (M[2] - A[2]) - (B[2] - A[2]) * (M[1] - A[1]) >= 0 ? 1 : -1;
        a = det * d / (1 - Math.sin(phi));
        if (!suspendUpdate) {
            polarForm(phi, suspendUpdate);
        }
        return F1.X() + Math.cos(phi + beta) * a;
    };
    /** @ignore */ curve.Y = function(phi, suspendUpdate) {
        var a, det, beta = l.getAngle(), d = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distPointLine(F1.coords.usrCoords, l.stdform), A = l.point1.coords.usrCoords, B = l.point2.coords.usrCoords, M = F1.coords.usrCoords;
        // Handle the case if one of the two defining points of the line is an ideal point
        if (A[0] === 0) {
            A = [
                1,
                B[1] + l.stdform[2],
                B[2] - l.stdform[1]
            ];
        } else if (B[0] === 0) {
            B = [
                1,
                A[1] + l.stdform[2],
                A[2] - l.stdform[1]
            ];
        }
        det = (B[1] - A[1]) * (M[2] - A[2]) - (B[2] - A[2]) * (M[1] - A[1]) >= 0 ? 1 : -1;
        a = det * d / (1 - Math.sin(phi));
        return F1.Y() + Math.sin(phi + beta) * a;
    };
    curve.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_CONIC;
    M.addChild(curve);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(F1)) {
        F1.addChild(curve);
        curve.inherits.push(F1);
    }
    l.addChild(curve);
    curve.setParents(parents);
    return curve;
};
/**
 *
 * @class Create a generic conic section either by five points or the coefficients of the general conic's equation.
 * If the conic section is defined by the coefficients of the equation
 * <p><i>Ax<sup>2</sup>+ Bxy+Cy<sup>2</sup> + Dx + Ey + F = 0</i></p>
 * then the parameters are as follows:
 * <pre>
 *     board.create('conic', [A, C, F, B/2, D/2, E/2]);
 * </pre>
 * @pseudo
 * @name Conic
 * @augments JXG.Curve
 * @constructor
 * @type JXG.Conic
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point,Array_JXG.Point,Array_JXG.Point,Array_JXG.Point,Array_JXG.Point,Array} a,b,c,d,e Parent elements are five points.
 * @param {Number_Number_Number_Number_Number_Number} a_00,a_11,a_22,a_01,a_02,a_12 6 numbers, i.e. A, C, F, B/2, D/2, E/2
 * @example
 * // Create a conic section through the points A, B, C, D, and E.
 *  var A = board.create('point', [1,5]);
 *  var B = board.create('point', [1,2]);
 *  var C = board.create('point', [2,0]);
 *  var D = board.create('point', [0,0]);
 *  var E = board.create('point', [-1,5]);
 *  var conic = board.create('conic',[A,B,C,D,E]);
 * </pre><div class="jxgbox" id="JXG2d79bd6a-db9b-423c-9cba-2497f0b06320" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function(){
 *   var glex1_board = JXG.JSXGraph.initBoard('JXG2d79bd6a-db9b-423c-9cba-2497f0b06320', {boundingbox:[-6,6,6,-6], keepaspectratio:true, showcopyright: false, shownavigation: false});
 *   var A = glex1_board.create('point', [1,5]);
 *   var B = glex1_board.create('point', [1,2]);
 *   var C = glex1_board.create('point', [2,0]);
 *   var D = glex1_board.create('point', [0,0]);
 *   var E = glex1_board.create('point', [-1,5]);
 *   var conic = glex1_board.create('conic',[A,B,C,D,E]);
 * })();
 * </script><pre>
 *
 * @example
 * // Parameters: A, C, F, B/2, D/2, E/2
 * var conic = board.create('conic', [1, 2, -4, 0, 0, 0]);
 *
 * </pre><div id="JXG8576a04a-52d8-4a7e-8d54-e32443910b97" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG8576a04a-52d8-4a7e-8d54-e32443910b97',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     // Parameters: A, C, F, B/2, D/2, E/2
 *     var conic = board.create('conic', [1, 2, -4, 0, 0, 0]);
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createConic = function(board, parents, attributes) {
    var polarForm, curve, fitConic, degconic, sym, eigen, a, b, c, c1, c2, i, definingMat, givenByPoints, rotationMatrix = [
        [
            1,
            0,
            0
        ],
        [
            0,
            1,
            0
        ],
        [
            0,
            0,
            1
        ]
    ], M = [
        [
            1,
            0,
            0
        ],
        [
            0,
            1,
            0
        ],
        [
            0,
            0,
            1
        ]
    ], points = [], p = [], attr_point = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "conic", "point"), attr_center = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "conic", "center"), attr_curve = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "conic");
    if (parents.length === 5) {
        givenByPoints = true;
    } else if (parents.length === 6) {
        givenByPoints = false;
    } else {
        throw new Error("JSXGraph: Can't create generic Conic with " + parents.length + " parameters.");
    }
    if (givenByPoints) {
        for(i = 0; i < 5; i++){
            // point i given by coordinates
            if (parents[i].length > 1) {
                points[i] = board.create("point", parents[i], attr_point);
            // point i given by point
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[i])) {
                points[i] = board.select(parents[i]);
            // given by function
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[i]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[i]())) {
                points[i] = parents[i]();
            // point i given by point name
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(parents[i])) {
                points[i] = board.select(parents[i]);
            } else {
                throw new Error("JSXGraph: Can't create Conic section with parent types '" + typeof parents[i] + "'." + "\nPossible parent types: [point,point,point,point,point], [a00,a11,a22,a01,a02,a12]");
            }
        }
    } else {
        /* Usual notation (x,y,z):
         *  [[A0,A3,A4],
         *   [A3,A1,A5],
         *   [A4,A5,A2]].
         * Our notation (z,x,y):
         *  [[A2, A4, A5],
         *   [A4, A0, A3],
         *   [A5, A3, A1]]
         */ definingMat = [
            [
                0,
                0,
                0
            ],
            [
                0,
                0,
                0
            ],
            [
                0,
                0,
                0
            ]
        ];
        definingMat[0][0] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[2]) ? function() {
            return parents[2]();
        } : function() {
            return parents[2];
        };
        definingMat[0][1] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[4]) ? function() {
            return parents[4]();
        } : function() {
            return parents[4];
        };
        definingMat[0][2] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[5]) ? function() {
            return parents[5]();
        } : function() {
            return parents[5];
        };
        definingMat[1][1] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[0]) ? function() {
            return parents[0]();
        } : function() {
            return parents[0];
        };
        definingMat[1][2] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[3]) ? function() {
            return parents[3]();
        } : function() {
            return parents[3];
        };
        definingMat[2][2] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[1]) ? function() {
            return parents[1]();
        } : function() {
            return parents[1];
        };
    }
    // sym(A) = A + A^t . Manipulates A in place.
    sym = function(A) {
        var i, j;
        for(i = 0; i < 3; i++){
            for(j = i; j < 3; j++){
                A[i][j] += A[j][i];
            }
        }
        for(i = 0; i < 3; i++){
            for(j = 0; j < i; j++){
                A[i][j] = A[j][i];
            }
        }
        return A;
    };
    // degconic(v,w) = sym(v*w^t)
    degconic = function(v, w) {
        var i, j, mat = [
            [
                0,
                0,
                0
            ],
            [
                0,
                0,
                0
            ],
            [
                0,
                0,
                0
            ]
        ];
        for(i = 0; i < 3; i++){
            for(j = 0; j < 3; j++){
                mat[i][j] = v[i] * w[j];
            }
        }
        return sym(mat);
    };
    // (p^t*B*p)*A-(p^t*A*p)*B
    fitConic = function(A, B, p) {
        var i, j, pBp, pAp, Mv, mat = [
            [
                0,
                0,
                0
            ],
            [
                0,
                0,
                0
            ],
            [
                0,
                0,
                0
            ]
        ];
        Mv = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(B, p);
        pBp = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(p, Mv);
        Mv = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(A, p);
        pAp = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(p, Mv);
        for(i = 0; i < 3; i++){
            for(j = 0; j < 3; j++){
                mat[i][j] = pBp * A[i][j] - pAp * B[i][j];
            }
        }
        return mat;
    };
    // Here, the defining functions for the curve are just dummy functions.
    // In polarForm there is a reference to curve.quadraticform.
    /**
     * @class
     * @ignore
     */ curve = board.create("curve", [
        function(x) {
            return 0;
        },
        function(x) {
            return 0;
        },
        0,
        2 * Math.PI
    ], attr_curve);
    /** @ignore */ polarForm = function(phi, suspendUpdate) {
        var i, j, v; // len,;
        if (!suspendUpdate) {
            if (givenByPoints) {
                // Copy the point coordinate vectors
                for(i = 0; i < 5; i++){
                    p[i] = points[i].coords.usrCoords;
                }
                // Compute the quadratic form
                c1 = degconic(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct(p[0], p[1]), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct(p[2], p[3]));
                c2 = degconic(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct(p[0], p[2]), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct(p[1], p[3]));
                M = fitConic(c1, c2, p[4]);
            } else {
                for(i = 0; i < 3; i++){
                    for(j = i; j < 3; j++){
                        M[i][j] = definingMat[i][j]();
                        if (j > i) {
                            M[j][i] = M[i][j];
                        }
                    }
                }
            }
            // Here is the reference back to the curve.
            curve.quadraticform = M;
            // Compute Eigenvalues and Eigenvectors
            eigen = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Jacobi(M);
            // Scale the Eigenvalues such that the first Eigenvalue is positive
            if (eigen[0][0][0] < 0) {
                eigen[0][0][0] *= -1;
                eigen[0][1][1] *= -1;
                eigen[0][2][2] *= -1;
            }
            // Normalize the Eigenvectors
            // for (i = 0; i < 3; i++) {
            //     // len = Mat.hypot(eigen[1][0][i], eigen[1][1][i], eigen[1][2][i])
            //     for (j = 0; j < 3; j++) {
            //         len += eigen[1][j][i] * eigen[1][j][i];
            //     }
            //     len = Math.sqrt(len);
            //     /*for (j = 0; j < 3; j++) {
            //             //eigen[1][j][i] /= len;
            //         }*/
            // }
            rotationMatrix = eigen[1];
            c = Math.sqrt(Math.abs(eigen[0][0][0]));
            a = Math.sqrt(Math.abs(eigen[0][1][1]));
            b = Math.sqrt(Math.abs(eigen[0][2][2]));
        }
        // The degenerate cases with eigen[0][i][i]==0 are not handled correct yet.
        if (eigen[0][1][1] <= 0.0 && eigen[0][2][2] <= 0.0) {
            v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(rotationMatrix, [
                1 / c,
                Math.cos(phi) / a,
                Math.sin(phi) / b
            ]);
        } else if (eigen[0][1][1] <= 0.0 && eigen[0][2][2] > 0.0) {
            v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(rotationMatrix, [
                Math.cos(phi) / c,
                1 / a,
                Math.sin(phi) / b
            ]);
        } else if (eigen[0][2][2] < 0.0) {
            v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(rotationMatrix, [
                Math.sin(phi) / c,
                Math.cos(phi) / a,
                1 / b
            ]);
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(v)) {
            // Normalize
            v[1] /= v[0];
            v[2] /= v[0];
            v[0] = 1.0;
        } else {
            v = [
                1,
                NaN,
                NaN
            ];
        }
        return v;
    };
    /** @ignore */ curve.X = function(phi, suspendUpdate) {
        return polarForm(phi, suspendUpdate)[1];
    };
    /** @ignore */ curve.Y = function(phi, suspendUpdate) {
        return polarForm(phi, suspendUpdate)[2];
    };
    // Center coordinates see https://en.wikipedia.org/wiki/Matrix_representation_of_conic_sections
    curve.midpoint = board.create("point", [
        function() {
            var m = curve.quadraticform;
            return [
                m[1][1] * m[2][2] - m[1][2] * m[1][2],
                m[1][2] * m[0][2] - m[2][2] * m[0][1],
                m[0][1] * m[1][2] - m[1][1] * m[0][2]
            ];
        }
    ], attr_center);
    curve.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_CONIC;
    curve.center = curve.midpoint;
    curve.subs = {
        center: curve.center
    };
    curve.inherits.push(curve.center);
    curve.inherits = curve.inherits.concat(points);
    if (givenByPoints) {
        for(i = 0; i < 5; i++){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(points[i])) {
                points[i].addChild(curve);
            }
        }
        curve.setParents(parents);
    }
    curve.addChild(curve.center);
    return curve;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("ellipse", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createEllipse);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("hyperbola", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createHyperbola);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("parabola", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createParabola);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("conic", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createConic); // export default {
 //     createEllipse: JXG.createEllipse,
 //     createHyperbola: JXG.createHyperbola,
 //     createParabola: JXG.createParabola,
 //     createConic: JXG.createConic
 // };
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/arc.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software dual licensed under the GNU LGPL or MIT License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License and
    the MIT License along with JSXGraph. If not, see <https://www.gnu.org/licenses/>
    and <https://opensource.org/licenses/MIT/>.
 */ /*global JXG: true, define: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview In this file the geometry object Arc is defined. Arc stores all
 * style and functional properties that are required to draw an arc on a board.
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coords.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/circle.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
/**
 * @class An arc is a partial circumference line of a circle.
 * It is defined by a center, one point that
 * defines the radius, and a third point that defines the angle of the arc.
 * <p>
 * As a curve the arc has curve length 6.
 * @pseudo
 * @name Arc
 * @augments Curve
 * @constructor
 * @type JXG.Curve
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p3 The result will be an arc of a circle around p1 through p2. The arc is drawn
 * counter-clockwise from p2 to p3.
 * @example
 * // Create an arc out of three free points
 * var p1 = board.create('point', [2.0, 2.0]);
 * var p2 = board.create('point', [1.0, 0.5]);
 * var p3 = board.create('point', [3.5, 1.0]);
 *
 * var a = board.create('arc', [p1, p2, p3]);
 * board.create('text',[1,6,function(){return 'arclength: '+Math.round(a.Value()*100)/100}])
 * </pre><div class="jxgbox" id="JXG114ef584-4a5e-4686-8392-c97501befb5b" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXG114ef584-4a5e-4686-8392-c97501befb5b', {boundingbox: [-1, 7, 7, -1], axis: true, showcopyright: false, shownavigation: false}),
 *       p1 = board.create('point', [2.0, 2.0]),
 *       p2 = board.create('point', [1.0, 0.5]),
 *       p3 = board.create('point', [3.5, 1.0]),
 *
 *       a = board.create('arc', [p1, p2, p3]);
 *       board.create('text',[1,6,function(){return 'arclength: '+Math.round(a.Value()*100)/100}])
 * })();
 * </script><pre>
 *
 * @example
 * var t = board.create('transform', [2, 1.5], {type: 'scale'});
 * var a1 = board.create('arc', [[1, 1], [0, 1], [1, 0]], {strokeColor: 'red'});
 * var a2 = board.create('curve', [a1, t], {strokeColor: 'red'});
 *
 * </pre><div id="JXG1949da46-6339-11e8-9fb9-901b0e1b8723" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG1949da46-6339-11e8-9fb9-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var t = board.create('transform', [2, 1.5], {type: 'scale'});
 *     var a1 = board.create('arc', [[1, 1], [0, 1], [1, 0]], {strokeColor: 'red'});
 *     var a2 = board.create('curve', [a1, t], {strokeColor: 'red'});
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createArc = function(board, parents, attributes) {
    var el, attr, points;
    // attributes.radiusPoint = {visible: false};
    points = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, parents, attributes, "arc", [
        "center",
        "radiuspoint",
        "anglepoint"
    ]);
    if (points === false || points.length < 3) {
        throw new Error("JSXGraph: Can't create Arc with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "' and '" + typeof parents[2] + "'." + "\nPossible parent types: [point,point,point], [arc, transformation]");
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "arc");
    el = board.create("curve", [
        [
            0
        ],
        [
            0
        ],
        0,
        4
    ], attr);
    el.elType = "arc";
    el.setParents(points);
    /**
     * documented in JXG.GeometryElement
     * @ignore
     */ el.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_ARC;
    /**
     * Center of the arc.
     * @memberOf Arc.prototype
     * @name center
     * @type JXG.Point
     */ el.center = points[0];
    /**
     * Point defining the arc's radius.
     * @memberOf Arc.prototype
     * @name radiuspoint
     * @type JXG.Point
     */ el.radiuspoint = points[1];
    el.point2 = el.radiuspoint;
    /**
     * The point defining the arc's angle.
     * @memberOf Arc.prototype
     * @name anglepoint
     * @type JXG.Point
     */ el.anglepoint = points[2];
    el.point3 = el.anglepoint;
    // Add arc as child to defining points
    // or vice versa if the points are provided as coordinates
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(el.center._is_new)) {
        el.addChild(el.center);
        delete el.center._is_new;
    } else {
        el.center.addChild(el);
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(el.radiuspoint._is_new)) {
        el.addChild(el.radiuspoint);
        delete el.radiuspoint._is_new;
    } else {
        el.radiuspoint.addChild(el);
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(el.anglepoint._is_new)) {
        el.addChild(el.anglepoint);
        delete el.anglepoint._is_new;
    } else {
        el.anglepoint.addChild(el);
    }
    // This attribute is necessary for circumCircleArcs
    el.useDirection = attr.usedirection; // This makes the attribute immutable
    // documented in JXG.Curve
    /**
     * @class
     * @ignore
     */ el.updateDataArray = function() {
        var ar, phi, det, p0c, p1c, p2c, sgn = 1, A = this.radiuspoint, B = this.center, C = this.anglepoint, ev_s = this.evalVisProp('selection');
        phi = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].rad(A, B, C);
        if (ev_s === "minor" && phi > Math.PI || ev_s === "major" && phi < Math.PI) {
            sgn = -1;
        }
        // This is true for circumCircleArcs. In that case there is
        // a fourth parent element: [center, point1, point3, point2]
        if (this.useDirection) {
            p0c = points[1].coords.usrCoords;
            p1c = points[3].coords.usrCoords;
            p2c = points[2].coords.usrCoords;
            det = (p0c[1] - p2c[1]) * (p0c[2] - p1c[2]) - (p0c[2] - p2c[2]) * (p0c[1] - p1c[1]);
            if (det < 0) {
                this.radiuspoint = points[1];
                this.anglepoint = points[2];
            } else {
                this.radiuspoint = points[2];
                this.anglepoint = points[1];
            }
        }
        A = A.coords.usrCoords;
        B = B.coords.usrCoords;
        C = C.coords.usrCoords;
        ar = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bezierArc(A, B, C, false, sgn);
        this.dataX = ar[0];
        this.dataY = ar[1];
        this.bezierDegree = 3;
        this.updateStdform();
        this.updateQuadraticform();
    };
    /**
     * Determines the arc's current radius. I.e. the distance between {@link Arc#center} and {@link Arc#radiuspoint}.
     * @memberOf Arc.prototype
     * @name Radius
     * @function
     * @returns {Number} The arc's radius
     */ el.Radius = function() {
        return this.radiuspoint.Dist(this.center);
    };
    /**
     * @deprecated Use {@link Arc#Radius}
     * @memberOf Arc.prototype
     * @name getRadius
     * @function
     * @returns {Number}
     */ el.getRadius = function() {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deprecated("Arc.getRadius()", "Arc.Radius()");
        return this.Radius();
    };
    /**
     * Returns the length of the arc or the value of the angle spanned by the arc.
     * @memberOf Arc.prototype
     * @name Value
     * @function
     * @param {String} [unit='length'] Unit of the returned values. Possible units are
     * <ul>
     * <li> 'length' (default): length of the arc line
     * <li> 'radians': angle spanned by the arc in radians
     * <li> 'degrees': angle spanned by the arc in degrees
     * <li> 'semicircle': angle spanned by the arc in radians as a multiple of &pi;, e.g. if the angle is 1.5&pi;, 1.5 will be returned.
     * <li> 'circle': angle spanned by the arc in radians as a multiple of 2&pi;
     * </ul>
     * It is sufficient to supply the first three characters of the unit, e.g. 'len'.
     * @param {Number} [rad=undefined] Value of angle which can be used instead of the generic one.
     * @returns {Number} The arc length or the angle value in various units.
     */ el.Value = function(unit, rad) {
        var val;
        rad = rad || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].rad(this.radiuspoint, this.center, this.anglepoint);
        unit = unit || 'length';
        unit = unit.toLocaleLowerCase();
        if (unit === '' || unit.indexOf('len') === 0) {
            val = rad * this.Radius();
        } else if (unit.indexOf('rad') === 0) {
            val = rad;
        } else if (unit.indexOf('deg') === 0) {
            val = rad * 180 / Math.PI;
        } else if (unit.indexOf('sem') === 0) {
            val = rad / Math.PI;
        } else if (unit.indexOf('cir') === 0) {
            val = rad * 0.5 / Math.PI;
        }
        return val;
    };
    /**
     * Arc length.
     * @memberOf Arc.prototype
     * @name L
     * @returns {Number} Length of the arc.
     * @see Arc#Value
     */ el.L = function() {
        return this.Value('length');
    };
    // documented in geometry element
    el.hasPoint = function(x, y) {
        var dist, checkPoint, has, invMat, c, prec, type, r = this.Radius();
        if (this.evalVisProp('hasinnerpoints')) {
            return this.hasPointSector(x, y);
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isObject(this.evalVisProp('precision'))) {
            type = this.board._inputDevice;
            prec = this.evalVisProp('precision.' + type);
        } else {
            // 'inherit'
            prec = this.board.options.precision.hasPoint;
        }
        prec /= Math.min(Math.abs(this.board.unitX), Math.abs(this.board.unitY));
        checkPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, [
            x,
            y
        ], this.board);
        if (this.transformations.length > 0) {
            // Transform the mouse/touch coordinates
            // back to the original position of the curve.
            this.updateTransformMatrix();
            invMat = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].inverse(this.transformMat);
            c = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(invMat, checkPoint.usrCoords);
            checkPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, c, this.board);
        }
        dist = this.center.coords.distance(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, checkPoint);
        has = Math.abs(dist - r) < prec;
        /**
         * At that point we know that the user has touched the circle line.
         * Now, we have to check, if the user has hit the arc path.
         */ if (has) {
            has = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].coordsOnArc(this, checkPoint);
        }
        return has;
    };
    /**
     * Checks whether (x,y) is within the sector defined by the arc.
     * @memberOf Arc.prototype
     * @name hasPointSector
     * @function
     * @param {Number} x Coordinate in x direction, screen coordinates.
     * @param {Number} y Coordinate in y direction, screen coordinates.
     * @returns {Boolean} True if (x,y) is within the sector defined by the arc, False otherwise.
     */ el.hasPointSector = function(x, y) {
        var checkPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, [
            x,
            y
        ], this.board), r = this.Radius(), dist = this.center.coords.distance(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, checkPoint), has = dist < r;
        if (has) {
            has = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].coordsOnArc(this, checkPoint);
        }
        return has;
    };
    // documented in geometry element
    el.getTextAnchor = function() {
        return this.center.coords;
    };
    // documented in geometry element
    /**
     * @class
     * @ignore
     */ el.getLabelAnchor = function() {
        var coords, vec, vecx, vecy, len, pos = this.label.evalVisProp('position'), angle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].rad(this.radiuspoint, this.center, this.anglepoint), dx = 10 / this.board.unitX, dy = 10 / this.board.unitY, p2c = this.point2.coords.usrCoords, pmc = this.center.coords.usrCoords, bxminusax = p2c[1] - pmc[1], byminusay = p2c[2] - pmc[2], ev_s = this.evalVisProp('selection'), l_vp = this.label ? this.label.visProp : this.visProp.label;
        // If this is uncommented, the angle label can not be dragged
        //if (Type.exists(this.label)) {
        //    this.label.relativeCoords = new Coords(Const.COORDS_BY_SCREEN, [0, 0], this.board);
        //}
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(pos) || pos.indexOf('right') < 0 && pos.indexOf('left') < 0) {
            if (ev_s === "minor" && angle > Math.PI || ev_s === "major" && angle < Math.PI) {
                angle = -(2 * Math.PI - angle);
            }
            coords = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                pmc[1] + Math.cos(angle * 0.5) * bxminusax - Math.sin(angle * 0.5) * byminusay,
                pmc[2] + Math.sin(angle * 0.5) * bxminusax + Math.cos(angle * 0.5) * byminusay
            ], this.board);
            vecx = coords.usrCoords[1] - pmc[1];
            vecy = coords.usrCoords[2] - pmc[2];
            len = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(vecx, vecy);
            vecx = vecx * (len + dx) / len;
            vecy = vecy * (len + dy) / len;
            vec = [
                pmc[1] + vecx,
                pmc[2] + vecy
            ];
            l_vp.position = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].calcLabelQuadrant(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].rad([
                1,
                0
            ], [
                0,
                0
            ], vec));
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, vec, this.board);
        } else {
            return this.getLabelPosition(pos, this.label.evalVisProp('distance'));
        }
    };
    // documentation in jxg.circle
    el.updateQuadraticform = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].prototype.updateQuadraticform;
    // documentation in jxg.circle
    el.updateStdform = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].prototype.updateStdform;
    el.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(el.methodMap, {
        getRadius: "getRadius",
        radius: "Radius",
        Radius: "Radius",
        center: "center",
        radiuspoint: "radiuspoint",
        anglepoint: "anglepoint",
        Value: "Value",
        L: "L"
    });
    el.prepareUpdate().update();
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("arc", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createArc);
/**
 * @class A semicircle is a special arc defined by two points. The arc hits both points.
 * @pseudo
 * @name Semicircle
 * @augments Arc
 * @constructor
 * @type Arc
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point} p1,p2 The result will be a composition of an arc drawn clockwise from <tt>p1</tt> and
 * <tt>p2</tt> and the midpoint of <tt>p1</tt> and <tt>p2</tt>.
 * @example
 * // Create an arc out of three free points
 * var p1 = board.create('point', [4.5, 2.0]);
 * var p2 = board.create('point', [1.0, 0.5]);
 *
 * var a = board.create('semicircle', [p1, p2]);
 * </pre><div class="jxgbox" id="JXG5385d349-75d7-4078-b732-9ae808db1b0e" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXG5385d349-75d7-4078-b732-9ae808db1b0e', {boundingbox: [-1, 7, 7, -1], axis: true, showcopyright: false, shownavigation: false}),
 *       p1 = board.create('point', [4.5, 2.0]),
 *       p2 = board.create('point', [1.0, 0.5]),
 *
 *       sc = board.create('semicircle', [p1, p2]);
 * })();
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createSemicircle = function(board, parents, attributes) {
    var el, mp, attr, points;
    // we need 2 points
    points = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, parents, attributes, "point");
    if (points === false || points.length !== 2) {
        throw new Error("JSXGraph: Can't create Semicircle with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [point,point]");
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "semicircle", "center");
    mp = board.create("midpoint", points, attr);
    mp.dump = false;
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "semicircle");
    el = board.create("arc", [
        mp,
        points[1],
        points[0]
    ], attr);
    el.elType = "semicircle";
    el.setParents([
        points[0].id,
        points[1].id
    ]);
    el.subs = {
        midpoint: mp
    };
    el.inherits.push(mp);
    /**
     * The midpoint of the two defining points.
     * @memberOf Semicircle.prototype
     * @name midpoint
     * @type Midpoint
     */ el.midpoint = el.center = mp;
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("semicircle", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createSemicircle);
/**
 * @class A partial circum circle through three points.
 * @pseudo
 * @name CircumcircleArc
 * @augments Arc
 * @constructor
 * @type Arc
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p3 The result will be a composition of an arc of the circumcircle of
 * <tt>p1</tt>, <tt>p2</tt>, and <tt>p3</tt> and the midpoint of the circumcircle of the three points. The arc is drawn
 * counter-clockwise from <tt>p1</tt> over <tt>p2</tt> to <tt>p3</tt>.
 * @example
 * // Create a circum circle arc out of three free points
 * var p1 = board.create('point', [2.0, 2.0]);
 * var p2 = board.create('point', [1.0, 0.5]);
 * var p3 = board.create('point', [3.5, 1.0]);
 *
 * var a = board.create('circumcirclearc', [p1, p2, p3]);
 * </pre><div class="jxgbox" id="JXG87125fd4-823a-41c1-88ef-d1a1369504e3" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXG87125fd4-823a-41c1-88ef-d1a1369504e3', {boundingbox: [-1, 7, 7, -1], axis: true, showcopyright: false, shownavigation: false}),
 *       p1 = board.create('point', [2.0, 2.0]),
 *       p2 = board.create('point', [1.0, 0.5]),
 *       p3 = board.create('point', [3.5, 1.0]),
 *
 *       cca = board.create('circumcirclearc', [p1, p2, p3]);
 * })();
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCircumcircleArc = function(board, parents, attributes) {
    var el, mp, attr, points;
    // We need three points
    points = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, parents, attributes, "point");
    if (points === false || points.length !== 3) {
        throw new Error("JSXGraph: create Circumcircle Arc with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "' and '" + typeof parents[2] + "'." + "\nPossible parent types: [point,point,point]");
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "circumcirclearc", "center");
    mp = board.create("circumcenter", points, attr);
    mp.dump = false;
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "circumcirclearc");
    attr.usedirection = true;
    el = board.create("arc", [
        mp,
        points[0],
        points[2],
        points[1]
    ], attr);
    el.elType = "circumcirclearc";
    el.setParents([
        points[0].id,
        points[1].id,
        points[2].id
    ]);
    el.subs = {
        center: mp
    };
    el.inherits.push(mp);
    /**
     * The midpoint of the circumcircle of the three points defining the circumcircle arc.
     * @memberOf CircumcircleArc.prototype
     * @name center
     * @type Circumcenter
     */ el.center = mp;
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("circumcirclearc", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCircumcircleArc);
/**
 * @class A minor arc given by three points is that part of the circumference of a circle having
 * measure at most 180 degrees (pi radians). It is defined by a center, one point that
 * defines the radius, and a third point that defines the angle of the arc.
 * @pseudo
 * @name MinorArc
 * @augments Curve
 * @constructor
 * @type JXG.Curve
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p3 . Minor arc is an arc of a circle around p1 having measure less than or equal to
 * 180 degrees (pi radians) and starts at p2. The radius is determined by p2, the angle by p3.
 * @example
 * // Create an arc out of three free points
 * var p1 = board.create('point', [2.0, 2.0]);
 * var p2 = board.create('point', [1.0, 0.5]);
 * var p3 = board.create('point', [3.5, 1.0]);
 *
 * var a = board.create('arc', [p1, p2, p3]);
 * </pre><div class="jxgbox" id="JXG64ba7ca2-8728-45f3-96e5-3c7a4414de2f" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXG64ba7ca2-8728-45f3-96e5-3c7a4414de2f', {boundingbox: [-1, 7, 7, -1], axis: true, showcopyright: false, shownavigation: false}),
 *       p1 = board.create('point', [2.0, 2.0]),
 *       p2 = board.create('point', [1.0, 0.5]),
 *       p3 = board.create('point', [3.5, 1.0]),
 *
 *       a = board.create('minorarc', [p1, p2, p3]);
 * })();
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMinorArc = function(board, parents, attributes) {
    attributes.selection = "minor";
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createArc(board, parents, attributes);
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("minorarc", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMinorArc);
/**
 * @class A major arc given by three points is that part of the circumference of a circle having
 * measure at least 180 degrees (pi radians). It is defined by a center, one point that
 * defines the radius, and a third point that defines the angle of the arc.
 * @pseudo
 * @name MajorArc
 * @augments Curve
 * @constructor
 * @type JXG.Curve
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p3 . Major arc is an arc of a circle around p1 having measure greater than or equal to
 * 180 degrees (pi radians) and starts at p2. The radius is determined by p2, the angle by p3.
 * @example
 * // Create an arc out of three free points
 * var p1 = board.create('point', [2.0, 2.0]);
 * var p2 = board.create('point', [1.0, 0.5]);
 * var p3 = board.create('point', [3.5, 1.0]);
 *
 * var a = board.create('majorarc', [p1, p2, p3]);
 * </pre><div class="jxgbox" id="JXG17a10d38-5629-40a4-b150-f41806edee9f" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXG17a10d38-5629-40a4-b150-f41806edee9f', {boundingbox: [-1, 7, 7, -1], axis: true, showcopyright: false, shownavigation: false}),
 *       p1 = board.create('point', [2.0, 2.0]),
 *       p2 = board.create('point', [1.0, 0.5]),
 *       p3 = board.create('point', [3.5, 1.0]),
 *
 *       a = board.create('majorarc', [p1, p2, p3]);
 * })();
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMajorArc = function(board, parents, attributes) {
    attributes.selection = "major";
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createArc(board, parents, attributes);
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("majorarc", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMajorArc);
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/sector.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software dual licensed under the GNU LGPL or MIT License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License and
    the MIT License along with JSXGraph. If not, see <https://www.gnu.org/licenses/>
    and <https://opensource.org/licenses/MIT/>.
 */ /*global JXG: true, define: true*/ /*jslint nomen: true, plusplus: true*/ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$statistics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/statistics.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coords.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
/**
 * @class A circular sector is a subarea of the area enclosed by a circle. It is enclosed by two radii and an arc.
 * <p>
 * The sector as curve consists of two legs and an arc. The curve length is 6. That means, a point with coordinates
 * [sector.X(t), sector.Y(t)] is on
 * <ul>
 * <li> leg 1 if t is between 0 and 1,
 * <li> the arc if t is between 1 and 5,
 * <li> leg 2 if t is between 5 and 6.
 * </ul>
 * @pseudo
 * @name Sector
 * @augments JXG.Curve
 * @constructor
 * @type JXG.Curve
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 *
 * First possibility of input parameters are:
 * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p3 A sector is defined by three points: The sector's center <tt>p1</tt>,
 * a second point <tt>p2</tt> defining the radius and a third point <tt>p3</tt> defining the angle of the sector. The
 * Sector is always drawn counter clockwise from <tt>p2</tt> to <tt>p3</tt>.
 * <p>
 * In this case, the sector will have an arc as sub-object.
 * <p>
 * Second possibility of input parameters are:
 * @param {JXG.Line_JXG.Line_array,number_array,number_number,function} line, line2, coords1 or direction1, coords2 or direction2, radius The sector is defined by two lines.
 * The two legs which define the sector are given by two coordinates arrays which are projected initially to the two lines or by
 * two directions (+/- 1). If the two lines are parallel, two of the defining points on different lines have to coincide.
 * This will be the center of the sector.
 * The last parameter is the radius of the sector.
 * <p>In this case, the sector will <b>not</b> have an arc as sub-object.
 *
 * @example
 * // Create a sector out of three free points
 * var p1 = board.create('point', [1.5, 5.0]),
 *     p2 = board.create('point', [1.0, 0.5]),
 *     p3 = board.create('point', [5.0, 3.0]),
 *
 *     a = board.create('sector', [p1, p2, p3]);
 * </pre><div class="jxgbox" id="JXG49f59123-f013-4681-bfd9-338b89893156" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXG49f59123-f013-4681-bfd9-338b89893156', {boundingbox: [-1, 7, 7, -1], axis: true, showcopyright: false, shownavigation: false}),
 *     p1 = board.create('point', [1.5, 5.0]),
 *     p2 = board.create('point', [1.0, 0.5]),
 *     p3 = board.create('point', [5.0, 3.0]),
 *
 *     a = board.create('sector', [p1, p2, p3]);
 * })();
 * </script><pre>
 *
 * @example
 * // Create a sector out of two lines, two directions and a radius
 * var p1 = board.create('point', [-1, 4]),
 *  p2 = board.create('point', [4, 1]),
 *  q1 = board.create('point', [-2, -3]),
 *  q2 = board.create('point', [4,3]),
 *
 *  li1 = board.create('line', [p1,p2], {strokeColor:'black', lastArrow:true}),
 *  li2 = board.create('line', [q1,q2], {lastArrow:true}),
 *
 *  sec1 = board.create('sector', [li1, li2, [5.5, 0], [4, 3], 3]),
 *  sec2 = board.create('sector', [li1, li2, 1, -1, 4]);
 *
 * </pre><div class="jxgbox" id="JXGbb9e2809-9895-4ff1-adfa-c9c71d50aa53" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXGbb9e2809-9895-4ff1-adfa-c9c71d50aa53', {boundingbox: [-1, 7, 7, -1], axis: true, showcopyright: false, shownavigation: false}),
 *     p1 = board.create('point', [-1, 4]),
 *     p2 = board.create('point', [4, 1]),
 *     q1 = board.create('point', [-2, -3]),
 *     q2 = board.create('point', [4,3]),
 *
 *     li1 = board.create('line', [p1,p2], {strokeColor:'black', lastArrow:true}),
 *     li2 = board.create('line', [q1,q2], {lastArrow:true}),
 *
 *     sec1 = board.create('sector', [li1, li2, [5.5, 0], [4, 3], 3]),
 *     sec2 = board.create('sector', [li1, li2, 1, -1, 4]);
 * })();
 * </script><pre>
 *
 * @example
 * var t = board.create('transform', [2, 1.5], {type: 'scale'});
 * var s1 = board.create('sector', [[-3.5,-3], [-3.5, -2], [-3.5,-4]], {
 *                 anglePoint: {visible:true}, center: {visible: true}, radiusPoint: {visible: true},
 *                 fillColor: 'yellow', strokeColor: 'black'});
 * var s2 = board.create('curve', [s1, t], {fillColor: 'yellow', strokeColor: 'black'});
 *
 * </pre><div id="JXG2e70ee14-6339-11e8-9fb9-901b0e1b8723" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG2e70ee14-6339-11e8-9fb9-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var t = board.create('transform', [2, 1.5], {type: 'scale'});
 *     var s1 = board.create('sector', [[-3.5,-3], [-3.5, -2], [-3.5,-4]], {
 *                     anglePoint: {visible:true}, center: {visible: true}, radiusPoint: {visible: true},
 *                     fillColor: 'yellow', strokeColor: 'black'});
 *     var s2 = board.create('curve', [s1, t], {fillColor: 'yellow', strokeColor: 'black'});
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * var A = board.create('point', [3, -2]),
 *     B = board.create('point', [-2, -2]),
 *     C = board.create('point', [0, 4]);
 *
 * var angle = board.create('sector', [B, A, C], {
 *         strokeWidth: 0,
 *         arc: {
 *         	visible: true,
 *         	strokeWidth: 3,
 *           lastArrow: {size: 4},
 *           firstArrow: {size: 4}
 *         }
 *       });
 * //angle.arc.setAttribute({firstArrow: false});
 * angle.arc.setAttribute({lastArrow: false});
 *
 * </pre><div id="JXGca37b99e-1510-49fa-ac9e-efd60e956104" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGca37b99e-1510-49fa-ac9e-efd60e956104',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var A = board.create('point', [3, -2]),
 *         B = board.create('point', [-2, -2]),
 *         C = board.create('point', [0, 4]);
 *
 *     var angle = board.create('sector', [B, A, C], {
 *             strokeWidth: 0,
 *             arc: {
 *             	visible: true,
 *             	strokeWidth: 3,
 *               lastArrow: {size: 4},
 *               firstArrow: {size: 4}
 *             }
 *           });
 *     //angle.arc.setAttribute({firstArrow: false});
 *     angle.arc.setAttribute({lastArrow: false});
 *
 *     })();
 *
 * </script><pre>
 *
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createSector = function(board, parents, attributes) {
    var el, attr, i, eps = 1.0e-14, type = "invalid", s, v, attrPoints = [
        "center",
        "radiusPoint",
        "anglePoint"
    ], points;
    // Three points?
    if (parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE && parents[1].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE && (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[2]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(parents[2])) && (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[3]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(parents[3])) && (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(parents[4]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[4]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(parents[4]))) {
        type = "2lines";
    } else {
        points = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, parents, attributes, "sector", attrPoints);
        if (points === false) {
            throw new Error("JSXGraph: Can't create Sector with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "' and '" + typeof parents[2] + "'.");
        }
        type = "3points";
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "sector");
    // The curve length is 6: 0-1: leg 1, 1-5: arc, 5-6: leg 2
    el = board.create("curve", [
        [
            0
        ],
        [
            0
        ],
        0,
        6
    ], attr);
    el.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_SECTOR;
    el.elType = "sector";
    /**
     * Sets radius if the attribute `radius` has value 'auto'.
     * Sets a radius between 20 and 50 points, depending on the distance
     * between the center and the radius point.
     * This function is used in {@link Angle}.
     *
     * @name autoRadius
     * @memberof Sector.prototype
     * @function
     * @returns {Number} returns a radius value in user coordinates.
     * @private
     */ el.autoRadius = function() {
        var r1 = 20 / el.board.unitX, r2 = Infinity, r3 = 50 / el.board.unitX; // 50px
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(el.center)) {
            // This does not work for 2-lines sectors / angles
            r2 = el.center.Dist(el.point2) * 0.3333;
        }
        return Math.max(r1, Math.min(r2, r3));
    };
    if (type === "2lines") {
        /**
         * @ignore
         */ el.Radius = function() {
            var r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(parents[4]);
            if (r === "auto") {
                return this.autoRadius();
            }
            return r;
        };
        el.line1 = board.select(parents[0]);
        el.line2 = board.select(parents[1]);
        el.line1.addChild(el);
        el.line2.addChild(el);
        el.setParents(parents);
        el.point1 = {
            visProp: {}
        };
        el.point2 = {
            visProp: {}
        };
        el.point3 = {
            visProp: {}
        };
        // Intersection point, just used locally for direction1 and  direction2
        s = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].meetLineLine(el.line1.stdform, el.line2.stdform, 0, board);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(s.usrCoords, [
            0,
            0,
            0
        ], 3) < eps) {
            // Parallel lines
            if (el.line1.point1.Dist(el.line2.point1) < eps || el.line1.point1.Dist(el.line2.point2) < eps) {
                s = el.line1.point1.coords;
            } else if (el.line1.point2.Dist(el.line2.point1) < eps || el.line1.point2.Dist(el.line2.point1) < eps) {
                s = el.line1.point2.coords;
            } else {
                console.log("JSXGraph warning: Can't create Sector from parallel lines with no common defining point.");
            }
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[2])) {
            /* project p1 to l1 */ if (parents[2].length === 2) {
                parents[2] = [
                    1
                ].concat(parents[2]);
            }
            /*
                v = [0, el.line1.stdform[1], el.line1.stdform[2]];
                v = Mat.crossProduct(v, parents[2]);
                v = Geometry.meetLineLine(v, el.line1.stdform, 0, board);
                */ v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].projectPointToLine({
                coords: {
                    usrCoords: parents[2]
                }
            }, el.line1, board);
            v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$statistics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].subtract(v.usrCoords, s.usrCoords);
            el.direction1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(v, [
                0,
                el.line1.stdform[2],
                -el.line1.stdform[1]
            ], 3) >= 0 ? +1 : -1;
        } else {
            el.direction1 = parents[2] >= 0 ? 1 : -1;
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[3])) {
            /* project p2 to l2 */ if (parents[3].length === 2) {
                parents[3] = [
                    1
                ].concat(parents[3]);
            }
            /*
                v = [0, el.line2.stdform[1], el.line2.stdform[2]];
                v = Mat.crossProduct(v, parents[3]);
                v = Geometry.meetLineLine(v, el.line2.stdform, 0, board);
                */ v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].projectPointToLine({
                coords: {
                    usrCoords: parents[3]
                }
            }, el.line2, board);
            v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$statistics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].subtract(v.usrCoords, s.usrCoords);
            el.direction2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(v, [
                0,
                el.line2.stdform[2],
                -el.line2.stdform[1]
            ], 3) >= 0 ? +1 : -1;
        } else {
            el.direction2 = parents[3] >= 0 ? 1 : -1;
        }
        el.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(el.methodMap, {
            arc: "arc",
            center: "center",
            line1: "line1",
            line2: "line2"
        });
        /**
         * @class
         * @ignore
         */ el.updateDataArray = function() {
            var r, l1, l2, eps = 1.0e-14, A = [
                0,
                0,
                0
            ], B = [
                0,
                0,
                0
            ], C = [
                0,
                0,
                0
            ], ar;
            l1 = this.line1;
            l2 = this.line2;
            // Intersection point of the lines
            B = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct(l1.stdform, l2.stdform);
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(B, [
                0,
                0,
                0
            ], 3) < eps) {
                // Parallel lines
                if (l1.point1.Dist(l2.point1) < eps || l1.point1.Dist(l2.point2) < eps) {
                    B = l1.point1.coords.usrCoords;
                } else if (l1.point2.Dist(l2.point1) < eps || l1.point2.Dist(l2.point1) < eps) {
                    B = l1.point2.coords.usrCoords;
                } else {}
            }
            if (Math.abs(B[0]) > eps) {
                B[1] /= B[0];
                B[2] /= B[0];
                B[0] /= B[0];
            }
            // First point
            r = this.direction1 * this.Radius();
            A = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$statistics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].add(B, [
                0,
                r * l1.stdform[2],
                -r * l1.stdform[1]
            ]);
            // Second point
            r = this.direction2 * this.Radius();
            C = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$statistics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].add(B, [
                0,
                r * l2.stdform[2],
                -r * l2.stdform[1]
            ]);
            this.point2.coords = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, A, el.board);
            this.point1.coords = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, B, el.board);
            this.point3.coords = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, C, el.board);
            if (Math.abs(A[0]) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps || Math.abs(B[0]) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps || Math.abs(C[0]) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps) {
                this.dataX = [
                    NaN
                ];
                this.dataY = [
                    NaN
                ];
                return;
            }
            ar = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bezierArc(A, B, C, true, 1);
            this.dataX = ar[0];
            this.dataY = ar[1];
            this.bezierDegree = 3;
        };
    // Arc does not work yet, since point1, point2 and point3 are
    // virtual points.
    //
    // attr = Type.copyAttributes(attributes, board.options, "arc");
    // attr = Type.copyAttributes(attr, board.options, "sector", "arc");
    // attr.withlabel = false;
    // attr.name += "_arc";
    // // el.arc = board.create("arc", [el.point1, el.point2, el.point3], attr);
    // // The arc's radius is always the radius of sector.
    // // This is important for angles.
    // el.updateDataArray();
    // el.arc = board.create("arc", [
    //     function() {
    //         return el.point1.coords.usrCoords;
    //     }, // Center
    //     function() {
    //         var d = el.point2.coords.distance(Const.COORDS_BY_USER, el.point1.coords);
    //         if (d === 0) {
    //             return [el.point1.coords.usrCoords[1], el.point1.coords.usrCoords[2]];
    //         }
    //         return [
    //             el.point1.coords.usrCoords[1] + el.Radius() * (el.point2.coords.usrCoords[1] - el.point1.coords.usrCoords[1]) / d,
    //             el.point1.coords.usrCoords[2] + el.Radius() * (el.point2.coords.usrCoords[2] - el.point1.coords.usrCoords[2]) / d
    //         ];
    //     },
    //     function() {
    //         return el.point3.coords.usrCoords;
    //     }, // Center
    // ], attr);
    // el.addChild(el.arc);
    // end '2lines'
    } else if (type === "3points") {
        /**
         * Midpoint of the sector.
         * @memberOf Sector.prototype
         * @name point1
         * @type JXG.Point
         */ el.point1 = points[0];
        /**
         * This point together with {@link Sector#point1} defines the radius.
         * @memberOf Sector.prototype
         * @name point2
         * @type JXG.Point
         */ el.point2 = points[1];
        /**
         * Defines the sector's angle.
         * @memberOf Sector.prototype
         * @name point3
         * @type JXG.Point
         */ el.point3 = points[2];
        /* Add arc as child to defining points */ for(i = 0; i < 3; i++){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(points[i]._is_new)) {
                el.addChild(points[i]);
                delete points[i]._is_new;
            } else {
                points[i].addChild(el);
            }
        }
        // useDirection is necessary for circumCircleSectors
        el.useDirection = attributes.usedirection; // this makes the attribute immutable
        el.setParents(points);
        /**
         * Defines the sectors orientation in case of circumCircleSectors.
         * @memberOf Sector.prototype
         * @name point4
         * @type JXG.Point
         */ if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(points[3])) {
            el.point4 = points[3];
            el.point4.addChild(el);
        }
        el.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(el.methodMap, {
            arc: "arc",
            center: "center",
            radiuspoint: "radiuspoint",
            anglepoint: "anglepoint"
        });
        /**
         * @class
         * @ignore
         */ el.updateDataArray = function() {
            var ar, det, p0c, p1c, p2c, A = this.point2, B = this.point1, C = this.point3, phi, sgn = 1, vp_s = this.evalVisProp('selection');
            if (!A.isReal || !B.isReal || !C.isReal) {
                this.dataX = [
                    NaN
                ];
                this.dataY = [
                    NaN
                ];
                return;
            }
            phi = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].rad(A, B, C);
            if (vp_s === "minor" && phi > Math.PI || vp_s === "major" && phi < Math.PI) {
                sgn = -1;
            }
            // This is true for circumCircleSectors. In that case there is
            // a fourth parent element: [midpoint, point1, point3, point2]
            if (this.useDirection && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.point4)) {
                p0c = this.point2.coords.usrCoords;
                p1c = this.point4.coords.usrCoords;
                p2c = this.point3.coords.usrCoords;
                det = (p0c[1] - p2c[1]) * (p0c[2] - p1c[2]) - (p0c[2] - p2c[2]) * (p0c[1] - p1c[1]);
                if (det >= 0.0) {
                    C = this.point2;
                    A = this.point3;
                }
            }
            A = A.coords.usrCoords;
            B = B.coords.usrCoords;
            C = C.coords.usrCoords;
            ar = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bezierArc(A, B, C, true, sgn);
            this.dataX = ar[0];
            this.dataY = ar[1];
            this.bezierDegree = 3;
        };
        /**
         * Returns the radius of the sector.
         * @memberOf Sector.prototype
         * @name Radius
         * @function
         * @returns {Number} The distance between {@link Sector#point1} and {@link Sector#point2}.
         */ el.Radius = function() {
            return this.point2.Dist(this.point1);
        };
    } // end '3points'
    el.center = el.point1;
    el.radiuspoint = el.point2;
    el.anglepoint = el.point3;
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "arc");
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attr, board.options, "sector", "arc");
    attr.withlabel = false;
    // Minor or major arc:
    attr.selection = el.visProp.selection;
    attr.name += "_arc";
    if (type === "2lines") {
        el.updateDataArray();
        el.arc = board.create("arc", [
            function() {
                return el.point1.coords.usrCoords;
            },
            function() {
                var d = el.point2.coords.distance(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, el.point1.coords);
                if (d === 0) {
                    return [
                        el.point1.coords.usrCoords[1],
                        el.point1.coords.usrCoords[2]
                    ];
                }
                return [
                    el.point1.coords.usrCoords[1] + el.Radius() * (el.point2.coords.usrCoords[1] - el.point1.coords.usrCoords[1]) / d,
                    el.point1.coords.usrCoords[2] + el.Radius() * (el.point2.coords.usrCoords[2] - el.point1.coords.usrCoords[2]) / d
                ];
            },
            function() {
                return el.point3.coords.usrCoords;
            } // Center
        ], attr);
    } else {
        // The arc's radius is always the radius of sector.
        // This is important for angles.
        el.arc = board.create("arc", [
            el.point1,
            function() {
                var d = el.point2.Dist(el.point1);
                if (d === 0) {
                    return [
                        el.point1.X(),
                        el.point1.Y()
                    ];
                }
                return [
                    el.point1.X() + el.Radius() * (el.point2.X() - el.point1.X()) / d,
                    el.point1.Y() + el.Radius() * (el.point2.Y() - el.point1.Y()) / d
                ];
            },
            el.point3
        ], attr);
    }
    el.addChild(el.arc);
    // Default hasPoint method. Documented in geometry element
    el.hasPointCurve = function(x, y) {
        var angle, alpha, beta, prec, type, checkPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, [
            x,
            y
        ], this.board), r = this.Radius(), dist = this.center.coords.distance(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, checkPoint), has, vp_s = this.evalVisProp('selection');
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isObject(this.evalVisProp('precision'))) {
            type = this.board._inputDevice;
            prec = this.evalVisProp('precision.' + type);
        } else {
            // 'inherit'
            prec = this.board.options.precision.hasPoint;
        }
        prec /= Math.min(Math.abs(this.board.unitX), Math.abs(this.board.unitY));
        has = Math.abs(dist - r) < prec;
        if (has) {
            angle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].rad(this.point2, this.center, checkPoint.usrCoords.slice(1));
            alpha = 0;
            beta = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].rad(this.point2, this.center, this.point3);
            if (vp_s === "minor" && beta > Math.PI || vp_s === "major" && beta < Math.PI) {
                alpha = beta;
                beta = 2 * Math.PI;
            }
            if (angle < alpha || angle > beta) {
                has = false;
            }
        }
        return has;
    };
    /**
     * Checks whether (x,y) is within the area defined by the sector.
     * @memberOf Sector.prototype
     * @name hasPointSector
     * @function
     * @param {Number} x Coordinate in x direction, screen coordinates.
     * @param {Number} y Coordinate in y direction, screen coordinates.
     * @returns {Boolean} True if (x,y) is within the sector defined by the arc, False otherwise.
     */ el.hasPointSector = function(x, y) {
        var angle, checkPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, [
            x,
            y
        ], this.board), r = this.Radius(), dist = this.point1.coords.distance(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, checkPoint), alpha, beta, has = dist < r, vp_s = this.evalVisProp('selection');
        if (has) {
            angle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].rad(this.radiuspoint, this.center, checkPoint.usrCoords.slice(1));
            alpha = 0.0;
            beta = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].rad(this.radiuspoint, this.center, this.anglepoint);
            if (vp_s === "minor" && beta > Math.PI || vp_s === "major" && beta < Math.PI) {
                alpha = beta;
                beta = 2 * Math.PI;
            }
            //if (angle > Geometry.rad(this.point2, this.point1, this.point3)) {
            if (angle < alpha || angle > beta) {
                has = false;
            }
        }
        return has;
    };
    el.hasPoint = function(x, y) {
        if (this.evalVisProp('highlightonsector') || this.evalVisProp('hasinnerpoints')) {
            return this.hasPointSector(x, y);
        }
        return this.hasPointCurve(x, y);
    };
    // documented in GeometryElement
    el.getTextAnchor = function() {
        return this.point1.coords;
    };
    // documented in GeometryElement
    // this method is very similar to arc.getLabelAnchor()
    // there are some additions in the arc version though, mainly concerning
    // "major" and "minor" arcs. but maybe these methods can be merged.
    /**
     * @class
     * @ignore
     */ el.getLabelAnchor = function() {
        var coords, vec, vecx, vecy, len, pos = this.label.evalVisProp('position'), angle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].rad(this.point2, this.point1, this.point3), dx = 13 / this.board.unitX, dy = 13 / this.board.unitY, p2c = this.point2.coords.usrCoords, pmc = this.point1.coords.usrCoords, bxminusax = p2c[1] - pmc[1], byminusay = p2c[2] - pmc[2], vp_s = this.evalVisProp('selection'), l_vp = this.label ? this.label.visProp : this.visProp.label;
        // If this is uncommented, the angle label can not be dragged
        //if (Type.exists(this.label)) {
        //    this.label.relativeCoords = new Coords(Const.COORDS_BY_SCREEN, [0, 0], this.board);
        //}
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(pos) || pos.indexOf('right') < 0 && pos.indexOf('left') < 0) {
            if (vp_s === "minor" && angle > Math.PI || vp_s === "major" && angle < Math.PI) {
                angle = -(2 * Math.PI - angle);
            }
            coords = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                pmc[1] + Math.cos(angle * 0.5) * bxminusax - Math.sin(angle * 0.5) * byminusay,
                pmc[2] + Math.sin(angle * 0.5) * bxminusax + Math.cos(angle * 0.5) * byminusay
            ], this.board);
            vecx = coords.usrCoords[1] - pmc[1];
            vecy = coords.usrCoords[2] - pmc[2];
            len = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(vecx, vecy);
            vecx = vecx * (len + dx) / len;
            vecy = vecy * (len + dy) / len;
            vec = [
                pmc[1] + vecx,
                pmc[2] + vecy
            ];
            l_vp.position = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].calcLabelQuadrant(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].rad([
                1,
                0
            ], [
                0,
                0
            ], vec));
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, vec, this.board);
        } else {
            return this.getLabelPosition(pos, this.label.evalVisProp('distance'));
        }
    };
    /**
     * Overwrite the Radius method of the sector.
     * Used in {@link GeometryElement#setAttribute}.
     * @memberOf Sector.prototype
     * @name setRadius
     * @param {Number|Function} value New radius.
     * @function
     */ el.setRadius = function(val) {
        var res, e = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(val);
        if (val === 'auto' || e === 'auto') {
            res = 'auto';
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(val)) {
            res = 'number';
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(val) && !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(e)) {
            res = 'function';
        } else {
            res = 'undefined';
        }
        if (res !== 'undefined') {
            this.visProp.radius = val;
        }
        /**
         * @ignore
         */ el.Radius = function() {
            var r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(val);
            if (r === "auto") {
                return this.autoRadius();
            }
            return r;
        };
    };
    /**
     * @deprecated
     * @ignore
     */ el.getRadius = function() {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deprecated("Sector.getRadius()", "Sector.Radius()");
        return this.Radius();
    };
    /**
     * Length of the sector's arc or the angle in various units, see {@link Arc#Value}.
     * @memberOf Sector.prototype
     * @name Value
     * @function
     * @param {String} unit
     * @returns {Number} The arc length or the angle value in various units.
     * @see Arc#Value
     */ el.Value = function(unit) {
        return this.arc.Value(unit);
    };
    /**
     * Arc length.
     * @memberOf Sector.prototype
     * @name L
     * @returns {Number} Length of the sector's arc.
     * @function
     * @see Arc#L
     */ el.L = function() {
        return this.arc.L();
    };
    /**
     * Area of the sector.
     * @memberOf Sector.prototype
     * @name Area
     * @function
     * @returns {Number} The area of the sector.
     */ el.Area = function() {
        var r = this.Radius();
        return 0.5 * r * r * this.Value('radians');
    };
    /**
     * Sector perimeter, i.e. arc length plus 2 * radius.
     * @memberOf Sector.prototype
     * @name Perimeter
     * @function
     * @returns {Number} Perimeter of sector.
     */ el.Perimeter = function() {
        return this.L() + 2 * this.Radius();
    };
    if (type === "3points") {
        /**
         * Moves the sector by the difference of two coordinates.
         * @memberOf Sector.prototype
         * @name setPositionDirectly
         * @function
         * @param {Number} method The type of coordinates used here. Possible values are {@link JXG.COORDS_BY_USER} and {@link JXG.COORDS_BY_SCREEN}.
         * @param {Array} coords coordinates in screen/user units
         * @param {Array} oldcoords previous coordinates in screen/user units
         * @returns {JXG.Curve} this element
         * @private
         */ el.setPositionDirectly = function(method, coords, oldcoords) {
            var dc, t, c = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](method, coords, this.board), oldc = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](method, oldcoords, this.board);
            if (!el.point1.draggable() || !el.point2.draggable() || !el.point3.draggable()) {
                return this;
            }
            dc = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$statistics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].subtract(c.usrCoords, oldc.usrCoords);
            t = this.board.create("transform", dc.slice(1), {
                type: "translate"
            });
            t.applyOnce([
                el.point1,
                el.point2,
                el.point3
            ]);
            return this;
        };
    }
    el.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(el.methodMap, {
        radius: "Radius",
        Radius: "Radius",
        getRadius: "Radius",
        setRadius: "setRadius",
        Value: "Value",
        L: "L",
        Area: "Area",
        Perimeter: "Perimeter"
    });
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("sector", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createSector);
/**
 * @class A sector whose arc is a circum circle arc through three points.
 * A circumcircle sector is different from a {@link Sector} mostly in the way the parent elements are interpreted.
 * At first, the circum center is determined from the three given points.
 * Then the sector is drawn from <tt>p1</tt> through
 * <tt>p2</tt> to <tt>p3</tt>.
 * @pseudo
 * @name CircumcircleSector
 * @augments Sector
 * @constructor
 * @type Sector
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p1 A circumcircle sector is defined by the circumcircle which is determined
 * by these three given points. The circumcircle sector is always drawn from <tt>p1</tt> through <tt>p2</tt> to <tt>p3</tt>.
 * @example
 * // Create an arc out of three free points
 * var p1 = board.create('point', [1.5, 5.0]),
 *     p2 = board.create('point', [1.0, 0.5]),
 *     p3 = board.create('point', [5.0, 3.0]),
 *
 *     a = board.create('circumcirclesector', [p1, p2, p3]);
 * </pre><div class="jxgbox" id="JXG695cf0d6-6d7a-4d4d-bfc9-34c6aa28cd04" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXG695cf0d6-6d7a-4d4d-bfc9-34c6aa28cd04', {boundingbox: [-1, 7, 7, -1], axis: true, showcopyright: false, shownavigation: false}),
 *     p1 = board.create('point', [1.5, 5.0]),
 *     p2 = board.create('point', [1.0, 0.5]),
 *     p3 = board.create('point', [5.0, 3.0]),
 *
 *     a = board.create('circumcirclesector', [p1, p2, p3]);
 * })();
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCircumcircleSector = function(board, parents, attributes) {
    var el, mp, attr, points;
    points = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, parents, attributes, "point");
    if (points === false) {
        throw new Error("JSXGraph: Can't create circumcircle sector with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "' and '" + typeof parents[2] + "'.");
    }
    mp = board.create("circumcenter", points.slice(0, 3), attr);
    mp.dump = false;
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "circumcirclesector");
    el = board.create("sector", [
        mp,
        points[0],
        points[2],
        points[1]
    ], attr);
    el.elType = "circumcirclesector";
    el.setParents(points);
    /**
     * Center of the circumcirclesector
     * @memberOf CircumcircleSector.prototype
     * @name center
     * @type Circumcenter
     */ el.center = mp;
    el.subs = {
        center: mp
    };
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("circumcirclesector", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCircumcircleSector);
/**
 * @class A minor sector is a sector of a circle having measure at most
 * 180 degrees (pi radians). It is defined by a center, one point that
 * defines the radius, and a third point that defines the angle of the sector.
 * @pseudo
 * @name MinorSector
 * @augments Curve
 * @constructor
 * @type JXG.Curve
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p3 . Minor sector is a sector of a circle around p1 having measure less than or equal to
 * 180 degrees (pi radians) and starts at p2. The radius is determined by p2, the angle by p3.
 * @example
 * // Create sector out of three free points
 * var p1 = board.create('point', [2.0, 2.0]);
 * var p2 = board.create('point', [1.0, 0.5]);
 * var p3 = board.create('point', [3.5, 1.0]);
 *
 * var a = board.create('minorsector', [p1, p2, p3]);
 * </pre><div class="jxgbox" id="JXGaf27ddcc-265f-428f-90dd-d31ace945800" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXGaf27ddcc-265f-428f-90dd-d31ace945800', {boundingbox: [-1, 7, 7, -1], axis: true, showcopyright: false, shownavigation: false}),
 *       p1 = board.create('point', [2.0, 2.0]),
 *       p2 = board.create('point', [1.0, 0.5]),
 *       p3 = board.create('point', [3.5, 1.0]),
 *
 *       a = board.create('minorsector', [p1, p2, p3]);
 * })();
 * </script><pre>
 *
 * @example
 * var A = board.create('point', [3, -2]),
 *     B = board.create('point', [-2, -2]),
 *     C = board.create('point', [0, 4]);
 *
 * var angle = board.create('minorsector', [B, A, C], {
 *         strokeWidth: 0,
 *         arc: {
 *         	visible: true,
 *         	strokeWidth: 3,
 *           lastArrow: {size: 4},
 *           firstArrow: {size: 4}
 *         }
 *       });
 * //angle.arc.setAttribute({firstArrow: false});
 * angle.arc.setAttribute({lastArrow: false});
 *
 *
 * </pre><div id="JXGdddf3c8f-4b0c-4268-8171-8fcd30e71f60" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGdddf3c8f-4b0c-4268-8171-8fcd30e71f60',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var A = board.create('point', [3, -2]),
 *         B = board.create('point', [-2, -2]),
 *         C = board.create('point', [0, 4]);
 *
 *     var angle = board.create('minorsector', [B, A, C], {
 *             strokeWidth: 0,
 *             arc: {
 *             	visible: true,
 *             	strokeWidth: 3,
 *               lastArrow: {size: 4},
 *               firstArrow: {size: 4}
 *             }
 *           });
 *     //angle.arc.setAttribute({firstArrow: false});
 *     angle.arc.setAttribute({lastArrow: false});
 *
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMinorSector = function(board, parents, attributes) {
    attributes.selection = "minor";
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createSector(board, parents, attributes);
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("minorsector", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMinorSector);
/**
 * @class A major sector is a sector of a circle having measure at least
 * 180 degrees (pi radians). It is defined by a center, one point that
 * defines the radius, and a third point that defines the angle of the sector.
 * @pseudo
 * @name MajorSector
 * @augments Curve
 * @constructor
 * @type JXG.Curve
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p3 . Major sector is a sector of a circle around p1 having measure greater than or equal to
 * 180 degrees (pi radians) and starts at p2. The radius is determined by p2, the angle by p3.
 * @example
 * // Create an arc out of three free points
 * var p1 = board.create('point', [2.0, 2.0]);
 * var p2 = board.create('point', [1.0, 0.5]);
 * var p3 = board.create('point', [3.5, 1.0]);
 *
 * var a = board.create('majorsector', [p1, p2, p3]);
 * </pre><div class="jxgbox" id="JXG83c6561f-7561-4047-b98d-036248a00932" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXG83c6561f-7561-4047-b98d-036248a00932', {boundingbox: [-1, 7, 7, -1], axis: true, showcopyright: false, shownavigation: false}),
 *       p1 = board.create('point', [2.0, 2.0]),
 *       p2 = board.create('point', [1.0, 0.5]),
 *       p3 = board.create('point', [3.5, 1.0]),
 *
 *       a = board.create('majorsector', [p1, p2, p3]);
 * })();
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMajorSector = function(board, parents, attributes) {
    attributes.selection = "major";
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createSector(board, parents, attributes);
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("majorsector", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMajorSector);
/**
 * @class Angle sector defined by three points or two lines.
 * Visually it is just a {@link Sector}
 * element with a radius not defined by the parent elements but by an attribute <tt>radius</tt>. As opposed to the sector,
 * an angle has two angle points and no radius point.
 * Sector is displayed if type=="sector".
 * If type=="square", instead of a sector a parallelogram is displayed.
 * In case of type=="auto", a square is displayed if the angle is near orthogonal. The precision
 * to decide if an angle is orthogonal is determined by the attribute
 * {@link Angle#orthoSensitivity}.
 * <p>
 * If no name is provided the angle label is automatically set to a lower greek letter. If no label should be displayed use
 * the attribute <tt>withLabel:false</tt> or set the name attribute to the empty string.
 *
 * @pseudo
 * @name Angle
 * @augments Sector
 * @constructor
 * @type Sector
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * First possibility of input parameters are:
 * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p1 An angle is always drawn counterclockwise from <tt>p1</tt> to
 * <tt>p3</tt> around <tt>p2</tt>.
 *
 * Second possibility of input parameters are:
 * @param {JXG.Line_JXG.Line_array|number_array|number} line, line2, coords1 or direction1, coords2 or direction2, radius The angle is defined by two lines.
 * The two legs which define the angle are given by two coordinate arrays.
 * The points given by these coordinate arrays are projected initially (i.e. only once) onto the two lines.
 * The other possibility is to supply directions (+/- 1).
 *
 * @example
 * // Create an angle out of three free points
 * var p1 = board.create('point', [5.0, 3.0]),
 *     p2 = board.create('point', [1.0, 0.5]),
 *     p3 = board.create('point', [1.5, 5.0]),
 *
 *     a = board.create('angle', [p1, p2, p3]),
 *     t = board.create('text', [4, 4, function() { return JXG.toFixed(a.Value(), 2); }]);
 * </pre><div class="jxgbox" id="JXGa34151f9-bb26-480a-8d6e-9b8cbf789ae5" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXGa34151f9-bb26-480a-8d6e-9b8cbf789ae5', {boundingbox: [-1, 7, 7, -1], axis: true, showcopyright: false, shownavigation: false}),
 *     p1 = board.create('point', [5.0, 3.0]),
 *     p2 = board.create('point', [1.0, 0.5]),
 *     p3 = board.create('point', [1.5, 5.0]),
 *
 *     a = board.create('angle', [p1, p2, p3]),
 *     t = board.create('text', [4, 4, function() { return JXG.toFixed(a.Value(), 2); }]);
 * })();
 * </script><pre>
 *
 * @example
 * // Create an angle out of two lines and two directions
 * var p1 = board.create('point', [-1, 4]),
 *  p2 = board.create('point', [4, 1]),
 *  q1 = board.create('point', [-2, -3]),
 *  q2 = board.create('point', [4,3]),
 *
 *  li1 = board.create('line', [p1,p2], {strokeColor:'black', lastArrow:true}),
 *  li2 = board.create('line', [q1,q2], {lastArrow:true}),
 *
 *  a1 = board.create('angle', [li1, li2, [5.5, 0], [4, 3]], { radius:1 }),
 *  a2 = board.create('angle', [li1, li2, 1, -1], { radius:2 });
 *
 *
 * </pre><div class="jxgbox" id="JXG3a667ddd-63dc-4594-b5f1-afac969b371f" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXG3a667ddd-63dc-4594-b5f1-afac969b371f', {boundingbox: [-1, 7, 7, -1], axis: true, showcopyright: false, shownavigation: false}),
 *     p1 = board.create('point', [-1, 4]),
 *     p2 = board.create('point', [4, 1]),
 *     q1 = board.create('point', [-2, -3]),
 *     q2 = board.create('point', [4,3]),
 *
 *     li1 = board.create('line', [p1,p2], {strokeColor:'black', lastArrow:true}),
 *     li2 = board.create('line', [q1,q2], {lastArrow:true}),
 *
 *     a1 = board.create('angle', [li1, li2, [5.5, 0], [4, 3]], { radius:1 }),
 *     a2 = board.create('angle', [li1, li2, 1, -1], { radius:2 });
 * })();
 * </script><pre>
 *
 *
 * @example
 * // Display the angle value instead of the name
 * var p1 = board.create('point', [0,2]);
 * var p2 = board.create('point', [0,0]);
 * var p3 = board.create('point', [-2,0.2]);
 *
 * var a = board.create('angle', [p1, p2, p3], {
 * 	 radius: 1,
 *   name: function() {
 *   	return JXG.Math.Geometry.trueAngle(p1, p2, p3).toFixed(1) + '°';
 *   }});
 *
 * </pre><div id="JXGc813f601-8dd3-4030-9892-25c6d8671512" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGc813f601-8dd3-4030-9892-25c6d8671512',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *
 *     var p1 = board.create('point', [0,2]);
 *     var p2 = board.create('point', [0,0]);
 *     var p3 = board.create('point', [-2,0.2]);
 *
 *     var a = board.create('angle', [p1, p2, p3], {
 *     	radius: 1,
 *       name: function() {
 *       	return JXG.Math.Geometry.trueAngle(p1, p2, p3).toFixed(1) + '°';
 *       }});
 *
 *     })();
 *
 * </script><pre>
 *
 *
 * @example
 * // Apply a transformation to an angle.
 * var t = board.create('transform', [2, 1.5], {type: 'scale'});
 * var an1 = board.create('angle', [[-4,3.9], [-3, 4], [-3, 3]]);
 * var an2 = board.create('curve', [an1, t]);
 *
 * </pre><div id="JXG4c8d9ed8-6339-11e8-9fb9-901b0e1b8723" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG4c8d9ed8-6339-11e8-9fb9-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var t = board.create('transform', [2, 1.5], {type: 'scale'});
 *     var an1 = board.create('angle', [[-4,3.9], [-3, 4], [-3, 3]]);
 *     var an2 = board.create('curve', [an1, t]);
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createAngle = function(board, parents, attributes) {
    var el, radius, attr, attrsub, i, points, type = "invalid";
    // Two lines or three points?
    if (parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE && parents[1].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE && (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[2]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(parents[2])) && (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[3]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(parents[3]))) {
        type = "2lines";
    } else {
        attr = {
            name: ''
        };
        points = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, parents, attr, "point");
        if (points === false) {
            throw new Error("JSXGraph: Can't create angle with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "' and '" + typeof parents[2] + "'.");
        }
        type = "3points";
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "angle");
    //  If empty, create a new name
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(attr.name)) {
        attr.name = board.generateName({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_ANGLE
        });
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(attr.radius)) {
        radius = attr.radius;
    } else {
        radius = 0;
    }
    board.suspendUpdate(); // Necessary for immediate availability of radius.
    if (type === "2lines") {
        // Angle defined by two lines
        parents.push(radius);
        el = board.create("sector", parents, attr);
        /**
         * @class
         * @ignore
         */ el.updateDataArraySector = el.updateDataArray;
        // TODO
        /**
         * @class
         * @ignore
         */ el.setAngle = function(val) {};
        /**
         * @class
         * @ignore
         */ el.free = function(val) {};
    } else {
        // Angle defined by three points
        el = board.create("sector", [
            points[1],
            points[0],
            points[2]
        ], attr);
        el.arc.visProp.priv = true;
        /**
         * The point defining the radius of the angle element.
         * Alias for {@link Sector#radiuspoint}.
         * @type JXG.Point
         * @name point
         * @memberOf Angle.prototype
         *
         */ el.point = el.point2 = el.radiuspoint = points[0];
        /**
         * Helper point for angles of type 'square'.
         * @type JXG.Point
         * @name pointsquare
         * @memberOf Angle.prototype
         */ el.pointsquare = el.point3 = el.anglepoint = points[2];
        /**
         * @ignore
         */ el.Radius = function() {
            // Set the angle radius, also @see @link Sector#autoRadius
            var r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(radius);
            if (r === "auto") {
                return el.autoRadius();
            }
            return r;
        };
        /**
         * @class
         * @ignore
         */ el.updateDataArraySector = function() {
            var A = this.point2, B = this.point1, C = this.point3, r = this.Radius(), d = B.Dist(A), ar, phi, sgn = 1, vp_s = this.evalVisProp('selection');
            phi = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].rad(A, B, C);
            if (vp_s === "minor" && phi > Math.PI || vp_s === "major" && phi < Math.PI) {
                sgn = -1;
            }
            A = A.coords.usrCoords;
            B = B.coords.usrCoords;
            C = C.coords.usrCoords;
            A = [
                1,
                B[1] + (A[1] - B[1]) * r / d,
                B[2] + (A[2] - B[2]) * r / d
            ];
            C = [
                1,
                B[1] + (C[1] - B[1]) * r / d,
                B[2] + (C[2] - B[2]) * r / d
            ];
            ar = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bezierArc(A, B, C, true, sgn);
            this.dataX = ar[0];
            this.dataY = ar[1];
            this.bezierDegree = 3;
        };
        /**
         * Set an angle to a prescribed value given in radians.
         * This is only possible if the third point of the angle, i.e.
         * the anglepoint is a free point.
         * Removing the constraint again is done by calling "angle.free()".
         *
         * Changing the angle requires to call the method "free()":
         *
         * <pre>
         * angle.setAngle(Math.PI / 6);
         * // ...
         * angle.free().setAngle(Math.PI / 4);
         * </pre>
         *
         * @name setAngle
         * @memberof Angle.prototype
         * @function
         * @param {Number|Function} val Number or Function which returns the size of the angle in Radians
         * @returns {Object} Pointer to the angle element..
         * @see Angle#free
         *
         * @example
         * var p1, p2, p3, c, a, s;
         *
         * p1 = board.create('point',[0,0]);
         * p2 = board.create('point',[5,0]);
         * p3 = board.create('point',[0,5]);
         *
         * c1 = board.create('circle',[p1, p2]);
         *
         * a = board.create('angle',[p2, p1, p3], {radius:3});
         *
         * a.setAngle(function() {
         *     return Math.PI / 3;
         * });
         * board.update();
         *
         * </pre><div id="JXG987c-394f-11e6-af4a-901b0e1b8723" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG987c-394f-11e6-af4a-901b0e1b8723',
         *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
         *     var p1, p2, p3, c, a, s;
         *
         *     p1 = board.create('point',[0,0]);
         *     p2 = board.create('point',[5,0]);
         *     p3 = board.create('point',[0,5]);
         *
         *     c1 = board.create('circle',[p1, p2]);
         *
         *     a = board.create('angle',[p2, p1, p3], {radius: 3});
         *
         *     a.setAngle(function() {
         *         return Math.PI / 3;
         *     });
         *     board.update();
         *
         *     })();
         *
         * </script><pre>
         *
         * @example
         * var p1, p2, p3, c, a, s;
         *
         * p1 = board.create('point',[0,0]);
         * p2 = board.create('point',[5,0]);
         * p3 = board.create('point',[0,5]);
         *
         * c1 = board.create('circle',[p1, p2]);
         *
         * a = board.create('angle',[p2, p1, p3], {radius:3});
         * s = board.create('slider',[[-2,1], [2,1], [0, Math.PI*0.5, 2*Math.PI]]);
         *
         * a.setAngle(function() {
         *     return s.Value();
         * });
         * board.update();
         *
         * </pre><div id="JXG99957b1c-394f-11e6-af4a-901b0e1b8723" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG99957b1c-394f-11e6-af4a-901b0e1b8723',
         *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
         *     var p1, p2, p3, c, a, s;
         *
         *     p1 = board.create('point',[0,0]);
         *     p2 = board.create('point',[5,0]);
         *     p3 = board.create('point',[0,5]);
         *
         *     c1 = board.create('circle',[p1, p2]);
         *
         *     a = board.create('angle',[p2, p1, p3], {radius: 3});
         *     s = board.create('slider',[[-2,1], [2,1], [0, Math.PI*0.5, 2*Math.PI]]);
         *
         *     a.setAngle(function() {
         *         return s.Value();
         *     });
         *     board.update();
         *
         *     })();
         *
         * </script><pre>
         *
         */ el.setAngle = function(val) {
            var t1, t2, val2, p = this.anglepoint, q = this.radiuspoint;
            if (p.draggable()) {
                t1 = this.board.create("transform", [
                    val,
                    this.center
                ], {
                    type: "rotate"
                });
                p.addTransform(q, t1);
                // Immediately apply the transformation.
                // This prevents that jumping elements can be watched.
                t1.update();
                p.moveTo(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(t1.matrix, q.coords.usrCoords));
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(val)) {
                    /**
                     * @ignore
                     */ val2 = function() {
                        return Math.PI * 2 - val();
                    };
                } else {
                    /**
                     * @ignore
                     */ val2 = function() {
                        return Math.PI * 2 - val;
                    };
                }
                t2 = this.board.create("transform", [
                    val2,
                    this.center
                ], {
                    type: "rotate"
                });
                p.coords.on("update", function() {
                    t2.update();
                    // q.moveTo(Mat.matVecMult(t2.matrix, p.coords.usrCoords));
                    q.setPositionDirectly(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(t2.matrix, p.coords.usrCoords));
                });
                p.setParents(q);
                this.hasFixedAngle = true;
            }
            return this;
        };
        /**
         * Frees an angle from a prescribed value. This is only relevant if the angle size has been set by
         * "setAngle()" previously. The anglepoint is set to a free point.
         * @name free
         * @function
         * @memberof Angle.prototype
         * @returns {Object} Pointer to the angle element..
         * @see Angle#setAngle
         */ el.free = function() {
            var p = this.anglepoint;
            if (p.transformations.length > 0) {
                p.transformations.pop();
                p.isDraggable = true;
                p.parents = [];
                p.coords.off("update");
            }
            this.hasFixedAngle = false;
            return this;
        };
        el.setParents(points); // Important: This overwrites the parents order in underlying sector
    } // end '3points'
    // GEONExT compatible labels.
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(el.visProp.text)) {
        el.label.setText(el.evalVisProp('text'));
    }
    el.elType = "angle";
    el.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_ANGLE;
    el.subs = {};
    /**
     * @class
     * @ignore
     */ el.updateDataArraySquare = function() {
        var A, B, C, d1, d2, v, l1, l2, r = this.Radius();
        if (type === "2lines") {
            // This is necessary to update this.point1, this.point2, this.point3.
            this.updateDataArraySector();
        }
        A = this.point2;
        B = this.point1;
        C = this.point3;
        A = A.coords.usrCoords;
        B = B.coords.usrCoords;
        C = C.coords.usrCoords;
        d1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(A, B, 3);
        d2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(C, B, 3);
        // In case of type=='2lines' this is redundant, because r == d1 == d2
        A = [
            1,
            B[1] + (A[1] - B[1]) * r / d1,
            B[2] + (A[2] - B[2]) * r / d1
        ];
        C = [
            1,
            B[1] + (C[1] - B[1]) * r / d2,
            B[2] + (C[2] - B[2]) * r / d2
        ];
        v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct(C, B);
        l1 = [
            -A[1] * v[1] - A[2] * v[2],
            A[0] * v[1],
            A[0] * v[2]
        ];
        v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct(A, B);
        l2 = [
            -C[1] * v[1] - C[2] * v[2],
            C[0] * v[1],
            C[0] * v[2]
        ];
        v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct(l1, l2);
        v[1] /= v[0];
        v[2] /= v[0];
        this.dataX = [
            B[1],
            A[1],
            v[1],
            C[1],
            B[1]
        ];
        this.dataY = [
            B[2],
            A[2],
            v[2],
            C[2],
            B[2]
        ];
        this.bezierDegree = 1;
    };
    /**
     * @class
     * @ignore
     */ el.updateDataArrayNone = function() {
        this.dataX = [
            NaN
        ];
        this.dataY = [
            NaN
        ];
        this.bezierDegree = 1;
    };
    /**
     * @class
     * @ignore
     */ el.updateDataArray = function() {
        var type = this.evalVisProp('type'), deg = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].trueAngle(this.point2, this.point1, this.point3), vp_s = this.evalVisProp('selection');
        if (vp_s === "minor" && deg > 180.0 || vp_s === "major" && deg < 180.0) {
            deg = 360.0 - deg;
        }
        if (Math.abs(deg - 90.0) < this.evalVisProp('orthosensitivity') + __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps) {
            type = this.evalVisProp('orthotype');
        }
        if (type === "none") {
            this.updateDataArrayNone();
            this.maxX = function() {
                return 0;
            };
        } else if (type === "square") {
            this.updateDataArraySquare();
            this.maxX = function() {
                return 4;
            };
        } else if (type === "sector") {
            this.updateDataArraySector();
            this.maxX = function() {
                return 6;
            };
        } else if (type === "sectordot") {
            this.updateDataArraySector();
            this.maxX = function() {
                return 6;
            };
            if (!this.dot.visProp.visible) {
                this.dot.setAttribute({
                    visible: true
                });
            }
        }
        if (!this.visProp.visible || type !== "sectordot" && this.dot.visProp.visible) {
            this.dot.setAttribute({
                visible: false
            });
        }
    };
    attrsub = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "angle", "dot");
    /**
     * Indicates a right angle. Invisible by default, use <tt>dot.visible: true</tt> to show.
     * Though this dot indicates a right angle, it can be visible even if the angle is not a right
     * one.
     * @type JXG.Point
     * @name dot
     * @memberOf Angle.prototype
     */ el.dot = board.create("point", [
        function() {
            var A, B, r, d, a2, co, si, mat, vp_s;
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(el.dot) && !el.dot.visProp.visible) {
                return [
                    0,
                    0
                ];
            }
            A = el.point2.coords.usrCoords;
            B = el.point1.coords.usrCoords;
            r = el.Radius();
            d = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(A, B, 3);
            a2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].rad(el.point2, el.point1, el.point3);
            vp_s = el.evalVisProp('selection');
            if (vp_s === "minor" && a2 > Math.PI || vp_s === "major" && a2 < Math.PI) {
                a2 = -(2 * Math.PI - a2);
            }
            a2 *= 0.5;
            co = Math.cos(a2);
            si = Math.sin(a2);
            A = [
                1,
                B[1] + (A[1] - B[1]) * r / d,
                B[2] + (A[2] - B[2]) * r / d
            ];
            mat = [
                [
                    1,
                    0,
                    0
                ],
                [
                    B[1] - 0.5 * B[1] * co + 0.5 * B[2] * si,
                    co * 0.5,
                    -si * 0.5
                ],
                [
                    B[2] - 0.5 * B[1] * si - 0.5 * B[2] * co,
                    si * 0.5,
                    co * 0.5
                ]
            ];
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(mat, A);
        }
    ], attrsub);
    el.dot.dump = false;
    el.subs.dot = el.dot;
    if (type === "2lines") {
        for(i = 0; i < 2; i++){
            board.select(parents[i]).addChild(el.dot);
        }
    } else {
        for(i = 0; i < 3; i++){
            board.select(points[i]).addChild(el.dot);
        }
    }
    board.unsuspendUpdate();
    /**
     * Returns the value of the angle.
     * @memberOf Angle.prototype
     * @name Value
     * @function
     * @param {String} [unit='length'] Unit of the returned values. Possible units are
     * <ul>
     * <li> 'radians' (default): angle value in radians
     * <li> 'degrees': angle value in degrees
     * <li> 'semicircle': angle value in radians as a multiple of &pi;, e.g. if the angle is 1.5&pi;, 1.5 will be returned.
     * <li> 'circle': angle value in radians as a multiple of 2&pi;
     * <li> 'length': length of the arc line of the angle
     * </ul>
     * It is sufficient to supply the first three characters of the unit, e.g. 'len'.
     * @returns {Number} angle value in various units.
     * @see Sector#L
     * @see Arc#Value
     * @example
     * var A, B, C, ang,
     *     r = 0.5;
     * A = board.create("point", [3, 0]);
     * B = board.create("point", [0, 0]);
     * C = board.create("point", [2, 2]);
     * ang = board.create("angle", [A, B, C], {radius: r});
     *
     * console.log(ang.Value());
     * // Output Math.PI * 0.25
     *
     * console.log(ang.Value('radian'));
     * // Output Math.PI * 0.25
     *
     * console.log(ang.Value('degree');
     * // Output 45
     *
     * console.log(ang.Value('semicircle'));
     * // Output 0.25
     *
     * console.log(ang.Value('circle'));
     * // Output 0.125
     *
     * console.log(ang.Value('length'));
     * // Output r * Math.PI * 0.25
     *
     * console.log(ang.L());
     * // Output r * Math.PI * 0.25
     *
     */ el.Value = function(unit) {
        unit = unit || 'radians';
        if (unit === '') {
            unit = 'radians';
        }
        return el.arc.Value(unit);
    };
    // documented in GeometryElement
    /**
     * @class
     * @ignore
     */ el.getLabelAnchor = function() {
        var vec, dx = 12, A, B, r, d, a2, co, si, mat, vp_s = el.evalVisProp('selection'), pos = this.label.evalVisProp('position'), l_vp = this.label ? this.label.visProp : this.visProp.label;
        // If this is uncommented, the angle label can not be dragged
        //if (Type.exists(this.label)) {
        //    this.label.relativeCoords = new Coords(Const.COORDS_BY_SCREEN, [0, 0], this.board);
        //}
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(pos) || pos.indexOf('right') < 0 && pos.indexOf('left') < 0) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.label) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.label.visProp.fontsize)) {
                dx = this.label.evalVisProp('fontsize');
            }
            dx /= this.board.unitX;
            A = el.point2.coords.usrCoords;
            B = el.point1.coords.usrCoords;
            r = el.Radius();
            d = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(A, B, 3);
            a2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].rad(el.point2, el.point1, el.point3);
            if (vp_s === "minor" && a2 > Math.PI || vp_s === "major" && a2 < Math.PI) {
                a2 = -(2 * Math.PI - a2);
            }
            a2 *= 0.5;
            co = Math.cos(a2);
            si = Math.sin(a2);
            A = [
                1,
                B[1] + (A[1] - B[1]) * r / d,
                B[2] + (A[2] - B[2]) * r / d
            ];
            mat = [
                [
                    1,
                    0,
                    0
                ],
                [
                    B[1] - 0.5 * B[1] * co + 0.5 * B[2] * si,
                    co * 0.5,
                    -si * 0.5
                ],
                [
                    B[2] - 0.5 * B[1] * si - 0.5 * B[2] * co,
                    si * 0.5,
                    co * 0.5
                ]
            ];
            vec = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(mat, A);
            vec[1] /= vec[0];
            vec[2] /= vec[0];
            vec[0] /= vec[0];
            d = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(vec, B, 3);
            vec = [
                vec[0],
                B[1] + (vec[1] - B[1]) * (r + dx) / d,
                B[2] + (vec[2] - B[2]) * (r + dx) / d
            ];
            l_vp.position = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].calcLabelQuadrant(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].rad([
                1,
                0
            ], [
                0,
                0
            ], vec));
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, vec, this.board);
        } else {
            return this.getLabelPosition(pos, this.label.evalVisProp('distance'));
        }
    };
    el.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(el.methodMap, {
        setAngle: "setAngle",
        Value: "Value",
        free: "free"
    });
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("angle", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createAngle);
/**
 * @class A non-reflex angle is the instance of an angle that is at most 180°.
 * It is defined by a center, one point that
 * defines the radius, and a third point that defines the angle of the sector.
 * @pseudo
 * @name NonReflexAngle
 * @augments Angle
 * @constructor
 * @type Sector
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p3 . Minor sector is a sector of a circle around p1 having measure less than or equal to
 * 180 degrees (pi radians) and starts at p2. The radius is determined by p2, the angle by p3.
 * @example
 * // Create a non-reflex angle out of three free points
 * var p1 = board.create('point', [5.0, 3.0]),
 *     p2 = board.create('point', [1.0, 0.5]),
 *     p3 = board.create('point', [1.5, 5.0]),
 *
 *     a = board.create('nonreflexangle', [p1, p2, p3], {radius: 2}),
 *     t = board.create('text', [4, 4, function() { return JXG.toFixed(a.Value(), 2); }]);
 * </pre><div class="jxgbox" id="JXGd0ab6d6b-63a7-48b2-8749-b02bb5e744f9" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXGd0ab6d6b-63a7-48b2-8749-b02bb5e744f9', {boundingbox: [-1, 7, 7, -1], axis: true, showcopyright: false, shownavigation: false}),
 *     p1 = board.create('point', [5.0, 3.0]),
 *     p2 = board.create('point', [1.0, 0.5]),
 *     p3 = board.create('point', [1.5, 5.0]),
 *
 *     a = board.create('nonreflexangle', [p1, p2, p3], {radius: 2}),
 *     t = board.create('text', [4, 4, function() { return JXG.toFixed(a.Value(), 2); }]);
 * })();
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createNonreflexAngle = function(board, parents, attributes) {
    var el;
    attributes.selection = "minor";
    attributes = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'nonreflexangle');
    el = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createAngle(board, parents, attributes);
    // Documented in createAngle
    el.Value = function(unit) {
        var rad = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].rad(this.point2, this.point1, this.point3);
        unit = unit || 'radians';
        if (unit === '') {
            unit = 'radians';
        }
        rad = rad < Math.PI ? rad : 2.0 * Math.PI - rad;
        return this.arc.Value(unit, rad);
    };
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("nonreflexangle", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createNonreflexAngle);
/**
 * @class A reflex angle is the instance of an angle that is larger than 180°.
 * It is defined by a center, one point that
 * defines the radius, and a third point that defines the angle of the sector.
 * @pseudo
 * @name ReflexAngle
 * @augments Angle
 * @constructor
 * @type Sector
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p3 . Minor sector is a sector of a circle around p1 having measure less than or equal to
 * 180 degrees (pi radians) and starts at p2. The radius is determined by p2, the angle by p3.
 * @example
 * // Create a non-reflex angle out of three free points
 * var p1 = board.create('point', [5.0, 3.0]),
 *     p2 = board.create('point', [1.0, 0.5]),
 *     p3 = board.create('point', [1.5, 5.0]),
 *
 *     a = board.create('reflexangle', [p1, p2, p3], {radius: 2}),
 *     t = board.create('text', [4, 4, function() { return JXG.toFixed(a.Value(), 2); }]);
 * </pre><div class="jxgbox" id="JXGf2a577f2-553d-4f9f-a895-2d6d4b8c60e8" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 * var board = JXG.JSXGraph.initBoard('JXGf2a577f2-553d-4f9f-a895-2d6d4b8c60e8', {boundingbox: [-1, 7, 7, -1], axis: true, showcopyright: false, shownavigation: false}),
 *     p1 = board.create('point', [5.0, 3.0]),
 *     p2 = board.create('point', [1.0, 0.5]),
 *     p3 = board.create('point', [1.5, 5.0]),
 *
 *     a = board.create('reflexangle', [p1, p2, p3], {radius: 2}),
 *     t = board.create('text', [4, 4, function() { return JXG.toFixed(a.Value(), 2); }]);
 * })();
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createReflexAngle = function(board, parents, attributes) {
    var el;
    attributes.selection = "major";
    attributes = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'reflexangle');
    el = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createAngle(board, parents, attributes);
    // Documented in createAngle
    el.Value = function(unit) {
        var rad = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].rad(this.point2, this.point1, this.point3);
        unit = unit || 'radians';
        if (unit === '') {
            unit = 'radians';
        }
        rad = rad >= Math.PI ? rad : 2.0 * Math.PI - rad;
        return this.arc.Value(unit, rad);
    };
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("reflexangle", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createReflexAngle);
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/composition.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software dual licensed under the GNU LGPL or MIT License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License and
    the MIT License along with JSXGraph. If not, see <https://www.gnu.org/licenses/>
    and <https://opensource.org/licenses/MIT/>.
 */ /*global JXG: true, define: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview This file contains our composition elements, i.e. these elements are mostly put together
 * from one or more {@link JXG.GeometryElement} but with a special meaning. E.g. the midpoint element is contained here
 * and this is just a {@link JXG.Point} with coordinates dependent from two other points. Currently in this file the
 * following compositions can be found: <ul>
 *   <li>{@link Arrowparallel} (currently private)</li>
 *   <li>{@link Bisector}</li>
 *   <li>{@link Msector}</li>
 *   <li>{@link Circumcircle}</li>
 *   <li>{@link Circumcirclemidpoint}</li>
 *   <li>{@link Integral}</li>
 *   <li>{@link Midpoint}</li>
 *   <li>{@link Mirrorpoint}</li>
 *   <li>{@link Normal}</li>
 *   <li>{@link Orthogonalprojection}</li>
 *   <li>{@link Parallel}</li>
 *   <li>{@link Perpendicular}</li>
 *   <li>{@link Perpendicularpoint}</li>
 *   <li>{@link Perpendicularsegment}</li>
 *   <li>{@link Reflection}</li></ul>
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/numerics.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coords.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
// import Point from "../base/point.js";
// import Line from "../base/line.js";
// import Circle from "../base/circle.js";
// import Transform from "../base/transformation.js";
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$composition$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/composition.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
// import Curve from "../base/curve.js";
// import Polygon from "../base/polygon.js";
/**
 * @class A point that is the orthogonal projection of a point onto a line.
 * @pseudo
 * @description An orthogonal projection is given by a point and a line. It is determined by projecting the given point
 * orthogonal onto the given line.
 * @constructor
 * @name Orthogonalprojection
 * @type JXG.Point
 * @augments JXG.Point
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Line_JXG.Point} p,l The constructed point is the orthogonal projection of p onto l.
 * @example
 * var p1 = board.create('point', [0.0, 4.0]);
 * var p2 = board.create('point', [6.0, 1.0]);
 * var l1 = board.create('line', [p1, p2]);
 * var p3 = board.create('point', [3.0, 3.0]);
 *
 * var pp1 = board.create('orthogonalprojection', [p3, l1]);
 * </pre><div class="jxgbox" id="JXG7708b215-39fa-41b6-b972-19d73d77d791" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *   var ppex1_board = JXG.JSXGraph.initBoard('JXG7708b215-39fa-41b6-b972-19d73d77d791', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var ppex1_p1 = ppex1_board.create('point', [0.0, 4.0]);
 *   var ppex1_p2 = ppex1_board.create('point', [6.0, 1.0]);
 *   var ppex1_l1 = ppex1_board.create('line', [ppex1_p1, ppex1_p2]);
 *   var ppex1_p3 = ppex1_board.create('point', [3.0, 3.0]);
 *   var ppex1_pp1 = ppex1_board.create('orthogonalprojection', [ppex1_p3, ppex1_l1]);
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createOrthogonalProjection = function(board, parents, attributes) {
    var l, p, t, attr;
    parents[0] = board.select(parents[0]);
    parents[1] = board.select(parents[1]);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPointType(board, parents[0]) && parents[1].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
        p = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, [
            parents[0]
        ], attributes, "point")[0];
        l = parents[1];
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPointType(board, parents[1]) && parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
        p = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, [
            parents[1]
        ], attributes, "point")[0];
        l = parents[0];
    } else {
        throw new Error("JSXGraph: Can't create perpendicular point with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [point,line]");
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "orthogonalprojection");
    /**
     * @type JXG.Element
     * @ignore
     */ t = board.create("point", [
        function() {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].projectPointToLine(p, l, board);
        }
    ], attr);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(p._is_new)) {
        t.addChild(p);
        delete p._is_new;
    } else {
        p.addChild(t);
    }
    l.addChild(t);
    t.elType = "orthogonalprojection";
    t.setParents([
        p.id,
        t.id
    ]);
    t.update();
    /**
     * Used to generate a polynomial for the orthogonal projection
     * @name Orthogonalprojection#generatePolynomial
     * @returns {Array} An array containing the generated polynomial.
     * @private
     * @function
     * @ignore
     */ t.generatePolynomial = function() {
        /*
         *  Perpendicular takes point P and line L and creates point T and line M:
         *
         *                          | M
         *                          |
         *                          x P (p1,p2)
         *                          |
         *                          |
         *  L                       |
         *  ----------x-------------x------------------------x--------
         *            A (a1,a2)     |T (t1,t2)               B (b1,b2)
         *                          |
         *                          |
         *
         * So we have two conditions:
         *
         *   (a)  AT  || TB          (collinearity condition)
         *   (b)  PT _|_ AB          (orthogonality condition)
         *
         *      a2-t2       t2-b2
         *     -------  =  -------           (1)
         *      a1-t1       t1-b1
         *
         *      p2-t2         a1-b1
         *     -------  =  - -------         (2)
         *      p1-t1         a2-b2
         *
         * Multiplying (1) and (2) with denominators and simplifying gives
         *
         *    a2t1 - a2b1 + t2b1 - a1t2 + a1b2 - t1b2 = 0                  (1')
         *
         *    p2a2 - p2b2 - t2a2 + t2b2 + p1a1 - p1b1 - t1a1 + t1b1 = 0    (2')
         *
         */ var a1 = l.point1.symbolic.x, a2 = l.point1.symbolic.y, b1 = l.point2.symbolic.x, b2 = l.point2.symbolic.y, p1 = p.symbolic.x, p2 = p.symbolic.y, t1 = t.symbolic.x, t2 = t.symbolic.y, poly1 = "(" + a2 + ")*(" + t1 + ")-(" + a2 + ")*(" + b1 + ")+(" + t2 + ")*(" + b1 + ")-(" + a1 + ")*(" + t2 + ")+(" + a1 + ")*(" + b2 + ")-(" + t1 + ")*(" + b2 + ")", poly2 = "(" + p2 + ")*(" + a2 + ")-(" + p2 + ")*(" + b2 + ")-(" + t2 + ")*(" + a2 + ")+(" + t2 + ")*(" + b2 + ")+(" + p1 + ")*(" + a1 + ")-(" + p1 + ")*(" + b1 + ")-(" + t1 + ")*(" + a1 + ")+(" + t1 + ")*(" + b1 + ")";
        return [
            poly1,
            poly2
        ];
    };
    return t;
};
/**

     * @class A perpendicular is a line orthogonal to a given line, through a given point not on the line,
     * @pseudo
     * @description  A perpendicular is a composition of two elements: a line and a point. The line is orthogonal
     * to a given line and contains a given point.
     * @name Perpendicular
     * @constructor
     * @type JXG.Line
     * @augments Segment
     * @returns A {@link JXG.Line} object through the given point that is orthogonal to the given line.
     * @throws {Error} If the elements cannot be constructed with the given parent objects an exception is thrown.
     * @param {JXG.Line_JXG.Point} l,p The perpendicular line will be orthogonal to l and
     * will contain p.
     * @example
     * // Create a perpendicular
     * var p1 = board.create('point', [0.0, 2.0]);
     * var p2 = board.create('point', [2.0, 1.0]);
     * var l1 = board.create('line', [p1, p2]);
     *
     * var p3 = board.create('point', [3.0, 3.0]);
     * var perp1 = board.create('perpendicular', [l1, p3]);
     * </pre><div class="jxgbox" id="JXGd5b78842-7b27-4d37-b608-d02519e6cd03" style="width: 400px; height: 400px;"></div>
     * <script type="text/javascript">
     *   var pex1_board = JXG.JSXGraph.initBoard('JXGd5b78842-7b27-4d37-b608-d02519e6cd03', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
     *   var pex1_p1 = pex1_board.create('point', [0.0, 2.0]);
     *   var pex1_p2 = pex1_board.create('point', [2.0, 1.0]);
     *   var pex1_l1 = pex1_board.create('line', [pex1_p1, pex1_p2]);
     *   var pex1_p3 = pex1_board.create('point', [3.0, 3.0]);
     *   var pex1_perp1 = pex1_board.create('perpendicular', [pex1_l1, pex1_p3]);
     * </script><pre>
     */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPerpendicular = function(board, parents, attributes) {
    var p, l, pd, attr;
    parents[0] = board.select(parents[0]);
    parents[1] = board.select(parents[1]);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPointType(board, parents[0]) && parents[1].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
        l = parents[1];
        p = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, [
            parents[0]
        ], attributes, "point")[0];
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPointType(board, parents[1]) && parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
        l = parents[0];
        p = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, [
            parents[1]
        ], attributes, "point")[0];
    } else {
        throw new Error("JSXGraph: Can't create perpendicular with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [line,point]");
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "perpendicular");
    pd = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createLine(board, [
        function() {
            return l.stdform[2] * p.X() - l.stdform[1] * p.Y();
        },
        function() {
            return -l.stdform[2] * p.Z();
        },
        function() {
            return l.stdform[1] * p.Z();
        }
    ], attr);
    pd.elType = "perpendicular";
    pd.setParents([
        l.id,
        p.id
    ]);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(p._is_new)) {
        pd.addChild(p);
        delete p._is_new;
    } else {
        p.addChild(pd);
    }
    l.addChild(pd);
    return pd;
};
/**
 * @class Orthogonal projection of a point onto a line.
 * @pseudo
 * @description A perpendicular point is given by a point and a line. It is determined by projecting the given point
 * orthogonal onto the given line. This element should be used in GEONExTReader only. All other applications should
 * use orthogonal projection {@link Orthogonalprojection}.
 * @constructor
 * @name PerpendicularPoint
 * @type JXG.Point
 * @augments JXG.Point
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Line_JXG.Point} p,l The constructed point is the orthogonal projection of p onto l.
 * @example
 * var p1 = board.create('point', [0.0, 4.0]);
 * var p2 = board.create('point', [6.0, 1.0]);
 * var l1 = board.create('line', [p1, p2]);
 * var p3 = board.create('point', [3.0, 3.0]);
 *
 * var pp1 = board.create('perpendicularpoint', [p3, l1]);
 * </pre><div class="jxgbox" id="JXGded148c9-3536-44c0-ab81-1bb8fa48f3f4" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *   var ppex1_board = JXG.JSXGraph.initBoard('JXGded148c9-3536-44c0-ab81-1bb8fa48f3f4', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var ppex1_p1 = ppex1_board.create('point', [0.0, 4.0]);
 *   var ppex1_p2 = ppex1_board.create('point', [6.0, 1.0]);
 *   var ppex1_l1 = ppex1_board.create('line', [ppex1_p1, ppex1_p2]);
 *   var ppex1_p3 = ppex1_board.create('point', [3.0, 3.0]);
 *   var ppex1_pp1 = ppex1_board.create('perpendicularpoint', [ppex1_p3, ppex1_l1]);
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPerpendicularPoint = function(board, parents, attributes) {
    var l, p, t;
    parents[0] = board.select(parents[0]);
    parents[1] = board.select(parents[1]);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPointType(board, parents[0]) && parents[1].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
        p = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, [
            parents[0]
        ], attributes, "point")[0];
        l = parents[1];
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPointType(board, parents[1]) && parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
        p = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, [
            parents[1]
        ], attributes, "point")[0];
        l = parents[0];
    } else {
        throw new Error("JSXGraph: Can't create perpendicular point with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [point,line]");
    }
    /**
     * @class
     * @ignore
     */ t = board.create("point", [
        function() {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].perpendicular(l, p, board)[0];
        }
    ], attributes);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(p._is_new)) {
        t.addChild(p);
        delete p._is_new;
    } else {
        p.addChild(t);
    }
    l.addChild(t);
    t.elType = "perpendicularpoint";
    t.setParents([
        p.id,
        l.id
    ]);
    t.update();
    /**
     * Used to generate a polynomial for the perpendicular point
     * @name PerpendicularPoint#generatePolynomial
     * @returns {Array} An array containing the generated polynomial.
     * @private
     * @function
     * @ignore
     */ t.generatePolynomial = function() {
        /*
         *  Perpendicular takes point P and line L and creates point T and line M:
         *
         *                          | M
         *                          |
         *                          x P (p1,p2)
         *                          |
         *                          |
         *  L                       |
         *  ----------x-------------x------------------------x--------
         *            A (a1,a2)     |T (t1,t2)               B (b1,b2)
         *                          |
         *                          |
         *
         * So we have two conditions:
         *
         *   (a)  AT  || TB          (collinearity condition)
         *   (b)  PT _|_ AB          (orthogonality condition)
         *
         *      a2-t2       t2-b2
         *     -------  =  -------           (1)
         *      a1-t1       t1-b1
         *
         *      p2-t2         a1-b1
         *     -------  =  - -------         (2)
         *      p1-t1         a2-b2
         *
         * Multiplying (1) and (2) with denominators and simplifying gives
         *
         *    a2t1 - a2b1 + t2b1 - a1t2 + a1b2 - t1b2 = 0                  (1')
         *
         *    p2a2 - p2b2 - t2a2 + t2b2 + p1a1 - p1b1 - t1a1 + t1b1 = 0    (2')
         *
         */ var a1 = l.point1.symbolic.x, a2 = l.point1.symbolic.y, b1 = l.point2.symbolic.x, b2 = l.point2.symbolic.y, p1 = p.symbolic.x, p2 = p.symbolic.y, t1 = t.symbolic.x, t2 = t.symbolic.y, poly1 = "(" + a2 + ")*(" + t1 + ")-(" + a2 + ")*(" + b1 + ")+(" + t2 + ")*(" + b1 + ")-(" + a1 + ")*(" + t2 + ")+(" + a1 + ")*(" + b2 + ")-(" + t1 + ")*(" + b2 + ")", poly2 = "(" + p2 + ")*(" + a2 + ")-(" + p2 + ")*(" + b2 + ")-(" + t2 + ")*(" + a2 + ")+(" + t2 + ")*(" + b2 + ")+(" + p1 + ")*(" + a1 + ")-(" + p1 + ")*(" + b1 + ")-(" + t1 + ")*(" + a1 + ")+(" + t1 + ")*(" + b1 + ")";
        return [
            poly1,
            poly2
        ];
    };
    return t;
};
/**
 * @class A line segment orthogonal to a given line, through a given point not on the line,
 * @pseudo
 * @description  A perpendicular is a composition of two elements: a line segment and a point. The line segment is orthogonal
 * to a given line and contains a given point and meets the given line in the perpendicular point.
 * @name PerpendicularSegment
 * @constructor
 * @type JXG.Line
 * @augments Segment
 * @returns An array containing two elements: A {@link JXG.Line} object in the first component and a
 * {@link JXG.Point} element in the second component. The line segment is orthogonal to the given line and meets it
 * in the returned point.
 * @throws {Error} If the elements cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Line_JXG.Point} l,p The perpendicular line will be orthogonal to l and
 * will contain p. The perpendicular point is the intersection point of the two lines.
 * @example
 * // Create a perpendicular
 * var p1 = board.create('point', [0.0, 2.0]);
 * var p2 = board.create('point', [2.0, 1.0]);
 * var l1 = board.create('line', [p1, p2]);
 *
 * var p3 = board.create('point', [3.0, 3.0]);
 * var perp1 = board.create('perpendicularsegment', [l1, p3]);
 * </pre><div class="jxgbox" id="JXG037a6eb2-781d-4b71-b286-763619a63f22" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *   var pex1_board = JXG.JSXGraph.initBoard('JXG037a6eb2-781d-4b71-b286-763619a63f22', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var pex1_p1 = pex1_board.create('point', [0.0, 2.0]);
 *   var pex1_p2 = pex1_board.create('point', [2.0, 1.0]);
 *   var pex1_l1 = pex1_board.create('line', [pex1_p1, pex1_p2]);
 *   var pex1_p3 = pex1_board.create('point', [3.0, 3.0]);
 *   var pex1_perp1 = pex1_board.create('perpendicularsegment', [pex1_l1, pex1_p3]);
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPerpendicularSegment = function(board, parents, attributes) {
    var p, l, pd, t, attr;
    parents[0] = board.select(parents[0]);
    parents[1] = board.select(parents[1]);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPointType(board, parents[0]) && parents[1].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
        l = parents[1];
        p = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, [
            parents[0]
        ], attributes, "point")[0];
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPointType(board, parents[1]) && parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
        l = parents[0];
        p = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, [
            parents[1]
        ], attributes, "point")[0];
    } else {
        throw new Error("JSXGraph: Can't create perpendicular with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [line,point]");
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "perpendicularsegment", "point");
    t = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPerpendicularPoint(board, [
        l,
        p
    ], attr);
    t.dump = false;
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(attributes.layer)) {
        attributes.layer = board.options.layer.line;
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "perpendicularsegment");
    pd = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createLine(board, [
        function() {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].perpendicular(l, p, board)[1] ? [
                t,
                p
            ] : [
                p,
                t
            ];
        }
    ], attr);
    /**
     * Helper point
     * @memberOf PerpendicularSegment.prototype
     * @type PerpendicularPoint
     * @name point
     */ pd.point = t;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(p._is_new)) {
        pd.addChild(p);
        delete p._is_new;
    } else {
        p.addChild(pd);
    }
    l.addChild(pd);
    pd.elType = "perpendicularsegment";
    pd.setParents([
        p.id,
        l.id
    ]);
    pd.subs = {
        point: t
    };
    pd.inherits.push(t);
    return pd;
};
/**
 * @class Midpoint of two points.
 * @pseudo
 * @description A midpoint is given by two points. It is collinear to the given points and the distance
 * is the same to each of the given points, i.e. it is in the middle of the given points.
 * @constructor
 * @name Midpoint
 * @type JXG.Point
 * @augments JXG.Point
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point} p1,p2 The constructed point will be in the middle of p1 and p2.
 * @param {JXG.Line} l The midpoint will be in the middle of {@link JXG.Line#point1} and {@link JXG.Line#point2} of
 * the given line l.
 * @example
 * // Create base elements: 2 points and 1 line
 * var p1 = board.create('point', [0.0, 2.0]);
 * var p2 = board.create('point', [2.0, 1.0]);
 * var l1 = board.create('segment', [[0.0, 3.0], [3.0, 3.0]]);
 *
 * var mp1 = board.create('midpoint', [p1, p2]);
 * var mp2 = board.create('midpoint', [l1]);
 * </pre><div class="jxgbox" id="JXG7927ef86-24ae-40cc-afb0-91ff61dd0de7" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *   var mpex1_board = JXG.JSXGraph.initBoard('JXG7927ef86-24ae-40cc-afb0-91ff61dd0de7', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var mpex1_p1 = mpex1_board.create('point', [0.0, 2.0]);
 *   var mpex1_p2 = mpex1_board.create('point', [2.0, 1.0]);
 *   var mpex1_l1 = mpex1_board.create('segment', [[0.0, 3.0], [3.0, 3.0]]);
 *   var mpex1_mp1 = mpex1_board.create('midpoint', [mpex1_p1, mpex1_p2]);
 *   var mpex1_mp2 = mpex1_board.create('midpoint', [mpex1_l1]);
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMidpoint = function(board, parents, attributes) {
    var a, b, el, i, attr;
    for(i = 0; i < parents.length; ++i){
        parents[i] = board.select(parents[i]);
    }
    if (parents.length === 2 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPointType(board, parents[0]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPointType(board, parents[1])) {
        parents = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, parents, attributes, "point");
        a = parents[0];
        b = parents[1];
    } else if (parents.length === 1 && parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
        a = parents[0].point1;
        b = parents[0].point2;
    } else {
        throw new Error("JSXGraph: Can't create midpoint." + "\nPossible parent types: [point,point], [line]");
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "midpoint");
    /**
     * @type JXG.Element
     * @ignore
     */ el = board.create("point", [
        function() {
            var x = a.coords.usrCoords[1] + b.coords.usrCoords[1];
            if (isNaN(x) || Math.abs(a.coords.usrCoords[0]) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps || Math.abs(b.coords.usrCoords[0]) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps) {
                return NaN;
            }
            return x * 0.5;
        },
        function() {
            var y = a.coords.usrCoords[2] + b.coords.usrCoords[2];
            if (isNaN(y) || Math.abs(a.coords.usrCoords[0]) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps || Math.abs(b.coords.usrCoords[0]) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps) {
                return NaN;
            }
            return y * 0.5;
        }
    ], attr);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(a._is_new)) {
        el.addChild(a);
        delete a._is_new;
    } else {
        a.addChild(el);
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(b._is_new)) {
        el.addChild(b);
        delete b._is_new;
    } else {
        b.addChild(el);
    }
    el.elType = "midpoint";
    el.setParents([
        a.id,
        b.id
    ]);
    el.prepareUpdate().update();
    /**
     * Used to generate a polynomial for the midpoint.
     * @name Midpoint#generatePolynomial
     * @returns {Array} An array containing the generated polynomial.
     * @private
     * @function
     * @ignore
     */ el.generatePolynomial = function() {
        /*
         *  Midpoint takes two point A and B or line L (with points P and Q) and creates point T:
         *
         *  L (not necessarily)
         *  ----------x------------------x------------------x--------
         *            A (a1,a2)          T (t1,t2)          B (b1,b2)
         *
         * So we have two conditions:
         *
         *   (a)   AT  ||  TB           (collinearity condition)
         *   (b)  [AT] == [TB]          (equidistant condition)
         *
         *      a2-t2       t2-b2
         *     -------  =  -------                                         (1)
         *      a1-t1       t1-b1
         *
         *     (a1 - t1)^2 + (a2 - t2)^2 = (b1 - t1)^2 + (b2 - t2)^2       (2)
         *
         *
         * Multiplying (1) with denominators and simplifying (1) and (2) gives
         *
         *    a2t1 - a2b1 + t2b1 - a1t2 + a1b2 - t1b2 = 0                      (1')
         *
         *    a1^2 - 2a1t1 + a2^2 - 2a2t2 - b1^2 + 2b1t1 - b2^2 + 2b2t2 = 0    (2')
         *
         */ var a1 = a.symbolic.x, a2 = a.symbolic.y, b1 = b.symbolic.x, b2 = b.symbolic.y, t1 = el.symbolic.x, t2 = el.symbolic.y, poly1 = "(" + a2 + ")*(" + t1 + ")-(" + a2 + ")*(" + b1 + ")+(" + t2 + ")*(" + b1 + ")-(" + a1 + ")*(" + t2 + ")+(" + a1 + ")*(" + b2 + ")-(" + t1 + ")*(" + b2 + ")", poly2 = "(" + a1 + ")^2 - 2*(" + a1 + ")*(" + t1 + ")+(" + a2 + ")^2-2*(" + a2 + ")*(" + t2 + ")-(" + b1 + ")^2+2*(" + b1 + ")*(" + t1 + ")-(" + b2 + ")^2+2*(" + b2 + ")*(" + t2 + ")";
        return [
            poly1,
            poly2
        ];
    };
    return el;
};
/**
 * @class Given three point, a parallel point is the point such that the four points form a parallelogram.
 * @pseudo
 * @description A parallel point is given by three points. Taking the Euclidean vector from the first to the
 * second point, the parallel point is determined by adding that vector to the third point.
 * The line determined by the first two points is parallel to the line determined by the third point and the constructed point.
 * @constructor
 * @name Parallelpoint
 * @type JXG.Point
 * @augments JXG.Point
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p3 Taking the Euclidean vector <tt>v=p2-p1</tt> the parallel point is determined by
 * <tt>p4 = p3+v</tt>
 * @param {JXG.Line_JXG.Point} l,p The resulting point will together with p specify a line which is parallel to l.
 * @example
 * var p1 = board.create('point', [0.0, 2.0]);
 * var p2 = board.create('point', [2.0, 1.0]);
 * var p3 = board.create('point', [3.0, 3.0]);
 *
 * var pp1 = board.create('parallelpoint', [p1, p2, p3]);
 * </pre><div class="jxgbox" id="JXG488c4be9-274f-40f0-a469-c5f70abe1f0e" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *   var ppex1_board = JXG.JSXGraph.initBoard('JXG488c4be9-274f-40f0-a469-c5f70abe1f0e', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var ppex1_p1 = ppex1_board.create('point', [0.0, 2.0]);
 *   var ppex1_p2 = ppex1_board.create('point', [2.0, 1.0]);
 *   var ppex1_p3 = ppex1_board.create('point', [3.0, 3.0]);
 *   var ppex1_pp1 = ppex1_board.create('parallelpoint', [ppex1_p1, ppex1_p2, ppex1_p3]);
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createParallelPoint = function(board, parents, attributes) {
    var a, b, c, p, i, attr;
    for(i = 0; i < parents.length; ++i){
        parents[i] = board.select(parents[i]);
    }
    if (parents.length === 3 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPointType(board, parents[0]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPointType(board, parents[1]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPointType(board, parents[2])) {
        parents = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, parents, attributes, "point");
        a = parents[0];
        b = parents[1];
        c = parents[2];
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPointType(board, parents[0]) && parents[1].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
        c = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, [
            parents[0]
        ], attributes, "point")[0];
        a = parents[1].point1;
        b = parents[1].point2;
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPointType(board, parents[1]) && parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
        c = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, [
            parents[1]
        ], attributes, "point")[0];
        a = parents[0].point1;
        b = parents[0].point2;
    } else {
        throw new Error("JSXGraph: Can't create parallel point with parent types '" + typeof parents[0] + "', '" + typeof parents[1] + "' and '" + typeof parents[2] + "'." + "\nPossible parent types: [line,point], [point,point,point]");
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'parallelpoint');
    /**
     * @type {JXG.Element}
     * @ignore
     */ p = board.create("point", [
        function() {
            return c.coords.usrCoords[1] + b.coords.usrCoords[1] - a.coords.usrCoords[1];
        },
        function() {
            return c.coords.usrCoords[2] + b.coords.usrCoords[2] - a.coords.usrCoords[2];
        }
    ], attr);
    // required for algorithms requiring dependencies between elements
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(a._is_new)) {
        p.addChild(a);
        delete a._is_new;
    } else {
        a.addChild(p);
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(b._is_new)) {
        p.addChild(b);
        delete b._is_new;
    } else {
        b.addChild(p);
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(c._is_new)) {
        p.addChild(c);
        delete c._is_new;
    } else {
        c.addChild(p);
    }
    p.elType = "parallelpoint";
    p.setParents([
        a.id,
        b.id,
        c.id
    ]);
    // required to set the coordinates because functions are considered as constraints. hence, the coordinates get set first after an update.
    // can be removed if the above issue is resolved.
    p.prepareUpdate().update();
    /**
     * @function
     * @ignore
     */ p.generatePolynomial = function() {
        /*
         *  Parallelpoint takes three points A, B and C or line L (with points B and C) and creates point T:
         *
         *
         *                     C (c1,c2)                             T (t1,t2)
         *                      x                                     x
         *                     /                                     /
         *                    /                                     /
         *                   /                                     /
         *                  /                                     /
         *                 /                                     /
         *                /                                     /
         *               /                                     /
         *              /                                     /
         *  L (opt)    /                                     /
         *  ----------x-------------------------------------x--------
         *            A (a1,a2)                             B (b1,b2)
         *
         * So we have two conditions:
         *
         *   (a)   CT  ||  AB           (collinearity condition I)
         *   (b)   BT  ||  AC           (collinearity condition II)
         *
         * The corresponding equations are
         *
         *    (b2 - a2)(t1 - c1) - (t2 - c2)(b1 - a1) = 0         (1)
         *    (t2 - b2)(a1 - c1) - (t1 - b1)(a2 - c2) = 0         (2)
         *
         * Simplifying (1) and (2) gives
         *
         *    b2t1 - b2c1 - a2t1 + a2c1 - t2b1 + t2a1 + c2b1 - c2a1 = 0      (1')
         *    t2a1 - t2c1 - b2a1 + b2c1 - t1a2 + t1c2 + b1a2 - b1c2 = 0      (2')
         *
         */ var a1 = a.symbolic.x, a2 = a.symbolic.y, b1 = b.symbolic.x, b2 = b.symbolic.y, c1 = c.symbolic.x, c2 = c.symbolic.y, t1 = p.symbolic.x, t2 = p.symbolic.y, poly1 = "(" + b2 + ")*(" + t1 + ")-(" + b2 + ")*(" + c1 + ")-(" + a2 + ")*(" + t1 + ")+(" + a2 + ")*(" + c1 + ")-(" + t2 + ")*(" + b1 + ")+(" + t2 + ")*(" + a1 + ")+(" + c2 + ")*(" + b1 + ")-(" + c2 + ")*(" + a1 + ")", poly2 = "(" + t2 + ")*(" + a1 + ")-(" + t2 + ")*(" + c1 + ")-(" + b2 + ")*(" + a1 + ")+(" + b2 + ")*(" + c1 + ")-(" + t1 + ")*(" + a2 + ")+(" + t1 + ")*(" + c2 + ")+(" + b1 + ")*(" + a2 + ")-(" + b1 + ")*(" + c2 + ")";
        return [
            poly1,
            poly2
        ];
    };
    return p;
};
/**
 * @class A parallel is a line through a given point, parallel to a given line.
 * <p>
 * If original line is given as a JSXGraph line object, the resulting parallel line will be defined by the given point and an
 * infinitely far away point (an ideal point). That means, the line can not be shortened to a segment.
 * <p>
 * If the original line is given as two points, the resulting parallel line can be shortened to a a segment.
 * @pseudo
 * @name Parallel
 * @augments Line
 * @constructor
 * @type JXG.Line
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Line_JXG.Point} l,p The constructed line contains p and has the same slope as l. Alternative parameters are p1, p2, p: The
 * constructed line contains p and has the same slope as the line through p1 and p2.
 * @example
 * // Create a parallel
 * var p1 = board.create('point', [0.0, 2.0]);
 * var p2 = board.create('point', [2.0, 1.0]);
 * var l1 = board.create('line', [p1, p2]);
 *
 * var p3 = board.create('point', [3.0, 3.0]);
 * var pl1 = board.create('parallel', [l1, p3]);
 * </pre><div class="jxgbox" id="JXG24e54f9e-5c4e-4afb-9228-0ef27a59d627" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *   var plex1_board = JXG.JSXGraph.initBoard('JXG24e54f9e-5c4e-4afb-9228-0ef27a59d627', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var plex1_p1 = plex1_board.create('point', [0.0, 2.0]);
 *   var plex1_p2 = plex1_board.create('point', [2.0, 1.0]);
 *   var plex1_l1 = plex1_board.create('line', [plex1_p1, plex1_p2]);
 *   var plex1_p3 = plex1_board.create('point', [3.0, 3.0]);
 *   var plex1_pl1 = plex1_board.create('parallel', [plex1_l1, plex1_p3]);
 * </script><pre>
 * @example
 * var p1, p2, p3, l1, pl1;
 *
 * p1 = board.create('point', [0.0, 2.0]);
 * p2 = board.create('point', [2.0, 1.0]);
 * l1 = board.create('line', [p1, p2]);
 *
 * p3 = board.create('point', [1.0, 3.0]);
 * pl1 = board.create('parallel', [p1, p2, p3], {straightFirst: false, straightLast: false});
 *
 * </pre><div id="JXGd643305d-20c3-4a88-91f9-8d0c4448594f" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGd643305d-20c3-4a88-91f9-8d0c4448594f',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var p1, p2, p3, l1, pl1;
 *
 *     p1 = board.create('point', [0.0, 2.0]);
 *     p2 = board.create('point', [2.0, 1.0]);
 *     l1 = board.create('line', [p1, p2]);
 *
 *     p3 = board.create('point', [1.0, 3.0]);
 *     pl1 = board.create('parallel', [p1, p2, p3], {straightFirst: false, straightLast: false});
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createParallel = function(board, parents, attributes) {
    var p, pp, pl, li, i, attr, ty = 1;
    for(i = 0; i < parents.length; ++i){
        parents[i] = board.select(parents[i]);
    }
    p = null;
    if (parents.length === 3) {
        // Line / segment through point parents[2] which is parallel to line through parents[0] and parents[1]
        parents = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, parents, attributes, "point");
        p = parents[2];
        ty = 0;
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPointType(board, parents[0])) {
        // Parallel to line parents[1] through point parents[0]
        p = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, [
            parents[0]
        ], attributes, "point")[0];
        /** @ignore */ li = function() {
            return parents[1].stdform;
        };
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPointType(board, parents[1])) {
        // Parallel to line parents[0] through point parents[1]
        p = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, [
            parents[1]
        ], attributes, "point")[0];
        /** @ignore */ li = function() {
            return parents[0].stdform;
        };
    }
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(attributes.layer)) {
        attributes.layer = board.options.layer.line;
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "parallel", "point");
    if (ty === 1) {
        // Line is given by line element. The parallel line is
        // constructed as line through an ideal point.
        pp = board.create("point", [
            function() {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct([
                    1,
                    0,
                    0
                ], li());
            }
        ], attr);
    } else {
        // Line is given by two points. The parallel line is
        // constructed as line through two finite point.
        pp = board.create("parallelpoint", parents, attr);
    }
    pp.isDraggable = true;
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "parallel");
    // line creator also calls addChild
    pl = board.create("line", [
        p,
        pp
    ], attr);
    pl.elType = "parallel";
    pl.subs = {
        point: pp
    };
    pl.inherits.push(pp);
    pl.setParents([
        parents[0].id,
        parents[1].id
    ]);
    if (parents.length === 3) {
        pl.addParents(parents[2].id);
    }
    // p.addChild(pl);
    /**
     * Helper point used to create the parallel line. This point lies on the line at infinity, hence it's not visible,
     * not even with visible set to <tt>true</tt>. Creating another line through this point would make that other line
     * parallel to the create parallel.
     * @memberOf Parallel.prototype
     * @name point
     * @type JXG.Point
     */ pl.point = pp;
    return pl;
};
/**
 * @class A segment with an arrow head attached thath is parallel to a given segment.
 * The segment is given by its defining two points, the arrow starts at a given point.
 * <p>
 * @pseudo
 * @constructor
 * @name Arrowparallel
 * @type Parallel
 * @augments Parallel
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p3 The constructed arrow contains p3 and has the same slope as the line through p1 and p2.
 * @example
 * // Create a parallel
 * var p1 = board.create('point', [0.0, 2.0]);
 * var p2 = board.create('point', [2.0, 1.0]);
 * var l1 = board.create('segment', [p1, p2]);
 *
 * var p3 = board.create('point', [3.0, 3.0]);
 * var pl1 = board.create('arrowparallel', [p1, p2, p3]);
 * </pre><div class="jxgbox" id="JXGeeacdf99-036f-4e83-aeb6-f7388423e369" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var plex1_board = JXG.JSXGraph.initBoard('JXGeeacdf99-036f-4e83-aeb6-f7388423e369', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var plex1_p1 = plex1_board.create('point', [0.0, 2.0]);
 *   var plex1_p2 = plex1_board.create('point', [2.0, 1.0]);
 *   var plex1_l1 = plex1_board.create('segment', [plex1_p1, plex1_p2]);
 *   var plex1_p3 = plex1_board.create('point', [3.0, 3.0]);
 *   var plex1_pl1 = plex1_board.create('arrowparallel', [plex1_p1, plex1_p2, plex1_p3]);
 * })();
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createArrowParallel = function(board, parents, attributes) {
    var p, attr;
    /* parallel arrow point polynomials are done in createParallelPoint */ try {
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'arrowparallel');
        if (attr.lastArrow === false) {
            // An arrow has to have an arrow head.
            attr.lastArrow = true;
        }
        p = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createParallel(board, parents, attr).setAttribute({
            straightFirst: false,
            straightLast: false
        });
        p.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_VECTOR;
        p.elType = "arrowparallel";
        // parents are set in createParallel
        return p;
    } catch (e) {
        throw new Error("JSXGraph: Can't create arrowparallel with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [line,point], [point,point,point]");
    }
};
/**
 * @class A bisector is a line which divides an angle into two equal angles. It is given by three points A, B, and
 * C and divides the angle ABC into two equal sized parts.
 * @pseudo
 * @constructor
 * @name Bisector
 * @type JXG.Line
 * @augments JXG.Line
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p3 The angle described by <tt>p1</tt>, <tt>p2</tt> and <tt>p3</tt> will
 * be divided into two equal angles.
 * @example
 * var p1 = board.create('point', [6.0, 4.0]);
 * var p2 = board.create('point', [3.0, 2.0]);
 * var p3 = board.create('point', [1.0, 7.0]);
 *
 * var bi1 = board.create('bisector', [p1, p2, p3]);
 * </pre><div class="jxgbox" id="JXG0d58cea8-b06a-407c-b27c-0908f508f5a4" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXG0d58cea8-b06a-407c-b27c-0908f508f5a4', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var p1 = board.create('point', [6.0, 4.0]);
 *   var p2 = board.create('point', [3.0, 2.0]);
 *   var p3 = board.create('point', [1.0, 7.0]);
 *   var bi1 = board.create('bisector', [p1, p2, p3]);
 * })();
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createBisector = function(board, parents, attributes) {
    var p, l, i, attr;
    parents = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, parents, attributes, "point");
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[0]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[1]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[2])) {
        // hidden and fixed helper
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "bisector", "point");
        attr.snapToGrid = false;
        p = board.create("point", [
            function() {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].angleBisector(parents[0], parents[1], parents[2], board);
            }
        ], attr);
        p.dump = false;
        for(i = 0; i < 3; i++){
            // required for algorithm requiring dependencies between elements
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parents[i]._is_new)) {
                p.addChild(parents[i]);
                delete parents[i]._is_new;
            } else {
                parents[i].addChild(p);
            }
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(attributes.layer)) {
            attributes.layer = board.options.layer.line;
        }
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "bisector");
        l = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createLine(board, [
            parents[1],
            p
        ], attr);
        /**
         * Helper point
         * @memberOf Bisector.prototype
         * @type Point
         * @name point
         */ l.point = p;
        l.elType = "bisector";
        l.setParents(parents);
        l.subs = {
            point: p
        };
        l.inherits.push(p);
        return l;
    }
    throw new Error("JSXGraph: Can't create angle bisector with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [point,point,point]");
};
/**
 * @class Bisector lines are similar to {@link Bisector} but take two lines as parent elements. The resulting element is
 * a composition of two lines.
 * @pseudo
 * @constructor
 * @name Bisectorlines
 * @type JXG.Composition
 * @augments JXG.Composition
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Line_JXG.Line} l1,l2 The four angles described by the lines <tt>l1</tt> and <tt>l2</tt> will each
 * be divided into two equal angles.
 * @example
 * var p1 = board.create('point', [6.0, 4.0]);
 * var p2 = board.create('point', [3.0, 2.0]);
 * var p3 = board.create('point', [1.0, 7.0]);
 * var p4 = board.create('point', [3.0, 0.0]);
 * var l1 = board.create('line', [p1, p2]);
 * var l2 = board.create('line', [p3, p4]);
 *
 * var bi1 = board.create('bisectorlines', [l1, l2]);
 * </pre><div class="jxgbox" id="JXG3121ff67-44f0-4dda-bb10-9cda0b80bf18" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXG3121ff67-44f0-4dda-bb10-9cda0b80bf18', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var p1 = board.create('point', [6.0, 4.0]);
 *   var p2 = board.create('point', [3.0, 2.0]);
 *   var p3 = board.create('point', [1.0, 7.0]);
 *   var p4 = board.create('point', [3.0, 0.0]);
 *   var l1 = board.create('line', [p1, p2]);
 *   var l2 = board.create('line', [p3, p4]);
 *   var bi1 = board.create('bisectorlines', [l1, l2]);
 * })();
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createAngularBisectorsOfTwoLines = function(board, parents, attributes) {
    // The angular bisectors of two line [c1,a1,b1] and [c2,a2,b2] are determined by the equation:
    // (a1*x+b1*y+c1*z)/sqrt(a1^2+b1^2) = +/- (a2*x+b2*y+c2*z)/sqrt(a2^2+b2^2)
    var g1, g2, attr, ret, l1 = board.select(parents[0]), l2 = board.select(parents[1]);
    if (l1.elementClass !== __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE || l2.elementClass !== __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
        throw new Error("JSXGraph: Can't create angle bisectors of two lines with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [line,line]");
    }
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(attributes.layer)) {
        attributes.layer = board.options.layer.line;
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "bisectorlines", "line1");
    g1 = board.create("line", [
        function() {
            var d1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(l1.stdform[1], l1.stdform[2]), d2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(l2.stdform[1], l2.stdform[2]);
            return l1.stdform[0] / d1 - l2.stdform[0] / d2;
        },
        function() {
            var d1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(l1.stdform[1], l1.stdform[2]), d2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(l2.stdform[1], l2.stdform[2]);
            return l1.stdform[1] / d1 - l2.stdform[1] / d2;
        },
        function() {
            var d1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(l1.stdform[1], l1.stdform[2]), d2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(l2.stdform[1], l2.stdform[2]);
            return l1.stdform[2] / d1 - l2.stdform[2] / d2;
        }
    ], attr);
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(attributes.layer)) {
        attributes.layer = board.options.layer.line;
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "bisectorlines", "line2");
    g2 = board.create("line", [
        function() {
            var d1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(l1.stdform[1], l1.stdform[2]), d2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(l2.stdform[1], l2.stdform[2]);
            return l1.stdform[0] / d1 + l2.stdform[0] / d2;
        },
        function() {
            var d1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(l1.stdform[1], l1.stdform[2]), d2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(l2.stdform[1], l2.stdform[2]);
            return l1.stdform[1] / d1 + l2.stdform[1] / d2;
        },
        function() {
            var d1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(l1.stdform[1], l1.stdform[2]), d2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(l2.stdform[1], l2.stdform[2]);
            return l1.stdform[2] / d1 + l2.stdform[2] / d2;
        }
    ], attr);
    // documentation
    /**
     * First line.
     * @memberOf Bisectorlines.prototype
     * @name line1
     * @type Line
     */ /**
     * Second line.
     * @memberOf Bisectorlines.prototype
     * @name line2
     * @type Line
     */ ret = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$composition$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]({
        line1: g1,
        line2: g2
    });
    g1.dump = false;
    g2.dump = false;
    ret.elType = "bisectorlines";
    ret.setParents([
        l1.id,
        l2.id
    ]);
    ret.subs = {
        line1: g1,
        line2: g2
    };
    // ret.inherits.push(g1, g2);
    return ret;
};
// /**
//  * @class An m-sector is a line which divides an angle into two angles. It is given by three points A, B, and
//  * C and a real number m, and divides an angle into two angles, an angle with amplitude m and an angle with
//  * amplitude (1-m)
//  * @pseudo
//  * @constructor
//  * @name Msector
//  * @type JXG.Line
//  * @augments JXG.Line
//  * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
//  * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p3 The angle described by <tt>p1</tt>, <tt>p2</tt> and <tt>p3</tt> will
//  * be divided into two angles according to the value of <tt>m</tt>.
//  * @example
//  * var p1 = board.create('point', [6.0, 4.0]);
//  * var p2 = board.create('point', [3.0, 2.0]);
//  * var p3 = board.create('point', [1.0, 7.0]);
//  *
//  * var bi1 = board.create('msector', [p1, p2, p3], 1/5);
//  * </pre><div id="JXG0d58cea8-b06a-407c-b27c-0908f508f5a4" style="width: 400px; height: 400px;"></div>
//  * <script type="text/javascript">
//  * (function () {
//  *   var board = JXG.JSXGraph.initBoard('JXG0d58cea8-b06a-407c-b27c-0908f508f5a4', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
//  *   var p1 = board.create('point', [6.0, 4.0]);
//  *   var p2 = board.create('point', [3.0, 2.0]);
//  *   var p3 = board.create('point', [1.0, 7.0]);
//  *   var bi1 = board.create('msector', [p1, p2, p3], 1/5);
//  * })();
//  * </script><pre>
//  */
// JXG.createMsector = function (board, parents, attributes) {
//     var p, l, i, attr;
//     if (parents[0].elementClass === Const.OBJECT_CLASS_POINT &&
//             parents[1].elementClass === Const.OBJECT_CLASS_POINT &&
//             parents[2].elementClass === Const.OBJECT_CLASS_POINT) {
//         // hidden and fixed helper
//         attr = Type.copyAttributes(attributes, board.options, 'msector', 'point');
//         p = board.create('point', [
//             function () {
//                 return Geometry.angleMsector(parents[0], parents[1], parents[2], parents[3], board);
//             }
//         ], attr);
//         p.dump = false;
//         for (i = 0; i < 3; i++) {
//             // required for algorithm requiring dependencies between elements
//             parents[i].addChild(p);
//         }
//         if (!Type.exists(attributes.layer)) {
//             attributes.layer = board.options.layer.line;
//         }
//         attr = Type.copyAttributes(attributes, board.options, 'msector');
//         l = JXG.createLine(board, [parents[1], p], attr);
//         /**
//          * Helper point
//          * @memberOf Msector.prototype
//          * @type Point
//          * @name point
//          */
//         l.point = p;
//         l.elType = 'msector';
//         l.parents = [parents[0].id, parents[1].id, parents[2].id];
//         l.subs = {
//             point: p
//         };
//         l.inherits.push(p);
//         return l;
//     }
//     throw new Error("JSXGraph: Can't create angle msector with parent types '" +
//         (typeof parents[0]) + "' and '" + (typeof parents[1]) + "'." +
//         "\nPossible parent types: [point,point,point,Number]");
// };
/**
 * @class Constructs the center of a {@link Circumcircle} without creating the circle.
 * Like the circumcircle the circumcenter is constructed by providing three points.
 * @pseudo
 * @description A circumcenter is given by three points which are all lying on the circle with the
 * constructed circumcenter as the midpoint.
 * @constructor
 * @name Circumcenter
 * @type JXG.Point
 * @augments JXG.Point
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p3 The constructed point is the midpoint of the circle determined
 * by p1, p2, and p3.
 * @example
 * var p1 = board.create('point', [0.0, 2.0]);
 * var p2 = board.create('point', [2.0, 1.0]);
 * var p3 = board.create('point', [3.0, 3.0]);
 *
 * var cc1 = board.create('circumcenter', [p1, p2, p3]);
 * </pre><div class="jxgbox" id="JXGe8a40f95-bf30-4eb4-88a8-f4d5495261fd" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *   var ccmex1_board = JXG.JSXGraph.initBoard('JXGe8a40f95-bf30-4eb4-88a8-f4d5495261fd', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var ccmex1_p1 = ccmex1_board.create('point', [0.0, 2.0]);
 *   var ccmex1_p2 = ccmex1_board.create('point', [6.0, 1.0]);
 *   var ccmex1_p3 = ccmex1_board.create('point', [3.0, 7.0]);
 *   var ccmex1_cc1 = ccmex1_board.create('circumcenter', [ccmex1_p1, ccmex1_p2, ccmex1_p3]);
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCircumcenter = function(board, parents, attributes) {
    var p, i, a, b, c;
    parents = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, parents, attributes, "point");
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[0]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[1]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[2])) {
        a = parents[0];
        b = parents[1];
        c = parents[2];
        p = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPoint(board, [
            function() {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].circumcenter(a, b, c, board);
            }
        ], attributes);
        for(i = 0; i < 3; i++){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parents[i]._is_new)) {
                p.addChild(parents[i]);
                delete parents[i]._is_new;
            } else {
                parents[i].addChild(p);
            }
        }
        p.elType = "circumcenter";
        p.setParents(parents);
        p.generatePolynomial = function() {
            /*
             *  CircumcircleMidpoint takes three points A, B and C  and creates point M, which is the circumcenter of A, B, and C.
             *
             *
             * So we have two conditions:
             *
             *   (a)   CT  ==  AT           (distance condition I)
             *   (b)   BT  ==  AT           (distance condition II)
             *
             */ var a1 = a.symbolic.x, a2 = a.symbolic.y, b1 = b.symbolic.x, b2 = b.symbolic.y, c1 = c.symbolic.x, c2 = c.symbolic.y, t1 = p.symbolic.x, t2 = p.symbolic.y, poly1 = [
                "((",
                t1,
                ")-(",
                a1,
                "))^2+((",
                t2,
                ")-(",
                a2,
                "))^2-((",
                t1,
                ")-(",
                b1,
                "))^2-((",
                t2,
                ")-(",
                b2,
                "))^2"
            ].join(""), poly2 = [
                "((",
                t1,
                ")-(",
                a1,
                "))^2+((",
                t2,
                ")-(",
                a2,
                "))^2-((",
                t1,
                ")-(",
                c1,
                "))^2-((",
                t2,
                ")-(",
                c2,
                "))^2"
            ].join("");
            return [
                poly1,
                poly2
            ];
        };
        return p;
    }
    throw new Error("JSXGraph: Can't create circumcircle midpoint with parent types '" + typeof parents[0] + "', '" + typeof parents[1] + "' and '" + typeof parents[2] + "'." + "\nPossible parent types: [point,point,point]");
};
/**
 * @class The center of the incircle of the triangle described by the three given points (without
 * constructing the circle).
 * {@link https://mathworld.wolfram.com/Incenter.html}
 * @pseudo
 * @constructor
 * @name Incenter
 * @type JXG.Point
 * @augments JXG.Point
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p3 The constructed point is the incenter of the triangle described
 * by p1, p2, and p3.
 * @example
 * var p1 = board.create('point', [0.0, 2.0]);
 * var p2 = board.create('point', [2.0, 1.0]);
 * var p3 = board.create('point', [3.0, 3.0]);
 *
 * var ic1 = board.create('incenter', [p1, p2, p3]);
 * </pre><div class="jxgbox" id="JXGe8a40f95-bf30-4eb4-88a8-a2d5495261fd" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *   var icmex1_board = JXG.JSXGraph.initBoard('JXGe8a40f95-bf30-4eb4-88a8-a2d5495261fd', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var icmex1_p1 = icmex1_board.create('point', [0.0, 2.0]);
 *   var icmex1_p2 = icmex1_board.create('point', [6.0, 1.0]);
 *   var icmex1_p3 = icmex1_board.create('point', [3.0, 7.0]);
 *   var icmex1_ic1 = icmex1_board.create('incenter', [icmex1_p1, icmex1_p2, icmex1_p3]);
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createIncenter = function(board, parents, attributes) {
    var p, A, B, C, i;
    parents = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, parents, attributes, "point");
    if (parents.length >= 3 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[0]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[1]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[2])) {
        A = parents[0];
        B = parents[1];
        C = parents[2];
        p = board.create("point", [
            function() {
                var a, b, c;
                a = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(B.X() - C.X(), B.Y() - C.Y());
                b = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(A.X() - C.X(), A.Y() - C.Y());
                c = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(B.X() - A.X(), B.Y() - A.Y());
                return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                    (a * A.X() + b * B.X() + c * C.X()) / (a + b + c),
                    (a * A.Y() + b * B.Y() + c * C.Y()) / (a + b + c)
                ], board);
            }
        ], attributes);
        for(i = 0; i < 3; i++){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parents[i]._is_new)) {
                p.addChild(parents[i]);
                delete parents[i]._is_new;
            } else {
                parents[i].addChild(p);
            }
        }
        p.elType = "incenter";
        p.setParents(parents);
    } else {
        throw new Error("JSXGraph: Can't create incenter with parent types '" + typeof parents[0] + "', '" + typeof parents[1] + "' and '" + typeof parents[2] + "'." + "\nPossible parent types: [point,point,point]");
    }
    return p;
};
/**
 * @class A circumcircle is the unique circle through three points.
 * @pseudo
 * @constructor
 * @name Circumcircle
 * @type JXG.Circle
 * @augments JXG.Circle
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p3 The constructed element is the circle determined by <tt>p1</tt>, <tt>p2</tt>, and <tt>p3</tt>.
 * @example
 * var p1 = board.create('point', [0.0, 2.0]);
 * var p2 = board.create('point', [2.0, 1.0]);
 * var p3 = board.create('point', [3.0, 3.0]);
 *
 * var cc1 = board.create('circumcircle', [p1, p2, p3]);
 * </pre><div class="jxgbox" id="JXGe65c9861-0bf0-402d-af57-3ab11962f5ac" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *   var ccex1_board = JXG.JSXGraph.initBoard('JXGe65c9861-0bf0-402d-af57-3ab11962f5ac', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var ccex1_p1 = ccex1_board.create('point', [0.0, 2.0]);
 *   var ccex1_p2 = ccex1_board.create('point', [6.0, 1.0]);
 *   var ccex1_p3 = ccex1_board.create('point', [3.0, 7.0]);
 *   var ccex1_cc1 = ccex1_board.create('circumcircle', [ccex1_p1, ccex1_p2, ccex1_p3]);
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCircumcircle = function(board, parents, attributes) {
    var p, c, attr, i;
    parents = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, parents, attributes, "point");
    if (parents === false) {
        throw new Error("JSXGraph: Can't create circumcircle with parent types '" + typeof parents[0] + "', '" + typeof parents[1] + "' and '" + typeof parents[2] + "'." + "\nPossible parent types: [point,point,point]");
    }
    try {
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "circumcircle", "center");
        p = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCircumcenter(board, parents, attr);
        p.dump = false;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(attributes.layer)) {
            attributes.layer = board.options.layer.circle;
        }
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "circumcircle");
        c = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCircle(board, [
            p,
            parents[0]
        ], attr);
        c.elType = "circumcircle";
        c.setParents(parents);
        c.subs = {
            center: p
        };
        c.inherits.push(c);
        for(i = 0; i < 3; i++){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parents[i]._is_new)) {
                c.addChild(parents[i]);
                delete parents[i]._is_new;
            } else {
                parents[i].addChild(c);
            }
        }
    } catch (e) {
        throw new Error("JSXGraph: Can't create circumcircle with parent types '" + typeof parents[0] + "', '" + typeof parents[1] + "' and '" + typeof parents[2] + "'." + "\nPossible parent types: [point,point,point]");
    }
    // p is already stored as midpoint in c so there's no need to store it explicitly.
    return c;
};
/**
 * @class The circle which touches the three sides of a triangle given by three points.
 * @pseudo
 * @constructor
 * @name Incircle
 * @type JXG.Circle
 * @augments JXG.Circle
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point_JXG.Point} p1,p2,p3 The constructed point is the midpoint of the incircle of
 * <tt>p1</tt>, <tt>p2</tt>, and <tt>p3</tt>.
 * @example
 * var p1 = board.create('point', [0.0, 2.0]);
 * var p2 = board.create('point', [2.0, 1.0]);
 * var p3 = board.create('point', [3.0, 3.0]);
 *
 * var ic1 = board.create('incircle', [p1, p2, p3]);
 * </pre><div class="jxgbox" id="JXGe65c9861-0bf0-402d-af57-2ab12962f8ac" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *   var icex1_board = JXG.JSXGraph.initBoard('JXGe65c9861-0bf0-402d-af57-2ab12962f8ac', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var icex1_p1 = icex1_board.create('point', [0.0, 2.0]);
 *   var icex1_p2 = icex1_board.create('point', [6.0, 1.0]);
 *   var icex1_p3 = icex1_board.create('point', [3.0, 7.0]);
 *   var icex1_ic1 = icex1_board.create('incircle', [icex1_p1, icex1_p2, icex1_p3]);
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createIncircle = function(board, parents, attributes) {
    var i, p, c, attr;
    parents = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, parents, attributes, "point");
    if (parents === false) {
        throw new Error("JSXGraph: Can't create circumcircle with parent types '" + typeof parents[0] + "', '" + typeof parents[1] + "' and '" + typeof parents[2] + "'." + "\nPossible parent types: [point,point,point]");
    }
    try {
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "incircle", "center");
        p = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createIncenter(board, parents, attr);
        p.dump = false;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(attributes.layer)) {
            attributes.layer = board.options.layer.circle;
        }
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "incircle");
        c = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCircle(board, [
            p,
            function() {
                var a = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(parents[1].X() - parents[2].X(), parents[1].Y() - parents[2].Y()), b = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(parents[0].X() - parents[2].X(), parents[0].Y() - parents[2].Y()), c = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(parents[1].X() - parents[0].X(), parents[1].Y() - parents[0].Y()), s = (a + b + c) / 2;
                return Math.sqrt((s - a) * (s - b) * (s - c) / s);
            }
        ], attr);
        c.elType = "incircle";
        c.setParents(parents);
        for(i = 0; i < 3; i++){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parents[i]._is_new)) {
                c.addChild(parents[i]);
                delete parents[i]._is_new;
            } else {
                parents[i].addChild(c);
            }
        }
        /**
         * The center of the incircle
         * @memberOf Incircle.prototype
         * @type Incenter
         * @name center
         */ c.center = p;
        c.subs = {
            center: c.center
        };
        c.inherits.push(p);
    } catch (e) {
        throw new Error("JSXGraph: Can't create circumcircle with parent types '" + typeof parents[0] + "', '" + typeof parents[1] + "' and '" + typeof parents[2] + "'." + "\nPossible parent types: [point,point,point]");
    }
    // p is already stored as midpoint in c so there's no need to store it explicitly.
    return c;
};
/**
 * @class  Reflect a point, line, circle, curve, polygon across a given line.
 * @pseudo
 * @description A reflected element (point, polygon, line or curve) is given by a given
 * object of the same type and a line of reflection.
 * It is determined by the reflection of the given element
 * across the given line.
 * @constructor
 * @name Reflection
 * @type JXG.GeometryElement
 * @augments JXG.GeometryElement
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point|JXG.Line|JXG.Curve|JXG.Polygon_JXG.Line} p,l The reflection element is the reflection of p across the line l.
 * @example
 * var p1 = board.create('point', [0.0, 4.0]);
 * var p2 = board.create('point', [6.0, 1.0]);
 * var l1 = board.create('line', [p1, p2]);
 * var p3 = board.create('point', [3.0, 3.0]);
 *
 * var rp1 = board.create('reflection', [p3, l1]);
 * </pre><div class="jxgbox" id="JXG087a798e-a36a-4f52-a2b4-29a23a69393b" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *   var rpex1_board = JXG.JSXGraph.initBoard('JXG087a798e-a36a-4f52-a2b4-29a23a69393b', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var rpex1_p1 = rpex1_board.create('point', [0.0, 4.0]);
 *   var rpex1_p2 = rpex1_board.create('point', [6.0, 1.0]);
 *   var rpex1_l1 = rpex1_board.create('line', [rpex1_p1, rpex1_p2]);
 *   var rpex1_p3 = rpex1_board.create('point', [3.0, 3.0]);
 *   var rpex1_rp1 = rpex1_board.create('reflection', [rpex1_p3, rpex1_l1]);
 * </script><pre>
 * @example
 *         // Reflection of more elements
 *         // reflection line
 *         var li = board.create('line', [1,1,1], {strokeColor: '#aaaaaa'});
 *
 *         var p1 = board.create('point', [-3,-1], {name: "A"});
 *         var q1 = board.create('reflection', [p1, li], {name: "A'"});
 *
 *         var l1 = board.create('line', [1,-5,1]);
 *         var l2 = board.create('reflection', [l1, li]);
 *
 *         var cu1 = board.create('curve', [[-3, -3, -2.5, -3, -3, -2.5], [-3, -2, -2, -2, -2.5, -2.5]], {strokeWidth:3});
 *         var cu2 = board.create('reflection', [cu1, li], {strokeColor: 'red', strokeWidth:3});
 *
 *         var pol1 = board.create('polygon', [[-6,-3], [-4,-5], [-5,-1.5]]);
 *         var pol2 = board.create('reflection', [pol1, li]);
 *
 *         var c1 = board.create('circle', [[-2,-2], [-2, -1]]);
 *         var c2 = board.create('reflection', [c1, li]);
 *
 *         var a1 = board.create('arc', [[1, 1], [0, 1], [1, 0]], {strokeColor: 'red'});
 *         var a2 = board.create('reflection', [a1, li], {strokeColor: 'red'});
 *
 *         var s1 = board.create('sector', [[-3.5,-3], [-3.5, -2], [-3.5,-4]], {
 *                           anglePoint: {visible:true}, center: {visible: true}, radiusPoint: {visible: true},
 *                           fillColor: 'yellow', strokeColor: 'black'});
 *         var s2 = board.create('reflection', [s1, li], {fillColor: 'yellow', strokeColor: 'black', fillOpacity: 0.5});
 *
 *         var an1 = board.create('angle', [[-4,3.9], [-3, 4], [-3, 3]]);
 *         var an2 = board.create('reflection', [an1, li]);
 *
 * </pre><div id="JXG8f763af4-d449-11e7-93b3-901b0e1b8723" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG8f763af4-d449-11e7-93b3-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *             // reflection line
 *             var li = board.create('line', [1,1,1], {strokeColor: '#aaaaaa'});
 *
 *             var p1 = board.create('point', [-3,-1], {name: "A"});
 *             var q1 = board.create('reflection', [p1, li], {name: "A'"});
 *
 *             var l1 = board.create('line', [1,-5,1]);
 *             var l2 = board.create('reflection', [l1, li]);
 *
 *             var cu1 = board.create('curve', [[-3, -3, -2.5, -3, -3, -2.5], [-3, -2, -2, -2, -2.5, -2.5]], {strokeWidth:3});
 *             var cu2 = board.create('reflection', [cu1, li], {strokeColor: 'red', strokeWidth:3});
 *
 *             var pol1 = board.create('polygon', [[-6,-3], [-4,-5], [-5,-1.5]]);
 *             var pol2 = board.create('reflection', [pol1, li]);
 *
 *             var c1 = board.create('circle', [[-2,-2], [-2, -1]]);
 *             var c2 = board.create('reflection', [c1, li]);
 *
 *         var a1 = board.create('arc', [[1, 1], [0, 1], [1, 0]], {strokeColor: 'red'});
 *         var a2 = board.create('reflection', [a1, li], {strokeColor: 'red'});
 *
 *         var s1 = board.create('sector', [[-3.5,-3], [-3.5, -2], [-3.5,-4]], {
 *                           anglePoint: {visible:true}, center: {visible: true}, radiusPoint: {visible: true},
 *                           fillColor: 'yellow', strokeColor: 'black'});
 *         var s2 = board.create('reflection', [s1, li], {fillColor: 'yellow', strokeColor: 'black', fillOpacity: 0.5});
 *
 *         var an1 = board.create('angle', [[-4,3.9], [-3, 4], [-3, 3]]);
 *         var an2 = board.create('reflection', [an1, li]);
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createReflection = function(board, parents, attributes) {
    var l, org, r, r_c, t, i, attr, attr2, errStr = "\nPossible parent types: [point|line|curve|polygon|circle|arc|sector, line]";
    for(i = 0; i < parents.length; ++i){
        parents[i] = board.select(parents[i]);
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "reflection");
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[0])) {
        org = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, [
            parents[0]
        ], attr2)[0];
    } else if (parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE || parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE || parents[0].type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON || parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CIRCLE) {
        org = parents[0];
    } else {
        throw new Error("JSXGraph: Can't create reflection element with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + errStr);
    }
    if (parents[1].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
        l = parents[1];
    } else {
        throw new Error("JSXGraph: Can't create reflected element with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + errStr);
    }
    t = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createTransform(board, [
        l
    ], {
        type: "reflect"
    });
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(org)) {
        r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPoint(board, [
            org,
            t
        ], attr);
    // Arcs and sectors are treated as curves
    } else if (org.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE) {
        r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCurve(board, [
            org,
            t
        ], attr);
    } else if (org.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
        r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createLine(board, [
            org,
            t
        ], attr);
    } else if (org.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON) {
        r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPolygon(board, [
            org,
            t
        ], attr);
    } else if (org.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CIRCLE) {
        if (attr.type.toLowerCase() === "euclidean") {
            // Create a circle element from a circle and a Euclidean transformation
            attr2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "reflection", "center");
            r_c = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPoint(board, [
                org.center,
                t
            ], attr2);
            r_c.prepareUpdate().update().updateVisibility(r_c.evalVisProp('visible')).updateRenderer();
            r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCircle(board, [
                r_c,
                function() {
                    return org.Radius();
                }
            ], attr);
        } else {
            // Create a conic element from a circle and a projective transformation
            r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCircle(board, [
                org,
                t
            ], attr);
        }
    } else {
        throw new Error("JSXGraph: Can't create reflected element with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + errStr);
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(org._is_new)) {
        r.addChild(org);
        delete org._is_new;
    } else {
    // org.addChild(r);
    }
    l.addChild(r);
    r.elType = "reflection";
    r.addParents(l);
    r.prepareUpdate().update(); //.updateVisibility(r.evalVisProp('visible')).updateRenderer();
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(r)) {
        r.generatePolynomial = function() {
            /*
             *  Reflection takes a point R and a line L and creates point P, which is the reflection of R on L.
             *  L is defined by two points A and B.
             *
             * So we have two conditions:
             *
             *   (a)   RP  _|_  AB            (orthogonality condition)
             *   (b)   AR  ==   AP            (distance condition)
             *
             */ var a1 = l.point1.symbolic.x, a2 = l.point1.symbolic.y, b1 = l.point2.symbolic.x, b2 = l.point2.symbolic.y, p1 = org.symbolic.x, p2 = org.symbolic.y, r1 = r.symbolic.x, r2 = r.symbolic.y, poly1 = [
                "((",
                r2,
                ")-(",
                p2,
                "))*((",
                a2,
                ")-(",
                b2,
                "))+((",
                a1,
                ")-(",
                b1,
                "))*((",
                r1,
                ")-(",
                p1,
                "))"
            ].join(""), poly2 = [
                "((",
                r1,
                ")-(",
                a1,
                "))^2+((",
                r2,
                ")-(",
                a2,
                "))^2-((",
                p1,
                ")-(",
                a1,
                "))^2-((",
                p2,
                ")-(",
                a2,
                "))^2"
            ].join("");
            return [
                poly1,
                poly2
            ];
        };
    }
    return r;
};
/**
 * @class Reflect a point, line, circle, curve, polygon across a given point.
 * @pseudo
 * @description A mirror element is determined by the reflection of a
 * given point, line, circle, curve, polygon across another given point.
 * In contrast to generic transformations, mirror elements of circles are again circles.
 * @constructor
 * @name MirrorElement
 * @type JXG.GeometryElement
 * @augments JXG.GeometryElement
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point|JXG.Line|JXG.Curve|JXG.Ppolygon_JXG.Point} p1,p2 The constructed element is the mirror image of p2 across p1.
 * @example
 *         // point of reflection
 *         var mirr = board.create('point', [-1,-1], {color: '#aaaaaa'});
 *
 *         var p1 = board.create('point', [-3,-1], {name: "A"});
 *         var q1 = board.create('mirrorelement', [p1, mirr], {name: "A'"});
 *
 *         var l1 = board.create('line', [1, -5, 1]);
 *         var l2 = board.create('mirrorelement', [l1, mirr]);
 *
 *         var cu1 = board.create('curve', [[-3, -3, -2.5, -3, -3, -2.5], [-3, -2, -2, -2, -2.5, -2.5]], {strokeWidth:3});
 *         var cu2 = board.create('mirrorelement', [cu1, mirr], {strokeColor: 'red', strokeWidth:3});
 *
 *         var pol1 = board.create('polygon', [[-6,-2], [-4,-4], [-5,-0.5]]);
 *         var pol2 = board.create('mirrorelement', [pol1, mirr]);
 *
 *         var c1 = board.create('circle', [[-6,-6], [-6, -5]]);
 *         var c2 = board.create('mirrorelement', [c1, mirr]);
 *
 *         var a1 = board.create('arc', [[1, 1], [0, 1], [1, 0]], {strokeColor: 'red'});
 *         var a2 = board.create('mirrorelement', [a1, mirr], {strokeColor: 'red'});
 *
 *         var s1 = board.create('sector', [[-3.5,-3], [-3.5, -2], [-3.5,-4]], {
 *                           anglePoint: {visible:true}, center: {visible: true}, radiusPoint: {visible: true},
 *                           fillColor: 'yellow', strokeColor: 'black'});
 *         var s2 = board.create('mirrorelement', [s1, mirr], {fillColor: 'yellow', strokeColor: 'black', fillOpacity: 0.5});
 *
 *         var an1 = board.create('angle', [[-4,3.9], [-3, 4], [-3, 3]]);
 *         var an2 = board.create('mirrorelement', [an1, mirr]);
 *
 *
 * </pre><div id="JXG026c779c-d8d9-11e7-93b3-901b0e1b8723" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG026c779c-d8d9-11e7-93b3-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *             // point of reflection
 *             var mirr = board.create('point', [-1,-1], {color: '#aaaaaa'});
 *
 *             var p1 = board.create('point', [-3,-1], {name: "A"});
 *             var q1 = board.create('mirrorelement', [p1, mirr], {name: "A'"});
 *
 *             var l1 = board.create('line', [1,-5, 1]);
 *             var l2 = board.create('mirrorelement', [l1, mirr]);
 *
 *             var cu1 = board.create('curve', [[-3, -3, -2.5, -3, -3, -2.5], [-3, -2, -2, -2, -2.5, -2.5]], {strokeWidth:3});
 *             var cu2 = board.create('mirrorelement', [cu1, mirr], {strokeColor: 'red', strokeWidth:3});
 *
 *             var pol1 = board.create('polygon', [[-6,-2], [-4,-4], [-5,-0.5]]);
 *             var pol2 = board.create('mirrorelement', [pol1, mirr]);
 *
 *             var c1 = board.create('circle', [[-6,-6], [-6, -5]]);
 *             var c2 = board.create('mirrorelement', [c1, mirr]);
 *
 *         var a1 = board.create('arc', [[1, 1], [0, 1], [1, 0]], {strokeColor: 'red'});
 *         var a2 = board.create('mirrorelement', [a1, mirr], {strokeColor: 'red'});
 *
 *         var s1 = board.create('sector', [[-3.5,-3], [-3.5, -2], [-3.5,-4]], {
 *                           anglePoint: {visible:true}, center: {visible: true}, radiusPoint: {visible: true},
 *                           fillColor: 'yellow', strokeColor: 'black'});
 *         var s2 = board.create('mirrorelement', [s1, mirr], {fillColor: 'yellow', strokeColor: 'black', fillOpacity: 0.5});
 *
 *         var an1 = board.create('angle', [[-4,3.9], [-3, 4], [-3, 3]]);
 *         var an2 = board.create('mirrorelement', [an1, mirr]);
 *
 *     })();
 *
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMirrorElement = function(board, parents, attributes) {
    var org, i, m, r, r_c, t, attr, attr2, errStr = "\nPossible parent types: [point|line|curve|polygon|circle|arc|sector, point]";
    for(i = 0; i < parents.length; ++i){
        parents[i] = board.select(parents[i]);
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "mirrorelement");
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[0])) {
        // Create point to be mirrored if supplied by coords array.
        org = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, [
            parents[0]
        ], attr)[0];
    } else if (parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE || parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE || parents[0].type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON || parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CIRCLE) {
        org = parents[0];
    } else {
        throw new Error("JSXGraph: Can't create mirror element with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + errStr);
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[1])) {
        attr2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "mirrorelement", "point");
        // Create mirror point if supplied by coords array.
        m = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints(board, [
            parents[1]
        ], attr2)[0];
    } else {
        throw new Error("JSXGraph: Can't create mirror element with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + errStr);
    }
    t = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createTransform(board, [
        Math.PI,
        m
    ], {
        type: "rotate"
    });
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(org)) {
        r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPoint(board, [
            org,
            t
        ], attr);
    // Arcs and sectors are treated as curves
    } else if (org.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE) {
        r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCurve(board, [
            org,
            t
        ], attr);
    } else if (org.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
        r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createLine(board, [
            org,
            t
        ], attr);
    } else if (org.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON) {
        r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPolygon(board, [
            org,
            t
        ], attr);
    } else if (org.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CIRCLE) {
        if (attr.type.toLowerCase() === "euclidean") {
            // Create a circle element from a circle and a Euclidean transformation
            attr2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "mirrorelement", "center");
            r_c = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPoint(board, [
                org.center,
                t
            ], attr2);
            r_c.prepareUpdate().update().updateVisibility(r_c.evalVisProp('visible')).updateRenderer();
            r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCircle(board, [
                r_c,
                function() {
                    return org.Radius();
                }
            ], attr);
        } else {
            // Create a conic element from a circle and a projective transformation
            r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCircle(board, [
                org,
                t
            ], attr);
        }
    } else {
        throw new Error("JSXGraph: Can't create mirror element with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + errStr);
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(org._is_new)) {
        r.addChild(org);
        delete org._is_new;
    } else {
    // org.addChild(r);
    }
    m.addChild(r);
    r.elType = "mirrorelement";
    r.addParents(m);
    r.prepareUpdate().update();
    return r;
};
/**
 * @class A MirrorPoint is a special case of a {@link MirrorElement}.
 * @pseudo
 * @description A mirror point is determined by the reflection of a given point against another given point.
 * @constructor
 * @name MirrorPoint
 * @type JXG.Point
 * @augments JXG.Point
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point} p1,p2 The constructed point is the reflection of p2 against p1.
 *
 * This method is superseeded by the more general {@link JXG.createMirrorElement}.
 * @example
 * var p1 = board.create('point', [3.0, 3.0]);
 * var p2 = board.create('point', [6.0, 1.0]);
 *
 * var mp1 = board.create('mirrorpoint', [p1, p2]);
 * </pre><div class="jxgbox" id="JXG7eb2a814-6c4b-4caa-8cfa-4183a948d25b" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *   var mpex1_board = JXG.JSXGraph.initBoard('JXG7eb2a814-6c4b-4caa-8cfa-4183a948d25b', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var mpex1_p1 = mpex1_board.create('point', [3.0, 3.0]);
 *   var mpex1_p2 = mpex1_board.create('point', [6.0, 1.0]);
 *   var mpex1_mp1 = mpex1_board.create('mirrorpoint', [mpex1_p1, mpex1_p2]);
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMirrorPoint = function(board, parents, attributes) {
    var el = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMirrorElement(board, parents, attributes);
    el.elType = "mirrorpoint";
    return el;
};
/**
 * @class The graph of the integral function of a given function in a given interval.
 * @pseudo
 * @description The Integral element is used to visualize the area under a given curve over a given interval
 * and to calculate the area's value. For that a polygon and gliders are used. The polygon displays the area,
 * the gliders are used to change the interval dynamically.
 * @constructor
 * @name Integral
 * @type JXG.Curve
 * @augments JXG.Curve
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {Array_JXG.Curve} i,c The constructed element covers the area between the curve <tt>c</tt> and the x-axis
 * within the interval <tt>i</tt>.
 * @example
 * var c1 = board.create('functiongraph', [function (t) { return Math.cos(t)*t; }]);
 * var i1 = board.create('integral', [[-2.0, 2.0], c1]);
 * </pre><div class="jxgbox" id="JXGd45d7188-6624-4d6e-bebb-1efa2a305c8a" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *   var intex1_board = JXG.JSXGraph.initBoard('JXGd45d7188-6624-4d6e-bebb-1efa2a305c8a', {boundingbox: [-5, 5, 5, -5], axis: true, showcopyright: false, shownavigation: false});
 *   var intex1_c1 = intex1_board.create('functiongraph', [function (t) { return Math.cos(t)*t; }]);
 *   var intex1_i1 = intex1_board.create('integral', [[-2.0, 2.0], intex1_c1]);
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createIntegral = function(board, parents, attributes) {
    var interval, curve, attr, start, end, startx, starty, endx, endy, pa_on_curve, pa_on_axis, pb_on_curve, pb_on_axis, txt_fun, t = null, p;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[0]) && parents[1].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE) {
        interval = parents[0];
        curve = parents[1];
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[1]) && parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE) {
        interval = parents[1];
        curve = parents[0];
    } else {
        throw new Error("JSXGraph: Can't create integral with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [[number|function,number|function],curve]");
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "integral");
    attr.withlabel = false; // There is a custom 'label' below.
    p = board.create("curve", [
        [
            0
        ],
        [
            0
        ]
    ], attr);
    // Dirty hack: the integral curve is removed from board.objectsList
    // and inserted below again after the pa_/pb_on_axis elements.
    // Otherwise, the filled area lags is updated before the
    // update of the bounds.
    board.objectsList.pop();
    // Correct the interval if necessary - NOT ANYMORE, GGB's fault
    start = interval[0];
    end = interval[1];
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(start)) {
        startx = start;
        starty = function() {
            return curve.Y(startx());
        };
        start = startx();
    } else {
        startx = start;
        starty = curve.Y(start);
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(end)) {
        endx = end;
        endy = function() {
            return curve.Y(endx());
        };
        end = endx();
    } else {
        endx = end;
        endy = curve.Y(end);
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "integral", "curveleft");
    pa_on_curve = board.create("glider", [
        startx,
        starty,
        curve
    ], attr);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(startx)) {
        pa_on_curve.hideElement();
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'integral', 'baseleft');
    pa_on_axis = board.create('point', [
        function() {
            if (p.evalVisProp('axis') === "y") {
                return 0;
            }
            return pa_on_curve.X();
        },
        function() {
            if (p.evalVisProp('axis') === "y") {
                return pa_on_curve.Y();
            }
            return 0;
        }
    ], attr);
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "integral", "curveright");
    pb_on_curve = board.create("glider", [
        endx,
        endy,
        curve
    ], attr);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(endx)) {
        pb_on_curve.hideElement();
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "integral", "baseright");
    pb_on_axis = board.create('point', [
        function() {
            if (p.evalVisProp('axis') === "y") {
                return 0;
            }
            return pb_on_curve.X();
        },
        function() {
            if (p.evalVisProp('axis') === "y") {
                return pb_on_curve.Y();
            }
            return 0;
        }
    ], attr);
    // Re-insert the filled integral curve element
    p._pos = board.objectsList.length;
    board.objectsList.push(p);
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "integral");
    if (attr.withlabel !== false && attr.axis !== "y") {
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "integral", "label");
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attr, board.options, "label");
        t = board.create('text', [
            function() {
                var off = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, [
                    this.evalVisProp('offset.0') + this.board.origin.scrCoords[1],
                    0
                ], this.board, false), bb = this.board.getBoundingBox(), dx = (bb[2] - bb[0]) * 0.1, x = pb_on_curve.X();
                if (x < bb[0]) {
                    x = bb[0] + dx;
                } else if (x > bb[2]) {
                    x = bb[2] - dx;
                }
                return x + off.usrCoords[1];
            },
            function() {
                var off = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, [
                    0,
                    this.evalVisProp('offset.1') + this.board.origin.scrCoords[2]
                ], this.board, false), bb = this.board.getBoundingBox(), dy = (bb[1] - bb[3]) * 0.1, y = pb_on_curve.Y();
                if (y > bb[1]) {
                    y = bb[1] - dy;
                } else if (y < bb[3]) {
                    y = bb[3] + dy;
                }
                return y + off.usrCoords[2];
            },
            ''
        ], attr);
        txt_fun = function() {
            var intSymbol = '&int;', Int = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].NewtonCotes([
                pa_on_axis.X(),
                pb_on_axis.X()
            ], curve.Y), digits = t.evalVisProp('digits'), val;
            if (t.useLocale()) {
                val = t.formatNumberLocale(Int, digits);
            } else {
                val = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].toFixed(Int, digits);
            }
            if (t.evalVisProp('usemathjax') || t.evalVisProp('usekatex')) {
                intSymbol = '\\int';
            }
            return intSymbol + ' = ' + val;
        };
        t.setText(txt_fun);
        t.dump = false;
        pa_on_curve.addChild(t);
        pb_on_curve.addChild(t);
    }
    // dump stuff
    pa_on_curve.dump = false;
    pa_on_axis.dump = false;
    pb_on_curve.dump = false;
    pb_on_axis.dump = false;
    p.elType = "integral";
    p.setParents([
        curve.id,
        interval
    ]);
    p.subs = {
        curveLeft: pa_on_curve,
        baseLeft: pa_on_axis,
        curveRight: pb_on_curve,
        baseRight: pb_on_axis
    };
    p.inherits.push(pa_on_curve, pa_on_axis, pb_on_curve, pb_on_axis);
    if (attr.withlabel) {
        p.subs.label = t;
        p.inherits.push(t);
    }
    /**
     * Returns the current value of the integral.
     * @memberOf Integral
     * @name Value
     * @function
     * @returns {Number}
     */ p.Value = function() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].I([
            pa_on_axis.X(),
            pb_on_axis.X()
        ], curve.Y);
    };
    /**
     * documented in JXG.Curve
     * @class
     * @ignore
     */ p.updateDataArray = function() {
        var x, y, i, left, right, lowx, upx, lowy, upy;
        if (this.evalVisProp('axis') === "y") {
            if (pa_on_curve.Y() < pb_on_curve.Y()) {
                lowx = pa_on_curve.X();
                lowy = pa_on_curve.Y();
                upx = pb_on_curve.X();
                upy = pb_on_curve.Y();
            } else {
                lowx = pb_on_curve.X();
                lowy = pb_on_curve.Y();
                upx = pa_on_curve.X();
                upy = pa_on_curve.Y();
            }
            left = Math.min(lowx, upx);
            right = Math.max(lowx, upx);
            x = [
                0,
                lowx
            ];
            y = [
                lowy,
                lowy
            ];
            for(i = 0; i < curve.numberPoints; i++){
                if (lowy <= curve.points[i].usrCoords[2] && left <= curve.points[i].usrCoords[1] && curve.points[i].usrCoords[2] <= upy && curve.points[i].usrCoords[1] <= right) {
                    x.push(curve.points[i].usrCoords[1]);
                    y.push(curve.points[i].usrCoords[2]);
                }
            }
            x.push(upx);
            y.push(upy);
            x.push(0);
            y.push(upy);
            // close the curve
            x.push(0);
            y.push(lowy);
        } else {
            if (pa_on_axis.X() < pb_on_axis.X()) {
                left = pa_on_axis.X();
                right = pb_on_axis.X();
            } else {
                left = pb_on_axis.X();
                right = pa_on_axis.X();
            }
            x = [
                left,
                left
            ];
            y = [
                0,
                curve.Y(left)
            ];
            for(i = 0; i < curve.numberPoints; i++){
                if (left <= curve.points[i].usrCoords[1] && curve.points[i].usrCoords[1] <= right) {
                    x.push(curve.points[i].usrCoords[1]);
                    y.push(curve.points[i].usrCoords[2]);
                }
            }
            x.push(right);
            y.push(curve.Y(right));
            x.push(right);
            y.push(0);
            // close the curve
            x.push(left);
            y.push(0);
        }
        this.dataX = x;
        this.dataY = y;
    };
    pa_on_curve.addChild(p);
    pb_on_curve.addChild(p);
    pa_on_axis.addChild(p);
    pb_on_axis.addChild(p);
    /**
     * The point on the axis initially corresponding to the lower value of the interval.
     *
     * @name baseLeft
     * @memberOf Integral
     * @type JXG.Point
     */ p.baseLeft = pa_on_axis;
    /**
     * The point on the axis initially corresponding to the higher value of the interval.
     *
     * @name baseRight
     * @memberOf Integral
     * @type JXG.Point
     */ p.baseRight = pb_on_axis;
    /**
     * The glider on the curve corresponding to the lower value of the interval.
     *
     * @name curveLeft
     * @memberOf Integral
     * @type Glider
     */ p.curveLeft = pa_on_curve;
    /**
     * The glider on the axis corresponding to the higher value of the interval.
     *
     * @name curveRight
     * @memberOf Integral
     * @type Glider
     */ p.curveRight = pb_on_curve;
    p.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(p.methodMap, {
        curveLeft: "curveLeft",
        baseLeft: "baseLeft",
        curveRight: "curveRight",
        baseRight: "baseRight",
        Value: "Value"
    });
    /**
     * documented in GeometryElement
     * @ignore
     */ p.label = t;
    return p;
};
/**
 * @class The area which is the set of solutions of a linear inequality or an inequality
 * of a function graph.
 * For example, an inequality of type y <= f(x).
 * @pseudo
 * @description Display the solution set of a linear inequality (less than or equal to).
 * To be precise, the solution set of the inequality <i>y <= b/a * x + c/a</i> is shown.
 * In case <i>a = 0</i>, that is if the equation of the line is <i>bx + c = 0</i>,
 * the area of the inequality <i>bx + c <= 0</i> is shown.
 * <p>
 * For function graphs the area below the function graph is filled, i.e. the
 * area of the inequality y <= f(x).
 * With the attribute inverse:true the area of the inequality y >= f(x) is filled.
 *
 * @param {JXG.Line} l The area drawn will be the area below this line. With the attribute
 * inverse:true, the inequality 'greater than or equal to' is shown.
 * @constructor
 * @name Inequality
 * @type JXG.Curve
 * @augments JXG.Curve
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @example
 * var p = board.create('point', [1, 3]),
 *     q = board.create('point', [-2, -4]),
 *     l = board.create('line', [p, q]),
 *     ineq = board.create('inequality', [l]);
 * ineq = board.create('inequality', [l]);
 * </pre><div class="jxgbox" id="JXG2b703006-fd98-11e1-b79e-ef9e591c002e" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 * (function () {
 *  var board = JXG.JSXGraph.initBoard('JXG2b703006-fd98-11e1-b79e-ef9e591c002e', {boundingbox:[-4, 6, 10, -6], axis: false, grid: false, keepaspectratio: true}),
 *      p = board.create('point', [1, 3]),
 *      q = board.create('point', [-2, -4]),
 *      l = board.create('line', [p, q]),
 *      ineq = board.create('inequality', [l]);
 * })();
 * </script><pre>
 *
 * @example
 * // Plot the inequality
 * //     y >= 2/3 x + 1
 * // or
 * //     0 >= -3y + 2x +1
 * var l = board.create('line', [1, 2, -3]),
 *     ineq = board.create('inequality', [l], {inverse:true});
 * </pre><div class="jxgbox" id="JXG1ded3812-2da4-4323-abaf-1db4bad1bfbd" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 * (function () {
 *  var board = JXG.JSXGraph.initBoard('JXG1ded3812-2da4-4323-abaf-1db4bad1bfbd', {boundingbox:[-4, 6, 10, -6], axis: false, grid: false, keepaspectratio: true}),
 *      l = board.create('line', [1, 2, -3]),
 *      ineq = board.create('inequality', [l], {inverse:true});
 * })();
 * </script><pre>
 *
 * @example
 * var f = board.create('functiongraph', ['sin(x)', -2*Math.PI, 2*Math.PI]);
 *
 * var ineq_lower = board.create('inequality', [f]);
 * var ineq_greater = board.create('inequality', [f], {inverse: true, fillColor: 'yellow'});
 *
 *
 * </pre><div id="JXGdb68c574-414c-11e8-839a-901b0e1b8723" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGdb68c574-414c-11e8-839a-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var f = board.create('functiongraph', ['sin(x)', -2*Math.PI, 2*Math.PI]);
 *
 *     var ineq_lower = board.create('inequality', [f]);
 *     var ineq_greater = board.create('inequality', [f], {inverse: true, fillColor: 'yellow'});
 *
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createInequality = function(board, parents, attributes) {
    var f, a, attr;
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "inequality");
    if (parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
        a = board.create("curve", [
            [],
            []
        ], attr);
        a.hasPoint = function() {
            return false;
        };
        /**
         * @class
         * @ignore
         */ a.updateDataArray = function() {
            var i1, i2, // This will be the height of the area. We mustn't rely upon the board height because if we pan the view
            // such that the line is not visible anymore, the borders of the area will get visible in some cases.
            h, bb = board.getBoundingBox(), inverse = this.evalVisProp('inverse'), factor = inverse ? -1 : 1, expansion = 1.5, w = expansion * Math.max(bb[2] - bb[0], bb[1] - bb[3]), // Fake a point (for Math.Geometry.perpendicular)
            // contains centroid of the board
            dp = {
                coords: {
                    usrCoords: [
                        1,
                        (bb[0] + bb[2]) * 0.5,
                        inverse ? bb[1] : bb[3]
                    ]
                }
            }, slope1 = parents[0].stdform.slice(1), slope2 = slope1;
            // Calculate the area height as
            //  expansion times the distance of the line to the
            // point in the middle of the top/bottom border.
            h = expansion * Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].perpendicular(parents[0], dp, board)[0].distance(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, dp.coords), w);
            h *= factor;
            // reuse dp
            dp = {
                coords: {
                    usrCoords: [
                        1,
                        (bb[0] + bb[2]) * 0.5,
                        (bb[1] + bb[3]) * 0.5
                    ]
                }
            };
            // If dp is on the line, Geometry.perpendicular will return a point not on the line.
            // Since this somewhat odd behavior of Geometry.perpendicular is needed in GEONExT,
            // it is circumvented here.
            if (Math.abs(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(dp.coords.usrCoords, parents[0].stdform, 3)) >= __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps) {
                dp = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].perpendicular(parents[0], dp, board)[0].usrCoords;
            } else {
                dp = dp.coords.usrCoords;
            }
            i1 = [
                1,
                dp[1] + slope1[1] * w,
                dp[2] - slope1[0] * w
            ];
            i2 = [
                1,
                dp[1] - slope2[1] * w,
                dp[2] + slope2[0] * w
            ];
            // One of the vectors based in i1 and orthogonal to the parent line has the direction d1 = (slope1, -1)
            // We will go from i1 to i1 + h*d1, from there to i2 + h*d2 (with d2 calculated equivalent to d1) and
            // end up in i2.
            this.dataX = [
                i1[1],
                i1[1] + slope1[0] * h,
                i2[1] + slope2[0] * h,
                i2[1],
                i1[1]
            ];
            this.dataY = [
                i1[2],
                i1[2] + slope1[1] * h,
                i2[2] + slope2[1] * h,
                i2[2],
                i1[2]
            ];
        };
    } else if (parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE && parents[0].visProp.curvetype === "functiongraph") {
        a = board.create("curve", [
            [],
            []
        ], attr);
        /**
         * @class
         * @ignore
         */ a.updateDataArray = function() {
            var bbox = this.board.getBoundingBox(), points = [], infty, first, last, len, i, mi = parents[0].minX(), ma = parents[0].maxX(), curve_mi, curve_ma, firstx, lastx, enlarge = (bbox[1] - bbox[3]) * 0.3, inverse = this.evalVisProp('inverse');
            // inverse == true <=> Fill area with y >= f(x)
            infty = inverse ? 1 : 3; // we will use either bbox[1] or bbox[3] below
            this.dataX = [];
            this.dataY = [];
            len = parents[0].points.length;
            if (len === 0) {
                return;
            }
            bbox[1] += enlarge;
            bbox[3] -= enlarge;
            last = -1;
            while(last < len - 1){
                // Find the first point with real coordinates on this curve segment
                for(i = last + 1, first = len; i < len; i++){
                    if (parents[0].points[i].isReal()) {
                        first = i;
                        break;
                    }
                }
                // No real points found -> exit
                if (first >= len) {
                    break;
                }
                // Find the last point with real coordinates on this curve segment
                for(i = first, last = len - 1; i < len - 1; i++){
                    if (!parents[0].points[i + 1].isReal()) {
                        last = i;
                        break;
                    }
                }
                firstx = parents[0].points[first].usrCoords[1];
                lastx = parents[0].points[last].usrCoords[1];
                // Restrict the plot interval if the function ends inside of the board
                curve_mi = bbox[0] < mi ? mi : bbox[0];
                curve_ma = bbox[2] > ma ? ma : bbox[2];
                // Found NaNs
                curve_mi = first === 0 ? curve_mi : Math.max(curve_mi, firstx);
                curve_ma = last === len - 1 ? curve_ma : Math.min(curve_ma, lastx);
                // First and last relevant x-coordinate of the curve
                curve_mi = first === 0 ? mi : firstx;
                curve_ma = last === len - 1 ? ma : lastx;
                // Copy the curve points
                points = [];
                points.push([
                    1,
                    curve_mi,
                    bbox[infty]
                ]);
                points.push([
                    1,
                    curve_mi,
                    parents[0].points[first].usrCoords[2]
                ]);
                for(i = first; i <= last; i++){
                    points.push(parents[0].points[i].usrCoords);
                }
                points.push([
                    1,
                    curve_ma,
                    parents[0].points[last].usrCoords[2]
                ]);
                points.push([
                    1,
                    curve_ma,
                    bbox[infty]
                ]);
                points.push(points[0]);
                for(i = 0; i < points.length; i++){
                    this.dataX.push(points[i][1]);
                    this.dataY.push(points[i][2]);
                }
                if (last < len - 1) {
                    this.dataX.push(NaN);
                    this.dataY.push(NaN);
                }
            }
        };
        // Previous code:
        /**
         * @class
         * @ignore
         */ a.hasPoint = function() {
            return false;
        };
    } else {
        // Not yet practical?
        f = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunction(parents[0]);
        a.addParentsFromJCFunctions([
            f
        ]);
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(f)) {
            throw new Error("JSXGraph: Can't create area with the given parents." + "\nPossible parent types: [line], [function]");
        }
    }
    a.addParents(parents[0]);
    return a;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("arrowparallel", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createArrowParallel);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("bisector", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createBisector);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("bisectorlines", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createAngularBisectorsOfTwoLines);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("msector", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMsector);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("circumcircle", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCircumcircle);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("circumcirclemidpoint", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCircumcenter);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("circumcenter", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCircumcenter);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("incenter", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createIncenter);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("incircle", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createIncircle);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("integral", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createIntegral);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("midpoint", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMidpoint);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("mirrorelement", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMirrorElement);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("mirrorpoint", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMirrorPoint);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("orthogonalprojection", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createOrthogonalProjection);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("parallel", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createParallel);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("parallelpoint", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createParallelPoint);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("perpendicular", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPerpendicular);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("perpendicularpoint", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPerpendicularPoint);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("perpendicularsegment", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPerpendicularSegment);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("reflection", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createReflection);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("inequality", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createInequality); // export default {
 //     createArrowParallel: JXG.createArrowParallel,
 //     createBisector: JXG.createBisector,
 //     createAngularBisectorOfTwoLines: JXG.createAngularBisectorsOfTwoLines,
 //     createCircumcircle: JXG.createCircumcircle,
 //     createCircumcenter: JXG.createCircumcenter,
 //     createIncenter: JXG.createIncenter,
 //     createIncircle: JXG.createIncircle,
 //     createIntegral: JXG.createIntegral,
 //     createMidpoint: JXG.createMidpoint,
 //     createMirrorElement: JXG.createMirrorElement,
 //     createMirrorPoint: JXG.createMirrorPoint,
 //     createNormal: JXG.createNormal,
 //     createOrthogonalProjection: JXG.createOrthogonalProjection,
 //     createParallel: JXG.createParallel,
 //     createParallelPoint: JXG.createParallelPoint,
 //     createPerpendicular: JXG.createPerpendicular,
 //     createPerpendicularPoint: JXG.createPerpendicularPoint,
 //     createPerpendicularSegmen: JXG.createPerpendicularSegment,
 //     createReflection: JXG.createReflection,
 //     createInequality: JXG.createInequality
 // };
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/grid.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Andreas Walter,
        Alfred Wassermann

    This file is part of JSXGraph.

    JSXGraph is free software dual licensed under the GNU LGPL or MIT License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License and
    the MIT License along with JSXGraph. If not, see <https://www.gnu.org/licenses/>
    and <https://opensource.org/licenses/MIT/>.
 */ /*
    Some functionalities in this file were developed as part of a software project
    with students. We would like to thank all contributors for their help:

    Winter semester 2023/2024:
        Timm Braun
        Nina Koch
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
;
;
;
;
/**
 * @class A grid is a mesh consisting of vertical and horizontal lines or other geometrical objects.
 * @pseudo
 * @description A grid is a set of vertical and horizontal lines or other geometrical objects (faces)
 * to support the user with element placement or to improve determination of position.
 * This method takes up to two facultative parent elements. These are used to set distance between
 * grid elements in case of attribute <tt>majorStep</tt> or <tt>minorElements</tt> is set to 'auto'.
 * Then the major/minor grid element distance is set to the ticks distance of parent axes.
 * It is usually instantiated on the board's creation via the attribute <tt>grid</tt> set to true.
 * @constructor
 * @name Grid
 * @type JXG.Curve
 * @augments JXG.Curve
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Axis_JXG.Axis} a1,a2 Optional parent axis.
 *
 * @example
 * // standard grid
 * var g = board.create('grid', [], {});
 * </pre><div id="JXGc8dde3f5-22ef-4c43-9505-34b299b5b24d" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *  (function() {
 *      var board = JXG.JSXGraph.initBoard('JXGc8dde3f5-22ef-4c43-9505-34b299b5b24d',
 *          {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *      var g = board.create('grid', [], {});
 *  })();
 * </script><pre>
 *
 * @example
 * // more fancy grid
 * var g = board.create('grid', [], {
 *     major: {
 *         face: 'plus',
 *         size: 7,
 *         strokeColor: 'green',
 *         strokeOpacity: 1,
 *     },
 *     minor: {
 *         size: 4
 *     },
 *     minorElements: 3,
 * });
 * </pre><div id="JXG02374171-b27c-4ccc-a14a-9f5bd1162623" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG02374171-b27c-4ccc-a14a-9f5bd1162623',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *         var g = board.create('grid', [], {
 *             major: {
 *                 face: 'plus',
 *                 size: 7,
 *                 strokeColor: 'green',
 *                 strokeOpacity: 1,
 *             },
 *             minor: {
 *                 size: 4
 *             },
 *             minorElements: 3,
 *         });
 *     })();
 * </script><pre>
 *
 * @example
 * // extreme fancy grid
 * var grid = board.create('grid', [], {
 *     major: {
 *         face: 'regularPolygon',
 *         size: 8,
 *         strokeColor: 'blue',
 *         fillColor: 'orange',
 *         strokeOpacity: 1,
 *     },
 *     minor: {
 *         face: 'diamond',
 *         size: 4,
 *         strokeColor: 'green',
 *         fillColor: 'grey',
 *     },
 *     minorElements: 1,
 *     includeBoundaries: false,
 * });
 * </pre><div id="JXG00f3d068-093c-4c1d-a1ab-96c9ee73c173" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG00f3d068-093c-4c1d-a1ab-96c9ee73c173',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *         var grid = board.create('grid', [], {
 *             major: {
 *                 face: 'regularPolygon',
 *                 size: 8,
 *                 strokeColor: 'blue',
 *                 fillColor: 'orange',
 *                 strokeOpacity: 1,
 *             },
 *             minor: {
 *                 face: 'diamond',
 *                 size: 4,
 *                 strokeColor: 'green',
 *                 fillColor: 'grey',
 *             },
 *             minorElements: 1,
 *             includeBoundaries: false,
 *         });
 *     })();
 * </script><pre>
 *
 * @example
 * // grid with parent axes
 * var axis1 = board.create('axis', [[-1, -2.5], [1, -2.5]], {
 *     ticks: {
 *         strokeColor: 'green',
 *         strokeWidth: 2,
 *         minorticks: 2,
 *         majorHeight: 10,
 *         drawZero: true
 *     }
 * });
 * var axis2 = board.create('axis', [[3, 0], [3, 2]], {
 *     ticks: {
 *         strokeColor: 'red',
 *         strokeWidth: 2,
 *         minorticks: 3,
 *         majorHeight: 10,
 *         drawZero: true
 *     }
 * });
 * var grid = board.create('grid', [axis1, axis2], {
 *     major: {
 *         face: 'line'
 *     },
 *     minor: {
 *         face: 'point',
 *         size: 3
 *     },
 *     minorElements: 'auto',
 *     includeBoundaries: false,
 * });
 * </pre><div id="JXG0568e385-248c-43a9-87ed-07aceb8cc3ab" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG0568e385-248c-43a9-87ed-07aceb8cc3ab',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *         var axis1 = board.create('axis', [[-1, -2.5], [1, -2.5]], {
 *             ticks: {
 *                 strokeColor: 'green',
 *                 strokeWidth: 2,
 *                 minorticks: 2,
 *                 majorHeight: 10,
 *                 drawZero: true
 *             }
 *         });
 *         var axis2 = board.create('axis', [[3, 0], [3, 2]], {
 *             ticks: {
 *                 strokeColor: 'red',
 *                 strokeWidth: 2,
 *                 minorticks: 3,
 *                 majorHeight: 10,
 *                 drawZero: true
 *             }
 *         });
 *         var grid = board.create('grid', [axis1, axis2], {
 *             major: {
 *                 face: 'line',
 *             },
 *             minor: {
 *                 face: 'point',
 *                 size: 3
 *             },
 *             minorElements: 'auto',
 *             includeBoundaries: false,
 *         });
 *     }());
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createGrid = function(board, parents, attributes) {
    var eps = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps, maxLines = 5000, majorGrid, minorGrid, parentAxes, attrGrid, attrMajor, attrMinor, majorStep, majorSize = [], majorRadius = [], createDataArrayForFace; // {Function}
    parentAxes = parents;
    if (parentAxes.length > 2 || parentAxes.length >= 1 && parentAxes[0].elType !== 'axis' || parentAxes.length >= 2 && parentAxes[1].elType !== 'axis') {
        throw new Error("JSXGraph: Can't create 'grid' with parent type '" + parents[0].elType + "'. Possible parent types: [axis,axis]");
    }
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parentAxes[0]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(board.defaultAxes)) {
        parentAxes[0] = board.defaultAxes.x;
    }
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parentAxes[1]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(board.defaultAxes)) {
        parentAxes[1] = board.defaultAxes.y;
    }
    /**
     * Creates for each face the right data array for updateDataArray function.
     * This functions also adapts visProps according to face.

     * @param {String} face Chosen face to be drawn
     * @param {Object} grid Curve/grid to be drawn
     * @param {Number} x x-coordinate of target position
     * @param {Number} y y-coordinate of target position
     * @param {Number} radiusX Half of width in x-direction of face to be drawn
     * @param {Number} radiusY Half of width in y-direction of face to be drawn
     * @param {Array} bbox boundingBox
     *
     * @returns {Array} data array of length 2 (x- and y- coordinated for curve)
     * @private
     * @ignore
     */ createDataArrayForFace = function(face, grid, x, y, radiusX, radiusY, bbox) {
        var t, q, m, n, array, rx2, ry2;
        switch(face.toLowerCase()){
            // filled point
            case '.':
            case 'point':
                grid.visProp.linecap = 'round';
                grid.visProp.strokewidth = radiusX * grid.board.unitX + radiusY * grid.board.unitY;
                return [
                    [
                        x,
                        x,
                        NaN
                    ],
                    [
                        y,
                        y,
                        NaN
                    ]
                ];
            // bezierCircle
            case 'o':
            case 'circle':
                grid.visProp.linecap = 'square';
                grid.bezierDegree = 3;
                q = 4 * Math.tan(Math.PI / 8) / 3;
                return [
                    [
                        x + radiusX,
                        x + radiusX,
                        x + q * radiusX,
                        x,
                        x - q * radiusX,
                        x - radiusX,
                        x - radiusX,
                        x - radiusX,
                        x - q * radiusX,
                        x,
                        x + q * radiusX,
                        x + radiusX,
                        x + radiusX,
                        NaN
                    ],
                    [
                        y,
                        y + q * radiusY,
                        y + radiusY,
                        y + radiusY,
                        y + radiusY,
                        y + q * radiusY,
                        y,
                        y - q * radiusY,
                        y - radiusY,
                        y - radiusY,
                        y - radiusY,
                        y - q * radiusY,
                        y,
                        NaN
                    ]
                ];
            // polygon
            case 'regpol':
            case 'regularpolygon':
                grid.visProp.linecap = 'round';
                n = grid.evalVisProp('polygonvertices');
                array = [
                    [],
                    []
                ];
                // approximation of circle with variable n
                for(t = 0; t <= 2 * Math.PI; t += 2 * Math.PI / n){
                    array[0].push(x - radiusX * Math.sin(t));
                    array[1].push(y - radiusY * Math.cos(t));
                }
                array[0].push(NaN);
                array[1].push(NaN);
                return array;
            // square
            case '[]':
            case 'square':
                grid.visProp.linecap = 'square';
                return [
                    [
                        x - radiusX,
                        x + radiusX,
                        x + radiusX,
                        x - radiusX,
                        x - radiusX,
                        NaN
                    ],
                    [
                        y + radiusY,
                        y + radiusY,
                        y - radiusY,
                        y - radiusY,
                        y + radiusY,
                        NaN
                    ]
                ];
            // diamond
            case '<>':
            case 'diamond':
                grid.visProp.linecap = 'square';
                return [
                    [
                        x,
                        x + radiusX,
                        x,
                        x - radiusX,
                        x,
                        NaN
                    ],
                    [
                        y + radiusY,
                        y,
                        y - radiusY,
                        y,
                        y + radiusY,
                        NaN
                    ]
                ];
            // diamond2
            case '<<>>':
            case 'diamond2':
                grid.visProp.linecap = 'square';
                rx2 = radiusX * Math.sqrt(2);
                ry2 = radiusY * Math.sqrt(2);
                return [
                    [
                        x,
                        x + rx2,
                        x,
                        x - rx2,
                        x,
                        NaN
                    ],
                    [
                        y + ry2,
                        y,
                        y - ry2,
                        y,
                        y + ry2,
                        NaN
                    ]
                ];
            case 'x':
            case 'cross':
                return [
                    [
                        x - radiusX,
                        x + radiusX,
                        NaN,
                        x - radiusX,
                        x + radiusX,
                        NaN
                    ],
                    [
                        y + radiusY,
                        y - radiusY,
                        NaN,
                        y - radiusY,
                        y + radiusY,
                        NaN
                    ]
                ];
            case '+':
            case 'plus':
                return [
                    [
                        x - radiusX,
                        x + radiusX,
                        NaN,
                        x,
                        x,
                        NaN
                    ],
                    [
                        y,
                        y,
                        NaN,
                        y - radiusY,
                        y + radiusY,
                        NaN
                    ]
                ];
            case '-':
            case 'minus':
                return [
                    [
                        x - radiusX,
                        x + radiusX,
                        NaN
                    ],
                    [
                        y,
                        y,
                        NaN
                    ]
                ];
            case '|':
            case 'divide':
                return [
                    [
                        x,
                        x,
                        NaN
                    ],
                    [
                        y - radiusY,
                        y + radiusY,
                        NaN
                    ]
                ];
            case '^':
            case 'a':
            case 'A':
            case 'triangleup':
                return [
                    [
                        x - radiusX,
                        x,
                        x + radiusX,
                        NaN
                    ],
                    [
                        y - radiusY,
                        y,
                        y - radiusY,
                        NaN
                    ]
                ];
            case 'v':
            case 'triangledown':
                return [
                    [
                        x - radiusX,
                        x,
                        x + radiusX,
                        NaN
                    ],
                    [
                        y + radiusY,
                        y,
                        y + radiusY,
                        NaN
                    ]
                ];
            case '<':
            case 'triangleleft':
                return [
                    [
                        x + radiusX,
                        x,
                        x + radiusX,
                        NaN
                    ],
                    [
                        y + radiusY,
                        y,
                        y - radiusY,
                        NaN
                    ]
                ];
            case '>':
            case 'triangleright':
                return [
                    [
                        x - radiusX,
                        x,
                        x - radiusX,
                        NaN
                    ],
                    [
                        y + radiusY,
                        y,
                        y - radiusY,
                        NaN
                    ]
                ];
            case 'line':
                m = grid.evalVisProp('margin');
                return [
                    // [x, x, NaN, bbox[0] + (4 / grid.board.unitX), bbox[2] - (4 / grid.board.unitX), NaN],
                    [
                        x,
                        x,
                        NaN,
                        bbox[0] - m / grid.board.unitX,
                        bbox[2] + m / grid.board.unitX,
                        NaN
                    ],
                    [
                        bbox[1] + m / grid.board.unitY,
                        bbox[3] - m / grid.board.unitY,
                        NaN,
                        y,
                        y,
                        NaN
                    ]
                ];
            default:
                return [
                    [],
                    []
                ];
        }
    };
    // Themes
    attrGrid = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'grid');
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].mergeAttr(attrGrid, attrGrid.themes[attrGrid.theme], false);
    // Create majorGrid
    attrMajor = {};
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].mergeAttr(attrMajor, attrGrid, true, true);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].mergeAttr(attrMajor, attrGrid.major, true, true);
    majorGrid = board.create('curve', [
        [
            null
        ],
        [
            null
        ]
    ], attrMajor);
    majorGrid.elType = 'grid';
    majorGrid.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_GRID;
    // Create minorGrid
    attrMinor = {};
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].mergeAttr(attrMinor, attrGrid, true, true);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].mergeAttr(attrMinor, attrGrid.minor, true, true);
    if (attrMinor.id === attrMajor.id) {
        attrMinor.id = majorGrid.id + '_minor';
    }
    if (attrMinor.name === attrMajor.name) {
        attrMinor.name = majorGrid.name + '_minor';
    }
    minorGrid = board.create('curve', [
        [
            null
        ],
        [
            null
        ]
    ], attrMinor);
    minorGrid.elType = 'grid';
    minorGrid.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_GRID;
    majorGrid.minorGrid = minorGrid;
    minorGrid.majorGrid = majorGrid;
    majorGrid.hasPoint = function() {
        return false;
    };
    minorGrid.hasPoint = function() {
        return false;
    };
    majorGrid.inherits.push(minorGrid);
    majorGrid.updateDataArray = function() {
        var bbox = this.board.getBoundingBox(), startX, startY, x, y, m, dataArr, finite, delta, gridX = this.evalVisProp('gridx'), gridY = this.evalVisProp('gridy'), face = this.evalVisProp('face'), drawZero = this.evalVisProp('drawzero'), drawZeroOrigin = drawZero === true || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isObject(drawZero) && this.eval(drawZero.origin) === true, drawZeroX = drawZero === true || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isObject(drawZero) && this.eval(drawZero.x) === true, drawZeroY = drawZero === true || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isObject(drawZero) && this.eval(drawZero.y) === true, includeBoundaries = this.evalVisProp('includeboundaries'), forceSquare = this.evalVisProp('forcesquare');
        this.dataX = [];
        this.dataY = [];
        // set global majorStep
        majorStep = this.evalVisProp('majorstep');
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(majorStep)) {
            majorStep = [
                majorStep,
                majorStep
            ];
        }
        if (majorStep.length < 2) {
            majorStep = [
                majorStep[0],
                majorStep[0]
            ];
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(gridX)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deprecated("gridX", "majorStep");
            majorStep[0] = gridX;
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(gridY)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deprecated("gridY", "majorStep");
            majorStep[1] = gridY;
        }
        if (majorStep[0] === 'auto') {
            // majorStep[0] = 1; // parentAxes[0] may not be defined
            // Prevent too many grid lines if majorstep:'auto'
            delta = Math.pow(10, Math.floor(Math.log(50 / this.board.unitX) / Math.LN10));
            majorStep[0] = delta;
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parentAxes[0])) {
                majorStep[0] = parentAxes[0].ticks[0].getDistanceMajorTicks();
            }
        } else {
            // This allows the value to have unit px, abs, % or fr.
            majorStep[0] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].parseNumber(majorStep[0], Math.abs(bbox[1] - bbox[3]), 1 / this.board.unitX);
        }
        if (majorStep[1] === 'auto') {
            // majorStep[1] = 1; // parentAxes[1] may not be defined
            // Prevent too many grid lines if majorstep:'auto'
            delta = Math.pow(10, Math.floor(Math.log(50 / this.board.unitY) / Math.LN10));
            majorStep[1] = delta;
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parentAxes[1])) {
                majorStep[1] = parentAxes[1].ticks[0].getDistanceMajorTicks();
            }
        } else {
            // This allows the value to have unit px, abs, % or fr.
            majorStep[1] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].parseNumber(majorStep[1], Math.abs(bbox[0] - bbox[2]), 1 / this.board.unitY);
        }
        if (forceSquare === 'min' || forceSquare === true) {
            if (majorStep[0] * this.board.unitX <= majorStep[1] * this.board.unitY) {
                majorStep[1] = majorStep[0] / this.board.unitY * this.board.unitX;
            } else {
                majorStep[0] = majorStep[1] / this.board.unitX * this.board.unitY;
            }
        } else if (forceSquare === 'max') {
            if (majorStep[0] * this.board.unitX <= majorStep[1] * this.board.unitY) {
                majorStep[0] = majorStep[1] / this.board.unitX * this.board.unitY;
            } else {
                majorStep[1] = majorStep[0] / this.board.unitY * this.board.unitX;
            }
        }
        // Set global majorSize
        majorSize = this.evalVisProp('size');
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(majorSize)) {
            majorSize = [
                majorSize,
                majorSize
            ];
        }
        if (majorSize.length < 2) {
            majorSize = [
                majorSize[0],
                majorSize[0]
            ];
        }
        // Here comes a hack:
        // "majorsize" is filled by the attribute "size" which is usually considered
        // as pixel value. However, usually a number value for size is
        // considered to be in pixel, while parseNumber expects user coords.
        // Therefore, we have to add 'px'.
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(majorSize[0], true)) {
            majorSize[0] = majorSize[0] + "px";
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(majorSize[1], true)) {
            majorSize[1] = majorSize[1] + "px";
        }
        majorSize[0] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].parseNumber(majorSize[0], majorStep[0], 1 / this.board.unitX);
        majorSize[1] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].parseNumber(majorSize[1], majorStep[1], 1 / this.board.unitY);
        majorRadius[0] = majorSize[0] / 2;
        majorRadius[1] = majorSize[1] / 2;
        // calculate start position of curve
        startX = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].roundToStep(bbox[0], majorStep[0]);
        startY = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].roundToStep(bbox[1], majorStep[1]);
        // check if number of grid elements side by side is not too large
        finite = isFinite(startX) && isFinite(startY) && isFinite(bbox[2]) && isFinite(bbox[3]) && Math.abs(bbox[2]) < Math.abs(majorStep[0] * maxLines) && Math.abs(bbox[3]) < Math.abs(majorStep[1] * maxLines);
        // POI finite = false means that no grid is drawn. Should we change this?
        // Draw grid elements
        if (face.toLowerCase() === 'line') {
            m = majorGrid.evalVisProp('margin');
            for(y = startY; finite && y >= bbox[3]; y -= majorStep[1]){
                if (!drawZeroOrigin && Math.abs(y) < eps || !drawZeroY && Math.abs(y) < eps || !includeBoundaries && (y <= bbox[3] + majorRadius[1] || y >= bbox[1] - majorRadius[1])) {
                    continue;
                }
                dataArr = [
                    [
                        bbox[0] - m / majorGrid.board.unitX,
                        bbox[2] + m / majorGrid.board.unitX,
                        NaN
                    ],
                    [
                        y,
                        y,
                        NaN
                    ]
                ];
                // Push is drastically faster than concat
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataX, dataArr[0]);
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataY, dataArr[1]);
            }
            for(x = startX; finite && x <= bbox[2]; x += majorStep[0]){
                if (!drawZeroOrigin && Math.abs(x) < eps || !drawZeroX && Math.abs(x) < eps || !includeBoundaries && (x <= bbox[0] + majorRadius[0] || x >= bbox[2] - majorRadius[0])) {
                    continue;
                }
                dataArr = [
                    [
                        x,
                        x,
                        NaN
                    ],
                    [
                        bbox[1] + m / majorGrid.board.unitY,
                        bbox[3] - m / majorGrid.board.unitY,
                        NaN
                    ]
                ];
                // Push is drastically faster than concat
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataX, dataArr[0]);
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataY, dataArr[1]);
            }
        } else {
            for(y = startY; finite && y >= bbox[3]; y -= majorStep[1]){
                for(x = startX; finite && x <= bbox[2]; x += majorStep[0]){
                    if (!drawZeroOrigin && Math.abs(y) < eps && Math.abs(x) < eps || !drawZeroX && Math.abs(y) < eps && Math.abs(x) >= eps || !drawZeroY && Math.abs(x) < eps && Math.abs(y) >= eps || !includeBoundaries && (x <= bbox[0] + majorRadius[0] || x >= bbox[2] - majorRadius[0] || y <= bbox[3] + majorRadius[1] || y >= bbox[1] - majorRadius[1])) {
                        continue;
                    }
                    dataArr = createDataArrayForFace(face, majorGrid, x, y, majorRadius[0], majorRadius[1], bbox);
                    // Push is drastically faster than concat
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataX, dataArr[0]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataY, dataArr[1]);
                }
            }
        }
    };
    minorGrid.updateDataArray = function() {
        var bbox = this.board.getBoundingBox(), startX, startY, x, y, m, dataArr, finite, minorStep = [], minorRadius = [], XdisTo0, XdisFrom0, YdisTo0, YdisFrom0, dis0To, dis1To, dis2To, dis3To, dis0From, dis1From, dis2From, dis3From, minorElements = this.evalVisProp('minorelements'), minorSize = this.evalVisProp('size'), minorFace = this.evalVisProp('face'), minorDrawZero = this.evalVisProp('drawzero'), minorDrawZeroX = minorDrawZero === true || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isObject(minorDrawZero) && this.eval(minorDrawZero.x) === true, minorDrawZeroY = minorDrawZero === true || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isObject(minorDrawZero) && this.eval(minorDrawZero.y) === true, majorFace = this.majorGrid.evalVisProp('face'), majorDrawZero = this.majorGrid.evalVisProp('drawzero'), majorDrawZeroOrigin = majorDrawZero === true || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isObject(majorDrawZero) && this.eval(majorDrawZero.origin) === true, majorDrawZeroX = majorDrawZero === true || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isObject(majorDrawZero) && this.eval(majorDrawZero.x) === true, majorDrawZeroY = majorDrawZero === true || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isObject(majorDrawZero) && this.eval(majorDrawZero.y) === true, includeBoundaries = this.evalVisProp('includeboundaries');
        this.dataX = [];
        this.dataY = [];
        // set minorStep
        // minorElements can be 'auto' or a number (also a number like '20')
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(minorElements)) {
            minorElements = [
                minorElements,
                minorElements
            ];
        }
        if (minorElements.length < 2) {
            minorElements = [
                minorElements[0],
                minorElements[0]
            ];
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(minorElements[0], true)) {
            minorElements[0] = parseFloat(minorElements[0]);
        } else {
            minorElements[0] = 3; // parentAxes[0] may not be defined
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parentAxes[0])) {
                minorElements[0] = parentAxes[0].eval(parentAxes[0].getAttribute('ticks').minorticks);
            }
        }
        minorStep[0] = majorStep[0] / (minorElements[0] + 1);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(minorElements[1], true)) {
            minorElements[1] = parseFloat(minorElements[1]);
        } else {
            minorElements[1] = 3; // parentAxes[1] may not be defined
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parentAxes[1])) {
                minorElements[1] = parentAxes[1].eval(parentAxes[1].getAttribute('ticks').minorticks);
            }
        }
        minorStep[1] = majorStep[1] / (minorElements[1] + 1);
        // set global minorSize
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(minorSize)) {
            minorSize = [
                minorSize,
                minorSize
            ];
        }
        if (minorSize.length < 2) {
            minorSize = [
                minorSize[0],
                minorSize[0]
            ];
        }
        // minorRadius = [
        //     Type.parseNumber(minorSize[0], minorStep[0] * 0.5, 1 / this.board.unitX),
        //     Type.parseNumber(minorSize[0], minorStep[0] * 0.5, 1 / this.board.unitY)
        // ];
        // Here comes a hack:
        // "minorsize" is filled by the attribute "size" which is usually considered
        // as pixel value. However, usually a number value for size is
        // considered to be in pixel, while parseNumber expects user coords.
        // Therefore, we have to add 'px'.
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(minorSize[0], true)) {
            minorSize[0] = minorSize[0] + "px";
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(minorSize[1], true)) {
            minorSize[1] = minorSize[1] + "px";
        }
        minorSize[0] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].parseNumber(minorSize[0], minorStep[0], 1 / this.board.unitX);
        minorSize[1] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].parseNumber(minorSize[1], minorStep[1], 1 / this.board.unitY);
        minorRadius[0] = minorSize[0] * 0.5;
        minorRadius[1] = minorSize[1] * 0.5;
        // calculate start position of curve
        startX = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].roundToStep(bbox[0], minorStep[0]);
        startY = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].roundToStep(bbox[1], minorStep[1]);
        // check if number of grid elements side by side is not too large
        finite = isFinite(startX) && isFinite(startY) && isFinite(bbox[2]) && isFinite(bbox[3]) && Math.abs(bbox[2]) <= Math.abs(minorStep[0] * maxLines) && Math.abs(bbox[3]) < Math.abs(minorStep[1] * maxLines);
        // POI finite = false means that no grid is drawn. Should we change this?
        // draw grid elements
        if (minorFace.toLowerCase() !== 'line') {
            for(y = startY; finite && y >= bbox[3]; y -= minorStep[1]){
                for(x = startX; finite && x <= bbox[2]; x += minorStep[0]){
                    /* explanation:
                         |<___XdisTo0___><___________XdisFrom0___________>
                         |                .                .               .
                     ____|____            .                .           _________
                    |    |    |         ____              ____        |         |
                    |    |    |        |    |            |    |       |         |
                    |    |    |        |____|            |____|       |         |
                    |____|____|           | |              .          |_________|
                         |    |           . \              .              .
                         |  \             . minorRadius[0]   .              .
                         |   majorRadius[0] .                .              .
                         |                .                .              .
                         |<----------->   .                .              .
                         |    \           .                .              .
                         |     XdisTo0 - minorRadius[0] <= majorRadius[0] ? -> exclude
                         |                .                .              .
                         |                .  <--------------------------->
                         |                             \
                         |                              XdisFrom0 - minorRadius[0] <= majorRadius[0] ? -> exclude
                         |
                   -——---|————————-————---|----------------|---------------|-------->
                         |
                         |<______________________majorStep[0]_____________________>
                         |
                         |<__minorStep[0]____><__minorStep[0]_____><__minorStep[0]_____>
                         |
                         |
                    */ XdisTo0 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].roundToStep(Math.abs(x), majorStep[0]);
                    XdisTo0 = Math.abs(XdisTo0 - Math.abs(x));
                    XdisFrom0 = majorStep[0] - XdisTo0;
                    YdisTo0 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].roundToStep(Math.abs(y), majorStep[1]);
                    YdisTo0 = Math.abs(YdisTo0 - Math.abs(y));
                    YdisFrom0 = majorStep[1] - YdisTo0;
                    if (majorFace === 'line') {
                        // for majorFace 'line' do not draw minor grid elements on lines
                        if (XdisTo0 - minorRadius[0] - majorRadius[0] < eps || XdisFrom0 - minorRadius[0] - majorRadius[0] < eps || YdisTo0 - minorRadius[1] - majorRadius[1] < eps || YdisFrom0 - minorRadius[1] - majorRadius[1] < eps) {
                            continue;
                        }
                    } else {
                        if ((XdisTo0 - minorRadius[0] - majorRadius[0] < eps || XdisFrom0 - minorRadius[0] - majorRadius[0] < eps) && (YdisTo0 - minorRadius[1] - majorRadius[1] < eps || YdisFrom0 - minorRadius[1] - majorRadius[1] < eps)) {
                            // if major grid elements (on 0 or axes) are not existing, minor grid elements have to exist. Otherwise:
                            if ((majorDrawZeroOrigin || majorRadius[1] - Math.abs(y) + minorRadius[1] < eps || majorRadius[0] - Math.abs(x) + minorRadius[0] < eps) && (majorDrawZeroX || majorRadius[1] - Math.abs(y) + minorRadius[1] < eps || majorRadius[0] + Math.abs(x) - minorRadius[0] < eps) && (majorDrawZeroY || majorRadius[0] - Math.abs(x) + minorRadius[0] < eps || majorRadius[1] + Math.abs(y) - minorRadius[1] < eps)) {
                                continue;
                            }
                        }
                    }
                    if (!minorDrawZeroY && Math.abs(x) < eps || !minorDrawZeroX && Math.abs(y) < eps) {
                        continue;
                    }
                    /* explanation of condition below:

                          |         __dis2To___> _dis2From_      // dis2To bzw. dis2From >= majorRadius[0]
                          |      __/_          \/         _\__
                          |     |    |  []     >         |    |
                          |     |____|         >         |____|
                          |                    >
                          |                    >
                          |    x-minorSize[0]  > bbox[2]
                          0               .    >/
                       -——|————————-————.-.——.—>
                          |             . .  . >
                          |             . .  . >
                          |             . .  . > dis2From (<= majorRadius[0])
                          |             . .  .__/\____
                          |             . .  | >      |
                          |             . [] | > \/   |
                          |             .    | > /\   |
                          |             .    |_>______|
                          |             .    . >
                          |             .    . >
                          |             .    bbox[2]+dis2From-majorRadius[0]
                          |             .      >
                          |             .______>_
                          |             |      > |
                          |         []  |   \/ > |
                          |             |   /\ > |
                          |             |______>_|
                          |             .    \_/
                          |             .     dis2To (<= majorRadius[0])
                          |             .      >
                          |             .      >
                          |             bbox[2]-dis2To-majorRadius[0]
                     */ dis0To = Math.abs(bbox[0] % majorStep[0]);
                    dis1To = Math.abs(bbox[1] % majorStep[1]);
                    dis2To = Math.abs(bbox[2] % majorStep[0]);
                    dis3To = Math.abs(bbox[3] % majorStep[1]);
                    dis0From = majorStep[0] - dis0To;
                    dis1From = majorStep[1] - dis1To;
                    dis2From = majorStep[0] - dis2To;
                    dis3From = majorStep[1] - dis3To;
                    if (!includeBoundaries && (x - minorRadius[0] - bbox[0] - majorRadius[0] + dis0From < eps && dis0From - majorRadius[0] < eps || x - minorRadius[0] - bbox[0] - majorRadius[0] - dis0To < eps && dis0To - majorRadius[0] < eps || -x - minorRadius[0] + bbox[2] - majorRadius[0] + dis2From < eps && dis2From - majorRadius[0] < eps || -x - minorRadius[0] + bbox[2] - majorRadius[0] - dis2To < eps && dis2To - majorRadius[0] < eps || -y - minorRadius[1] + bbox[1] - majorRadius[1] + dis1From < eps && dis1From - majorRadius[1] < eps || -y - minorRadius[1] + bbox[1] - majorRadius[1] - dis1To < eps && dis1To - majorRadius[1] < eps || y - minorRadius[1] - bbox[3] - majorRadius[1] + dis3From < eps && dis3From - majorRadius[1] < eps || y - minorRadius[1] - bbox[3] - majorRadius[1] - dis3To < eps && dis3To - majorRadius[1] < eps || -y - minorRadius[1] + bbox[1] < eps || x - minorRadius[0] - bbox[0] < eps || y - minorRadius[1] - bbox[3] < eps || -x - minorRadius[0] + bbox[2] < eps)) {
                        continue;
                    }
                    dataArr = createDataArrayForFace(minorFace, minorGrid, x, y, minorRadius[0], minorRadius[1], bbox);
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataX, dataArr[0]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataY, dataArr[1]);
                }
            }
        } else {
            m = minorGrid.evalVisProp('margin');
            for(y = startY; finite && y >= bbox[3]; y -= minorStep[1]){
                YdisTo0 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].roundToStep(Math.abs(y), majorStep[1]);
                YdisTo0 = Math.abs(YdisTo0 - Math.abs(y));
                YdisFrom0 = majorStep[1] - YdisTo0;
                if (majorFace === 'line') {
                    // for majorFace 'line' do not draw minor grid elements on lines
                    if (YdisTo0 - minorRadius[1] - majorRadius[1] < eps || YdisFrom0 - minorRadius[1] - majorRadius[1] < eps) {
                        continue;
                    }
                } else {
                    if (YdisTo0 - minorRadius[1] - majorRadius[1] < eps || YdisFrom0 - minorRadius[1] - majorRadius[1] < eps) {
                        // if major grid elements (on 0 or axes) are not existing, minor grid elements have to exist. Otherwise:
                        if ((majorDrawZeroOrigin || majorRadius[1] - Math.abs(y) + minorRadius[1] < eps) && (majorDrawZeroX || majorRadius[1] - Math.abs(y) + minorRadius[1] < eps) && (majorDrawZeroY || majorRadius[1] + Math.abs(y) - minorRadius[1] < eps)) {
                            continue;
                        }
                    }
                }
                if (!minorDrawZeroX && Math.abs(y) < eps) {
                    continue;
                }
                dis0To = Math.abs(bbox[0] % majorStep[0]);
                dis1To = Math.abs(bbox[1] % majorStep[1]);
                dis2To = Math.abs(bbox[2] % majorStep[0]);
                dis3To = Math.abs(bbox[3] % majorStep[1]);
                dis0From = majorStep[0] - dis0To;
                dis1From = majorStep[1] - dis1To;
                dis2From = majorStep[0] - dis2To;
                dis3From = majorStep[1] - dis3To;
                if (!includeBoundaries && (-y - minorRadius[1] + bbox[1] - majorRadius[1] + dis1From < eps && dis1From - majorRadius[1] < eps || -y - minorRadius[1] + bbox[1] - majorRadius[1] - dis1To < eps && dis1To - majorRadius[1] < eps || y - minorRadius[1] - bbox[3] - majorRadius[1] + dis3From < eps && dis3From - majorRadius[1] < eps || y - minorRadius[1] - bbox[3] - majorRadius[1] - dis3To < eps && dis3To - majorRadius[1] < eps || -y - minorRadius[1] + bbox[1] < eps || y - minorRadius[1] - bbox[3] < eps)) {
                    continue;
                }
                dataArr = [
                    [
                        bbox[0] - m / minorGrid.board.unitX,
                        bbox[2] + m / minorGrid.board.unitX,
                        NaN
                    ],
                    [
                        y,
                        y,
                        NaN
                    ]
                ];
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataX, dataArr[0]);
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataY, dataArr[1]);
            }
            for(x = startX; finite && x <= bbox[2]; x += minorStep[0]){
                XdisTo0 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].roundToStep(Math.abs(x), majorStep[0]);
                XdisTo0 = Math.abs(XdisTo0 - Math.abs(x));
                XdisFrom0 = majorStep[0] - XdisTo0;
                if (majorFace === 'line') {
                    // for majorFace 'line' do not draw minor grid elements on lines
                    if (XdisTo0 - minorRadius[0] - majorRadius[0] < eps || XdisFrom0 - minorRadius[0] - majorRadius[0] < eps) {
                        continue;
                    }
                } else {
                    if (XdisTo0 - minorRadius[0] - majorRadius[0] < eps || XdisFrom0 - minorRadius[0] - majorRadius[0] < eps) {
                        // if major grid elements (on 0 or axes) are not existing, minor grid elements have to exist. Otherwise:
                        if ((majorDrawZeroOrigin || majorRadius[0] - Math.abs(x) + minorRadius[0] < eps) && (majorDrawZeroX || majorRadius[0] + Math.abs(x) - minorRadius[0] < eps) && (majorDrawZeroY || majorRadius[0] - Math.abs(x) + minorRadius[0] < eps)) {
                            continue;
                        }
                    }
                }
                if (!minorDrawZeroY && Math.abs(x) < eps) {
                    continue;
                }
                dis0To = Math.abs(bbox[0] % majorStep[0]);
                dis1To = Math.abs(bbox[1] % majorStep[1]);
                dis2To = Math.abs(bbox[2] % majorStep[0]);
                dis3To = Math.abs(bbox[3] % majorStep[1]);
                dis0From = majorStep[0] - dis0To;
                dis1From = majorStep[1] - dis1To;
                dis2From = majorStep[0] - dis2To;
                dis3From = majorStep[1] - dis3To;
                if (!includeBoundaries && (x - minorRadius[0] - bbox[0] - majorRadius[0] + dis0From < eps && dis0From - majorRadius[0] < eps || x - minorRadius[0] - bbox[0] - majorRadius[0] - dis0To < eps && dis0To - majorRadius[0] < eps || -x - minorRadius[0] + bbox[2] - majorRadius[0] + dis2From < eps && dis2From - majorRadius[0] < eps || -x - minorRadius[0] + bbox[2] - majorRadius[0] - dis2To < eps && dis2To - majorRadius[0] < eps || x - minorRadius[0] - bbox[0] < eps || -x - minorRadius[0] + bbox[2] < eps)) {
                    continue;
                }
                dataArr = [
                    [
                        x,
                        x,
                        NaN
                    ],
                    [
                        bbox[1] + m / minorGrid.board.unitY,
                        bbox[3] - m / minorGrid.board.unitY,
                        NaN
                    ]
                ];
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataX, dataArr[0]);
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataY, dataArr[1]);
            }
        }
    };
    board.grids.push(majorGrid);
    board.grids.push(minorGrid);
    minorGrid.dump = false;
    majorGrid.getParents = minorGrid.getParents = function() {
        return parentAxes.slice();
    };
    return majorGrid;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("grid", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createGrid);
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/slider.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software dual licensed under the GNU LGPL or MIT License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License and
    the MIT License along with JSXGraph. If not, see <https://www.gnu.org/licenses/>
    and <https://opensource.org/licenses/MIT/>.
 */ /*global JXG: true, define: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview The geometry object slider is defined in this file. Slider stores all
 * style and functional properties that are required to draw and use a slider on
 * a board.
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coords.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$point$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/point.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
/**
 * @class A slider can be used to choose values from a given range of numbers.
 * @pseudo
 * @name Slider
 * @augments Glider
 * @constructor
 * @type JXG.Point
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {Array_Array_Array} start,end,range The first two arrays give the start and the end where the slider is drawn
 * on the board. The third array gives the start and the end of the range the slider operates as the first resp. the
 * third component of the array. The second component of the third array gives its start value.
 *
 * @example
 * // Create a slider with values between 1 and 10, initial position is 5.
 * var s = board.create('slider', [[1, 2], [3, 2], [1, 5, 10]]);
 * </pre><div class="jxgbox" id="JXGcfb51cde-2603-4f18-9cc4-1afb452b374d" style="width: 200px; height: 200px;"></div>
 * <script type="text/javascript">
 *   (function () {
 *     var board = JXG.JSXGraph.initBoard('JXGcfb51cde-2603-4f18-9cc4-1afb452b374d', {boundingbox: [-1, 5, 5, -1], axis: true, showcopyright: false, shownavigation: false});
 *     var s = board.create('slider', [[1, 2], [3, 2], [1, 5, 10]]);
 *   })();
 * </script><pre>
 * @example
 * // Create a slider taking integer values between 1 and 5. Initial value is 3.
 * var s = board.create('slider', [[1, 3], [3, 1], [0, 3, 5]], {
 *     snapWidth: 1,
 *     minTicksDistance: 60,
 *     drawLabels: false
 * });
 * </pre><div class="jxgbox" id="JXGe17128e6-a25d-462a-9074-49460b0d66f4" style="width: 200px; height: 200px;"></div>
 * <script type="text/javascript">
 *   (function () {
 *     var board = JXG.JSXGraph.initBoard('JXGe17128e6-a25d-462a-9074-49460b0d66f4', {boundingbox: [-1, 5, 5, -1], axis: true, showcopyright: false, shownavigation: false});
 *     var s = board.create('slider', [[1, 3], [3, 1], [1, 3, 5]], {
 *       snapWidth: 1,
 *       minTicksDistance: 60,
 *       drawLabels: false
 *     });
 *   })();
 * </script><pre>
 * @example
 *     // Draggable slider
 *     var s1 = board.create('slider', [[-3, 1], [2, 1],[-10, 1, 10]], {
 *         visible: true,
 *         snapWidth: 2,
 *         point1: {fixed: false},
 *         point2: {fixed: false},
 *         baseline: {fixed: false, needsRegularUpdate: true}
 *     });
 *
 * </pre><div id="JXGbfc67817-2827-44a1-bc22-40bf312e76f8" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGbfc67817-2827-44a1-bc22-40bf312e76f8',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *         var s1 = board.create('slider', [[-3,1], [2,1],[-10,1,10]], {
 *             visible: true,
 *             snapWidth: 2,
 *             point1: {fixed: false},
 *             point2: {fixed: false},
 *             baseline: {fixed: false, needsRegularUpdate: true}
 *         });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 *     // Set the slider by clicking on the base line: attribute 'moveOnUp'
 *     var s1 = board.create('slider', [[-3,1], [2,1],[-10,1,10]], {
 *         snapWidth: 2,
 *         moveOnUp: true // default value
 *     });
 *
 * </pre><div id="JXGc0477c8a-b1a7-4111-992e-4ceb366fbccc" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGc0477c8a-b1a7-4111-992e-4ceb366fbccc',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *         var s1 = board.create('slider', [[-3,1], [2,1],[-10,1,10]], {
 *             snapWidth: 2,
 *             moveOnUp: true // default value
 *         });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * // Set colors
 * var sl = board.create('slider', [[-3, 1], [1, 1], [-10, 1, 10]], {
 *
 *   baseline: { strokeColor: 'blue'},
 *   highline: { strokeColor: 'red'},
 *   fillColor: 'yellow',
 *   label: {fontSize: 24, strokeColor: 'orange'},
 *   name: 'xyz', // Not shown, if suffixLabel is set
 *   suffixLabel: 'x = ',
 *   postLabel: ' u'
 *
 * });
 *
 * </pre><div id="JXGd96c9e2c-2c25-4131-b6cf-9dbb80819401" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGd96c9e2c-2c25-4131-b6cf-9dbb80819401',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var sl = board.create('slider', [[-3, 1], [1, 1], [-10, 1, 10]], {
 *
 *       baseline: { strokeColor: 'blue'},
 *       highline: { strokeColor: 'red'},
 *       fillColor: 'yellow',
 *       label: {fontSize: 24, strokeColor: 'orange'},
 *       name: 'xyz', // Not shown, if suffixLabel is set
 *       suffixLabel: 'x = ',
 *       postLabel: ' u'
 *
 *     });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * // Create a "frozen" slider
 * var sli = board.create('slider', [[-4, 4], [-1.5, 4], [-10, 1, 10]], {
 *     name:'a',
 *     frozen: true
 * });
 *
 * </pre><div id="JXG23afea4f-2e91-4006-a505-2895033cf1fc" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG23afea4f-2e91-4006-a505-2895033cf1fc',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var sli = board.create('slider', [[-4, 4], [-1.5, 4], [-10, 1, 10]], {
 *         name:'a',
 *         frozen: true
 *     });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * // Use MathJax for slider label (don't forget to load MathJax)
 * var s = board.create('slider', [[-3, 2], [2, 2], [-10, 1, 10]], {
 *     name: 'A^{(2)}',
 *     suffixLabel: '\\(A^{(2)} = ',
 *     unitLabel: ' \\;km/h ',
 *     postLabel: '\\)',
 *     label: {useMathJax: true}
 * });
 *
 * </pre><div id="JXG76e78c5f-3598-4d44-b43f-1d78fd15302c" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js" id="MathJax-script"></script>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG76e78c5f-3598-4d44-b43f-1d78fd15302c',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     // Use MathJax for slider label (don't forget to load MathJax)
 *     var s = board.create('slider', [[-3,2], [2,2],[-10,1,10]], {
 *         name: 'A^{(2)}',
 *         suffixLabel: '\\(A^{(2)} = ',
 *         unitLabel: ' \\;km/h ',
 *         postLabel: '\\)',
 *         label: {useMathJax: true}
 *     });
 *
 *     })();
 *
 * </script><pre>
 *
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createSlider = function(board, parents, attributes) {
    var pos0, pos1, smin, start, smax, diff, p1, p2, p3, l1, l2, ticks, ti, t, startx, starty, withText, withTicks, snapValues, snapValueDistance, snapWidth, sw, s, attr;
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "slider");
    withTicks = attr.withticks;
    withText = attr.withlabel;
    snapWidth = attr.snapwidth;
    snapValues = attr.snapvalues;
    snapValueDistance = attr.snapvaluedistance;
    // Start point
    p1 = board.create("point", parents[0], attr.point1);
    // End point
    p2 = board.create("point", parents[1], attr.point2);
    //g = board.create('group', [p1, p2]);
    // Base line
    l1 = board.create("segment", [
        p1,
        p2
    ], attr.baseline);
    // This is required for a correct projection of the glider onto the segment below
    l1.updateStdform();
    pos0 = p1.coords.usrCoords.slice(1);
    pos1 = p2.coords.usrCoords.slice(1);
    smin = parents[2][0];
    start = parents[2][1];
    smax = parents[2][2];
    diff = smax - smin;
    sw = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(snapWidth);
    s = sw === -1 ? start : Math.round((start - smin) / sw) * sw + smin;
    // Math.round(start / sw) * sw;
    startx = pos0[0] + (pos1[0] - pos0[0]) * (s - smin) / (smax - smin);
    starty = pos0[1] + (pos1[1] - pos0[1]) * (s - smin) / (smax - smin);
    // glider point
    // attr = Type.copyAttributes(attributes, board.options, "slider");
    // overwrite this in any case; the sliders label is a special text element, not the gliders label.
    // this will be set back to true after the text was created (and only if withlabel was true initially).
    attr.withlabel = false;
    // gliders set snapwidth=-1 by default (i.e. deactivate them)
    p3 = board.create("glider", [
        startx,
        starty,
        l1
    ], attr);
    p3.setAttribute({
        snapwidth: snapWidth,
        snapvalues: snapValues,
        snapvaluedistance: snapValueDistance
    });
    // Segment from start point to glider point: highline
    // attr = Type.copyAttributes(attributes, board.options, "slider", "highline");
    l2 = board.create("segment", [
        p1,
        p3
    ], attr.highline);
    /**
     * Returns the current slider value.
     * @memberOf Slider.prototype
     * @name Value
     * @function
     * @returns {Number}
     */ p3.Value = function() {
        var d = this._smax - this._smin, ev_sw = this.evalVisProp('snapwidth');
        return ev_sw === -1 ? this.position * d + this._smin : Math.round(this.position * d / ev_sw) * ev_sw + this._smin;
    };
    p3.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(p3.methodMap, {
        Value: "Value",
        setValue: "setValue",
        smax: "_smax",
        // Max: "_smax",
        smin: "_smin",
        // Min: "_smin",
        setMax: "setMax",
        setMin: "setMin",
        point1: "point1",
        point2: "point2",
        baseline: "baseline",
        highline: "highline",
        ticks: "ticks",
        label: "label"
    });
    /**
     * End value of the slider range.
     * @memberOf Slider.prototype
     * @name _smax
     * @type Number
     */ p3._smax = smax;
    /**
     * Start value of the slider range.
     * @memberOf Slider.prototype
     * @name _smin
     * @type Number
     */ p3._smin = smin;
    /**
     * Sets the maximum value of the slider.
     * @memberOf Slider.prototype
     * @function
     * @name setMax
     * @param {Number} val New maximum value
     * @returns {Object} this object
     */ p3.setMax = function(val) {
        this._smax = val;
        return this;
    };
    /**
     * Sets the value of the slider. This call must be followed
     * by a board update call.
     * @memberOf Slider.prototype
     * @name setValue
     * @function
     * @param {Number} val New value
     * @returns {Object} this object
     */ p3.setValue = function(val) {
        var d = this._smax - this._smin;
        if (Math.abs(d) > __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps) {
            this.position = (val - this._smin) / d;
        } else {
            this.position = 0.0; //this._smin;
        }
        this.position = Math.max(0.0, Math.min(1.0, this.position));
        return this;
    };
    /**
     * Sets the minimum value of the slider.
     * @memberOf Slider.prototype
     * @name setMin
     * @function
     * @param {Number} val New minimum value
     * @returns {Object} this object
     */ p3.setMin = function(val) {
        this._smin = val;
        return this;
    };
    if (withText) {
        // attr = Type.copyAttributes(attributes, board.options, 'slider', 'label');
        t = board.create('text', [
            function() {
                return (p2.X() - p1.X()) * 0.05 + p2.X();
            },
            function() {
                return (p2.Y() - p1.Y()) * 0.05 + p2.Y();
            },
            function() {
                var n, d = p3.evalVisProp('digits'), sl = p3.evalVisProp('suffixlabel'), ul = p3.evalVisProp('unitlabel'), pl = p3.evalVisProp('postlabel');
                if (d === 2 && p3.evalVisProp('precision') !== 2) {
                    // Backwards compatibility
                    d = p3.evalVisProp('precision');
                }
                if (sl !== null) {
                    n = sl;
                } else if (p3.name && p3.name !== "") {
                    n = p3.name + " = ";
                } else {
                    n = "";
                }
                if (p3.useLocale()) {
                    n += p3.formatNumberLocale(p3.Value(), d);
                } else {
                    n += __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].toFixed(p3.Value(), d);
                }
                if (ul !== null) {
                    n += ul;
                }
                if (pl !== null) {
                    n += pl;
                }
                return n;
            }
        ], attr.label);
        /**
         * The text element to the right of the slider, indicating its current value.
         * @memberOf Slider.prototype
         * @name label
         * @type JXG.Text
         */ p3.label = t;
        // reset the withlabel attribute
        p3.visProp.withlabel = true;
        p3.hasLabel = true;
    }
    /**
     * Start point of the base line.
     * @memberOf Slider.prototype
     * @name point1
     * @type JXG.Point
     */ p3.point1 = p1;
    /**
     * End point of the base line.
     * @memberOf Slider.prototype
     * @name point2
     * @type JXG.Point
     */ p3.point2 = p2;
    /**
     * The baseline the glider is bound to.
     * @memberOf Slider.prototype
     * @name baseline
     * @type JXG.Line
     */ p3.baseline = l1;
    /**
     * A line on top of the baseline, indicating the slider's progress.
     * @memberOf Slider.prototype
     * @name highline
     * @type JXG.Line
     */ p3.highline = l2;
    if (withTicks) {
        // Function to generate correct label texts
        // attr = Type.copyAttributes(attributes, board.options, "slider", "ticks");
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(attr.generatelabeltext)) {
            attr.ticks.generateLabelText = function(tick, zero, value) {
                var labelText, dFull = p3.point1.Dist(p3.point2), smin = p3._smin, smax = p3._smax, val = this.getDistanceFromZero(zero, tick) * (smax - smin) / dFull + smin;
                if (dFull < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps || Math.abs(val) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps) {
                    // Point is zero
                    labelText = "0";
                } else {
                    labelText = this.formatLabelText(val);
                }
                return labelText;
            };
        }
        ticks = 2;
        ti = board.create("ticks", [
            p3.baseline,
            p3.point1.Dist(p1) / ticks,
            function(tick) {
                var dFull = p3.point1.Dist(p3.point2), d = p3.point1.coords.distance(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, tick);
                if (dFull < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps) {
                    return 0;
                }
                return d / dFull * diff + smin;
            }
        ], attr.ticks);
        /**
         * Ticks give a rough indication about the slider's current value.
         * @memberOf Slider.prototype
         * @name ticks
         * @type JXG.Ticks
         */ p3.ticks = ti;
    }
    // override the point's remove method to ensure the removal of all elements
    p3.remove = function() {
        if (withText) {
            board.removeObject(t);
        }
        board.removeObject(l2);
        board.removeObject(l1);
        board.removeObject(p2);
        board.removeObject(p1);
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$point$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].prototype.remove.call(p3);
    };
    p1.dump = false;
    p2.dump = false;
    l1.dump = false;
    l2.dump = false;
    if (withText) {
        t.dump = false;
    }
    // p3.type = Const.OBJECT_TYPE_SLIDER; // No! type has to be Const.OBJECT_TYPE_GLIDER
    p3.elType = "slider";
    p3.parents = parents;
    p3.subs = {
        point1: p1,
        point2: p2,
        baseLine: l1,
        highLine: l2
    };
    p3.inherits.push(p1, p2, l1, l2);
    // Remove inherits to avoid circular inherits.
    l1.inherits = [];
    l2.inherits = [];
    if (withTicks) {
        ti.dump = false;
        p3.subs.ticks = ti;
        p3.inherits.push(ti);
    }
    p3.getParents = function() {
        return [
            this.point1.coords.usrCoords.slice(1),
            this.point2.coords.usrCoords.slice(1),
            [
                this._smin,
                this.position * (this._smax - this._smin) + this._smin,
                this._smax
            ]
        ];
    };
    p3.baseline.on("up", function(evt) {
        var pos, c;
        if (p3.evalVisProp('moveonup') && !p3.evalVisProp('fixed')) {
            pos = l1.board.getMousePosition(evt, 0);
            c = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, pos, this.board);
            p3.moveTo([
                c.usrCoords[1],
                c.usrCoords[2]
            ]);
            p3.triggerEventHandlers([
                'drag'
            ], [
                evt
            ]);
        }
    });
    // This is necessary to show baseline, highline and ticks
    // when opening the board in case the visible attributes are set
    // to 'inherit'.
    p3.prepareUpdate().update();
    if (!board.isSuspendedUpdate) {
        p3.updateVisibility().updateRenderer();
        p3.baseline.updateVisibility().updateRenderer();
        p3.highline.updateVisibility().updateRenderer();
        if (withTicks) {
            p3.ticks.updateVisibility().updateRenderer();
        }
    }
    return p3;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("slider", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createSlider); // export default {
 //     createSlider: JXG.createSlider
 // };
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/measure.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software dual licensed under the GNU LGPL or MIT License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License and
    the MIT License along with JSXGraph. If not, see <https://www.gnu.org/licenses/>
    and <https://opensource.org/licenses/MIT/>.
 */ /*global JXG: true, define: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview Geometry objects for measurements are defined in this file. This file stores all
 * style and functional properties that are required to use a tape measure on
 * a board.
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/element.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$parser$2f$prefix$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/parser/prefix.js [app-ssr] (ecmascript)");
;
;
;
;
/**
 * @class A tape measure can be used to measure distances between points.
 * <p>
 * The two defining points of the tape measure (which is a segment) do not inherit by default the attribute "visible" from
 * the segment. Otherwise the tape meassure would be inaccessible if the two points coincide and the segment is hidden.
 *
 * @pseudo
 * @name Tapemeasure
 * @augments Segment
 * @constructor
 * @type JXG.Segment
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {Array_Array} start,end, The two arrays give the initial position where the tape measure
 * is drawn on the board.
 * @example
 * // Create a tape measure
 * var p1 = board.create('point', [0,0]);
 * var p2 = board.create('point', [1,1]);
 * var p3 = board.create('point', [3,1]);
 * var tape = board.create('tapemeasure', [[1, 2], [4, 2]], {name:'dist'});
 * </pre><div class="jxgbox" id="JXG6d9a2cda-22fe-4cd1-9d94-34283b1bdc01" style="width: 200px; height: 200px;"></div>
 * <script type="text/javascript">
 *   (function () {
 *     var board = JXG.JSXGraph.initBoard('JXG6d9a2cda-22fe-4cd1-9d94-34283b1bdc01', {boundingbox: [-1, 5, 5, -1], axis: true, showcopyright: false, shownavigation: false});
 *     var p1 = board.create('point', [0,0]);
 *     var p2 = board.create('point', [1,1]);
 *     var p3 = board.create('point', [3,1]);
 *     var tape = board.create('tapemeasure', [[1, 2], [4, 2]], {name:'dist'} );
 *   })();
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createTapemeasure = function(board, parents, attributes) {
    var pos0, pos1, attr, withTicks, withText, digits, li, p1, p2, n, ti;
    pos0 = parents[0];
    pos1 = parents[1];
    // start point
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "tapemeasure", "point1");
    p1 = board.create("point", pos0, attr);
    // end point
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "tapemeasure", "point2");
    p2 = board.create("point", pos1, attr);
    p1.setAttribute({
        ignoredSnapToPoints: [
            p2.id
        ]
    });
    p2.setAttribute({
        ignoredSnapToPoints: [
            p1.id
        ]
    });
    // tape measure line
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "tapemeasure");
    withTicks = attr.withticks;
    withText = attr.withlabel;
    digits = attr.digits;
    if (digits === 2 && attr.precision !== 2) {
        // Backward compatibility
        digits = attr.precision;
    }
    // Below, we will replace the label by the measurement function.
    if (withText) {
        attr.withlabel = true;
    }
    li = board.create("segment", [
        p1,
        p2
    ], attr);
    // p1, p2 are already added to li.inherits
    if (withText) {
        if (attributes.name && attributes.name !== "") {
            n = attributes.name + " = ";
        } else {
            n = "";
        }
        li.label.setText(function() {
            var digits = li.label.evalVisProp('digits');
            if (li.label.useLocale()) {
                return n + li.label.formatNumberLocale(p1.Dist(p2), digits);
            }
            return n + __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].toFixed(p1.Dist(p2), digits);
        });
    }
    if (withTicks) {
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "tapemeasure", "ticks");
        //ticks  = 2;
        ti = board.create("ticks", [
            li,
            0.1
        ], attr);
        li.inherits.push(ti);
    }
    // override the segments's remove method to ensure the removal of all elements
    /** @ignore */ li.remove = function() {
        if (withTicks) {
            li.removeTicks(ti);
        }
        board.removeObject(p2);
        board.removeObject(p1);
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].prototype.remove.call(this);
    };
    /**
     * Returns the length of the tape measure.
     * @name Value
     * @memberOf Tapemeasure.prototype
     * @function
     * @returns {Number} length of tape measure.
     */ li.Value = function() {
        return p1.Dist(p2);
    };
    p1.dump = false;
    p2.dump = false;
    li.elType = "tapemeasure";
    li.getParents = function() {
        return [
            [
                p1.X(),
                p1.Y()
            ],
            [
                p2.X(),
                p2.Y()
            ]
        ];
    };
    li.subs = {
        point1: p1,
        point2: p2
    };
    if (withTicks) {
        ti.dump = false;
    }
    li.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(li.methodMap, {
        Value: "Value"
    });
    li.prepareUpdate().update();
    if (!board.isSuspendedUpdate) {
        li.updateVisibility().updateRenderer();
        // The point updates are necessary in case of snapToGrid==true
        li.point1.updateVisibility().updateRenderer();
        li.point2.updateVisibility().updateRenderer();
    }
    return li;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("tapemeasure", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createTapemeasure);
/**
 * @class Display measurements of geometric elements and the arithmetic operations of measurements.
 * Under the hood this is a text element which has a method Value. The text to be displayed
 * is the result of the evaluation of a prefix expression, see {@link JXG.PrefixParser}.
 * <p>
 * The purpose of this element is to display values of measurements of geometric objects, like the radius of a circle,
 * as well as expressions consisting of measurements.
 *
 * @pseudo
 * @name Measurement
 * @augments Text
 * @constructor
 * @type JXG.Text
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {Point|Array_Point|Array_Array} x,y,expression
 * Here, expression is a prefix expression, see {@link JXG.PrefixParser}.
 * @example
 * var p1 = board.create('point', [1, 1]);
 * var p2 = board.create('point', [1, 3]);
 * var ci1 = board.create('circle', [p1, p2]);
 *
 * var m1 = board.create('measurement', [1, -2, ['Area', ci1]], {
 *     visible: true,
 *     prefix: 'area: ',
 *     baseUnit: 'cm'
 * });
 *
 * var m2 = board.create('measurement', [1, -4, ['Radius', ci1]], {
 *     prefix: 'radius: ',
 *     baseUnit: 'cm'
 * });
 *
 * </pre><div id="JXG6359237a-79bc-4689-92fc-38d3ebeb769d" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG6359237a-79bc-4689-92fc-38d3ebeb769d',
 *             {boundingbox: [-5, 5, 5, -5], axis: true, showcopyright: false, shownavigation: false});
 *     var p1 = board.create('point', [1, 1]);
 *     var p2 = board.create('point', [1, 3]);
 *     var ci1 = board.create('circle', [p1, p2]);
 *
 *     var m1 = board.create('measurement', [1, -2, ['Area', ci1]], {
 *         visible: true,
 *         prefix: 'area: ',
 *         baseUnit: 'cm'
 *     });
 *
 *     var m2 = board.create('measurement', [1, -4, ['Radius', ci1]], {
 *         prefix: 'radius: ',
 *         baseUnit: 'cm'
 *     });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * var p1 = board.create('point', [1, 1]);
 * var p2 = board.create('point', [1, 3]);
 * var ci1 = board.create('circle', [p1, p2]);
 * var seg = board.create('segment', [[-2,-3], [-2, 3]], { firstArrow: true, lastArrow: true});
 * var sli = board.create('slider', [[-4, 4], [-1.5, 4], [-10, 1, 10]], {name:'a'});
 *
 * var m1 = board.create('measurement', [-6, -2, ['Radius', ci1]], {
 *     prefix: 'm1: ',
 *     baseUnit: 'cm'
 * });
 *
 * var m2 = board.create('measurement', [-6, -4, ['L', seg]], {
 *     prefix: 'm2: ',
 *     baseUnit: 'cm'
 * });
 *
 * var m3 = board.create('measurement', [-6, -6, ['V', sli]], {
 *     prefix: 'm3: ',
 *     baseUnit: 'cm',
 *     dim: 1
 * });
 *
 * var m4 = board.create('measurement', [2, -6,
 *         ['+', ['V', m1], ['V', m2], ['V', m3]]
 *     ], {
 *     prefix: 'm4: ',
 *     baseUnit: 'cm'
 * });
 *
 * </pre><div id="JXG49903663-6450-401e-b0d9-f025a6677d4a" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG49903663-6450-401e-b0d9-f025a6677d4a',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var p1 = board.create('point', [1, 1]);
 *     var p2 = board.create('point', [1, 3]);
 *     var ci1 = board.create('circle', [p1, p2]);
 *     var seg = board.create('segment', [[-2,-3], [-2, 3]], { firstArrow: true, lastArrow: true});
 *     var sli = board.create('slider', [[-4, 4], [-1.5, 4], [-10, 1, 10]], {name:'a'});
 *
 * var m1 = board.create('measurement', [-6, -2, ['Radius', ci1]], {
 *     prefix: 'm1: ',
 *     baseUnit: 'cm'
 * });
 *
 * var m2 = board.create('measurement', [-6, -4, ['L', seg]], {
 *     prefix: 'm2: ',
 *     baseUnit: 'cm'
 * });
 *
 * var m3 = board.create('measurement', [-6, -6, ['V', sli]], {
 *     prefix: 'm3: ',
 *     baseUnit: 'cm',
 *     dim: 1
 * });
 *
 * var m4 = board.create('measurement', [2, -6,
 *         ['+', ['V', m1], ['V', m2], ['V', m3]]
 *     ], {
 *     prefix: 'm4: ',
 *     baseUnit: 'cm'
 * });
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMeasurement = function(board, parents, attributes) {
    var el, attr, x, y, term, i;
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "measurement");
    x = parents[0];
    y = parents[1];
    term = parents[2];
    el = board.create("text", [
        x,
        y,
        ''
    ], attr);
    el.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_MEASUREMENT;
    el.elType = 'measurement';
    el.Value = function() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$parser$2f$prefix$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].parse(term, 'execute');
    };
    el.Dimension = function() {
        var d = el.evalVisProp('dim');
        if (d !== null) {
            return d;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$parser$2f$prefix$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dimension(term);
    };
    el.Unit = function(dimension) {
        var unit = '', units = el.evalVisProp('units'), dim = dimension, dims = {}, i;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(dim)) {
            dim = el.Dimension();
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(dimension)) {
            for(i = 0; i < dimension.length; i++){
                dims['dim' + dimension[i]] = el.Unit(dimension[i]);
            }
            return dims;
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isObject(units) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(units[dim]) && units[dim] !== false) {
            unit = el.eval(units[dim]);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isObject(units) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(units['dim' + dim]) && units['dim' + dim] !== false) {
            // In some cases, object keys must not be numbers. This allows key 'dim1' instead of '1'.
            unit = el.eval(units['dim' + dim]);
        } else {
            unit = el.evalVisProp('baseunit');
            if (dim === 0) {
                unit = '';
            } else if (dim > 1 && unit !== '') {
                unit = unit + '^{' + dim + '}';
            }
        }
        return unit;
    };
    el.getTerm = function() {
        return term;
    };
    el.getMethod = function() {
        var method = term[0];
        if (method === "V") {
            method = "Value";
        }
        return method;
    };
    el.toPrefix = function() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$parser$2f$prefix$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].toPrefix(term);
    };
    el.getParents = function() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$parser$2f$prefix$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].getParents(term);
    };
    el.addParents(el.getParents());
    for(i = 0; i < el.parents.length; i++){
        board.select(el.parents[i]).addChild(el);
    }
    /**
     * @class
     * @ignore
     */ el.setText(function() {
        var prefix = '', suffix = '', dim = el.Dimension(), digits = el.evalVisProp('digits'), unit = el.Unit(), val = el.Value(), i;
        if (el.evalVisProp('showprefix')) {
            prefix = el.evalVisProp('prefix');
        }
        if (el.evalVisProp('showsuffix')) {
            suffix = el.evalVisProp('suffix');
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(val)) {
            if (digits === 'none') {
            // do nothing
            } else if (digits === 'auto') {
                if (el.useLocale()) {
                    val = el.formatNumberLocale(val);
                } else {
                    val = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].autoDigits(val);
                }
            } else {
                if (el.useLocale()) {
                    val = el.formatNumberLocale(val, digits);
                } else {
                    val = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].toFixed(val, digits);
                }
            }
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(val)) {
            for(i = 0; i < val.length; i++){
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(val[i])) {
                    continue;
                }
                if (digits === 'none') {
                // do nothing
                } else if (digits === 'auto') {
                    if (el.useLocale()) {
                        val[i] = el.formatNumberLocale(val[i]);
                    } else {
                        val[i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].autoDigits(val[i]);
                    }
                } else {
                    if (el.useLocale()) {
                        val[i] = el.formatNumberLocale(val[i], digits);
                    } else {
                        val[i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].toFixed(val[i], digits);
                    }
                }
            }
        }
        if (dim === 'coords' && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(val)) {
            if (val.length === 2) {
                val.unshift(undefined);
            }
            val = el.visProp.formatcoords(el, val[1], val[2], val[0]);
        }
        if (dim === 'direction' && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(val)) {
            val = el.visProp.formatdirection(el, val[0], val[1]);
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(dim)) {
            return prefix + val + suffix;
        }
        if (isNaN(dim)) {
            return prefix + 'NaN' + suffix;
        }
        return prefix + val + unit + suffix;
    });
    el.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(el.methodMap, {
        Value: "Value",
        Dimension: "Dimension",
        Unit: "Unit",
        getTerm: "getTerm",
        Term: "getTerm",
        getMethod: "getMethod",
        Method: "getMethod",
        getParents: "getParents",
        Parents: "getParents"
    });
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("measurement", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMeasurement);
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/comb.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2018-2025
        Alfred Wassermann,
        Tigran Saluev

    This file is part of JSXGraph.

    JSXGraph is free software dual licensed under the GNU LGPL or MIT License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License and
    the MIT License along with JSXGraph. If not, see <https://www.gnu.org/licenses/>
    and <https://opensource.org/licenses/MIT/>.
 */ /*global JXG: true, define: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview In this file the Comb element is defined.
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
;
;
/**
 * @class A marker to display domains of inequalities.
 * The comb element is defined by two points.
 * @pseudo
 * @name Comb
 * @augments JXG.Curve
 * @constructor
 * @type JXG.Curve
 * @throws {Error} If the element cannot be constructed with the given parent
 *  objects an exception is thrown.
 * Parameter options:
 * @param {JXG.Point,array,function_JXG.Point,array,function} point1,point2 Parent elements
 * can be two elements either of type {@link JXG.Point} or array of
 * numbers describing the coordinates of a point. In the latter case the point
 * will be constructed automatically as a fixed invisible point.
 * It is possible to provide a function returning an array or a point,
 * instead of providing an array or a point.
 * @example
 * // Create a simple horizontal comb with invisible endpoints
 * var c = board.create('comb', [[1, 0], [3, 0]]);
 *
 * </pre><div class="jxgbox" id="JXG951ccb6a-52bc-4dc2-80e9-43db064f0f1b" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXG951ccb6a-52bc-4dc2-80e9-43db064f0f1b', {boundingbox: [-5, 5, 5, -5], axis: true, showcopyright: false, shownavigation: false}),
 *     c = board.create('comb', [[1, 0], [3, 0]]);
 * })();
 * </script><pre>
 *
 * @example
 * var p1 = board.create('glider', [-3, 0, board.defaultAxes.x]);
 * var p2 = board.create('glider', [-1, 0, board.defaultAxes.x]);
 * var c1 = board.create('comb', [p1, p2], {width: 0.2, frequency: 0.1, angle: Math.PI / 4});
 *
 * </pre><div id="JXG04186fd2-6340-11e8-9fb9-901b0e1b8723" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG04186fd2-6340-11e8-9fb9-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var p1 = board.create('glider', [-3, 0, board.defaultAxes.x]);
 *     var p2 = board.create('glider', [-1, 0, board.defaultAxes.x]);
 *     var c1 = board.create('comb', [p1, p2], {width: 0.2, frequency: 0.1, angle: Math.PI / 4});
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * var s = board.create('slider', [[1,3], [4,3], [0.1, 0.3, 0.8]]);
 * var p1 = board.create('glider', [-3, 0, board.defaultAxes.x]);
 * var p2 = board.create('glider', [-1, 0, board.defaultAxes.x]);
 * var c1 = board.create('comb', [p1, p2], {
 *     width: function(){ return 4*s.Value(); },
 *     reverse: function(){ return (s.Value()<0.5) ? false : true; },
 *     frequency: function(){ return s.Value(); },
 *     angle: function(){ return s.Value() * Math.PI / 2; },
 *     curve: {
 *         strokeColor: 'red'
 *     }
 * });
 *
 * </pre><div id="JXG6eb1bcd1-407e-4f13-8f0c-45ef39a0cfb3" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG6eb1bcd1-407e-4f13-8f0c-45ef39a0cfb3',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var s = board.create('slider', [[1,3], [4,3], [0.1, 0.3, 0.8]]);
 *     var p1 = board.create('glider', [-3, 0, board.defaultAxes.x]);
 *     var p2 = board.create('glider', [-1, 0, board.defaultAxes.x]);
 *     var c1 = board.create('comb', [p1, p2], {
 *         width: function(){ return 4*s.Value(); },
 *         reverse: function(){ return (s.Value()<0.5) ? false : true; },
 *         frequency: function(){ return s.Value(); },
 *         angle: function(){ return s.Value() * Math.PI / 2; },
 *         curve: {
 *             strokeColor: 'red'
 *         }
 *     });
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createComb = function(board, parents, attributes) {
    var p1, p2, c, attr, parent_types;
    //ds, angle, width, p;
    if (parents.length === 2) {
        // point 1 given by coordinates
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[0]) && parents[0].length > 1) {
            attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "comb", "point1");
            p1 = board.create("point", parents[0], attr);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(parents[0]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[0])) {
            p1 = board.select(parents[0]);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[0]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[0]())) {
            p1 = parents[0]();
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[0]) && parents[0]().length && parents[0]().length >= 2) {
            attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "comb", "point1");
            p1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPoint(board, parents[0](), attr);
        } else {
            throw new Error("JSXGraph: Can't create comb with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [point,point], [[x1,y1],[x2,y2]]");
        }
        // point 2 given by coordinates
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[1]) && parents[1].length > 1) {
            attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "comb", "point2");
            p2 = board.create("point", parents[1], attr);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(parents[1]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[1])) {
            p2 = board.select(parents[1]);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[1]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[1]())) {
            p2 = parents[1]();
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[1]) && parents[1]().length && parents[1]().length >= 2) {
            attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "comb", "point2");
            p2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPoint(board, parents[1](), attr);
        } else {
            throw new Error("JSXGraph: Can't create comb with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [point,point], [[x1,y1],[x2,y2]]");
        }
    } else {
        parent_types = parents.map(function(parent) {
            return "'" + typeof parent + "'";
        });
        throw new Error("JSXGraph: Can't create comb with parent types " + parent_types.join(", ") + "." + "\nPossible parent types: [point,point], [[x1,y1],[x2,y2]]");
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'comb');
    // Type.merge(attr, Type.copyAttributes(attributes, board.options, 'comb', 'curve'));
    c = board.create('curve', [
        [
            0
        ],
        [
            0
        ]
    ], attr);
    /**
     * @class
     * @ignore
     */ c.updateDataArray = function() {
        var s = 0, max_s = p1.Dist(p2), cs, sn, dx, dy, x, y, f, p1_inner = p1, p2_inner = p2, ds, angle, width;
        ds = c.evalVisProp('frequency');
        angle = -c.evalVisProp('angle');
        width = c.evalVisProp('width');
        if (c.evalVisProp('reverse')) {
            p1_inner = p2;
            p2_inner = p1;
            angle = -angle;
        }
        cs = Math.cos(angle);
        sn = Math.sin(angle);
        dx = (p2_inner.X() - p1_inner.X()) / max_s;
        dy = (p2_inner.Y() - p1_inner.Y()) / max_s;
        // But instead of lifting by sin(angle), we want lifting by width.
        cs *= width / Math.abs(sn);
        sn *= width / Math.abs(sn);
        this.dataX = [];
        this.dataY = [];
        // TODO Handle infinite bounds?
        while(s < max_s){
            x = p1_inner.X() + dx * s;
            y = p1_inner.Y() + dy * s;
            // We may need to cut the last piece of a comb.
            f = Math.min(cs, max_s - s) / Math.abs(cs);
            sn *= f;
            cs *= f;
            this.dataX.push(x);
            this.dataY.push(y);
            this.dataX.push(x + dx * cs + dy * sn);
            this.dataY.push(y - dx * sn + dy * cs);
            this.dataX.push(NaN); // Force a jump
            this.dataY.push(NaN);
            s += ds;
        }
    };
    return c;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("comb", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createComb); // export default {
 //     createComb: JXG.createComb
 // };
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/slopetriangle.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software dual licensed under the GNU LGPL or MIT License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License and
    the MIT License along with JSXGraph. If not, see <https://www.gnu.org/licenses/>
    and <https://opensource.org/licenses/MIT/>.
 */ /*global JXG: true, define: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview Example file for a triangle implemented as a extension to JSXGraph.
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$polygon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/polygon.js [app-ssr] (ecmascript)");
;
;
;
;
var priv = {
    removeSlopeTriangle: function() {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$polygon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].prototype.remove.call(this);
        this.board.removeObject(this.toppoint);
        this.board.removeObject(this.glider);
        this.board.removeObject(this.baseline);
        this.board.removeObject(this.basepoint);
        this.board.removeObject(this.label);
        if (this._isPrivateTangent) {
            this.board.removeObject(this.tangent);
        }
    },
    Value: function() {
        return this.tangent.getSlope();
    },
    Direction: function() {
        return this.tangent.Direction();
    }
};
/**
 * @class Slope triangle to visualize the slope of a tangent to a curve, circle or line.
 * @pseudo
 * @name Slopetriangle
 * @augments JXG.Line
 * @constructor
 * @type JXG.Polygon
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * Parameter options:
 * @param {JXG.Line} t A tangent based on a glider on some object, e.g. curve, circle, line or turtle.
 * @param {JXG.Line_JXG.Point} li, p A line and a point on that line.
 *  The user has to take care that the point is a member of the line.
 * @example
 * // Create a slopetriangle on a tangent
 * var f = board.create('plot', ['sin(x)']),
 *     g = board.create('glider', [1, 2, f]),
 *     t = board.create('tangent', [g]),
 *
 *     st = board.create('slopetriangle', [t]);
 *
 * </pre><div class="jxgbox" id="JXG951ccb6a-52bc-4dc2-80e9-43db064f0f1b" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXG951ccb6a-52bc-4dc2-80e9-43db064f0f1b', {boundingbox: [-5, 5, 5, -5], axis: true, showcopyright: false, shownavigation: false}),
 *     f = board.create('plot', ['sin(x)']),
 *     g = board.create('glider', [1, 2, f]),
 *     t = board.create('tangent', [g]),
 *
 *     st = board.create('slopetriangle', [t]);
 * })();
 * </script><pre>
 *
 * @example
 * // Create a on a line and a point on that line
 * var p1 = board.create('point', [-2, 3]),
 *     p2 = board.create('point', [2, -3]),
 *     li = board.create('line', [p1, p2]),
 *     p = board.create('glider', [0, 0, li]),
 *
 *     st = board.create('slopetriangle', [li, p]);
 *
 * </pre><div class="jxgbox" id="JXGb52f451c-22cf-4677-852a-0bb9d764ee95" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXGb52f451c-22cf-4677-852a-0bb9d764ee95', {boundingbox: [-5, 5, 5, -5], axis: true, showcopyright: false, shownavigation: false}),
 *     p1 = board.create('point', [-2, 3]),
 *     p2 = board.create('point', [2, -3]),
 *     li = board.create('line', [p1, p2]),
 *     p = board.create('glider', [0, 0, li]),
 *
 *     st = board.create('slopetriangle', [li, p]);
 * })();
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createSlopeTriangle = function(board, parents, attributes) {
    var el, tangent, tglide, glider, toppoint, baseline, basepoint, label, attr, isPrivateTangent = false;
    if (parents.length === 1 && parents[0].type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_TANGENT) {
        tangent = parents[0];
        tglide = tangent.glider;
    } else if (parents.length === 1 && parents[0].type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_GLIDER) {
        tglide = parents[0];
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "slopetriangle", "tangent");
        tangent = board.create("tangent", [
            tglide
        ], attr);
        isPrivateTangent = true;
    } else if (parents.length === 2 && parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint(parents[1])) {
        tangent = parents[0];
        tglide = parents[1];
    } else {
        throw new Error("JSXGraph: Can't create slope triangle with parent types '" + typeof parents[0] + "'.");
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "slopetriangle", "basepoint");
    basepoint = board.create("point", [
        function() {
            return [
                tglide.X() + 1,
                tglide.Y()
            ];
        }
    ], attr);
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "slopetriangle", "baseline");
    baseline = board.create("line", [
        tglide,
        basepoint
    ], attr);
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "slopetriangle", "glider");
    glider = board.create("glider", [
        tglide.X() + 1,
        tglide.Y(),
        baseline
    ], attr);
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "slopetriangle", "toppoint");
    toppoint = board.create("point", [
        function() {
            return [
                glider.X(),
                glider.Y() + (glider.X() - tglide.X()) * tangent.getSlope()
            ];
        }
    ], attr);
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "slopetriangle");
    // attr.borders = Type.copyAttributes(attr.borders, board.options, "slopetriangle", "borders");
    el = board.create("polygon", [
        tglide,
        glider,
        toppoint
    ], attr);
    /**
     * Returns the value of the slope triangle, that is the slope of the tangent.
     * @name Value
     * @memberOf Slopetriangle.prototype
     * @function
     * @returns {Number} slope of the tangent.
     */ el.Value = priv.Value;
    /**
     * Returns the direction of the slope triangle, that is the direction of the tangent.
     * @name Direction
     * @memberOf Slopetriangle.prototype
     * @see Line#Direction
     * @function
     * @returns {Number} slope of the tangent.
     */ el.Direction = priv.Direction;
    el.tangent = tangent;
    el._isPrivateTangent = isPrivateTangent;
    //el.borders[0].setArrow(false, {type: 2, size: 10});
    //el.borders[1].setArrow(false, {type: 2, size: 10});
    el.borders[2].setArrow(false, false);
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "slopetriangle", "label");
    //label = board.create("text", [
    //         function () {
    //             return glider.X() + 0.1;
    //         },
    //         function () {
    //             return (glider.Y() + toppoint.Y()) * 0.5;
    //         },
    //         function () {
    //             return "";
    //         }
    //     ],
    //     attr
    // );
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attr, board.options, "label");
    // Add label to vertical polygon edge
    attr.isLabel = true;
    attr.anchor = el.borders[1];
    attr.priv = el.borders[1].visProp.priv;
    attr.id = el.borders[1].id + "Label";
    label = board.create("text", [
        0,
        0,
        function() {
            return "";
        }
    ], attr);
    label.needsUpdate = true;
    label.dump = false;
    el.borders[1].label = label;
    el.borders[1].hasLabel = true;
    el.borders[1].visProp.withlabel = true;
    label._setText(function() {
        var digits = label.evalVisProp('digits');
        if (label.useLocale()) {
            return label.formatNumberLocale(el.Value(), digits);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].toFixed(el.Value(), digits);
    });
    label.fullUpdate();
    el.glider = glider;
    el.basepoint = basepoint;
    el.baseline = baseline;
    el.toppoint = toppoint;
    el.label = label;
    el.subs = {
        glider: glider,
        basePoint: basepoint,
        baseLine: baseline,
        topPoint: toppoint,
        label: label
    };
    el.inherits.push(glider, basepoint, baseline, toppoint, label);
    el.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(el.methodMap, {
        tangent: "tangent",
        glider: "glider",
        basepoint: "basepoint",
        baseline: "baseline",
        toppoint: "toppoint",
        label: "label",
        Value: "Value",
        V: "Value",
        Direction: "Direction"
    });
    el.remove = priv.removeSlopeTriangle;
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("slopetriangle", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createSlopeTriangle); // export default {
 //     createSlopeTriangle: JXG.createSlopeTriangle
 // };
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/checkbox.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software dual licensed under the GNU LGPL or MIT License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License and
    the MIT License along with JSXGraph. If not, see <https://www.gnu.org/licenses/>
    and <https://opensource.org/licenses/MIT/>.
 */ /*global JXG: true, define: true, window: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview In this file the Text element is defined.
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/env.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
;
;
;
var priv = {
    /**
     * @class
     * @ignore
     */ CheckboxChangeEventHandler: function() {
        this._value = this.rendNodeCheckbox.checked;
        this.board.update();
    }
};
/**
 * @class A text element that contains an HTML checkbox tag.
 * For this element, the attribute "display" has to have the value 'html' (which is the default).
 *
 * <p><b>Setting a CSS class:</b> The attribute <tt>cssClass</tt> affects the HTML div element that contains the checkbox element. To change the CSS properties of the HTML checkbox element a selector of the form
 * <tt>.mycheck > checkbox { ... }</tt> has to be used. See the analog example for buttons:
 * {@link Button}.
 *
 * <p><b>Access the checkbox element with JavaScript:</b>
 * The underlying HTML checkbox element can be accessed through the sub-object 'rendNodeCheck', e.g. to
 * add event listeners.
 *
 * @pseudo
 * @name Checkbox
 * @augments Text
 * @constructor
 * @type JXG.Text
 *
 * @param {number,function_number,function_String,function} x,y,label Parent elements for checkbox elements.
 *   <p>
 *   x and y are the coordinates of the lower left corner of the text box.
 *    The position of the text is fixed,
 *   x and y are numbers. The position is variable if x or y are functions.
 *   <p>
 *   The label of the input element may be given as string or function.
 *   <p>
 *   The value of the checkbox can be controlled with the attribute <tt>checked</tt>
 *   <p>The HTML node can be accessed with <tt>element.rendNodeCheckbox</tt>
 *
 * @example
 *   // Create a checkbox element at position [0,3].
 *   var checkbox = board.create('checkbox', [0, 3, 'Change Y'], {});
 *   var p = board.create('point', [
 *       function(){ return 0.5;}, // X-coordinate
 *       function() {
 *           y = 0.5;
 *           if (checkbox.Value()) {
 *               y += 0.5;
 *           }
 *           return y;
 *       }]);
 * </pre><div class="jxgbox" id="JXG0e835e0b-ed0c-4b85-b682-78158c0e6f5c" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function() {
 *   var t1_board = JXG.JSXGraph.initBoard('JXG0e835e0b-ed0c-4b85-b682-78158c0e6f5c', {boundingbox: [-3, 6, 5, -3], axis: true, showcopyright: false, shownavigation: false});
 *   var checkbox = t1_board.create('checkbox', [0, 3, 'Change Y'], {});
 *   var p = t1_board.create('point', [
 *       function(){ return 0.5;}, // X-coordinate
 *       function() {
 *           y = 0.5;
 *           if (checkbox.Value()) {
 *               y += 0.5;
 *           }
 *           return y;
 *       }]);
 * })();
 * </script><pre>
 *
 * The checkbox can be supplied with custom-made events by using the property rendNodeCheckbox.
 * @example
 * var checkbox = board.create('checkbox', [0, 4, 'Click me']),
 *     p = board.create('point', [1, 1]);
 *
 * JXG.addEvent(checkbox.rendNodeCheckbox, 'change', function() {
 *     if (this.Value()) {
 *         p.moveTo([4, 1]);
 *     } else {
 *         p.moveTo([1, 1]);
 *     }
 * }, checkbox);
 * </pre><div class="jxgbox" id="JXGb2f2345a-057d-44ce-bd7a-6aaff70bc810" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function() {
 * var board = JXG.JSXGraph.initBoard('JXGb2f2345a-057d-44ce-bd7a-6aaff70bc810', {boundingbox: [-3, 6, 5, -3], axis: true, showcopyright: false, shownavigation: false});
 * var checkbox = board.create('checkbox', [0, 4, 'Click me']),
 *     p = board.create('point', [1, 1]);
 *
 * JXG.addEvent(checkbox.rendNodeCheckbox, 'change', function() {
 *     if (this.Value()) {
 *         p.moveTo([4, 1]);
 *     } else {
 *         p.moveTo([1, 1]);
 *     }
 * }, checkbox);
 * })();
 * </script><pre>
 * @example
 *     var i1 = board.create('input', [1, 5, 'sin(x)', 'f(x)='], {cssStyle: 'width:4em', maxlength: 2});
 *         var c1 = board.create('checkbox', [1, 3, 'label 1'], {});
 *         var b1 = board.create('button', [1, 1, 'Change texts', function () {
 *                 i1.setText('g(x)=');
 *                 i1.set('cos(x)');
 *                 c1.setText('label 2');
 *                 b1.setText('Texts are changed');
 *             }],
 *             {cssStyle: 'width:200px'});
 *
 * </pre><div id="JXG31c6d070-354b-4f09-aab9-9aaa796f730c" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG31c6d070-354b-4f09-aab9-9aaa796f730c',
 *             {boundingbox: [-1, 7, 7, -1], axis: true, showcopyright: false, shownavigation: false});
 *         var i1 = board.create('input', [1, 5, 'sin(x)', 'f(x)='], {cssStyle: 'width:4em', maxlength: 2});
 *             var c1 = board.create('checkbox', [1, 3, 'label 1'], {});
 *             var b1 = board.create('button', [1, 1, 'Change texts', function () {
 *                     i1.setText('g(x)=');
 *                     i1.set('cos(x)');
 *                     c1.setText('label 2');
 *                     b1.setText('Texts are changed');
 *                 }],
 *                 {cssStyle: 'width:200px'});
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCheckbox = function(board, parents, attributes) {
    var t, par, attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "checkbox");
    //if (parents.length !== 3) {
    //throw new Error("JSXGraph: Can't create checkbox with parent types '" +
    //    (typeof parents[0]) + "' and '" + (typeof parents[1]) + "'." +
    //    "\nPossible parents are: [[x,y], label]");
    //}
    par = [
        parents[0],
        parents[1],
        '<span style="display:inline">' + '<input type="checkbox" /><label for=""></label>' + "</span>"
    ];
    // 1. Create checkbox element with empty label
    t = board.create("text", par, attr);
    t.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_CHECKBOX;
    t.rendNodeCheckbox = t.rendNode.childNodes[0].childNodes[0];
    t.rendNodeLabel = t.rendNode.childNodes[0].childNodes[1];
    t.rendNodeTag = t.rendNodeCheckbox; // Needed for unified treatment in setAttribute
    t.rendNodeTag.disabled = !!attr.disabled;
    // t.rendNodeLabel.innerHTML = parents[2];
    t.rendNodeCheckbox.id = t.rendNode.id + "_checkbox";
    t.rendNodeLabel.id = t.rendNode.id + "_label";
    t.rendNodeLabel.setAttribute("for", t.rendNodeCheckbox.id);
    // 2. Set parents[2] (string|function) as label of the checkbox element.
    // abstract.js selects the correct DOM element for the update
    t.setText(parents[2]);
    // This sets the font-size of the checkbox itself
    t.visPropOld.fontsize = "0px";
    board.renderer.updateTextStyle(t, false);
    t.rendNodeCheckbox.checked = attr.checked;
    t._value = attr.checked;
    /**
     * Returns the value of the checkbox element
     * @name Value
     * @memberOf Checkbox.prototype
     * @function
     * @returns {String} value of the checkbox.
     */ t.Value = function() {
        return this._value;
    };
    /**
     * @class
     * @ignore
     */ t.update = function() {
        if (this.needsUpdate) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Text.prototype.update.call(this);
            this._value = this.rendNodeCheckbox.checked;
        }
        return this;
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].addEvent(t.rendNodeCheckbox, "change", priv.CheckboxChangeEventHandler, t);
    return t;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("checkbox", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCheckbox); // export default {
 //     createCheckbox: JXG.createCheckbox
 // };
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/input.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software dual licensed under the GNU LGPL or MIT License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License and
    the MIT License along with JSXGraph. If not, see <https://www.gnu.org/licenses/>
    and <https://opensource.org/licenses/MIT/>.
 */ /*global JXG: true, define: true, window: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview In this file the Text element is defined.
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/env.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
;
;
;
/**
 * @class
 * @ignore
 */ var priv = {
    /**
    * @class
    * @ignore
    */ InputInputEventHandler: function(evt) {
        this._value = this.rendNodeInput.value;
        this.board.update();
    }
};
/**
 * @class This element is used to provide a constructor for special texts containing a
 * HTML form input element.
 * For this element, the attribute "display" has to have the value 'html' (which is the default).
 *
 * <p><b>Setting a CSS class:</b> The attribute <tt>cssClass</tt> affects the HTML div element that contains the input element. To change the CSS properties of the HTML input element a selector of the form
 * <tt>.myinput > input { ... }</tt> has to be used. See the analog example for buttons:
 * {@link Button}.
 *
 * <p><b>Access the input element with JavaScript:</b>
 * The underlying HTML button element can be accessed through the sub-object 'rendNodeInput', e.g. to
 * add event listeners.
 *
 * @pseudo
 * @name Input
 * @augments Text
 * @constructor
 * @type JXG.Text
 *
 * @param {number,function_number,function_String_String,function} x,y,value,label Parent elements for input elements.
 *   <p>
 *   x and y are the coordinates of the lower left corner of the text box. The position of the text is fixed,
 *   x and y are numbers. The position is variable if x or y are functions.
 *   <p>
 *   The default value of the input element must be given as string.
 *   <p>
 *   The label of the input element may be given as string or function.
 *
 * @example
 *  // Create an input element at position [1,4].
 *  var input = board.create('input', [0, 1, 'sin(x)*x', 'f(x)='], {cssStyle: 'width: 100px'});
 *  var f = board.jc.snippet(input.Value(), true, 'x', false);
 *  var graph = board.create('functiongraph',[f,
 *          function() {
 *            var c = new JXG.Coords(JXG.COORDS_BY_SCREEN,[0,0],board);
 *            return c.usrCoords[1];
 *          },
 *          function() {
 *            var c = new JXG.Coords(JXG.COORDS_BY_SCREEN,[board.canvasWidth,0],board);
 *            return c.usrCoords[1];
 *          }
 *        ]);
 *
 *  board.create('text', [1, 3, '&lt;button onclick="updateGraph()"&gt;Update graph&lt;/button&gt;']);
 *
 *  var updateGraph = function() {
 *      graph.Y = board.jc.snippet(input.Value(), true, 'x', false);
 *      graph.updateCurve();
 *      board.update();
 *  }
 * </pre><div class="jxgbox" id="JXGc70f55f1-21ba-4719-a37d-a93ae2943faa" style="width: 500px; height: 300px;"></div>
 * <script type="text/javascript">
 *   var t1_board = JXG.JSXGraph.initBoard('JXGc70f55f1-21ba-4719-a37d-a93ae2943faa', {boundingbox: [-3, 6, 5, -3], axis: true, showcopyright: false, shownavigation: false});
 *   var input = t1_board.create('input', [1, 4, 'sin(x)*x', 'f(x)='], {cssStyle: 'width: 100px'});
 *   var f = t1_board.jc.snippet(input.Value(), true, 'x', false);
 *   var graph = t1_board.create('functiongraph',[f,
 *          function() {
 *            var c = new JXG.Coords(JXG.COORDS_BY_SCREEN,[0,0],t1_board);
 *            return c.usrCoords[1];
 *          },
 *          function() {
 *            var c = new JXG.Coords(JXG.COORDS_BY_SCREEN,[t1_board.canvasWidth,0],t1_board);
 *            return c.usrCoords[1];
 *          }
 *        ]);
 *
 *  t1_board.create('text', [1, 3, '<button onclick="updateGraph()">Update graph</button>']);
 *
 *  var updateGraph = function() {
 *      graph.Y = t1_board.jc.snippet(input.Value(), true, 'x', false);
 *      graph.updateCurve();
 *      t1_board.update();
 *  }
 * </script><pre>
 *
 * @example
 * // Add the `keyup` event to an input field
 * var A = board.create('point', [3, -2]);
 * var i = board.create('input', [-4, -4, "1", "x "]);
 *
 * i.rendNodeInput.addEventListener("keyup", ( function () {
 *    var x = parseFloat(this.value);
 *    if (!isNaN(x)) {
 * 	   A.moveTo([x, 3], 100);
 *    }
 * }));
 *
 * </pre><div id="JXG81c84fa7-3f36-4874-9e0f-d4b9e93e755b" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG81c84fa7-3f36-4874-9e0f-d4b9e93e755b',
 *             {boundingbox: [-5, 5, 5, -5], axis: true, showcopyright: false, shownavigation: false});
 *     var A = board.create('point', [3, -2]);
 *     var i = board.create('input', [-4, -4, "1", "x "]);
 *
 *     i.rendNodeInput.addEventListener("keyup", ( function () {
 *        var x = parseFloat(this.value);
 *        if (!isNaN(x)) {
 *     	    A.moveTo([x, 3], 100);
 *        }
 *     }));
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * // Add the `change` event to an input field
 * var A = board.create('point', [3, -2]);
 * var i = board.create('input', [-4, -4, "1", "x "]);
 *
 * i.rendNodeInput.addEventListener("change", ( function () {
 *    var x = parseFloat(i.Value());
 *    A.moveTo([x, 2], 100);
 * }));
 *
 * </pre><div id="JXG51c4d78b-a7ad-4c34-a983-b3ddae6192d7" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG51c4d78b-a7ad-4c34-a983-b3ddae6192d7',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var A = board.create('point', [3, -2]);
 *     var i = board.create('input', [-4, -4, "1", "x "]);
 *
 *     i.rendNodeInput.addEventListener("change", ( function () {
 *        var x = parseFloat(i.Value());
 *        A.moveTo([x, 2], 100);
 *     }));
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * // change the width of an input field
 *  let s = board.create('slider', [[-3, 3], [2, 3], [50, 100, 300]]);
 *  let inp = board.create('input', [-6, 1, 'Math.sin(x)*x', 'f(x)='],{cssStyle:()=>'width:'+s.Value()+'px'});
 *
 * </pre><div id="JXG51c4d78b-a7ad-4c34-a983-b3ddae6192d7-1" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG51c4d78b-a7ad-4c34-a983-b3ddae6192d7-1',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *  let s = board.create('slider', [[-3, 3], [2, 3], [50, 100, 300]]);
 *  let inp = board.create('input', [-6, 1, 'Math.sin(x)*x', 'f(x)='],{cssStyle:()=>'width:'+s.Value()+'px'});
 *     })();
 *
 * </script><pre>
 *
 * @example
 *   Apply CSS classes to label and input tag
 *     &lt;style&gt;
 *         div.JXGtext_inp {
 *             font-weight: bold;
 *         }
 *
 *         // Label
 *         div.JXGtext_inp > span > span {
 *             padding: 3px;
 *         }
 *
 *         // Input field
 *         div.JXGtext_inp > span > input {
 *             width: 100px;
 *             border: solid 4px red;
 *             border-radius: 25px;
 *         }
 *     &lt;/style&gt;
 *
 * var inp = board.create('input', [-6, 1, 'x', 'y'], {
 *      CssClass: 'JXGtext_inp', HighlightCssClass: 'JXGtext_inp'
 * });
 *
 * </pre>
 *         <style>
 *             div.JXGtext_inp {
 *                 font-weight: bold;
 *             }
 *
 *             div.JXGtext_inp > span > span {
 *                 padding: 3px;
 *             }
 *
 *             div.JXGtext_inp > span > input {
 *                 width: 100px;
 *                 border: solid 4px red;
 *                 border-radius: 25px;
 *             }
 *         </style>
 * <div id="JXGa3642ebd-a7dc-41ac-beb2-0c9e705ab8b4" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGa3642ebd-a7dc-41ac-beb2-0c9e705ab8b4',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *         var inp = board.create('input', [-6, 1, 'x', 'y'], {CssClass: 'JXGtext_inp', HighlightCssClass: 'JXGtext_inp'});
 *
 *     })();
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createInput = function(board, parents, attributes) {
    var t, par, attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "input");
    par = [
        parents[0],
        parents[1],
        '<span style="display:inline; white-space:nowrap; padding:0px;">' + '<label></label><input type="text" maxlength="' + attr.maxlength + '" style="width:100%"/>' + "</span>"
    ];
    // 1. Create input element with empty label
    t = board.create("text", par, attr);
    t.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_INPUT;
    t.rendNodeLabel = t.rendNode.childNodes[0].childNodes[0];
    t.rendNodeInput = t.rendNode.childNodes[0].childNodes[1];
    // t.rendNodeLabel.innerHTML = parents[3];
    t.rendNodeInput.value = parents[2];
    t.rendNodeTag = t.rendNodeInput; // Needed for unified treatment in setAttribute
    t.rendNodeTag.disabled = !!attr.disabled;
    t.rendNodeLabel.id = t.rendNode.id + "_label";
    t.rendNodeInput.id = t.rendNode.id + "_input";
    t.rendNodeInput.setAttribute("aria-labelledby", t.rendNodeLabel.id);
    // 2. Set parents[3] (string|function) as label of the input element.
    // abstract.js selects the correct DOM element for the update
    t.setText(parents[3]);
    t._value = parents[2];
    // 3.  capture keydown events on the input, and do not let them propagate.  The problem is that
    // elevation controls on view3D use left and right, so editing the input triggers 3D pan.
    t.rendNodeInput.addEventListener("keydown", (event)=>{
        // only trap left-and-right in case user wants input editing events
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.stopPropagation();
        }
    });
    /**
    * @class
    * @ignore
    */ t.update = function() {
        if (this.needsUpdate) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Text.prototype.update.call(this);
            this._value = this.rendNodeInput.value;
        }
        return this;
    };
    /**
     * Returns the value (content) of the input element
     * @name Value
     * @memberOf Input.prototype
     * @function
     * @returns {String} content of the input field.
     */ t.Value = function() {
        return this._value;
    };
    /**
     * Sets value of the input element.
     * @name set
     * @memberOf Input.prototype
     * @function
     *
     * @param {String} val
     * @returns {JXG.GeometryElement} Reference to the element.
     *
     * @example
     *         var i1 = board.create('input', [-3, 4, 'sin(x)', 'f(x)='], {cssStyle: 'width:4em', maxlength: 2});
     *         var c1 = board.create('checkbox', [-3, 2, 'label 1'], {});
     *         var b1 = board.create('button', [-3, -1, 'Change texts', function () {
     *                 i1.setText('g(x)');
     *                 i1.set('cos(x)');
     *                 c1.setText('label 2');
     *                 b1.setText('Texts are changed');
     *             }],
     *             {cssStyle: 'width:400px'});
     *
     * </pre><div id="JXG11cac8ff-2354-47e7-9da4-eb298e53de05" class="jxgbox" style="width: 300px; height: 300px;"></div>
     * <script type="text/javascript">
     *     (function() {
     *         var board = JXG.JSXGraph.initBoard('JXG11cac8ff-2354-47e7-9da4-eb298e53de05',
     *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
     *             var i1 = board.create('input', [-3, 4, 'sin(x)', 'f(x)='], {cssStyle: 'width:4em', maxlength: 2});
     *             var c1 = board.create('checkbox', [-3, 2, 'label 1'], {});
     *             var b1 = board.create('button', [-3, -1, 'Change texts', function () {
     *                     i1.setText('g(x)');
     *                     i1.set('cos(x)');
     *                     c1.setText('label 2');
     *                     b1.setText('Texts are changed');
     *                 }],
     *                 {cssStyle: 'width:400px'});
     *
     *     })();
     *
     * </script><pre>
     *
     */ /**
    * @class
    * @ignore
    */ t.set = function(val) {
        this._value = val;
        this.rendNodeInput.value = val;
        return this;
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].addEvent(t.rendNodeInput, "input", priv.InputInputEventHandler, t);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].addEvent(t.rendNodeInput, "mousedown", function(evt) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(evt.stopPropagation)) {
            evt.stopPropagation();
        }
    }, t);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].addEvent(t.rendNodeInput, "touchstart", function(evt) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(evt.stopPropagation)) {
            evt.stopPropagation();
        }
    }, t);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].addEvent(t.rendNodeInput, "pointerdown", function(evt) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(evt.stopPropagation)) {
            evt.stopPropagation();
        }
    }, t);
    // This sets the font-size of the input HTML element
    t.visPropOld.fontsize = "0px";
    board.renderer.updateTextStyle(t, false);
    return t;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("input", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createInput); // export default {
 //     createInput: JXG.createInput
 // };
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/button.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software dual licensed under the GNU LGPL or MIT License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License and
    the MIT License along with JSXGraph. If not, see <https://www.gnu.org/licenses/>
    and <https://opensource.org/licenses/MIT/>.
 */ /*global JXG: true, define: true, window: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview In this file the Text element is defined.
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/env.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
;
;
;
var priv = {
    ButtonClickEventHandler: function() {
        if (this._handler) {
            this._handler();
        }
        this.board.update();
    }
};
/**
 * @class A text element that contains an HTML button tag.
 * For this element, the attribute "display" has to have the value 'html' (which is the default).
 *
 * <p><b>Setting a CSS class:</b> The attribute <tt>cssClass</tt> affects the HTML div element that contains the button element. To change the CSS properties of the HTML button element a selector of the form
 * <tt>.mybutton > button { ... }</tt> has to be used. See the example below.
 *
 * <p><b>Access the button element with JavaScript:</b>
 * The underlying HTML button element can be accessed through the sub-object 'rendNodeButton', e.g. to
 * add event listeners.
 *
 * @pseudo
 * @name Button
 * @augments Text
 * @constructor
 * @type JXG.Text
 *
 * @param {number,function_number,function_String,function_function} x,y,label,handler Parent elements for button elements.
 *  <p>
 *  x and y are the coordinates of the lower left corner of the text box.
 *   The position of the text is fixed,
 *  x and y are numbers. The position is variable if x or y are functions.
 *  <p>
 *  The label of the input element may be given  as string.
 *  <p>
 *  The (optional) handler function which is called when the button is pressed.
 *
 * @example
 *  var p = board.create('point', [0.5, 0.5], {id: 'p1'});
 *
 *  // Create a button element at position [1,2].
 *  var button1 = board.create('button', [1, 2, 'Change Y with JavaScript', function() {
 *      p.moveTo([p.X(), p.Y() + 0.5], 100);
 *  }], {});
 *
 *  // Create a button element at position [1,4].
 *  var button2 = board.create('button', [1, 4, 'Change Y with JessieCode',
 *      "$('p1').Y = $('p1').Y() - 0.5;"
 *  ], {});
 *
 * </pre><div class="jxgbox" id="JXGf19b1bce-dd00-4e35-be97-ff1817d11514" style="width: 500px; height: 300px;"></div>
 * <script type="text/javascript">
 *  var t1_board = JXG.JSXGraph.initBoard('JXGf19b1bce-dd00-4e35-be97-ff1817d11514', {boundingbox: [-3, 6, 5, -3], axis: true, showcopyright: false, shownavigation: false});
 *  var p = t1_board.create('point', [0, -1], {id: 'p1'});
 *
 *  // Create a button element at position [1,2].
 *  var button1 = t1_board.create('button', [1, 2, 'Change Y with JavaScript', function() {
 *      p.moveTo([p.X(), p.Y() + 0.5], 100);
 *  }], {});
 *
 *  // Create a button element at position [1,4].
 *  var button2 = t1_board.create('button', [1, 4, 'Change Y with JessieCode',
 *      "$('p1').Y = $('p1').Y() - 0.5;"
 *  ], {});
 *
 * </script><pre>
 *
 * @example
 * // A toggle button
 * var butt = board.create('button', [-2, -2, 'Off', function() {
 *   var txt;
 *   butt.value = !butt.value;
 *   if (butt.value) {
 *   	txt = 'On';
 *   } else {
 *   	txt = 'Off';
 *   }
 * 	butt.rendNodeButton.innerHTML = txt;
 * }]);
 *
 * // Set initial value for the button
 * if (!JXG.exists(butt.value)) {
 * 	butt.value = false;
 * }
 *
 * var p = board.create('point', [2, -2], {
 * 	visible: () => butt.value
 * });
 *
 *
 *
 * </pre><div id="JXGa1eaab8f-c73b-4660-96ce-4ca17bcac4d6" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGa1eaab8f-c73b-4660-96ce-4ca17bcac4d6',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var butt = board.create('button', [-2, -2, 'Off', function() {
 *       var txt;
 *       butt.value = !butt.value;
 *       if (butt.value) {
 *       	txt = 'On';
 *       } else {
 *       	txt = 'Off';
 *       }
 *     	butt.rendNodeButton.innerHTML = txt;
 *     }]);
 *
 *     // Set initial value for the button
 *     if (!JXG.exists(butt.value)) {
 *     	butt.value = false;
 *     }
 *
 *     var p = board.create('point', [2, -2], {
 *     	visible: () => butt.value
 *     });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * var i1 = board.create('input', [-3, 4, 'sin(x)', 'f(x)='], {cssStyle: 'width:4em', maxlength: 2});
 * var c1 = board.create('checkbox', [-3, 2, 'label 1'], {});
 * var b1 = board.create('button', [-3, -1, 'Change texts', function () {
 *         i1.setText('g(x)');
 *         i1.set('cos(x)');
 *         c1.setText('label 2');
 *         b1.setText('Texts are changed');
 *     }],
 *     {cssStyle: 'width:200px'});
 *
 * </pre><div id="JXG11cac8ff-2354-47e7-9da4-eb928e53de05" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG11cac8ff-2354-47e7-9da4-eb928e53de05',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *             var i1 = board.create('input', [-3, 4, 'sin(x)', 'f(x)='], {cssStyle: 'width:4em', maxlength: 2});
 *             var c1 = board.create('checkbox', [-3, 2, 'label 1'], {});
 *             var b1 = board.create('button', [-3, -1, 'Change texts', function () {
 *                     i1.setText('g(x)');
 *                     i1.set('cos(x)');
 *                     c1.setText('label 2');
 *                     b1.setText('Texts are changed');
 *                 }],
 *                 {cssStyle: 'width:200px'});
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * // Set the CSS class of the button
 *
 * // CSS:
 * &lt;style&gt;
 * .mybutton > button {
 *   background-color: #04AA6D;
 *   border: none;
 *   color: white;
 *   padding: 1px 3px;
 *   text-align: center;
 *   text-decoration: none;
 *   display: inline-block;
 *   font-size: 16px;
 * }
 * &lt;/style&gt;
 *
 * // JavaScript:
 * var button = board.create('button',
 *     [1, 4, 'answers', function () {}],
 *     {cssClass:'mybutton', highlightCssClass: 'mybutton'});
 *
 * </pre>
 * <style>
 * .mybutton > button {
 *   background-color: #04AA6D;
 *   border: none;
 *   color: white;
 *   padding: 1px 3px;
 *   text-align: center;
 *   text-decoration: none;
 *   display: inline-block;
 *   font-size: 16px;
 * }
 * </style>
 * <div id="JXG2da6cf73-8c2e-495c-bd31-42de43b71cf8" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG2da6cf73-8c2e-495c-bd31-42de43b71cf8',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *       var button = board.create('button', [1, 4, 'answers', function () {
 *       }], {cssClass:'mybutton', highlightCssClass: 'mybutton'});
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createButton = function(board, parents, attributes) {
    var t, par, attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "button");
    //if (parents.length < 3) {
    //throw new Error("JSXGraph: Can't create button with parent types '" +
    //    (typeof parents[0]) + "' and '" + (typeof parents[1]) + "'." +
    //    "\nPossible parents are: [x, y, label, handler]");
    //}
    // 1. Create empty button
    par = [
        parents[0],
        parents[1],
        '<button type="button" style="width:100%; height:100%;" tabindex="0"></button>'
    ];
    t = board.create("text", par, attr);
    t.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_BUTTON;
    t.rendNodeButton = t.rendNode.childNodes[0];
    t.rendNodeButton.id = t.rendNode.id + "_button";
    // t.rendNodeButton.innerHTML = parents[2];
    t.rendNodeTag = t.rendNodeButton; // Needed for unified treatment in setAttribute
    t.rendNodeTag.disabled = !!attr.disabled;
    // 2. Set parents[2] (string|function) as content of the button.
    // abstract.js selects the correct DOM element for the update
    t.setText(parents[2]);
    // This sets the font size of the button text
    t.visPropOld.fontsize = "0px";
    board.renderer.updateTextStyle(t, false);
    if (parents[3]) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(parents[3])) {
            t._jc = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].JessieCode();
            t._jc.use(board);
            t._handler = function() {
                t._jc.parse(parents[3]);
            };
        } else {
            t._handler = parents[3];
        }
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].addEvent(t.rendNodeButton, "click", priv.ButtonClickEventHandler, t);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].addEvent(t.rendNodeButton, "mousedown", function(evt) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(evt.stopPropagation)) {
            evt.stopPropagation();
        }
    }, t);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].addEvent(t.rendNodeButton, "touchstart", function(evt) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(evt.stopPropagation)) {
            evt.stopPropagation();
        }
    }, t);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].addEvent(t.rendNodeButton, "pointerdown", function(evt) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(evt.stopPropagation)) {
            evt.stopPropagation();
        }
    }, t);
    return t;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("button", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createButton); // export default {
 //     createButton: JXG.createButton
 // };
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/vectorfield.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Carsten Miller,
        Alfred Wassermann

    This file is part of JSXGraph.

    JSXGraph is free software dual licensed under the GNU LGPL or MIT License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License and
    the MIT License along with JSXGraph. If not, see <https://www.gnu.org/licenses/>
    and <https://opensource.org/licenses/MIT/>.
 */ /*global JXG: true, define: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview Implementation of vector fields and slope fields.
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
;
;
/**
 * @class  A vector field on a plane can be visualized as a collection of arrows
 * with given magnitudes and directions, each attached to a point on the plane.
 * <p>
 * Plot a vector field either given by two functions f1(x, y) and f2(x,y) or by a function f(x, y) returning an array of size 2.
 *
 * @pseudo
 * @name Vectorfield
 * @augments JXG.Curve
 * @constructor
 * @type JXG.Curve
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * Parameter options:
 * @param {Array|Function|String} F Either an array containing two functions f1(x, y) and f2(x, y) or function f(x, y) returning an array of length 2.
 * @param {Array} xData Array of length 3 containing start value for x, number of steps, end value of x. The vector field will contain
 * (number of steps) + 1 vectors in direction of x.
 * @param {Array} yData Array of length 3 containing start value for y, number of steps, end value of y. The vector field will contain
 * (number of steps) + 1 vectors in direction of y.
 *
 * @example
 * // Defining functions
 * var fx = (x, y) => Math.sin(y);
 * var fy = (x, y) => Math.cos(x);
 *
 * var field = board.create('vectorfield', [
 *         [fx, fy],    // Defining function
 *         [-6, 25, 6], // Horizontal mesh
 *         [-5, 20, 5], // Vertical mesh
 *     ]);
 *
 * </pre><div id="JXGa2040e30-48ea-47d4-9840-bd24cd49150b" class="jxgbox" style="width: 500px; height: 500px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGa2040e30-48ea-47d4-9840-bd24cd49150b',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     // Defining functions
 *     var fx = (x, y) => Math.sin(y);
 *     var fy = (x, y) => Math.cos(x);
 *
 *     var field = board.create('vectorfield', [
 *             [fx, fy],    // Defining function
 *             [-6, 25, 6], // Horizontal mesh
 *             [-5, 20, 5], // Vertical mesh
 *         ]);
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * // Slider to control length of vectors
 * var s = board.create('slider', [[-3, 7], [3, 7], [0, 0.33, 1]], {name: 'length'});
 * // Slider to control number of steps
 * var stepsize = board.create('slider', [[-3, 6], [3, 6], [1, 20, 100]], {name: 'steps', snapWidth: 1});
 *
 * // Defining functions
 * var fx = (x, y) => 0.2 * y;
 * var fy = (x, y) => 0.2 * (Math.cos(x) - 2) * Math.sin(x);
 *
 * var field = board.create('vectorfield', [
 *         [fx, fy],        // Defining function
 *         [-6, () => stepsize.Value(), 6], // Horizontal mesh
 *         [-5, () => stepsize.Value(), 5], // Vertical mesh
 *     ], {
 *         highlightStrokeColor: JXG.palette.blue, // Make highlighting invisible
 *
 *         scale: () => s.Value(), // Scaling of vectors
 *
 *         arrowHead: {
 *             enabled: true,
 *             size: 8,  // Pixel length of arrow head
 *             angle: Math.PI / 16
 *         }
 * });
 *
 * </pre><div id="JXG9196337e-66f0-4d09-8065-11d88c4ff140" class="jxgbox" style="width: 500px; height: 500px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG9196337e-66f0-4d09-8065-11d88c4ff140',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     // Slider to control length of vectors
 *     var s = board.create('slider', [[-3, 7], [3, 7], [0, 0.33, 1]], {name: 'length'});
 *     // Slider to control number of steps
 *     var stepsize = board.create('slider', [[-3, 6], [3, 6], [1, 20, 100]], {name: 'steps', snapWidth: 1});
 *
 *     // Defining functions
 *     var fx = (x, y) => 0.2 * y;
 *     var fy = (x, y) => 0.2 * (Math.cos(x) - 2) * Math.sin(x);
 *
 *     var field = board.create('vectorfield', [
 *             [fx, fy],        // Defining function
 *             [-6, () => stepsize.Value(), 6], // Horizontal mesh
 *             [-5, () => stepsize.Value(), 5], // Vertical mesh
 *         ], {
 *             highlightStrokeColor: JXG.palette.blue, // Make highlighting invisible
 *
 *             scale: () => s.Value(), // Scaling of vectors
 *
 *             arrowHead: {
 *                 enabled: true,
 *                 size: 8,  // Pixel length of arrow head
 *                 angle: Math.PI / 16
 *             }
 *     });
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createVectorField = function(board, parents, attributes) {
    var el, attr;
    if (!(parents.length >= 3 && (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[0]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[0]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(parents[0])) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[1]) && parents[1].length === 3 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[2]) && parents[2].length === 3)) {
        throw new Error("JSXGraph: Can't create vector field with parent types " + "'" + typeof parents[0] + "', " + "'" + typeof parents[1] + "', " + "'" + typeof parents[2] + "'.");
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'vectorfield');
    /**
     * @type {JXG.Curve}
     * @ignore
     */ el = board.create('curve', [
        [],
        []
    ], attr);
    el.elType = 'vectorfield';
    /**
     * Set the defining functions of vector field.
     * @memberOf Vectorfield
     * @name setF
     * @function
     * @param {Array|Function} func Either an array containing two functions f1(x, y) and f2(x, y) or function f(x, y) returning an array of length 2.
     * @returns {Object} Reference to the vector field object.
     *
     * @example
     * field.setF([(x, y) => Math.sin(y), (x, y) => Math.cos(x)]);
     * board.update();
     *
     */ el.setF = function(func, varnames) {
        var f0, f1;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(func)) {
            f0 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunction(func[0], this.board, varnames);
            f1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunction(func[1], this.board, varnames);
            /**
             * @ignore
             */ this.F = function(x, y) {
                return [
                    f0(x, y),
                    f1(x, y)
                ];
            };
        } else {
            this.F = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunction(func, el.board, varnames);
        }
        return this;
    };
    el.setF(parents[0], 'x, y');
    el.xData = parents[1];
    el.yData = parents[2];
    el.updateDataArray = function() {
        var x, y, i, j, scale = this.evalVisProp('scale'), start_x = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.xData[0]), steps_x = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.xData[1]), end_x = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.xData[2]), delta_x = (end_x - start_x) / steps_x, start_y = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.yData[0]), steps_y = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.yData[1]), end_y = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.yData[2]), delta_y = (end_y - start_y) / steps_y, v, theta, phi1, phi2, showArrow = this.evalVisProp('arrowhead.enabled'), leg, leg_x, leg_y, alpha;
        if (showArrow) {
            // Arrow head style
            leg = this.evalVisProp('arrowhead.size');
            leg_x = leg / board.unitX;
            leg_y = leg / board.unitY;
            alpha = this.evalVisProp('arrowhead.angle');
        }
        this.dataX = [];
        this.dataY = [];
        for(i = 0, x = start_x; i <= steps_x; x += delta_x, i++){
            for(j = 0, y = start_y; j <= steps_y; y += delta_y, j++){
                v = this.F(x, y);
                v[0] *= scale;
                v[1] *= scale;
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataX, [
                    x,
                    x + v[0],
                    NaN
                ]);
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataY, [
                    y,
                    y + v[1],
                    NaN
                ]);
                if (showArrow && Math.abs(v[0]) + Math.abs(v[1]) > 0.0) {
                    // Arrow head
                    theta = Math.atan2(v[1], v[0]);
                    phi1 = theta + alpha;
                    phi2 = theta - alpha;
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataX, [
                        x + v[0] - Math.cos(phi1) * leg_x,
                        x + v[0],
                        x + v[0] - Math.cos(phi2) * leg_x,
                        NaN
                    ]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataY, [
                        y + v[1] - Math.sin(phi1) * leg_y,
                        y + v[1],
                        y + v[1] - Math.sin(phi2) * leg_y,
                        NaN
                    ]);
                }
            }
        }
    };
    el.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(el.methodMap, {
        setF: "setF"
    });
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("vectorfield", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createVectorField);
/**
 * @class A slope field is a graphical representation of the solutions
 * to a first-order differential equation of a scalar function.
 * <p>
 * Plot a slope field given by a function f(x, y) returning a number.
 *
 * @pseudo
 * @name Slopefield
 * @augments Vectorfield
 * @constructor
 * @type JXG.Curve
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * Parameter options:
 * @param {Function|String} F Function f(x, y) returning a number.
 * @param {Array} xData Array of length 3 containing start value for x, number of steps, end value of x. The slope field will contain
 * (number of steps) + 1 vectors in direction of x.
 * @param {Array} yData Array of length 3 containing start value for y, number of steps, end value of y. The slope field will contain
 * (number of steps) + 1 vectors in direction of y.
 * @example
 * var field = board.create('slopefield', [
 *     (x, y) => x * x - x - 2,
 *     [-6, 25, 6], // Horizontal mesh
 *     [-5, 20, 5]  // Vertical mesh
 * ]);
 *
 * </pre><div id="JXG8a2ee562-eea1-4ce0-91ca-46b71fc7543d" class="jxgbox" style="width: 500px; height: 500px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG8a2ee562-eea1-4ce0-91ca-46b71fc7543d',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var field = board.create('slopefield', [
 *         (x, y) => x * x - x - 2,
 *         [-6, 25, 6], [-5, 20, 5]
 *     ]);
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * // Slider to control length of vectors
 * var s = board.create('slider', [[-3, 7], [3, 7], [0, 0.33, 1]], {name: 'length'});
 * // Slider to control number of steps
 * var stepsize = board.create('slider', [[-3, 6], [3, 6], [1, 20, 100]], {name: 'steps', snapWidth: 1});
 *
 * var field = board.create('slopefield', [
 *     (x, y) => x * x - y * y,
 *     [-6, () => stepsize.Value(), 6],
 *     [-5, () => stepsize.Value(), 5]],
 *     {
 *         strokeWidth: 1.5,
 *         highlightStrokeWidth: 0.5,
 *         highlightStrokeColor: JXG.palette.blue,
 *
 *         scale: () => s.Value(),
 *
 *         arrowHead: {
 *             enabled: false,
 *             size: 8,
 *             angle: Math.PI / 16
 *         }
 *     });
 *
 * </pre><div id="JXG1ec9e4d7-6094-4d2b-b72f-4efddd514f55" class="jxgbox" style="width: 500px; height: 500px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG1ec9e4d7-6094-4d2b-b72f-4efddd514f55',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     // Slider to control length of vectors
 *     var s = board.create('slider', [[-3, 7], [3, 7], [0, 0.33, 1]], {name: 'length'});
 *     // Slider to control number of steps
 *     var stepsize = board.create('slider', [[-3, 6], [3, 6], [1, 20, 100]], {name: 'steps', snapWidth: 1});
 *
 *     var field = board.create('slopefield', [
 *         (x, y) => x * x - y * y,
 *         [-6, () => stepsize.Value(), 6],
 *         [-5, () => stepsize.Value(), 5]],
 *         {
 *             strokeWidth: 1.5,
 *             highlightStrokeWidth: 0.5,
 *             highlightStrokeColor: JXG.palette.blue,
 *
 *             scale: () => s.Value(),
 *
 *             arrowHead: {
 *                 enabled: false,
 *                 size: 8,
 *                 angle: Math.PI / 16
 *             }
 *         });
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createSlopeField = function(board, parents, attributes) {
    var el, f, attr;
    if (!(parents.length >= 3 && (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[0]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(parents[0])) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[1]) && parents[1].length === 3 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[2]) && parents[2].length === 3)) {
        throw new Error("JSXGraph: Can't create slope field with parent types " + "'" + typeof parents[0] + "', " + "'" + typeof parents[1] + "', " + "'" + typeof parents[2] + "'.");
    }
    f = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunction(parents[0], board, 'x, y');
    parents[0] = function(x, y) {
        var z = f(x, y), nrm = Math.sqrt(1 + z * z);
        return [
            1 / nrm,
            z / nrm
        ];
    };
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'slopefield');
    /**
     * @type {JXG.Curve}
     * @ignore
     */ el = board.create('vectorfield', parents, attr);
    el.elType = 'slopefield';
    /**
     * Set the defining functions of slope field.
     * @name Slopefield#setF
     * @function
     * @param {Function} func Function f(x, y) returning a number.
     * @returns {Object} Reference to the slope field object.
     *
     * @example
     * field.setF((x, y) => x * x + y * y);
     * board.update();
     *
     */ el.setF = function(func, varnames) {
        var f = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunction(func, el.board, varnames);
        /**
         * @ignore
         */ this.F = function(x, y) {
            var z = f(x, y), nrm = Math.sqrt(1 + z * z);
            return [
                1 / nrm,
                z / nrm
            ];
        };
    };
    el.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(el.methodMap, {
        setF: "setF"
    });
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("slopefield", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createSlopeField);
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/smartlabel.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Carsten Miller,
        Alfred Wassermann

    This file is part of JSXGraph.

    JSXGraph is free software dual licensed under the GNU LGPL or MIT License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License and
    the MIT License along with JSXGraph. If not, see <https://www.gnu.org/licenses/>
    and <https://opensource.org/licenses/MIT/>.
 */ /*global JXG: true, define: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview Implementation of smart labels..
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
;
;
;
/**
 * @class Customized text elements for displaying measurements of JSXGraph elements,
 * Examples are length of a
 * segment, perimeter or area of a circle or polygon (including polygonal chain),
 * slope of a line, value of an angle, and coordinates of a point.
 * <p>
 * If additionally a text, or a function is supplied and the content is not the empty string,
 * that text is displayed instead of the measurement.
 * <p>
 * Smartlabels use custom made CSS layouts defined in jsxgraph.css. Therefore, the inclusion of the file jsxgraph.css is mandatory or
 * the CSS classes have to be replaced by other classes.
 * <p>
 * The default attributes for smartlabels are defined for each type of measured element in the following sub-objects.
 * This is a deviation from the usual JSXGraph attribute usage.
 * <ul>
 *  <li> <tt>JXG.Options.smartlabelangle</tt> for smartlabels of angle objects
 *  <li> <tt>JXG.Options.smartlabelcircle</tt> for smartlabels of circle objects
 *  <li> <tt>JXG.Options.smartlabelline</tt> for smartlabels of line objects
 *  <li> <tt>JXG.Options.smartlabelpoint</tt> for smartlabels of point objects.
 *  <li> <tt>JXG.Options.smartlabelpolygon</tt> for smartlabels of polygon objects.
 * </ul>
 *
 *
 * @pseudo
 * @name Smartlabel
 * @augments JXG.Text
 * @constructor
 * @type JXG.Text
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.GeometryElement} Parent parent object: point, line, circle, polygon, angle.
 * @param {String|Function} Txt Optional text. In case, this content is not the empty string,
 *  the measurement is overwritten by this text.
 *
 * @example
 * var p1 = board.create('point', [3, 4], {showInfobox: false, withLabel: false});
 * board.create('smartlabel', [p1], {digits: 1, unit: 'm', dir: 'col', useMathJax: false});
 *
 * </pre><div id="JXG30cd1f9e-7e78-48f3-91a2-9abd466a754f" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG30cd1f9e-7e78-48f3-91a2-9abd466a754f',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var p1 = board.create('point', [3, 4], {showInfobox: false, withLabel: false});
 *     board.create('smartlabel', [p1], {digits: 1, unit: 'cm', dir: 'col', useMathJax: false});
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * var s1 = board.create('line', [[-7, 2], [6, -6]], {point1: {visible:true}, point2: {visible:true}});
 * board.create('smartlabel', [s1], {unit: 'm', measure: 'length', prefix: 'L = ', useMathJax: false});
 * board.create('smartlabel', [s1], {unit: 'm',  measure: 'slope', prefix: '&Delta; = ', useMathJax: false});
 *
 *
 * </pre><div id="JXGfb4423dc-ee3a-4122-a186-82123019a835" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGfb4423dc-ee3a-4122-a186-82123019a835',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var s1 = board.create('line', [[-7, 2], [6, -6]], {point1: {visible:true}, point2: {visible:true}});
 *     board.create('smartlabel', [s1], {unit: 'm', measure: 'length', prefix: 'L = ', useMathJax: false});
 *     board.create('smartlabel', [s1], {unit: 'm',  measure: 'slope', prefix: '&Delta; = ', useMathJax: false});
 *
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * var c1 = board.create('circle', [[0, 1], [4, 1]], {point2: {visible: true}});
 * board.create('smartlabel', [c1], {unit: 'm', measure: 'perimeter', prefix: 'U = ', useMathJax: false});
 * board.create('smartlabel', [c1], {unit: 'm', measure: 'area', prefix: 'A = ', useMathJax: false});
 * board.create('smartlabel', [c1], {unit: 'm', measure: 'radius', prefix: 'R = ', useMathJax: false});
 *
 *
 * </pre><div id="JXG763c4700-8273-4eb7-9ed9-1dc6c2c52e93" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG763c4700-8273-4eb7-9ed9-1dc6c2c52e93',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var c1 = board.create('circle', [[0, 1], [4, 1]], {point2: {visible: true}});
 *     board.create('smartlabel', [c1], {unit: 'm', measure: 'perimeter', prefix: 'U = ', useMathJax: false});
 *     board.create('smartlabel', [c1], {unit: 'm', measure: 'area', prefix: 'A = ', useMathJax: false});
 *     board.create('smartlabel', [c1], {unit: 'm', measure: 'radius', prefix: 'R = ', useMathJax: false});
 *
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * var p2 = board.create('polygon', [[-6, -5], [7, -7], [-4, 3]], {});
 * board.create('smartlabel', [p2], {
 *     unit: 'm',
 *     measure: 'area',
 *     prefix: 'A = ',
 *     cssClass: 'smart-label-pure smart-label-polygon',
 *     highlightCssClass: 'smart-label-pure smart-label-polygon',
 *     useMathJax: false
 * });
 * board.create('smartlabel', [p2, () => 'X: ' + p2.vertices[0].X().toFixed(1)], {
 *     measure: 'perimeter',
 *     cssClass: 'smart-label-outline smart-label-polygon',
 *     highlightCssClass: 'smart-label-outline smart-label-polygon',
 *     useMathJax: false
 * });
 *
 * </pre><div id="JXG376425ac-b4e5-41f2-979c-6ff32a01e9c8" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG376425ac-b4e5-41f2-979c-6ff32a01e9c8',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var p2 = board.create('polygon', [[-6, -5], [7, -7], [-4, 3]], {});
 *     board.create('smartlabel', [p2], {
 *         unit: 'm',
 *         measure: 'area',
 *         prefix: 'A = ',
 *         cssClass: 'smart-label-pure smart-label-polygon',
 *         highlightCssClass: 'smart-label-pure smart-label-polygon',
 *         useMathJax: false
 *     });
 *     board.create('smartlabel', [p2, () => 'X: ' + p2.vertices[0].X().toFixed(1)], {
 *         measure: 'perimeter',
 *         cssClass: 'smart-label-outline smart-label-polygon',
 *         highlightCssClass: 'smart-label-outline smart-label-polygon',
 *         useMathJax: false
 *     });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * var a1 = board.create('angle', [[1, -1], [1, 2], [1, 5]], {name: '&beta;', withLabel: false});
 * var sma = board.create('smartlabel', [a1], {digits: 1, prefix: a1.name + '=', unit: '°', useMathJax: false});
 *
 * </pre><div id="JXG48d6d1ae-e04a-45f4-a743-273976712c0b" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG48d6d1ae-e04a-45f4-a743-273976712c0b',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var a1 = board.create('angle', [[1, -1], [1, 2], [1, 5]], {name: '&beta;', withLabel: false});
 *     var sma = board.create('smartlabel', [a1], {digits: 1, prefix: a1.name + '=', unit: '°', useMathJax: false});
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createSmartLabel = function(board, parents, attributes) {
    var el, attr, p, user_supplied_text, getTextFun, txt_fun;
    if (parents.length === 0 || [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_POINT,
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE,
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CIRCLE
    ].indexOf(parents[0].elementClass) < 0 && [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON,
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_ANGLE
    ].indexOf(parents[0].type) < 0) {
        throw new Error("JSXGraph: Can't create smartlabel with parent types " + "'" + typeof parents[0] + "', " + "'" + typeof parents[1] + "'.");
    }
    p = parents[0];
    user_supplied_text = parents[1] || '';
    if (p.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_POINT) {
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'smartlabelpoint');
    } else if (p.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'smartlabelline');
        /**
         * @class
         * @ignore
         */ attr.rotate = function() {
            return Math.atan(p.getSlope()) * 180 / Math.PI;
        };
        /**
         * @class
         * @ignore
         */ attr.visible = function() {
            return p.L() < 1.5 ? false : true;
        };
    } else if (p.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CIRCLE) {
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'smartlabelcircle');
        /**
         * @class
         * @ignore
         */ attr.visible = function() {
            return p.Radius() < 1.5 ? false : true;
        };
    } else if (p.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON) {
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'smartlabelpolygon');
    } else if (p.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_ANGLE) {
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'smartlabelangle');
        /**
         * @class
         * @ignore
         */ attr.rotate = function() {
            var c1 = p.center.coords.usrCoords, c2 = p.getLabelAnchor().usrCoords, v = Math.atan2(c2[2] - c1[2], c2[1] - c1[1]) * 180 / Math.PI;
            return v > 90 && v < 270 ? v + 180 : v;
        };
        /**
         * @class
         * @ignore
         */ attr.anchorX = function() {
            var c1 = p.center.coords.usrCoords, c2 = p.getLabelAnchor().usrCoords, v = Math.atan2(c2[2] - c1[2], c2[1] - c1[1]) * 180 / Math.PI;
            return v > 90 && v < 270 ? 'right' : 'left';
        };
    }
    getTextFun = function(el, p, elType, mType) {
        var measure;
        switch(mType){
            case 'length':
                /**
                 * @ignore
                 */ measure = function() {
                    return p.L();
                };
                break;
            case 'slope':
                /**
                 * @ignore
                 */ measure = function() {
                    return p.Slope();
                };
                break;
            case 'area':
                /**
                 * @ignore
                 */ measure = function() {
                    return p.Area();
                };
                break;
            case 'radius':
                /**
                 * @ignore
                 */ measure = function() {
                    return p.Radius();
                };
                break;
            case 'perimeter':
                /**
                 * @ignore
                 */ measure = function() {
                    return p.Perimeter();
                };
                break;
            case 'rad':
                /**
                 * @ignore
                 */ measure = function() {
                    return p.Value();
                };
                break;
            case 'deg':
                /**
                 * @ignore
                 */ measure = function() {
                    return p.Value() * 180 / Math.PI;
                };
                break;
            default:
                /**
                 * @ignore
                 */ measure = function() {
                    return 0.0;
                };
        }
        return function() {
            var str = '', val, txt = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(user_supplied_text), digits = el.evalVisProp('digits'), u = el.evalVisProp('unit'), pre = el.evalVisProp('prefix'), suf = el.evalVisProp('suffix'), mj = el.evalVisProp('usemathjax') || el.evalVisProp('usekatex');
            if (txt === '') {
                if (el.useLocale()) {
                    val = el.formatNumberLocale(measure(), digits);
                } else {
                    val = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].toFixed(measure(), digits);
                }
                if (mj) {
                    str = [
                        '\\(',
                        pre,
                        val,
                        '\\,',
                        u,
                        suf,
                        '\\)'
                    ].join('');
                } else {
                    str = [
                        pre,
                        val,
                        u,
                        suf
                    ].join('');
                }
            } else {
                str = txt;
            }
            return str;
        };
    };
    if (p.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_POINT) {
        el = board.create('text', [
            function() {
                return p.X();
            },
            function() {
                return p.Y();
            },
            ''
        ], attr);
        txt_fun = function() {
            var str = '', txt = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(user_supplied_text), digits = el.evalVisProp('digits'), u = el.evalVisProp('unit'), pre = el.evalVisProp('prefix'), suf = el.evalVisProp('suffix'), dir = el.evalVisProp('dir'), mj = el.evalVisProp('usemathjax') || el.evalVisProp('usekatex'), x, y;
            if (el.useLocale()) {
                x = el.formatNumberLocale(p.X(), digits);
                y = el.formatNumberLocale(p.Y(), digits);
            } else {
                x = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].toFixed(p.X(), digits);
                y = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].toFixed(p.Y(), digits);
            }
            if (txt === '') {
                if (dir === 'row') {
                    if (mj) {
                        str = [
                            '\\(',
                            pre,
                            x,
                            '\\,',
                            u,
                            ' / ',
                            y,
                            '\\,',
                            u,
                            suf,
                            '\\)'
                        ].join('');
                    } else {
                        str = [
                            pre,
                            x,
                            ' ',
                            u,
                            ' / ',
                            y,
                            ' ',
                            u,
                            suf
                        ].join('');
                    }
                } else if (dir.indexOf('col') === 0) {
                    if (mj) {
                        str = [
                            '\\(',
                            pre,
                            '\\left(\\array{',
                            x,
                            '\\,',
                            u,
                            '\\\\ ',
                            y,
                            '\\,',
                            u,
                            '}\\right)',
                            suf,
                            '\\)'
                        ].join('');
                    } else {
                        str = [
                            pre,
                            x,
                            ' ',
                            u,
                            '<br/>',
                            y,
                            ' ',
                            u,
                            suf
                        ].join('');
                    }
                }
            } else {
                str = txt;
            }
            return str;
        };
    } else if (p.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
        if (attr.measure === 'length') {
            el = board.create('text', [
                function() {
                    return (p.point1.X() + p.point2.X()) * 0.5;
                },
                function() {
                    return (p.point1.Y() + p.point2.Y()) * 0.5;
                },
                ''
            ], attr);
            txt_fun = getTextFun(el, p, 'line', 'length');
        } else if (attr.measure === 'slope') {
            el = board.create('text', [
                function() {
                    return p.point1.X() * 0.25 + p.point2.X() * 0.75;
                },
                function() {
                    return p.point1.Y() * 0.25 + p.point2.Y() * 0.75;
                },
                ''
            ], attr);
            txt_fun = getTextFun(el, p, 'line', 'slope');
        }
    } else if (p.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CIRCLE) {
        if (attr.measure === 'radius') {
            el = board.create('text', [
                function() {
                    return p.center.X() + p.Radius() * 0.5;
                },
                function() {
                    return p.center.Y();
                },
                ''
            ], attr);
            txt_fun = getTextFun(el, p, 'circle', 'radius');
        } else if (attr.measure === 'area') {
            el = board.create('text', [
                function() {
                    return p.center.X();
                },
                function() {
                    return p.center.Y() + p.Radius() * 0.5;
                },
                ''
            ], attr);
            txt_fun = getTextFun(el, p, 'circle', 'area');
        } else if (attr.measure === 'circumference' || attr.measure === 'perimeter') {
            el = board.create('text', [
                function() {
                    return p.getLabelAnchor();
                },
                ''
            ], attr);
            txt_fun = getTextFun(el, p, 'circle', 'perimeter');
        }
    } else if (p.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON) {
        if (attr.measure === 'area') {
            el = board.create('text', [
                function() {
                    return p.getTextAnchor();
                },
                ''
            ], attr);
            txt_fun = getTextFun(el, p, 'polygon', 'area');
        } else if (attr.measure === 'perimeter') {
            el = board.create('text', [
                function() {
                    var last = p.borders.length - 1;
                    if (last >= 0) {
                        return [
                            (p.borders[last].point1.X() + p.borders[last].point2.X()) * 0.5,
                            (p.borders[last].point1.Y() + p.borders[last].point2.Y()) * 0.5
                        ];
                    } else {
                        return p.getTextAnchor();
                    }
                },
                ''
            ], attr);
            txt_fun = getTextFun(el, p, 'polygon', 'perimeter');
        }
    } else if (p.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_ANGLE) {
        el = board.create('text', [
            function() {
                return p.getLabelAnchor();
            },
            ''
        ], attr);
        txt_fun = getTextFun(el, p, 'angle', attr.measure);
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(el)) {
        el.setText(txt_fun);
        p.addChild(el);
        el.setParents([
            p
        ]);
    }
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("smartlabel", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createSmartLabel);
}),
];

//# sourceMappingURL=c0305_jsxgraph_src_element_6f2e7c32._.js.map