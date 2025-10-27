module.exports = [
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/view3d.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
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
        Lars Hofmann
        Leonhard Iser
        Vincent Kulicke
        Laura Rinas
 */ /*global JXG:true, define: true*/ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coords.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/numerics.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/env.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/element.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$composition$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/composition.js [app-ssr] (ecmascript)");
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
/**
 * 3D view inside a JXGraph board.
 *
 * @class Creates a new 3D view. Do not use this constructor to create a 3D view. Use {@link JXG.Board#create} with
 * type {@link View3D} instead.
 *
 * @augments JXG.GeometryElement
 * @param {Array} parents Array consisting of lower left corner [x, y] of the view inside the board, [width, height] of the view
 * and box size [[x1, x2], [y1,y2], [z1,z2]]. If the view's azimuth=0 and elevation=0, the 3D view will cover a rectangle with lower left corner
 * [x,y] and side lengths [w, h] of the board.
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].View3D = function(board, parents, attributes) {
    this.constructor(board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_VIEW3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_3D);
    /**
     * An associative array containing all geometric objects belonging to the view.
     * Key is the id of the object and value is a reference to the object.
     * @type Object
     * @private
     */ this.objects = {};
    /**
     * An array containing all the elements in the view that are sorted due to their depth order.
     * @Type Object
     * @private
     */ this.depthOrdered = {};
    /**
     * TODO: why deleted?
     * An array containing all geometric objects in this view in the order of construction.
     * @type Array
     * @private
     */ // this.objectsList = [];
    /**
     * An associative array / dictionary to store the objects of the board by name. The name of the object is the key and value is a reference to the object.
     * @type Object
     * @private
     */ this.elementsByName = {};
    /**
     * Default axes of the 3D view, contains the axes of the view or null.
     *
     * @type {Object}
     * @default null
     */ this.defaultAxes = null;
    /**
     * The Tait-Bryan angles specifying the view box orientation
     */ this.angles = {
        az: null,
        el: null,
        bank: null
    };
    /**
     * @type {Array}
     * The view box orientation matrix
     */ this.matrix3DRot = [
        [
            1,
            0,
            0,
            0
        ],
        [
            0,
            1,
            0,
            0
        ],
        [
            0,
            0,
            1,
            0
        ],
        [
            0,
            0,
            0,
            1
        ]
    ];
    // Used for z-index computation
    this.matrix3DRotShift = [
        [
            1,
            0,
            0,
            0
        ],
        [
            0,
            1,
            0,
            0
        ],
        [
            0,
            0,
            1,
            0
        ],
        [
            0,
            0,
            0,
            1
        ]
    ];
    /**
     * @type  {Array}
     * @private
     */ // 3D-to-2D transformation matrix
    this.matrix3D = [
        [
            1,
            0,
            0,
            0
        ],
        [
            0,
            1,
            0,
            0
        ],
        [
            0,
            0,
            1,
            0
        ]
    ];
    /**
     * The 4×4 matrix that maps box coordinates to camera coordinates. These
     * coordinate systems fit into the View3D coordinate atlas as follows.
     * <ul>
     * <li><b>World coordinates.</b> The coordinates used to specify object
     * positions in a JSXGraph scene.</li>
     * <li><b>Box coordinates.</b> The world coordinates translated to put the
     * center of the view box at the origin.
     * <li><b>Camera coordinates.</b> The coordinate system where the
     * <code>x</code>, <code>y</code> plane is the screen, the origin is the
     * center of the screen, and the <code>z</code> axis points out of the
     * screen, toward the viewer.
     * <li><b>Focal coordinates.</b> The camera coordinates translated to put
     * the origin at the focal point, which is set back from the screen by the
     * focal distance.</li>
     * </ul>
     * The <code>boxToCam</code> transformation is exposed to help 3D elements
     * manage their 2D representations in central projection mode. To map world
     * coordinates to focal coordinates, use the
     * {@link JXG.View3D#worldToFocal} method.
     * @type {Array}
     */ this.boxToCam = [];
    /**
     * @type array
     * @private
     */ // Lower left corner [x, y] of the 3D view if elevation and azimuth are set to 0.
    this.llftCorner = parents[0];
    /**
     * Width and height [w, h] of the 3D view if elevation and azimuth are set to 0.
     * @type array
     * @private
     */ this.size = parents[1];
    /**
     * Bounding box (cube) [[x1, x2], [y1,y2], [z1,z2]] of the 3D view
     * @type array
     */ this.bbox3D = parents[2];
    /**
     * The distance from the camera to the origin. In other words, the
     * radius of the sphere where the camera sits.
     * @type Number
     */ this.r = -1;
    /**
     * The distance from the camera to the screen. Computed automatically from
     * the `fov` property.
     * @type Number
     */ this.focalDist = -1;
    /**
     * Type of projection.
     * @type String
     */ // Will be set in update().
    this.projectionType = 'parallel';
    /**
     * Whether trackball navigation is currently enabled.
     * @type String
     */ this.trackballEnabled = false;
    this.timeoutAzimuth = null;
    this.zIndexMin = Infinity;
    this.zIndexMax = -Infinity;
    this.id = this.board.setId(this, 'V');
    this.board.finalizeAdding(this);
    this.elType = 'view3d';
    this.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(this.methodMap, {
    });
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].View3D.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].View3D.prototype, /** @lends JXG.View3D.prototype */ {
    /**
     * Creates a new 3D element of type elementType.
     * @param {String} elementType Type of the element to be constructed given as a string e.g. 'point3d' or 'surface3d'.
     * @param {Array} parents Array of parent elements needed to construct the element e.g. coordinates for a 3D point or two
     * 3D points to construct a line. This highly depends on the elementType that is constructed. See the corresponding JXG.create*
     * methods for a list of possible parameters.
     * @param {Object} [attributes] An object containing the attributes to be set. This also depends on the elementType.
     * Common attributes are name, visible, strokeColor.
     * @returns {Object} Reference to the created element. This is usually a GeometryElement3D, but can be an array containing
     * two or more elements.
     */ create: function(elementType, parents, attributes) {
        var prefix = [], el;
        if (elementType.indexOf('3d') > 0) {
            // is3D = true;
            prefix.push(this);
        }
        el = this.board.create(elementType, prefix.concat(parents), attributes);
        return el;
    },
    /**
     * Select a single or multiple elements at once.
     * @param {String|Object|function} str The name, id or a reference to a JSXGraph 3D element in the 3D view. An object will
     * be used as a filter to return multiple elements at once filtered by the properties of the object.
     * @param {Boolean} onlyByIdOrName If true (default:false) elements are only filtered by their id, name or groupId.
     * The advanced filters consisting of objects or functions are ignored.
     * @returns {JXG.GeometryElement3D|JXG.Composition}
     * @example
     * // select the element with name A
     * view.select('A');
     *
     * // select all elements with strokecolor set to 'red' (but not '#ff0000')
     * view.select({
     *   strokeColor: 'red'
     * });
     *
     * // select all points on or below the x/y plane and make them black.
     * view.select({
     *   elType: 'point3d',
     *   Z: function (v) {
     *     return v <= 0;
     *   }
     * }).setAttribute({color: 'black'});
     *
     * // select all elements
     * view.select(function (el) {
     *   return true;
     * });
     */ select: function(str, onlyByIdOrName) {
        var flist, olist, i, l, s = str;
        if (s === null) {
            return s;
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(s) && s !== '') {
            // It's a string, most likely an id or a name.
            // Search by ID
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.objects[s])) {
                s = this.objects[s];
            // Search by name
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.elementsByName[s])) {
                s = this.elementsByName[s];
            // // Search by group ID
            // } else if (Type.exists(this.groups[s])) {
            //     s = this.groups[s];
            }
        } else if (!onlyByIdOrName && (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(s) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isObject(s) && !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(s.setAttribute))) {
            // It's a function or an object, but not an element
            flist = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].filterElements(this.objectsList, s);
            olist = {};
            l = flist.length;
            for(i = 0; i < l; i++){
                olist[flist[i].id] = flist[i];
            }
            s = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$composition$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](olist);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isObject(s) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(s.id) && !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.objects[s.id])) {
            // It's an element which has been deleted (and still hangs around, e.g. in an attractor list)
            s = null;
        }
        return s;
    },
    // set the Tait-Bryan angles to specify the current view rotation matrix
    setAnglesFromRotation: function() {
        var rem = this.matrix3DRot, rBank, cosBank, sinBank, cosEl, sinEl, cosAz, sinAz;
        // extract bank by rotating the view box z axis onto the camera yz plane
        rBank = Math.sqrt(rem[1][3] * rem[1][3] + rem[2][3] * rem[2][3]);
        if (rBank > __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps) {
            cosBank = rem[2][3] / rBank;
            sinBank = rem[1][3] / rBank;
        } else {
            // if the z axis is pointed almost exactly at the screen, we
            // keep the current bank value
            cosBank = Math.cos(this.angles.bank);
            sinBank = Math.sin(this.angles.bank);
        }
        rem = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matMatMult([
            [
                1,
                0,
                0,
                0
            ],
            [
                0,
                cosBank,
                -sinBank,
                0
            ],
            [
                0,
                sinBank,
                cosBank,
                0
            ],
            [
                0,
                0,
                0,
                1
            ]
        ], rem);
        this.angles.bank = Math.atan2(sinBank, cosBank);
        // extract elevation by rotating the view box z axis onto the camera
        // y axis
        cosEl = rem[2][3];
        sinEl = rem[3][3];
        rem = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matMatMult([
            [
                1,
                0,
                0,
                0
            ],
            [
                0,
                1,
                0,
                0
            ],
            [
                0,
                0,
                cosEl,
                sinEl
            ],
            [
                0,
                0,
                -sinEl,
                cosEl
            ]
        ], rem);
        this.angles.el = Math.atan2(sinEl, cosEl);
        // extract azimuth
        cosAz = -rem[1][1];
        sinAz = rem[3][1];
        this.angles.az = Math.atan2(sinAz, cosAz);
        if (this.angles.az < 0) this.angles.az += 2 * Math.PI;
        this.setSlidersFromAngles();
    },
    anglesHaveMoved: function() {
        return this._hasMoveAz || this._hasMoveEl || Math.abs(this.angles.az - this.az_slide.Value()) > __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps || Math.abs(this.angles.el - this.el_slide.Value()) > __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps || Math.abs(this.angles.bank - this.bank_slide.Value()) > __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps;
    },
    getAnglesFromSliders: function() {
        this.angles.az = this.az_slide.Value();
        this.angles.el = this.el_slide.Value();
        this.angles.bank = this.bank_slide.Value();
    },
    setSlidersFromAngles: function() {
        this.az_slide.setValue(this.angles.az);
        this.el_slide.setValue(this.angles.el);
        this.bank_slide.setValue(this.angles.bank);
    },
    // return the rotation matrix specified by the current Tait-Bryan angles
    getRotationFromAngles: function() {
        var a, e, b, f, cosBank, sinBank, mat = [
            [
                1,
                0,
                0,
                0
            ],
            [
                0,
                1,
                0,
                0
            ],
            [
                0,
                0,
                1,
                0
            ],
            [
                0,
                0,
                0,
                1
            ]
        ];
        // mat projects homogeneous 3D coords in View3D
        // to homogeneous 2D coordinates in the board
        a = this.angles.az;
        e = this.angles.el;
        b = this.angles.bank;
        f = -Math.sin(e);
        mat[1][1] = -Math.cos(a);
        mat[1][2] = Math.sin(a);
        mat[1][3] = 0;
        mat[2][1] = f * Math.sin(a);
        mat[2][2] = f * Math.cos(a);
        mat[2][3] = Math.cos(e);
        mat[3][1] = Math.cos(e) * Math.sin(a);
        mat[3][2] = Math.cos(e) * Math.cos(a);
        mat[3][3] = Math.sin(e);
        cosBank = Math.cos(b);
        sinBank = Math.sin(b);
        mat = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matMatMult([
            [
                1,
                0,
                0,
                0
            ],
            [
                0,
                cosBank,
                sinBank,
                0
            ],
            [
                0,
                -sinBank,
                cosBank,
                0
            ],
            [
                0,
                0,
                0,
                1
            ]
        ], mat);
        return mat;
    /* this code, originally from `_updateCentralProjection`, is an
         * alternate implementation of the azimuth-elevation matrix
         * computation above. using this implementation instead of the
         * current one might lead to simpler code in a future refactoring
        var a, e, up,
            ax, ay, az, v, nrm,
            eye, d,
            func_sphere;

        // finds the point on the unit sphere with the given azimuth and
        // elevation, and returns its affine coordinates
        func_sphere = function (az, el) {
            return [
                Math.cos(az) * Math.cos(el),
                -Math.sin(az) * Math.cos(el),
                Math.sin(el)
            ];
        };

        a = this.az_slide.Value() + (3 * Math.PI * 0.5); // Sphere
        e = this.el_slide.Value();

        // create an up vector and an eye vector which are 90 degrees out of phase
        up = func_sphere(a, e + Math.PI / 2);
        eye = func_sphere(a, e);
        d = [eye[0], eye[1], eye[2]];

        nrm = Mat.norm(d, 3);
        az = [d[0] / nrm, d[1] / nrm, d[2] / nrm];

        nrm = Mat.norm(up, 3);
        v = [up[0] / nrm, up[1] / nrm, up[2] / nrm];

        ax = Mat.crossProduct(v, az);
        ay = Mat.crossProduct(az, ax);

        this.matrix3DRot[1] = [0, ax[0], ax[1], ax[2]];
        this.matrix3DRot[2] = [0, ay[0], ay[1], ay[2]];
        this.matrix3DRot[3] = [0, az[0], az[1], az[2]];
         */ },
    /**
     * Project 2D point (x,y) to the virtual trackpad sphere,
     * see Bell's virtual trackpad, and return z-component of the
     * number.
     *
     * @param {Number} r
     * @param {Number} x
     * @param {Number} y
     * @returns Number
     * @private
     */ _projectToSphere: function(r, x, y) {
        var d = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(x, y), t, z;
        if (d < r * 0.7071067811865475) {
            z = Math.sqrt(r * r - d * d);
        } else {
            t = r / 1.414213562373095;
            z = t * t / d;
        }
        return z;
    },
    /**
     * Determine 4x4 rotation matrix with Bell's virtual trackball.
     *
     * @returns {Array} 4x4 rotation matrix
     * @private
     */ updateProjectionTrackball: function(Pref) {
        var R = 100, dx, dy, dr2, p1, p2, x, y, theta, t, d, c, s, n, mat = [
            [
                1,
                0,
                0,
                0
            ],
            [
                0,
                1,
                0,
                0
            ],
            [
                0,
                0,
                1,
                0
            ],
            [
                0,
                0,
                0,
                1
            ]
        ];
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this._trackball)) {
            return this.matrix3DRot;
        }
        dx = this._trackball.dx;
        dy = this._trackball.dy;
        dr2 = dx * dx + dy * dy;
        if (dr2 > __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps) {
            // // Method by Hanson, "The rolling ball", Graphics Gems III, p.51
            // // Rotation axis:
            // //     n = (-dy/dr, dx/dr, 0)
            // // Rotation angle around n:
            // //     theta = atan(dr / R) approx dr / R
            // dr = Math.sqrt(dr2);
            // c = R / Math.hypot(R, dr);  // cos(theta)
            // t = 1 - c;                  // 1 - cos(theta)
            // s = dr / Math.hypot(R, dr); // sin(theta)
            // n = [-dy / dr, dx / dr, 0];
            // Bell virtual trackpad, see
            // https://opensource.apple.com/source/X11libs/X11libs-60/mesa/Mesa-7.8.2/progs/util/trackball.c.auto.html
            // http://scv.bu.edu/documentation/presentations/visualizationworkshop08/materials/opengl/trackball.c.
            // See also Henriksen, Sporring, Hornaek, "Virtual Trackballs revisited".
            //
            R = (this.size[0] * this.board.unitX + this.size[1] * this.board.unitY) * 0.25;
            x = this._trackball.x;
            y = this._trackball.y;
            p2 = [
                x,
                y,
                this._projectToSphere(R, x, y)
            ];
            x -= dx;
            y -= dy;
            p1 = [
                x,
                y,
                this._projectToSphere(R, x, y)
            ];
            n = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct(p1, p2);
            d = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(n[0], n[1], n[2]);
            n[0] /= d;
            n[1] /= d;
            n[2] /= d;
            t = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(p2, p1, 3) / (2 * R);
            t = t > 1.0 ? 1.0 : t;
            t = t < -1.0 ? -1.0 : t;
            theta = 2.0 * Math.asin(t);
            c = Math.cos(theta);
            t = 1 - c;
            s = Math.sin(theta);
            // Rotation by theta about the axis n. See equation 9.63 of
            //
            //   Ian Richard Cole. "Modeling CPV" (thesis). Loughborough
            //   University. https://hdl.handle.net/2134/18050
            //
            mat[1][1] = c + n[0] * n[0] * t;
            mat[2][1] = n[1] * n[0] * t + n[2] * s;
            mat[3][1] = n[2] * n[0] * t - n[1] * s;
            mat[1][2] = n[0] * n[1] * t - n[2] * s;
            mat[2][2] = c + n[1] * n[1] * t;
            mat[3][2] = n[2] * n[1] * t + n[0] * s;
            mat[1][3] = n[0] * n[2] * t + n[1] * s;
            mat[2][3] = n[1] * n[2] * t - n[0] * s;
            mat[3][3] = c + n[2] * n[2] * t;
        }
        mat = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matMatMult(mat, this.matrix3DRot);
        return mat;
    },
    updateAngleSliderBounds: function() {
        var az_smax, az_smin, el_smax, el_smin, el_cover, el_smid, el_equiv, el_flip_equiv, el_equiv_loss, el_flip_equiv_loss, el_interval_loss, bank_smax, bank_smin;
        // update stored trackball toggle
        this.trackballEnabled = this.evalVisProp('trackball.enabled');
        // set slider bounds
        if (this.trackballEnabled) {
            this.az_slide.setMin(0);
            this.az_slide.setMax(2 * Math.PI);
            this.el_slide.setMin(-0.5 * Math.PI);
            this.el_slide.setMax(0.5 * Math.PI);
            this.bank_slide.setMin(-Math.PI);
            this.bank_slide.setMax(Math.PI);
        } else {
            this.az_slide.setMin(this.visProp.az.slider.min);
            this.az_slide.setMax(this.visProp.az.slider.max);
            this.el_slide.setMin(this.visProp.el.slider.min);
            this.el_slide.setMax(this.visProp.el.slider.max);
            this.bank_slide.setMin(this.visProp.bank.slider.min);
            this.bank_slide.setMax(this.visProp.bank.slider.max);
        }
        // get new slider bounds
        az_smax = this.az_slide._smax;
        az_smin = this.az_slide._smin;
        el_smax = this.el_slide._smax;
        el_smin = this.el_slide._smin;
        bank_smax = this.bank_slide._smax;
        bank_smin = this.bank_slide._smin;
        // wrap and restore angle values
        if (this.trackballEnabled) {
            // if we're upside-down, flip the bank angle to reach the same
            // orientation with an elevation between -pi/2 and pi/2
            el_cover = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].mod(this.angles.el, 2 * Math.PI);
            if (0.5 * Math.PI < el_cover && el_cover < 1.5 * Math.PI) {
                this.angles.el = Math.PI - el_cover;
                this.angles.az = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].wrap(this.angles.az + Math.PI, az_smin, az_smax);
                this.angles.bank = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].wrap(this.angles.bank + Math.PI, bank_smin, bank_smax);
            }
            // wrap the azimuth and bank angle
            this.angles.az = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].wrap(this.angles.az, az_smin, az_smax);
            this.angles.el = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].wrap(this.angles.el, el_smin, el_smax);
            this.angles.bank = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].wrap(this.angles.bank, bank_smin, bank_smax);
        } else {
            // wrap and clamp the elevation into the slider range. if
            // flipping the elevation gets us closer to the slider interval,
            // do that, inverting the azimuth and bank angle to compensate
            el_interval_loss = function(t) {
                if (t < el_smin) {
                    return el_smin - t;
                } else if (el_smax < t) {
                    return t - el_smax;
                } else {
                    return 0;
                }
            };
            el_smid = 0.5 * (el_smin + el_smax);
            el_equiv = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].wrap(this.angles.el, el_smid - Math.PI, el_smid + Math.PI);
            el_flip_equiv = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].wrap(Math.PI - this.angles.el, el_smid - Math.PI, el_smid + Math.PI);
            el_equiv_loss = el_interval_loss(el_equiv);
            el_flip_equiv_loss = el_interval_loss(el_flip_equiv);
            if (el_equiv_loss <= el_flip_equiv_loss) {
                this.angles.el = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].clamp(el_equiv, el_smin, el_smax);
            } else {
                this.angles.el = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].clamp(el_flip_equiv, el_smin, el_smax);
                this.angles.az = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].wrap(this.angles.az + Math.PI, az_smin, az_smax);
                this.angles.bank = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].wrap(this.angles.bank + Math.PI, bank_smin, bank_smax);
            }
            // wrap and clamp the azimuth and bank angle into the slider range
            this.angles.az = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].wrapAndClamp(this.angles.az, az_smin, az_smax, 2 * Math.PI);
            this.angles.bank = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].wrapAndClamp(this.angles.bank, bank_smin, bank_smax, 2 * Math.PI);
            // since we're using `clamp`, angles may have changed
            this.matrix3DRot = this.getRotationFromAngles();
        }
        // restore slider positions
        this.setSlidersFromAngles();
    },
    /**
     * @private
     * @returns {Array}
     */ _updateCentralProjection: function() {
        var zf = 20, zn = 8, // See https://www.mathematik.uni-marburg.de/~thormae/lectures/graphics1/graphics_6_1_eng_web.html
        // bbox3D is always at the world origin, i.e. T_obj is the unit matrix.
        // All vectors contain affine coordinates and have length 3
        // The matrices are of size 4x4.
        r, A;
        // set distance from view box center to camera
        r = this.evalVisProp('r');
        if (r === 'auto') {
            r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(this.bbox3D[0][0] - this.bbox3D[0][1], this.bbox3D[1][0] - this.bbox3D[1][1], this.bbox3D[2][0] - this.bbox3D[2][1]) * 1.01;
        }
        // compute camera transformation
        // this.boxToCam = this.matrix3DRot.map((row) => row.slice());
        this.boxToCam = this.matrix3DRot.map(function(row) {
            return row.slice();
        });
        this.boxToCam[3][0] = -r;
        // compute focal distance and clip space transformation
        this.focalDist = 1 / Math.tan(0.5 * this.evalVisProp('fov'));
        A = [
            [
                0,
                0,
                0,
                -1
            ],
            [
                0,
                this.focalDist,
                0,
                0
            ],
            [
                0,
                0,
                this.focalDist,
                0
            ],
            [
                2 * zf * zn / (zn - zf),
                0,
                0,
                (zf + zn) / (zn - zf)
            ]
        ];
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matMatMult(A, this.boxToCam);
    },
    // Update 3D-to-2D transformation matrix with the actual azimuth and elevation angles.
    update: function() {
        var r = this.r, stretch = [
            [
                1,
                0,
                0,
                0
            ],
            [
                0,
                -r,
                0,
                0
            ],
            [
                0,
                0,
                -r,
                0
            ],
            [
                0,
                0,
                0,
                1
            ]
        ], mat2D, objectToClip, size, dx, dy;
        // objectsList;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.el_slide) || !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.az_slide) || !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.bank_slide) || !this.needsUpdate) {
            this.needsUpdate = false;
            return this;
        }
        mat2D = [
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
        ];
        this.projectionType = this.evalVisProp('projection').toLowerCase();
        // override angle slider bounds when trackball navigation is enabled
        if (this.trackballEnabled !== this.evalVisProp('trackball.enabled')) {
            this.updateAngleSliderBounds();
        }
        if (this._hasMoveTrackball) {
            // The trackball has been moved since the last update, so we do
            // trackball navigation. When the trackball is enabled, a drag
            // event is interpreted as a trackball movement unless it's
            // caught by something else, like point dragging. When the
            // trackball is disabled, the trackball movement flag should
            // never be set
            this.matrix3DRot = this.updateProjectionTrackball();
            this.setAnglesFromRotation();
        } else if (this.anglesHaveMoved()) {
            // The trackball hasn't been moved since the last up date, but
            // the Tait-Bryan angles have been, so we do angle navigation
            this.getAnglesFromSliders();
            this.matrix3DRot = this.getRotationFromAngles();
        }
        /**
         * The translation that moves the center of the view box to the origin.
         */ this.shift = [
            [
                1,
                0,
                0,
                0
            ],
            [
                -0.5 * (this.bbox3D[0][0] + this.bbox3D[0][1]),
                1,
                0,
                0
            ],
            [
                -0.5 * (this.bbox3D[1][0] + this.bbox3D[1][1]),
                0,
                1,
                0
            ],
            [
                -0.5 * (this.bbox3D[2][0] + this.bbox3D[2][1]),
                0,
                0,
                1
            ]
        ];
        switch(this.projectionType){
            case 'central':
                // Add a final transformation to scale and shift the projection
                // on the board, usually called viewport.
                size = 2 * 0.4;
                mat2D[1][1] = this.size[0] / size; // w / d_x
                mat2D[2][2] = this.size[1] / size; // h / d_y
                mat2D[1][0] = this.llftCorner[0] + mat2D[1][1] * 0.5 * size; // llft_x
                mat2D[2][0] = this.llftCorner[1] + mat2D[2][2] * 0.5 * size; // llft_y
                // The transformations this.matrix3D and mat2D can not be combined at this point,
                // since the projected vectors have to be normalized in between in project3DTo2D
                this.viewPortTransform = mat2D;
                objectToClip = this._updateCentralProjection();
                // this.matrix3D is a 4x4 matrix
                this.matrix3D = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matMatMult(objectToClip, this.shift);
                break;
            case 'parallel':
            default:
                // Add a final transformation to scale and shift the projection
                // on the board, usually called viewport.
                dx = this.bbox3D[0][1] - this.bbox3D[0][0];
                dy = this.bbox3D[1][1] - this.bbox3D[1][0];
                mat2D[1][1] = this.size[0] / dx; // w / d_x
                mat2D[2][2] = this.size[1] / dy; // h / d_y
                mat2D[1][0] = this.llftCorner[0] + mat2D[1][1] * 0.5 * dx; // llft_x
                mat2D[2][0] = this.llftCorner[1] + mat2D[2][2] * 0.5 * dy; // llft_y
                // Combine all transformations, this.matrix3D is a 3x4 matrix
                this.matrix3D = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matMatMult(mat2D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matMatMult(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matMatMult(this.matrix3DRot, stretch), this.shift).slice(0, 3));
        }
        // Used for zIndex in dept ordering in subsequent update methods of the
        // 3D elements and in view3d.updateRenderer
        this.matrix3DRotShift = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matMatMult(this.matrix3DRot, this.shift);
        return this;
    },
    /**
     * Compares 3D elements according to their z-Index.
     * @param {JXG.GeometryElement3D} a
     * @param {JXG.GeometryElement3D} b
     * @returns Number
     */ compareDepth: function(a, b) {
        // return a.zIndex - b.zIndex;
        // if (a.type !== Const.OBJECT_TYPE_PLANE3D && b.type !== Const.OBJECT_TYPE_PLANE3D) {
        //     return a.zIndex - b.zIndex;
        // } else if (a.type === Const.OBJECT_TYPE_PLANE3D) {
        //     let bHesse = Mat.innerProduct(a.point.coords, a.normal, 4);
        //     let po = Mat.innerProduct(b.coords, a.normal, 4);
        //     let pos = Mat.innerProduct(this.boxToCam[3], a.normal, 4);
        // console.log(this.boxToCam[3])
        //     return pos - po;
        // } else if (b.type === Const.OBJECT_TYPE_PLANE3D) {
        //     let bHesse = Mat.innerProduct(b.point.coords, b.normal, 4);
        //     let po = Mat.innerProduct(a.coords, a.normal, 4);
        //     let pos = Mat.innerProduct(this.boxToCam[3], b.normal, 4);
        //     console.log('b', pos, po, bHesse)
        //     return -pos;
        // }
        return a.zIndex - b.zIndex;
    },
    updateZIndices: function() {
        var id, el;
        for(id in this.objects){
            if (this.objects.hasOwnProperty(id)) {
                el = this.objects[id];
                // Update zIndex of less frequent objects line3d and polygon3d
                // The other elements (point3d, face3d) do this in their update method.
                if ((el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_LINE3D || el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON3D) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(el.element2D) && el.element2D.evalVisProp('visible')) {
                    el.updateZIndex();
                }
            }
        }
    },
    updateShaders: function() {
        var id, el, v;
        for(id in this.objects){
            if (this.objects.hasOwnProperty(id)) {
                el = this.objects[id];
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(el.shader)) {
                    v = el.shader();
                    if (v < this.zIndexMin) {
                        this.zIndexMin = v;
                    } else if (v > this.zIndexMax) {
                        this.zIndexMax = v;
                    }
                }
            }
        }
    },
    updateDepthOrdering: function() {
        var id, el, i, j, l, layers, lay;
        // Collect elements for depth ordering layer-wise
        layers = this.evalVisProp('depthorder.layers');
        for(i = 0; i < layers.length; i++){
            this.depthOrdered[layers[i]] = [];
        }
        for(id in this.objects){
            if (this.objects.hasOwnProperty(id)) {
                el = this.objects[id];
                if ((el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_FACE3D || el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_LINE3D || // el.type === Const.OBJECT_TYPE_PLANE3D ||
                el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POINT3D || el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON3D) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(el.element2D) && el.element2D.evalVisProp('visible')) {
                    lay = el.element2D.evalVisProp('layer');
                    if (layers.indexOf(lay) >= 0) {
                        this.depthOrdered[lay].push(el);
                    }
                }
            }
        }
        if (this.board.renderer && this.board.renderer.type === 'svg') {
            for(i = 0; i < layers.length; i++){
                lay = layers[i];
                this.depthOrdered[lay].sort(this.compareDepth.bind(this));
                // DEBUG
                // if (this.depthOrdered[lay].length > 0) {
                //     for (let k = 0; k < this.depthOrdered[lay].length; k++) {
                //         let o = this.depthOrdered[lay][k]
                //         console.log(o.visProp.fillcolor, o.zIndex)
                //     }
                // }
                l = this.depthOrdered[lay];
                for(j = 0; j < l.length; j++){
                    this.board.renderer.setLayer(l[j].element2D, lay);
                }
            // this.depthOrdered[lay].forEach((el) => this.board.renderer.setLayer(el.element2D, lay));
            // Attention: forEach prevents deleting an element
            }
        }
        return this;
    },
    updateRenderer: function() {
        if (!this.needsUpdate) {
            return this;
        }
        // console.time("update")
        // Handle depth ordering
        this.depthOrdered = {};
        if (this.shift !== undefined && this.evalVisProp('depthorder.enabled')) {
            // Update the zIndices of certain element types.
            // We do it here in updateRenderer, because the elements' positions
            // are meanwhile updated.
            this.updateZIndices();
            this.updateShaders();
            if (this.board.renderer && this.board.renderer.type === 'svg') {
                // For SVG we update the DOM order
                // In canvas we sort the elements in board.updateRendererCanvas
                this.updateDepthOrdering();
            }
        }
        // console.timeEnd("update")
        this.needsUpdate = false;
        return this;
    },
    removeObject: function(object, saveMethod) {
        var i, el;
        // this.board.removeObject(object, saveMethod);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(object)) {
            for(i = 0; i < object.length; i++){
                this.removeObject(object[i]);
            }
            return this;
        }
        object = this.select(object);
        // // If the object which is about to be removed unknown or a string, do nothing.
        // // it is a string if a string was given and could not be resolved to an element.
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(object) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(object)) {
            return this;
        }
        try {
            // Remove all children.
            for(el in object.childElements){
                if (object.childElements.hasOwnProperty(el)) {
                    this.removeObject(object.childElements[el]);
                }
            }
            delete this.objects[object.id];
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].debug('View3D ' + object.id + ': Could not be removed: ' + e);
        }
        // this.update();
        this.board.removeObject(object, saveMethod);
        return this;
    },
    /**
     * Map world coordinates to focal coordinates. These coordinate systems
     * are explained in the {@link JXG.View3D#boxToCam} matrix
     * documentation.
     *
     * @param {Array} pWorld A world space point, in homogeneous coordinates.
     * @param {Boolean} [homog=true] Whether to return homogeneous coordinates.
     * If false, projects down to ordinary coordinates.
     */ worldToFocal: function(pWorld, homog = true) {
        var k, pView = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(this.boxToCam, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(this.shift, pWorld));
        pView[3] -= pView[0] * this.focalDist;
        if (homog) {
            return pView;
        } else {
            for(k = 1; k < 4; k++){
                pView[k] /= pView[0];
            }
            return pView.slice(1, 4);
        }
    },
    /**
     * Project 3D coordinates to 2D board coordinates
     * The 3D coordinates are provides as three numbers x, y, z or one array of length 3.
     *
     * @param  {Number|Array} x
     * @param  {Number[]} y
     * @param  {Number[]} z
     * @returns {Array} Array of length 3 containing the projection on to the board
     * in homogeneous user coordinates.
     */ project3DTo2D: function(x, y, z) {
        var vec, w;
        if (arguments.length === 3) {
            vec = [
                1,
                x,
                y,
                z
            ];
        } else {
            // Argument is an array
            if (x.length === 3) {
                // vec = [1].concat(x);
                vec = x.slice();
                vec.unshift(1);
            } else {
                vec = x;
            }
        }
        w = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(this.matrix3D, vec);
        switch(this.projectionType){
            case 'central':
                w[1] /= w[0];
                w[2] /= w[0];
                w[3] /= w[0];
                w[0] /= w[0];
                return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(this.viewPortTransform, w.slice(0, 3));
            case 'parallel':
            default:
                return w;
        }
    },
    /**
     * We know that v2d * w0 = mat * (1, x, y, d)^T where v2d = (1, b, c, h)^T with unknowns w0, h, x, y.
     * Setting R = mat^(-1) gives
     *   1/ w0 * (1, x, y, d)^T = R * v2d.
     * The first and the last row of this equation allows to determine 1/w0 and h.
     *
     * @param {Array} mat
     * @param {Array} v2d
     * @param {Number} d
     * @returns Array
     * @private
     */ _getW0: function(mat, v2d, d) {
        var R = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].inverse(mat), R1 = R[0][0] + v2d[1] * R[0][1] + v2d[2] * R[0][2], R2 = R[3][0] + v2d[1] * R[3][1] + v2d[2] * R[3][2], w, h, det;
        det = d * R[0][3] - R[3][3];
        w = (R2 * R[0][3] - R1 * R[3][3]) / det;
        h = (R2 - R1 * d) / det;
        return [
            1 / w,
            h
        ];
    },
    /**
     * Project a 2D coordinate to the plane defined by point "foot"
     * and the normal vector `normal`.
     *
     * @param  {JXG.Point} point2d
     * @param  {Array} normal Normal of plane
     * @param  {Array} foot Foot point of plane
     * @returns {Array} of length 4 containing the projected
     * point in homogeneous coordinates.
     */ project2DTo3DPlane: function(point2d, normal, foot) {
        var mat, rhs, d, le, sol, f = foot.slice(1) || [
            0,
            0,
            0
        ], n = normal.slice(1), v2d, w0, res;
        le = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].norm(n, 3);
        d = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(f, n, 3) / le;
        if (this.projectionType === 'parallel') {
            mat = this.matrix3D.slice(0, 3); // Copy each row by reference
            mat.push([
                0,
                n[0],
                n[1],
                n[2]
            ]);
            // 2D coordinates of point
            rhs = point2d.coords.usrCoords.slice();
            rhs.push(d);
            try {
                // Prevent singularity in case elevation angle is zero
                if (mat[2][3] === 1.0) {
                    mat[2][1] = mat[2][2] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps * 0.001;
                }
                sol = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Numerics.Gauss(mat, rhs);
            } catch (e) {
                sol = [
                    0,
                    NaN,
                    NaN,
                    NaN
                ];
            }
        } else {
            mat = this.matrix3D;
            // 2D coordinates of point:
            rhs = point2d.coords.usrCoords.slice();
            v2d = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Numerics.Gauss(this.viewPortTransform, rhs);
            res = this._getW0(mat, v2d, d);
            w0 = res[0];
            rhs = [
                v2d[0] * w0,
                v2d[1] * w0,
                v2d[2] * w0,
                res[1] * w0
            ];
            try {
                // Prevent singularity in case elevation angle is zero
                if (mat[2][3] === 1.0) {
                    mat[2][1] = mat[2][2] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps * 0.001;
                }
                sol = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Numerics.Gauss(mat, rhs);
                sol[1] /= sol[0];
                sol[2] /= sol[0];
                sol[3] /= sol[0];
                // sol[3] = d;
                sol[0] /= sol[0];
            } catch (err) {
                sol = [
                    0,
                    NaN,
                    NaN,
                    NaN
                ];
            }
        }
        return sol;
    },
    /**
     * Project a point on the screen to the nearest point, in screen
     * distance, on a line segment in 3d space. The inputs must be in
     * ordinary coordinates, but the output is in homogeneous coordinates.
     *
     * @param {Array} pScr The screen coordinates of the point to project.
     * @param {Array} end0 The world space coordinates of one end of the
     * line segment.
     * @param {Array} end1 The world space coordinates of the other end of
     * the line segment.
     *
     * @returns Homogeneous coordinates of the projection
     */ projectScreenToSegment: function(pScr, end0, end1) {
        var end0_2d = this.project3DTo2D(end0).slice(1, 3), end1_2d = this.project3DTo2D(end1).slice(1, 3), dir_2d = [
            end1_2d[0] - end0_2d[0],
            end1_2d[1] - end0_2d[1]
        ], dir_2d_norm_sq = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(dir_2d, dir_2d), diff = [
            pScr[0] - end0_2d[0],
            pScr[1] - end0_2d[1]
        ], s = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(diff, dir_2d) / dir_2d_norm_sq, mid, mid_2d, mid_diff, m, t, t_clamped, t_clamped_co;
        if (this.projectionType === 'central') {
            mid = [
                0.5 * (end0[0] + end1[0]),
                0.5 * (end0[1] + end1[1]),
                0.5 * (end0[2] + end1[2])
            ];
            mid_2d = this.project3DTo2D(mid).slice(1, 3);
            mid_diff = [
                mid_2d[0] - end0_2d[0],
                mid_2d[1] - end0_2d[1]
            ];
            m = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(mid_diff, dir_2d) / dir_2d_norm_sq;
            // the view-space affine parameter s is related to the
            // screen-space affine parameter t by a Möbius transformation,
            // which is determined by the following relations:
            //
            // s | t
            // -----
            // 0 | 0
            // m | 1/2
            // 1 | 1
            //
            t = (1 - m) * s / ((1 - 2 * m) * s + m);
        } else {
            t = s;
        }
        t_clamped = Math.min(Math.max(t, 0), 1);
        t_clamped_co = 1 - t_clamped;
        return [
            1,
            t_clamped_co * end0[0] + t_clamped * end1[0],
            t_clamped_co * end0[1] + t_clamped * end1[1],
            t_clamped_co * end0[2] + t_clamped * end1[2]
        ];
    },
    /**
     * Project a 2D coordinate to a new 3D position by keeping
     * the 3D x, y coordinates and changing only the z coordinate.
     * All horizontal moves of the 2D point are ignored.
     *
     * @param {JXG.Point} point2d
     * @param {Array} base_c3d
     * @returns {Array} of length 4 containing the projected
     * point in homogeneous coordinates.
     */ project2DTo3DVertical: function(point2d, base_c3d) {
        var pScr = point2d.coords.usrCoords.slice(1, 3), end0 = [
            base_c3d[1],
            base_c3d[2],
            this.bbox3D[2][0]
        ], end1 = [
            base_c3d[1],
            base_c3d[2],
            this.bbox3D[2][1]
        ];
        return this.projectScreenToSegment(pScr, end0, end1);
    },
    /**
     * Limit 3D coordinates to the bounding cube.
     *
     * @param {Array} c3d 3D coordinates [x,y,z]
     * @returns Array [Array, Boolean] containing [coords, corrected]. coords contains the updated 3D coordinates,
     * correct is true if the coords have been changed.
     */ project3DToCube: function(c3d) {
        var cube = this.bbox3D, isOut = false;
        if (c3d[1] < cube[0][0]) {
            c3d[1] = cube[0][0];
            isOut = true;
        }
        if (c3d[1] > cube[0][1]) {
            c3d[1] = cube[0][1];
            isOut = true;
        }
        if (c3d[2] < cube[1][0]) {
            c3d[2] = cube[1][0];
            isOut = true;
        }
        if (c3d[2] > cube[1][1]) {
            c3d[2] = cube[1][1];
            isOut = true;
        }
        if (c3d[3] <= cube[2][0]) {
            c3d[3] = cube[2][0];
            isOut = true;
        }
        if (c3d[3] >= cube[2][1]) {
            c3d[3] = cube[2][1];
            isOut = true;
        }
        return [
            c3d,
            isOut
        ];
    },
    /**
     * Intersect a ray with the bounding cube of the 3D view.
     * @param {Array} p 3D coordinates [w,x,y,z]
     * @param {Array} dir 3D direction vector of the line (array of length 3 or 4)
     * @param {Number} r direction of the ray (positive if r > 0, negative if r < 0).
     * @returns Affine ratio of the intersection of the line with the cube.
     */ intersectionLineCube: function(p, dir, r) {
        var r_n, i, r0, r1, d;
        d = dir.length === 3 ? dir : dir.slice(1);
        r_n = r;
        for(i = 0; i < 3; i++){
            if (d[i] !== 0) {
                r0 = (this.bbox3D[i][0] - p[i + 1]) / d[i];
                r1 = (this.bbox3D[i][1] - p[i + 1]) / d[i];
                if (r < 0) {
                    r_n = Math.max(r_n, Math.min(r0, r1));
                } else {
                    r_n = Math.min(r_n, Math.max(r0, r1));
                }
            }
        }
        return r_n;
    },
    /**
     * Test if coordinates are inside of the bounding cube.
     * @param {array} p 3D coordinates [[w],x,y,z] of a point.
     * @returns Boolean
     */ isInCube: function(p, polyhedron) {
        var q;
        if (p.length === 4) {
            if (p[0] === 0) {
                return false;
            }
            q = p.slice(1);
        }
        return q[0] > this.bbox3D[0][0] - __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps && q[0] < this.bbox3D[0][1] + __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps && q[1] > this.bbox3D[1][0] - __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps && q[1] < this.bbox3D[1][1] + __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps && q[2] > this.bbox3D[2][0] - __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps && q[2] < this.bbox3D[2][1] + __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps;
    },
    /**
     *
     * @param {JXG.Plane3D} plane1
     * @param {JXG.Plane3D} plane2
     * @param {Number} d Right hand side of Hesse normal for plane2 (it can be adjusted)
     * @returns {Array} of length 2 containing the coordinates of the defining points of
     * of the intersection segment, or false if there is no intersection
     */ intersectionPlanePlane: function(plane1, plane2, d) {
        var ret = [
            false,
            false
        ], p, q, r, w, dir;
        d = d || plane2.d;
        // Get one point of the intersection of the two planes
        w = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct(plane1.normal.slice(1), plane2.normal.slice(1));
        w.unshift(0);
        p = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Geometry.meet3Planes(plane1.normal, plane1.d, plane2.normal, d, w, 0);
        // Get the direction of the intersecting line of the two planes
        dir = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Geometry.meetPlanePlane(plane1.vec1, plane1.vec2, plane2.vec1, plane2.vec2);
        // Get the bounding points of the intersecting segment
        r = this.intersectionLineCube(p, dir, Infinity);
        q = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].axpy(r, dir, p);
        if (this.isInCube(q)) {
            ret[0] = q;
        }
        r = this.intersectionLineCube(p, dir, -Infinity);
        q = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].axpy(r, dir, p);
        if (this.isInCube(q)) {
            ret[1] = q;
        }
        return ret;
    },
    intersectionPlaneFace: function(plane, face) {
        var ret = [], j, t, p, crds, p1, p2, c, f, le, x1, y1, x2, y2, dir, vec, w, mat = [], b = [], sol;
        w = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct(plane.normal.slice(1), face.normal.slice(1));
        w.unshift(0);
        // Get one point of the intersection of the two planes
        p = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].meet3Planes(plane.normal, plane.d, face.normal, face.d, w, 0);
        // Get the direction the intersecting line of the two planes
        dir = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].meetPlanePlane(plane.vec1, plane.vec2, face.vec1, face.vec2);
        f = face.polyhedron.faces[face.faceNumber];
        crds = face.polyhedron.coords;
        le = f.length;
        for(j = 1; j <= le; j++){
            p1 = crds[f[j - 1]];
            p2 = crds[f[j % le]];
            vec = [
                0,
                p2[1] - p1[1],
                p2[2] - p1[2],
                p2[3] - p1[3]
            ];
            x1 = Math.random();
            y1 = Math.random();
            x2 = Math.random();
            y2 = Math.random();
            mat = [
                [
                    x1 * dir[1] + y1 * dir[3],
                    x1 * -vec[1] + y1 * -vec[3]
                ],
                [
                    x2 * dir[2] + y2 * dir[3],
                    x2 * -vec[2] + y2 * -vec[3]
                ]
            ];
            b = [
                x1 * (p1[1] - p[1]) + y1 * (p1[3] - p[3]),
                x2 * (p1[2] - p[2]) + y2 * (p1[3] - p[3])
            ];
            sol = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Gauss(mat, b);
            t = sol[1];
            if (t > -__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps && t < 1 + __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps) {
                c = [
                    1,
                    p1[1] + t * vec[1],
                    p1[2] + t * vec[2],
                    p1[3] + t * vec[3]
                ];
                ret.push(c);
            }
        }
        return ret;
    },
    // TODO:
    // - handle non-closed polyhedra
    // - handle intersections in vertex, edge, plane
    intersectionPlanePolyhedron: function(plane, phdr) {
        var i, j, seg, p, first, pos, pos_akt, eps = 1e-12, points = [], x = [], y = [], z = [];
        for(i = 0; i < phdr.numberFaces; i++){
            if (phdr.def.faces[i].length < 3) {
                continue;
            }
            // seg will be an array consisting of two points
            // that span the intersecting segment of the plane
            // and the face.
            seg = this.intersectionPlaneFace(plane, phdr.faces[i]);
            // Plane intersects the face in less than 2 points
            if (seg.length < 2) {
                continue;
            }
            if (seg[0].length === 4 && seg[1].length === 4) {
                // This test is necessary to filter out intersection lines which are
                // identical to intersections of axis planes (they would occur twice),
                // i.e. edges of bbox3d.
                for(j = 0; j < points.length; j++){
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(seg[0], points[j][0], 4) < eps && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(seg[1], points[j][1], 4) < eps || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(seg[0], points[j][1], 4) < eps && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(seg[1], points[j][0], 4) < eps) {
                        break;
                    }
                }
                if (j === points.length) {
                    points.push(seg.slice());
                }
            }
        }
        // Handle the case that the intersection is the empty set.
        if (points.length === 0) {
            return {
                X: x,
                Y: y,
                Z: z
            };
        }
        // Concatenate the intersection points to a polygon.
        // If all went well, each intersection should appear
        // twice in the list.
        // __Attention:__ each face has to be planar!!!
        // Otherwise the algorithm will fail.
        first = 0;
        pos = first;
        i = 0;
        do {
            p = points[pos][i];
            if (p.length === 4) {
                x.push(p[1]);
                y.push(p[2]);
                z.push(p[3]);
            }
            i = (i + 1) % 2;
            p = points[pos][i];
            pos_akt = pos;
            for(j = 0; j < points.length; j++){
                if (j !== pos && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(p, points[j][0]) < eps) {
                    pos = j;
                    i = 0;
                    break;
                }
                if (j !== pos && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(p, points[j][1]) < eps) {
                    pos = j;
                    i = 1;
                    break;
                }
            }
            if (pos === pos_akt) {
                console.log('Error face3d intersection update: did not find next', pos, i);
                break;
            }
        }while (pos !== first)
        x.push(x[0]);
        y.push(y[0]);
        z.push(z[0]);
        return {
            X: x,
            Y: y,
            Z: z
        };
    },
    /**
     * Generate mesh for a surface / plane.
     * Returns array [dataX, dataY] for a JSXGraph curve's updateDataArray function.
     * @param {Array|Function} func
     * @param {Array} interval_u
     * @param {Array} interval_v
     * @returns Array
     * @private
     *
     * @example
     *  var el = view.create('curve', [[], []]);
     *  el.updateDataArray = function () {
     *      var steps_u = this.evalVisProp('stepsu'),
     *           steps_v = this.evalVisProp('stepsv'),
     *           r_u = Type.evaluate(this.range_u),
     *           r_v = Type.evaluate(this.range_v),
     *           func, ret;
     *
     *      if (this.F !== null) {
     *          func = this.F;
     *      } else {
     *          func = [this.X, this.Y, this.Z];
     *      }
     *      ret = this.view.getMesh(func,
     *          r_u.concat([steps_u]),
     *          r_v.concat([steps_v]));
     *
     *      this.dataX = ret[0];
     *      this.dataY = ret[1];
     *  };
     *
     */ getMesh: function(func, interval_u, interval_v) {
        var i_u, i_v, u, v, c2d, delta_u, delta_v, p = [
            0,
            0,
            0
        ], steps_u = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(interval_u[2]), steps_v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(interval_v[2]), dataX = [], dataY = [];
        delta_u = (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(interval_u[1]) - __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(interval_u[0])) / steps_u;
        delta_v = (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(interval_v[1]) - __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(interval_v[0])) / steps_v;
        for(i_u = 0; i_u <= steps_u; i_u++){
            u = interval_u[0] + delta_u * i_u;
            for(i_v = 0; i_v <= steps_v; i_v++){
                v = interval_v[0] + delta_v * i_v;
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(func)) {
                    p = func(u, v);
                } else {
                    p = [
                        func[0](u, v),
                        func[1](u, v),
                        func[2](u, v)
                    ];
                }
                c2d = this.project3DTo2D(p);
                dataX.push(c2d[1]);
                dataY.push(c2d[2]);
            }
            dataX.push(NaN);
            dataY.push(NaN);
        }
        for(i_v = 0; i_v <= steps_v; i_v++){
            v = interval_v[0] + delta_v * i_v;
            for(i_u = 0; i_u <= steps_u; i_u++){
                u = interval_u[0] + delta_u * i_u;
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(func)) {
                    p = func(u, v);
                } else {
                    p = [
                        func[0](u, v),
                        func[1](u, v),
                        func[2](u, v)
                    ];
                }
                c2d = this.project3DTo2D(p);
                dataX.push(c2d[1]);
                dataY.push(c2d[2]);
            }
            dataX.push(NaN);
            dataY.push(NaN);
        }
        return [
            dataX,
            dataY
        ];
    },
    /**
     *
     */ animateAzimuth: function() {
        var s = this.az_slide._smin, e = this.az_slide._smax, sdiff = e - s, newVal = this.az_slide.Value() + 0.1;
        this.az_slide.position = (newVal - s) / sdiff;
        if (this.az_slide.position > 1) {
            this.az_slide.position = 0.0;
        }
        this.board._change3DView = true;
        this.board.update();
        this.board._change3DView = false;
        this.timeoutAzimuth = setTimeout((function() {
            this.animateAzimuth();
        }).bind(this), 200);
    },
    /**
     *
     */ stopAzimuth: function() {
        clearTimeout(this.timeoutAzimuth);
        this.timeoutAzimuth = null;
    },
    /**
     * Check if vertical dragging is enabled and which action is needed.
     * Default is shiftKey.
     *
     * @returns Boolean
     * @private
     */ isVerticalDrag: function() {
        var b = this.board, key;
        if (!this.evalVisProp('verticaldrag.enabled')) {
            return false;
        }
        key = '_' + this.evalVisProp('verticaldrag.key') + 'Key';
        return b[key];
    },
    /**
     * Sets camera view to the given values.
     *
     * @param {Number} az Value of azimuth.
     * @param {Number} el Value of elevation.
     * @param {Number} [r] Value of radius.
     *
     * @returns {Object} Reference to the view.
     */ setView: function(az, el, r) {
        r = r || this.r;
        this.az_slide.setValue(az);
        this.el_slide.setValue(el);
        this.r = r;
        this.board.update();
        return this;
    },
    /**
     * Changes view to the next view stored in the attribute `values`.
     *
     * @see View3D#values
     *
     * @returns {Object} Reference to the view.
     */ nextView: function() {
        var views = this.evalVisProp('values'), n = this.visProp._currentview;
        n = (n + 1) % views.length;
        this.setCurrentView(n);
        return this;
    },
    /**
     * Changes view to the previous view stored in the attribute `values`.
     *
     * @see View3D#values
     *
     * @returns {Object} Reference to the view.
     */ previousView: function() {
        var views = this.evalVisProp('values'), n = this.visProp._currentview;
        n = (n + views.length - 1) % views.length;
        this.setCurrentView(n);
        return this;
    },
    /**
     * Changes view to the determined view stored in the attribute `values`.
     *
     * @see View3D#values
     *
     * @param {Number} n Index of view in attribute `values`.
     * @returns {Object} Reference to the view.
     */ setCurrentView: function(n) {
        var views = this.evalVisProp('values');
        if (n < 0 || n >= views.length) {
            n = (n % views.length + views.length) % views.length;
        }
        this.setView(views[n][0], views[n][1], views[n][2]);
        this.visProp._currentview = n;
        return this;
    },
    /**
     * Controls the navigation in az direction using either the keyboard or a pointer.
     *
     * @private
     *
     * @param {event} evt either the keydown or the pointer event
     * @returns view
     */ _azEventHandler: function(evt) {
        var smax = this.az_slide._smax, smin = this.az_slide._smin, speed = (smax - smin) / this.board.canvasWidth * this.evalVisProp('az.pointer.speed'), delta = evt.movementX, az = this.az_slide.Value(), el = this.el_slide.Value();
        // Doesn't allow navigation if another moving event is triggered
        if (this.board.mode === this.board.BOARD_MODE_DRAG) {
            return this;
        }
        // Calculate new az value if keyboard events are triggered
        // Plus if right-button, minus if left-button
        if (this.evalVisProp('az.keyboard.enabled')) {
            if (evt.key === 'ArrowRight') {
                az = az + this.evalVisProp('az.keyboard.step') * Math.PI / 180;
            } else if (evt.key === 'ArrowLeft') {
                az = az - this.evalVisProp('az.keyboard.step') * Math.PI / 180;
            }
        }
        if (this.evalVisProp('az.pointer.enabled') && delta !== 0 && evt.key == null) {
            az += delta * speed;
        }
        // Project the calculated az value to a usable value in the interval [smin,smax]
        // Use modulo if continuous is true
        if (this.evalVisProp('az.continuous')) {
            az = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].wrap(az, smin, smax);
        } else {
            if (az > 0) {
                az = Math.min(smax, az);
            } else if (az < 0) {
                az = Math.max(smin, az);
            }
        }
        this.setView(az, el);
        return this;
    },
    /**
     * Controls the navigation in el direction using either the keyboard or a pointer.
     *
     * @private
     *
     * @param {event} evt either the keydown or the pointer event
     * @returns view
     */ _elEventHandler: function(evt) {
        var smax = this.el_slide._smax, smin = this.el_slide._smin, speed = (smax - smin) / this.board.canvasHeight * this.evalVisProp('el.pointer.speed'), delta = evt.movementY, az = this.az_slide.Value(), el = this.el_slide.Value();
        // Doesn't allow navigation if another moving event is triggered
        if (this.board.mode === this.board.BOARD_MODE_DRAG) {
            return this;
        }
        // Calculate new az value if keyboard events are triggered
        // Plus if down-button, minus if up-button
        if (this.evalVisProp('el.keyboard.enabled')) {
            if (evt.key === 'ArrowUp') {
                el = el - this.evalVisProp('el.keyboard.step') * Math.PI / 180;
            } else if (evt.key === 'ArrowDown') {
                el = el + this.evalVisProp('el.keyboard.step') * Math.PI / 180;
            }
        }
        if (this.evalVisProp('el.pointer.enabled') && delta !== 0 && evt.key == null) {
            el += delta * speed;
        }
        // Project the calculated el value to a usable value in the interval [smin,smax]
        // Use modulo if continuous is true and the trackball is disabled
        if (this.evalVisProp('el.continuous') && !this.trackballEnabled) {
            el = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].wrap(el, smin, smax);
        } else {
            if (el > 0) {
                el = Math.min(smax, el);
            } else if (el < 0) {
                el = Math.max(smin, el);
            }
        }
        this.setView(az, el);
        return this;
    },
    /**
     * Controls the navigation in bank direction using either the keyboard or a pointer.
     *
     * @private
     *
     * @param {event} evt either the keydown or the pointer event
     * @returns view
     */ _bankEventHandler: function(evt) {
        var smax = this.bank_slide._smax, smin = this.bank_slide._smin, step, speed, delta = evt.deltaY, bank = this.bank_slide.Value();
        // Doesn't allow navigation if another moving event is triggered
        if (this.board.mode === this.board.BOARD_MODE_DRAG) {
            return this;
        }
        // Calculate new bank value if keyboard events are triggered
        // Plus if down-button, minus if up-button
        if (this.evalVisProp('bank.keyboard.enabled')) {
            step = this.evalVisProp('bank.keyboard.step') * Math.PI / 180;
            if (evt.key === '.' || evt.key === '<') {
                bank -= step;
            } else if (evt.key === ',' || evt.key === '>') {
                bank += step;
            }
        }
        if (this.evalVisProp('bank.pointer.enabled') && delta !== 0 && evt.key == null) {
            speed = (smax - smin) / this.board.canvasHeight * this.evalVisProp('bank.pointer.speed');
            bank += delta * speed;
            // prevent the pointer wheel from scrolling the page
            evt.preventDefault();
        }
        // Project the calculated bank value to a usable value in the interval [smin,smax]
        if (this.evalVisProp('bank.continuous')) {
            // in continuous mode, wrap value around slider range
            bank = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].wrap(bank, smin, smax);
        } else {
            // in non-continuous mode, clamp value to slider range
            bank = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].clamp(bank, smin, smax);
        }
        this.bank_slide.setValue(bank);
        this.board.update();
        return this;
    },
    /**
     * Controls the navigation using either virtual trackball.
     *
     * @private
     *
     * @param {event} evt either the keydown or the pointer event
     * @returns view
     */ _trackballHandler: function(evt) {
        var pos = this.board.getMousePosition(evt), x, y, center;
        center = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
            this.llftCorner[0] + this.size[0] * 0.5,
            this.llftCorner[1] + this.size[1] * 0.5
        ], this.board);
        x = pos[0] - center.scrCoords[1];
        y = pos[1] - center.scrCoords[2];
        this._trackball = {
            dx: evt.movementX,
            dy: -evt.movementY,
            x: x,
            y: -y
        };
        this.board.update();
        return this;
    },
    /**
     * Event handler for pointer down event. Triggers handling of all 3D navigation.
     *
     * @private
     * @param {event} evt
     * @returns view
     */ pointerDownHandler: function(evt) {
        var neededButton, neededKey, target;
        this._hasMoveAz = false;
        this._hasMoveEl = false;
        this._hasMoveBank = false;
        this._hasMoveTrackball = false;
        if (this.board.mode !== this.board.BOARD_MODE_NONE) {
            return;
        }
        this.board._change3DView = true;
        if (this.evalVisProp('trackball.enabled')) {
            neededButton = this.evalVisProp('trackball.button');
            neededKey = this.evalVisProp('trackball.key');
            // Move events for virtual trackball
            if ((neededButton === -1 || neededButton === evt.button) && (neededKey === 'none' || neededKey.indexOf('shift') > -1 && evt.shiftKey || neededKey.indexOf('ctrl') > -1 && evt.ctrlKey)) {
                // If outside is true then the event listener is bound to the document, otherwise to the div
                target = this.evalVisProp('trackball.outside') ? document : this.board.containerObj;
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].addEvent(target, 'pointermove', this._trackballHandler, this);
                this._hasMoveTrackball = true;
            }
        } else {
            if (this.evalVisProp('az.pointer.enabled')) {
                neededButton = this.evalVisProp('az.pointer.button');
                neededKey = this.evalVisProp('az.pointer.key');
                // Move events for azimuth
                if ((neededButton === -1 || neededButton === evt.button) && (neededKey === 'none' || neededKey.indexOf('shift') > -1 && evt.shiftKey || neededKey.indexOf('ctrl') > -1 && evt.ctrlKey)) {
                    // If outside is true then the event listener is bound to the document, otherwise to the div
                    target = this.evalVisProp('az.pointer.outside') ? document : this.board.containerObj;
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].addEvent(target, 'pointermove', this._azEventHandler, this);
                    this._hasMoveAz = true;
                }
            }
            if (this.evalVisProp('el.pointer.enabled')) {
                neededButton = this.evalVisProp('el.pointer.button');
                neededKey = this.evalVisProp('el.pointer.key');
                // Events for elevation
                if ((neededButton === -1 || neededButton === evt.button) && (neededKey === 'none' || neededKey.indexOf('shift') > -1 && evt.shiftKey || neededKey.indexOf('ctrl') > -1 && evt.ctrlKey)) {
                    // If outside is true then the event listener is bound to the document, otherwise to the div
                    target = this.evalVisProp('el.pointer.outside') ? document : this.board.containerObj;
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].addEvent(target, 'pointermove', this._elEventHandler, this);
                    this._hasMoveEl = true;
                }
            }
            if (this.evalVisProp('bank.pointer.enabled')) {
                neededButton = this.evalVisProp('bank.pointer.button');
                neededKey = this.evalVisProp('bank.pointer.key');
                // Events for bank
                if ((neededButton === -1 || neededButton === evt.button) && (neededKey === 'none' || neededKey.indexOf('shift') > -1 && evt.shiftKey || neededKey.indexOf('ctrl') > -1 && evt.ctrlKey)) {
                    // If `outside` is true, we bind the event listener to
                    // the document. otherwise, we bind it to the div. we
                    // register the event listener as active so it can
                    // prevent the pointer wheel from scrolling the page
                    target = this.evalVisProp('bank.pointer.outside') ? document : this.board.containerObj;
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].addEvent(target, 'wheel', this._bankEventHandler, this, {
                        passive: false
                    });
                    this._hasMoveBank = true;
                }
            }
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].addEvent(document, 'pointerup', this.pointerUpHandler, this);
    },
    /**
     * Event handler for pointer up event. Triggers handling of all 3D navigation.
     *
     * @private
     * @param {event} evt
     * @returns view
     */ pointerUpHandler: function(evt) {
        var target;
        if (this._hasMoveAz) {
            target = this.evalVisProp('az.pointer.outside') ? document : this.board.containerObj;
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].removeEvent(target, 'pointermove', this._azEventHandler, this);
            this._hasMoveAz = false;
        }
        if (this._hasMoveEl) {
            target = this.evalVisProp('el.pointer.outside') ? document : this.board.containerObj;
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].removeEvent(target, 'pointermove', this._elEventHandler, this);
            this._hasMoveEl = false;
        }
        if (this._hasMoveBank) {
            target = this.evalVisProp('bank.pointer.outside') ? document : this.board.containerObj;
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].removeEvent(target, 'wheel', this._bankEventHandler, this);
            this._hasMoveBank = false;
        }
        if (this._hasMoveTrackball) {
            target = this.evalVisProp('trackball.outside') ? document : this.board.containerObj;
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].removeEvent(target, 'pointermove', this._trackballHandler, this);
            this._hasMoveTrackball = false;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].removeEvent(document, 'pointerup', this.pointerUpHandler, this);
        this.board._change3DView = false;
    }
});
/**
 * @class A View3D element provides the container and the methods to create and display 3D elements.
 * @pseudo
 * @description  A View3D element provides the container and the methods to create and display 3D elements.
 * It is contained in a JSXGraph board.
 * <p>
 * It is advisable to disable panning of the board by setting the board attribute "pan":
 * <pre>
 *   pan: {enabled: false}
 * </pre>
 * Otherwise users will not be able to rotate the scene with their fingers on a touch device.
 * <p>
 * The start position of the camera can be adjusted by the attributes {@link View3D#az}, {@link View3D#el}, and {@link View3D#bank}.
 *
 * @name View3D
 * @augments JXG.View3D
 * @constructor
 * @type Object
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {Array_Array_Array} lower,dim,cube  Here, lower is an array of the form [x, y] and
 * dim is an array of the form [w, h].
 * The arrays [x, y] and [w, h] define the 2D frame into which the 3D cube is
 * (roughly) projected. If the view's azimuth=0 and elevation=0, the 3D view will cover a rectangle with lower left corner
 * [x,y] and side lengths [w, h] of the board.
 * The array 'cube' is of the form [[x1, x2], [y1, y2], [z1, z2]]
 * which determines the coordinate ranges of the 3D cube.
 *
 * @example
 *     var bound = [-4, 6];
 *     var view = board.create('view3d',
 *         [[-4, -3], [8, 8],
 *         [bound, bound, bound]],
 *         {
 *             projection: 'parallel',
 *             trackball: {enabled:true},
 *         });
 *
 *     var curve = view.create('curve3d', [
 *         (t) => (2 + Math.cos(3 * t)) * Math.cos(2 * t),
 *         (t) => (2 + Math.cos(3 * t)) * Math.sin(2 * t),
 *         (t) => Math.sin(3 * t),
 *         [-Math.PI, Math.PI]
 *     ], { strokeWidth: 4 });
 *
 * </pre><div id="JXG9b327a6c-1bd6-4e40-a502-59d024dbfd1b" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG9b327a6c-1bd6-4e40-a502-59d024dbfd1b',
 *             {boundingbox: [-8, 8, 8,-8], pan: {enabled: false}, axis: false, showcopyright: false, shownavigation: false});
 *         var bound = [-4, 6];
 *         var view = board.create('view3d',
 *             [[-4, -3], [8, 8],
 *             [bound, bound, bound]],
 *             {
 *                 projection: 'parallel',
 *                 trackball: {enabled:true},
 *             });
 *
 *         var curve = view.create('curve3d', [
 *             (t) => (2 + Math.cos(3 * t)) * Math.cos(2 * t),
 *             (t) => (2 + Math.cos(3 * t)) * Math.sin(2 * t),
 *             (t) => Math.sin(3 * t),
 *             [-Math.PI, Math.PI]
 *         ], { strokeWidth: 4 });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 *     var bound = [-4, 6];
 *     var view = board.create('view3d',
 *         [[-4, -3], [8, 8],
 *         [bound, bound, bound]],
 *         {
 *             projection: 'central',
 *             trackball: {enabled:true},
 *
 *             xPlaneRear: { visible: false },
 *             yPlaneRear: { visible: false }
 *
 *         });
 *
 *     var curve = view.create('curve3d', [
 *         (t) => (2 + Math.cos(3 * t)) * Math.cos(2 * t),
 *         (t) => (2 + Math.cos(3 * t)) * Math.sin(2 * t),
 *         (t) => Math.sin(3 * t),
 *         [-Math.PI, Math.PI]
 *     ], { strokeWidth: 4 });
 *
 * </pre><div id="JXG0dc2493d-fb2f-40d5-bdb8-762ba0ad2007" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG0dc2493d-fb2f-40d5-bdb8-762ba0ad2007',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, pan: {enabled: false}, showcopyright: false, shownavigation: false});
 *         var bound = [-4, 6];
 *         var view = board.create('view3d',
 *             [[-4, -3], [8, 8],
 *             [bound, bound, bound]],
 *             {
 *                 projection: 'central',
 *                 trackball: {enabled:true},
 *
 *                 xPlaneRear: { visible: false },
 *                 yPlaneRear: { visible: false }
 *
 *             });
 *
 *         var curve = view.create('curve3d', [
 *             (t) => (2 + Math.cos(3 * t)) * Math.cos(2 * t),
 *             (t) => (2 + Math.cos(3 * t)) * Math.sin(2 * t),
 *             (t) => Math.sin(3 * t),
 *             [-Math.PI, Math.PI]
 *         ], { strokeWidth: 4 });
 *
 *     })();
 *
 * </script><pre>
 *
* @example
 *     var bound = [-4, 6];
 *     var view = board.create('view3d',
 *         [[-4, -3], [8, 8],
 *         [bound, bound, bound]],
 *         {
 *             projection: 'central',
 *             trackball: {enabled:true},
 *
 *             // Main axes
 *             axesPosition: 'border',
 *
 *             // Axes at the border
 *             xAxisBorder: { ticks3d: { ticksDistance: 2} },
 *             yAxisBorder: { ticks3d: { ticksDistance: 2} },
 *             zAxisBorder: { ticks3d: { ticksDistance: 2} },
 *
 *             // No axes on planes
 *             xPlaneRearYAxis: {visible: false},
 *             xPlaneRearZAxis: {visible: false},
 *             yPlaneRearXAxis: {visible: false},
 *             yPlaneRearZAxis: {visible: false},
 *             zPlaneRearXAxis: {visible: false},
 *             zPlaneRearYAxis: {visible: false}
 *         });
 *
 *     var curve = view.create('curve3d', [
 *         (t) => (2 + Math.cos(3 * t)) * Math.cos(2 * t),
 *         (t) => (2 + Math.cos(3 * t)) * Math.sin(2 * t),
 *         (t) => Math.sin(3 * t),
 *         [-Math.PI, Math.PI]
 *     ], { strokeWidth: 4 });
 *
 * </pre><div id="JXG586f3551-335c-47e9-8d72-835409f6a103" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG586f3551-335c-47e9-8d72-835409f6a103',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, pan: {enabled: false}, showcopyright: false, shownavigation: false});
 *         var bound = [-4, 6];
 *         var view = board.create('view3d',
 *             [[-4, -3], [8, 8],
 *             [bound, bound, bound]],
 *             {
 *                 projection: 'central',
 *                 trackball: {enabled:true},
 *
 *                 // Main axes
 *                 axesPosition: 'border',
 *
 *                 // Axes at the border
 *                 xAxisBorder: { ticks3d: { ticksDistance: 2} },
 *                 yAxisBorder: { ticks3d: { ticksDistance: 2} },
 *                 zAxisBorder: { ticks3d: { ticksDistance: 2} },
 *
 *                 // No axes on planes
 *                 xPlaneRearYAxis: {visible: false},
 *                 xPlaneRearZAxis: {visible: false},
 *                 yPlaneRearXAxis: {visible: false},
 *                 yPlaneRearZAxis: {visible: false},
 *                 zPlaneRearXAxis: {visible: false},
 *                 zPlaneRearYAxis: {visible: false}
 *             });
 *
 *         var curve = view.create('curve3d', [
 *             (t) => (2 + Math.cos(3 * t)) * Math.cos(2 * t),
 *             (t) => (2 + Math.cos(3 * t)) * Math.sin(2 * t),
 *             (t) => Math.sin(3 * t),
 *             [-Math.PI, Math.PI]
 *         ], { strokeWidth: 4 });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 *     var bound = [-4, 6];
 *     var view = board.create('view3d',
 *         [[-4, -3], [8, 8],
 *         [bound, bound, bound]],
 *         {
 *             projection: 'central',
 *             trackball: {enabled:true},
 *
 *             axesPosition: 'none'
 *         });
 *
 *     var curve = view.create('curve3d', [
 *         (t) => (2 + Math.cos(3 * t)) * Math.cos(2 * t),
 *         (t) => (2 + Math.cos(3 * t)) * Math.sin(2 * t),
 *         (t) => Math.sin(3 * t),
 *         [-Math.PI, Math.PI]
 *     ], { strokeWidth: 4 });
 *
 * </pre><div id="JXG9a9467e1-f189-4c8c-adb2-d4f49bc7fa26" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG9a9467e1-f189-4c8c-adb2-d4f49bc7fa26',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, pan: {enabled: false}, showcopyright: false, shownavigation: false});
 *         var bound = [-4, 6];
 *         var view = board.create('view3d',
 *             [[-4, -3], [8, 8],
 *             [bound, bound, bound]],
 *             {
 *                 projection: 'central',
 *                 trackball: {enabled:true},
 *
 *                 axesPosition: 'none'
 *             });
 *
 *         var curve = view.create('curve3d', [
 *             (t) => (2 + Math.cos(3 * t)) * Math.cos(2 * t),
 *             (t) => (2 + Math.cos(3 * t)) * Math.sin(2 * t),
 *             (t) => Math.sin(3 * t),
 *             [-Math.PI, Math.PI]
 *         ], { strokeWidth: 4 });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 *     var bound = [-4, 6];
 *     var view = board.create('view3d',
 *         [[-4, -3], [8, 8],
 *         [bound, bound, bound]],
 *         {
 *             projection: 'central',
 *             trackball: {enabled:true},
 *
 *             // Main axes
 *             axesPosition: 'border',
 *
 *             // Axes at the border
 *             xAxisBorder: { ticks3d: { ticksDistance: 2} },
 *             yAxisBorder: { ticks3d: { ticksDistance: 2} },
 *             zAxisBorder: { ticks3d: { ticksDistance: 2} },
 *
 *             xPlaneRear: {
 *                 fillColor: '#fff',
 *                 mesh3d: {visible: false}
 *             },
 *             yPlaneRear: {
 *                 fillColor: '#fff',
 *                 mesh3d: {visible: false}
 *             },
 *             zPlaneRear: {
 *                 fillColor: '#fff',
 *                 mesh3d: {visible: false}
 *             },
 *             xPlaneFront: {
 *                 visible: true,
 *                 fillColor: '#fff',
 *                 mesh3d: {visible: false}
 *             },
 *             yPlaneFront: {
 *                 visible: true,
 *                 fillColor: '#fff',
 *                 mesh3d: {visible: false}
 *             },
 *             zPlaneFront: {
 *                 visible: true,
 *                 fillColor: '#fff',
 *                 mesh3d: {visible: false}
 *             },
 *
 *             // No axes on planes
 *             xPlaneRearYAxis: {visible: false},
 *             xPlaneRearZAxis: {visible: false},
 *             yPlaneRearXAxis: {visible: false},
 *             yPlaneRearZAxis: {visible: false},
 *             zPlaneRearXAxis: {visible: false},
 *             zPlaneRearYAxis: {visible: false},
 *             xPlaneFrontYAxis: {visible: false},
 *             xPlaneFrontZAxis: {visible: false},
 *             yPlaneFrontXAxis: {visible: false},
 *             yPlaneFrontZAxis: {visible: false},
 *             zPlaneFrontXAxis: {visible: false},
 *             zPlaneFrontYAxis: {visible: false}
 *
 *         });
 *
 *     var curve = view.create('curve3d', [
 *         (t) => (2 + Math.cos(3 * t)) * Math.cos(2 * t),
 *         (t) => (2 + Math.cos(3 * t)) * Math.sin(2 * t),
 *         (t) => Math.sin(3 * t),
 *         [-Math.PI, Math.PI]
 *     ], { strokeWidth: 4 });
 *
 * </pre><div id="JXGbd41a4e3-1bf7-4764-b675-98b01667103b" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGbd41a4e3-1bf7-4764-b675-98b01667103b',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, pan: {enabled: false}, showcopyright: false, shownavigation: false});
 *         var bound = [-4, 6];
 *         var view = board.create('view3d',
 *             [[-4, -3], [8, 8],
 *             [bound, bound, bound]],
 *             {
 *                 projection: 'central',
 *                 trackball: {enabled:true},
 *
 *                 // Main axes
 *                 axesPosition: 'border',
 *
 *                 // Axes at the border
 *                 xAxisBorder: { ticks3d: { ticksDistance: 2} },
 *                 yAxisBorder: { ticks3d: { ticksDistance: 2} },
 *                 zAxisBorder: { ticks3d: { ticksDistance: 2} },
 *
 *                 xPlaneRear: {
 *                     fillColor: '#fff',
 *                     mesh3d: {visible: false}
 *                 },
 *                 yPlaneRear: {
 *                     fillColor: '#fff',
 *                     mesh3d: {visible: false}
 *                 },
 *                 zPlaneRear: {
 *                     fillColor: '#fff',
 *                     mesh3d: {visible: false}
 *                 },
 *                 xPlaneFront: {
 *                     visible: true,
 *                     fillColor: '#fff',
 *                     mesh3d: {visible: false}
 *                 },
 *                 yPlaneFront: {
 *                     visible: true,
 *                     fillColor: '#fff',
 *                     mesh3d: {visible: false}
 *                 },
 *                 zPlaneFront: {
 *                     visible: true,
 *                     fillColor: '#fff',
 *                     mesh3d: {visible: false}
 *                 },
 *
 *                 // No axes on planes
 *                 xPlaneRearYAxis: {visible: false},
 *                 xPlaneRearZAxis: {visible: false},
 *                 yPlaneRearXAxis: {visible: false},
 *                 yPlaneRearZAxis: {visible: false},
 *                 zPlaneRearXAxis: {visible: false},
 *                 zPlaneRearYAxis: {visible: false},
 *                 xPlaneFrontYAxis: {visible: false},
 *                 xPlaneFrontZAxis: {visible: false},
 *                 yPlaneFrontXAxis: {visible: false},
 *                 yPlaneFrontZAxis: {visible: false},
 *                 zPlaneFrontXAxis: {visible: false},
 *                 zPlaneFrontYAxis: {visible: false}
 *
 *             });
 *
 *         var curve = view.create('curve3d', [
 *             (t) => (2 + Math.cos(3 * t)) * Math.cos(2 * t),
 *             (t) => (2 + Math.cos(3 * t)) * Math.sin(2 * t),
 *             (t) => Math.sin(3 * t),
 *             [-Math.PI, Math.PI]
 *         ], { strokeWidth: 4 });
 *     })();
 *
 * </script><pre>
 *
 * @example
 *  var bound = [-5, 5];
 *  var view = board.create('view3d',
 *      [[-6, -3],
 *       [8, 8],
 *       [bound, bound, bound]],
 *      {
 *          // Main axes
 *          axesPosition: 'center',
 *          xAxis: { strokeColor: 'blue', strokeWidth: 3},
 *
 *          // Planes
 *          xPlaneRear: { fillColor: 'yellow',  mesh3d: {visible: false}},
 *          yPlaneFront: { visible: true, fillColor: 'blue'},
 *
 *          // Axes on planes
 *          xPlaneRearYAxis: {strokeColor: 'red'},
 *          xPlaneRearZAxis: {strokeColor: 'red'},
 *
 *          yPlaneFrontXAxis: {strokeColor: 'blue'},
 *          yPlaneFrontZAxis: {strokeColor: 'blue'},
 *
 *          zPlaneFrontXAxis: {visible: false},
 *          zPlaneFrontYAxis: {visible: false}
 *      });
 *
 * </pre><div id="JXGdd06d90e-be5d-4531-8f0b-65fc30b1a7c7" class="jxgbox" style="width: 500px; height: 500px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGdd06d90e-be5d-4531-8f0b-65fc30b1a7c7',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, pan: {enabled: false}, showcopyright: false, shownavigation: false});
 *         var bound = [-5, 5];
 *         var view = board.create('view3d',
 *             [[-6, -3], [8, 8],
 *             [bound, bound, bound]],
 *             {
 *                 // Main axes
 *                 axesPosition: 'center',
 *                 xAxis: { strokeColor: 'blue', strokeWidth: 3},
 *                 // Planes
 *                 xPlaneRear: { fillColor: 'yellow',  mesh3d: {visible: false}},
 *                 yPlaneFront: { visible: true, fillColor: 'blue'},
 *                 // Axes on planes
 *                 xPlaneRearYAxis: {strokeColor: 'red'},
 *                 xPlaneRearZAxis: {strokeColor: 'red'},
 *                 yPlaneFrontXAxis: {strokeColor: 'blue'},
 *                 yPlaneFrontZAxis: {strokeColor: 'blue'},
 *                 zPlaneFrontXAxis: {visible: false},
 *                 zPlaneFrontYAxis: {visible: false}
 *             });
 *     })();
 *
 * </script><pre>
 * @example
 * var bound = [-5, 5];
 * var view = board.create('view3d',
 *     [[-6, -3], [8, 8],
 *     [bound, bound, bound]],
 *     {
 *         projection: 'central',
 *         az: {
 *             slider: {
 *                 visible: true,
 *                 point1: {
 *                     pos: [5, -4]
 *                 },
 *                 point2: {
 *                     pos: [5, 4]
 *                 },
 *                 label: {anchorX: 'middle'}
 *             }
 *         },
 *         el: {
 *             slider: {
 *                 visible: true,
 *                 point1: {
 *                     pos: [6, -5]
 *                 },
 *                 point2: {
 *                     pos: [6, 3]
 *                 },
 *                 label: {anchorX: 'middle'}
 *             }
 *         },
 *         bank: {
 *             slider: {
 *                 visible: true,
 *                 point1: {
 *                     pos: [7, -6]
 *                 },
 *                 point2: {
 *                     pos: [7, 2]
 *                 },
 *                 label: {anchorX: 'middle'}
 *             }
 *         }
 *     });
 *
 *
 * </pre><div id="JXGe181cc55-271b-419b-84fd-622326fd1d1a" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGe181cc55-271b-419b-84fd-622326fd1d1a',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var bound = [-5, 5];
 *     var view = board.create('view3d',
 *         [[-6, -3], [8, 8],
 *         [bound, bound, bound]],
 *         {
 *             projection: 'central',
 *             az: {
 *                 slider: {
 *                     visible: true,
 *                     point1: {
 *                         pos: [5, -4]
 *                     },
 *                     point2: {
 *                         pos: [5, 4]
 *                     },
 *                     label: {anchorX: 'middle'}
 *                 }
 *             },
 *             el: {
 *                 slider: {
 *                     visible: true,
 *                     point1: {
 *                         pos: [6, -5]
 *                     },
 *                     point2: {
 *                         pos: [6, 3]
 *                     },
 *                     label: {anchorX: 'middle'}
 *                 }
 *             },
 *             bank: {
 *                 slider: {
 *                     visible: true,
 *                     point1: {
 *                         pos: [7, -6]
 *                     },
 *                     point2: {
 *                         pos: [7, 2]
 *                     },
 *                     label: {anchorX: 'middle'}
 *                 }
 *             }
 *         });
 *
 *
 *     })();
 *
 * </script><pre>
 *
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createView3D = function(board, parents, attributes) {
    var view, attr, attr_az, attr_el, attr_bank, x, y, w, h, p1, p2, v, coords = parents[0], size = parents[1]; // [w, h]
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'view3d');
    view = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].View3D(board, parents, attr);
    view.defaultAxes = view.create('axes3d', [], attr);
    x = coords[0];
    y = coords[1];
    w = size[0];
    h = size[1];
    attr_az = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attr, board.options, 'view3d', 'az', 'slider');
    attr_az.name = 'az';
    attr_el = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attr, board.options, 'view3d', 'el', 'slider');
    attr_el.name = 'el';
    attr_bank = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attr, board.options, 'view3d', 'bank', 'slider');
    attr_bank.name = 'bank';
    v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(attr_az.point1.pos);
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(v)) {
        // 'auto'
        p1 = [
            x - 1,
            y - 2
        ];
    } else {
        p1 = v;
    }
    v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(attr_az.point2.pos);
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(v)) {
        // 'auto'
        p2 = [
            x + w + 1,
            y - 2
        ];
    } else {
        p2 = v;
    }
    /**
     * Slider to adapt azimuth angle
     * @name JXG.View3D#az_slide
     * @type {Slider}
     */ view.az_slide = board.create('slider', [
        p1,
        p2,
        [
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(attr_az.min),
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(attr_az.start),
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(attr_az.max)
        ]
    ], attr_az);
    view.inherits.push(view.az_slide);
    view.az_slide.elType = 'view3d_slider'; // Used in board.prepareUpdate()
    v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(attr_el.point1.pos);
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(v)) {
        // 'auto'
        p1 = [
            x - 1,
            y
        ];
    } else {
        p1 = v;
    }
    v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(attr_el.point2.pos);
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(v)) {
        // 'auto'
        p2 = [
            x - 1,
            y + h
        ];
    } else {
        p2 = v;
    }
    /**
     * Slider to adapt elevation angle
     *
     * @name JXG.View3D#el_slide
     * @type {Slider}
     */ view.el_slide = board.create('slider', [
        p1,
        p2,
        [
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(attr_el.min),
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(attr_el.start),
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(attr_el.max)
        ]
    ], attr_el);
    view.inherits.push(view.el_slide);
    view.el_slide.elType = 'view3d_slider'; // Used in board.prepareUpdate()
    v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(attr_bank.point1.pos);
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(v)) {
        // 'auto'
        p1 = [
            x - 1,
            y + h + 2
        ];
    } else {
        p1 = v;
    }
    v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(attr_bank.point2.pos);
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(v)) {
        // 'auto'
        p2 = [
            x + w + 1,
            y + h + 2
        ];
    } else {
        p2 = v;
    }
    /**
     * Slider to adjust bank angle
     *
     * @name JXG.View3D#bank_slide
     * @type {Slider}
     */ view.bank_slide = board.create('slider', [
        p1,
        p2,
        [
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(attr_bank.min),
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(attr_bank.start),
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(attr_bank.max)
        ]
    ], attr_bank);
    view.inherits.push(view.bank_slide);
    view.bank_slide.elType = 'view3d_slider'; // Used in board.prepareUpdate()
    // Set special infobox attributes of view3d.infobox
    // Using setAttribute() is not possible here, since we have to
    // avoid a call of board.update().
    // The drawback is that we can not use shortcuts
    view.board.infobox.visProp = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].merge(view.board.infobox.visProp, attr.infobox);
    // 3d infobox: drag direction and coordinates
    view.board.highlightInfobox = function(x, y, el) {
        var d, i, c3d, foot, pre = '', brd = el.board, arr, infobox, p = null;
        if (this.mode === this.BOARD_MODE_DRAG) {
            // Drag direction is only shown during dragging
            if (view.isVerticalDrag()) {
                pre = '<span style="color:black; font-size:200%">\u21C5 &nbsp;</span>';
            } else {
                pre = '<span style="color:black; font-size:200%">\u21C4 &nbsp;</span>';
            }
        }
        // Search 3D parent
        for(i = 0; i < el.parents.length; i++){
            p = brd.objects[el.parents[i]];
            if (p.is3D) {
                break;
            }
        }
        if (p && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(p.element2D)) {
            foot = [
                1,
                0,
                0,
                p.coords[3]
            ];
            view._w0 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(view.matrix3D[0], foot, 4);
            c3d = view.project2DTo3DPlane(p.element2D, [
                1,
                0,
                0,
                1
            ], foot);
            if (!view.isInCube(c3d)) {
                view.board.highlightCustomInfobox('', p);
                return;
            }
            d = p.evalVisProp('infoboxdigits');
            infobox = view.board.infobox;
            if (d === 'auto') {
                if (infobox.useLocale()) {
                    arr = [
                        pre,
                        '(',
                        infobox.formatNumberLocale(p.X()),
                        ' | ',
                        infobox.formatNumberLocale(p.Y()),
                        ' | ',
                        infobox.formatNumberLocale(p.Z()),
                        ')'
                    ];
                } else {
                    arr = [
                        pre,
                        '(',
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].autoDigits(p.X()),
                        ' | ',
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].autoDigits(p.Y()),
                        ' | ',
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].autoDigits(p.Z()),
                        ')'
                    ];
                }
            } else {
                if (infobox.useLocale()) {
                    arr = [
                        pre,
                        '(',
                        infobox.formatNumberLocale(p.X(), d),
                        ' | ',
                        infobox.formatNumberLocale(p.Y(), d),
                        ' | ',
                        infobox.formatNumberLocale(p.Z(), d),
                        ')'
                    ];
                } else {
                    arr = [
                        pre,
                        '(',
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].toFixed(p.X(), d),
                        ' | ',
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].toFixed(p.Y(), d),
                        ' | ',
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].toFixed(p.Z(), d),
                        ')'
                    ];
                }
            }
            view.board.highlightCustomInfobox(arr.join(''), p);
        } else {
            view.board.highlightCustomInfobox('(' + x + ', ' + y + ')', el);
        }
    };
    // Hack needed to enable addEvent for view3D:
    view.BOARD_MODE_NONE = 0x0000;
    // Add events for the keyboard navigation
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].addEvent(board.containerObj, 'keydown', function(event) {
        var neededKey, catchEvt = false;
        // this.board._change3DView = true;
        if (view.evalVisProp('el.keyboard.enabled') && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
            neededKey = view.evalVisProp('el.keyboard.key');
            if (neededKey === 'none' || neededKey.indexOf('shift') > -1 && event.shiftKey || neededKey.indexOf('ctrl') > -1 && event.ctrlKey) {
                view._elEventHandler(event);
                catchEvt = true;
            }
        }
        if (view.evalVisProp('az.keyboard.enabled') && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
            neededKey = view.evalVisProp('az.keyboard.key');
            if (neededKey === 'none' || neededKey.indexOf('shift') > -1 && event.shiftKey || neededKey.indexOf('ctrl') > -1 && event.ctrlKey) {
                view._azEventHandler(event);
                catchEvt = true;
            }
        }
        if (view.evalVisProp('bank.keyboard.enabled') && (event.key === ',' || event.key === '<' || event.key === '.' || event.key === '>')) {
            neededKey = view.evalVisProp('bank.keyboard.key');
            if (neededKey === 'none' || neededKey.indexOf('shift') > -1 && event.shiftKey || neededKey.indexOf('ctrl') > -1 && event.ctrlKey) {
                view._bankEventHandler(event);
                catchEvt = true;
            }
        }
        if (event.key === 'PageUp') {
            view.nextView();
            catchEvt = true;
        } else if (event.key === 'PageDown') {
            view.previousView();
            catchEvt = true;
        }
        if (catchEvt) {
            // We stop event handling only in the case if the keypress could be
            // used for the 3D view. If this is not done, input fields et al
            // can not be used any more.
            event.preventDefault();
        }
        this.board._change3DView = false;
    }, view);
    // Add events for the pointer navigation
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].addEvent(board.containerObj, 'pointerdown', view.pointerDownHandler, view);
    // Initialize view rotation matrix
    view.getAnglesFromSliders();
    view.matrix3DRot = view.getRotationFromAngles();
    // override angle slider bounds when trackball navigation is enabled
    view.updateAngleSliderBounds();
    view.board.update();
    return view;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("view3d", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createView3D);
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].View3D;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/element3d.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
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
 */ /*global JXG:true, define: true*/ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
;
;
/**
 * Constructs a new GeometryElement3D object.
 * @class This is the basic class for 3D geometry elements like Point3D and Line3D.
 * @constructor
 * @augments JXG.GeometryElement
 *
 * @param {string} elType
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement3D = function(view, elType) {
    this.elType = elType;
    /**
     * Pointer to the view3D in which the element is constructed
     * @type JXG.View3D
     * @private
     */ this.view = view;
    this.id = this.view.board.setId(this, elType);
    /**
     * Link to the 2D element(s) used to visualize the 3D element
     * in a view. In case, there are several 2D elements, it is an array.
     *
     * @type Array
     * @description JXG.GeometryElement,Array
     * @private
     *
     * @example
     *   p.element2D;
     */ this.element2D = null;
    /**
     * If this property exists (and is true) the element is a 3D element.
     *
     * @type Boolean
     * @private
     */ this.is3D = true;
    this.zIndex = 0.0;
    this.view.objects[this.id] = this;
    if (this.name !== "") {
        this.view.elementsByName[this.name] = this;
    }
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement3D.prototype, {
    setAttr2D: function(attr3D) {
        var attr2D = attr3D;
        attr2D.name = this.name;
        attr2D.element3d = this;
        attr2D.id = null; // The 2D element's id may not be controlled by the user.
        return attr2D;
    },
    // Documented in element.js
    setAttribute: function(attr) {
        var i, key, value, arg, pair, attributes = {};
        // Normalize the user input
        for(i = 0; i < arguments.length; i++){
            arg = arguments[i];
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(arg)) {
                // pairRaw is string of the form 'key:value'
                pair = arg.split(":");
                attributes[__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].trim(pair[0])] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].trim(pair[1]);
            } else if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(arg)) {
                // pairRaw consists of objects of the form {key1:value1,key2:value2,...}
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(attributes, arg);
            } else {
                // pairRaw consists of array [key,value]
                attributes[arg[0]] = arg[1];
            }
        }
        for(i in attributes){
            if (attributes.hasOwnProperty(i)) {
                key = i.replace(/\s+/g, "").toLowerCase();
                value = attributes[i];
                switch(key){
                    case "numberpointshigh":
                    case "stepsu":
                    case "stepsv":
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.visProp[key]) && (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Validator[key] || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Validator[key] && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Validator[key](value) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Validator[key] && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(value) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Validator[key](value()))) {
                            value = value.toLowerCase && value.toLowerCase() === "false" ? false : value;
                            this._set(key, value);
                        }
                        break;
                    default:
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.element2D)) {
                            this.element2D.setAttribute(attributes);
                        }
                }
            }
        }
    },
    // Documented in element.js
    getAttribute: function(key) {
        var result;
        key = key.toLowerCase();
        switch(key){
            case "numberpointshigh":
            case "stepsu":
            case "stepsv":
                result = this.visProp[key];
                break;
            default:
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.element2D)) {
                    result = this.element2D.getAttribute(key);
                }
                break;
        }
        return result;
    },
    // Documented in element.js
    getAttributes: function() {
        var attr = {}, i, key, attr3D = [
            'numberpointshigh',
            'stepsu',
            'stepsv'
        ], le = attr3D.length;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.element2D)) {
            attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].merge(this.element2D.getAttributes());
        }
        for(i = 0; i < le; i++){
            key = attr3D[i];
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.visProp[key])) {
                attr[key] = this.visProp[key];
            }
        }
        return attr;
    },
    // /**
    //  * Add transformations to this element.
    //  * @param {JXG.GeometryElement} el
    //  * @param {JXG.Transformation|Array} transform Either one {@link JXG.Transformation}
    //  * or an array of {@link JXG.Transformation}s.
    //  * @returns {JXG.CoordsElement} Reference to itself.
    //  */
    addTransformGeneric: function(el, transform) {
        var i, list = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(transform) ? transform : [
            transform
        ], len = list.length;
        // There is only one baseElement possible
        if (this.transformations.length === 0) {
            this.baseElement = el;
        }
        for(i = 0; i < len; i++){
            this.transformations.push(list[i]);
        }
        return this;
    },
    /**
     * Set position of the 2D element. This is a
     * callback function, executed in {@link JXG.GeometryElement#setPosition}.
     * @param {JXG.Transform} t transformation
     * @private
     * @see JXG.GeometryElement#setPosition
     */ setPosition2D: function(t) {
    /* stub */ },
    /**
     * Project a 3D point to this element and update point.position.
     * @param {Array} p 3D position of the point (array of length 3)
     * @param {Array} params Changed in place to the new of the point in terms of the elements functions X, Y, Z.
     * For example for a surface, params will contain values (u,v) such that the new 3D position
     * p = [X(u, v), Z(u, v), Z(u, v)].
     * @returns {Array} 3D coordinates of the projected point with homogeneous coordinates of the form [1, x, y, z].
     */ projectCoords: function(p, params) {
    /* stub */ },
    // Documented in element.js
    remove: function() {}
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement3D;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/box3d.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
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
 */ /*global JXG:true, define: true*/ /**
 * Create axes and rear and front walls of the
 * view3d bounding box bbox3D.
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
;
;
/**
 * @class A container element that creates the axes and rear and front planes of a 3D view.
 * @pseudo
 * @description This element "axes3d" is used to create
 *  <ul>
 *   <li> 3D coordinate axes (either "axesPosition:'border'" or "axesPosition:'center'")
 *   <li> A point3d "O" (origin) if "axesPosition:'center'"
 *   <li> Rear and front planes in all three directions of the view3d element.
 *   <li> Coordinate axes on the rear and front planes
 *  </ul>
 *
 * @name Axes3D
 * @constructor
 * @type Object
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createAxes3D = function(board, parents, attributes) {
    var view = parents[0], directions = [
        "x",
        "y",
        "z"
    ], suffixAxis = "Axis", sides = [
        "Rear",
        "Front"
    ], rear = [
        0,
        0,
        0
    ], front = [
        0,
        0,
        0
    ], i, j, k, i1, i2, attr, pos, dir, dir1, len, from, to, vec1, vec2, range1, range2, na, na_parent, ticks_attr, axes = {};
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(view.bbox3D)) {
        for(i = 0; i < directions.length; i++){
            rear[i] = view.bbox3D[i][0];
            front[i] = view.bbox3D[i][1];
        }
    } else {
        for(i = 0; i < directions.length; i++){
            rear[i] = parents[1][i];
            front[i] = parents[2][1];
        }
    }
    // Main 3D axes
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "axes3d");
    // Position of the main axes can not be changed during run time
    pos = attr.axesposition;
    for(i = 0; i < directions.length; i++){
        // Run through ['x', 'y', 'z']
        dir = directions[i];
        na = dir + suffixAxis;
        if (pos === "center") {
            // Axes centered
            from = [
                0,
                0,
                0
            ];
            to = [
                0,
                0,
                0
            ];
            to[i] = front[i];
            axes[na] = view.create("axis3d", [
                from,
                to
            ], attr[na.toLowerCase()]);
            axes[na].view = view;
        } else if (pos === 'border') {
            // Axes bordered
            na += "Border";
            from = rear.slice();
            to = front.slice();
            if (dir === 'z') {
                from[1] = front[1];
                to[0] = rear[0];
            } else if (dir === 'x') {
                from = [
                    rear[0],
                    front[1],
                    rear[2]
                ];
                to = [
                    front[0],
                    front[1],
                    rear[2]
                ];
            } else {
                from = [
                    front[0],
                    rear[1],
                    rear[2]
                ];
                to = [
                    front[0],
                    front[1],
                    rear[2]
                ];
            }
            to[i] = front[i];
            // attr[na.toLowerCase()].lastArrow = false;
            axes[na] = view.create("axis3d", [
                from,
                to
            ], attr[na.toLowerCase()]);
            axes[na].view = view;
            ticks_attr = attr[na.toLowerCase()].ticks3d;
            ticks_attr.element3d = true; // Needed to avoid update during change of view
            len = front[i] - rear[i];
            if (dir === 'x') {
                axes[na + "Ticks"] = view.create("ticks3d", [
                    from,
                    [
                        1,
                        0,
                        0
                    ],
                    len,
                    [
                        0,
                        1,
                        0
                    ]
                ], ticks_attr);
            } else if (dir === 'y') {
                axes[na + "Ticks"] = view.create("ticks3d", [
                    from,
                    [
                        0,
                        1,
                        0
                    ],
                    len,
                    [
                        1,
                        0,
                        0
                    ]
                ], ticks_attr);
            } else {
                axes[na + "Ticks"] = view.create("ticks3d", [
                    from,
                    [
                        0,
                        0,
                        1
                    ],
                    len,
                    [
                        0,
                        1,
                        0
                    ]
                ], ticks_attr);
            }
            axes[na + "Ticks"].view = view;
        }
    }
    if (pos === 'center') {
        // Origin (2D point)
        axes.O = view.create("intersection", [
            axes[directions[0] + suffixAxis],
            axes[directions[1] + suffixAxis]
        ], {
            name: "",
            visible: false,
            withLabel: false
        });
        axes.O.view = view;
    } else {
        axes.O = null;
    }
    // Front and rear planes
    for(i = 0; i < directions.length; i++){
        // Run through ['x', 'y', 'z']
        i1 = (i + 1) % 3;
        i2 = (i + 2) % 3;
        dir = directions[i];
        for(j = 0; j < sides.length; j++){
            // Run through ['Rear', 'Front']
            // attr = Type.copyAttributes(attributes, board.options, "axes3d");
            na = dir + "Plane" + sides[j];
            from = [
                0,
                0,
                0
            ];
            from[i] = j === 0 ? rear[i] : front[i];
            vec1 = [
                0,
                0,
                0
            ];
            vec2 = [
                0,
                0,
                0
            ];
            vec1[i1] = 1;
            vec2[i2] = 1;
            range1 = [
                rear[i1],
                front[i1]
            ];
            range2 = [
                rear[i2],
                front[i2]
            ];
            attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "axes3d", na);
            axes[na] = view.create("plane3d", [
                from,
                vec1,
                vec2,
                range1,
                range2
            ], attr);
            axes[na].elType = "axisplane3d";
        }
    }
    // Axes on front and rear planes
    for(i = 0; i < directions.length; i++){
        // Run through ['x', 'y', 'z']
        dir = directions[i];
        for(j = 0; j < sides.length; j++){
            for(k = 1; k <= 2; k++){
                i1 = (i + k) % 3;
                dir1 = directions[i1];
                na = dir + "Plane" + sides[j] + dir1.toUpperCase() + "Axis";
                na_parent = dir + "Plane" + sides[j];
                from = [
                    0,
                    0,
                    0
                ];
                to = [
                    0,
                    0,
                    0
                ];
                from[i] = to[i] = j === 0 ? rear[i] : front[i];
                from[i1] = rear[i1];
                to[i1] = front[i1];
                attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "axes3d", na);
                axes[na] = view.create("axis3d", [
                    from,
                    to
                ], attr);
                axes[na].view = view;
                axes[na_parent].addChild(axes[na]);
                axes[na_parent].element2D.inherits.push(axes[na]); // TODO: Access of element2D is not nice
            }
        }
    }
    return axes;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("axes3d", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createAxes3D);
/**
 * @class A 3D axis element is a line together with optional ticks and labels.
 * @pseudo
 * @description Simple element 3d axis as used with "axesPosition:center". No ticks and no label (yet).
 * <p>
 * At the time being, the input arrays are NOT dynamic, i.e. can not be given as functions.
 *
 * @name Axis3D
 * @augments Arrow
 * @constructor
 * @type Object
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {Array_Array} start,end Two arrays of length 3 for the start point and the end point of the axis.
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createAxis3D = function(board, parents, attributes) {
    var view = parents[0], attr, start = parents[1], end = parents[2], el_start, el_end, el;
    // Use 2D points to create axis
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes.point1, board.options, "axis3d", "point1");
    attr.element3d = true; // Needed to avoid update during change of view
    el_start = view.create("point", [
        function(xx, yy, zz) {
            return function() {
                return view.project3DTo2D(xx, yy, zz)[1];
            };
        }(start[0], start[1], start[2]),
        function(xx, yy, zz) {
            return function() {
                return view.project3DTo2D(xx, yy, zz)[2];
            };
        }(start[0], start[1], start[2])
    ], attr);
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes.point2, board.options, "axis3d", "point2");
    attr.element3d = true; // Needed to avoid update during change of view
    el_end = view.create("point", [
        function(xx, yy, zz) {
            return function() {
                return view.project3DTo2D(xx, yy, zz)[1];
            };
        }(end[0], end[1], end[2]),
        function(xx, yy, zz) {
            return function() {
                return view.project3DTo2D(xx, yy, zz)[2];
            };
        }(end[0], end[1], end[2])
    ], attr);
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "axis3d");
    attr.element3d = true; // Needed to avoid update during change of view
    el = view.create("arrow", [
        el_start,
        el_end
    ], attr);
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("axis3d", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createAxis3D);
/**
 * @class Display a rectangular mesh on a 3D plane element.
 * @pseudo
 * @description Create a (rectangular) mesh - i.e. grid lines - on a plane3D element.
 * <p>
 * At the time being, the mesh is not connected to the plane. The connecting element is simply the
 * parameter point.
 *
 * @name Mesh3D
 * @augments Curve
 * @constructor
 * @type Object
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {Array_Array_Array_Array_Array} point,direction1,direction2,range1,range2 point is an array of length 3
 * determining the starting point of the grid. direction1 and direction2 are arrays of length 3 for the directions of the grid.
 * range1 and range2 (arrays of length 2) give the respective ranges.
 * All parameters can be supplied as functions returning an appropriate data type.
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMesh3D = function(board, parents, attributes) {
    var view = parents[0], attr, el;
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'mesh3d');
    attr.element3d = true; // Needed to avoid update during change of view
    el = view.create("curve", [
        [],
        []
    ], attr);
    el.point = parents[1];
    el.direction1 = parents[2];
    el.direction2 = parents[3];
    el.range1 = parents[4];
    el.range2 = parents[5];
    /**
     * @ignore
     */ el.updateDataArray = function() {
        var range1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.range1), range2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.range2), s1 = range1[0], e1 = range1[1], s2 = range2[0], e2 = range2[1], l1, l2, res, i, v1 = [
            0,
            0,
            0
        ], v2 = [
            0,
            0,
            0
        ], step_u = this.evalVisProp('stepwidthu'), step_v = this.evalVisProp('stepwidthv'), q = [
            0,
            0,
            0
        ];
        this.dataX = [];
        this.dataY = [];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(this.point)) {
            q = this.point();
        } else {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint3D(this.point)) {
                q = this.point.coords;
            } else {
                for(i = 0; i < this.point.length; i++){
                    q[i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.point[i]);
                }
            }
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(this.direction1)) {
            v1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.direction1);
        } else {
            for(i = 0; i < this.direction1.length; i++){
                v1[i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.direction1[i]);
            }
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(this.direction2)) {
            v2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.direction2);
        } else {
            for(i = 0; i < this.direction2.length; i++){
                v2[i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.direction2[i]);
            }
        }
        if (q.length === 4) {
            q = q.slice(1);
        }
        if (v1.length === 4) {
            v1 = v1.slice(1);
        }
        if (v2.length === 4) {
            v2 = v2.slice(1);
        }
        l1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Math.norm(v1, 3);
        l2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Math.norm(v2, 3);
        for(i = 0; i < 3; i++){
            v1[i] /= l1;
            v2[i] /= l2;
        }
        // sol = Mat.Geometry.getPlaneBounds(v1, v2, q, s1, e1);
        // if (sol !== null) {
        //     s1 = sol[0];
        //     e1 = sol[1];
        //     s2 = sol[2];
        //     e2 = sol[3];
        // }
        res = view.getMesh([
            function(u, v) {
                return q[0] + u * v1[0] + v * v2[0];
            },
            function(u, v) {
                return q[1] + u * v1[1] + v * v2[1];
            },
            function(u, v) {
                return q[2] + u * v1[2] + v * v2[2];
            }
        ], [
            Math.ceil(s1),
            Math.floor(e1),
            (Math.ceil(e1) - Math.floor(s1)) / step_u
        ], [
            Math.ceil(s2),
            Math.floor(e2),
            (Math.ceil(e2) - Math.floor(s2)) / step_v
        ]);
        this.dataX = res[0];
        this.dataY = res[1];
    };
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("mesh3d", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createMesh3D);
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/circle3d.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Aaron Fenyes,
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
 */ /*global JXG:true, define: true*/ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-ssr] (ecmascript)");
;
;
;
;
;
/**
 * In 3D space, a circle consists of all points on a given plane with a given distance from a given point. The given point is called the center, and the given distance is called the radius.
 * A circle can be constructed by providing a center, a normal vector, and a radius (given as a number or function).
 * @class Creates a new 3D circle object. Do not use this constructor to create a 3D circle. Use {@link JXG.View3D#create} with
 * type {@link Circle3D} instead.
 * @constructor
 * @augments JXG.Curve3D
 * @augments JXG.GeometryElement
 * @param {JXG.View3D} view The 3D view the circle is drawn on.
 * @param {JXG.Point} center The center of the circle.
 * @param {Array} normal A normal vector of the plane the circle lies in. Must be either an array of three numbers or an array of three functions returning numbers.
 * @param {Number|Function} radius The radius of the circle.
 * @param {Object} attributes
 * @see JXG.Board#generateName
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Circle3D = function(view, center, normal, radius, attributes) {
    var altFrame1, that;
    this.constructor(view.board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_CIRCLE3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_3D);
    this.constructor3D(view, "circle3d");
    /**
     * The circle's center. Do not set this parameter directly, as that will break JSXGraph's update system.
     * @type JXG.Point3D
     */ this.center = this.board.select(center);
    this.normalFunc = normal;
    /**
     * A normal vector of the plane the circle lies in. Do not set this parameter directly, as that will break JSXGraph's update system.
     * @type Array
     * @private
     *
     * @see updateNormal
     */ this.normal = [
        0,
        0,
        0,
        0
    ];
    /**
     * The circle's underlying Curve3D.
     */ this.curve;
    /**
     * The first vector in an orthonormal frame for the plane the circle lies in.
     * Do not set this parameter directly, as that will break JSXGraph's update system.
     * @type Array
     * @private
     *
     * @see updateFrame
     */ this.frame1;
    /**
     * The second vector in an orthonormal frame for the plane the circle lies in.
     * Do not set this parameter directly, as that will break JSXGraph's update system.
     * @type Array
     * @private
     *
     * @see updateFrame
     */ this.frame2;
    // place the circle or its center---whichever is newer---in the scene tree
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.center._is_new)) {
        this.addChild(this.center);
        delete this.center._is_new;
    } else {
        this.center.addChild(this);
    }
    // Converts JessieCode syntax into JavaScript syntax and generally ensures that the radius is a function
    this.updateRadius = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunction(radius, this.board);
    this.addParentsFromJCFunctions([
        this.updateRadius
    ]);
    // initialize normal
    this.updateNormal();
    // initialize the first frame vector by taking the cross product with
    // [1, 0, 0] or [-0.5, sqrt(3)/2, 0]---whichever is further away on the unit
    // sphere. every vector is at least 60 degrees from one of these, which
    // should be good enough to make the frame vector numerically accurate
    this.frame1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct(this.normal.slice(1), [
        1,
        0,
        0
    ]);
    this.frame1.unshift(0);
    altFrame1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct(this.normal.slice(1), [
        -0.5,
        0.8660254037844386,
        0
    ]); // [1/2, sqrt(3)/2, 0]
    altFrame1.unshift(0);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].norm(altFrame1) > __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].norm(this.frame1)) {
        this.frame1 = altFrame1;
    }
    // initialize the second frame vector
    this.frame2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct(this.normal.slice(1), this.frame1.slice(1));
    this.frame2.unshift(0);
    // scale both frame vectors to unit length
    this.normalizeFrame();
    // create the underlying curve
    that = this;
    this.curve = view.create('curve3d', [
        function(t) {
            var r = that.Radius(), s = Math.sin(t), c = Math.cos(t);
            return [
                that.center.coords[1] + r * (c * that.frame1[1] + s * that.frame2[1]),
                that.center.coords[2] + r * (c * that.frame1[2] + s * that.frame2[2]),
                that.center.coords[3] + r * (c * that.frame1[3] + s * that.frame2[3])
            ];
        },
        [
            0,
            2 * Math.PI
        ] // parameter range
    ], attributes);
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Circle3D.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyPrototypeMethods(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Circle3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement3D, "constructor3D");
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Circle3D.prototype, /** @lends JXG.Circle3D.prototype */ {
    // Already documented in element3d.js
    update: function() {
        if (this.needsUpdate) {
            this.updateNormal().updateFrame();
            this.curve.visProp.visible = !isNaN(this.Radius()); // TODO
        }
        return this;
    },
    // Already documented in element3d.js
    updateRenderer: function() {
        this.needsUpdate = false;
        return this;
    },
    /**
         * Set a new radius, then update the board.
         * @param {String|Number|function} r A string, function or number describing the new radius
         * @returns {JXG.Circle3D} Reference to this sphere
         */ setRadius: function(r) {
        this.updateRadius = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunction(r, this.board);
        this.addParentsFromJCFunctions([
            this.updateRadius
        ]);
        this.board.update();
        return this;
    },
    /**
         * Calculates the radius of the circle.
         * @param {String|Number|function} [value] Set new radius
         * @returns {Number} The radius of the circle
         */ Radius: function(value) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(value)) {
            this.setRadius(value);
            return this.Radius();
        }
        return Math.abs(this.updateRadius());
    },
    normalizeFrame: function() {
        // normalize frame
        var len1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].norm(this.frame1), len2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].norm(this.frame2), i;
        for(i = 0; i < 4; i++){
            this.frame1[i] /= len1;
            this.frame2[i] /= len2;
        }
        return this;
    },
    updateNormal: function() {
        // evaluate normal direction
        var i, len, eps = 1.e-12;
        this.normal = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.normalFunc);
        // scale normal to unit length
        len = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].norm(this.normal);
        if (Math.abs(len) > eps) {
            for(i = 0; i < 4; i++){
                this.normal[i] /= len;
            }
        }
        return this;
    },
    updateFrame: function() {
        this.frame1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct(this.frame2.slice(1), this.normal.slice(1));
        this.frame1.unshift(0);
        this.frame2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct(this.normal.slice(1), this.frame1.slice(1));
        this.frame2.unshift(0);
        this.normalizeFrame();
        return this;
    },
    // Already documented in element3d.js
    projectCoords: function(p, params) {
        // we have to call `this.curve.projectCoords`, i.e. the curve's projectCoords rather
        // than the circle's, to make `this` refer to the curve within the
        // call.
        return this.curve.projectCoords(p, params);
    }
});
/**
 * @class A circle in 3D can be defined by various combinations of points and numbers.
 * @pseudo
 * @description In 3D space, a circle consists of all points on a given plane with a given distance from a given point. The given point is called the center, and the given distance is called the radius.
 * A circle can be constructed by providing a center, a normal vector, and a radius (given as a number or function).
 * <p>
 * If the radius has a negative value, its absolute value is taken. If the radius evaluates to NaN,
 * the circle is not displayed. This is convenient for constructing an intersection circle, which is empty when its parents do not intersect.
 * @name Circle3D
 * @augments JXG.Circle3D
 * @constructor
 * @type JXG.Circle3D
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point,Array,Function_Array,Function_Number,Function} center,normal,radius The center must be given as a {@link JXG.Point}, array or function (see {@link JXG.providePoints}).
 * The normal vector can be given as an array of four numbers (i.e. homogeneous coordinates [0, x, y, z]) or a function returning an array of length 4
 * and the radius can be given as a number (which will create a circle with a fixed radius) or a function.
 * <p>
 * If the radius is supplied as a number or the output of a function, its absolute value is taken. When the radius evaluates to NaN, the circle does not display.
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCircle3D = function(board, parents, attributes) {
    var view = parents[0], attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'circle3d'), center = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints3D(view, [
        parents[1]
    ], attributes, 'circle3d', [
        'point'
    ])[0], normal = parents[2], radius = parents[3], el;
    // Create element
    el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Circle3D(view, center, normal, radius, attr);
    // Update scene tree
    el.curve.addParents([
        el
    ]);
    el.addChild(el.curve);
    el.update();
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("circle3d", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCircle3D);
/**
 * @class The circle that is the intersection of two elements (plane3d or sphere3d) in 3D.
 *
 * @pseudo
 * @name IntersectionCircle3D
 * @augments JXG.Circle3D
 * @constructor
 * @type JXG.Circle3D
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Sphere3D_JXG.Sphere3D|JXG.Plane3D} el1,el2 The result will be the intersection of el1 and el2.
 * @example
 * // Create the intersection circle of two spheres
 * var view = board.create(
 *     'view3d',
 *     [[-6, -3], [8, 8],
 *     [[0, 3], [0, 3], [0, 3]]],
 *     {
 *         xPlaneRear: {fillOpacity: 0.2, gradient: null},
 *         yPlaneRear: {fillOpacity: 0.2, gradient: null},
 *         zPlaneRear: {fillOpacity: 0.2, gradient: null}
 *     }
 * );
 * var a1 = view.create('point3d', [-1, 0, 0]);
 * var a2 = view.create('point3d', [1, 0, 0]);
 *
 * var s1 = view.create(
 *    'sphere3d',
 *     [a1, 2],
 *     {fillColor: '#00ff80'}
 * );
 * var s2 = view.create(
 *    'sphere3d',
 *     [a2, 2],
 *     {fillColor: '#ff0000'}
 * );
 *
 * var i = view.create('intersectioncircle3d', [s1, s2]);
 *
 * </pre><div id="JXG64ede949-8dd6-44d0-b2a9-248a479d3a5d" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG64ede949-8dd6-44d0-b2a9-248a479d3a5d',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, pan: {enabled: false}, showcopyright: false, shownavigation: false});
 *         var view = board.create(
 *            'view3d',
 *            [[-6, -3], [8, 8],
 *            [[0, 3], [0, 3], [0, 3]]],
 *            {
 *                xPlaneRear: {fillOpacity: 0.2, gradient: null},
 *                yPlaneRear: {fillOpacity: 0.2, gradient: null},
 *                zPlaneRear: {fillOpacity: 0.2, gradient: null}
 *            }
 *        );
 *        var a1 = view.create('point3d', [-1, 0, 0]);
 *        var a2 = view.create('point3d', [1, 0, 0]);
 *
 *        var s1 = view.create(
 *           'sphere3d',
 *            [a1, 2],
 *            {fillColor: '#00ff80'}
 *        );
 *        var p2 = view.create(
 *           'sphere3d',
 *            [a2, 2],
 *            {fillColor: '#ff0000'}
 *        );
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createIntersectionCircle3D = function(board, parents, attributes) {
    var view = parents[0], el1 = parents[1], el2 = parents[2], ixnCircle, center, func, attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "intersectioncircle3d");
    func = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].intersectionFunction3D(view, el1, el2);
    center = view.create('point3d', func[0], {
        visible: false
    });
    ixnCircle = view.create('circle3d', [
        center,
        func[1],
        func[2]
    ], attr);
    try {
        el1.addChild(ixnCircle);
        el2.addChild(ixnCircle);
    } catch (e) {
        throw new Error("JSXGraph: Can't create 'intersection' with parent types '" + typeof parents[1] + "' and '" + typeof parents[2] + "'.");
    }
    ixnCircle.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_INTERSECTION_CIRCLE3D;
    ixnCircle.elType = 'intersectioncircle3d';
    ixnCircle.setParents([
        el1.id,
        el2.id
    ]);
    return ixnCircle;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement('intersectioncircle3d', __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createIntersectionCircle3D);
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/point3d.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
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
 */ /*global JXG:true, define: true*/ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-ssr] (ecmascript)");
;
;
;
;
;
/**
 * A 3D point is the basic geometric element.
 * @class Creates a new 3D point object. Do not use this constructor to create a 3D point. Use {@link JXG.View3D#create} with
 * type {@link Point3D} instead.
 * @augments JXG.GeometryElement3D
 * @augments JXG.GeometryElement
 * @param {JXG.View3D} view The 3D view the point is drawn on.
 * @param {Function|Array} F Array of numbers, array of functions or function returning an array with defines the user coordinates of the point.
 * @param {JXG.GeometryElement3D} slide Object the 3D point should be bound to. If null, the point is a free point.
 * @param {Object} attributes An object containing visual properties like in {@link JXG.Options#point3d} and
 * {@link JXG.Options#elements}, and optional a name and an id.
 * @see JXG.Board#generateName
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Point3D = function(view, F, slide, attributes) {
    this.constructor(view.board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POINT3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_3D);
    this.constructor3D(view, "point3d");
    this.board.finalizeAdding(this);
    // add the new point to its view's point list
    // if (view.visProp.depthorderpoints) {
    //     view.points.push(this);
    // }
    /**
     * Homogeneous coordinates of a Point3D, i.e. array of length 4 containing numbers: [w, x, y, z].
     * Usually, w=1 for finite points and w=0 for points which are infinitely far.
     * If coordinates of the point are supplied as functions, they are resolved in {@link Point3D#updateCoords} into numbers.
     *
     * @example
     *   p.coords;
     *
     * @name Point3D#coords
     * @type Array
     * @private
     */ this.coords = [
        0,
        0,
        0,
        0
    ];
    this.initialCoords = [
        0,
        0,
        0,
        0
    ];
    /**
     * Function or array of functions or array of numbers defining the coordinates of the point, used in {@link updateCoords}.
     *
     * @name Point3D#F
     * @function
     * @private
     *
     * @see updateCoords
     */ this.F = F;
    /**
     * Optional slide element, i.e. element the Point3D lives on.
     *
     * @example
     *   p.slide;
     *
     * @name Point3D#slide
     * @type JXG.GeometryElement3D
     * @default null
     * @private
     *
     */ this.slide = slide;
    /**
     * In case, the point is a glider, store the preimage of the coordinates in terms of the parametric definition of the host element.
     * That is, if the host element `slide` is a curve, and the coordinates of the point are equal to `p` and `u = this.position[0]`, then
     * `p = [slide.X(u), slide.Y(u), slide.Z(u)]`.
     *
     * @type Array
     * @private
     */ this.position = [];
    /**
     * An array of coordinates for moveTo().  An in-progress move can be updated or cancelled by updating or clearing this array.  Use moveTo() instead of
     * accessing this array directly.
     * @type Array
     * @private
     */ this.movePath = [];
    this.moveCallback = null;
    this.moveInterval = null;
    this._c2d = null;
    this.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(this.methodMap, {
    });
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Point3D.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyPrototypeMethods(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Point3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement3D, "constructor3D");
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Point3D.prototype, /** @lends JXG.Point3D.prototype */ {
    /**
         * Get x-coordinate of a 3D point.
         *
         * @name X
         * @memberOf Point3D
         * @function
         * @returns {Number}
         *
         * @example
         *   p.X();
         */ X: function() {
        return this.coords[1];
    },
    /**
         * Get y-coordinate of a 3D point.
         *
         * @name Y
         * @memberOf Point3D
         * @function
         * @returns Number
         *
         * @example
         *   p.Y();
         */ Y: function() {
        return this.coords[2];
    },
    /**
         * Get z-coordinate of a 3D point.
         *
         * @name Z
         * @memberOf Point3D
         * @function
         * @returns Number
         *
         * @example
         *   p.Z();
         */ Z: function() {
        return this.coords[3];
    },
    /**
         * Get w-coordinate of a 3D point.
         *
         * @name W
         * @memberOf Point3D
         * @function
         * @returns Number
         *
         * @example
         *   p.W();
         */ W: function() {
        return this.coords[0];
    },
    /**
         * Update the array {@link JXG.Point3D#coords} containing the homogeneous coords.
         *
         * @name updateCoords
         * @memberOf Point3D
         * @function
         * @returns {Object} Reference to the Point3D object
         * @private
         * @see GeometryElement3D#update()
         * @example
         *    p.updateCoords();
         */ updateCoords: function() {
        var i, s = 0;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(this.F)) {
            this.coords = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.F);
            if (this.coords.length === 3) {
                this.coords.unshift(1);
            }
        } else {
            if (this.F.length === 3) {
                this.coords[0] = 1;
                s = 1;
            }
            for(i = 0; i < this.F.length; i++){
                // Attention: if F is array of numbers, coords may not be updated.
                // Otherwise, dragging will not work anymore.
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(this.F[i])) {
                    this.coords[s + i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.F[i]);
                }
            }
        }
        return this;
    },
    /**
         * Initialize the coords array.
         *
         * @private
         * @returns {Object} Reference to the Point3D object
         */ initCoords: function() {
        var i, s = 0;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(this.F)) {
            this.coords = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.F);
            if (this.coords.length === 3) {
                this.coords.unshift(1);
            }
        } else {
            if (this.F.length === 3) {
                this.coords[0] = 1;
                s = 1;
            }
            for(i = 0; i < this.F.length; i++){
                this.coords[s + i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.F[i]);
            }
        }
        this.initialCoords = this.coords.slice();
        return this;
    },
    /**
         * Normalize homogeneous coordinates such the the first coordinate (the w-coordinate is equal to 1 or 0)-
         *
         * @name normalizeCoords
         * @memberOf Point3D
         * @function
         * @returns {Object} Reference to the Point3D object
         * @private
         * @example
         *    p.normalizeCoords();
         */ normalizeCoords: function() {
        if (Math.abs(this.coords[0]) > 1.e-14) {
            this.coords[1] /= this.coords[0];
            this.coords[2] /= this.coords[0];
            this.coords[3] /= this.coords[0];
            this.coords[0] = 1.0;
        }
        return this;
    },
    /**
         * Set the position of a 3D point.
         *
         * @name setPosition
         * @memberOf Point3D
         * @function
         * @param {Array} coords 3D coordinates. Either of the form [x,y,z] (Euclidean) or [w,x,y,z] (homogeneous).
         * @param {Boolean} [noevent] If true, no events are triggered (TODO)
         * @returns {Object} Reference to the Point3D object
         *
         * @example
         *    p.setPosition([1, 3, 4]);
         */ setPosition: function(coords, noevent) {
        var c = this.coords;
        // oc = this.coords.slice(); // Copy of original values
        if (coords.length === 3) {
            // Euclidean coordinates
            c[0] = 1.0;
            c[1] = coords[0];
            c[2] = coords[1];
            c[3] = coords[2];
        } else {
            // Homogeneous coordinates (normalized)
            c[0] = coords[0];
            c[1] = coords[1];
            c[2] = coords[2];
            c[3] = coords[2];
            this.normalizeCoords();
        }
        // console.log(el.emitter, !noevent, oc[0] !== c[0] || oc[1] !== c[1] || oc[2] !== c[2] || oc[3] !== c[3]);
        // Not yet working TODO
        // if (el.emitter && !noevent &&
        //     (oc[0] !== c[0] || oc[1] !== c[1] || oc[2] !== c[2] || oc[3] !== c[3])) {
        //     this.triggerEventHandlers(['update3D'], [oc]);
        // }
        return this;
    },
    // /**
    //  * Add transformations to this element.
    //  * @param {JXG.GeometryElement} el
    //  * @param {JXG.Transformation|Array} transform Either one {@link JXG.Transformation}
    //  * or an array of {@link JXG.Transformation}s.
    //  * @returns {JXG.CoordsElement} Reference to itself.
    //  */
    addTransform: function(el, transform) {
        this.addTransformGeneric(el, transform);
        return this;
    },
    updateTransform: function() {
        var c, i;
        if (this.transformations.length === 0 || this.baseElement === null) {
            return this;
        }
        if (this === this.baseElement) {
            c = this.initialCoords;
        } else {
            c = this.baseElement.coords;
        }
        for(i = 0; i < this.transformations.length; i++){
            this.transformations[i].update();
            c = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(this.transformations[i].matrix, c);
        }
        this.coords = c;
        return this;
    },
    // Already documented in JXG.GeometryElement
    update: function(drag) {
        var c3d, foot, res;
        if (this.element2D.draggable() && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(this._c2d, this.element2D.coords.usrCoords) !== 0) {
            // Update is called from board.updateElements, e.g. after manipulating a
            // a slider or dragging a point.
            // Usually this followed by an update call using the other branch below.
            if (this.view.isVerticalDrag()) {
                // Drag the point in its vertical to the xy plane
                // If the point is outside of bbox3d,
                // c3d is already corrected.
                c3d = this.view.project2DTo3DVertical(this.element2D, this.coords);
            } else {
                // Drag the point in its xy plane
                foot = [
                    1,
                    0,
                    0,
                    this.coords[3]
                ];
                c3d = this.view.project2DTo3DPlane(this.element2D, [
                    1,
                    0,
                    0,
                    1
                ], foot);
            }
            if (c3d[0] !== 0) {
                // Check if c3d is inside of view.bbox3d
                // Otherwise, the coords are now corrected.
                res = this.view.project3DToCube(c3d);
                this.coords = res[0];
                if (res[1]) {
                    // The 3D coordinates have been corrected, now
                    // also correct the 2D element.
                    this.element2D.coords.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, this.view.project3DTo2D(this.coords));
                }
                if (this.slide) {
                    this.coords = this.slide.projectCoords([
                        1,
                        this.X(),
                        this.Y(),
                        this.Z()
                    ], this.position);
                    this.element2D.coords.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, this.view.project3DTo2D(this.coords));
                }
            }
        } else {
            // Update 2D point from its 3D view, e.g. when rotating the view
            this.updateCoords().updateTransform();
            if (this.slide) {
                this.coords = this.slide.projectCoords([
                    1,
                    this.X(),
                    this.Y(),
                    this.Z()
                ], this.position);
            }
            c3d = this.coords;
            this.element2D.coords.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, this.view.project3DTo2D(c3d));
            // this.zIndex = Mat.matVecMult(this.view.matrix3DRotShift, c3d)[3];
            this.zIndex = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(this.view.matrix3DRotShift[3], c3d);
        }
        this._c2d = this.element2D.coords.usrCoords.slice();
        return this;
    },
    // Already documented in JXG.GeometryElement
    updateRenderer: function() {
        this.needsUpdate = false;
        return this;
    },
    /**
         * Check whether a point's position is finite, i.e. the first entry is not zero.
         * @returns {Boolean} True if the first entry of the coordinate vector is not zero; false otherwise.
         */ testIfFinite: function() {
        return Math.abs(this.coords[0]) > 1.e-12 ? true : false;
    // return Type.cmpArrays(this.coords, [0, 0, 0, 0]);
    },
    /**
         * Calculate the distance from one point to another. If one of the points is on the plane at infinity, return positive infinity.
         * @param {JXG.Point3D} pt The point to which the distance is calculated.
         * @returns {Number} The distance
         */ distance: function(pt) {
        var eps_sq = 1e-12, c_this = this.coords, c_pt = pt.coords;
        if (c_this[0] * c_this[0] > eps_sq && c_pt[0] * c_pt[0] > eps_sq) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(c_pt[1] - c_this[1], c_pt[2] - c_this[2], c_pt[3] - c_this[3]);
        } else {
            return Number.POSITIVE_INFINITY;
        }
    },
    /**
        * Starts an animated point movement towards the given coordinates <tt>where</tt>.
        * The animation is done after <tt>time</tt> milliseconds.
        * If the second parameter is not given or is equal to 0, coordinates are changed without animation.
        * @param {Array} where Array containing the target coordinate in cartesian or homogenous form.
        * @param {Number} [time] Number of milliseconds the animation should last.
        * @param {Object} [options] Optional settings for the animation
        * @param {function} [options.callback] A function that is called as soon as the animation is finished.
        * @param {String} [options.effect='<>'|'>'|'<'] animation effects like speed fade in and out. possible values are
        * '<>' for speed increase on start and slow down at the end (default), '<' for speed up, '>' for slow down, and '--' for constant speed during
        * the whole animation.
        * @see JXG.Point3D#moveAlong
        * @see JXG.Point#moveTo
        * @example
        * // visit a coordinate, then use callback to visit a second coordinate.
        * const board = JXG.JSXGraph.initBoard('jxgbox')
        * var view = board.create(
        *     'view3d',
        *     [[-6, -3], [8, 8],
        *     [[-3, 3], [-3, 3], [-3, 3]]]);
        *
        *  let A = view.create('point3d', [0, 0, 0]);
        *
        *  // move A with callbacks
        *  board.create('button', [-4, 4.3, 'callbacks', () => {
        *    A.moveTo([3, 3, 3], 3000,
        *       {
        *          callback: () => A.moveTo([-3, -3, -3], 3000, {
        *              callback: () => A.moveTo([0, 0, 0],1000), effect: '<'
        *          }),
        *          effect: '>'
        *       })
        *     }])
        *
        *   // move A with async/await
        *   board.create('button', [-3, 4.3, 'async/await', async () => {
        *       await A.moveTo([3, 3, 3], 3000, { effect: '>' });
        *       await A.moveTo([-3, -3, -3], 3000, { effect: '<' });
        *       A.moveTo([0, 0, 0],1000)
        *   }])
        *  </pre><div id="JXG0f35a50e-e99d-11e8-a1ca-cba3b0c2aad4" class="jxgbox" style="width: 300px; height: 300px;"></div>
        * <script type="text/javascript">
        * {
        * const board = JXG.JSXGraph.initBoard('JXG0f35a50e-e99d-11e8-a1ca-cba3b0c2aad4')
        * var view = board.create(
        *     'view3d',
        *     [[-6, -3], [8, 8],
        *     [[-3, 3], [-3, 3], [-3, 3]]]);
        *
        * let A = view.create('point3d', [0, 0, 0]);
        *  // move A with callbacks
        *  board.create('button', [-4, 4.3, 'callbacks', () => {
        *    A.moveTo([3, 3, 3], 3000,
        *       {
        *          callback: () => A.moveTo([-3, -3, -3], 3000, {
        *              callback: () => A.moveTo([0, 0, 0],1000), effect: '<'
        *          }),
        *          effect: '>'
        *       })
        *     }])
        *
        *   // move A with async/await
        *   board.create('button', [-1, 4.3, 'async/await', async () => {
        *       await A.moveTo([3, 3, 3], 3000, { effect: '>' });
        *       await A.moveTo([-3, -3, -3], 3000, { effect: '<' });
        *       A.moveTo([0, 0, 0],1000)
        *   }])
        * }
        * </script><pre>
        */ moveTo: function(where, time, options) {
        options = options || {};
        var i, steps = Math.ceil(time / this.board.attr.animationdelay), X = where[0], Y = where[1], Z = where[2], dX = this.coords[1] - X, dY = this.coords[2] - Y, dZ = this.coords[3] - Z, doneCallback = ()=>{}, stepFun;
        if (options.callback) doneCallback = options.callback; // unload
        /** @ignore */ stepFun = function(i) {
            var x = i / steps; // absolute progress of the animatin
            if (options.effect) {
                if (options.effect === "<>") {
                    return Math.pow(Math.sin(x * Math.PI / 2), 2);
                }
                if (options.effect === "<") {
                    return x * x * x;
                }
                if (options.effect === ">") {
                    return 1 - Math.pow(1 - x, 3);
                }
                if (options.effect === "==") {
                    return i / steps; // linear
                }
                throw new Error("valid effects are '==', '<>', '>', and '<'.");
            }
            return i / steps; // default
        };
        // immediate move, no time
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(time) || time === 0) {
            this.setPosition([
                X,
                Y,
                Z
            ], true); // no event here
            return this.board.update(this);
        }
        // In case there is no callback and we are already at the endpoint we can stop here
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(options.callback) && Math.abs(dX) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps && Math.abs(dY) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps && Math.abs(dZ) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps) {
            return this;
        }
        this.animationPath = [];
        for(i = steps; i >= 0; i--){
            this.animationPath[steps - i] = [
                X + dX * stepFun(i),
                Y + dY * stepFun(i),
                Z + dZ * stepFun(i)
            ];
        }
        return this.moveAlong(this.animationPath, time, {
            callback: doneCallback
        });
    },
    /**
         * Move along a path defined by an array of coordinates
         * @param {number[][]} [traversePath] Array of path coordinates (either cartesian or homogenous).
         * @param {number} [time] Number of milliseconds the animation should last.
         * @param {Object} [options] 'callback' and 'interpolate'.  see {@link JXG.CoordsElement#moveAlong},
         * @example
         *const board = JXG.JSXGraph.initBoard('jxgbox')
         *var view = board.create(
         *    'view3d',
         *    [[-6, -3], [8, 8],
         *    [[-3, 3], [-3, 3], [-3, 3]]]);
         *
         * board.create('button', [-4, 4.5, 'start', () => {
         *      let A = view.create('point3d', [0, 0, 0]);
         *      A.moveAlong([[3, 3, 3], [-2, -1, -2], [-1, -1, -1], [-1, -2, 1]], 3000,
         *         { callback: () => board.create('text', [-4, 4, 'done!']) })
         *}])
         *
         * </pre><div id="JXGa45032e5-a517-4f1d-868a-abc698d344cf" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         * const board = JXG.JSXGraph.initBoard("JXGa45032e5-a517-4f1d-868a-abc698d344cf")
         * var view = board.create(
         *     'view3d',
         *     [[-6, -3], [8, 8],
         *     [[-3, 3], [-3, 3], [-3, 3]]]);
         *
         * board.create('button', [-4, 4.5, 'start', () => {
         *      let A = view.create('point3d', [0, 0, 0]);
         *      A.moveAlong([[3, 3, 3], [-2, -1, -2], [-1, -1, -1], [-1, -2, 1]], 3000,
         *       { callback: () => board.create('text', [-4, 4, 'done!']) })
         * }])
         *
         * })();
         *
         * </script><pre>
         *
         */ moveAlong: function(traversePath, time, options) {
        let stepTime = time / traversePath.length; // will be same as this.board.attr.animationdelay if called by MoveTo
        // unload the options
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isObject(options)) {
            if ('callback' in options) this.moveCallback = options.callback;
        // TODO:add interpolation using Neville.  How?  easiest is add interpolation to path before start
        // if ('interpolate' in options) interpolate = options.interpolate;
        }
        if (this.movePath.length > 0) {
            this.movePath = traversePath; // set the new path and return ??
            return; // promise is still outstanding
        }
        // no move currently in progress
        this.movePath = traversePath; // set the new path and return a promise
        return new Promise((resolve, reject)=>{
            this.moveInterval = setInterval(()=>{
                if (this.movePath.length > 0) {
                    let coord = this.movePath.shift();
                    this.setPosition(coord, true); // no events during transit
                    this.board.update(this);
                }
                if (this.movePath.length === 0) {
                    clearInterval(this.moveInterval);
                    resolve();
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(this.moveCallback)) {
                        this.moveCallback(); // invoke the callback
                    }
                }
            }, stepTime);
        });
    },
    // Not yet working
    __evt__update3D: function(oc) {}
});
/**
 * @class A Point3D object is defined by three coordinates [x,y,z], or a function returning an array with three numbers.
 * Alternatively, all numbers can also be provided as functions returning a number.
 *
 * @pseudo
 * @name Point3D
 * @augments JXG.Point3D
 * @constructor
 * @throws {Exception} If the element cannot be constructed with the given parent
 * objects an exception is thrown.
 * @param {number,function_number,function_number,function_JXG.GeometryElement3D} x,y,z,[slide=undefined] The coordinates are given as x, y, z consisting of numbers or functions.
 * If an optional 3D element "slide" is supplied, the point is a glider on that element. At the time of version v1.11, only elements of type line3d are supperted as glider hosts.
 * @param {array,function_JXG.GeometryElement3D} F,[slide=null] Alternatively, the coordinates can be supplied as
 *  <ul>
 *   <li>function returning an array [x,y,z] of length 3 of numbers or
 *   <li>array arr=[x,y,z] of length 3 consisting of numbers
 * </ul>
 * If an optional 3D element "slide" is supplied, the point is a glider on that element.
 *
 * @example
 *    var bound = [-5, 5];
 *    var view = board.create('view3d',
 *        [[-6, -3], [8, 8],
 *        [bound, bound, bound]],
 *        {});
 *    var p = view.create('point3d', [1, 2, 2], { name:'A', size: 5 });
 *    var q = view.create('point3d', function() { return [p.X(), p.Y(), p.Z() - 3]; }, { name:'B', size: 3, fixed: true });
 *    var w = view.create('point3d', [ () => p.X() + 3, () => p.Y(), () => p.Z() - 2], { name:'C', size: 3, fixed: true });
 *
 * </pre><div id="JXGb9ee8f9f-3d2b-4f73-8221-4f82c09933f1" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGb9ee8f9f-3d2b-4f73-8221-4f82c09933f1',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, pan: {enabled: false}, showcopyright: false, shownavigation: false});
 *         var bound = [-5, 5];
 *         var view = board.create('view3d',
 *             [[-6, -3], [8, 8],
 *             [bound, bound, bound]],
 *             {});
 *         var p = view.create('point3d', [1, 2, 2], { name:'A', size: 5 });
 *         var q = view.create('point3d', function() { return [p.X(), p.Y(), p.Z() - 3]; }, { name:'B', size: 3 });
 *         var w = view.create('point3d', [ () => p.X() + 3, () => p.Y(), () => p.Z() - 2], { name:'C', size: 3, fixed: true });
 *     })();
 *
 * </script><pre>
 *
 * @example
 *     // Glider on sphere
 *     var view = board.create(
 *         'view3d',
 *         [[-6, -3], [8, 8],
 *         [[-3, 3], [-3, 3], [-3, 3]]],
 *         {
 *             depthOrder: {
 *                 enabled: true
 *             },
 *             projection: 'central',
 *             xPlaneRear: {fillOpacity: 0.2, gradient: null},
 *             yPlaneRear: {fillOpacity: 0.2, gradient: null},
 *             zPlaneRear: {fillOpacity: 0.2, gradient: null}
 *         }
 *     );
 *
 *     // Two points
 *     var center = view.create('point3d', [0, 0, 0], {withLabel: false, size: 2});
 *     var point = view.create('point3d', [2, 0, 0], {withLabel: false, size: 2});
 *
 *     // Sphere
 *     var sphere = view.create('sphere3d', [center, point], {fillOpacity: 0.8});
 *
 *     // Glider on sphere
 *     var glide = view.create('point3d', [2, 2, 0, sphere], {withLabel: false, color: 'red', size: 4});
 *     var l1 = view.create('line3d', [glide, center], { strokeWidth: 2, dash: 2 });
 *
 * </pre><div id="JXG672fe3c7-e6fd-48e0-9a24-22f51f2dfa71" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG672fe3c7-e6fd-48e0-9a24-22f51f2dfa71',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *         var view = board.create(
 *             'view3d',
 *             [[-6, -3], [8, 8],
 *             [[-3, 3], [-3, 3], [-3, 3]]],
 *             {
 *                 depthOrder: {
 *                     enabled: true
 *                 },
 *                 projection: 'central',
 *                 xPlaneRear: {fillOpacity: 0.2, gradient: null},
 *                 yPlaneRear: {fillOpacity: 0.2, gradient: null},
 *                 zPlaneRear: {fillOpacity: 0.2, gradient: null}
 *             }
 *         );
 *
 *         // Two points
 *         var center = view.create('point3d', [0, 0, 0], {withLabel: false, size: 2});
 *         var point = view.create('point3d', [2, 0, 0], {withLabel: false, size: 2});
 *
 *         // Sphere
 *         var sphere = view.create('sphere3d', [center, point], {fillOpacity: 0.8});
 *
 *         // Glider on sphere
 *         var glide = view.create('point3d', [2, 2, 0, sphere], {withLabel: false, color: 'red', size: 4});
 *         var l1 = view.create('line3d', [glide, center], { strokeWidth: 2, dash: 2 });
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPoint3D = function(board, parents, attributes) {
    //   parents[0]: view
    // followed by
    //   parents[1]: function or array
    // or
    //   parents[1..3]: coordinates
    var view = parents[0], attr, F, slide, c2d, el, base = null, transform = null;
    // If the last element of `parents` is a 3D object,
    // the point is a glider on that element.
    if (parents.length > 2 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parents[parents.length - 1].is3D) && !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isTransformationOrArray(parents[parents.length - 1])) {
        slide = parents.pop();
    } else {
        slide = null;
    }
    if (parents.length === 2) {
        // [view, array|fun] (Array [x, y, z] | function) returning [x, y, z]
        F = parents[1];
    } else if (parents.length === 3 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint3D(parents[1]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isTransformationOrArray(parents[2])) {
        F = [
            0,
            0,
            0
        ];
        base = parents[1];
        transform = parents[2];
    } else if (parents.length === 4) {
        // [view, x, y, z], (3 numbers | functions)
        F = parents.slice(1);
    } else if (parents.length === 5) {
        // [view, w, x, y, z], (4 numbers | functions)
        F = parents.slice(1);
    } else {
        throw new Error("JSXGraph: Can't create point3d with parent types '" + typeof parents[1] + "' and '" + typeof parents[2] + "'." + "\nPossible parent types: [[x,y,z]], [x,y,z], or [[x,y,z], slide], () => [x, y, z], or [point, transformation(s)]");
    //  "\nPossible parent types: [[x,y,z]], [x,y,z], [element,transformation]"); // TODO
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'point3d');
    el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Point3D(view, F, slide, attr);
    el.initCoords();
    if (base !== null && transform !== null) {
        el.addTransform(base, transform);
    }
    c2d = view.project3DTo2D(el.coords);
    attr = el.setAttr2D(attr);
    el.element2D = view.create('point', c2d, attr);
    el.element2D.view = view;
    el.addChild(el.element2D);
    el.inherits.push(el.element2D);
    el.element2D.setParents(el);
    // If this point is a glider, record that in the update tree
    if (el.slide) {
        el.slide.addChild(el);
        el.setParents(el.slide);
    }
    if (base) {
        el.setParents(base);
    }
    el._c2d = el.element2D.coords.usrCoords.slice(); // Store a copy of the coordinates to detect dragging
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("point3d", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPoint3D);
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/curve3d.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
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
 */ /*global JXG:true, define: true*/ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
;
;
;
;
;
/**
 * Constructor for 3D curves.
 * @class Creates a new 3D curve object. Do not use this constructor to create a 3D curve. Use {@link JXG.View3D#create} with type {@link Curve3D} instead.
 *
 * @augments JXG.GeometryElement3D
 * @augments JXG.GeometryElement
 * @param {View3D} view
 * @param {Function} F
 * @param {Function} X
 * @param {Function} Y
 * @param {Function} Z
 * @param {Array} range
 * @param {Object} attributes
 * @see JXG.Board#generateName
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Curve3D = function(view, F, X, Y, Z, range, attributes) {
    this.constructor(view.board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_CURVE3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_3D);
    this.constructor3D(view, "curve3d");
    this.board.finalizeAdding(this);
    /**
     * Internal function defining the surface without applying any transformations.
     * Does only exist if it or X are supplied as a function. Otherwise it is null.
     *
     * @function
     * @private
     */ this._F = F;
    /**
     * Function or array which maps u to x; i.e. it defines the x-coordinate of the curve
     * @function
     * @returns Number
     * @private
     */ this._X = X;
    /**
     * Function or array  which maps u to y; i.e. it defines the y-coordinate of the curve
     * @function
     * @returns Number
     * @private
     */ this._Y = Y;
    /**
     * Function or array  which maps u to z; i.e. it defines the z-coordinate of the curve
     * @function
     * @returns Number
     * @private
     */ this._Z = Z;
    this.points = [];
    this.numberPoints = 0;
    this.dataX = null;
    this.dataY = null;
    this.dataZ = null;
    if (this._F !== null) {
        this._X = function(u) {
            return this._F(u)[0];
        };
        this._Y = function(u) {
            return this._F(u)[1];
        };
        this._Z = function(u) {
            return this._F(u)[2];
        };
    } else {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(this._X)) {
            this._F = function(u) {
                return [
                    this._X(u),
                    this._Y(u),
                    this._Z(u)
                ];
            };
        } else {
            this._F = null;
        }
    }
    this.range = range;
    this.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(this.methodMap, {
    });
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Curve3D.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyPrototypeMethods(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Curve3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement3D, "constructor3D");
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Curve3D.prototype, /** @lends JXG.Curve3D.prototype */ {
    /**
         * Simple curve plotting algorithm.
         *
         * @returns {JXG.Curve3D} Reference to itself
         */ updateCoords: function() {
        var steps = this.evalVisProp('numberpointshigh'), r, s, e, delta, u, i, c3d = [
            1,
            0,
            0,
            0
        ];
        this.points = [];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.dataX)) {
            steps = this.dataX.length;
            for(u = 0; u < steps; u++){
                this.points.push([
                    1,
                    this.dataX[u],
                    this.dataY[u],
                    this.dataZ[u]
                ]);
            }
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(this._X)) {
            steps = this._X.length;
            for(u = 0; u < steps; u++){
                this.points.push([
                    1,
                    this._X[u],
                    this._Y[u],
                    this._Z[u]
                ]);
            }
        } else {
            r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.range);
            s = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(r[0]);
            e = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(r[1]);
            delta = (e - s) / (steps - 1);
            for(i = 0, u = s; i < steps && u <= e; i++, u += delta){
                c3d = this.F(u);
                c3d.unshift(1);
                this.points.push(c3d);
            }
        }
        this.numberPoints = this.points.length;
        return this;
    },
    /**
         * Generic function which evaluates the function term of the curve
         * and applies its transformations.
         * @param {Number} u
         * @returns
         */ evalF: function(u) {
        var t, i, c3d = [
            0,
            0,
            0,
            0
        ];
        if (this.transformations.length === 0 || !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.baseElement)) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this._F)) {
                c3d = this._F(u);
            } else {
                c3d = [
                    this._X[u],
                    this._Y[u],
                    this._Z[u]
                ];
            }
            return c3d;
        }
        t = this.transformations;
        for(i = 0; i < t.length; i++){
            t[i].update();
        }
        if (c3d.length === 3) {
            c3d.unshift(1);
        }
        if (this === this.baseElement) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this._F)) {
                c3d = this._F(u);
            } else {
                c3d = [
                    this._X[u],
                    this._Y[u],
                    this._Z[u]
                ];
            }
        } else {
            c3d = this.baseElement.evalF(u);
        }
        c3d.unshift(1);
        c3d = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(t[0].matrix, c3d);
        for(i = 1; i < t.length; i++){
            c3d = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(t[i].matrix, c3d);
        }
        return c3d.slice(1);
    },
    /**
         * Function defining the curve plus applying transformations.
         * @param {Number} u
         * @returns Array [x, y, z] of length 3
         */ F: function(u) {
        return this.evalF(u);
    },
    /**
        * Function which maps (u) to z; i.e. it defines the x-coordinate of the curve
        * plus applying transformations.
        * @param {Number} u
        * @returns Number
        */ X: function(u) {
        return this.evalF(u)[0];
    },
    /**
        * Function which maps (u) to y; i.e. it defines the y-coordinate of the curve
        * plus applying transformations.
        * @param {Number} u
        * @returns Number
        */ Y: function(u) {
        return this.evalF(u)[1];
    },
    /**
        * Function which maps (u) to z; i.e. it defines the z-coordinate of the curve
        * plus applying transformations.
        * @param {Number} u
        * @returns Number
        */ Z: function(u) {
        return this.evalF(u)[2];
    },
    updateDataArray2D: function() {
        var i, c2d, dataX = [], dataY = [], len = this.points.length;
        for(i = 0; i < len; i++){
            c2d = this.view.project3DTo2D(this.points[i]);
            dataX.push(c2d[1]);
            dataY.push(c2d[2]);
        }
        return {
            X: dataX,
            Y: dataY
        };
    },
    // Already documented in GeometryElement
    addTransform: function(el, transform) {
        this.addTransformGeneric(el, transform);
        return this;
    },
    /**
         *
         * @returns {JXG.Curve3D} Reference to itself
         */ updateTransform: function() {
        var t, c, i, j, len;
        if (this.transformations.length === 0 || this.baseElement === null || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this._F) // Transformations have only to be applied here
        ) {
            return this;
        }
        t = this.transformations;
        for(i = 0; i < t.length; i++){
            t[i].update();
        }
        len = this.baseElement.numberPoints;
        for(i = 0; i < len; i++){
            if (this === this.baseElement) {
                c = this.points[i];
            } else {
                c = this.baseElement.points[i];
            }
            for(j = 0; j < t.length; j++){
                c = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(t[j].matrix, c);
            }
            this.points[i] = c;
        }
        this.numberPoints = len;
        return this;
    },
    // Already documented in GeometryElement
    updateDataArray: function() {},
    // Already documented in GeometryElement
    update: function() {
        if (this.needsUpdate) {
            this.updateDataArray();
            this.updateCoords().updateTransform();
        }
        return this;
    },
    // Already documented in GeometryElement
    updateRenderer: function() {
        this.needsUpdate = false;
        return this;
    },
    // Already documented in element3d.js
    projectCoords: function(p, params) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].projectCoordsToParametric(p, this, 1, params);
    }
});
/**
 * @class 3D Curves can be defined by mappings or by discrete data sets.
 * In general, a 3D curve is a mapping from R to R^3, where t maps to (x(t),y(t),z(t)).
 * The graph is drawn for t in the interval [a,b].
 * @pseudo
 * @description A 3D parametric curve is defined by a function
 *    <i>F: R<sup>1</sup> &rarr; R<sup>3</sup></i>.
 *
 * @name Curve3D
 * @augments Curve
 * @constructor
 * @type Object
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {Function_Function_Function_Array,Function} F<sub>X</sub>,F<sub>Y</sub>,F<sub>Z</sub>,range
 * F<sub>X</sub>(u), F<sub>Y</sub>(u), F<sub>Z</sub>(u) are functions returning a number, range is the array containing
 * lower and upper bound for the range of the parameter u. range may also be a function returning an array of length two.
 * @param {Function_Array,Function} F,range Alternatively: F<sub>[X,Y,Z]</sub>(u) a function returning an array [x,y,z] of
 * numbers, range as above.
 * @param {Array_Array_Array} X,Y,Z Three arrays containing the coordinate points which define the curve.
 * @example
 * // create a simple curve in 3d
 * var bound = [-1.5, 1.5];
 * var view=board.create('view3d',
 *     [[-4, -4],[8, 8],
 *     [bound, bound, bound]],
 *     {});
 * var curve = view.create('curve3d', [(u)=>Math.cos(u), (u)=>Math.sin(u), (u)=>(u/Math.PI)-1,[0,2*Math.PI] ]);
 * </pre><div id="JXG0f35a50e-e99d-11e8-a1ca-04d3b0c2aad3" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG0f35a50e-e99d-11e8-a1ca-04d3b0c2aad3',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *         // create a simple curve in 3d
 *         var bound = [-1.5, 1.5];
 *         var view=board.create('view3d',
 *             [[-4, -4],[8, 8],
 *             [bound, bound, bound]],
 *             {});
 *         var curve = view.create('curve3d', [(u)=>Math.cos(u), (u)=>Math.sin(u), (u)=>(u/Math.PI)-1,[0,2*Math.PI] ]);
 *     })();
 * </script><pre>
  */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCurve3D = function(board, parents, attributes) {
    var view = parents[0], F, X, Y, Z, range, attr, el, mat, base = null, transform = null;
    if (parents.length === 3) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isTransformationOrArray(parents[2]) && parents[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_CURVE3D) {
            // [curve, transformation(s)]
            // This might be adopted to the type of the base element (data plot or function)
            base = parents[1];
            transform = parents[2];
            F = null;
            X = [];
            Y = [];
            Z = [];
        } else {
            // [F, range]
            F = parents[1];
            range = parents[2];
            X = null;
            Y = null;
            Z = null;
        }
    } else if (parents.length === 2 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[1])) {
        mat = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].transpose(parents[1]);
        X = mat[0];
        Y = mat[1];
        Z = mat[2];
        F = null;
    } else {
        // [X, Y, Z, range]
        X = parents[1];
        Y = parents[2];
        Z = parents[3];
        range = parents[4];
        F = null;
    }
    // TODO Throw new Error
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "curve3d");
    el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Curve3D(view, F, X, Y, Z, range, attr);
    attr = el.setAttr2D(attr);
    el.element2D = view.create("curve", [
        [],
        []
    ], attr);
    el.element2D.view = view;
    if (base !== null) {
        el.addTransform(base, transform);
        el.addParents(base);
    }
    /**
     * @class
     * @ignore
     */ el.element2D.updateDataArray = function() {
        var ret = el.updateDataArray2D();
        this.dataX = ret.X;
        this.dataY = ret.Y;
    };
    el.addChild(el.element2D);
    el.inherits.push(el.element2D);
    el.element2D.setParents(el);
    el.element2D.prepareUpdate().update();
    if (!board.isSuspendedUpdate) {
        el.element2D.updateVisibility().updateRenderer();
    }
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("curve3d", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createCurve3D);
/**
 * @class A vector field is an assignment of a vector to each point in 3D space.
 * <p>
 * Plot a vector field either given by three functions
 * f1(x, y, z), f2(x, y, z), and f3(x, y, z) or by a function f(x, y, z)
 * returning an array of size 3.
 *
 * @pseudo
 * @name Vectorfield3D
 * @augments JXG.Curve3D
 * @constructor
 * @type JXG.Curve3D
 * @throws {Error} If the element cannot be constructed with the given parent objects an exception is thrown.
 * Parameter options:
 * @param {Array|Function|String} F Either an array containing three functions f1(x, y, z), f2(x, y, z),
 * and f3(x, y) or function f(x, y, z) returning an array of length 3.
 * @param {Array} xData Array of length 3 containing start value for x, number of steps,
 * end value of x. The vector field will contain (number of steps) + 1 vectors in direction of x.
 * @param {Array} yData Array of length 3 containing start value for y, number of steps,
 * end value of y. The vector field will contain (number of steps) + 1 vectors in direction of y.
 * @param {Array} zData Array of length 3 containing start value for z, number of steps,
 * end value of z. The vector field will contain (number of steps) + 1 vectors in direction of z.
 *
 * @example
 * const view = board.create('view3d',
 *     [
 *         [-6, -3],
 *         [8, 8],
 *         [[-3, 3], [-3, 3], [-3, 3]]
 *     ], {});
 *
 * var vf = view.create('vectorfield3d', [
 *     [(x, y, z) => Math.cos(y), (x, y, z) => Math.sin(x), (x, y, z) => z],
 *     [-2, 5, 2], // x from -2 to 2 in 5 steps
 *     [-2, 5, 2], // y
 *     [-2, 5, 2] // z
 * ], {
 *     strokeColor: 'red',
 *     scale: 0.5
 * });
 *
 * </pre><div id="JXG8e41c67b-3338-4428-bd0f-c69d8f6fb348" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG8e41c67b-3338-4428-bd0f-c69d8f6fb348',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false,
 *          pan: {
 *                needTwoFingers: true
 *           }
 *          });
 *     const view = board.create('view3d',
 *         [
 *             [-6, -3],
 *             [8, 8],
 *             [[-3, 3], [-3, 3], [-3, 3]]
 *         ], {});
 *     var vf = view.create('vectorfield3d', [
 *         [(x, y, z) => Math.cos(y), (x, y, z) => Math.sin(x), (x, y, z) => z],
 *         [-2, 5, 2], // x from -2 to 2 in 5 steps
 *         [-2, 5, 2], // y
 *         [-2, 5, 2] // z
 *     ], {
 *         strokeColor: 'red',
 *         scale: 0.5
 *     });
 *
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createVectorfield3D = function(board, parents, attributes) {
    var view = parents[0], el, attr;
    if (!(parents.length >= 5 && (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[1]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[1]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(parents[1])) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[2]) && parents[1].length === 3 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[3]) && parents[2].length === 3 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[4]) && parents[3].length === 3)) {
        throw new Error("JSXGraph: Can't create vector field 3D with parent types " + "'" + typeof parents[1] + "', " + "'" + typeof parents[2] + "', " + "'" + typeof parents[3] + "'." + "'" + typeof parents[4] + "', ");
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'vectorfield3d');
    el = view.create('curve3d', [
        [],
        [],
        []
    ], attr);
    /**
     * Set the defining functions of 3D vector field.
     * @memberOf Vectorfield3D
     * @name setF
     * @function
     * @param {Array|Function} func Either an array containing three functions f1(x, y, z),
     * f2(x, y, z), and f3(x, y, z) or function f(x, y, z) returning an array of length 3.
     * @returns {Object} Reference to the 3D vector field object.
     *
     * @example
     * field.setF([(x, y, z) => Math.sin(y), (x, y, z) => Math.cos(x), (x, y, z) => z]);
     * board.update();
     *
     */ el.setF = function(func, varnames) {
        var f0, f1, f2;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(func)) {
            f0 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunction(func[0], this.board, varnames);
            f1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunction(func[1], this.board, varnames);
            f2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunction(func[2], this.board, varnames);
            /**
             * @ignore
             */ this.F = function(x, y, z) {
                return [
                    f0(x, y, z),
                    f1(x, y, z),
                    f2(x, y, z)
                ];
            };
        } else {
            this.F = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunction(func, el.board, varnames);
        }
        return this;
    };
    el.setF(parents[1], 'x, y, z');
    el.xData = parents[2];
    el.yData = parents[3];
    el.zData = parents[4];
    el.updateDataArray = function() {
        var k, i, j, v, nrm, x, y, z, scale = this.evalVisProp('scale'), start = [
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.xData[0]),
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.yData[0]),
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.zData[0])
        ], steps = [
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.xData[1]),
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.yData[1]),
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.zData[1])
        ], end = [
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.xData[2]),
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.yData[2]),
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.zData[2])
        ], delta = [
            (end[0] - start[0]) / steps[0],
            (end[1] - start[1]) / steps[1],
            (end[2] - start[2]) / steps[2]
        ], phi, theta1, theta2, theta, showArrow = this.evalVisProp('arrowhead.enabled'), leg, leg_x, leg_y, leg_z, alpha;
        if (showArrow) {
            // Arrow head style
            // leg = 8;
            // alpha = Math.PI * 0.125;
            leg = this.evalVisProp('arrowhead.size');
            alpha = this.evalVisProp('arrowhead.angle');
            leg_x = leg / board.unitX;
            leg_y = leg / board.unitY;
            leg_z = leg / Math.sqrt(board.unitX * board.unitY);
        }
        this.dataX = [];
        this.dataY = [];
        this.dataZ = [];
        for(i = 0, x = start[0]; i <= steps[0]; x += delta[0], i++){
            for(j = 0, y = start[1]; j <= steps[1]; y += delta[1], j++){
                for(k = 0, z = start[2]; k <= steps[2]; z += delta[2], k++){
                    v = this.F(x, y, z);
                    nrm = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].norm(v);
                    if (nrm < Number.EPSILON) {
                        continue;
                    }
                    v[0] *= scale;
                    v[1] *= scale;
                    v[2] *= scale;
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
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataZ, [
                        z,
                        z + v[2],
                        NaN
                    ]);
                    if (showArrow) {
                        // Arrow head
                        nrm *= scale;
                        phi = Math.atan2(v[1], v[0]);
                        theta = Math.asin(v[2] / nrm);
                        theta1 = theta - alpha;
                        theta2 = theta + alpha;
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataX, [
                            x + v[0] - leg_x * Math.cos(phi) * Math.cos(theta1),
                            x + v[0],
                            x + v[0] - leg_x * Math.cos(phi) * Math.cos(theta2),
                            NaN
                        ]);
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataY, [
                            y + v[1] - leg_y * Math.sin(phi) * Math.cos(theta1),
                            y + v[1],
                            y + v[1] - leg_y * Math.sin(phi) * Math.cos(theta2),
                            NaN
                        ]);
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(this.dataZ, [
                            z + v[2] - leg_z * Math.sin(theta2),
                            z + v[2],
                            z + v[2] - leg_z * Math.sin(theta1),
                            NaN
                        ]);
                    }
                }
            }
        }
    };
    el.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(el.methodMap, {
        setF: "setF"
    });
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("vectorfield3D", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createVectorfield3D);
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/linspace3d.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Aaron Fenyes,
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
 */ /*global JXG:true, define: true*/ /**
 * Create linear spaces of dimension at least one,
 * i.e. lines and planes.
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-ssr] (ecmascript)");
;
;
;
;
;
// -----------------------
//  Lines
// -----------------------
/**
 * Constructor for 3D lines.
 * @class Creates a new 3D line object. Do not use this constructor to create a 3D line. Use {@link JXG.View3D#create} with type {@link Line3D} instead.
 *
 * @augments JXG.GeometryElement3D
 * @augments JXG.GeometryElement
 * @param {View3D} view
 * @param {Point3D|Array} point
 * @param {Array} direction
 * @param {Array} range
 * @param {Object} attributes
 * @see JXG.Board#generateName
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Line3D = function(view, point, direction, range, attributes) {
    this.constructor(view.board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_LINE3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_3D);
    this.constructor3D(view, 'line3d');
    /**
     * 3D point which - together with a direction - defines the line.
     * @name point
     * @memberOf Line3D
     * @type Point3D
     *
     * @see Line3D#direction
     */ this.point = point;
    /**
     * Direction which - together with a point - defines the line. Array of numbers or functions (of length 3) or function
     * returning array of length 3.
     *
     * @name Line3D#direction
     * @type Array|Function
     * @see Line3D.point
     */ this.direction = direction;
    /**
     * Spanning vector of the 3D line. Contains the evaluated coordinates from {@link direction}
     * and {@link range}.
     * The array has length 4, the first entry being 0.
     *
     * @name Line3D#vec
     * @type {Array}
     */ this.vec = [
        0,
        0,
        0,
        0
    ];
    /**
     * Range [r1, r2] of the line. r1, r2 can be numbers or functions.
     * The 3D line goes from (point + r1 * direction) to (point + r2 * direction)
     * @name Line3D#range
     * @type Array
     * @default [-Infinity, Infinity]
     */ this.range = range || [
        -Infinity,
        Infinity
    ];
    /**
     * Starting point of the 3D line
     * @name Line3D#point1
     * @type JXG.Point3D
     * @private
     */ this.point1 = null;
    /**
     * End point of the 3D line
     * @name Line3D#point2
     * @type JXG.Point3D
     * @private
     */ this.point2 = null;
    this.board.finalizeAdding(this);
    this.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(this.methodMap, {
    });
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Line3D.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyPrototypeMethods(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Line3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement3D, 'constructor3D');
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Line3D.prototype, /** @lends JXG.Line3D.prototype */ {
    /**
         * Update the array {@link Line3D#vec} containing the homogeneous coords of the spanning vector.
         *
         * @name Line3D#updateCoords
         * @function
         * @returns {Object} Reference to Line3D object
         * @private
         */ updateCoords: function() {
        var i, s = 0;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.direction.view) && this.direction.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_LINE3D) {
            // direction is another line3D object
            this.vec = this.direction.vec.slice();
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(this.direction)) {
            this.vec = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.direction);
            if (this.vec.length === 3) {
                this.vec.unshift(0);
            }
        } else {
            if (this.direction.length === 3) {
                this.vec[0] = 0;
                s = 1;
            }
            for(i = 0; i < this.direction.length; i++){
                this.vec[s + i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.direction[i]);
            }
        }
        return this;
    },
    /**
         * Determine one end point of a 3D line from point, direction and range).
         *
         * @name Line3D#getPointCoords
         * @param {Number|function} r Usually, one of the range borders.
         * @private
         * @returns {Array} Coordinates of length 4.
         */ getPointCoords: function(r) {
        var p = [], d = [], r0;
        p = this.point.coords;
        d = this.vec;
        // Intersect the ray - if necessary - with the cube,
        // i.e. clamp the line.
        r0 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(r);
        r = this.view.intersectionLineCube(p, d, r0);
        // Check if r is infinite. This happens
        // if this.vec is the zero vector.
        if (Math.abs(r) === Infinity) {
            r = 0;
        }
        return [
            p[0] + d[0] * r,
            p[1] + d[1] * r,
            p[2] + d[2] * r,
            p[3] + d[3] * r
        ];
    },
    addTransform: function(el, transform) {
        this.point.addTransform(el.point, transform);
        this.addTransformGeneric(el, transform);
        return this;
    },
    updateTransform: function() {
        var c, i;
        if (this.transformations.length === 0 || this.baseElement === null) {
            return this;
        }
        if (this === this.baseElement) {
            c = this.vec;
        } else {
            c = this.baseElement.vec;
        }
        for(i = 0; i < this.transformations.length; i++){
            this.transformations[i].update();
            c = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(this.transformations[i].matrix, c);
        }
        this.vec = c;
        return this;
    },
    // Already documented in JXG.GeometryElement
    update: function() {
        if (this.needsUpdate) {
            this.updateCoords().updateTransform();
        }
        return this;
    },
    /**
         * Set the 2D position of the defining points.
         *
         * @name Line3D#setPosition2D
         * @function
         * @param {JXG.Transformation} t projective 2D transformation
         * @private
         */ setPosition2D: function(t) {
        var j, el;
        for(j = 0; j < this.parents.length; j++){
            // Run through defining 3D points
            el = this.view.select(this.parents[j]);
            if (el.elType === 'point3d' && el.element2D.draggable()) {
                t.applyOnce(el.element2D);
            }
        }
        this.endpoints[0].update();
        this.endpoints[1].update();
    },
    // Already documented in JXG.GeometryElement
    updateRenderer: function() {
        this.needsUpdate = false;
        return this;
    },
    // Already documented in element3d.js
    projectCoords: function(p, params) {
        var p0_coords = this.getPointCoords(0), p1_coords = this.getPointCoords(1), dir = [
            p1_coords[0] - p0_coords[0],
            p1_coords[1] - p0_coords[1],
            p1_coords[2] - p0_coords[2]
        ], diff = [
            p[0] - p0_coords[0],
            p[1] - p0_coords[1],
            p[2] - p0_coords[2]
        ], t = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(diff, dir) / __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(dir, dir), t_clamped = Math.min(Math.max(t, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.range[0])), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.range[1])), c3d;
        c3d = this.getPointCoords(t_clamped).slice();
        params[0] = t_clamped;
        return c3d;
    },
    // projectScreenCoords: function (pScr) {
    //     var end0 = this.getPointCoords(0),
    //         end1 = this.getPointCoords(1);
    //     return this.view.projectScreenToSegment(pScr, end0, end1);
    // },
    /**
         * Update the z-index of the line, i.e. the z-index of its midpoint.
         * @name Line3D#updateZIndex
         * @function
         * @returns {Object} Reference to Line3D object
         */ updateZIndex: function() {
        var p1 = this.endpoints[0], p2 = this.endpoints[1], c3d = [
            1,
            p1.X() + p2.X(),
            p1.Y() + p2.Y(),
            p1.Z() + p2.Z()
        ];
        c3d[1] *= 0.5;
        c3d[2] *= 0.5;
        c3d[3] *= 0.5;
        // this.zIndex = Mat.matVecMult(this.view.matrix3DRotShift, c3d)[3];
        this.zIndex = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(this.view.matrix3DRotShift[3], c3d);
        return this;
    }
});
/**
 * @class A line in 3D is given by two points, or one point and a direction vector.
 *
 * @description
 * A line in 3D is given by two points, or one point and a direction vector.
 * That is, there are the following two possibilities to create a Line3D object:
 * <ol>
 * <li> The 3D line is defined by two 3D points (Point3D):
 * The points can be either existing points or coordinate arrays of
 * the form [x, y, z].
 * <p> The 3D line is defined by a point (or coordinate array [x, y, z])
 * a direction given as array [x, y, z] and an optional range
 * given as array [s, e]. The default value for the range is [-Infinity, Infinity].
 * </ol>
 * All numbers can also be provided as functions returning a number.
 * The case [point, array] is ambiguous, it is not clear if 'array' contains the coordinates of a point
 * or of a direction. In that case, 'array' is interpreted as the coordinate array of a point,
 * i.e. the line is defined by two points.
 *
 * @pseudo
 * @name Line3D
 * @augments JXG.GeometryElement3D
 * @constructor
 * @type JXG.Line3D
 * @throws {Exception} If the element cannot be constructed with the given parent
 * objects an exception is thrown.
 * @param {JXG.Point3D,array,function_JXG.Point3D,array,function} point1,point2 First and second defining point of the line.
 * The attributes {@link Line3D#straightFirst} and {@link Line3D#straightLast} control if the line is displayed as
 * segment, ray or infinite line.
 * @param {JXG.Point3D,array,function_JXG.Line3D,array,function_array,function} point,direction,range The line is defined by point, direction and range.
 * <ul>
 * <li> point: Point3D or array of length 3
 * <li> direction: array of length 3 or function returning an array of numbers or function returning an array
 * <li> range: array of length 2, elements can also be functions. Use [-Infinity, Infinity] for infinite lines.
 * </ul>
 *
 * @example
 *     var bound = [-5, 5];
 *     var view = board.create('view3d',
 *         [[-6, -3], [8, 8],
 *         [bound, bound, bound]],
 *         {});
 *     var p = view.create('point3d', [1, 2, 2], { name:'A', size: 5 });
 *     // Lines through 2 points
 *     var l1 = view.create('line3d', [[1, 3, 3], [-3, -3, -3]], {point1: {visible: true}, point2: {visible: true} });
 *     var l2 = view.create('line3d', [p, l1.point1]);
 *
 *     // Line by point, direction, range
 *     var l3 = view.create('line3d', [p, [0, 0, 1], [-2, 4]]);
 *
 * </pre><div id='JXG05f9baa4-6059-4502-8911-6a934f823b3d' class='jxgbox' style='width: 300px; height: 300px;'></div>
 * <script type='text/javascript'>
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG05f9baa4-6059-4502-8911-6a934f823b3d',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *         var bound = [-5, 5];
 *         var view = board.create('view3d',
 *             [[-6, -3], [8, 8],
 *             [bound, bound, bound]],
 *             {});
 *         var p = view.create('point3d', [1, 2, 2], { name:'A', size: 5 });
 *         // Lines through 2 points
 *         var l1 = view.create('line3d', [[1, 3, 3], [-3, -3, -3]], {name: 'll1', point1: {visible: true}, point2: {visible: true} });
 *         var l2 = view.create('line3d', [p, l1.point1]);
 *         // Line by point, direction, range
 *         var l3 = view.create('line3d', [p, [0, 0, 1], [-2, 4]]);
 *     })();
 *
 * </script><pre>
 *
 * @example
 *     var view = board.create(
 *         'view3d',
 *         [[-6, -3], [8, 8],
 *         [[-3, 3], [-3, 3], [-3, 3]]],
 *         {
 *             depthOrder: {
 *                 enabled: true
 *             },
 *             projection: 'central',
 *             xPlaneRear: {fillOpacity: 0.2},
 *             yPlaneRear: {fillOpacity: 0.2},
 *             zPlaneRear: {fillOpacity: 0.2}
 *         }
 *     );
 *
 *     var A = view.create('point3d', [0, 0, 0], {size: 2});
 *     var B = view.create('point3d', [2, 1, 1], {size: 2});
 *     var C = view.create('point3d', [-2.5, 2.5, 1.5], {size: 2});
 *
 *     // Draggable line by two points
 *     var line1 = view.create('line3d', [A, B], {
 *         fixed: false,
 *         straightFirst: true,
 *         straightLast: true,
 *         dash: 2
 *     });
 *
 *     // Line by point, direction, and range
 *     var line2 = view.create('line3d', [C, [1, 0, 0], [-1, Infinity]], {
 *         strokeColor: 'blue'
 *     });
 *
 *     // Line by point and array
 *     var line3 = view.create('line3d', [C, [-2.5, -1, 1.5]], {
 *         point2: { visible: true},
 *         strokeColor: 'red'
 *     });
 *
 * </pre><div id="JXGc42dda18-0a72-45f2-8add-3b2ad7e10853" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGc42dda18-0a72-45f2-8add-3b2ad7e10853',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *         var view = board.create(
 *             'view3d',
 *             [[-6, -3], [8, 8],
 *             [[-3, 3], [-3, 3], [-3, 3]]],
 *             {
 *                 depthOrder: {
 *                     enabled: true
 *                 },
 *                 projection: 'central',
 *                 xPlaneRear: {fillOpacity: 0.2},
 *                 yPlaneRear: {fillOpacity: 0.2},
 *                 zPlaneRear: {fillOpacity: 0.2}
 *             }
 *         );
 *
 *         var A = view.create('point3d', [0, 0, 0], {size: 2});
 *         var B = view.create('point3d', [2, 1, 1], {size: 2});
 *         var C = view.create('point3d', [-2.5, 2.5, 1.5], {size: 2});
 *
 *         // Draggable line by two points
 *         var line1 = view.create('line3d', [A, B], {
 *             fixed: false,
 *             straightFirst: true,
 *             straightLast: true,
 *             dash: 2
 *         });
 *
 *         // Line by point, direction, and range
 *         var line2 = view.create('line3d', [C, [1, 0, 0], [-1, Infinity]], {
 *             strokeColor: 'blue'
 *         });
 *
 *         // Line by point and array
 *         var line3 = view.create('line3d', [C, [-2.5, -1, 1.5]], {
 *             point2: { visible: true},
 *             strokeColor: 'red'
 *         });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 *  var view = board.create(
 *      'view3d',
 *      [[-6, -3], [8, 8],
 *      [[-3, 3], [-3, 3], [-3, 3]]],
 *      {
 *          depthOrder: {
 *              enabled: true
 *          },
 *          projection: 'parallel',
 *          xPlaneRear: { fillOpacity: 0.2 },
 *          yPlaneRear: { fillOpacity: 0.2 },
 *          zPlaneRear: { fillOpacity: 0.2 }
 *      }
 *  );
 *
 *
 * var A = view.create('point3d', [-2, 0, 1], { size: 2 });
 * var B = view.create('point3d', [-2, 0, 2], { size: 2 });
 * var line1 = view.create('line3d', [A, B], {
 *     fixed: false,
 *     strokeColor: 'blue',
 *     straightFirst: true,
 *     straightLast: true
 * });
 *
 * var C = view.create('point3d', [2, 0, 1], { size: 2 });
 * var line2 = view.create('line3d', [C, line1, [-Infinity, Infinity]], { strokeColor: 'red' });
 *
 * </pre><div id="JXGc9234445-de9b-4543-aae7-0ef2d0b540e6" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGc9234445-de9b-4543-aae7-0ef2d0b540e6',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *                 var view = board.create(
 *                     'view3d',
 *                     [[-6, -3], [8, 8],
 *                     [[-3, 3], [-3, 3], [-3, 3]]],
 *                     {
 *                         depthOrder: {
 *                             enabled: true
 *                         },
 *                         projection: 'parallel',
 *                         xPlaneRear: { fillOpacity: 0.2 },
 *                         yPlaneRear: { fillOpacity: 0.2 },
 *                         zPlaneRear: { fillOpacity: 0.2 }
 *                     }
 *                 );
 *
 *
 *                 var A = view.create('point3d', [-2, 0, 1], { size: 2 });
 *                 var B = view.create('point3d', [-2, 0, 2], { size: 2 });
 *                 var line1 = view.create('line3d', [A, B], {
 *                     fixed: false,
 *                     strokeColor: 'blue',
 *                     straightFirst: true,
 *                     straightLast: true
 *                 });
 *
 *                 var C = view.create('point3d', [2, 0, 1], { size: 2 });
 *                 var line2 = view.create('line3d', [C, line1, [-Infinity, Infinity]], { strokeColor: 'red' });
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createLine3D = function(board, parents, attributes) {
    var view = parents[0], attr, points, point, direction, range, point1, point2, endpoints, el, base = null, transform = null;
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'line3d');
    // In any case, parents[1] contains a point or point coordinates
    if (parents[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_LINE3D && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isTransformationOrArray(parents[2])) {
        base = parents[1];
        transform = parents[2];
        points = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints3D(view, [
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ]
        ], attributes, 'line3d', [
            'point1',
            'point2'
        ]);
    }
    if (base === null && // No transformation
    (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint3D(parents[2]) || parents.length === 3 && (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[2]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[2])))) {
        // Line defined by two points; [view, point1, point2]
        point1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints3D(view, [
            parents[1]
        ], attributes, 'line3d', [
            'point1'
        ])[0];
        point2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints3D(view, [
            parents[2]
        ], attributes, 'line3d', [
            'point2'
        ])[0];
        direction = function() {
            return [
                0,
                point2.X() - point1.X(),
                point2.Y() - point1.Y(),
                point2.Z() - point1.Z()
            ];
        };
        range = [
            0,
            1
        ]; // Segment by default
        el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Line3D(view, point1, direction, range, attr);
        el.prepareUpdate().update();
        // Create two shadow points that are the end points of the visible line.
        // This is of relevance if the line has straightFirst or straightLast set to true, then
        // endpoints differ from point1, point2.
        // In such a case, the endpoints are the intersection of the line with the cube.
        endpoints = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints3D(view, [
            [
                1,
                0,
                0,
                0
            ],
            [
                1,
                0,
                0,
                0
            ]
        ], {
            visible: true
        }, 'line3d', [
            'point1',
            'point2'
        ]);
        /**
         * @class
         * @ignore
         */ endpoints[0].F = function() {
            var r = 0;
            if (el.evalVisProp('straightfirst')) {
                r = -Infinity;
            }
            return el.getPointCoords(r);
        };
        /**
         * @class
         * @ignore
         */ endpoints[1].F = function() {
            var r = 1;
            if (el.evalVisProp('straightlast')) {
                r = Infinity;
            }
            return el.getPointCoords(r);
        };
        endpoints[0].prepareUpdate().update();
        endpoints[1].prepareUpdate().update();
        // The 2D line is always a segment.
        attr = el.setAttr2D(attr);
        attr.straightfirst = false;
        attr.straightlast = false;
        el.element2D = view.create('segment', [
            endpoints[0].element2D,
            endpoints[1].element2D
        ], attr);
        el.element2D.view = view;
        /**
         * Shadow points that determine the visible line.
         * This is of relevance if the line is defined by two points and has straightFirst or straightLast set to true.
         * In such a case, the shadow points are the intersection of the line with the cube.
         *
         * @name JXG.Point3D.endpoints
         * @type Array
         * @private
         */ el.endpoints = endpoints;
        el.addChild(endpoints[0]);
        el.addChild(endpoints[1]);
        // el.setParents(endpoints);
        el.addParents([
            point1,
            point2
        ]);
    } else {
        // Line defined by point, direction and range
        // Directions are handled as arrays of length 4, i.e. with homogeneous coordinates.
        if (base !== null) {
            point = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints3D(view, [
                [
                    0,
                    0,
                    0
                ]
            ], attributes, 'line3d', [
                'point'
            ])[0];
            direction = [
                0,
                0,
                0,
                0.0001
            ];
            range = parents[3] || [
                -Infinity,
                Infinity
            ];
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parents[2].view) && parents[2].type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_LINE3D || // direction given by another line
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(parents[2]) || parents[2].length === 3 || parents[2].length === 4 // direction given as function or array
        ) {
            point = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints3D(view, [
                parents[1]
            ], attributes, 'line3d', [
                'point'
            ])[0];
            direction = parents[2];
            range = parents[3];
        } else {
            throw new Error("JSXGraph: Can't create line3d with parents of type '" + typeof parents[1] + ", " + typeof parents[2] + ", " + typeof parents[3] + "'.");
        }
        points = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints3D(view, [
            [
                1,
                0,
                0,
                0
            ],
            [
                1,
                0,
                0,
                0
            ]
        ], attributes, 'line3d', [
            'point1',
            'point2'
        ]);
        // Create a line3d with two dummy points
        el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Line3D(view, point, direction, range, attr);
        el.prepareUpdate().update();
        // Now set the real points which define the line
        /**
         * @class
         * @ignore
         */ points[0].F = function() {
            return el.getPointCoords(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(el.range[0]));
        };
        points[0].prepareUpdate().update();
        point1 = points[0];
        /**
         * @class
         * @ignore
         */ points[1].F = function() {
            return el.getPointCoords(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(el.range[1]));
        };
        points[1].prepareUpdate().update();
        point2 = points[1];
        attr = el.setAttr2D(attr);
        attr.straightfirst = false;
        attr.straightlast = false;
        el.element2D = view.create('segment', [
            point1.element2D,
            point2.element2D
        ], attr);
        el.element2D.view = view;
        /**
         * Array of length 2 containing the endings of the Line3D element. These are the defining points,
         * the intersections of the line with the bounding box, or the endings defined by the range.
         * @name Line3D#endpoints
         * @type {Array}
         */ el.endpoints = points;
        el.addParents(point);
        if (base !== null && transform !== null) {
            el.addTransform(base, transform);
            el.addParents(base);
        }
    }
    el.addChild(el.element2D);
    el.inherits.push(el.element2D);
    el.element2D.addParents(el);
    el.point1 = point1;
    el.point2 = point2;
    if (el.point1._is_new) {
        el.addChild(el.point1);
        delete el.point1._is_new;
    } else {
        el.point1.addChild(el);
    }
    if (el.point2._is_new) {
        el.addChild(el.point2);
        delete el.point2._is_new;
    } else {
        el.point2.addChild(el);
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(point)) {
        if (point._is_new) {
            el.addChild(point);
            delete point._is_new;
        } else {
            point.addChild(el);
        }
    }
    el.update();
    el.element2D.prepareUpdate().update().updateRenderer();
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement('line3d', __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createLine3D);
// -----------------------
//  Planes
// -----------------------
/**
 * Constructor for 3D planes.
 * @class Creates a new 3D plane object. Do not use this constructor to create a 3D plane. Use {@link JXG.Board#create} with type {@link Plane3D} instead.
 *
 * @augments JXG.GeometryElement3D
 * @augments JXG.GeometryElement
 * @param {View3D} view
 * @param {Point3D|Array} point
 * @param {Array} direction1
 * @param {Array} range_u
 * @param {Array} direction2
 * @param {Array} range_v
 * @param {Object} attributes
 * @see JXG.Board#generateName
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Plane3D = function(view, point, dir1, range_u, dir2, range_v, attributes) {
    this.constructor(view.board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_PLANE3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_3D);
    this.constructor3D(view, 'plane3d');
    this.board.finalizeAdding(this);
    /**
     * 3D point which - together with two direction vectors - defines the plane.
     *
     * @name point
     * @memberOf Plane3D
     * @type JXG.Point3D
     *
     * @see Plane3D#direction1
     * @see Plane3D#direction2
     */ this.point = point;
    /**
     * Two linearly independent vectors - together with a point - define the plane. Each of these direction vectors is an
     * array of numbers or functions (either of length 3 or 4) or function returning array of length 3 or 4.
     * Homogeneous coordinates of directions have the form [0, x, y, z].
     *
     * @name Plane3D#direction1
     * @type Array|Function
     *
     * @see Plane3D.point
     * @see Plane3D#direction2
     */ this.direction1 = dir1;
    /**
     * Two linearly independent vectors - together with a point - define the plane. Each of these direction vectors is an
     * array of numbers or functions (either of length 3 or 4) or function returning array of length 3 or 4.
     * Homogeneous coordinates of directions have the form [0, x, y, z].
     *
     * @type Array|Function
     * @name Plane3D#direction2
     * @see Plane3D.point
     * @see Plane3D#direction1
     */ this.direction2 = dir2;
    /**
     * Range [r1, r2] of {@link direction1}. The 3D line goes from (point + r1 * direction1) to (point + r2 * direction1)
     * @name Plane3D#range_u
     * @type {Array}
     * @default [-Infinity, Infinity]
     * @default
     */ this.range_u = range_u || [
        -Infinity,
        Infinity
    ];
    /**
     * Range [r1, r2] of {@link direction2}. The 3D line goes from (point + r1 * direction2) to (point + r2 * direction2)
     * @name Plane3D#range_v
     * @type {Array}
     * @type {Array}
     * @default [-Infinity, Infinity]
     */ this.range_v = range_v || [
        -Infinity,
        Infinity
    ];
    /**
     * Spanning vector 1 of the 3D plane. Contains the evaluated coordinates from {@link direction1} and {@link range1}.
     * and is of length 4, the first entry being 0, i.e. homogenous coordinates.
     *
     * @name Plane3D#vec1
     * @type Array
     * @private
     *
     * @see Plane3D#updateCoords
     */ this.vec1 = [
        0,
        0,
        0,
        0
    ];
    /**
     * Spanning vector 2 of the 3D plane. Contains the evaluated coordinates from {@link Plane3D#direction2} and {@link Plane3D#range2}
     * and is of length 4, the first entry being 0, i.e. homogenous coordinates.
     *
     * @name Plane3D#vec2
     * @type Array
     * @private
     *
     * @see Plane3D#updateCoords
     */ this.vec2 = [
        0,
        0,
        0,
        0
    ];
    /**
     * Mesh (grid) element of the plane.
     *
     * @name Plane3D#mesh3d
     * @type Mesh3D
     * @private
     */ this.mesh3d = null;
    /**
     * Normal vector of the plane. Left hand side of the Hesse normal form.
     * @name Plane3D#normal
     * @type Array
     * @private
     *
     * @see Plane3D.updateNormal
     *
     */ this.normal = [
        0,
        0,
        0,
        0
    ];
    /**
     * Right hand side of the Hesse normal form.
     * @name Plane3D#d
     * @type Array
     * @private
     *
     * @see Plane3D.updateNormal
     *
     */ this.d = 0;
    this.updateCoords();
    this.updateNormal();
    this.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(this.methodMap, {
    });
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Plane3D.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyPrototypeMethods(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Plane3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement3D, 'constructor3D');
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Plane3D.prototype, /** @lends JXG.Plane3D.prototype */ {
    /**
         * Get coordinate array [x, y, z] of a point on the plane for parameters (u, v).
         *
         * @name Plane3D#F
         * @function
         * @param {Number} u
         * @param {Number} v
         * @returns Array of length 3.
         */ F: function(u, v) {
        var i, v1, v2, l1, l2;
        v1 = this.vec1.slice();
        v2 = this.vec2.slice();
        l1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].norm(v1, 3);
        l2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].norm(v2, 3);
        for(i = 0; i < 3; i++){
            v1[i] /= l1;
            v2[i] /= l2;
        }
        return [
            this.point.X() + u * v1[0] + v * v2[0],
            this.point.Y() + u * v1[1] + v * v2[1],
            this.point.Z() + u * v1[2] + v * v2[2]
        ];
    },
    /**
         * Get x-coordinate of a point on the plane for parameters (u, v).
         *
         * @name Plane3D#X
         * @function
         * @param {Number} u
         * @param {Number} v
         * @returns Number
         */ X: function(u, v) {
        return this.F(u, v)[0];
    },
    /**
         * Get y-coordinate of a point on the plane for parameters (u, v).
         *
         * @name Plane3D#Y
         * @function
         * @param {Number} u
         * @param {Number} v
         * @returns Number
         */ Y: function(u, v) {
        return this.F(u, v)[1];
    },
    /**
         * Get z-coordinate of a point on the plane for parameters (u, v).
         *
         * @name Plane3D#Z
         * @function
         * @param {Number} u
         * @param {Number} v
         * @returns Number
         */ Z: function(u, v) {
        return this.F(u, v)[2];
    },
    /**
         * Update the arrays {@link JXG.Plane3D#vec1} and {@link JXG.Plane3D#vec1} containing the homogeneous coords of the spanning vectors.
         *
         * @name Plane3D#updateCoords
         * @function
         * @returns {Object} Reference to Plane3D object
         * @private
         */ updateCoords: function() {
        var i, s;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.direction1.view) && this.direction1.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_LINE3D) {
            this.vec1 = this.direction1.vec.slice();
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(this.direction1)) {
            this.vec1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.direction1);
            if (this.vec1.length === 3) {
                this.vec1.unshift(0);
            }
        } else {
            s = 0;
            if (this.direction1.length === 3) {
                this.vec1[0] = 0;
                s = 1;
            }
            for(i = 0; i < this.direction1.length; i++){
                this.vec1[s + i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.direction1[i]);
            }
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.direction2.view) && this.direction2.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_LINE3D) {
            this.vec2 = this.direction2.vec.slice();
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(this.direction2)) {
            this.vec2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.direction2);
            if (this.vec2.length === 3) {
                this.vec2.unshift(0);
            }
        } else {
            s = 0;
            if (this.direction2.length === 3) {
                this.vec2[0] = 0;
                s = 1;
            }
            for(i = 0; i < this.direction2.length; i++){
                this.vec2[s + i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.direction2[i]);
            }
        }
        return this;
    },
    /**
         * Update the Hesse normal form of the plane, i.e. update normal vector and right hand side.
         * Updates also {@link vec1} and {@link vec2}.
         *
         * @name Plane3D#updateNormal
         * @function
         * @returns {Object} Reference to the Plane3D object
         * @private
         * @example
         *    plane.updateNormal();
         *
         */ updateNormal: function() {
        var i, len;
        if (!this.needsUpdate) {
        // Extraordinary update, conflicts with rotating of box and plane transformations
        // this.updateCoords();
        }
        this.normal = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct(this.vec1.slice(1), this.vec2.slice(1));
        len = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].norm(this.normal);
        if (Math.abs(len) > __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps * __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps) {
            for(i = 0; i < 3; i++){
                this.normal[i] /= len;
            }
        }
        this.normal.unshift(0);
        this.d = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(this.point.coords, this.normal, 4);
        return this;
    },
    // Already documented in element3d.js
    updateDataArray: function() {
        var s1, e1, s2, e2, c2d, l1, l2, planes = [
            'xPlaneRear',
            'yPlaneRear',
            'zPlaneRear'
        ], points = [], v1 = [
            0,
            0,
            0
        ], v2 = [
            0,
            0,
            0
        ], q = [
            0,
            0,
            0
        ], p = [
            0,
            0,
            0
        ], eps = 1.e-12, d, i, j, a, b, first, pos, pos_akt, view = this.view;
        this.dataX = [];
        this.dataY = [];
        this.updateNormal();
        // Infinite plane
        if (this.elType !== 'axisplane3d' && view.defaultAxes && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.range_u[0]) === -Infinity && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.range_u[1]) === Infinity && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.range_v[0]) === -Infinity && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.range_v[1]) === Infinity) {
            // Determine the intersections of the new plane with
            // the view bbox3d.
            //
            // Start with the rear plane.
            // For each face of the bbox3d we determine two points
            // which are the end points of the intersecting line
            // between the plane and a face of bbox3d.
            // We start with the three rear planes (set in planes[] above)
            for(j = 0; j < planes.length; j++){
                p = view.intersectionPlanePlane(this, view.defaultAxes[planes[j]]);
                if (p[0] !== false && p[1] !== false) {
                    // This test is necessary to filter out intersection lines which are
                    // identical to intersections of axis planes (they would occur twice),
                    // i.e. edges of bbox3d.
                    for(i = 0; i < points.length; i++){
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(p[0], points[i][0], 4) < eps && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(p[1], points[i][1], 4) < eps || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(p[0], points[i][1], 4) < eps && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(p[1], points[i][0], 4) < eps) {
                            break;
                        }
                    }
                    if (i === points.length) {
                        points.push(p.slice());
                    }
                }
                // Take a point on the corresponding front plane of bbox3d.
                p = [
                    1,
                    0,
                    0,
                    0
                ];
                p[j + 1] = view.bbox3D[j][1];
                // Use the Hesse normal form of front plane to intersect it with the plane
                // d is the rhs of the Hesse normal form of the front plane.
                d = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(p, view.defaultAxes[planes[j]].normal, 4);
                p = view.intersectionPlanePlane(this, view.defaultAxes[planes[j]], d);
                if (p[0] !== false && p[1] !== false) {
                    // Do the same test as above
                    for(i = 0; i < points.length; i++){
                        // Same test for edges of bbox3d as above
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(p[0], points[i][0], 4) < eps && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(p[1], points[i][1], 4) < eps || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(p[0], points[i][1], 4) < eps && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(p[1], points[i][0], 4) < eps) {
                            break;
                        }
                    }
                    if (i === points.length) {
                        points.push(p.slice());
                    }
                }
            }
            // Handle the case that the plane does not intersect bbox3d at all.
            if (points.length === 0) {
                return {
                    X: this.dataX,
                    Y: this.dataY
                };
            }
            // Concatenate the intersection points to a polygon.
            // If all went well, each intersection should appear
            // twice in the list.
            first = 0;
            pos = first;
            i = 0;
            do {
                p = points[pos][i];
                if (p.length === 4) {
                    c2d = view.project3DTo2D(p);
                    this.dataX.push(c2d[1]);
                    this.dataY.push(c2d[2]);
                }
                i = (i + 1) % 2;
                p = points[pos][i];
                pos_akt = pos;
                for(j = 0; j < points.length; j++){
                    if (j !== pos && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(p, points[j][0]) < eps) {
                        pos = j;
                        i = 0;
                        break;
                    }
                    if (j !== pos && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(p, points[j][1]) < eps) {
                        pos = j;
                        i = 1;
                        break;
                    }
                }
                if (pos === pos_akt) {
                    console.log('Error plane3d update: did not find next', pos);
                    break;
                }
            }while (pos !== first)
            c2d = view.project3DTo2D(points[first][0]);
            this.dataX.push(c2d[1]);
            this.dataY.push(c2d[2]);
        } else {
            // 3D bounded flat
            s1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.range_u[0]);
            e1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.range_u[1]);
            s2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.range_v[0]);
            e2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.range_v[1]);
            q = this.point.coords;
            v1 = this.vec1.slice();
            v2 = this.vec2.slice();
            l1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].norm(v1, 4);
            l2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].norm(v2, 4);
            for(i = 1; i < 4; i++){
                v1[i] /= l1;
                v2[i] /= l2;
            }
            for(j = 0; j < 4; j++){
                switch(j){
                    case 0:
                        a = s1;
                        b = s2;
                        break;
                    case 1:
                        a = e1;
                        b = s2;
                        break;
                    case 2:
                        a = e1;
                        b = e2;
                        break;
                    case 3:
                        a = s1;
                        b = e2;
                }
                for(i = 0; i < 4; i++){
                    p[i] = q[i] + a * v1[i] + b * v2[i];
                }
                c2d = view.project3DTo2D(p);
                this.dataX.push(c2d[1]);
                this.dataY.push(c2d[2]);
            }
            // Close the curve
            this.dataX.push(this.dataX[0]);
            this.dataY.push(this.dataY[0]);
        }
        return {
            X: this.dataX,
            Y: this.dataY
        };
    },
    // Already documented in element3d.js
    addTransform: function(el, transform) {
        this.addTransformGeneric(el, transform);
        this.point.addTransform(el.point, transform);
        return this;
    },
    // Already documented in element3d.js
    updateTransform: function() {
        var c1, c2, i;
        if (this.transformations.length === 0 || this.baseElement === null) {
            return this;
        }
        if (this === this.baseElement) {
            c1 = this.vec1;
            c2 = this.vec2;
        } else {
            c1 = this.baseElement.vec1;
            c2 = this.baseElement.vec2;
        }
        for(i = 0; i < this.transformations.length; i++){
            this.transformations[i].update();
            c1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(this.transformations[i].matrix, c1);
            c2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(this.transformations[i].matrix, c2);
        }
        this.vec1 = c1;
        this.vec2 = c2;
        return this;
    },
    // Already documented in element3d.js
    update: function() {
        if (this.needsUpdate) {
            this.updateCoords().updateTransform();
        }
        return this;
    },
    // Already documented in element3d.js
    updateRenderer: function() {
        this.needsUpdate = false;
        return this;
    },
    // Already documented in element3d.js
    projectCoords: function(p, params) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].projectCoordsToParametric(p, this, 2, params);
    }
});
/**
 * @class A 3D plane is defined either by a point and two linearly independent vectors, or by three points.
 *
 * @description
 * A 3D plane is defined either by a point and two linearly independent vectors, or by three points.
 * In the first case, the parameters are a 3D point (or a coordinate array) and two vectors (arrays).
 * In the second case, the parameters consist of three 3D points (given as points or coordinate arrays).
 * In order to distinguish the two cases, in the latter case (three points), the additional attribute {@link Plane3D#threePoints}
 * has to be supplied if both, the second point and the third point, are given as arrays or functions. Otherwise, it would not be
 * clear if the input arrays have to be interpreted as points or directions.
 * <p>
 * All coordinate arrays can be supplied as functions returning a coordinate array.
 *
 * @pseudo
 * @name  Plane3D
 * @augments JXG.GeometryElement3D
 * @constructor
 * @throws {Exception} If the element cannot be constructed with the given parent
 * objects an exception is thrown.
 *
 * @param {JXG.Point3D,array,function_JXG.Line3D,array,function_JXG.Line3D,array,function_array,function_array,function} point,direction1,direction2,[range1],[range2] The plane is defined by point, direction1, direction2, range1, and range2.
 * <ul>
 * <li> point: Point3D or array of length 3
 * <li> direction1: line3d element or array of length 3 or function returning an array of numbers or function returning an array
 * <li> direction2: line3d element or array of length 3 or function returning an array of numbers or function returning an array
 * <li> range1: array of length 2, elements can also be functions. Use [-Infinity, Infinity] for infinite lines.
 * <li> range2: array of length 2, elements can also be functions. Use [-Infinity, Infinity] for infinite lines.
 * </ul>
 * @param {JXG.Point3D,array,function_JXG.Point3D,array,function_JXG.Point3D,array,function} point1,point2,point3 The plane is defined by three points.
 * @type JXG.Plane3D
 *
 * @example
 *     var view = board.create(
 *         'view3d',
 *         [[-6, -3], [8, 8],
 *         [[-3, 3], [-3, 3], [-3, 3]]],
 *         {
 *             depthOrder: {
 *                 enabled: true
 *             },
 *             projection: 'central',
 *             xPlaneRear: {fillOpacity: 0.2},
 *             yPlaneRear: {fillOpacity: 0.2},
 *             zPlaneRear: {fillOpacity: 0.2}
 *         }
 *     );
 *
 *     var A = view.create('point3d', [-2, 0, 1], {size: 2});
 *
 *     // Infinite Plane by point and two directions
 *     var plane = view.create('plane3d', [A, [1, 0, 0], [0, 1, 0], [-Infinity, Infinity], [-Infinity, Infinity]]);
 *
 * </pre><div id="JXG69f491ef-d7c7-4105-a962-86a588fbd23b" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG69f491ef-d7c7-4105-a962-86a588fbd23b',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *         var view = board.create(
 *             'view3d',
 *             [[-6, -3], [8, 8],
 *             [[-3, 3], [-3, 3], [-3, 3]]],
 *             {
 *                 depthOrder: {
 *                     enabled: true
 *                 },
 *                 projection: 'central',
 *                 xPlaneRear: {fillOpacity: 0.2},
 *                 yPlaneRear: {fillOpacity: 0.2},
 *                 zPlaneRear: {fillOpacity: 0.2}
 *             }
 *         );
 *
 *         var A = view.create('point3d', [-2, 0, 1], {size: 2});
 *
 *         // Infinite Plane by point and two directions
 *         var plane = view.create('plane3d', [A, [1, 0, 0], [0, 1, 0], [-Infinity, Infinity], [-Infinity, Infinity]]);
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 *     var view = board.create(
 *         'view3d',
 *         [[-6, -3], [8, 8],
 *         [[-3, 3], [-3, 3], [-3, 3]]],
 *         {
 *             depthOrder: {
 *                 enabled: true
 *             },
 *             projection: 'central',
 *             xPlaneRear: {fillOpacity: 0.2},
 *             yPlaneRear: {fillOpacity: 0.2},
 *             zPlaneRear: {fillOpacity: 0.2}
 *         }
 *     );
 *
 *     var A = view.create('point3d', [-2, 0, 1], {size: 2});
 *
 *     // Finite Plane by point and two directions
 *     var plane1 = view.create('plane3d', [A, [1, 0, 0], [0, 1, 0], [-2, 2], [-2, 2]]);
 *     var plane2 = view.create('plane3d', [[0, 0, -1], [1, 0, 0], [0, 1, 0], [-2, 2], [-2, 2]], {
 *         mesh3d: { visible: true },
 *         point: {visible: true, name: "B", fixed: false}
 *     });
 *
 * </pre><div id="JXGea9dda1b-748b-4ed3-b4b3-57e310bd8141" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGea9dda1b-748b-4ed3-b4b3-57e310bd8141',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *         var view = board.create(
 *             'view3d',
 *             [[-6, -3], [8, 8],
 *             [[-3, 3], [-3, 3], [-3, 3]]],
 *             {
 *                 depthOrder: {
 *                     enabled: true
 *                 },
 *                 projection: 'central',
 *                 xPlaneRear: {fillOpacity: 0.2},
 *                 yPlaneRear: {fillOpacity: 0.2},
 *                 zPlaneRear: {fillOpacity: 0.2}
 *             }
 *         );
 *
 *         var A = view.create('point3d', [-2, 0, 1], {size: 2});
 *
 *         // Finite Plane by point and two directions
 *         var plane1 = view.create('plane3d', [A, [1, 0, 0], [0, 1, 0], [-2, 2], [-2, 2]]);
 *         var plane2 = view.create('plane3d', [[0, 0, -1], [1, 0, 0], [0, 1, 0], [-2, 2], [-2, 2]], {
 *             mesh3d: { visible: true },
 *             point: {visible: true, name: "B", fixed: false}
 *         });
 *
 *     })();
 *
 * </script><pre>
 * @example
 *             var view = board.create(
 *                 'view3d',
 *                 [[-6, -3], [8, 8],
 *                 [[-3, 3], [-3, 3], [-3, 3]]],
 *                 {
 *                     depthOrder: {
 *                         enabled: true
 *                     },
 *                     projection: 'central',
 *                     xPlaneRear: { visible: false, fillOpacity: 0.2 },
 *                     yPlaneRear: { visible: false, fillOpacity: 0.2 },
 *                     zPlaneRear: { fillOpacity: 0.2 }
 *                 }
 *             );
 *
 *             var A = view.create('point3d', [-2, 0, 1], { size: 2 });
 *
 *             var line1 = view.create('line3d', [A, [0, 0, 1], [-Infinity, Infinity]], { strokeColor: 'blue' });
 *             var line2 = view.create('line3d', [A, [1, 1, 0], [-Infinity, Infinity]], { strokeColor: 'blue' });
 *
 *             // Plane by point and two lines
 *             var plane2 = view.create('plane3d', [A, line1, line2], {
 *                 fillColor: 'blue'
 *             });
 *
 * </pre><div id="JXG8bc6e266-e27c-4ffa-86a2-8076f4069573" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG8bc6e266-e27c-4ffa-86a2-8076f4069573',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *                 var view = board.create(
 *                     'view3d',
 *                     [[-6, -3], [8, 8],
 *                     [[-3, 3], [-3, 3], [-3, 3]]],
 *                     {
 *                         depthOrder: {
 *                             enabled: true
 *                         },
 *                         projection: 'central',
 *                         xPlaneRear: { visible: false, fillOpacity: 0.2 },
 *                         yPlaneRear: { visible: false, fillOpacity: 0.2 },
 *                         zPlaneRear: { fillOpacity: 0.2 }
 *                     }
 *                 );
 *
 *                 var A = view.create('point3d', [-2, 0, 1], { size: 2 });
 *
 *                 var line1 = view.create('line3d', [A, [0, 0, 1], [-Infinity, Infinity]], { strokeColor: 'blue' });
 *                 var line2 = view.create('line3d', [A, [1, 1, 0], [-Infinity, Infinity]], { strokeColor: 'blue' });
 *
 *                 // Plane by point and two lines
 *                 var plane2 = view.create('plane3d', [A, line1, line2], {
 *                     fillColor: 'blue'
 *                 });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 *     var view = board.create(
 *         'view3d',
 *         [[-6, -3], [8, 8],
 *         [[-3, 3], [-3, 3], [-3, 3]]],
 *         {
 *             depthOrder: {
 *                 enabled: true
 *             },
 *             projection: 'central',
 *             xPlaneRear: {fillOpacity: 0.2},
 *             yPlaneRear: {fillOpacity: 0.2},
 *             zPlaneRear: {fillOpacity: 0.2}
 *         }
 *     );
 *
 *     var A = view.create('point3d', [0, 0, 1], {size: 2});
 *     var B = view.create('point3d', [2, 2, 1], {size: 2});
 *     var C = view.create('point3d', [-2, 0, 1], {size: 2});
 *
 *     // Plane by three points
 *     var plane = view.create('plane3d', [A, B, C], {
 *         fillColor: 'blue'
 *     });
 *
 * </pre><div id="JXG139100df-3ece-4cd1-b34f-28b5b3105106" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG139100df-3ece-4cd1-b34f-28b5b3105106',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *         var view = board.create(
 *             'view3d',
 *             [[-6, -3], [8, 8],
 *             [[-3, 3], [-3, 3], [-3, 3]]],
 *             {
 *                 depthOrder: {
 *                     enabled: true
 *                 },
 *                 projection: 'central',
 *                 xPlaneRear: {fillOpacity: 0.2},
 *                 yPlaneRear: {fillOpacity: 0.2},
 *                 zPlaneRear: {fillOpacity: 0.2}
 *             }
 *         );
 *
 *         var A = view.create('point3d', [0, 0, 1], {size: 2});
 *         var B = view.create('point3d', [2, 2, 1], {size: 2});
 *         var C = view.create('point3d', [-2, 0, 1], {size: 2});
 *
 *         // Plane by three points
 *         var plane = view.create('plane3d', [A, B, C], {
 *             fillColor: 'blue'
 *         });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 *     var view = board.create(
 *         'view3d',
 *         [[-6, -3], [8, 8],
 *         [[-3, 3], [-3, 3], [-3, 3]]],
 *         {
 *             depthOrder: {
 *                 enabled: true
 *             },
 *             projection: 'central',
 *             xPlaneRear: {fillOpacity: 0.2},
 *             yPlaneRear: {fillOpacity: 0.2},
 *             zPlaneRear: {fillOpacity: 0.2}
 *         }
 *     );
 *
 *     var A = view.create('point3d', [-2, 0, 1], {size: 2});
 *
 *     // Infinite Plane by two directions,
 *     // range1 = range2 = [-Infinity, Infinity]
 *     var plane1 = view.create('plane3d', [A, [1, 0, 0], [0, 1, 0]], {
 *         fillColor: 'blue',
 *     });
 *
 *     // Infinite Plane by three points,
 *     var plane2 = view.create('plane3d', [A, [1, 0, 0], [0, 1, 0]], {
 *         threePoints: true,
 *         fillColor: 'red',
 *         point2: {visible: true},
 *         point3: {visible: true}
 *     });
 *
 * </pre><div id="JXGf31b9666-0c2e-45e7-a186-ae2c07b6bdb8" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGf31b9666-0c2e-45e7-a186-ae2c07b6bdb8',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *         var view = board.create(
 *             'view3d',
 *             [[-6, -3], [8, 8],
 *             [[-3, 3], [-3, 3], [-3, 3]]],
 *             {
 *                 depthOrder: {
 *                     enabled: true
 *                 },
 *                 projection: 'central',
 *                 xPlaneRear: {fillOpacity: 0.2},
 *                 yPlaneRear: {fillOpacity: 0.2},
 *                 zPlaneRear: {fillOpacity: 0.2}
 *             }
 *         );
 *
 *         var A = view.create('point3d', [-2, 0, 1], {size: 2});
 *
 *         // Infinite Plane by two directions,
 *         // range1 = range2 = [-Infinity, Infinity]
 *         var plane1 = view.create('plane3d', [A, [1, 0, 0], [0, 1, 0]], {
 *             fillColor: 'blue',
 *         });
 *
 *         // Infinite Plane by three points,
 *         var plane2 = view.create('plane3d', [A, [1, 0, 0], [0, 1, 0]], {
 *             threePoints: true,
 *             fillColor: 'red',
 *             point2: {visible: true},
 *             point3: {visible: true}
 *         });
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPlane3D = function(board, parents, attributes) {
    var view = parents[0], attr, point, point2, point3, dir1, dir2, range_u, range_v, el, mesh3d, base = null, transform = null;
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'plane3d');
    if (// ()
    attr.threepoints || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint3D(parents[2]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint3D(parents[3])) {
        // Three points
        point = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints3D(view, [
            parents[1]
        ], attributes, 'plane3d', [
            'point1'
        ])[0];
        point2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints3D(view, [
            parents[2]
        ], attributes, 'plane3d', [
            'point2'
        ])[0];
        point3 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints3D(view, [
            parents[3]
        ], attributes, 'plane3d', [
            'point3'
        ])[0];
        dir1 = function() {
            return [
                point2.X() - point.X(),
                point2.Y() - point.Y(),
                point2.Z() - point.Z()
            ];
        };
        dir2 = function() {
            return [
                point3.X() - point.X(),
                point3.Y() - point.Y(),
                point3.Z() - point.Z()
            ];
        };
        range_u = parents[4] || [
            -Infinity,
            Infinity
        ];
        range_v = parents[5] || [
            -Infinity,
            Infinity
        ];
    } else {
        if (parents[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_PLANE3D && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isTransformationOrArray(parents[2])) {
            // Plane + transformation
            base = parents[1];
            transform = parents[2];
            point = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints3D(view, [
                [
                    0,
                    0,
                    0,
                    0
                ]
            ], attributes, 'plane3d', [
                'point'
            ])[0];
            dir1 = [
                0,
                0.0001,
                0,
                0
            ];
            dir2 = [
                0,
                0,
                0.0001,
                0
            ];
            range_u = parents[3] || [
                -Infinity,
                Infinity
            ];
            range_v = parents[4] || [
                -Infinity,
                Infinity
            ];
        } else {
            // Point, direction and ranges
            point = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints3D(view, [
                parents[1]
            ], attributes, 'plane3d', [
                'point'
            ])[0];
            dir1 = parents[2];
            dir2 = parents[3];
            range_u = parents[4] || [
                -Infinity,
                Infinity
            ];
            range_v = parents[5] || [
                -Infinity,
                Infinity
            ];
        }
        if (point === false) {
            throw new Error("JSXGraph: Can't create plane3d with first parent of type '" + typeof parents[1] + "'." + "\nPossible first parent types are: point3d, array of length 3, function returning an array of length 3.");
        }
        if (base !== null && parents < 3 || base === null && parents.length < 4) {
            throw new Error("JSXGraph: Can't create plane3d with parents of type '" + typeof parents[1] + ", " + typeof parents[2] + ", " + typeof parents[3] + ", " + typeof parents[4] + ", " + typeof parents[5] + "'.");
        }
    }
    el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Plane3D(view, point, dir1, range_u, dir2, range_v, attr);
    point.addChild(el);
    attr = el.setAttr2D(attr);
    el.element2D = view.create('curve', [
        [],
        []
    ], attr);
    el.element2D.view = view;
    if (base !== null && transform !== null) {
        el.addTransform(base, transform);
        el.addParents(base);
    }
    /**
     * @class
     * @ignore
     */ el.element2D.updateDataArray = function() {
        var ret = el.updateDataArray();
        this.dataX = ret.X;
        this.dataY = ret.Y;
    };
    el.addChild(el.element2D);
    el.inherits.push(el.element2D);
    el.element2D.setParents(el);
    if (Math.abs(el.range_u[0]) !== Infinity && Math.abs(el.range_u[1]) !== Infinity && Math.abs(el.range_v[0]) !== Infinity && Math.abs(el.range_v[1]) !== Infinity) {
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attr.mesh3d, board.options, 'mesh3d');
        mesh3d = view.create('mesh3d', [
            function() {
                return point.coords;
            },
            // dir1, dir2, range_u, range_v
            function() {
                return el.vec1;
            },
            function() {
                return el.vec2;
            },
            el.range_u,
            el.range_v
        ], attr);
        el.mesh3d = mesh3d;
        el.addChild(mesh3d);
        el.inherits.push(mesh3d); // TODO Does not work
        el.element2D.inherits.push(mesh3d); // Does work - instead
        mesh3d.setParents(el);
        el.mesh3d.view = view;
    }
    el.element2D.prepareUpdate().update();
    if (!board.isSuspendedUpdate) {
        el.element2D.updateVisibility().updateRenderer();
    }
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement('plane3d', __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPlane3D);
/**
 * @class The line that is the intersection of two (infinite) plane elements in 3D.
 *
 * @pseudo
 * @name IntersectionLine3D
 * @augments JXG.Line3D
 * @constructor
 * @type JXG.Line3D
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Plane3D_JXG.Plane3D} el1,el2 The result will be the intersection of el1 and el2.
 * @example
 * // Create the intersection line of two planes
 * var view = board.create(
 *     'view3d',
 *     [[-6, -3], [8, 8],
 *     [[-1, 3], [-1, 3], [-1, 3]]],
 *     {
 *         xPlaneRear: {visible:false},
 *         yPlaneRear: {visible:false},
 *         zPlaneRear: {fillOpacity: 0.2, gradient: null}
 *     }
 * );
 * var a = view.create('point3d', [2, 2, 0]);
 *
 * var p1 = view.create(
 *    'plane3d',
 *     [a, [1, 0, 0], [0, 1, 0]],
 *     {fillColor: '#00ff80'}
 * );
 * var p2 = view.create(
 *    'plane3d',
 *     [a, [-2, 1, 1], [1, -2, 1]],
 *     {fillColor: '#ff0000'}
 * );
 *
 * var i = view.create('intersectionline3d', [p1, p2]);
 *
 * </pre><div id="JXGdb931076-b29a-4eff-b97e-4251aaf24943" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGdb931076-b29a-4eff-b97e-4251aaf24943',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, pan: {enabled: false}, showcopyright: false, shownavigation: false});
 *         var view = board.create(
 *             'view3d',
 *             [[-6, -3], [8, 8],
 *             [[-1, 3], [-1, 3], [-1, 3]]],
 *             {
 *                 xPlaneRear: {visible:false},
 *                 yPlaneRear: {visible:false},
 *                 zPlaneRear: {fillOpacity: 0.2, gradient: null}
 *             }
 *         );
 *     var a = view.create('point3d', [2, 2, 0]);
 *
 *     var p1 = view.create(
 *        'plane3d',
 *         [a, [1, 0, 0], [0, 1, 0]],
 *         {fillColor: '#00ff80'}
 *     );
 *     var p2 = view.create(
 *        'plane3d',
 *         [a, [-2, 1, 1], [1, -2, 1]],
 *         {fillColor: '#ff0000'}
 *     );
 *
 *     var i = view.create('intersectionline3d', [p1, p2]);
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createIntersectionLine3D = function(board, parents, attributes) {
    var view = parents[0], el1 = parents[1], el2 = parents[2], ixnLine, i, func, attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "intersectionline3d"), pts = [];
    func = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].intersectionFunction3D(view, el1, el2);
    for(i = 0; i < 2; i++){
        pts[i] = view.create('point3d', func[i], attr['point' + (i + 1)]);
    }
    ixnLine = view.create('line3d', pts, attr);
    try {
        el1.addChild(ixnLine);
        el2.addChild(ixnLine);
    } catch (_e) {
        throw new Error("JSXGraph: Can't create 'intersection' with parent types '" + typeof parents[1] + "' and '" + typeof parents[2] + "'.");
    }
    ixnLine.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_INTERSECTION_LINE3D;
    ixnLine.elType = 'intersectionline3d';
    ixnLine.setParents([
        el1.id,
        el2.id
    ]);
    return ixnLine;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement('intersectionline3d', __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createIntersectionLine3D);
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/text3d.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
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
 */ /*global JXG:true, define: true*/ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
;
;
;
;
;
//, GeometryElement3D) {
/**
 * A 3D text is a basic geometric element.
 * @class Creates a new 3D point object. Do not use this constructor to create a 3D point. Use {@link JXG.View3D#create} with
 * type {@link Point3D} instead.
 * @augments JXG.GeometryElement3D
 * @augments JXG.GeometryElement
 * @param {JXG.View3D} view The 3D view the point is drawn on.
 * @param {Function|Array} F Array of numbers, array of functions or function returning an array with defines the user coordinates of the point.
 * @param {JXG.GeometryElement3D} slide Object the 3D point should be bound to. If null, the point is a free point.
 * @param {Object} attributes An object containing visual properties like in {@link JXG.Options#point3d} and
 * {@link JXG.Options#elements}, and optional a name and an id.
 * @see JXG.Board#generateName
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Text3D = function(view, F, text, slide, attributes) {
    this.constructor(view.board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_TEXT3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_3D);
    this.constructor3D(view, "text3d");
    this.board.finalizeAdding(this);
    /**
     * Homogeneous coordinates of a Point3D, i.e. array of length 4: [w, x, y, z]. Usually, w=1 for finite points and w=0 for points
     * which are infinitely far.
     *
     * @example
     *   p.coords;
     *
     * @name Point3D#coords
     * @type Array
     * @private
     */ this.coords = [
        0,
        0,
        0,
        0
    ];
    /**
     * Function or array of functions or array of numbers defining the coordinates of the point, used in {@link updateCoords}.
     *
     * @name Point3D#F
     * @function
     * @private
     *
     * @see updateCoords
     */ this.F = F;
    /**
     * Optional slide element, i.e. element the Point3D lives on.
     *
     * @example
     *   p.slide;
     *
     * @name Point3D#slide
     * @type JXG.GeometryElement3D
     * @default null
     * @private
     *
     */ this.slide = slide;
    /**
     * Get x-coordinate of a 3D point.
     *
     * @name X
     * @memberOf Point3D
     * @function
     * @returns {Number}
     *
     * @example
     *   p.X();
     */ this.X = function() {
        return this.coords[1];
    };
    /**
     * Get y-coordinate of a 3D point.
     *
     * @name Y
     * @memberOf Point3D
     * @function
     * @returns Number
     *
     * @example
     *   p.Y();
     */ this.Y = function() {
        return this.coords[2];
    };
    /**
     * Get z-coordinate of a 3D point.
     *
     * @name Z
     * @memberOf Point3D
     * @function
     * @returns Number
     *
     * @example
     *   p.Z();
     */ this.Z = function() {
        return this.coords[3];
    };
    /**
     * Store the last position of the 2D point for the optimizer.
     *
     * @type Array
     * @private
     */ this.position = [];
    this._c2d = null;
    this.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(this.methodMap, {
    });
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Text3D.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyPrototypeMethods(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Text3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement3D, "constructor3D");
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Text3D.prototype, /** @lends JXG.Text3D.prototype */ {
    /**
         * Update the homogeneous coords array.
         *
         * @name updateCoords
         * @memberOf Text3D
         * @function
         * @returns {Object} Reference to the Text3D object
         * @private
         * @example
         *    p.updateCoords();
         */ updateCoords: function() {
        var i;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(this.F)) {
            // this.coords = [1].concat(Type.evaluate(this.F));
            this.coords = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.F);
            this.coords.unshift(1);
        } else {
            this.coords[0] = 1;
            for(i = 0; i < 3; i++){
                // Attention: if F is array of numbers, coords are not updated.
                // Otherwise, dragging will not work anymore.
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(this.F[i])) {
                    this.coords[i + 1] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.F[i]);
                }
            }
        }
        return this;
    },
    /**
         * Initialize the coords array.
         *
         * @private
         * @returns {Object} Reference to the Text3D object
         */ initCoords: function() {
        var i;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(this.F)) {
            // this.coords = [1].concat(Type.evaluate(this.F));
            this.coords = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.F);
            this.coords.unshift(1);
        } else {
            this.coords[0] = 1;
            for(i = 0; i < 3; i++){
                this.coords[i + 1] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.F[i]);
            }
        }
        return this;
    },
    /**
         * Normalize homogeneous coordinates such the the first coordinate (the w-coordinate is equal to 1 or 0)-
         *
         * @name normalizeCoords
         * @memberOf Text3D
         * @function
         * @returns {Object} Reference to the Text3D object
         * @private
         * @example
         *    p.normalizeCoords();
         */ normalizeCoords: function() {
        if (Math.abs(this.coords[0]) > __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps) {
            this.coords[1] /= this.coords[0];
            this.coords[2] /= this.coords[0];
            this.coords[3] /= this.coords[0];
            this.coords[0] = 1.0;
        }
        return this;
    },
    /**
         * Set the position of a 3D point.
         *
         * @name setPosition
         * @memberOf Text3D
         * @function
         * @param {Array} coords 3D coordinates. Either of the form [x,y,z] (Euclidean) or [w,x,y,z] (homogeneous).
         * @param {Boolean} [noevent] If true, no events are triggered.
         * @returns {Object} Reference to the Text3D object
         *
         * @example
         *    p.setPosition([1, 3, 4]);
         */ setPosition: function(coords, noevent) {
        var c = this.coords;
        // oc = this.coords.slice(); // Copy of original values
        if (coords.length === 3) {
            // Euclidean coordinates
            c[0] = 1.0;
            c[1] = coords[0];
            c[2] = coords[1];
            c[3] = coords[2];
        } else {
            // Homogeneous coordinates (normalized)
            c[0] = coords[0];
            c[1] = coords[1];
            c[2] = coords[2];
            c[3] = coords[2];
            this.normalizeCoords();
        }
        // console.log(el.emitter, !noevent, oc[0] !== c[0] || oc[1] !== c[1] || oc[2] !== c[2] || oc[3] !== c[3]);
        // Not yet working TODO
        // if (el.emitter && !noevent &&
        //     (oc[0] !== c[0] || oc[1] !== c[1] || oc[2] !== c[2] || oc[3] !== c[3])) {
        //     this.triggerEventHandlers(['update3D'], [oc]);
        // }
        return this;
    },
    update: function(drag) {
        var c3d, foot, res;
        // Update is called from board.updateElements.
        // See Point3D.update() for the logic.
        if (this.element2D.draggable() && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(this._c2d, this.element2D.coords.usrCoords) !== 0) {
            if (this.view.isVerticalDrag()) {
                // Drag the text in its vertical to the xy plane
                // If the text is outside of bbox3d,
                // c3d is already corrected.
                c3d = this.view.project2DTo3DVertical(this.element2D, this.coords);
            } else {
                // Drag the text in its xy plane
                foot = [
                    1,
                    0,
                    0,
                    this.coords[3]
                ];
                c3d = this.view.project2DTo3DPlane(this.element2D, [
                    1,
                    0,
                    0,
                    1
                ], foot);
            }
            if (c3d[0] !== 0) {
                // Check if c3d is inside of view.bbox3d
                // Otherwise, the coords are now corrected.
                res = this.view.project3DToCube(c3d);
                this.coords = res[0];
                if (res[1]) {
                    // The 3D coordinates have been corrected, now
                    // also correct the 2D element.
                    this.element2D.coords.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, this.view.project3DTo2D(this.coords));
                }
                if (this.slide) {
                    this.coords = this.slide.projectCoords([
                        this.X(),
                        this.Y(),
                        this.Z()
                    ], this.position);
                    this.element2D.coords.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, this.view.project3DTo2D(this.coords));
                }
            }
        } else {
            this.updateCoords();
            if (this.slide) {
                this.coords = this.slide.projectCoords([
                    this.X(),
                    this.Y(),
                    this.Z()
                ], this.position);
            }
            // Update 2D text from its 3D view
            c3d = this.coords;
            this.element2D.coords.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, this.view.project3DTo2D(c3d));
            // this.zIndex = Mat.matVecMult(this.view.matrix3DRotShift, c3d)[3];
            this.zIndex = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(this.view.matrix3DRotShift[3], c3d);
            this.element2D.prepareUpdate().update();
        }
        this._c2d = this.element2D.coords.usrCoords.slice();
        return this;
    },
    updateRenderer: function() {
        this.needsUpdate = false;
        return this;
    },
    /**
         * Check whether a text's position is finite, i.e. the first entry is not zero.
         * @returns {Boolean} True if the first entry of the coordinate vector is not zero; false otherwise.
         */ testIfFinite: function() {
        return Math.abs(this.coords[0]) > __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps ? true : false;
    // return Type.cmpArrays(this.coords, [0, 0, 0, 0]);
    },
    // Not yet working
    __evt__update3D: function(oc) {}
});
/**
 * @class Construct a text element in a 3D view.
 * @pseudo
 * @description A Text3D object is defined by 3 coordinates [x, y, z, text] or an array / function for the position of the text
 * and a string or function defining the text.
 * <p>
 * That is, all numbers can also be provided as functions returning a number.
 * <p>
 * At the time being, text display is independent from the camera view.
 *
 * @name Text3D
 * @augments JXG.Text3D
 * @augments Text
 * @constructor
 * @throws {Exception} If the element cannot be constructed with the given parent
 * objects an exception is thrown.
 * @param {number,function_number,function_number,function_String,function_JXG.GeometryElement3D} x,y,z,txt,[slide=undefined]
 * The coordinates are given as x, y, z consisting of numbers of functions and the text.
 * If an optional 3D element "slide" is supplied, the point is a glider on that element.
 * @param {array,function_string_JXG.GeometryElement3D}} F,txt,[slide=undefined] Alternatively, the coordinates can be supplied as array or function returning an array.
 * If an optional 3D element "slide" is supplied, the point is a glider on that element.
 *
 * @example
 *     var bound = [-4, 6];
 *     var view = board.create('view3d',
 *         [[-4, -3], [8, 8],
 *         [bound, bound, bound]],
 *         {
 *             projection: 'central'
 *         });
 *
 *     var txt1 = view.create('text3d', [[1, 2, 1], 'hello'], {
 *         fontSize: 20,
 *     });
 *
 * </pre><div id="JXGb61d7c50-617a-4bed-9a45-13c949f90e94" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGb61d7c50-617a-4bed-9a45-13c949f90e94',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, pan: {enabled: false}, showcopyright: false, shownavigation: false});
 *         var bound = [-4, 6];
 *         var view = board.create('view3d',
 *             [[-4, -3], [8, 8],
 *             [bound, bound, bound]],
 *             {
 *                 projection: 'central'
 *             });
 *
 *         var txt1 = view.create('text3d', [[1, 2, 1], 'hello'], {
 *             fontSize: 20,
 *         });
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createText3D = function(board, parents, attributes) {
    var view = parents[0], attr, F, slide, text, c2d, el;
    // If the last element of parents is a 3D object,
    // the point is a glider on that element.
    if (parents.length > 2 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parents[parents.length - 1].is3D)) {
        slide = parents.pop();
    } else {
        slide = null;
    }
    if (parents.length === 3) {
        // [view, array|fun, text] (Array [x, y, z] | function) returning [x, y, z] and string | function
        F = parents[1];
        text = parents[2];
    } else if (parents.length === 5) {
        // [view, x, y, z, text], (3 numbers | functions) sand string | function
        F = parents.slice(1, 4);
        text = parents[4];
    } else {
        throw new Error("JSXGraph: Can't create text3d with parent types '" + typeof parents[1] + "' and '" + typeof parents[2] + "'." + "\nPossible parent types: [[x,y,z], text], [x,y,z, text]");
    //  "\nPossible parent types: [[x,y,z]], [x,y,z], [element,transformation]"); // TODO
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'text3d');
    el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Text3D(view, F, text, slide, attr);
    el.initCoords();
    c2d = view.project3DTo2D(el.coords);
    attr = el.setAttr2D(attr);
    el.element2D = view.create('text', [
        c2d[1],
        c2d[2],
        text
    ], attr);
    el.element2D.view = view;
    el.addChild(el.element2D);
    el.inherits.push(el.element2D);
    el.element2D.setParents(el);
    // If this point is a glider, record that in the update tree
    if (el.slide) {
        el.slide.addChild(el);
        el.setParents(el.slide);
    }
    el._c2d = el.element2D.coords.usrCoords.slice(); // Store a copy of the coordinates to detect dragging
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("text3d", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createText3D);
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/ticks3d.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
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
 */ /*global JXG:true, define: true*/ /**
 * Create axes and rear and front walls of the
 * view3d bounding box bbox3D.
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
;
;
;
/**
 * @class Ticks are used as distance markers on a line in a 3D view.
 * @pseudo
 * @description Create 3D ticks.
 * <p>
 * At the time being, the ticks are not connected to the line or axis. The connecting element is simply the
 * parameter point.
 *
 * @name Ticks3D
 * @augments Curve
 * @constructor
 * @type Object
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {Array_Array_Number_Array} point,direction1,length,direction2 point is an array of length 3
 * determining the starting point of the grid. direction1 and direction2 are arrays of length 3. Here, direction1 is the direction
 * of the 3D line, direction2 is the direction of the ticks.
 * "length" is the length of the line.
 * All parameters can be supplied as functions returning an appropriate data type.
 * <p>
 * The step width of the ticks is determined by the attribute "ticksDistance".
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createTicks3D = function(board, parents, attributes) {
    var view = parents[0], point = parents[1], dir1 = parents[2], length = parents[3], dir2 = parents[4], el, attr;
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'ticks3d');
    el = view.create("curve", [
        [],
        []
    ], attr);
    el.point = point;
    el.direction1 = dir1;
    el.len = length;
    el.direction2 = dir2;
    el.drawLabels = function(attr) {
        var s1 = 0, e1 = this.len, step = this.evalVisProp('ticksdistance'), range2 = this.evalVisProp('tickendings'), mh = this.evalVisProp('majorheight'), e2, l1, l2, i, u, val, p, v1 = [
            0,
            0,
            0
        ], v2 = [
            0,
            0,
            0
        ], q = [
            0,
            0,
            0
        ], labels = [];
        mh /= Math.sqrt(board.unitX * board.unitY); // Very crude estimation of tick length
        e2 = mh * range2[1] * 2;
        this.dataX = [];
        this.dataY = [];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(this.point)) {
            q = this.point().slice(1);
        } else {
            for(i = 0; i < 3; i++){
                q[i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.point[i]);
            }
        }
        for(i = 0; i < 3; i++){
            v1[i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.direction1[i]);
            v2[i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.direction2[i]);
        }
        l1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Math.norm(v1, 3);
        l2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Math.norm(v2, 3);
        for(i = 0; i < 3; i++){
            v1[i] /= l1;
            v2[i] /= l2;
        }
        if (Math.abs(step) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps) {
            return;
        }
        for(u = s1; u <= e1; u += step){
            // Label
            p = [
                q[0] + u * v1[0] + e2 * v2[0],
                q[1] + u * v1[1] + e2 * v2[1],
                q[2] + u * v1[2] + e2 * v2[2]
            ];
            for(i = 0; i < 3; i++){
                if (v1[i] !== 0) {
                    val = q[i] + u * v1[i];
                }
            }
            labels.push(view.create('text3d', [
                p,
                val
            ], attr));
        }
        return labels;
    };
    if (el.evalVisProp('drawlabels')) {
        el.labels = el.drawLabels(attr.label);
    }
    /**
     * @ignore
     */ el.updateDataArray = function() {
        var s1 = 0, e1 = this.len, step = this.evalVisProp('ticksdistance'), range2 = this.evalVisProp('tickendings'), mh = this.evalVisProp('majorheight'), s2, e2, l1, l2, i, u, c2d, p, v1 = [
            0,
            0,
            0
        ], v2 = [
            0,
            0,
            0
        ], q = [
            0,
            0,
            0
        ];
        mh /= Math.sqrt(board.unitX * board.unitY); // Very crude estimation of tick length
        s2 = mh * -range2[0];
        e2 = mh * range2[1];
        this.dataX = [];
        this.dataY = [];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(this.point)) {
            q = this.point().slice(1);
        } else {
            for(i = 0; i < 3; i++){
                q[i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.point[i]);
            }
        }
        for(i = 0; i < 3; i++){
            v1[i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.direction1[i]);
            v2[i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.direction2[i]);
        }
        l1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Math.norm(v1, 3);
        l2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Math.norm(v2, 3);
        for(i = 0; i < 3; i++){
            v1[i] /= l1;
            v2[i] /= l2;
        }
        if (Math.abs(step) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps) {
            return;
        }
        for(u = s1; u <= e1; u += step){
            p = [
                q[0] + u * v1[0] + s2 * v2[0],
                q[1] + u * v1[1] + s2 * v2[1],
                q[2] + u * v1[2] + s2 * v2[2]
            ];
            c2d = view.project3DTo2D(p);
            this.dataX.push(c2d[1]);
            this.dataY.push(c2d[2]);
            p = [
                q[0] + u * v1[0] + e2 * v2[0],
                q[1] + u * v1[1] + e2 * v2[1],
                q[2] + u * v1[2] + e2 * v2[2]
            ];
            c2d = view.project3DTo2D(p);
            this.dataX.push(c2d[1]);
            this.dataY.push(c2d[2]);
            this.dataX.push(NaN);
            this.dataY.push(NaN);
        }
    };
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("ticks3d", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createTicks3D);
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/polygon3d.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Aaron Fenyes,
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
 */ /*global JXG:true, define: true*/ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
;
;
;
;
/**
 * Constructor for 3D polygons.
 * @class Creates a new 3D polygon object. Do not use this constructor to create a 3D polygon. Use {@link JXG.View3D#create} with type {@link Polygon3D} instead.
 *
 * @augments JXG.GeometryElement3D
 * @augments JXG.GeometryElement
 * @param {View3D} view
 * @param {Point3D|Array} point
 * @param {Array} direction
 * @param {Array} range
 * @param {Object} attributes
 * @see JXG.Board#generateName
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Polygon3D = function(view, vertices, attributes) {
    var i;
    this.constructor(view.board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_3D);
    this.constructor3D(view, 'polygon3d');
    this.board.finalizeAdding(this);
    /**
     * References to the points defining the polygon.
     * Compared to the 2D {@link JXG.Polygon#vertices}, it contains one point less, i.e. for a quadrangle
     * 'vertices' contains four points. In a 2D quadrangle, 'vertices' will contain five points, the last one being
     * a copy of the first one.
     * @type Array
     */ this.vertices = [];
    for(i = 0; i < vertices.length; i++){
        this.vertices[i] = this.board.select(vertices[i]);
        // The _is_new flag is replaced by _is_new_pol.
        // Otherwise, the polygon would disappear if the last border element
        // is removed (and the point has been provided by coordinates)
        if (this.vertices[i]._is_new) {
            delete this.vertices[i]._is_new;
            this.vertices[i]._is_new_pol = true;
        }
    }
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Polygon3D.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyPrototypeMethods(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Polygon3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement3D, 'constructor3D');
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Polygon3D.prototype, /** @lends JXG.Polygon3D.prototype */ {
    update: function() {
        return this;
    },
    updateRenderer: function() {
        this.needsUpdate = false;
        return this;
    },
    updateZIndex: function() {
        var i, le = this.vertices.length, c3d = [
            1,
            0,
            0,
            0
        ];
        if (le <= 0) {
            return [
                NaN,
                NaN,
                NaN,
                NaN
            ];
        }
        for(i = 0; i < le; i++){
            c3d[1] += this.vertices[i].coords[1];
            c3d[2] += this.vertices[i].coords[2];
            c3d[3] += this.vertices[i].coords[3];
        }
        c3d[1] /= le;
        c3d[2] /= le;
        c3d[3] /= le;
        // this.zIndex = Mat.matVecMult(this.view.matrix3DRotShift, c3d)[3];
        this.zIndex = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(this.view.matrix3DRotShift[3], c3d);
        return this;
    }
});
/**
 * @class A polygon is a sequence of points connected by lines, with the last point
 * connecting back to the first one. The points are given by:
 * <ul>
 *    <li> a list of Point3D objects,
 *    <li> a list of coordinate arrays, or
 *    <li> a function returning a list of coordinate arrays.
 * </ul>
 * Each two consecutive points of the list define a line.
 * <p>
 * JSXGraph does not require and does not check planarity of the polygon.
 *
 * @pseudo
 * @constructor
 * @name Polygon3D
 * @type JXG.Polygon3D
 * @augments JXG.Polygon3D
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {Array} vertices The polygon's vertices.
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPolygon3D = function(board, parents, attributes) {
    var view = parents[0], el, i, le, obj, points = [], points2d = [], attr, attr_points, is_transform = false;
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'polygon3d');
    obj = board.select(parents[1]);
    if (obj === null) {
        // This is necessary if the original polygon is defined in another board.
        obj = parents[1];
    }
    // TODO: Number of points? Is the last point equal to the first point?
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isObject(obj) && obj.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON3D && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isTransformationOrArray(parents[2])) {
        is_transform = true;
        le = obj.vertices.length - 1;
        attr_points = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'polygon3d', 'vertices');
        for(i = 0; i < le; i++){
            if (attr_points.withlabel) {
                attr_points.name = obj.vertices[i].name === '' ? '' : obj.vertices[i].name + "'";
            }
            points.push(board.create('point3d', [
                obj.vertices[i],
                parents[2]
            ], attr_points));
        }
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[1]) && parents[1].every((x)=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint3D(x))) {
        // array of points [A, B, C]
        // TODO mixing points and coords arrays
        points = parents[1];
    } else {
        points = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints3D(view, parents.slice(1), attributes, 'polygon3d', [
            'vertices'
        ]);
        if (points === false) {
            throw new Error("JSXGraph: Can't create polygon3d with parent types other than 'point' and 'coordinate arrays' or a function returning an array of coordinates. Alternatively, a polygon3d and a transformation can be supplied");
        }
    }
    el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Polygon3D(view, points, attr);
    el.isDraggable = true;
    attr = el.setAttr2D(attr);
    for(i = 0; i < points.length; i++){
        points2d.push(points[i].element2D);
    }
    el.element2D = board.create('polygon', points2d, attr);
    el.element2D.view = view;
    el.addChild(el.element2D);
    el.inherits.push(el.element2D);
    el.element2D.setParents(el);
    // Put the points in their positions
    if (is_transform) {
        el.prepareUpdate().update().updateVisibility().updateRenderer();
        le = obj.vertices.length - 1;
        for(i = 0; i < le; i++){
            points[i].prepareUpdate().update().updateVisibility().updateRenderer();
        }
    }
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement('polygon3d', __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPolygon3D);
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/face3d.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
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
 */ /*global JXG:true, define: true*/ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
;
;
;
;
/**
 * 3D faces
 * @class Creates a new 3D face object. Do not use this constructor to create a 3D curve. Use {@link JXG.View3D#create} with type {@link Face3D} instead.
 *
 * @augments JXG.GeometryElement3D
 * @augments JXG.GeometryElement
 * @param {View3D} view
 * @param {Function} F
 * @param {Function} X
 * @param {Function} Y
 * @param {Function} Z
 * @param {Array} range
 * @param {Object} attributes
 * @see JXG.Board#generateName
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Face3D = function(view, polyhedron, faceNumber, attributes) {
    this.constructor(view.board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_FACE3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_3D);
    this.constructor3D(view, "face3d");
    this.board.finalizeAdding(this);
    /**
     * Link to the defining data of the parent polyhedron3d.
     * @name Face3D#polyhedron
     * @type Object
     * @see Polyhedron3D#def
     */ this.polyhedron = polyhedron;
    /**
     * Index of the face in the list of faces of the polyhedron
     * @name Face3D#faceNumber
     * @type Number
     */ this.faceNumber = faceNumber;
    /**
     * Normal vector for the face. Array of length 4.
     * @name Face3D#normal
     * @type array
     */ this.normal = [
        0,
        0,
        0,
        0
    ];
    /**
     * Hesse right hand side of the plane that contains the face.
     * @name Face3D#d
     * @type Number
     */ this.d = 0;
    /**
     * First basis vector of the face. Vector of length 4.
     * @name Face3D#vec1
     * @type Array
     */ this.vec1 = [
        0,
        0,
        0,
        0
    ];
    /**
     * Second basis vector of the face. Vector of length 4.
     * @name Face3D#vec2
     * @type Array
     */ this.vec2 = [
        0,
        0,
        0,
        0
    ];
    if (this.faceNumber === 0) {
        this.updateCoords();
    }
    this.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(this.methodMap, {
    });
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Face3D.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyPrototypeMethods(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Face3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement3D, "constructor3D");
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Face3D.prototype, /** @lends JXG.Face3D.prototype */ {
    /**
         * Update the coordinates of all vertices of the polyhedron
         * @function
         * @name Face3D#updateCoords
         * @returns {Face3D} reference to itself
         */ updateCoords: function() {
        var i, j, le, p, def = this.polyhedron;
        for(i in def.vertices){
            p = def.vertices[i];
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(p)) {
                def.coords[i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(p);
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(p)) {
                def.coords[i] = [];
                le = p.length;
                for(j = 0; j < le; j++){
                    def.coords[i][j] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(p[j]);
                }
            } else {
                p = def.view.select(p);
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint3D(p)) {
                    def.coords[i] = p.coords;
                } else {
                    throw new Error('Polyhedron3D.updateCoords: unknown vertices type!');
                }
            }
            if (def.coords[i].length === 3) {
                def.coords[i].unshift(1);
            }
        }
        return this;
    },
    /**
         * Update the 2D coordinates of the face and determine it's z-index.
         * @function
         * @name Face3D#updateDataArray2D
         * @returns {Object} {X:[], Y:[]}
         */ updateDataArray2D: function() {
        var j, le, c3d, c2d, x = [], y = [], p = this.polyhedron, face = p.faces[this.faceNumber];
        if (this.faceNumber === 0) {
            // coords2D equal to [] means, projection is needed down below.
            // Thus, every vertex is projected only once.
            for(j in p.vertices){
                p.coords2D[j] = [];
            }
        }
        // Add the projected coordinates of the vertices of this face
        // to the 2D curve.
        // If not done yet, project the 3D vertices of this face to 2D.
        le = face.length;
        this.zIndex = 0.0;
        for(j = 0; j < le; j++){
            c2d = p.coords2D[face[j]];
            if (c2d.length === 0) {
                // if coords2D.length > 0, it has already be projected
                // in another face3d.
                c3d = p.coords[face[j]];
                c2d = this.view.project3DTo2D(c3d);
                p.coords2D[face[j]] = c2d;
                // p.zIndex[face[j]] = Mat.matVecMult(this.view.matrix3DRotShift, c3d)[3];
                p.zIndex[face[j]] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(this.view.matrix3DRotShift[3], c3d);
            }
            x.push(c2d[1]);
            y.push(c2d[2]);
            this.zIndex += p.zIndex[face[j]];
        }
        if (le > 0) {
            this.zIndex /= le;
        }
        if (le !== 2) {
            // 2D faces and points are a closed loop
            x.push(x[0]);
            y.push(y[0]);
        }
        return {
            X: x,
            Y: y
        };
    },
    addTransform: function(el, transform) {
        if (this.faceNumber === 0) {
            this.addTransformGeneric(el, transform);
        }
        return this;
    },
    updateTransform: function() {
        var t, c, i, j, b;
        if (this.faceNumber !== 0) {
            return this;
        }
        if (this.transformations.length === 0 || this.baseElement === null) {
            return this;
        }
        t = this.transformations;
        for(i = 0; i < t.length; i++){
            t[i].update();
        }
        if (this === this.baseElement) {
            b = this.polyhedron;
        } else {
            b = this.baseElement.polyhedron;
        }
        for(i in b.coords){
            if (b.coords.hasOwnProperty(i)) {
                c = b.coords[i];
                for(j = 0; j < t.length; j++){
                    c = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(t[j].matrix, c);
                }
                this.polyhedron.coords[i] = c;
            }
        }
        return this;
    },
    update: function() {
        var i, le, phdr, nrm, p1, p2, face;
        if (this.needsUpdate && !this.view.board._change3DView) {
            phdr = this.polyhedron;
            if (this.faceNumber === 0) {
                // Update coordinates of all vertices
                this.updateCoords().updateTransform();
            }
            face = phdr.faces[this.faceNumber];
            le = face.length;
            if (le < 3) {
                // Get out of here if face is point or segment
                return this;
            }
            // Update spanning vectors
            p1 = phdr.coords[face[0]];
            p2 = phdr.coords[face[1]];
            this.vec1 = [
                p2[0] - p1[0],
                p2[1] - p1[1],
                p2[2] - p1[2],
                p2[3] - p1[3]
            ];
            p2 = phdr.coords[face[2]];
            this.vec2 = [
                p2[0] - p1[0],
                p2[1] - p1[1],
                p2[2] - p1[2],
                p2[3] - p1[3]
            ];
            // Update Hesse form, i.e. normal and d
            this.normal = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].crossProduct(this.vec1.slice(1), this.vec2.slice(1));
            nrm = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].norm(this.normal);
            this.normal.unshift(0);
            if (Math.abs(nrm) > 1.e-12) {
                for(i = 1; i < 4; i++){
                    this.normal[i] /= nrm;
                }
            }
            this.d = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(p1, this.normal, 4);
        }
        return this;
    },
    updateRenderer: function() {
        if (this.needsUpdate) {
            this.needsUpdate = false;
            this.shader();
        }
        return this;
    },
    /**
         * Determines the lightness of the face (in the HSL color scheme).
         * <p>
         * Sets the fillColor of the adjoint 2D curve.
         * @name shader
         * @memberOf Face3D
         * @function
         * @returns {Number} zIndex of the face
         */ shader: function() {
        var hue, sat, light, angle, hsl, // bb = this.view.bbox3D,
        minFace, maxFace, minLight, maxLight;
        if (this.evalVisProp('shader.enabled')) {
            hue = this.evalVisProp('shader.hue');
            sat = this.evalVisProp('shader.saturation');
            minLight = this.evalVisProp('shader.minlightness');
            maxLight = this.evalVisProp('shader.maxlightness');
            if (this.evalVisProp('shader.type').toLowerCase() === 'angle') {
                // Angle normal / eye
                angle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(this.view.matrix3DRotShift[3], this.normal);
                angle = Math.abs(angle);
                light = minLight + (maxLight - minLight) * angle;
            } else {
                // zIndex
                maxFace = this.view.zIndexMax;
                minFace = this.view.zIndexMin;
                light = minLight + (maxLight - minLight) * ((this.zIndex - minFace) / (maxFace - minFace));
            }
            // hsl = `hsl(${hue}, ${sat}%, ${light}%)`;
            hsl = 'hsl(' + hue + ',' + sat + '%,' + light + '%)';
            this.element2D.visProp.fillcolor = hsl;
            return this.zIndex;
        }
    }
});
/**
 * @class This element creates a 3D face.
 * @pseudo
 * @description A 3D faces is TODO
 *
 * @name Face3D
 * @augments Curve
 * @constructor
 * @type Object
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
  */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFace3D = function(board, parents, attributes) {
    var view = parents[0], polyhedron = parents[1], faceNumber = parents[2], attr, el;
    // TODO Throw new Error
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "face3d");
    el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Face3D(view, polyhedron, faceNumber, attr);
    attr = el.setAttr2D(attr);
    el.element2D = view.create("curve", [
        [],
        []
    ], attr);
    el.element2D.view = view;
    /**
     * @class
     * @ignore
     */ el.element2D.updateDataArray = function() {
        var ret = el.updateDataArray2D();
        this.dataX = ret.X;
        this.dataY = ret.Y;
    };
    el.addChild(el.element2D);
    el.inherits.push(el.element2D);
    el.element2D.setParents(el);
    el.element2D.prepareUpdate().update();
    if (!board.isSuspendedUpdate) {
        el.element2D.updateVisibility().updateRenderer();
    }
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("face3d", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFace3D);
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/polyhedron3d.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
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
 */ /*global JXG:true, define: true*/ /**
 * Create axes and rear and front walls of the
 * view3d bounding box bbox3D.
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Polyhedron3D = function(view, polyhedron, faces, attributes) {
    var e, genericMethods, generateMethod, that = this;
    this.constructor(view.board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYHEDRON3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_3D);
    this.constructor3D(view, "polyhedron3d");
    this.board.finalizeAdding(this);
    this.elType = 'polyhedron3d';
    /**
     * List of Face3D objects.
     * @name Polyhedron3D#faces
     * @type Array
     */ this.faces = faces;
    /**
     * Number of faces
     * @name Polyhedron3D#numberFaces
     * @type Number
     */ this.numberFaces = faces.length;
    /**
     * Contains the defining data of the polyhedron:
     * Definitions of vertices and a list of vertices for each face. This is pretty much the input given
     * in the construction of the polyhedron plus internal data.
     * @name Polyhedron3D#def
     * @type Object
     * @example
     *  polyhedron = {
     *      view: view,
     *      vertices: {},
     *      coords: {},
     *      coords2D: {},
     *      zIndex: {},
     *      faces: []
     *  };
     */ this.def = polyhedron;
    // Simultaneous methods for all faces
    genericMethods = [
        "setAttribute",
        "setParents",
        "prepareUpdate",
        "updateRenderer",
        "update",
        "fullUpdate",
        "highlight",
        "noHighlight"
    ];
    generateMethod = function(what) {
        return function() {
            var i;
            for(i in that.faces){
                if (that.faces.hasOwnProperty(i)) {
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(that.faces[i][what])) {
                        that.faces[i][what].apply(that.faces[i], arguments);
                    }
                }
            }
            return that;
        };
    };
    for(e = 0; e < genericMethods.length; e++){
        this[genericMethods[e]] = generateMethod(genericMethods[e]);
    }
    this.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(this.methodMap, {
        setAttribute: "setAttribute",
        setParents: "setParents",
        addTransform: "addTransform"
    });
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Polyhedron3D.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyPrototypeMethods(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Polyhedron3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement3D, "constructor3D");
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Polyhedron3D.prototype, /** @lends JXG.Polyhedron3D.prototype */ {
    // Already documented in element3d.js
    addTransform: function(el, transform) {
        if (this.faces.length > 0 && el.faces.length > 0) {
            this.faces[0].addTransform(el.faces[0], transform);
        } else {
            throw new Error("Adding transformation failed. At least one of the two polyhedra has no faces.");
        }
        return this;
    },
    /**
         * Output polyhedron in ASCII STL format.
         * Normals are ignored and output as 0 0 0.
         *
         * @param {String} name Set name of the model, overwrites property name
         * @returns String
         */ toSTL: function(name) {
        var i, j, v, f, c, le, txt = 'model ';
        if (name === undefined) {
            name = this.name;
        }
        txt += name + '\n';
        for(i = 0; i < this.def.faces.length; i++){
            txt += ' facet normal 0 0 0\n  outer loop\n';
            f = this.def.faces[i];
            le = f.length;
            v = this.def.coords;
            for(j = 0; j < le; j++){
                c = v[f[j]];
                txt += '   vertex ' + c[1] + ' ' + c[2] + ' ' + c[3] + '\n';
            }
            txt += '  endloop\n endfacet\n';
        }
        txt += 'endsolid ' + name + '\n';
        return txt;
    }
});
/**
 * @class A polyhedron in a 3D view consists of faces.
 * @pseudo
 * @description Create a polyhedron in a 3D view consisting of faces. Faces can
 * be 0-, 1- or 2-dimensional.
 *
 * @name Polyhedron3D
 * @augments JXG.GeometryElement3D
 * @constructor
 * @type Object
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {} TODO
 *
 * @example
 * var box = [-4, 4];
 * var view = board.create(
 *     'view3d',
 *     [[-5, -3], [8, 8],
 *     [box, box, box]],
 *     {
 *         projection: 'parallel',
 *         trackball: { enabled: false },
 *         depthOrder: {
 *             enabled: true
 *         },
 *         xPlaneRear: { visible: false },
 *         yPlaneRear: { visible: false },
 *         zPlaneRear: { fillOpacity: 0.2 }
 *     }
 * );
 * var cube = view.create('polyhedron3d', [
 * [
 *     [-3, -3, -3],
 *     [3, -3, -3],
 *     [3, 3, -3],
 *     [-3, 3, -3],
 *
 *     [-3, -3, 3],
 *     [3, -3, 3],
 *     [3, 3, 3],
 *     [-3, 3, 3]
 * ],
 * [
 *     [0, 1, 2, 3],
 *     [0, 1, 5, 4],
 *     [[1, 2, 6, 5], { fillColor: 'black', fillOpacity: 0.5, strokeWidth: 5 }],
 *     [2, 3, 7, 6],
 *     [3, 0, 4, 7],
 *     [4, 5, 6, 7]
 * ]
 * ], {
 * fillColorArray: ['blue', 'red', 'yellow']
 * });
 *
 * </pre><div id="JXG2ab3325b-4171-4a00-9896-a1b886969e18" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG2ab3325b-4171-4a00-9896-a1b886969e18',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *     var box = [-4, 4];
 *     var view = board.create(
 *         'view3d',
 *         [[-5, -3], [8, 8],
 *         [box, box, box]],
 *         {
 *             projection: 'parallel',
 *             trackball: { enabled: false },
 *             depthOrder: {
 *                 enabled: true
 *             },
 *             xPlaneRear: { visible: false },
 *             yPlaneRear: { visible: false },
 *             zPlaneRear: { fillOpacity: 0.2 }
 *         }
 *     );
 *     var cube = view.create('polyhedron3d', [
 *     [
 *         [-3, -3, -3],
 *         [3, -3, -3],
 *         [3, 3, -3],
 *         [-3, 3, -3],
 *
 *         [-3, -3, 3],
 *         [3, -3, 3],
 *         [3, 3, 3],
 *         [-3, 3, 3]
 *     ],
 *     [
 *         [0, 1, 2, 3],
 *         [0, 1, 5, 4],
 *         [[1, 2, 6, 5], { fillColor: 'black', fillOpacity: 0.5, strokeWidth: 5 }],
 *         [2, 3, 7, 6],
 *         [3, 0, 4, 7],
 *         [4, 5, 6, 7]
 *     ]
 *     ], {
 *     fillColorArray: ['blue', 'red', 'yellow']
 *     });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * var box = [-4, 4];
 * var view = board.create(
 *     'view3d',
 *     [[-5, -3], [8, 8],
 *     [box, box, box]],
 *     {
 *         projection: 'parallel',
 *         trackball: { enabled: false },
 *         depthOrder: {
 *             enabled: true
 *         },
 *         xPlaneRear: { visible: false },
 *         yPlaneRear: { visible: false },
 *         zPlaneRear: { fillOpacity: 0.2 }
 *     }
 * );
 * var aa = view.create('point3d', [-3, -3, -3], { name: 'A', layer: 12});
 * var bb = view.create('point3d', [() => aa.X(), () => aa.Y(), 3], { name: 'B', fixed: true, layer: 12});
 * var cube = view.create('polyhedron3d', [
 *     {
 *         a: 'A',
 *         b: [3, -3, -3],
 *         c: [3, 3, -3],
 *         d: [-3, 3, -3],
 *
 *         e: bb,
 *         f: [3, -3, 3],
 *         g: [3, 3, 3],
 *         h: [-3, 3, 3]
 *     },
 *     [
 *         ['a', 'b', 'c', 'd'],
 *         ['a', 'b', 'f', 'e'],
 *         ['b', 'c', 'g', 'f'],
 *         ['c', 'd', 'h', 'g'],
 *         ['d', 'a', 'e', 'h'],
 *         ['e', 'f', 'g', 'h'],
 *
 *         ['a', 'g'], // Edge
 *         ['f']       // Vertex
 *     ]
 * ], {
 *     fillColorArray: ['blue', 'red', 'yellow'],
 *     fillOpacity: 0.4,
 *     layer: 12
 * });
 * cube.faces[6].setAttribute({ strokeWidth: 5 });
 * cube.faces[7].setAttribute({ strokeWidth: 10 });
 *
 * </pre><div id="JXG1e862f44-3e38-424b-98d5-f972338a8b7f" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG1e862f44-3e38-424b-98d5-f972338a8b7f',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *     var box = [-4, 4];
 *     var view = board.create(
 *         'view3d',
 *         [[-5, -3], [8, 8],
 *         [box, box, box]],
 *         {
 *             projection: 'parallel',
 *             trackball: { enabled: false },
 *             depthOrder: {
 *                 enabled: true
 *             },
 *             xPlaneRear: { visible: false },
 *             yPlaneRear: { visible: false },
 *             zPlaneRear: { fillOpacity: 0.2 }
 *         }
 *     );
 *     var aa = view.create('point3d', [-3, -3, -3], { name: 'A', layer: 12});
 *     var bb = view.create('point3d', [() => aa.X(), () => aa.Y(), 3], { name: 'B', fixed: true, layer: 12});
 *     var cube = view.create('polyhedron3d', [
 *         {
 *             a: 'A',
 *             b: [3, -3, -3],
 *             c: [3, 3, -3],
 *             d: [-3, 3, -3],
 *
 *             e: bb,
 *             f: [3, -3, 3],
 *             g: [3, 3, 3],
 *             h: [-3, 3, 3]
 *         },
 *         [
 *             ['a', 'b', 'c', 'd'],
 *             ['a', 'b', 'f', 'e'],
 *             ['b', 'c', 'g', 'f'],
 *             ['c', 'd', 'h', 'g'],
 *             ['d', 'a', 'e', 'h'],
 *             ['e', 'f', 'g', 'h'],
 *
 *             ['a', 'g'], // Edge
 *             ['f']       // Vertex
 *         ]
 *     ], {
 *         fillColorArray: ['blue', 'red', 'yellow'],
 *         fillOpacity: 0.4,
 *         layer: 12
 *     });
 *     cube.faces[6].setAttribute({ strokeWidth: 5 });
 *     cube.faces[7].setAttribute({ strokeWidth: 10 });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * var box = [-4, 4];
 * var view = board.create(
 *     'view3d',
 *     [[-5, -3], [8, 8],
 *     [box, box, box]],
 *     {
 *         projection: 'parallel',
 *         trackball: { enabled: false },
 *         depthOrder: {
 *             enabled: true
 *         },
 *         xPlaneRear: { visible: false },
 *         yPlaneRear: { visible: false },
 *         zPlaneRear: { fillOpacity: 0.2 }
 *     }
 * );
 * var s = board.create('slider', [[-4, -6], [4, -6], [0, 2, 4]], { name: 's' });
 * var cube = view.create('polyhedron3d', [
 *     [
 *         () => { let f = s.Value(); return [-f, -f, -f]; },
 *         () => { let f = s.Value(); return [f, -f, -f]; },
 *         () => { let f = s.Value(); return [f, f, -f]; },
 *         () => { let f = s.Value(); return [-f, f, -f]; },
 *
 *         () => { let f = s.Value(); return [-f, -f, f]; },
 *         () => { let f = s.Value(); return [f, -f, f]; },
 *         () => { let f = s.Value(); return [f, f, f]; },
 *         // () => { let f = s.Value(); return [-f, f, f]; }
 *         [ () => -s.Value(),  () => s.Value(), () => s.Value() ]
 *     ],
 *     [
 *         [0, 1, 2, 3],
 *         [0, 1, 5, 4],
 *         [1, 2, 6, 5],
 *         [2, 3, 7, 6],
 *         [3, 0, 4, 7],
 *         [4, 5, 6, 7],
 *     ]
 * ], {
 *     strokeWidth: 3,
 *     fillOpacity: 0.6,
 *     fillColorArray: ['blue', 'red', 'yellow'],
 *     shader: {
 *         enabled:false
 *     }
 * });
 *
 * </pre><div id="JXG6f27584b-b648-4743-a864-a6c559ead00e" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG6f27584b-b648-4743-a864-a6c559ead00e',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *     var box = [-4, 4];
 *     var view = board.create(
 *         'view3d',
 *         [[-5, -3], [8, 8],
 *         [box, box, box]],
 *         {
 *             projection: 'parallel',
 *             trackball: { enabled: false },
 *             depthOrder: {
 *                 enabled: true
 *             },
 *             xPlaneRear: { visible: false },
 *             yPlaneRear: { visible: false },
 *             zPlaneRear: { fillOpacity: 0.2 }
 *         }
 *     );
 *     var s = board.create('slider', [[-4, -6], [4, -6], [0, 2, 4]], { name: 's' });
 *     var cube = view.create('polyhedron3d', [
 *         [
 *             () => { let f = s.Value(); return [-f, -f, -f]; },
 *             () => { let f = s.Value(); return [f, -f, -f]; },
 *             () => { let f = s.Value(); return [f, f, -f]; },
 *             () => { let f = s.Value(); return [-f, f, -f]; },
 *
 *             () => { let f = s.Value(); return [-f, -f, f]; },
 *             () => { let f = s.Value(); return [f, -f, f]; },
 *             () => { let f = s.Value(); return [f, f, f]; },
 *             // () => { let f = s.Value(); return [-f, f, f]; }
 *             [ () => -s.Value(),  () => s.Value(), () => s.Value() ]
 *         ],
 *         [
 *             [0, 1, 2, 3],
 *             [0, 1, 5, 4],
 *             [1, 2, 6, 5],
 *             [2, 3, 7, 6],
 *             [3, 0, 4, 7],
 *             [4, 5, 6, 7],
 *         ]
 *     ], {
 *         strokeWidth: 3,
 *         fillOpacity: 0.6,
 *         fillColorArray: ['blue', 'red', 'yellow'],
 *         shader: {
 *             enabled:false
 *         }
 *     });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * var box = [-4, 4];
 * var view = board.create(
 *     'view3d',
 *     [[-5, -3], [8, 8],
 *     [box, box, box]],
 *     {
 *         projection: 'parallel',
 *         trackball: { enabled: false },
 *         depthOrder: {
 *             enabled: true
 *         },
 *         xPlaneRear: { visible: false },
 *         yPlaneRear: { visible: false },
 *         zPlaneRear: { fillOpacity: 0.2 }
 *     }
 * );
 * let rho = 1.6180339887;
 * let vertexList = [
 *     [0, -1, -rho], [0, +1, -rho], [0, -1, rho], [0, +1, rho],
 *     [1, rho, 0], [-1, rho, 0], [1, -rho, 0], [-1, -rho, 0],
 *     [-rho, 0, 1], [-rho, 0, -1], [rho, 0, 1], [rho, 0, -1]
 * ];
 * let faceArray = [
 *     [4, 1, 11],
 *     [11, 1, 0],
 *     [6, 11, 0],
 *     [0, 1, 9],
 *     [11, 10, 4],
 *     [9, 1, 5],
 *     [8, 9, 5],
 *     [5, 3, 8],
 *     [6, 10, 11],
 *     [2, 3, 10],
 *     [2, 10, 6],
 *     [8, 3, 2],
 *     [3, 4, 10],
 *     [7, 8, 2],
 *     [9, 8, 7],
 *     [0, 9, 7],
 *     [4, 3, 5],
 *     [5, 1, 4],
 *     [0, 7, 6],
 *     [7, 2, 6]
 * ];
 * var ico = view.create('polyhedron3d', [vertexList, faceArray], {
 * fillColorArray: [],
 * fillOpacity: 1,
 * strokeWidth: 0.1,
 * layer: 12,
 * shader: {
 *     enabled: true,
 *     type: 'angle',
 *     hue: 60,
 *     saturation: 90,
 *     minlightness: 60,
 *     maxLightness: 80
 * }
 * });
 *
 * </pre><div id="JXGfea93484-96e9-4eb5-9e45-bb53d612aead" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGfea93484-96e9-4eb5-9e45-bb53d612aead',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *     var box = [-4, 4];
 *     var view = board.create(
 *         'view3d',
 *         [[-5, -3], [8, 8],
 *         [box, box, box]],
 *         {
 *             projection: 'parallel',
 *             trackball: { enabled: false },
 *             depthOrder: {
 *                 enabled: true
 *             },
 *             xPlaneRear: { visible: false },
 *             yPlaneRear: { visible: false },
 *             zPlaneRear: { fillOpacity: 0.2 }
 *         }
 *     );
 *     let rho = 1.6180339887;
 *     let vertexList = [
 *     [0, -1, -rho], [0, +1, -rho], [0, -1, rho], [0, +1, rho],
 *     [1, rho, 0], [-1, rho, 0], [1, -rho, 0], [-1, -rho, 0],
 *     [-rho, 0, 1], [-rho, 0, -1], [rho, 0, 1], [rho, 0, -1]
 *     ];
 *     let faceArray = [
 *     [4, 1, 11],
 *     [11, 1, 0],
 *     [6, 11, 0],
 *     [0, 1, 9],
 *     [11, 10, 4],
 *     [9, 1, 5],
 *     [8, 9, 5],
 *     [5, 3, 8],
 *     [6, 10, 11],
 *     [2, 3, 10],
 *     [2, 10, 6],
 *     [8, 3, 2],
 *     [3, 4, 10],
 *     [7, 8, 2],
 *     [9, 8, 7],
 *     [0, 9, 7],
 *     [4, 3, 5],
 *     [5, 1, 4],
 *     [0, 7, 6],
 *     [7, 2, 6]
 *     ];
 *     var ico = view.create('polyhedron3d', [vertexList, faceArray], {
 *     fillColorArray: [],
 *     fillOpacity: 1,
 *     strokeWidth: 0.1,
 *     layer: 12,
 *     shader: {
 *         enabled: true,
 *         type: 'angle',
 *         hue: 60,
 *         saturation: 90,
 *         minlightness: 60,
 *         maxLightness: 80
 *     }
 *     });
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPolyhedron3D = function(board, parents, attributes) {
    var view = parents[0], i, le, face, f, el, attr, attr_polyhedron, faceList = [], base = null, transform = null, polyhedron = {
        view: view,
        vertices: {},
        coords: {},
        coords2D: {},
        zIndex: {},
        faces: []
    };
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(parents[1].type) && parents[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYHEDRON3D) {
        // Polyhedron from baseElement and transformations
        base = parents[1];
        transform = parents[2];
        polyhedron.vertices = base.def.vertices;
        polyhedron.faces = base.def.faces;
    } else {
        // Copy vertices into a dict
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(parents[1])) {
            le = parents[1].length;
            for(i = 0; i < le; i++){
                polyhedron.vertices[i] = parents[1][i];
            }
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isObject(parents[1])) {
            for(i in parents[1]){
                if (parents[1].hasOwnProperty(i)) {
                    polyhedron.vertices[i] = parents[1][i];
                }
            }
        }
        polyhedron.faces = parents[2];
    }
    attr_polyhedron = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "polyhedron3d");
    console.time('polyhedron');
    view.board.suspendUpdate();
    // Create face3d elements
    le = polyhedron.faces.length;
    for(i = 0; i < le; i++){
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "face3d");
        if (attr_polyhedron.fillcolorarray.length > 0) {
            attr.fillcolor = attr_polyhedron.fillcolorarray[i % attr_polyhedron.fillcolorarray.length];
        }
        f = polyhedron.faces[i];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(f) && f.length === 2 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isObject(f[1]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(f[0])) {
            // Handle case that face is of type [[points], {attr}]
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].mergeAttr(attr, f[1]);
            // Normalize face array, i.e. don't store attributes of that face in polyhedron
            polyhedron.faces[i] = f[0];
        }
        face = view.create('face3d', [
            polyhedron,
            i
        ], attr);
        faceList.push(face);
    }
    el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Polyhedron3D(view, polyhedron, faceList, attr_polyhedron);
    el.setParents(el); // Sets el as parent to all faces.
    for(i = 0; i < le; i++){
        el.inherits.push(el.faces[i]);
        el.addChild(el.faces[i]);
    }
    if (base !== null) {
        el.addTransform(base, transform);
        el.addParents(base);
    }
    view.board.unsuspendUpdate();
    console.timeEnd('polyhedron');
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("polyhedron3d", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPolyhedron3D);
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/sphere3d.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Aaron Fenyes,
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
 */ /*global JXG:true, define: true*/ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$statistics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/statistics.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
/**
 * A sphere consists of all points with a given distance from a given point.
 * The given point is called the center, and the given distance is called the radius.
 * A sphere can be constructed by providing a center and a point on the sphere or a center and a radius (given as a number or function).
 * @class Creates a new 3D sphere object. Do not use this constructor to create a 3D sphere. Use {@link JXG.View3D#create} with
 * type {@link Sphere3D} instead.
 * @augments JXG.GeometryElement3D
 * @augments JXG.GeometryElement
 * @param {JXG.View3D} view The 3D view the sphere is drawn on.
 * @param {String} method Can be:
 * <ul><li> <b><code>'twoPoints'</code></b> &ndash; The sphere is defined by its center and a point on the sphere.</li>
 * <li><b><code>'pointRadius'</code></b> &ndash; The sphere is defined by its center and its radius in user units.</li></ul>
 * The parameters <code>p1</code>, <code>p2</code> and <code>radius</code> must be set according to this method parameter.
 * @param {JXG.Point3D} par1 The center of the sphere.
 * @param {JXG.Point3D} par2 Can be:
 * <ul><li>A point on the sphere (if the construction method is <code>'twoPoints'</code>)</li>
 * <ul><li>A number or function (if the construction method is <code>'pointRadius'</code>)</li>
 * @param {Object} attributes An object containing visual properties like in {@link JXG.Options#point3d} and
 * {@link JXG.Options#elements}, and optional a name and an id.
 * @see JXG.Board#generateName
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Sphere3D = function(view, method, par1, par2, attributes) {
    this.constructor(view.board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_SPHERE3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_3D);
    this.constructor3D(view, "sphere3d");
    this.board.finalizeAdding(this);
    /**
     * The construction method.
     * Can be:
     * <ul><li><b><code>'twoPoints'</code></b> &ndash; The sphere is defined by its center and a point on the sphere.</li>
     * <li><b><code>'pointRadius'</code></b> &ndash; The sphere is defined by its center and its radius in user units.</li></ul>
     * @type String
     * @see JXG.Sphere3D#center
     * @see JXG.Sphere3D#point2
     */ this.method = method;
    /**
     * The sphere's center. Do not set this parameter directly, as that will break JSXGraph's update system.
     * @type JXG.Point3D
     */ this.center = this.board.select(par1);
    /**
     * A point on the sphere; only set if the construction method is 'twoPoints'. Do not set this parameter directly, as that will break JSXGraph's update system.
     * @type JXG.Point3D
     * @see JXG.Sphere3D#method
     */ this.point2 = null;
    this.points = [];
    /**
     * The 2D representation of the element.
     * @type GeometryElement
     */ this.element2D = null;
    /**
     * Elements supporting the 2D representation.
     * @type Array
     * @private
     */ this.aux2D = [];
    /**
     * The type of projection (<code>'parallel'</code> or <code>'central'</code>) that the sphere is currently drawn in.
     * @type String
     */ this.projectionType = view.projectionType;
    if (method === "twoPoints") {
        this.point2 = this.board.select(par2);
        this.radius = this.Radius();
    } else if (method === "pointRadius") {
        // Converts JessieCode syntax into JavaScript syntax and generally ensures that the radius is a function
        this.updateRadius = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunction(par2, this.board);
        // First evaluation of the radius function
        this.updateRadius();
        this.addParentsFromJCFunctions([
            this.updateRadius
        ]);
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.center._is_new)) {
        this.addChild(this.center);
        delete this.center._is_new;
    } else {
        this.center.addChild(this);
    }
    if (method === "twoPoints") {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.point2._is_new)) {
            this.addChild(this.point2);
            delete this.point2._is_new;
        } else {
            this.point2.addChild(this);
        }
    }
    this.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(this.methodMap, {
        center: "center",
        point2: "point2",
        Radius: "Radius"
    });
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Sphere3D.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyPrototypeMethods(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Sphere3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement3D, "constructor3D");
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Sphere3D.prototype, /** @lends JXG.Sphere3D.prototype */ {
    X: function(u, v) {
        var r = this.Radius();
        return r * Math.sin(u) * Math.cos(v);
    },
    Y: function(u, v) {
        var r = this.Radius();
        return r * Math.sin(u) * Math.sin(v);
    },
    Z: function(u, v) {
        var r = this.Radius();
        return r * Math.cos(u);
    },
    range_u: [
        0,
        2 * Math.PI
    ],
    range_v: [
        0,
        Math.PI
    ],
    update: function() {
        if (this.projectionType !== this.view.projectionType) {
            this.rebuildProjection();
        }
        return this;
    },
    updateRenderer: function() {
        this.needsUpdate = false;
        return this;
    },
    /**
         * Set a new radius, then update the board.
         * @param {String|Number|function} r A string, function or number describing the new radius
         * @returns {JXG.Sphere3D} Reference to this sphere
         */ setRadius: function(r) {
        this.updateRadius = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunction(r, this.board);
        this.addParentsFromJCFunctions([
            this.updateRadius
        ]);
        this.board.update();
        return this;
    },
    /**
         * Calculates the radius of the circle.
         * @param {String|Number|function} [value] Set new radius
         * @returns {Number} The radius of the circle
         */ Radius: function(value) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(value)) {
            this.setRadius(value);
            return this.Radius();
        }
        if (this.method === "twoPoints") {
            if (!this.center.testIfFinite() || !this.point2.testIfFinite()) {
                return NaN;
            }
            return this.center.distance(this.point2);
        }
        if (this.method === "pointRadius") {
            return Math.abs(this.updateRadius());
        }
        return NaN;
    },
    // The central projection of a sphere is an ellipse. The front and back
    // points of the sphere---that is, the points closest to and furthest
    // from the screen---project to the foci of the ellipse.
    //
    // To see this, look at the cone tangent to the sphere whose tip is at
    // the camera. The image of the sphere is the ellipse where this cone
    // intersects the screen. By acting on the sphere with scalings centered
    // on the camera, you can send it to either of the Dandelin spheres that
    // touch the screen at the foci of the image ellipse.
    //
    // This factory method produces two functions, `focusFn(-1)` and
    // `focusFn(1)`, that evaluate to the projections of the front and back
    // points of the sphere, respectively.
    focusFn: function(sgn) {
        var that = this;
        return function() {
            var camDir = that.view.boxToCam[3], r = that.Radius();
            return that.view.project3DTo2D([
                that.center.X() + sgn * r * camDir[1],
                that.center.Y() + sgn * r * camDir[2],
                that.center.Z() + sgn * r * camDir[3]
            ]).slice(1, 3);
        };
    },
    innerVertexFn: function() {
        var that = this;
        return function() {
            var view = that.view, p = view.worldToFocal(that.center.coords, false), distOffAxis = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hypot(p[0], p[1]), cam = view.boxToCam, r = that.Radius(), angleOffAxis = Math.atan(-distOffAxis / p[2]), steepness = Math.acos(r / __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].norm(p)), lean = angleOffAxis + steepness, cos_lean = Math.cos(lean), sin_lean = Math.sin(lean), inward;
            if (distOffAxis > 1e-8) {
                // if the center of the sphere isn't too close to the camera
                // axis, find the direction in plane of the screen that
                // points from the center of the sphere toward the camera
                // axis
                inward = [
                    -(p[0] * cam[1][1] + p[1] * cam[2][1]) / distOffAxis,
                    -(p[0] * cam[1][2] + p[1] * cam[2][2]) / distOffAxis,
                    -(p[0] * cam[1][3] + p[1] * cam[2][3]) / distOffAxis
                ];
            } else {
                // if the center of the sphere is very close to the camera
                // axis, choose an arbitrary unit vector in the plane of the
                // screen
                inward = [
                    cam[1][1],
                    cam[1][2],
                    cam[1][3]
                ];
            }
            return view.project3DTo2D([
                that.center.X() + r * (sin_lean * inward[0] + cos_lean * cam[3][1]),
                that.center.Y() + r * (sin_lean * inward[1] + cos_lean * cam[3][2]),
                that.center.Z() + r * (sin_lean * inward[2] + cos_lean * cam[3][3])
            ]);
        };
    },
    buildCentralProjection: function(attr) {
        var view = this.view, auxStyle = {
            visible: false,
            withLabel: false
        }, frontFocus = view.create('point', this.focusFn(-1), auxStyle), backFocus = view.create('point', this.focusFn(1), auxStyle), innerVertex = view.create('point', this.innerVertexFn(view), auxStyle);
        this.aux2D = [
            frontFocus,
            backFocus,
            innerVertex
        ];
        this.element2D = view.create('ellipse', this.aux2D, attr === undefined ? this.visProp : attr);
    },
    buildParallelProjection: function(attr) {
        // The parallel projection of a sphere is a circle
        var that = this, // center2d = function () {
        //     var c3d = [1, that.center.X(), that.center.Y(), that.center.Z()];
        //     return that.view.project3DTo2D(c3d);
        // },
        radius2d = function() {
            var boxSize = that.view.bbox3D[0][1] - that.view.bbox3D[0][0];
            return that.Radius() * that.view.size[0] / boxSize;
        };
        this.aux2D = [];
        this.element2D = this.view.create('circle', // [center2d, radius2d],
        [
            that.center.element2D,
            radius2d
        ], attr === undefined ? this.visProp : attr);
    },
    // replace our 2D representation with a new one that's consistent with
    // the view's current projection type
    rebuildProjection: function(attr) {
        var i;
        // remove the old 2D representation from the scene tree
        if (this.element2D) {
            this.view.board.removeObject(this.element2D);
            for(i in this.aux2D){
                if (this.aux2D.hasOwnProperty(i)) {
                    this.view.board.removeObject(this.aux2D[i]);
                }
            }
        }
        // build a new 2D representation. the representation is stored in
        // `this.element2D`, and any auxiliary elements are stored in
        // `this.aux2D`
        this.projectionType = this.view.projectionType;
        if (this.projectionType === 'central') {
            this.buildCentralProjection(attr);
        } else {
            this.buildParallelProjection(attr);
        }
        // attach the new 2D representation to the scene tree
        this.addChild(this.element2D);
        this.inherits.push(this.element2D);
        this.element2D.view = this.view;
    },
    // Already documented in element3d.js
    projectCoords: function(p, params) {
        var r = this.Radius(), pp = [
            1
        ].concat(p), c = this.center.coords, d = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].distance(c, pp, 4), v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$statistics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].subtract(pp, c);
        if (d === 0) {
            // p is at the center, take an arbitrary point on sphere
            params[0] = 0;
            params[1] = 0;
            return [
                1,
                r,
                0,
                0
            ];
        }
        if (r === 0) {
            params[0] = 0;
            params[1] = 0;
            return this.center.coords;
        }
        d = r / d;
        v[0] = 1;
        v[1] *= d;
        v[2] *= d;
        v[3] *= d;
        // Preimage of the new position
        params[1] = Math.atan2(v[2], v[1]);
        params[1] += params[1] < 0 ? Math.PI : 0;
        if (params[1] !== 0) {
            params[0] = Math.atan2(v[2], v[3] * Math.sin(params[1]));
        } else {
            params[0] = Math.atan2(v[1], v[3] * Math.cos(params[1]));
        }
        params[0] += params[0] < 0 ? 2 * Math.PI : 0;
        return v;
    }
});
/**
 * @class A sphere in a 3D view.
 * A sphere consists of all points with a given distance from a given point.
 * The given point is called the center, and the given distance is called the radius.
 * A sphere can be constructed by providing a center and a point on the sphere or a center and a radius (given as a number or function).
 * If the radius is a negative value, its absolute value is taken.
 *
 * @pseudo
 * @name Sphere3D
 * @augments JXG.Sphere3D
 * @constructor
 * @type JXG.Sphere3D
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point3D_number,JXG.Point3D} center,radius The center must be given as a {@link JXG.Point3D} (see {@link JXG.providePoints3D}),
 * but the radius can be given as a number (which will create a sphere with a fixed radius) or another {@link JXG.Point3D}.
 * <p>
 * If the radius is supplied as number or the output of a function, its absolute value is taken.
 *
 * @example
 * var view = board.create(
 *     'view3d',
 *     [[-6, -3], [8, 8],
 *     [[0, 3], [0, 3], [0, 3]]],
 *     {
 *         xPlaneRear: {fillOpacity: 0.2, gradient: null},
 *         yPlaneRear: {fillOpacity: 0.2, gradient: null},
 *         zPlaneRear: {fillOpacity: 0.2, gradient: null}
 *     }
 * );
 *
 * // Two points
 * var center = view.create(
 *     'point3d',
 *     [1.5, 1.5, 1.5],
 *     {
 *         withLabel: false,
 *         size: 5,
 *    }
 * );
 * var point = view.create(
 *     'point3d',
 *     [2, 1.5, 1.5],
 *     {
 *         withLabel: false,
 *         size: 5
 *    }
 * );
 *
 * // Sphere
 * var sphere = view.create(
 *     'sphere3d',
 *     [center, point],
 *     {}
 * );
 *
 * </pre><div id="JXG5969b83c-db67-4e62-9702-d0440e5fe2c1" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG5969b83c-db67-4e62-9702-d0440e5fe2c1',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, pan: {enabled: false}, showcopyright: false, shownavigation: false});
 *         var view = board.create(
 *             'view3d',
 *             [[-6, -3], [8, 8],
 *             [[0, 3], [0, 3], [0, 3]]],
 *             {
 *                 xPlaneRear: {fillOpacity: 0.2, gradient: null},
 *                 yPlaneRear: {fillOpacity: 0.2, gradient: null},
 *                 zPlaneRear: {fillOpacity: 0.2, gradient: null}
 *             }
 *         );
 *
 *         // Two points
 *         var center = view.create(
 *             'point3d',
 *             [1.5, 1.5, 1.5],
 *             {
 *                 withLabel: false,
 *                 size: 5,
 *            }
 *         );
 *         var point = view.create(
 *             'point3d',
 *             [2, 1.5, 1.5],
 *             {
 *                 withLabel: false,
 *                 size: 5
 *            }
 *         );
 *
 *         // Sphere
 *         var sphere = view.create(
 *             'sphere3d',
 *             [center, point],
 *             {}
 *         );
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 *     // Glider on sphere
 *     var view = board.create(
 *         'view3d',
 *         [[-6, -3], [8, 8],
 *         [[-3, 3], [-3, 3], [-3, 3]]],
 *         {
 *             depthOrder: {
 *                 enabled: true
 *             },
 *             projection: 'central',
 *             xPlaneRear: {fillOpacity: 0.2, gradient: null},
 *             yPlaneRear: {fillOpacity: 0.2, gradient: null},
 *             zPlaneRear: {fillOpacity: 0.2, gradient: null}
 *         }
 *     );
 *
 *     // Two points
 *     var center = view.create('point3d', [0, 0, 0], {withLabel: false, size: 2});
 *     var point = view.create('point3d', [2, 0, 0], {withLabel: false, size: 2});
 *
 *     // Sphere
 *     var sphere = view.create('sphere3d', [center, point], {fillOpacity: 0.8});
 *
 *     // Glider on sphere
 *     var glide = view.create('point3d', [2, 2, 0, sphere], {withLabel: false, color: 'red', size: 4});
 *     var l1 = view.create('line3d', [glide, center], { strokeWidth: 2, dash: 2 });
 *
 * </pre><div id="JXG672fe3c7-e6fd-48e0-9a24-22f51f2dfa71" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG672fe3c7-e6fd-48e0-9a24-22f51f2dfa71',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *         var view = board.create(
 *             'view3d',
 *             [[-6, -3], [8, 8],
 *             [[-3, 3], [-3, 3], [-3, 3]]],
 *             {
 *                 depthOrder: {
 *                     enabled: true
 *                 },
 *                 projection: 'central',
 *                 xPlaneRear: {fillOpacity: 0.2, gradient: null},
 *                 yPlaneRear: {fillOpacity: 0.2, gradient: null},
 *                 zPlaneRear: {fillOpacity: 0.2, gradient: null}
 *             }
 *         );
 *
 *         // Two points
 *         var center = view.create('point3d', [0, 0, 0], {withLabel: false, size: 2});
 *         var point = view.create('point3d', [2, 0, 0], {withLabel: false, size: 2});
 *
 *         // Sphere
 *         var sphere = view.create('sphere3d', [center, point], {fillOpacity: 0.8});
 *
 *         // Glider on sphere
 *         var glide = view.create('point3d', [2, 2, 0, sphere], {withLabel: false, color: 'red', size: 4});
 *         var l1 = view.create('line3d', [glide, center], { strokeWidth: 2, dash: 2 });
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createSphere3D = function(board, parents, attributes) {
    //   parents[0]: view
    //   parents[1]: point,
    //   parents[2]: point or radius
    var view = parents[0], attr, p, point_style, provided, el, i;
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'sphere3d');
    p = [];
    for(i = 1; i < parents.length; i++){
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPointType3D(board, parents[i])) {
            if (p.length === 0) {
                point_style = 'center';
            } else {
                point_style = 'point';
            }
            provided = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].providePoints3D(view, [
                parents[i]
            ], attributes, 'sphere3d', [
                point_style
            ])[0];
            if (provided === false) {
                throw new Error("JSXGraph: Can't create sphere3d from this type. Please provide a point type.");
            }
            p.push(provided);
        } else {
            p.push(parents[i]);
        }
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint3D(p[0]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint3D(p[1])) {
        // Point/Point
        el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Sphere3D(view, "twoPoints", p[0], p[1], attr);
    /////////////// nothing in docs suggest you can use [number, pointType]
    // } else if (
    //     (Type.isNumber(p[0]) || Type.isFunction(p[0]) || Type.isString(p[0])) &&
    //     Type.isPoint3D(p[1])
    // ) {
    //     // Number/Point
    //     el = new JXG.Sphere3D(view, "pointRadius", p[1], p[0], attr);
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isPoint3D(p[0]) && (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(p[1]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(p[1]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(p[1]))) {
        // Point/Number
        el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Sphere3D(view, "pointRadius", p[0], p[1], attr);
    } else {
        throw new Error("JSXGraph: Can't create sphere3d with parent types '" + typeof parents[1] + "' and '" + typeof parents[2] + "'." + "\nPossible parent types: [point,point], [point,number], [point,function]");
    }
    // Build a 2D representation, and attach it to the scene tree, and update it
    // to the correct initial state
    // Here, element2D is created.
    attr = el.setAttr2D(attr);
    el.rebuildProjection(attr);
    el.element2D.prepareUpdate().update();
    if (!board.isSuspendedUpdate) {
        el.element2D.updateVisibility().updateRenderer();
    }
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("sphere3d", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createSphere3D);
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/surface3d.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
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
 */ /*global JXG:true, define: true*/ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
;
;
;
;
;
/**
 * Constructor for 3D surfaces.
 * @class Creates a new 3D surface object. Do not use this constructor to create a 3D surface. Use {@link JXG.View3D#create} with type {@link Surface3D} instead.
 *
 * @augments JXG.GeometryElement3D
 * @augments JXG.GeometryElement
 * @param {View3D} view
 * @param {Function} F
 * @param {Function} X
 * @param {Function} Y
 * @param {Function} Z
 * @param {Array} range_u
 * @param {Array} range_v
 * @param {Object} attributes
 * @see JXG.Board#generateName
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Surface3D = function(view, F, X, Y, Z, range_u, range_v, attributes) {
    this.constructor(view.board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_SURFACE3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_3D);
    this.constructor3D(view, "surface3d");
    this.board.finalizeAdding(this);
    /**
     * Internal function defining the surface
     * without applying any transformations.
     *
     * @function
     * @param {Number} u
     * @param {Number} v
     * @returns Array [x, y, z] of length 3
     * @private
     */ this._F = F;
    /**
     * Internal function which maps (u, v) to x; i.e. it defines the x-coordinate of the surface
     * without applying any transformations.
     * @function
     * @param {Number} u
     * @param {Number} v
     * @returns Number
     * @private
     */ this._X = X;
    /**
     * Internal function which maps (u, v) to y; i.e. it defines the y-coordinate of the surface
     * without applying any transformations.
     * @function
     * @param {Number} u
     * @param {Number} v
     * @returns Number
     * @private
     */ this._Y = Y;
    /**
     * Internal function which maps (u, v) to z; i.e. it defines the z-coordinate of the surface
     * without applying any transformations.
     * @function
     * @param {Number} u
     * @param {Number} v
     * @returns Number
     * @private
     */ this._Z = Z;
    if (this._F !== null) {
        this._X = function(u, v) {
            return this._F(u, v)[0];
        };
        this._Y = function(u, v) {
            return this._F(u, v)[1];
        };
        this._Z = function(u, v) {
            return this._F(u, v)[2];
        };
    } else {
        if (this._X !== null) {
            this._F = function(u, v) {
                return [
                    this._X(u, v),
                    this._Y(u, v),
                    this._Z(u, v)
                ];
            };
        }
    }
    this.range_u = range_u;
    this.range_v = range_v;
    this.dataX = null;
    this.dataY = null;
    this.dataZ = null;
    this.points = [];
    this.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(this.methodMap, {
    });
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Surface3D.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyPrototypeMethods(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Surface3D, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeometryElement3D, "constructor3D");
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Surface3D.prototype, /** @lends JXG.Surface3D.prototype */ {
    updateWireframe: function() {
        var steps_u, steps_v, i_u, i_v, r_u, r_v, s_u, s_v, e_u, e_v, delta_u, delta_v, u, v, c3d = [
            1,
            0,
            0,
            0
        ];
        this.points = [];
        steps_u = this.evalVisProp('stepsu');
        steps_v = this.evalVisProp('stepsv');
        r_u = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.range_u);
        r_v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(this.range_v);
        s_u = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(r_u[0]);
        s_v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(r_v[0]);
        e_u = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(r_u[1]);
        e_v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(r_v[1]);
        delta_u = (e_u - s_u) / steps_u;
        delta_v = (e_v - s_v) / steps_v;
        for(i_u = 0, u = s_u; i_u <= steps_u; i_u++, u += delta_u){
            this.points.push([]);
            for(i_v = 0, v = s_v; i_v <= steps_v; i_v++, v += delta_v){
                c3d = this.F(u, v);
                c3d.unshift(1);
                this.points[i_u].push(c3d);
            }
        }
        return this;
    },
    updateCoords: function() {
        if (this._F !== null) {
            this.updateWireframe();
        } else {
            this.updateTransform();
        }
        return this;
    },
    /**
         * Generic function which evaluates the function term of the surface
         * and applies its transformations.
         * @param {Number} u
         * @param {Number} v
         * @returns
         */ evalF: function(u, v) {
        var t, i, c3d = [
            0,
            0,
            0,
            0
        ];
        if (this.transformations.length === 0 || !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.baseElement)) {
            c3d = this._F(u, v);
            return c3d;
        }
        t = this.transformations;
        for(i = 0; i < t.length; i++){
            t[i].update();
        }
        if (this === this.baseElement) {
            c3d = this._F(u, v);
        } else {
            c3d = this.baseElement.evalF(u, v);
        }
        c3d.unshift(1);
        c3d = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(t[0].matrix, c3d);
        for(i = 1; i < t.length; i++){
            c3d = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(t[i].matrix, c3d);
        }
        return c3d.slice(1);
    },
    /**
         * Function defining the surface plus applying transformations.
         * @param {Number} u
         * @param {Number} v
        * @returns Array [x, y, z] of length 3
         */ F: function(u, v) {
        return this.evalF(u, v);
    },
    /**
        * Function which maps (u, v) to z; i.e. it defines the x-coordinate of the surface
        * plus applying transformations.
        * @param {Number} u
        * @param {Number} v
        * @returns Number
        */ X: function(u, v) {
        return this.evalF(u, v)[0];
    },
    /**
        * Function which maps (u, v) to y; i.e. it defines the y-coordinate of the surface
        * plus applying transformations.
        * @param {Number} u
        * @param {Number} v
        * @returns Number
        */ Y: function(u, v) {
        return this.evalF(u, v)[1];
    },
    /**
        * Function which maps (u, v) to z; i.e. it defines the z-coordinate of the surface
        * plus applying transformations.
        * @param {Number} u
        * @param {Number} v
        * @returns Number
        */ Z: function(u, v) {
        return this.evalF(u, v)[2];
    },
    /**
         * @class
         * @ignore
         */ updateDataArray2D: function() {
        var i, j, len_u, len_v, dataX = [], dataY = [], c2d;
        len_u = this.points.length;
        if (len_u !== 0) {
            len_v = this.points[0].length;
            for(i = 0; i < len_u; i++){
                for(j = 0; j < len_v; j++){
                    c2d = this.view.project3DTo2D(this.points[i][j]);
                    dataX.push(c2d[1]);
                    dataY.push(c2d[2]);
                }
                dataX.push(NaN);
                dataY.push(NaN);
            }
            for(j = 0; j < len_v; j++){
                for(i = 0; i < len_u; i++){
                    c2d = this.view.project3DTo2D(this.points[i][j]);
                    dataX.push(c2d[1]);
                    dataY.push(c2d[2]);
                }
                dataX.push(NaN);
                dataY.push(NaN);
            }
        }
        return {
            X: dataX,
            Y: dataY
        };
    },
    addTransform: function(el, transform) {
        this.addTransformGeneric(el, transform);
        return this;
    },
    updateTransform: function() {
        var t, c, i, j, k, len_u, len_v;
        if (this.transformations.length === 0 || this.baseElement === null || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this._F) // Transformations have only to be applied here
        ) {
            return this;
        }
        t = this.transformations;
        for(i = 0; i < t.length; i++){
            t[i].update();
        }
        if (this !== this.baseElement) {
            this.points = [];
        }
        len_u = this.baseElement.points.length;
        if (len_u > 0) {
            len_v = this.baseElement.points[0].length;
            for(i = 0; i < len_u; i++){
                if (this !== this.baseElement) {
                    this.points.push([]);
                }
                for(j = 0; j < len_v; j++){
                    if (this === this.baseElement) {
                        c = this.points[i][j];
                    } else {
                        c = this.baseElement.points[i][j];
                    }
                    for(k = 0; k < t.length; k++){
                        c = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].matVecMult(t[k].matrix, c);
                    }
                    if (this === this.baseElement) {
                        this.points[i][j] = c;
                    } else {
                        this.points[i].push(c);
                    }
                }
            }
        }
        return this;
    },
    updateDataArray: function() {},
    update: function() {
        if (this.needsUpdate) {
            this.updateDataArray();
            this.updateCoords();
        }
        return this;
    },
    updateRenderer: function() {
        this.needsUpdate = false;
        return this;
    },
    projectCoords: function(p, params) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].projectCoordsToParametric(p, this, 2, params);
    }
});
/**
 * @class A 3D parametric surface visualizes a map (u, v) &rarr; [X(u, v), Y(u, v), Z(u, v)].
 * @pseudo
 * @description A 3D parametric surface is defined by a function
 *    <i>F: R<sup>2</sup> &rarr; R<sup>3</sup></i>.
 *
 * @name ParametricSurface3D
 * @augments Curve
 * @constructor
 * @type Object
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 *
 * @param {Function_Function_Function_Array,Function_Array,Function} F<sub>X</sub>,F<sub>Y</sub>,F<sub>Z</sub>,rangeU,rangeV F<sub>X</sub>(u,v), F<sub>Y</sub>(u,v), F<sub>Z</sub>(u,v)
 * are functions returning a number, rangeU is the array containing lower and upper bound for the range of parameter u, rangeV is the array containing lower and
 * upper bound for the range of parameter v. rangeU and rangeV may also be functions returning an array of length two.
 * @param {Function_Array,Function_Array,Function} F,rangeU,rangeV Alternatively: F<sub>[X,Y,Z]</sub>(u,v)
 * a function returning an array [x,y,z] of numbers, rangeU and rangeV as above.
 *
 * @example
 * var view = board.create('view3d',
 * 		        [[-6, -3], [8, 8],
 * 		        [[-5, 5], [-5, 5], [-5, 5]]]);
 *
 * // Sphere
 * var c = view.create('parametricsurface3d', [
 *     (u, v) => 2 * Math.sin(u) * Math.cos(v),
 *     (u, v) => 2 * Math.sin(u) * Math.sin(v),
 *     (u, v) => 2 * Math.cos(u),
 *     [0, 2 * Math.PI],
 *     [0, Math.PI]
 * ], {
 *     strokeColor: '#ff0000',
 *     stepsU: 30,
 *     stepsV: 30
 * });
 *
 * </pre><div id="JXG52da0ecc-1ba9-4d41-850c-36e5120025a5" class="jxgbox" style="width: 500px; height: 500px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG52da0ecc-1ba9-4d41-850c-36e5120025a5',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, pan: {enabled: false}, showcopyright: false, shownavigation: false});
 *     var view = board.create('view3d',
 *            [[-6, -3], [8, 8],
 *            [[-5, 5], [-5, 5], [-5, 5]]]);
 *
 *     // Sphere
 *     var c = view.create('parametricsurface3d', [
 *         (u, v) => 2 * Math.sin(u) * Math.cos(v),
 *         (u, v) => 2 * Math.sin(u) * Math.sin(v),
 *         (u, v) => 2 * Math.cos(u),
 *         [0, 2 * Math.PI],
 *         [0, Math.PI]
 *     ], {
 *         strokeColor: '#ff0000',
 *         stepsU: 20,
 *         stepsV: 20
 *     });
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createParametricSurface3D = function(board, parents, attributes) {
    var view = parents[0], F, X, Y, Z, range_u, range_v, attr, base = null, transform = null, el;
    if (parents.length === 3) {
        base = parents[1];
        transform = parents[2];
        F = null;
        X = null;
        Y = null;
        Z = null;
    } else if (parents.length === 4) {
        // [view, F, range_u, range_v]
        F = parents[1];
        range_u = parents[2];
        range_v = parents[3];
        X = null;
        Y = null;
        Z = null;
    } else {
        // [view, X, Y, Z, range_u, range_v]
        X = parents[1];
        Y = parents[2];
        Z = parents[3];
        range_u = parents[4];
        range_v = parents[5];
        F = null;
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "surface3d");
    el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Surface3D(view, F, X, Y, Z, range_u, range_v, attr);
    attr = el.setAttr2D(attr);
    el.element2D = view.create("curve", [
        [],
        []
    ], attr);
    el.element2D.view = view;
    if (base !== null) {
        el.addTransform(base, transform);
        el.addParents(base);
    }
    /**
     * @class
     * @ignore
     */ el.element2D.updateDataArray = function() {
        var ret = el.updateDataArray2D();
        this.dataX = ret.X;
        this.dataY = ret.Y;
    };
    el.addChild(el.element2D);
    el.inherits.push(el.element2D);
    el.element2D.setParents(el);
    el.element2D.prepareUpdate().update();
    if (!board.isSuspendedUpdate) {
        el.element2D.updateVisibility().updateRenderer();
    }
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("parametricsurface3d", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createParametricSurface3D);
/**
 * @class A 3D functiongraph  visualizes a map (x, y) &rarr; f(x, y).
 * The graph is a {@link Curve3D} element.
 * @pseudo
 * @description A 3D function graph is defined by a function
 *    <i>F: R<sup>2</sup> &rarr; R</i>.
 *
 * @name Functiongraph3D
 * @augments ParametricSurface3D
 * @constructor
 * @type Object
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {Function,String_Array_Array} F,rangeX,rangeY  F(x,y) is a function returning a number (or a JessieCode string), rangeX is the array containing
 * lower and upper bound for the range of x, rangeY is the array containing
 * lower and upper bound for the range of y.
 * @example
 * var box = [-5, 5];
 * var view = board.create('view3d',
 *     [
 *         [-6, -3], [8, 8],
 *         [box, box, box]
 *     ],
 *     {
 *         xPlaneRear: {visible: false},
 *         yPlaneRear: {visible: false},
 *     });
 *
 * // Function F to be plotted
 * var F = (x, y) => Math.sin(x * y / 4);
 *
 * // 3D surface
 * var c = view.create('functiongraph3d', [
 *     F,
 *     box, // () => [-s.Value()*5, s.Value() * 5],
 *     box, // () => [-s.Value()*5, s.Value() * 5],
 * ], {
 *     strokeWidth: 0.5,
 *     stepsU: 70,
 *     stepsV: 70
 * });
 *
 * </pre><div id="JXG87646dd4-9fe5-4c21-8734-089abc612515" class="jxgbox" style="width: 500px; height: 500px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG87646dd4-9fe5-4c21-8734-089abc612515',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, pan: {enabled: false}, showcopyright: false, shownavigation: false});
 *     var box = [-5, 5];
 *     var view = board.create('view3d',
 *         [
 *             [-6, -3], [8, 8],
 *             [box, box, box]
 *         ],
 *         {
 *             xPlaneRear: {visible: false},
 *             yPlaneRear: {visible: false},
 *         });
 *
 *     // Function F to be plotted
 *     var F = (x, y) => Math.sin(x * y / 4);
 *
 *     // 3D surface
 *     var c = view.create('functiongraph3d', [
 *         F,
 *         box, // () => [-s.Value()*5, s.Value() * 5],
 *         box, // () => [-s.Value()*5, s.Value() * 5],
 *     ], {
 *         strokeWidth: 0.5,
 *         stepsU: 70,
 *         stepsV: 70
 *     });
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunctiongraph3D = function(board, parents, attributes) {
    var view = parents[0], X = function(u, v) {
        return u;
    }, Y = function(u, v) {
        return v;
    }, Z = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunction(parents[1], board, 'x, y'), range_u = parents[2], range_v = parents[3], el;
    el = view.create("parametricsurface3d", [
        X,
        Y,
        Z,
        range_u,
        range_v
    ], attributes);
    el.elType = 'functiongraph3d';
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerElement("functiongraph3d", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunctiongraph3D);
}),
];

//# sourceMappingURL=c0305_jsxgraph_src_3d_92306f4c._.js.map