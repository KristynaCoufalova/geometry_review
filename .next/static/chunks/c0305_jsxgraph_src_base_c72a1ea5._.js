(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Andreas Walter,
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
 */ /*global JXG: true, define: true*/ /*jslint nomen: true, plusplus: true*/ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
;
var major = 1, minor = 12, patch = 0, add = '', version = major + '.' + minor + '.' + patch + (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : ''), constants;
constants = /** @lends JXG */ {
    /**
     * Constant: the currently used JSXGraph version.
     *
     * @name JXG.version
     * @type String
     */ version: version,
    /**
     * Constant: the small gray version indicator in the top left corner of every JSXGraph board (if
     * showCopyright is not set to false on board creation).
     *
     * @name JXG.licenseText
     * @type String
     */ licenseText: "JSXGraph v" + version + " \u00A9 jsxgraph.org",
    /**
     * JSXGraph logo: base64 data-URL of img/png/screen/jsxgraph-logo_black-square-solid.png
     *
     * @name JXG.licenseLogo
     * @type String
     */ licenseLogo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ8AAACfCAYAAADnGwvgAAAACXBIWXMAAAsSAAALEgHS3X78AAAIPklEQVR4nO2d21XjSBCG/96z75ABzgBPBHgiWDLARDCeCBAZeCMYO4KFCEbOwM7AZIAjqH1QiTHGF7XUF7X6/87xw4APqodv+qaqaiMiICQGf8UOgOQL5SPRoHwkGpSPROPv2AH4whhzDWCs/xwDuI4YTu4sRGR7+MPByGeMGQG4BzBBJdtNxHDIZ0oA28MfJi2fCjfVD2VLjCTlU+kKAA9RAyGdSEo+SjcskpHPGFMAmAG4ihwKcUTv5dPR7gXAbdxIiGt6fc5njJkAWIPiDZLeymeMmQL4DU6zg6WX8ql4v2LHQfzSO/koXj70Sj6Klxd92+2uAXyPHQS5yBQOzlp7JZ+IrGPHQC6jpxCd6dW0S/KC8pFoUD4SDcpHokH5SDQoH4kG5SPRoHwkGpSPRCPaGw5jzBjACFWl2Ug/JB4LEVmEfGAw+bSO9h5/yhuZp9cvytAP9C6fvgecAfjH97NIWniTT9OjCrCelpzAuXw60hUA7lz/bTIsnMmna7oCwA9Xf5MMGyfy6c51AVaZEQs6n/Pp2q4ExSOWdBr5WHNButB65KN4pCut5KN4xAXW8ulRCsUjnbGSb69pDyGdsR35XsB3ssQRjeXT/ng8TiHOaCSfTrczr5GQ7Gg68hXgdEscc/GQWUc99kC+zArAO6p+M4fU94Aw2WKPJm84Ct9BJMorqteKpU2PGX0PPkGVVJu1jGfl46j3hTcAc1Qp5+9t/oCKugYwz/0ekUtrvmmIIBLgDcCjiIxEZN5WvENEZCsihYiMADzqc7KB8p1nB+BZpVv4fJD+/TGAZ5/P6RMn5dMpIbupYI8NgLGIFKEeKCLv+rxv+vxBc27kuw8WRf9Yisj42E2JIdB14QTAMsbzQ3FOvkmoIHrGTxGZxg5CR8EpBizgud3u+Mzvhspj6MLpS4jI1BgDDPDU4ejIp8VAua33nvsmXs1QR8BT025uo94y5MaiDSrga+w4XNKrbvSR2MBR0oS+vbjG5/VyCeDdUaf9KaoD6kHMSqfky2nkm3Y5NDbG1P1n7nE8+eJJv7dDlQ+5EJGyzbNE5H3vTrrkOTXtXgeNIh7PbUckY8y9MWYL4D9Um4FLWT9X+r3fxph127ssVNxBrP9y7s+3Q/We1gpjzLUx5gWVdG2nv1tUEi50c2fLDFX8SZOzfDPb6VbXdCXcddx6AFDaCqhxW//H6Ru5ylevvxqzJ57rUoJbtBAQlC9ZrFKiVIwF/GVz38KyOaPGn/TaL1f5bEeNAv6Lp261SMuGhYc4gpGjfG82CQO6Kw3V9u1Js4kaoTvfZDceOcpnW/Re+AjC4fOSLeLPUb6y6Rd1kxG6zuLBZvRDhEberqB855l6iuESNrmUyV6QnZ18lmd7E19xXKCxfCnfzp6bfCvL78dqD2I71Se56chNvsa0ffcaiSRHP8rXUxKTvxWUj0SD8vUXJ4XpfYbynWYb8+GWu9gk8y9zk2/U9Iv6Ci7WLtK2bUaSTTtzk882+bP0EYTL57ZMRu0FuclXvzJrSqz3pjbPTbbeJjv5YPfW4gXhp96diNjIN/EViG9ClU6+oXnu2Qh+q/MnaJjPp9Vic2gFWiBscw0nPoIIQSj5tk2LsvVw1bd8NsxRFeyE6EldN59shK73ku1umuO0e6W1to3QRISpv3A+YVtDnHQnsRzlAyw7FOga7F9PsdT8bFFMnvT1FLnKd2eZsAkRmcFfwc5SRKzWero8SfJ8ryZX+YAW6fHarMd129rHlv0AC8dxBCdn+R7aZI7oxuk7ujfv3gD41qYtm8ad7EajJmf5gJaF1yJSduggX3e2H7fJQt6rIU6e3OVrUyv7gYgsVMJvqKbjFb4eSr/pz59RjXRdO9sXGHiLtJx4Msa8dKmF2LvYxSuBa4i9k/vIV9OmV0pQ9J10sjW6x6B8FVfosYAa1+Au2qZ8f2jbLcorGk+Jgazz9qF8n6kFHEWOA8DHVLtG4ofJp6B8X7kF0LptrSv0/XOJAY54NZTvOFeo2tbOQ0/D2nZ3jqrt7qDWeIdQvvP8QDUKBske0U7zawzoOOUclO8yNwD+M8aUviQ0xky1s/0vDHiaPYSHzM25Q5UNU2dlL7rcSqmbiSmqnLxshNuH8tlzgyqt/klFLPWzBbA+lgyq68bx3meCTIXbh/J14wZVyv9H2r/eEEkawDUfiQblIyHYHvsh5SPeObUxo3zENyeL7ikf8c3JPEfKR3xD+Ug0KB+JRnnqF5SP+GRz7hUk5SM+WZz7JeUjPjlb8ET5iC9Wl7J+KB/xRXHpC5SP+GDVpN0b5SM+KJp8ifIR17w2bXJJ+YhLdrBoIUz5iEusekpTPuKKpeX9IZSPOGHTprUv5SNd2aDlRTSUj3RhA2BieXfIB70rndRtehL1h8aYEgNozN2STuIBHPlIOxboKB7Qw5GP9J8ubUL24chHasrQD6R8JBqUjwD42OgFhfIRoNq5BofyESDABTbHoHwEiLDZACgfqYhysxHlI69dD4vbEuqQ+c4YI4GeReyIdp8bR768eet4/WonKF/eLGI+nPLlyw4tb1p3BeXLl1msjUYN5cuTVcy1Xg3ly5NZ7AAAypcjP0Ukyuu0QyhfXixFJOomYx/Klw8b9GS6raF8edC52McHlG/49FI8gPINnd6KB1C+IbMUkXFfxQNYOjlEdqi6RUXLVmkKR75h8QpglIJ4AOUbCisA30Xkvs/T7CGcdtNmBaCIUfboAsqXHhtUeXgvrtpWxILy9ZsdqrLG+lOmLtw+RuRraYUxZgRgFDgW8oftkCQ7xVH5CAkBd7skGpSPRIPykWhQPhKN/wEKYnCiOMadyQAAAABJRU5ErkJggg==',
    /**
     *  Constant: user coordinates relative to the coordinates system defined by the bounding box.
     *  @name JXG.COORDS_BY_USER
     *  @type Number
     */ COORDS_BY_USER: 0x0001,
    /**
     *  Constant: screen coordinates in pixel relative to the upper left corner of the div element.
     *  @name JXG.COORDS_BY_SCREEN
     *  @type Number
     */ COORDS_BY_SCREEN: 0x0002,
    // object types
    OBJECT_TYPE_ARC: 1,
    OBJECT_TYPE_ARROW: 2,
    OBJECT_TYPE_AXIS: 3,
    OBJECT_TYPE_AXISPOINT: 4,
    OBJECT_TYPE_TICKS: 5,
    OBJECT_TYPE_CIRCLE: 6,
    OBJECT_TYPE_CONIC: 7,
    OBJECT_TYPE_CURVE: 8,
    OBJECT_TYPE_GLIDER: 9,
    OBJECT_TYPE_IMAGE: 10,
    OBJECT_TYPE_LINE: 11,
    OBJECT_TYPE_POINT: 12,
    OBJECT_TYPE_SLIDER: 13,
    OBJECT_TYPE_CAS: 14,
    OBJECT_TYPE_GXTCAS: 15,
    OBJECT_TYPE_POLYGON: 16,
    OBJECT_TYPE_SECTOR: 17,
    OBJECT_TYPE_TEXT: 18,
    OBJECT_TYPE_ANGLE: 19,
    OBJECT_TYPE_INTERSECTION: 20,
    OBJECT_TYPE_TURTLE: 21,
    OBJECT_TYPE_VECTOR: 22,
    OBJECT_TYPE_OPROJECT: 23,
    OBJECT_TYPE_GRID: 24,
    OBJECT_TYPE_TANGENT: 25,
    OBJECT_TYPE_HTMLSLIDER: 26,
    OBJECT_TYPE_CHECKBOX: 27,
    OBJECT_TYPE_INPUT: 28,
    OBJECT_TYPE_BUTTON: 29,
    OBJECT_TYPE_TRANSFORMATION: 30,
    OBJECT_TYPE_FOREIGNOBJECT: 31,
    OBJECT_TYPE_VIEW3D: 32,
    OBJECT_TYPE_POINT3D: 33,
    OBJECT_TYPE_LINE3D: 34,
    OBJECT_TYPE_PLANE3D: 35,
    OBJECT_TYPE_CURVE3D: 36,
    OBJECT_TYPE_SURFACE3D: 37,
    OBJECT_TYPE_MEASUREMENT: 38,
    OBJECT_TYPE_INTERSECTION_LINE3D: 39,
    OBJECT_TYPE_SPHERE3D: 40,
    OBJECT_TYPE_CIRCLE3D: 41,
    OBJECT_TYPE_INTERSECTION_CIRCLE3D: 42,
    OBJECT_TYPE_TEXT3D: 43,
    OBJECT_TYPE_FACE3D: 44,
    OBJECT_TYPE_POLYHEDRON3D: 45,
    OBJECT_TYPE_POLYGON3D: 46,
    // IMPORTANT:
    // ----------
    // For being able to differentiate between the (sketchometry specific) SPECIAL_OBJECT_TYPEs and
    // (core specific) OBJECT_TYPEs, the non-sketchometry types MUST NOT be changed
    // to values > 100.
    // object classes
    OBJECT_CLASS_POINT: 1,
    OBJECT_CLASS_LINE: 2,
    OBJECT_CLASS_CIRCLE: 3,
    OBJECT_CLASS_CURVE: 4,
    OBJECT_CLASS_AREA: 5,
    OBJECT_CLASS_OTHER: 6,
    OBJECT_CLASS_TEXT: 7,
    OBJECT_CLASS_3D: 8
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extendConstants(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], constants);
const __TURBOPACK__default__export__ = constants;
 // const COORDS_BY_SCREEN = constants.COORDS_BY_SCREEN;
 // export {constants as default,
 //         COORDS_BY_SCREEN};
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, define: true, AMprocessNode: true, MathJax: true, document: true */ /*jslint nomen: true, plusplus: true*/ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-client] (ecmascript)");
;
;
;
;
;
/**
 * @fileoverview In this file the Coords object is defined, a class to manage all
 * properties and methods coordinates usually have.
 */ /**
 * Constructs a new Coordinates object.
 * @class This is the Coordinates class.
 * All members a coordinate has to provide
 * are defined here.
 * @param {Number} method The type of coordinates given by the user. Accepted values are <b>COORDS_BY_SCREEN</b> and <b>COORDS_BY_USER</b>.
 * @param {Array} coordinates An array of affine coordinates.
 * @param {JXG.Board} board A reference to a board.
 * @param {Boolean} [emitter=true]
 * @constructor
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Coords = function(method, coordinates, board, emitter) {
    /**
     * Stores the board the object is used on.
     * @type JXG.Board
     */ this.board = board;
    /**
     * Stores coordinates for user view as homogeneous coordinates.
     * @type Array
     */ this.usrCoords = [];
    //this.usrCoords = new Float64Array(3);
    /**
     * Stores coordinates for screen view as homogeneous coordinates.
     * @type Array
     */ this.scrCoords = [];
    //this.scrCoords = new Float64Array(3);
    /**
     * If true, this coordinates object will emit update events every time
     * the coordinates are set.
     * @type boolean
     * @default true
     */ this.emitter = !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(emitter) || emitter;
    if (this.emitter) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eventify(this);
    }
    this.setCoordinates(method, coordinates, false, true);
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Coords.prototype, /** @lends JXG.Coords.prototype */ {
    /**
         * Normalize homogeneous coordinates
         * @private
         */ normalizeUsrCoords: function() {
        if (Math.abs(this.usrCoords[0]) > __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps) {
            this.usrCoords[1] /= this.usrCoords[0];
            this.usrCoords[2] /= this.usrCoords[0];
            this.usrCoords[0] = 1.0;
        }
    },
    /**
         * Compute screen coordinates out of given user coordinates.
         * @private
         */ usr2screen: function(doRound) {
        var mround = Math.round, b = this.board, uc = this.usrCoords, oc = b.origin.scrCoords;
        if (doRound === true) {
            this.scrCoords[0] = mround(uc[0]);
            this.scrCoords[1] = mround(uc[0] * oc[1] + uc[1] * b.unitX);
            this.scrCoords[2] = mround(uc[0] * oc[2] - uc[2] * b.unitY);
        } else {
            this.scrCoords[0] = uc[0];
            this.scrCoords[1] = uc[0] * oc[1] + uc[1] * b.unitX;
            this.scrCoords[2] = uc[0] * oc[2] - uc[2] * b.unitY;
        }
    },
    /**
         * Compute user coordinates out of given screen coordinates.
         * @private
         */ screen2usr: function() {
        var o = this.board.origin.scrCoords, sc = this.scrCoords, b = this.board;
        this.usrCoords[0] = 1.0;
        this.usrCoords[1] = (sc[1] - o[1]) / b.unitX;
        this.usrCoords[2] = (o[2] - sc[2]) / b.unitY;
    },
    /**
         * Calculate distance of one point to another.
         * @param {Number} coord_type The type of coordinates used here. Possible values are <b>JXG.COORDS_BY_USER</b> and <b>JXG.COORDS_BY_SCREEN</b>.
         * @param {JXG.Coords} coordinates The Coords object to which the distance is calculated.
         * @returns {Number} The distance
         */ distance: function(coord_type, coordinates) {
        var sum = 0, c, ucr = this.usrCoords, scr = this.scrCoords, f;
        if (coord_type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER) {
            c = coordinates.usrCoords;
            f = ucr[0] - c[0];
            sum = f * f;
            if (sum > __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps * __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps) {
                return Number.POSITIVE_INFINITY;
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hypot(ucr[1] - c[1], ucr[2] - c[2]);
        } else {
            c = coordinates.scrCoords;
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hypot(scr[1] - c[1], scr[2] - c[2]);
        }
    },
    /**
         * Set coordinates by either user coordinates or screen coordinates and recalculate the other one.
         * @param {Number} coord_type The type of coordinates used here. Possible values are <b>COORDS_BY_USER</b> and <b>COORDS_BY_SCREEN</b>.
         * @param {Array} coordinates An array of affine coordinates the Coords object is set to.
         * @param {Boolean} [doRound=true] flag If true or null round the coordinates in usr2screen. This is used in smooth curve plotting.
         * The IE needs rounded coordinates. Id doRound==false we have to round in updatePathString.
         * @param {Boolean} [noevent=false]
         * @returns {JXG.Coords} Reference to the coords object.
         */ setCoordinates: function(coord_type, coordinates, doRound, noevent) {
        var uc = this.usrCoords, sc = this.scrCoords, // Original values
        ou = [
            uc[0],
            uc[1],
            uc[2]
        ], os = [
            sc[0],
            sc[1],
            sc[2]
        ];
        if (coord_type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER) {
            if (coordinates.length === 2) {
                // Euclidean coordinates
                uc[0] = 1.0;
                uc[1] = coordinates[0];
                uc[2] = coordinates[1];
            } else {
                // Homogeneous coordinates (normalized)
                uc[0] = coordinates[0];
                uc[1] = coordinates[1];
                uc[2] = coordinates[2];
                this.normalizeUsrCoords();
            }
            this.usr2screen(doRound);
        } else {
            if (coordinates.length === 2) {
                // Euclidean coordinates
                sc[1] = coordinates[0];
                sc[2] = coordinates[1];
            } else {
                // Homogeneous coordinates (normalized)
                sc[1] = coordinates[1];
                sc[2] = coordinates[2];
            }
            this.screen2usr();
        }
        if (this.emitter && !noevent && (os[1] !== sc[1] || os[2] !== sc[2])) {
            this.triggerEventHandlers([
                "update"
            ], [
                ou,
                os
            ]);
        }
        return this;
    },
    /**
         * Copy array, either scrCoords or usrCoords
         * Uses slice() in case of standard arrays and set() in case of
         * typed arrays.
         * @private
         * @param {String} obj Either 'scrCoords' or 'usrCoords'
         * @param {Number} offset Offset, defaults to 0 if not given
         * @returns {Array} Returns copy of the coords array either as standard array or as
         *   typed array.
         */ copy: function(obj, offset) {
        if (offset === undefined) {
            offset = 0;
        }
        return this[obj].slice(offset);
    },
    /**
         * Test if one of the usrCoords is NaN or the coordinates are infinite.
         * @returns {Boolean} true if the coordinates are finite, false otherwise.
         */ isReal: function() {
        return !isNaN(this.usrCoords[1] + this.usrCoords[2]) && Math.abs(this.usrCoords[0]) > __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps;
    },
    /**
         * Triggered whenever the coordinates change.
         * @name JXG.Coords#update
         * @param {Array} ou Old user coordinates
         * @param {Array} os Old screen coordinates
         * @event
         */ __evt__update: function(ou, os) {},
    /**
         * @ignore
         */ __evt: function() {}
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Coords;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/element.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, define: true*/ /*jslint nomen: true, plusplus: true, unparam: true*/ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coords.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$statistics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/statistics.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/options.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/color.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
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
 * Constructs a new GeometryElement object.
 * @class This is the parent class for all geometry elements like points, circles, lines, curves...
 * @constructor
 * @param {JXG.Board} board Reference to the board the element is constructed on.
 * @param {Object} attributes Hash of attributes and their values.
 * @param {Number} type Element type (a <tt>JXG.OBJECT_TYPE_</tt> value).
 * @param {Number} oclass The element's class (a <tt>JXG.OBJECT_CLASS_</tt> value).
 * @borrows JXG.EventEmitter#on as this.on
 * @borrows JXG.EventEmitter#off as this.off
 * @borrows JXG.EventEmitter#triggerEventHandlers as this.triggerEventHandlers
 * @borrows JXG.EventEmitter#eventHandlers as this.eventHandlers
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].GeometryElement = function(board, attributes, type, oclass) {
    var name, key, attr;
    /**
     * Controls if updates are necessary
     * @type Boolean
     * @default true
     */ this.needsUpdate = true;
    /**
     * Controls if this element can be dragged. In GEONExT only
     * free points and gliders can be dragged.
     * @type Boolean
     * @default false
     */ this.isDraggable = false;
    /**
     * If element is in two dimensional real space this is true, else false.
     * @type Boolean
     * @default true
     */ this.isReal = true;
    /**
     * Stores all dependent objects to be updated when this point is moved.
     * @type Object
     */ this.childElements = {};
    /**
     * If element has a label subelement then this property will be set to true.
     * @type Boolean
     * @default false
     */ this.hasLabel = false;
    /**
     * True, if the element is currently highlighted.
     * @type Boolean
     * @default false
     */ this.highlighted = false;
    /**
     * Stores all Intersection Objects which in this moment are not real and
     * so hide this element.
     * @type Object
     */ this.notExistingParents = {};
    /**
     * Keeps track of all objects drawn as part of the trace of the element.
     * @see JXG.GeometryElement#clearTrace
     * @see JXG.GeometryElement#numTraces
     * @type Object
     */ this.traces = {};
    /**
     * Counts the number of objects drawn as part of the trace of the element.
     * @see JXG.GeometryElement#clearTrace
     * @see JXG.GeometryElement#traces
     * @type Number
     */ this.numTraces = 0;
    /**
     * Stores the  transformations which are applied during update in an array
     * @type Array
     * @see JXG.Transformation
     */ this.transformations = [];
    /**
     * @type JXG.GeometryElement
     * @default null
     * @private
     */ this.baseElement = null;
    /**
     * Elements depending on this element are stored here.
     * @type Object
     */ this.descendants = {};
    /**
     * Elements on which this element depends on are stored here.
     * @type Object
     */ this.ancestors = {};
    /**
     * Ids of elements on which this element depends directly are stored here.
     * @type Object
     */ this.parents = [];
    /**
     * Stores variables for symbolic computations
     * @type Object
     */ this.symbolic = {};
    /**
     * Stores the SVG (or VML) rendering node for the element. This enables low-level
     * access to SVG nodes. The properties of such an SVG node can then be changed
     * by calling setAttribute(). Note that there are a few elements which consist
     * of more than one SVG nodes:
     * <ul>
     * <li> Elements with arrow tail or head: rendNodeTriangleStart, rendNodeTriangleEnd
     * <li> SVG (or VML) texts: rendNodeText
     * <li> Button: rendNodeForm, rendNodeButton, rendNodeTag
     * <li> Checkbox: rendNodeForm, rendNodeCheckbox, rendNodeLabel, rendNodeTag
     * <li> Input: rendNodeForm, rendNodeInput, rendNodeLabel, rendNodeTag
     * </ul>
     *
     * Here is are two examples: The first example shows how to access the SVG node,
     * the second example demonstrates how to change SVG attributes.
     * @example
     *     var p1 = board.create('point', [0, 0]);
     *     console.log(p1.rendNode);
     *     // returns the full SVG node details of the point p1, something like:
     *     // &lt;ellipse id='box_jxgBoard1P6' stroke='#ff0000' stroke-opacity='1' stroke-width='2px'
     *     //   fill='#ff0000' fill-opacity='1' cx='250' cy='250' rx='4' ry='4'
     *     //   style='position: absolute;'&gt;
     *     // &lt;/ellipse&gt;
     *
     * @example
     *     var s = board.create('segment', [p1, p2], {strokeWidth: 60});
     *     s.rendNode.setAttribute('stroke-linecap', 'round');
     *
     * @type Object
     */ this.rendNode = null;
    /**
     * The string used with {@link JXG.Board#create}
     * @type String
     */ this.elType = "";
    /**
     * The element is saved with an explicit entry in the file (<tt>true</tt>) or implicitly
     * via a composition.
     * @type Boolean
     * @default true
     */ this.dump = true;
    /**
     * Subs contains the subelements, created during the create method.
     * @type Object
     */ this.subs = {};
    /**
     * Inherits contains the subelements, which may have an attribute
     * (in particular the attribute "visible") having value 'inherit'.
     * @type Object
     */ this.inherits = [];
    /**
     * The position of this element inside the {@link JXG.Board#objectsList}.
     * @type Number
     * @default -1
     * @private
     */ this._pos = -1;
    /**
     * [c, b0, b1, a, k, r, q0, q1]
     *
     * See
     * A.E. Middleditch, T.W. Stacey, and S.B. Tor:
     * "Intersection Algorithms for Lines and Circles",
     * ACM Transactions on Graphics, Vol. 8, 1, 1989, pp 25-40.
     *
     * The meaning of the parameters is:
     * Circle: points p=[p0, p1] on the circle fulfill
     *  a&lt;p, p&gt; + &lt;b, p&gt; + c = 0
     * For convenience we also store
     *  r: radius
     *  k: discriminant = sqrt(&lt;b,b&gt;-4ac)
     *  q=[q0, q1] center
     *
     * Points have radius = 0.
     * Lines have radius = infinity.
     * b: normalized vector, representing the direction of the line.
     *
     * Should be put into Coords, when all elements possess Coords.
     * @type Array
     * @default [1, 0, 0, 0, 1, 1, 0, 0]
     */ this.stdform = [
        1,
        0,
        0,
        0,
        1,
        1,
        0,
        0
    ];
    /**
     * The methodMap determines which methods can be called from within JessieCode and under which name it
     * can be used. The map is saved in an object, the name of a property is the name of the method used in JessieCode,
     * the value of a property is the name of the method in JavaScript.
     * @type Object
     */ this.methodMap = {
        setLabel: "setLabel",
        label: "label",
        setName: "setName",
        getName: "getName",
        Name: "getName",
        addTransform: "addTransform",
        setProperty: "setAttribute",
        setAttribute: "setAttribute",
        addChild: "addChild",
        animate: "animate",
        on: "on",
        off: "off",
        trigger: "trigger",
        addTicks: "addTicks",
        removeTicks: "removeTicks",
        removeAllTicks: "removeAllTicks",
        Bounds: "bounds"
    };
    /**
     * Quadratic form representation of circles (and conics)
     * @type Array
     * @default [[1,0,0],[0,1,0],[0,0,1]]
     */ this.quadraticform = [
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
    /**
     * An associative array containing all visual properties.
     * @type Object
     * @default empty object
     */ this.visProp = {};
    /**
     * An associative array containing visual properties which are calculated from
     * the attribute values (i.e. visProp) and from other constraints.
     * An example: if an intersection point does not have real coordinates,
     * visPropCalc.visible is set to false.
     * Additionally, the user can control visibility with the attribute "visible",
     * even by supplying a functions as value.
     *
     * @type Object
     * @default empty object
     */ this.visPropCalc = {
        visible: false
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eventify(this);
    /**
     * Is the mouse over this element?
     * @type Boolean
     * @default false
     */ this.mouseover = false;
    /**
     * Time stamp containing the last time this element has been dragged.
     * @type Date
     * @default creation time
     */ this.lastDragTime = new Date();
    this.view = null;
    if (arguments.length > 0) {
        /**
         * Reference to the board associated with the element.
         * @type JXG.Board
         */ this.board = board;
        /**
         * Type of the element.
         * @constant
         * @type Number
         */ this.type = type;
        /**
         * Original type of the element at construction time. Used for removing glider property.
         * @constant
         * @type Number
         */ this._org_type = type;
        /**
         * The element's class.
         * @constant
         * @type Number
         */ this.elementClass = oclass || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_OTHER;
        /**
         * Unique identifier for the element. Equivalent to id-attribute of renderer element.
         * @type String
         */ this.id = attributes.id;
        name = attributes.name;
        /* If name is not set or null or even undefined, generate an unique name for this object */ if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(name)) {
            name = this.board.generateName(this);
        }
        if (name !== "") {
            this.board.elementsByName[name] = this;
        }
        /**
         * Not necessarily unique name for the element.
         * @type String
         * @default Name generated by {@link JXG.Board#generateName}.
         * @see JXG.Board#generateName
         */ this.name = name;
        this.needsRegularUpdate = attributes.needsregularupdate;
        // create this.visPropOld and set default values
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].clearVisPropOld(this);
        attr = this.resolveShortcuts(attributes);
        for(key in attr){
            if (attr.hasOwnProperty(key)) {
                this._set(key, attr[key]);
            }
        }
        this.visProp.draft = attr.draft && attr.draft.draft;
    //this.visProp.gradientangle = '270';
    // this.visProp.gradientsecondopacity = this.evalVisProp('fillopacity');
    //this.visProp.gradientpositionx = 0.5;
    //this.visProp.gradientpositiony = 0.5;
    }
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].GeometryElement.prototype, /** @lends JXG.GeometryElement.prototype */ {
    /**
         * Add an element as a child to the current element. Can be used to model dependencies between geometry elements.
         * @param {JXG.GeometryElement} obj The dependent object.
         */ addChild: function(obj) {
        var el, el2;
        this.childElements[obj.id] = obj;
        this.addDescendants(obj); // TODO TomBerend removed this. Check if it is possible.
        obj.ancestors[this.id] = this;
        for(el in this.descendants){
            if (this.descendants.hasOwnProperty(el)) {
                this.descendants[el].ancestors[this.id] = this;
                for(el2 in this.ancestors){
                    if (this.ancestors.hasOwnProperty(el2)) {
                        this.descendants[el].ancestors[this.ancestors[el2].id] = this.ancestors[el2];
                    }
                }
            }
        }
        for(el in this.ancestors){
            if (this.ancestors.hasOwnProperty(el)) {
                for(el2 in this.descendants){
                    if (this.descendants.hasOwnProperty(el2)) {
                        this.ancestors[el].descendants[this.descendants[el2].id] = this.descendants[el2];
                    }
                }
            }
        }
        return this;
    },
    /**
         * @param {JXG.GeometryElement} obj The element that is to be added to the descendants list.
         * @private
         * @return this
        */ // Adds the given object to the descendants list of this object and all its child objects.
    addDescendants: function(obj) {
        var el;
        this.descendants[obj.id] = obj;
        for(el in obj.childElements){
            if (obj.childElements.hasOwnProperty(el)) {
                this.addDescendants(obj.childElements[el]);
            }
        }
        return this;
    },
    /**
         * Adds ids of elements to the array this.parents. This method needs to be called if some dependencies
         * can not be detected automatically by JSXGraph. For example if a function graph is given by a function
         * which refers to coordinates of a point, calling addParents() is necessary.
         *
         * @param {Array} parents Array of elements or ids of elements.
         * Alternatively, one can give a list of objects as parameters.
         * @returns {JXG.Object} reference to the object itself.
         *
         * @example
         * // Movable function graph
         * var A = board.create('point', [1, 0], {name:'A'}),
         *     B = board.create('point', [3, 1], {name:'B'}),
         *     f = board.create('functiongraph', function(x) {
         *          var ax = A.X(),
         *              ay = A.Y(),
         *              bx = B.X(),
         *              by = B.Y(),
         *              a = (by - ay) / ( (bx - ax) * (bx - ax) );
         *           return a * (x - ax) * (x - ax) + ay;
         *      }, {fixed: false});
         * f.addParents([A, B]);
         * </pre><div class="jxgbox" id="JXG7c91d4d2-986c-4378-8135-24505027f251" style="width: 400px; height: 400px;"></div>
         * <script type="text/javascript">
         * (function() {
         *   var board = JXG.JSXGraph.initBoard('JXG7c91d4d2-986c-4378-8135-24505027f251', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
         *   var A = board.create('point', [1, 0], {name:'A'}),
         *       B = board.create('point', [3, 1], {name:'B'}),
         *       f = board.create('functiongraph', function(x) {
         *            var ax = A.X(),
         *                ay = A.Y(),
         *                bx = B.X(),
         *                by = B.Y(),
         *                a = (by - ay) / ( (bx - ax) * (bx - ax) );
         *             return a * (x - ax) * (x - ax) + ay;
         *        }, {fixed: false});
         *   f.addParents([A, B]);
         * })();
         * </script><pre>
         *
         **/ addParents: function(parents) {
        var i, len, par;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(parents)) {
            par = parents;
        } else {
            par = arguments;
        }
        len = par.length;
        for(i = 0; i < len; ++i){
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(par[i])) {
                continue;
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isId(this.board, par[i])) {
                this.parents.push(par[i]);
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(par[i].id)) {
                this.parents.push(par[i].id);
            }
        }
        this.parents = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].uniqueArray(this.parents);
    },
    /**
         * Sets ids of elements to the array this.parents.
         * First, this.parents is cleared. See {@link JXG.GeometryElement#addParents}.
         * @param {Array} parents Array of elements or ids of elements.
         * Alternatively, one can give a list of objects as parameters.
         * @returns {JXG.Object} reference to the object itself.
         **/ setParents: function(parents) {
        this.parents = [];
        this.addParents(parents);
    },
    /**
         * Add dependence on elements in JessieCode functions.
         * @param {Array} function_array Array of functions containing potential properties "deps" with
         * elements the function depends on.
         * @returns {JXG.Object} reference to the object itself
         * @private
         */ addParentsFromJCFunctions: function(function_array) {
        var i, e, obj;
        for(i = 0; i < function_array.length; i++){
            for(e in function_array[i].deps){
                obj = function_array[i].deps[e];
                this.addParents(obj);
                obj.addChild(this);
            }
        }
        return this;
    },
    /**
         * Remove an element as a child from the current element.
         * @param {JXG.GeometryElement} obj The dependent object.
         * @returns {JXG.Object} reference to the object itself
         */ removeChild: function(obj) {
        //var el, el2;
        delete this.childElements[obj.id];
        this.removeDescendants(obj);
        delete obj.ancestors[this.id];
        /*
             // I do not know if these addDescendants stuff has to be adapted to removeChild. A.W.
            for (el in this.descendants) {
                if (this.descendants.hasOwnProperty(el)) {
                    delete this.descendants[el].ancestors[this.id];

                    for (el2 in this.ancestors) {
                        if (this.ancestors.hasOwnProperty(el2)) {
                            this.descendants[el].ancestors[this.ancestors[el2].id] = this.ancestors[el2];
                        }
                    }
                }
            }

            for (el in this.ancestors) {
                if (this.ancestors.hasOwnProperty(el)) {
                    for (el2 in this.descendants) {
                        if (this.descendants.hasOwnProperty(el2)) {
                            this.ancestors[el].descendants[this.descendants[el2].id] = this.descendants[el2];
                        }
                    }
                }
            }
            */ return this;
    },
    /**
         * Removes the given object from the descendants list of this object and all its child objects.
         * @param {JXG.GeometryElement} obj The element that is to be removed from the descendants list.
         * @private
         * @returns {JXG.Object} reference to the object itself
         */ removeDescendants: function(obj) {
        var el;
        delete this.descendants[obj.id];
        for(el in obj.childElements){
            if (obj.childElements.hasOwnProperty(el)) {
                this.removeDescendants(obj.childElements[el]);
            }
        }
        return this;
    },
    /**
         * Counts the direct children of an object without counting labels.
         * @private
         * @returns {number} Number of children
         */ countChildren: function() {
        var prop, d, s = 0;
        d = this.childElements;
        for(prop in d){
            if (d.hasOwnProperty(prop) && prop.indexOf("Label") < 0) {
                s++;
            }
        }
        return s;
    },
    /**
         * Returns the elements name. Used in JessieCode.
         * @returns {String}
         */ getName: function() {
        return this.name;
    },
    /**
         * Add transformations to this element.
         * @param {JXG.Transformation|Array} transform Either one {@link JXG.Transformation}
         * or an array of {@link JXG.Transformation}s.
         * @returns {JXG.GeometryElement} Reference to the element.
         */ addTransform: function(transform) {
        return this;
    },
    /**
         * Decides whether an element can be dragged. This is used in
         * {@link JXG.GeometryElement#setPositionDirectly} methods
         * where all parent elements are checked if they may be dragged, too.
         * @private
         * @returns {boolean}
         */ draggable: function() {
        return this.isDraggable && !this.evalVisProp('fixed') && // !this.visProp.frozen &&
        this.type !== __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_GLIDER;
    },
    /**
         * Translates the object by <tt>(x, y)</tt>. In case the element is defined by points, the defining points are
         * translated, e.g. a circle constructed by a center point and a point on the circle line.
         * @param {Number} method The type of coordinates used here.
         * Possible values are {@link JXG.COORDS_BY_USER} and {@link JXG.COORDS_BY_SCREEN}.
         * @param {Array} coords array of translation vector.
         * @returns {JXG.GeometryElement} Reference to the element object.
         *
         * @see JXG.GeometryElement3D#setPosition2D
         */ setPosition: function(method, coords) {
        var parents = [], el, i, len, t;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.parents)) {
            return this;
        }
        len = this.parents.length;
        for(i = 0; i < len; ++i){
            el = this.board.select(this.parents[i]);
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(el)) {
                if (!el.draggable()) {
                    return this;
                }
                parents.push(el);
            }
        }
        if (coords.length === 3) {
            coords = coords.slice(1);
        }
        t = this.board.create("transform", coords, {
            type: "translate"
        });
        // We distinguish two cases:
        // 1) elements which depend on free elements, i.e. arcs and sectors
        // 2) other elements
        //
        // In the first case we simply transform the parents elements
        // In the second case we add a transform to the element.
        //
        len = parents.length;
        if (len > 0) {
            t.applyOnce(parents);
            // Handle dragging of a 3D element
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.view) && this.view.elType === 'view3d') {
                for(i = 0; i < this.parents.length; ++i){
                    // Search for the parent 3D element
                    el = this.view.select(this.parents[i]);
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(el.setPosition2D)) {
                        el.setPosition2D(t);
                    }
                }
            }
        } else {
            if (this.transformations.length > 0 && this.transformations[this.transformations.length - 1].isNumericMatrix) {
                this.transformations[this.transformations.length - 1].melt(t);
            } else {
                this.addTransform(t);
            }
        }
        /*
             * If - against the default configuration - defining gliders are marked as
             * draggable, then their position has to be updated now.
             */ for(i = 0; i < len; ++i){
            if (parents[i].type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_GLIDER) {
                parents[i].updateGlider();
            }
        }
        return this;
    },
    /**
         * Moves an element by the difference of two coordinates.
         * @param {Number} method The type of coordinates used here.
         * Possible values are {@link JXG.COORDS_BY_USER} and {@link JXG.COORDS_BY_SCREEN}.
         * @param {Array} coords coordinates in screen/user units
         * @param {Array} oldcoords previous coordinates in screen/user units
         * @returns {JXG.GeometryElement} this element
         */ setPositionDirectly: function(method, coords, oldcoords) {
        var c = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](method, coords, this.board, false), oldc = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](method, oldcoords, this.board, false), dc = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$statistics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].subtract(c.usrCoords, oldc.usrCoords);
        this.setPosition(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, dc);
        return this;
    },
    /**
         * Array of strings containing the polynomials defining the element.
         * Used for determining geometric loci the groebner way.
         * @returns {Array} An array containing polynomials describing the locus of the current object.
         * @public
         */ generatePolynomial: function() {
        return [];
    },
    /**
         * Animates properties for that object like stroke or fill color, opacity and maybe
         * even more later.
         * @param {Object} hash Object containing properties with target values for the animation.
         * @param {number} time Number of milliseconds to complete the animation.
         * @param {Object} [options] Optional settings for the animation:<ul><li>callback: A function that is called as soon as the animation is finished.</li></ul>
         * @returns {JXG.GeometryElement} A reference to the object
         */ animate: function(hash, time, options) {
        options = options || {};
        var r, p, i, delay = this.board.attr.animationdelay, steps = Math.ceil(time / delay), self = this, animateColor = function(startRGB, endRGB, property) {
            var hsv1, hsv2, sh, ss, sv;
            hsv1 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgb2hsv(startRGB);
            hsv2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgb2hsv(endRGB);
            sh = (hsv2[0] - hsv1[0]) / steps;
            ss = (hsv2[1] - hsv1[1]) / steps;
            sv = (hsv2[2] - hsv1[2]) / steps;
            self.animationData[property] = [];
            for(i = 0; i < steps; i++){
                self.animationData[property][steps - i - 1] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hsv2rgb(hsv1[0] + (i + 1) * sh, hsv1[1] + (i + 1) * ss, hsv1[2] + (i + 1) * sv);
            }
        }, animateFloat = function(start, end, property, round) {
            var tmp, s;
            start = parseFloat(start);
            end = parseFloat(end);
            // we can't animate without having valid numbers.
            // And parseFloat returns NaN if the given string doesn't contain
            // a valid float number.
            if (isNaN(start) || isNaN(end)) {
                return;
            }
            s = (end - start) / steps;
            self.animationData[property] = [];
            for(i = 0; i < steps; i++){
                tmp = start + (i + 1) * s;
                self.animationData[property][steps - i - 1] = round ? Math.floor(tmp) : tmp;
            }
        };
        this.animationData = {};
        for(r in hash){
            if (hash.hasOwnProperty(r)) {
                p = r.toLowerCase();
                switch(p){
                    case "strokecolor":
                    case "fillcolor":
                        animateColor(this.visProp[p], hash[r], p);
                        break;
                    case "size":
                        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(this)) {
                            break;
                        }
                        animateFloat(this.visProp[p], hash[r], p, true);
                        break;
                    case "strokeopacity":
                    case "strokewidth":
                    case "fillopacity":
                        animateFloat(this.visProp[p], hash[r], p, false);
                        break;
                }
            }
        }
        this.animationCallback = options.callback;
        this.board.addAnimation(this);
        return this;
    },
    /**
         * General update method. Should be overwritten by the element itself.
         * Can be used sometimes to commit changes to the object.
         * @return {JXG.GeometryElement} Reference to the element
         */ update: function() {
        if (this.evalVisProp('trace')) {
            this.cloneToBackground();
        }
        return this;
    },
    /**
         * Provide updateRenderer method.
         * @return {JXG.GeometryElement} Reference to the element
         * @private
         */ updateRenderer: function() {
        return this;
    },
    /**
         * Run through the full update chain of an element.
         * @param  {Boolean} visible Set visibility in case the elements attribute value is 'inherit'. null is allowed.
         * @return {JXG.GeometryElement} Reference to the element
         * @private
         */ fullUpdate: function(visible) {
        return this.prepareUpdate().update().updateVisibility(visible).updateRenderer();
    },
    /**
         * Show the element or hide it. If hidden, it will still exist but not be
         * visible on the board.
         * <p>
         * Sets also the display of the inherits elements. These can be
         * JSXGraph elements or arrays of JSXGraph elements.
         * However, deeper nesting than this is not supported.
         *
         * @param  {Boolean} val true: show the element, false: hide the element
         * @return {JXG.GeometryElement} Reference to the element
         * @private
         */ setDisplayRendNode: function(val) {
        var i, len, s, len_s, obj;
        if (val === undefined) {
            val = this.visPropCalc.visible;
        }
        if (val === this.visPropOld.visible) {
            return this;
        }
        // Set display of the element itself
        this.board.renderer.display(this, val);
        // Set the visibility of elements which inherit the attribute 'visible'
        len = this.inherits.length;
        for(s = 0; s < len; s++){
            obj = this.inherits[s];
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(obj)) {
                len_s = obj.length;
                for(i = 0; i < len_s; i++){
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj[i]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj[i].rendNode) && obj[i].evalVisProp('visible') === 'inherit') {
                        obj[i].setDisplayRendNode(val);
                    }
                }
            } else {
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj.rendNode) && obj.evalVisProp('visible') === 'inherit') {
                    obj.setDisplayRendNode(val);
                }
            }
        }
        // Set the visibility of the label if it inherits the attribute 'visible'
        if (this.hasLabel && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.label) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.label.rendNode)) {
            if (this.label.evalVisProp('visible') === "inherit") {
                this.label.setDisplayRendNode(val);
            }
        }
        return this;
    },
    /**
         * Hide the element. It will still exist but not be visible on the board.
         * Alias for "element.setAttribute({visible: false});"
         * @return {JXG.GeometryElement} Reference to the element
         */ hide: function() {
        this.setAttribute({
            visible: false
        });
        return this;
    },
    /**
         * Hide the element. It will still exist but not be visible on the board.
         * Alias for {@link JXG.GeometryElement#hide}
         * @returns {JXG.GeometryElement} Reference to the element
         */ hideElement: function() {
        this.hide();
        return this;
    },
    /**
         * Make the element visible.
         * Alias for "element.setAttribute({visible: true});"
         * @return {JXG.GeometryElement} Reference to the element
         */ show: function() {
        this.setAttribute({
            visible: true
        });
        return this;
    },
    /**
         * Make the element visible.
         * Alias for {@link JXG.GeometryElement#show}
         * @returns {JXG.GeometryElement} Reference to the element
         */ showElement: function() {
        this.show();
        return this;
    },
    /**
         * Set the visibility of an element. The visibility is influenced by
         * (listed in ascending priority):
         * <ol>
         * <li> The value of the element's attribute 'visible'
         * <li> The visibility of a parent element. (Example: label)
         * This overrules the value of the element's attribute value only if
         * this attribute value of the element is 'inherit'.
         * <li> being inside of the canvas
         * </ol>
         * <p>
         * This method is called three times for most elements:
         * <ol>
         * <li> between {@link JXG.GeometryElement#update}
         * and {@link JXG.GeometryElement#updateRenderer}. In case the value is 'inherit', nothing is done.
         * <li> Recursively, called by itself for child elements. Here, 'inherit' is overruled by the parent's value.
         * <li> In {@link JXG.GeometryElement#updateRenderer}, if the element is outside of the canvas.
         * </ol>
         *
         * @param  {Boolean} parent_val Visibility of the parent element.
         * @return {JXG.GeometryElement} Reference to the element.
         * @private
         */ updateVisibility: function(parent_val) {
        var i, len, s, len_s, obj, val;
        if (this.needsUpdate) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.view) && this.view.evalVisProp('visible') === false) {
                // Handle hiding of view3d
                this.visPropCalc.visible = false;
            } else {
                // Handle the element
                if (parent_val !== undefined) {
                    this.visPropCalc.visible = parent_val;
                } else {
                    val = this.evalVisProp('visible');
                    // infobox uses hiddenByParent
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.hiddenByParent) && this.hiddenByParent) {
                        val = false;
                    }
                    if (val !== "inherit") {
                        this.visPropCalc.visible = val;
                    }
                }
                // Handle elements which inherit the visibility
                len = this.inherits.length;
                for(s = 0; s < len; s++){
                    obj = this.inherits[s];
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(obj)) {
                        len_s = obj.length;
                        for(i = 0; i < len_s; i++){
                            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj[i]) && obj[i].evalVisProp('visible') === "inherit") {
                                obj[i].prepareUpdate().updateVisibility(this.visPropCalc.visible);
                            }
                        }
                    } else {
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj) && obj.evalVisProp('visible') === "inherit") {
                            obj.prepareUpdate().updateVisibility(this.visPropCalc.visible);
                        }
                    }
                }
            }
            // Handle the label if it inherits the visibility
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.label) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.label.visProp) && this.label.evalVisProp('visible')) {
                this.label.prepareUpdate().updateVisibility(this.visPropCalc.visible);
            }
        }
        return this;
    },
    /**
         * Sets the value of attribute <tt>key</tt> to <tt>value</tt>.
         * Here, mainly hex strings for rga(a) colors are parsed and values of type object get a special treatment.
         * Other values are just set to the key.
         *
         * @param {String} key The attribute's name.
         * @param value The new value
         * @private
         */ _set: function(key, value) {
        var el;
        key = key.toLocaleLowerCase();
        // Search for entries in visProp with "color" as part of the key name
        // and containing a RGBA string
        if (this.visProp.hasOwnProperty(key) && key.indexOf("color") >= 0 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(value) && value.length === 9 && value.charAt(0) === "#") {
            value = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgba2rgbo(value);
            this.visProp[key] = value[0];
            // Previously: *=. But then, we can only decrease opacity.
            this.visProp[key.replace("color", "opacity")] = value[1];
        } else {
            if (value !== null && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isObject(value) && !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(value.id) && !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(value.name)) {
                // value is of type {prop: val, prop: val,...}
                // Convert these attributes to lowercase, too
                this.visProp[key] = {};
                for(el in value){
                    if (value.hasOwnProperty(el)) {
                        this.visProp[key][el.toLocaleLowerCase()] = value[el];
                    }
                }
            } else {
                this.visProp[key] = value;
            }
        }
    },
    /**
         * Resolves attribute shortcuts like <tt>color</tt> and expands them, e.g. <tt>strokeColor</tt> and <tt>fillColor</tt>.
         * Writes the expanded attributes back to the given <tt>attributes</tt>.
         * @param {Object} attributes object
         * @returns {Object} The given attributes object with shortcuts expanded.
         * @private
         */ resolveShortcuts: function(attributes) {
        var key, i, j, subattr = [
            "traceattributes",
            "traceAttributes"
        ];
        for(key in __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].shortcuts){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].shortcuts.hasOwnProperty(key)) {
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(attributes[key])) {
                    for(i = 0; i < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].shortcuts[key].length; i++){
                        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(attributes[__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].shortcuts[key][i]])) {
                            attributes[__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].shortcuts[key][i]] = attributes[key];
                        }
                    }
                }
                for(j = 0; j < subattr.length; j++){
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isObject(attributes[subattr[j]])) {
                        attributes[subattr[j]] = this.resolveShortcuts(attributes[subattr[j]]);
                    }
                }
            }
        }
        return attributes;
    },
    /**
         * Sets a label and its text
         * If label doesn't exist, it creates one
         * @param {String} str
         */ setLabel: function(str) {
        if (!this.hasLabel) {
            this.setAttribute({
                withlabel: true
            });
        }
        this.setLabelText(str);
    },
    /**
         * Updates the element's label text, strips all html.
         * @param {String} str
         */ setLabelText: function(str) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.label)) {
            str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            this.label.setText(str);
        }
        return this;
    },
    /**
         * Updates the element's label text and the element's attribute "name", strips all html.
         * @param {String} str
         */ setName: function(str) {
        str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        if (this.elType !== "slider") {
            this.setLabelText(str);
        }
        this.setAttribute({
            name: str
        });
    },
    /**
         * Deprecated alias for {@link JXG.GeometryElement#setAttribute}.
         * @deprecated Use {@link JXG.GeometryElement#setAttribute}.
         */ setProperty: function() {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("setProperty()", "setAttribute()");
        this.setAttribute.apply(this, arguments);
    },
    /**
         * Sets an arbitrary number of attributes. This method has one or more
         * parameters of the following types:
         * <ul>
         * <li> object: {key1:value1,key2:value2,...}
         * <li> string: 'key:value'
         * <li> array: ['key', value]
         * </ul>
         * @param {Object} attributes An object with attributes.
         * @returns {JXG.GeometryElement} A reference to the element.
         *
         * @function
         * @example
         * // Set attribute directly on creation of an element using the attributes object parameter
         * var board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-1, 5, 5, 1]};
         * var p = board.create('point', [2, 2], {visible: false});
         *
         * // Now make this point visible and fixed:
         * p.setAttribute({
         *     fixed: true,
         *     visible: true
         * });
         */ setAttribute: function(attr) {
        var i, j, le, key, value, arg, opacity, pair, oldvalue, attributes = {};
        // Normalize the user input
        for(i = 0; i < arguments.length; i++){
            arg = arguments[i];
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(arg)) {
                // pairRaw is string of the form 'key:value'
                pair = arg.split(":");
                attributes[__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].trim(pair[0])] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].trim(pair[1]);
            } else if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(arg)) {
                // pairRaw consists of objects of the form {key1:value1,key2:value2,...}
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(attributes, arg);
            } else {
                // pairRaw consists of array [key,value]
                attributes[arg[0]] = arg[1];
            }
        }
        // Handle shortcuts
        attributes = this.resolveShortcuts(attributes);
        for(i in attributes){
            if (attributes.hasOwnProperty(i)) {
                key = i.replace(/\s+/g, "").toLowerCase();
                value = attributes[i];
                // This handles the subobjects, if the key:value pairs are contained in an object.
                // Example:
                // ticks.setAttribute({
                //      strokeColor: 'blue',
                //      label: {
                //          visible: false
                //      }
                // })
                // Now, only the supplied label attributes are overwritten.
                // Otherwise, the value of label would be {visible:false} only.
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isObject(value) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.visProp[key])) {
                    // this.visProp[key] = Type.merge(this.visProp[key], value);
                    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isObject(this.visProp[key]) && value !== null && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isObject(value)) {
                        // Handle cases like key=firstarrow and
                        // firstarrow==false and value = { type:1 }.
                        // That is a primitive type is replaced by an object.
                        this.visProp[key] = {};
                    }
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].mergeAttr(this.visProp[key], value);
                    // First, handle the special case
                    // ticks.setAttribute({label: {anchorX: "right", ..., visible: true});
                    if (this.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_TICKS && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.labels)) {
                        le = this.labels.length;
                        for(j = 0; j < le; j++){
                            this.labels[j].setAttribute(value);
                        }
                    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this[key])) {
                        // Attribute looks like: point1: {...}
                        // Handle this in the sub-element: this.point1.setAttribute({...})
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(this[key])) {
                            for(j = 0; j < this[key].length; j++){
                                this[key][j].setAttribute(value);
                            }
                        } else {
                            this[key].setAttribute(value);
                        }
                    } else {
                        // Cases like firstarrow: {...}
                        oldvalue = null;
                        this.triggerEventHandlers([
                            "attribute:" + key
                        ], [
                            oldvalue,
                            value,
                            this
                        ]);
                    }
                    continue;
                }
                oldvalue = this.visProp[key];
                switch(key){
                    case "checked":
                        // checkbox Is not available on initial call.
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.rendNodeTag)) {
                            this.rendNodeCheckbox.checked = !!value;
                        }
                        break;
                    case "disabled":
                        // button, checkbox, input. Is not available on initial call.
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.rendNodeTag)) {
                            this.rendNodeTag.disabled = !!value;
                        }
                        break;
                    case "face":
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(this)) {
                            this.visProp.face = value;
                            this.board.renderer.changePointStyle(this);
                        }
                        break;
                    case "generatelabelvalue":
                        if (this.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_TICKS && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(value)) {
                            this.generateLabelValue = value;
                        }
                        break;
                    case "gradient":
                        this.visProp.gradient = value;
                        this.board.renderer.setGradient(this);
                        break;
                    case "gradientsecondcolor":
                        value = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgba2rgbo(value);
                        this.visProp.gradientsecondcolor = value[0];
                        this.visProp.gradientsecondopacity = value[1];
                        this.board.renderer.updateGradient(this);
                        break;
                    case "gradientsecondopacity":
                        this.visProp.gradientsecondopacity = value;
                        this.board.renderer.updateGradient(this);
                        break;
                    case "infoboxtext":
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(value)) {
                            this.infoboxText = value;
                        } else {
                            this.infoboxText = false;
                        }
                        break;
                    case "labelcolor":
                        value = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgba2rgbo(value);
                        opacity = value[1];
                        value = value[0];
                        if (opacity === 0) {
                            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.label) && this.hasLabel) {
                                this.label.hideElement();
                            }
                        }
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.label) && this.hasLabel) {
                            this.label.visProp.strokecolor = value;
                            this.board.renderer.setObjectStrokeColor(this.label, value, opacity);
                        }
                        if (this.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_TEXT) {
                            this.visProp.strokecolor = value;
                            this.visProp.strokeopacity = opacity;
                            this.board.renderer.setObjectStrokeColor(this, value, opacity);
                        }
                        break;
                    case "layer":
                        this.board.renderer.setLayer(this, this.eval(value));
                        this._set(key, value);
                        break;
                    case "maxlength":
                        // input. Is not available on initial call.
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.rendNodeTag)) {
                            this.rendNodeTag.maxlength = !!value;
                        }
                        break;
                    case "name":
                        oldvalue = this.name;
                        delete this.board.elementsByName[this.name];
                        this.name = value;
                        this.board.elementsByName[this.name] = this;
                        break;
                    case "needsregularupdate":
                        this.needsRegularUpdate = !(value === "false" || value === false);
                        this.board.renderer.setBuffering(this, this.needsRegularUpdate ? "auto" : "static");
                        break;
                    case "onpolygon":
                        if (this.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_GLIDER) {
                            this.onPolygon = !!value;
                        }
                        break;
                    case "radius":
                        if (this.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_ANGLE || this.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_SECTOR) {
                            this.setRadius(value);
                        }
                        break;
                    case "rotate":
                        if (this.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_TEXT && this.evalVisProp('display') === "internal" || this.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_IMAGE) {
                            this.addRotation(value);
                        }
                        break;
                    case "tabindex":
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.rendNode)) {
                            this.rendNode.setAttribute("tabindex", value);
                            this._set(key, value);
                        }
                        break;
                    // case "ticksdistance":
                    //     if (this.type === Const.OBJECT_TYPE_TICKS && Type.isNumber(value)) {
                    //         this.ticksFunction = this.makeTicksFunction(value);
                    //     }
                    //     break;
                    case "trace":
                        if (value === "false" || value === false) {
                            this.clearTrace();
                            this.visProp.trace = false;
                        } else if (value === "pause") {
                            this.visProp.trace = false;
                        } else {
                            this.visProp.trace = true;
                        }
                        break;
                    case "visible":
                        if (value === "false") {
                            this.visProp.visible = false;
                        } else if (value === "true") {
                            this.visProp.visible = true;
                        } else {
                            this.visProp.visible = value;
                        }
                        this.setDisplayRendNode(this.evalVisProp('visible'));
                        if (this.evalVisProp('visible') && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.updateSize)) {
                            this.updateSize();
                        }
                        break;
                    case "withlabel":
                        this.visProp.withlabel = value;
                        if (!this.evalVisProp('withlabel')) {
                            if (this.label && this.hasLabel) {
                                //this.label.hideElement();
                                this.label.setAttribute({
                                    visible: false
                                });
                            }
                        } else {
                            if (!this.label) {
                                this.createLabel();
                            }
                            //this.label.showElement();
                            this.label.setAttribute({
                                visible: "inherit"
                            });
                        //this.label.setDisplayRendNode(this.evalVisProp('visible'));
                        }
                        this.hasLabel = value;
                        break;
                    case "straightfirst":
                    case "straightlast":
                        this._set(key, value);
                        for(j in this.childElements){
                            if (this.childElements.hasOwnProperty(j) && this.childElements[j].elType === 'glider') {
                                this.childElements[j].fullUpdate();
                            }
                        }
                        break;
                    default:
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.visProp[key]) && (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Validator[key] || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Validator[key] && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Validator[key](value) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Validator[key] && // Value is function, function value passes the validator => OK
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(value) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Validator[key](value(this)))) {
                            value = value.toLowerCase && value.toLowerCase() === "false" ? false : value;
                            this._set(key, value);
                        } else {
                            if (!(key in __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].shortcuts)) {
                                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].warn("attribute '" + key + "' does not accept type '" + typeof value + "' of value " + value + ".");
                            }
                        }
                        break;
                }
                this.triggerEventHandlers([
                    "attribute:" + key
                ], [
                    oldvalue,
                    value,
                    this
                ]);
            }
        }
        this.triggerEventHandlers([
            "attribute"
        ], [
            attributes,
            this
        ]);
        if (!this.evalVisProp('needsregularupdate')) {
            this.board.fullUpdate();
        } else {
            this.board.update(this);
        }
        if (this.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_TEXT) {
            this.updateSize();
        }
        return this;
    },
    /**
         * Deprecated alias for {@link JXG.GeometryElement#getAttribute}.
         * @deprecated Use {@link JXG.GeometryElement#getAttribute}.
         */ getProperty: function() {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("getProperty()", "getAttribute()");
        this.getProperty.apply(this, arguments);
    },
    /**
         * Get the value of the property <tt>key</tt>.
         * @param {String} key The name of the property you are looking for
         * @returns The value of the property
         */ getAttribute: function(key) {
        var result;
        key = key.toLowerCase();
        switch(key){
            case "needsregularupdate":
                result = this.needsRegularUpdate;
                break;
            case "labelcolor":
                result = this.label.visProp.strokecolor;
                break;
            case "infoboxtext":
                result = this.infoboxText;
                break;
            case "withlabel":
                result = this.hasLabel;
                break;
            default:
                result = this.visProp[key];
                break;
        }
        return result;
    },
    /**
         * Get value of an attribute. If the value that attribute is a function, call the function and return its value.
         * In that case, the function is called with the GeometryElement as (only) parameter. For label elements (i.e.
         * if the attribute "islabel" is true), the anchor element is supplied. The label element can be accessed as
         * sub-object "label".
         * If the attribute does not exist, undefined will be returned.
         *
         * @param {String} key Attribute key
         * @returns {String|Number|Boolean} value of attribute "key" (evaluated in case of a function) or undefined
         *
         * @see GeometryElement#eval
         * @see JXG#evaluate
         */ evalVisProp: function(key) {
        var val, arr, i, le;
        key = key.toLowerCase();
        if (key.indexOf('.') === -1) {
            // e.g. 'visible'
            val = this.visProp[key];
        } else {
            // e.g. label.visible
            arr = key.split('.');
            le = arr.length;
            val = this.visProp;
            for(i = 0; i < le; i++){
                val = val[arr[i]];
            }
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(val)) {
            // For labels supply the anchor element as parameter.
            if (this.visProp.islabel === true && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.visProp.anchor)) {
                // 3D: supply the 3D element
                if (this.visProp.anchor.visProp.element3d !== null) {
                    return val(this.visProp.anchor.visProp.element3d);
                }
                // 2D: supply the 2D element
                return val(this.visProp.anchor);
            }
            // For 2D elements representing 3D elements, return the 3D element.
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.visProp.element3d)) {
                return val(this.visProp.element3d);
            }
            // In all other cases, return the element itself
            return val(this);
        }
        // val is not of type function
        return val;
    },
    /**
         * Get value of a parameter. If the parameter is a function, call the function and return its value.
         * In that case, the function is called with the GeometryElement as (only) parameter. For label elements (i.e.
         * if the attribute "islabel" is true), the anchor element is supplied. The label of an element can be accessed as
         * sub-object "label" then.
         *
         * @param {String|Number|Function|Object} val If not a function, it will be returned as is. If function it will be evaluated, where the GeometryElement is
         * supplied as the (only) parameter of that function.
         * @returns {String|Number|Object}
         *
         * @see GeometryElement#evalVisProp
         * @see JXG#evaluate
         */ eval: function(val) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(val)) {
            // For labels supply the anchor element as parameter.
            if (this.visProp.islabel === true && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.visProp.anchor)) {
                // 3D: supply the 3D element
                if (this.visProp.anchor.visProp.element3d !== null) {
                    return val(this.visProp.anchor.visProp.element3d);
                }
                // 2D: supply the 2D element
                return val(this.visProp.anchor);
            }
            // For 2D elements representing 3D elements, return the 3D element.
            if (this.visProp.element3d !== null) {
                return val(this.visProp.element3d);
            }
            // In all other cases, return the element itself
            return val(this);
        }
        // val is not of type function
        return val;
    },
    /**
         * Set the dash style of an object. See {@link JXG.GeometryElement#dash}
         * for a list of available dash styles.
         * You should use {@link JXG.GeometryElement#setAttribute} instead of this method.
         *
         * @param {number} dash Indicates the new dash style
         * @private
         */ setDash: function(dash) {
        this.setAttribute({
            dash: dash
        });
        return this;
    },
    /**
         * Notify all child elements for updates.
         * @private
         */ prepareUpdate: function() {
        this.needsUpdate = true;
        return this;
    },
    /**
         * Removes the element from the construction.  This only removes the SVG or VML node of the element and its label (if available) from
         * the renderer, to remove the element completely you should use {@link JXG.Board#removeObject}.
         */ remove: function() {
        // this.board.renderer.remove(this.board.renderer.getElementById(this.id));
        this.board.renderer.remove(this.rendNode);
        if (this.hasLabel) {
            this.board.renderer.remove(this.board.renderer.getElementById(this.label.id));
        }
        return this;
    },
    /**
         * Returns the coords object where a text that is bound to the element shall be drawn.
         * Differs in some cases from the values that getLabelAnchor returns.
         * @returns {JXG.Coords} JXG.Coords Place where the text shall be drawn.
         * @see JXG.GeometryElement#getLabelAnchor
         */ getTextAnchor: function() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
            0,
            0
        ], this.board);
    },
    /**
         * Returns the coords object where the label of the element shall be drawn.
         * Differs in some cases from the values that getTextAnchor returns.
         * @returns {JXG.Coords} JXG.Coords Place where the text shall be drawn.
         * @see JXG.GeometryElement#getTextAnchor
         */ getLabelAnchor: function() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
            0,
            0
        ], this.board);
    },
    /**
         * Determines whether the element has arrows at start or end of the arc.
         * If it is set to be a "typical" vector, ie lastArrow == true,
         * then the element.type is set to VECTOR.
         * @param {Boolean} firstArrow True if there is an arrow at the start of the arc, false otherwise.
         * @param {Boolean} lastArrow True if there is an arrow at the end of the arc, false otherwise.
         */ setArrow: function(firstArrow, lastArrow) {
        this.visProp.firstarrow = firstArrow;
        this.visProp.lastarrow = lastArrow;
        if (lastArrow) {
            this.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_VECTOR;
            this.elType = "arrow";
        }
        this.prepareUpdate().update().updateVisibility().updateRenderer();
        return this;
    },
    /**
         * Creates a gradient nodes in the renderer.
         * @see JXG.SVGRenderer#setGradient
         * @private
         */ createGradient: function() {
        var ev_g = this.evalVisProp('gradient');
        if (ev_g === "linear" || ev_g === "radial") {
            this.board.renderer.setGradient(this);
        }
    },
    /**
         * Creates a label element for this geometry element.
         * @see JXG.GeometryElement#addLabelToElement
         */ createLabel: function() {
        var attr, that = this;
        // this is a dirty hack to resolve the text-dependency. If there is no text element available,
        // just don't create a label. This method is usually not called by a user, so we won't throw
        // an exception here and simply output a warning via JXG.debug.
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].elements.text) {
            attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(this.visProp.label, null);
            attr.id = this.id + "Label";
            attr.isLabel = true;
            attr.anchor = this;
            attr.priv = this.visProp.priv;
            if (this.visProp.withlabel) {
                this.label = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].elements.text(this.board, [
                    0,
                    0,
                    function() {
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(that.name)) {
                            return that.name(that);
                        }
                        return that.name;
                    }
                ], attr);
                this.label.needsUpdate = true;
                this.label.dump = false;
                this.label.fullUpdate();
                this.hasLabel = true;
            }
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug("JSXGraph: Can't create label: text element is not available. Make sure you include base/text");
        }
        return this;
    },
    /**
         * Highlights the element.
         * @private
         * @param {Boolean} [force=false] Force the highlighting
         * @returns {JXG.Board}
         */ highlight: function(force) {
        force = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].def(force, false);
        // I know, we have the JXG.Board.highlightedObjects AND JXG.GeometryElement.highlighted and YES we need both.
        // Board.highlightedObjects is for the internal highlighting and GeometryElement.highlighted is for user highlighting
        // initiated by the user, e.g. through custom DOM events. We can't just pick one because this would break user
        // defined highlighting in many ways:
        //  * if overriding the highlight() methods the user had to handle the highlightedObjects stuff, otherwise he'd break
        //    everything (e.g. the pie chart example https://jsxgraph.org/wiki/index.php/Pie_chart (not exactly
        //    user defined but for this type of chart the highlight method was overridden and not adjusted to the changes in here)
        //    where it just kept highlighting until the radius of the pie was far beyond infinity...
        //  * user defined highlighting would get pointless, everytime the user highlights something using .highlight(), it would get
        //    dehighlighted immediately, because highlight puts the element into highlightedObjects and from there it gets dehighlighted
        //    through dehighlightAll.
        // highlight only if not highlighted
        if (this.evalVisProp('highlight') && (!this.highlighted || force)) {
            this.highlighted = true;
            this.board.highlightedObjects[this.id] = this;
            this.board.renderer.highlight(this);
        }
        return this;
    },
    /**
         * Uses the "normal" properties of the element.
         * @returns {JXG.Board}
         */ noHighlight: function() {
        // see comment in JXG.GeometryElement.highlight()
        // dehighlight only if not highlighted
        if (this.highlighted) {
            this.highlighted = false;
            delete this.board.highlightedObjects[this.id];
            this.board.renderer.noHighlight(this);
        }
        return this;
    },
    /**
         * Removes all objects generated by the trace function.
         */ clearTrace: function() {
        var obj;
        for(obj in this.traces){
            if (this.traces.hasOwnProperty(obj)) {
                this.board.renderer.remove(this.traces[obj]);
            }
        }
        this.numTraces = 0;
        return this;
    },
    /**
         * Copy the element to background. This is used for tracing elements.
         * @returns {JXG.GeometryElement} A reference to the element
         */ cloneToBackground: function() {
        return this;
    },
    /**
         * Dimensions of the smallest rectangle enclosing the element.
         * @returns {Array} The coordinates of the enclosing rectangle in a format
         * like the bounding box in {@link JXG.Board#setBoundingBox}.
         *
         * @returns {Array} similar to {@link JXG.Board#setBoundingBox}.
         */ bounds: function() {
        return [
            0,
            0,
            0,
            0
        ];
    },
    /**
         * Normalize the element's standard form.
         * @private
         */ normalize: function() {
        this.stdform = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].normalize(this.stdform);
        return this;
    },
    /**
         * EXPERIMENTAL. Generate JSON object code of visProp and other properties.
         * @type String
         * @private
         * @ignore
         * @deprecated
         * @returns JSON string containing element's properties.
         */ toJSON: function() {
        var vis, key, json = [
            '{"name":',
            this.name
        ];
        json.push(", " + '"id":' + this.id);
        vis = [];
        for(key in this.visProp){
            if (this.visProp.hasOwnProperty(key)) {
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.visProp[key])) {
                    vis.push('"' + key + '":' + this.visProp[key]);
                }
            }
        }
        json.push(', "visProp":{' + vis.toString() + "}");
        json.push("}");
        return json.join("");
    },
    /**
         * Rotate texts or images by a given degree.
         * @param {number} angle The degree of the rotation (90 means vertical text).
         * @see JXG.GeometryElement#rotate
         */ addRotation: function(angle) {
        var tOffInv, tOff, tS, tSInv, tRot, that = this;
        if ((this.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_TEXT || this.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_IMAGE) && angle !== 0) {
            tOffInv = this.board.create("transform", [
                function() {
                    return -that.X();
                },
                function() {
                    return -that.Y();
                }
            ], {
                type: "translate"
            });
            tOff = this.board.create("transform", [
                function() {
                    return that.X();
                },
                function() {
                    return that.Y();
                }
            ], {
                type: "translate"
            });
            tS = this.board.create("transform", [
                function() {
                    return that.board.unitX / that.board.unitY;
                },
                function() {
                    return 1;
                }
            ], {
                type: "scale"
            });
            tSInv = this.board.create("transform", [
                function() {
                    return that.board.unitY / that.board.unitX;
                },
                function() {
                    return 1;
                }
            ], {
                type: "scale"
            });
            tRot = this.board.create("transform", [
                function() {
                    return that.eval(angle) * Math.PI / 180;
                }
            ], {
                type: "rotate"
            });
            tOffInv.bindTo(this);
            tS.bindTo(this);
            tRot.bindTo(this);
            tSInv.bindTo(this);
            tOff.bindTo(this);
        }
        return this;
    },
    /**
         * Set the highlightStrokeColor of an element
         * @ignore
         * @name JXG.GeometryElement#highlightStrokeColorMethod
         * @param {String} sColor String which determines the stroke color of an object when its highlighted.
         * @see JXG.GeometryElement#highlightStrokeColor
         * @deprecated Use {@link JXG.GeometryElement#setAttribute}
         */ highlightStrokeColor: function(sColor) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("highlightStrokeColor()", "setAttribute()");
        this.setAttribute({
            highlightStrokeColor: sColor
        });
        return this;
    },
    /**
         * Set the strokeColor of an element
         * @ignore
         * @name JXG.GeometryElement#strokeColorMethod
         * @param {String} sColor String which determines the stroke color of an object.
         * @see JXG.GeometryElement#strokeColor
         * @deprecated Use {@link JXG.GeometryElement#setAttribute}
         */ strokeColor: function(sColor) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("strokeColor()", "setAttribute()");
        this.setAttribute({
            strokeColor: sColor
        });
        return this;
    },
    /**
         * Set the strokeWidth of an element
         * @ignore
         * @name JXG.GeometryElement#strokeWidthMethod
         * @param {Number} width Integer which determines the stroke width of an outline.
         * @see JXG.GeometryElement#strokeWidth
         * @deprecated Use {@link JXG.GeometryElement#setAttribute}
         */ strokeWidth: function(width) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("strokeWidth()", "setAttribute()");
        this.setAttribute({
            strokeWidth: width
        });
        return this;
    },
    /**
         * Set the fillColor of an element
         * @ignore
         * @name JXG.GeometryElement#fillColorMethod
         * @param {String} fColor String which determines the fill color of an object.
         * @see JXG.GeometryElement#fillColor
         * @deprecated Use {@link JXG.GeometryElement#setAttribute}
         */ fillColor: function(fColor) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("fillColor()", "setAttribute()");
        this.setAttribute({
            fillColor: fColor
        });
        return this;
    },
    /**
         * Set the highlightFillColor of an element
         * @ignore
         * @name JXG.GeometryElement#highlightFillColorMethod
         * @param {String} fColor String which determines the fill color of an object when its highlighted.
         * @see JXG.GeometryElement#highlightFillColor
         * @deprecated Use {@link JXG.GeometryElement#setAttribute}
         */ highlightFillColor: function(fColor) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("highlightFillColor()", "setAttribute()");
        this.setAttribute({
            highlightFillColor: fColor
        });
        return this;
    },
    /**
         * Set the labelColor of an element
         * @ignore
         * @param {String} lColor String which determines the text color of an object's label.
         * @see JXG.GeometryElement#labelColor
         * @deprecated Use {@link JXG.GeometryElement#setAttribute}
         */ labelColor: function(lColor) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("labelColor()", "setAttribute()");
        this.setAttribute({
            labelColor: lColor
        });
        return this;
    },
    /**
         * Set the dash type of an element
         * @ignore
         * @name JXG.GeometryElement#dashMethod
         * @param {Number} d Integer which determines the way of dashing an element's outline.
         * @see JXG.GeometryElement#dash
         * @deprecated Use {@link JXG.GeometryElement#setAttribute}
         */ dash: function(d) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("dash()", "setAttribute()");
        this.setAttribute({
            dash: d
        });
        return this;
    },
    /**
         * Set the visibility of an element
         * @ignore
         * @name JXG.GeometryElement#visibleMethod
         * @param {Boolean} v Boolean which determines whether the element is drawn.
         * @see JXG.GeometryElement#visible
         * @deprecated Use {@link JXG.GeometryElement#setAttribute}
         */ visible: function(v) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("visible()", "setAttribute()");
        this.setAttribute({
            visible: v
        });
        return this;
    },
    /**
         * Set the shadow of an element
         * @ignore
         * @name JXG.GeometryElement#shadowMethod
         * @param {Boolean} s Boolean which determines whether the element has a shadow or not.
         * @see JXG.GeometryElement#shadow
         * @deprecated Use {@link JXG.GeometryElement#setAttribute}
         */ shadow: function(s) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("shadow()", "setAttribute()");
        this.setAttribute({
            shadow: s
        });
        return this;
    },
    /**
         * The type of the element as used in {@link JXG.Board#create}.
         * @returns {String}
         */ getType: function() {
        return this.elType;
    },
    /**
         * List of the element ids resp. values used as parents in {@link JXG.Board#create}.
         * @returns {Array}
         */ getParents: function() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(this.parents) ? this.parents : [];
    },
    /**
         * @ignore
         * Snaps the element to the grid. Only works for points, lines and circles. Points will snap to the grid
         * as defined in their properties {@link JXG.Point#snapSizeX} and {@link JXG.Point#snapSizeY}. Lines and circles
         * will snap their parent points to the grid, if they have {@link JXG.Point#snapToGrid} set to true.
         * @private
         * @returns {JXG.GeometryElement} Reference to the element.
         */ snapToGrid: function() {
        return this;
    },
    /**
         * Snaps the element to points. Only works for points. Points will snap to the next point
         * as defined in their properties {@link JXG.Point#attractorDistance} and {@link JXG.Point#attractorUnit}.
         * Lines and circles
         * will snap their parent points to points.
         * @private
         * @returns {JXG.GeometryElement} Reference to the element.
         */ snapToPoints: function() {
        return this;
    },
    /**
         * Retrieve a copy of the current visProp.
         * @returns {Object}
         */ getAttributes: function() {
        var attributes = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(this.visProp), /*
                cleanThis = ['attractors', 'snatchdistance', 'traceattributes', 'frozen',
                    'shadow', 'gradientangle', 'gradientsecondopacity', 'gradientpositionx', 'gradientpositiony',
                    'needsregularupdate', 'zoom', 'layer', 'offset'],
                */ cleanThis = [], i, len = cleanThis.length;
        attributes.id = this.id;
        attributes.name = this.name;
        for(i = 0; i < len; i++){
            delete attributes[cleanThis[i]];
        }
        return attributes;
    },
    /**
         * Checks whether (x,y) is near the element.
         * @param {Number} x Coordinate in x direction, screen coordinates.
         * @param {Number} y Coordinate in y direction, screen coordinates.
         * @returns {Boolean} True if (x,y) is near the element, False otherwise.
         */ hasPoint: function(x, y) {
        return false;
    },
    /**
         * Adds ticks to this line or curve. Ticks can be added to a curve or any kind of line: line, arrow, and axis.
         * @param {JXG.Ticks} ticks Reference to a ticks object which is describing the ticks (color, distance, how many, etc.).
         * @returns {String} Id of the ticks object.
         */ addTicks: function(ticks) {
        if (ticks.id === "" || !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(ticks.id)) {
            ticks.id = this.id + "_ticks_" + (this.ticks.length + 1);
        }
        this.board.renderer.drawTicks(ticks);
        this.ticks.push(ticks);
        return ticks.id;
    },
    /**
         * Removes all ticks from a line or curve.
         */ removeAllTicks: function() {
        var t;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.ticks)) {
            for(t = this.ticks.length - 1; t >= 0; t--){
                this.removeTicks(this.ticks[t]);
            }
            this.ticks = [];
            this.board.update();
        }
    },
    /**
         * Removes ticks identified by parameter named tick from this line or curve.
         * @param {JXG.Ticks} tick Reference to tick object to remove.
         */ removeTicks: function(tick) {
        var t, j;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.defaultTicks) && this.defaultTicks === tick) {
            this.defaultTicks = null;
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.ticks)) {
            for(t = this.ticks.length - 1; t >= 0; t--){
                if (this.ticks[t] === tick) {
                    this.board.removeObject(this.ticks[t]);
                    if (this.ticks[t].ticks) {
                        for(j = 0; j < this.ticks[t].ticks.length; j++){
                            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.ticks[t].labels[j])) {
                                this.board.removeObject(this.ticks[t].labels[j]);
                            }
                        }
                    }
                    delete this.ticks[t];
                    break;
                }
            }
        }
    },
    /**
         * Determine values of snapSizeX and snapSizeY. If the attributes
         * snapSizex and snapSizeY are greater than zero, these values are taken.
         * Otherwise, determine the distance between major ticks of the
         * default axes.
         * @returns {Array} containing the snap sizes for x and y direction.
         * @private
         */ getSnapSizes: function() {
        var sX, sY, ticks;
        sX = this.evalVisProp('snapsizex');
        sY = this.evalVisProp('snapsizey');
        if (sX <= 0 && this.board.defaultAxes && this.board.defaultAxes.x.defaultTicks) {
            ticks = this.board.defaultAxes.x.defaultTicks;
            sX = ticks.ticksDelta * (ticks.evalVisProp('minorticks') + 1);
        }
        if (sY <= 0 && this.board.defaultAxes && this.board.defaultAxes.y.defaultTicks) {
            ticks = this.board.defaultAxes.y.defaultTicks;
            sY = ticks.ticksDelta * (ticks.evalVisProp('minorticks') + 1);
        }
        return [
            sX,
            sY
        ];
    },
    /**
         * Move an element to its nearest grid point.
         * The function uses the coords object of the element as
         * its actual position. If there is no coords object or if the object is fixed, nothing is done.
         * @param {Boolean} force force snapping independent from what the snaptogrid attribute says
         * @param {Boolean} fromParent True if the drag comes from a child element. This is the case if a line
         *    through two points is dragged. In this case we do not try to force the points to stay inside of
         *    the visible board, but the distance between the two points stays constant.
         * @returns {JXG.GeometryElement} Reference to this element
         */ handleSnapToGrid: function(force, fromParent) {
        var x, y, rx, ry, rcoords, mi, ma, boardBB, res, sX, sY, needsSnapToGrid = false, attractToGrid = this.evalVisProp('attracttogrid'), ev_au = this.evalVisProp('attractorunit'), ev_ad = this.evalVisProp('attractordistance');
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.coords) || this.evalVisProp('fixed')) {
            return this;
        }
        needsSnapToGrid = this.evalVisProp('snaptogrid') || attractToGrid || force === true;
        if (needsSnapToGrid) {
            x = this.coords.usrCoords[1];
            y = this.coords.usrCoords[2];
            res = this.getSnapSizes();
            sX = res[0];
            sY = res[1];
            // If no valid snap sizes are available, don't change the coords.
            if (sX > 0 && sY > 0) {
                boardBB = this.board.getBoundingBox();
                rx = Math.round(x / sX) * sX;
                ry = Math.round(y / sY) * sY;
                rcoords = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Coords(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                    rx,
                    ry
                ], this.board);
                if (!attractToGrid || rcoords.distance(ev_au === "screen" ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, this.coords) < ev_ad) {
                    x = rx;
                    y = ry;
                    // Checking whether x and y are still within boundingBox.
                    // If not, adjust them to remain within the board.
                    // Otherwise a point may become invisible.
                    if (!fromParent) {
                        mi = Math.min(boardBB[0], boardBB[2]);
                        ma = Math.max(boardBB[0], boardBB[2]);
                        if (x < mi && x > mi - sX) {
                            x += sX;
                        } else if (x > ma && x < ma + sX) {
                            x -= sX;
                        }
                        mi = Math.min(boardBB[1], boardBB[3]);
                        ma = Math.max(boardBB[1], boardBB[3]);
                        if (y < mi && y > mi - sY) {
                            y += sY;
                        } else if (y > ma && y < ma + sY) {
                            y -= sY;
                        }
                    }
                    this.coords.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                        x,
                        y
                    ]);
                }
            }
        }
        return this;
    },
    getBoundingBox: function() {
        var i, le, v, x, y, r, bb = [
            Infinity,
            Infinity,
            -Infinity,
            -Infinity
        ];
        if (this.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON) {
            le = this.vertices.length - 1;
            if (le <= 0) {
                return bb;
            }
            for(i = 0; i < le; i++){
                v = this.vertices[i].X();
                bb[0] = v < bb[0] ? v : bb[0];
                bb[2] = v > bb[2] ? v : bb[2];
                v = this.vertices[i].Y();
                bb[1] = v < bb[1] ? v : bb[1];
                bb[3] = v > bb[3] ? v : bb[3];
            }
        } else if (this.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CIRCLE) {
            x = this.center.X();
            y = this.center.Y();
            bb = [
                x - this.radius,
                y + this.radius,
                x + this.radius,
                y - this.radius
            ];
        } else if (this.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE) {
            le = this.points.length;
            if (le === 0) {
                return bb;
            }
            for(i = 0; i < le; i++){
                v = this.points[i].usrCoords[1];
                bb[0] = v < bb[0] ? v : bb[0];
                bb[2] = v > bb[2] ? v : bb[2];
                v = this.points[i].usrCoords[2];
                bb[1] = v < bb[1] ? v : bb[1];
                bb[3] = v > bb[3] ? v : bb[3];
            }
        } else if (this.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_POINT) {
            x = this.X();
            y = this.Y();
            r = this.evalVisProp('size');
            bb = [
                x - r / this.board.unitX,
                y - r / this.board.unitY,
                x + r / this.board.unitX,
                y + r / this.board.unitY
            ];
        } else if (this.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
            v = this.point1.coords.usrCoords[1];
            bb[0] = v < bb[0] ? v : bb[0];
            bb[2] = v > bb[2] ? v : bb[2];
            v = this.point1.coords.usrCoords[2];
            bb[1] = v < bb[1] ? v : bb[1];
            bb[3] = v > bb[3] ? v : bb[3];
            v = this.point2.coords.usrCoords[1];
            bb[0] = v < bb[0] ? v : bb[0];
            bb[2] = v > bb[2] ? v : bb[2];
            v = this.point2.coords.usrCoords[2];
            bb[1] = v < bb[1] ? v : bb[1];
            bb[3] = v > bb[3] ? v : bb[3];
        }
        return bb;
    },
    /**
         * Alias of {@link JXG.EventEmitter.on}.
         *
         * @name addEvent
         * @memberof JXG.GeometryElement
         * @function
         */ addEvent: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].shortcut(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].GeometryElement.prototype, 'on'),
    /**
         * Alias of {@link JXG.EventEmitter.off}.
         *
         * @name removeEvent
         * @memberof JXG.GeometryElement
         * @function
         */ removeEvent: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].shortcut(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].GeometryElement.prototype, 'off'),
    /**
         * Format a number according to the locale set in the attribute "intl".
         * If in the options of the intl-attribute "maximumFractionDigits" is not set,
         * the optional parameter digits is used instead.
         * See <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat</a>
         * for more  information about internationalization.
         *
         * @param {Number} value Number to be formatted
         * @param {Number} [digits=undefined] Optional number of digits
         * @returns {String|Number} string containing the formatted number according to the locale
         * or the number itself of the formatting is not possible.
         */ formatNumberLocale: function(value, digits) {
        var loc, opt, key, optCalc = {}, // These options are case sensitive:
        translate = {
            maximumfractiondigits: 'maximumFractionDigits',
            minimumfractiondigits: 'minimumFractionDigits',
            compactdisplay: 'compactDisplay',
            currencydisplay: 'currencyDisplay',
            currencysign: 'currencySign',
            localematcher: 'localeMatcher',
            numberingsystem: 'numberingSystem',
            signdisplay: 'signDisplay',
            unitdisplay: 'unitDisplay',
            usegrouping: 'useGrouping',
            roundingmode: 'roundingMode',
            roundingpriority: 'roundingPriority',
            roundingincrement: 'roundingIncrement',
            trailingzerodisplay: 'trailingZeroDisplay',
            minimumintegerdigits: 'minimumIntegerDigits',
            minimumsignificantdigits: 'minimumSignificantDigits',
            maximumsignificantdigits: 'maximumSignificantDigits'
        };
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(Intl) && this.useLocale()) {
            loc = this.evalVisProp('intl.locale') || this.eval(this.board.attr.intl.locale);
            opt = this.evalVisProp('intl.options') || {};
            // Transfer back to camel case if necessary and evaluate
            for(key in opt){
                if (opt.hasOwnProperty(key)) {
                    if (translate.hasOwnProperty(key)) {
                        optCalc[translate[key]] = this.eval(opt[key]);
                    } else {
                        optCalc[key] = this.eval(opt[key]);
                    }
                }
            }
            // If maximumfractiondigits is not set,
            // the value of the attribute "digits" is taken instead.
            key = 'maximumfractiondigits';
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(opt[key])) {
                optCalc[translate[key]] = digits;
            // key = 'minimumfractiondigits';
            // if (!this.eval(opt[key]) || this.eval(opt[key]) > digits) {
            //     optCalc[translate[key]] = digits;
            // }
            }
            return Intl.NumberFormat(loc, optCalc).format(value);
        }
        return value;
    },
    /**
         * Checks if locale is enabled in the attribute. This may be in the attributes of the board,
         * or in the attributes of the text. The latter has higher priority. The board attribute is taken if
         * attribute "intl.enabled" of the text element is set to 'inherit'.
         *
         * @returns {Boolean} if locale can be used for number formatting.
         */ useLocale: function() {
        var val;
        // Check if element supports intl
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.visProp.intl) || !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.visProp.intl.enabled)) {
            return false;
        }
        // Check if intl is supported explicitly enabled for this element
        val = this.evalVisProp('intl.enabled');
        if (val === true) {
            return true;
        }
        // Check intl attribute of the board
        if (val === 'inherit') {
            if (this.eval(this.board.attr.intl.enabled) === true) {
                return true;
            }
        }
        return false;
    },
    /* **************************
         *     EVENT DEFINITION
         * for documentation purposes
         * ************************** */ //region Event handler documentation
    /**
         * @event
         * @description This event is fired whenever the user is hovering over an element.
         * @name JXG.GeometryElement#over
         * @param {Event} e The browser's event object.
         */ __evt__over: function(e) {},
    /**
         * @event
         * @description This event is fired whenever the user puts the mouse over an element.
         * @name JXG.GeometryElement#mouseover
         * @param {Event} e The browser's event object.
         */ __evt__mouseover: function(e) {},
    /**
         * @event
         * @description This event is fired whenever the user is leaving an element.
         * @name JXG.GeometryElement#out
         * @param {Event} e The browser's event object.
         */ __evt__out: function(e) {},
    /**
         * @event
         * @description This event is fired whenever the user puts the mouse away from an element.
         * @name JXG.GeometryElement#mouseout
         * @param {Event} e The browser's event object.
         */ __evt__mouseout: function(e) {},
    /**
         * @event
         * @description This event is fired whenever the user is moving over an element.
         * @name JXG.GeometryElement#move
         * @param {Event} e The browser's event object.
         */ __evt__move: function(e) {},
    /**
         * @event
         * @description This event is fired whenever the user is moving the mouse over an element.
         * @name JXG.GeometryElement#mousemove
         * @param {Event} e The browser's event object.
         */ __evt__mousemove: function(e) {},
    /**
         * @event
         * @description This event is fired whenever the user drags an element.
         * @name JXG.GeometryElement#drag
         * @param {Event} e The browser's event object.
         */ __evt__drag: function(e) {},
    /**
         * @event
         * @description This event is fired whenever the user drags the element with a mouse.
         * @name JXG.GeometryElement#mousedrag
         * @param {Event} e The browser's event object.
         */ __evt__mousedrag: function(e) {},
    /**
         * @event
         * @description This event is fired whenever the user drags the element with a pen.
         * @name JXG.GeometryElement#pendrag
         * @param {Event} e The browser's event object.
         */ __evt__pendrag: function(e) {},
    /**
         * @event
         * @description This event is fired whenever the user drags the element on a touch device.
         * @name JXG.GeometryElement#touchdrag
         * @param {Event} e The browser's event object.
         */ __evt__touchdrag: function(e) {},
    /**
         * @event
         * @description This event is fired whenever the user drags the element by pressing arrow keys
         * on the keyboard.
         * @name JXG.GeometryElement#keydrag
         * @param {Event} e The browser's event object.
         */ __evt__keydrag: function(e) {},
    /**
         * @event
         * @description Whenever the user starts to touch or click an element.
         * @name JXG.GeometryElement#down
         * @param {Event} e The browser's event object.
         */ __evt__down: function(e) {},
    /**
         * @event
         * @description Whenever the user starts to click an element.
         * @name JXG.GeometryElement#mousedown
         * @param {Event} e The browser's event object.
         */ __evt__mousedown: function(e) {},
    /**
         * @event
         * @description Whenever the user taps an element with the pen.
         * @name JXG.GeometryElement#pendown
         * @param {Event} e The browser's event object.
         */ __evt__pendown: function(e) {},
    /**
         * @event
         * @description Whenever the user starts to touch an element.
         * @name JXG.GeometryElement#touchdown
         * @param {Event} e The browser's event object.
         */ __evt__touchdown: function(e) {},
    /**
         * @event
         * @description Whenever the user clicks on an element.
         * @name JXG.Board#click
         * @param {Event} e The browser's event object.
         */ __evt__click: function(e) {},
    /**
         * @event
         * @description Whenever the user double clicks on an element.
         * This event works on desktop browser, but is undefined
         * on mobile browsers.
         * @name JXG.Board#dblclick
         * @param {Event} e The browser's event object.
         * @see JXG.Board#clickDelay
         * @see JXG.Board#dblClickSuppressClick
         */ __evt__dblclick: function(e) {},
    /**
         * @event
         * @description Whenever the user clicks on an element with a mouse device.
         * @name JXG.Board#mouseclick
         * @param {Event} e The browser's event object.
         */ __evt__mouseclick: function(e) {},
    /**
         * @event
         * @description Whenever the user double clicks on an element with a mouse device.
         * @name JXG.Board#mousedblclick
         * @param {Event} e The browser's event object.
         */ __evt__mousedblclick: function(e) {},
    /**
         * @event
         * @description Whenever the user clicks on an element with a pointer device.
         * @name JXG.Board#pointerclick
         * @param {Event} e The browser's event object.
         */ __evt__pointerclick: function(e) {},
    /**
         * @event
         * @description Whenever the user double clicks on an element with a pointer device.
         * This event works on desktop browser, but is undefined
         * on mobile browsers.
         * @name JXG.Board#pointerdblclick
         * @param {Event} e The browser's event object.
         */ __evt__pointerdblclick: function(e) {},
    /**
         * @event
         * @description Whenever the user stops to touch or click an element.
         * @name JXG.GeometryElement#up
         * @param {Event} e The browser's event object.
         */ __evt__up: function(e) {},
    /**
         * @event
         * @description Whenever the user releases the mousebutton over an element.
         * @name JXG.GeometryElement#mouseup
         * @param {Event} e The browser's event object.
         */ __evt__mouseup: function(e) {},
    /**
         * @event
         * @description Whenever the user lifts the pen over an element.
         * @name JXG.GeometryElement#penup
         * @param {Event} e The browser's event object.
         */ __evt__penup: function(e) {},
    /**
         * @event
         * @description Whenever the user stops touching an element.
         * @name JXG.GeometryElement#touchup
         * @param {Event} e The browser's event object.
         */ __evt__touchup: function(e) {},
    /**
         * @event
         * @description Notify every time an attribute is changed.
         * @name JXG.GeometryElement#attribute
         * @param {Object} o A list of changed attributes and their new value.
         * @param {Object} el Reference to the element
         */ __evt__attribute: function(o, el) {},
    /**
         * @event
         * @description This is a generic event handler. It exists for every possible attribute that can be set for
         * any element, e.g. if you want to be notified everytime an element's strokecolor is changed, is the event
         * <tt>attribute:strokecolor</tt>.
         * @name JXG.GeometryElement#attribute:key
         * @param val The old value.
         * @param nval The new value
         * @param {Object} el Reference to the element
         */ __evt__attribute_: function(val, nval, el) {},
    /**
         * @ignore
         */ __evt: function() {}
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].GeometryElement;
 // const GeometryElement = JXG.GeometryElement;
 // export { GeometryElement as default,  GeometryElement };
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/text.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*
    Some functionalities in this file were developed as part of a software project
    with students. We would like to thank all contributors for their help:

    Winter semester 2024/2025:
        Philipp Ditz,
        Florian Hein,
        Pirmin Hinderling,
        Tim Sauer
 */ /*global JXG: true, define: true, window: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview In this file the Text element is defined.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$parser$2f$geonext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/parser/geonext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/env.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coordselement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coordselement.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
var priv = {
    /**
     * @class
     * @ignore
     */ HTMLSliderInputEventHandler: function() {
        this._val = parseFloat(this.rendNodeRange.value);
        this.rendNodeOut.value = this.rendNodeRange.value;
        this.board.update();
    }
};
/**
 * Construct and handle texts.
 *
 * The coordinates can be relative to the coordinates of an element
 * given in {@link JXG.Options#text.anchor}.
 *
 * MathJax, HTML and GEONExT syntax can be handled.
 * @class Creates a new text object. Do not use this constructor to create a text. Use {@link JXG.Board#create} with
 * type {@link Text} instead.
 * @augments JXG.GeometryElement
 * @augments JXG.CoordsElement
 * @param {string|JXG.Board} board The board the new text is drawn on.
 * @param {Array} coordinates An array with the user coordinates of the text.
 * @param {Object} attributes An object containing visual properties and optional a name and a id.
 * @param {string|function} content A string or a function returning a string.
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Text = function(board, coords, attributes, content) {
    var tmp;
    this.constructor(board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_TEXT, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_TEXT);
    this.element = this.board.select(attributes.anchor);
    this.coordsConstructor(coords, this.evalVisProp('islabel'));
    this.content = "";
    this.plaintext = "";
    this.plaintextOld = null;
    this.orgText = "";
    this.needsSizeUpdate = false;
    // Only used by infobox anymore
    this.hiddenByParent = false;
    /**
     * Width and height of the text element in pixel.
     *
     * @private
     * @type Array
     */ this.size = [
        1.0,
        1.0
    ];
    this.id = this.board.setId(this, "T");
    this.board.renderer.drawText(this);
    this.board.finalizeAdding(this);
    // Set text before drawing
    // this._createFctUpdateText(content);
    // this.updateText();
    // Set attribute visible to true. This is necessary to
    // create all sub-elements for button, input and checkbox
    tmp = this.visProp.visible;
    this.visProp.visible = true;
    this.setText(content);
    // Restore the correct attribute visible.
    this.visProp.visible = tmp;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(this.content)) {
        this.notifyParents(this.content);
    }
    this.elType = "text";
    this.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(this.methodMap, {
        setText: "setTextJessieCode",
        // free: 'free',
        move: "setCoords",
        Size: "getSize",
        setAutoPosition: "setAutoPosition"
    });
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Text.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyPrototypeMethods(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Text, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coordselement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], "coordsConstructor");
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Text.prototype, /** @lends JXG.Text.prototype */ {
    /**
         * @private
         * @param {Number} x
         * @param {Number} y
         * @returns {Boolean}
        */ // Test if the screen coordinates (x,y) are in a small stripe
    // at the left side or at the right side of the text.
    // Sensitivity is set in this.board.options.precision.hasPoint.
    // If dragarea is set to 'all' (default), tests if the screen
    // coordinates (x,y) are in within the text boundary.
    hasPoint: function(x, y) {
        var lft, rt, top, bot, ax, ay, type, r;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isObject(this.evalVisProp('precision'))) {
            type = this.board._inputDevice;
            r = this.evalVisProp('precision.' + type);
        } else {
            // 'inherit'
            r = this.board.options.precision.hasPoint;
        }
        if (this.transformations.length > 0) {
            //Transform the mouse/touch coordinates
            // back to the original position of the text.
            lft = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matVecMult(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].inverse(this.board.renderer.joinTransforms(this, this.transformations)), [
                1,
                x,
                y
            ]);
            x = lft[1];
            y = lft[2];
        }
        ax = this.getAnchorX();
        if (ax === "right") {
            lft = this.coords.scrCoords[1] - this.size[0];
        } else if (ax === "middle") {
            lft = this.coords.scrCoords[1] - 0.5 * this.size[0];
        } else {
            lft = this.coords.scrCoords[1];
        }
        rt = lft + this.size[0];
        ay = this.getAnchorY();
        if (ay === "top") {
            bot = this.coords.scrCoords[2] + this.size[1];
        } else if (ay === "middle") {
            bot = this.coords.scrCoords[2] + 0.5 * this.size[1];
        } else {
            bot = this.coords.scrCoords[2];
        }
        top = bot - this.size[1];
        if (this.evalVisProp('dragarea') === "all") {
            return x >= lft - r && x < rt + r && y >= top - r && y <= bot + r;
        }
        // e.g. 'small'
        return y >= top - r && y <= bot + r && (x >= lft - r && x <= lft + 2 * r || x >= rt - 2 * r && x <= rt + r);
    },
    /**
         * This sets the updateText function of this element depending on the type of text content passed.
         * Used by {@link JXG.Text#_setText}.
         * @param {String|Function|Number} text
         * @private
         * @see JXG.Text#_setText
         */ _createFctUpdateText: function(text) {
        var updateText, e, digits, resolvedText, i, that, ev_p = this.evalVisProp('parse'), ev_um = this.evalVisProp('usemathjax'), ev_uk = this.evalVisProp('usekatex'), convertJessieCode = false;
        this.orgText = text;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(text)) {
            /**
                 * Dynamically created function to update the content
                 * of a text. Can not be overwritten.
                 * <p>
                 * &lt;value&gt; tags will not be evaluated if text is provided by a function
                 * <p>
                 * Sets the property <tt>plaintext</tt> of the text element.
                 *
                 * @private
                 */ this.updateText = function() {
                resolvedText = text().toString(); // Evaluate function
                if (ev_p && !ev_um && !ev_uk) {
                    this.plaintext = this.replaceSub(this.replaceSup(this.convertGeonextAndSketchometry2CSS(resolvedText, false)));
                } else {
                    this.plaintext = resolvedText;
                }
            };
        } else {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber(text) && this.evalVisProp('formatnumber')) {
                if (this.evalVisProp('tofraction')) {
                    if (ev_um) {
                        this.content = '\\(' + __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].toFraction(text, true) + '\\)';
                    } else {
                        this.content = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].toFraction(text, ev_uk);
                    }
                } else {
                    digits = this.evalVisProp('digits');
                    if (this.useLocale()) {
                        this.content = this.formatNumberLocale(text, digits);
                    } else {
                        this.content = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].toFixed(text, digits);
                    }
                }
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(text) && ev_p) {
                if (this.evalVisProp('useasciimathml')) {
                    // ASCIIMathML
                    // value-tags are not supported
                    this.content = "'`" + text + "`'";
                } else if (ev_um || ev_uk) {
                    // MathJax or KaTeX
                    // Replace value-tags by functions
                    // sketchofont is ignored
                    this.content = this.valueTagToJessieCode(text);
                    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(this.content)) {
                        // For some reason we don't have to mask backslashes in an array of strings
                        // anymore.
                        //
                        // for (i = 0; i < this.content.length; i++) {
                        //     this.content[i] = this.content[i].replace(/\\/g, "\\\\"); // Replace single backslash by double
                        // }
                        // } else {
                        this.content = this.content.replace(/\\/g, "\\\\"); // Replace single backslash by double
                    }
                } else {
                    // No TeX involved.
                    // Converts GEONExT syntax into JavaScript string
                    // Short math is allowed
                    // Replace value-tags by functions
                    // Avoid geonext2JS calls
                    this.content = this.poorMansTeX(this.valueTagToJessieCode(text));
                }
                convertJessieCode = true;
            } else {
                this.content = text;
            }
            // Generate function which returns the text to be displayed
            if (convertJessieCode) {
                // Convert JessieCode to JS function
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(this.content)) {
                    // This is the case if the text contained value-tags.
                    // These value-tags consist of JessieCode snippets
                    // which are now replaced by JavaScript functions
                    that = this;
                    for(i = 0; i < this.content.length; i++){
                        if (this.content[i][0] !== '"') {
                            this.content[i] = this.board.jc.snippet(this.content[i], true, "", false);
                            for(e in this.content[i].deps){
                                this.addParents(this.content[i].deps[e]);
                                this.content[i].deps[e].addChild(this);
                            }
                        }
                    }
                    updateText = function() {
                        var i, t, digits = that.evalVisProp('digits'), txt = '';
                        for(i = 0; i < that.content.length; i++){
                            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(that.content[i])) {
                                t = that.content[i]();
                                if (that.useLocale()) {
                                    t = that.formatNumberLocale(t, digits);
                                } else {
                                    t = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].toFixed(t, digits);
                                }
                            } else {
                                t = that.content[i];
                                // Instead of 't.at(t.length - 1)' also 't.(-1)' should work.
                                // However in Moodle 4.2 't.(-1)' returns an empty string.
                                // In plain HTML pages it works.
                                if (t[0] === '"' && t[t.length - 1] === '"') {
                                    t = t.slice(1, -1);
                                }
                            }
                            txt += t;
                        }
                        return txt;
                    };
                } else {
                    updateText = this.board.jc.snippet(this.content, true, "", false);
                    for(e in updateText.deps){
                        this.addParents(updateText.deps[e]);
                        updateText.deps[e].addChild(this);
                    }
                }
                // Ticks have been escaped in valueTagToJessieCode
                this.updateText = function() {
                    this.plaintext = this.unescapeTicks(updateText());
                };
            } else {
                this.updateText = function() {
                    this.plaintext = this.content; // text;
                };
            }
        }
    },
    /**
         * Defines new content. This is used by {@link JXG.Text#setTextJessieCode} and {@link JXG.Text#setText}. This is required because
         * JessieCode needs to filter all Texts inserted into the DOM and thus has to replace setText by setTextJessieCode.
         * @param {String|Function|Number} text
         * @returns {JXG.Text}
         * @private
         */ _setText: function(text) {
        this._createFctUpdateText(text);
        // First evaluation of the string.
        // We need this for display='internal' and Canvas
        this.updateText();
        this.fullUpdate();
        // We do not call updateSize for the infobox to speed up rendering
        if (!this.board.infobox || this.id !== this.board.infobox.id) {
            this.updateSize(); // updateSize() is called at least once.
        }
        // This may slow down canvas renderer
        // if (this.board.renderer.type === 'canvas') {
        //     this.board.fullUpdate();
        // }
        return this;
    },
    /**
         * Defines new content but converts &lt; and &gt; to HTML entities before updating the DOM.
         * @param {String|function} text
         */ setTextJessieCode: function(text) {
        var s;
        this.visProp.castext = text;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(text)) {
            s = function() {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].sanitizeHTML(text());
            };
        } else {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber(text)) {
                s = text;
            } else {
                s = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].sanitizeHTML(text);
            }
        }
        return this._setText(s);
    },
    /**
         * Defines new content.
         * @param {String|function} text
         * @returns {JXG.Text} Reference to the text object.
         */ setText: function(text) {
        return this._setText(text);
    },
    /**
         * Recompute the width and the height of the text box.
         * Updates the array {@link JXG.Text#size} with pixel values.
         * The result may differ from browser to browser
         * by some pixels.
         * In canvas an old IEs we use a very crude estimation of the dimensions of
         * the textbox.
         * JSXGraph needs {@link JXG.Text#size} for applying rotations in IE and
         * for aligning text.
         *
         * @return {this} [description]
         */ updateSize: function() {
        var tmp, that, node, ev_d = this.evalVisProp('display');
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isBrowser || this.board.renderer.type === "no") {
            return this;
        }
        node = this.rendNode;
        /**
             * offsetWidth and offsetHeight seem to be supported for internal vml elements by IE10+ in IE8 mode.
             */ if (ev_d === "html" || this.board.renderer.type === "vml") {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(node.offsetWidth)) {
                that = this;
                window.setTimeout(function() {
                    that.size = [
                        node.offsetWidth,
                        node.offsetHeight
                    ];
                    that.needsUpdate = true;
                    that.updateRenderer();
                }, 0);
            // In case, there is non-zero padding or borders
            // the following approach does not longer work.
            // s = [node.offsetWidth, node.offsetHeight];
            // if (s[0] === 0 && s[1] === 0) { // Some browsers need some time to set offsetWidth and offsetHeight
            //     that = this;
            //     window.setTimeout(function () {
            //         that.size = [node.offsetWidth, node.offsetHeight];
            //         that.needsUpdate = true;
            //         that.updateRenderer();
            //     }, 0);
            // } else {
            //     this.size = s;
            // }
            } else {
                this.size = this.crudeSizeEstimate();
            }
        } else if (ev_d === "internal") {
            if (this.board.renderer.type === "svg") {
                that = this;
                window.setTimeout(function() {
                    try {
                        tmp = node.getBBox();
                        that.size = [
                            tmp.width,
                            tmp.height
                        ];
                        that.needsUpdate = true;
                        that.updateRenderer();
                    } catch (e) {}
                }, 0);
            } else if (this.board.renderer.type === "canvas") {
                this.size = this.crudeSizeEstimate();
            }
        }
        return this;
    },
    /**
         * A very crude estimation of the dimensions of the textbox in case nothing else is available.
         * @returns {Array}
         */ crudeSizeEstimate: function() {
        var ev_fs = parseFloat(this.evalVisProp('fontsize'));
        return [
            ev_fs * this.plaintext.length * 0.45,
            ev_fs * 0.9
        ];
    },
    /**
         * Decode unicode entities into characters.
         * @param {String} string
         * @returns {String}
         */ utf8_decode: function(string) {
        return string.replace(/&#x(\w+);/g, function(m, p1) {
            return String.fromCharCode(parseInt(p1, 16));
        });
    },
    /**
         * Replace _{} by &lt;sub&gt;
         * @param {String} te String containing _{}.
         * @returns {String} Given string with _{} replaced by &lt;sub&gt;.
         */ replaceSub: function(te) {
        if (!te.indexOf) {
            return te;
        }
        var j, i = te.indexOf("_{");
        // The regexp in here are not used for filtering but to provide some kind of sugar for label creation,
        // i.e. replacing _{...} with <sub>...</sub>. What is passed would get out anyway.
        /*jslint regexp: true*/ while(i >= 0){
            te = te.slice(0, i) + te.slice(i).replace(/_\{/, "<sub>");
            j = te.indexOf("}", i + 4);
            if (j >= 0) {
                te = te.slice(0, j) + te.slice(j).replace(/\}/, "</sub>");
            }
            i = te.indexOf("_{");
        }
        i = te.indexOf("_");
        while(i >= 0){
            te = te.slice(0, i) + te.slice(i).replace(/_(.?)/, "<sub>$1</sub>");
            i = te.indexOf("_");
        }
        return te;
    },
    /**
         * Replace ^{} by &lt;sup&gt;
         * @param {String} te String containing ^{}.
         * @returns {String} Given string with ^{} replaced by &lt;sup&gt;.
         */ replaceSup: function(te) {
        if (!te.indexOf) {
            return te;
        }
        var j, i = te.indexOf("^{");
        // The regexp in here are not used for filtering but to provide some kind of sugar for label creation,
        // i.e. replacing ^{...} with <sup>...</sup>. What is passed would get out anyway.
        /*jslint regexp: true*/ while(i >= 0){
            te = te.slice(0, i) + te.slice(i).replace(/\^\{/, "<sup>");
            j = te.indexOf("}", i + 4);
            if (j >= 0) {
                te = te.slice(0, j) + te.slice(j).replace(/\}/, "</sup>");
            }
            i = te.indexOf("^{");
        }
        i = te.indexOf("^");
        while(i >= 0){
            te = te.slice(0, i) + te.slice(i).replace(/\^(.?)/, "<sup>$1</sup>");
            i = te.indexOf("^");
        }
        return te;
    },
    /**
         * Return the width of the text element.
         * @returns {Array} [width, height] in pixel
         */ getSize: function() {
        return this.size;
    },
    /**
         * Move the text to new coordinates.
         * @param {number} x
         * @param {number} y
         * @returns {object} reference to the text object.
         */ setCoords: function(x, y) {
        var coordsAnchor, dx, dy;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(x) && x.length > 1) {
            y = x[1];
            x = x[0];
        }
        if (this.evalVisProp('islabel') && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.element)) {
            coordsAnchor = this.element.getLabelAnchor();
            dx = (x - coordsAnchor.usrCoords[1]) * this.board.unitX;
            dy = -(y - coordsAnchor.usrCoords[2]) * this.board.unitY;
            this.relativeCoords.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, [
                dx,
                dy
            ]);
        } else {
            this.coords.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                x,
                y
            ]);
        }
        // this should be a local update, otherwise there might be problems
        // with the tick update routine resulting in orphaned tick labels
        this.fullUpdate();
        return this;
    },
    /**
         * Evaluates the text.
         * Then, the update function of the renderer
         * is called.
         */ update: function(fromParent) {
        if (!this.needsUpdate) {
            return this;
        }
        this.updateCoords(fromParent);
        this.updateText();
        if (this.evalVisProp('display') === "internal") {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(this.plaintext)) {
                this.plaintext = this.utf8_decode(this.plaintext);
            }
        }
        this.checkForSizeUpdate();
        if (this.needsSizeUpdate) {
            this.updateSize();
        }
        return this;
    },
    /**
         * Used to save updateSize() calls.
         * Called in JXG.Text.update
         * That means this.update() has been called.
         * More tests are in JXG.Renderer.updateTextStyle. The latter tests
         * are one update off. But this should pose not too many problems, since
         * it affects fontSize and cssClass changes.
         *
         * @private
         */ checkForSizeUpdate: function() {
        if (this.board.infobox && this.id === this.board.infobox.id) {
            this.needsSizeUpdate = false;
        } else {
            // For some magic reason it is more efficient on the iPad to
            // call updateSize() for EVERY text element EVERY time.
            this.needsSizeUpdate = this.plaintextOld !== this.plaintext;
            if (this.needsSizeUpdate) {
                this.plaintextOld = this.plaintext;
            }
        }
    },
    /**
         * The update function of the renderer
         * is called.
         * @private
         */ updateRenderer: function() {
        if (//this.board.updateQuality === this.board.BOARD_QUALITY_HIGH &&
        this.evalVisProp('autoposition')) {
            this.setAutoPosition().updateConstraint();
        }
        return this.updateRendererGeneric("updateText");
    },
    /**
         * Converts shortened math syntax into correct syntax:  3x instead of 3*x or
         * (a+b)(3+1) instead of (a+b)*(3+1).
         *
         * @private
         * @param{String} expr Math term
         * @returns {string} expanded String
         */ expandShortMath: function(expr) {
        var re = /([)0-9.])\s*([(a-zA-Z_])/g;
        return expr.replace(re, "$1*$2");
    },
    /**
         * Converts the GEONExT syntax of the <value> terms into JavaScript.
         * Also, all Objects whose name appears in the term are searched and
         * the text is added as child to these objects.
         * This method is called if the attribute parse==true is set.
         *
         * Obsolete, replaced by JXG.Text.valueTagToJessieCode
         *
         * @param{String} contentStr String to be parsed
         * @param{Boolean} [expand] Optional flag if shortened math syntax is allowed (e.g. 3x instead of 3*x).
         * @param{Boolean} [avoidGeonext2JS] Optional flag if geonext2JS should be called. For backwards compatibility
         * this has to be set explicitly to true.
         * @param{Boolean} [outputTeX] Optional flag which has to be true if the resulting term will be sent to MathJax or KaTeX.
         * If true, "_" and "^" are NOT replaced by HTML tags sub and sup. Default: false, i.e. the replacement is done.
         * This flag allows the combination of &lt;value&gt; tag containing calculations with TeX output.
         *
         * @deprecated
         * @private
         * @see JXG.GeonextParser#geonext2JS
         * @see JXG.Text#valueTagToJessieCode
         *
         */ generateTerm: function(contentStr, expand, avoidGeonext2JS) {
        var res, term, i, j, plaintext = '""';
        // Revert possible jc replacement
        contentStr = contentStr || "";
        contentStr = contentStr.replace(/\r/g, "");
        contentStr = contentStr.replace(/\n/g, "");
        contentStr = contentStr.replace(/"/g, "'");
        contentStr = contentStr.replace(/'/g, "\\'");
        // Old GEONExT syntax, not (yet) supported as TeX output.
        // Otherwise, the else clause should be used.
        // That means, i.e. the <arc> tag and <sqrt> tag are not
        // converted into TeX syntax.
        contentStr = contentStr.replace(/&amp;arc;/g, "&ang;");
        contentStr = contentStr.replace(/<arc\s*\/>/g, "&ang;");
        contentStr = contentStr.replace(/&lt;arc\s*\/&gt;/g, "&ang;");
        contentStr = contentStr.replace(/&lt;sqrt\s*\/&gt;/g, "&radic;");
        contentStr = contentStr.replace(/&lt;value&gt;/g, "<value>");
        contentStr = contentStr.replace(/&lt;\/value&gt;/g, "</value>");
        // Convert GEONExT syntax into  JavaScript syntax
        i = contentStr.indexOf("<value>");
        j = contentStr.indexOf("</value>");
        if (i >= 0) {
            while(i >= 0){
                plaintext += ' + "' + this.replaceSub(this.replaceSup(contentStr.slice(0, i))) + '"';
                // plaintext += ' + "' + this.replaceSub(contentStr.slice(0, i)) + '"';
                term = contentStr.slice(i + 7, j);
                term = term.replace(/\s+/g, ""); // Remove all whitespace
                if (expand === true) {
                    term = this.expandShortMath(term);
                }
                if (avoidGeonext2JS) {
                    res = term;
                } else {
                    res = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$parser$2f$geonext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].geonext2JS(term, this.board);
                }
                res = res.replace(/\\"/g, "'");
                res = res.replace(/\\'/g, "'");
                // GEONExT-Hack: apply rounding once only.
                if (res.indexOf("toFixed") < 0) {
                    // output of a value tag
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bind(this.board.jc.snippet(res, true, '', false), this)())) {
                        // may also be a string
                        plaintext += '+(' + res + ').toFixed(' + this.evalVisProp('digits') + ')';
                    } else {
                        plaintext += '+(' + res + ')';
                    }
                } else {
                    plaintext += '+(' + res + ')';
                }
                contentStr = contentStr.slice(j + 8);
                i = contentStr.indexOf("<value>");
                j = contentStr.indexOf("</value>");
            }
        }
        plaintext += ' + "' + this.replaceSub(this.replaceSup(contentStr)) + '"';
        plaintext = this.convertGeonextAndSketchometry2CSS(plaintext);
        // This should replace e.g. &amp;pi; by &pi;
        plaintext = plaintext.replace(/&amp;/g, "&");
        plaintext = plaintext.replace(/"/g, "'");
        return plaintext;
    },
    /**
         * Replace value-tags in string by JessieCode functions.
         * @param {String} contentStr
         * @returns String
         * @private
         * @example
         * "The x-coordinate of A is &lt;value&gt;X(A)&lt;/value&gt;"
         *
         */ valueTagToJessieCode: function(contentStr) {
        var res, term, i, j, expandShortMath = true, textComps = [], tick = '"';
        contentStr = contentStr || "";
        contentStr = contentStr.replace(/\r/g, "");
        contentStr = contentStr.replace(/\n/g, "");
        contentStr = contentStr.replace(/&lt;value&gt;/g, "<value>");
        contentStr = contentStr.replace(/&lt;\/value&gt;/g, "</value>");
        // Convert content of value tag (GEONExT/JessieCode) syntax into JavaScript syntax
        i = contentStr.indexOf("<value>");
        j = contentStr.indexOf("</value>");
        if (i >= 0) {
            while(i >= 0){
                // Add string fragment before <value> tag
                textComps.push(tick + this.escapeTicks(contentStr.slice(0, i)) + tick);
                term = contentStr.slice(i + 7, j);
                term = term.replace(/\s+/g, ""); // Remove all whitespace
                if ("TURBOPACK compile-time truthy", 1) {
                    term = this.expandShortMath(term);
                }
                res = term;
                res = res.replace(/\\"/g, "'").replace(/\\'/g, "'");
                // // Hack: apply rounding once only.
                // if (res.indexOf("toFixed") < 0) {
                //     // Output of a value tag
                //     // Run the JessieCode parser
                //     if (
                //         Type.isNumber(
                //             Type.bind(this.board.jc.snippet(res, true, "", false), this)()
                //         )
                //     ) {
                //         // Output is number
                //         // textComps.push(
                //         //     '(' + res + ').toFixed(' + this.evalVisProp('digits') + ')'
                //         // );
                //         textComps.push('(' + res + ')');
                //     } else {
                //         // Output is a string
                //         textComps.push("(" + res + ")");
                //     }
                // } else {
                textComps.push("(" + res + ")");
                // }
                contentStr = contentStr.slice(j + 8);
                i = contentStr.indexOf("<value>");
                j = contentStr.indexOf("</value>");
            }
        }
        // Add trailing string fragment
        textComps.push(tick + this.escapeTicks(contentStr) + tick);
        // return textComps.join(" + ").replace(/&amp;/g, "&");
        for(i = 0; i < textComps.length; i++){
            textComps[i] = textComps[i].replace(/&amp;/g, "&");
        }
        return textComps;
    },
    /**
         * Simple math rendering using HTML / CSS only. In case of array,
         * handle each entry separately and return array with the
         * rendering strings.
         *
         * @param {String|Array} s
         * @returns {String|Array}
         * @see JXG.Text#convertGeonextAndSketchometry2CSS
         * @private
         * @see JXG.Text#replaceSub
         * @see JXG.Text#replaceSup
         * @see JXG.Text#convertGeonextAndSketchometry2CSS
         */ poorMansTeX: function(s) {
        var i, a;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(s)) {
            a = [];
            for(i = 0; i < s.length; i++){
                a.push(this.poorMansTeX(s[i]));
            }
            return a;
        }
        s = s.replace(/<arc\s*\/*>/g, "&ang;").replace(/&lt;arc\s*\/*&gt;/g, "&ang;").replace(/<sqrt\s*\/*>/g, "&radic;").replace(/&lt;sqrt\s*\/*&gt;/g, "&radic;");
        return this.convertGeonextAndSketchometry2CSS(this.replaceSub(this.replaceSup(s)), true);
    },
    /**
         * Replace ticks by URI escape sequences
         *
         * @param {String} s
         * @returns String
         * @private
         *
         */ escapeTicks: function(s) {
        return s.replace(/"/g, "%22").replace(/'/g, "%27");
    },
    /**
         * Replace escape sequences for ticks by ticks
         *
         * @param {String} s
         * @returns String
         * @private
         */ unescapeTicks: function(s) {
        return s.replace(/%22/g, '"').replace(/%27/g, "'");
    },
    /**
         * Converts the GEONExT tags <overline> and <arrow> to
         * HTML span tags with proper CSS formatting.
         * @private
         * @see JXG.Text.poorMansTeX
         * @see JXG.Text._setText
         */ convertGeonext2CSS: function(s) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(s)) {
            s = s.replace(/(<|&lt;)overline(>|&gt;)/g, "<span style=text-decoration:overline;>");
            s = s.replace(/(<|&lt;)\/overline(>|&gt;)/g, "</span>");
            s = s.replace(/(<|&lt;)arrow(>|&gt;)/g, "<span style=text-decoration:overline;>");
            s = s.replace(/(<|&lt;)\/arrow(>|&gt;)/g, "</span>");
        }
        return s;
    },
    /**
         * Converts the sketchometry tag <sketchofont> to
         * HTML span tags with proper CSS formatting.
         *
         * @param {String|Function|Number} s Text
         * @param {Boolean} escape Flag if ticks should be escaped. Escaping is necessary
         * if s is a text. It has to be avoided if s is a function returning text.
         * @private
         * @see JXG.Text._setText
         * @see JXG.Text.convertGeonextAndSketchometry2CSS
         *
         */ convertSketchometry2CSS: function(s, escape) {
        var t1 = "<span class=\"sketcho sketcho-inherit sketcho-", t2 = "\"></span>";
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(s)) {
            if (escape) {
                t1 = this.escapeTicks(t1);
                t2 = this.escapeTicks(t2);
            }
            s = s.replace(/(<|&lt;)sketchofont(>|&gt;)/g, t1);
            s = s.replace(/(<|&lt;)\/sketchofont(>|&gt;)/g, t2);
        }
        return s;
    },
    /**
         * Alias for convertGeonext2CSS and convertSketchometry2CSS
         *
         * @param {String|Function|Number} s Text
         * @param {Boolean} escape Flag if ticks should be escaped
         * @private
         * @see JXG.Text.convertGeonext2CSS
         * @see JXG.Text.convertSketchometry2CSS
         */ convertGeonextAndSketchometry2CSS: function(s, escape) {
        s = this.convertGeonext2CSS(s);
        s = this.convertSketchometry2CSS(s, escape);
        return s;
    },
    /**
         * Finds dependencies in a given term and notifies the parents by adding the
         * dependent object to the found objects child elements.
         * @param {String} content String containing dependencies for the given object.
         * @private
         */ notifyParents: function(content) {
        var search, res = null;
        // revert possible jc replacement
        content = content.replace(/&lt;value&gt;/g, "<value>");
        content = content.replace(/&lt;\/value&gt;/g, "</value>");
        do {
            search = /<value>([\w\s*/^\-+()[\],<>=!]+)<\/value>/;
            res = search.exec(content);
            if (res !== null) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$parser$2f$geonext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].findDependencies(this, res[1], this.board);
                content = content.slice(res.index);
                content = content.replace(search, "");
            }
        }while (res !== null)
        return this;
    },
    // documented in element.js
    getParents: function() {
        var p;
        if (this.relativeCoords !== undefined) {
            // Texts with anchor elements, excluding labels
            p = [
                this.relativeCoords.usrCoords[1],
                this.relativeCoords.usrCoords[2],
                this.orgText
            ];
        } else {
            // Other texts
            p = [
                this.Z(),
                this.X(),
                this.Y(),
                this.orgText
            ];
        }
        if (this.parents.length !== 0) {
            p = this.parents;
        }
        return p;
    },
    /**
         * Returns the bounding box of the text element in user coordinates as an
         * array of length 4: [upper left x, upper left y, lower right x, lower right y].
         * The method assumes that the lower left corner is at position [el.X(), el.Y()]
         * of the text element el, i.e. the attributes anchorX, anchorY are ignored.
         *
         * <p>
         * <strong>Attention:</strong> for labels, [0, 0, 0, 0] is returned.
         *
         * @returns Array
         */ bounds: function() {
        var c = this.coords.usrCoords;
        if (this.evalVisProp('islabel') || this.board.unitY === 0 || this.board.unitX === 0) {
            return [
                0,
                0,
                0,
                0
            ];
        }
        return [
            c[1],
            c[2] + this.size[1] / this.board.unitY,
            c[1] + this.size[0] / this.board.unitX,
            c[2]
        ];
    },
    /**
         * Returns the value of the attribute "anchorX". If this equals "auto",
         * returns "left", "middle", or "right", depending on the
         * value of the attribute "position".
         * @returns String
         */ getAnchorX: function() {
        var a = this.evalVisProp('anchorx');
        if (a === "auto") {
            switch(this.visProp.position){
                case "top":
                case "bot":
                    return "middle";
                case "rt":
                case "lrt":
                case "urt":
                    return "left";
                case "lft":
                case "llft":
                case "ulft":
                default:
                    return "right";
            }
        }
        return a;
    },
    /**
         * Returns the value of the attribute "anchorY". If this equals "auto",
         * returns "bottom", "middle", or "top", depending on the
         * value of the attribute "position".
         * @returns String
         */ getAnchorY: function() {
        var a = this.evalVisProp('anchory');
        if (a === "auto") {
            switch(this.visProp.position){
                case "top":
                case "ulft":
                case "urt":
                    return "bottom";
                case "bot":
                case "lrt":
                case "llft":
                    return "top";
                case "rt":
                case "lft":
                default:
                    return "middle";
            }
        }
        return a;
    },
    /**
         * Computes the number of overlaps of a box of w pixels width, h pixels height
         * and center (x, y)
         *
         * An overlap occurs when either:
         * <ol>
         *   <li> For labels/points: Their bounding boxes intersect
         *   <li> For other objects: The object contains the center point of the box
         * </ol>
         *
         * @private
         * @param  {Number} x x-coordinate of the center (screen coordinates)
         * @param  {Number} y y-coordinate of the center (screen coordinates)
         * @param  {Number} w width of the box in pixel
         * @param  {Number} h width of the box in pixel
         * @param  {Array} [whiteList] array of ids which should be ignored
         * @return {Number}   Number of overlapping elements
         */ getNumberOfConflicts: function(x, y, w, h, whiteList) {
        whiteList = whiteList || [];
        var count = 0, i, obj, coords, saveHasInnerPoints, savePointPrecision = this.board.options.precision.hasPoint, objCenterX, objCenterY, objWidth, objHeight;
        // set a new precision for hasPoint
        // this.board.options.precision.hasPoint = Math.max(w, h) * 0.5;
        this.board.options.precision.hasPoint = (w + h) * 0.3;
        // loop over all objects
        for(i = 0; i < this.board.objectsList.length; i++){
            obj = this.board.objectsList[i];
            //Skip the object if it is not meant to influence label position
            if (obj.visPropCalc.visible && obj !== this && whiteList.indexOf(obj.id) === -1 && obj.evalVisProp("ignoreforlabelautoposition") !== true) {
                // Save hasinnerpoints and temporarily disable to handle polygon areas
                saveHasInnerPoints = obj.visProp.hasinnerpoints;
                obj.visProp.hasinnerpoints = false;
                // If is label or point use other conflict detection
                if (obj.visProp.islabel || obj.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_POINT) {
                    // get coords and size of the object
                    coords = obj.coords.scrCoords;
                    objCenterX = coords[1];
                    objCenterY = coords[2];
                    objWidth = obj.size[0];
                    objHeight = obj.size[1];
                    // move coords to the center of the label
                    if (obj.visProp.islabel) {
                        // Vertical adjustment
                        if (obj.visProp.anchory === 'top') {
                            objCenterY = objCenterY + objHeight / 2;
                        } else {
                            objCenterY = objCenterY - objHeight / 2;
                        }
                        // Horizontal adjustment
                        if (obj.visProp.anchorx === 'left') {
                            objCenterX = objCenterX + objWidth / 2;
                        } else {
                            objCenterX = objCenterX - objWidth / 2;
                        }
                    } else {
                        // Points are treated dimensionless
                        objWidth = 0;
                        objHeight = 0;
                    }
                    // Check for overlap
                    if (Math.abs(objCenterX - x) < (w + objWidth) / 2 && Math.abs(objCenterY - y) < (h + objHeight) / 2) {
                        count++;
                    }
                //if not label or point check conflict with hasPoint
                } else if (obj.hasPoint(x, y)) {
                    count++;
                }
                // Restore original hasinnerpoints
                obj.visProp.hasinnerpoints = saveHasInnerPoints;
            }
        }
        // Restore original precision
        this.board.options.precision.hasPoint = savePointPrecision;
        return count;
    },
    /**
         * Calculates the score of a label position with a given radius and angle. The score is calculated by the following rules:
         * <ul>
         * <li> the maximum score is 0
         * <li> if the label is outside of the bounding box, the score is reduced by 1
         * <li> for each conflict, the score is reduced by 1
         * <li> the score is reduced by the displacement (angle difference between old and new position) of the label
         * <li> the score is reduced by the angle between the original label position and the new label position
         * </ul>
         *
         * @param {number} radius radius in pixels
         * @param {number} angle angle in radians
         * @returns {number} Position score, higher values indicate better positions
         */ calculateScore: function(radius, angle) {
        var x, y, co, si, angleCurrentOffset, angleDifference, score = 0, cornerPoint = [
            0,
            0
        ], w = this.getSize()[0], h = this.getSize()[1], anchorCoords, currentOffset = this.evalVisProp("offset"), boundingBox = this.board.getBoundingBox();
        if (this.evalVisProp('islabel') && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.element)) {
            anchorCoords = this.element.getLabelAnchor().scrCoords;
        } else {
            return 0;
        }
        co = Math.cos(angle);
        si = Math.sin(angle);
        // calculate new position with srccoords, radius and angle
        x = anchorCoords[1] + radius * co;
        y = anchorCoords[2] - radius * si;
        // if the label was placed on the left side of the element, the anchorx is set to "right"
        if (co < 0) {
            cornerPoint[0] = x - w;
            x -= w / 2;
        } else {
            cornerPoint[0] = x + w;
            x += w / 2;
        }
        // If the label was placed on the bottom side of the element, so the anchory is set to "top"
        if (si < 0) {
            cornerPoint[1] = y + h;
            y += h / 2;
        } else {
            cornerPoint[1] = y - h;
            y -= h / 2;
        }
        // If label was not in bounding box, score is reduced by 1
        if (cornerPoint[0] < 0 || cornerPoint[0] > (boundingBox[2] - boundingBox[0]) * this.board.unitX || cornerPoint[1] < 0 || cornerPoint[1] > (boundingBox[1] - boundingBox[3]) * this.board.unitY) {
            score -= 1;
        }
        // Per conflict, score is reduced by 1
        score -= this.getNumberOfConflicts(x, y, w, h, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].evaluate(this.visProp.autopositionwhitelist));
        // Calculate displacement, minimum score is 0 if radius is minRadius, maximum score is < 1 when radius is maxRadius
        score -= radius / this.evalVisProp("autopositionmindistance") / 10 - 0.1;
        // Calculate angle between current offset and new offset
        angleCurrentOffset = Math.atan2(currentOffset[1], currentOffset[0]);
        // If angle is negative, add 2*PI to get positive angle
        if (angleCurrentOffset < 0) {
            angleCurrentOffset += 2 * Math.PI;
        }
        // Calculate displacement by angle between original label position and new label position,
        // use cos to check if angle is on the right side.
        // If both angles are on the right side and more than 180° apart, add 2*PI. e.g. 0.1 and 6.1 are near each other
        if (co > 0 && Math.cos(angleCurrentOffset) > 0 && Math.abs(angle - angleCurrentOffset) > Math.PI) {
            angleDifference = Math.abs(angle - angleCurrentOffset - 2 * Math.PI);
        } else {
            angleDifference = Math.abs(angle - angleCurrentOffset);
        }
        // Minimum score is 0 if angle difference is 0, maximum score is pi / 10
        score -= angleDifference / 10;
        return score;
    },
    /**
         * Automatically positions the label by finding the optimal position.
         * Aims to minimize conflicts while maintaining readability.
         * <p>
         * The method tests 60 different angles (0 to 2π) at 3 different distances (radii).
         * It evaluates each position using calculateScore(radius, angle) and chooses the position with the highest score.
         * Then the label's anchor points and offset are adjusted accordingly.
         *
         * @returns {JXG.Text} Reference to the text object.
         */ setAutoPosition: function() {
        var radius, angle, radiusStep, i, bestScore = -Infinity, bestRadius, bestAngle, minRadius = this.evalVisProp("autopositionmindistance"), maxRadius = this.evalVisProp("autopositionmaxdistance"), score, co, si, currentOffset = this.evalVisProp("offset"), currentRadius, currentAngle, numAngles = 60, numRadius = 4;
        if (this === this.board.infobox || !this.element || !this.visPropCalc.visible || !this.evalVisProp('islabel')) {
            return this;
        }
        // Calculate current position
        currentRadius = Math.sqrt(currentOffset[0] * currentOffset[0] + currentOffset[1] * currentOffset[1]);
        currentAngle = Math.atan2(currentOffset[1], currentOffset[0]);
        if (this.calculateScore(currentRadius, currentAngle) === 0) {
            return this;
        }
        // Initialize search at min radius
        radius = minRadius;
        // Calculate step size
        radiusStep = (maxRadius - minRadius) / (numRadius - 1);
        // Test the different radii
        while(maxRadius - radius > -0.01){
            // Radius gets bigger so just check if its smaller than maxnumber of angles.
            for(i = 0; i < numAngles; i++){
                // calculate angle
                angle = i / numAngles * 2 * Math.PI;
                // calculate score
                score = this.calculateScore(radius, angle);
                // if score is better than bestScore, set bestAngle, bestRadius and bestScore
                if (score > bestScore) {
                    bestAngle = angle;
                    bestRadius = radius;
                    bestScore = score;
                }
                // if bestScore is 0, break, because it can't get better
                if (bestScore === 0) {
                    radius = maxRadius;
                    break;
                }
            }
            radius += radiusStep;
        }
        co = Math.cos(bestAngle);
        si = Math.sin(bestAngle);
        // If label is on the left side of the element, the anchorx is set to "right"
        if (co < 0) {
            this.visProp.anchorx = "right";
        } else {
            this.visProp.anchorx = "left";
        }
        // If label is on the bottom side of the element, so the anchory is set to "top"
        if (si < 0) {
            this.visProp.anchory = "top";
        } else {
            this.visProp.anchory = "bottom";
        }
        // Set offset
        this.visProp.offset = [
            bestRadius * co,
            bestRadius * si
        ];
        return this;
    }
});
/**
 * @class Constructs a text element.
 *
 * The coordinates can either be absolute (i.e. respective to the coordinate system of the board) or be relative to the coordinates of an element
 * given in {@link Text#anchor}.
 * <p>
 * HTML, MathJaX, KaTeX and GEONExT syntax can be handled.
 * <p>
 * There are two ways to display texts:
 * <ul>
 * <li> using the text element of the renderer (canvas or svg). In most cases this is the suitable approach if speed matters.
 * However, advanced rendering like MathJax, KaTeX or HTML/CSS are not possible.
 * <li> using HTML &lt;div&gt;. This is the most flexible approach. The drawback is that HTML can only be display "above" the geometry elements.
 * If HTML should be displayed in an inbetween layer, conder to use an element of type {@link ForeignObject} (available in svg renderer, only).
 * </ul>
 * @pseudo
 * @name Text
 * @augments JXG.Text
 * @constructor
 * @type JXG.Text
 *
 * @param {number,function_number,function_number,function_String,function} z_,x,y,str Parent elements for text elements.
 *                     <p>
 *   Parent elements can be two or three elements of type number, a string containing a GEONE<sub>x</sub>T
 *   constraint, or a function which takes no parameter and returns a number. Every parent element beside the last determines one coordinate.
 *   If a coordinate is
 *   given by a number, the number determines the initial position of a free text. If given by a string or a function that coordinate will be constrained
 *   that means the user won't be able to change the texts's position directly by mouse because it will be calculated automatically depending on the string
 *   or the function's return value. If two parent elements are given the coordinates will be interpreted as 2D affine Euclidean coordinates, if three such
 *   parent elements are given they will be interpreted as homogeneous coordinates.
 *                     <p>
 *                     The text to display may be given as string or as function returning a string.
 *
 * There is the attribute 'display' which takes the values 'html' or 'internal'. In case of 'html' an HTML division tag is created to display
 * the text. In this case it is also possible to use MathJax, KaTeX, or ASCIIMathML. If neither of these is used, basic Math rendering is
 * applied.
 * <p>
 * In case of 'internal', an SVG text element is used to display the text.
 * @see JXG.Text
 * @example
 * // Create a fixed text at position [0,1].
 *   var t1 = board.create('text',[0,1,"Hello World"]);
 * </pre><div class="jxgbox" id="JXG896013aa-f24e-4e83-ad50-7bc7df23f6b7" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *   var t1_board = JXG.JSXGraph.initBoard('JXG896013aa-f24e-4e83-ad50-7bc7df23f6b7', {boundingbox: [-3, 6, 5, -3], axis: true, showcopyright: false, shownavigation: false});
 *   var t1 = t1_board.create('text',[0,1,"Hello World"]);
 * </script><pre>
 * @example
 * // Create a variable text at a variable position.
 *   var s = board.create('slider',[[0,4],[3,4],[-2,0,2]]);
 *   var graph = board.create('text',
 *                        [function(x){ return s.Value();}, 1,
 *                         function(){return "The value of s is"+JXG.toFixed(s.Value(), 2);}
 *                        ]
 *                     );
 * </pre><div class="jxgbox" id="JXG5441da79-a48d-48e8-9e53-75594c384a1c" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *   var t2_board = JXG.JSXGraph.initBoard('JXG5441da79-a48d-48e8-9e53-75594c384a1c', {boundingbox: [-3, 6, 5, -3], axis: true, showcopyright: false, shownavigation: false});
 *   var s = t2_board.create('slider',[[0,4],[3,4],[-2,0,2]]);
 *   var t2 = t2_board.create('text',[function(x){ return s.Value();}, 1, function(){return "The value of s is "+JXG.toFixed(s.Value(), 2);}]);
 * </script><pre>
 * @example
 * // Create a text bound to the point A
 * var p = board.create('point',[0, 1]),
 *     t = board.create('text',[0, -1,"Hello World"], {anchor: p});
 *
 * </pre><div class="jxgbox" id="JXGff5a64b2-2b9a-11e5-8dd9-901b0e1b8723" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGff5a64b2-2b9a-11e5-8dd9-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var p = board.create('point',[0, 1]),
 *         t = board.create('text',[0, -1,"Hello World"], {anchor: p});
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createText = function(board, parents, attributes) {
    var t, attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "text"), coords = parents.slice(0, -1), content = parents[parents.length - 1];
    // Backwards compatibility
    attr.anchor = attr.parent || attr.anchor;
    t = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coordselement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Text, board, coords, attr, content);
    if (!t) {
        throw new Error("JSXGraph: Can't create text with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [x,y], [z,x,y], [element,transformation]");
    }
    if (attr.rotate !== 0) {
        // This is the default value, i.e. no rotation
        t.addRotation(attr.rotate);
    }
    return t;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("text", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createText);
/**
 * @class Labels are text objects tied to other elements like points, lines and curves.
 * Labels are handled internally by JSXGraph, only. There is NO constructor "board.create('label', ...)".
 *
 * @description
 * Labels for points are positioned with the attributes {@link Text#anchorX}, {@link Text#anchorX} and {@link Label#offset}.
 * <p>
 * Labels for lines, segments, curves and circles can be controlled additionally by the attributes {@link Label#position} and
 * {@link Label#distance}, i.e. for a segment [A, B] one could use the follwoing attributes:
 * <ul>
 * <li> "position": determines, where in the direction of the segment from A to B the label is placed
 * <li> "distance": determines the (orthogonal) distance of the label from the line segment. It is a factor which is multiplied by the font-size.
 * <li> "offset: [h, v]": a final correction in pixel (horizontally: h, vertically: v)
 * <li> "anchorX" ('left', 'middle', 'right') and "anchorY" ('bottom', 'middle', 'top'): determines which part of the
 * label string is the anchor position that is positioned to the coordinates determined by "position", "distance" and "offset".
 * </ul>
 *
 * @pseudo
 * @name Label
 * @augments JXG.Text
 * @constructor
 * @type JXG.Text
 */ //  See element.js#createLabel
/**
 * [[x,y], [w px, h px], [range]
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createHTMLSlider = function(board, parents, attributes) {
    var t, par, attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "htmlslider");
    if (parents.length !== 2 || parents[0].length !== 2 || parents[1].length !== 3) {
        throw new Error("JSXGraph: Can't create htmlslider with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parents are: [[x,y], [min, start, max]]");
    }
    // Backwards compatibility
    attr.anchor = attr.parent || attr.anchor;
    attr.fixed = attr.fixed || true;
    par = [
        parents[0][0],
        parents[0][1],
        '<form style="display:inline">' + '<input type="range" /><span></span><input type="text" />' + "</form>"
    ];
    t = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createText(board, par, attr);
    t.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_HTMLSLIDER;
    t.rendNodeForm = t.rendNode.childNodes[0];
    t.rendNodeRange = t.rendNodeForm.childNodes[0];
    t.rendNodeRange.min = parents[1][0];
    t.rendNodeRange.max = parents[1][2];
    t.rendNodeRange.step = attr.step;
    t.rendNodeRange.value = parents[1][1];
    t.rendNodeLabel = t.rendNodeForm.childNodes[1];
    t.rendNodeLabel.id = t.rendNode.id + "_label";
    if (attr.withlabel) {
        t.rendNodeLabel.innerHTML = t.name + "=";
    }
    t.rendNodeOut = t.rendNodeForm.childNodes[2];
    t.rendNodeOut.value = parents[1][1];
    try {
        t.rendNodeForm.id = t.rendNode.id + "_form";
        t.rendNodeRange.id = t.rendNode.id + "_range";
        t.rendNodeOut.id = t.rendNode.id + "_out";
    } catch (e) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug(e);
    }
    t.rendNodeRange.style.width = attr.widthrange + "px";
    t.rendNodeRange.style.verticalAlign = "middle";
    t.rendNodeOut.style.width = attr.widthout + "px";
    t._val = parents[1][1];
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].supportsVML()) {
        /*
         * OnChange event is used for IE browsers
         * The range element is supported since IE10
         */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].addEvent(t.rendNodeForm, "change", priv.HTMLSliderInputEventHandler, t);
    } else {
        /*
         * OnInput event is used for non-IE browsers
         */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].addEvent(t.rendNodeForm, "input", priv.HTMLSliderInputEventHandler, t);
    }
    t.Value = function() {
        return this._val;
    };
    return t;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("htmlslider", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createHTMLSlider);
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Text;
 // export default {
 //     Text: JXG.Text,
 //     createText: JXG.createText,
 //     createHTMLSlider: JXG.createHTMLSlider
 // };
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/composition.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, define: true*/ /*jslint nomen: true, plusplus: true*/ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
;
;
/**
 * A composition is a simple container that manages none or more {@link JXG.GeometryElement}s.
 * @param {Object} elements A list of elements with a descriptive name for the element as the key and a reference
 * to the element as the value of every list entry. The name is used to access the element later on.
 * @example
 * var p1 = board.create('point', [1, 2]),
 *     p2 = board.create('point', [2, 3]),
 *     c = new JXG.Composition({
 *         start: p1,
 *         end: p2
 *     });
 *
 * // moves p1 to [3, 3]
 * c.start.moveTo([3, 3]);
 * @class JXG.Composition
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Composition = function(elements) {
    var e, that = this, genericMethods = [
        /**
             * Invokes setAttribute for every stored element with a setAttribute method and hands over the given arguments.
             * See {@link JXG.GeometryElement#setAttribute} for further description, valid parameters and return values.
             * @name setAttribute
             * @memberOf JXG.Composition.prototype
             * @function
             */ "setAttribute",
        /**
             * Invokes setParents for every stored element with a setParents method and hands over the given arguments.
             * See {@link JXG.GeometryElement#setParents} for further description, valid parameters and return values.
             * @name setParents
             * @memberOf JXG.Composition.prototype
             * @function
             */ "setParents",
        /**
             * Invokes prepareUpdate for every stored element with a prepareUpdate method and hands over the given arguments.
             * See {@link JXG.GeometryElement#prepareUpdate} for further description, valid parameters and return values.
             * @name prepareUpdate
             * @memberOf JXG.Composition.prototype
             * @function
             */ "prepareUpdate",
        /**
             * Invokes updateRenderer for every stored element with a updateRenderer method and hands over the given arguments.
             * See {@link JXG.GeometryElement#updateRenderer} for further description, valid parameters and return values.
             * @name updateRenderer
             * @memberOf JXG.Composition.prototype
             * @function
             */ "updateRenderer",
        /**
             * Invokes update for every stored element with a update method and hands over the given arguments.
             * See {@link JXG.GeometryElement#update} for further description, valid parameters and return values.
             * @name update
             * @memberOf JXG.Composition.prototype
             * @function
             */ "update",
        /**
             * Invokes fullUpdate for every stored element with a fullUpdate method and hands over the given arguments.
             * See {@link JXG.GeometryElement#fullUpdate} for further description, valid parameters and return values.
             * @name fullUpdate
             * @memberOf JXG.Composition.prototype
             * @function
             */ "fullUpdate",
        /**
             * Invokes highlight for every stored element with a highlight method and hands over the given arguments.
             * See {@link JXG.GeometryElement#highlight} for further description, valid parameters and return values.
             * @name highlight
             * @memberOf JXG.Composition.prototype
             * @function
             */ "highlight",
        /**
             * Invokes noHighlight for every stored element with a noHighlight method and hands over the given arguments.
             * See {@link JXG.GeometryElement#noHighlight} for further description, valid parameters and return values.
             * @name noHighlight
             * @memberOf JXG.Composition.prototype
             * @function
             */ "noHighlight"
    ], generateMethod = function(what) {
        return function() {
            var i;
            for(i in that.elements){
                if (that.elements.hasOwnProperty(i)) {
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(that.elements[i][what])) {
                        that.elements[i][what].apply(that.elements[i], arguments);
                    }
                }
            }
            return that;
        };
    };
    for(e = 0; e < genericMethods.length; e++){
        this[genericMethods[e]] = generateMethod(genericMethods[e]);
    }
    this.elements = {};
    this.objects = this.elements;
    this.elementsByName = {};
    this.objectsList = [];
    // unused, required for select()
    this.groups = {};
    this.methodMap = {
        setAttribute: "setAttribute",
        setProperty: "setAttribute",
        setParents: "setParents",
        add: "add",
        remove: "remove",
        select: "select"
    };
    for(e in elements){
        if (elements.hasOwnProperty(e)) {
            this.add(e, elements[e]);
        }
    }
    this.dump = true;
    this.subs = {};
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Composition.prototype, /** @lends JXG.Composition.prototype */ {
    /**
         * Adds an element to the composition container.
         * @param {String} what Descriptive name for the element, e.g. <em>startpoint</em> or <em>area</em>. This is used to
         * access the element later on. There are some reserved names: <em>elements, add, remove, update, prepareUpdate,
         * updateRenderer, highlight, noHighlight</em>, and all names that would form invalid object property names in
         * JavaScript.
         * @param {JXG.GeometryElement|JXG.Composition} element A reference to the element that is to be added. This can be
         * another composition, too.
         * @returns {Boolean} True, if the element was added successfully. Reasons why adding the element failed include
         * using a reserved name and providing an invalid element.
         */ add: function(what, element) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this[what]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(element)) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(element.id)) {
                this.elements[element.id] = element;
            } else {
                this.elements[what] = element;
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(element.name)) {
                this.elementsByName[element.name] = element;
            }
            element.on("attribute:name", this.nameListener, this);
            this.objectsList.push(element);
            this[what] = element;
            this.methodMap[what] = element;
            return true;
        }
        return false;
    },
    /**
         * Remove an element from the composition container.
         * @param {String} what The name used to access the element.
         * @returns {Boolean} True, if the element has been removed successfully.
         */ remove: function(what) {
        var found = false, e;
        for(e in this.elements){
            if (this.elements.hasOwnProperty(e)) {
                if (this.elements[e].id === this[what].id) {
                    found = true;
                    break;
                }
            }
        }
        if (found) {
            delete this.elements[this[what].id];
            delete this[what];
        }
        return found;
    },
    nameListener: function(oval, nval, el) {
        delete this.elementsByName[oval];
        this.elementsByName[nval] = el;
    },
    select: function(filter) {
        // for now, hijack JXG.Board's select() method
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Board)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Board.prototype.select.call(this, filter);
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Composition();
    },
    getParents: function() {
        return this.parents;
    },
    getType: function() {
        return this.elType;
    },
    getAttributes: function() {
        var attr = {}, e;
        for(e in this.subs){
            if (this.subs.hasOwnProperty(e)) {
                attr[e] = this.subs[e].visProp;
            }
        }
        return this.attr;
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Composition;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/point.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, define: true, console: true, window: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview The geometry object Point is defined in this file. Point stores all
 * style and functional properties that are required to draw and move a point on
 * a board.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/options.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coordselement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coordselement.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
/**
 * A point is the basic geometric element. Based on points lines and circles can be constructed which can be intersected
 * which in turn are points again which can be used to construct new lines, circles, polygons, etc. This class holds methods for
 * all kind of points like free points, gliders, and intersection points.
 * @class Creates a new point object. Do not use this constructor to create a point. Use {@link JXG.Board#create} with
 * type {@link Point}, {@link Glider}, or {@link Intersection} instead.
 * @augments JXG.GeometryElement
 * @augments JXG.CoordsElement
 * @param {string|JXG.Board} board The board the new point is drawn on.
 * @param {Array} coordinates An array with the user coordinates of the point.
 * @param {Object} attributes An object containing visual properties like in {@link JXG.Options#point} and
 * {@link JXG.Options#elements}, and optional a name and an id.
 * @see JXG.Board#generateName
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Point = function(board, coordinates, attributes) {
    this.constructor(board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POINT, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_POINT);
    this.element = this.board.select(attributes.anchor);
    this.coordsConstructor(coordinates);
    this.elType = "point";
    /* Register point at board. */ this.id = this.board.setId(this, "P");
    this.board.renderer.drawPoint(this);
    this.board.finalizeAdding(this);
    this.createGradient();
    this.createLabel();
};
/**
 * Inherits here from {@link JXG.GeometryElement}.
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Point.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyPrototypeMethods(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Point, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coordselement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], "coordsConstructor");
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Point.prototype, /** @lends JXG.Point.prototype */ {
    /**
         * Checks whether (x,y) is near the point.
         * @param {Number} x Coordinate in x direction, screen coordinates.
         * @param {Number} y Coordinate in y direction, screen coordinates.
         * @returns {Boolean} True if (x,y) is near the point, False otherwise.
         * @private
         */ hasPoint: function(x, y) {
        var coordsScr = this.coords.scrCoords, r, prec, type, unit = this.evalVisProp('sizeunit');
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isObject(this.evalVisProp('precision'))) {
            type = this.board._inputDevice;
            prec = this.evalVisProp('precision.' + type);
        } else {
            // 'inherit'
            prec = this.board.options.precision.hasPoint;
        }
        r = parseFloat(this.evalVisProp('size'));
        if (unit === "user") {
            r *= Math.sqrt(Math.abs(this.board.unitX * this.board.unitY));
        }
        r += parseFloat(this.evalVisProp('strokewidth')) * 0.5;
        if (r < prec) {
            r = prec;
        }
        return Math.abs(coordsScr[1] - x) < r + 2 && Math.abs(coordsScr[2] - y) < r + 2;
    },
    /**
         * Updates the position of the point.
         */ update: function(fromParent) {
        if (!this.needsUpdate) {
            return this;
        }
        this.updateCoords(fromParent);
        if (this.evalVisProp('trace')) {
            this.cloneToBackground(true);
        }
        return this;
    },
    /**
         * Applies the transformations of the element to {@link JXG.Point#baseElement}.
         * Point transformations are relative to a base element.
         * @param {Boolean} fromParent True if the drag comes from a child element. This is the case if a line
         *    through two points is dragged. Otherwise, the element is the drag element and we apply the
         *    the inverse transformation to the baseElement if is different from the element.
         * @returns {JXG.CoordsElement} Reference to this object.
         */ updateTransform: function(fromParent) {
        var c, i;
        if (this.transformations.length === 0 || this.baseElement === null) {
            return this;
        }
        this.transformations[0].update();
        if (this === this.baseElement) {
            // Case of bindTo
            c = this.transformations[0].apply(this, "self");
        } else {
            c = this.transformations[0].apply(this.baseElement);
        }
        for(i = 1; i < this.transformations.length; i++){
            this.transformations[i].update();
            c = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matVecMult(this.transformations[i].matrix, c);
        }
        this.coords.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, c);
        return this;
    },
    /**
         * Calls the renderer to update the drawing.
         * @private
         */ updateRenderer: function() {
        this.updateRendererGeneric("updatePoint");
        return this;
    },
    // documented in JXG.GeometryElement
    bounds: function() {
        return this.coords.usrCoords.slice(1).concat(this.coords.usrCoords.slice(1));
    },
    /**
         * Convert the point to intersection point and update the construction.
         * To move the point visual onto the intersection, a call of board update is necessary.
         *
         * @param {String|Object} el1, el2, i, j The intersecting objects and the numbers.
         **/ makeIntersection: function(el1, el2, i, j) {
        var func;
        el1 = this.board.select(el1);
        el2 = this.board.select(el2);
        func = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].intersectionFunction(this.board, el1, el2, i, j, this.visProp.alwaysintersect);
        this.addConstraint([
            func
        ]);
        try {
            el1.addChild(this);
            el2.addChild(this);
        } catch (e) {
            throw new Error("JSXGraph: Can't create 'intersection' with parent types '" + typeof el1 + "' and '" + typeof el2 + "'.");
        }
        this.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_INTERSECTION;
        this.elType = "intersection";
        this.parents = [
            el1.id,
            el2.id,
            i,
            j
        ];
        this.generatePolynomial = function() {
            var poly1 = el1.generatePolynomial(this), poly2 = el2.generatePolynomial(this);
            if (poly1.length === 0 || poly2.length === 0) {
                return [];
            }
            return [
                poly1[0],
                poly2[0]
            ];
        };
        this.prepareUpdate().update();
    },
    /**
         * Set the style of a point.
         * Used for GEONExT import and should not be used to set the point's face and size.
         * @param {Number} i Integer to determine the style.
         * @private
         */ setStyle: function(i) {
        var facemap = [
            // 0-2
            "cross",
            "cross",
            "cross",
            // 3-6
            "circle",
            "circle",
            "circle",
            "circle",
            // 7-9
            "square",
            "square",
            "square",
            // 10-12
            "plus",
            "plus",
            "plus"
        ], sizemap = [
            // 0-2
            2,
            3,
            4,
            // 3-6
            1,
            2,
            3,
            4,
            // 7-9
            2,
            3,
            4,
            // 10-12
            2,
            3,
            4
        ];
        this.visProp.face = facemap[i];
        this.visProp.size = sizemap[i];
        this.board.renderer.changePointStyle(this);
        return this;
    },
    /**
         * @deprecated Use JXG#normalizePointFace instead
         * @param s
         * @returns {*}
         */ normalizeFace: function(s) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("Point.normalizeFace()", "JXG.normalizePointFace()");
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].normalizePointFace(s);
    },
    /**
         * Set the face of a point element.
         * @param {String} f String which determines the face of the point. See {@link JXG.GeometryElement#face} for a list of available faces.
         * @see JXG.GeometryElement#face
         * @deprecated Use setAttribute()
         */ face: function(f) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("Point.face()", "Point.setAttribute()");
        this.setAttribute({
            face: f
        });
    },
    /**
         * Set the size of a point element
         * @param {Number} s Integer which determines the size of the point.
         * @see JXG.GeometryElement#size
         * @deprecated Use setAttribute()
         */ size: function(s) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("Point.size()", "Point.setAttribute()");
        this.setAttribute({
            size: s
        });
    },
    /**
         * Test if the point is on (is incident with) element "el".
         *
         * @param {JXG.GeometryElement} el
         * @param {Number} tol
         * @returns {Boolean}
         *
         * @example
         * var circ = board.create('circle', [[-2, -2], 1]);
         * var seg = board.create('segment', [[-1, -3], [0,0]]);
         * var line = board.create('line', [[1, 3], [2, -2]]);
         * var po = board.create('point', [-1, 0], {color: 'blue'});
         * var curve = board.create('functiongraph', ['sin(x)'], {strokeColor: 'blue'});
         * var pol = board.create('polygon', [[2,2], [4,2], [4,3]], {strokeColor: 'blue'});
         *
         * var point = board.create('point', [-1, 1], {
         *               attractors: [line, seg, circ, po, curve, pol],
         *               attractorDistance: 0.2
         *             });
         *
         * var txt = board.create('text', [-4, 3, function() {
         *              return 'point on line: ' + point.isOn(line) + '<br>' +
         *                 'point on seg: ' + point.isOn(seg) + '<br>' +
         *                 'point on circ = ' + point.isOn(circ) + '<br>' +
         *                 'point on point = ' + point.isOn(po) + '<br>' +
         *                 'point on curve = ' + point.isOn(curve) + '<br>' +
         *                 'point on polygon = ' + point.isOn(pol) + '<br>';
         * }]);
         *
         * </pre><div id="JXG6c7d7404-758a-44eb-802c-e9644b9fab71" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG6c7d7404-758a-44eb-802c-e9644b9fab71',
         *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
         *     var circ = board.create('circle', [[-2, -2], 1]);
         *     var seg = board.create('segment', [[-1, -3], [0,0]]);
         *     var line = board.create('line', [[1, 3], [2, -2]]);
         *     var po = board.create('point', [-1, 0], {color: 'blue'});
         *     var curve = board.create('functiongraph', ['sin(x)'], {strokeColor: 'blue'});
         *     var pol = board.create('polygon', [[2,2], [4,2], [4,3]], {strokeColor: 'blue'});
         *
         *     var point = board.create('point', [-1, 1], {
         *                   attractors: [line, seg, circ, po, curve, pol],
         *                   attractorDistance: 0.2
         *                 });
         *
         *     var txt = board.create('text', [-4, 3, function() {
         *             return 'point on line: ' + point.isOn(line) + '<br>' +
         *                     'point on seg: ' + point.isOn(seg) + '<br>' +
         *                     'point on circ = ' + point.isOn(circ) + '<br>' +
         *                     'point on point = ' + point.isOn(po) + '<br>' +
         *                     'point on curve = ' + point.isOn(curve) + '<br>' +
         *                     'point on polygon = ' + point.isOn(pol) + '<br>';
         *     }]);
         *
         *     })();
         *
         * </script><pre>
         *
         */ isOn: function(el, tol) {
        var arr, crds;
        tol = tol || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(el)) {
            return this.Dist(el) < tol;
        } else if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
            if (el.elType === "segment" && !this.evalVisProp('alwaysintersect')) {
                arr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Math.Geometry.projectCoordsToSegment(this.coords.usrCoords, el.point1.coords.usrCoords, el.point2.coords.usrCoords);
                if (arr[1] >= 0 && arr[1] <= 1 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].distPointLine(this.coords.usrCoords, el.stdform) < tol) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].distPointLine(this.coords.usrCoords, el.stdform) < tol;
            }
        } else if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CIRCLE) {
            if (el.evalVisProp('hasinnerpoints')) {
                return this.Dist(el.center) < el.Radius() + tol;
            }
            return Math.abs(this.Dist(el.center) - el.Radius()) < tol;
        } else if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE) {
            crds = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].projectPointToCurve(this, el, this.board)[0];
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].distance(this.coords.usrCoords, crds.usrCoords, 3) < tol;
        } else if (el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON) {
            if (el.evalVisProp('hasinnerpoints')) {
                if (el.pnpoly(this.coords.usrCoords[1], this.coords.usrCoords[2], __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER)) {
                    return true;
                }
            }
            arr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].projectCoordsToPolygon(this.coords.usrCoords, el);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].distance(this.coords.usrCoords, arr, 3) < tol;
        } else if (el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_TURTLE) {
            crds = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].projectPointToTurtle(this, el, this.board);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].distance(this.coords.usrCoords, crds.usrCoords, 3) < tol;
        }
        // TODO: Arc, Sector
        return false;
    },
    // Already documented in GeometryElement
    cloneToBackground: function() {
        var copy = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getCloneObject(this);
        this.board.renderer.drawPoint(copy);
        this.traces[copy.id] = copy.rendNode;
        return this;
    }
});
/**
 * @class Construct a free or a fixed point. A free point is created if the given parent elements are all numbers
 * and the property fixed is not set or set to false. If one or more parent elements is not a number but a string containing a GEONE<sub>x</sub>T
 * constraint or a function the point will be considered as constrained). That means that the user won't be able to change the point's
 * position directly.
 * @see Glider for a non-free point that is attached to another geometric element.
 * @pseudo
 * @name Point
 * @augments JXG.Point
 * @constructor
 * @type JXG.Point
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {Number,string,function_Number,string,function_Number,string,function} z_,x,y Parent elements can be two or three elements of type number, a string containing a GEONE<sub>x</sub>T
 * constraint, or a function which takes no parameter and returns a number. Every parent element determines one coordinate. If a coordinate is
 * given by a number, the number determines the initial position of a free point. If given by a string or a function that coordinate will be constrained
 * that means the user won't be able to change the point's position directly by mouse because it will be calculated automatically depending on the string
 * or the function's return value. If two parent elements are given the coordinates will be interpreted as 2D affine Euclidean coordinates, if three such
 * parent elements are given they will be interpreted as homogeneous coordinates.
 * @param {JXG.Point_JXG.Transformation_Array} Point,Transformation A point can also be created providing a transformation or an array of transformations.
 * The resulting point is a clone of the base point transformed by the given Transformation. {@see JXG.Transformation}.
 *
 * @example
 * // Create a free point using affine Euclidean coordinates
 * var p1 = board.create('point', [3.5, 2.0]);
 * </pre><div class="jxgbox" id="JXG672f1764-7dfa-4abc-a2c6-81fbbf83e44b" style="width: 200px; height: 200px;"></div>
 * <script type="text/javascript">
 *   var board = JXG.JSXGraph.initBoard('JXG672f1764-7dfa-4abc-a2c6-81fbbf83e44b', {boundingbox: [-1, 5, 5, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var p1 = board.create('point', [3.5, 2.0]);
 * </script><pre>
 * @example
 * // Create a constrained point using anonymous function
 * var p2 = board.create('point', [3.5, function () { return p1.X(); }]);
 * </pre><div class="jxgbox" id="JXG4fd4410c-3383-4e80-b1bb-961f5eeef224" style="width: 200px; height: 200px;"></div>
 * <script type="text/javascript">
 *   var fpex1_board = JXG.JSXGraph.initBoard('JXG4fd4410c-3383-4e80-b1bb-961f5eeef224', {boundingbox: [-1, 5, 5, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var fpex1_p1 = fpex1_board.create('point', [3.5, 2.0]);
 *   var fpex1_p2 = fpex1_board.create('point', [3.5, function () { return fpex1_p1.X(); }]);
 * </script><pre>
 * @example
 * // Create a point using transformations
 * var trans = board.create('transform', [2, 0.5], {type:'scale'});
 * var p3 = board.create('point', [p2, trans]);
 * </pre><div class="jxgbox" id="JXG630afdf3-0a64-46e0-8a44-f51bd197bb8d" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *   var fpex2_board = JXG.JSXGraph.initBoard('JXG630afdf3-0a64-46e0-8a44-f51bd197bb8d', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var fpex2_trans = fpex2_board.create('transform', [2, 0.5], {type:'scale'});
 *   var fpex2_p2 = fpex2_board.create('point', [3.5, 2.0]);
 *   var fpex2_p3 = fpex2_board.create('point', [fpex2_p2, fpex2_trans]);
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createPoint = function(board, parents, attributes) {
    var el, attr;
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "point");
    el = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coordselement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Point, board, parents, attr);
    if (!el) {
        throw new Error("JSXGraph: Can't create point with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [x,y], [z,x,y], [element,transformation]");
    }
    return el;
};
/**
 * @class A glider is a point bound to a line, circle or curve or even another point.
 * @pseudo
 * @description A glider is a point which lives on another geometric element like a line, circle, curve, turtle.
 * @name Glider
 * @augments JXG.Point
 * @constructor
 * @type JXG.Point
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {Number_Number_Number_JXG.GeometryElement} z_,x_,y_,GlideObject Parent elements can be two or three elements of type number and the object the glider lives on.
 * The coordinates are completely optional. If not given the origin is used. If you provide two numbers for coordinates they will be interpreted as affine Euclidean
 * coordinates, otherwise they will be interpreted as homogeneous coordinates. In any case the point will be projected on the glide object.
 * @example
 * // Create a glider with user defined coordinates. If the coordinates are not on
 * // the circle (like in this case) the point will be projected onto the circle.
 * var p1 = board.create('point', [2.0, 2.0]);
 * var c1 = board.create('circle', [p1, 2.0]);
 * var p2 = board.create('glider', [2.0, 1.5, c1]);
 * </pre><div class="jxgbox" id="JXG4f65f32f-e50a-4b50-9b7c-f6ec41652930" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *   var gpex1_board = JXG.JSXGraph.initBoard('JXG4f65f32f-e50a-4b50-9b7c-f6ec41652930', {boundingbox: [-1, 5, 5, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var gpex1_p1 = gpex1_board.create('point', [2.0, 2.0]);
 *   var gpex1_c1 = gpex1_board.create('circle', [gpex1_p1, 2.0]);
 *   var gpex1_p2 = gpex1_board.create('glider', [2.0, 1.5, gpex1_c1]);
 * </script><pre>
 * @example
 * // Create a glider with default coordinates (1,0,0). Same premises as above.
 * var p1 = board.create('point', [2.0, 2.0]);
 * var c1 = board.create('circle', [p1, 2.0]);
 * var p2 = board.create('glider', [c1]);
 * </pre><div class="jxgbox" id="JXG4de7f181-631a-44b1-a12f-bc4d995609e8" style="width: 200px; height: 200px;"></div>
 * <script type="text/javascript">
 *   var gpex2_board = JXG.JSXGraph.initBoard('JXG4de7f181-631a-44b1-a12f-bc4d995609e8', {boundingbox: [-1, 5, 5, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var gpex2_p1 = gpex2_board.create('point', [2.0, 2.0]);
 *   var gpex2_c1 = gpex2_board.create('circle', [gpex2_p1, 2.0]);
 *   var gpex2_p2 = gpex2_board.create('glider', [gpex2_c1]);
 * </script><pre>
 *@example
 * //animate example 2
 * var p1 = board.create('point', [2.0, 2.0]);
 * var c1 = board.create('circle', [p1, 2.0]);
 * var p2 = board.create('glider', [c1]);
 * var button1 = board.create('button', [1, 7, 'start animation',function(){p2.startAnimation(1,4)}]);
 * var button2 = board.create('button', [1, 5, 'stop animation',function(){p2.stopAnimation()}]);
 * </pre><div class="jxgbox" id="JXG4de7f181-631a-44b1-a12f-bc4d133709e8" style="width: 200px; height: 200px;"></div>
 * <script type="text/javascript">
 *   var gpex3_board = JXG.JSXGraph.initBoard('JXG4de7f181-631a-44b1-a12f-bc4d133709e8', {boundingbox: [-1, 10, 10, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var gpex3_p1 = gpex3_board.create('point', [2.0, 2.0]);
 *   var gpex3_c1 = gpex3_board.create('circle', [gpex3_p1, 2.0]);
 *   var gpex3_p2 = gpex3_board.create('glider', [gpex3_c1]);
 *   gpex3_board.create('button', [1, 7, 'start animation',function(){gpex3_p2.startAnimation(1,4)}]);
 *   gpex3_board.create('button', [1, 5, 'stop animation',function(){gpex3_p2.stopAnimation()}]);
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createGlider = function(board, parents, attributes) {
    var el, coords, attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "glider");
    if (parents.length === 1) {
        coords = [
            0,
            0
        ];
    } else {
        coords = parents.slice(0, 2);
    }
    el = board.create("point", coords, attr);
    // eltype is set in here
    el.makeGlider(parents[parents.length - 1]);
    return el;
};
/**
 * @class A point intersecting two 1-dimensional elements.
 * It is one point of the set  * consisting of the intersection points of the two elements.
 * The following element types can be (mutually) intersected: line, circle,
 * curve, polygon, polygonal chain.
 *
 * @pseudo
 * @name Intersection
 * @augments JXG.Point
 * @constructor
 * @type JXG.Point
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Line,JXG.Circle_JXG.Line,JXG.Circle_Number|Function} el1,el2,i The result will be a intersection point on el1 and el2. i determines the
 * intersection point if two points are available: <ul>
 *   <li>i==0: use the positive square root,</li>
 *   <li>i==1: use the negative square root.</li></ul>
 * @example
 * // Create an intersection point of circle and line
 * var p1 = board.create('point', [4.0, 4.0]);
 * var c1 = board.create('circle', [p1, 2.0]);
 *
 * var p2 = board.create('point', [1.0, 1.0]);
 * var p3 = board.create('point', [5.0, 3.0]);
 * var l1 = board.create('line', [p2, p3]);
 *
 * var i = board.create('intersection', [c1, l1, 0]);
 * </pre><div class="jxgbox" id="JXGe5b0e190-5200-4bc3-b995-b6cc53dc5dc0" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *   var ipex1_board = JXG.JSXGraph.initBoard('JXGe5b0e190-5200-4bc3-b995-b6cc53dc5dc0', {boundingbox: [-1, 7, 7, -1], axis: true, showcopyright: false, shownavigation: false});
 *   var ipex1_p1 = ipex1_board.create('point', [4.0, 4.0]);
 *   var ipex1_c1 = ipex1_board.create('circle', [ipex1_p1, 2.0]);
 *   var ipex1_p2 = ipex1_board.create('point', [1.0, 1.0]);
 *   var ipex1_p3 = ipex1_board.create('point', [5.0, 3.0]);
 *   var ipex1_l1 = ipex1_board.create('line', [ipex1_p2, ipex1_p3]);
 *   var ipex1_i = ipex1_board.create('intersection', [ipex1_c1, ipex1_l1, 0]);
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createIntersectionPoint = function(board, parents, attributes) {
    var el, el1, el2, func, i, j, attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "intersection");
    // make sure we definitely have the indices
    parents.push(0, 0);
    el1 = board.select(parents[0]);
    el2 = board.select(parents[1]);
    i = parents[2] || 0;
    j = parents[3] || 0;
    el = board.create("point", [
        0,
        0,
        0
    ], attr);
    // el.visProp.alwaysintersect is evaluated as late as in the returned function
    func = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].intersectionFunction(board, el1, el2, i, j, el.visProp.alwaysintersect);
    el.addConstraint([
        func
    ]);
    try {
        el1.addChild(el);
        el2.addChild(el);
    } catch (e) {
        throw new Error("JSXGraph: Can't create 'intersection' with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'.");
    }
    el.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_INTERSECTION;
    el.elType = "intersection";
    el.setParents([
        el1.id,
        el2.id
    ]);
    /**
     * Array of length 2 containing the numbers i and j.
     * The intersection point is i-th intersection point.
     * j is unused.
     * @type Array
     * @name intersectionNumbers
     * @memberOf Intersection
     * @private
     */ el.intersectionNumbers = [
        i,
        j
    ];
    el.getParents = function() {
        return this.parents.concat(this.intersectionNumbers);
    };
    el.generatePolynomial = function() {
        var poly1 = el1.generatePolynomial(el), poly2 = el2.generatePolynomial(el);
        if (poly1.length === 0 || poly2.length === 0) {
            return [];
        }
        return [
            poly1[0],
            poly2[0]
        ];
    };
    return el;
};
/**
 * @class Given a set of intersection points, this is another ("other") intersection point,
 * @pseudo
 * @description If two elements of type curve, circle or line intersect in more than one point, with this element it is possible
 * to construct the "other" intersection. This is a an intersection which is different from a supplied point or different from any
 * point in an array of supplied points. This might be helpful in situtations where one intersection point is already part of the construction
 * or in situtation where the order of the intersection points changes while interacting with the construction.
 *
 * @name OtherIntersection
 * @augments JXG.Point
 * @constructor
 * @type JXG.Point
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Line,JXG.Circle_JXG.Line,JXG.Circle_JXG.Point,Array} el1,el2,p Two elements which are intersected and a point or an array of points
 * which have to be different from the new intersection point.
 *
 * @example
 * // Create an intersection point of circle and line
 * var p1 = board.create('point', [2.0, 2.0]);
 * var c1 = board.create('circle', [p1, 2.0]);
 *
 * var p2 = board.create('point', [2.0, 2.0]);
 * var p3 = board.create('point', [2.0, 2.0]);
 * var l1 = board.create('line', [p2, p3]);
 *
 * var p1 = board.create('intersection', [c1, l1, 0]);
 * var p2 = board.create('otherintersection', [c1, l1, p1]);
 * </pre><div class="jxgbox" id="JXG45e25f12-a1de-4257-a466-27a2ae73614c" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *   var ipex2_board = JXG.JSXGraph.initBoard('JXG45e25f12-a1de-4257-a466-27a2ae73614c', {boundingbox: [-1, 7, 7, -1], axis: false, showcopyright: false, shownavigation: false});
 *   var ipex2_p1 = ipex2_board.create('point', [4.0, 4.0]);
 *   var ipex2_c1 = ipex2_board.create('circle', [ipex2_p1, 2.0]);
 *   var ipex2_p2 = ipex2_board.create('point', [1.0, 1.0]);
 *   var ipex2_p3 = ipex2_board.create('point', [5.0, 3.0]);
 *   var ipex2_l1 = ipex2_board.create('line', [ipex2_p2, ipex2_p3]);
 *   var ipex2_i = ipex2_board.create('intersection', [ipex2_c1, ipex2_l1, 0], {name:'D'});
 *   var ipex2_j = ipex2_board.create('otherintersection', [ipex2_c1, ipex2_l1, ipex2_i], {name:'E'});
 * </script><pre>
 *
 * @example
 *  // circle / circle
 *  var c1 = board.create('circle', [[0, 0], 3]);
 *  var c2 = board.create('circle', [[2, 2], 3]);
 *
 *  var p1 = board.create('intersection', [c1, c2, 0]);
 *  var p2 = board.create('otherintersection', [c1, c2, p1]);
 *
 * </pre><div id="JXGdb5c974c-3092-4cdf-b5ef-d0af4a912581" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGdb5c974c-3092-4cdf-b5ef-d0af4a912581',
 *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
 *           var c1 = board.create('circle', [[0, 0], 3]);
 *           var c2 = board.create('circle', [[2, 2], 3]);
 *
 *           var p1 = board.create('intersection', [c1, c2, 0]);
 *           var p2 = board.create('otherintersection', [c1, c2, p1]);
 *     })();
 * </script><pre>
 *
 * @example
 *  // curve / line
 *  var curve = board.create('implicitcurve', ['-(y**2) + x**3 - 2 * x + 1'], { strokeWidth: 2 });
 *  var A = board.create('glider', [-1.5, 1, curve]);
 *  var B = board.create('glider', [0.5, 0.5, curve]);
 *  var line = board.create('line', [A, B], { color: 'black', strokeWidth: 1 });
 *  var C = board.create('otherintersection', [curve, line, [A, B]], {precision: 0.01});
 *  var D = board.create('point', [() => C.X(), () => -C.Y()], { name: '-C = A + B' });
 *
 * </pre><div id="JXG033f15b0-f5f1-4003-ab6a-b7e13e867fbd" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG033f15b0-f5f1-4003-ab6a-b7e13e867fbd',
 *             {boundingbox: [-2, 2, 2, -2], axis: false, showcopyright: false, shownavigation: false});
 *           var curve = board.create('implicitcurve', ['-(y**2) + x**3 - 2 * x + 1'], { strokeWidth: 2 });
 *           var A = board.create('glider', [-1.5, 1, curve]);
 *           var B = board.create('glider', [0.5, 0.5, curve]);
 *           var line = board.create('line', [A, B], { color: 'black', strokeWidth: 1 });
 *           var C = board.create('otherintersection', [curve, line, [A, B]], {precision: 0.01});
 *           var D = board.create('point', [() => C.X(), () => -C.Y()], { name: '-C = A + B' });
 *     })();
 * </script><pre>
 *
 * @example
 *  // curve / curve
 *  var c1 = board.create('functiongraph', ['x**2 - 3'], { strokeWidth: 2 });
 *  var A = board.create('point', [0, 2]);
 *  var c2 = board.create('functiongraph', [(x) => -(x**2) + 2 * A.X() * x + A.Y() - A.X()**2], { strokeWidth: 2 });
 *  var p1 = board.create('intersection', [c1, c2]);
 *  var p2 = board.create('otherintersection', [c1, c2, [p1]]);
 *
 * </pre><div id="JXG29359aa9-3066-4f45-9e5d-d74201b991d3" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG29359aa9-3066-4f45-9e5d-d74201b991d3',
 *             {boundingbox: [-5, 5, 5, -5], axis: true, showcopyright: false, shownavigation: false});
 *           var c1 = board.create('functiongraph', ['x**2 - 3'], { strokeWidth: 2 });
 *           var A = board.create('point', [0, 2]);
 *           var c2 = board.create('functiongraph', [(x) => -(x**2) + 2 * A.X() * x + A.Y() - A.X()**2], { strokeWidth: 2 });
 *           var p1 = board.create('intersection', [c1, c2]);
 *           var p2 = board.create('otherintersection', [c1, c2, [p1]]);
 *     })();
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createOtherIntersectionPoint = function(board, parents, attributes) {
    var el, el1, el2, i, others, func, input, isGood = true, attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'otherintersection');
    if (parents.length !== 3) {
        isGood = false;
    } else {
        el1 = board.select(parents[0]);
        el2 = board.select(parents[1]);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(parents[2])) {
            others = parents[2];
        } else {
            others = [
                parents[2]
            ];
        }
        for(i = 0; i < others.length; i++){
            others[i] = board.select(others[i]);
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(others[i])) {
                isGood = false;
                break;
            }
        }
        if (isGood) {
            input = [
                el1,
                el2
            ];
            // Sort parent elements in order: curve, circle, line
            input.sort(function(a, b) {
                return b.elementClass - a.elementClass;
            });
            // Two lines are forbidden:
            if ([
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CIRCLE,
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE
            ].indexOf(input[0].elementClass) < 0) {
                isGood = false;
            } else if ([
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CIRCLE,
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE,
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE
            ].indexOf(input[1].elementClass) < 0) {
                isGood = false;
            }
        }
    }
    if (!isGood) {
        throw new Error("JSXGraph: Can't create 'other intersection point' with parent types '" + typeof parents[0] + "',  '" + typeof parents[1] + "'and  '" + typeof parents[2] + "'." + "\nPossible parent types: [circle|curve|line,circle|curve|line, point], not two lines");
    }
    el = board.create('point', [
        0,
        0,
        0
    ], attr);
    // el.visProp.alwaysintersect is evaluated as late as in the returned function
    func = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].otherIntersectionFunction(input, others, el.visProp.alwaysintersect, el.visProp.precision);
    el.addConstraint([
        func
    ]);
    el.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_INTERSECTION;
    el.elType = "otherintersection";
    el.setParents([
        el1.id,
        el2.id
    ]);
    el.addParents(others);
    el1.addChild(el);
    el2.addChild(el);
    if (el1.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CIRCLE) {
        // circle, circle|line
        el.generatePolynomial = function() {
            var poly1 = el1.generatePolynomial(el), poly2 = el2.generatePolynomial(el);
            if (poly1.length === 0 || poly2.length === 0) {
                return [];
            }
            return [
                poly1[0],
                poly2[0]
            ];
        };
    }
    return el;
};
/**
 * @class This element is used to provide a constructor for the pole point of a line with respect to a conic or a circle.
 * @pseudo
 * @description The pole point is the unique reciprocal relationship of a line with respect to a conic.
 * The lines tangent to the intersections of a conic and a line intersect at the pole point of that line with respect to that conic.
 * A line tangent to a conic has the pole point of that line with respect to that conic as the tangent point.
 * See {@link https://en.wikipedia.org/wiki/Pole_and_polar} for more information on pole and polar.
 * @name PolePoint
 * @augments JXG.Point
 * @constructor
 * @type JXG.Point
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Conic,JXG.Circle_JXG.Point} el1,el2 or
 * @param {JXG.Point_JXG.Conic,JXG.Circle} el1,el2 The result will be the pole point of the line with respect to the conic or the circle.
 * @example
 * // Create the pole point of a line with respect to a conic
 * var p1 = board.create('point', [-1, 2]);
 * var p2 = board.create('point', [ 1, 4]);
 * var p3 = board.create('point', [-1,-2]);
 * var p4 = board.create('point', [ 0, 0]);
 * var p5 = board.create('point', [ 4,-2]);
 * var c1 = board.create('conic',[p1,p2,p3,p4,p5]);
 * var p6 = board.create('point', [-1, 4]);
 * var p7 = board.create('point', [2, -2]);
 * var l1 = board.create('line', [p6, p7]);
 * var p8 = board.create('polepoint', [c1, l1]);
 * </pre><div class="jxgbox" id="JXG7b7233a0-f363-47dd-9df5-8018d0d17a98" class="jxgbox" style="width:400px; height:400px;"></div>
 * <script type='text/javascript'>
 * var ppex1_board = JXG.JSXGraph.initBoard('JXG7b7233a0-f363-47dd-9df5-8018d0d17a98', {boundingbox: [-3, 5, 5, -3], axis: true, showcopyright: false, shownavigation: false});
 * var ppex1_p1 = ppex1_board.create('point', [-1, 2]);
 * var ppex1_p2 = ppex1_board.create('point', [ 1, 4]);
 * var ppex1_p3 = ppex1_board.create('point', [-1,-2]);
 * var ppex1_p4 = ppex1_board.create('point', [ 0, 0]);
 * var ppex1_p5 = ppex1_board.create('point', [ 4,-2]);
 * var ppex1_c1 = ppex1_board.create('conic',[ppex1_p1,ppex1_p2,ppex1_p3,ppex1_p4,ppex1_p5]);
 * var ppex1_p6 = ppex1_board.create('point', [-1, 4]);
 * var ppex1_p7 = ppex1_board.create('point', [2, -2]);
 * var ppex1_l1 = ppex1_board.create('line', [ppex1_p6, ppex1_p7]);
 * var ppex1_p8 = ppex1_board.create('polepoint', [ppex1_c1, ppex1_l1]);
 * </script><pre>
 * @example
 * // Create the pole point of a line with respect to a circle
 * var p1 = board.create('point', [1, 1]);
 * var p2 = board.create('point', [2, 3]);
 * var c1 = board.create('circle',[p1,p2]);
 * var p3 = board.create('point', [-1, 4]);
 * var p4 = board.create('point', [4, -1]);
 * var l1 = board.create('line', [p3, p4]);
 * var p5 = board.create('polepoint', [c1, l1]);
 * </pre><div class="jxgbox" id="JXG7b7233a0-f363-47dd-9df5-9018d0d17a98" class="jxgbox" style="width:400px; height:400px;"></div>
 * <script type='text/javascript'>
 * var ppex2_board = JXG.JSXGraph.initBoard('JXG7b7233a0-f363-47dd-9df5-9018d0d17a98', {boundingbox: [-3, 7, 7, -3], axis: true, showcopyright: false, shownavigation: false});
 * var ppex2_p1 = ppex2_board.create('point', [1, 1]);
 * var ppex2_p2 = ppex2_board.create('point', [2, 3]);
 * var ppex2_c1 = ppex2_board.create('circle',[ppex2_p1,ppex2_p2]);
 * var ppex2_p3 = ppex2_board.create('point', [-1, 4]);
 * var ppex2_p4 = ppex2_board.create('point', [4, -1]);
 * var ppex2_l1 = ppex2_board.create('line', [ppex2_p3, ppex2_p4]);
 * var ppex2_p5 = ppex2_board.create('polepoint', [ppex2_c1, ppex2_l1]);
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createPolePoint = function(board, parents, attributes) {
    var el, el1, el2, firstParentIsConic, secondParentIsConic, firstParentIsLine, secondParentIsLine;
    if (parents.length > 1) {
        firstParentIsConic = parents[0].type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_CONIC || parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CIRCLE;
        secondParentIsConic = parents[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_CONIC || parents[1].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CIRCLE;
        firstParentIsLine = parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE;
        secondParentIsLine = parents[1].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE;
    }
    /*        if (parents.length !== 2 || !((
                parents[0].type === Const.OBJECT_TYPE_CONIC ||
                parents[0].elementClass === Const.OBJECT_CLASS_CIRCLE) &&
                parents[1].elementClass === Const.OBJECT_CLASS_LINE ||
                parents[0].elementClass === Const.OBJECT_CLASS_LINE && (
                parents[1].type === Const.OBJECT_TYPE_CONIC ||
                parents[1].elementClass === Const.OBJECT_CLASS_CIRCLE))) {*/ if (parents.length !== 2 || !(firstParentIsConic && secondParentIsLine || firstParentIsLine && secondParentIsConic)) {
        // Failure
        throw new Error("JSXGraph: Can't create 'pole point' with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent type: [conic|circle,line], [line,conic|circle]");
    }
    if (secondParentIsLine) {
        el1 = board.select(parents[0]);
        el2 = board.select(parents[1]);
    } else {
        el1 = board.select(parents[1]);
        el2 = board.select(parents[0]);
    }
    el = board.create("point", [
        function() {
            var q = el1.quadraticform, s = el2.stdform.slice(0, 3);
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Math.Numerics.det([
                    s,
                    q[1],
                    q[2]
                ]),
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Math.Numerics.det([
                    q[0],
                    s,
                    q[2]
                ]),
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Math.Numerics.det([
                    q[0],
                    q[1],
                    s
                ])
            ];
        }
    ], attributes);
    el.elType = "polepoint";
    el.setParents([
        el1.id,
        el2.id
    ]);
    el1.addChild(el);
    el2.addChild(el);
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("point", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createPoint);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("glider", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createGlider);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("intersection", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createIntersectionPoint);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("otherintersection", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createOtherIntersectionPoint);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("polepoint", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createPolePoint);
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Point;
 // export default {
 //     Point: JXG.Point,
 //     createPoint: JXG.createPoint,
 //     createGlider: JXG.createGlider,
 //     createIntersection: JXG.createIntersectionPoint,
 //     createOtherIntersection: JXG.createOtherIntersectionPoint,
 //     createPolePoint: JXG.createPolePoint
 // };
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/group.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 * @fileoverview In this file the class Group is defined, a class for
 * managing grouping of points.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
;
;
;
;
;
/**
 * Creates a new instance of Group.
 * @class In this class all group management is done.
 * @param {JXG.Board} board
 * @param {String} id Unique identifier for this object.  If null or an empty string is given,
 * an unique id will be generated by Board
 * @param {String} name Not necessarily unique name, displayed on the board.  If null or an
 * empty string is given, an unique name will be generated.
 * @param {Array} objects Array of points to add to this group.
 * @param {Object} attributes Defines the visual appearance of the group.
 * @constructor
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Group = function(board, id, name, objects, attributes) {
    var number, objArray, i, obj;
    this.board = board;
    this.objects = {};
    number = this.board.numObjects;
    this.board.numObjects += 1;
    if (id === "" || !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(id)) {
        this.id = this.board.id + "Group" + number;
    } else {
        this.id = id;
    }
    this.board.groups[this.id] = this;
    this.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POINT;
    this.elementClass = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_POINT;
    if (name === "" || !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(name)) {
        this.name = "group_" + this.board.generateName(this);
    } else {
        this.name = name;
    }
    delete this.type;
    /**
     * Cache coordinates of points. From this and the actual position
     * of the points, the translation is determined.
     * It has to be kept updated in this class "by hand"-
     *
     * @private
     * @type Object
     * @see JXG.Group#_updateCoordsCache
     */ this.coords = {};
    this.needsRegularUpdate = attributes.needsregularupdate;
    this.rotationCenter = "centroid";
    this.scaleCenter = null;
    this.rotationPoints = [];
    this.translationPoints = [];
    this.scalePoints = [];
    this.scaleDirections = {};
    this.parents = [];
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(objects)) {
        objArray = objects;
    } else {
        objArray = Array.prototype.slice.call(arguments, 3);
    }
    for(i = 0; i < objArray.length; i++){
        obj = this.board.select(objArray[i]);
        if (!obj.evalVisProp('fixed') && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj.coords)) {
            this.addPoint(obj);
        }
    }
    this.methodMap = {
        ungroup: "ungroup",
        add: "addPoint",
        addPoint: "addPoint",
        addPoints: "addPoints",
        addGroup: "addGroup",
        remove: "removePoint",
        removePoint: "removePoint",
        setAttribute: "setAttribute",
        setProperty: "setAttribute"
    };
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Group.prototype, /** @lends JXG.Group.prototype */ {
    /**
         * Releases all elements of this group.
         * @returns {JXG.Group} returns this (empty) group
         */ ungroup: function() {
        var el, p, i;
        for(el in this.objects){
            if (this.objects.hasOwnProperty(el)) {
                p = this.objects[el].point;
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(p.groups)) {
                    i = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].indexOf(p.groups, this.id);
                    if (i >= 0) {
                        delete p.groups[i];
                    }
                }
            }
        }
        this.objects = {};
        return this;
    },
    /**
         * Adds ids of elements to the array this.parents. This is a copy
         * of {@link Element.addParents}.
         * @param {Array} parents Array of elements or ids of elements.
         * Alternatively, one can give a list of objects as parameters.
         * @returns {JXG.Object} reference to the object itself.
         **/ addParents: function(parents) {
        var i, len, par;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(parents)) {
            par = parents;
        } else {
            par = arguments;
        }
        len = par.length;
        for(i = 0; i < len; ++i){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isId(this.board, par[i])) {
                this.parents.push(par[i]);
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(par[i].id)) {
                this.parents.push(par[i].id);
            }
        }
        this.parents = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].uniqueArray(this.parents);
    },
    /**
         * Sets ids of elements to the array this.parents. This is a copy
         * of {@link Element.setParents}
         * First, this.parents is cleared. See {@link Group#addParents}.
         * @param {Array} parents Array of elements or ids of elements.
         * Alternatively, one can give a list of objects as parameters.
         * @returns {JXG.Object} reference to the object itself.
         **/ setParents: function(parents) {
        this.parents = [];
        this.addParents(parents);
        return this;
    },
    /**
         * List of the element ids resp. values used as parents in {@link JXG.Board#create}.
         * @returns {Array}
         */ getParents: function() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(this.parents) ? this.parents : [];
    },
    /**
         * Update the cached coordinates of a group element.
         * @param  {String} el element id of the group element whose cached coordinates
         * are going to be updated.
         * @return null
         */ _updateCoordsCache: function(el) {
        var obj;
        if (el !== "" && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.objects[el])) {
            obj = this.objects[el].point;
            this.coords[obj.id] = {
                usrCoords: obj.coords.usrCoords.slice(0)
            };
        }
    },
    /**
         * Sends an update to all group members.
         * This method is called from the points' coords object event listeners
         * and not by the board.
         * @returns {JXG.Group} returns this group
         */ update: function() {
        var i, drag, el, actionCenter, desc, s, sx, sy, alpha, t, T, center, obj = null;
        if (!this.needsUpdate) {
            return this;
        }
        drag = this._update_find_drag_type();
        if (drag.action === "nothing") {
            this._updateCoordsCache(drag.id);
            return this;
        }
        obj = this.objects[drag.id].point;
        // Prepare translation, scaling or rotation.
        // Scaling and rotation is handled by transformations for all elements.
        // Translation is handled by direct coordinate manipulation for points.
        // For images and texts, all translation, scaling and rotation is
        // done by binding a transformation to the element.
        if (drag.action === "translation") {
            t = [
                obj.coords.usrCoords[1] - this.coords[drag.id].usrCoords[1],
                obj.coords.usrCoords[2] - this.coords[drag.id].usrCoords[2]
            ];
            if (obj.elementClass !== __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_POINT) {
                // For images and texts we have to update the drag direction
                // by reapplying all transformations.
                t.unshift(0);
                for(i = 0; i < obj.transformations.length; i++){
                    t = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matVecMult(obj.transformations[i].matrix, t);
                }
                t.shift();
            }
            // For images and texts
            T = this.board.create("transform", t, {
                type: "translate"
            });
            T.update();
        } else if (drag.action === "rotation" || drag.action === "scaling") {
            if (drag.action === "rotation") {
                actionCenter = "rotationCenter";
            } else {
                actionCenter = "scaleCenter";
            }
            // if (Type.isPoint(this.board, this[actionCenter])) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this[actionCenter].coords)) {
                center = this[actionCenter].coords.usrCoords.slice(1);
            } else if (this[actionCenter] === "centroid") {
                center = this._update_centroid_center();
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(this[actionCenter])) {
                center = this[actionCenter];
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(this[actionCenter])) {
                center = this[actionCenter]();
            } else {
                // No valid center for this transformation, get out of here.
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug('Group.update: No valid center for this transformation, get out of here.');
                return this;
            }
            if (drag.action === "rotation") {
                alpha = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rad(this.coords[drag.id].usrCoords.slice(1), center, this.objects[drag.id].point);
                t = this.board.create("transform", [
                    alpha,
                    center[0],
                    center[1]
                ], {
                    type: "rotate"
                });
                t.update(); // t.update initializes t.matrix, which is needed if the action element is the first group element.
            } else if (drag.action === "scaling") {
                s = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].distance(this.coords[drag.id].usrCoords.slice(1), center);
                if (Math.abs(s) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps) {
                    return this;
                }
                s = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].distance(obj.coords.usrCoords.slice(1), center) / s;
                sx = this.scaleDirections[drag.id].indexOf("x") >= 0 ? s : 1.0;
                sy = this.scaleDirections[drag.id].indexOf("y") >= 0 ? s : 1.0;
                // Shift scale center to origin, scale and shift the scale center back.
                t = this.board.create("transform", [
                    1,
                    0,
                    0,
                    center[0] * (1 - sx),
                    sx,
                    0,
                    center[1] * (1 - sy),
                    0,
                    sy
                ], {
                    type: "generic"
                });
                t.update(); // This initializes t.matrix, which is needed if the action element is the first group element.
            } else {
                // This should not be reached
                return this;
            }
        }
        // Bind the transformation to any images and texts
        for(el in this.objects){
            obj = this.objects[el].point;
            if (obj.elementClass !== __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_POINT) {
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(t.board)) {
                    // t itself is a transformation
                    t.meltTo(obj);
                } else {
                    // Drag element is a point, therefore
                    // t is an array and we have to use the transformation T.
                    if (drag.id !== obj.id) {
                        T.meltTo(obj);
                    }
                }
            }
        }
        this._update_apply_transformation(drag, t);
        this.needsUpdate = false; // This is needed here to prevent infinite recursion because
        // of the board.updateElements call below,
        // Prepare dependent objects for update
        for(el in this.objects){
            if (this.objects.hasOwnProperty(el)) {
                for(desc in this.objects[el].descendants){
                    if (this.objects[el].descendants.hasOwnProperty(desc)) {
                        this.objects[el].descendants.needsUpdate = this.objects[el].descendants.needsRegularUpdate || this.board.needsFullUpdate;
                    }
                }
            }
        }
        this.board.updateElements(drag);
        // Now, all group elements have their new position and
        // we can update the bookkeeping of the coordinates of the group elements.
        for(el in this.objects){
            if (this.objects.hasOwnProperty(el)) {
                this._updateCoordsCache(el);
            }
        }
        return this;
    },
    /**
         * @private
        */ //  Determine what the dragging of a group element should do:
    //  rotation, translation, scaling or nothing.
    _update_find_drag_type: function() {
        var el, obj, action = "nothing", changed = [], dragObjId;
        // Determine how many elements have changed their position
        // If more than one element changed its position, it is a translation.
        // If exactly one element changed its position we have to find the type of the point.
        for(el in this.objects){
            if (this.objects.hasOwnProperty(el)) {
                obj = this.objects[el].point;
                if (obj.coords.distance(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, this.coords[el]) > __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps) {
                    changed.push(obj.id);
                }
            }
        }
        // Determine type of action: translation, scaling or rotation
        if (changed.length === 0) {
            return {
                action: action,
                id: "",
                changed: changed
            };
        }
        dragObjId = changed[0];
        obj = this.objects[dragObjId].point;
        if (changed.length > 1) {
            // More than one point moved => translation
            action = "translation";
        } else {
            // One point moved => we have to determine the type
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isInArray(this.rotationPoints, obj) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.rotationCenter)) {
                action = "rotation";
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isInArray(this.scalePoints, obj) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.scaleCenter)) {
                action = "scaling";
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isInArray(this.translationPoints, obj)) {
                action = "translation";
            }
        }
        return {
            action: action,
            id: dragObjId,
            changed: changed
        };
    },
    /**
         * Determine the Euclidean (affine) coordinates of the centroid of the group.
         * @private
         * @returns {Array} array of length two,
        */ _update_centroid_center: function() {
        var center, len, el;
        center = [
            0,
            0
        ];
        len = 0;
        for(el in this.coords){
            if (this.coords.hasOwnProperty(el)) {
                center[0] += this.coords[el].usrCoords[1];
                center[1] += this.coords[el].usrCoords[2];
                ++len;
            }
        }
        if (len > 0) {
            center[0] /= len;
            center[1] /= len;
        }
        return center;
    },
    /**
         * @private
        */ // Apply the transformation to all elements of the group
    _update_apply_transformation: function(drag, t) {
        var el, obj;
        for(el in this.objects){
            if (this.objects.hasOwnProperty(el)) {
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.board.objects[el])) {
                    obj = this.objects[el].point;
                    // Here, it is important that we change the position
                    // of elements by using setCoordinates.
                    // Thus, we avoid the call of snapToGrid().
                    // This is done in the subsequent call of board.updateElements()
                    // in Group.update() above.
                    if (obj.id !== drag.id) {
                        if (drag.action === "translation") {
                            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isInArray(drag.changed, obj.id)) {
                                if (obj.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_POINT) {
                                    obj.coords.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                                        this.coords[el].usrCoords[1] + t[0],
                                        this.coords[el].usrCoords[2] + t[1]
                                    ]);
                                }
                            }
                        } else if (drag.action === "rotation" || drag.action === "scaling") {
                            if (obj.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_POINT) {
                                t.applyOnce([
                                    obj
                                ]);
                            }
                        }
                    } else {
                        if (drag.action === "rotation" || drag.action === "scaling") {
                            obj.coords.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matVecMult(t.matrix, this.coords[obj.id].usrCoords));
                        }
                    }
                } else {
                    delete this.objects[el];
                }
            }
        }
    },
    /**
         * Adds an Point to this group.
         * @param {JXG.Point} object The point added to the group.
         * @returns {JXG.Group} returns this group
         */ addPoint: function(object) {
        this.objects[object.id] = {
            point: this.board.select(object)
        };
        this._updateCoordsCache(object.id);
        this.translationPoints.push(object);
        object.groups.push(this.id);
        object.groups = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].uniqueArray(object.groups);
        return this;
    },
    /**
         * Adds multiple points to this group.
         * @param {Array} objects An array of points to add to the group.
         * @returns {JXG.Group} returns this group
         */ addPoints: function(objects) {
        var p;
        for(p = 0; p < objects.length; p++){
            this.addPoint(objects[p]);
        }
        return this;
    },
    /**
         * Adds all points in a group to this group.
         * @param {JXG.Group} group The group added to this group.
         * @returns {JXG.Group} returns this group
         */ addGroup: function(group) {
        var el;
        for(el in group.objects){
            if (group.objects.hasOwnProperty(el)) {
                this.addPoint(group.objects[el].point);
            }
        }
        return this;
    },
    /**
         * Removes a point from the group.
         * @param {JXG.Point} point
         * @returns {JXG.Group} returns this group
         */ removePoint: function(point) {
        delete this.objects[point.id];
        return this;
    },
    /**
         * Sets the center of rotation for the group. This is either a point or the centroid of the group.
         * @param {JXG.Point|String|Array|Function} object A point which will be the center of rotation, the string "centroid", or
         * an array of length two, or a function returning an array of length two.
         * @default 'centroid'
         * @returns {JXG.Group} returns this group
         */ setRotationCenter: function(object) {
        this.rotationCenter = object;
        return this;
    },
    /**
         * Sets the rotation points of the group. Dragging at one of these points results into a rotation of the whole group around
         * the rotation center of the group {@see JXG.Group#setRotationCenter}.
         * @param {Array|JXG.Point} objects Array of {@link JXG.Point} or arbitrary number of {@link JXG.Point} elements.
         * @returns {JXG.Group} returns this group
         */ setRotationPoints: function(objects) {
        return this._setActionPoints("rotation", objects);
    },
    /**
         * Adds a point to the set of rotation points of the group. Dragging at one of these points results into a rotation of the whole group around
         * the rotation center of the group {@see JXG.Group#setRotationCenter}.
         * @param {JXG.Point} point {@link JXG.Point} element.
         * @returns {JXG.Group} returns this group
         */ addRotationPoint: function(point) {
        return this._addActionPoint("rotation", point);
    },
    /**
         * Removes the rotation property from a point of the group.
         * @param {JXG.Point} point {@link JXG.Point} element.
         * @returns {JXG.Group} returns this group
         */ removeRotationPoint: function(point) {
        return this._removeActionPoint("rotation", point);
    },
    /**
         * Sets the translation points of the group. Dragging at one of these points results into a translation of the whole group.
         * @param {Array|JXG.Point} objects Array of {@link JXG.Point} or arbitrary number of {@link JXG.Point} elements.
         *
         * By default, all points of the group are translation points.
         * @returns {JXG.Group} returns this group
         */ setTranslationPoints: function(objects) {
        return this._setActionPoints("translation", objects);
    },
    /**
         * Adds a point to the set of the translation points of the group.
         * Dragging one of these points results into a translation of the whole group.
         * @param {JXG.Point} point {@link JXG.Point} element.
         * @returns {JXG.Group} returns this group
         */ addTranslationPoint: function(point) {
        return this._addActionPoint("translation", point);
    },
    /**
         * Removes the translation property from a point of the group.
         * @param {JXG.Point} point {@link JXG.Point} element.
         * @returns {JXG.Group} returns this group
         */ removeTranslationPoint: function(point) {
        return this._removeActionPoint("translation", point);
    },
    /**
         * Sets the center of scaling for the group. This is either a point or the centroid of the group.
         * @param {JXG.Point|String} object A point which will be the center of scaling, the string "centroid", or
         * an array of length two, or a function returning an array of length two.
         * @returns {JXG.Group} returns this group
         */ setScaleCenter: function(object) {
        this.scaleCenter = object;
        return this;
    },
    /**
         * Sets the scale points of the group. Dragging at one of these points results into a scaling of the whole group.
         * @param {Array|JXG.Point} objects Array of {@link JXG.Point} or arbitrary number of {@link JXG.Point} elements.
         * @param {String} direction Restricts the directions to be scaled. Possible values are 'x', 'y', 'xy'. Default value is 'xy'.
         *
         * By default, all points of the group are translation points.
         * @returns {JXG.Group} returns this group
         */ setScalePoints: function(objects, direction) {
        var objs, i, len;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(objects)) {
            objs = objects;
        } else {
            objs = arguments;
        }
        len = objs.length;
        for(i = 0; i < len; ++i){
            this.scaleDirections[this.board.select(objs[i]).id] = direction || "xy";
        }
        return this._setActionPoints("scale", objects);
    },
    /**
         * Adds a point to the set of the scale points of the group. Dragging at one of these points results into a scaling of the whole group.
         * @param {JXG.Point} point {@link JXG.Point} element.
         * @param {String} direction Restricts the directions to be scaled. Possible values are 'x', 'y', 'xy'. Default value is 'xy'.
         * @returns {JXG.Group} returns this group
         */ addScalePoint: function(point, direction) {
        this._addActionPoint("scale", point);
        this.scaleDirections[this.board.select(point).id] = direction || "xy";
        return this;
    },
    /**
         * Removes the scaling property from a point of the group.
         * @param {JXG.Point} point {@link JXG.Point} element.
         * @returns {JXG.Group} returns this group
         */ removeScalePoint: function(point) {
        return this._removeActionPoint("scale", point);
    },
    /**
         * Generic method for {@link JXG.Group@setTranslationPoints} and {@link JXG.Group@setRotationPoints}
         * @private
         */ _setActionPoints: function(action, objects) {
        var objs, i, len;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(objects)) {
            objs = objects;
        } else {
            objs = arguments;
        }
        len = objs.length;
        this[action + "Points"] = [];
        for(i = 0; i < len; ++i){
            this._addActionPoint(action, objs[i]);
        }
        return this;
    },
    /**
         * Generic method for {@link JXG.Group@addTranslationPoint} and {@link JXG.Group@addRotationPoint}
         * @private
         */ _addActionPoint: function(action, point) {
        this[action + "Points"].push(this.board.select(point));
        return this;
    },
    /**
         * Generic method for {@link JXG.Group@removeTranslationPoint} and {@link JXG.Group@removeRotationPoint}
         * @private
         */ _removeActionPoint: function(action, point) {
        var idx = this[action + "Points"].indexOf(this.board.select(point));
        if (idx > -1) {
            this[action + "Points"].splice(idx, 1);
        }
        return this;
    },
    /**
         * @deprecated
         * Use setAttribute
         */ setProperty: function() {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("Group.setProperty", "Group.setAttribute()");
        this.setAttribute.apply(this, arguments);
    },
    setAttribute: function() {
        var el;
        for(el in this.objects){
            if (this.objects.hasOwnProperty(el)) {
                this.objects[el].point.setAttribute.apply(this.objects[el].point, arguments);
            }
        }
        return this;
    }
});
/**
 * @class A container element to control the movement of given set of point, image or text elements simultaneously.
 * The elements of the group and dependent elements can be translated, rotated and scaled by
 * dragging one of the group elements.
 *
 * @pseudo
 * @name Group
 * @augments JXG.Group
 * @constructor
 * @type JXG.Group
 * @param {JXG.Board} board The board the points are on.
 * @param {Array} parents Array of points to group.
 * @param {Object} attributes Visual properties (unused).
 * @returns {JXG.Group}
 *
 * @example
 *
 *  // Create some free points. e.g. A, B, C, D
 *  // Create a group
 *
 *  var p, col, g;
 *  col = 'blue';
 *  p = [];
 *  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[2, 1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[-2, 1], {size: 5, strokeColor:col, fillColor:col}));
 *  g = board.create('group', p);
 *
 * </pre><div class="jxgbox" id="JXGa2204533-db91-4af9-b720-70394de4d367" style="width: 400px; height: 300px;"></div>
 * <script type="text/javascript">
 *  (function () {
 *  var board, p, col, g;
 *  board = JXG.JSXGraph.initBoard('JXGa2204533-db91-4af9-b720-70394de4d367', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true, showcopyright: false});
 *  col = 'blue';
 *  p = [];
 *  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[2, 1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[-2, 1], {size: 5, strokeColor:col, fillColor:col}));
 *  g = board.create('group', p);
 *  })();
 * </script><pre>
 *
 *
 * @example
 *
 *  // Create some free points. e.g. A, B, C, D
 *  // Create a group
 *  // If the points define a polygon and the polygon has the attribute hasInnerPoints:true,
 *  // the polygon can be dragged around.
 *
 *  var p, col, pol, g;
 *  col = 'blue';
 *  p = [];
 *  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[2, 1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[-2, 1], {size: 5, strokeColor:col, fillColor:col}));
 *
 *  pol = board.create('polygon', p, {hasInnerPoints: true});
 *  g = board.create('group', p);
 *
 * </pre><div class="jxgbox" id="JXG781b5564-a671-4327-81c6-de915c8f924e" style="width: 400px; height: 300px;"></div>
 * <script type="text/javascript">
 *  (function () {
 *  var board, p, col, pol, g;
 *  board = JXG.JSXGraph.initBoard('JXG781b5564-a671-4327-81c6-de915c8f924e', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true, showcopyright: false});
 *  col = 'blue';
 *  p = [];
 *  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[2, 1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[-2, 1], {size: 5, strokeColor:col, fillColor:col}));
 *  pol = board.create('polygon', p, {hasInnerPoints: true});
 *  g = board.create('group', p);
 *  })();
 * </script><pre>
 *
 *  @example
 *
 *  // Allow rotations:
 *  // Define a center of rotation and declare points of the group as "rotation points".
 *
 *  var p, col, pol, g;
 *  col = 'blue';
 *  p = [];
 *  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[2, -1 ], {size: 5, strokeColor:'red', fillColor:'red'}));
 *  p.push(board.create('point',[2, 1 ], {size: 5, strokeColor:'red', fillColor:'red'}));
 *  p.push(board.create('point',[-2, 1], {size: 5, strokeColor:col, fillColor:col}));
 *
 *  pol = board.create('polygon', p, {hasInnerPoints: true});
 *  g = board.create('group', p);
 *  g.setRotationCenter(p[0]);
 *  g.setRotationPoints([p[1], p[2]]);
 *
 * </pre><div class="jxgbox" id="JXGf0491b62-b377-42cb-b55c-4ef5374b39fc" style="width: 400px; height: 300px;"></div>
 * <script type="text/javascript">
 *  (function () {
 *  var board, p, col, pol, g;
 *  board = JXG.JSXGraph.initBoard('JXGf0491b62-b377-42cb-b55c-4ef5374b39fc', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true, showcopyright: false});
 *  col = 'blue';
 *  p = [];
 *  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[2, -1 ], {size: 5, strokeColor:'red', fillColor:'red'}));
 *  p.push(board.create('point',[2, 1 ], {size: 5, strokeColor:'red', fillColor:'red'}));
 *  p.push(board.create('point',[-2, 1], {size: 5, strokeColor:col, fillColor:col}));
 *  pol = board.create('polygon', p, {hasInnerPoints: true});
 *  g = board.create('group', p);
 *  g.setRotationCenter(p[0]);
 *  g.setRotationPoints([p[1], p[2]]);
 *  })();
 * </script><pre>
 *
 *  @example
 *
 *  // Allow rotations:
 *  // As rotation center, arbitrary points, coordinate arrays,
 *  // or functions returning coordinate arrays can be given.
 *  // Another possibility is to use the predefined string 'centroid'.
 *
 *  // The methods to define the rotation points can be chained.
 *
 *  var p, col, pol, g;
 *  col = 'blue';
 *  p = [];
 *  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[2, -1 ], {size: 5, strokeColor:'red', fillColor:'red'}));
 *  p.push(board.create('point',[2, 1 ], {size: 5, strokeColor:'red', fillColor:'red'}));
 *  p.push(board.create('point',[-2, 1], {size: 5, strokeColor:col, fillColor:col}));
 *
 *  pol = board.create('polygon', p, {hasInnerPoints: true});
 *  g = board.create('group', p).setRotationCenter('centroid').setRotationPoints([p[1], p[2]]);
 *
 * </pre><div class="jxgbox" id="JXG8785b099-a75e-4769-bfd8-47dd4376fe27" style="width: 400px; height: 300px;"></div>
 * <script type="text/javascript">
 *  (function () {
 *  var board, p, col, pol, g;
 *  board = JXG.JSXGraph.initBoard('JXG8785b099-a75e-4769-bfd8-47dd4376fe27', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true, showcopyright: false});
 *  col = 'blue';
 *  p = [];
 *  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[2, -1 ], {size: 5, strokeColor:'red', fillColor:'red'}));
 *  p.push(board.create('point',[2, 1 ], {size: 5, strokeColor:'red', fillColor:'red'}));
 *  p.push(board.create('point',[-2, 1], {size: 5, strokeColor:col, fillColor:col}));
 *  pol = board.create('polygon', p, {hasInnerPoints: true});
 *  g = board.create('group', p).setRotationCenter('centroid').setRotationPoints([p[1], p[2]]);
 *  })();
 * </script><pre>
 *
 *  @example
 *
 *  // Allow scaling:
 *  // As for rotation one can declare points of the group to trigger a scaling operation.
 *  // For this, one has to define a scaleCenter, in analogy to rotations.
 *
 *  // Here, the yellow  point enables scaling, the red point a rotation.
 *
 *  var p, col, pol, g;
 *  col = 'blue';
 *  p = [];
 *  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[2, -1 ], {size: 5, strokeColor:'yellow', fillColor:'yellow'}));
 *  p.push(board.create('point',[2, 1 ], {size: 5, strokeColor:'red', fillColor:'red'}));
 *  p.push(board.create('point',[-2, 1], {size: 5, strokeColor:col, fillColor:col}));
 *
 *  pol = board.create('polygon', p, {hasInnerPoints: true});
 *  g = board.create('group', p).setRotationCenter('centroid').setRotationPoints([p[2]]);
 *  g.setScaleCenter(p[0]).setScalePoints(p[1]);
 *
 * </pre><div class="jxgbox" id="JXGc3ca436b-e4fc-4de5-bab4-09790140c675" style="width: 400px; height: 300px;"></div>
 * <script type="text/javascript">
 *  (function () {
 *  var board, p, col, pol, g;
 *  board = JXG.JSXGraph.initBoard('JXGc3ca436b-e4fc-4de5-bab4-09790140c675', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true, showcopyright: false});
 *  col = 'blue';
 *  p = [];
 *  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[2, -1 ], {size: 5, strokeColor:'yellow', fillColor:'yellow'}));
 *  p.push(board.create('point',[2, 1 ], {size: 5, strokeColor:'red', fillColor:'red'}));
 *  p.push(board.create('point',[-2, 1], {size: 5, strokeColor:col, fillColor:col}));
 *  pol = board.create('polygon', p, {hasInnerPoints: true});
 *  g = board.create('group', p).setRotationCenter('centroid').setRotationPoints([p[2]]);
 *  g.setScaleCenter(p[0]).setScalePoints(p[1]);
 *  })();
 * </script><pre>
 *
 *  @example
 *
 *  // Allow Translations:
 *  // By default, every point of a group triggers a translation.
 *  // There may be situations, when this is not wanted.
 *
 *  // In this example, E triggers nothing, but itself is rotation center
 *  // and is translated, if other points are moved around.
 *
 *  var p, q, col, pol, g;
 *  col = 'blue';
 *  p = [];
 *  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[2, -1 ], {size: 5, strokeColor:'yellow', fillColor:'yellow'}));
 *  p.push(board.create('point',[2, 1 ], {size: 5, strokeColor:'red', fillColor:'red'}));
 *  p.push(board.create('point',[-2, 1], {size: 5, strokeColor:col, fillColor:col}));
 *  q = board.create('point',[0, 0], {size: 5, strokeColor:col, fillColor:col});
 *
 *  pol = board.create('polygon', p, {hasInnerPoints: true});
 *  g = board.create('group', p.concat(q)).setRotationCenter('centroid').setRotationPoints([p[2]]);
 *  g.setScaleCenter(p[0]).setScalePoints(p[1]);
 *  g.removeTranslationPoint(q);
 *
 * </pre><div class="jxgbox" id="JXGd19b800a-57a9-4303-b49a-8f5b7a5488f0" style="width: 400px; height: 300px;"></div>
 * <script type="text/javascript">
 *  (function () {
 *  var board, p, q, col, pol, g;
 *  board = JXG.JSXGraph.initBoard('JXGd19b800a-57a9-4303-b49a-8f5b7a5488f0', {boundingbox:[-5,5,5,-5], keepaspectratio:true, axis:true, showcopyright: false});
 *  col = 'blue';
 *  p = [];
 *  p.push(board.create('point',[-2, -1 ], {size: 5, strokeColor:col, fillColor:col}));
 *  p.push(board.create('point',[2, -1 ], {size: 5, strokeColor:'yellow', fillColor:'yellow'}));
 *  p.push(board.create('point',[2, 1 ], {size: 5, strokeColor:'red', fillColor:'red'}));
 *  p.push(board.create('point',[-2, 1], {size: 5, strokeColor:col, fillColor:col}));
 *  q = board.create('point',[0, 0], {size: 5, strokeColor:col, fillColor:col});
 *
 *  pol = board.create('polygon', p, {hasInnerPoints: true});
 *  g = board.create('group', p.concat(q)).setRotationCenter('centroid').setRotationPoints([p[2]]);
 *  g.setScaleCenter(p[0]).setScalePoints(p[1]);
 *  g.removeTranslationPoint(q);
 *  })();
 * </script><pre>
 *
 *  @example
 *
 *        // Add an image and use the group tools to manipulate it
 *       let urlImg = "https://jsxgraph.org/distrib/images/uccellino.jpg";
 *       let lowleft = [-2, -1]
 *
 *       let col = 'blue';
 *       let p = [];
 *       p.push(board.create('point', lowleft, { size: 5, strokeColor: col, fillColor: col }));
 *       p.push(board.create('point', [2, -1], { size: 5, strokeColor: 'yellow', fillColor: 'yellow', name: 'scale' }));
 *       p.push(board.create('point', [2, 1], { size: 5, strokeColor: 'red', fillColor: 'red', name: 'rotate' }));
 *       p.push(board.create('point', [-2, 1], { size: 5, strokeColor: col, fillColor: col, name: 'translate' }));
 *
 *       let im = board.create('image', [urlImg, lowleft, [2, 2]]);
 *       let pol = board.create('polygon', p, { hasInnerPoints: true });
 *
 *       let g = board.create('group', p.concat(im))
 *       // g.addPoint(im)   // image, but adds as a point
 *
 *       g.setRotationCenter(lowleft)
 *       g.setRotationPoints([p[2]]);
 *
 *       g.setScaleCenter(p[0]).setScalePoints(p[1]);
 *
 * </pre><div class="jxgbox" id="JXGd19b800a-57a9-4303-b49a-8f5b7a5489f1" style="width: 400px; height: 300px;"></div>
 * <script type="text/javascript">
 *  (function () {
 *       let board = JXG.JSXGraph.initBoard('JXGd19b800a-57a9-4303-b49a-8f5b7a5489f1')
 *
 *       // Add an image and use the group tools to manipulate it
 *       let urlImg = "https://jsxgraph.org/distrib/images/uccellino.jpg";
 *       let lowleft = [-2, -1]
 *
 *       let col = 'blue';
 *       let p = [];
 *       p.push(board.create('point', lowleft, { size: 5, strokeColor: col, fillColor: col }));
 *       p.push(board.create('point', [2, -1], { size: 5, strokeColor: 'yellow', fillColor: 'yellow', name: 'scale' }));
 *       p.push(board.create('point', [2, 1], { size: 5, strokeColor: 'red', fillColor: 'red', name: 'rotate' }));
 *       p.push(board.create('point', [-2, 1], { size: 5, strokeColor: col, fillColor: col, name: 'translate' }));
 *
 *       let im = board.create('image', [urlImg, lowleft, [2, 2]]);
 *       let pol = board.create('polygon', p, { hasInnerPoints: true });
 *
 *       let g = board.create('group', p.concat(im))
 *       // g.addPoint(im)   // image, but adds as a point
 *
 *       g.setRotationCenter(lowleft)
 *       g.setRotationPoints([p[2]]);
 *
 *       g.setScaleCenter(p[0]).setScalePoints(p[1]);
 *  })();
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createGroup = function(board, parents, attributes) {
    var attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "group"), g = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Group(board, attr.id, attr.name, parents, attr);
    g.elType = "group";
    g.setParents(parents);
    return g;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("group", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createGroup);
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Group;
 // export default {
 //     Group: JXG.Group,
 //     createGroup: JXG.createGroup
 // };
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/circle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 * @fileoverview The geometry object Circle is defined in this file. Circle stores all
 * style and functional properties that are required to draw and move a circle on
 * a board.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coords.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$parser$2f$geonext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/parser/geonext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
/**
 * A circle consists of all points with a given distance from one point. This point is called center, the distance is called radius.
 * A circle can be constructed by providing a center and a point on the circle or a center and a radius (given as a number, function,
 * line, or circle).
 * @class Creates a new circle object. Do not use this constructor to create a circle. Use {@link JXG.Board#create} with
 * type {@link Circle} instead.
 * @constructor
 * @augments JXG.GeometryElement
 * @param {JXG.Board} board The board the new circle is drawn on.
 * @param {String} method Can be
 * <ul><li> <b>'twoPoints'</b> which means the circle is defined by its center and a point on the circle.</li>
 * <li><b>'pointRadius'</b> which means the circle is defined by its center and its radius in user units</li>
 * <li><b>'pointLine'</b> which means the circle is defined by its center and its radius given by the distance from the startpoint and the endpoint of the line</li>
 * <li><b>'pointCircle'</b> which means the circle is defined by its center and its radius given by the radius of another circle</li></ul>
 * The parameters p1, p2 and radius must be set according to this method parameter.
 * @param {JXG.Point} par1 center of the circle.
 * @param {JXG.Point|JXG.Line|JXG.Circle} par2 Can be
 * <ul><li>a point on the circle if method is 'twoPoints'</li>
 * <li>a line if the method is 'pointLine'</li>
 * <li>a circle if the method is 'pointCircle'</li></ul>
 * @param {Object} attributes
 * @see JXG.Board#generateName
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Circle = function(board, method, par1, par2, attributes) {
    // Call the constructor of GeometryElement
    this.constructor(board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_CIRCLE, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CIRCLE);
    /**
     * Stores the given method.
     * Can be
     * <ul><li><b>'twoPoints'</b> which means the circle is defined by its center and a point on the circle.</li>
     * <li><b>'pointRadius'</b> which means the circle is defined by its center and its radius given in user units or as term.</li>
     * <li><b>'pointLine'</b> which means the circle is defined by its center and its radius given by the distance from the startpoint and the endpoint of the line.</li>
     * <li><b>'pointCircle'</b> which means the circle is defined by its center and its radius given by the radius of another circle.</li></ul>
     * @type String
     * @see JXG.Circle#center
     * @see JXG.Circle#point2
     * @see JXG.Circle#radius
     * @see JXG.Circle#line
     * @see JXG.Circle#circle
     */ this.method = method;
    // this is kept so existing code won't ne broken
    this.midpoint = this.board.select(par1);
    /**
     * The circles center. Do not set this parameter directly as it will break JSXGraph's update system.
     * @type JXG.Point
     */ this.center = this.board.select(par1);
    /** Point on the circle only set if method equals 'twoPoints'. Do not set this parameter directly as it will break JSXGraph's update system.
     * @type JXG.Point
     * @see JXG.Circle#method
     */ this.point2 = null;
    /** Radius of the circle
     * only set if method equals 'pointRadius'
     * @type Number
     * @default null
     * @see JXG.Circle#method
     */ this.radius = 0;
    /** Line defining the radius of the circle given by the distance from the startpoint and the endpoint of the line
     * only set if method equals 'pointLine'. Do not set this parameter directly as it will break JSXGraph's update system.
     * @type JXG.Line
     * @default null
     * @see JXG.Circle#method
     */ this.line = null;
    /** Circle defining the radius of the circle given by the radius of the other circle
     * only set if method equals 'pointLine'. Do not set this parameter directly as it will break JSXGraph's update system.
     * @type JXG.Circle
     * @default null
     * @see JXG.Circle#method
     */ this.circle = null;
    this.points = [];
    if (method === "twoPoints") {
        this.point2 = board.select(par2);
        this.radius = this.Radius();
    } else if (method === "pointRadius") {
        this.gxtterm = par2;
        // Converts JessieCode syntax into JavaScript syntax and generally ensures that the radius is a function
        this.updateRadius = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createFunction(par2, this.board);
        // First evaluation of the radius function
        this.updateRadius();
        this.addParentsFromJCFunctions([
            this.updateRadius
        ]);
    } else if (method === "pointLine") {
        // dann ist p2 die Id eines Objekts vom Typ Line!
        this.line = board.select(par2);
        this.radius = this.line.point1.coords.distance(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, this.line.point2.coords);
    } else if (method === "pointCircle") {
        // dann ist p2 die Id eines Objekts vom Typ Circle!
        this.circle = board.select(par2);
        this.radius = this.circle.Radius();
    }
    // create Label
    this.id = this.board.setId(this, "C");
    this.board.renderer.drawEllipse(this);
    this.board.finalizeAdding(this);
    this.createGradient();
    this.elType = "circle";
    this.createLabel();
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.center._is_new)) {
        this.addChild(this.center);
        delete this.center._is_new;
    } else {
        this.center.addChild(this);
    }
    if (method === "pointRadius") {
        this.notifyParents(par2);
    } else if (method === "pointLine") {
        this.line.addChild(this);
    } else if (method === "pointCircle") {
        this.circle.addChild(this);
    } else if (method === "twoPoints") {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.point2._is_new)) {
            this.addChild(this.point2);
            delete this.point2._is_new;
        } else {
            this.point2.addChild(this);
        }
    }
    this.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(this.methodMap, {
        setRadius: "setRadius",
        getRadius: "getRadius",
        Area: "Area",
        area: "Area",
        Perimeter: "Perimeter",
        Circumference: "Perimeter",
        radius: "Radius",
        Radius: "Radius",
        Diameter: "Diameter",
        center: "center",
        line: "line",
        point2: "point2"
    });
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Circle.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Circle.prototype, /** @lends JXG.Circle.prototype */ {
    /**
         * Checks whether (x,y) is near the circle line or inside of the ellipse
         * (in case JXG.Options.conic#hasInnerPoints is true).
         * @param {Number} x Coordinate in x direction, screen coordinates.
         * @param {Number} y Coordinate in y direction, screen coordinates.
         * @returns {Boolean} True if (x,y) is near the circle, False otherwise.
         * @private
         */ hasPoint: function(x, y) {
        var prec, type, mp = this.center.coords.usrCoords, p = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, [
            x,
            y
        ], this.board), r = this.Radius(), dx, dy, dist;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isObject(this.evalVisProp('precision'))) {
            type = this.board._inputDevice;
            prec = this.evalVisProp('precision.' + type);
        } else {
            // 'inherit'
            prec = this.board.options.precision.hasPoint;
        }
        dx = mp[1] - p.usrCoords[1];
        dy = mp[2] - p.usrCoords[2];
        dist = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hypot(dx, dy);
        // We have to use usrCoords, since Radius is available in usrCoords only.
        prec += this.evalVisProp('strokewidth') * 0.5;
        prec /= Math.sqrt(Math.abs(this.board.unitX * this.board.unitY));
        if (this.evalVisProp('hasinnerpoints')) {
            return dist < r + prec;
        }
        return Math.abs(dist - r) < prec;
    },
    // /**
    //  * Used to generate a polynomial for a point p that lies on this circle.
    //  * @param {JXG.Point} p The point for which the polynomial is generated.
    //  * @returns {Array} An array containing the generated polynomial.
    //  * @private
    //  */
    generatePolynomial: function(p) {
        /*
             * We have four methods to construct a circle:
             *   (a) Two points
             *   (b) center and radius
             *   (c) center and radius given by length of a segment
             *   (d) center and radius given by another circle
             *
             * In case (b) we have to distinguish two cases:
             *  (i)  radius is given as a number
             *  (ii) radius is given as a function
             * In the latter case there's no guarantee the radius depends on other geometry elements
             * in a polynomial way so this case has to be omitted.
             *
             * Another tricky case is case (d):
             * The radius depends on another circle so we have to cycle through the ancestors of each circle
             * until we reach one that's radius does not depend on another circles radius.
             *
             *
             * All cases (a) to (d) vary only in calculation of the radius. So the basic formulae for
             * a glider G (g1,g2) on a circle with center M (m1,m2) and radius r is just:
             *
             *     (g1-m1)^2 + (g2-m2)^2 - r^2 = 0
             *
             * So the easiest case is (b) with a fixed radius given as a number. The other two cases (a)
             * and (c) are quite the same: Euclidean distance between two points A (a1,a2) and B (b1,b2),
             * squared:
             *
             *     r^2 = (a1-b1)^2 + (a2-b2)^2
             *
             * For case (d) we have to cycle recursively through all defining circles and finally return the
             * formulae for calculating r^2. For that we use JXG.Circle.symbolic.generateRadiusSquared().
             */ var m1 = this.center.symbolic.x, m2 = this.center.symbolic.y, g1 = p.symbolic.x, g2 = p.symbolic.y, rsq = this.generateRadiusSquared();
        /* No radius can be calculated (Case b.ii) */ if (rsq === "") {
            return [];
        }
        return [
            "((" + g1 + ")-(" + m1 + "))^2 + ((" + g2 + ")-(" + m2 + "))^2 - (" + rsq + ")"
        ];
    },
    /**
         * Generate symbolic radius calculation for loci determination with Groebner-Basis algorithm.
         * @returns {String} String containing symbolic calculation of the circle's radius or an empty string
         * if the radius can't be expressed in a polynomial equation.
         * @private
         */ generateRadiusSquared: function() {
        /*
             * Four cases:
             *
             *   (a) Two points
             *   (b) center and radius
             *   (c) center and radius given by length of a segment
             *   (d) center and radius given by another circle
             */ var m1, m2, p1, p2, q1, q2, rsq = "";
        if (this.method === "twoPoints") {
            m1 = this.center.symbolic.x;
            m2 = this.center.symbolic.y;
            p1 = this.point2.symbolic.x;
            p2 = this.point2.symbolic.y;
            rsq = "((" + p1 + ")-(" + m1 + "))^2 + ((" + p2 + ")-(" + m2 + "))^2";
        } else if (this.method === "pointRadius") {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber(this.radius)) {
                rsq = (this.radius * this.radius).toString();
            }
        } else if (this.method === "pointLine") {
            p1 = this.line.point1.symbolic.x;
            p2 = this.line.point1.symbolic.y;
            q1 = this.line.point2.symbolic.x;
            q2 = this.line.point2.symbolic.y;
            rsq = "((" + p1 + ")-(" + q1 + "))^2 + ((" + p2 + ")-(" + q2 + "))^2";
        } else if (this.method === "pointCircle") {
            rsq = this.circle.Radius();
        }
        return rsq;
    },
    /**
         * Uses the boards renderer to update the circle.
         */ update: function() {
        var x, y, z, r, c, i;
        if (this.needsUpdate) {
            if (this.evalVisProp('trace')) {
                this.cloneToBackground(true);
            }
            if (this.method === "pointLine") {
                this.radius = this.line.point1.coords.distance(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, this.line.point2.coords);
            } else if (this.method === "pointCircle") {
                this.radius = this.circle.Radius();
            } else if (this.method === "pointRadius") {
                this.radius = this.updateRadius();
            }
            this.radius = Math.abs(this.radius);
            this.updateStdform();
            this.updateQuadraticform();
            // Approximate the circle by 4 Bezier segments
            // This will be used for intersections of type curve / circle.
            // See https://spencermortensen.com/articles/bezier-circle/
            z = this.center.coords.usrCoords[0];
            x = this.center.coords.usrCoords[1] / z;
            y = this.center.coords.usrCoords[2] / z;
            z /= z;
            r = this.Radius();
            c = 0.551915024494;
            this.numberPoints = 13;
            this.dataX = [
                x + r,
                x + r,
                x + r * c,
                x,
                x - r * c,
                x - r,
                x - r,
                x - r,
                x - r * c,
                x,
                x + r * c,
                x + r,
                x + r
            ];
            this.dataY = [
                y,
                y + r * c,
                y + r,
                y + r,
                y + r,
                y + r * c,
                y,
                y - r * c,
                y - r,
                y - r,
                y - r,
                y - r * c,
                y
            ];
            this.bezierDegree = 3;
            for(i = 0; i < this.numberPoints; i++){
                this.points[i] = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                    this.dataX[i],
                    this.dataY[i]
                ], this.board);
            }
        }
        return this;
    },
    /**
         * Updates this circle's {@link JXG.Circle#quadraticform}.
         * @private
         */ updateQuadraticform: function() {
        var m = this.center, mX = m.X(), mY = m.Y(), r = this.Radius();
        this.quadraticform = [
            [
                mX * mX + mY * mY - r * r,
                -mX,
                -mY
            ],
            [
                -mX,
                1,
                0
            ],
            [
                -mY,
                0,
                1
            ]
        ];
    },
    /**
         * Updates the stdform derived from the position of the center and the circle's radius.
         * @private
         */ updateStdform: function() {
        this.stdform[3] = 0.5;
        this.stdform[4] = this.Radius();
        this.stdform[1] = -this.center.coords.usrCoords[1];
        this.stdform[2] = -this.center.coords.usrCoords[2];
        if (!isFinite(this.stdform[4])) {
            this.stdform[0] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.point2) ? -(this.stdform[1] * this.point2.coords.usrCoords[1] + this.stdform[2] * this.point2.coords.usrCoords[2]) : 0;
        }
        this.normalize();
    },
    /**
         * Uses the boards renderer to update the circle.
         * @private
         */ updateRenderer: function() {
        // var wasReal;
        if (!this.needsUpdate) {
            return this;
        }
        if (this.visPropCalc.visible) {
            // wasReal = this.isReal;
            this.isReal = !isNaN(this.center.coords.usrCoords[1] + this.center.coords.usrCoords[2] + this.Radius()) && this.center.isReal;
            if (//wasReal &&
            !this.isReal) {
                this.updateVisibility(false);
            }
        }
        // Update the position
        if (this.visPropCalc.visible) {
            this.board.renderer.updateEllipse(this);
        }
        // Update the label if visible.
        if (this.hasLabel && this.visPropCalc.visible && this.label && this.label.visPropCalc.visible && this.isReal) {
            this.label.update();
            this.board.renderer.updateText(this.label);
        }
        // Update rendNode display
        this.setDisplayRendNode();
        // if (this.visPropCalc.visible !== this.visPropOld.visible) {
        //     this.board.renderer.display(this, this.visPropCalc.visible);
        //     this.visPropOld.visible = this.visPropCalc.visible;
        //
        //     if (this.hasLabel) {
        //         this.board.renderer.display(this.label, this.label.visPropCalc.visible);
        //     }
        // }
        this.needsUpdate = false;
        return this;
    },
    /**
         * Finds dependencies in a given term and resolves them by adding the elements referenced in this
         * string to the circle's list of ancestors.
         * @param {String} contentStr
         * @private
         */ notifyParents: function(contentStr) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(contentStr)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$parser$2f$geonext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].findDependencies(this, contentStr, this.board);
        }
    },
    /**
         * Set a new radius, then update the board.
         * @param {String|Number|function} r A string, function or number describing the new radius.
         * @returns {JXG.Circle} Reference to this circle
         */ setRadius: function(r) {
        this.updateRadius = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createFunction(r, this.board);
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
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(value)) {
            this.setRadius(value);
            return this.Radius();
        }
        if (this.method === "twoPoints") {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cmpArrays(this.point2.coords.usrCoords, [
                0,
                0,
                0
            ]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cmpArrays(this.center.coords.usrCoords, [
                0,
                0,
                0
            ])) {
                return NaN;
            }
            return this.center.Dist(this.point2);
        }
        if (this.method === "pointLine" || this.method === "pointCircle") {
            return this.radius;
        }
        if (this.method === "pointRadius") {
            return this.evalVisProp('nonnegativeonly') ? Math.max(0.0, this.updateRadius()) : Math.abs(this.updateRadius());
        }
        return NaN;
    },
    /**
         * Calculates the diameter of the circle.
         * @returns {Number} The Diameter of the circle
         */ Diameter: function() {
        return 2 * this.Radius();
    },
    /**
         * Use {@link JXG.Circle#Radius}.
         * @deprecated
         */ getRadius: function() {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("Circle.getRadius()", "Circle.Radius()");
        return this.Radius();
    },
    // documented in geometry element
    getTextAnchor: function() {
        return this.center.coords;
    },
    // documented in geometry element
    getLabelAnchor: function() {
        var x, y, pos, xy, lbda, sgn, dist = 1.5, r = this.Radius(), c = this.center.coords.usrCoords, SQRTH = 7.071067811865e-1; // sqrt(2)/2
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.label)) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, [
                NaN,
                NaN
            ], this.board);
        }
        pos = this.label.evalVisProp('position');
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(pos)) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, [
                NaN,
                NaN
            ], this.board);
        }
        if (pos.indexOf('right') < 0 && pos.indexOf('left') < 0) {
            switch(this.evalVisProp('label.position')){
                case "lft":
                    x = c[1] - r;
                    y = c[2];
                    break;
                case "llft":
                    x = c[1] - SQRTH * r;
                    y = c[2] - SQRTH * r;
                    break;
                case "rt":
                    x = c[1] + r;
                    y = c[2];
                    break;
                case "lrt":
                    x = c[1] + SQRTH * r;
                    y = c[2] - SQRTH * r;
                    break;
                case "urt":
                    x = c[1] + SQRTH * r;
                    y = c[2] + SQRTH * r;
                    break;
                case "top":
                    x = c[1];
                    y = c[2] + r;
                    break;
                case "bot":
                    x = c[1];
                    y = c[2] - r;
                    break;
                default:
                    // includes case 'ulft'
                    x = c[1] - SQRTH * r;
                    y = c[2] + SQRTH * r;
                    break;
            }
        } else {
            // New positioning
            c = this.center.coords.scrCoords;
            xy = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].parsePosition(pos);
            lbda = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].parseNumber(xy.pos, 2 * Math.PI, 1);
            if (xy.pos.indexOf('fr') < 0 && xy.pos.indexOf('%') < 0) {
                if (xy.pos.indexOf('px') >= 0) {
                    // 'px' or numbers are not supported
                    lbda = 0;
                } else {
                    // Pure numbers are interpreted as degrees
                    lbda *= Math.PI / 180;
                }
            }
            // Position left or right
            sgn = 1;
            if (xy.side === 'left') {
                sgn = -1;
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.label)) {
                dist = sgn * 0.5 * this.label.evalVisProp('distance');
            }
            x = c[1] + (r * this.board.unitX + this.label.size[0] * dist) * Math.cos(lbda);
            y = c[2] - (r * this.board.unitY + this.label.size[1] * dist) * Math.sin(lbda);
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, [
                x,
                y
            ], this.board);
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
            x,
            y
        ], this.board);
    },
    // documented in geometry element
    cloneToBackground: function() {
        var er, r = this.Radius(), copy = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getCloneObject(this);
        copy.center = {
            coords: this.center.coords
        };
        copy.Radius = function() {
            return r;
        };
        copy.getRadius = function() {
            return r;
        };
        er = this.board.renderer.enhancedRendering;
        this.board.renderer.enhancedRendering = true;
        this.board.renderer.drawEllipse(copy);
        this.board.renderer.enhancedRendering = er;
        this.traces[copy.id] = copy.rendNode;
        return this;
    },
    /**
         * Add transformations to this circle.
         * @param {JXG.Transformation|Array} transform Either one {@link JXG.Transformation} or an array of {@link JXG.Transformation}s.
         * @returns {JXG.Circle} Reference to this circle object.
         */ addTransform: function(transform) {
        var i, list = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(transform) ? transform : [
            transform
        ], len = list.length;
        for(i = 0; i < len; i++){
            this.center.transformations.push(list[i]);
            if (this.method === "twoPoints") {
                this.point2.transformations.push(list[i]);
            }
        }
        return this;
    },
    // see element.js
    snapToGrid: function() {
        var forceIt = this.evalVisProp('snaptogrid');
        this.center.handleSnapToGrid(forceIt, true);
        if (this.method === "twoPoints") {
            this.point2.handleSnapToGrid(forceIt, true);
        }
        return this;
    },
    // see element.js
    snapToPoints: function() {
        var forceIt = this.evalVisProp('snaptopoints');
        this.center.handleSnapToPoints(forceIt);
        if (this.method === "twoPoints") {
            this.point2.handleSnapToPoints(forceIt);
        }
        return this;
    },
    /**
         * Treats the circle as parametric curve and calculates its X coordinate.
         * @param {Number} t Number between 0 and 1.
         * @returns {Number} <tt>X(t)= radius*cos(t)+centerX</tt>.
         */ X: function(t) {
        return this.Radius() * Math.cos(t * 2 * Math.PI) + this.center.coords.usrCoords[1];
    },
    /**
         * Treats the circle as parametric curve and calculates its Y coordinate.
         * @param {Number} t Number between 0 and 1.
         * @returns {Number} <tt>X(t)= radius*sin(t)+centerY</tt>.
         */ Y: function(t) {
        return this.Radius() * Math.sin(t * 2 * Math.PI) + this.center.coords.usrCoords[2];
    },
    /**
         * Treat the circle as parametric curve and calculates its Z coordinate.
         * @param {Number} t ignored
         * @returns {Number} 1.0
         */ Z: function(t) {
        return 1.0;
    },
    /**
         * Returns 0.
         * @private
         */ minX: function() {
        return 0.0;
    },
    /**
         * Returns 1.
         * @private
         */ maxX: function() {
        return 1.0;
    },
    /**
         * Circle area
         * @returns {Number} area of the circle.
         */ Area: function() {
        var r = this.Radius();
        return r * r * Math.PI;
    },
    /**
         * Perimeter (circumference) of circle.
         * @returns {Number} Perimeter of circle in user units.
         */ Perimeter: function() {
        return 2 * this.Radius() * Math.PI;
    },
    /**
         * Get bounding box of the circle.
         * @returns {Array} [x1, y1, x2, y2]
         */ bounds: function() {
        var uc = this.center.coords.usrCoords, r = this.Radius();
        return [
            uc[1] - r,
            uc[2] + r,
            uc[1] + r,
            uc[2] - r
        ];
    },
    /**
         * Get data to construct this element. Data consists of the parent elements
         * and static data like radius.
         * @returns {Array} data necessary to construct this element
         */ getParents: function() {
        if (this.parents.length === 1) {
            // i.e. this.method === 'pointRadius'
            return this.parents.concat(this.radius);
        }
        return this.parents;
    }
});
/**
 * @class A circle can be defined by various combinations of points and numbers.
 * @pseudo
 * @description  A circle consists of all points with a given distance from one point. This point is called center, the distance is called radius.
 * A circle can be constructed by providing a center and a point on the circle or a center and a radius (given as a number, function,
 * line, or circle). If the radius is a negative value, its absolute values is taken.
 * @name Circle
 * @augments JXG.Circle
 * @constructor
 * @type JXG.Circle
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_number,JXG.Point,JXG.Line,JXG.Circle} center,radius The center must be given as a {@link JXG.Point},
 * see {@link JXG.providePoints}, but the radius can be given
 * as a number (which will create a circle with a fixed radius),
 * another {@link JXG.Point}, a {@link JXG.Line} (the distance of start and end point of the
 * line will determine the radius), or another {@link JXG.Circle}.
 * <p>
 * If the radius is supplied as number or output of a function, its absolute value is taken.
 *
 * @example
 * // Create a circle providing two points
 * var p1 = board.create('point', [2.0, 2.0]),
 *     p2 = board.create('point', [2.0, 0.0]),
 *     c1 = board.create('circle', [p1, p2]);
 *
 * // Create another circle using the above circle
 * var p3 = board.create('point', [3.0, 2.0]),
 *     c2 = board.create('circle', [p3, c1]);
 * </pre><div class="jxgbox" id="JXG5f304d31-ef20-4a8e-9c0e-ea1a2b6c79e0" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 * (function() {
 *   var cex1_board = JXG.JSXGraph.initBoard('JXG5f304d31-ef20-4a8e-9c0e-ea1a2b6c79e0', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
 *       cex1_p1 = cex1_board.create('point', [2.0, 2.0]),
 *       cex1_p2 = cex1_board.create('point', [2.0, 0.0]),
 *       cex1_c1 = cex1_board.create('circle', [cex1_p1, cex1_p2]),
 *       cex1_p3 = cex1_board.create('point', [3.0, 2.0]),
 *       cex1_c2 = cex1_board.create('circle', [cex1_p3, cex1_c1]);
 * })();
 * </script><pre>
 * @example
 * // Create a circle providing two points
 * var p1 = board.create('point', [2.0, 2.0]),
 *     c1 = board.create('circle', [p1, 3]);
 *
 * // Create another circle using the above circle
 * var c2 = board.create('circle', [function() { return [p1.X(), p1.Y() + 1];}, function() { return c1.Radius(); }]);
 * </pre><div class="jxgbox" id="JXG54165f60-93b9-441d-8979-ac5d0f193020" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 * (function() {
 * var board = JXG.JSXGraph.initBoard('JXG54165f60-93b9-441d-8979-ac5d0f193020', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
 * var p1 = board.create('point', [2.0, 2.0]);
 * var c1 = board.create('circle', [p1, 3]);
 *
 * // Create another circle using the above circle
 * var c2 = board.create('circle', [function() { return [p1.X(), p1.Y() + 1];}, function() { return c1.Radius(); }]);
 * })();
 * </script><pre>
 * @example
 * var li = board.create('line', [1,1,1], {strokeColor: '#aaaaaa'});
 * var reflect = board.create('transform', [li], {type: 'reflect'});
 *
 * var c1 = board.create('circle', [[-2,-2], [-2, -1]], {center: {visible:true}});
 * var c2 = board.create('circle', [c1, reflect]);
 *      * </pre><div id="JXGa2a5a870-5dbb-11e8-9fb9-901b0e1b8723" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGa2a5a870-5dbb-11e8-9fb9-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *             var li = board.create('line', [1,1,1], {strokeColor: '#aaaaaa'});
 *             var reflect = board.create('transform', [li], {type: 'reflect'});
 *
 *             var c1 = board.create('circle', [[-2,-2], [-2, -1]], {center: {visible:true}});
 *             var c2 = board.create('circle', [c1, reflect]);
 *     })();
 *
 * </script><pre>
 *
 * @example
 * var t = board.create('transform', [2, 1.5], {type: 'scale'});
 * var c1 = board.create('circle', [[1.3, 1.3], [0, 1.3]], {strokeColor: 'black', center: {visible:true}});
 * var c2 = board.create('circle', [c1, t], {strokeColor: 'black'});
 *
 * </pre><div id="JXG0686a222-6339-11e8-9fb9-901b0e1b8723" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG0686a222-6339-11e8-9fb9-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var t = board.create('transform', [2, 1.5], {type: 'scale'});
 *     var c1 = board.create('circle', [[1.3, 1.3], [0, 1.3]], {strokeColor: 'black', center: {visible:true}});
 *     var c2 = board.create('circle', [c1, t], {strokeColor: 'black'});
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createCircle = function(board, parents, attributes) {
    var el, p, i, attr, obj, isDraggable = true, point_style = [
        "center",
        "point2"
    ];
    p = [];
    obj = board.select(parents[0]);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isObject(obj) && obj.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CIRCLE && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isTransformationOrArray(parents[1])) {
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "circle");
        // if (!Type.exists(attr.type) || attr.type.toLowerCase() !== 'euclidean') {
        //     // Create a circle element from a circle and a Euclidean transformation
        //     el = JXG.createCircle(board, [obj.center, function() { return obj.Radius(); }], attr);
        // } else {
        // Create a conic element from a circle and a projective transformation
        el = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createEllipse(board, [
            obj.center,
            obj.center,
            function() {
                return 2 * obj.Radius();
            }
        ], attr);
        // }
        el.addTransform(parents[1]);
        return el;
    }
    // Circle defined by points
    for(i = 0; i < parents.length; i++){
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPointType(board, parents[i])) {
            if (parents.length < 3) {
                p.push(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].providePoints(board, [
                    parents[i]
                ], attributes, "circle", [
                    point_style[i]
                ])[0]);
            } else {
                p.push(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].providePoints(board, [
                    parents[i]
                ], attributes, "point")[0]);
            }
            if (p[p.length - 1] === false) {
                throw new Error("JSXGraph: Can't create circle from this type. Please provide a point type.");
            }
        } else {
            p.push(parents[i]);
        }
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "circle");
    if (p.length === 2 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(p[0]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(p[1])) {
        // Point/Point
        el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Circle(board, "twoPoints", p[0], p[1], attr);
    } else if ((__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber(p[0]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(p[0]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(p[0])) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(p[1])) {
        // Number/Point
        el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Circle(board, "pointRadius", p[1], p[0], attr);
    } else if ((__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber(p[1]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(p[1]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(p[1])) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(p[0])) {
        // Point/Number
        el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Circle(board, "pointRadius", p[0], p[1], attr);
    } else if (p[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CIRCLE && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(p[1])) {
        // Circle/Point
        el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Circle(board, "pointCircle", p[1], p[0], attr);
    } else if (p[1].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CIRCLE && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(p[0])) {
        // Point/Circle
        el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Circle(board, "pointCircle", p[0], p[1], attr);
    } else if (p[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(p[1])) {
        // Line/Point
        el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Circle(board, "pointLine", p[1], p[0], attr);
    } else if (p[1].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(p[0])) {
        // Point/Line
        el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Circle(board, "pointLine", p[0], p[1], attr);
    } else if (parents.length === 3 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(p[0]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(p[1]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(p[2])) {
        // Circle through three points
        // Check if circumcircle element is available
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].elements.circumcircle) {
            el = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].elements.circumcircle(board, p, attr);
        } else {
            throw new Error("JSXGraph: Can't create circle with three points. Please include the circumcircle element (element/composition).");
        }
    } else {
        throw new Error("JSXGraph: Can't create circle with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [point,point], [point,number], [point,function], [point,circle], [point,point,point], [circle,transformation]");
    }
    el.isDraggable = isDraggable;
    el.setParents(p);
    el.elType = "circle";
    for(i = 0; i < p.length; i++){
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(p[i])) {
            el.inherits.push(p[i]);
        }
    }
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("circle", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createCircle);
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Circle;
 // export default {
 //     Circle: JXG.Circle,
 //     createCircle: JXG.createCircle
 // };
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/polygon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG:true, define: true*/ /*jslint nomen: true, plusplus: true*/ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coords.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$statistics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/statistics.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/element.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
/**
 * Creates a new instance of JXG.Polygon.
 * @class Polygon stores all style and functional properties that are required
 * to draw and to interactact with a polygon.
 * @constructor
 * @augments JXG.GeometryElement
 * @param {JXG.Board} board Reference to the board the polygon is to be drawn on.
 * @param {Array} vertices Unique identifiers for the points defining the polygon.
 * Last point must be first point. Otherwise, the first point will be added at the list.
 * @param {Object} attributes An object which contains properties as given in {@link JXG.Options.elements}
 * and {@link JXG.Options.polygon}.
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Polygon = function(board, vertices, attributes) {
    this.constructor(board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_AREA);
    var i, l, len, j, p, attr_line = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "polygon", "borders");
    this.withLines = attributes.withlines;
    this.attr_line = attr_line;
    /**
     * References to the points defining the polygon. The last vertex is the same as the first vertex.
     * Compared to the 3D {@link JXG.Polygon3D#vertices}, it contains one point more, i.e. for a quadrangle
     * 'vertices' contains five points, the last one being
     * a copy of the first one. In a 3D quadrangle, 'vertices' will contain four points.
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
    // Close the polygon
    if (this.vertices.length > 0 && this.vertices[this.vertices.length - 1].id !== this.vertices[0].id) {
        this.vertices.push(this.vertices[0]);
    }
    /**
     * References to the border lines (edges) of the polygon.
     * @type Array
     */ this.borders = [];
    if (this.withLines) {
        len = this.vertices.length - 1;
        for(j = 0; j < len; j++){
            // This sets the "correct" labels for the first triangle of a construction.
            i = (j + 1) % len;
            attr_line.id = attr_line.ids && attr_line.ids[i];
            attr_line.name = attr_line.names && attr_line.names[i];
            attr_line.strokecolor = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(attr_line.colors) && attr_line.colors[i % attr_line.colors.length] || attr_line.strokecolor;
            attr_line.visible = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(attributes.borders.visible) ? attributes.borders.visible : attributes.visible;
            if (attr_line.strokecolor === false) {
                attr_line.strokecolor = "none";
            }
            l = board.create("segment", [
                this.vertices[i],
                this.vertices[i + 1]
            ], attr_line);
            l.dump = false;
            this.borders[i] = l;
            l.parentPolygon = this;
            this.addChild(l);
        }
    }
    this.inherits.push(this.vertices, this.borders);
    // Register polygon at board
    // This needs to be done BEFORE the points get this polygon added in their descendants list
    this.id = this.board.setId(this, "Py");
    // Add dependencies: either
    // - add polygon as child to an existing point
    // or
    // - add  points (supplied as coordinate arrays by the user and created by Type.providePoints) as children to the polygon
    for(i = 0; i < this.vertices.length - 1; i++){
        p = this.board.select(this.vertices[i]);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(p._is_new_pol)) {
            this.addChild(p);
            delete p._is_new_pol;
        } else {
            p.addChild(this);
        }
    }
    this.board.renderer.drawPolygon(this);
    this.board.finalizeAdding(this);
    this.createGradient();
    this.elType = "polygon";
    // create label
    this.createLabel();
    this.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(this.methodMap, {
        borders: "borders",
        vertices: "vertices",
        A: "Area",
        Area: "Area",
        Perimeter: "Perimeter",
        L: "Perimeter",
        boundingBox: "bounds",
        BoundingBox: "bounds",
        addPoints: "addPoints",
        insertPoints: "insertPoints",
        removePoints: "removePoints",
        Intersect: "intersect"
    });
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Polygon.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Polygon.prototype, /** @lends JXG.Polygon.prototype */ {
    /**
         * Wrapper for JXG.Math.Geometry.pnpoly.
         *
         * @param {Number} x_in x-coordinate (screen or user coordinates)
         * @param {Number} y_in y-coordinate (screen or user coordinates)
         * @param {Number} coord_type (Optional) the type of coordinates used here.
         *   Possible values are <b>JXG.COORDS_BY_USER</b> and <b>JXG.COORDS_BY_SCREEN</b>.
         *   Default value is JXG.COORDS_BY_SCREEN
         *
         * @returns {Boolean} if (x_in, y_in) is inside of the polygon.
         * @see JXG.Math.Geometry#pnpoly
         *
         * @example
         * var pol = board.create('polygon', [[-1,2], [2,2], [-1,4]]);
         * var p = board.create('point', [4, 3]);
         * var txt = board.create('text', [-1, 0.5, function() {
         *   return 'Point A is inside of the polygon = ' +
         *     pol.pnpoly(p.X(), p.Y(), JXG.COORDS_BY_USER);
         * }]);
         *
         * </pre><div id="JXG7f96aec7-4e3d-4ffc-a3f5-d3f967b6691c" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG7f96aec7-4e3d-4ffc-a3f5-d3f967b6691c',
         *             {boundingbox: [-2, 5, 5,-2], axis: true, showcopyright: false, shownavigation: false});
         *     var pol = board.create('polygon', [[-1,2], [2,2], [-1,4]]);
         *     var p = board.create('point', [4, 3]);
         *     var txt = board.create('text', [-1, 0.5, function() {
         *     		return 'Point A is inside of the polygon = ' + pol.pnpoly(p.X(), p.Y(), JXG.COORDS_BY_USER);
         *     }]);
         *
         *     })();
         *
         * </script><pre>
         *
         */ pnpoly: function(x_in, y_in, coord_type) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pnpoly(x_in, y_in, this.vertices, coord_type, this.board);
    },
    /**
         * Checks whether (x,y) is near the polygon.
         * @param {Number} x Coordinate in x direction, screen coordinates.
         * @param {Number} y Coordinate in y direction, screen coordinates.
         * @returns {Boolean} Returns true, if (x,y) is inside or at the boundary the polygon, otherwise false.
         */ hasPoint: function(x, y) {
        var i, len;
        if (this.evalVisProp('hasinnerpoints')) {
            // All points of the polygon trigger hasPoint: inner and boundary points
            if (this.pnpoly(x, y)) {
                return true;
            }
        }
        // Only boundary points trigger hasPoint
        // We additionally test the boundary also in case hasInnerPoints.
        // Since even if the above test has failed, the strokewidth may be large and (x, y) may
        // be inside of hasPoint() of a vertices.
        len = this.borders.length;
        for(i = 0; i < len; i++){
            if (this.borders[i].hasPoint(x, y)) {
                return true;
            }
        }
        return false;
    },
    /**
         * Uses the boards renderer to update the polygon.
         */ updateRenderer: function() {
        var i, len;
        if (!this.needsUpdate) {
            return this;
        }
        if (this.visPropCalc.visible) {
            len = this.vertices.length - (this.elType === "polygonalchain" ? 0 : 1);
            this.isReal = true;
            for(i = 0; i < len; ++i){
                if (!this.vertices[i].isReal) {
                    this.isReal = false;
                    break;
                }
            }
            if (!this.isReal) {
                this.updateVisibility(false);
                for(i in this.childElements){
                    if (this.childElements.hasOwnProperty(i)) {
                        // All child elements are hidden.
                        // This may be weakened to all borders and only vertices with with visible:'inherit'
                        this.childElements[i].setDisplayRendNode(false);
                    }
                }
            }
        }
        if (this.visPropCalc.visible) {
            this.board.renderer.updatePolygon(this);
        }
        /* Update the label if visible. */ if (this.hasLabel && this.visPropCalc.visible && this.label && this.label.visPropCalc.visible && this.isReal) {
            this.label.update();
            this.board.renderer.updateText(this.label);
        }
        // Update rendNode display
        this.setDisplayRendNode();
        this.needsUpdate = false;
        return this;
    },
    /**
         * return TextAnchor
         */ getTextAnchor: function() {
        var a, b, x, y, i;
        if (this.vertices.length === 0) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                1,
                0,
                0
            ], this.board);
        }
        a = this.vertices[0].X();
        b = this.vertices[0].Y();
        x = a;
        y = b;
        for(i = 0; i < this.vertices.length; i++){
            if (this.vertices[i].X() < a) {
                a = this.vertices[i].X();
            }
            if (this.vertices[i].X() > x) {
                x = this.vertices[i].X();
            }
            if (this.vertices[i].Y() > b) {
                b = this.vertices[i].Y();
            }
            if (this.vertices[i].Y() < y) {
                y = this.vertices[i].Y();
            }
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
            (a + x) * 0.5,
            (b + y) * 0.5
        ], this.board);
    },
    getLabelAnchor: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].shortcut(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Polygon.prototype, "getTextAnchor"),
    // documented in geometry element
    cloneToBackground: function() {
        var er, copy = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getCloneObject(this);
        copy.vertices = this.vertices;
        er = this.board.renderer.enhancedRendering;
        this.board.renderer.enhancedRendering = true;
        this.board.renderer.drawPolygon(copy);
        this.board.renderer.enhancedRendering = er;
        this.traces[copy.id] = copy.rendNode;
        return this;
    },
    /**
         * Hide the polygon including its border lines. It will still exist but not visible on the board.
         * @param {Boolean} [borderless=false] If set to true, the polygon is treated as a polygon without
         * borders, i.e. the borders will not be hidden.
         */ hideElement: function(borderless) {
        var i;
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("Element.hideElement()", "Element.setDisplayRendNode()");
        this.visPropCalc.visible = false;
        this.board.renderer.display(this, false);
        if (!borderless) {
            for(i = 0; i < this.borders.length; i++){
                this.borders[i].hideElement();
            }
        }
        if (this.hasLabel && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.label)) {
            this.label.hiddenByParent = true;
            if (this.label.visPropCalc.visible) {
                this.label.hideElement();
            }
        }
    },
    /**
         * Make the element visible.
         * @param {Boolean} [borderless=false] If set to true, the polygon is treated as a polygon without
         * borders, i.e. the borders will not be shown.
         */ showElement: function(borderless) {
        var i;
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("Element.showElement()", "Element.setDisplayRendNode()");
        this.visPropCalc.visible = true;
        this.board.renderer.display(this, true);
        if (!borderless) {
            for(i = 0; i < this.borders.length; i++){
                this.borders[i].showElement().updateRenderer();
            }
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.label) && this.hasLabel && this.label.hiddenByParent) {
            this.label.hiddenByParent = false;
            if (!this.label.visPropCalc.visible) {
                this.label.showElement().updateRenderer();
            }
        }
        return this;
    },
    /**
         * Area of (not self-intersecting) polygon
         * @returns {Number} Area of (not self-intersecting) polygon
         */ Area: function() {
        return Math.abs(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].signedPolygon(this.vertices, true));
    },
    /**
         * Perimeter of polygon. For a polygonal chain, this method returns its length.
         *
         * @returns {Number} Perimeter of polygon in user units.
         * @see JXG.Polygon#L
         *
         * @example
         * var p = [[0.0, 2.0], [2.0, 1.0], [4.0, 6.0], [1.0, 3.0]];
         *
         * var pol = board.create('polygon', p, {hasInnerPoints: true});
         * var t = board.create('text', [5, 5, function() { return pol.Perimeter(); }]);
         * </pre><div class="jxgbox" id="JXGb10b734d-89fc-4b9d-b4a7-e3f0c1c6bf77" style="width: 400px; height: 400px;"></div>
         * <script type="text/javascript">
         *  (function () {
         *   var board = JXG.JSXGraph.initBoard('JXGb10b734d-89fc-4b9d-b4a7-e3f0c1c6bf77', {boundingbox: [-1, 9, 9, -1], axis: false, showcopyright: false, shownavigation: false}),
         *       p = [[0.0, 2.0], [2.0, 1.0], [4.0, 6.0], [1.0, 4.0]],
         *       cc1 = board.create('polygon', p, {hasInnerPoints: true}),
         *       t = board.create('text', [5, 5, function() { return cc1.Perimeter(); }]);
         *  })();
         * </script><pre>
         *
         */ Perimeter: function() {
        var i, len = this.vertices.length, val = 0.0;
        for(i = 1; i < len; ++i){
            val += this.vertices[i].Dist(this.vertices[i - 1]);
        }
        return val;
    },
    /**
         * Alias for Perimeter. For polygons, the perimeter is returned. For polygonal chains the length is returned.
         *
         * @returns Number
         * @see JXG.Polygon#Perimeter
         */ L: function() {
        return this.Perimeter();
    },
    /**
         * Bounding box of a polygon. The bounding box is an array of four numbers: the first two numbers
         * determine the upper left corner, the last two numbers determine the lower right corner of the bounding box.
         *
         * The width and height of a polygon can then determined like this:
         * @example
         * var box = polygon.boundingBox();
         * var width = box[2] - box[0];
         * var height = box[1] - box[3];
         *
         * @returns {Array} Array containing four numbers: [minX, maxY, maxX, minY]
         */ boundingBox: function() {
        var box = [
            0,
            0,
            0,
            0
        ], i, v, le = this.vertices.length - 1;
        if (le === 0) {
            return box;
        }
        box[0] = this.vertices[0].X();
        box[2] = box[0];
        box[1] = this.vertices[0].Y();
        box[3] = box[1];
        for(i = 1; i < le; ++i){
            v = this.vertices[i].X();
            if (v < box[0]) {
                box[0] = v;
            } else if (v > box[2]) {
                box[2] = v;
            }
            v = this.vertices[i].Y();
            if (v > box[1]) {
                box[1] = v;
            } else if (v < box[3]) {
                box[3] = v;
            }
        }
        return box;
    },
    // Already documented in GeometryElement
    bounds: function() {
        return this.boundingBox();
    },
    /**
         * This method removes the SVG or VML nodes of the lines and the filled area from the renderer, to remove
         * the object completely you should use {@link JXG.Board#removeObject}.
         *
         * @private
         */ remove: function() {
        var i;
        for(i = 0; i < this.borders.length; i++){
            this.board.removeObject(this.borders[i]);
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].prototype.remove.call(this);
    },
    /**
         * Finds the index to a given point reference.
         * @param {JXG.Point} p Reference to an element of type {@link JXG.Point}
         * @returns {Number} Index of the point or -1.
         */ findPoint: function(p) {
        var i;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(p)) {
            return -1;
        }
        for(i = 0; i < this.vertices.length; i++){
            if (this.vertices[i].id === p.id) {
                return i;
            }
        }
        return -1;
    },
    /**
         * Add more points to the polygon. The new points will be inserted at the end.
         * The attributes of new border segments are set to the same values
         * as those used when the polygon was created.
         * If new vertices are supplied by coordinates, the default attributes of polygon
         * vertices are taken as their attributes. Therefore, the visual attributes of
         * new vertices and borders may have to be adapted afterwards.
         * @param {JXG.Point} p Arbitrary number of points or coordinate arrays
         * @returns {JXG.Polygon} Reference to the polygon
         * @example
         * var pg = board.create('polygon', [[1,2], [3,4], [-3,1]], {hasInnerPoints: true});
         * var newPoint = board.create('point', [-1, -1]);
         * var newPoint2 = board.create('point', [-1, -2]);
         * pg.addPoints(newPoint, newPoint2, [1, -2]);
         *
         * </pre><div id="JXG70eb0fd2-d20f-4ba9-9ab6-0eac92aabfa5" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG70eb0fd2-d20f-4ba9-9ab6-0eac92aabfa5',
         *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
         *     var pg = board.create('polygon', [[1,2], [3,4], [-3,1]], {hasInnerPoints: true});
         *     var newPoint = board.create('point', [-1, -1]);
         *     var newPoint2 = board.create('point', [-1, -2]);
         *     pg.addPoints(newPoint, newPoint2, [1, -2]);
         *
         *     })();
         *
         * </script><pre>
         *
         */ addPoints: function(p) {
        var idx, args = Array.prototype.slice.call(arguments);
        if (this.elType === "polygonalchain") {
            idx = this.vertices.length - 1;
        } else {
            idx = this.vertices.length - 2;
        }
        return this.insertPoints.apply(this, [
            idx
        ].concat(args));
    },
    /**
         * Insert points to the vertex list of the polygon after index <tt>idx</tt>.
         * The attributes of new border segments are set to the same values
         * as those used when the polygon was created.
         * If new vertices are supplied by coordinates, the default attributes of polygon
         * vertices are taken as their attributes. Therefore, the visual attributes of
         * new vertices and borders may have to be adapted afterwards.
         *
         * @param {Number} idx The position after which the new vertices are inserted.
         * Setting idx to -1 inserts the new points at the front, i.e. at position 0.
         * @param {JXG.Point} p Arbitrary number of points or coordinate arrays to insert.
         * @returns {JXG.Polygon} Reference to the polygon object
         *
         * @example
         * var pg = board.create('polygon', [[1,2], [3,4], [-3,1]], {hasInnerPoints: true});
         * var newPoint = board.create('point', [-1, -1]);
         * pg.insertPoints(0, newPoint, newPoint, [1, -2]);
         *
         * </pre><div id="JXG17b84b2a-a851-4e3f-824f-7f6a60f166ca" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG17b84b2a-a851-4e3f-824f-7f6a60f166ca',
         *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
         *     var pg = board.create('polygon', [[1,2], [3,4], [-3,1]], {hasInnerPoints: true});
         *     var newPoint = board.create('point', [-1, -1]);
         *     pg.insertPoints(0, newPoint, newPoint, [1, -2]);
         *
         *     })();
         *
         * </script><pre>
         *
         */ insertPoints: function(idx, p) {
        var i, le, last, start, q;
        if (arguments.length === 0) {
            return this;
        }
        last = this.vertices.length - 1;
        if (this.elType === "polygon") {
            last--;
        }
        // Wrong insertion index, get out of here
        if (idx < -1 || idx > last) {
            return this;
        }
        le = arguments.length - 1;
        for(i = 1; i < le + 1; i++){
            q = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].providePoints(this.board, [
                arguments[i]
            ], {}, "polygon", [
                "vertices"
            ])[0];
            if (q._is_new) {
                // Add the point as child of the polygon, but not of the borders.
                this.addChild(q);
                delete q._is_new;
            }
            this.vertices.splice(idx + i, 0, q);
        }
        if (this.withLines) {
            start = idx + 1;
            if (this.elType === "polygon") {
                if (idx < 0) {
                    // Add point(s) in the front
                    this.vertices[this.vertices.length - 1] = this.vertices[0];
                    this.borders[this.borders.length - 1].point2 = this.vertices[this.vertices.length - 1];
                } else {
                    // Insert point(s) (middle or end)
                    this.borders[idx].point2 = this.vertices[start];
                }
            } else {
                // Add point(s) in the front: do nothing
                // Else:
                if (idx >= 0) {
                    if (idx < this.borders.length) {
                        // Insert point(s) in the middle
                        this.borders[idx].point2 = this.vertices[start];
                    } else {
                        // Add point at the end
                        start = idx;
                    }
                }
            }
            for(i = start; i < start + le; i++){
                this.borders.splice(i, 0, this.board.create("segment", [
                    this.vertices[i],
                    this.vertices[i + 1]
                ], this.attr_line));
            }
        }
        this.inherits = [];
        this.inherits.push(this.vertices, this.borders);
        this.board.update();
        return this;
    },
    /**
         * Removes given set of vertices from the polygon
         * @param {JXG.Point} p Arbitrary number of vertices as {@link JXG.Point} elements or index numbers
         * @returns {JXG.Polygon} Reference to the polygon
         */ removePoints: function(p) {
        var i, j, idx, firstPoint, nvertices = [], nborders = [], nidx = [], partition = [];
        // Partition:
        // in order to keep the borders which could be recycled, we have to partition
        // the set of removed points. I.e. if the points 1, 2, 5, 6, 7, 10 are removed,
        // the partitions are
        //       1-2, 5-7, 10-10
        // this gives us the borders, that can be removed and the borders we have to create.
        // In case of polygon: remove the last vertex from the list of vertices since
        // it is identical to the first
        if (this.elType === "polygon") {
            firstPoint = this.vertices.pop();
        }
        // Collect all valid parameters as indices in nidx
        for(i = 0; i < arguments.length; i++){
            idx = arguments[i];
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(idx)) {
                idx = this.findPoint(idx);
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber(idx) && idx > -1 && idx < this.vertices.length && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].indexOf(nidx, idx) === -1) {
                nidx.push(idx);
            }
        }
        if (nidx.length === 0) {
            // Wrong index, get out of here
            if (this.elType === "polygon") {
                this.vertices.push(firstPoint);
            }
            return this;
        }
        // Remove the polygon from each removed point's children
        for(i = 0; i < nidx.length; i++){
            this.vertices[nidx[i]].removeChild(this);
        }
        // Sort the elements to be eliminated
        nidx = nidx.sort();
        nvertices = this.vertices.slice();
        nborders = this.borders.slice();
        // Initialize the partition with an array containing the last point to be removed
        if (this.withLines) {
            partition.push([
                nidx[nidx.length - 1]
            ]);
        }
        // Run through all existing vertices and copy all remaining ones to nvertices,
        // compute the partition
        for(i = nidx.length - 1; i > -1; i--){
            nvertices[nidx[i]] = -1;
            // Find gaps between the list of points to be removed.
            // In this case a new partition is added.
            if (this.withLines && nidx.length > 1 && nidx[i] - 1 > nidx[i - 1]) {
                partition[partition.length - 1][1] = nidx[i];
                partition.push([
                    nidx[i - 1]
                ]);
            }
        }
        // Finalize the partition computation
        if (this.withLines) {
            partition[partition.length - 1][1] = nidx[0];
        }
        // Update vertices
        this.vertices = [];
        for(i = 0; i < nvertices.length; i++){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint(nvertices[i])) {
                this.vertices.push(nvertices[i]);
            }
        }
        // Close the polygon again
        if (this.elType === "polygon" && this.vertices.length > 1 && this.vertices[this.vertices.length - 1].id !== this.vertices[0].id) {
            this.vertices.push(this.vertices[0]);
        }
        // Delete obsolete and create missing borders
        if (this.withLines) {
            for(i = 0; i < partition.length; i++){
                for(j = partition[i][1] - 1; j < partition[i][0] + 1; j++){
                    // special cases
                    if (j < 0) {
                        if (this.elType === "polygon") {
                            // First vertex is removed, so the last border has to be removed, too
                            this.board.removeObject(this.borders[nborders.length - 1]);
                            nborders[nborders.length - 1] = -1;
                        }
                    } else if (j < nborders.length) {
                        this.board.removeObject(this.borders[j]);
                        nborders[j] = -1;
                    }
                }
                // Only create the new segment if it's not the closing border.
                // The closing border is getting a special treatment at the end.
                if (partition[i][1] !== 0 && partition[i][0] !== nvertices.length - 1) {
                    // nborders[partition[i][0] - 1] = this.board.create('segment', [
                    //             nvertices[Math.max(partition[i][1] - 1, 0)],
                    //             nvertices[Math.min(partition[i][0] + 1, this.vertices.length - 1)]
                    //         ], this.attr_line);
                    nborders[partition[i][0] - 1] = this.board.create("segment", [
                        nvertices[partition[i][1] - 1],
                        nvertices[partition[i][0] + 1]
                    ], this.attr_line);
                }
            }
            this.borders = [];
            for(i = 0; i < nborders.length; i++){
                if (nborders[i] !== -1) {
                    this.borders.push(nborders[i]);
                }
            }
            // if the first and/or the last vertex is removed, the closing border is created at the end.
            if (this.elType === "polygon" && this.vertices.length > 2 && // Avoid trivial case of polygon with 1 vertex
            (partition[0][1] === this.vertices.length - 1 || partition[partition.length - 1][1] === 0)) {
                this.borders.push(this.board.create("segment", [
                    this.vertices[this.vertices.length - 2],
                    this.vertices[0]
                ], this.attr_line));
            }
        }
        this.inherits = [];
        this.inherits.push(this.vertices, this.borders);
        this.board.update();
        return this;
    },
    // documented in element.js
    getParents: function() {
        this.setParents(this.vertices);
        return this.parents;
    },
    getAttributes: function() {
        var attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].prototype.getAttributes.call(this), i;
        if (this.withLines) {
            attr.lines = attr.lines || {};
            attr.lines.ids = [];
            attr.lines.colors = [];
            for(i = 0; i < this.borders.length; i++){
                attr.lines.ids.push(this.borders[i].id);
                attr.lines.colors.push(this.borders[i].visProp.strokecolor);
            }
        }
        return attr;
    },
    snapToGrid: function() {
        var i, force;
        if (this.evalVisProp('snaptogrid')) {
            force = true;
        } else {
            force = false;
        }
        for(i = 0; i < this.vertices.length; i++){
            this.vertices[i].handleSnapToGrid(force, true);
        }
    },
    /**
         * Moves the polygon by the difference of two coordinates.
         * @param {Number} method The type of coordinates used here. Possible values are {@link JXG.COORDS_BY_USER} and {@link JXG.COORDS_BY_SCREEN}.
         * @param {Array} coords coordinates in screen/user units
         * @param {Array} oldcoords previous coordinates in screen/user units
         * @returns {JXG.Polygon} this element
         */ setPositionDirectly: function(method, coords, oldcoords) {
        var dc, t, i, len, c = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](method, coords, this.board), oldc = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](method, oldcoords, this.board);
        len = this.vertices.length - 1;
        for(i = 0; i < len; i++){
            if (!this.vertices[i].draggable()) {
                return this;
            }
        }
        dc = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$statistics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].subtract(c.usrCoords, oldc.usrCoords);
        t = this.board.create("transform", dc.slice(1), {
            type: "translate"
        });
        t.applyOnce(this.vertices.slice(0, -1));
        return this;
    },
    /**
         * Algorithm by Sutherland and Hodgman to compute the intersection of two convex polygons.
         * The polygon itself is the clipping polygon, it expects as parameter a polygon to be clipped.
         * See <a href="https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm">wikipedia entry</a>.
         * Called by {@link JXG.Polygon#intersect}.
         *
         * @private
         *
         * @param {JXG.Polygon} polygon Polygon which will be clipped.
         *
         * @returns {Array} of (normalized homogeneous user) coordinates (i.e. [z, x, y], where z==1 in most cases,
         *   representing the vertices of the intersection polygon.
         *
         */ sutherlandHodgman: function(polygon) {
        // First the two polygons are sorted counter clockwise
        var clip = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Math.Geometry.sortVertices(this.vertices), subject = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Math.Geometry.sortVertices(polygon.vertices), lenClip = clip.length - 1, lenSubject = subject.length - 1, lenIn, outputList = [], inputList, i, j, S, E, cross, // Determines if the point c3 is right of the line through c1 and c2.
        // Since the polygons are sorted counter clockwise, "right of" and therefore >= is needed here
        isInside = function(c1, c2, c3) {
            return (c2[1] - c1[1]) * (c3[2] - c1[2]) - (c2[2] - c1[2]) * (c3[1] - c1[1]) >= 0;
        };
        for(i = 0; i < lenSubject; i++){
            outputList.push(subject[i]);
        }
        for(i = 0; i < lenClip; i++){
            inputList = outputList.slice(0);
            lenIn = inputList.length;
            outputList = [];
            S = inputList[lenIn - 1];
            for(j = 0; j < lenIn; j++){
                E = inputList[j];
                if (isInside(clip[i], clip[i + 1], E)) {
                    if (!isInside(clip[i], clip[i + 1], S)) {
                        cross = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Math.Geometry.meetSegmentSegment(S, E, clip[i], clip[i + 1]);
                        cross[0][1] /= cross[0][0];
                        cross[0][2] /= cross[0][0];
                        cross[0][0] = 1;
                        outputList.push(cross[0]);
                    }
                    outputList.push(E);
                } else if (isInside(clip[i], clip[i + 1], S)) {
                    cross = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Math.Geometry.meetSegmentSegment(S, E, clip[i], clip[i + 1]);
                    cross[0][1] /= cross[0][0];
                    cross[0][2] /= cross[0][0];
                    cross[0][0] = 1;
                    outputList.push(cross[0]);
                }
                S = E;
            }
        }
        return outputList;
    },
    /**
         * Generic method for the intersection of this polygon with another polygon.
         * The parent object is the clipping polygon, it expects as parameter a polygon to be clipped.
         * Both polygons have to be convex.
         * Calls the algorithm by Sutherland, Hodgman, {@link JXG.Polygon#sutherlandHodgman}.
         * <p>
         * An alternative is to use the methods from {@link JXG.Math.Clip}, where the algorithm by Greiner and Hormann
         * is used.
         *
         * @param {JXG.Polygon} polygon Polygon which will be clipped.
         *
         * @returns {Array} of (normalized homogeneous user) coordinates (i.e. [z, x, y], where z==1 in most cases,
         *   representing the vertices of the intersection polygon.
         *
         * @example
         *  // Static intersection of two polygons pol1 and pol2
         *  var pol1 = board.create('polygon', [[-2, 3], [-4, -3], [2, 0], [4, 4]], {
         *                name:'pol1', withLabel: true,
         *                fillColor: 'yellow'
         *             });
         *  var pol2 = board.create('polygon', [[-2, -3], [-4, 1], [0, 4], [5, 1]], {
         *                name:'pol2', withLabel: true
         *             });
         *
         *  // Static version:
         *  // the intersection polygon does not adapt to changes of pol1 or pol2.
         *  var pol3 = board.create('polygon', pol1.intersect(pol2), {fillColor: 'blue'});
         * </pre><div class="jxgbox" id="JXGd1fe5ea9-309f-494a-af07-ee3d033acb7c" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *   (function() {
         *       var board = JXG.JSXGraph.initBoard('JXGd1fe5ea9-309f-494a-af07-ee3d033acb7c', {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
         *       // Intersect two polygons pol1 and pol2
         *       var pol1 = board.create('polygon', [[-2, 3], [-4, -3], [2, 0], [4, 4]], {
         *                name:'pol1', withLabel: true,
         *                fillColor: 'yellow'
         *             });
         *       var pol2 = board.create('polygon', [[-2, -3], [-4, 1], [0, 4], [5, 1]], {
         *                name:'pol2', withLabel: true
         *             });
         *
         *       // Static version: the intersection polygon does not adapt to changes of pol1 or pol2.
         *       var pol3 = board.create('polygon', pol1.intersect(pol2), {fillColor: 'blue'});
         *   })();
         * </script><pre>
         *
         * @example
         *  // Dynamic intersection of two polygons pol1 and pol2
         *  var pol1 = board.create('polygon', [[-2, 3], [-4, -3], [2, 0], [4, 4]], {
         *                name:'pol1', withLabel: true,
         *                fillColor: 'yellow'
         *             });
         *  var pol2 = board.create('polygon', [[-2, -3], [-4, 1], [0, 4], [5, 1]], {
         *                name:'pol2', withLabel: true
         *             });
         *
         *  // Dynamic version:
         *  // the intersection polygon does adapt to changes of pol1 or pol2.
         *  // For this a curve element is used.
         *  var curve = board.create('curve', [[],[]], {fillColor: 'blue', fillOpacity: 0.4});
         *  curve.updateDataArray = function() {
         *      var mat = JXG.Math.transpose(pol1.intersect(pol2));
         *
         *      if (mat.length == 3) {
         *          this.dataX = mat[1];
         *          this.dataY = mat[2];
         *      } else {
         *          this.dataX = [];
         *          this.dataY = [];
         *      }
         *  };
         *  board.update();
         * </pre><div class="jxgbox" id="JXGf870d516-ca1a-4140-8fe3-5d64fb42e5f2" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *   (function() {
         *       var board = JXG.JSXGraph.initBoard('JXGf870d516-ca1a-4140-8fe3-5d64fb42e5f2', {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
         *       // Intersect two polygons pol1 and pol2
         *       var pol1 = board.create('polygon', [[-2, 3], [-4, -3], [2, 0], [4, 4]], {
         *                name:'pol1', withLabel: true,
         *                fillColor: 'yellow'
         *             });
         *       var pol2 = board.create('polygon', [[-2, -3], [-4, 1], [0, 4], [5, 1]], {
         *                name:'pol2', withLabel: true
         *             });
         *
         *  // Dynamic version:
         *  // the intersection polygon does  adapt to changes of pol1 or pol2.
         *  // For this a curve element is used.
         *    var curve = board.create('curve', [[],[]], {fillColor: 'blue', fillOpacity: 0.4});
         *    curve.updateDataArray = function() {
         *        var mat = JXG.Math.transpose(pol1.intersect(pol2));
         *
         *        if (mat.length == 3) {
         *            this.dataX = mat[1];
         *            this.dataY = mat[2];
         *        } else {
         *            this.dataX = [];
         *            this.dataY = [];
         *        }
         *    };
         *    board.update();
         *   })();
         * </script><pre>
         *
         */ intersect: function(polygon) {
        return this.sutherlandHodgman(polygon);
    }
});
/**
 * @class A polygon is a plane figure made up of line segments (the borders) connected
 * to form a closed polygonal chain.
 * It is determined by
 * <ul>
 *    <li> a list of points or
 *    <li> a list of coordinate arrays or
 *    <li> a function returning a list of coordinate arrays.
 * </ul>
 * Each two consecutive points of the list define a line.
 * @pseudo
 * @constructor
 * @name Polygon
 * @type JXG.Polygon
 * @augments JXG.Polygon
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {Array} vertices The polygon's vertices. If the first and the last vertex don't match the first one will be
 * added to the array by the creator. Here, two points match if they have the same 'id' attribute.
 *
 * Additionally, a polygon can be created by providing a polygon and a transformation (or an array of transformations).
 * The result is a polygon which is the transformation of the supplied polygon.
 *
 * @example
 * var p1 = board.create('point', [0.0, 2.0]);
 * var p2 = board.create('point', [2.0, 1.0]);
 * var p3 = board.create('point', [4.0, 6.0]);
 * var p4 = board.create('point', [1.0, 4.0]);
 *
 * var pol = board.create('polygon', [p1, p2, p3, p4]);
 * </pre><div class="jxgbox" id="JXG682069e9-9e2c-4f63-9b73-e26f8a2b2bb1" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *  (function () {
 *   var board = JXG.JSXGraph.initBoard('JXG682069e9-9e2c-4f63-9b73-e26f8a2b2bb1', {boundingbox: [-1, 9, 9, -1], axis: false, showcopyright: false, shownavigation: false}),
 *       p1 = board.create('point', [0.0, 2.0]),
 *       p2 = board.create('point', [2.0, 1.0]),
 *       p3 = board.create('point', [4.0, 6.0]),
 *       p4 = board.create('point', [1.0, 4.0]),
 *       cc1 = board.create('polygon', [p1, p2, p3, p4]);
 *  })();
 * </script><pre>
 *
 * @example
 * var p = [[0.0, 2.0], [2.0, 1.0], [4.0, 6.0], [1.0, 3.0]];
 *
 * var pol = board.create('polygon', p, {hasInnerPoints: true});
 * </pre><div class="jxgbox" id="JXG9f9a5946-112a-4768-99ca-f30792bcdefb" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *  (function () {
 *   var board = JXG.JSXGraph.initBoard('JXG9f9a5946-112a-4768-99ca-f30792bcdefb', {boundingbox: [-1, 9, 9, -1], axis: false, showcopyright: false, shownavigation: false}),
 *       p = [[0.0, 2.0], [2.0, 1.0], [4.0, 6.0], [1.0, 4.0]],
 *       cc1 = board.create('polygon', p, {hasInnerPoints: true});
 *  })();
 * </script><pre>
 *
 * @example
 *   var f1 = function() { return [0.0, 2.0]; },
 *       f2 = function() { return [2.0, 1.0]; },
 *       f3 = function() { return [4.0, 6.0]; },
 *       f4 = function() { return [1.0, 4.0]; },
 *       cc1 = board.create('polygon', [f1, f2, f3, f4]);
 *       board.update();
 *
 * </pre><div class="jxgbox" id="JXGceb09915-b783-44db-adff-7877ae3534c8" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *  (function () {
 *   var board = JXG.JSXGraph.initBoard('JXGceb09915-b783-44db-adff-7877ae3534c8', {boundingbox: [-1, 9, 9, -1], axis: false, showcopyright: false, shownavigation: false}),
 *       f1 = function() { return [0.0, 2.0]; },
 *       f2 = function() { return [2.0, 1.0]; },
 *       f3 = function() { return [4.0, 6.0]; },
 *       f4 = function() { return [1.0, 4.0]; },
 *       cc1 = board.create('polygon', [f1, f2, f3, f4]);
 *       board.update();
 *  })();
 * </script><pre>
 *
 * @example
 * var t = board.create('transform', [2, 1.5], {type: 'scale'});
 * var a = board.create('point', [-3,-2], {name: 'a'});
 * var b = board.create('point', [-1,-4], {name: 'b'});
 * var c = board.create('point', [-2,-0.5], {name: 'c'});
 * var pol1 = board.create('polygon', [a,b,c], {vertices: {withLabel: false}});
 * var pol2 = board.create('polygon', [pol1, t], {vertices: {withLabel: true}});
 *
 * </pre><div id="JXG6530a69c-6339-11e8-9fb9-901b0e1b8723" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG6530a69c-6339-11e8-9fb9-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var t = board.create('transform', [2, 1.5], {type: 'scale'});
 *     var a = board.create('point', [-3,-2], {name: 'a'});
 *     var b = board.create('point', [-1,-4], {name: 'b'});
 *     var c = board.create('point', [-2,-0.5], {name: 'c'});
 *     var pol1 = board.create('polygon', [a,b,c], {vertices: {withLabel: false}});
 *     var pol2 = board.create('polygon', [pol1, t], {vertices: {withLabel: true}});
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createPolygon = function(board, parents, attributes) {
    var el, i, le, obj, points = [], attr, attr_points, is_transform = false;
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "polygon");
    obj = board.select(parents[0]);
    if (obj === null) {
        // This is necessary if the original polygon is defined in another board.
        obj = parents[0];
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isObject(obj) && obj.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isTransformationOrArray(parents[1])) {
        is_transform = true;
        le = obj.vertices.length - 1;
        attr_points = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "polygon", "vertices");
        for(i = 0; i < le; i++){
            if (attr_points.withlabel) {
                attr_points.name = obj.vertices[i].name === "" ? "" : obj.vertices[i].name + "'";
            }
            points.push(board.create("point", [
                obj.vertices[i],
                parents[1]
            ], attr_points));
        }
    } else {
        points = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].providePoints(board, parents, attributes, "polygon", [
            "vertices"
        ]);
        if (points === false) {
            throw new Error("JSXGraph: Can't create polygon / polygonalchain with parent types other than 'point' and 'coordinate arrays' or a function returning an array of coordinates. Alternatively, a polygon and a transformation can be supplied");
        }
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "polygon");
    el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Polygon(board, points, attr);
    el.isDraggable = true;
    // Put the points to their position
    if (is_transform) {
        el.prepareUpdate().update().updateVisibility().updateRenderer();
        le = obj.vertices.length - 1;
        for(i = 0; i < le; i++){
            points[i].prepareUpdate().update().updateVisibility().updateRenderer();
        }
    }
    return el;
};
/**
 * @class A regular polygon is a polygon that is
 * direct equiangular (all angles are equal in measure) and equilateral (all sides have the same length).
 * It needs two points which define the base line and the number of vertices.
 * @pseudo
 * @description Constructs a regular polygon. It needs two points which define the base line and the number of vertices, or a set of points.
 * @constructor
 * @name RegularPolygon
 * @type Polygon
 * @augments Polygon
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point_JXG.Point_Number} p1,p2,n The constructed regular polygon has n vertices and the base line defined by p1 and p2.
 * @example
 * var p1 = board.create('point', [0.0, 2.0]);
 * var p2 = board.create('point', [2.0, 1.0]);
 *
 * var pol = board.create('regularpolygon', [p1, p2, 5]);
 * </pre><div class="jxgbox" id="JXG682069e9-9e2c-4f63-9b73-e26f8a2b2bb1" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *  (function () {
 *   var board = JXG.JSXGraph.initBoard('JXG682069e9-9e2c-4f63-9b73-e26f8a2b2bb1', {boundingbox: [-1, 9, 9, -1], axis: false, showcopyright: false, shownavigation: false}),
 *       p1 = board.create('point', [0.0, 2.0]),
 *       p2 = board.create('point', [2.0, 1.0]),
 *       cc1 = board.create('regularpolygon', [p1, p2, 5]);
 *  })();
 * </script><pre>
 * @example
 * var p1 = board.create('point', [0.0, 2.0]);
 * var p2 = board.create('point', [4.0,4.0]);
 * var p3 = board.create('point', [2.0,0.0]);
 *
 * var pol = board.create('regularpolygon', [p1, p2, p3]);
 * </pre><div class="jxgbox" id="JXG096a78b3-bd50-4bac-b958-3be5e7df17ed" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXG096a78b3-bd50-4bac-b958-3be5e7df17ed', {boundingbox: [-1, 9, 9, -1], axis: false, showcopyright: false, shownavigation: false}),
 *       p1 = board.create('point', [0.0, 2.0]),
 *       p2 = board.create('point', [4.0, 4.0]),
 *       p3 = board.create('point', [2.0,0.0]),
 *       cc1 = board.create('regularpolygon', [p1, p2, p3]);
 * })();
 * </script><pre>
 *
 * @example
 *         // Line of reflection
 *         var li = board.create('line', [1,1,1], {strokeColor: '#aaaaaa'});
 *         var reflect = board.create('transform', [li], {type: 'reflect'});
 *         var pol1 = board.create('polygon', [[-3,-2], [-1,-4], [-2,-0.5]]);
 *         var pol2 = board.create('polygon', [pol1, reflect]);
 *
 * </pre><div id="JXG58fc3078-d8d1-11e7-93b3-901b0e1b8723" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG58fc3078-d8d1-11e7-93b3-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *             var li = board.create('line', [1,1,1], {strokeColor: '#aaaaaa'});
 *             var reflect = board.create('transform', [li], {type: 'reflect'});
 *             var pol1 = board.create('polygon', [[-3,-2], [-1,-4], [-2,-0.5]]);
 *             var pol2 = board.create('polygon', [pol1, reflect]);
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createRegularPolygon = function(board, parents, attributes) {
    var el, i, n, p = [], rot, len, pointsExist, attr;
    len = parents.length;
    n = parents[len - 1];
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber(n) && (parents.length !== 3 || n < 3)) {
        throw new Error("JSXGraph: A regular polygon needs two point types and a number > 2 as input.");
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber(board.select(n))) {
        // Regular polygon given by 2 points and a number
        len--;
        pointsExist = false;
    } else {
        // Regular polygon given by n points
        n = len;
        pointsExist = true;
    }
    p = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].providePoints(board, parents.slice(0, len), attributes, "regularpolygon", [
        "vertices"
    ]);
    if (p === false) {
        throw new Error("JSXGraph: Can't create regular polygon with parent types other than 'point' and 'coordinate arrays' or a function returning an array of coordinates");
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "regularpolygon", "vertices");
    for(i = 2; i < n; i++){
        rot = board.create("transform", [
            Math.PI * (2 - (n - 2) / n),
            p[i - 1]
        ], {
            type: "rotate"
        });
        if (pointsExist) {
            p[i].addTransform(p[i - 2], rot);
            p[i].fullUpdate();
        } else {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(attr.ids) && attr.ids.length >= n - 2) {
                attr.id = attr.ids[i - 2];
            }
            p[i] = board.create("point", [
                p[i - 2],
                rot
            ], attr);
            p[i].type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_CAS;
            // The next two lines of code are needed to make regular polygons draggable
            // The new helper points are set to be draggable.
            p[i].isDraggable = true;
            p[i].visProp.fixed = false;
        }
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "regularpolygon");
    el = board.create("polygon", p, attr);
    el.elType = "regularpolygon";
    return el;
};
/**
 * @class  A polygonal chain is a connected series of line segments (borders).
 * It is determined by
 * <ul>
 *    <li> a list of points or
 *    <li> a list of coordinate arrays or
 *    <li> a function returning a list of coordinate arrays.
 * </ul>
 * Each two consecutive points of the list define a line.
 * In JSXGraph, a polygonal chain is simply realized as polygon without the last - closing - point.
 * This may lead to unexpected results. Polygonal chains can be distinguished from polygons by the attribute 'elType' which
 * is 'polygonalchain' for the first and 'polygon' for the latter.
 * @pseudo
 * @constructor
 * @name PolygonalChain
 * @type Polygon
 * @augments JXG.Polygon
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {Array} vertices The polygon's vertices.
 *
 * Additionally, a polygonal chain can be created by providing a polygonal chain and a transformation (or an array of transformations).
 * The result is a polygonal chain which is the transformation of the supplied polygonal chain.
 *
 * @example
 *     var attr = {
 *             snapToGrid: true
 *         },
 *         p = [];
 *
 * 	p.push(board.create('point', [-4, 0], attr));
 * 	p.push(board.create('point', [-1, -3], attr));
 * 	p.push(board.create('point', [0, 2], attr));
 * 	p.push(board.create('point', [2, 1], attr));
 * 	p.push(board.create('point', [4, -2], attr));
 *
 *  var chain = board.create('polygonalchain', p, {borders: {strokeWidth: 3}});
 *
 * </pre><div id="JXG878f93d8-3e49-46cf-aca2-d3bb7d60c5ae" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG878f93d8-3e49-46cf-aca2-d3bb7d60c5ae',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *         var attr = {
 *                 snapToGrid: true
 *             },
 *             p = [];
 *
 *     	p.push(board.create('point', [-4, 0], attr));
 *     	p.push(board.create('point', [-1, -3], attr));
 *     	p.push(board.create('point', [0, 2], attr));
 *     	p.push(board.create('point', [2, 1], attr));
 *     	p.push(board.create('point', [4, -2], attr));
 *
 *         var chain = board.create('polygonalchain', p, {borders: {strokeWidth: 3}});
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createPolygonalChain = function(board, parents, attributes) {
    var attr, el;
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "polygonalchain");
    el = board.create("polygon", parents, attr);
    el.elType = "polygonalchain";
    // A polygonal chain is not necessarily closed.
    el.vertices.pop();
    board.removeObject(el.borders[el.borders.length - 1]);
    el.borders.pop();
    return el;
};
/**
 * @class A quadrilateral polygon with parallel opposite sides.
 * @pseudo
 * @description Constructs a parallelogram. As input, three points or coordinate arrays are expected.
 * @constructor
 * @name Parallelogram
 * @type Polygon
 * @augments Polygon
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Point,Array_JXG.Point,Array_JXG.Point,Array} p1,p2,p3 The parallelogram is a polygon through
 * the points [p1, p2, pp, p3], where pp is a parallelpoint, available as sub-object parallelogram.parallelPoint.
 *
 * @example
 * var p1 = board.create('point', [-3, -4]);
 * var p2 = board.create('point', [3, -1]);
 * var p3 = board.create('point', [-2, 0]);
 * var par = board.create('parallelogram', [p1, p2, p3], {
 *     hasInnerPoints: true,
 *     parallelpoint: {
 *         size: 6,
 *         face: '<<>>'
 *     }
 * });
 *
 * </pre><div id="JXG05ff162f-7cee-4fd2-bd90-3d9ee5b489cc" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG05ff162f-7cee-4fd2-bd90-3d9ee5b489cc',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var p1 = board.create('point', [-3, -4]);
 *     var p2 = board.create('point', [3, -1]);
 *     var p3 = board.create('point', [-2, 0]);
 *     var par = board.create('parallelogram', [p1, p2, p3], {
 *         hasInnerPoints: true,
 *         parallelpoint: {
 *             size: 6,
 *             face: '<<>>'
 *         }
 *     });
 *
 *     })();
 *
 * </script><pre>
 *
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createParallelogram = function(board, parents, attributes) {
    var el, pp, points = [], attr, attr_pp;
    points = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].providePoints(board, parents, attributes, "polygon", [
        "vertices"
    ]);
    if (points === false || points.length < 3) {
        throw new Error("JSXGraph: Can't create parallelogram with parent types other than 'point' and 'coordinate arrays' or a function returning an array of coordinates.");
    }
    attr_pp = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "parallelogram", "parallelpoint");
    pp = board.create('parallelpoint', points, attr_pp);
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "parallelogram");
    el = board.create('polygon', [
        points[0],
        points[1],
        pp,
        points[2]
    ], attr);
    el.elType = 'parallelogram';
    /**
     * Parallel point which makes the quadrilateral a parallelogram. Can also be accessed with
     * parallelogram.vertices[2].
     * @name Parallelogram#parallelPoint
     * @type {JXG.Point}
     */ el.parallelPoint = pp;
    el.isDraggable = true;
    pp.isDraggable = true;
    pp.visProp.fixed = false;
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("polygon", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createPolygon);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("regularpolygon", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createRegularPolygon);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("polygonalchain", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createPolygonalChain);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("parallelogram", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createParallelogram);
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Polygon;
 // export default {
 //     Polygon: JXG.Polygon,
 //     createPolygon: JXG.createPolygon,
 //     createRegularPolygon: JXG.createRegularPolygon
 // };
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/image.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 * @fileoverview In this file the geometry element Image is defined.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coords.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coordselement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coordselement.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
/**
 * Construct and handle images
 *
 * The image can be supplied as an URL or an base64 encoded inline image
 * like "data:image/png;base64, /9j/4AAQSkZJRgA..." or a function returning
 * an URL: function(){ return 'xxx.png; }.
 *
 * @class Creates a new image object. Do not use this constructor to create a image. Use {@link JXG.Board#create} with
 * type {@link Image} instead.
 * @augments JXG.GeometryElement
 * @augments JXG.CoordsElement
 * @param {string|JXG.Board} board The board the new image is drawn on.
 * @param {Array} coordinates An array with the user coordinates of the image.
 * @param {Object} attributes An object containing visual and - optionally - a name and an id.
 * @param {string|function} url An URL string or a function returning an URL string.
 * @param  {Array} size Array containing width and height of the image in user coordinates.
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Image = function(board, coords, attributes, url, size) {
    this.constructor(board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_IMAGE, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_OTHER);
    this.element = this.board.select(attributes.anchor);
    this.coordsConstructor(coords);
    this.W = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createFunction(size[0], this.board, "");
    this.H = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createFunction(size[1], this.board, "");
    this.addParentsFromJCFunctions([
        this.W,
        this.H
    ]);
    this.usrSize = [
        this.W(),
        this.H()
    ];
    /**
     * Array of length two containing [width, height] of the image in pixel.
     * @type array
     */ this.size = [
        Math.abs(this.usrSize[0] * board.unitX),
        Math.abs(this.usrSize[1] * board.unitY)
    ];
    /**
     * 'href' of the image. This might be an URL, but also a data-uri is allowed.
     * @type string
     */ this.url = url;
    this.elType = "image";
    // span contains the anchor point and the two vectors
    // spanning the image rectangle.
    this.span = [
        this.coords.usrCoords.slice(0),
        [
            this.coords.usrCoords[0],
            this.W(),
            0
        ],
        [
            this.coords.usrCoords[0],
            0,
            this.H()
        ]
    ];
    //this.parent = board.select(attributes.anchor);
    this.id = this.board.setId(this, "Im");
    this.board.renderer.drawImage(this);
    this.board.finalizeAdding(this);
    this.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(this.methodMap, {
        addTransformation: "addTransform",
        trans: "addTransform",
        W: "W",
        Width: "W",
        H: "H",
        Height: "H",
        setSize: "setSize"
    });
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Image.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyPrototypeMethods(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Image, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coordselement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], "coordsConstructor");
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Image.prototype, /** @lends JXG.Image.prototype */ {
    /**
         * Checks whether (x,y) is over or near the image;
         * @param {Number} x Coordinate in x direction, screen coordinates.
         * @param {Number} y Coordinate in y direction, screen coordinates.
         * @returns {Boolean} True if (x,y) is over the image, False otherwise.
         */ hasPoint: function(x, y) {
        var dx, dy, r, type, prec, c, v, p, dot, len = this.transformations.length;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isObject(this.evalVisProp('precision'))) {
            type = this.board._inputDevice;
            prec = this.evalVisProp('precision.' + type);
        } else {
            // 'inherit'
            prec = this.board.options.precision.hasPoint;
        }
        // Easy case: no transformation
        if (len === 0) {
            dx = x - this.coords.scrCoords[1];
            dy = this.coords.scrCoords[2] - y;
            r = prec;
            return dx >= -r && dx - this.size[0] <= r && dy >= -r && dy - this.size[1] <= r;
        }
        // Image is transformed
        c = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, [
            x,
            y
        ], this.board);
        // v is the vector from anchor point to the drag point
        c = c.usrCoords;
        v = [
            c[0] - this.span[0][0],
            c[1] - this.span[0][1],
            c[2] - this.span[0][2]
        ];
        dot = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].innerProduct; // shortcut
        // Project the drag point to the sides.
        p = dot(v, this.span[1]);
        if (0 <= p && p <= dot(this.span[1], this.span[1])) {
            p = dot(v, this.span[2]);
            if (0 <= p && p <= dot(this.span[2], this.span[2])) {
                return true;
            }
        }
        return false;
    },
    /**
         * Recalculate the coordinates of lower left corner and the width and height.
         *
         * @returns {JXG.GeometryElement} A reference to the element
         * @private
         */ update: function(fromParent) {
        if (!this.needsUpdate) {
            return this;
        }
        this.updateCoords(fromParent);
        this.updateSize();
        this.updateSpan();
        return this;
    },
    /**
         * Send an update request to the renderer.
         * @private
         */ updateRenderer: function() {
        return this.updateRendererGeneric("updateImage");
    },
    /**
         * Updates the internal arrays containing size of the image.
         * @returns {JXG.GeometryElement} A reference to the element
         * @private
         */ updateSize: function() {
        this.usrSize = [
            this.W(),
            this.H()
        ];
        this.size = [
            Math.abs(this.usrSize[0] * this.board.unitX),
            Math.abs(this.usrSize[1] * this.board.unitY)
        ];
        return this;
    },
    /**
         * Update the anchor point of the image, i.e. the lower left corner
         * and the two vectors which span the rectangle.
         * @returns {JXG.GeometryElement} A reference to the element
         * @private
         *
         */ updateSpan: function() {
        var i, j, len = this.transformations.length, v = [];
        if (len === 0) {
            this.span = [
                [
                    this.Z(),
                    this.X(),
                    this.Y()
                ],
                [
                    this.Z(),
                    this.W(),
                    0
                ],
                [
                    this.Z(),
                    0,
                    this.H()
                ]
            ];
        } else {
            // v contains the three defining corners of the rectangle/image
            v[0] = [
                this.Z(),
                this.X(),
                this.Y()
            ];
            v[1] = [
                this.Z(),
                this.X() + this.W(),
                this.Y()
            ];
            v[2] = [
                this.Z(),
                this.X(),
                this.Y() + this.H()
            ];
            // Transform the three corners
            for(i = 0; i < len; i++){
                for(j = 0; j < 3; j++){
                    v[j] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matVecMult(this.transformations[i].matrix, v[j]);
                }
            }
            // Normalize the vectors
            for(j = 0; j < 3; j++){
                v[j][1] /= v[j][0];
                v[j][2] /= v[j][0];
                v[j][0] /= v[j][0];
            }
            // Compute the two vectors spanning the rectangle
            // by subtracting the anchor point.
            for(j = 1; j < 3; j++){
                v[j][0] -= v[0][0];
                v[j][1] -= v[0][1];
                v[j][2] -= v[0][2];
            }
            this.span = v;
        }
        return this;
    },
    addTransform: function(transform) {
        var i;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(transform)) {
            for(i = 0; i < transform.length; i++){
                this.transformations.push(transform[i]);
            }
        } else {
            this.transformations.push(transform);
        }
        return this;
    },
    // Documented in element.js
    getParents: function() {
        var p = [
            this.url,
            [
                this.Z(),
                this.X(),
                this.Y()
            ],
            this.usrSize
        ];
        if (this.parents.length !== 0) {
            p = this.parents;
        }
        return p;
    },
    /**
         * Set the width and height of the image. After setting a new size,
         * board.update() or image.fullUpdate()
         * has to be called to make the change visible.
         * @param  {number|function|string} width  Number, function or string
         *                            that determines the new width of the image
         * @param  {number|function|string} height Number, function or string
         *                            that determines the new height of the image
         * @returns {JXG.GeometryElement} A reference to the element
         *
         * @example
         * var im = board.create('image', ['https://jsxgraph.org/distrib/images/uccellino.jpg',
         *                                [-3,-2], [3,3]]);
         * im.setSize(4, 4);
         * board.update();
         *
         * </pre><div id="JXG8411e60c-f009-11e5-b1bf-901b0e1b8723" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG8411e60c-f009-11e5-b1bf-901b0e1b8723',
         *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
         *     var im = board.create('image', ['https://jsxgraph.org/distrib/images/uccellino.jpg', [-3,-2],    [3,3]]);
         *     //im.setSize(4, 4);
         *     //board.update();
         *
         *     })();
         *
         * </script><pre>
         *
         * @example
         * var p0 = board.create('point', [-3, -2]),
         *     im = board.create('image', ['https://jsxgraph.org/distrib/images/uccellino.jpg',
         *                     [function(){ return p0.X(); }, function(){ return p0.Y(); }],
         *                     [3,3]]),
         *     p1 = board.create('point', [1, 2]);
         *
         * im.setSize(function(){ return p1.X() - p0.X(); }, function(){ return p1.Y() - p0.Y(); });
         * board.update();
         *
         * </pre><div id="JXG4ce706c0-f00a-11e5-b1bf-901b0e1b8723" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG4ce706c0-f00a-11e5-b1bf-901b0e1b8723',
         *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
         *     var p0 = board.create('point', [-3, -2]),
         *         im = board.create('image', ['https://jsxgraph.org/distrib/images/uccellino.jpg',
         *                         [function(){ return p0.X(); }, function(){ return p0.Y(); }],
         *                         [3,3]]),
         *         p1 = board.create('point', [1, 2]);
         *
         *     im.setSize(function(){ return p1.X() - p0.X(); }, function(){ return p1.Y() - p0.Y(); });
         *     board.update();
         *
         *     })();
         *
         * </script><pre>
         *
         */ setSize: function(width, height) {
        this.W = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createFunction(width, this.board, "");
        this.H = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createFunction(height, this.board, "");
        this.addParentsFromJCFunctions([
            this.W,
            this.H
        ]);
        // this.fullUpdate();
        return this;
    },
    /**
         * Returns the width of the image in user coordinates.
         * @returns {number} width of the image in user coordinates
         */ W: function() {},
    /**
         * Returns the height of the image in user coordinates.
         * @returns {number} height of the image in user coordinates
         */ H: function() {} // Needed for docs, defined in constructor
});
/**
 * @class Display of an external image.
 * @pseudo
 * @name Image
 * @type JXG.Image
 * @augments JXG.Image
 * @constructor
 * @constructor
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {string,function_Array_Array} url,coords,size url defines the location of the image data. The array coords contains the user coordinates
 * of the lower left corner of the image.
 *   It can consist of two or three elements of type number, a string containing a GEONE<sub>x</sub>T
 *   constraint, or a function which takes no parameter and returns a number. Every element determines one coordinate. If a coordinate is
 *   given by a number, the number determines the initial position of a free image. If given by a string or a function that coordinate will be constrained
 *   that means the user won't be able to change the image's position directly by mouse because it will be calculated automatically depending on the string
 *   or the function's return value. If two parent elements are given the coordinates will be interpreted as 2D affine Euclidean coordinates, if three such
 *   parent elements are given they will be interpreted as homogeneous coordinates.
 * <p>
 * The array size defines the image's width and height in user coordinates.
 * @example
 * var im = board.create('image', ['https://jsxgraph.org/jsxgraph/distrib/images/uccellino.jpg', [-3,-2], [3,3]]);
 *
 * </pre><div class="jxgbox" id="JXG9850cda0-7ea0-4750-981c-68bacf9cca57" style="width: 400px; height: 400px;"></div>
 * <script type="text/javascript">
 *   var image_board = JXG.JSXGraph.initBoard('JXG9850cda0-7ea0-4750-981c-68bacf9cca57', {boundingbox: [-4, 4, 4, -4], axis: true, showcopyright: false, shownavigation: false});
 *   var image_im = image_board.create('image', ['https://jsxgraph.org/distrib/images/uccellino.jpg', [-3,-2],[3,3]]);
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createImage = function(board, parents, attributes) {
    var attr, im, url = parents[0], coords = parents[1], size = parents[2];
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "image");
    im = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coordselement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Image, board, coords, attr, url, size);
    if (!im) {
        throw new Error("JSXGraph: Can't create image with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [x,y], [z,x,y], [element,transformation]");
    }
    if (attr.rotate !== 0) {
        // This is the default value, i.e. no rotation
        im.addRotation(attr.rotate);
    }
    return im;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("image", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createImage);
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Image;
 // export default {
 //     Image: JXG.Image,
 //     createImage: JXG.createImage
 // };
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/chart.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, define: true, document: true*/ /*jslint nomen: true, plusplus: true*/ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/numerics.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coords.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$parser$2f$datasource$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/parser/datasource.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/color.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/env.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
// import Statistics from "../math/statistics.js";
// import Curve from "./curve.js";
// import Point from "./point.js";
// import Text from "./text.js";
// import Polygon from "./polygon.js";
// import Sector from "../element/sector.js";
// import Transform from "./transformation.js";
// import Line from "./line.js";
// import Circle from "./circle.js";
/**
 *
 * The Chart class is a basic class for the chart object.
 * @class Creates a new basic chart object. Do not use this constructor to create a chart.
 * Use {@link JXG.Board#create} with type {@link Chart} instead.
 * @constructor
 * @augments JXG.GeometryElement
 * @param {String|JXG.Board} board The board the new chart is drawn on.
 * @param {Array} parent data arrays for the chart
 * @param {Object} attributes Javascript object containing attributes like name, id and colors.
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Chart = function(board, parents, attributes) {
    this.constructor(board, attributes);
    var x, y, i, c, style, len;
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(parents) || parents.length === 0) {
        throw new Error("JSXGraph: Can't create a chart without data");
    }
    /**
     * Contains pointers to the various subelements of the chart.
     */ this.elements = [];
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber(parents[0])) {
        // parents looks like [a,b,c,..]
        // x has to be filled
        y = parents;
        x = [];
        for(i = 0; i < y.length; i++){
            x[i] = i + 1;
        }
    } else if (parents.length === 1 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(parents[0])) {
        // parents looks like [[a,b,c,..]]
        // x has to be filled
        y = parents[0];
        x = [];
        len = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].evaluate(y).length;
        for(i = 0; i < len; i++){
            x[i] = i + 1;
        }
    } else if (parents.length === 2) {
        // parents looks like [[x0,x1,x2,...],[y1,y2,y3,...]]
        len = Math.min(parents[0].length, parents[1].length);
        x = parents[0].slice(0, len);
        y = parents[1].slice(0, len);
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(y) && y.length === 0) {
        throw new Error("JSXGraph: Can't create charts without data.");
    }
    // does this really need to be done here? this should be done in createChart and then
    // there should be an extra chart for each chartstyle
    style = attributes.chartstyle.replace(/ /g, "").split(",");
    for(i = 0; i < style.length; i++){
        switch(style[i]){
            case "bar":
                c = this.drawBar(board, x, y, attributes);
                break;
            case "line":
                c = this.drawLine(board, x, y, attributes);
                break;
            case "fit":
                c = this.drawFit(board, x, y, attributes);
                break;
            case "spline":
                c = this.drawSpline(board, x, y, attributes);
                break;
            case "pie":
                c = this.drawPie(board, y, attributes);
                break;
            case "point":
                c = this.drawPoints(board, x, y, attributes);
                break;
            case "radar":
                c = this.drawRadar(board, parents, attributes);
                break;
        }
        this.elements.push(c);
    }
    this.id = this.board.setId(this, "Chart");
    return this.elements;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Chart.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Chart.prototype, /** @lends JXG.Chart.prototype */ {
    /**
         * Create line chart defined by two data arrays.
         *
         * @param  {String|JXG.Board} board      The board the chart is drawn on
         * @param  {Array} x          Array of x-coordinates
         * @param  {Array} y          Array of y-coordinates
         * @param  {Object} attributes  Javascript object containing attributes like colors
         * @returns {JXG.Curve}       JSXGraph curve
         */ drawLine: function(board, x, y, attributes) {
        // we don't want the line chart to be filled
        attributes.fillcolor = "none";
        attributes.highlightfillcolor = "none";
        return board.create("curve", [
            x,
            y
        ], attributes);
    },
    /**
         * Create line chart that consists of a natural spline curve
         * defined by two data arrays.
         *
         * @param  {String|JXG.Board} board      The board the chart is drawn on
         * @param  {Array} x          Array of x-coordinates
         * @param  {Array} y          Array of y-coordinates
         * @param  {Object} attributes Javascript object containing attributes like colors
         * @returns {JXG.Curve}       JSXGraph (natural) spline curve
         */ drawSpline: function(board, x, y, attributes) {
        // we don't want the spline chart to be filled
        attributes.fillColor = "none";
        attributes.highlightfillcolor = "none";
        return board.create("spline", [
            x,
            y
        ], attributes);
    },
    /**
         * Create line chart where the curve is given by a regression polynomial
         * defined by two data arrays. The degree of the polynomial is supplied
         * through the attribute "degree" in attributes.
         *
         * @param  {String|JXG.Board} board      The board the chart is drawn on
         * @param  {Array} x          Array of x-coordinates
         * @param  {Array} y          Array of y-coordinates
         * @param  {Object} attributes Javascript object containing attributes like colors
         * @returns {JXG.Curve}    JSXGraph function graph object
         */ drawFit: function(board, x, y, attributes) {
        var deg = attributes.degree;
        deg = Math.max(parseInt(deg, 10), 1) || 1;
        // never fill
        attributes.fillcolor = "none";
        attributes.highlightfillcolor = "none";
        return board.create("functiongraph", [
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].regressionPolynomial(deg, x, y)
        ], attributes);
    },
    /**
         * Create bar chart defined by two data arrays.
         * Attributes to change the layout of the bar chart are:
         * <ul>
         * <li> width (optional)
         * <li> dir: 'horizontal' or 'vertical'
         * <li> colors: array of colors
         * <li> labels: array of labels
         * </ul>
         *
         * @param  {String|JXG.Board} board      The board the chart is drawn on
         * @param  {Array} x          Array of x-coordinates
         * @param  {Array} y          Array of y-coordinates
         * @param  {Object} attributes Javascript object containing attributes like colors
         * @returns {Array}    Array of JXG polygons defining the bars
         */ drawBar: function(board, x, y, attributes) {
        var i, text, w, xp0, xp1, xp2, yp, colors, pols = [], p = [], attr, attrSub, makeXpFun = function(i, f) {
            return function() {
                return x[i]() - f * w;
            };
        }, hiddenPoint = {
            fixed: true,
            withLabel: false,
            visible: false,
            name: ""
        };
        attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "chart");
        // Determine the width of the bars
        if (attr && attr.width) {
            // width given
            w = attr.width;
        } else {
            if (x.length <= 1) {
                w = 1;
            } else {
                // Find minimum distance between to bars.
                w = x[1] - x[0];
                for(i = 1; i < x.length - 1; i++){
                    w = x[i + 1] - x[i] < w ? x[i + 1] - x[i] : w;
                }
            }
            w *= 0.8;
        }
        attrSub = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "chart", "label");
        for(i = 0; i < x.length; i++){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(x[i])) {
                xp0 = makeXpFun(i, -0.5);
                xp1 = makeXpFun(i, 0);
                xp2 = makeXpFun(i, 0.5);
            } else {
                xp0 = x[i] - w * 0.5;
                xp1 = x[i];
                xp2 = x[i] + w * 0.5;
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(y[i])) {
                yp = y[i]();
            } else {
                yp = y[i];
            }
            yp = y[i];
            if (attr.dir === "horizontal") {
                // horizontal bars
                p[0] = board.create("point", [
                    0,
                    xp0
                ], hiddenPoint);
                p[1] = board.create("point", [
                    yp,
                    xp0
                ], hiddenPoint);
                p[2] = board.create("point", [
                    yp,
                    xp2
                ], hiddenPoint);
                p[3] = board.create("point", [
                    0,
                    xp2
                ], hiddenPoint);
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(attr.labels) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(attr.labels[i])) {
                    attrSub.anchorX = function(self) {
                        return self.X() >= 0 ? "left" : "right";
                    };
                    attrSub.anchorY = "middle";
                    text = board.create("text", [
                        yp,
                        xp1,
                        attr.labels[i]
                    ], attrSub);
                }
            } else {
                // vertical bars
                p[0] = board.create("point", [
                    xp0,
                    0
                ], hiddenPoint);
                p[1] = board.create("point", [
                    xp0,
                    yp
                ], hiddenPoint);
                p[2] = board.create("point", [
                    xp2,
                    yp
                ], hiddenPoint);
                p[3] = board.create("point", [
                    xp2,
                    0
                ], hiddenPoint);
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(attr.labels) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(attr.labels[i])) {
                    attrSub.anchorX = "middle";
                    attrSub.anchorY = function(self) {
                        return self.Y() >= 0 ? "bottom" : "top";
                    };
                    text = board.create("text", [
                        xp1,
                        yp,
                        attr.labels[i]
                    ], attrSub);
                }
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(attr.colors)) {
                colors = attr.colors;
                attr.fillcolor = colors[i % colors.length];
            }
            pols[i] = board.create("polygon", p, attr);
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(attr.labels) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(attr.labels[i])) {
                pols[i].text = text;
                pols[i].addChild(text);
            }
        }
        return pols;
    },
    /**
         * Create chart consisting of JSXGraph points.
         * Attributes to change the layout of the point chart are:
         * <ul>
         * <li> fixed (Boolean)
         * <li> infoboxArray (Array): Texts for the infobox
         * </ul>
         *
         * @param  {String|JXG.Board} board      The board the chart is drawn on
         * @param  {Array} x          Array of x-coordinates
         * @param  {Array} y          Array of y-coordinates
         * @param  {Object} attributes Javascript object containing attributes like colors
         * @returns {Array} Array of JSXGraph points
         */ drawPoints: function(board, x, y, attributes) {
        var i, points = [], infoboxArray = attributes.infoboxarray;
        attributes.fixed = true;
        attributes.name = "";
        for(i = 0; i < x.length; i++){
            attributes.infoboxtext = infoboxArray ? infoboxArray[i % infoboxArray.length] : false;
            points[i] = board.create("point", [
                x[i],
                y[i]
            ], attributes);
        }
        return points;
    },
    /**
         * Create pie chart.
         * Attributes to change the layout of the pie chart are:
         * <ul>
         * <li> labels: array of labels
         * <li> colors: (Array)
         * <li> highlightColors (Array)
         * <li> radius
         * <li> center (coordinate array)
         * <li> highlightOnSector (Boolean)
         * </ul>
         *
         * @param  {String|JXG.Board} board      The board the chart is drawn on
         * @param  {Array} y          Array of x-coordinates
         * @param  {Object} attributes Javascript object containing attributes like colors
         * @returns {Object}  with keys: "{sectors, points, midpoint}"
         */ drawPie: function(board, y, attributes) {
        var i, center, p = [], sector = [], // s = Statistics.sum(y),
        colorArray = attributes.colors, highlightColorArray = attributes.highlightcolors, labelArray = attributes.labels, r = attributes.radius || 4, radius = r, cent = attributes.center || [
            0,
            0
        ], xc = cent[0], yc = cent[1], makeRadPointFun = function(j, fun, xc) {
            return function() {
                var s, i, rad, t = 0;
                for(i = 0; i <= j; i++){
                    t += parseFloat(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].evaluate(y[i]));
                }
                s = t;
                for(i = j + 1; i < y.length; i++){
                    s += parseFloat(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].evaluate(y[i]));
                }
                rad = s !== 0 ? 2 * Math.PI * t / s : 0;
                return radius() * Math[fun](rad) + xc;
            };
        }, highlightHandleLabel = function(f, s) {
            var dx = -this.point1.coords.usrCoords[1] + this.point2.coords.usrCoords[1], dy = -this.point1.coords.usrCoords[2] + this.point2.coords.usrCoords[2];
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.label)) {
                this.label.rendNode.style.fontSize = s * this.label.evalVisProp('fontsize') + "px";
                this.label.fullUpdate();
            }
            this.point2.coords = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                this.point1.coords.usrCoords[1] + dx * f,
                this.point1.coords.usrCoords[2] + dy * f
            ], this.board);
            this.fullUpdate();
        }, highlightFun = function() {
            if (!this.highlighted) {
                this.highlighted = true;
                this.board.highlightedObjects[this.id] = this;
                this.board.renderer.highlight(this);
                highlightHandleLabel.call(this, 1.1, 2);
            }
        }, noHighlightFun = function() {
            if (this.highlighted) {
                this.highlighted = false;
                this.board.renderer.noHighlight(this);
                highlightHandleLabel.call(this, 0.9090909, 1);
            }
        }, hiddenPoint = {
            fixed: true,
            withLabel: false,
            visible: false,
            name: ""
        };
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(labelArray)) {
            labelArray = [];
            for(i = 0; i < y.length; i++){
                labelArray[i] = "";
            }
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(r)) {
            radius = function() {
                return r;
            };
        }
        attributes.highlightonsector = attributes.highlightonsector || false;
        attributes.straightfirst = false;
        attributes.straightlast = false;
        center = board.create("point", [
            xc,
            yc
        ], hiddenPoint);
        p[0] = board.create("point", [
            function() {
                return radius() + xc;
            },
            function() {
                return yc;
            }
        ], hiddenPoint);
        for(i = 0; i < y.length; i++){
            p[i + 1] = board.create("point", [
                makeRadPointFun(i, "cos", xc),
                makeRadPointFun(i, "sin", yc)
            ], hiddenPoint);
            attributes.name = labelArray[i];
            attributes.withlabel = attributes.name !== "";
            attributes.fillcolor = colorArray && colorArray[i % colorArray.length];
            attributes.labelcolor = colorArray && colorArray[i % colorArray.length];
            attributes.highlightfillcolor = highlightColorArray && highlightColorArray[i % highlightColorArray.length];
            sector[i] = board.create("sector", [
                center,
                p[i],
                p[i + 1]
            ], attributes);
            if (attributes.highlightonsector) {
                // overwrite hasPoint so that the whole sector is used for highlighting
                sector[i].hasPoint = sector[i].hasPointSector;
            }
            if (attributes.highlightbysize) {
                sector[i].highlight = highlightFun;
                sector[i].noHighlight = noHighlightFun;
            }
        }
        // Not enough! We need points, but this gives an error in setAttribute.
        return {
            sectors: sector,
            points: p,
            midpoint: center
        };
    },
    /**
         * Create radar chart.
         * Attributes to change the layout of the pie chart are:
         * <ul>
         * <li> paramArray: labels for axes, [ paramx, paramy, paramz ]
         * <li> startShiftRatio: 0 <= offset from chart center <=1
         * <li> endShiftRatio:  0 <= offset from chart radius <=1
         * <li> startShiftArray: Adjust offsets per each axis
         * <li> endShiftArray: Adjust offsets per each axis
         * <li> startArray: Values for inner circle. Default values: minimums
         * <li> start: one value to overwrite all startArray values
         * <li> endArray: Values for outer circle, maximums by default
         * <li> end: one value to overwrite all endArray values
         * <li> labelArray
         * <li> polyStrokeWidth
         * <li> colors
         * <li> highlightcolors
         * <li> labelArray: [ row1, row2, row3 ]
         * <li> radius
         * <li> legendPosition
         * <li> showCircles
         * <li> circleLabelArray
         * <li> circleStrokeWidth
         * </ul>
         *
         * @param  {String|JXG.Board} board      The board the chart is drawn on
         * @param  {Array} parents    Array of coordinates, e.g. [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3]]
         * @param  {Object} attributes Javascript object containing attributes like colors
         * @returns {Object} with keys "{circles, lines, points, midpoint, polygons}"
         */ drawRadar: function(board, parents, attributes) {
        var i, j, paramArray, numofparams, maxes, mins, la, pdata, ssa, esa, ssratio, esratio, sshifts, eshifts, starts, ends, labelArray, colorArray, // highlightColorArray,
        radius, myAtts, cent, xc, yc, center, start_angle, rad, p, line, t, xcoord, ycoord, polygons, legend_position, circles, lxoff, lyoff, cla, clabelArray, ncircles, pcircles, angle, dr, sw, data, len = parents.length, get_anchor = function() {
            var x1, x2, y1, y2, relCoords = this.evalVisProp('label.offset).slice(0');
            x1 = this.point1.X();
            x2 = this.point2.X();
            y1 = this.point1.Y();
            y2 = this.point2.Y();
            if (x2 < x1) {
                relCoords[0] = -relCoords[0];
            }
            if (y2 < y1) {
                relCoords[1] = -relCoords[1];
            }
            this.setLabelRelativeCoords(relCoords);
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                this.point2.X(),
                this.point2.Y()
            ], this.board);
        }, get_transform = function(angle, i) {
            var t, tscale, trot;
            t = board.create("transform", [
                -(starts[i] - sshifts[i]),
                0
            ], {
                type: "translate"
            });
            tscale = board.create("transform", [
                radius / (ends[i] + eshifts[i] - (starts[i] - sshifts[i])),
                1
            ], {
                type: "scale"
            });
            t.melt(tscale);
            trot = board.create("transform", [
                angle
            ], {
                type: "rotate"
            });
            t.melt(trot);
            return t;
        };
        if (len <= 0) {
            throw new Error("JSXGraph radar chart: no data");
        }
        // labels for axes
        paramArray = attributes.paramarray;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(paramArray)) {
            throw new Error("JSXGraph radar chart: need paramArray attribute");
        }
        numofparams = paramArray.length;
        if (numofparams <= 1) {
            throw new Error("JSXGraph radar chart: need more than one param in paramArray");
        }
        for(i = 0; i < len; i++){
            if (numofparams !== parents[i].length) {
                throw new Error("JSXGraph radar chart: use data length equal to number of params (" + parents[i].length + " != " + numofparams + ")");
            }
        }
        maxes = [];
        mins = [];
        for(j = 0; j < numofparams; j++){
            maxes[j] = parents[0][j];
            mins[j] = maxes[j];
        }
        for(i = 1; i < len; i++){
            for(j = 0; j < numofparams; j++){
                if (parents[i][j] > maxes[j]) {
                    maxes[j] = parents[i][j];
                }
                if (parents[i][j] < mins[j]) {
                    mins[j] = parents[i][j];
                }
            }
        }
        la = [];
        pdata = [];
        for(i = 0; i < len; i++){
            la[i] = "";
            pdata[i] = [];
        }
        ssa = [];
        esa = [];
        // 0 <= Offset from chart center <=1
        ssratio = attributes.startshiftratio || 0;
        // 0 <= Offset from chart radius <=1
        esratio = attributes.endshiftratio || 0;
        for(i = 0; i < numofparams; i++){
            ssa[i] = (maxes[i] - mins[i]) * ssratio;
            esa[i] = (maxes[i] - mins[i]) * esratio;
        }
        // Adjust offsets per each axis
        sshifts = attributes.startshiftarray || ssa;
        eshifts = attributes.endshiftarray || esa;
        // Values for inner circle, minimums by default
        starts = attributes.startarray || mins;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(attributes.start)) {
            for(i = 0; i < numofparams; i++){
                starts[i] = attributes.start;
            }
        }
        // Values for outer circle, maximums by default
        ends = attributes.endarray || maxes;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(attributes.end)) {
            for(i = 0; i < numofparams; i++){
                ends[i] = attributes.end;
            }
        }
        if (sshifts.length !== numofparams) {
            throw new Error("JSXGraph radar chart: start shifts length is not equal to number of parameters");
        }
        if (eshifts.length !== numofparams) {
            throw new Error("JSXGraph radar chart: end shifts length is not equal to number of parameters");
        }
        if (starts.length !== numofparams) {
            throw new Error("JSXGraph radar chart: starts length is not equal to number of parameters");
        }
        if (ends.length !== numofparams) {
            throw new Error("JSXGraph radar chart: snds length is not equal to number of parameters");
        }
        // labels for legend
        labelArray = attributes.labelarray || la;
        colorArray = attributes.colors;
        // highlightColorArray = attributes.highlightcolors;
        radius = attributes.radius || 10;
        sw = attributes.strokewidth || 1;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(attributes.highlightonsector)) {
            attributes.highlightonsector = false;
        }
        myAtts = {
            name: attributes.name,
            id: attributes.id,
            strokewidth: sw,
            polystrokewidth: attributes.polystrokewidth || sw,
            strokecolor: attributes.strokecolor || "black",
            straightfirst: false,
            straightlast: false,
            fillcolor: attributes.fillColor || "#FFFF88",
            fillopacity: attributes.fillOpacity || 0.4,
            highlightfillcolor: attributes.highlightFillColor || "#FF7400",
            highlightstrokecolor: attributes.highlightStrokeColor || "black",
            gradient: attributes.gradient || "none"
        };
        cent = attributes.center || [
            0,
            0
        ];
        xc = cent[0];
        yc = cent[1];
        center = board.create("point", [
            xc,
            yc
        ], {
            name: "",
            fixed: true,
            withlabel: false,
            visible: false
        });
        start_angle = Math.PI / 2 - Math.PI / numofparams;
        start_angle = attributes.startangle || 0;
        rad = start_angle;
        p = [];
        line = [];
        for(i = 0; i < numofparams; i++){
            rad += 2 * Math.PI / numofparams;
            xcoord = radius * Math.cos(rad) + xc;
            ycoord = radius * Math.sin(rad) + yc;
            p[i] = board.create("point", [
                xcoord,
                ycoord
            ], {
                name: "",
                fixed: true,
                withlabel: false,
                visible: false
            });
            line[i] = board.create("line", [
                center,
                p[i]
            ], {
                name: paramArray[i],
                strokeColor: myAtts.strokecolor,
                strokeWidth: myAtts.strokewidth,
                strokeOpacity: 1.0,
                straightFirst: false,
                straightLast: false,
                withLabel: true,
                highlightStrokeColor: myAtts.highlightstrokecolor
            });
            line[i].getLabelAnchor = get_anchor;
            t = get_transform(rad, i);
            for(j = 0; j < parents.length; j++){
                data = parents[j][i];
                pdata[j][i] = board.create("point", [
                    data,
                    0
                ], {
                    name: "",
                    fixed: true,
                    withlabel: false,
                    visible: false
                });
                pdata[j][i].addTransform(pdata[j][i], t);
            }
        }
        polygons = [];
        for(i = 0; i < len; i++){
            myAtts.labelcolor = colorArray && colorArray[i % colorArray.length];
            myAtts.strokecolor = colorArray && colorArray[i % colorArray.length];
            myAtts.fillcolor = colorArray && colorArray[i % colorArray.length];
            polygons[i] = board.create("polygon", pdata[i], {
                withLines: true,
                withLabel: false,
                fillColor: myAtts.fillcolor,
                fillOpacity: myAtts.fillopacity,
                highlightFillColor: myAtts.highlightfillcolor
            });
            for(j = 0; j < numofparams; j++){
                polygons[i].borders[j].setAttribute("strokecolor:" + colorArray[i % colorArray.length]);
                polygons[i].borders[j].setAttribute("strokewidth:" + myAtts.polystrokewidth);
            }
        }
        legend_position = attributes.legendposition || "none";
        switch(legend_position){
            case "right":
                lxoff = attributes.legendleftoffset || 2;
                lyoff = attributes.legendtopoffset || 1;
                this.legend = board.create("legend", [
                    xc + radius + lxoff,
                    yc + radius - lyoff
                ], {
                    labels: labelArray,
                    colors: colorArray
                });
                break;
            case "none":
                break;
            default:
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug("Unknown legend position");
        }
        circles = [];
        if (attributes.showcircles) {
            cla = [];
            for(i = 0; i < 6; i++){
                cla[i] = 20 * i;
            }
            cla[0] = "0";
            clabelArray = attributes.circlelabelarray || cla;
            ncircles = clabelArray.length;
            if (ncircles < 2) {
                throw new Error("JSXGraph radar chart: too less circles in circleLabelArray");
            }
            pcircles = [];
            angle = start_angle + Math.PI / numofparams;
            t = get_transform(angle, 0);
            myAtts.fillcolor = "none";
            myAtts.highlightfillcolor = "none";
            myAtts.strokecolor = attributes.strokecolor || "black";
            myAtts.strokewidth = attributes.circlestrokewidth || 0.5;
            myAtts.layer = 0;
            // we have ncircles-1 intervals between ncircles circles
            dr = (ends[0] - starts[0]) / (ncircles - 1);
            for(i = 0; i < ncircles; i++){
                pcircles[i] = board.create("point", [
                    starts[0] + i * dr,
                    0
                ], {
                    name: clabelArray[i],
                    size: 0,
                    fixed: true,
                    withLabel: true,
                    visible: true
                });
                pcircles[i].addTransform(pcircles[i], t);
                circles[i] = board.create("circle", [
                    center,
                    pcircles[i]
                ], myAtts);
            }
        }
        this.rendNode = polygons[0].rendNode;
        return {
            circles: circles,
            lines: line,
            points: pdata,
            midpoint: center,
            polygons: polygons
        };
    },
    /**
         * Uses the boards renderer to update the chart.
         * @private
         */ updateRenderer: function() {
        return this;
    },
    // documented in base/element
    update: function() {
        if (this.needsUpdate) {
            this.updateDataArray();
        }
        return this;
    },
    /**
         * Template for dynamic charts update.
         * This method is used to compute new entries
         * for the arrays this.dataX and
         * this.dataY. It is used in update.
         * Default is an empty method, can be overwritten
         * by the user.
         *
         * @returns {JXG.Chart} Reference to this chart object.
         */ updateDataArray: function() {
        return this;
    }
});
/**
 * @class Various types of charts for data visualization.
 * @pseudo
 * @name Chart
 * @augments JXG.Chart
 * @constructor
 * @type JXG.Chart
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {Array} x Array of x-coordinates (default case, see below for alternatives)
 * @param {Array} y Array of y-coordinates (default case, see below for alternatives)
 * <p>
 * The parent array may be of one of the following forms:
 * <ol>
 * <li> Parents array looks like [number, number, number, ...]. It is interpreted as array of y-coordinates.
 * The x coordinates are automatically set to [1, 2, ...]
 * <li> Parents array looks like [[number, number, number, ...]]. The content is interpreted as array of y-coordinates.
 * The x coordinates are automatically set to [1, 2, ...]x coordinates are automatically set to [1, 2, ...]
 * Default case: [[x0,x1,x2,...],[y1,y2,y3,...]]
 * </ol>
 *
 * The attribute value for the key 'chartStyle' determines the type(s) of the chart. 'chartStyle' is a comma
 * separated list of strings of the possible chart types
 * 'bar', 'fit', 'line',  'pie', 'point', 'radar', 'spline'.
 *
 * @see JXG.Chart#drawBar
 * @see JXG.Chart#drawFit
 * @see JXG.Chart#drawLine
 * @see JXG.Chart#drawPie
 * @see JXG.Chart#drawPoints
 * @see JXG.Chart#drawRadar
 * @see JXG.Chart#drawSpline
 *
 * @example
 *   board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox:[-0.5,8,9,-2],axis:true});
 *
 *   var f = [4, 2, -1, 3, 6, 7, 2];
 *   var chart = board.create('chart', f,
 *                 {chartStyle:'bar',
 *                  width:0.8,
 *                  labels:f,
 *                  colorArray:['#8E1B77','#BE1679','#DC1765','#DA2130','#DB311B','#DF4917','#E36317','#E87F1A',
 *                              '#F1B112','#FCF302','#C1E212'],
 *                  label: {fontSize:30, display:'internal', anchorX:'left', rotate:90}
 *             });
 *
 * </pre><div id="JXG1528c395-9fa4-4210-ada6-7fc5652ed920" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG1528c395-9fa4-4210-ada6-7fc5652ed920',
 *             {boundingbox: [-0.5,8,9,-2], axis: true, showcopyright: false, shownavigation: false});
 *                 var f = [4,2,-1,3,6,7,2];
 *                 var chart = board.create('chart', f,
 *                     {chartStyle:'bar',
 *                      width:0.8,
 *                      labels:f,
 *                      colorArray:['#8E1B77','#BE1679','#DC1765','#DA2130','#DB311B','#DF4917','#E36317','#E87F1A',
 *                                  '#F1B112','#FCF302','#C1E212'],
 *                      label: {fontSize:30, display:'internal', anchorX:'left', rotate:90}
 *                 });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 *   board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-1, 9, 13, -3], axis:true});
 *
 *   var s = board.create('slider', [[4,7],[8,7],[1,1,1.5]], {name:'S', strokeColor:'black', fillColor:'white'});
 *   var f = [function(){return (s.Value()*4.5).toFixed(2);},
 *                      function(){return (s.Value()*(-1)).toFixed(2);},
 *                      function(){return (s.Value()*3).toFixed(2);},
 *                      function(){return (s.Value()*2).toFixed(2);},
 *                      function(){return (s.Value()*(-0.5)).toFixed(2);},
 *                      function(){return (s.Value()*5.5).toFixed(2);},
 *                      function(){return (s.Value()*2.5).toFixed(2);},
 *                      function(){return (s.Value()*(-0.75)).toFixed(2);},
 *                      function(){return (s.Value()*3.5).toFixed(2);},
 *                      function(){return (s.Value()*2).toFixed(2);},
 *                      function(){return (s.Value()*(-1.25)).toFixed(2);}
 *                      ];
 *   var chart = board.create('chart', [f],
 *                                             {chartStyle:'bar',width:0.8,labels:f,
 *                                              colorArray:['#8E1B77','#BE1679','#DC1765','#DA2130','#DB311B','#DF4917','#E36317','#E87F1A',
 *                                                          '#F1B112','#FCF302','#C1E212']});
 *
 *   var dataArr = [4,1,3,2,5,6.5,1.5,2,0.5,1.5,-1];
 *   var chart2 = board.create('chart', dataArr, {chartStyle:'line,point'});
 *   chart2[0].setAttribute('strokeColor:black','strokeWidth:2pt');
 *   for(var i=0; i<11;i++) {
 *            chart2[1][i].setAttribute({strokeColor:'black',fillColor:'white',face:'[]', size:4, strokeWidth:'2pt'});
 *   }
 *   board.unsuspendUpdate();
 *
 * </pre><div id="JXG22deb158-48c6-41c3-8157-b88b4b968a55" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG22deb158-48c6-41c3-8157-b88b4b968a55',
 *             {boundingbox: [-1, 9, 13, -3], axis: true, showcopyright: false, shownavigation: false});
 *                 var s = board.create('slider', [[4,7],[8,7],[1,1,1.5]], {name:'S', strokeColor:'black', fillColor:'white'});
 *                 var f = [function(){return (s.Value()*4.5).toFixed(2);},
 *                          function(){return (s.Value()*(-1)).toFixed(2);},
 *                          function(){return (s.Value()*3).toFixed(2);},
 *                          function(){return (s.Value()*2).toFixed(2);},
 *                          function(){return (s.Value()*(-0.5)).toFixed(2);},
 *                          function(){return (s.Value()*5.5).toFixed(2);},
 *                          function(){return (s.Value()*2.5).toFixed(2);},
 *                          function(){return (s.Value()*(-0.75)).toFixed(2);},
 *                          function(){return (s.Value()*3.5).toFixed(2);},
 *                          function(){return (s.Value()*2).toFixed(2);},
 *                          function(){return (s.Value()*(-1.25)).toFixed(2);}
 *                          ];
 *                 var chart = board.create('chart', [f],
 *                                                 {chartStyle:'bar',width:0.8,labels:f,
 *                                                  colorArray:['#8E1B77','#BE1679','#DC1765','#DA2130','#DB311B','#DF4917','#E36317','#E87F1A',
 *                                                              '#F1B112','#FCF302','#C1E212']});
 *
 *                 var dataArr = [4,1,3,2,5,6.5,1.5,2,0.5,1.5,-1];
 *                 var chart2 = board.create('chart', dataArr, {chartStyle:'line,point'});
 *                 chart2[0].setAttribute('strokeColor:black','strokeWidth:2pt');
 *                 for(var i=0; i<11;i++) {
 *                     chart2[1][i].setAttribute({strokeColor:'black',fillColor:'white',face:'[]', size:4, strokeWidth:'2pt'});
 *                 }
 *                 board.unsuspendUpdate();
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 *         var dataArr = [4, 1.2, 3, 7, 5, 4, 1.54, function () { return 2; }];
 *         var a = board.create('chart', dataArr, {
 *                 chartStyle:'pie', colors:['#B02B2C','#3F4C6B','#C79810','#D15600'],
 *                 fillOpacity:0.9,
 *                 center:[5,2],
 *                 strokeColor:'#ffffff',
 *                 strokeWidth:6,
 *                 highlightBySize:true,
 *                 highlightOnSector:true
 *             });
 *
 * </pre><div id="JXG1180b7dd-b048-436a-a5ad-87ffa82d5aff" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG1180b7dd-b048-436a-a5ad-87ffa82d5aff',
 *             {boundingbox: [0, 8, 12, -4], axis: true, showcopyright: false, shownavigation: false});
 *             var dataArr = [4, 1.2, 3, 7, 5, 4, 1.54, function () { return 2; }];
 *             var a = board.create('chart', dataArr, {
 *                     chartStyle:'pie', colors:['#B02B2C','#3F4C6B','#C79810','#D15600'],
 *                     fillOpacity:0.9,
 *                     center:[5,2],
 *                     strokeColor:'#ffffff',
 *                     strokeWidth:6,
 *                     highlightBySize:true,
 *                     highlightOnSector:true
 *                 });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 *             board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-12, 12, 20, -12], axis: false});
 *             board.suspendUpdate();
 *             // See labelArray and paramArray
 *             var dataArr = [[23, 14, 15.0], [60, 8, 25.0], [0, 11.0, 25.0], [10, 15, 20.0]];
 *
 *             var a = board.create('chart', dataArr, {
 *                 chartStyle:'radar',
 *                 colorArray:['#0F408D','#6F1B75','#CA147A','#DA2228','#E8801B','#FCF302','#8DC922','#15993C','#87CCEE','#0092CE'],
 *                 //fillOpacity:0.5,
 *                 //strokeColor:'black',
 *                 //strokeWidth:1,
 *                 //polyStrokeWidth:1,
 *                 paramArray:['Speed','Flexibility', 'Costs'],
 *                 labelArray:['Ruby','JavaScript', 'PHP', 'Python'],
 *                 //startAngle:Math.PI/4,
 *                 legendPosition:'right',
 *                 //"startShiftRatio": 0.1,
 *                 //endShiftRatio:0.1,
 *                 //startShiftArray:[0,0,0],
 *                 //endShiftArray:[0.5,0.5,0.5],
 *                 start:0
 *                 //end:70,
 *                 //startArray:[0,0,0],
 *                 //endArray:[7,7,7],
 *                 //radius:3,
 *                 //showCircles:true,
 *                 //circleLabelArray:[1,2,3,4,5],
 *                 //highlightColorArray:['#E46F6A','#F9DF82','#F7FA7B','#B0D990','#69BF8E','#BDDDE4','#92C2DF','#637CB0','#AB91BC','#EB8EBF'],
 *             });
 *             board.unsuspendUpdate();
 *
 * </pre><div id="JXG985fbbe6-0488-4073-b73b-cb3ebaea488a" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG985fbbe6-0488-4073-b73b-cb3ebaea488a',
 *             {boundingbox: [-12, 12, 20, -12], axis: false, showcopyright: false, shownavigation: false});
 *                 board.suspendUpdate();
 *                 // See labelArray and paramArray
 *                 var dataArr = [[23, 14, 15.0], [60, 8, 25.0], [0, 11.0, 25.0], [10, 15, 20.0]];
 *
 *                 var a = board.create('chart', dataArr, {
 *                     chartStyle:'radar',
 *                     colorArray:['#0F408D','#6F1B75','#CA147A','#DA2228','#E8801B','#FCF302','#8DC922','#15993C','#87CCEE','#0092CE'],
 *                     //fillOpacity:0.5,
 *                     //strokeColor:'black',
 *                     //strokeWidth:1,
 *                     //polyStrokeWidth:1,
 *                     paramArray:['Speed','Flexibility', 'Costs'],
 *                     labelArray:['Ruby','JavaScript', 'PHP', 'Python'],
 *                     //startAngle:Math.PI/4,
 *                     legendPosition:'right',
 *                     //"startShiftRatio": 0.1,
 *                     //endShiftRatio:0.1,
 *                     //startShiftArray:[0,0,0],
 *                     //endShiftArray:[0.5,0.5,0.5],
 *                     start:0
 *                     //end:70,
 *                     //startArray:[0,0,0],
 *                     //endArray:[7,7,7],
 *                     //radius:3,
 *                     //showCircles:true,
 *                     //circleLabelArray:[1,2,3,4,5],
 *                     //highlightColorArray:['#E46F6A','#F9DF82','#F7FA7B','#B0D990','#69BF8E','#BDDDE4','#92C2DF','#637CB0','#AB91BC','#EB8EBF'],
 *                 });
 *                 board.unsuspendUpdate();
 *
 *     })();
 *
 * </script><pre>
 *
 * For more examples see
 * <ul>
 * <li><a href="https://jsxgraph.org/wiki/index.php/Charts_from_HTML_tables_-_tutorial">JSXgraph wiki: Charts from HTML tables - tutorial</a>
 * <li><a href="https://jsxgraph.org/wiki/index.php/Pie_chart">JSXgraph wiki: Pie chart</a>
 * <li><a href="https://jsxgraph.org/wiki/index.php/Different_chart_styles">JSXgraph wiki: Various chart styles</a>
 * <li><a href="https://jsxgraph.org/wiki/index.php/Dynamic_bar_chart">JSXgraph wiki: Dynamic bar chart</a>
 * </ul>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createChart = function(board, parents, attributes) {
    var data, row, i, j, col, charts = [], w, x, showRows, attr, originalWidth, name, strokeColor, fillColor, hStrokeColor, hFillColor, len, table = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isBrowser ? board.document.getElementById(parents[0]) : null;
    if (parents.length === 1 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(parents[0])) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(table)) {
            // extract the data
            attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "chart");
            table = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$parser$2f$datasource$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]().loadFromTable(parents[0], attr.withheaders, attr.withheaders);
            data = table.data;
            col = table.columnHeaders;
            row = table.rowHeaders;
            originalWidth = attr.width;
            name = attr.name;
            strokeColor = attr.strokecolor;
            fillColor = attr.fillcolor;
            hStrokeColor = attr.highlightstrokecolor;
            hFillColor = attr.highlightfillcolor;
            board.suspendUpdate();
            len = data.length;
            showRows = [];
            if (attr.rows && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(attr.rows)) {
                for(i = 0; i < len; i++){
                    for(j = 0; j < attr.rows.length; j++){
                        if (attr.rows[j] === i || attr.withheaders && attr.rows[j] === row[i]) {
                            showRows.push(data[i]);
                            break;
                        }
                    }
                }
            } else {
                showRows = data;
            }
            len = showRows.length;
            for(i = 0; i < len; i++){
                x = [];
                if (attr.chartstyle && attr.chartstyle.indexOf("bar") !== -1) {
                    if (originalWidth) {
                        w = originalWidth;
                    } else {
                        w = 0.8;
                    }
                    x.push(1 - w / 2 + (i + 0.5) * w / len);
                    for(j = 1; j < showRows[i].length; j++){
                        x.push(x[j - 1] + 1);
                    }
                    attr.width = w / len;
                }
                if (name && name.length === len) {
                    attr.name = name[i];
                } else if (attr.withheaders) {
                    attr.name = col[i];
                }
                if (strokeColor && strokeColor.length === len) {
                    attr.strokecolor = strokeColor[i];
                } else {
                    attr.strokecolor = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hsv2rgb((i + 1) / len * 360, 0.9, 0.6);
                }
                if (fillColor && fillColor.length === len) {
                    attr.fillcolor = fillColor[i];
                } else {
                    attr.fillcolor = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hsv2rgb((i + 1) / len * 360, 0.9, 1.0);
                }
                if (hStrokeColor && hStrokeColor.length === len) {
                    attr.highlightstrokecolor = hStrokeColor[i];
                } else {
                    attr.highlightstrokecolor = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hsv2rgb((i + 1) / len * 360, 0.9, 1.0);
                }
                if (hFillColor && hFillColor.length === len) {
                    attr.highlightfillcolor = hFillColor[i];
                } else {
                    attr.highlightfillcolor = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hsv2rgb((i + 1) / len * 360, 0.9, 0.6);
                }
                if (attr.chartstyle && attr.chartstyle.indexOf("bar") !== -1) {
                    charts.push(new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Chart(board, [
                        x,
                        showRows[i]
                    ], attr));
                } else {
                    charts.push(new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Chart(board, [
                        showRows[i]
                    ], attr));
                }
            }
            board.unsuspendUpdate();
        }
        return charts;
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "chart");
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Chart(board, parents, attr);
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("chart", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createChart);
/**
 * Legend for chart
 *
 * The Legend class is a basic class for legends.
 * @class Creates a new Legend object. Do not use this constructor to create a legend.
 * Use {@link JXG.Board#create} with type {@link Legend} instead.
 * <p>
 * The legend object consists of segements with labels. These lines can be
 * accessed with the property "lines" of the element.
 * @constructor
 * @augments JXG.GeometryElement
 * @param {String|JXG.Board} board The board the new legend is drawn on.
 * @param {Array} coords Coordinates of the left top point of the legend.
 * @param  {Object} attributes Attributes of the legend
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Legend = function(board, coords, attributes) {
    var attr;
    /* Call the constructor of GeometryElement */ this.constructor();
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "legend");
    this.board = board;
    this.coords = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, coords, this.board);
    this.myAtts = {};
    this.label_array = attr.labelarray || attr.labels;
    this.color_array = attr.colorarray || attr.colors;
    this.opacy_array = attr.strokeopacity || [
        1
    ];
    this.lines = [];
    this.myAtts.strokewidth = attr.strokewidth || 5;
    this.myAtts.straightfirst = false;
    this.myAtts.straightlast = false;
    this.myAtts.withlabel = true;
    this.myAtts.fixed = true;
    this.myAtts.frozen = attr.frozen || false;
    this.style = attr.legendstyle || attr.style;
    if (this.style === "vertical") {
        this.drawVerticalLegend(board, attr);
    } else {
        throw new Error("JSXGraph: Unknown legend style: " + this.style);
    }
    this.id = this.board.setId(this, "Leg");
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Legend.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
/**
 * Draw a vertical legend.
 *
 * @private
 * @param  {String|JXG.Board} board      The board the legend is drawn on
 * @param  {Object} attributes Attributes of the legend
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Legend.prototype.drawVerticalLegend = function(board, attributes) {
    var i, line_length = attributes.linelength || 1, offy = (attributes.rowheight || 20) / this.board.unitY, getLabelAnchor = function() {
        this.setLabelRelativeCoords(this.visProp.label.offset);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
            this.point2.X(),
            this.point2.Y()
        ], this.board);
    };
    for(i = 0; i < this.label_array.length; i++){
        this.myAtts.name = this.label_array[i];
        this.myAtts.strokecolor = this.color_array[i % this.color_array.length];
        this.myAtts.highlightstrokecolor = this.color_array[i % this.color_array.length];
        this.myAtts.strokeopacity = this.opacy_array[i % this.opacy_array.length];
        this.myAtts.highlightstrokeopacity = this.opacy_array[i % this.opacy_array.length];
        this.myAtts.label = {
            offset: [
                10,
                0
            ],
            strokeColor: this.color_array[i % this.color_array.length],
            strokeWidth: this.myAtts.strokewidth
        };
        this.lines[i] = board.create("line", [
            [
                this.coords.usrCoords[1],
                this.coords.usrCoords[2] - i * offy
            ],
            [
                this.coords.usrCoords[1] + line_length,
                this.coords.usrCoords[2] - i * offy
            ]
        ], this.myAtts);
        if (this.myAtts.frozen) {
            this.lines[i].setAttribute({
                point1: {
                    frozen: true
                },
                point2: {
                    frozen: true
                }
            });
        }
        this.lines[i].getLabelAnchor = getLabelAnchor;
        this.lines[i].prepareUpdate().update().updateVisibility(this.lines[i].evalVisProp('visible')).updateRenderer();
        this.addChild(this.lines[i]);
    }
};
/**
 * @class Creates a legend for a chart element.
 * Parameter is a pair of coordinates. The label names and  the label colors are
 * supplied in the attributes:
 * <ul>
 * <li> labels (Array): array of strings containing label names
 * <li> labelArray (Array): alternative array for label names (has precedence over 'labels')
 * <li> colors (Array): array of color values
 * <li> colorArray (Array): alternative array for color values (has precedence over 'colors')
 * <li> opacities (Array): opacity of a line in the legend
 * <li> legendStyle or style: at the time being only 'vertical' is supported.
 * <li> rowHeight: height of an entry in the legend (in px)
 * <li> linelenght: length of a line in the legend (measured in the coordinate system)
 * <li> frozen (Boolean, false):
 * </ul>
 *
 * @pseudo
 * @name Legend
 * @augments JXG.Legend
 * @constructor
 * @type JXG.Legend
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {Number} x Horizontal coordinate of the left top point of the legend
 * @param {Number} y Vertical coordinate of the left top point of the legend
 *
 * @example
 * var board = JXG.JSXGraph.initBoard('jxgbox', {axis:true,boundingbox:[-4,48.3,12.0,-2.3]});
 * var x       = [-3,-2,-1,0,1,2,3,4,5,6,7,8];
 * var dataArr = [4,7,7,27,33,37,46,22,11,4,1,0];
 *
 * colors = ['green', 'yellow', 'red', 'blue'];
 * board.create('chart', [x,dataArr], {chartStyle:'bar', width:1.0, labels:dataArr, colors: colors} );
 * board.create('legend', [8, 45], {labels:dataArr, colors: colors, strokeWidth:5} );
 *
 * </pre><div id="JXGeeb588d9-a4fd-41bf-93f4-cd6f7a016682" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGeeb588d9-a4fd-41bf-93f4-cd6f7a016682',
 *             {boundingbox: [-4,48.3,12.0,-2.3], axis: true, showcopyright: false, shownavigation: false});
 *     var x       = [-3,-2,-1,0,1,2,3,4,5,6,7,8];
 *     var dataArr = [4,7,7,27,33,37,46,22,11,4,1,0];
 *
 *     colors = ['green', 'yellow', 'red', 'blue'];
 *     board.create('chart', [x,dataArr], {chartStyle:'bar', width:1.0, labels:dataArr, colors: colors} );
 *     board.create('legend', [8, 45], {labels:dataArr, colors: colors, strokeWidth:5} );
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 *   var inputFun, cf = [], cf2 = [], niveaunum,
 *     niveauline = [], niveauopac = [],legend;
 *
 *   inputFun = "x^2/2-2*x*y+y^2/2";
 *   niveauline = [-3,-2,-1,-0.5, 0, 1,2,3];
 *   niveaunum = niveauline.length;
 *   for (let i = 0; JXG.Math.lt(i, niveaunum); i++) {
 *     let niveaui = niveauline[i];
 *     niveauopac.push(((i + 1) / (niveaunum + 1)));
 *     cf.push(board.create("implicitcurve", [
 *       inputFun + "-(" + niveaui.toFixed(2) + ")", [-2, 2], [-2, 2]], {
 *       strokeWidth: 2,
 *       strokeColor: JXG.palette.red,
 *       strokeOpacity: niveauopac[i],
 *       needsRegularUpdate: false,
 *       name: "niveau"+i,
 *       visible: true
 *     }));
 *   }
 *   legend = board.create('legend', [-1.75, 1.75], {
 *     labels: niveauline,
 *     colors: [cf[0].visProp.strokecolor],
 *     strokeOpacity: niveauopac,
 *     linelength: 0.2,
 *     frozen:true
 *   }
 *   );
 *
 *
 * </pre><div id="JXG079fce93-07b9-426f-a267-ab9c1253e435" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG079fce93-07b9-426f-a267-ab9c1253e435',
 *             {boundingbox: [-2, 2, 2, -2], axis: true, showcopyright: false, shownavigation: false});
 *       var board, inputFun, cf = [], cf2 = [], niveaunum,
 *         niveauline = [], niveauopac = [],legend;
 *
 *       inputFun = "x^2/2-2*x*y+y^2/2";
 *       niveauline = [-3,-2,-1,-0.5, 0, 1,2,3];
 *       niveaunum = niveauline.length;
 *       for (let i = 0; JXG.Math.lt(i, niveaunum); i++) {
 *         let niveaui = niveauline[i];
 *         niveauopac.push(((i + 1) / (niveaunum + 1)));
 *         cf.push(board.create("implicitcurve", [
 *           inputFun + "-(" + niveaui.toFixed(2) + ")", [-2, 2], [-2, 2]], {
 *           strokeWidth: 2,
 *           strokeColor: JXG.palette.red,
 *           strokeOpacity: niveauopac[i],
 *           needsRegularUpdate: false,
 *           name: "niveau"+i,
 *           visible: true
 *         }));
 *       }
 *       legend = board.create('legend', [-1.75, 1.75], {
 *         labels: niveauline,
 *         colors: [cf[0].visProp.strokecolor],
 *         strokeOpacity: niveauopac,
 *         linelength: 0.2,
 *         frozen:true
 *       }
 *       );
 *
 *
 *     })();
 *
 * </script>
 *
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createLegend = function(board, parents, attributes) {
    //parents are coords of left top point of the legend
    var start_from = [
        0,
        0
    ];
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(parents) && parents.length === 2) {
        start_from = parents;
    } else {
        throw new Error("JSXGraph: Legend element needs two numbers as parameters");
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Legend(board, start_from, attributes);
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("legend", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createLegend);
const __TURBOPACK__default__export__ = {
    Chart: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Chart,
    Legend: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Legend
};
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/transformation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 * @fileoverview This file contains code for transformations of geometrical objects.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
;
;
;
;
/**
 * A transformation consists of a 3x3 matrix, i.e. it is a projective transformation.
 * @class Creates a new transformation object. Do not use this constructor to create a transformation.
 * Use {@link JXG.Board#create} with
 * type {@link Transformation} instead.
 * @constructor
 * @param {JXG.Board} board The board the transformation is part of.
 * @param {String} type Can be
 * <ul><li> 'translate'
 * <li> 'scale'
 * <li> 'reflect'
 * <li> 'rotate'
 * <li> 'shear'
 * <li> 'generic'
 * <li> 'matrix'
 * </ul>
 * @param {Object} params The parameters depend on the transformation type
 *
 * <p>
 * Translation matrix:
 * <pre>
 * ( 1  0  0)   ( z )
 * ( a  1  0) * ( x )
 * ( b  0  1)   ( y )
 * </pre>
 *
 * <p>
 * Scale matrix:
 * <pre>
 * ( 1  0  0)   ( z )
 * ( 0  a  0) * ( x )
 * ( 0  0  b)   ( y )
 * </pre>
 *
 * <p>
 * A rotation matrix with angle a (in Radians)
 * <pre>
 * ( 1    0        0      )   ( z )
 * ( 0    cos(a)   -sin(a)) * ( x )
 * ( 0    sin(a)   cos(a) )   ( y )
 * </pre>
 *
 * <p>
 * Shear matrix:
 * <pre>
 * ( 1  0  0)   ( z )
 * ( 0  1  a) * ( x )
 * ( 0  b  1)   ( y )
 * </pre>
 *
 * <p>Generic transformation:
 * <pre>
 * ( a  b  c )   ( z )
 * ( d  e  f ) * ( x )
 * ( g  h  i )   ( y )
 * </pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Transformation = function(board, type, params, is3D) {
    this.elementClass = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_OTHER;
    this.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_TRANSFORMATION;
    if (is3D) {
        this.is3D = true;
        this.matrix = [
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
    } else {
        this.is3D = false;
        this.matrix = [
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
    }
    this.board = board;
    this.isNumericMatrix = false;
    if (this.is3D) {
        this.setMatrix3D(params[0], type, params.slice(1));
    } else {
        this.setMatrix(board, type, params);
    }
    this.methodMap = {
        apply: "apply",
        applyOnce: "applyOnce",
        bindTo: "bindTo",
        bind: "bindTo",
        melt: "melt",
        meltTo: "meltTo"
    };
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Transformation.prototype = {};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Transformation.prototype, /** @lends JXG.Transformation.prototype */ {
    /**
         * Updates the numerical data for the transformation, i.e. the entry of the subobject matrix.
         * @returns {JXG.Transform} returns pointer to itself
         */ update: function() {
        return this;
    },
    /**
         * Set the transformation matrix for different types of standard transforms.
         * @param {JXG.Board} board
         * @param {String} type   Transformation type, possible values are
         *                        'translate', 'scale', 'reflect', 'rotate',
         *                        'shear', 'generic'.
         * @param {Array} params Parameters for the various transformation types.
         *
         * <p>A transformation with a generic matrix looks like:
         * <pre>
         * ( a  b  c )   ( z )
         * ( d  e  f ) * ( x )
         * ( g  h  i )   ( y )
         * </pre>
         *
         * The transformation matrix then looks like:
         * <p>
         * Translation matrix:
         * <pre>
         * ( 1  0  0)   ( z )
         * ( a  1  0) * ( x )
         * ( b  0  1)   ( y )
         * </pre>
         *
         * <p>
         * Scale matrix:
         * <pre>
         * ( 1  0  0)   ( z )
         * ( 0  a  0) * ( x )
         * ( 0  0  b)   ( y )
         * </pre>
         *
         * <p>
         * A rotation matrix with angle a (in Radians)
         * <pre>
         * ( 1    0        0      )   ( z )
         * ( 0    cos(a)   -sin(a)) * ( x )
         * ( 0    sin(a)   cos(a) )   ( y )
         * </pre>
         *
         * <p>
         * Shear matrix:
         * <pre>
         * ( 1  0  0)   ( z )
         * ( 0  1  a) * ( x )
         * ( 0  b  1)   ( y )
         * </pre>
         *
         * <p>Generic transformation (9 parameters):
         * <pre>
         * ( a  b  c )   ( z )
         * ( d  e  f ) * ( x )
         * ( g  h  i )   ( y )
         * </pre>
         *
         * <p>Matrix:
         * <pre>
         * (         )   ( z )
         * (    M    ) * ( x )
         * (         )   ( y )
         * </pre>
         */ setMatrix: function(board, type, params) {
        var i;
        // e, obj; // Handle dependencies
        this.isNumericMatrix = true;
        for(i = 0; i < params.length; i++){
            if (typeof params[i] !== "number") {
                this.isNumericMatrix = false;
                break;
            }
        }
        if (type === "translate") {
            if (params.length !== 2) {
                throw new Error("JSXGraph: translate transformation needs 2 parameters.");
            }
            this.evalParam = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createEvalFunction(board, params, 2);
            this.update = function() {
                this.matrix[1][0] = this.evalParam(0);
                this.matrix[2][0] = this.evalParam(1);
            };
        } else if (type === "scale") {
            if (params.length !== 2) {
                throw new Error("JSXGraph: scale transformation needs 2 parameters.");
            }
            this.evalParam = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createEvalFunction(board, params, 2);
            this.update = function() {
                this.matrix[1][1] = this.evalParam(0); // x
                this.matrix[2][2] = this.evalParam(1); // y
            };
        // Input: line or two points
        } else if (type === "reflect") {
            // line or two points
            if (params.length < 4) {
                params[0] = board.select(params[0]);
            }
            // two points
            if (params.length === 2) {
                params[1] = board.select(params[1]);
            }
            // 4 coordinates [px,py,qx,qy]
            if (params.length === 4) {
                this.evalParam = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createEvalFunction(board, params, 4);
            }
            this.update = function() {
                var x, y, z, xoff, yoff, d, v, p;
                // Determine homogeneous coordinates of reflections axis
                // line
                if (params.length === 1) {
                    v = params[0].stdform;
                } else if (params.length === 2) {
                    // two points
                    v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].crossProduct(params[1].coords.usrCoords, params[0].coords.usrCoords);
                } else if (params.length === 4) {
                    // two points coordinates [px,py,qx,qy]
                    v = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].crossProduct([
                        1,
                        this.evalParam(2),
                        this.evalParam(3)
                    ], [
                        1,
                        this.evalParam(0),
                        this.evalParam(1)
                    ]);
                }
                // Project origin to the line. This gives a finite point p
                x = v[1];
                y = v[2];
                z = v[0];
                p = [
                    -z * x,
                    -z * y,
                    x * x + y * y
                ];
                d = p[2];
                // Normalize p
                xoff = p[0] / p[2];
                yoff = p[1] / p[2];
                // x, y is the direction of the line
                x = -v[2];
                y = v[1];
                this.matrix[1][1] = (x * x - y * y) / d;
                this.matrix[1][2] = 2 * x * y / d;
                this.matrix[2][1] = this.matrix[1][2];
                this.matrix[2][2] = -this.matrix[1][1];
                this.matrix[1][0] = xoff * (1 - this.matrix[1][1]) - yoff * this.matrix[1][2];
                this.matrix[2][0] = yoff * (1 - this.matrix[2][2]) - xoff * this.matrix[2][1];
            };
        } else if (type === "rotate") {
            if (params.length === 3) {
                // angle, x, y
                this.evalParam = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createEvalFunction(board, params, 3);
            } else if (params.length > 0 && params.length <= 2) {
                // angle, p or angle
                this.evalParam = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createEvalFunction(board, params, 1);
                if (params.length === 2 && !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(params[1])) {
                    params[1] = board.select(params[1]);
                }
            }
            this.update = function() {
                var x, y, beta = this.evalParam(0), co = Math.cos(beta), si = Math.sin(beta);
                this.matrix[1][1] = co;
                this.matrix[1][2] = -si;
                this.matrix[2][1] = si;
                this.matrix[2][2] = co;
                // rotate around [x,y] otherwise rotate around [0,0]
                if (params.length > 1) {
                    if (params.length === 3) {
                        x = this.evalParam(1);
                        y = this.evalParam(2);
                    } else {
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(params[1])) {
                            x = params[1][0];
                            y = params[1][1];
                        } else {
                            x = params[1].X();
                            y = params[1].Y();
                        }
                    }
                    this.matrix[1][0] = x * (1 - co) + y * si;
                    this.matrix[2][0] = y * (1 - co) - x * si;
                }
            };
        } else if (type === "shear") {
            if (params.length !== 2) {
                throw new Error("JSXGraph: shear transformation needs 2 parameters.");
            }
            this.evalParam = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createEvalFunction(board, params, 2);
            this.update = function() {
                this.matrix[1][2] = this.evalParam(0);
                this.matrix[2][1] = this.evalParam(1);
            };
        } else if (type === "generic") {
            if (params.length !== 9) {
                throw new Error("JSXGraph: generic transformation needs 9 parameters.");
            }
            this.evalParam = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createEvalFunction(board, params, 9);
            this.update = function() {
                this.matrix[0][0] = this.evalParam(0);
                this.matrix[0][1] = this.evalParam(1);
                this.matrix[0][2] = this.evalParam(2);
                this.matrix[1][0] = this.evalParam(3);
                this.matrix[1][1] = this.evalParam(4);
                this.matrix[1][2] = this.evalParam(5);
                this.matrix[2][0] = this.evalParam(6);
                this.matrix[2][1] = this.evalParam(7);
                this.matrix[2][2] = this.evalParam(8);
            };
        } else if (type === "matrix") {
            if (params.length !== 1) {
                throw new Error("JSXGraph: transformation of type 'matrix' needs 1 parameter.");
            }
            this.evalParam = params[0].slice();
            this.update = function() {
                var i, j;
                for(i = 0; i < 3; i++){
                    for(j = 0; j < 3; j++){
                        this.matrix[i][j] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].evaluate(this.evalParam[i][j]);
                    }
                }
            };
        }
    // Handle dependencies
    // NO: transformations do not have method addParents
    // if (Type.exists(this.evalParam)) {
    //     for (e in this.evalParam.deps) {
    //         obj = this.evalParam.deps[e];
    //         this.addParents(obj);
    //         obj.addChild(this);
    //     }
    // }
    },
    /**
         * Set the 3D transformation matrix for different types of standard transforms.
         * @param {JXG.Board} board
         * @param {String} type   Transformation type, possible values are
         *                        'translate', 'scale', 'rotate',
         *                        'rotateX', 'rotateY', 'rotateZ',
         *                        'shear', 'generic'.
         * @param {Array} params Parameters for the various transformation types.
         *
         * <p>A transformation with a generic matrix looks like:
         * <pre>
         * ( a  b  c  d)   ( w )
         * ( e  f  g  h) * ( x )
         * ( i  j  k  l)   ( y )
         * ( m  n  o  p)   ( z )
         * </pre>
         *
         * The transformation matrix then looks like:
         * <p>
         * Translation matrix:
         * <pre>
         * ( 1  0  0  0)   ( w )
         * ( a  1  0  0) * ( x )
         * ( b  0  1  0)   ( y )
         * ( c  0  0  1)   ( z )
         * </pre>
         *
         * <p>
         * Scale matrix:
         * <pre>
         * ( 1  0  0  0)   ( w )
         * ( 0  a  0  0) * ( x )
         * ( 0  0  b  0)   ( y )
         * ( 0  0  0  c)   ( z )
         * </pre>
         *
         * <p>
         * rotateX: a rotation matrix with angle a (in Radians)
         * <pre>
         * ( 1    0        0             )   ( z )
         * ( 0    1        0         0   ) * ( x )
         * ( 0    0      cos(a)   -sin(a)) * ( x )
         * ( 0    0      sin(a)   cos(a) )   ( y )
         * </pre>
         *
         * <p>
         * rotateY: a rotation matrix with angle a (in Radians)
         * <pre>
         * ( 1      0       0           )   ( z )
         * ( 0    cos(a)    0    -sin(a)) * ( x )
         * ( 0      0       1       0   ) * ( x )
         * ( 0    sin(a)    0    cos(a) )   ( y )
         * </pre>
         *
         * <p>
         * rotateZ: a rotation matrix with angle a (in Radians)
         * <pre>
         * ( 1      0                0  )   ( z )
         * ( 0    cos(a)   -sin(a)   0  ) * ( x )
         * ( 0    sin(a)   cos(a)    0  )   ( y )
         * ( 0      0         0      1  ) * ( x )
         * </pre>
         *
         * <p>
         * rotate: a rotation matrix with angle a (in Radians)
         * and normal <i>n</i>.
         *
         */ setMatrix3D: function(view, type, params) {
        var i, board = view.board;
        this.isNumericMatrix = true;
        for(i = 0; i < params.length; i++){
            if (typeof params[i] !== "number") {
                this.isNumericMatrix = false;
                break;
            }
        }
        if (type === "translate") {
            if (params.length !== 3) {
                throw new Error("JSXGraph: 3D translate transformation needs 3 parameters.");
            }
            this.evalParam = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createEvalFunction(board, params, 3);
            this.update = function() {
                this.matrix[1][0] = this.evalParam(0);
                this.matrix[2][0] = this.evalParam(1);
                this.matrix[3][0] = this.evalParam(2);
            };
        } else if (type === 'scale') {
            if (params.length !== 3 && params.length !== 4) {
                throw new Error("JSXGraph: 3D scale transformation needs either 3 or 4 parameters.");
            }
            this.evalParam = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createEvalFunction(board, params, 3);
            this.update = function() {
                var x = this.evalParam(0), y = this.evalParam(1), z = this.evalParam(2);
                this.matrix[1][1] = x;
                this.matrix[2][2] = y;
                this.matrix[3][3] = z;
            };
        } else if (type === 'rotateX') {
            params.splice(1, 0, [
                1,
                0,
                0
            ]);
            this.setMatrix3D(view, 'rotate', params);
        } else if (type === 'rotateY') {
            params.splice(1, 0, [
                0,
                1,
                0
            ]);
            this.setMatrix3D(view, 'rotate', params);
        } else if (type === 'rotateZ') {
            params.splice(1, 0, [
                0,
                0,
                1
            ]);
            this.setMatrix3D(view, 'rotate', params);
        } else if (type === 'rotate') {
            if (params.length < 2) {
                throw new Error("JSXGraph: 3D rotate transformation needs 2 or 3 parameters.");
            }
            if (params.length === 3 && !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(params[2]) && !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(params[2])) {
                this.evalParam = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createEvalFunction(board, params, 2);
                params[2] = view.select(params[2]);
            } else {
                this.evalParam = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createEvalFunction(board, params, params.length);
            }
            this.update = function() {
                var a = this.evalParam(0), n = this.evalParam(1), p = [
                    1,
                    0,
                    0,
                    0
                ], co = Math.cos(a), si = Math.sin(a), n1, n2, n3, m1 = [
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
                ], m2 = [
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
                ], nrm = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].norm(n);
                if (n.length === 3) {
                    n1 = n[0] / nrm;
                    n2 = n[1] / nrm;
                    n3 = n[2] / nrm;
                } else {
                    n1 = n[1] / nrm;
                    n2 = n[2] / nrm;
                    n3 = n[3] / nrm;
                }
                if (params.length === 3) {
                    if (params.length === 3 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(params[2].is3D)) {
                        p = params[2].coords.slice();
                    } else {
                        p = this.evalParam(2);
                    }
                    if (p.length === 3) {
                        p.unshift(1);
                    }
                    m1[1][0] = -p[1];
                    m1[2][0] = -p[2];
                    m1[3][0] = -p[3];
                    m2[1][0] = p[1];
                    m2[2][0] = p[2];
                    m2[3][0] = p[3];
                }
                this.matrix = [
                    [
                        1,
                        0,
                        0,
                        0
                    ],
                    [
                        0,
                        n1 * n1 * (1 - co) + co,
                        n1 * n2 * (1 - co) - n3 * si,
                        n1 * n3 * (1 - co) + n2 * si
                    ],
                    [
                        0,
                        n2 * n1 * (1 - co) + n3 * si,
                        n2 * n2 * (1 - co) + co,
                        n2 * n3 * (1 - co) - n1 * si
                    ],
                    [
                        0,
                        n3 * n1 * (1 - co) - n2 * si,
                        n3 * n2 * (1 - co) + n1 * si,
                        n3 * n3 * (1 - co) + co
                    ]
                ];
                this.matrix = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matMatMult(this.matrix, m1);
                this.matrix = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matMatMult(m2, this.matrix);
            };
        }
    },
    /**
         * Transform a point element, that are: {@link Point}, {@link Text}, {@link Image}, {@link Point3D}.
         * First, the transformation matrix is updated, then do the matrix-vector-multiplication.
         * <p>
         * Restricted to 2D transformations.
         *
         * @private
         * @param {JXG.GeometryElement} p element which is transformed
         * @param {String} 'self' Apply the transformation to the initialCoords instead of the coords if this is set.
         * @returns {Array}
         */ apply: function(p, self) {
        var c;
        this.update();
        if (this.is3D) {
            c = p.coords;
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(self)) {
            c = p.initialCoords.usrCoords;
        } else {
            c = p.coords.usrCoords;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matVecMult(this.matrix, c);
    },
    /**
         * Applies a transformation once to a point element, that are: {@link Point}, {@link Text}, {@link Image}, {@link Point3D} or to an array of such elements.
         * If it is a free 2D point, then it can be dragged around later
         * and will overwrite the transformed coordinates.
         * @param {JXG.Point|Array} p
         */ applyOnce: function(p) {
        var c, len, i;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(p)) {
            p = [
                p
            ];
        }
        len = p.length;
        for(i = 0; i < len; i++){
            this.update();
            if (this.is3D) {
                p[i].coords = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matVecMult(this.matrix, p[i].coords);
            } else {
                c = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matVecMult(this.matrix, p[i].coords.usrCoords);
                p[i].coords.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, c);
            }
        }
    },
    /**
         * Binds a transformation to a GeometryElement or an array of elements. In every update of the
         * GeometryElement(s), the transformation is executed. That means, in order to immediately
         * apply the transformation after calling bindTo, a call of board.update() has to follow.
         * <p>
         * The transformation is simply appended to the existing list of transformations of the object.
         * It is not fused (melt) with an existing transformation.
         *
         * @param  {Array|JXG.Object} el JXG.Object or array of JXG.Object to
         *                            which the transformation is bound to.
         * @see JXG.Transformation.meltTo
         */ bindTo: function(el) {
        var i, len;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(el)) {
            len = el.length;
            for(i = 0; i < len; i++){
                el[i].transformations.push(this);
            }
        } else {
            el.transformations.push(this);
        }
    },
    /**
         * Binds a transformation to a GeometryElement or an array of elements. In every update of the
         * GeometryElement(s), the transformation is executed. That means, in order to immediately
         * apply the transformation after calling meltTo, a call of board.update() has to follow.
         * <p>
         * In case the last transformation of the element and this transformation are static,
         * i.e. the transformation matrices do not depend on other elements,
         * the transformation will be fused into (multiplied with) the last transformation of
         * the element. Thus, the list of transformations is kept small.
         * If the transformation will be the first transformation ot the element, it will be cloned
         * to prevent side effects.
         *
         * @param  {Array|JXG.Object} el JXG.Object or array of JXG.Objects to
         *                            which the transformation is bound to.
         *
         * @see JXG.Transformation#bindTo
         */ meltTo: function(el) {
        var i, elt, t;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(el)) {
            for(i = 0; i < el.length; i++){
                this.meltTo(el[i]);
            }
        } else {
            elt = el.transformations;
            if (elt.length > 0 && elt[elt.length - 1].isNumericMatrix && this.isNumericMatrix) {
                elt[elt.length - 1].melt(this);
            } else {
                // Use a clone of the transformation.
                // Otherwise, if the transformation is meltTo twice
                // the transformation will be changed.
                t = this.clone();
                elt.push(t);
            }
        }
    },
    /**
         * Create a copy of the transformation in case it is static, i.e.
         * if the transformation matrix does not depend on other elements.
         * <p>
         * If the transformation matrix is not static, null will be returned.
         *
         * @returns {JXG.Transformation}
         */ clone: function() {
        var t = null;
        if (this.isNumericMatrix) {
            t = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Transformation(this.board, 'none', []);
            t.matrix = this.matrix.slice();
        }
        return t;
    },
    /**
         * Unused
         * @deprecated Use setAttribute
         * @param term
         */ setProperty: function(term) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("Transformation.setProperty()", "Transformation.setAttribute()");
    },
    /**
         * Empty method. Unused.
         * @param {Object} term Key-value pairs of the attributes.
         */ setAttribute: function(term) {},
    /**
         * Combine two transformations to one transformation. This only works if
         * both of transformation matrices consist of numbers solely, and do not
         * contain functions.
         *
         * Multiplies the transformation with a transformation t from the left.
         * i.e. (this) = (t) join (this)
         * @param  {JXG.Transform} t Transformation which is the left multiplicand
         * @returns {JXG.Transform} the transformation object.
         */ melt: function(t) {
        var res = [];
        this.update();
        t.update();
        res = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matMatMult(t.matrix, this.matrix);
        this.update = function() {
            this.matrix = res;
        };
        return this;
    },
    // Documented in element.js
    // Not yet, since transformations are not listed in board.objects.
    getParents: function() {
        var p = [
            [].concat.apply([], this.matrix)
        ];
        if (this.parents.length !== 0) {
            p = this.parents;
        }
        return p;
    }
});
/**
 * @class Define projective 2D transformations like translation, rotation, reflection.
 * @pseudo
 * @description A transformation consists of a 3x3 matrix, i.e. it is a projective transformation.
 * <p>
 * Internally, a transformation is applied to an element by multiplying the 3x3 matrix from the left to
 * the homogeneous coordinates of the element. JSXGraph represents homogeneous coordinates in the order
 * (z, x, y). The matrix has the form
 * <pre>
 * ( a  b  c )   ( z )
 * ( d  e  f ) * ( x )
 * ( g  h  i )   ( y )
 * </pre>
 * where in general a=1. If b = c = 0, the transformation is called <i>affine</i>.
 * In this case, finite points will stay finite. This is not the case for general projective coordinates.
 * <p>
 * Transformations acting on texts and images are considered to be affine, i.e. b and c are ignored.
 *
 * @name Transformation
 * @augments JXG.Transformation
 * @constructor
 * @type JXG.Transformation
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {number|function|JXG.GeometryElement} parameters The parameters depend on the transformation type, supplied as attribute 'type'.
 * Possible transformation types are
 * <ul>
 * <li> 'translate'
 * <li> 'scale'
 * <li> 'reflect'
 * <li> 'rotate'
 * <li> 'shear'
 * <li> 'generic'
 * <li> 'matrix'
 * </ul>
 * <p>Valid parameters for these types are:
 * <dl>
 * <dt><b><tt>type:"translate"</tt></b></dt><dd><b>x, y</b> Translation vector (two numbers or functions).
 * The transformation matrix for x = a and y = b has the form:
 * <pre>
 * ( 1  0  0)   ( z )
 * ( a  1  0) * ( x )
 * ( b  0  1)   ( y )
 * </pre>
 * </dd>
 * <dt><b><tt>type:"scale"</tt></b></dt><dd><b>scale_x, scale_y</b> Scale vector (two numbers or functions).
 * The transformation matrix for scale_x = a and scale_y = b has the form:
 * <pre>
 * ( 1  0  0)   ( z )
 * ( 0  a  0) * ( x )
 * ( 0  0  b)   ( y )
 * </pre>
 * </dd>
 * <dt><b><tt>type:"rotate"</tt></b></dt><dd> <b>alpha, [point | x, y]</b> The parameters are the angle value in Radians
 *     (a number or function), and optionally a coordinate pair (two numbers or functions) or a point element defining the
 *                rotation center. If the rotation center is not given, the transformation rotates around (0,0).
 * The transformation matrix for angle a and rotating around (0, 0) has the form:
 * <pre>
 * ( 1    0        0      )   ( z )
 * ( 0    cos(a)   -sin(a)) * ( x )
 * ( 0    sin(a)   cos(a) )   ( y )
 * </pre>
 * </dd>
 * <dt><b><tt>type:"shear"</tt></b></dt><dd><b>shear_x, shear_y</b> Shear vector (two numbers or functions).
 * The transformation matrix for shear_x = a and shear_y = b has the form:
 * <pre>
 * ( 1  0  0)   ( z )
 * ( 0  1  a) * ( x )
 * ( 0  b  1)   ( y )
 * </pre>
 * </dd>
 * <dt><b><tt>type:"reflect"</tt></b></dt><dd>The parameters can either be:
 *    <ul>
 *      <li> <b>line</b> a line element,
 *      <li> <b>p, q</b> two point elements,
 *      <li> <b>p_x, p_y, q_x, q_y</b> four numbers or functions  determining a line through points (p_x, p_y) and (q_x, q_y).
 *    </ul>
 * </dd>
 * <dt><b><tt>type:"generic"</tt></b></dt><dd><b>a, b, c, d, e, f, g, h, i</b> Nine matrix entries (numbers or functions)
 *  for a generic projective transformation.
 * The matrix has the form
 * <pre>
 * ( a  b  c )   ( z )
 * ( d  e  f ) * ( x )
 * ( g  h  i )   ( y )
 * </pre>
 * </dd>
 * <dt><b><tt>type:"matrix"</tt></b></dt><dd><b>M</b> 3x3 transformation matrix containing numbers or functions</dd>
 * </dl>
 *
 *
 * @see JXG.Transformation#setMatrix
 *
 * @example
 * // The point B is determined by taking twice the vector A from the origin
 *
 * var p0 = board.create('point', [0, 3], {name: 'A'}),
 *     t = board.create('transform', [function(){ return p0.X(); }, "Y(A)"], {type: 'translate'}),
 *     p1 = board.create('point', [p0, t], {color: 'blue'});
 *
 * </pre><div class="jxgbox" id="JXG14167b0c-2ad3-11e5-8dd9-901b0e1b8723" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG14167b0c-2ad3-11e5-8dd9-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var p0 = board.create('point', [0, 3], {name: 'A'}),
 *         t = board.create('transform', [function(){ return p0.X(); }, "Y(A)"], {type:'translate'}),
 *         p1 = board.create('point', [p0, t], {color: 'blue'});
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * // The point B is the result of scaling the point A with factor 2 in horizontal direction
 * // and with factor 0.5 in vertical direction.
 *
 * var p1 = board.create('point', [1, 1]),
 *     t = board.create('transform', [2, 0.5], {type: 'scale'}),
 *     p2 = board.create('point', [p1, t], {color: 'blue'});
 *
 * </pre><div class="jxgbox" id="JXGa6827a72-2ad3-11e5-8dd9-901b0e1b8723" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGa6827a72-2ad3-11e5-8dd9-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var p1 = board.create('point', [1, 1]),
 *         t = board.create('transform', [2, 0.5], {type: 'scale'}),
 *         p2 = board.create('point', [p1, t], {color: 'blue'});
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * // The point B is rotated around C which gives point D. The angle is determined
 * // by the vertical height of point A.
 *
 * var p0 = board.create('point', [0, 3], {name: 'A'}),
 *     p1 = board.create('point', [1, 1]),
 *     p2 = board.create('point', [2, 1], {name:'C', fixed: true}),
 *
 *     // angle, rotation center:
 *     t = board.create('transform', ['Y(A)', p2], {type: 'rotate'}),
 *     p3 = board.create('point', [p1, t], {color: 'blue'});
 *
 * </pre><div class="jxgbox" id="JXG747cf11e-2ad4-11e5-8dd9-901b0e1b8723" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG747cf11e-2ad4-11e5-8dd9-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var p0 = board.create('point', [0, 3], {name: 'A'}),
 *         p1 = board.create('point', [1, 1]),
 *         p2 = board.create('point', [2, 1], {name:'C', fixed: true}),
 *
 *         // angle, rotation center:
 *         t = board.create('transform', ['Y(A)', p2], {type: 'rotate'}),
 *         p3 = board.create('point', [p1, t], {color: 'blue'});
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * // A concatenation of several transformations.
 * var p1 = board.create('point', [1, 1]),
 *     t1 = board.create('transform', [-2, -1], {type: 'translate'}),
 *     t2 = board.create('transform', [Math.PI/4], {type: 'rotate'}),
 *     t3 = board.create('transform', [2, 1], {type: 'translate'}),
 *     p2 = board.create('point', [p1, [t1, t2, t3]], {color: 'blue'});
 *
 * </pre><div class="jxgbox" id="JXGf516d3de-2ad5-11e5-8dd9-901b0e1b8723" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGf516d3de-2ad5-11e5-8dd9-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var p1 = board.create('point', [1, 1]),
 *         t1 = board.create('transform', [-2, -1], {type:'translate'}),
 *         t2 = board.create('transform', [Math.PI/4], {type:'rotate'}),
 *         t3 = board.create('transform', [2, 1], {type:'translate'}),
 *         p2 = board.create('point', [p1, [t1, t2, t3]], {color: 'blue'});
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * // Reflection of point A
 * var p1 = board.create('point', [1, 1]),
 *     p2 = board.create('point', [1, 3]),
 *     p3 = board.create('point', [-2, 0]),
 *     l = board.create('line', [p2, p3]),
 *     t = board.create('transform', [l], {type: 'reflect'}),  // Possible are l, l.id, l.name
 *     p4 = board.create('point', [p1, t], {color: 'blue'});
 *
 * </pre><div class="jxgbox" id="JXG6f374a04-2ad6-11e5-8dd9-901b0e1b8723" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG6f374a04-2ad6-11e5-8dd9-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var p1 = board.create('point', [1, 1]),
 *         p2 = board.create('point', [1, 3]),
 *         p3 = board.create('point', [-2, 0]),
 *         l = board.create('line', [p2, p3]),
 *         t = board.create('transform', [l], {type:'reflect'}),  // Possible are l, l.id, l.name
 *         p4 = board.create('point', [p1, t], {color: 'blue'});
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * // Type: 'matrix'
 *         var y = board.create('slider', [[-3, 1], [-3, 4], [0, 1, 6]]);
 *         var t1 = board.create('transform', [
 *             [
 *                 [1, 0, 0],
 *                 [0, 1, 0],
 *                 [() => y.Value(), 0, 1]
 *             ]
 *         ], {type: 'matrix'});
 *
 *         var A = board.create('point', [2, -3]);
 *         var B = board.create('point', [A, t1]);
 *
 * </pre><div id="JXGd2bfd46c-3c0c-45c5-a92b-583fad0eb3ec" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGd2bfd46c-3c0c-45c5-a92b-583fad0eb3ec',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *             var y = board.create('slider', [[-3, 1], [-3, 4], [0, 1, 6]]);
 *             var t1 = board.create('transform', [
 *                 [
 *                     [1, 0, 0],
 *                     [0, 1, 0],
 *                     [() => y.Value(), 0, 1]
 *                 ]
 *             ], {type: 'matrix'});
 *
 *             var A = board.create('point', [2, -3]);
 *             var B = board.create('point', [A, t1]);
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * // One time application of a transform to points A, B
 * var p1 = board.create('point', [1, 1]),
 *     p2 = board.create('point', [-1, -2]),
 *     t = board.create('transform', [3, 2], {type: 'shear'});
 * t.applyOnce([p1, p2]);
 *
 * </pre><div class="jxgbox" id="JXGb6cee1c4-2ad6-11e5-8dd9-901b0e1b8723" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGb6cee1c4-2ad6-11e5-8dd9-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8, -8], axis: true, showcopyright: false, shownavigation: false});
 *     var p1 = board.create('point', [1, 1]),
 *         p2 = board.create('point', [-1, -2]),
 *         t = board.create('transform', [3, 2], {type: 'shear'});
 *     t.applyOnce([p1, p2]);
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * // Construct a square of side length 2 with the
 * // help of transformations
 *     var sq = [],
 *         right = board.create('transform', [2, 0], {type: 'translate'}),
 *         up = board.create('transform', [0, 2], {type: 'translate'}),
 *         pol, rot, p0;
 *
 *     // The first point is free
 *     sq[0] = board.create('point', [0, 0], {name: 'Drag me'}),
 *
 *     // Construct the other free points by transformations
 *     sq[1] = board.create('point', [sq[0], right]),
 *     sq[2] = board.create('point', [sq[0], [right, up]]),
 *     sq[3] = board.create('point', [sq[0], up]),
 *
 *     // Polygon through these four points
 *     pol = board.create('polygon', sq, {
 *             fillColor:'blue',
 *             gradient:'radial',
 *             gradientsecondcolor:'white',
 *             gradientSecondOpacity:'0'
 *     }),
 *
 *     p0 = board.create('point', [0, 3], {name: 'angle'}),
 *     // Rotate the square around point sq[0] by dragging A vertically.
 *     rot = board.create('transform', ['Y(angle)', sq[0]], {type: 'rotate'});
 *
 *     // Apply the rotation to all but the first point of the square
 *     rot.bindTo(sq.slice(1));
 *
 * </pre><div class="jxgbox" id="JXGc7f9097e-2ad7-11e5-8dd9-901b0e1b8723" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGc7f9097e-2ad7-11e5-8dd9-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     // Construct a square of side length 2 with the
 *     // help of transformations
 *     var sq = [],
 *         right = board.create('transform', [2, 0], {type: 'translate'}),
 *         up = board.create('transform', [0, 2], {type: 'translate'}),
 *         pol, rot, p0;
 *
 *     // The first point is free
 *     sq[0] = board.create('point', [0, 0], {name: 'Drag me'}),
 *
 *     // Construct the other free points by transformations
 *     sq[1] = board.create('point', [sq[0], right]),
 *     sq[2] = board.create('point', [sq[0], [right, up]]),
 *     sq[3] = board.create('point', [sq[0], up]),
 *
 *     // Polygon through these four points
 *     pol = board.create('polygon', sq, {
 *             fillColor:'blue',
 *             gradient:'radial',
 *             gradientsecondcolor:'white',
 *             gradientSecondOpacity:'0'
 *     }),
 *
 *     p0 = board.create('point', [0, 3], {name: 'angle'}),
 *     // Rotate the square around point sq[0] by dragging A vertically.
 *     rot = board.create('transform', ['Y(angle)', sq[0]], {type: 'rotate'});
 *
 *     // Apply the rotation to all but the first point of the square
 *     rot.bindTo(sq.slice(1));
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * // Text transformation
 * var p0 = board.create('point', [0, 0], {name: 'p_0'});
 * var p1 = board.create('point', [3, 0], {name: 'p_1'});
 * var txt = board.create('text',[0.5, 0, 'Hello World'], {display:'html'});
 *
 * // If p_0 is dragged, translate p_1 and text accordingly
 * var tOff = board.create('transform', [() => p0.X(), () => p0.Y()], {type:'translate'});
 * tOff.bindTo(txt);
 * tOff.bindTo(p1);
 *
 * // Rotate text around p_0 by dragging point p_1
 * var tRot = board.create('transform', [
 *     () => Math.atan2(p1.Y() - p0.Y(), p1.X() - p0.X()), p0], {type:'rotate'});
 * tRot.bindTo(txt);
 *
 * // Scale text by dragging point "p_1"
 * // We do this by
 * // - moving text by -p_0 (inverse of transformation tOff),
 * // - scale the text (because scaling is relative to (0,0))
 * // - move the text back by +p_0
 * var tOffInv = board.create('transform', [
 *         () => -p0.X(),
 *         () => -p0.Y()
 * ], {type:'translate'});
 * var tScale = board.create('transform', [
 *         // Some scaling factor
 *         () => p1.Dist(p0) / 3,
 *         () => p1.Dist(p0) / 3
 * ], {type:'scale'});
 * tOffInv.bindTo(txt); tScale.bindTo(txt); tOff.bindTo(txt);
 *
 * </pre><div id="JXG50d6d546-3b91-41dd-8c0f-3eaa6cff7e66" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG50d6d546-3b91-41dd-8c0f-3eaa6cff7e66',
 *             {boundingbox: [-5, 5, 5, -5], axis: true, showcopyright: false, shownavigation: false});
 *     var p0 = board.create('point', [0, 0], {name: 'p_0'});
 *     var p1 = board.create('point', [3, 0], {name: 'p_1'});
 *     var txt = board.create('text',[0.5, 0, 'Hello World'], {display:'html'});
 *
 *     // If p_0 is dragged, translate p_1 and text accordingly
 *     var tOff = board.create('transform', [() => p0.X(), () => p0.Y()], {type:'translate'});
 *     tOff.bindTo(txt);
 *     tOff.bindTo(p1);
 *
 *     // Rotate text around p_0 by dragging point p_1
 *     var tRot = board.create('transform', [
 *         () => Math.atan2(p1.Y() - p0.Y(), p1.X() - p0.X()), p0], {type:'rotate'});
 *     tRot.bindTo(txt);
 *
 *     // Scale text by dragging point "p_1"
 *     // We do this by
 *     // - moving text by -p_0 (inverse of transformation tOff),
 *     // - scale the text (because scaling is relative to (0,0))
 *     // - move the text back by +p_0
 *     var tOffInv = board.create('transform', [
 *             () => -p0.X(),
 *             () => -p0.Y()
 *     ], {type:'translate'});
 *     var tScale = board.create('transform', [
 *             // Some scaling factor
 *             () => p1.Dist(p0) / 3,
 *             () => p1.Dist(p0) / 3
 *     ], {type:'scale'});
 *     tOffInv.bindTo(txt); tScale.bindTo(txt); tOff.bindTo(txt);
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createTransform = function(board, parents, attributes) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Transformation(board, attributes.type, parents);
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement('transform', __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createTransform);
/**
 * @class Define projective 3D transformations like translation, rotation, reflection.
 * @pseudo
 * @description A transformation consists of a 4x4 matrix, i.e. it is a projective transformation.
 * <p>
 * Internally, a transformation is applied to an element by multiplying the 4x4 matrix from the left to
 * the homogeneous coordinates of the element. JSXGraph represents homogeneous coordinates in the order
 * (w, x, y, z). If the coordinate is a finite point, w=1. The matrix has the form
 * <pre>
 * ( a b c d)   ( w )
 * ( e f g h) * ( x )
 * ( i j k l)   ( y )
 * ( m n o p)   ( z )
 * </pre>
 * where in general a=1. If b = c = d = 0, the transformation is called <i>affine</i>.
 * In this case, finite points will stay finite. This is not the case for general projective coordinates.
 * <p>
 *
 * @name Transformation3D
 * @augments JXG.Transformation
 * @constructor
 * @type JXG.Transformation
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {number|function|JXG.GeometryElement3D} parameters The parameters depend on the transformation type, supplied as attribute 'type'.
 *  Possible transformation types are
 * <ul>
 * <li> 'translate'
 * <li> 'scale'
 * <li> 'rotate'
 * <li> 'rotateX'
 * <li> 'rotateY'
 * <li> 'rotateZ'
 * </ul>
 * <p>Valid parameters for these types are:
 * <dl>
 * <dt><b><tt>type:"translate"</tt></b></dt><dd><b>x, y, z</b> Translation vector (three numbers or functions).
 * The transformation matrix for x = a, y = b, and z = c has the form:
 * <pre>
 * ( 1  0  0  0)   ( w )
 * ( a  1  0  0) * ( x )
 * ( b  0  1  0)   ( y )
 * ( c  0  0  c)   ( z )
 * </pre>
 * </dd>
 * <dt><b><tt>type:"scale"</tt></b></dt><dd><b>scale_x, scale_y, scale_z</b> Scale vector (three numbers or functions).
 * The transformation matrix for scale_x = a, scale_y = b, scale_z = c has the form:
 * <pre>
 * ( 1  0  0  0)   ( w )
 * ( 0  a  0  0) * ( x )
 * ( 0  0  b  0)   ( y )
 * ( 0  0  0  c)   ( z )
 * </pre>
 * </dd>
 * <dt><b><tt>type:"rotate"</tt></b></dt><dd><b>a, n, [p=[0,0,0]]</b> angle (in radians), normal, [point].
 * Rotate with angle a around the normal vector n through the point p.
 * </dd>
 * <dt><b><tt>type:"rotateX"</tt></b></dt><dd><b>a, [p=[0,0,0]]</b> angle (in radians), [point].
 * Rotate with angle a around the normal vector (1, 0, 0) through the point p.
 * </dd>
 * <dt><b><tt>type:"rotateY"</tt></b></dt><dd><b>a, [p=[0,0,0]]</b> angle (in radians), [point].
 * Rotate with angle a around the normal vector (0, 1, 0) through the point p.
 * </dd>
 * <dt><b><tt>type:"rotateZ"</tt></b></dt><dd><b>a, [p=[0,0,0]]</b> angle (in radians), [point].
 * Rotate with angle a around the normal vector (0, 0, 1) through the point p.
 * </dd>
 * </dl>
 * @example
 *    var bound = [-5, 5];
 *    var view = board.create('view3d',
 *        [[-6, -3], [8, 8],
 *        [bound, bound, bound]];
 *
 *    var slid = board.create('slider', [[-4, 4], [0, 4], [0, 0, 5]])
 *
 *    var p1 = view.create('point3d', [1, 2, 2], { name: 'drag me', size: 5 });
 *
 *    // translate from p1 by some fixed or function amount
 *    var t1 = view.create('transform3d', [2, 3, 2], { type: 'translate' });
 *    var t2 = view.create('transform3d', [()=>slid.Value()+3,0,0], { type: 'translate' })
 *
 *    view.create('point3d', [p1, t1], { name: 'translate fixed', size: 5 });
 *    view.create('point3d', [p1, t2], { name: 'translate by func', size: 5 });
 * </pre><div id="JXG6c7d7404-758a-44eb-802c-0001" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *    var board = JXG.JSXGraph.initBoard('JXG6c7d7404-758a-44eb-802c-0001',
 *             {boundingbox: [-8, 8, 8,-8], pan: {enabled: false}, axis: false, showcopyright: false, shownavigation: false});
 *    var bound = [-5, 5];
 *    var view = board.create('view3d',
 *        [[-6, -3], [8, 8],
 *        [bound, bound, bound]]);
 *
 *    var slid = board.create('slider', [[-4, 4], [0, 4], [0, 0, 5]])
 *
 *    var p1 = view.create('point3d', [1, 2, 2], { name: 'drag me', size: 5 });
 *
 *    // translate from p1 by some fixed or function amount
 *    var t1 = view.create('transform3d', [2, 3, 2], { type: 'translate' });
 *    var t2 = view.create('transform3d', [()=>slid.Value()+3,0,0], { type: 'translate' })
 *
 *    view.create('point3d', [p1, t1], { name: 'translate fixed', size: 5 });
 *    view.create('point3d', [p1, t2], { name: 'translate by slider', size: 5 });
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createTransform3D = function(board, parents, attributes) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Transformation(board, attributes.type, parents, true);
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement('transform3d', __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createTransform3D);
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Transformation;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/turtle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 * @fileoverview The JSXGraph object Turtle is defined. It acts like
 * "turtle graphics".
 * @author A.W.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
;
;
;
;
;
/**
 * Constructs a new Turtle object.
 * @class This is the Turtle class.
 * It is derived from {@link JXG.GeometryElement}.
 * It stores all properties required
 * to move a turtle.
 * @constructor
 * @param {JXG.Board} board The board the new turtle is drawn on.
 * @param {Array} parents Start position and start direction of the turtle. Possible values are
 * [x, y, angle]
 * [[x, y], angle]
 * [x, y]
 * [[x, y]]
 * @param {Object} attributes Attributes to change the visual properties of the turtle object
 * All angles are in degrees.
 *
 * @example
 *
 * //creates a figure 8 animation
 * var board = JXG.JSXGraph.initBoard('jxgbox',{boundingbox: [-250, 250, 250, -250]});
 * var t = board.create('turtle',[0, 0], {strokeOpacity:0.5});
 * t.setPenSize(3);
 * t.right(90);
 * var alpha = 0;
 *
 * var run = function() {
 *  t.forward(2);
 *  if (Math.floor(alpha / 360) % 2 === 0) {
 *   t.left(1);        // turn left by 1 degree
 *  } else {
 *   t.right(1);       // turn right by 1 degree
 *  }
 *  alpha += 1;
 *
 *  if (alpha < 1440) {  // stop after two rounds
 *   setTimeout(run, 20);
 *  }
 * }
 *
 *run();
 *
 * </pre><div class="jxgbox" id="JXG14167b1c-2ad3-11e5-8dd9-901b0e1b8723" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var brd = JXG.JSXGraph.initBoard('JXG14167b1c-2ad3-11e5-8dd9-901b0e1b8723',
 *             {boundingbox: [-250, 250, 250, -250], axis: true, showcopyright: false, shownavigation: false});
 *               var t = brd.create('turtle',[0, 0], {strokeOpacity:0.5});
 *               t.setPenSize(3);
 *               t.right(90);
 *               var alpha = 0;
 *
 *              var run = function() {
 *              t.forward(2);
 *             if (Math.floor(alpha / 360) % 2 === 0) {
 *                t.left(1);        // turn left by 1 degree
 *              } else {
 *                   t.right(1);       // turn right by 1 degree
 *             }
 *             alpha += 1;
 *
 *             if (alpha < 1440) {  // stop after two rounds
 *                 setTimeout(run, 20);
 *               }
 *             }
 *
 *          run();
 *
 *     })();
 *
 * </script><pre>
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Turtle = function(board, parents, attributes) {
    var x, y, dir;
    this.constructor(board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_TURTLE, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_OTHER);
    this.turtleIsHidden = false;
    this.board = board;
    this.visProp.curveType = "plot";
    // Save visProp in this._attributes.
    // this._attributes is overwritten by setPenSize, setPenColor...
    // Setting the color or size affects the turtle from the time of
    // calling the method,
    // whereas Turtle.setAttribute affects all turtle curves.
    this._attributes = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(this.visProp, board.options, "turtle");
    delete this._attributes.id;
    x = 0;
    y = 0;
    dir = 90;
    if (parents.length !== 0) {
        // [x,y,dir]
        if (parents.length === 3) {
            // Only numbers are accepted at the moment
            x = parents[0];
            y = parents[1];
            dir = parents[2];
        } else if (parents.length === 2) {
            // [[x,y],dir]
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(parents[0])) {
                x = parents[0][0];
                y = parents[0][1];
                dir = parents[1];
            // [x,y]
            } else {
                x = parents[0];
                y = parents[1];
            }
        // [[x,y]]
        } else {
            x = parents[0][0];
            y = parents[0][1];
        }
    }
    this.init(x, y, dir);
    this.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(this.methodMap, {
        forward: 'forward',
        fd: 'forward',
        back: 'back',
        bk: 'back',
        right: 'right',
        rt: 'right',
        left: 'left',
        lt: 'left',
        penUp: 'penUp',
        pu: 'penUp',
        up: 'penUp',
        penDown: 'penDown',
        pd: 'penDown',
        down: 'penDown',
        clearScreen: 'clearScreen',
        cs: 'clearScreen',
        clean: 'clean',
        setPos: 'setPos',
        home: 'home',
        hideTurtle: 'hideTurtle',
        ht: 'hideTurtle',
        hide: 'hideTurtle',
        showTurtle: 'showTurtle',
        st: 'showTurtle',
        show: 'showTurtle',
        penSize: 'setPenSize',
        setPenSize: 'setPenSize',
        penColor: 'setPenColor',
        setPenColor: 'setPenColor',
        highlightPenColor: 'setHighlightPenColor',
        setHighlightPenColor: 'setHighlightPenColor',
        getPenColor: 'getPenColor',
        Color: 'getPenColor',
        getHighlightPenColor: 'getHighlightPenColor',
        HighlightColor: 'getHighlightPenColor',
        getPenSize: 'getPenSize',
        Size: 'getPenSize',
        pushTurtle: 'pushTurtle',
        push: 'pushTurtle',
        popTurtle: 'popTurtle',
        pop: 'popTurtle',
        lookTo: 'lookTo',
        pos: 'pos',
        Pos: 'pos',
        moveTo: 'moveTo',
        X: 'X',
        Y: 'Y'
    });
    return this;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Turtle.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Turtle.prototype, /** @lends JXG.Turtle.prototype */ {
    /**
         * Initialize a new turtle or reinitialize a turtle after {@link JXG.Turtle#clearScreen}.
         * @private
         */ init: function(x, y, dir) {
        var hiddenPointAttr = {
            fixed: true,
            name: "",
            visible: false,
            withLabel: false
        };
        this.arrowLen = 20 / __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hypot(this.board.unitX, this.board.unitY);
        this.pos = [
            x,
            y
        ];
        this.isPenDown = true;
        this.dir = 90;
        this.stack = [];
        this.objects = [];
        this.curve = this.board.create("curve", [
            [
                this.pos[0]
            ],
            [
                this.pos[1]
            ]
        ], this._attributes);
        this.objects.push(this.curve);
        this.turtle = this.board.create("point", this.pos, hiddenPointAttr);
        this.objects.push(this.turtle);
        this.turtle2 = this.board.create("point", [
            this.pos[0],
            this.pos[1] + this.arrowLen
        ], hiddenPointAttr);
        this.objects.push(this.turtle2);
        this.visProp.arrow.lastArrow = true;
        this.visProp.arrow.straightFirst = false;
        this.visProp.arrow.straightLast = false;
        this.arrow = this.board.create("line", [
            this.turtle,
            this.turtle2
        ], this.visProp.arrow);
        this.objects.push(this.arrow);
        this.subs = {
            arrow: this.arrow
        };
        this.inherits.push(this.arrow);
        this.right(90 - dir);
        this.board.update();
    },
    /**
         * Move the turtle forward.
         * @param {Number} len of forward move in user coordinates
         * @returns {JXG.Turtle} pointer to the turtle object
         */ forward: function(len) {
        if (len === 0) {
            return this;
        }
        var t, dx = len * Math.cos(this.dir * Math.PI / 180), dy = len * Math.sin(this.dir * Math.PI / 180);
        if (!this.turtleIsHidden) {
            t = this.board.create("transform", [
                dx,
                dy
            ], {
                type: "translate"
            });
            t.applyOnce(this.turtle);
            t.applyOnce(this.turtle2);
        }
        if (this.isPenDown) {
            // IE workaround
            if (this.curve.dataX.length >= 8192) {
                this.curve = this.board.create("curve", [
                    [
                        this.pos[0]
                    ],
                    [
                        this.pos[1]
                    ]
                ], this._attributes);
                this.objects.push(this.curve);
            }
        }
        this.pos[0] += dx;
        this.pos[1] += dy;
        if (this.isPenDown) {
            this.curve.dataX.push(this.pos[0]);
            this.curve.dataY.push(this.pos[1]);
        }
        this.board.update();
        return this;
    },
    /**
         * Move the turtle backwards.
         * @param {Number} len of backwards move in user coordinates
         * @returns {JXG.Turtle} pointer to the turtle object
         */ back: function(len) {
        return this.forward(-len);
    },
    /**
         * Rotate the turtle direction to the right
         * @param {Number} angle of the rotation in degrees
         * @returns {JXG.Turtle} pointer to the turtle object
         */ right: function(angle) {
        this.dir -= angle;
        this.dir %= 360;
        if (!this.turtleIsHidden) {
            var t = this.board.create("transform", [
                -angle * Math.PI / 180,
                this.turtle
            ], {
                type: "rotate"
            });
            t.applyOnce(this.turtle2);
        }
        this.board.update();
        return this;
    },
    /**
         * Rotate the turtle direction to the right.
         * @param {Number} angle of the rotation in degrees
         * @returns {JXG.Turtle} pointer to the turtle object
         */ left: function(angle) {
        return this.right(-angle);
    },
    /**
         * Pen up, stops visible drawing
         * @returns {JXG.Turtle} pointer to the turtle object
         */ penUp: function() {
        this.isPenDown = false;
        return this;
    },
    /**
         * Pen down, continues visible drawing
         * @returns {JXG.Turtle} pointer to the turtle object
         */ penDown: function() {
        this.isPenDown = true;
        this.curve = this.board.create("curve", [
            [
                this.pos[0]
            ],
            [
                this.pos[1]
            ]
        ], this._attributes);
        this.objects.push(this.curve);
        return this;
    },
    /**
         * Removes the turtle curve from the board. The turtle stays in its position.
         * @returns {JXG.Turtle} pointer to the turtle object
         */ clean: function() {
        var i, el;
        for(i = 0; i < this.objects.length; i++){
            el = this.objects[i];
            if (el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_CURVE) {
                this.board.removeObject(el);
                this.objects.splice(i, 1);
            }
        }
        this.curve = this.board.create("curve", [
            [
                this.pos[0]
            ],
            [
                this.pos[1]
            ]
        ], this._attributes);
        this.objects.push(this.curve);
        this.board.update();
        return this;
    },
    /**
         *  Removes the turtle completely and resets it to its initial position and direction.
         * @returns {JXG.Turtle} pointer to the turtle object
         */ clearScreen: function() {
        var i, el, len = this.objects.length;
        for(i = 0; i < len; i++){
            el = this.objects[i];
            this.board.removeObject(el);
        }
        this.init(0, 0, 90);
        return this;
    },
    /**
         *  Moves the turtle without drawing to a new position
         * @param {Number} x new x- coordinate
         * @param {Number} y new y- coordinate
         * @returns {JXG.Turtle} pointer to the turtle object
         */ setPos: function(x, y) {
        var t;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(x)) {
            this.pos = x;
        } else {
            this.pos = [
                x,
                y
            ];
        }
        if (!this.turtleIsHidden) {
            this.turtle.setPositionDirectly(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                x,
                y
            ]);
            this.turtle2.setPositionDirectly(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                x,
                y + this.arrowLen
            ]);
            t = this.board.create("transform", [
                -(this.dir - 90) * Math.PI / 180,
                this.turtle
            ], {
                type: "rotate"
            });
            t.applyOnce(this.turtle2);
        }
        this.curve = this.board.create("curve", [
            [
                this.pos[0]
            ],
            [
                this.pos[1]
            ]
        ], this._attributes);
        this.objects.push(this.curve);
        this.board.update();
        return this;
    },
    /**
         *  Sets the pen size. Equivalent to setAttribute({strokeWidth:size})
         * but affects only the future turtle.
         * @param {Number} size
         * @returns {JXG.Turtle} pointer to the turtle object
         */ setPenSize: function(size) {
        //this.visProp.strokewidth = size;
        this.curve = this.board.create("curve", [
            [
                this.pos[0]
            ],
            [
                this.pos[1]
            ]
        ], this.copyAttr("strokeWidth", size));
        this.objects.push(this.curve);
        return this;
    },
    /**
         *  Sets the pen color. Equivalent to setAttribute({strokeColor:color})
         * but affects only the future turtle.
         * @param {String} color
         * @returns {JXG.Turtle} pointer to the turtle object
         */ setPenColor: function(color) {
        this.curve = this.board.create("curve", [
            [
                this.pos[0]
            ],
            [
                this.pos[1]
            ]
        ], this.copyAttr("strokeColor", color));
        this.objects.push(this.curve);
        return this;
    },
    /**
         * Get attribute of the last turtle curve object.
         *
         * @param {String} key
         * @returns attribute value
         * @private
         */ getPenAttribute: function(key) {
        var pos, le = this.objects.length;
        if (le === 4) {
            // No new turtle objects have been created
            pos = 0;
        } else {
            pos = le - 1;
        }
        return this.objects[pos].evalVisProp(key);
    },
    /**
         * Get most recently set turtle size (in pixel).
         * @returns Number Size of the last turtle segment in pixel.
         */ getPenSize: function() {
        return this.getPenAttribute('strokewidth');
    },
    /**
         * Get most recently set turtle color.
         * @returns String RGB color value of the last turtle segment.
         */ getPenColor: function() {
        return this.getPenAttribute('strokecolor');
    },
    /**
         * Get most recently set turtle color.
         * @returns String RGB highlight color value of the last turtle segment.
         */ getHighlightPenColor: function() {
        return this.getPenAttribute('highlightstrokecolor');
    },
    /**
         *  Sets the highlight pen color. Equivalent to setAttribute({highlightStrokeColor:color})
         * but affects only the future turtle.
         * @param {String} color
         * @returns {JXG.Turtle} pointer to the turtle object
         */ setHighlightPenColor: function(color) {
        //this.visProp.highlightstrokecolor = colStr;
        this.curve = this.board.create("curve", [
            [
                this.pos[0]
            ],
            [
                this.pos[1]
            ]
        ], this.copyAttr("highlightStrokeColor", color));
        this.objects.push(this.curve);
        return this;
    },
    /**
         * Sets properties of the turtle, see also {@link JXG.GeometryElement#setAttribute}.
         * Sets the property for all curves of the turtle in the past and in the future.
         * @param {Object} attributes key:value pairs
         * @returns {JXG.Turtle} pointer to the turtle object
         */ setAttribute: function(attributes) {
        var i, el, tmp, len = this.objects.length;
        for(i = 0; i < len; i++){
            el = this.objects[i];
            if (el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_CURVE) {
                el.setAttribute(attributes);
            }
        }
        // Set visProp of turtle
        tmp = this.visProp.id;
        this.visProp = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(this.curve.visProp);
        this.visProp.id = tmp;
        this._attributes = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(this.visProp);
        delete this._attributes.id;
        return this;
    },
    /**
         * Set a future attribute of the turtle.
         * @private
         * @param {String} key
         * @param {Number|String} val
         * @returns {Object} pointer to the attributes object
         */ copyAttr: function(key, val) {
        this._attributes[key.toLowerCase()] = val;
        return this._attributes;
    },
    /**
         * Sets the visibility of the turtle head to true,
         * @returns {JXG.Turtle} pointer to the turtle object
         */ showTurtle: function() {
        this.turtleIsHidden = false;
        this.arrow.setAttribute({
            visible: true
        });
        this.visProp.arrow.visible = false;
        this.setPos(this.pos[0], this.pos[1]);
        this.board.update();
        return this;
    },
    /**
         * Sets the visibility of the turtle head to false,
         * @returns {JXG.Turtle} pointer to the turtle object
         */ hideTurtle: function() {
        this.turtleIsHidden = true;
        this.arrow.setAttribute({
            visible: false
        });
        this.visProp.arrow.visible = false;
        this.board.update();
        return this;
    },
    /**
         * Moves the turtle to position [0,0].
         * @returns {JXG.Turtle} pointer to the turtle object
         */ home: function() {
        this.pos = [
            0,
            0
        ];
        this.setPos(this.pos[0], this.pos[1]);
        return this;
    },
    /**
         *  Pushes the position of the turtle on the stack.
         * @returns {JXG.Turtle} pointer to the turtle object
         */ pushTurtle: function() {
        this.stack.push([
            this.pos[0],
            this.pos[1],
            this.dir
        ]);
        return this;
    },
    /**
         *  Gets the last position of the turtle on the stack, sets the turtle to this position and removes this
         * position from the stack.
         * @returns {JXG.Turtle} pointer to the turtle object
         */ popTurtle: function() {
        var status = this.stack.pop();
        this.pos[0] = status[0];
        this.pos[1] = status[1];
        this.dir = status[2];
        this.setPos(this.pos[0], this.pos[1]);
        return this;
    },
    /**
         * Rotates the turtle into a new direction.
         * There are two possibilities:
         * @param {Number|Array} target If a number is given, it is interpreted as the new direction to look to; If an array
         * consisting of two Numbers is given targeted is used as a pair coordinates.
         * @returns {JXG.Turtle} pointer to the turtle object
         */ lookTo: function(target) {
        var ax, ay, bx, by, beta;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(target)) {
            ax = this.pos[0];
            ay = this.pos[1];
            bx = target[0];
            by = target[1];
            // Rotate by the slope of the line [this.pos, target]
            beta = Math.atan2(by - ay, bx - ax);
            this.right(this.dir - beta * 180 / Math.PI);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber(target)) {
            this.right(this.dir - target);
        }
        return this;
    },
    /**
         * Moves the turtle to a given coordinate pair.
         * The direction is not changed.
         * @param {Array} target Coordinates of the point where the turtle looks to.
         * @returns {JXG.Turtle} pointer to the turtle object
         */ moveTo: function(target) {
        var dx, dy, t;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(target)) {
            dx = target[0] - this.pos[0];
            dy = target[1] - this.pos[1];
            if (!this.turtleIsHidden) {
                t = this.board.create("transform", [
                    dx,
                    dy
                ], {
                    type: "translate"
                });
                t.applyOnce(this.turtle);
                t.applyOnce(this.turtle2);
            }
            if (this.isPenDown) {
                // IE workaround
                if (this.curve.dataX.length >= 8192) {
                    this.curve = this.board.create("curve", [
                        [
                            this.pos[0]
                        ],
                        [
                            this.pos[1]
                        ]
                    ], this._attributes);
                    this.objects.push(this.curve);
                }
            }
            this.pos[0] = target[0];
            this.pos[1] = target[1];
            if (this.isPenDown) {
                this.curve.dataX.push(this.pos[0]);
                this.curve.dataY.push(this.pos[1]);
            }
            this.board.update();
        }
        return this;
    },
    /**
         * Alias for {@link JXG.Turtle#forward}
         */ fd: function(len) {
        return this.forward(len);
    },
    /**
         * Alias for {@link JXG.Turtle#back}
         */ bk: function(len) {
        return this.back(len);
    },
    /**
         * Alias for {@link JXG.Turtle#left}
         */ lt: function(angle) {
        return this.left(angle);
    },
    /**
         * Alias for {@link JXG.Turtle#right}
         */ rt: function(angle) {
        return this.right(angle);
    },
    /**
         * Alias for {@link JXG.Turtle#penUp}
         */ pu: function() {
        return this.penUp();
    },
    /**
         * Alias for {@link JXG.Turtle#penDown}
         */ pd: function() {
        return this.penDown();
    },
    /**
         * Alias for {@link JXG.Turtle#hideTurtle}
         */ ht: function() {
        return this.hideTurtle();
    },
    /**
         * Alias for {@link JXG.Turtle#showTurtle}
         */ st: function() {
        return this.showTurtle();
    },
    /**
         * Alias for {@link JXG.Turtle#clearScreen}
         */ cs: function() {
        return this.clearScreen();
    },
    /**
         * Alias for {@link JXG.Turtle#pushTurtle}
         */ push: function() {
        return this.pushTurtle();
    },
    /**
         * Alias for {@link JXG.Turtle#popTurtle}
         */ pop: function() {
        return this.popTurtle();
    },
    /**
         * The "co"-coordinate of the turtle curve at position t is returned.
         *
         * @param {Number} t parameter
         * @param {String} co. Either 'X' or 'Y'.
         * @returns {Number} x-coordinate of the turtle position or x-coordinate of turtle at position t
         */ evalAt: function(t, co) {
        var i, j, el, tc, len = this.objects.length;
        for(i = 0, j = 0; i < len; i++){
            el = this.objects[i];
            if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE) {
                if (j <= t && t < j + el.numberPoints) {
                    tc = t - j;
                    return el[co](tc);
                }
                j += el.numberPoints;
            }
        }
        return this[co]();
    },
    /**
         * if t is not supplied the x-coordinate of the turtle is returned. Otherwise
         * the x-coordinate of the turtle curve at position t is returned.
         * @param {Number} t parameter
         * @returns {Number} x-coordinate of the turtle position or x-coordinate of turtle at position t
         */ X: function(t) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(t)) {
            return this.pos[0];
        }
        return this.evalAt(t, "X");
    },
    /**
         * if t is not supplied the y-coordinate of the turtle is returned. Otherwise
         * the y-coordinate of the turtle curve at position t is returned.
         * @param {Number} t parameter
         * @returns {Number} x-coordinate of the turtle position or x-coordinate of turtle at position t
         */ Y: function(t) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(t)) {
            return this.pos[1];
        }
        return this.evalAt(t, "Y");
    },
    /**
         * @returns {Number} z-coordinate of the turtle position
         */ Z: function(t) {
        return 1.0;
    },
    /**
         * Gives the lower bound of the parameter if the turtle is treated as parametric curve.
         */ minX: function() {
        return 0;
    },
    /**
         * Gives the upper bound of the parameter if the turtle is treated as parametric curve.
         * May be overwritten in @see generateTerm.
         */ maxX: function() {
        var i, el, len = this.objects.length, np = 0;
        for(i = 0; i < len; i++){
            el = this.objects[i];
            if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE) {
                np += this.objects[i].numberPoints;
            }
        }
        return np;
    },
    /**
         * Checks whether (x,y) is near the curve.
         * @param {Number} x Coordinate in x direction, screen coordinates.
         * @param {Number} y Coordinate in y direction, screen coordinates.
         * @returns {Boolean} True if (x,y) is near the curve, False otherwise.
         */ hasPoint: function(x, y) {
        var i, el;
        // run through all curves of this turtle
        for(i = 0; i < this.objects.length; i++){
            el = this.objects[i];
            if (el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_CURVE) {
                if (el.hasPoint(x, y)) {
                    // So what??? All other curves have to be notified now (for highlighting)
                    return true;
                // This has to be done, yet.
                }
            }
        }
        return false;
    }
});
/**
 * @class A turtle is a graphic paradigm similar to the programming languages Logo or PostScript.
 * @pseudo
 * @description  Creates a new turtle
 * @name Turtle
 * @augments JXG.Turtle
 * @constructor
 * @type JXG.Turtle
 *
 * @param {JXG.Board} board The board the turtle is put on.
 * @param {Array} parents
 * @param {Object} attributes Object containing properties for the element such as stroke-color and visibility. See {@link JXG.GeometryElement#setAttribute}
 * @returns {JXG.Turtle} Reference to the created turtle object.
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createTurtle = function(board, parents, attributes) {
    var attr;
    parents = parents || [];
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "turtle");
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Turtle(board, parents, attr);
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("turtle", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createTurtle);
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Turtle;
 // export default {
 //     Turtle: JXG.Turtle,
 //     createTurtle: JXG.createTurtle
 // };
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/ticks.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 * @fileoverview In this file the geometry object Ticks is defined. Ticks provides
 * methods for creation and management of ticks on an axis.
 * @author graphjs
 * @version 0.1
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/numerics.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coords.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
/**
 * Creates ticks for an axis.
 * @class Ticks provides methods for creation and management
 * of ticks on an axis.
 * @param {JXG.Line} line Reference to the axis the ticks are drawn on.
 * @param {Number|Array} ticks Number defining the distance between two major ticks or an array defining static ticks.
 * @param {Object} attributes Properties
 * @see JXG.Line#addTicks
 * @constructor
 * @augments JXG.GeometryElement
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Ticks = function(line, ticks, attributes) {
    this.constructor(line.board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_TICKS, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_OTHER);
    /**
     * The line the ticks belong to.
     * @type JXG.Line
     * @private
     */ this.line = line;
    /**
     * The board the ticks line is drawn on.
     * @type JXG.Board
     * @private
     */ this.board = this.line.board;
    // /**
    //  * A function calculating ticks delta depending on the ticks number.
    //  * @type Function
    //  */
    // // this.ticksFunction = null;
    /**
     * Array of fixed ticks.
     * @type Array
     * @private
     */ this.fixedTicks = null;
    /**
     * Flag if the ticks are equidistant. If true, their distance is defined by ticksFunction.
     * @type Boolean
     * @private
     */ this.equidistant = false;
    /**
     * A list of labels which have to be displayed in updateRenderer.
     * @type Array
     * @private
     */ this.labelsData = [];
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(ticks)) {
        this.ticksFunction = ticks;
        throw new Error("Function arguments are no longer supported.");
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(ticks)) {
        this.fixedTicks = ticks;
    } else {
        // Obsolete:
        // if (Math.abs(ticks) < Mat.eps || ticks < 0) {
        //     ticks = attributes.defaultdistance;
        // }
        this.equidistant = true;
    }
    // /**
    //  * Least distance between two ticks, measured in pixels.
    //  * @type int
    //  */
    // // this.minTicksDistance = attributes.minticksdistance;
    /**
     * Stores the ticks coordinates
     * @type Array
     * @private
     */ this.ticks = [];
    // /**
    //  * Distance between two major ticks in user coordinates
    //  * @type Number
    //  */
    // this.ticksDelta = 1;
    /**
     * Array where the labels are saved. There is an array element for every tick,
     * even for minor ticks which don't have labels. In this case the array element
     * contains just <tt>null</tt>.
     * @type Array
     * @private
     */ this.labels = [];
    /**
     * Used to ensure the uniqueness of label ids this counter is used.
     * @type number
     * @private
     */ this.labelCounter = 0;
    this.id = this.line.addTicks(this);
    this.elType = "ticks";
    this.inherits.push(this.labels);
    this.board.setId(this, "Ti");
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Ticks.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Ticks.prototype, /** @lends JXG.Ticks.prototype */ {
    // /**
    //  * Ticks function:
    //  * determines the distance (in user units) of two major ticks.
    //  * See above in constructor and in @see JXG.GeometryElement#setAttribute
    //  *
    //  * @private
    //  * @param {Number} ticks Distance between two major ticks
    //  * @returns {Function} returns method ticksFunction
    //  */
    // // makeTicksFunction: function (ticks) {
    //     // return function () {
    //         ticksFunction: function () {
    //                     var delta, b, dist,
    //                     number_major_tick_intervals = 5;
    //                 if (this.evalVisProp('insertticks')) {
    //                     b = this.getLowerAndUpperBounds(this.getZeroCoordinates(), 'ticksdistance');
    //                     dist = b.upper - b.lower;
    //                     // delta: Proposed distance in user units between two major ticks
    //                     delta = Math.pow(10, Math.floor(Math.log(dist / number_major_tick_intervals) / Math.LN10));
    // console.log("delta", delta,  b.upper, b.lower, dist, dist / number_major_tick_intervals * 1.1)
    //                     if (5 * delta < dist / number_major_tick_intervals * 1.1) {
    //                         return 5 * delta;
    //                     }
    //                     if (2 * delta < dist / number_major_tick_intervals * 1.1) {
    //                         return 2 * delta;
    //                     }
    //                     // < v1.6.0:
    //                     // delta = Math.pow(10, Math.floor(Math.log(0.6 * dist) / Math.LN10));
    //                     if (false && dist <= 6 * delta) {
    //                         delta *= 0.5;
    //                     }
    //                     return delta;
    //                 }
    //                 // In case of insertTicks==false
    //                 return this.evalVisProp('ticksdistance');
    //                 // return ticks;
    //             // };
    //         },
    /**
         * Checks whether (x,y) is near the line.
         * Only available for line elements,  not for ticks on curves.
         * @param {Number} x Coordinate in x direction, screen coordinates.
         * @param {Number} y Coordinate in y direction, screen coordinates.
         * @returns {Boolean} True if (x,y) is near the line, False otherwise.
         */ hasPoint: function(x, y) {
        var i, t, r, type, len = this.ticks && this.ticks.length || 0;
        if (!this.line.evalVisProp('scalable') || this.line.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE) {
            return false;
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isObject(this.evalVisProp('precision'))) {
            type = this.board._inputDevice;
            r = this.evalVisProp('precision.' + type);
        } else {
            // 'inherit'
            r = this.board.options.precision.hasPoint;
        }
        r += this.evalVisProp('strokewidth') * 0.5;
        // Ignore non-axes and axes that are not horizontal or vertical
        if (this.line.stdform[1] !== 0 && this.line.stdform[2] !== 0 && this.line.type !== __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_AXIS) {
            return false;
        }
        for(i = 0; i < len; i++){
            t = this.ticks[i];
            // Skip minor ticks
            if (t[2]) {
                // Ignore ticks at zero
                if (!(this.line.stdform[1] === 0 && Math.abs(t[0][0] - this.line.point1.coords.scrCoords[1]) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps || this.line.stdform[2] === 0 && Math.abs(t[1][0] - this.line.point1.coords.scrCoords[2]) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps)) {
                    // tick length is not zero, ie. at least one pixel
                    if (Math.abs(t[0][0] - t[0][1]) >= 1 || Math.abs(t[1][0] - t[1][1]) >= 1) {
                        // Allow dragging near axes only.
                        if (this.line.stdform[1] === 0) {
                            if (Math.abs(y - this.line.point1.coords.scrCoords[2]) < 2 * r && t[0][0] - r < x && x < t[0][1] + r) {
                                return true;
                            }
                        } else if (this.line.stdform[2] === 0) {
                            if (Math.abs(x - this.line.point1.coords.scrCoords[1]) < 2 * r && t[1][0] - r < y && y < t[1][1] + r) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    },
    /**
         * Sets x and y coordinate of the tick.
         * @param {number} method The type of coordinates used here. Possible values are {@link JXG.COORDS_BY_USER} and {@link JXG.COORDS_BY_SCREEN}.
         * @param {Array} coords coordinates in screen/user units
         * @param {Array} oldcoords previous coordinates in screen/user units
         * @returns {JXG.Ticks} this element
         */ setPositionDirectly: function(method, coords, oldcoords) {
        var dx, dy, c = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](method, coords, this.board), oldc = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](method, oldcoords, this.board), bb = this.board.getBoundingBox();
        if (this.line.type !== __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_AXIS || !this.line.evalVisProp('scalable')) {
            return this;
        }
        if (Math.abs(this.line.stdform[1]) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps && Math.abs(c.usrCoords[1] * oldc.usrCoords[1]) > __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps) {
            // Horizontal line
            dx = oldc.usrCoords[1] / c.usrCoords[1];
            bb[0] *= dx;
            bb[2] *= dx;
            this.board.setBoundingBox(bb, this.board.keepaspectratio, "update");
        } else if (Math.abs(this.line.stdform[2]) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps && Math.abs(c.usrCoords[2] * oldc.usrCoords[2]) > __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps) {
            // Vertical line
            dy = oldc.usrCoords[2] / c.usrCoords[2];
            bb[3] *= dy;
            bb[1] *= dy;
            this.board.setBoundingBox(bb, this.board.keepaspectratio, "update");
        }
        return this;
    },
    /**
         * (Re-)calculates the ticks coordinates.
         * @private
         */ calculateTicksCoordinates: function() {
        var coordsZero, b, r_max, bb;
        if (this.line.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
            // Calculate Ticks width and height in Screen and User Coordinates
            this.setTicksSizeVariables();
            // If the parent line is not finite, we can stop here.
            if (Math.abs(this.dx) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps && Math.abs(this.dy) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps) {
                return;
            }
        }
        // Get Zero (coords element for lines, number for curves)
        coordsZero = this.getZeroCoordinates();
        // Calculate lower bound and upper bound limits based on distance
        // between p1 and center and p2 and center
        if (this.line.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
            b = this.getLowerAndUpperBounds(coordsZero, 'ticksdistance');
        } else {
            b = {
                lower: this.line.minX(),
                upper: this.line.maxX(),
                a1: 0,
                a2: 0,
                m1: 0,
                m2: 0
            };
        }
        if (this.evalVisProp('type') === "polar") {
            bb = this.board.getBoundingBox();
            r_max = Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hypot(bb[0], bb[1]), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hypot(bb[2], bb[3]));
            b.upper = r_max;
        }
        // Clean up
        this.ticks = [];
        this.labelsData = [];
        // Create Ticks Coordinates and Labels
        if (this.equidistant) {
            this.generateEquidistantTicks(coordsZero, b);
        } else {
            this.generateFixedTicks(coordsZero, b);
        }
        return this;
    },
    /**
         * Sets the variables used to set the height and slope of each tick.
         *
         * @private
         */ setTicksSizeVariables: function(pos) {
        var d, mi, ma, len, distMaj = this.evalVisProp('majorheight') * 0.5, distMin = this.evalVisProp('minorheight') * 0.5;
        // For curves:
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(pos)) {
            mi = this.line.minX();
            ma = this.line.maxX();
            len = this.line.points.length;
            if (len < 2) {
                this.dxMaj = 0;
                this.dyMaj = 0;
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].relDif(pos, mi) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps) {
                this.dxMaj = this.line.points[0].usrCoords[2] - this.line.points[1].usrCoords[2];
                this.dyMaj = this.line.points[1].usrCoords[1] - this.line.points[0].usrCoords[1];
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].relDif(pos, ma) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps) {
                this.dxMaj = this.line.points[len - 2].usrCoords[2] - this.line.points[len - 1].usrCoords[2];
                this.dyMaj = this.line.points[len - 1].usrCoords[1] - this.line.points[len - 2].usrCoords[1];
            } else {
                this.dxMaj = -__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].D(this.line.Y)(pos);
                this.dyMaj = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].D(this.line.X)(pos);
            }
        } else {
            // ticks width and height in screen units
            this.dxMaj = this.line.stdform[1];
            this.dyMaj = this.line.stdform[2];
        }
        this.dxMin = this.dxMaj;
        this.dyMin = this.dyMaj;
        // ticks width and height in user units
        this.dx = this.dxMaj;
        this.dy = this.dyMaj;
        // After this, the length of the vector (dxMaj, dyMaj) in screen coordinates is equal to distMaj pixel.
        d = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hypot(this.dxMaj * this.board.unitX, this.dyMaj * this.board.unitY);
        this.dxMaj *= distMaj / d * this.board.unitX;
        this.dyMaj *= distMaj / d * this.board.unitY;
        this.dxMin *= distMin / d * this.board.unitX;
        this.dyMin *= distMin / d * this.board.unitY;
        // Grid-like ticks?
        this.minStyle = this.evalVisProp('minorheight') < 0 ? "infinite" : "finite";
        this.majStyle = this.evalVisProp('majorheight') < 0 ? "infinite" : "finite";
    },
    /**
         * Returns the coordinates of the point zero of the line.
         *
         * If the line is an {@link Axis}, the coordinates of the projection of the board's zero point is returned
         *
         * Otherwise, the coordinates of the point that acts as zero are
         * established depending on the value of {@link JXG.Ticks#anchor}
         *
         * @returns {JXG.Coords} Coords object for the zero point on the line
         * @private
         */ getZeroCoordinates: function() {
        var c1x, c1y, c1z, c2x, c2y, c2z, t, mi, ma, ev_a = this.evalVisProp('anchor');
        if (this.line.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
            if (this.line.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_AXIS) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].projectPointToLine({
                    coords: {
                        usrCoords: [
                            1,
                            0,
                            0
                        ]
                    }
                }, this.line, this.board);
            }
            c1z = this.line.point1.coords.usrCoords[0];
            c1x = this.line.point1.coords.usrCoords[1];
            c1y = this.line.point1.coords.usrCoords[2];
            c2z = this.line.point2.coords.usrCoords[0];
            c2x = this.line.point2.coords.usrCoords[1];
            c2y = this.line.point2.coords.usrCoords[2];
            if (ev_a === "right") {
                return this.line.point2.coords;
            }
            if (ev_a === "middle") {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                    (c1z + c2z) * 0.5,
                    (c1x + c2x) * 0.5,
                    (c1y + c2y) * 0.5
                ], this.board);
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber(ev_a)) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                    c1z + (c2z - c1z) * ev_a,
                    c1x + (c2x - c1x) * ev_a,
                    c1y + (c2y - c1y) * ev_a
                ], this.board);
            }
            return this.line.point1.coords;
        }
        mi = this.line.minX();
        ma = this.line.maxX();
        if (ev_a === "right") {
            t = ma;
        } else if (ev_a === "middle") {
            t = (mi + ma) * 0.5;
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber(ev_a)) {
            t = mi * (1 - ev_a) + ma * ev_a;
        // t = ev_a;
        } else {
            t = mi;
        }
        return t;
    },
    /**
         * Calculate the lower and upper bounds for tick rendering.
         * If {@link JXG.Ticks#includeBoundaries} is false, the boundaries will exclude point1 and point2.
         *
         * @param  {JXG.Coords} coordsZero
         * @returns {String} [type] If type=='ticksdistance', the bounds are
         *                         the intersection of the line with the bounding box of the board, respecting
         *                         the value of the line attribute 'margin' and the width of arrow heads.
         *                         Otherwise, it is the projection of the corners of the bounding box
         *                         to the line - without the attribute 'margin' and width of arrow heads.
         *  <br>
         *                         The first case is needed to determine which ticks are displayed, i.e. where to stop.
         *                         The second case is to determine the distance between ticks in case of 'insertTicks:true'.
         * @returns {Object}     {lower: Number, upper: Number } containing the lower and upper bounds in user units.
         *
         * @private
         */ getLowerAndUpperBounds: function(coordsZero, type) {
        var lowerBound, upperBound, fA, lA, point1, point2, isPoint1inBoard, isPoint2inBoard, // We use the distance from zero to P1 and P2 to establish lower and higher points
        dZeroPoint1, dZeroPoint2, arrowData, // angle,
        a1, a2, m1, m2, eps = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps * 10, ev_sf = this.line.evalVisProp('straightfirst'), ev_sl = this.line.evalVisProp('straightlast'), ev_i = this.evalVisProp('includeboundaries');
        // The line's defining points that will be adjusted to be within the board limits
        if (this.line.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE) {
            return {
                lower: this.line.minX(),
                upper: this.line.maxX()
            };
        }
        point1 = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, this.line.point1.coords.usrCoords, this.board);
        point2 = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, this.line.point2.coords.usrCoords, this.board);
        // Are the original defining points within the board?
        isPoint1inBoard = Math.abs(point1.usrCoords[0]) >= __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps && point1.scrCoords[1] >= 0.0 && point1.scrCoords[1] <= this.board.canvasWidth && point1.scrCoords[2] >= 0.0 && point1.scrCoords[2] <= this.board.canvasHeight;
        isPoint2inBoard = Math.abs(point2.usrCoords[0]) >= __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps && point2.scrCoords[1] >= 0.0 && point2.scrCoords[1] <= this.board.canvasWidth && point2.scrCoords[2] >= 0.0 && point2.scrCoords[2] <= this.board.canvasHeight;
        // Adjust line limit points to be within the board
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(type) && type === 'ticksdistance') {
            // The good old calcStraight is needed for determining the distance between major ticks.
            // Here, only the visual area is of importance
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].calcStraight(this.line, point1, point2, 0);
            m1 = this.getDistanceFromZero(coordsZero, point1);
            m2 = this.getDistanceFromZero(coordsZero, point2);
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].calcStraight(this.line, point1, point2, this.line.evalVisProp('margin'));
            m1 = this.getDistanceFromZero(coordsZero, point1) - m1;
            m2 = this.getDistanceFromZero(coordsZero, point2).m2;
        } else {
            // This function projects the corners of the board to the line.
            // This is important for diagonal lines with infinite tick lines.
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].calcLineDelimitingPoints(this.line, point1, point2);
        }
        // Shorten ticks bounds such that ticks are not through arrow heads
        fA = this.line.evalVisProp('firstarrow');
        lA = this.line.evalVisProp('lastarrow');
        a1 = this.getDistanceFromZero(coordsZero, point1);
        a2 = this.getDistanceFromZero(coordsZero, point2);
        if (fA || lA) {
            // Do not display ticks at through arrow heads.
            // In arrowData we ignore the highlighting status.
            // Ticks would appear to be too nervous.
            arrowData = this.board.renderer.getArrowHeadData(this.line, this.line.evalVisProp('strokewidth'), '');
            this.board.renderer.getPositionArrowHead(this.line, point1, point2, arrowData);
        }
        // Calculate (signed) distance from Zero to P1 and to P2
        dZeroPoint1 = this.getDistanceFromZero(coordsZero, point1);
        dZeroPoint2 = this.getDistanceFromZero(coordsZero, point2);
        // Recompute lengths of arrow heads
        a1 = dZeroPoint1 - a1;
        a2 = dZeroPoint1 - a2;
        // We have to establish if the direction is P1->P2 or P2->P1 to set the lower and upper
        // bounds appropriately. As the distances contain also a sign to indicate direction,
        // we can compare dZeroPoint1 and dZeroPoint2 to establish the line direction
        if (dZeroPoint1 < dZeroPoint2) {
            // Line goes P1->P2
            lowerBound = dZeroPoint1;
            upperBound = dZeroPoint2;
            if (!ev_sf && isPoint1inBoard && !ev_i) {
                lowerBound += eps;
            }
            if (!ev_sl && isPoint2inBoard && !ev_i) {
                upperBound -= eps;
            }
        } else if (dZeroPoint2 < dZeroPoint1) {
            // Line goes P2->P1
            // Does this happen at all?
            lowerBound = dZeroPoint2;
            upperBound = dZeroPoint1;
            if (!ev_sl && isPoint2inBoard && !ev_i) {
                lowerBound += eps;
            }
            if (!ev_sf && isPoint1inBoard && !ev_i) {
                upperBound -= eps;
            }
        } else {
            // P1 = P2 = Zero, we can't do a thing
            lowerBound = 0;
            upperBound = 0;
        }
        return {
            lower: lowerBound,
            upper: upperBound,
            a1: a1,
            a2: a2,
            m1: m1,
            m2: m2
        };
    },
    /**
         * Calculates the signed distance in user coordinates from zero to a given point.
         * Sign is positive, if the direction from zero to point is the same as the direction
         * zero to point2 of the line.
         *
         * @param  {JXG.Coords} zero  coordinates of the point considered zero
         * @param  {JXG.Coords} point coordinates of the point to find out the distance
         * @returns {Number}           distance between zero and point, including its sign
         * @private
         */ getDistanceFromZero: function(zero, point) {
        var p1, p2, dirLine, dirPoint, distance;
        p1 = this.line.point1.coords;
        p2 = this.line.point2.coords;
        distance = zero.distance(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, point);
        // Establish sign
        dirLine = [
            p2.usrCoords[0] - p1.usrCoords[0],
            p2.usrCoords[1] - p1.usrCoords[1],
            p2.usrCoords[2] - p1.usrCoords[2]
        ];
        dirPoint = [
            point.usrCoords[0] - zero.usrCoords[0],
            point.usrCoords[1] - zero.usrCoords[1],
            point.usrCoords[2] - zero.usrCoords[2]
        ];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].innerProduct(dirLine, dirPoint, 3) < 0) {
            distance *= -1;
        }
        return distance;
    },
    /**
         * Creates ticks coordinates and labels automatically.
         * The frequency of ticks is affected by the values of {@link JXG.Ticks#insertTicks}, {@link JXG.Ticks#minTicksDistance},
         * and {@link JXG.Ticks#ticksDistance}
         *
         * @param  {JXG.Coords} coordsZero coordinates of the point considered zero
         * @param  {Object}     bounds     contains the lower and upper bounds for ticks placement
         * @private
         */ generateEquidistantTicks: function(coordsZero, bounds) {
        var tickPosition, eps = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps, deltas, ticksDelta, // ev_mia = this.evalVisProp('minorticksinarrow'),
        // ev_maa = this.evalVisProp('minorticksinarrow'),
        // ev_mla = this.evalVisProp('minorticksinarrow'),
        ev_mt = this.evalVisProp('minorticks');
        // Determine a proposed distance between major ticks in user units
        ticksDelta = this.getDistanceMajorTicks();
        // Obsolete, since this.equidistant is always true at this point
        // ticksDelta = this.equidistant ? this.ticksFunction(1) : this.ticksDelta;
        if (this.line.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
            // Calculate x and y distances between two points on the line which are 1 unit apart
            // In essence, these are cosine and sine.
            deltas = this.getXandYdeltas();
        }
        ticksDelta *= this.evalVisProp('scale');
        // In case of insertTicks, adjust ticks distance to satisfy the minTicksDistance restriction.
        // if (ev_it) { // } && this.minTicksDistance > Mat.eps) {
        //     ticksDelta = this.adjustTickDistance(ticksDelta, coordsZero, deltas);
        // }
        // Convert ticksdelta to the distance between two minor ticks
        ticksDelta /= ev_mt + 1;
        this.ticksDelta = ticksDelta;
        if (ticksDelta < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps) {
            return;
        }
        if (Math.abs(bounds.upper - bounds.lower) > ticksDelta * 2048) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].warn("JSXGraph ticks: too many ticks (>2048). Please increase ticksDistance.");
            return;
        }
        // Position ticks from zero to the positive side while not reaching the upper boundary
        tickPosition = 0;
        if (!this.evalVisProp('drawzero')) {
            tickPosition = ticksDelta;
        }
        if (tickPosition < bounds.lower) {
            // Jump from 0 to bounds.lower
            tickPosition = Math.floor((bounds.lower - eps) / ticksDelta) * ticksDelta;
        }
        while(tickPosition <= bounds.upper + eps){
            // Only draw ticks when we are within bounds, ignore case where tickPosition < lower < upper
            if (tickPosition >= bounds.lower - eps) {
                this.processTickPosition(coordsZero, tickPosition, ticksDelta, deltas);
            }
            tickPosition += ticksDelta;
            // Emergency out (probably obsolete)
            if (bounds.upper - tickPosition > ticksDelta * 10000) {
                break;
            }
        }
        // Position ticks from zero (not inclusive) to the negative side while not reaching the lower boundary
        tickPosition = -ticksDelta;
        if (tickPosition > bounds.upper) {
            // Jump from -ticksDelta to bounds.upper
            tickPosition = Math.ceil((bounds.upper + eps) / -ticksDelta) * -ticksDelta;
        }
        while(tickPosition >= bounds.lower - eps){
            // Only draw ticks when we are within bounds, ignore case where lower < upper < tickPosition
            if (tickPosition <= bounds.upper + eps) {
                this.processTickPosition(coordsZero, tickPosition, ticksDelta, deltas);
            }
            tickPosition -= ticksDelta;
            // Emergency out (probably obsolete)
            if (tickPosition - bounds.lower > ticksDelta * 10000) {
                break;
            }
        }
    },
    /**
         * Calculates the distance between two major ticks in user units.
         * <ul>
         * <li> If the attribute "insertTicks" is false, the value of the attribute
         * "ticksDistance" is returned. The attribute "minTicksDistance" is ignored in this case.
         * <li> If the attribute "insertTicks" is true, the attribute "ticksDistance" is ignored.
         * The distance between two major ticks is computed
         * as <i>a 10<sup>i</sup></i>, where <i>a</i> is one of <i>{1, 2, 5}</i> and
         * the number <i>a 10<sup>i</sup></i> is maximized such that there are approximately
         * 6 major ticks and there are at least "minTicksDistance" pixel between minor ticks.
         * The latter restriction has priority over the number of major ticks.
         * </ul>
         * @returns Number
         * @private
         */ getDistanceMajorTicks: function() {
        var delta, delta2, b, d, dist, scale, numberMajorTicks = 5, maxDist, minDist, ev_mt;
        if (this.evalVisProp('insertticks')) {
            // Case of insertTicks==true:
            // Here, we ignore the attribute 'margin'
            b = this.getLowerAndUpperBounds(this.getZeroCoordinates(), '');
            dist = b.upper - b.lower;
            scale = this.evalVisProp('scale');
            maxDist = dist / (numberMajorTicks + 1) / scale;
            minDist = this.evalVisProp('minticksdistance') / scale;
            ev_mt = this.evalVisProp('minorticks');
            d = this.getXandYdeltas();
            d.x *= this.board.unitX;
            d.y *= this.board.unitY;
            minDist /= __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hypot(d.x, d.y);
            minDist *= ev_mt + 1;
            // Determine minimal delta to fulfill the minTicksDistance constraint
            delta = Math.pow(10, Math.floor(Math.log(minDist) / Math.LN10));
            if (2 * delta >= minDist) {
                delta *= 2;
            } else if (5 * delta >= minDist) {
                delta *= 5;
            }
            // Determine maximal delta to fulfill the constraint to have approx. "numberMajorTicks" majorTicks
            delta2 = Math.pow(10, Math.floor(Math.log(maxDist) / Math.LN10));
            if (5 * delta2 < maxDist) {
                delta2 *= 5;
            } else if (2 * delta2 < maxDist) {
                delta2 *= 2;
            }
            // Take the larger value of the two delta's, that is
            // minTicksDistance has priority over numberMajorTicks
            delta = Math.max(delta, delta2);
            // < v1.6.0:
            // delta = Math.pow(10, Math.floor(Math.log(0.6 * dist) / Math.LN10));
            // if (false && dist <= 6 * delta) {
            //     delta *= 0.5;
            // }
            return delta;
        }
        // Case of insertTicks==false
        return this.evalVisProp('ticksdistance');
    },
    //         /**
    //          * Auxiliary method used by {@link JXG.Ticks#generateEquidistantTicks} to adjust the
    //          * distance between two ticks depending on {@link JXG.Ticks#minTicksDistance} value
    //          *
    //          * @param  {Number}     ticksDelta  distance between two major ticks in user coordinates
    //          * @param  {JXG.Coords} coordsZero  coordinates of the point considered zero
    //          * @param  {Object}     deltas      x and y distance in pixel between two user units
    //          * @param  {Object}     bounds      upper and lower bound of the tick positions in user units.
    //          * @private
    //          */
    //         adjustTickDistance: function (ticksDelta, coordsZero, deltas) {
    //             var nx,
    //                 ny,
    //                 // bounds,
    //                 distScr,
    //                 sgn = 1,
    //                 ev_mintd = this.evalVisProp('minticksdistance'),
    //                 ev_minti = this.evalVisProp('minorticks');
    //             if (this.line.elementClass === Const.OBJECT_CLASS_CURVE) {
    //                 return ticksDelta;
    //             }
    //             // Seems to be ignored:
    //             // bounds = this.getLowerAndUpperBounds(coordsZero, "ticksdistance");
    //             // distScr is the distance between two major Ticks in pixel
    //             nx = coordsZero.usrCoords[1] + deltas.x * ticksDelta;
    //             ny = coordsZero.usrCoords[2] + deltas.y * ticksDelta;
    //             distScr = coordsZero.distance(
    //                 Const.COORDS_BY_SCREEN,
    //                 new Coords(Const.COORDS_BY_USER, [nx, ny], this.board)
    //             );
    // // console.log(deltas, distScr, this.board.unitX, this.board.unitY, "ticksDelta:", ticksDelta);
    //             if (ticksDelta === 0.0) {
    //                 return 0.0;
    //             }
    // // console.log(":", distScr, ev_minti + 1, distScr / (ev_minti + 1), ev_mintd)
    //             while (false && distScr / (ev_minti + 1) < ev_mintd) {
    //                 if (sgn === 1) {
    //                     ticksDelta *= 2;
    //                 } else {
    //                     ticksDelta *= 5;
    //                 }
    //                 sgn *= -1;
    //                 nx = coordsZero.usrCoords[1] + deltas.x * ticksDelta;
    //                 ny = coordsZero.usrCoords[2] + deltas.y * ticksDelta;
    //                 distScr = coordsZero.distance(
    //                     Const.COORDS_BY_SCREEN,
    //                     new Coords(Const.COORDS_BY_USER, [nx, ny], this.board)
    //                 );
    //             }
    //             return ticksDelta;
    //         },
    /**
         * Auxiliary method used by {@link JXG.Ticks#generateEquidistantTicks} to create a tick
         * in the line at the given tickPosition.
         *
         * @param  {JXG.Coords} coordsZero    coordinates of the point considered zero
         * @param  {Number}     tickPosition  current tick position relative to zero
         * @param  {Number}     ticksDelta    distance between two major ticks in user coordinates
         * @param  {Object}     deltas      x and y distance between two major ticks
         * @private
         */ processTickPosition: function(coordsZero, tickPosition, ticksDelta, deltas) {
        var x, y, tickCoords, ti, ev_mt, isLabelPosition, ticksPerLabel = this.evalVisProp('ticksperlabel'), labelVal = null;
        // Calculates tick coordinates
        if (this.line.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
            x = coordsZero.usrCoords[1] + tickPosition * deltas.x;
            y = coordsZero.usrCoords[2] + tickPosition * deltas.y;
        } else {
            x = this.line.X(coordsZero + tickPosition);
            y = this.line.Y(coordsZero + tickPosition);
        }
        tickCoords = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
            x,
            y
        ], this.board);
        if (this.line.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE) {
            labelVal = coordsZero + tickPosition;
            this.setTicksSizeVariables(labelVal);
        }
        ev_mt = this.evalVisProp('minorticks');
        // Test if tick is a major tick.
        // This is the case if tickPosition/ticksDelta is
        // a multiple of the number of minorticks+1
        tickCoords.major = Math.round(tickPosition / ticksDelta) % (ev_mt + 1) === 0;
        if (!ticksPerLabel) {
            // In case of null, 0 or false, majorTicks are labelled
            ticksPerLabel = ev_mt + 1;
        }
        isLabelPosition = Math.round(tickPosition / ticksDelta) % ticksPerLabel === 0;
        // Compute the start position and the end position of a tick.
        // If both positions are out of the canvas, ti is empty.
        ti = this.createTickPath(tickCoords, tickCoords.major);
        if (ti.length === 3) {
            this.ticks.push(ti);
            if (isLabelPosition && this.evalVisProp('drawlabels')) {
                // Create a label at this position
                this.labelsData.push(this.generateLabelData(this.generateLabelText(tickCoords, coordsZero, labelVal), tickCoords, this.ticks.length));
            } else {
                // minor ticks have no labels
                this.labelsData.push(null);
            }
        }
    },
    /**
         * Creates ticks coordinates and labels based on {@link JXG.Ticks#fixedTicks} and {@link JXG.Ticks#labels}.
         *
         * @param  {JXG.Coords} coordsZero Coordinates of the point considered zero
         * @param  {Object}     bounds     contains the lower and upper bounds for ticks placement
         * @private
         */ generateFixedTicks: function(coordsZero, bounds) {
        var tickCoords, labelText, i, ti, x, y, eps2 = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps, fixedTick, hasLabelOverrides = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(this.visProp.labels), deltas, ev_dl = this.evalVisProp('drawlabels');
        if (this.line.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
            // Calculate x and y distances between two points on the line which are 1 unit apart
            // In essence, these are cosine and sine.
            deltas = this.getXandYdeltas();
        }
        for(i = 0; i < this.fixedTicks.length; i++){
            if (this.line.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
                fixedTick = this.fixedTicks[i];
                x = coordsZero.usrCoords[1] + fixedTick * deltas.x;
                y = coordsZero.usrCoords[2] + fixedTick * deltas.y;
            } else {
                fixedTick = coordsZero + this.fixedTicks[i];
                x = this.line.X(fixedTick);
                y = this.line.Y(fixedTick);
            }
            tickCoords = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                x,
                y
            ], this.board);
            if (this.line.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE) {
                this.setTicksSizeVariables(fixedTick);
            }
            // Compute the start position and the end position of a tick.
            // If tick is out of the canvas, ti is empty.
            ti = this.createTickPath(tickCoords, true);
            if (ti.length === 3 && fixedTick >= bounds.lower - eps2 && fixedTick <= bounds.upper + eps2) {
                this.ticks.push(ti);
                if (ev_dl && (hasLabelOverrides || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.visProp.labels[i]))) {
                    labelText = hasLabelOverrides ? this.evalVisProp('labels.' + i) : fixedTick;
                    this.labelsData.push(this.generateLabelData(this.generateLabelText(tickCoords, coordsZero, labelText), tickCoords, i));
                } else {
                    this.labelsData.push(null);
                }
            }
        }
    },
    /**
         * Calculates the x and y distances in user coordinates between two units in user space.
         * In essence, these are cosine and sine. The only work to be done is to determine
         * the direction of the line.
         *
         * @returns {Object}
         * @private
         */ getXandYdeltas: function() {
        var point1UsrCoords, point2UsrCoords, distP1P2 = this.line.point1.Dist(this.line.point2);
        // if (this.line.type === Const.OBJECT_TYPE_AXIS) {
        //     // When line is an Axis, direction depends on board coordinates system
        //     // Assume line.point1 and line.point2 are in correct order
        //     point1UsrCoords = this.line.point1.coords.usrCoords;
        //     point2UsrCoords = this.line.point2.coords.usrCoords;
        //     // Check if direction is incorrect, then swap
        //     if (
        //         point1UsrCoords[1] > point2UsrCoords[1] ||
        //         (Math.abs(point1UsrCoords[1] - point2UsrCoords[1]) < Mat.eps &&
        //             point1UsrCoords[2] > point2UsrCoords[2])
        //     ) {
        //         point1UsrCoords = this.line.point2.coords.usrCoords;
        //         point2UsrCoords = this.line.point1.coords.usrCoords;
        //     }
        // } /* if (this.line.elementClass === Const.OBJECT_CLASS_LINE)*/ else {
        // Line direction is always from P1 to P2 for non axis types
        point1UsrCoords = this.line.point1.coords.usrCoords;
        point2UsrCoords = this.line.point2.coords.usrCoords;
        // }
        return {
            x: (point2UsrCoords[1] - point1UsrCoords[1]) / distP1P2,
            y: (point2UsrCoords[2] - point1UsrCoords[2]) / distP1P2
        };
    },
    /**
         * Check if (parts of) the tick is inside the canvas. The tick intersects the boundary
         * at two positions: [x[0], y[0]] and [x[1], y[1]] in screen coordinates.
         * @param  {Array}  x Array of length two
         * @param  {Array}  y Array of length two
         * @return {Boolean}   true if parts of the tick are inside of the canvas or on the boundary.
         */ _isInsideCanvas: function(x, y, m) {
        var cw = this.board.canvasWidth, ch = this.board.canvasHeight;
        if (m === undefined) {
            m = 0;
        }
        return x[0] >= m && x[0] <= cw - m && y[0] >= m && y[0] <= ch - m || x[1] >= m && x[1] <= cw - m && y[1] >= m && y[1] <= ch - m;
    },
    /**
         * @param {JXG.Coords} coords Coordinates of the tick on the line.
         * @param {Boolean} major True if tick is major tick.
         * @returns {Array} Array of length 3 containing path coordinates in screen coordinates
         *                 of the tick (arrays of length 2). 3rd entry is true if major tick otherwise false.
         *                 If the tick is outside of the canvas, the return array is empty.
         * @private
         */ createTickPath: function(coords, major) {
        var c, lineStdForm, intersection, dxs, dys, dxr, dyr, alpha, style, x = [
            -2000000,
            -2000000
        ], y = [
            -2000000,
            -2000000
        ], i, r, r_max, bb, full, delta, // Used for infinite ticks
        te0, te1, dists; // 'signed' distances of intersections to the parent line
        c = coords.scrCoords;
        if (major) {
            dxs = this.dxMaj;
            dys = this.dyMaj;
            style = this.majStyle;
            te0 = this.evalVisProp('majortickendings.0') > 0;
            te1 = this.evalVisProp('majortickendings.1') > 0;
        } else {
            dxs = this.dxMin;
            dys = this.dyMin;
            style = this.minStyle;
            te0 = this.evalVisProp('tickendings.0') > 0;
            te1 = this.evalVisProp('tickendings.1') > 0;
        }
        lineStdForm = [
            -dys * c[1] - dxs * c[2],
            dys,
            dxs
        ];
        // For all ticks regardless if of finite or infinite
        // tick length the intersection with the canvas border is
        // computed.
        if (major && this.evalVisProp('type') === "polar") {
            // polar style
            bb = this.board.getBoundingBox();
            full = 2.0 * Math.PI;
            delta = full / 180;
            //ratio = this.board.unitY / this.board.X;
            // usrCoords: Test if 'circle' is inside of the canvas
            c = coords.usrCoords;
            r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hypot(c[1], c[2]);
            r_max = Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hypot(bb[0], bb[1]), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hypot(bb[2], bb[3]));
            if (r < r_max) {
                // Now, switch to screen coords
                x = [];
                y = [];
                for(i = 0; i <= full; i += delta){
                    x.push(this.board.origin.scrCoords[1] + r * Math.cos(i) * this.board.unitX);
                    y.push(this.board.origin.scrCoords[2] + r * Math.sin(i) * this.board.unitY);
                }
                return [
                    x,
                    y,
                    major
                ];
            }
        } else {
            // line style
            if (style === 'infinite') {
                // Problematic are infinite ticks which have set tickendings:[0,1].
                // For example, this is the default setting for minor ticks
                if (this.evalVisProp('ignoreinfinitetickendings')) {
                    te0 = te1 = true;
                }
                intersection = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].meetLineBoard(lineStdForm, this.board);
                if (te0 && te1) {
                    x[0] = intersection[0].scrCoords[1];
                    x[1] = intersection[1].scrCoords[1];
                    y[0] = intersection[0].scrCoords[2];
                    y[1] = intersection[1].scrCoords[2];
                } else {
                    // Assuming the usrCoords of both intersections are normalized, a 'signed distance'
                    // with respect to the parent line is computed for the intersections. The sign is
                    // used to conclude whether the point is either at the left or right side of the
                    // line. The magnitude can be used to compare the points and determine which point
                    // is closest to the line.
                    dists = [
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].innerProduct(intersection[0].usrCoords.slice(1, 3), this.line.stdform.slice(1, 3)) + this.line.stdform[0],
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].innerProduct(intersection[1].usrCoords.slice(1, 3), this.line.stdform.slice(1, 3)) + this.line.stdform[0]
                    ];
                    // Reverse intersection array order if first intersection is not the leftmost one.
                    if (dists[0] < dists[1]) {
                        intersection.reverse();
                        dists.reverse();
                    }
                    if (te0) {
                        if (dists[0] < 0) {
                            return [];
                        } else if (dists[1] < 0) {
                            x[0] = intersection[0].scrCoords[1];
                            y[0] = intersection[0].scrCoords[2];
                            x[1] = c[1];
                            y[1] = c[2];
                        } else {
                            x[0] = intersection[0].scrCoords[1];
                            y[0] = intersection[0].scrCoords[2];
                            x[1] = intersection[1].scrCoords[1];
                            y[1] = intersection[1].scrCoords[2];
                        }
                    } else if (te1) {
                        if (dists[1] > 0) {
                            return [];
                        } else if (dists[0] > 0) {
                            x[0] = c[1];
                            y[0] = c[2];
                            x[1] = intersection[1].scrCoords[1];
                            y[1] = intersection[1].scrCoords[2];
                        } else {
                            x[0] = intersection[0].scrCoords[1];
                            y[0] = intersection[0].scrCoords[2];
                            x[1] = intersection[1].scrCoords[1];
                            y[1] = intersection[1].scrCoords[2];
                        }
                    }
                }
            } else {
                if (this.evalVisProp('face') === ">") {
                    alpha = Math.PI / 4;
                } else if (this.evalVisProp('face') === "<") {
                    alpha = -Math.PI / 4;
                } else {
                    alpha = 0;
                }
                dxr = Math.cos(alpha) * dxs - Math.sin(alpha) * dys;
                dyr = Math.sin(alpha) * dxs + Math.cos(alpha) * dys;
                x[0] = c[1] + dxr * te0;
                y[0] = c[2] - dyr * te0;
                x[1] = c[1];
                y[1] = c[2];
                alpha = -alpha;
                dxr = Math.cos(alpha) * dxs - Math.sin(alpha) * dys;
                dyr = Math.sin(alpha) * dxs + Math.cos(alpha) * dys;
                x[2] = c[1] - dxr * te1;
                y[2] = c[2] + dyr * te1;
            }
            // Check if (parts of) the tick is inside the canvas.
            if (this._isInsideCanvas(x, y)) {
                return [
                    x,
                    y,
                    major
                ];
            }
        }
        return [];
    },
    /**
         * Format label texts. Show the desired number of digits
         * and use utf-8 minus sign.
         * @param  {Number} value Number to be displayed
         * @return {String}       The value converted into a string.
         * @private
         */ formatLabelText: function(value) {
        var labelText, digits, ev_um = this.evalVisProp('label.usemathjax'), ev_uk = this.evalVisProp('label.usekatex'), ev_s = this.evalVisProp('scalesymbol');
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber(value)) {
            if (this.evalVisProp('label.tofraction')) {
                if (ev_um) {
                    labelText = '\\(' + __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].toFraction(value, true) + '\\)';
                } else {
                    labelText = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].toFraction(value, ev_uk);
                }
            } else {
                digits = this.evalVisProp('digits');
                if (this.useLocale()) {
                    labelText = this.formatNumberLocale(value, digits);
                } else {
                    labelText = (Math.round(value * 1e11) / 1e11).toString();
                    if (labelText.length > this.evalVisProp('maxlabellength') || labelText.indexOf("e") !== -1) {
                        if (this.evalVisProp('precision') !== 3 && digits === 3) {
                            // Use the deprecated attribute "precision"
                            digits = this.evalVisProp('precision');
                        }
                        //labelText = value.toPrecision(digits).toString();
                        labelText = value.toExponential(digits).toString();
                    }
                }
            }
            if (this.evalVisProp('beautifulscientificticklabels')) {
                labelText = this.beautifyScientificNotationLabel(labelText);
            }
            if (labelText.indexOf(".") > -1 && labelText.indexOf("e") === -1) {
                // trim trailing zeros
                labelText = labelText.replace(/0+$/, "");
                // trim trailing .
                labelText = labelText.replace(/\.$/, "");
            }
        } else {
            labelText = value.toString();
        }
        if (ev_s.length > 0) {
            if (labelText === "1") {
                labelText = ev_s;
            } else if (labelText === "-1") {
                labelText = "-" + ev_s;
            } else if (labelText !== "0") {
                labelText = labelText + ev_s;
            }
        }
        if (this.evalVisProp('useunicodeminus')) {
            labelText = labelText.replace(/-/g, "\u2212");
        }
        return labelText;
    },
    /**
         * Formats label texts to make labels displayed in scientific notation look beautiful.
         * For example, label 5.00e+6 will become 5•10⁶, label -1.00e-7 will become into -1•10⁻⁷
         * @param {String} labelText - The label that we want to convert
         * @returns {String} If labelText was not in scientific notation, return labelText without modifications.
         * Otherwise returns beautified labelText with proper superscript notation.
         */ beautifyScientificNotationLabel: function(labelText) {
        var returnString;
        if (labelText.indexOf("e") === -1) {
            return labelText;
        }
        // Clean up trailing 0's, so numbers like 5.00e+6.0 for example become into 5e+6
        returnString = parseFloat(labelText.substring(0, labelText.indexOf("e"))) + labelText.substring(labelText.indexOf("e"));
        // Replace symbols like -,0,1,2,3,4,5,6,7,8,9 with their superscript version.
        // Gets rid of + symbol since there is no need for it anymore.
        returnString = returnString.replace(/e(.*)$/g, function(match, $1) {
            var temp = "\u2022" + "10";
            // Note: Since board ticks do not support HTTP elements like <sub>, we need to replace
            // all the numbers with superscript Unicode characters.
            temp += $1.replace(/-/g, "\u207B").replace(/\+/g, "").replace(/0/g, "\u2070").replace(/1/g, "\u00B9").replace(/2/g, "\u00B2").replace(/3/g, "\u00B3").replace(/4/g, "\u2074").replace(/5/g, "\u2075").replace(/6/g, "\u2076").replace(/7/g, "\u2077").replace(/8/g, "\u2078").replace(/9/g, "\u2079");
            return temp;
        });
        return returnString;
    },
    /**
         * Creates the label text for a given tick. A value for the text can be provided as a number or string
         *
         * @param  {JXG.Coords}    tick  The Coords-object of the tick to create a label for
         * @param  {JXG.Coords}    zero  The Coords-object of line's zero
         * @param  {Number|String} value A predefined value for this tick
         * @returns {String}
         * @private
         */ generateLabelText: function(tick, zero, value) {
        var labelText, distance;
        // No value provided, equidistant, so assign distance as value
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(value)) {
            // could be null or undefined
            distance = this.getDistanceFromZero(zero, tick);
            if (Math.abs(distance) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps) {
                // Point is zero
                return "0";
            }
            value = distance / this.evalVisProp('scale');
        }
        labelText = this.formatLabelText(value);
        return labelText;
    },
    /**
         * Create a tick label data, i.e. text and coordinates
         * @param  {String}     labelText
         * @param  {JXG.Coords} tick
         * @param  {Number}     tickNumber
         * @returns {Object} with properties 'x', 'y', 't' (text), 'i' (tick number) or null in case of o label
         * @private
         */ generateLabelData: function(labelText, tick, tickNumber) {
        var xa, ya, m, fs;
        // Test if large portions of the label are inside of the canvas
        // This is the last chance to abandon the creation of the label if it is mostly
        // outside of the canvas.
        fs = this.evalVisProp('label.fontsize');
        xa = [
            tick.scrCoords[1],
            tick.scrCoords[1]
        ];
        ya = [
            tick.scrCoords[2],
            tick.scrCoords[2]
        ];
        m = fs === undefined ? 12 : fs;
        m *= 0.5;
        if (!this._isInsideCanvas(xa, ya, m)) {
            return null;
        }
        xa = this.evalVisProp('label.offset')[0];
        ya = this.evalVisProp('label.offset')[1];
        return {
            x: tick.usrCoords[1] + xa / this.board.unitX,
            y: tick.usrCoords[2] + ya / this.board.unitY,
            t: labelText,
            i: tickNumber
        };
    },
    /**
         * Recalculate the tick positions and the labels.
         * @returns {JXG.Ticks}
         */ update: function() {
        if (this.needsUpdate) {
            //this.visPropCalc.visible = this.evalVisProp('visible');
            // A canvas with no width or height will create an endless loop, so ignore it
            if (this.board.canvasWidth !== 0 && this.board.canvasHeight !== 0) {
                this.calculateTicksCoordinates();
            }
        // this.updateVisibility(this.line.visPropCalc.visible);
        //
        // for (var i = 0; i < this.labels.length; i++) {
        //     if (this.labels[i] !== null) {
        //         this.labels[i].prepareUpdate()
        //             .updateVisibility(this.line.visPropCalc.visible)
        //             .updateRenderer();
        //     }
        // }
        }
        return this;
    },
    /**
         * Uses the boards renderer to update the arc.
         * @returns {JXG.Ticks} Reference to the object.
         */ updateRenderer: function() {
        if (!this.needsUpdate) {
            return this;
        }
        if (this.visPropCalc.visible) {
            this.board.renderer.updateTicks(this);
        }
        this.updateRendererLabels();
        this.setDisplayRendNode();
        // if (this.visPropCalc.visible != this.visPropOld.visible) {
        //     this.board.renderer.display(this, this.visPropCalc.visible);
        //     this.visPropOld.visible = this.visPropCalc.visible;
        // }
        this.needsUpdate = false;
        return this;
    },
    /**
         * Updates the label elements of the major ticks.
         *
         * @private
         * @returns {JXG.Ticks} Reference to the object.
         */ updateRendererLabels: function() {
        var i, j, lenData, lenLabels, attr, label, ld, visible;
        // The number of labels needed
        lenData = this.labelsData.length;
        // The number of labels which already exist
        // The existing labels are stored in this.labels[]
        // The new label positions and label values are stored in this.labelsData[]
        lenLabels = this.labels.length;
        for(i = 0, j = 0; i < lenData; i++){
            if (this.labelsData[i] === null) {
                continue;
            }
            ld = this.labelsData[i];
            if (j < lenLabels) {
                // Take an already existing text element
                label = this.labels[j];
                label.setText(ld.t);
                label.setCoords(ld.x, ld.y);
                j++;
            } else {
                // A new text element is needed
                this.labelCounter += 1;
                attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(this.visProp.label);
                attr.isLabel = true;
                attr.priv = this.visProp.priv;
                attr.id = this.id + ld.i + "Label" + this.labelCounter;
                label = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createText(this.board, [
                    ld.x,
                    ld.y,
                    ld.t
                ], attr);
                this.addChild(label);
                label.setParents(this);
                label.isDraggable = false;
                label.dump = false;
                this.labels.push(label);
            }
            // Look-ahead if the label inherits visibility.
            // If yes, update label.
            visible = this.evalVisProp('label.visible');
            if (visible === 'inherit') {
                visible = this.visPropCalc.visible;
            }
            label.prepareUpdate().updateVisibility(visible).updateRenderer();
            label.distanceX = this.evalVisProp('label.offset')[0];
            label.distanceY = this.evalVisProp('label.offset')[1];
        }
        // Hide unused labels
        lenData = j;
        for(j = lenData; j < lenLabels; j++){
            this.board.renderer.display(this.labels[j], false);
            // Tick labels have the attribute "visible: 'inherit'"
            // This must explicitly set to false, otherwise
            // this labels would be set to visible in the upcoming
            // update of the labels.
            this.labels[j].visProp.visible = this.labels[j].visPropCalc.visible = false;
        }
        return this;
    },
    hideElement: function() {
        var i;
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("Element.hideElement()", "Element.setDisplayRendNode()");
        this.visPropCalc.visible = false;
        this.board.renderer.display(this, false);
        for(i = 0; i < this.labels.length; i++){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.labels[i])) {
                this.labels[i].hideElement();
            }
        }
        return this;
    },
    showElement: function() {
        var i;
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("Element.showElement()", "Element.setDisplayRendNode()");
        this.visPropCalc.visible = true;
        this.board.renderer.display(this, false);
        for(i = 0; i < this.labels.length; i++){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.labels[i])) {
                this.labels[i].showElement();
            }
        }
        return this;
    }
});
/**
 * @class Ticks are used as distance markers on a line or curve.
 * They are mainly used for axis elements and slider elements. Ticks may stretch infinitely
 * or finitely, which can be set with {@link Ticks#majorHeight} and {@link Ticks#minorHeight}.
 * <p>
 * There are the following ways to position the tick lines:
 * <ol>
 *  <li> If an array is given as optional second parameter for the constructor
 * like e.g. <tt>board.create('ticks', [line, [1, 4, 5]])</tt>, then there will be (fixed) ticks at position
 * 1, 4 and 5 of the line.
 *  <li> If there is only one parameter given, like e.g. <tt>board.create('ticks', [line])</tt>, the ticks will be set
 * equidistant across the line element. There are two variants:
 *    <ol type="i">
 *      <li> Setting the attribute <tt>insertTicks:false</tt>: in this case the distance between two major ticks
 *          is determined by the attribute <tt>ticksDistance</tt>. This distance is given in user units.
 *      <li> Setting the attribute <tt>insertTicks:true</tt>: in this case the distance between two major ticks
 *          is set automatically, depending on
 *          <ul>
 *              <li> the size of the board,
 *              <li> the attribute <tt>minTicksDistance</tt>,  which is the minimum distance between two consecutive minor ticks (in pixel).
 *          </ul>
 * The distance between two major ticks is a value of the form
 * <i>a 10<sup>i</sup></i>, where <i>a</i> is one of <i>{1, 2, 5}</i> and
 * the number <i>a 10<sup>i</sup></i> is maximized such that there are approximately
 * 6 major ticks and there are at least "minTicksDistance" pixel between minor ticks.
 * </ol>
 * <p>
 * For arbitrary lines (and not axes) a "zero coordinate" is determined
 * which defines where the first tick is positioned. This zero coordinate
 * can be altered with the attribute <tt>anchor</tt>. Possible values are "left", "middle", "right" or a number.
 * The default value is "left".
 *
 * @pseudo
 * @name Ticks
 * @augments JXG.Ticks
 * @constructor
 * @type JXG.Ticks
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Line|JXG.Curve} line The parents consist of the line or curve the ticks are going to be attached to.
 * @param {Array} [ticks] Optional array of numbers. If given, a fixed number of static ticks is created
 * at these user-supplied positions.
 * <p>
 * Deprecated: Alternatively, a number defining the distance between two major ticks
 * can be specified. However, this is meanwhile ignored. Use attribute <tt>ticksDistance</tt> instead.
 *
 * @example
 * // Add ticks to line 'l1' through 'p1' and 'p2'. The major ticks are
 * // two units apart and 40 px long.
 *   var p1 = board.create('point', [0, 3]);
 *   var p2 = board.create('point', [1, 3]);
 *   var l1 = board.create('line', [p1, p2]);
 *   var t = board.create('ticks', [l1], {
 *      ticksDistance: 2,
 *      majorHeight: 40
 *   });
 * </pre><div class="jxgbox" id="JXGee7f2d68-75fc-4ec0-9931-c76918427e63" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXGee7f2d68-75fc-4ec0-9931-c76918427e63', {
 *   boundingbox: [-1, 7, 7, -1], axis: true, showcopyright: false, shownavigation: true});
 *   var p1 = board.create('point', [0, 3]);
 *   var p2 = board.create('point', [1, 3]);
 *   var l1 = board.create('line', [p1, p2]);
 *   var t = board.create('ticks', [l1, 2], {ticksDistance: 2, majorHeight: 40});
 * })();
 * </script><pre>
 * @example
 *  // Create ticks labels as fractions
 * board.create('axis', [[0,1], [1,1]], {
 *     ticks: {
 *         label: {
 *             toFraction: true,
 *             useMathjax: true,
 *             display: 'html',
 *             anchorX: 'middle',
 *             offset: [0, -10]
 *         }
 *     }
 * });
 *
 * </pre><div id="JXG4455acb2-6bf3-4801-8887-d7fcc1e4e1da" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js" id="MathJax-script"></script>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG4455acb2-6bf3-4801-8887-d7fcc1e4e1da',
 *             {boundingbox: [-1.2, 2.3, 1.2, -2.3], axis: true, showcopyright: false, shownavigation: false});
 *             board.create('axis', [[0,1], [1,1]], {
 *                 ticks: {
 *                     label: {
 *                         toFraction: true,
 *             useMathjax: true,
 *             display: 'html',
 *             anchorX: 'middle',
 *             offset: [0, -10]
 *                     }
 *                 }
 *             });
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createTicks = function(board, parents, attributes) {
    var el, dist, attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "ticks");
    if (parents.length < 2) {
        dist = attr.ticksdistance; // Will be ignored anyhow and attr.ticksDistance will be used instead
    } else {
        dist = parents[1];
    }
    if (parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE || parents[0].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE) {
        el = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Ticks(parents[0], dist, attr);
    } else {
        throw new Error("JSXGraph: Can't create Ticks with parent types '" + typeof parents[0] + "'.");
    }
    // deprecated
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(attr.generatelabelvalue)) {
        el.generateLabelText = attr.generatelabelvalue;
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(attr.generatelabeltext)) {
        el.generateLabelText = attr.generatelabeltext;
    }
    el.setParents(parents[0]);
    el.isDraggable = true;
    el.fullUpdate(parents[0].visPropCalc.visible);
    return el;
};
/**
 * @class Hatches are collections of short line segments used to mark congruent lines or curves.
 * @pseudo
 * @name Hatch
 * @augments JXG.Ticks
 * @constructor
 * @type JXG.Ticks
 * @throws {Exception} If the element cannot be constructed with the given parent objects an exception is thrown.
 * @param {JXG.Line|JXG.curve} line The line or curve the hatch marks are going to be attached to.
 * @param {Number} numberofhashes Number of dashes. The distance of the hashes can be controlled with the attribute ticksDistance.
 * @example
 * // Create an axis providing two coords pairs.
 *   var p1 = board.create('point', [0, 3]);
 *   var p2 = board.create('point', [1, 3]);
 *   var l1 = board.create('line', [p1, p2]);
 *   var t = board.create('hatch', [l1, 3]);
 * </pre><div class="jxgbox" id="JXG4a20af06-4395-451c-b7d1-002757cf01be" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 * (function () {
 *   var board = JXG.JSXGraph.initBoard('JXG4a20af06-4395-451c-b7d1-002757cf01be', {boundingbox: [-1, 7, 7, -1], showcopyright: false, shownavigation: false});
 *   var p1 = board.create('point', [0, 3]);
 *   var p2 = board.create('point', [1, 3]);
 *   var l1 = board.create('line', [p1, p2]);
 *   var t = board.create('hatch', [l1, 3]);
 * })();
 * </script><pre>
 *
 * @example
 * // Alter the position of the hatch
 *
 * var p = board.create('point', [-5, 0]);
 * var q = board.create('point', [5, 0]);
 * var li = board.create('line', [p, q]);
 * var h = board.create('hatch', [li, 2], {anchor: 0.2, ticksDistance:0.4});
 *
 * </pre><div id="JXG05d720ee-99c9-11e6-a9c7-901b0e1b8723" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG05d720ee-99c9-11e6-a9c7-901b0e1b8723',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *
 *     var p = board.create('point', [-5, 0]);
 *     var q = board.create('point', [5, 0]);
 *     var li = board.create('line', [p, q]);
 *     var h = board.create('hatch', [li, 2], {anchor: 0.2, ticksDistance:0.4});
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * // Alternative hatch faces
 *
 * var li = board.create('line', [[-6,0], [6,3]]);
 * var h1 = board.create('hatch', [li, 2], {tickEndings: [1,1], face:'|'});
 * var h2 = board.create('hatch', [li, 2], {tickEndings: [1,1], face:'>', anchor: 0.3});
 * var h3 = board.create('hatch', [li, 2], {tickEndings: [1,1], face:'<', anchor: 0.7});
 *
 * </pre><div id="JXG974f7e89-eac8-4187-9aa3-fb8068e8384b" class="jxgbox" style="width: 300px; height: 300px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG974f7e89-eac8-4187-9aa3-fb8068e8384b',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     // Alternative hatch faces
 *
 *     var li = board.create('line', [[-6,0], [6,3]]);
 *     var h1 = board.create('hatch', [li, 2], {tickEndings: [1,1], face:'|'});
 *     var h2 = board.create('hatch', [li, 2], {tickEndings: [1,1], face:'>', anchor: 0.3});
 *     var h3 = board.create('hatch', [li, 2], {tickEndings: [1,1], face:'<', anchor: 0.7});
 *
 *     })();
 *
 * </script><pre>
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createHatchmark = function(board, parents, attributes) {
    var num, i, base, width, totalwidth, el, pos = [], attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, 'hatch');
    if (parents[0].elementClass !== __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE && parents[0].elementClass !== __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE || typeof parents[1] !== "number") {
        throw new Error("JSXGraph: Can't create Hatch mark with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + " and ''" + typeof parents[2] + "'.");
    }
    num = parents[1];
    width = attr.ticksdistance;
    totalwidth = (num - 1) * width;
    base = -totalwidth * 0.5;
    for(i = 0; i < num; i++){
        pos[i] = base + i * width;
    }
    el = board.create('ticks', [
        parents[0],
        pos
    ], attr);
    el.elType = 'hatch';
    parents[0].inherits.push(el);
    return el;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("ticks", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createTicks);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("hash", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createHatchmark);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("hatch", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createHatchmark);
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Ticks;
 // export default {
 //     Ticks: JXG.Ticks,
 //     createTicks: JXG.createTicks,
 //     createHashmark: JXG.createHatchmark,
 //     createHatchmark: JXG.createHatchmark
 // };
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/foreignobject.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 * @fileoverview In this file the ForeignObject element is defined.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coords.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coordselement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coordselement.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
/**
 * Construct and handle SVG foreignObjects.
 *
 * @class Creates a new foreignObject object. Do not use this constructor to create a foreignObject. Use {@link JXG.Board#create} with
 * type {@link foreignobject} instead.
 * @augments JXG.GeometryElement
 * @augments JXG.CoordsElement
 * @param {string|JXG.Board} board The board the new foreignObject is drawn on.
 * @param {Array} coordinates An array with the user coordinates of the foreignObject.
 * @param {Object} attributes An object containing visual and - optionally - a name and an id.
 * @param {string|function} url An URL string or a function returning an URL string.
 * @param  {Array} size Array containing width and height of the foreignObject in user coordinates.
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].ForeignObject = function(board, coords, attributes, content, size) {
    this.constructor(board, attributes, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_FOREIGNOBJECT, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_OTHER);
    this.element = this.board.select(attributes.anchor);
    this.coordsConstructor(coords);
    this._useUserSize = false;
    /**
     * Array of length two containing [width, height] of the foreignObject in pixel.
     * @type Array
     */ this.size = [
        1,
        1
    ];
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(size) && size.length > 0) {
        this._useUserSize = true;
        this.W = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createFunction(size[0], this.board, "");
        this.H = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createFunction(size[1], this.board, "");
        this.addParentsFromJCFunctions([
            this.W,
            this.H
        ]);
        this.usrSize = [
            this.W(),
            this.H()
        ];
    }
    // this.size = [Math.abs(this.usrSize[0] * board.unitX), Math.abs(this.usrSize[1] * board.unitY)];
    /**
     * 'href' of the foreignObject.
     * @type {string}
     */ this.content = content;
    this.elType = "foreignobject";
    // span contains the anchor point and the two vectors
    // spanning the foreignObject rectangle.
    // this.span = [
    //     this.coords.usrCoords.slice(0),
    //     [this.coords.usrCoords[0], this.W(), 0],
    //     [this.coords.usrCoords[0], 0, this.H()]
    // ];
    //this.parent = board.select(attributes.anchor);
    this.id = this.board.setId(this, "Im");
    this.board.renderer.drawForeignObject(this);
    this.board.finalizeAdding(this);
    this.methodMap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(this.methodMap, {
        addTransformation: "addTransform",
        trans: "addTransform",
        W: "W",
        Width: "W",
        H: "H",
        Height: "H"
    });
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].ForeignObject.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyPrototypeMethods(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].ForeignObject, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coordselement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], "coordsConstructor");
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].ForeignObject.prototype, /** @lends JXG.ForeignObject.prototype */ {
    /**
         * Checks whether (x,y) is over or near the image;
         * @param {Number} x Coordinate in x direction, screen coordinates.
         * @param {Number} y Coordinate in y direction, screen coordinates.
         * @returns {Boolean} True if (x,y) is over the image, False otherwise.
         */ hasPoint: function(x, y) {
        var dx, dy, r, type, prec, c, v, p, dot, len = this.transformations.length;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isObject(this.evalVisProp('precision'))) {
            type = this.board._inputDevice;
            prec = this.evalVisProp('precision.' + type);
        } else {
            // 'inherit'
            prec = this.board.options.precision.hasPoint;
        }
        // Easy case: no transformation
        if (len === 0) {
            dx = x - this.coords.scrCoords[1];
            dy = this.coords.scrCoords[2] - y;
            r = prec;
            return dx >= -r && dx - this.size[0] <= r && dy >= -r && dy - this.size[1] <= r;
        }
        // foreignObject is transformed
        c = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, [
            x,
            y
        ], this.board);
        // v is the vector from anchor point to the drag point
        c = c.usrCoords;
        v = [
            c[0] - this.span[0][0],
            c[1] - this.span[0][1],
            c[2] - this.span[0][2]
        ];
        dot = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].innerProduct; // shortcut
        // Project the drag point to the sides.
        p = dot(v, this.span[1]);
        if (0 <= p && p <= dot(this.span[1], this.span[1])) {
            p = dot(v, this.span[2]);
            if (0 <= p && p <= dot(this.span[2], this.span[2])) {
                return true;
            }
        }
        return false;
    },
    /**
         * Recalculate the coordinates of lower left corner and the width and height.
         *
         * @returns {JXG.ForeignObject} A reference to the element
         * @private
         */ update: function(fromParent) {
        if (!this.needsUpdate) {
            return this;
        }
        this.updateCoords(fromParent);
        this.updateSize();
        // this.updateSpan();
        return this;
    },
    /**
         * Send an update request to the renderer.
         * @private
         */ updateRenderer: function() {
        return this.updateRendererGeneric("updateForeignObject");
    },
    /**
         * Updates the internal arrays containing size of the foreignObject.
         * @returns {JXG.ForeignObject} A reference to the element
         * @private
         */ updateSize: function() {
        var bb = [
            0,
            0
        ];
        if (this._useUserSize) {
            this.usrSize = [
                this.W(),
                this.H()
            ];
            this.size = [
                Math.abs(this.usrSize[0] * this.board.unitX),
                Math.abs(this.usrSize[1] * this.board.unitY)
            ];
        } else {
            if (this.rendNode.hasChildNodes()) {
                bb = this.rendNode.childNodes[0].getBoundingClientRect();
                this.size = [
                    bb.width,
                    bb.height
                ];
            }
        }
        return this;
    },
    /**
         * Update the anchor point of the foreignObject, i.e. the lower left corner
         * and the two vectors which span the rectangle.
         * @returns {JXG.ForeignObject} A reference to the element
         * @private
         *
         */ updateSpan: function() {
        var i, j, len = this.transformations.length, v = [];
        if (len === 0) {
            this.span = [
                [
                    this.Z(),
                    this.X(),
                    this.Y()
                ],
                [
                    this.Z(),
                    this.W(),
                    0
                ],
                [
                    this.Z(),
                    0,
                    this.H()
                ]
            ];
        } else {
            // v contains the three defining corners of the rectangle/image
            v[0] = [
                this.Z(),
                this.X(),
                this.Y()
            ];
            v[1] = [
                this.Z(),
                this.X() + this.W(),
                this.Y()
            ];
            v[2] = [
                this.Z(),
                this.X(),
                this.Y() + this.H()
            ];
            // Transform the three corners
            for(i = 0; i < len; i++){
                for(j = 0; j < 3; j++){
                    v[j] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matVecMult(this.transformations[i].matrix, v[j]);
                }
            }
            // Normalize the vectors
            for(j = 0; j < 3; j++){
                v[j][1] /= v[j][0];
                v[j][2] /= v[j][0];
                v[j][0] /= v[j][0];
            }
            // Compute the two vectors spanning the rectangle
            // by subtracting the anchor point.
            for(j = 1; j < 3; j++){
                v[j][0] -= v[0][0];
                v[j][1] -= v[0][1];
                v[j][2] -= v[0][2];
            }
            this.span = v;
        }
        return this;
    },
    addTransform: function(transform) {
        var i;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(transform)) {
            for(i = 0; i < transform.length; i++){
                this.transformations.push(transform[i]);
            }
        } else {
            this.transformations.push(transform);
        }
        return this;
    },
    // Documented in element.js
    getParents: function() {
        var p = [
            this.url,
            [
                this.Z(),
                this.X(),
                this.Y()
            ],
            this.usrSize
        ];
        if (this.parents.length !== 0) {
            p = this.parents;
        }
        return p;
    },
    /**
         * Set the width and height of the foreignObject. After setting a new size,
         * board.update() or foreignobject.fullUpdate()
         * has to be called to make the change visible.
         * @param  {numbe|function|string} width  Number, function or string
         *                            that determines the new width of the foreignObject
         * @param  {number|function|string} height Number, function or string
         *                            that determines the new height of the foreignObject
         * @returns {JXG.ForeignObject} A reference to the element
         *
         */ setSize: function(width, height) {
        this.W = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createFunction(width, this.board, "");
        this.H = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createFunction(height, this.board, "");
        this._useUserSize = true;
        this.addParentsFromJCFunctions([
            this.W,
            this.H
        ]);
        return this;
    },
    /**
         * Returns the width of the foreignObject in user coordinates.
         * @returns {number} width of the image in user coordinates
         */ W: function() {},
    /**
         * Returns the height of the foreignObject in user coordinates.
         * @returns {number} height of the image in user coordinates
         */ H: function() {} // Needed for docs, defined in constructor
});
/**
 * @class Display any HTML content in an SVG foreignObject container - even below other elements.
 * <p>
 * Instead of board.create('foreignobject') the shortcut board.create('fo') may be used.
 *
 * <p style="background-color:#dddddd; padding:10px"><b>NOTE:</b> In Safari up to version 15, a foreignObject does not obey the layer structure
 * if it contains &lt;video&gt; or &lt;iframe&gt; tags, as well as elements which are
 * positioned with <tt>position:absolute|relative|fixed</tt>. In this  case, the foreignobject will be
 * "above" the JSXGraph construction.
 * </p>
 *
 * @pseudo
 * @name ForeignObject
 * @augments JXG.ForeignObject
 * @constructor
 * @type JXG.ForeignObject
 *
 * @param {String} content HTML content of the foreignObject. May also be &lt;video&gt; or &lt;iframe&gt;
 * @param {Array} position Position of the foreignObject given by [x, y] in user coordinates. Same as for images.
 * @param {Array} [size] (Optional) argument size of the foreignObject in user coordinates. If not given, size is specified by the HTML attributes
 * or CSS properties of the content.
 *
 * @see Image
 *
 * @example
 * var p = board.create('point', [1, 7], {size: 16});
 * var fo = board.create('foreignobject', [
 *     '&lt;video width="300" height="200" src="https://eucbeniki.sio.si/vega2/278/Video_metanje_oge_.mp4" type="html5video" controls&gt;',
 *     [0, -3], [9, 6]],
 *     {layer: 8, fixed: true}
 *  );
 *
 * </pre><div id="JXG0c122f2c-3671-4a28-80a9-f4c523eeda89" class="jxgbox" style="width: 500px; height: 500px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG0c122f2c-3671-4a28-80a9-f4c523eeda89',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var p = board.create('point', [1, 7], {size: 16});
 *     var fo = board.create('foreignobject', [
 *         '<video width="300" height="200" src="https://eucbeniki.sio.si/vega2/278/Video_metanje_oge_.mp4" type="html5video" controls>',
 *         [0, -3], [9, 6]],
 *         {layer: 8, fixed: true}
 *      );
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * var p = board.create('point', [1, 7], {size: 16});
 * var fo = board.create('fo', [
 *     '&lt;div style="background-color:blue; color: yellow; padding:20px; width:200px; height:50px; "&gt;Hello&lt;/div&gt;',
 *     [-7, -6]],
 *     {layer: 1, fixed: false}
 *  );
 *
 * </pre><div id="JXG1759c868-1a4a-4767-802c-91f84902e3ec" class="jxgbox" style="width: 500px; height: 500px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXG1759c868-1a4a-4767-802c-91f84902e3ec',
 *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
 *     var p = board.create('point', [1, 7], {size: 16});
 *     var fo = board.create('foreignobject', [
 *         '<div style="background-color:blue; color: yellow; padding:20px; width:200px; height:50px; ">Hello</div>',
 *         [-7, -6]],
 *         {layer: 1, fixed: false}
 *      );
 *
 *     })();
 *
 * </script><pre>
 *
 * @example
 * board.renderer.container.style.backgroundColor = 'lightblue';
 * var points = [];
 * points.push( board.create('point', [-2, 3.5], {fixed:false,color: 'yellow', size: 6,name:'6 am'}) );
 * points.push( board.create('point', [0, 3.5],  {fixed:false,color: 'yellow', size: 6,name:'12 pm'}) );
 * points.push( board.create('point', [2, 3.5],  {fixed:false,color: 'yellow', size: 6,name:'6 pm'}) );
 *
 * var fo = board.create('fo', [
 *     '&lt;video width="100%" height="100%" src="https://benedu.net/moodle/aaimg/ajx_img/astro/tr/1vd.mp4" type="html5video" controls&gt;',
 *     [-6, -4], [12, 8]],
 *     {layer: 0, fixed: true}
 *  );
 *
 * var f = JXG.Math.Numerics.lagrangePolynomial(points);
 * var graph = board.create('functiongraph', [f, -10, 10], {fixed:true,strokeWidth:3, layer: 8});
 *
 * </pre><div id="JXGc3fc5520-13aa-4f66-abaa-42e9dc3fbf3f" class="jxgbox" style="width: 500px; height: 500px;"></div>
 * <script type="text/javascript">
 *     (function() {
 *         var board = JXG.JSXGraph.initBoard('JXGc3fc5520-13aa-4f66-abaa-42e9dc3fbf3f',
 *             {boundingbox: [-6,4,6,-4], axis: true, showcopyright: false, shownavigation: false});
 *     board.renderer.container.style.backgroundColor = 'lightblue';
 *     var points = [];
 *     points.push( board.create('point', [-2, 3.5], {fixed:false,color: 'yellow', size: 6,name:'6 am'}) );
 *     points.push( board.create('point', [0, 3.5],  {fixed:false,color: 'yellow', size: 6,name:'12 pm'}) );
 *     points.push( board.create('point', [2, 3.5],  {fixed:false,color: 'yellow', size: 6,name:'6 pm'}) );
 *
 *     var fo = board.create('fo', [
 *         '<video width="100%" height="100%" src="https://benedu.net/moodle/aaimg/ajx_img/astro/tr/1vd.mp4" type="html5video" controls>',
 *         [-6, -4], [12, 8]],
 *         {layer: 0, fixed: true}
 *      );
 *
 *     var f = JXG.Math.Numerics.lagrangePolynomial(points);
 *     var graph = board.create('functiongraph', [f, -10, 10], {fixed:true,strokeWidth:3, layer: 8});
 *
 *     })();
 *
 * </script><pre>
 *
 * Video "24-hour time-lapse in Cascais, Portugal. Produced by Nuno Miguel Duarte" adapted from
 * <a href="https://www.pbslearningmedia.org/resource/buac18-k2-sci-ess-sunposition/changing-position-of-the-sun-in-the-sky/">https://www.pbslearningmedia.org/resource/buac18-k2-sci-ess-sunposition/changing-position-of-the-sun-in-the-sky/</a>,
 * ©2016 Nuno Miguel Duarte.
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createForeignObject = function(board, parents, attributes) {
    var attr, fo, content = parents[0], coords = parents[1], size = [];
    if (parents.length >= 2) {
        size = parents[2];
    }
    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, board.options, "foreignobject");
    fo = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coordselement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].ForeignObject, board, coords, attr, content, size);
    if (!fo) {
        throw new Error("JSXGraph: Can't create foreignObject with parent types '" + typeof parents[0] + "' and '" + typeof parents[1] + "'." + "\nPossible parent types: [string, [x, y], [w, h]], [string, [x, y]], [element,transformation]");
    }
    return fo;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("foreignobject", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createForeignObject);
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement("fo", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createForeignObject);
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].ForeignObject;
 // export default {
 //     ForeignObject: JXG.ForeignObject,
 //     createForeignobject: JXG.createForeignObject
 // };
}),
]);

//# sourceMappingURL=c0305_jsxgraph_src_base_c72a1ea5._.js.map