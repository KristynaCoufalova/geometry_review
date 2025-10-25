(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/renderer/abstract.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, define: true, AMprocessNode: true, MathJax: true, document: true, window: true */ /*
    nomen:    Allow underscores to indicate private class members. Might be replaced by local variables.
    plusplus: Only allowed in for-loops
    newcap:   AsciiMathMl exposes non-constructor functions beginning with upper case letters
*/ /*jslint nomen: true, plusplus: true, newcap: true, unparam: true*/ /*eslint no-unused-vars: "off"*/ /**
 * @fileoverview JSXGraph can use various technologies to render the contents of a construction, e.g.
 * SVG, VML, and HTML5 Canvas. To accomplish this, The rendering and the logic and control mechanisms
 * are completely separated from each other. Every rendering technology has it's own class, called
 * Renderer, e.g. SVGRenderer for SVG, the same for VML and Canvas. The common base for all available
 * renderers is the class AbstractRenderer defined in this file.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/options.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coords.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-client] (ecmascript)");
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
/**
 * <p>This class defines the interface to the graphics part of JSXGraph. This class is an abstract class, it
 * actually does not render anything. This is up to the {@link JXG.SVGRenderer}, {@link JXG.VMLRenderer},
 * and {@link JXG.CanvasRenderer} classes. We strongly discourage you from using the methods in these classes
 * directly. Only the methods which are defined in this class and are not marked as private are guaranteed
 * to exist in any renderer instance you can access via {@link JXG.Board#renderer}. But not all methods may
 * work as expected.</p>
 * <p>The methods of this renderer can be divided into different categories:
 * <dl>
 *     <dt>Draw basic elements</dt>
 *     <dd>In this category we find methods to draw basic elements like {@link JXG.Point}, {@link JXG.Line},
 *     and {@link JXG.Curve} as well as assisting methods tightly bound to these basic painters. You do not
 *     need to implement these methods in a descendant renderer but instead implement the primitive drawing
 *     methods described below. This approach is encouraged when you're using a XML based rendering engine
 *     like VML and SVG. If you want to use a bitmap based rendering technique you are supposed to override
 *     these methods instead of the primitive drawing methods.</dd>
 *     <dt>Draw primitives</dt>
 *     <dd>This category summarizes methods to handle primitive nodes. As creation and management of these nodes
 *     is different among different the rendering techniques most of these methods are purely virtual and need
 *     proper implementation if you choose to not overwrite the basic element drawing methods.</dd>
 *     <dt>Attribute manipulation</dt>
 *     <dd>In XML based renders you have to manipulate XML nodes and their attributes to change the graphics.
 *     For that purpose attribute manipulation methods are defined to set the color, opacity, and other things.
 *     Please note that some of these methods are required in bitmap based renderers, too, because some elements
 *     like {@link JXG.Text} can be HTML nodes floating over the construction.</dd>
 *     <dt>Renderer control</dt>
 *     <dd>Methods to clear the drawing board or to stop and to resume the rendering engine.</dd>
 * </dl></p>
 * @class JXG.AbstractRenderer
 * @constructor
 * @see JXG.SVGRenderer
 * @see JXG.VMLRenderer
 * @see JXG.CanvasRenderer
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].AbstractRenderer = function() {
    // WHY THIS IS A CLASS INSTEAD OF A SINGLETON OBJECT:
    //
    // The renderers need to keep track of some stuff which is not always the same on different boards,
    // like enhancedRendering, reference to the container object, and resolution in VML. Sure, those
    // things could be stored in board. But they are rendering related and JXG.Board is already very
    // very big.
    //
    // And we can't save the rendering related data in {SVG,VML,Canvas}Renderer and make only the
    // JXG.AbstractRenderer a singleton because of that:
    //
    // Given an object o with property a set to true
    //     var o = {a: true};
    // and a class c doing nothing
    //     c = function() {};
    // Set c's prototype to o
    //     c.prototype = o;
    // and create an instance of c we get i.a to be true
    //     i = new c();
    //     i.a;
    //     > true
    // But we can overwrite this property via
    //     c.prototype.a = false;
    //     i.a;
    //     > false
    /**
     * The vertical offset for {@link Text} elements. Every {@link Text} element will
     * be placed this amount of pixels below the user given coordinates.
     * @type Number
     * @default 0
     */ this.vOffsetText = 0;
    /**
     * If this property is set to <tt>true</tt> the visual properties of the elements are updated
     * on every update. Visual properties means: All the stuff stored in the
     * {@link JXG.GeometryElement#visProp} property won't be set if enhancedRendering is <tt>false</tt>
     * @type Boolean
     * @default true
     */ this.enhancedRendering = true;
    /**
     * The HTML element that stores the JSXGraph board in it.
     * @type Node
     */ this.container = null;
    /**
     * This is used to easily determine which renderer we are using
     * @example if (board.renderer.type === 'vml') {
     *     // do something
     * }
     * @type String
     */ this.type = "";
    /**
     * True if the browsers' SVG engine supports foreignObject.
     * Not supported browsers are IE 9 - 11.
     * It is tested in svg renderer.
     *
     * @type Boolean
     * @private
     */ this.supportsForeignObject = false;
    /**
     * Defines dash patterns. Sizes are in pixel.
     * Defined styles are:
     * <ol>
     * <li> 2 dash, 2 space</li>
     * <li> 5 dash, 5 space</li>
     * <li> 10 dash, 10 space</li>
     * <li> 20 dash, 20 space</li>
     * <li> 20 dash, 10 space, 10 dash, 10 space</li>
     * <li> 20 dash, 5 space, 10 dash, 5 space</li>
     * <li> 0 dash, 5 space (dotted line)</li>
     * </ol>
     * This means, the numbering is <b>1-based</b>.
     * Solid lines are set with dash:0.
     * If the object's attribute "dashScale:true" the dash pattern is multiplied by
     * strokeWidth / 2.
     *
     * @type Array
     * @default [[2, 2], [5, 5], [10, 10], [20, 20], [20, 10, 10, 10], [20, 5, 10, 5], [0, 5]]
     * @see JXG.GeometryElement#dash
     * @see JXG.GeometryElement#dashScale
     */ this.dashArray = [
        [
            2,
            2
        ],
        [
            5,
            5
        ],
        [
            10,
            10
        ],
        [
            20,
            20
        ],
        [
            20,
            10,
            10,
            10
        ],
        [
            20,
            5,
            10,
            5
        ],
        [
            0,
            5
        ]
    ];
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].AbstractRenderer.prototype, /** @lends JXG.AbstractRenderer.prototype */ {
    /* ********* Private methods *********** */ /**
         * Update visual properties, but only if {@link JXG.AbstractRenderer#enhancedRendering} or <tt>enhanced</tt> is set to true.
         * @param {JXG.GeometryElement} el The element to update
         * @param {Object} [not={}] Select properties you don't want to be updated: <tt>{fill: true, dash: true}</tt> updates
         * everything except for fill and dash. Possible values are <tt>stroke, fill, dash, shadow, gradient</tt>.
         * @param {Boolean} [enhanced=false] If true, {@link JXG.AbstractRenderer#enhancedRendering} is assumed to be true.
         * @private
         */ _updateVisual: function(el, not, enhanced) {
        if (enhanced || this.enhancedRendering) {
            not = not || {};
            this.setObjectTransition(el);
            if (!el.evalVisProp('draft')) {
                if (!not.stroke) {
                    if (el.highlighted) {
                        this.setObjectStrokeColor(el, el.evalVisProp('highlightstrokecolor'), el.evalVisProp('highlightstrokeopacity'));
                        this.setObjectStrokeWidth(el, el.evalVisProp('highlightstrokewidth'));
                    } else {
                        this.setObjectStrokeColor(el, el.evalVisProp('strokecolor'), el.evalVisProp('strokeopacity'));
                        this.setObjectStrokeWidth(el, el.evalVisProp('strokewidth'));
                    }
                }
                if (!not.fill) {
                    if (el.highlighted) {
                        this.setObjectFillColor(el, el.evalVisProp('highlightfillcolor'), el.evalVisProp('highlightfillopacity'));
                    } else {
                        this.setObjectFillColor(el, el.evalVisProp('fillcolor'), el.evalVisProp('fillopacity'));
                    }
                }
                if (!not.dash) {
                    this.setDashStyle(el, el.visProp);
                }
                if (!not.shadow) {
                    this.setShadow(el);
                }
                // if (!not.gradient) {
                //     // this.setGradient(el);
                //     this.setShadow(el);
                // }
                if (!not.tabindex) {
                    this.setTabindex(el);
                }
            } else {
                this.setDraft(el);
            }
            if (el.highlighted) {
                this.setCssClass(el, el.evalVisProp('highlightcssclass'));
            } else {
                this.setCssClass(el, el.evalVisProp('cssclass'));
            }
            if (el.evalVisProp('aria.enabled')) {
                this.setARIA(el);
            }
        }
    },
    /**
         * Get information if element is highlighted.
         * @param {JXG.GeometryElement} el The element which is tested for being highlighted.
         * @returns {String} 'highlight' if highlighted, otherwise the ampty string '' is returned.
         * @private
         */ _getHighlighted: function(el) {
        var isTrace = false, hl;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(el.board) || !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(el.board.highlightedObjects)) {
            // This case handles trace elements.
            // To make them work, we simply neglect highlighting.
            isTrace = true;
        }
        if (!isTrace && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(el.board.highlightedObjects[el.id])) {
            hl = "highlight";
        } else {
            hl = "";
        }
        return hl;
    },
    /* ********* Point related stuff *********** */ /**
         * Draws a point on the {@link JXG.Board}.
         * @param {JXG.Point} el Reference to a {@link JXG.Point} object that has to be drawn.
         * @see Point
         * @see JXG.Point
         * @see JXG.AbstractRenderer#updatePoint
         * @see JXG.AbstractRenderer#changePointStyle
         */ drawPoint: function(el) {
        var prim, // Sometimes el is not a real point and lacks the methods of a JXG.Point instance,
        // in these cases to not use el directly.
        face = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].normalizePointFace(el.evalVisProp('face'));
        // Determine how the point looks like
        if (face === "o") {
            prim = "ellipse";
        } else if (face === "[]") {
            prim = "rect";
        } else {
            // cross/x, diamond/<>, triangleup/A/^, triangledown/v, triangleleft/<,
            // triangleright/>, plus/+, |, -
            prim = "path";
        }
        el.rendNode = this.appendChildPrim(this.createPrim(prim, el.id), el.evalVisProp('layer'));
        this.appendNodesToElement(el, prim);
        // Adjust visual properties
        this._updateVisual(el, {
            dash: true,
            shadow: true
        }, true);
        // By now we only created the xml nodes and set some styles, in updatePoint
        // the attributes are filled with data.
        this.updatePoint(el);
    },
    /**
         * Updates visual appearance of the renderer element assigned to the given {@link JXG.Point}.
         * @param {JXG.Point} el Reference to a {@link JXG.Point} object, that has to be updated.
         * @see Point
         * @see JXG.Point
         * @see JXG.AbstractRenderer#drawPoint
         * @see JXG.AbstractRenderer#changePointStyle
         */ updatePoint: function(el) {
        var size = el.evalVisProp('size'), // sometimes el is not a real point and lacks the methods of a JXG.Point instance,
        // in these cases to not use el directly.
        face = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].normalizePointFace(el.evalVisProp('face')), unit = el.evalVisProp('sizeunit'), zoom = el.evalVisProp('zoom'), s1;
        if (!isNaN(el.coords.scrCoords[2] + el.coords.scrCoords[1])) {
            if (unit === "user") {
                size *= Math.sqrt(Math.abs(el.board.unitX * el.board.unitY));
            }
            size *= !el.board || !zoom ? 1.0 : Math.sqrt(el.board.zoomX * el.board.zoomY);
            s1 = size === 0 ? 0 : size + 1;
            if (face === "o") {
                // circle
                this.updateEllipsePrim(el.rendNode, el.coords.scrCoords[1], el.coords.scrCoords[2], s1, s1);
            } else if (face === "[]") {
                // rectangle
                this.updateRectPrim(el.rendNode, el.coords.scrCoords[1] - size, el.coords.scrCoords[2] - size, size * 2, size * 2);
            } else {
                // x, +, <>, <<>>, ^, v, <, >
                this.updatePathPrim(el.rendNode, this.updatePathStringPoint(el, size, face), el.board);
            }
            this._updateVisual(el, {
                dash: false,
                shadow: false
            });
            this.setShadow(el);
        }
    },
    /**
         * Changes the style of a {@link JXG.Point}. This is required because the point styles differ in what
         * elements have to be drawn, e.g. if the point is marked by a "x" or a "+" two lines are drawn, if
         * it's marked by spot a circle is drawn. This method removes the old renderer element(s) and creates
         * the new one(s).
         * @param {JXG.Point} el Reference to a {@link JXG.Point} object, that's style is changed.
         * @see Point
         * @see JXG.Point
         * @see JXG.AbstractRenderer#updatePoint
         * @see JXG.AbstractRenderer#drawPoint
         */ changePointStyle: function(el) {
        var node = this.getElementById(el.id);
        // remove the existing point rendering node
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(node)) {
            this.remove(node);
        }
        // and make a new one
        this.drawPoint(el);
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].clearVisPropOld(el);
        if (!el.visPropCalc.visible) {
            this.display(el, false);
        }
        if (el.evalVisProp('draft')) {
            this.setDraft(el);
        }
    },
    /* ********* Line related stuff *********** */ /**
         * Draws a line on the {@link JXG.Board}.
         * @param {JXG.Line} el Reference to a line object, that has to be drawn.
         * @see Line
         * @see JXG.Line
         * @see JXG.AbstractRenderer#updateLine
         */ drawLine: function(el) {
        el.rendNode = this.appendChildPrim(this.createPrim("line", el.id), el.evalVisProp('layer'));
        this.appendNodesToElement(el, "lines");
        this.updateLine(el);
    },
    /**
         * Updates visual appearance of the renderer element assigned to the given {@link JXG.Line}.
         * @param {JXG.Line} el Reference to the {@link JXG.Line} object that has to be updated.
         * @see Line
         * @see JXG.Line
         * @see JXG.AbstractRenderer#drawLine
         */ updateLine: function(el) {
        this._updateVisual(el);
        this.updatePathWithArrowHeads(el); // Calls the renderer primitive
        this.setLineCap(el);
    },
    /* ********* Curve related stuff *********** */ /**
         * Draws a {@link JXG.Curve} on the {@link JXG.Board}.
         * @param {JXG.Curve} el Reference to a graph object, that has to be plotted.
         * @see Curve
         * @see JXG.Curve
         * @see JXG.AbstractRenderer#updateCurve
         */ drawCurve: function(el) {
        el.rendNode = this.appendChildPrim(this.createPrim("path", el.id), el.evalVisProp('layer'));
        this.appendNodesToElement(el, "path");
        this.updateCurve(el);
    },
    /**
         * Updates visual appearance of the renderer element assigned to the given {@link JXG.Curve}.
         * @param {JXG.Curve} el Reference to a {@link JXG.Curve} object, that has to be updated.
         * @see Curve
         * @see JXG.Curve
         * @see JXG.AbstractRenderer#drawCurve
         */ updateCurve: function(el) {
        this._updateVisual(el);
        this.updatePathWithArrowHeads(el); // Calls the renderer primitive
        this.setLineCap(el);
    },
    /* ********* Arrow heads and related stuff *********** */ /**
         * Handles arrow heads of a line or curve element and calls the renderer primitive.
         *
         * @param {JXG.GeometryElement} el Reference to a line or curve object that has to be drawn.
         * @param {Boolean} doHighlight
         *
         * @private
         * @see Line
         * @see JXG.Line
         * @see Curve
         * @see JXG.Curve
         * @see JXG.AbstractRenderer#updateLine
         * @see JXG.AbstractRenderer#updateCurve
         * @see JXG.AbstractRenderer#makeArrows
         * @see JXG.AbstractRenderer#getArrowHeadData
         */ updatePathWithArrowHeads: function(el, doHighlight) {
        var hl = doHighlight ? 'highlight' : '', w, arrowData;
        if (doHighlight && el.evalVisProp('highlightstrokewidth')) {
            w = Math.max(el.evalVisProp('highlightstrokewidth'), el.evalVisProp('strokewidth'));
        } else {
            w = el.evalVisProp('strokewidth');
        }
        // Get information if there are arrow heads and how large they are.
        arrowData = this.getArrowHeadData(el, w, hl);
        // Create the SVG nodes if necessary
        this.makeArrows(el, arrowData);
        // Draw the paths with arrow heads
        if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
            this.updateLineWithEndings(el, arrowData);
        } else if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE) {
            this.updatePath(el);
        }
        this.setArrowSize(el, arrowData);
    },
    /**
         * This method determines some data about the line endings of this element.
         * If there are arrow heads, the offset is determined so that no parts of the line stroke
         * lap over the arrow head.
         * <p>
         * The returned object also contains the types of the arrow heads.
         *
         * @param {JXG.GeometryElement} el JSXGraph line or curve element
         * @param {Number} strokewidth strokewidth of the element
         * @param {String} hl Ither 'highlight' or empty string
         * @returns {Object} object containing the data
         *
         * @private
         */ getArrowHeadData: function(el, strokewidth, hl) {
        var minlen = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps, typeFirst, typeLast, offFirst = 0, offLast = 0, sizeFirst = 0, sizeLast = 0, ev_fa = el.evalVisProp('firstarrow'), ev_la = el.evalVisProp('lastarrow'), off, size;
        /*
               Handle arrow heads.

               The default arrow head is an isosceles triangle with base length 10 units and height 10 units.
               These 10 units are scaled to strokeWidth * arrowSize pixels.
            */ if (ev_fa || ev_la) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(ev_fa.type)) {
                typeFirst = el.eval(ev_fa.type);
            } else {
                if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
                    typeFirst = 1;
                } else {
                    typeFirst = 7;
                }
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(ev_la.type)) {
                typeLast = el.eval(ev_la.type);
            } else {
                if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
                    typeLast = 1;
                } else {
                    typeLast = 7;
                }
            }
            if (ev_fa) {
                size = 6;
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(ev_fa.size)) {
                    size = el.eval(ev_fa.size);
                }
                if (hl !== "" && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(ev_fa[hl + "size"])) {
                    size = el.eval(ev_fa[hl + "size"]);
                }
                off = strokewidth * size;
                if (typeFirst === 2) {
                    off *= 0.5;
                    minlen += strokewidth * size;
                } else if (typeFirst === 3) {
                    off = strokewidth * size / 3;
                    minlen += strokewidth;
                } else if (typeFirst === 4 || typeFirst === 5 || typeFirst === 6) {
                    off = strokewidth * size / 1.5;
                    minlen += strokewidth * size;
                } else if (typeFirst === 7) {
                    off = 0;
                    size = 10;
                    minlen += strokewidth;
                } else {
                    minlen += strokewidth * size;
                }
                offFirst += off;
                sizeFirst = size;
            }
            if (ev_la) {
                size = 6;
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(ev_la.size)) {
                    size = el.eval(ev_la.size);
                }
                if (hl !== "" && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(ev_la[hl + "size"])) {
                    size = el.eval(ev_la[hl + "size"]);
                }
                off = strokewidth * size;
                if (typeLast === 2) {
                    off *= 0.5;
                    minlen += strokewidth * size;
                } else if (typeLast === 3) {
                    off = strokewidth * size / 3;
                    minlen += strokewidth;
                } else if (typeLast === 4 || typeLast === 5 || typeLast === 6) {
                    off = strokewidth * size / 1.5;
                    minlen += strokewidth * size;
                } else if (typeLast === 7) {
                    off = 0;
                    size = 10;
                    minlen += strokewidth;
                } else {
                    minlen += strokewidth * size;
                }
                offLast += off;
                sizeLast = size;
            }
        }
        el.visPropCalc.typeFirst = typeFirst;
        el.visPropCalc.typeLast = typeLast;
        return {
            evFirst: ev_fa,
            evLast: ev_la,
            typeFirst: typeFirst,
            typeLast: typeLast,
            offFirst: offFirst,
            offLast: offLast,
            sizeFirst: sizeFirst,
            sizeLast: sizeLast,
            showFirst: 1,
            showLast: 1,
            minLen: minlen,
            strokeWidth: strokewidth
        };
    },
    /**
         * Corrects the line length if there are arrow heads, such that
         * the arrow ends exactly at the intended position.
         * Calls the renderer method to draw the line.
         *
         * @param {JXG.Line} el Reference to a line object, that has to be drawn
         * @param {Object} arrowData Data concerning possible arrow heads
         *
         * @returns {JXG.AbstractRenderer} Reference to the renderer
         *
         * @private
         * @see Line
         * @see JXG.Line
         * @see JXG.AbstractRenderer#updateLine
         * @see JXG.AbstractRenderer#getPositionArrowHead
         *
         */ updateLineWithEndings: function(el, arrowData) {
        var c1, c2, // useTotalLength = true,
        margin = null;
        c1 = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, el.point1.coords.usrCoords, el.board);
        c2 = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, el.point2.coords.usrCoords, el.board);
        margin = el.evalVisProp('margin');
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].calcStraight(el, c1, c2, margin);
        this.handleTouchpoints(el, c1, c2, arrowData);
        this.getPositionArrowHead(el, c1, c2, arrowData);
        this.updateLinePrim(el.rendNode, c1.scrCoords[1], c1.scrCoords[2], c2.scrCoords[1], c2.scrCoords[2], el.board);
        return this;
    },
    /**
         *
         * Calls the renderer method to draw a curve.
         *
         * @param {JXG.GeometryElement} el Reference to a line object, that has to be drawn.
         * @returns {JXG.AbstractRenderer} Reference to the renderer
         *
         * @private
         * @see Curve
         * @see JXG.Curve
         * @see JXG.AbstractRenderer#updateCurve
         *
         */ updatePath: function(el) {
        if (el.evalVisProp('handdrawing')) {
            this.updatePathPrim(el.rendNode, this.updatePathStringBezierPrim(el), el.board);
        } else {
            this.updatePathPrim(el.rendNode, this.updatePathStringPrim(el), el.board);
        }
        return this;
    },
    /**
         * Shorten the length of a line element such that the arrow head touches
         * the start or end point and such that the arrow head ends exactly
         * at the start / end position of the line.
         * <p>
         * The Coords objects c1 and c2 are changed in place. In object a, the Boolean properties
         * 'showFirst' and 'showLast' are set.
         *
         * @param  {JXG.Line} el Reference to the line object that gets arrow heads.
         * @param  {JXG.Coords} c1  Coords of the first point of the line (after {@link JXG.Math.Geometry#calcStraight}).
         * @param  {JXG.Coords} c2  Coords of the second point of the line (after {@link JXG.Math.Geometry#calcStraight}).
         * @param  {Object}  a Object { evFirst: Boolean, evLast: Boolean} containing information about arrow heads.
         * @see JXG.AbstractRenderer#getArrowHeadData
         *
         */ getPositionArrowHead: function(el, c1, c2, a) {
        var d, d1x, d1y, d2x, d2y;
        //    Handle arrow heads.
        //    The default arrow head (type==1) is an isosceles triangle with base length 10 units and height 10 units.
        //    These 10 units are scaled to strokeWidth * arrowSize pixels.
        if (a.evFirst || a.evLast) {
            // Correct the position of the arrow heads
            d1x = d1y = d2x = d2y = 0.0;
            d = c1.distance(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, c2);
            if (a.evFirst && el.board.renderer.type !== "vml") {
                if (d >= a.minLen) {
                    d1x = (c2.scrCoords[1] - c1.scrCoords[1]) * a.offFirst / d;
                    d1y = (c2.scrCoords[2] - c1.scrCoords[2]) * a.offFirst / d;
                } else {
                    a.showFirst = 0;
                }
            }
            if (a.evLast && el.board.renderer.type !== "vml") {
                if (d >= a.minLen) {
                    d2x = (c2.scrCoords[1] - c1.scrCoords[1]) * a.offLast / d;
                    d2y = (c2.scrCoords[2] - c1.scrCoords[2]) * a.offLast / d;
                } else {
                    a.showLast = 0;
                }
            }
            c1.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, [
                c1.scrCoords[1] + d1x,
                c1.scrCoords[2] + d1y
            ], false, true);
            c2.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, [
                c2.scrCoords[1] - d2x,
                c2.scrCoords[2] - d2y
            ], false, true);
        }
        return this;
    },
    /**
         * Handle touchlastpoint / touchfirstpoint
         *
         * @param {JXG.GeometryElement} el
         * @param {JXG.Coords} c1 Coordinates of the start of the line. The coordinates are changed in place.
         * @param {JXG.Coords} c2 Coordinates of the end of the line. The coordinates are changed in place.
         * @param {Object} a
         * @see JXG.AbstractRenderer#getArrowHeadData
         */ handleTouchpoints: function(el, c1, c2, a) {
        var s1, s2, d, d1x, d1y, d2x, d2y;
        if (a.evFirst || a.evLast) {
            d = d1x = d1y = d2x = d2y = 0.0;
            s1 = el.point1.evalVisProp('size') + el.point1.evalVisProp('strokewidth');
            s2 = el.point2.evalVisProp('size') + el.point2.evalVisProp('strokewidth');
            // Handle touchlastpoint /touchfirstpoint
            if (a.evFirst && el.evalVisProp('touchfirstpoint') && el.point1.evalVisProp('visible')) {
                d = c1.distance(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, c2);
                //if (d > s) {
                d1x = (c2.scrCoords[1] - c1.scrCoords[1]) * s1 / d;
                d1y = (c2.scrCoords[2] - c1.scrCoords[2]) * s1 / d;
            //}
            }
            if (a.evLast && el.evalVisProp('touchlastpoint') && el.point2.evalVisProp('visible')) {
                d = c1.distance(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, c2);
                //if (d > s) {
                d2x = (c2.scrCoords[1] - c1.scrCoords[1]) * s2 / d;
                d2y = (c2.scrCoords[2] - c1.scrCoords[2]) * s2 / d;
            //}
            }
            c1.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, [
                c1.scrCoords[1] + d1x,
                c1.scrCoords[2] + d1y
            ], false, true);
            c2.setCoordinates(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN, [
                c2.scrCoords[1] - d2x,
                c2.scrCoords[2] - d2y
            ], false, true);
        }
        return this;
    },
    /**
         * Set the arrow head size.
         *
         * @param {JXG.GeometryElement} el Reference to a line or curve object that has to be drawn.
         * @param {Object} arrowData Data concerning possible arrow heads
         * @returns {JXG.AbstractRenderer} Reference to the renderer
         *
         * @private
         * @see Line
         * @see JXG.Line
         * @see Curve
         * @see JXG.Curve
         * @see JXG.AbstractRenderer#updatePathWithArrowHeads
         * @see JXG.AbstractRenderer#getArrowHeadData
         */ setArrowSize: function(el, a) {
        if (a.evFirst) {
            this._setArrowWidth(el.rendNodeTriangleStart, a.showFirst * a.strokeWidth, el.rendNode, a.sizeFirst);
        }
        if (a.evLast) {
            this._setArrowWidth(el.rendNodeTriangleEnd, a.showLast * a.strokeWidth, el.rendNode, a.sizeLast);
        }
        return this;
    },
    /**
         * Update the line endings (linecap) of a straight line from its attribute
         * 'linecap'.
         * Possible values for the attribute 'linecap' are: 'butt', 'round', 'square'.
         * The default value is 'butt'. Not available for VML renderer.
         *
         * @param {JXG.Line} element A arbitrary line.
         * @see Line
         * @see JXG.Line
         * @see JXG.AbstractRenderer#updateLine
         */ setLineCap: function(el) {},
    /* ********* Ticks related stuff *********** */ /**
         * Creates a rendering node for ticks added to a line.
         * @param {JXG.Line} el A arbitrary line.
         * @see Line
         * @see Ticks
         * @see JXG.Line
         * @see JXG.Ticks
         * @see JXG.AbstractRenderer#updateTicks
         */ drawTicks: function(el) {
        el.rendNode = this.appendChildPrim(this.createPrim("path", el.id), el.evalVisProp('layer'));
        this.appendNodesToElement(el, "path");
    },
    /**
         * Update {@link Ticks} on a {@link JXG.Line}. This method is only a stub and has to be implemented
         * in any descendant renderer class.
         * @param {JXG.Ticks} el Reference of a ticks object that has to be updated.
         * @see Line
         * @see Ticks
         * @see JXG.Line
         * @see JXG.Ticks
         * @see JXG.AbstractRenderer#drawTicks
         */ updateTicks: function(el) {},
    /* ********* Circle related stuff *********** */ /**
         * Draws a {@link JXG.Circle}
         * @param {JXG.Circle} el Reference to a {@link JXG.Circle} object that has to be drawn.
         * @see Circle
         * @see JXG.Circle
         * @see JXG.AbstractRenderer#updateEllipse
         */ drawEllipse: function(el) {
        el.rendNode = this.appendChildPrim(this.createPrim("ellipse", el.id), el.evalVisProp('layer'));
        this.appendNodesToElement(el, "ellipse");
        this.updateEllipse(el);
    },
    /**
         * Updates visual appearance of a given {@link JXG.Circle} on the {@link JXG.Board}.
         * @param {JXG.Circle} el Reference to a {@link JXG.Circle} object, that has to be updated.
         * @see Circle
         * @see JXG.Circle
         * @see JXG.AbstractRenderer#drawEllipse
         */ updateEllipse: function(el) {
        this._updateVisual(el);
        var radius = el.Radius();
        if (/*radius > 0.0 &&*/ Math.abs(el.center.coords.usrCoords[0]) > __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps && !isNaN(radius + el.center.coords.scrCoords[1] + el.center.coords.scrCoords[2]) && radius * el.board.unitX < 2000000) {
            this.updateEllipsePrim(el.rendNode, el.center.coords.scrCoords[1], el.center.coords.scrCoords[2], radius * el.board.unitX, radius * el.board.unitY);
        }
        this.setLineCap(el);
    },
    /* ********* Polygon related stuff *********** */ /**
         * Draws a {@link JXG.Polygon} on the {@link JXG.Board}.
         * @param {JXG.Polygon} el Reference to a Polygon object, that is to be drawn.
         * @see Polygon
         * @see JXG.Polygon
         * @see JXG.AbstractRenderer#updatePolygon
         */ drawPolygon: function(el) {
        el.rendNode = this.appendChildPrim(this.createPrim("polygon", el.id), el.evalVisProp('layer'));
        this.appendNodesToElement(el, "polygon");
        this.updatePolygon(el);
    },
    /**
         * Updates properties of a {@link JXG.Polygon}'s rendering node.
         * @param {JXG.Polygon} el Reference to a {@link JXG.Polygon} object, that has to be updated.
         * @see Polygon
         * @see JXG.Polygon
         * @see JXG.AbstractRenderer#drawPolygon
         */ updatePolygon: function(el) {
        // Here originally strokecolor wasn't updated but strokewidth was.
        // But if there's no strokecolor i don't see why we should update strokewidth.
        this._updateVisual(el, {
            stroke: true,
            dash: true
        });
        this.updatePolygonPrim(el.rendNode, el);
    },
    /* ********* Text related stuff *********** */ /**
         * Shows a small copyright notice in the top left corner of the board.
         * @param {String} str The copyright notice itself
         * @param {Number} fontsize Size of the font the copyright notice is written in
         * @see JXG.AbstractRenderer#displayLogo
         * @see Text#fontSize
         */ displayCopyright: function(str, fontsize) {},
    /**
         * Shows a small JSXGraph logo in the top left corner of the board.
         * @param {String} str The data-URL of the logo
         * @param {Number} fontsize Size of the font the copyright notice is written in
         * @see JXG.AbstractRenderer#displayCopyright
         * @see Text#fontSize
         */ displayLogo: function(str, fontsize) {},
    /**
         * An internal text is a {@link JXG.Text} element which is drawn using only
         * the given renderer but no HTML. This method is only a stub, the drawing
         * is done in the special renderers.
         * @param {JXG.Text} el Reference to a {@link JXG.Text} object
         * @see Text
         * @see JXG.Text
         * @see JXG.AbstractRenderer#updateInternalText
         * @see JXG.AbstractRenderer#drawText
         * @see JXG.AbstractRenderer#updateText
         * @see JXG.AbstractRenderer#updateTextStyle
         */ drawInternalText: function(el) {},
    /**
         * Updates visual properties of an already existing {@link JXG.Text} element.
         * @param {JXG.Text} el Reference to an {@link JXG.Text} object, that has to be updated.
         * @see Text
         * @see JXG.Text
         * @see JXG.AbstractRenderer#drawInternalText
         * @see JXG.AbstractRenderer#drawText
         * @see JXG.AbstractRenderer#updateText
         * @see JXG.AbstractRenderer#updateTextStyle
         */ updateInternalText: function(el) {},
    /**
         * Displays a {@link JXG.Text} on the {@link JXG.Board} by putting a HTML div over it.
         * @param {JXG.Text} el Reference to an {@link JXG.Text} object, that has to be displayed
         * @see Text
         * @see JXG.Text
         * @see JXG.AbstractRenderer#drawInternalText
         * @see JXG.AbstractRenderer#updateText
         * @see JXG.AbstractRenderer#updateInternalText
         * @see JXG.AbstractRenderer#updateTextStyle
         */ drawText: function(el) {
        var node, z, level, ev_visible;
        if (el.evalVisProp('display') === "html" && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isBrowser && this.type !== "no") {
            node = this.container.ownerDocument.createElement("div");
            //node = this.container.ownerDocument.createElementNS('http://www.w3.org/1999/xhtml', 'div'); //
            node.style.position = "absolute";
            node.className = el.evalVisProp('cssclass');
            level = el.evalVisProp('layer');
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(level)) {
                // trace nodes have level not set
                level = 0;
            }
            if (this.container.style.zIndex === "") {
                z = 0;
            } else {
                z = parseInt(this.container.style.zIndex, 10);
            }
            node.style.zIndex = z + level;
            this.container.appendChild(node);
            node.setAttribute("id", this.container.id + "_" + el.id);
        } else {
            node = this.drawInternalText(el);
        }
        el.rendNode = node;
        el.htmlStr = "";
        // Set el.visPropCalc.visible
        if (el.visProp.islabel && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(el.visProp.anchor)) {
            ev_visible = el.visProp.anchor.evalVisProp('visible');
            el.prepareUpdate().updateVisibility(ev_visible);
        } else {
            el.prepareUpdate().updateVisibility();
        }
        this.updateText(el);
    },
    /**
         * Updates visual properties of an already existing {@link JXG.Text} element.
         * @param {JXG.Text} el Reference to an {@link JXG.Text} object, that has to be updated.
         * @see Text
         * @see JXG.Text
         * @see JXG.AbstractRenderer#drawText
         * @see JXG.AbstractRenderer#drawInternalText
         * @see JXG.AbstractRenderer#updateInternalText
         * @see JXG.AbstractRenderer#updateTextStyle
         */ updateText: function(el) {
        var content = el.plaintext, v, c, parentNode, node, // scale, vshift,
        // id, wrap_id,
        ax, ay, angle, co, si, to_h, to_v;
        if (el.visPropCalc.visible) {
            this.updateTextStyle(el, false);
            if (el.evalVisProp('display') === "html" && this.type !== "no") {
                // Set the position
                if (!isNaN(el.coords.scrCoords[1] + el.coords.scrCoords[2])) {
                    // Horizontal
                    c = el.coords.scrCoords[1];
                    // webkit seems to fail for extremely large values for c.
                    c = Math.abs(c) < 1000000 ? c : 1000000;
                    ax = el.getAnchorX();
                    if (ax === "right") {
                        // v = Math.floor(el.board.canvasWidth - c);
                        v = el.board.canvasWidth - c;
                        to_h = "right";
                    } else if (ax === "middle") {
                        // v = Math.floor(c - 0.5 * el.size[0]);
                        v = c - 0.5 * el.size[0];
                        to_h = "center";
                    } else {
                        // 'left'
                        // v = Math.floor(c);
                        v = c;
                        to_h = "left";
                    }
                    // This may be useful for foreignObj.
                    //if (window.devicePixelRatio !== undefined) {
                    //v *= window.devicePixelRatio;
                    //}
                    if (el.visPropOld.left !== ax + v) {
                        if (ax === "right") {
                            el.rendNode.style.right = v + "px";
                            el.rendNode.style.left = "auto";
                        } else {
                            el.rendNode.style.left = v + "px";
                            el.rendNode.style.right = "auto";
                        }
                        el.visPropOld.left = ax + v;
                    }
                    // Vertical
                    c = el.coords.scrCoords[2] + this.vOffsetText;
                    c = Math.abs(c) < 1000000 ? c : 1000000;
                    ay = el.getAnchorY();
                    if (ay === "bottom") {
                        // v = Math.floor(el.board.canvasHeight - c);
                        v = el.board.canvasHeight - c;
                        to_v = "bottom";
                    } else if (ay === "middle") {
                        // v = Math.floor(c - 0.5 * el.size[1]);
                        v = c - 0.5 * el.size[1];
                        to_v = "center";
                    } else {
                        // top
                        // v = Math.floor(c);
                        v = c;
                        to_v = "top";
                    }
                    // This may be useful for foreignObj.
                    //if (window.devicePixelRatio !== undefined) {
                    //v *= window.devicePixelRatio;
                    //}
                    if (el.visPropOld.top !== ay + v) {
                        if (ay === "bottom") {
                            el.rendNode.style.top = "auto";
                            el.rendNode.style.bottom = v + "px";
                        } else {
                            el.rendNode.style.bottom = "auto";
                            el.rendNode.style.top = v + "px";
                        }
                        el.visPropOld.top = ay + v;
                    }
                }
                // Set the content
                if (el.htmlStr !== content) {
                    try {
                        if (el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_BUTTON) {
                            el.rendNodeButton.innerHTML = content;
                        } else if (el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_CHECKBOX || el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_INPUT) {
                            el.rendNodeLabel.innerHTML = content;
                        } else {
                            el.rendNode.innerHTML = content;
                        }
                    } catch (e) {
                        // Setting innerHTML sometimes fails in IE8.
                        // A workaround is to take the node off the DOM, assign innerHTML,
                        // then append back.
                        // Works for text elements as they are absolutely positioned.
                        parentNode = el.rendNode.parentNode;
                        el.rendNode.parentNode.removeChild(el.rendNode);
                        el.rendNode.innerHTML = content;
                        parentNode.appendChild(el.rendNode);
                    }
                    el.htmlStr = content;
                    if (el.evalVisProp('usemathjax')) {
                        // Typesetting directly might not work because MathJax was not loaded completely
                        try {
                            if (MathJax.typeset) {
                                // Version 3
                                MathJax.typeset([
                                    el.rendNode
                                ]);
                            } else {
                                // Version 2
                                MathJax.Hub.Queue([
                                    "Typeset",
                                    MathJax.Hub,
                                    el.rendNode
                                ]);
                            }
                        // Obsolete:
                        // // Restore the transformation necessary for fullscreen mode
                        // // MathJax removes it when handling dynamic content
                        // id = el.board.container;
                        // wrap_id = "fullscreenwrap_" + id;
                        // if (document.getElementById(wrap_id)) {
                        //     scale = el.board.containerObj._cssFullscreenStore.scale;
                        //     vshift = el.board.containerObj._cssFullscreenStore.vshift;
                        //     Env.scaleJSXGraphDiv(
                        //         "#" + wrap_id,
                        //         "#" + id,
                        //         scale,
                        //         vshift
                        //     );
                        // }
                        } catch (e) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug("MathJax (not yet) loaded");
                        }
                    } else if (el.evalVisProp('usekatex')) {
                        try {
                            // Checkboxes et. al. do not possess rendNodeLabel during the first update.
                            // In this case node will be undefined and not rendered by KaTeX.
                            if (el.rendNode.innerHTML.indexOf('<span') === 0 && el.rendNode.innerHTML.indexOf('<label') > 0 && (el.rendNode.innerHTML.indexOf('<checkbox') > 0 || el.rendNode.innerHTML.indexOf('<input') > 0)) {
                                node = el.rendNodeLabel;
                            } else if (el.rendNode.innerHTML.indexOf('<button') === 0) {
                                node = el.rendNodeButton;
                            } else {
                                node = el.rendNode;
                            }
                            if (node) {
                                /* eslint-disable no-undef */ katex.render(content, node, {
                                    macros: el.evalVisProp('katexmacros'),
                                    throwOnError: false
                                });
                            /* eslint-enable no-undef */ }
                        } catch (e) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug("KaTeX not loaded (yet)");
                        }
                    } else if (el.evalVisProp('useasciimathml')) {
                        // This is not a constructor.
                        // See http://asciimath.org/ for more information
                        // about AsciiMathML and the project's source code.
                        try {
                            AMprocessNode(el.rendNode, false);
                        } catch (e) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug("AsciiMathML not loaded (yet)");
                        }
                    }
                }
                angle = el.evalVisProp('rotate');
                if (angle !== 0) {
                    // Don't forget to convert to rad
                    angle *= Math.PI / 180;
                    co = Math.cos(angle);
                    si = Math.sin(angle);
                    el.rendNode.style['transform'] = 'matrix(' + [
                        co,
                        -1 * si,
                        si,
                        co,
                        0,
                        0
                    ].join(',') + ')';
                    el.rendNode.style['transform-origin'] = to_h + ' ' + to_v;
                }
                this.transformRect(el, el.transformations);
            } else {
                this.updateInternalText(el);
            }
        }
    },
    /**
         * Converts string containing CSS properties into
         * array with key-value pair objects.
         *
         * @example
         * "color:blue; background-color:yellow" is converted to
         * [{'color': 'blue'}, {'backgroundColor': 'yellow'}]
         *
         * @param  {String} cssString String containing CSS properties
         * @return {Array}           Array of CSS key-value pairs
         */ _css2js: function(cssString) {
        var pairs = [], i, len, key, val, s, list = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].trim(cssString).replace(/;$/, "").split(";");
        len = list.length;
        for(i = 0; i < len; ++i){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].trim(list[i]) !== "") {
                s = list[i].split(":");
                key = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].trim(s[0].replace(/-([a-z])/gi, function(match, char) {
                    return char.toUpperCase();
                }));
                val = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].trim(s[1]);
                pairs.push({
                    key: key,
                    val: val
                });
            }
        }
        return pairs;
    },
    /**
         * Updates font-size, color and opacity properties and CSS style properties of a {@link JXG.Text} node.
         * This function is also called by highlight() and nohighlight().
         * @param {JXG.Text} el Reference to the {@link JXG.Text} object, that has to be updated.
         * @param {Boolean} doHighlight
         * @see Text
         * @see JXG.Text
         * @see JXG.AbstractRenderer#drawText
         * @see JXG.AbstractRenderer#drawInternalText
         * @see JXG.AbstractRenderer#updateText
         * @see JXG.AbstractRenderer#updateInternalText
         * @see JXG.AbstractRenderer#updateInternalTextStyle
         */ updateTextStyle: function(el, doHighlight) {
        var fs, so, sc, css, node, display = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isBrowser ? el.visProp.display : "internal", nodeList = [
            "rendNode",
            "rendNodeTag",
            "rendNodeLabel"
        ], lenN = nodeList.length, fontUnit = el.evalVisProp('fontunit'), cssList, prop, style, cssString, styleList = [
            "cssdefaultstyle",
            "cssstyle"
        ], lenS = styleList.length;
        if (doHighlight) {
            sc = el.evalVisProp('highlightstrokecolor');
            so = el.evalVisProp('highlightstrokeopacity');
            css = el.evalVisProp('highlightcssclass');
        } else {
            sc = el.evalVisProp('strokecolor');
            so = el.evalVisProp('strokeopacity');
            css = el.evalVisProp('cssclass');
        }
        // This part is executed for all text elements except internal texts in canvas.
        // HTML-texts or internal texts in SVG or VML.
        //            HTML    internal
        //  SVG        +         +
        //  VML        +         +
        //  canvas     +         -
        //  no         -         -
        if (this.type !== "no" && (display === "html" || this.type !== "canvas")) {
            for(style = 0; style < lenS; style++){
                // First set cssString to
                // ev.cssdefaultstyle of ev.highlightcssdefaultstyle,
                // then to
                // ev.cssstyle of ev.highlightcssstyle
                cssString = el.evalVisProp((doHighlight ? 'highlight' : '') + styleList[style]);
                // Set the CSS style properties - without deleting other properties
                for(node = 0; node < lenN; node++){
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(el[nodeList[node]])) {
                        if (cssString !== "" && el.visPropOld[styleList[style] + '_' + node] !== cssString) {
                            cssList = this._css2js(cssString);
                            for(prop in cssList){
                                if (cssList.hasOwnProperty(prop)) {
                                    el[nodeList[node]].style[cssList[prop].key] = cssList[prop].val;
                                }
                            }
                            el.visPropOld[styleList[style] + '_' + node] = cssString;
                        }
                    }
                // el.visPropOld[styleList[style]] = cssString;
                }
            }
            fs = el.evalVisProp('fontsize');
            if (el.visPropOld.fontsize !== fs) {
                el.needsSizeUpdate = true;
                try {
                    for(node = 0; node < lenN; node++){
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(el[nodeList[node]])) {
                            el[nodeList[node]].style.fontSize = fs + fontUnit;
                        }
                    }
                } catch (e) {
                    // IE needs special treatment.
                    for(node = 0; node < lenN; node++){
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(el[nodeList[node]])) {
                            el[nodeList[node]].style.fontSize = fs;
                        }
                    }
                }
                el.visPropOld.fontsize = fs;
            }
        }
        this.setTabindex(el);
        this.setObjectTransition(el);
        if (display === "html" && this.type !== "no") {
            // Set new CSS class
            if (el.visPropOld.cssclass !== css) {
                el.rendNode.className = css;
                el.visPropOld.cssclass = css;
                el.needsSizeUpdate = true;
            }
            this.setObjectStrokeColor(el, sc, so);
        } else {
            this.updateInternalTextStyle(el, sc, so);
        }
        if (el.evalVisProp('aria.enabled')) {
            this.setARIA(el);
        }
        return this;
    },
    /**
         * Set color and opacity of internal texts.
         * This method is used for Canvas and VML.
         * SVG needs its own version.
         * @private
         * @see JXG.AbstractRenderer#updateTextStyle
         * @see JXG.SVGRenderer#updateInternalTextStyle
         */ updateInternalTextStyle: function(el, strokeColor, strokeOpacity) {
        this.setObjectStrokeColor(el, strokeColor, strokeOpacity);
    },
    /* ********* Image related stuff *********** */ /**
         * Draws an {@link JXG.Image} on a board; This is just a template that has to be implemented by special
         * renderers.
         * @param {JXG.Image} el Reference to the image object that is to be drawn
         * @see Image
         * @see JXG.Image
         * @see JXG.AbstractRenderer#updateImage
         */ drawImage: function(el) {},
    /**
         * Updates the properties of an {@link JXG.Image} element.
         * @param {JXG.Image} el Reference to an {@link JXG.Image} object, that has to be updated.
         * @see Image
         * @see JXG.Image
         * @see JXG.AbstractRenderer#drawImage
         */ updateImage: function(el) {
        this.updateRectPrim(el.rendNode, el.coords.scrCoords[1], el.coords.scrCoords[2] - el.size[1], el.size[0], el.size[1]);
        this.updateImageURL(el);
        this.transformRect(el, el.transformations);
        this._updateVisual(el, {
            stroke: true,
            dash: true
        }, true);
    },
    /**
         * Multiplication of transformations without updating. That means, at that point it is expected that the
         * matrices contain numbers only. First, the origin in user coords is translated to <tt>(0,0)</tt> in screen
         * coords. Then, the stretch factors are divided out. After the transformations in user coords, the stretch
         * factors are multiplied in again, and the origin in user coords is translated back to its position. This
         * method does not have to be implemented in a new renderer.
         * @param {JXG.GeometryElement} el A JSXGraph element. We only need its board property.
         * @param {Array} transformations An array of JXG.Transformations.
         * @returns {Array} A matrix represented by a two dimensional array of numbers.
         * @see JXG.AbstractRenderer#transformRect
         */ joinTransforms: function(el, transformations) {
        var i, ox = el.board.origin.scrCoords[1], oy = el.board.origin.scrCoords[2], ux = el.board.unitX, uy = el.board.unitY, len = transformations.length, // Translate to 0,0 in screen coords and then scale
        m = [
            [
                1,
                0,
                0
            ],
            [
                -ox / ux,
                1 / ux,
                0
            ],
            [
                oy / uy,
                0,
                -1 / uy
            ]
        ];
        for(i = 0; i < len; i++){
            m = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matMatMult(transformations[i].matrix, m);
        }
        // Scale back and then translate back
        m = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matMatMult([
            [
                1,
                0,
                0
            ],
            [
                ox,
                ux,
                0
            ],
            [
                oy,
                0,
                -uy
            ]
        ], m);
        return m;
    },
    /**
         * Applies transformations on images and text elements. This method has to implemented in
         * all descendant classes where text and image transformations are to be supported.
         * <p>
         * Only affine transformation are supported, no proper projective transformations. This means, the
         * respective entries of the transformation matrix are simply ignored.
         *
         * @param {JXG.Image|JXG.Text} el A {@link JXG.Image} or {@link JXG.Text} object.
         * @param {Array} transformations An array of {@link JXG.Transformation} objects. This is usually the
         * transformations property of the given element <tt>el</tt>.
         */ transformRect: function(el, transformations) {},
    /**
         * If the URL of the image is provided by a function the URL has to be updated during updateImage()
         * @param {JXG.Image} el Reference to an image object.
         * @see JXG.AbstractRenderer#updateImage
         */ updateImageURL: function(el) {},
    /**
         * Updates CSS style properties of a {@link JXG.Image} node.
         * In SVGRenderer opacity is the only available style element.
         * This function is called by highlight() and nohighlight().
         * This function works for VML.
         * It does not work for Canvas.
         * SVGRenderer overwrites this method.
         * @param {JXG.Text} el Reference to the {@link JXG.Image} object, that has to be updated.
         * @param {Boolean} doHighlight
         * @see Image
         * @see JXG.Image
         * @see JXG.AbstractRenderer#highlight
         * @see JXG.AbstractRenderer#noHighlight
         */ updateImageStyle: function(el, doHighlight) {
        el.rendNode.className = el.evalVisProp(doHighlight ? 'highlightcssclass' : 'cssclass');
    },
    drawForeignObject: function(el) {},
    updateForeignObject: function(el) {
    /* stub */ },
    /* ********* Render primitive objects *********** */ /**
         * Appends a node to a specific layer level. This is just an abstract method and has to be implemented
         * in all renderers that want to use the <tt>createPrim</tt> model to draw.
         * @param {Node} node A DOM tree node.
         * @param {Number} level The layer the node is attached to. This is the index of the layer in
         * {@link JXG.SVGRenderer#layer} or the <tt>z-index</tt> style property of the node in VMLRenderer.
         */ appendChildPrim: function(node, level) {},
    /**
         * Stores the rendering nodes. This is an abstract method which has to be implemented in all renderers that use
         * the <tt>createPrim</tt> method.
         * @param {JXG.GeometryElement} el A JSXGraph element.
         * @param {String} type The XML node name. Only used in VMLRenderer.
         */ appendNodesToElement: function(el, type) {},
    /**
         * Creates a node of a given type with a given id.
         * @param {String} type The type of the node to create.
         * @param {String} id Set the id attribute to this.
         * @returns {Node} Reference to the created node.
         */ createPrim: function(type, id) {
        return null;
    },
    /**
         * Removes an element node. Just a stub.
         * @param {Node} node The node to remove.
         */ remove: function(node) {},
    /**
         * Can be used to create the nodes to display arrows. This is an abstract method which has to be implemented
         * in any descendant renderer.
         * @param {JXG.GeometryElement} el The element the arrows are to be attached to.
         * @param {Object} arrowData Data concerning possible arrow heads
         *
         */ makeArrows: function(el, arrowData) {},
    /**
         * Updates width of an arrow DOM node. Used in
         * @param {Node} node The arrow node.
         * @param {Number} width
         * @param {Node} parentNode Used in IE only
         */ _setArrowWidth: function(node, width, parentNode) {},
    /**
         * Updates an ellipse node primitive. This is an abstract method which has to be implemented in all renderers
         * that use the <tt>createPrim</tt> method.
         * @param {Node} node Reference to the node.
         * @param {Number} x Centre X coordinate
         * @param {Number} y Centre Y coordinate
         * @param {Number} rx The x-axis radius.
         * @param {Number} ry The y-axis radius.
         */ updateEllipsePrim: function(node, x, y, rx, ry) {},
    /**
         * Refreshes a line node. This is an abstract method which has to be implemented in all renderers that use
         * the <tt>createPrim</tt> method.
         * @param {Node} node The node to be refreshed.
         * @param {Number} p1x The first point's x coordinate.
         * @param {Number} p1y The first point's y coordinate.
         * @param {Number} p2x The second point's x coordinate.
         * @param {Number} p2y The second point's y coordinate.
         * @param {JXG.Board} board
         */ updateLinePrim: function(node, p1x, p1y, p2x, p2y, board) {},
    /**
         * Updates a path element. This is an abstract method which has to be implemented in all renderers that use
         * the <tt>createPrim</tt> method.
         * @param {Node} node The path node.
         * @param {String} pathString A string formatted like e.g. <em>'M 1,2 L 3,1 L5,5'</em>. The format of the string
         * depends on the rendering engine.
         * @param {JXG.Board} board Reference to the element's board.
         */ updatePathPrim: function(node, pathString, board) {},
    /**
         * Builds a path data string to draw a point with a face other than <em>rect</em> and <em>circle</em>. Since
         * the format of such a string usually depends on the renderer this method
         * is only an abstract method. Therefore, it has to be implemented in the descendant renderer itself unless
         * the renderer does not use the createPrim interface but the draw* interfaces to paint.
         * @param {JXG.Point} el The point element
         * @param {Number} size A positive number describing the size. Usually the half of the width and height of
         * the drawn point.
         * @param {String} type A string describing the point's face. This method only accepts the shortcut version of
         * each possible face: <tt>x, +, |, -, [], <>, <<>>,^, v, >, < </tt>
         */ updatePathStringPoint: function(el, size, type) {},
    /**
         * Builds a path data string from a {@link JXG.Curve} element. Since the path data strings heavily depend on the
         * underlying rendering technique this method is just a stub. Although such a path string is of no use for the
         * CanvasRenderer, this method is used there to draw a path directly.
         * @param {JXG.GeometryElement} el
         */ updatePathStringPrim: function(el) {},
    /**
         * Builds a path data string from a {@link JXG.Curve} element such that the curve looks like hand drawn. Since
         * the path data strings heavily depend on the underlying rendering technique this method is just a stub.
         * Although such a path string is of no use for the CanvasRenderer, this method is used there to draw a path
         * directly.
         * @param  {JXG.GeometryElement} el
         */ updatePathStringBezierPrim: function(el) {},
    /**
         * Update a polygon primitive.
         * @param {Node} node
         * @param {JXG.Polygon} el A JSXGraph element of type {@link JXG.Polygon}
         */ updatePolygonPrim: function(node, el) {},
    /**
         * Update a rectangle primitive. This is used only for points with face of type 'rect'.
         * @param {Node} node The node yearning to be updated.
         * @param {Number} x x coordinate of the top left vertex.
         * @param {Number} y y coordinate of the top left vertex.
         * @param {Number} w Width of the rectangle.
         * @param {Number} h The rectangle's height.
         */ updateRectPrim: function(node, x, y, w, h) {},
    /* ********* Set attributes *********** */ /**
         * Shows or hides an element on the canvas; Only a stub, requires implementation in the derived renderer.
         * @param {JXG.GeometryElement} el Reference to the object that has to appear.
         * @param {Boolean} value true to show the element, false to hide the element.
         */ display: function(el, value) {
        if (el) {
            el.visPropOld.visible = value;
        }
    },
    /**
         * Hides an element on the canvas; Only a stub, requires implementation in the derived renderer.
         *
         * Please use JXG.AbstractRenderer#display instead
         * @param {JXG.GeometryElement} el Reference to the geometry element that has to disappear.
         * @see JXG.AbstractRenderer#show
         * @deprecated
         */ hide: function(el) {},
    /**
         * Highlights an object, i.e. changes the current colors of the object to its highlighting colors
         * and highlighting strokewidth.
         * @param {JXG.GeometryElement} el Reference of the object that will be highlighted.
         * @param {Boolean} [suppressHighlightStrokeWidth=undefined] If undefined or false, highlighting also changes strokeWidth. This might not be
         * the cases for polygon borders. Thus, if a polygon is highlighted, its polygon borders change strokeWidth only if the polygon attribute
         * highlightByStrokeWidth == true.
         * @returns {JXG.AbstractRenderer} Reference to the renderer
         * @see JXG.AbstractRenderer#updateTextStyle
         */ highlight: function(el, suppressHighlightStrokeWidth) {
        var i, do_hl, sw;
        this.setObjectTransition(el);
        if (!el.visProp.draft) {
            if (el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON) {
                this.setObjectFillColor(el, el.evalVisProp('highlightfillcolor'), el.evalVisProp('highlightfillopacity'));
                do_hl = el.evalVisProp('highlightbystrokewidth');
                for(i = 0; i < el.borders.length; i++){
                    this.highlight(el.borders[i], !do_hl);
                }
            } else {
                if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_TEXT) {
                    this.updateTextStyle(el, true);
                } else if (el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_IMAGE) {
                    this.updateImageStyle(el, true);
                    this.setObjectFillColor(el, el.evalVisProp('highlightfillcolor'), el.evalVisProp('highlightfillopacity'));
                } else {
                    this.setObjectStrokeColor(el, el.evalVisProp('highlightstrokecolor'), el.evalVisProp('highlightstrokeopacity'));
                    this.setObjectFillColor(el, el.evalVisProp('highlightfillcolor'), el.evalVisProp('highlightfillopacity'));
                }
            }
            // Highlight strokeWidth is suppressed if
            // parameter suppressHighlightStrokeWidth is false or undefined.
            // suppressHighlightStrokeWidth is false if polygon attribute
            // highlightbystrokewidth is true.
            if (!suppressHighlightStrokeWidth && el.evalVisProp('highlightstrokewidth')) {
                sw = Math.max(el.evalVisProp('highlightstrokewidth'), el.evalVisProp('strokewidth'));
                this.setObjectStrokeWidth(el, sw);
                if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE || el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE) {
                    this.updatePathWithArrowHeads(el, true);
                }
            }
        }
        this.setCssClass(el, el.evalVisProp('highlightcssclass'));
        return this;
    },
    /**
         * Uses the normal colors of an object, i.e. the opposite of {@link JXG.AbstractRenderer#highlight}.
         * @param {JXG.GeometryElement} el Reference of the object that will get its normal colors.
         * @returns {JXG.AbstractRenderer} Reference to the renderer
         * @see JXG.AbstractRenderer#updateTextStyle
         */ noHighlight: function(el) {
        var i, sw;
        this.setObjectTransition(el);
        if (!el.evalVisProp('draft')) {
            if (el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON) {
                this.setObjectFillColor(el, el.evalVisProp('fillcolor'), el.evalVisProp('fillopacity'));
                for(i = 0; i < el.borders.length; i++){
                    this.noHighlight(el.borders[i]);
                }
            } else {
                if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_TEXT) {
                    this.updateTextStyle(el, false);
                } else if (el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_IMAGE) {
                    this.updateImageStyle(el, false);
                    this.setObjectFillColor(el, el.evalVisProp('fillcolor'), el.evalVisProp('fillopacity'));
                } else {
                    this.setObjectStrokeColor(el, el.evalVisProp('strokecolor'), el.evalVisProp('strokeopacity'));
                    this.setObjectFillColor(el, el.evalVisProp('fillcolor'), el.evalVisProp('fillopacity'));
                }
            }
            sw = el.evalVisProp('strokewidth');
            this.setObjectStrokeWidth(el, sw);
            if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE || el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE) {
                this.updatePathWithArrowHeads(el, false);
            }
        }
        this.setCssClass(el, el.evalVisProp('cssclass'));
        return this;
    },
    /**
         * Puts an object from draft mode back into normal mode.
         * @param {JXG.GeometryElement} el Reference of the object that no longer is in draft mode.
         */ removeDraft: function(el) {
        this.setObjectTransition(el);
        if (el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON) {
            this.setObjectFillColor(el, el.evalVisProp('fillcolor'), el.evalVisProp('fillopacity'));
        } else {
            if (el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_POINT) {
                this.setObjectFillColor(el, el.evalVisProp('fillcolor'), el.evalVisProp('fillopacity'));
            }
            this.setObjectStrokeColor(el, el.evalVisProp('strokecolor'), el.evalVisProp('strokeopacity'));
            this.setObjectStrokeWidth(el, el.evalVisProp('strokewidth'));
        }
    },
    /**
         * Set ARIA related properties of an element. The attribute "aria" of an element contains at least the
         * properties "enabled", "label", and "live". Additionally, all available properties from
         * {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA} may be set.
         * <p>
         * In JSXGraph, the available properties are used without the leading 'aria-'.
         * For example, the value of the JSXGraph attribute 'aria.label' will be set to the
         * HTML attribute 'aria-label'.
         *
         * @param {JXG.GeometryElement} el Reference of the object that wants new
         *        ARIA attributes.
         */ setARIA: function(el) {},
    /**
         * Sets the buffering as recommended by SVGWG. Until now only Opera supports this and will be ignored by other
         * browsers. Although this feature is only supported by SVG we have this method in {@link JXG.AbstractRenderer}
         * because it is called from outside the renderer.
         * @param {Node} node The SVG DOM Node which buffering type to update.
         * @param {String} type Either 'auto', 'dynamic', or 'static'. For an explanation see
         *   {@link https://www.w3.org/TR/SVGTiny12/painting.html#BufferedRenderingProperty}.
         */ setBuffering: function(node, type) {},
    /**
         * Sets CSS classes for elements (relevant for SVG only).
         *
         * @param {JXG.GeometryElement} el Reference of the object that wants a
         *         new set of CSS classes.
         * @param {String} cssClass String containing a space separated list of CSS classes.
         */ setCssClass: function(el, cssClass) {},
    /**
         * Sets an element's dash style.
         * @param {JXG.GeometryElement} el An JSXGraph element.
         */ setDashStyle: function(el) {},
    /**
         * Puts an object into draft mode, i.e. it's visual appearance will be changed. For GEONE<sub>x</sub>T backwards
         * compatibility.
         * @param {JXG.GeometryElement} el Reference of the object that is in draft mode.
         */ setDraft: function(el) {
        if (!el.evalVisProp('draft')) {
            return;
        }
        var draftColor = el.board.options.elements.draft.color, draftOpacity = el.board.options.elements.draft.opacity;
        this.setObjectTransition(el);
        if (el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POLYGON) {
            this.setObjectFillColor(el, draftColor, draftOpacity);
        } else {
            if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_POINT) {
                this.setObjectFillColor(el, draftColor, draftOpacity);
            } else {
                this.setObjectFillColor(el, "none", 0);
            }
            this.setObjectStrokeColor(el, draftColor, draftOpacity);
            this.setObjectStrokeWidth(el, el.board.options.elements.draft.strokeWidth);
        }
    },
    /**
         * Sets up nodes for rendering a gradient fill.
         * @param {JXG.GeometryElement}  el Reference of the object which gets the gradient
         */ setGradient: function(el) {},
    /**
         * Move element into new layer. This is trivial for canvas, but needs more effort in SVG.
         * Does not work dynamically, i.e. if level is a function.
         *
         * @param {JXG.GeometryElement} el Element which is put into different layer
         * @param {Number} value Layer number
         * @private
         */ setLayer: function(el, level) {},
    /**
         * Sets an objects fill color.
         * @param {JXG.GeometryElement} el Reference of the object that wants a new fill color.
         * @param {String} color Color in a HTML/CSS compatible format. If you don't want any fill color at all, choose
         * 'none'.
         * @param {Number} opacity Opacity of the fill color. Must be between 0 and 1.
         */ setObjectFillColor: function(el, color, opacity) {},
    /**
         * Changes an objects stroke color to the given color.
         * @param {JXG.GeometryElement} el Reference of the {@link JXG.GeometryElement} that gets a new stroke
         * color.
         * @param {String} color Color value in a HTML compatible format, e.g. <strong>#00ff00</strong> or
         * <strong>green</strong> for green.
         * @param {Number} opacity Opacity of the fill color. Must be between 0 and 1.
         */ setObjectStrokeColor: function(el, color, opacity) {},
    /**
         * Sets an element's stroke width.
         * @param {JXG.GeometryElement} el Reference to the geometry element.
         * @param {Number} width The new stroke width to be assigned to the element.
         */ setObjectStrokeWidth: function(el, width) {},
    /**
         * Sets the transition duration (in milliseconds) for fill color and stroke
         * color and opacity.
         * @param {JXG.GeometryElement} el Reference of the object that wants a
         *         new transition duration.
         * @param {Number} duration (Optional) duration in milliseconds. If not given,
         *        element.visProp.transitionDuration is taken. This is the default.
         */ setObjectTransition: function(el, duration) {},
    /**
         * Sets a node's attribute.
         * @param {Node} node The node that is to be updated.
         * @param {String} key Name of the attribute.
         * @param {String} val New value for the attribute.
         */ setPropertyPrim: function(node, key, val) {},
    /**
         * Sets the shadow properties to a geometry element. This method is only a stub, it is implemented in the actual
         * renderers.
         * @param {JXG.GeometryElement} el Reference to a geometry object, that should get a shadow
         */ setShadow: function(el) {},
    /**
         * Set the attribute `tabindex` to the attribute `tabindex` of an element.
         * This is only relevant for the SVG renderer.
         *
         * @param {JXG.GeometryElement} el
         */ setTabindex: function(el) {},
    /**
         * Shows a hidden element on the canvas; Only a stub, requires implementation in the derived renderer.
         *
         * Please use JXG.AbstractRenderer#display instead
         * @param {JXG.GeometryElement} el Reference to the object that has to appear.
         * @see JXG.AbstractRenderer#hide
         * @deprecated
         */ show: function(el) {},
    /**
         * Updates the gradient fill.
         * @param {JXG.GeometryElement} el An JSXGraph element with an area that can be filled.
         */ updateGradient: function(el) {},
    /* ********* Renderer control *********** */ /**
         * Stop redraw. This method is called before every update, so a non-vector-graphics based renderer can use this
         * method to delete the contents of the drawing panel. This is an abstract method every descendant renderer
         * should implement, if appropriate.
         * @see JXG.AbstractRenderer#unsuspendRedraw
         */ suspendRedraw: function() {},
    /**
         * Restart redraw. This method is called after updating all the rendering node attributes.
         * @see JXG.AbstractRenderer#suspendRedraw
         */ unsuspendRedraw: function() {},
    /**
         * The tiny zoom bar shown on the bottom of a board (if board attribute "showNavigation" is true).
         * It is a div element and gets the CSS class "JXG_navigation" and the id {board id}_navigationbar.
         * <p>
         * The buttons get the CSS class "JXG_navigation_button" and the id {board_id}_name where name is
         * one of [top, down, left, right, out, 100, in, fullscreen, screenshot, reload, cleartraces].
         * <p>
         * The symbols for zoom, navigation and reload are hard-coded.
         *
         * @param {JXG.Board} board Reference to a JSXGraph board.
         * @param {Object} attr Attributes of the navigation bar
         * @private
         */ drawNavigationBar: function(board, attr) {
        var doc, node, cancelbubble = function(e) {
            if (!e) {
                e = window.event;
            }
            if (e.stopPropagation) {
                // Non IE<=8
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
        }, createButton = function(label, handler, board_id, type) {
            var button;
            board_id = board_id || "";
            button = doc.createElement("span");
            button.innerHTML = label; // button.appendChild(doc.createTextNode(label));
            // Style settings are superseded by adding the CSS class below
            button.style.paddingLeft = "7px";
            button.style.paddingRight = "7px";
            if (button.classList !== undefined) {
                // classList not available in IE 9
                button.classList.add("JXG_navigation_button");
                button.classList.add("JXG_navigation_button_" + type);
            }
            // button.setAttribute('tabindex', 0);
            button.setAttribute("id", board_id + '_navigation_' + type);
            button.setAttribute("aria-hidden", 'true'); // navigation buttons should never appear in screen reader
            node.appendChild(button);
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].addEvent(button, "click", function(e) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bind(handler, board)();
                return false;
            }, board);
            // prevent the click from bubbling down to the board
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].addEvent(button, "pointerup", cancelbubble, board);
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].addEvent(button, "pointerdown", cancelbubble, board);
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].addEvent(button, "pointerleave", cancelbubble, board);
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].addEvent(button, "mouseup", cancelbubble, board);
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].addEvent(button, "mousedown", cancelbubble, board);
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].addEvent(button, "touchend", cancelbubble, board);
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].addEvent(button, "touchstart", cancelbubble, board);
        };
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isBrowser && this.type !== "no") {
            doc = board.containerObj.ownerDocument;
            node = doc.createElement("div");
            node.setAttribute("id", board.container + "_navigationbar");
            // Style settings are superseded by adding the CSS class below
            node.style.color = attr.strokecolor;
            node.style.backgroundColor = attr.fillcolor;
            node.style.padding = attr.padding;
            node.style.position = attr.position;
            node.style.fontSize = attr.fontsize;
            node.style.cursor = attr.cursor;
            node.style.zIndex = attr.zindex;
            board.containerObj.appendChild(node);
            node.style.right = attr.right;
            node.style.bottom = attr.bottom;
            if (node.classList !== undefined) {
                // classList not available in IE 9
                node.classList.add("JXG_navigation");
            }
            // For XHTML we need unicode instead of HTML entities
            if (board.attr.showfullscreen) {
                createButton(board.attr.fullscreen.symbol, function() {
                    board.toFullscreen(board.attr.fullscreen.id);
                }, board.container, "fullscreen");
            }
            if (board.attr.showscreenshot) {
                createButton(board.attr.screenshot.symbol, function() {
                    window.setTimeout(function() {
                        board.renderer.screenshot(board, "", false);
                    }, 330);
                }, board.container, "screenshot");
            }
            if (board.attr.showreload) {
                // full reload circle: \u27F2
                // the board.reload() method does not exist during the creation
                // of this button. That's why this anonymous function wrapper is required.
                createButton("\u21BB", function() {
                    board.reload();
                }, board.container, "reload");
            }
            if (board.attr.showcleartraces) {
                // clear traces symbol (otimes): \u27F2
                createButton("\u2297", function() {
                    board.clearTraces();
                }, board.container, "cleartraces");
            }
            if (board.attr.shownavigation) {
                if (board.attr.showzoom) {
                    createButton("\u2013", board.zoomOut, board.container, "out");
                    createButton("o", board.zoom100, board.container, "100");
                    createButton("+", board.zoomIn, board.container, "in");
                }
                createButton("\u2190", board.clickLeftArrow, board.container, "left");
                createButton("\u2193", board.clickUpArrow, board.container, "down"); // Down arrow
                createButton("\u2191", board.clickDownArrow, board.container, "up"); // Up arrow
                createButton("\u2192", board.clickRightArrow, board.container, "right");
            }
        }
    },
    /**
         * Wrapper for getElementById for maybe other renderers which elements are not directly accessible by DOM
         * methods like document.getElementById().
         * @param {String} id Unique identifier for element.
         * @returns {Object} Reference to a JavaScript object. In case of SVG/VMLRenderer it's a reference to a SVG/VML node.
         */ getElementById: function(id) {
        var str;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.container)) {
            // Use querySelector over getElementById for compatibility with both 'regular' document
            // and ShadowDOM fragments.
            str = this.container.id + '_' + id;
            // Mask special symbols like '/' and '\' in id
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(CSS) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(CSS.escape)) {
                str = CSS.escape(str);
            }
            return this.container.querySelector('#' + str);
        }
        return "";
    },
    /**
         * Remove an element and provide a function that inserts it into its original position. This method
         * is taken from this article {@link https://developers.google.com/speed/articles/javascript-dom}.
         * @author KeeKim Heng, Google Web Developer
         * @param {Element} el The element to be temporarily removed
         * @returns {Function} A function that inserts the element into its original position
         */ removeToInsertLater: function(el) {
        var parentNode = el.parentNode, nextSibling = el.nextSibling;
        if (parentNode === null) {
            return;
        }
        parentNode.removeChild(el);
        return function() {
            if (nextSibling) {
                parentNode.insertBefore(el, nextSibling);
            } else {
                parentNode.appendChild(el);
            }
        };
    },
    /**
         * Resizes the rendering element
         * @param {Number} w New width
         * @param {Number} h New height
         */ resize: function(w, h) {},
    /**
         * Create crosshair elements (Fadenkreuz) for presentations.
         * @param {Number} n Number of crosshairs.
         */ createTouchpoints: function(n) {},
    /**
         * Show a specific crosshair.
         * @param {Number} i Number of the crosshair to show
         */ showTouchpoint: function(i) {},
    /**
         * Hide a specific crosshair.
         * @param {Number} i Number of the crosshair to show
         */ hideTouchpoint: function(i) {},
    /**
         * Move a specific crosshair.
         * @param {Number} i Number of the crosshair to show
         * @param {Array} pos New positon in screen coordinates
         */ updateTouchpoint: function(i, pos) {},
    /* ********* Dump related stuff *********** */ /**
         * Convert SVG construction to base64 encoded SVG data URL.
         * Only available on SVGRenderer.
         *
         * @see JXG.SVGRenderer#dumpToDataURI
         */ dumpToDataURI: function(_ignoreTexts) {},
    /**
         * Convert SVG construction to canvas.
         * Only available on SVGRenderer.
         *
         * @see JXG.SVGRenderer#dumpToCanvas
         */ dumpToCanvas: function(canvasId, w, h, _ignoreTexts) {},
    /**
         * Display SVG image in html img-tag which enables
         * easy download for the user.
         *
         * See JXG.SVGRenderer#screenshot
         */ screenshot: function(board) {}
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].AbstractRenderer;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/renderer/svg.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, define: true, AMprocessNode: true, MathJax: true, document: true */ /*jslint nomen: true, plusplus: true, newcap:true*/ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/options.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$abstract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/renderer/abstract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/color.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$base64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/base64.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/numerics.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
/**
 * Uses SVG to implement the rendering methods defined in {@link JXG.AbstractRenderer}.
 * @class JXG.SVGRenderer
 * @augments JXG.AbstractRenderer
 * @param {Node} container Reference to a DOM node containing the board.
 * @param {Object} dim The dimensions of the board
 * @param {Number} dim.width
 * @param {Number} dim.height
 * @see JXG.AbstractRenderer
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].SVGRenderer = function(container, dim) {
    var i;
    // docstring in AbstractRenderer
    this.type = "svg";
    this.isIE = navigator.appVersion.indexOf("MSIE") !== -1 || navigator.userAgent.match(/Trident\//);
    /**
     * SVG root node
     * @type Node
     */ this.svgRoot = null;
    /**
     * The SVG Namespace used in JSXGraph.
     * @see http://www.w3.org/TR/SVG2/
     * @type String
     * @default http://www.w3.org/2000/svg
     */ this.svgNamespace = "http://www.w3.org/2000/svg";
    /**
     * The xlink namespace. This is used for images.
     * @see http://www.w3.org/TR/xlink/
     * @type String
     * @default http://www.w3.org/1999/xlink
     */ this.xlinkNamespace = "http://www.w3.org/1999/xlink";
    // container is documented in AbstractRenderer.
    // Type node
    this.container = container;
    // prepare the div container and the svg root node for use with JSXGraph
    this.container.style.MozUserSelect = "none";
    this.container.style.userSelect = "none";
    this.container.style.overflow = "hidden";
    if (this.container.style.position === "") {
        this.container.style.position = "relative";
    }
    this.svgRoot = this.container.ownerDocument.createElementNS(this.svgNamespace, "svg");
    this.svgRoot.style.overflow = "hidden";
    this.svgRoot.style.display = "block";
    this.resize(dim.width, dim.height);
    //this.svgRoot.setAttributeNS(null, 'shape-rendering', 'crispEdge'); //'optimizeQuality'); //geometricPrecision');
    this.container.appendChild(this.svgRoot);
    /**
     * The <tt>defs</tt> element is a container element to reference reusable SVG elements.
     * @type Node
     * @see https://www.w3.org/TR/SVG2/struct.html#DefsElement
     */ this.defs = this.container.ownerDocument.createElementNS(this.svgNamespace, "defs");
    this.svgRoot.appendChild(this.defs);
    /**
     * Filters are used to apply shadows.
     * @type Node
     * @see https://www.w3.org/TR/SVG2/struct.html#DefsElement
     */ /**
     * Create an SVG shadow filter. If the object's RGB color is [r,g,b], it's opacity is op, and
     * the parameter color is given as [r', g', b'] with opacity op'
     * the shadow will have RGB color [blend*r + r', blend*g + g', blend*b + b'] and the opacity will be equal to op * op'.
     * Further, blur and offset can be adjusted.
     *
     * The shadow color is [r*ble
     * @param {String} id Node is of the filter.
     * @param {Array|String} rgb RGB value for the blend color or the string 'none' for default values. Default 'black'.
     * @param {Number} opacity Value between 0 and 1, default is 1.
     * @param {Number} blend  Value between 0 and 1, default is 0.1.
     * @param {Number} blur  Default: 3
     * @param {Array} offset [dx, dy]. Default is [5,5].
     * @returns DOM node to be added to this.defs.
     * @private
     */ this.createShadowFilter = function(id, rgb, opacity, blend, blur, offset) {
        var filter = this.container.ownerDocument.createElementNS(this.svgNamespace, 'filter'), feOffset, feColor, feGaussianBlur, feBlend, mat;
        filter.setAttributeNS(null, 'id', id);
        filter.setAttributeNS(null, 'width', '300%');
        filter.setAttributeNS(null, 'height', '300%');
        filter.setAttributeNS(null, 'filterUnits', 'userSpaceOnUse');
        feOffset = this.container.ownerDocument.createElementNS(this.svgNamespace, 'feOffset');
        feOffset.setAttributeNS(null, 'in', 'SourceGraphic'); // b/w: SourceAlpha, Color: SourceGraphic
        feOffset.setAttributeNS(null, 'result', 'offOut');
        feOffset.setAttributeNS(null, 'dx', offset[0]);
        feOffset.setAttributeNS(null, 'dy', offset[1]);
        filter.appendChild(feOffset);
        feColor = this.container.ownerDocument.createElementNS(this.svgNamespace, 'feColorMatrix');
        feColor.setAttributeNS(null, 'in', 'offOut');
        feColor.setAttributeNS(null, 'result', 'colorOut');
        feColor.setAttributeNS(null, 'type', 'matrix');
        // See https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix
        if (rgb === 'none' || !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(rgb) || rgb.length < 3) {
            feColor.setAttributeNS(null, 'values', '0.1 0 0 0 0  0 0.1 0 0 0  0 0 0.1 0 0  0 0 0 ' + opacity + ' 0');
        } else {
            rgb[0] /= 255;
            rgb[1] /= 255;
            rgb[2] /= 255;
            mat = blend + ' 0 0 0 ' + rgb[0] + '  0 ' + blend + ' 0 0 ' + rgb[1] + '  0 0 ' + blend + ' 0 ' + rgb[2] + '  0 0 0 ' + opacity + ' 0';
            feColor.setAttributeNS(null, 'values', mat);
        }
        filter.appendChild(feColor);
        feGaussianBlur = this.container.ownerDocument.createElementNS(this.svgNamespace, 'feGaussianBlur');
        feGaussianBlur.setAttributeNS(null, 'in', 'colorOut');
        feGaussianBlur.setAttributeNS(null, 'result', 'blurOut');
        feGaussianBlur.setAttributeNS(null, 'stdDeviation', blur);
        filter.appendChild(feGaussianBlur);
        feBlend = this.container.ownerDocument.createElementNS(this.svgNamespace, 'feBlend');
        feBlend.setAttributeNS(null, 'in', 'SourceGraphic');
        feBlend.setAttributeNS(null, 'in2', 'blurOut');
        feBlend.setAttributeNS(null, 'mode', 'normal');
        filter.appendChild(feBlend);
        return filter;
    };
    /**
     * Create a "unique" string id from the arguments of the function.
     * Concatenate all arguments by "_".
     * "Unique" is achieved by simply prepending the container id.
     * Do not escape the string.
     *
     * If the id is used in an "url()" call it must be eascaped.
     *
     * @params {String} one or strings which will be concatenated.
     * @return {String}
     * @private
     */ this.uniqName = function() {
        return this.container.id + '_' + Array.prototype.slice.call(arguments).join('_');
    };
    /**
     * Combine arguments to a string, joined by empty string.
     * The container id needs to be escaped, as it may contain URI-unsafe characters
     *
     * @params {String} str variable number of strings
     * @returns String
     * @see JXG.SVGRenderer#toURL
     * @private
     * @example
     * this.toStr('aaa', '_', 'bbb', 'TriangleEnd')
     * // Output:
     * // xxx_bbbTriangleEnd
     */ this.toStr = function() {
        // ES6 would be [...arguments].join()
        var str = Array.prototype.slice.call(arguments).join('');
        // Mask special symbols like '/' and '\' in id
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(encodeURIComponent)) {
            str = encodeURIComponent(str);
        }
        return str;
    };
    /**
     * Combine arguments to an URL string of the form
     * url(#...)
     * Masks the container id. Calls {@link JXG.SVGRenderer#toStr}.
     *
     * @params {String} str variable number of strings
     * @returns URL string
     * @see JXG.SVGRenderer#toStr
     * @private
     * @example
     * this.toURL('aaa', '_', 'bbb', 'TriangleEnd')
     * // Output:
     * // url(#xxx_bbbTriangleEnd)
     */ this.toURL = function() {
        return 'url(#' + this.toStr.apply(this, arguments) + // Pass the arguments to toStr
        ')';
    };
    /* Default shadow filter */ this.defs.appendChild(this.createShadowFilter(this.uniqName('f1'), 'none', 1, 0.1, 3, [
        5,
        5
    ]));
    /**
     * JSXGraph uses a layer system to sort the elements on the board. This puts certain types of elements in front
     * of other types of elements. For the order used see {@link JXG.Options.layer}. The number of layers is documented
     * there, too. The higher the number, the "more on top" are the elements on this layer.
     * @type Array
     */ this.layer = [];
    for(i = 0; i < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].layer.numlayers; i++){
        this.layer[i] = this.container.ownerDocument.createElementNS(this.svgNamespace, 'g');
        this.svgRoot.appendChild(this.layer[i]);
    }
    try {
        this.foreignObjLayer = this.container.ownerDocument.createElementNS(this.svgNamespace, "foreignObject");
        this.foreignObjLayer.setAttribute("display", "none");
        this.foreignObjLayer.setAttribute("x", 0);
        this.foreignObjLayer.setAttribute("y", 0);
        this.foreignObjLayer.setAttribute("width", "100%");
        this.foreignObjLayer.setAttribute("height", "100%");
        this.foreignObjLayer.setAttribute("id", this.uniqName('foreignObj'));
        this.svgRoot.appendChild(this.foreignObjLayer);
        this.supportsForeignObject = true;
    } catch (e) {
        this.supportsForeignObject = false;
    }
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].SVGRenderer.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$abstract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].SVGRenderer.prototype, /** @lends JXG.SVGRenderer.prototype */ {
    /* ******************************** *
         *  This renderer does not need to
         *  override draw/update* methods
         *  since it provides draw/update*Prim
         *  methods except for some cases like
         *  internal texts or images.
         * ******************************** */ /* ********* Arrow head related stuff *********** */ /**
         * Creates an arrow DOM node. Arrows are displayed in SVG with a <em>marker</em> tag.
         * @private
         * @param {JXG.GeometryElement} el A JSXGraph element, preferably one that can have an arrow attached.
         * @param {String} [idAppendix=''] A string that is added to the node's id.
         * @returns {Node} Reference to the node added to the DOM.
         */ _createArrowHead: function(el, idAppendix, type) {
        var node2, node3, id = el.id + "Triangle", //type = null,
        v, h;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(idAppendix)) {
            id += idAppendix;
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(type)) {
            id += type;
        }
        node2 = this.createPrim("marker", id);
        node2.setAttributeNS(null, "stroke", el.evalVisProp('strokecolor'));
        node2.setAttributeNS(null, "stroke-opacity", el.evalVisProp('strokeopacity'));
        node2.setAttributeNS(null, "fill", el.evalVisProp('strokecolor'));
        node2.setAttributeNS(null, "fill-opacity", el.evalVisProp('strokeopacity'));
        node2.setAttributeNS(null, "stroke-width", 0); // this is the stroke-width of the arrow head.
        // Should be zero to simplify the calculations
        node2.setAttributeNS(null, "orient", "auto");
        node2.setAttributeNS(null, "markerUnits", "strokeWidth"); // 'strokeWidth' 'userSpaceOnUse');
        /*
               Types 1, 2:
               The arrow head is an isosceles triangle with base length 10 and height 10.

               Type 3:
               A rectangle

               Types 4, 5, 6:
               Defined by Bezier curves from mp_arrowheads.html

               In any case but type 3 the arrow head is 10 units long,
               type 3 is 10 units high.
               These 10 units are scaled to strokeWidth * arrowSize pixels, see
               this._setArrowWidth().

               See also abstractRenderer.updateLine() where the line path is shortened accordingly.

               Changes here are also necessary in setArrowWidth().

               So far, lines with arrow heads are shortenend to avoid overlapping of
               arrow head and line. This is not the case for curves, yet.
               Therefore, the offset refX has to be adapted to the path type.
            */ node3 = this.container.ownerDocument.createElementNS(this.svgNamespace, "path");
        h = 5;
        if (idAppendix === "Start") {
            // First arrow
            v = 0;
            if (type === 2) {
                node3.setAttributeNS(null, "d", "M 10,0 L 0,5 L 10,10 L 5,5 z");
            } else if (type === 3) {
                node3.setAttributeNS(null, "d", "M 0,0 L 3.33,0 L 3.33,10 L 0,10 z");
            } else if (type === 4) {
                // insetRatio:0.8 tipAngle:45 wingCurve:15 tailCurve:0
                h = 3.31;
                node3.setAttributeNS(null, "d", "M 0.00,3.31 C 3.53,3.84 7.13,4.50 10.00,6.63 C 9.33,5.52 8.67,4.42 8.00,3.31 C 8.67,2.21 9.33,1.10 10.00,0.00 C 7.13,2.13 3.53,2.79 0.00,3.31");
            } else if (type === 5) {
                // insetRatio:0.9 tipAngle:40 wingCurve:5 tailCurve:15
                h = 3.28;
                node3.setAttributeNS(null, "d", "M 0.00,3.28 C 3.39,4.19 6.81,5.07 10.00,6.55 C 9.38,5.56 9.00,4.44 9.00,3.28 C 9.00,2.11 9.38,0.99 10.00,0.00 C 6.81,1.49 3.39,2.37 0.00,3.28");
            } else if (type === 6) {
                // insetRatio:0.9 tipAngle:35 wingCurve:5 tailCurve:0
                h = 2.84;
                node3.setAttributeNS(null, "d", "M 0.00,2.84 C 3.39,3.59 6.79,4.35 10.00,5.68 C 9.67,4.73 9.33,3.78 9.00,2.84 C 9.33,1.89 9.67,0.95 10.00,0.00 C 6.79,1.33 3.39,2.09 0.00,2.84");
            } else if (type === 7) {
                // insetRatio:0.9 tipAngle:60 wingCurve:30 tailCurve:0
                h = 5.2;
                node3.setAttributeNS(null, "d", "M 0.00,5.20 C 4.04,5.20 7.99,6.92 10.00,10.39 M 10.00,0.00 C 7.99,3.47 4.04,5.20 0.00,5.20");
            } else {
                // type == 1 or > 6
                node3.setAttributeNS(null, "d", "M 10,0 L 0,5 L 10,10 z");
            }
            if (// !Type.exists(el.rendNode.getTotalLength) &&
            el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
                if (type === 2) {
                    v = 4.9;
                } else if (type === 3) {
                    v = 3.3;
                } else if (type === 4 || type === 5 || type === 6) {
                    v = 6.66;
                } else if (type === 7) {
                    v = 0.0;
                } else {
                    v = 10.0;
                }
            }
        } else {
            // Last arrow
            v = 10.0;
            if (type === 2) {
                node3.setAttributeNS(null, "d", "M 0,0 L 10,5 L 0,10 L 5,5 z");
            } else if (type === 3) {
                v = 3.3;
                node3.setAttributeNS(null, "d", "M 0,0 L 3.33,0 L 3.33,10 L 0,10 z");
            } else if (type === 4) {
                // insetRatio:0.8 tipAngle:45 wingCurve:15 tailCurve:0
                h = 3.31;
                node3.setAttributeNS(null, "d", "M 10.00,3.31 C 6.47,3.84 2.87,4.50 0.00,6.63 C 0.67,5.52 1.33,4.42 2.00,3.31 C 1.33,2.21 0.67,1.10 0.00,0.00 C 2.87,2.13 6.47,2.79 10.00,3.31");
            } else if (type === 5) {
                // insetRatio:0.9 tipAngle:40 wingCurve:5 tailCurve:15
                h = 3.28;
                node3.setAttributeNS(null, "d", "M 10.00,3.28 C 6.61,4.19 3.19,5.07 0.00,6.55 C 0.62,5.56 1.00,4.44 1.00,3.28 C 1.00,2.11 0.62,0.99 0.00,0.00 C 3.19,1.49 6.61,2.37 10.00,3.28");
            } else if (type === 6) {
                // insetRatio:0.9 tipAngle:35 wingCurve:5 tailCurve:0
                h = 2.84;
                node3.setAttributeNS(null, "d", "M 10.00,2.84 C 6.61,3.59 3.21,4.35 0.00,5.68 C 0.33,4.73 0.67,3.78 1.00,2.84 C 0.67,1.89 0.33,0.95 0.00,0.00 C 3.21,1.33 6.61,2.09 10.00,2.84");
            } else if (type === 7) {
                // insetRatio:0.9 tipAngle:60 wingCurve:30 tailCurve:0
                h = 5.2;
                node3.setAttributeNS(null, "d", "M 10.00,5.20 C 5.96,5.20 2.01,6.92 0.00,10.39 M 0.00,0.00 C 2.01,3.47 5.96,5.20 10.00,5.20");
            } else {
                // type == 1 or > 6
                node3.setAttributeNS(null, "d", "M 0,0 L 10,5 L 0,10 z");
            }
            if (// !Type.exists(el.rendNode.getTotalLength) &&
            el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
                if (type === 2) {
                    v = 5.1;
                } else if (type === 3) {
                    v = 0.02;
                } else if (type === 4 || type === 5 || type === 6) {
                    v = 3.33;
                } else if (type === 7) {
                    v = 10.0;
                } else {
                    v = 0.05;
                }
            }
        }
        if (type === 7) {
            node2.setAttributeNS(null, "fill", "none");
            node2.setAttributeNS(null, "stroke-width", 1); // this is the stroke-width of the arrow head.
        }
        node2.setAttributeNS(null, "refY", h);
        node2.setAttributeNS(null, "refX", v);
        node2.appendChild(node3);
        return node2;
    },
    /**
         * Updates color of an arrow DOM node.
         * @param {Node} node The arrow node.
         * @param {String} color Color value in a HTML compatible format, e.g. <tt>#00ff00</tt> or <tt>green</tt> for green.
         * @param {Number} opacity
         * @param {JXG.GeometryElement} el The element the arrows are to be attached to
         */ _setArrowColor: function(node, color, opacity, el, type) {
        if (node) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(color)) {
                if (type !== 7) {
                    this._setAttribute(function() {
                        node.setAttributeNS(null, "stroke", color);
                        node.setAttributeNS(null, "fill", color);
                        node.setAttributeNS(null, "stroke-opacity", opacity);
                        node.setAttributeNS(null, "fill-opacity", opacity);
                    }, el.visPropOld.fillcolor);
                } else {
                    this._setAttribute(function() {
                        node.setAttributeNS(null, "fill", "none");
                        node.setAttributeNS(null, "stroke", color);
                        node.setAttributeNS(null, "stroke-opacity", opacity);
                    }, el.visPropOld.fillcolor);
                }
            }
            // if (this.isIE) {
            // Necessary, since Safari is the new IE (11.2024)
            el.rendNode.parentNode.insertBefore(el.rendNode, el.rendNode);
        // }
        }
    },
    // Already documented in JXG.AbstractRenderer
    _setArrowWidth: function(node, width, parentNode, size) {
        var s, d;
        if (node) {
            // if (width === 0) {
            //     // display:none does not work well in webkit
            //     node.setAttributeNS(null, 'display', 'none');
            // } else {
            s = width;
            d = s * size;
            node.setAttributeNS(null, "viewBox", 0 + " " + 0 + " " + s * 10 + " " + s * 10);
            node.setAttributeNS(null, "markerHeight", d);
            node.setAttributeNS(null, "markerWidth", d);
            node.setAttributeNS(null, "display", "inherit");
            // }
            // if (this.isIE) {
            // Necessary, since Safari is the new IE (11.2024)
            parentNode.parentNode.insertBefore(parentNode, parentNode);
        // }
        }
    },
    /* ********* Line related stuff *********** */ // documented in AbstractRenderer
    updateTicks: function(ticks) {
        var i, j, c, node, x, y, tickStr = "", len = ticks.ticks.length, len2, str, isReal = true;
        for(i = 0; i < len; i++){
            c = ticks.ticks[i];
            x = c[0];
            y = c[1];
            len2 = x.length;
            str = " M " + x[0] + " " + y[0];
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber(x[0])) {
                isReal = false;
            }
            for(j = 1; isReal && j < len2; ++j){
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber(x[j])) {
                    str += " L " + x[j] + " " + y[j];
                } else {
                    isReal = false;
                }
            }
            if (isReal) {
                tickStr += str;
            }
        }
        node = ticks.rendNode;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(node)) {
            node = this.createPrim("path", ticks.id);
            this.appendChildPrim(node, ticks.evalVisProp('layer'));
            ticks.rendNode = node;
        }
        node.setAttributeNS(null, "stroke", ticks.evalVisProp('strokecolor'));
        node.setAttributeNS(null, "fill", "none");
        // node.setAttributeNS(null, 'fill', ticks.evalVisProp('fillcolor'));
        // node.setAttributeNS(null, 'fill-opacity', ticks.evalVisProp('fillopacity'));
        node.setAttributeNS(null, "stroke-opacity", ticks.evalVisProp('strokeopacity'));
        node.setAttributeNS(null, "stroke-width", ticks.evalVisProp('strokewidth'));
        this.updatePathPrim(node, tickStr, ticks.board);
    },
    /* ********* Text related stuff *********** */ // Already documented in JXG.AbstractRenderer
    displayCopyright: function(str, fontsize) {
        var node, t, x = 4 + 1.8 * fontsize, y = 6 + fontsize, alpha = 0.2;
        node = this.createPrim("text", 'licenseText');
        node.setAttributeNS(null, 'x', x + 'px');
        node.setAttributeNS(null, 'y', y + 'px');
        node.setAttributeNS(null, 'style', 'font-family:Arial,Helvetica,sans-serif; font-size:' + fontsize + 'px; opacity:' + alpha + ';');
        // fill:#356AA0;
        node.setAttributeNS(null, 'aria-hidden', 'true');
        t = this.container.ownerDocument.createTextNode(str);
        node.appendChild(t);
        this.appendChildPrim(node, 0);
    },
    // Already documented in JXG.AbstractRenderer
    displayLogo: function(str, fontsize) {
        var node, s = 1.5 * fontsize, alpha = 0.2;
        node = this.createPrim("image", 'licenseLogo');
        node.setAttributeNS(null, 'x', '5px');
        node.setAttributeNS(null, 'y', '5px');
        node.setAttributeNS(null, 'width', s + 'px');
        node.setAttributeNS(null, 'height', s + 'px');
        node.setAttributeNS(null, "preserveAspectRatio", "none");
        node.setAttributeNS(null, 'style', 'opacity:' + alpha + ';');
        node.setAttributeNS(null, 'aria-hidden', 'true');
        node.setAttributeNS(this.xlinkNamespace, "xlink:href", str);
        this.appendChildPrim(node, 0);
    },
    // Already documented in JXG.AbstractRenderer
    drawInternalText: function(el) {
        var node = this.createPrim("text", el.id);
        //node.setAttributeNS(null, "style", "alignment-baseline:middle"); // Not yet supported by Firefox
        // Preserve spaces
        //node.setAttributeNS("http://www.w3.org/XML/1998/namespace", "space", "preserve");
        node.style.whiteSpace = "nowrap";
        el.rendNodeText = this.container.ownerDocument.createTextNode("");
        node.appendChild(el.rendNodeText);
        this.appendChildPrim(node, el.evalVisProp('layer'));
        return node;
    },
    // Already documented in JXG.AbstractRenderer
    updateInternalText: function(el) {
        var content = el.plaintext, v, css, ev_ax = el.getAnchorX(), ev_ay = el.getAnchorY();
        css = el.evalVisProp('cssclass');
        if (el.rendNode.getAttributeNS(null, "class") !== css) {
            el.rendNode.setAttributeNS(null, "class", css);
            el.needsSizeUpdate = true;
        }
        if (!isNaN(el.coords.scrCoords[1] + el.coords.scrCoords[2])) {
            // Horizontal
            v = el.coords.scrCoords[1];
            if (el.visPropOld.left !== ev_ax + v) {
                el.rendNode.setAttributeNS(null, "x", v + "px");
                if (ev_ax === "left") {
                    el.rendNode.setAttributeNS(null, "text-anchor", "start");
                } else if (ev_ax === "right") {
                    el.rendNode.setAttributeNS(null, "text-anchor", "end");
                } else if (ev_ax === "middle") {
                    el.rendNode.setAttributeNS(null, "text-anchor", "middle");
                }
                el.visPropOld.left = ev_ax + v;
            }
            // Vertical
            v = el.coords.scrCoords[2];
            if (el.visPropOld.top !== ev_ay + v) {
                el.rendNode.setAttributeNS(null, "y", v + this.vOffsetText * 0.5 + "px");
                // Not supported by IE, edge
                // el.rendNode.setAttributeNS(null, "dy", "0");
                // if (ev_ay === "bottom") {
                //     el.rendNode.setAttributeNS(null, 'dominant-baseline', 'text-after-edge');
                // } else if (ev_ay === "top") {
                //     el.rendNode.setAttributeNS(null, 'dominant-baseline', 'text-before-edge');
                // } else if (ev_ay === "middle") {
                //     el.rendNode.setAttributeNS(null, 'dominant-baseline', 'middle');
                // }
                if (ev_ay === "bottom") {
                    el.rendNode.setAttributeNS(null, "dy", "0");
                    el.rendNode.setAttributeNS(null, 'dominant-baseline', 'auto');
                } else if (ev_ay === "top") {
                    el.rendNode.setAttributeNS(null, "dy", "1.6ex");
                    el.rendNode.setAttributeNS(null, 'dominant-baseline', 'auto');
                } else if (ev_ay === "middle") {
                    el.rendNode.setAttributeNS(null, "dy", "0.6ex");
                    el.rendNode.setAttributeNS(null, 'dominant-baseline', 'auto');
                }
                el.visPropOld.top = ev_ay + v;
            }
        }
        if (el.htmlStr !== content) {
            el.rendNodeText.data = content;
            el.htmlStr = content;
        }
        this.transformRect(el, el.transformations);
    },
    /**
         * Set color and opacity of internal texts.
         * @private
         * @see JXG.AbstractRenderer#updateTextStyle
         * @see JXG.AbstractRenderer#updateInternalTextStyle
         */ updateInternalTextStyle: function(el, strokeColor, strokeOpacity, duration) {
        this.setObjectFillColor(el, strokeColor, strokeOpacity);
    },
    /* ********* Image related stuff *********** */ // Already documented in JXG.AbstractRenderer
    drawImage: function(el) {
        var node = this.createPrim("image", el.id);
        node.setAttributeNS(null, "preserveAspectRatio", "none");
        this.appendChildPrim(node, el.evalVisProp('layer'));
        el.rendNode = node;
        this.updateImage(el);
    },
    // Already documented in JXG.AbstractRenderer
    transformRect: function(el, t) {
        var s, m, node, str = "", cx, cy, len = t.length;
        if (len > 0) {
            node = el.rendNode;
            m = this.joinTransforms(el, t);
            s = [
                m[1][1],
                m[2][1],
                m[1][2],
                m[2][2],
                m[1][0],
                m[2][0]
            ].join(",");
            if (s.indexOf('NaN') === -1) {
                str += " matrix(" + s + ") ";
                if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_TEXT && el.visProp.display === 'html') {
                    node.style.transform = str;
                    cx = -el.coords.scrCoords[1];
                    cy = -el.coords.scrCoords[2];
                    switch(el.evalVisProp('anchorx')){
                        case 'right':
                            cx += el.size[0];
                            break;
                        case 'middle':
                            cx += el.size[0] * 0.5;
                            break;
                    }
                    switch(el.evalVisProp('anchory')){
                        case 'bottom':
                            cy += el.size[1];
                            break;
                        case 'middle':
                            cy += el.size[1] * 0.5;
                            break;
                    }
                    node.style['transform-origin'] = cx + 'px ' + cy + 'px';
                } else {
                    // Images and texts with display:'internal'
                    node.setAttributeNS(null, "transform", str);
                }
            }
        }
    },
    // Already documented in JXG.AbstractRenderer
    updateImageURL: function(el) {
        var url = el.eval(el.url);
        if (el._src !== url) {
            el.imgIsLoaded = false;
            el.rendNode.setAttributeNS(this.xlinkNamespace, "xlink:href", url);
            el._src = url;
            return true;
        }
        return false;
    },
    // Already documented in JXG.AbstractRenderer
    updateImageStyle: function(el, doHighlight) {
        var css = el.evalVisProp(doHighlight ? 'highlightcssclass' : 'cssclass');
        el.rendNode.setAttributeNS(null, "class", css);
    },
    // Already documented in JXG.AbstractRenderer
    drawForeignObject: function(el) {
        el.rendNode = this.appendChildPrim(this.createPrim("foreignObject", el.id), el.evalVisProp('layer'));
        this.appendNodesToElement(el, "foreignObject");
        this.updateForeignObject(el);
    },
    // Already documented in JXG.AbstractRenderer
    updateForeignObject: function(el) {
        if (el._useUserSize) {
            el.rendNode.style.overflow = "hidden";
        } else {
            el.rendNode.style.overflow = "visible";
        }
        this.updateRectPrim(el.rendNode, el.coords.scrCoords[1], el.coords.scrCoords[2] - el.size[1], el.size[0], el.size[1]);
        if (el.evalVisProp('evaluateOnlyOnce') !== true || !el.renderedOnce) {
            el.rendNode.innerHTML = el.content;
            el.renderedOnce = true;
        }
        this._updateVisual(el, {
            stroke: true,
            dash: true
        }, true);
    },
    /* ********* Render primitive objects *********** */ // Already documented in JXG.AbstractRenderer
    appendChildPrim: function(node, level) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(level)) {
            // trace nodes have level not set
            level = 0;
        } else if (level >= __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].layer.numlayers) {
            level = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].layer.numlayers - 1;
        }
        this.layer[level].appendChild(node);
        return node;
    },
    // Already documented in JXG.AbstractRenderer
    createPrim: function(type, id) {
        var node = this.container.ownerDocument.createElementNS(this.svgNamespace, type);
        node.setAttributeNS(null, "id", this.uniqName(id));
        node.style.position = "absolute";
        if (type === "path") {
            node.setAttributeNS(null, "stroke-linecap", "round");
            node.setAttributeNS(null, "stroke-linejoin", "round");
            node.setAttributeNS(null, "fill-rule", "evenodd");
        }
        return node;
    },
    // Already documented in JXG.AbstractRenderer
    remove: function(shape) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(shape) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(shape.parentNode)) {
            shape.parentNode.removeChild(shape);
        }
    },
    // Already documented in JXG.AbstractRenderer
    setLayer: function(el, level) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(level)) {
            level = 0;
        } else if (level >= __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].layer.numlayers) {
            level = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].layer.numlayers - 1;
        }
        this.layer[level].appendChild(el.rendNode);
    },
    // Already documented in JXG.AbstractRenderer
    makeArrows: function(el, a) {
        var node2, str, ev_fa = a.evFirst, ev_la = a.evLast;
        if (this.isIE && el.visPropCalc.visible && (ev_fa || ev_la)) {
            // Necessary, since Safari is the new IE (11.2024)
            el.rendNode.parentNode.insertBefore(el.rendNode, el.rendNode);
            return;
        }
        // We can not compare against visPropOld if there is need for a new arrow head,
        // since here visPropOld and ev_fa / ev_la already have the same value.
        // This has been set in _updateVisual.
        //
        node2 = el.rendNodeTriangleStart;
        if (ev_fa) {
            str = this.toStr(this.container.id, '_', el.id, 'TriangleStart', a.typeFirst);
            // If we try to set the same arrow head as is already set, we can bail out now
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(node2) || node2.id !== str) {
                node2 = this.container.ownerDocument.getElementById(str);
                // Check if the marker already exists.
                // If not, create a new marker
                if (node2 === null) {
                    node2 = this._createArrowHead(el, "Start", a.typeFirst);
                    this.defs.appendChild(node2);
                }
                el.rendNodeTriangleStart = node2;
                el.rendNode.setAttributeNS(null, "marker-start", this.toURL(str));
            }
        } else {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(node2)) {
                this.remove(node2);
                el.rendNodeTriangleStart = null;
            }
            el.rendNode.setAttributeNS(null, "marker-start", null);
        }
        node2 = el.rendNodeTriangleEnd;
        if (ev_la) {
            str = this.toStr(this.container.id, '_', el.id, 'TriangleEnd', a.typeLast);
            // If we try to set the same arrow head as is already set, we can bail out now
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(node2) || node2.id !== str) {
                node2 = this.container.ownerDocument.getElementById(str);
                // Check if the marker already exists.
                // If not, create a new marker
                if (node2 === null) {
                    node2 = this._createArrowHead(el, "End", a.typeLast);
                    this.defs.appendChild(node2);
                }
                el.rendNodeTriangleEnd = node2;
                el.rendNode.setAttributeNS(null, "marker-end", this.toURL(str));
            }
        } else {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(node2)) {
                this.remove(node2);
                el.rendNodeTriangleEnd = null;
            }
            el.rendNode.setAttributeNS(null, "marker-end", null);
        }
    },
    // Already documented in JXG.AbstractRenderer
    updateEllipsePrim: function(node, x, y, rx, ry) {
        var huge = 1000000;
        huge = 200000; // IE
        // webkit does not like huge values if the object is dashed
        // iE doesn't like huge values above 216000
        x = Math.abs(x) < huge ? x : huge * x / Math.abs(x);
        y = Math.abs(y) < huge ? y : huge * y / Math.abs(y);
        rx = Math.abs(rx) < huge ? rx : huge * rx / Math.abs(rx);
        ry = Math.abs(ry) < huge ? ry : huge * ry / Math.abs(ry);
        node.setAttributeNS(null, "cx", x);
        node.setAttributeNS(null, "cy", y);
        node.setAttributeNS(null, "rx", Math.abs(rx));
        node.setAttributeNS(null, "ry", Math.abs(ry));
    },
    // Already documented in JXG.AbstractRenderer
    updateLinePrim: function(node, p1x, p1y, p2x, p2y) {
        var huge = 1000000;
        huge = 200000; //IE
        if (!isNaN(p1x + p1y + p2x + p2y)) {
            // webkit does not like huge values if the object is dashed
            // IE doesn't like huge values above 216000
            p1x = Math.abs(p1x) < huge ? p1x : huge * p1x / Math.abs(p1x);
            p1y = Math.abs(p1y) < huge ? p1y : huge * p1y / Math.abs(p1y);
            p2x = Math.abs(p2x) < huge ? p2x : huge * p2x / Math.abs(p2x);
            p2y = Math.abs(p2y) < huge ? p2y : huge * p2y / Math.abs(p2y);
            node.setAttributeNS(null, "x1", p1x);
            node.setAttributeNS(null, "y1", p1y);
            node.setAttributeNS(null, "x2", p2x);
            node.setAttributeNS(null, "y2", p2y);
        }
    },
    // Already documented in JXG.AbstractRenderer
    updatePathPrim: function(node, pointString) {
        if (pointString === "") {
            pointString = "M 0 0";
        }
        node.setAttributeNS(null, "d", pointString);
    },
    // Already documented in JXG.AbstractRenderer
    updatePathStringPoint: function(el, size, type) {
        var s = "", scr = el.coords.scrCoords, sqrt32 = size * Math.sqrt(3) * 0.5, s05 = size * 0.5;
        if (type === "x") {
            s = " M " + (scr[1] - size) + " " + (scr[2] - size) + " L " + (scr[1] + size) + " " + (scr[2] + size) + " M " + (scr[1] + size) + " " + (scr[2] - size) + " L " + (scr[1] - size) + " " + (scr[2] + size);
        } else if (type === "+") {
            s = " M " + (scr[1] - size) + " " + scr[2] + " L " + (scr[1] + size) + " " + scr[2] + " M " + scr[1] + " " + (scr[2] - size) + " L " + scr[1] + " " + (scr[2] + size);
        } else if (type === "|") {
            s = " M " + scr[1] + " " + (scr[2] - size) + " L " + scr[1] + " " + (scr[2] + size);
        } else if (type === "-") {
            s = " M " + (scr[1] - size) + " " + scr[2] + " L " + (scr[1] + size) + " " + scr[2];
        } else if (type === "<>" || type === "<<>>") {
            if (type === "<<>>") {
                size *= 1.41;
            }
            s = " M " + (scr[1] - size) + " " + scr[2] + " L " + scr[1] + " " + (scr[2] + size) + " L " + (scr[1] + size) + " " + scr[2] + " L " + scr[1] + " " + (scr[2] - size) + " Z ";
        } else if (type === "^") {
            s = " M " + scr[1] + " " + (scr[2] - size) + " L " + (scr[1] - sqrt32) + " " + (scr[2] + s05) + " L " + (scr[1] + sqrt32) + " " + (scr[2] + s05) + " Z "; // close path
        } else if (type === "v") {
            s = " M " + scr[1] + " " + (scr[2] + size) + " L " + (scr[1] - sqrt32) + " " + (scr[2] - s05) + " L " + (scr[1] + sqrt32) + " " + (scr[2] - s05) + " Z ";
        } else if (type === ">") {
            s = " M " + (scr[1] + size) + " " + scr[2] + " L " + (scr[1] - s05) + " " + (scr[2] - sqrt32) + " L " + (scr[1] - s05) + " " + (scr[2] + sqrt32) + " Z ";
        } else if (type === "<") {
            s = " M " + (scr[1] - size) + " " + scr[2] + " L " + (scr[1] + s05) + " " + (scr[2] - sqrt32) + " L " + (scr[1] + s05) + " " + (scr[2] + sqrt32) + " Z ";
        }
        return s;
    },
    // Already documented in JXG.AbstractRenderer
    updatePathStringPrim: function(el) {
        var i, scr, len, symbm = " M ", symbl = " L ", symbc = " C ", nextSymb = symbm, maxSize = 5000.0, pStr = "";
        if (el.numberPoints <= 0) {
            return "";
        }
        len = Math.min(el.points.length, el.numberPoints);
        if (el.bezierDegree === 1) {
            for(i = 0; i < len; i++){
                scr = el.points[i].scrCoords;
                if (isNaN(scr[1]) || isNaN(scr[2])) {
                    // PenUp
                    nextSymb = symbm;
                } else {
                    // Chrome has problems with values being too far away.
                    scr[1] = Math.max(Math.min(scr[1], maxSize), -maxSize);
                    scr[2] = Math.max(Math.min(scr[2], maxSize), -maxSize);
                    // Attention: first coordinate may be inaccurate if far way
                    //pStr += [nextSymb, scr[1], ' ', scr[2]].join('');
                    pStr += nextSymb + scr[1] + " " + scr[2]; // Seems to be faster now (webkit and firefox)
                    nextSymb = symbl;
                }
            }
        } else if (el.bezierDegree === 3) {
            i = 0;
            while(i < len){
                scr = el.points[i].scrCoords;
                if (isNaN(scr[1]) || isNaN(scr[2])) {
                    // PenUp
                    nextSymb = symbm;
                } else {
                    pStr += nextSymb + scr[1] + " " + scr[2];
                    if (nextSymb === symbc) {
                        i += 1;
                        scr = el.points[i].scrCoords;
                        pStr += " " + scr[1] + " " + scr[2];
                        i += 1;
                        scr = el.points[i].scrCoords;
                        pStr += " " + scr[1] + " " + scr[2];
                    }
                    nextSymb = symbc;
                }
                i += 1;
            }
        }
        return pStr;
    },
    // Already documented in JXG.AbstractRenderer
    updatePathStringBezierPrim: function(el) {
        var i, j, k, scr, lx, ly, len, symbm = " M ", symbl = " C ", nextSymb = symbm, maxSize = 5000.0, pStr = "", f = el.evalVisProp('strokewidth'), isNoPlot = el.evalVisProp('curvetype') !== "plot";
        if (el.numberPoints <= 0) {
            return "";
        }
        if (isNoPlot && el.board.options.curve.RDPsmoothing) {
            el.points = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].RamerDouglasPeucker(el.points, 0.5);
        }
        len = Math.min(el.points.length, el.numberPoints);
        for(j = 1; j < 3; j++){
            nextSymb = symbm;
            for(i = 0; i < len; i++){
                scr = el.points[i].scrCoords;
                if (isNaN(scr[1]) || isNaN(scr[2])) {
                    // PenUp
                    nextSymb = symbm;
                } else {
                    // Chrome has problems with values being too far away.
                    scr[1] = Math.max(Math.min(scr[1], maxSize), -maxSize);
                    scr[2] = Math.max(Math.min(scr[2], maxSize), -maxSize);
                    // Attention: first coordinate may be inaccurate if far way
                    if (nextSymb === symbm) {
                        //pStr += [nextSymb, scr[1], ' ', scr[2]].join('');
                        pStr += nextSymb + scr[1] + " " + scr[2]; // Seems to be faster now (webkit and firefox)
                    } else {
                        k = 2 * j;
                        pStr += [
                            nextSymb,
                            lx + (scr[1] - lx) * 0.333 + f * (k * Math.random() - j),
                            " ",
                            ly + (scr[2] - ly) * 0.333 + f * (k * Math.random() - j),
                            " ",
                            lx + (scr[1] - lx) * 0.666 + f * (k * Math.random() - j),
                            " ",
                            ly + (scr[2] - ly) * 0.666 + f * (k * Math.random() - j),
                            " ",
                            scr[1],
                            " ",
                            scr[2]
                        ].join("");
                    }
                    nextSymb = symbl;
                    lx = scr[1];
                    ly = scr[2];
                }
            }
        }
        return pStr;
    },
    // Already documented in JXG.AbstractRenderer
    updatePolygonPrim: function(node, el) {
        var i, pStr = "", scrCoords, len = el.vertices.length;
        node.setAttributeNS(null, "stroke", "none");
        node.setAttributeNS(null, "fill-rule", "evenodd");
        if (el.elType === "polygonalchain") {
            len++;
        }
        for(i = 0; i < len - 1; i++){
            if (el.vertices[i].isReal) {
                scrCoords = el.vertices[i].coords.scrCoords;
                pStr = pStr + scrCoords[1] + "," + scrCoords[2];
            } else {
                node.setAttributeNS(null, "points", "");
                return;
            }
            if (i < len - 2) {
                pStr += " ";
            }
        }
        if (pStr.indexOf("NaN") === -1) {
            node.setAttributeNS(null, "points", pStr);
        }
    },
    // Already documented in JXG.AbstractRenderer
    updateRectPrim: function(node, x, y, w, h) {
        node.setAttributeNS(null, "x", x);
        node.setAttributeNS(null, "y", y);
        node.setAttributeNS(null, "width", w);
        node.setAttributeNS(null, "height", h);
    },
    /* ********* Set attributes *********** */ /**
         * Call user-defined function to set visual attributes.
         * If "testAttribute" is the empty string, the function
         * is called immediately, otherwise it is called in a timeOut.
         *
         * This is necessary to realize smooth transitions but avoid transitions
         * when first creating the objects.
         *
         * Usually, the string in testAttribute is the visPropOld attribute
         * of the values which are set.
         *
         * @param {Function} setFunc       Some function which usually sets some attributes
         * @param {String} testAttribute If this string is the empty string  the function is called immediately,
         *                               otherwise it is called in a setImeout.
         * @see JXG.SVGRenderer#setObjectFillColor
         * @see JXG.SVGRenderer#setObjectStrokeColor
         * @see JXG.SVGRenderer#_setArrowColor
         * @private
         */ _setAttribute: function(setFunc, testAttribute) {
        if (testAttribute === "") {
            setFunc();
        } else {
            window.setTimeout(setFunc, 1);
        }
    },
    display: function(el, val) {
        var node;
        if (el && el.rendNode) {
            el.visPropOld.visible = val;
            node = el.rendNode;
            if (val) {
                node.setAttributeNS(null, "display", "inline");
                node.style.visibility = "inherit";
            } else {
                node.setAttributeNS(null, "display", "none");
                node.style.visibility = "hidden";
            }
        }
    },
    // documented in JXG.AbstractRenderer
    hide: function(el) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("Board.renderer.hide()", "Board.renderer.display()");
        this.display(el, false);
    },
    // documented in JXG.AbstractRenderer
    setARIA: function(el) {
        // This method is only called in abstractRenderer._updateVisual() if aria.enabled == true.
        var key, k, v;
        // this.setPropertyPrim(el.rendNode, 'aria-label', el.evalVisProp('aria.label'));
        // this.setPropertyPrim(el.rendNode, 'aria-live', el.evalVisProp('aria.live'));
        for(key in el.visProp.aria){
            if (el.visProp.aria.hasOwnProperty(key) && key !== 'enabled') {
                k = 'aria.' + key;
                v = el.evalVisProp('aria.' + key);
                if (el.visPropOld[k] !== v) {
                    this.setPropertyPrim(el.rendNode, 'aria-' + key, v);
                    el.visPropOld[k] = v;
                }
            }
        }
    },
    // documented in JXG.AbstractRenderer
    setBuffering: function(el, type) {
        el.rendNode.setAttribute("buffered-rendering", type);
    },
    // documented in JXG.AbstractRenderer
    setCssClass (el, cssClass) {
        if (el.visPropOld.cssclass !== cssClass) {
            this.setPropertyPrim(el.rendNode, 'class', cssClass);
            el.visPropOld.cssclass = cssClass;
        }
    },
    // documented in JXG.AbstractRenderer
    setDashStyle: function(el) {
        var dashStyle = el.evalVisProp('dash'), ds = el.evalVisProp('dashscale'), sw = ds ? 0.5 * el.evalVisProp('strokewidth') : 1, node = el.rendNode;
        if (dashStyle > 0) {
            node.setAttributeNS(null, "stroke-dasharray", // sw could distinguish highlighting or not.
            // But it seems to preferable to ignore this.
            this.dashArray[dashStyle - 1].map(function(x) {
                return x * sw;
            }).join(','));
        } else {
            if (node.hasAttributeNS(null, "stroke-dasharray")) {
                node.removeAttributeNS(null, "stroke-dasharray");
            }
        }
    },
    // documented in JXG.AbstractRenderer
    setGradient: function(el) {
        var fillNode = el.rendNode, node, node2, node3, ev_g = el.evalVisProp('gradient');
        if (ev_g === "linear" || ev_g === "radial") {
            node = this.createPrim(ev_g + "Gradient", el.id + "_gradient");
            node2 = this.createPrim("stop", el.id + "_gradient1");
            node3 = this.createPrim("stop", el.id + "_gradient2");
            node.appendChild(node2);
            node.appendChild(node3);
            this.defs.appendChild(node);
            fillNode.setAttributeNS(null, 'style', // "fill:url(#" + this.container.id + "_" + el.id + "_gradient)"
            'fill:' + this.toURL(this.container.id + '_' + el.id + '_gradient'));
            el.gradNode1 = node2;
            el.gradNode2 = node3;
            el.gradNode = node;
        } else {
            fillNode.removeAttributeNS(null, "style");
        }
    },
    // documented in JXG.AbstractRenderer
    setLineCap: function(el) {
        var capStyle = el.evalVisProp('linecap');
        if (capStyle === undefined || capStyle === "" || el.visPropOld.linecap === capStyle || !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(el.rendNode)) {
            return;
        }
        this.setPropertyPrim(el.rendNode, "stroke-linecap", capStyle);
        el.visPropOld.linecap = capStyle;
    },
    // documented in JXG.AbstractRenderer
    setObjectFillColor: function(el, color, opacity, rendNode) {
        var node, c, rgbo, oo, rgba = color, o = opacity, grad = el.evalVisProp('gradient');
        o = o > 0 ? o : 0;
        // TODO  save gradient and gradientangle
        if (el.visPropOld.fillcolor === rgba && el.visPropOld.fillopacity === o && grad === null) {
            return;
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(rgba) && rgba !== false) {
            if (rgba.length !== 9) {
                // RGB, not RGBA
                c = rgba;
                oo = o;
            } else {
                // True RGBA, not RGB
                rgbo = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgba2rgbo(rgba);
                c = rgbo[0];
                oo = o * rgbo[1];
            }
            if (rendNode === undefined) {
                node = el.rendNode;
            } else {
                node = rendNode;
            }
            if (c !== "none" && c !== "" && c !== false) {
                this._setAttribute(function() {
                    node.setAttributeNS(null, "fill", c);
                }, el.visPropOld.fillcolor);
            }
            if (el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_IMAGE) {
                this._setAttribute(function() {
                    node.setAttributeNS(null, "opacity", oo);
                }, el.visPropOld.fillopacity);
            //node.style['opacity'] = oo;  // This would overwrite values set by CSS class.
            } else {
                if (c === "none") {
                    // This is done only for non-images
                    // because images have no fill color.
                    oo = 0;
                    // This is necessary if there is a foreignObject below.
                    node.setAttributeNS(null, "pointer-events", "visibleStroke");
                } else {
                    // This is the default
                    node.setAttributeNS(null, "pointer-events", "visiblePainted");
                }
                this._setAttribute(function() {
                    node.setAttributeNS(null, "fill-opacity", oo);
                }, el.visPropOld.fillopacity);
            }
            if (grad === "linear" || grad === "radial") {
                this.updateGradient(el);
            }
        }
        el.visPropOld.fillcolor = rgba;
        el.visPropOld.fillopacity = o;
    },
    // documented in JXG.AbstractRenderer
    setObjectStrokeColor: function(el, color, opacity) {
        var rgba = color, c, rgbo, o = opacity, oo, node;
        o = o > 0 ? o : 0;
        if (el.visPropOld.strokecolor === rgba && el.visPropOld.strokeopacity === o) {
            return;
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(rgba) && rgba !== false) {
            if (rgba.length !== 9) {
                // RGB, not RGBA
                c = rgba;
                oo = o;
            } else {
                // True RGBA, not RGB
                rgbo = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgba2rgbo(rgba);
                c = rgbo[0];
                oo = o * rgbo[1];
            }
            node = el.rendNode;
            if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_TEXT) {
                if (el.evalVisProp('display') === "html") {
                    this._setAttribute(function() {
                        node.style.color = c;
                        node.style.opacity = oo;
                    }, el.visPropOld.strokecolor);
                } else {
                    this._setAttribute(function() {
                        node.setAttributeNS(null, "style", "fill:" + c);
                        node.setAttributeNS(null, "style", "fill-opacity:" + oo);
                    }, el.visPropOld.strokecolor);
                }
            } else {
                this._setAttribute(function() {
                    node.setAttributeNS(null, "stroke", c);
                    node.setAttributeNS(null, "stroke-opacity", oo);
                }, el.visPropOld.strokecolor);
            }
            if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_CURVE || el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
                if (el.evalVisProp('firstarrow')) {
                    this._setArrowColor(el.rendNodeTriangleStart, c, oo, el, el.visPropCalc.typeFirst);
                }
                if (el.evalVisProp('lastarrow')) {
                    this._setArrowColor(el.rendNodeTriangleEnd, c, oo, el, el.visPropCalc.typeLast);
                }
            }
        }
        el.visPropOld.strokecolor = rgba;
        el.visPropOld.strokeopacity = o;
    },
    // documented in JXG.AbstractRenderer
    setObjectStrokeWidth: function(el, width) {
        var node, w = width;
        if (isNaN(w) || el.visPropOld.strokewidth === w) {
            return;
        }
        node = el.rendNode;
        this.setPropertyPrim(node, "stroked", "true");
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(w)) {
            this.setPropertyPrim(node, "stroke-width", w + "px");
        // if (el.elementClass === Const.OBJECT_CLASS_CURVE ||
        // el.elementClass === Const.OBJECT_CLASS_LINE) {
        //     if (el.evalVisProp('firstarrow')) {
        //         this._setArrowWidth(el.rendNodeTriangleStart, w, el.rendNode);
        //     }
        //
        //     if (el.evalVisProp('lastarrow')) {
        //         this._setArrowWidth(el.rendNodeTriangleEnd, w, el.rendNode);
        //     }
        // }
        }
        el.visPropOld.strokewidth = w;
    },
    // documented in JXG.AbstractRenderer
    setObjectTransition: function(el, duration) {
        var node, props, transitionArr = [], transitionStr, i, len = 0, nodes = [
            "rendNode",
            "rendNodeTriangleStart",
            "rendNodeTriangleEnd"
        ];
        if (duration === undefined) {
            duration = el.evalVisProp('transitionduration');
        }
        props = el.evalVisProp('transitionproperties');
        if (duration === el.visPropOld.transitionduration && props === el.visPropOld.transitionproperties) {
            return;
        }
        // if (
        //     el.elementClass === Const.OBJECT_CLASS_TEXT &&
        //     el.evalVisProp('display') === "html"
        // ) {
        //     // transitionStr = " color " + duration + "ms," +
        //     //     " opacity " + duration + "ms";
        //     transitionStr = " all " + duration + "ms ease";
        // } else {
        //     transitionStr =
        //         " fill " + duration + "ms," +
        //         " fill-opacity " + duration + "ms," +
        //         " stroke " + duration + "ms," +
        //         " stroke-opacity " + duration + "ms," +
        //         " stroke-width " + duration + "ms," +
        //         " width " + duration + "ms," +
        //         " height " + duration + "ms," +
        //         " rx " + duration + "ms," +
        //         " ry " + duration + "ms";
        // }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(props)) {
            len = props.length;
        }
        for(i = 0; i < len; i++){
            transitionArr.push(props[i] + ' ' + duration + 'ms');
        }
        transitionStr = transitionArr.join(', ');
        len = nodes.length;
        for(i = 0; i < len; ++i){
            if (el[nodes[i]]) {
                node = el[nodes[i]];
                node.style.transition = transitionStr;
            }
        }
        el.visPropOld.transitionduration = duration;
        el.visPropOld.transitionproperties = props;
    },
    // documented in JXG.AbstractRenderer
    setShadow: function(el) {
        var ev_s = el.evalVisProp('shadow'), ev_s_json, c, b, bl, o, op, id, node, use_board_filter = true, show = false;
        ev_s_json = JSON.stringify(ev_s);
        if (ev_s_json === el.visPropOld.shadow) {
            return;
        }
        if (typeof ev_s === 'boolean') {
            use_board_filter = true;
            show = ev_s;
            c = 'none';
            b = 3;
            bl = 0.1;
            o = [
                5,
                5
            ];
            op = 1;
        } else {
            if (el.evalVisProp('shadow.enabled')) {
                use_board_filter = false;
                show = true;
                c = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgbParser(el.evalVisProp('shadow.color'));
                b = el.evalVisProp('shadow.blur');
                bl = el.evalVisProp('shadow.blend');
                o = el.evalVisProp('shadow.offset');
                op = el.evalVisProp('shadow.opacity');
            } else {
                show = false;
            }
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(el.rendNode)) {
            if (show) {
                if (use_board_filter) {
                    el.rendNode.setAttributeNS(null, 'filter', this.toURL(this.container.id + '_' + 'f1'));
                // 'url(#' + this.container.id + '_' + 'f1)');
                } else {
                    node = this.container.ownerDocument.getElementById(id);
                    if (node) {
                        this.defs.removeChild(node);
                    }
                    id = el.rendNode.id + '_' + 'f1';
                    this.defs.appendChild(this.createShadowFilter(id, c, op, bl, b, o));
                    el.rendNode.setAttributeNS(null, 'filter', this.toURL(id));
                // 'url(#' + id + ')');
                }
            } else {
                el.rendNode.removeAttributeNS(null, 'filter');
            }
        }
        el.visPropOld.shadow = ev_s_json;
    },
    // documented in JXG.AbstractRenderer
    setTabindex: function(el) {
        var val;
        if (el.board.attr.keyboard.enabled && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(el.rendNode)) {
            val = el.evalVisProp('tabindex');
            if (!el.visPropCalc.visible /* || el.evalVisProp('fixed') */ ) {
                val = null;
            }
            if (val !== el.visPropOld.tabindex) {
                el.rendNode.setAttribute("tabindex", val);
                el.visPropOld.tabindex = val;
            }
        }
    },
    // documented in JXG.AbstractRenderer
    setPropertyPrim: function(node, key, val) {
        if (key === "stroked") {
            return;
        }
        node.setAttributeNS(null, key, val);
    },
    // documented in JXG.AbstractRenderer
    show: function(el) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("Board.renderer.show()", "Board.renderer.display()");
        this.display(el, true);
    // var node;
    //
    // if (el && el.rendNode) {
    //     node = el.rendNode;
    //     node.setAttributeNS(null, 'display', 'inline');
    //     node.style.visibility = "inherit";
    // }
    },
    // documented in JXG.AbstractRenderer
    updateGradient: function(el) {
        var col, op, node2 = el.gradNode1, node3 = el.gradNode2, ev_g = el.evalVisProp('gradient');
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(node2) || !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(node3)) {
            return;
        }
        op = el.evalVisProp('fillopacity');
        op = op > 0 ? op : 0;
        col = el.evalVisProp('fillcolor');
        node2.setAttributeNS(null, "style", "stop-color:" + col + ";stop-opacity:" + op);
        node3.setAttributeNS(null, "style", "stop-color:" + el.evalVisProp('gradientsecondcolor') + ";stop-opacity:" + el.evalVisProp('gradientsecondopacity'));
        node2.setAttributeNS(null, "offset", el.evalVisProp('gradientstartoffset') * 100 + "%");
        node3.setAttributeNS(null, "offset", el.evalVisProp('gradientendoffset') * 100 + "%");
        if (ev_g === "linear") {
            this.updateGradientAngle(el.gradNode, el.evalVisProp('gradientangle'));
        } else if (ev_g === "radial") {
            this.updateGradientCircle(el.gradNode, el.evalVisProp('gradientcx'), el.evalVisProp('gradientcy'), el.evalVisProp('gradientr'), el.evalVisProp('gradientfx'), el.evalVisProp('gradientfy'), el.evalVisProp('gradientfr'));
        }
    },
    /**
         * Set the gradient angle for linear color gradients.
         *
         * @private
         * @param {SVGnode} node SVG gradient node of an arbitrary JSXGraph element.
         * @param {Number} radians angle value in radians. 0 is horizontal from left to right, Pi/4 is vertical from top to bottom.
         */ updateGradientAngle: function(node, radians) {
        // Angles:
        // 0: ->
        // 90: down
        // 180: <-
        // 90: up
        var f = 1.0, co = Math.cos(radians), si = Math.sin(radians);
        if (Math.abs(co) > Math.abs(si)) {
            f /= Math.abs(co);
        } else {
            f /= Math.abs(si);
        }
        if (co >= 0) {
            node.setAttributeNS(null, "x1", 0);
            node.setAttributeNS(null, "x2", co * f);
        } else {
            node.setAttributeNS(null, "x1", -co * f);
            node.setAttributeNS(null, "x2", 0);
        }
        if (si >= 0) {
            node.setAttributeNS(null, "y1", 0);
            node.setAttributeNS(null, "y2", si * f);
        } else {
            node.setAttributeNS(null, "y1", -si * f);
            node.setAttributeNS(null, "y2", 0);
        }
    },
    /**
         * Set circles for radial color gradients.
         *
         * @private
         * @param {SVGnode} node SVG gradient node
         * @param {Number} cx SVG value cx (value between 0 and 1)
         * @param {Number} cy  SVG value cy (value between 0 and 1)
         * @param {Number} r  SVG value r (value between 0 and 1)
         * @param {Number} fx  SVG value fx (value between 0 and 1)
         * @param {Number} fy  SVG value fy (value between 0 and 1)
         * @param {Number} fr  SVG value fr (value between 0 and 1)
         */ updateGradientCircle: function(node, cx, cy, r, fx, fy, fr) {
        node.setAttributeNS(null, "cx", cx * 100 + "%"); // Center first color
        node.setAttributeNS(null, "cy", cy * 100 + "%");
        node.setAttributeNS(null, "r", r * 100 + "%");
        node.setAttributeNS(null, "fx", fx * 100 + "%"); // Center second color / focal point
        node.setAttributeNS(null, "fy", fy * 100 + "%");
        node.setAttributeNS(null, "fr", fr * 100 + "%");
    },
    /* ********* Renderer control *********** */ // documented in JXG.AbstractRenderer
    suspendRedraw: function() {
        // It seems to be important for the Linux version of firefox
        this.suspendHandle = this.svgRoot.suspendRedraw(10000);
    },
    // documented in JXG.AbstractRenderer
    unsuspendRedraw: function() {
        this.svgRoot.unsuspendRedraw(this.suspendHandle);
    // this.svgRoot.unsuspendRedrawAll();
    //this.svgRoot.forceRedraw();
    },
    // documented in AbstractRenderer
    resize: function(w, h) {
        this.svgRoot.setAttribute("width", parseFloat(w));
        this.svgRoot.setAttribute("height", parseFloat(h));
    },
    // documented in JXG.AbstractRenderer
    createTouchpoints: function(n) {
        var i, na1, na2, node;
        this.touchpoints = [];
        for(i = 0; i < n; i++){
            na1 = "touchpoint1_" + i;
            node = this.createPrim("path", na1);
            this.appendChildPrim(node, 19);
            node.setAttributeNS(null, "d", "M 0 0");
            this.touchpoints.push(node);
            this.setPropertyPrim(node, "stroked", "true");
            this.setPropertyPrim(node, "stroke-width", "1px");
            node.setAttributeNS(null, "stroke", "#000000");
            node.setAttributeNS(null, "stroke-opacity", 1.0);
            node.setAttributeNS(null, "display", "none");
            na2 = "touchpoint2_" + i;
            node = this.createPrim("ellipse", na2);
            this.appendChildPrim(node, 19);
            this.updateEllipsePrim(node, 0, 0, 0, 0);
            this.touchpoints.push(node);
            this.setPropertyPrim(node, "stroked", "true");
            this.setPropertyPrim(node, "stroke-width", "1px");
            node.setAttributeNS(null, "stroke", "#000000");
            node.setAttributeNS(null, "stroke-opacity", 1.0);
            node.setAttributeNS(null, "fill", "#ffffff");
            node.setAttributeNS(null, "fill-opacity", 0.0);
            node.setAttributeNS(null, "display", "none");
        }
    },
    // documented in JXG.AbstractRenderer
    showTouchpoint: function(i) {
        if (this.touchpoints && i >= 0 && 2 * i < this.touchpoints.length) {
            this.touchpoints[2 * i].setAttributeNS(null, "display", "inline");
            this.touchpoints[2 * i + 1].setAttributeNS(null, "display", "inline");
        }
    },
    // documented in JXG.AbstractRenderer
    hideTouchpoint: function(i) {
        if (this.touchpoints && i >= 0 && 2 * i < this.touchpoints.length) {
            this.touchpoints[2 * i].setAttributeNS(null, "display", "none");
            this.touchpoints[2 * i + 1].setAttributeNS(null, "display", "none");
        }
    },
    // documented in JXG.AbstractRenderer
    updateTouchpoint: function(i, pos) {
        var x, y, d = 37;
        if (this.touchpoints && i >= 0 && 2 * i < this.touchpoints.length) {
            x = pos[0];
            y = pos[1];
            this.touchpoints[2 * i].setAttributeNS(null, "d", "M " + (x - d) + " " + y + " " + "L " + (x + d) + " " + y + " " + "M " + x + " " + (y - d) + " " + "L " + x + " " + (y + d));
            this.updateEllipsePrim(this.touchpoints[2 * i + 1], pos[0], pos[1], 25, 25);
        }
    },
    /* ********* Dump related stuff *********** */ /**
         * Walk recursively through the DOM subtree of a node and collect all
         * value attributes together with the id of that node.
         * <b>Attention:</b> Only values of nodes having a valid id are taken.
         * @param  {Node} node   root node of DOM subtree that will be searched recursively.
         * @return {Array}      Array with entries of the form [id, value]
         * @private
         */ _getValuesOfDOMElements: function(node) {
        var values = [];
        if (node.nodeType === 1) {
            node = node.firstChild;
            while(node){
                if (node.id !== undefined && node.value !== undefined) {
                    values.push([
                        node.id,
                        node.value
                    ]);
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].concat(values, this._getValuesOfDOMElements(node));
                node = node.nextSibling;
            }
        }
        return values;
    },
    // _getDataUri: function (url, callback) {
    //     var image = new Image();
    //     image.onload = function () {
    //         var canvas = document.createElement("canvas");
    //         canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
    //         canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size
    //         canvas.getContext("2d").drawImage(this, 0, 0);
    //         callback(canvas.toDataURL("image/png"));
    //         canvas.remove();
    //     };
    //     image.src = url;
    // },
    _getImgDataURL: function(svgRoot) {
        var images, len, canvas, ctx, ur, i;
        images = svgRoot.getElementsByTagName("image");
        len = images.length;
        if (len > 0) {
            canvas = document.createElement("canvas");
            //img = new Image();
            for(i = 0; i < len; i++){
                images[i].setAttribute("crossorigin", "anonymous");
                //img.src = images[i].href;
                //img.onload = function() {
                // img.crossOrigin = "anonymous";
                ctx = canvas.getContext("2d");
                canvas.width = images[i].getAttribute("width");
                canvas.height = images[i].getAttribute("height");
                try {
                    ctx.drawImage(images[i], 0, 0, canvas.width, canvas.height);
                    // If the image is not png, the format must be specified here
                    ur = canvas.toDataURL();
                    images[i].setAttribute("xlink:href", ur);
                } catch (err) {
                    console.log("CORS problem! Image can not be used", err);
                }
            }
        //canvas.remove();
        }
        return true;
    },
    /**
         * Return a data URI of the SVG code representing the construction.
         * The SVG code of the construction is base64 encoded. The return string starts
         * with "data:image/svg+xml;base64,...".
         *
         * @param {Boolean} ignoreTexts If true, the foreignObject tag is set to display=none.
         * This is necessary for older versions of Safari. Default: false
         * @returns {String}  data URI string
         *
         * @example
         * var A = board.create('point', [2, 2]);
         *
         * var txt = board.renderer.dumpToDataURI(false);
         * // txt consists of a string of the form
         * // data:image/svg+xml;base64,PHN2Zy. base64 encoded SVG..+PC9zdmc+
         * // Behind the comma, there is the base64 encoded SVG code
         * // which is decoded with atob().
         * // The call of decodeURIComponent(escape(...)) is necessary
         * // to handle unicode strings correctly.
         * var ar = txt.split(',');
         * document.getElementById('output').value = decodeURIComponent(escape(atob(ar[1])));
         *
         * </pre><div id="JXG1bad4bec-6d08-4ce0-9b7f-d817e8dd762d" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <textarea id="output2023" rows="5" cols="50"></textarea>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG1bad4bec-6d08-4ce0-9b7f-d817e8dd762d',
         *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
         *     var A = board.create('point', [2, 2]);
         *
         *     var txt = board.renderer.dumpToDataURI(false);
         *     // txt consists of a string of the form
         *     // data:image/svg+xml;base64,PHN2Zy. base64 encoded SVG..+PC9zdmc+
         *     // Behind the comma, there is the base64 encoded SVG code
         *     // which is decoded with atob().
         *     // The call of decodeURIComponent(escape(...)) is necessary
         *     // to handle unicode strings correctly.
         *     var ar = txt.split(',');
         *     document.getElementById('output2023').value = decodeURIComponent(escape(atob(ar[1])));
         *
         *     })();
         *
         * </script><pre>
         *
         */ dumpToDataURI: function(ignoreTexts) {
        var svgRoot = this.svgRoot, btoa = window.btoa || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$base64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].encode, svg, i, len, values = [];
        // Move all HTML tags (beside the SVG root) of the container
        // to the foreignObject element inside of the svgRoot node
        // Problem:
        // input values are not copied. This can be verified by looking at an innerHTML output
        // of an input element. Therefore, we do it "by hand".
        if (this.container.hasChildNodes() && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.foreignObjLayer)) {
            if (!ignoreTexts) {
                this.foreignObjLayer.setAttribute("display", "inline");
            }
            while(svgRoot.nextSibling){
                // Copy all value attributes
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].concat(values, this._getValuesOfDOMElements(svgRoot.nextSibling));
                this.foreignObjLayer.appendChild(svgRoot.nextSibling);
            }
        }
        this._getImgDataURL(svgRoot);
        // Convert the SVG graphic into a string containing SVG code
        svgRoot.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg = new XMLSerializer().serializeToString(svgRoot);
        if (ignoreTexts !== true) {
            // Handle SVG texts
            // Insert all value attributes back into the svg string
            len = values.length;
            for(i = 0; i < len; i++){
                svg = svg.replace('id="' + values[i][0] + '"', 'id="' + values[i][0] + '" value="' + values[i][1] + '"');
            }
        }
        // if (false) {
        //     // Debug: use example svg image
        //     svg = '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="220" height="220"><rect width="66" height="30" x="21" y="32" stroke="#204a87" stroke-width="2" fill="none" /></svg>';
        // }
        // In IE we have to remove the namespace again.
        // Since 2024 we have to check if the namespace attribute appears twice in one tag, because
        // there might by a svg inside of the svg, e.g. the screenshot icon.
        if (this.isIE && (svg.match(/xmlns="http:\/\/www.w3.org\/2000\/svg"\s+xmlns="http:\/\/www.w3.org\/2000\/svg"/g) || []).length > 1) {
            svg = svg.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"\s+xmlns="http:\/\/www.w3.org\/2000\/svg"/g, "");
        }
        // Safari fails if the svg string contains a "&nbsp;"
        // Obsolete with Safari 12+
        svg = svg.replace(/&nbsp;/g, " ");
        // Replacing &quot;s might be necessary for older Safari versions
        // svg = svg.replace(/url\(&quot;(.*)&quot;\)/g, "url($1)"); // Bug: does not replace matching &quot;s
        // svg = svg.replace(/&quot;/g, "");
        // Move all HTML tags back from
        // the foreignObject element to the container
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(this.foreignObjLayer) && this.foreignObjLayer.hasChildNodes()) {
            // Restore all HTML elements
            while(this.foreignObjLayer.firstChild){
                this.container.appendChild(this.foreignObjLayer.firstChild);
            }
            this.foreignObjLayer.setAttribute("display", "none");
        }
        return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
    },
    /**
         * Convert the SVG construction into an HTML canvas image.
         * This works for all SVG supporting browsers. Implemented as Promise.
         * <p>
         * Might fail if any text element or foreign object element contains SVG. This
         * is the case e.g. for the default fullscreen symbol.
         * <p>
         * For IE, it is realized as function.
         * It works from version 9, with the exception that HTML texts
         * are ignored on IE. The drawing is done with a delay of
         * 200 ms. Otherwise there would be problems with IE.
         *
         * @param {String} canvasId Id of an HTML canvas element
         * @param {Number} w Width in pixel of the dumped image, i.e. of the canvas tag.
         * @param {Number} h Height in pixel of the dumped image, i.e. of the canvas tag.
         * @param {Boolean} ignoreTexts If true, the foreignObject tag is taken out from the SVG root.
         * This is necessary for older versions of Safari. Default: false
         * @returns {Promise}  Promise object
         *
         * @example
         * 	board.renderer.dumpToCanvas('canvas').then(function() { console.log('done'); });
         *
         * @example
         *  // IE 11 example:
         * 	board.renderer.dumpToCanvas('canvas');
         * 	setTimeout(function() { console.log('done'); }, 400);
         */ dumpToCanvas: function(canvasId, w, h, ignoreTexts) {
        var svg, tmpImg, cv, ctx, doc = this.container.ownerDocument;
        // Prepare the canvas element
        cv = doc.getElementById(canvasId);
        // Clear the canvas
        /* eslint-disable no-self-assign */ cv.width = cv.width;
        /* eslint-enable no-self-assign */ ctx = cv.getContext("2d");
        if (w !== undefined && h !== undefined) {
            cv.style.width = parseFloat(w) + "px";
            cv.style.height = parseFloat(h) + "px";
            // Scale twice the CSS size to make the image crisp
            // cv.setAttribute('width', 2 * parseFloat(wOrg));
            // cv.setAttribute('height', 2 * parseFloat(hOrg));
            // ctx.scale(2 * wOrg / w, 2 * hOrg / h);
            cv.setAttribute("width", parseFloat(w));
            cv.setAttribute("height", parseFloat(h));
        }
        // Display the SVG string as data-uri in an HTML img.
        /**
             * @type {Image}
             * @ignore
             * {ignore}
             */ tmpImg = new Image();
        svg = this.dumpToDataURI(ignoreTexts);
        tmpImg.src = svg;
        // Finally, draw the HTML img in the canvas.
        if (!("Promise" in window)) {
            /**
                 * @function
                 * @ignore
                 */ tmpImg.onload = function() {
                // IE needs a pause...
                // Seems to be broken
                window.setTimeout(function() {
                    try {
                        ctx.drawImage(tmpImg, 0, 0, w, h);
                    } catch (err) {
                        console.log("screenshots not longer supported on IE");
                    }
                }, 200);
            };
            return this;
        }
        return new Promise(function(resolve, reject) {
            try {
                tmpImg.onload = function() {
                    ctx.drawImage(tmpImg, 0, 0, w, h);
                    resolve();
                };
            } catch (e) {
                reject(e);
            }
        });
    },
    /**
         * Display SVG image in html img-tag which enables
         * easy download for the user.
         *
         * Support:
         * <ul>
         * <li> IE: No
         * <li> Edge: full
         * <li> Firefox: full
         * <li> Chrome: full
         * <li> Safari: full (No text support in versions prior to 12).
         * </ul>
         *
         * @param {JXG.Board} board Link to the board.
         * @param {String} imgId Optional id of an img object. If given and different from the empty string,
         * the screenshot is copied to this img object. The width and height will be set to the values of the
         * JSXGraph container.
         * @param {Boolean} ignoreTexts If set to true, the foreignObject is taken out of the
         *  SVGRoot and texts are not displayed. This is mandatory for Safari. Default: false
         * @return {Object}       the svg renderer object
         */ screenshot: function(board, imgId, ignoreTexts) {
        var node, doc = this.container.ownerDocument, parent = this.container.parentNode, // cPos,
        // cssTxt,
        canvas, id, img, button, buttonText, w, h, bas = board.attr.screenshot, navbar, navbarDisplay, insert, newImg = false, _copyCanvasToImg, isDebug = false;
        if (this.type === "no") {
            return this;
        }
        w = bas.scale * this.container.getBoundingClientRect().width;
        h = bas.scale * this.container.getBoundingClientRect().height;
        if (imgId === undefined || imgId === "") {
            newImg = true;
            img = new Image(); //doc.createElement('img');
            img.style.width = w + "px";
            img.style.height = h + "px";
        } else {
            newImg = false;
            img = doc.getElementById(imgId);
        }
        // img.crossOrigin = 'anonymous';
        // Create div which contains canvas element and close button
        if (newImg) {
            node = doc.createElement("div");
            node.style.cssText = bas.css;
            node.style.width = w + "px";
            node.style.height = h + "px";
            node.style.zIndex = this.container.style.zIndex + 120;
            // Try to position the div exactly over the JSXGraph board
            node.style.position = "absolute";
            node.style.top = this.container.offsetTop + "px";
            node.style.left = this.container.offsetLeft + "px";
        }
        if ("TURBOPACK compile-time truthy", 1) {
            // Create canvas element and add it to the DOM
            // It will be removed after the image has been stored.
            canvas = doc.createElement("canvas");
            id = Math.random().toString(36).slice(2, 7);
            canvas.setAttribute("id", id);
            canvas.setAttribute("width", w);
            canvas.setAttribute("height", h);
            canvas.style.width = w + "px";
            canvas.style.height = w + "px";
            canvas.style.display = "none";
            parent.appendChild(canvas);
        } else //TURBOPACK unreachable
        ;
        if (newImg) {
            // Create close button
            button = doc.createElement("span");
            buttonText = doc.createTextNode("\u2716");
            button.style.cssText = bas.cssButton;
            button.appendChild(buttonText);
            button.onclick = function() {
                node.parentNode.removeChild(node);
            };
            // Add all nodes
            node.appendChild(img);
            node.appendChild(button);
            parent.insertBefore(node, this.container.nextSibling);
        }
        // Hide navigation bar in board
        navbar = doc.getElementById(this.uniqName('navigationbar'));
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(navbar)) {
            navbarDisplay = navbar.style.display;
            navbar.style.display = "none";
            insert = this.removeToInsertLater(navbar);
        }
        _copyCanvasToImg = function() {
            // Show image in img tag
            img.src = canvas.toDataURL("image/png");
            // Remove canvas node
            if ("TURBOPACK compile-time truthy", 1) {
                parent.removeChild(canvas);
            }
        };
        // Create screenshot in image element
        if ("Promise" in window) {
            this.dumpToCanvas(id, w, h, ignoreTexts).then(_copyCanvasToImg);
        } else {
            // IE
            this.dumpToCanvas(id, w, h, ignoreTexts);
            window.setTimeout(_copyCanvasToImg, 200);
        }
        // Reinsert navigation bar in board
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(navbar)) {
            navbar.style.display = navbarDisplay;
            insert();
        }
        return this;
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].SVGRenderer;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/renderer/vml.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, define: true, AMprocessNode: true, MathJax: true, document: true */ /*jslint nomen: true, plusplus: true, newcap:true*/ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$abstract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/renderer/abstract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/color.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/numerics.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
/**
 * Uses VML to implement the rendering methods defined in {@link JXG.AbstractRenderer}.
 * VML was used in very old Internet Explorer versions upto IE 8.
 *
 *
 * @class JXG.VMLRenderer
 * @augments JXG.AbstractRenderer
 * @param {Node} container Reference to a DOM node containing the board.
 * @see JXG.AbstractRenderer
 * @deprecated
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].VMLRenderer = function(container) {
    this.type = "vml";
    this.container = container;
    this.container.style.overflow = "hidden";
    if (this.container.style.position === "") {
        this.container.style.position = "relative";
    }
    this.container.onselectstart = function() {
        return false;
    };
    this.resolution = 10; // Paths are drawn with a resolution of this.resolution/pixel.
    // Add VML includes and namespace
    // Original: IE <=7
    //container.ownerDocument.createStyleSheet().addRule("v\\:*", "behavior: url(#default#VML);");
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].vmlStylesheet)) {
        container.ownerDocument.namespaces.add("jxgvml", "urn:schemas-microsoft-com:vml");
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].vmlStylesheet = this.container.ownerDocument.createStyleSheet();
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].vmlStylesheet.addRule(".jxgvml", "behavior:url(#default#VML)");
    }
    try {
        if (!container.ownerDocument.namespaces.jxgvml) {
            container.ownerDocument.namespaces.add("jxgvml", "urn:schemas-microsoft-com:vml");
        }
        this.createNode = function(tagName) {
            return container.ownerDocument.createElement("<jxgvml:" + tagName + ' class="jxgvml">');
        };
    } catch (e) {
        this.createNode = function(tagName) {
            return container.ownerDocument.createElement("<" + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="jxgvml">');
        };
    }
    // dash styles
    this.dashArray = [
        "Solid",
        "1 1",
        "ShortDash",
        "Dash",
        "LongDash",
        "ShortDashDot",
        "LongDashDot"
    ];
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].VMLRenderer.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$abstract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].VMLRenderer.prototype, /** @lends JXG.VMLRenderer.prototype */ {
    /**
         * Sets attribute <tt>key</tt> of node <tt>node</tt> to <tt>value</tt>.
         * @param {Node} node A DOM node.
         * @param {String} key Name of the attribute.
         * @param {String} val New value of the attribute.
         * @param {Boolean} [iFlag=false] If false, the attribute's name is case insensitive.
         */ _setAttr: function(node, key, val, iFlag) {
        try {
            if (this.container.ownerDocument.documentMode === 8) {
                node[key] = val;
            } else {
                node.setAttribute(key, val, iFlag);
            }
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug("_setAttr:" /*node.id*/  + " " + key + " " + val + "<br>\n");
        }
    },
    /* ******************************** *
         *  This renderer does not need to
         *  override draw/update* methods
         *  since it provides draw/update*Prim
         *  methods.
         * ******************************** */ /* **************************
         *    Lines
         * **************************/ // documented in AbstractRenderer
    updateTicks: function(ticks) {
        var i, len, c, x, y, r = this.resolution, tickArr = [];
        len = ticks.ticks.length;
        for(i = 0; i < len; i++){
            c = ticks.ticks[i];
            x = c[0];
            y = c[1];
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber(x[0]) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber(x[1])) {
                tickArr.push(" m " + Math.round(r * x[0]) + ", " + Math.round(r * y[0]) + " l " + Math.round(r * x[1]) + ", " + Math.round(r * y[1]) + " ");
            }
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(ticks.rendNode)) {
            ticks.rendNode = this.createPrim("path", ticks.id);
            this.appendChildPrim(ticks.rendNode, ticks.evalVisProp('layer'));
        }
        this._setAttr(ticks.rendNode, "stroked", "true");
        this._setAttr(ticks.rendNode, "strokecolor", ticks.evalVisProp('strokecolor'), 1);
        this._setAttr(ticks.rendNode, "strokeweight", ticks.evalVisProp('strokewidth'));
        this._setAttr(ticks.rendNodeStroke, "opacity", ticks.evalVisProp('strokeopacity') * 100 + "%");
        this.updatePathPrim(ticks.rendNode, tickArr, ticks.board);
    },
    /* **************************
         *    Text related stuff
         * **************************/ // Already documented in JXG.AbstractRenderer
    displayCopyright: function(str, fontsize) {
        var node, t;
        node = this.createNode("textbox");
        node.style.position = "absolute";
        this._setAttr(node, "id", this.container.id + "_" + "licenseText");
        node.style.left = 20;
        node.style.top = 2;
        node.style.fontSize = fontsize;
        node.style.color = "#356AA0";
        node.style.fontFamily = "Arial,Helvetica,sans-serif";
        this._setAttr(node, "opacity", "30%");
        node.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11='1.0', sizingMethod='auto expand', enabled = false) progid:DXImageTransform.Microsoft.Alpha(opacity = 30, enabled = true)";
        t = this.container.ownerDocument.createTextNode(str);
        node.appendChild(t);
        this.appendChildPrim(node, 0);
    },
    // documented in AbstractRenderer
    drawInternalText: function(el) {
        var node;
        node = this.createNode("textbox");
        node.style.position = "absolute";
        el.rendNodeText = this.container.ownerDocument.createTextNode("");
        node.appendChild(el.rendNodeText);
        this.appendChildPrim(node, 9);
        node.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11='1.0', sizingMethod='auto expand', enabled = false) progid:DXImageTransform.Microsoft.Alpha(opacity = 100, enabled = false)";
        return node;
    },
    // documented in AbstractRenderer
    updateInternalText: function(el) {
        var v, content = el.plaintext, m = this.joinTransforms(el, el.transformations), offset = [
            0,
            0
        ], maxX, maxY, minX, minY, i, node = el.rendNode, p = [], ev_ax = el.getAnchorX(), ev_ay = el.getAnchorY();
        if (!isNaN(el.coords.scrCoords[1] + el.coords.scrCoords[2])) {
            // Horizontal
            if (ev_ax === "right") {
                offset[0] = 1;
            } else if (ev_ax === "middle") {
                offset[0] = 0.5;
            } // default (ev_ax === 'left') offset[0] = 0;
            // Vertical
            if (ev_ay === "bottom") {
                offset[1] = 1;
            } else if (ev_ay === "middle") {
                offset[1] = 0.5;
            } // default (ev_ay === 'top') offset[1] = 0;
            // Compute maxX, maxY, minX, minY
            p[0] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matVecMult(m, [
                1,
                el.coords.scrCoords[1] - offset[0] * el.size[0],
                el.coords.scrCoords[2] + (1 - offset[1]) * el.size[1] + this.vOffsetText
            ]);
            p[0][1] /= p[0][0];
            p[0][2] /= p[0][0];
            p[1] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matVecMult(m, [
                1,
                el.coords.scrCoords[1] + (1 - offset[0]) * el.size[0],
                el.coords.scrCoords[2] + (1 - offset[1]) * el.size[1] + this.vOffsetText
            ]);
            p[1][1] /= p[1][0];
            p[1][2] /= p[1][0];
            p[2] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matVecMult(m, [
                1,
                el.coords.scrCoords[1] + (1 - offset[0]) * el.size[0],
                el.coords.scrCoords[2] - offset[1] * el.size[1] + this.vOffsetText
            ]);
            p[2][1] /= p[2][0];
            p[2][2] /= p[2][0];
            p[3] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matVecMult(m, [
                1,
                el.coords.scrCoords[1] - offset[0] * el.size[0],
                el.coords.scrCoords[2] - offset[1] * el.size[1] + this.vOffsetText
            ]);
            p[3][1] /= p[3][0];
            p[3][2] /= p[3][0];
            maxX = p[0][1];
            minX = p[0][1];
            maxY = p[0][2];
            minY = p[0][2];
            for(i = 1; i < 4; i++){
                maxX = Math.max(maxX, p[i][1]);
                minX = Math.min(minX, p[i][1]);
                maxY = Math.max(maxY, p[i][2]);
                minY = Math.min(minY, p[i][2]);
            }
            // Horizontal
            v = offset[0] === 1 ? Math.floor(el.board.canvasWidth - maxX) : Math.floor(minX);
            if (el.visPropOld.left !== ev_ax + v) {
                if (offset[0] === 1) {
                    el.rendNode.style.right = v + "px";
                    el.rendNode.style.left = "auto";
                } else {
                    el.rendNode.style.left = v + "px";
                    el.rendNode.style.right = "auto";
                }
                el.visPropOld.left = ev_ax + v;
            }
            // Vertical
            v = offset[1] === 1 ? Math.floor(el.board.canvasHeight - maxY) : Math.floor(minY);
            if (el.visPropOld.top !== ev_ay + v) {
                if (offset[1] === 1) {
                    el.rendNode.style.bottom = v + "px";
                    el.rendNode.style.top = "auto";
                } else {
                    el.rendNode.style.top = v + "px";
                    el.rendNode.style.bottom = "auto";
                }
                el.visPropOld.top = ev_ay + v;
            }
        }
        if (el.htmlStr !== content) {
            el.rendNodeText.data = content;
            el.htmlStr = content;
        }
        //this.transformRect(el, el.transformations);
        node.filters.item(0).M11 = m[1][1];
        node.filters.item(0).M12 = m[1][2];
        node.filters.item(0).M21 = m[2][1];
        node.filters.item(0).M22 = m[2][2];
        node.filters.item(0).enabled = true;
    },
    /* **************************
         *    Image related stuff
         * **************************/ // Already documented in JXG.AbstractRenderer
    drawImage: function(el) {
        // IE 8: Bilder ueber data URIs werden bis 32kB unterstuetzt.
        var node;
        node = this.container.ownerDocument.createElement("img");
        node.style.position = "absolute";
        this._setAttr(node, "id", this.container.id + "_" + el.id);
        this.container.appendChild(node);
        this.appendChildPrim(node, el.evalVisProp('layer'));
        // Adding the rotation filter. This is always filter item 0:
        // node.filters.item(0), see transformRect
        // Also add the alpha filter. This is always filter item 1
        // node.filters.item(1), see setObjectFillColor and setObjectSTrokeColor
        //node.style.filter = node.style['-ms-filter'] = "progid:DXImageTransform.Microsoft.Matrix(M11='1.0', sizingMethod='auto expand')";
        node.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11='1.0', sizingMethod='auto expand') progid:DXImageTransform.Microsoft.Alpha(opacity = 100, enabled = false)";
        el.rendNode = node;
        this.updateImage(el);
    },
    // Already documented in JXG.AbstractRenderer
    transformRect: function(el, t) {
        var m, maxX, maxY, minX, minY, i, node = el.rendNode, p = [], len = t.length;
        if (len > 0) {
            /*
                nt = el.rendNode.style.filter.toString();
                if (!nt.match(/DXImageTransform/)) {
                    node.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11='1.0', sizingMethod='auto expand') " + nt;
                }
                */ m = this.joinTransforms(el, t);
            p[0] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matVecMult(m, el.coords.scrCoords);
            p[0][1] /= p[0][0];
            p[0][2] /= p[0][0];
            p[1] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matVecMult(m, [
                1,
                el.coords.scrCoords[1] + el.size[0],
                el.coords.scrCoords[2]
            ]);
            p[1][1] /= p[1][0];
            p[1][2] /= p[1][0];
            p[2] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matVecMult(m, [
                1,
                el.coords.scrCoords[1] + el.size[0],
                el.coords.scrCoords[2] - el.size[1]
            ]);
            p[2][1] /= p[2][0];
            p[2][2] /= p[2][0];
            p[3] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].matVecMult(m, [
                1,
                el.coords.scrCoords[1],
                el.coords.scrCoords[2] - el.size[1]
            ]);
            p[3][1] /= p[3][0];
            p[3][2] /= p[3][0];
            maxX = p[0][1];
            minX = p[0][1];
            maxY = p[0][2];
            minY = p[0][2];
            for(i = 1; i < 4; i++){
                maxX = Math.max(maxX, p[i][1]);
                minX = Math.min(minX, p[i][1]);
                maxY = Math.max(maxY, p[i][2]);
                minY = Math.min(minY, p[i][2]);
            }
            node.style.left = Math.floor(minX) + "px";
            node.style.top = Math.floor(minY) + "px";
            node.filters.item(0).M11 = m[1][1];
            node.filters.item(0).M12 = m[1][2];
            node.filters.item(0).M21 = m[2][1];
            node.filters.item(0).M22 = m[2][2];
            node.filters.item(0).enabled = true;
        }
    },
    // Already documented in JXG.AbstractRenderer
    updateImageURL: function(el) {
        var url = el.eval(el.url);
        this._setAttr(el.rendNode, "src", url);
    },
    /* **************************
         * Render primitive objects
         * **************************/ // Already documented in JXG.AbstractRenderer
    appendChildPrim: function(node, level) {
        // For trace nodes
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(level)) {
            level = 0;
        }
        node.style.zIndex = level;
        this.container.appendChild(node);
        return node;
    },
    // Already documented in JXG.AbstractRenderer
    appendNodesToElement: function(el, type) {
        if (type === "shape" || type === "path" || type === "polygon") {
            el.rendNodePath = this.getElementById(el.id + "_path");
        }
        el.rendNodeFill = this.getElementById(el.id + "_fill");
        el.rendNodeStroke = this.getElementById(el.id + "_stroke");
        el.rendNodeShadow = this.getElementById(el.id + "_shadow");
        el.rendNode = this.getElementById(el.id);
    },
    // Already documented in JXG.AbstractRenderer
    createPrim: function(type, id) {
        var node, pathNode, fillNode = this.createNode("fill"), strokeNode = this.createNode("stroke"), shadowNode = this.createNode("shadow");
        this._setAttr(fillNode, "id", this.container.id + "_" + id + "_fill");
        this._setAttr(strokeNode, "id", this.container.id + "_" + id + "_stroke");
        this._setAttr(shadowNode, "id", this.container.id + "_" + id + "_shadow");
        if (type === "circle" || type === "ellipse") {
            node = this.createNode("oval");
            node.appendChild(fillNode);
            node.appendChild(strokeNode);
            node.appendChild(shadowNode);
        } else if (type === "polygon" || type === "path" || type === "shape" || type === "line") {
            node = this.createNode("shape");
            node.appendChild(fillNode);
            node.appendChild(strokeNode);
            node.appendChild(shadowNode);
            pathNode = this.createNode("path");
            this._setAttr(pathNode, "id", this.container.id + "_" + id + "_path");
            node.appendChild(pathNode);
        } else {
            node = this.createNode(type);
            node.appendChild(fillNode);
            node.appendChild(strokeNode);
            node.appendChild(shadowNode);
        }
        node.style.position = "absolute";
        node.style.left = "0px";
        node.style.top = "0px";
        this._setAttr(node, "id", this.container.id + "_" + id);
        return node;
    },
    // Already documented in JXG.AbstractRenderer
    remove: function(node) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(node)) {
            node.removeNode(true);
        }
    },
    // Already documented in JXG.AbstractRenderer
    makeArrows: function(el) {
        var nodeStroke, ev_fa = el.evalVisProp('firstarrow'), ev_la = el.evalVisProp('lastarrow');
        if (el.visPropOld.firstarrow === ev_fa && el.visPropOld.lastarrow === ev_la) {
            return;
        }
        if (ev_fa) {
            nodeStroke = el.rendNodeStroke;
            this._setAttr(nodeStroke, "startarrow", "block");
            this._setAttr(nodeStroke, "startarrowlength", "long");
        } else {
            nodeStroke = el.rendNodeStroke;
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(nodeStroke)) {
                this._setAttr(nodeStroke, "startarrow", "none");
            }
        }
        if (ev_la) {
            nodeStroke = el.rendNodeStroke;
            this._setAttr(nodeStroke, "id", this.container.id + "_" + el.id + "stroke");
            this._setAttr(nodeStroke, "endarrow", "block");
            this._setAttr(nodeStroke, "endarrowlength", "long");
        } else {
            nodeStroke = el.rendNodeStroke;
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(nodeStroke)) {
                this._setAttr(nodeStroke, "endarrow", "none");
            }
        }
        el.visPropOld.firstarrow = ev_fa;
        el.visPropOld.lastarrow = ev_la;
    },
    // Already documented in JXG.AbstractRenderer
    updateEllipsePrim: function(node, x, y, rx, ry) {
        node.style.left = Math.floor(x - rx) + "px";
        node.style.top = Math.floor(y - ry) + "px";
        node.style.width = Math.floor(Math.abs(rx) * 2) + "px";
        node.style.height = Math.floor(Math.abs(ry) * 2) + "px";
    },
    // Already documented in JXG.AbstractRenderer
    updateLinePrim: function(node, p1x, p1y, p2x, p2y, board) {
        var s, r = this.resolution;
        if (!isNaN(p1x + p1y + p2x + p2y)) {
            s = [
                "m ",
                Math.floor(r * p1x),
                ", ",
                Math.floor(r * p1y),
                " l ",
                Math.floor(r * p2x),
                ", ",
                Math.floor(r * p2y)
            ];
            this.updatePathPrim(node, s, board);
        }
    },
    // Already documented in JXG.AbstractRenderer
    updatePathPrim: function(node, pointString, board) {
        var x = board.canvasWidth, y = board.canvasHeight;
        if (pointString.length <= 0) {
            pointString = [
                "m 0,0"
            ];
        }
        node.style.width = x;
        node.style.height = y;
        this._setAttr(node, "coordsize", [
            Math.floor(this.resolution * x),
            Math.floor(this.resolution * y)
        ].join(","));
        this._setAttr(node, "path", pointString.join(""));
    },
    // Already documented in JXG.AbstractRenderer
    updatePathStringPoint: function(el, size, type) {
        var s = [], mround = Math.round, scr = el.coords.scrCoords, sqrt32 = size * Math.sqrt(3) * 0.5, s05 = size * 0.5, r = this.resolution;
        if (type === "x") {
            s.push([
                " m ",
                mround(r * (scr[1] - size)),
                ", ",
                mround(r * (scr[2] - size)),
                " l ",
                mround(r * (scr[1] + size)),
                ", ",
                mround(r * (scr[2] + size)),
                " m ",
                mround(r * (scr[1] + size)),
                ", ",
                mround(r * (scr[2] - size)),
                " l ",
                mround(r * (scr[1] - size)),
                ", ",
                mround(r * (scr[2] + size))
            ].join(""));
        } else if (type === "+") {
            s.push([
                " m ",
                mround(r * (scr[1] - size)),
                ", ",
                mround(r * scr[2]),
                " l ",
                mround(r * (scr[1] + size)),
                ", ",
                mround(r * scr[2]),
                " m ",
                mround(r * scr[1]),
                ", ",
                mround(r * (scr[2] - size)),
                " l ",
                mround(r * scr[1]),
                ", ",
                mround(r * (scr[2] + size))
            ].join(""));
        } else if (type === "<>" || type === "<<>>") {
            if (type === "<<>>") {
                size *= 1.41;
            }
            s.push([
                " m ",
                mround(r * (scr[1] - size)),
                ", ",
                mround(r * scr[2]),
                " l ",
                mround(r * scr[1]),
                ", ",
                mround(r * (scr[2] + size)),
                " l ",
                mround(r * (scr[1] + size)),
                ", ",
                mround(r * scr[2]),
                " l ",
                mround(r * scr[1]),
                ", ",
                mround(r * (scr[2] - size)),
                " x e "
            ].join(""));
        } else if (type === "^") {
            s.push([
                " m ",
                mround(r * scr[1]),
                ", ",
                mround(r * (scr[2] - size)),
                " l ",
                mround(r * (scr[1] - sqrt32)),
                ", ",
                mround(r * (scr[2] + s05)),
                " l ",
                mround(r * (scr[1] + sqrt32)),
                ", ",
                mround(r * (scr[2] + s05)),
                " x e "
            ].join(""));
        } else if (type === "v") {
            s.push([
                " m ",
                mround(r * scr[1]),
                ", ",
                mround(r * (scr[2] + size)),
                " l ",
                mround(r * (scr[1] - sqrt32)),
                ", ",
                mround(r * (scr[2] - s05)),
                " l ",
                mround(r * (scr[1] + sqrt32)),
                ", ",
                mround(r * (scr[2] - s05)),
                " x e "
            ].join(""));
        } else if (type === ">") {
            s.push([
                " m ",
                mround(r * (scr[1] + size)),
                ", ",
                mround(r * scr[2]),
                " l ",
                mround(r * (scr[1] - s05)),
                ", ",
                mround(r * (scr[2] - sqrt32)),
                " l ",
                mround(r * (scr[1] - s05)),
                ", ",
                mround(r * (scr[2] + sqrt32)),
                " l ",
                mround(r * (scr[1] + size)),
                ", ",
                mround(r * scr[2])
            ].join(""));
        } else if (type === "<") {
            s.push([
                " m ",
                mround(r * (scr[1] - size)),
                ", ",
                mround(r * scr[2]),
                " l ",
                mround(r * (scr[1] + s05)),
                ", ",
                mround(r * (scr[2] - sqrt32)),
                " l ",
                mround(r * (scr[1] + s05)),
                ", ",
                mround(r * (scr[2] + sqrt32)),
                " x e "
            ].join(""));
        }
        return s;
    },
    // Already documented in JXG.AbstractRenderer
    updatePathStringPrim: function(el) {
        var i, scr, pStr = [], r = this.resolution, mround = Math.round, symbm = " m ", symbl = " l ", symbc = " c ", nextSymb = symbm, len = Math.min(el.numberPoints, 8192); // otherwise IE 7 crashes in hilbert.html
        if (el.numberPoints <= 0) {
            return "";
        }
        len = Math.min(len, el.points.length);
        if (el.bezierDegree === 1) {
            /*
                if (isNotPlot && el.board.options.curve.RDPsmoothing) {
                    el.points = Numerics.RamerDouglasPeucker(el.points, 1.0);
                }
                */ for(i = 0; i < len; i++){
                scr = el.points[i].scrCoords;
                if (isNaN(scr[1]) || isNaN(scr[2])) {
                    // PenUp
                    nextSymb = symbm;
                } else {
                    // IE has problems with values  being too far away.
                    if (scr[1] > 20000.0) {
                        scr[1] = 20000.0;
                    } else if (scr[1] < -20000.0) {
                        scr[1] = -20000.0;
                    }
                    if (scr[2] > 20000.0) {
                        scr[2] = 20000.0;
                    } else if (scr[2] < -20000.0) {
                        scr[2] = -20000.0;
                    }
                    pStr.push([
                        nextSymb,
                        mround(r * scr[1]),
                        ", ",
                        mround(r * scr[2])
                    ].join(""));
                    nextSymb = symbl;
                }
            }
        } else if (el.bezierDegree === 3) {
            i = 0;
            while(i < len){
                scr = el.points[i].scrCoords;
                if (isNaN(scr[1]) || isNaN(scr[2])) {
                    // PenUp
                    nextSymb = symbm;
                } else {
                    pStr.push([
                        nextSymb,
                        mround(r * scr[1]),
                        ", ",
                        mround(r * scr[2])
                    ].join(""));
                    if (nextSymb === symbc) {
                        i += 1;
                        scr = el.points[i].scrCoords;
                        pStr.push([
                            " ",
                            mround(r * scr[1]),
                            ", ",
                            mround(r * scr[2])
                        ].join(""));
                        i += 1;
                        scr = el.points[i].scrCoords;
                        pStr.push([
                            " ",
                            mround(r * scr[1]),
                            ", ",
                            mround(r * scr[2])
                        ].join(""));
                    }
                    nextSymb = symbc;
                }
                i += 1;
            }
        }
        pStr.push(" e");
        return pStr;
    },
    // Already documented in JXG.AbstractRenderer
    updatePathStringBezierPrim: function(el) {
        var i, j, k, scr, lx, ly, pStr = [], f = el.evalVisProp('strokewidth'), r = this.resolution, mround = Math.round, symbm = " m ", symbl = " c ", nextSymb = symbm, isNoPlot = el.evalVisProp('curvetype') !== "plot", len = Math.min(el.numberPoints, 8192); // otherwise IE 7 crashes in hilbert.html
        if (el.numberPoints <= 0) {
            return "";
        }
        if (isNoPlot && el.board.options.curve.RDPsmoothing) {
            el.points = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].RamerDouglasPeucker(el.points, 1.0);
        }
        len = Math.min(len, el.points.length);
        for(j = 1; j < 3; j++){
            nextSymb = symbm;
            for(i = 0; i < len; i++){
                scr = el.points[i].scrCoords;
                if (isNaN(scr[1]) || isNaN(scr[2])) {
                    // PenUp
                    nextSymb = symbm;
                } else {
                    // IE has problems with values  being too far away.
                    if (scr[1] > 20000.0) {
                        scr[1] = 20000.0;
                    } else if (scr[1] < -20000.0) {
                        scr[1] = -20000.0;
                    }
                    if (scr[2] > 20000.0) {
                        scr[2] = 20000.0;
                    } else if (scr[2] < -20000.0) {
                        scr[2] = -20000.0;
                    }
                    if (nextSymb === symbm) {
                        pStr.push([
                            nextSymb,
                            mround(r * scr[1]),
                            " ",
                            mround(r * scr[2])
                        ].join(""));
                    } else {
                        k = 2 * j;
                        pStr.push([
                            nextSymb,
                            mround(r * (lx + (scr[1] - lx) * 0.333 + f * (k * Math.random() - j))),
                            " ",
                            mround(r * (ly + (scr[2] - ly) * 0.333 + f * (k * Math.random() - j))),
                            " ",
                            mround(r * (lx + (scr[1] - lx) * 0.666 + f * (k * Math.random() - j))),
                            " ",
                            mround(r * (ly + (scr[2] - ly) * 0.666 + f * (k * Math.random() - j))),
                            " ",
                            mround(r * scr[1]),
                            " ",
                            mround(r * scr[2])
                        ].join(""));
                    }
                    nextSymb = symbl;
                    lx = scr[1];
                    ly = scr[2];
                }
            }
        }
        pStr.push(" e");
        return pStr;
    },
    // Already documented in JXG.AbstractRenderer
    updatePolygonPrim: function(node, el) {
        var i, len = el.vertices.length, r = this.resolution, scr, pStr = [];
        this._setAttr(node, "stroked", "false");
        scr = el.vertices[0].coords.scrCoords;
        if (isNaN(scr[1] + scr[2])) {
            return;
        }
        pStr.push([
            "m ",
            Math.floor(r * scr[1]),
            ",",
            Math.floor(r * scr[2]),
            " l "
        ].join(""));
        for(i = 1; i < len - 1; i++){
            if (el.vertices[i].isReal) {
                scr = el.vertices[i].coords.scrCoords;
                if (isNaN(scr[1] + scr[2])) {
                    return;
                }
                pStr.push(Math.floor(r * scr[1]) + "," + Math.floor(r * scr[2]));
            } else {
                this.updatePathPrim(node, "", el.board);
                return;
            }
            if (i < len - 2) {
                pStr.push(", ");
            }
        }
        pStr.push(" x e");
        this.updatePathPrim(node, pStr, el.board);
    },
    // Already documented in JXG.AbstractRenderer
    updateRectPrim: function(node, x, y, w, h) {
        node.style.left = Math.floor(x) + "px";
        node.style.top = Math.floor(y) + "px";
        if (w >= 0) {
            node.style.width = w + "px";
        }
        if (h >= 0) {
            node.style.height = h + "px";
        }
    },
    /* **************************
         *  Set Attributes
         * **************************/ // Already documented in JXG.AbstractRenderer
    setPropertyPrim: function(node, key, val) {
        var keyVml = "", v;
        switch(key){
            case "stroke":
                keyVml = "strokecolor";
                break;
            case "stroke-width":
                keyVml = "strokeweight";
                break;
            case "stroke-dasharray":
                keyVml = "dashstyle";
                break;
        }
        if (keyVml !== "") {
            v = val;
            this._setAttr(node, keyVml, v);
        }
    },
    // Already documented in JXG.AbstractRenderer
    display: function(el, val) {
        if (el && el.rendNode) {
            el.visPropOld.visible = val;
            if (val) {
                el.rendNode.style.visibility = "inherit";
            } else {
                el.rendNode.style.visibility = "hidden";
            }
        }
    },
    // Already documented in JXG.AbstractRenderer
    show: function(el) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("Board.renderer.show()", "Board.renderer.display()");
        if (el && el.rendNode) {
            el.rendNode.style.visibility = "inherit";
        }
    },
    // Already documented in JXG.AbstractRenderer
    hide: function(el) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("Board.renderer.hide()", "Board.renderer.display()");
        if (el && el.rendNode) {
            el.rendNode.style.visibility = "hidden";
        }
    },
    // Already documented in JXG.AbstractRenderer
    setDashStyle: function(el, visProp) {
        var node;
        if (visProp.dash >= 0) {
            node = el.rendNodeStroke;
            this._setAttr(node, "dashstyle", this.dashArray[visProp.dash]);
        }
    },
    // Already documented in JXG.AbstractRenderer
    setGradient: function(el) {
        var nodeFill = el.rendNodeFill, ev_g = el.evalVisProp('gradient');
        if (ev_g === "linear") {
            this._setAttr(nodeFill, "type", "gradient");
            this._setAttr(nodeFill, "color2", el.evalVisProp('gradientsecondcolor'));
            this._setAttr(nodeFill, "opacity2", el.evalVisProp('gradientsecondopacity'));
            this._setAttr(nodeFill, "angle", el.evalVisProp('gradientangle'));
        } else if (ev_g === "radial") {
            this._setAttr(nodeFill, "type", "gradientradial");
            this._setAttr(nodeFill, "color2", el.evalVisProp('gradientsecondcolor'));
            this._setAttr(nodeFill, "opacity2", el.evalVisProp('gradientsecondopacity'));
            this._setAttr(nodeFill, "focusposition", el.evalVisProp('gradientpositionx') * 100 + "%," + el.evalVisProp('gradientpositiony') * 100 + "%");
            this._setAttr(nodeFill, "focussize", "0,0");
        } else {
            this._setAttr(nodeFill, "type", "solid");
        }
    },
    // Already documented in JXG.AbstractRenderer
    setObjectFillColor: function(el, color, opacity) {
        var rgba = color, c, rgbo, o = opacity, oo, node = el.rendNode;
        o = o > 0 ? o : 0;
        if (el.visPropOld.fillcolor === rgba && el.visPropOld.fillopacity === o) {
            return;
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(rgba) && rgba !== false) {
            // RGB, not RGBA
            if (rgba.length !== 9) {
                c = rgba;
                oo = o;
            // True RGBA, not RGB
            } else {
                rgbo = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgba2rgbo(rgba);
                c = rgbo[0];
                oo = o * rgbo[1];
            }
            if (c === "none" || c === false) {
                this._setAttr(el.rendNode, "filled", "false");
            } else {
                this._setAttr(el.rendNode, "filled", "true");
                this._setAttr(el.rendNode, "fillcolor", c);
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(oo) && el.rendNodeFill) {
                    this._setAttr(el.rendNodeFill, "opacity", oo * 100 + "%");
                }
            }
            if (el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_IMAGE) {
                /*
                    t = el.rendNode.style.filter.toString();
                    if (t.match(/alpha/)) {
                        el.rendNode.style.filter = t.replace(/alpha\(opacity *= *[0-9\.]+\)/, 'alpha(opacity = ' + (oo * 100) + ')');
                    } else {
                        el.rendNode.style.filter += ' alpha(opacity = ' + (oo * 100) + ')';
                    }
                    */ if (node.filters.length > 1) {
                    // Why am I sometimes seeing node.filters.length==0 here when I move the pointer around near [0,0]?
                    // Setting axes:true shows text labels!
                    node.filters.item(1).opacity = Math.round(oo * 100); // Why does setObjectFillColor not use Math.round?
                    node.filters.item(1).enabled = true;
                }
            }
        }
        el.visPropOld.fillcolor = rgba;
        el.visPropOld.fillopacity = o;
    },
    // Already documented in JXG.AbstractRenderer
    setObjectStrokeColor: function(el, color, opacity) {
        var rgba = color, c, rgbo, o = opacity, oo, node = el.rendNode, nodeStroke;
        o = o > 0 ? o : 0;
        if (el.visPropOld.strokecolor === rgba && el.visPropOld.strokeopacity === o) {
            return;
        }
        // this looks like it could be merged with parts of VMLRenderer.setObjectFillColor
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(rgba) && rgba !== false) {
            // RGB, not RGBA
            if (rgba.length !== 9) {
                c = rgba;
                oo = o;
            // True RGBA, not RGB
            } else {
                rgbo = color.rgba2rgbo(rgba);
                c = rgbo[0];
                oo = o * rgbo[1];
            }
            if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_TEXT) {
                //node.style.filter = ' alpha(opacity = ' + oo + ')';
                /*
                    t = node.style.filter.toString();
                    if (t.match(/alpha/)) {
                        node.style.filter =
                        t.replace(/alpha\(opacity *= *[0-9\.]+\)/, 'alpha(opacity = ' + oo + ')');
                    } else {
                        node.style.filter += ' alpha(opacity = ' + oo + ')';
                    }
                    */ if (node.filters.length > 1) {
                    // Why am I sometimes seeing node.filters.length==0 here when I move the pointer around near [0,0]?
                    // Setting axes:true shows text labels!
                    node.filters.item(1).opacity = Math.round(oo * 100);
                    node.filters.item(1).enabled = true;
                }
                node.style.color = c;
            } else {
                if (c !== false) {
                    this._setAttr(node, "stroked", "true");
                    this._setAttr(node, "strokecolor", c);
                }
                nodeStroke = el.rendNodeStroke;
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(oo) && el.type !== __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_IMAGE) {
                    this._setAttr(nodeStroke, "opacity", oo * 100 + "%");
                }
            }
        }
        el.visPropOld.strokecolor = rgba;
        el.visPropOld.strokeopacity = o;
    },
    // Already documented in JXG.AbstractRenderer
    setObjectStrokeWidth: function(el, width) {
        var w = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].evaluate(width), node;
        if (isNaN(w) || el.visPropOld.strokewidth === w) {
            return;
        }
        node = el.rendNode;
        this.setPropertyPrim(node, "stroked", "true");
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(w)) {
            this.setPropertyPrim(node, "stroke-width", w);
            if (w === 0 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(el.rendNodeStroke)) {
                this._setAttr(node, "stroked", "false");
            }
        }
        el.visPropOld.strokewidth = w;
    },
    // Already documented in JXG.AbstractRenderer
    setShadow: function(el) {
        var nodeShadow = el.rendNodeShadow, ev_s = el.evalVisProp('shadow');
        if (!nodeShadow || el.visPropOld.shadow === ev_s) {
            return;
        }
        if (ev_s) {
            this._setAttr(nodeShadow, "On", "True");
            this._setAttr(nodeShadow, "Offset", "3pt,3pt");
            this._setAttr(nodeShadow, "Opacity", "60%");
            this._setAttr(nodeShadow, "Color", "#aaaaaa");
        } else {
            this._setAttr(nodeShadow, "On", "False");
        }
        el.visPropOld.shadow = ev_s;
    },
    /* **************************
         * renderer control
         * **************************/ // Already documented in JXG.AbstractRenderer
    suspendRedraw: function() {
        this.container.style.display = "none";
    },
    // Already documented in JXG.AbstractRenderer
    unsuspendRedraw: function() {
        this.container.style.display = "";
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].VMLRenderer;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/renderer/canvas.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, define: true, AMprocessNode: true, document: true, Image: true, module: true, require: true */ /*jslint nomen: true, plusplus: true, newcap:true*/ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$abstract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/renderer/abstract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/env.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$uuid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/uuid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/color.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coords.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/numerics.js [app-client] (ecmascript)");
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
// import $__canvas from "canvas.js";
/**
 * Uses HTML Canvas to implement the rendering methods defined in {@link JXG.AbstractRenderer}.
 *
 * @class JXG.CanvasRenderer
 * @augments JXG.AbstractRenderer
 * @param {Node} container Reference to a DOM node containing the board.
 * @param {Object} dim The dimensions of the board
 * @param {Number} dim.width
 * @param {Number} dim.height
 * @see JXG.AbstractRenderer
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].CanvasRenderer = function(container, dim) {
    this.type = "canvas";
    this.canvasRoot = null;
    this.suspendHandle = null;
    this.canvasId = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$uuid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].genUUID();
    this.canvasNamespace = null;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isBrowser) {
        this.container = container;
        this.container.style.MozUserSelect = "none";
        this.container.style.userSelect = "none";
        this.container.style.overflow = "hidden";
        if (this.container.style.position === "") {
            this.container.style.position = "relative";
        }
        this.container.innerHTML = [
            '<canvas id="',
            this.canvasId,
            '" width="',
            dim.width,
            'px" height="',
            dim.height,
            'px"></canvas>'
        ].join("");
        this.canvasRoot = this.container.ownerDocument.getElementById(this.canvasId);
        this.canvasRoot.style.display = "block";
        this.context = this.canvasRoot.getContext("2d");
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNode()) {
        try {
            this.canvasRoot = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createCanvas(500, 500);
            this.context = this.canvasRoot.getContext("2d");
        } catch (err) {
            throw new Error('JXG.createCanvas not available.\n' + 'Install the npm package `canvas`\n' + 'and call:\n' + '    import { createCanvas } from "canvas.js";\n' + '    JXG.createCanvas = createCanvas;\n');
        }
    }
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].CanvasRenderer.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$abstract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].CanvasRenderer.prototype, /** @lends JXG.CanvasRenderer.prototype */ {
    /* **************************
         *   private methods only used
         *   in this renderer. Should
         *   not be called from outside.
         * **************************/ /**
         * Draws a filled polygon.
         * @param {Array} shape A matrix presented by a two dimensional array of numbers.
         * @see JXG.AbstractRenderer#drawArrows
         * @private
         */ _drawPolygon: function(shape, degree, doFill) {
        var i, len = shape.length, context = this.context;
        if (len > 0) {
            if (doFill) {
                context.lineWidth = 0;
            }
            context.beginPath();
            context.moveTo(shape[0][0], shape[0][1]);
            if (degree === 1) {
                for(i = 1; i < len; i++){
                    context.lineTo(shape[i][0], shape[i][1]);
                }
            } else {
                for(i = 1; i < len; i += 3){
                    context.bezierCurveTo(shape[i][0], shape[i][1], shape[i + 1][0], shape[i + 1][1], shape[i + 2][0], shape[i + 2][1]);
                }
            }
            if (doFill) {
                context.lineTo(shape[0][0], shape[0][1]);
                context.closePath();
                context.fill("evenodd");
            } else {
                context.stroke();
            }
        }
    },
    /**
         * Sets the fill color and fills an area.
         * @param {JXG.GeometryElement} el An arbitrary JSXGraph element, preferably one with an area.
         * @private
         */ _fill: function(el) {
        var context = this.context;
        context.save();
        if (this._setColor(el, "fill")) {
            context.fill("evenodd");
        }
        context.restore();
    },
    /**
         * Rotates a point around <tt>(0, 0)</tt> by a given angle.
         * @param {Number} angle An angle, given in rad.
         * @param {Number} x X coordinate of the point.
         * @param {Number} y Y coordinate of the point.
         * @returns {Array} An array containing the x and y coordinate of the rotated point.
         * @private
         */ _rotatePoint: function(angle, x, y) {
        return [
            x * Math.cos(angle) - y * Math.sin(angle),
            x * Math.sin(angle) + y * Math.cos(angle)
        ];
    },
    /**
         * Rotates an array of points around <tt>(0, 0)</tt>.
         * @param {Array} shape An array of array of point coordinates.
         * @param {Number} angle The angle in rad the points are rotated by.
         * @returns {Array} Array of array of two dimensional point coordinates.
         * @private
         */ _rotateShape: function(shape, angle) {
        var i, rv = [], len = shape.length;
        if (len <= 0) {
            return shape;
        }
        for(i = 0; i < len; i++){
            rv.push(this._rotatePoint(angle, shape[i][0], shape[i][1]));
        }
        return rv;
    },
    /**
         * Set the gradient angle for linear color gradients.
         *
         * @private
         * @param {JXG.GeometryElement} node An arbitrary JSXGraph element, preferably one with an area.
         * @param {Number} radians angle value in radians. 0 is horizontal from left to right, Pi/4 is vertical from top to bottom.
         */ updateGradientAngle: function(el, radians) {
        // Angles:
        // 0: ->
        // 90: down
        // 180: <-
        // 90: up
        var f = 1.0, co = Math.cos(-radians), si = Math.sin(-radians), bb = el.getBoundingBox(), c1, c2, x1, x2, y1, y2, x1s, x2s, y1s, y2s, dx, dy;
        if (Math.abs(co) > Math.abs(si)) {
            f /= Math.abs(co);
        } else {
            f /= Math.abs(si);
        }
        if (co >= 0) {
            x1 = 0;
            x2 = co * f;
        } else {
            x1 = -co * f;
            x2 = 0;
        }
        if (si >= 0) {
            y1 = 0;
            y2 = si * f;
        } else {
            y1 = -si * f;
            y2 = 0;
        }
        c1 = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
            bb[0],
            bb[1]
        ], el.board);
        c2 = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
            bb[2],
            bb[3]
        ], el.board);
        dx = c2.scrCoords[1] - c1.scrCoords[1];
        dy = c2.scrCoords[2] - c1.scrCoords[2];
        x1s = c1.scrCoords[1] + dx * x1;
        y1s = c1.scrCoords[2] + dy * y1;
        x2s = c1.scrCoords[1] + dx * x2;
        y2s = c1.scrCoords[2] + dy * y2;
        return this.context.createLinearGradient(x1s, y1s, x2s, y2s);
    },
    /**
         * Set circles for radial color gradients.
         *
         * @private
         * @param {SVGnode} node SVG gradient node
         * @param {Number} cx Canvas value x1 (but value between 0 and 1)
         * @param {Number} cy  Canvas value y1 (but value between 0 and 1)
         * @param {Number} r  Canvas value r1 (but value between 0 and 1)
         * @param {Number} fx  Canvas value x0 (but value between 0 and 1)
         * @param {Number} fy  Canvas value x1 (but value between 0 and 1)
         * @param {Number} fr  Canvas value r0 (but value between 0 and 1)
         */ updateGradientCircle: function(el, cx, cy, r, fx, fy, fr) {
        var bb = el.getBoundingBox(), c1, c2, cxs, cys, rs, fxs, fys, frs, dx, dy;
        c1 = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
            bb[0],
            bb[1]
        ], el.board);
        c2 = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
            bb[2],
            bb[3]
        ], el.board);
        dx = c2.scrCoords[1] - c1.scrCoords[1];
        dy = c1.scrCoords[2] - c2.scrCoords[2];
        cxs = c1.scrCoords[1] + dx * cx;
        cys = c2.scrCoords[2] + dy * cy;
        fxs = c1.scrCoords[1] + dx * fx;
        fys = c2.scrCoords[2] + dy * fy;
        rs = r * (dx + dy) * 0.5;
        frs = fr * (dx + dy) * 0.5;
        return this.context.createRadialGradient(fxs, fys, frs, cxs, cys, rs);
    },
    // documented in JXG.AbstractRenderer
    updateGradient: function(el) {
        var col, // op,
        ev_g = el.evalVisProp('gradient'), gradient;
        // op = el.evalVisProp('fillopacity');
        // op = op > 0 ? op : 0;
        col = el.evalVisProp('fillcolor');
        if (ev_g === "linear") {
            gradient = this.updateGradientAngle(el, el.evalVisProp('gradientangle'));
        } else if (ev_g === "radial") {
            gradient = this.updateGradientCircle(el, el.evalVisProp('gradientcx'), el.evalVisProp('gradientcy'), el.evalVisProp('gradientr'), el.evalVisProp('gradientfx'), el.evalVisProp('gradientfy'), el.evalVisProp('gradientfr'));
        }
        if (col !== "none" && col !== "" && col !== false) {
            gradient.addColorStop(el.evalVisProp('gradientstartoffset'), col);
            gradient.addColorStop(el.evalVisProp('gradientendoffset'), el.evalVisProp('gradientsecondcolor'));
        }
        return gradient;
    },
    /**
         * Sets color and opacity for filling and stroking.
         * type is the attribute from visProp and targetType the context[targetTypeStyle].
         * This is necessary, because the fill style of a text is set by the stroke attributes of the text element.
         * @param {JXG.GeometryElement} el Any JSXGraph element.
         * @param {String} [type='stroke'] Either <em>fill</em> or <em>stroke</em>.
         * @param {String} [targetType=type] (optional) Either <em>fill</em> or <em>stroke</em>.
         * @returns {Boolean} If the color could be set, <tt>true</tt> is returned.
         * @private
         */ _setColor: function(el, type, targetType) {
        var hasColor = true, lc, hl, sw, rgba, rgbo, c, o, oo, grad;
        type = type || "stroke";
        targetType = targetType || type;
        hl = this._getHighlighted(el);
        // type is equal to 'fill' or 'stroke'
        rgba = el.evalVisProp(hl + type + 'color');
        if (rgba !== "none" && rgba !== "" && rgba !== false) {
            o = el.evalVisProp(hl + type + "opacity");
            o = o > 0 ? o : 0;
            if (rgba.length !== 9) {
                // RGB
                c = rgba;
                oo = o;
            // True RGBA, not RGB
            } else {
                // RGBA
                rgbo = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgba2rgbo(rgba);
                c = rgbo[0];
                oo = o * rgbo[1];
            }
            this.context.globalAlpha = oo;
            this.context[targetType + "Style"] = c;
        } else {
            hasColor = false;
        }
        if (type !== "stroke") {
            // For the time being, gradients are only supported for fills
            grad = el.evalVisProp('gradient');
            if (grad === "linear" || grad === "radial") {
                this.context.globalAlpha = oo;
                this.context[targetType + "Style"] = this.updateGradient(el);
                return hasColor;
            }
        }
        sw = parseFloat(el.evalVisProp(hl + 'strokewidth'));
        if (type === "stroke" && !isNaN(sw)) {
            if (sw === 0) {
                this.context.globalAlpha = 0;
            } else {
                this.context.lineWidth = sw;
            }
        }
        lc = el.evalVisProp('linecap');
        if (type === "stroke" && lc !== undefined && lc !== "") {
            this.context.lineCap = lc;
        }
        return hasColor;
    },
    /**
         * Sets color and opacity for drawing paths and lines and draws the paths and lines.
         * @param {JXG.GeometryElement} el An JSXGraph element with a stroke.
         * @private
         */ _stroke: function(el) {
        var context = this.context, ev_dash = el.evalVisProp('dash'), ds = el.evalVisProp('dashscale'), sw = ds ? 0.5 * el.evalVisProp('strokewidth') : 1;
        context.save();
        if (ev_dash > 0) {
            if (context.setLineDash) {
                context.setLineDash(// sw could distinguish highlighting or not.
                // But it seems to preferable to ignore this.
                this.dashArray[ev_dash - 1].map(function(x) {
                    return x * sw;
                }));
            }
        } else {
            this.context.lineDashArray = [];
        }
        if (this._setColor(el, "stroke")) {
            context.stroke();
        }
        context.restore();
    },
    /**
         * Translates a set of points.
         * @param {Array} shape An array of point coordinates.
         * @param {Number} x Translation in X direction.
         * @param {Number} y Translation in Y direction.
         * @returns {Array} An array of translated point coordinates.
         * @private
         */ _translateShape: function(shape, x, y) {
        var i, rv = [], len = shape.length;
        if (len <= 0) {
            return shape;
        }
        for(i = 0; i < len; i++){
            rv.push([
                shape[i][0] + x,
                shape[i][1] + y
            ]);
        }
        return rv;
    },
    /* ********* Point related stuff *********** */ // documented in AbstractRenderer
    drawPoint: function(el) {
        var f = el.evalVisProp('face'), size = el.evalVisProp('size'), scr = el.coords.scrCoords, sqrt32 = size * Math.sqrt(3) * 0.5, s05 = size * 0.5, stroke05 = parseFloat(el.evalVisProp('strokewidth')) / 2.0, context = this.context;
        if (!el.visPropCalc.visible) {
            return;
        }
        switch(f){
            case "cross":
            case "x":
                context.beginPath();
                context.moveTo(scr[1] - size, scr[2] - size);
                context.lineTo(scr[1] + size, scr[2] + size);
                context.moveTo(scr[1] + size, scr[2] - size);
                context.lineTo(scr[1] - size, scr[2] + size);
                context.lineCap = "round";
                context.lineJoin = "round";
                context.closePath();
                this._stroke(el);
                break;
            case "circle":
            case "o":
                context.beginPath();
                context.arc(scr[1], scr[2], size + 1 + stroke05, 0, 2 * Math.PI, false);
                context.closePath();
                this._fill(el);
                this._stroke(el);
                break;
            case "square":
            case "[]":
                if (size <= 0) {
                    break;
                }
                context.save();
                if (this._setColor(el, "stroke", "fill")) {
                    context.fillRect(scr[1] - size - stroke05, scr[2] - size - stroke05, size * 2 + 3 * stroke05, size * 2 + 3 * stroke05);
                }
                context.restore();
                context.save();
                this._setColor(el, "fill");
                context.fillRect(scr[1] - size + stroke05, scr[2] - size + stroke05, size * 2 - stroke05, size * 2 - stroke05);
                context.restore();
                break;
            case "plus":
            case "+":
                context.beginPath();
                context.moveTo(scr[1] - size, scr[2]);
                context.lineTo(scr[1] + size, scr[2]);
                context.moveTo(scr[1], scr[2] - size);
                context.lineTo(scr[1], scr[2] + size);
                context.lineCap = "round";
                context.lineJoin = "round";
                context.closePath();
                this._stroke(el);
                break;
            case "divide":
            case "|":
                context.beginPath();
                context.moveTo(scr[1], scr[2] - size);
                context.lineTo(scr[1], scr[2] + size);
                context.lineCap = "round";
                context.lineJoin = "round";
                context.closePath();
                this._stroke(el);
                break;
            case "minus":
            case "-":
                context.beginPath();
                context.moveTo(scr[1] - size, scr[2]);
                context.lineTo(scr[1] + size, scr[2]);
                context.lineCap = "round";
                context.lineJoin = "round";
                context.closePath();
                this._stroke(el);
                break;
            /* eslint-disable no-fallthrough */ case "diamond2":
            case "<<>>":
                size *= 1.41;
            case "diamond":
            case "<>":
                context.beginPath();
                context.moveTo(scr[1] - size, scr[2]);
                context.lineTo(scr[1], scr[2] + size);
                context.lineTo(scr[1] + size, scr[2]);
                context.lineTo(scr[1], scr[2] - size);
                context.closePath();
                this._fill(el);
                this._stroke(el);
                break;
            /* eslint-enable no-fallthrough */ case "triangleup":
            case "A":
            case "a":
            case "^":
                context.beginPath();
                context.moveTo(scr[1], scr[2] - size);
                context.lineTo(scr[1] - sqrt32, scr[2] + s05);
                context.lineTo(scr[1] + sqrt32, scr[2] + s05);
                context.closePath();
                this._fill(el);
                this._stroke(el);
                break;
            case "triangledown":
            case "v":
                context.beginPath();
                context.moveTo(scr[1], scr[2] + size);
                context.lineTo(scr[1] - sqrt32, scr[2] - s05);
                context.lineTo(scr[1] + sqrt32, scr[2] - s05);
                context.closePath();
                this._fill(el);
                this._stroke(el);
                break;
            case "triangleleft":
            case "<":
                context.beginPath();
                context.moveTo(scr[1] - size, scr[2]);
                context.lineTo(scr[1] + s05, scr[2] - sqrt32);
                context.lineTo(scr[1] + s05, scr[2] + sqrt32);
                context.closePath();
                this._fill(el);
                this._stroke(el);
                break;
            case "triangleright":
            case ">":
                context.beginPath();
                context.moveTo(scr[1] + size, scr[2]);
                context.lineTo(scr[1] - s05, scr[2] - sqrt32);
                context.lineTo(scr[1] - s05, scr[2] + sqrt32);
                context.closePath();
                this._fill(el);
                this._stroke(el);
                break;
        }
    },
    // documented in AbstractRenderer
    updatePoint: function(el) {
        this.drawPoint(el);
    },
    /* ********* Line related stuff *********** */ /**
         * Draws arrows of an element (usually a line) in canvas renderer.
         * @param {JXG.GeometryElement} el Line to be drawn.
         * @param {Array} scr1 Screen coordinates of the start position of the line or curve.
         * @param {Array} scr2 Screen coordinates of the end position of the line or curve.
         * @param {String} hl String which carries information if the element is highlighted. Used for getting the correct attribute.
         * @private
         */ drawArrows: function(el, scr1, scr2, hl, a) {
        var x1, y1, x2, y2, w, w0, arrowHead, arrowTail, context = this.context, size = 6, type = 1, type_fa, type_la, degree_fa = 1, degree_la = 1, doFill, i, len, d1x, d1y, d2x, d2y, last, ang1, ang2, ev_fa = a.evFirst, ev_la = a.evLast;
        if (el.evalVisProp('strokecolor') !== "none" && (ev_fa || ev_la)) {
            if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_LINE) {
                x1 = scr1.scrCoords[1];
                y1 = scr1.scrCoords[2];
                x2 = scr2.scrCoords[1];
                y2 = scr2.scrCoords[2];
                ang1 = ang2 = Math.atan2(y2 - y1, x2 - x1);
            } else {
                x1 = el.points[0].scrCoords[1];
                y1 = el.points[0].scrCoords[2];
                last = el.points.length - 1;
                if (last < 1) {
                    // No arrows for curves consisting of 1 point
                    return;
                }
                x2 = el.points[el.points.length - 1].scrCoords[1];
                y2 = el.points[el.points.length - 1].scrCoords[2];
                d1x = el.points[1].scrCoords[1] - el.points[0].scrCoords[1];
                d1y = el.points[1].scrCoords[2] - el.points[0].scrCoords[2];
                d2x = el.points[last].scrCoords[1] - el.points[last - 1].scrCoords[1];
                d2y = el.points[last].scrCoords[2] - el.points[last - 1].scrCoords[2];
                if (ev_fa) {
                    ang1 = Math.atan2(d1y, d1x);
                }
                if (ev_la) {
                    ang2 = Math.atan2(d2y, d2x);
                }
            }
            w0 = el.evalVisProp(hl + 'strokewidth');
            if (ev_fa) {
                size = a.sizeFirst;
                w = w0 * size;
                type = a.typeFirst;
                type_fa = type;
                if (type === 2) {
                    arrowTail = [
                        [
                            w,
                            -w * 0.5
                        ],
                        [
                            0.0,
                            0.0
                        ],
                        [
                            w,
                            w * 0.5
                        ],
                        [
                            w * 0.5,
                            0.0
                        ]
                    ];
                } else if (type === 3) {
                    arrowTail = [
                        [
                            w / 3.0,
                            -w * 0.5
                        ],
                        [
                            0.0,
                            -w * 0.5
                        ],
                        [
                            0.0,
                            w * 0.5
                        ],
                        [
                            w / 3.0,
                            w * 0.5
                        ]
                    ];
                } else if (type === 4) {
                    w /= 10;
                    degree_fa = 3;
                    arrowTail = [
                        [
                            10.0,
                            3.31
                        ],
                        [
                            6.47,
                            3.84
                        ],
                        [
                            2.87,
                            4.5
                        ],
                        [
                            0.0,
                            6.63
                        ],
                        [
                            0.67,
                            5.52
                        ],
                        [
                            1.33,
                            4.42
                        ],
                        [
                            2.0,
                            3.31
                        ],
                        [
                            1.33,
                            2.21
                        ],
                        [
                            0.67,
                            1.1
                        ],
                        [
                            0.0,
                            0.0
                        ],
                        [
                            2.87,
                            2.13
                        ],
                        [
                            6.47,
                            2.79
                        ],
                        [
                            10.0,
                            3.31
                        ]
                    ];
                    len = arrowTail.length;
                    for(i = 0; i < len; i++){
                        arrowTail[i][0] *= -w;
                        arrowTail[i][1] *= w;
                        arrowTail[i][0] += 10 * w;
                        arrowTail[i][1] -= 3.31 * w;
                    }
                } else if (type === 5) {
                    w /= 10;
                    degree_fa = 3;
                    arrowTail = [
                        [
                            10.0,
                            3.28
                        ],
                        [
                            6.61,
                            4.19
                        ],
                        [
                            3.19,
                            5.07
                        ],
                        [
                            0.0,
                            6.55
                        ],
                        [
                            0.62,
                            5.56
                        ],
                        [
                            1.0,
                            4.44
                        ],
                        [
                            1.0,
                            3.28
                        ],
                        [
                            1.0,
                            2.11
                        ],
                        [
                            0.62,
                            0.99
                        ],
                        [
                            0.0,
                            0.0
                        ],
                        [
                            3.19,
                            1.49
                        ],
                        [
                            6.61,
                            2.37
                        ],
                        [
                            10.0,
                            3.28
                        ]
                    ];
                    len = arrowTail.length;
                    for(i = 0; i < len; i++){
                        arrowTail[i][0] *= -w;
                        arrowTail[i][1] *= w;
                        arrowTail[i][0] += 10 * w;
                        arrowTail[i][1] -= 3.28 * w;
                    }
                } else if (type === 6) {
                    w /= 10;
                    degree_fa = 3;
                    arrowTail = [
                        [
                            10.0,
                            2.84
                        ],
                        [
                            6.61,
                            3.59
                        ],
                        [
                            3.21,
                            4.35
                        ],
                        [
                            0.0,
                            5.68
                        ],
                        [
                            0.33,
                            4.73
                        ],
                        [
                            0.67,
                            3.78
                        ],
                        [
                            1.0,
                            2.84
                        ],
                        [
                            0.67,
                            1.89
                        ],
                        [
                            0.33,
                            0.95
                        ],
                        [
                            0.0,
                            0.0
                        ],
                        [
                            3.21,
                            1.33
                        ],
                        [
                            6.61,
                            2.09
                        ],
                        [
                            10.0,
                            2.84
                        ]
                    ];
                    len = arrowTail.length;
                    for(i = 0; i < len; i++){
                        arrowTail[i][0] *= -w;
                        arrowTail[i][1] *= w;
                        arrowTail[i][0] += 10 * w;
                        arrowTail[i][1] -= 2.84 * w;
                    }
                } else if (type === 7) {
                    w = w0;
                    degree_fa = 3;
                    arrowTail = [
                        [
                            0.0,
                            10.39
                        ],
                        [
                            2.01,
                            6.92
                        ],
                        [
                            5.96,
                            5.2
                        ],
                        [
                            10.0,
                            5.2
                        ],
                        [
                            5.96,
                            5.2
                        ],
                        [
                            2.01,
                            3.47
                        ],
                        [
                            0.0,
                            0.0
                        ]
                    ];
                    len = arrowTail.length;
                    for(i = 0; i < len; i++){
                        arrowTail[i][0] *= -w;
                        arrowTail[i][1] *= w;
                        arrowTail[i][0] += 10 * w;
                        arrowTail[i][1] -= 5.2 * w;
                    }
                } else {
                    arrowTail = [
                        [
                            w,
                            -w * 0.5
                        ],
                        [
                            0.0,
                            0.0
                        ],
                        [
                            w,
                            w * 0.5
                        ]
                    ];
                }
            }
            if (ev_la) {
                size = a.sizeLast;
                w = w0 * size;
                type = a.typeLast;
                type_la = type;
                if (type === 2) {
                    arrowHead = [
                        [
                            -w,
                            -w * 0.5
                        ],
                        [
                            0.0,
                            0.0
                        ],
                        [
                            -w,
                            w * 0.5
                        ],
                        [
                            -w * 0.5,
                            0.0
                        ]
                    ];
                } else if (type === 3) {
                    arrowHead = [
                        [
                            -w / 3.0,
                            -w * 0.5
                        ],
                        [
                            0.0,
                            -w * 0.5
                        ],
                        [
                            0.0,
                            w * 0.5
                        ],
                        [
                            -w / 3.0,
                            w * 0.5
                        ]
                    ];
                } else if (type === 4) {
                    w /= 10;
                    degree_la = 3;
                    arrowHead = [
                        [
                            10.0,
                            3.31
                        ],
                        [
                            6.47,
                            3.84
                        ],
                        [
                            2.87,
                            4.5
                        ],
                        [
                            0.0,
                            6.63
                        ],
                        [
                            0.67,
                            5.52
                        ],
                        [
                            1.33,
                            4.42
                        ],
                        [
                            2.0,
                            3.31
                        ],
                        [
                            1.33,
                            2.21
                        ],
                        [
                            0.67,
                            1.1
                        ],
                        [
                            0.0,
                            0.0
                        ],
                        [
                            2.87,
                            2.13
                        ],
                        [
                            6.47,
                            2.79
                        ],
                        [
                            10.0,
                            3.31
                        ]
                    ];
                    len = arrowHead.length;
                    for(i = 0; i < len; i++){
                        arrowHead[i][0] *= w;
                        arrowHead[i][1] *= w;
                        arrowHead[i][0] -= 10 * w;
                        arrowHead[i][1] -= 3.31 * w;
                    }
                } else if (type === 5) {
                    w /= 10;
                    degree_la = 3;
                    arrowHead = [
                        [
                            10.0,
                            3.28
                        ],
                        [
                            6.61,
                            4.19
                        ],
                        [
                            3.19,
                            5.07
                        ],
                        [
                            0.0,
                            6.55
                        ],
                        [
                            0.62,
                            5.56
                        ],
                        [
                            1.0,
                            4.44
                        ],
                        [
                            1.0,
                            3.28
                        ],
                        [
                            1.0,
                            2.11
                        ],
                        [
                            0.62,
                            0.99
                        ],
                        [
                            0.0,
                            0.0
                        ],
                        [
                            3.19,
                            1.49
                        ],
                        [
                            6.61,
                            2.37
                        ],
                        [
                            10.0,
                            3.28
                        ]
                    ];
                    len = arrowHead.length;
                    for(i = 0; i < len; i++){
                        arrowHead[i][0] *= w;
                        arrowHead[i][1] *= w;
                        arrowHead[i][0] -= 10 * w;
                        arrowHead[i][1] -= 3.28 * w;
                    }
                } else if (type === 6) {
                    w /= 10;
                    degree_la = 3;
                    arrowHead = [
                        [
                            10.0,
                            2.84
                        ],
                        [
                            6.61,
                            3.59
                        ],
                        [
                            3.21,
                            4.35
                        ],
                        [
                            0.0,
                            5.68
                        ],
                        [
                            0.33,
                            4.73
                        ],
                        [
                            0.67,
                            3.78
                        ],
                        [
                            1.0,
                            2.84
                        ],
                        [
                            0.67,
                            1.89
                        ],
                        [
                            0.33,
                            0.95
                        ],
                        [
                            0.0,
                            0.0
                        ],
                        [
                            3.21,
                            1.33
                        ],
                        [
                            6.61,
                            2.09
                        ],
                        [
                            10.0,
                            2.84
                        ]
                    ];
                    len = arrowHead.length;
                    for(i = 0; i < len; i++){
                        arrowHead[i][0] *= w;
                        arrowHead[i][1] *= w;
                        arrowHead[i][0] -= 10 * w;
                        arrowHead[i][1] -= 2.84 * w;
                    }
                } else if (type === 7) {
                    w = w0;
                    degree_la = 3;
                    arrowHead = [
                        [
                            0.0,
                            10.39
                        ],
                        [
                            2.01,
                            6.92
                        ],
                        [
                            5.96,
                            5.2
                        ],
                        [
                            10.0,
                            5.2
                        ],
                        [
                            5.96,
                            5.2
                        ],
                        [
                            2.01,
                            3.47
                        ],
                        [
                            0.0,
                            0.0
                        ]
                    ];
                    len = arrowHead.length;
                    for(i = 0; i < len; i++){
                        arrowHead[i][0] *= w;
                        arrowHead[i][1] *= w;
                        arrowHead[i][0] -= 10 * w;
                        arrowHead[i][1] -= 5.2 * w;
                    }
                } else {
                    arrowHead = [
                        [
                            -w,
                            -w * 0.5
                        ],
                        [
                            0.0,
                            0.0
                        ],
                        [
                            -w,
                            w * 0.5
                        ]
                    ];
                }
            }
            context.save();
            if (this._setColor(el, "stroke", "fill")) {
                this._setColor(el, "stroke");
                if (ev_fa) {
                    if (type_fa === 7) {
                        doFill = false;
                    } else {
                        doFill = true;
                    }
                    this._drawPolygon(this._translateShape(this._rotateShape(arrowTail, ang1), x1, y1), degree_fa, doFill);
                }
                if (ev_la) {
                    if (type_la === 7) {
                        doFill = false;
                    } else {
                        doFill = true;
                    }
                    this._drawPolygon(this._translateShape(this._rotateShape(arrowHead, ang2), x2, y2), degree_la, doFill);
                }
            }
            context.restore();
        }
    },
    // documented in AbstractRenderer
    drawLine: function(el) {
        var c1_org, c2_org, c1 = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, el.point1.coords.usrCoords, el.board), c2 = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, el.point2.coords.usrCoords, el.board), margin = null, hl, w, arrowData;
        if (!el.visPropCalc.visible) {
            return;
        }
        hl = this._getHighlighted(el);
        w = el.evalVisProp(hl + 'strokewidth');
        arrowData = this.getArrowHeadData(el, w, hl);
        if (arrowData.evFirst || arrowData.evLast) {
            margin = -4;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].calcStraight(el, c1, c2, margin);
        this.handleTouchpoints(el, c1, c2, arrowData);
        c1_org = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, c1.usrCoords, el.board);
        c2_org = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, c2.usrCoords, el.board);
        this.getPositionArrowHead(el, c1, c2, arrowData);
        this.context.beginPath();
        this.context.moveTo(c1.scrCoords[1], c1.scrCoords[2]);
        this.context.lineTo(c2.scrCoords[1], c2.scrCoords[2]);
        this._stroke(el);
        if (arrowData.evFirst /* && obj.sFirst > 0*/  || arrowData.evLast /* && obj.sLast > 0*/ ) {
            this.drawArrows(el, c1_org, c2_org, hl, arrowData);
        }
    },
    // documented in AbstractRenderer
    updateLine: function(el) {
        this.drawLine(el);
    },
    // documented in AbstractRenderer
    drawTicks: function() {
    // this function is supposed to initialize the svg/vml nodes in the SVG/VMLRenderer.
    // but in canvas there are no such nodes, hence we just do nothing and wait until
    // updateTicks is called.
    },
    // documented in AbstractRenderer
    updateTicks: function(ticks) {
        var i, c, x, y, len = ticks.ticks.length, len2, j, context = this.context;
        context.beginPath();
        for(i = 0; i < len; i++){
            c = ticks.ticks[i];
            x = c[0];
            y = c[1];
            // context.moveTo(x[0], y[0]);
            // context.lineTo(x[1], y[1]);
            len2 = x.length;
            context.moveTo(x[0], y[0]);
            for(j = 1; j < len2; ++j){
                context.lineTo(x[j], y[j]);
            }
        }
        // Labels
        // for (i = 0; i < len; i++) {
        //     c = ticks.ticks[i].scrCoords;
        //     if (ticks.ticks[i].major &&
        //             (ticks.board.needsFullUpdate || ticks.needsRegularUpdate) &&
        //             ticks.labels[i] &&
        //             ticks.labels[i].visPropCalc.visible) {
        //         this.updateText(ticks.labels[i]);
        //     }
        // }
        context.lineCap = "round";
        this._stroke(ticks);
    },
    /* ********* Curve related stuff *********** */ // documented in AbstractRenderer
    drawCurve: function(el) {
        var hl, w, arrowData;
        if (el.evalVisProp('handdrawing')) {
            this.updatePathStringBezierPrim(el);
        } else {
            this.updatePathStringPrim(el);
        }
        if (el.numberPoints > 1) {
            hl = this._getHighlighted(el);
            w = el.evalVisProp(hl + 'strokewidth');
            arrowData = this.getArrowHeadData(el, w, hl);
            if (arrowData.evFirst /* && obj.sFirst > 0*/  || arrowData.evLast /* && obj.sLast > 0*/ ) {
                this.drawArrows(el, null, null, hl, arrowData);
            }
        }
    },
    // documented in AbstractRenderer
    updateCurve: function(el) {
        this.drawCurve(el);
    },
    /* ********* Circle related stuff *********** */ // documented in AbstractRenderer
    drawEllipse: function(el) {
        var m1 = el.center.coords.scrCoords[1], m2 = el.center.coords.scrCoords[2], sX = el.board.unitX, sY = el.board.unitY, rX = 2 * el.Radius(), rY = 2 * el.Radius(), aWidth = rX * sX, aHeight = rY * sY, aX = m1 - aWidth / 2, aY = m2 - aHeight / 2, hB = aWidth / 2 * 0.5522848, vB = aHeight / 2 * 0.5522848, eX = aX + aWidth, eY = aY + aHeight, mX = aX + aWidth / 2, mY = aY + aHeight / 2, context = this.context;
        if (rX > 0.0 && rY > 0.0 && !isNaN(m1 + m2)) {
            context.beginPath();
            context.moveTo(aX, mY);
            context.bezierCurveTo(aX, mY - vB, mX - hB, aY, mX, aY);
            context.bezierCurveTo(mX + hB, aY, eX, mY - vB, eX, mY);
            context.bezierCurveTo(eX, mY + vB, mX + hB, eY, mX, eY);
            context.bezierCurveTo(mX - hB, eY, aX, mY + vB, aX, mY);
            context.closePath();
            this._fill(el);
            this._stroke(el);
        }
    },
    // documented in AbstractRenderer
    updateEllipse: function(el) {
        return this.drawEllipse(el);
    },
    /* ********* Polygon related stuff *********** */ // nothing here, using AbstractRenderer implementations
    /* ********* Text related stuff *********** */ // Already documented in JXG.AbstractRenderer
    displayCopyright: function(str, fontsize) {
        var context = this.context, x = 4 + 1.8 * fontsize, y = 6 + fontsize, alpha = 0.2;
        // This should be called on EVERY update, otherwise it won't be shown after the first update
        context.save();
        context.font = fontsize + "px Arial";
        context.globalAlpha = alpha;
        context.lineWidth = 0.5;
        context.fillText(str + '.', x, y); // Distinguish svg and canvas by this dot
        context.restore();
    },
    // Already documented in JXG.AbstractRenderer
    displayLogo: function(str, fontsize, board) {
        var context = this.context, s = 1.5 * fontsize, alpha = 0.2;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(board._logo_image)) {
            board._logo_image = new Image();
            board._logo_image.src = str;
        }
        board._logo_image.onload = function() {
            context.save();
            context.globalAlpha = alpha;
            context.drawImage(board._logo_image, 5, 5, s, s);
            context.restore();
        };
        context.save();
        context.globalAlpha = alpha;
        context.drawImage(board._logo_image, 5, 5, s, s);
        context.restore();
    },
    // Already documented in JXG.AbstractRenderer
    drawInternalText: function(el) {
        var ev_fs = el.evalVisProp('fontsize'), fontUnit = el.evalVisProp('fontunit'), ev_ax = el.getAnchorX(), ev_ay = el.getAnchorY(), context = this.context;
        context.save();
        if (this._setColor(el, "stroke", "fill") && !isNaN(el.coords.scrCoords[1] + el.coords.scrCoords[2])) {
            context.font = (ev_fs > 0 ? ev_fs : 0) + fontUnit + " Arial";
            this.transformRect(el, el.transformations);
            if (ev_ax === "left") {
                context.textAlign = "left";
            } else if (ev_ax === "right") {
                context.textAlign = "right";
            } else if (ev_ax === "middle") {
                context.textAlign = "center";
            }
            if (ev_ay === "bottom") {
                context.textBaseline = "bottom";
            } else if (ev_ay === "top") {
                context.textBaseline = "top";
            } else if (ev_ay === "middle") {
                context.textBaseline = "middle";
            }
            context.fillText(el.plaintext, el.coords.scrCoords[1], el.coords.scrCoords[2]);
        }
        context.restore();
        return null;
    },
    // Already documented in JXG.AbstractRenderer
    updateInternalText: function(el) {
        this.drawInternalText(el);
    },
    // documented in JXG.AbstractRenderer
    // Only necessary for texts
    setObjectStrokeColor: function(el, color, opacity) {
        var rgba = color, c, rgbo, o = opacity, oo, node;
        o = o > 0 ? o : 0;
        if (el.visPropOld.strokecolor === rgba && el.visPropOld.strokeopacity === o) {
            return;
        }
        // Check if this could be merged with _setColor
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(rgba) && rgba !== false) {
            // RGB, not RGBA
            if (rgba.length !== 9) {
                c = rgba;
                oo = o;
            // True RGBA, not RGB
            } else {
                rgbo = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgba2rgbo(rgba);
                c = rgbo[0];
                oo = o * rgbo[1];
            }
            node = el.rendNode;
            if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_TEXT && el.evalVisProp('display') === "html") {
                node.style.color = c;
                node.style.opacity = oo;
            }
        }
        el.visPropOld.strokecolor = rgba;
        el.visPropOld.strokeopacity = o;
    },
    /* ********* Image related stuff *********** */ // Already documented in JXG.AbstractRenderer
    drawImage: function(el) {
        el.rendNode = new Image();
        // Store the file name of the image.
        // Before, this was done in el.rendNode.src
        // But there, the file name is expanded to
        // the full url. This may be different from
        // the url computed in updateImageURL().
        el._src = "";
        this.updateImage(el);
    },
    // Already documented in JXG.AbstractRenderer
    updateImage: function(el) {
        var context = this.context, o = el.evalVisProp('fillopacity'), paintImg = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bind(function() {
            el.imgIsLoaded = true;
            if (el.size[0] <= 0 || el.size[1] <= 0) {
                return;
            }
            context.save();
            context.globalAlpha = o;
            // If det(el.transformations)=0, FireFox 3.6. breaks down.
            // This is tested in transformRect
            this.transformRect(el, el.transformations);
            context.drawImage(el.rendNode, el.coords.scrCoords[1], el.coords.scrCoords[2] - el.size[1], el.size[0], el.size[1]);
            context.restore();
        }, this);
        if (this.updateImageURL(el)) {
            el.rendNode.onload = paintImg;
        } else {
            if (el.imgIsLoaded) {
                paintImg();
            }
        }
    },
    // Already documented in JXG.AbstractRenderer
    transformRect: function(el, t) {
        var m, s, cx, cy, node, len = t.length, ctx = this.context;
        if (len > 0) {
            m = this.joinTransforms(el, t);
            if (el.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_TEXT && el.visProp.display === 'html') {
                s = " matrix(" + [
                    m[1][1],
                    m[2][1],
                    m[1][2],
                    m[2][2],
                    m[1][0],
                    m[2][0]
                ].join(",") + ") ";
                if (s.indexOf('NaN') === -1) {
                    node = el.rendNode;
                    node.style.transform = s;
                    cx = -el.coords.scrCoords[1];
                    cy = -el.coords.scrCoords[2];
                    switch(el.evalVisProp('anchorx')){
                        case 'right':
                            cx += el.size[0];
                            break;
                        case 'middle':
                            cx += el.size[0] * 0.5;
                            break;
                    }
                    switch(el.evalVisProp('anchory')){
                        case 'bottom':
                            cy += el.size[1];
                            break;
                        case 'middle':
                            cy += el.size[1] * 0.5;
                            break;
                    }
                    node.style['transform-origin'] = cx + 'px ' + cy + 'px';
                }
            } else {
                if (Math.abs(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].det(m)) >= __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps) {
                    ctx.transform(m[1][1], m[2][1], m[1][2], m[2][2], m[1][0], m[2][0]);
                }
            }
        }
    },
    // Already documented in JXG.AbstractRenderer
    updateImageURL: function(el) {
        var url;
        url = el.eval(el.url);
        if (el._src !== url) {
            el.imgIsLoaded = false;
            el.rendNode.src = url;
            el._src = url;
            return true;
        }
        return false;
    },
    /* ********* Render primitive objects *********** */ // documented in AbstractRenderer
    remove: function(shape) {
        // sounds odd for a pixel based renderer but we need this for html texts
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(shape) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(shape.parentNode)) {
            shape.parentNode.removeChild(shape);
        }
    },
    // documented in AbstractRenderer
    updatePathStringPrim: function(el) {
        var i, scr, scr1, scr2, len, symbm = "M", symbl = "L", symbc = "C", nextSymb = symbm, maxSize = 5000.0, context = this.context;
        if (el.numberPoints <= 0) {
            return;
        }
        len = Math.min(el.points.length, el.numberPoints);
        context.beginPath();
        if (el.bezierDegree === 1) {
            /*
                if (isNotPlot && el.board.options.curve.RDPsmoothing) {
                    el.points = Numerics.RamerDouglasPeucker(el.points, 0.5);
                }
                */ for(i = 0; i < len; i++){
                scr = el.points[i].scrCoords;
                if (isNaN(scr[1]) || isNaN(scr[2])) {
                    // PenUp
                    nextSymb = symbm;
                } else {
                    // Chrome has problems with values  being too far away.
                    if (scr[1] > maxSize) {
                        scr[1] = maxSize;
                    } else if (scr[1] < -maxSize) {
                        scr[1] = -maxSize;
                    }
                    if (scr[2] > maxSize) {
                        scr[2] = maxSize;
                    } else if (scr[2] < -maxSize) {
                        scr[2] = -maxSize;
                    }
                    if (nextSymb === symbm) {
                        context.moveTo(scr[1], scr[2]);
                    } else {
                        context.lineTo(scr[1], scr[2]);
                    }
                    nextSymb = symbl;
                }
            }
        } else if (el.bezierDegree === 3) {
            i = 0;
            while(i < len){
                scr = el.points[i].scrCoords;
                if (isNaN(scr[1]) || isNaN(scr[2])) {
                    // PenUp
                    nextSymb = symbm;
                } else {
                    if (nextSymb === symbm) {
                        context.moveTo(scr[1], scr[2]);
                    } else {
                        i += 1;
                        scr1 = el.points[i].scrCoords;
                        i += 1;
                        scr2 = el.points[i].scrCoords;
                        context.bezierCurveTo(scr[1], scr[2], scr1[1], scr1[2], scr2[1], scr2[2]);
                    }
                    nextSymb = symbc;
                }
                i += 1;
            }
        }
        context.lineCap = "round";
        context.lineJoin = "round";
        this._fill(el);
        this._stroke(el);
    },
    // Already documented in JXG.AbstractRenderer
    updatePathStringBezierPrim: function(el) {
        var i, j, k, scr, lx, ly, len, symbm = "M", symbl = "C", nextSymb = symbm, maxSize = 5000.0, f = el.evalVisProp('strokewidth'), isNoPlot = el.evalVisProp('curvetype') !== "plot", context = this.context;
        if (el.numberPoints <= 0) {
            return;
        }
        if (isNoPlot && el.board.options.curve.RDPsmoothing) {
            el.points = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].RamerDouglasPeucker(el.points, 0.5);
        }
        len = Math.min(el.points.length, el.numberPoints);
        context.beginPath();
        for(j = 1; j < 3; j++){
            nextSymb = symbm;
            for(i = 0; i < len; i++){
                scr = el.points[i].scrCoords;
                if (isNaN(scr[1]) || isNaN(scr[2])) {
                    // PenUp
                    nextSymb = symbm;
                } else {
                    // Chrome has problems with values being too far away.
                    if (scr[1] > maxSize) {
                        scr[1] = maxSize;
                    } else if (scr[1] < -maxSize) {
                        scr[1] = -maxSize;
                    }
                    if (scr[2] > maxSize) {
                        scr[2] = maxSize;
                    } else if (scr[2] < -maxSize) {
                        scr[2] = -maxSize;
                    }
                    if (nextSymb === symbm) {
                        context.moveTo(scr[1], scr[2]);
                    } else {
                        k = 2 * j;
                        context.bezierCurveTo(lx + (scr[1] - lx) * 0.333 + f * (k * Math.random() - j), ly + (scr[2] - ly) * 0.333 + f * (k * Math.random() - j), lx + (scr[1] - lx) * 0.666 + f * (k * Math.random() - j), ly + (scr[2] - ly) * 0.666 + f * (k * Math.random() - j), scr[1], scr[2]);
                    }
                    nextSymb = symbl;
                    lx = scr[1];
                    ly = scr[2];
                }
            }
        }
        context.lineCap = "round";
        context.lineJoin = "round";
        this._fill(el);
        this._stroke(el);
    },
    // documented in AbstractRenderer
    updatePolygonPrim: function(node, el) {
        var scrCoords, i, j, len = el.vertices.length, context = this.context, isReal = true;
        if (len <= 0 || !el.visPropCalc.visible) {
            return;
        }
        if (el.elType === "polygonalchain") {
            len++;
        }
        context.beginPath();
        i = 0;
        while(!el.vertices[i].isReal && i < len - 1){
            i++;
            isReal = false;
        }
        scrCoords = el.vertices[i].coords.scrCoords;
        context.moveTo(scrCoords[1], scrCoords[2]);
        for(j = i; j < len - 1; j++){
            if (!el.vertices[j].isReal) {
                isReal = false;
            }
            scrCoords = el.vertices[j].coords.scrCoords;
            context.lineTo(scrCoords[1], scrCoords[2]);
        }
        context.closePath();
        if (isReal) {
            this._fill(el); // The edges of a polygon are displayed separately (as segments).
        }
    },
    /* ********* Set attributes *********** */ // Already documented in JXG.AbstractRenderer
    display: function(el, val) {
        if (el && el.rendNode) {
            el.visPropOld.visible = val;
            if (val) {
                el.rendNode.style.visibility = "inherit";
            } else {
                el.rendNode.style.visibility = "hidden";
            }
        }
    },
    // documented in AbstractRenderer
    show: function(el) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("Board.renderer.show()", "Board.renderer.display()");
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(el.rendNode)) {
            el.rendNode.style.visibility = "inherit";
        }
    },
    // documented in AbstractRenderer
    hide: function(el) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("Board.renderer.hide()", "Board.renderer.display()");
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(el.rendNode)) {
            el.rendNode.style.visibility = "hidden";
        }
    },
    // documented in AbstractRenderer
    setGradient: function(el) {
    // var // col,
    //     op;
    // op = el.evalVisProp('fillopacity');
    // op = op > 0 ? op : 0;
    // col = el.evalVisProp('fillcolor');
    },
    // documented in AbstractRenderer
    setShadow: function(el) {
        if (el.visPropOld.shadow === el.visProp.shadow) {
            return;
        }
        // not implemented yet
        // we simply have to redraw the element
        // probably the best way to do so would be to call el.updateRenderer(), i think.
        el.visPropOld.shadow = el.visProp.shadow;
    },
    // documented in AbstractRenderer
    highlight: function(obj) {
        if (obj.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_TEXT && obj.evalVisProp('display') === "html") {
            this.updateTextStyle(obj, true);
        } else {
            obj.board.prepareUpdate();
            obj.board.renderer.suspendRedraw(obj.board);
            obj.board.updateRenderer();
            obj.board.renderer.unsuspendRedraw();
        }
        return this;
    },
    // documented in AbstractRenderer
    noHighlight: function(obj) {
        if (obj.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_TEXT && obj.evalVisProp('display') === "html") {
            this.updateTextStyle(obj, false);
        } else {
            obj.board.prepareUpdate();
            obj.board.renderer.suspendRedraw(obj.board);
            obj.board.updateRenderer();
            obj.board.renderer.unsuspendRedraw();
        }
        return this;
    },
    /* ********* Renderer control *********** */ // documented in AbstractRenderer
    suspendRedraw: function(board) {
        this.context.save();
        this.context.clearRect(0, 0, this.canvasRoot.width, this.canvasRoot.height);
        if (board && (board.attr.showcopyright || board.attr.showlogo)) {
            this.displayLogo(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].licenseLogo, 12, board);
        }
        if (board && board.attr.showcopyright) {
            this.displayCopyright(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].licenseText, 12);
        }
    },
    // documented in AbstractRenderer
    unsuspendRedraw: function() {
        this.context.restore();
    },
    // document in AbstractRenderer
    resize: function(w, h) {
        if (this.container) {
            this.canvasRoot.style.width = parseFloat(w) + "px";
            this.canvasRoot.style.height = parseFloat(h) + "px";
            this.canvasRoot.setAttribute("width", 2 * parseFloat(w) + "px");
            this.canvasRoot.setAttribute("height", 2 * parseFloat(h) + "px");
        } else {
            this.canvasRoot.width = 2 * parseFloat(w);
            this.canvasRoot.height = 2 * parseFloat(h);
        }
        this.context = this.canvasRoot.getContext("2d");
        // The width and height of the canvas is set to twice the CSS values,
        // followed by an appropriate scaling.
        // See https://stackoverflow.com/questions/22416462/canvas-element-with-blurred-lines
        this.context.scale(2, 2);
    },
    removeToInsertLater: function() {
        return function() {};
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].CanvasRenderer;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/renderer/no.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, define: true, AMprocessNode: true, MathJax: true, document: true */ /*jslint nomen: true, plusplus: true, newcap:true, unparam: true*/ /*eslint no-unused-vars: "off"*/ /**
 * @fileoverview JSXGraph can use various technologies to render the contents of a construction, e.g.
 * SVG, VML, and HTML5 Canvas. To accomplish this, The rendering and the logic and control mechanisms
 * are completely separated from each other. Every rendering technology has it's own class, called
 * Renderer, e.g. SVGRenderer for SVG, the same for VML and Canvas. The common base for all available
 * renderers is the class AbstractRenderer.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$abstract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/renderer/abstract.js [app-client] (ecmascript)");
;
;
/**
 * This renderer draws nothing. It is intended to be used in environments where none of our rendering engines
 * are available, e.g. WebWorkers. All methods are empty.
 *
 * @class JXG.NoRenderer
 * @augments JXG.AbstractRenderer
 * @see JXG.AbstractRenderer
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].NoRenderer = function() {
    /**
     * If this property is set to <tt>true</tt> the visual properties of the elements are updated
     * on every update. Visual properties means: All the stuff stored in the
     * {@link JXG.GeometryElement#visProp} property won't be set if enhancedRendering is <tt>false</tt>
     * @type Boolean
     * @default true
     */ this.enhancedRendering = false;
    /**
     * This is used to easily determine which renderer we are using
     * @example if (board.renderer.type === 'vml') {
     *     // do something
     * }
     * @type String
     */ this.type = "no";
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].NoRenderer.prototype, /** @lends JXG.NoRenderer.prototype */ {
    // All methods are already documented in JXG.AbstractRenderer
    /* ********* Point related stuff *********** */ drawPoint: function(el) {},
    updatePoint: function(el) {},
    changePointStyle: function(el) {},
    /* ********* Line related stuff *********** */ drawLine: function(el) {},
    updateLine: function(el) {},
    drawTicks: function(el) {},
    updateTicks: function(el) {},
    /* ********* Curve related stuff *********** */ drawCurve: function(el) {},
    updateCurve: function(el) {},
    /* ********* Circle related stuff *********** */ drawEllipse: function(el) {},
    updateEllipse: function(el) {},
    /* ********* Polygon related stuff *********** */ drawPolygon: function(el) {},
    updatePolygon: function(el) {},
    /* ********* Text related stuff *********** */ displayCopyright: function(str, fontsize) {},
    drawInternalText: function(el) {},
    updateInternalText: function(el) {},
    drawText: function(el) {},
    updateText: function(el) {},
    updateTextStyle: function(el, doHighlight) {},
    updateInternalTextStyle: function(el, strokeColor, strokeOpacity) {},
    /* ********* Image related stuff *********** */ drawImage: function(el) {},
    updateImage: function(el) {},
    updateImageURL: function(el) {},
    /* ********* Render primitive objects *********** */ appendChildPrim: function(node, level) {},
    appendNodesToElement: function(el, type) {},
    remove: function(node) {},
    makeArrows: function(el) {},
    updateEllipsePrim: function(node, x, y, rx, ry) {},
    updateLinePrim: function(node, p1x, p1y, p2x, p2y, board) {},
    updatePathPrim: function(node, pathString, board) {},
    updatePathStringPoint: function(el, size, type) {},
    updatePathStringPrim: function(el) {},
    updatePathStringBezierPrim: function(el) {},
    updatePolygonPrim: function(node, el) {},
    updateRectPrim: function(node, x, y, w, h) {},
    setPropertyPrim: function(node, key, val) {},
    /* ********* Set attributes *********** */ show: function(el) {},
    hide: function(el) {},
    setBuffering: function(node, type) {},
    setDashStyle: function(el) {},
    setDraft: function(el) {},
    removeDraft: function(el) {},
    setGradient: function(el) {},
    updateGradient: function(el) {},
    setObjectTransition: function(el, duration) {},
    setObjectFillColor: function(el, color, opacity) {},
    setObjectStrokeColor: function(el, color, opacity) {},
    setObjectStrokeWidth: function(el, width) {},
    setShadow: function(el) {},
    highlight: function(el) {},
    noHighlight: function(el) {},
    /* ********* Renderer control *********** */ suspendRedraw: function() {},
    unsuspendRedraw: function() {},
    drawNavigationBar: function(board) {},
    getElementById: function(id) {
        return null;
    },
    resize: function(w, h) {},
    removeToInsertLater: function() {
        return function() {};
    }
});
/**
 * @ignore
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].NoRenderer.prototype = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$abstract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].NoRenderer;
}),
]);

//# sourceMappingURL=c0305_jsxgraph_src_renderer_a2e187ed._.js.map