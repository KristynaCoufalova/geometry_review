module.exports = [
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/parser/geonext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
;
;
;
/**
 * Parser helper routines. The methods in here are for parsing expressions in Geonext Syntax.
 * @namespace
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeonextParser = {
    /**
     * Converts expression of the form <i>leftop^rightop</i> into <i>Math.pow(leftop,rightop)</i>.
     * @param {String} te Expression of the form <i>leftop^rightop</i>
     * @returns {String} Converted expression.
     */ replacePow: function(te) {
        var count, pos, c, previousIndex, leftop, rightop, pre, p, left, i, right, expr;
        // delete all whitespace immediately before and after all ^ operators
        te = te.replace(/(\s*)\^(\s*)/g, "^");
        //  Loop over all ^ operators
        i = te.indexOf("^");
        previousIndex = -1;
        while(i >= 0 && i < te.length - 1){
            if (previousIndex === i) {
                throw new Error("JSXGraph: Error while parsing expression '" + te + "'");
            }
            previousIndex = i;
            // left and right are the substrings before, resp. after the ^ character
            left = te.slice(0, i);
            right = te.slice(i + 1);
            // If there is a ")" immediately before the ^ operator, it can be the end of a
            // (i) term in parenthesis
            // (ii) function call
            // (iii) method  call
            // In either case, first the corresponding opening parenthesis is searched.
            // This is the case, when count==0
            if (left.charAt(left.length - 1) === ")") {
                count = 1;
                pos = left.length - 2;
                while(pos >= 0 && count > 0){
                    c = left.charAt(pos);
                    if (c === ")") {
                        count++;
                    } else if (c === "(") {
                        count -= 1;
                    }
                    pos -= 1;
                }
                if (count === 0) {
                    // Now, we have found the opning parenthesis and we have to look
                    // if it is (i), or (ii), (iii).
                    leftop = "";
                    // Search for F or p.M before (...)^
                    pre = left.substring(0, pos + 1);
                    p = pos;
                    while(p >= 0 && pre.slice(p, p + 1).match(/([\w.]+)/)){
                        leftop = RegExp.$1 + leftop;
                        p -= 1;
                    }
                    leftop += left.substring(pos + 1, left.length);
                    leftop = leftop.replace(/([()+*%^\-/\][])/g, "\\$1");
                } else {
                    throw new Error("JSXGraph: Missing '(' in expression");
                }
            } else {
                // Otherwise, the operand has to be a constant (or variable).
                leftop = "[\\w\\.]+"; // former: \\w\\.
            }
            // To the right of the ^ operator there also may be a function or method call
            // or a term in parenthesis. Alos, ere we search for the closing
            // parenthesis.
            if (right.match(/^([\w.]*\()/)) {
                count = 1;
                pos = RegExp.$1.length;
                while(pos < right.length && count > 0){
                    c = right.charAt(pos);
                    if (c === ")") {
                        count -= 1;
                    } else if (c === "(") {
                        count += 1;
                    }
                    pos += 1;
                }
                if (count === 0) {
                    rightop = right.substring(0, pos);
                    rightop = rightop.replace(/([()+*%^\-/[\]])/g, "\\$1");
                } else {
                    throw new Error("JSXGraph: Missing ')' in expression");
                }
            } else {
                // Otherwise, the operand has to be a constant (or variable).
                rightop = "[\\w\\.]+";
            }
            // Now, we have the two operands and replace ^ by JXG.Math.pow
            expr = new RegExp("(" + leftop + ")\\^(" + rightop + ")");
            //te = te.replace(expr, 'JXG.Math.pow($1,$2)');
            te = te.replace(expr, "pow($1,$2)");
            i = te.indexOf("^");
        }
        return te;
    },
    /**
     * Converts expression of the form <i>If(a,b,c)</i> into <i>(a)?(b):(c)/i>.
     * @param {String} te Expression of the form <i>If(a,b,c)</i>
     * @returns {String} Converted expression.
     */ replaceIf: function(te) {
        var left, right, i, pos, count, k1, k2, c, meat, s = "", first = null, second = null, third = null;
        i = te.indexOf("If(");
        if (i < 0) {
            return te;
        }
        // "" means not defined. Here, we replace it by 0
        te = te.replace(/""/g, "0");
        while(i >= 0){
            left = te.slice(0, i);
            right = te.slice(i + 3);
            // Search the end of the If() command and take out the meat
            count = 1;
            pos = 0;
            k1 = -1;
            k2 = -1;
            while(pos < right.length && count > 0){
                c = right.charAt(pos);
                if (c === ")") {
                    count -= 1;
                } else if (c === "(") {
                    count += 1;
                } else if (c === "," && count === 1) {
                    if (k1 < 0) {
                        // first komma
                        k1 = pos;
                    } else {
                        // second komma
                        k2 = pos;
                    }
                }
                pos += 1;
            }
            meat = right.slice(0, pos - 1);
            right = right.slice(pos);
            // Test the two kommas
            if (k1 < 0) {
                // , missing
                return "";
            }
            if (k2 < 0) {
                // , missing
                return "";
            }
            first = meat.slice(0, k1);
            second = meat.slice(k1 + 1, k2);
            third = meat.slice(k2 + 1);
            // Recurse
            first = this.replaceIf(first);
            second = this.replaceIf(second);
            third = this.replaceIf(third);
            s += left + "((" + first + ")?" + "(" + second + "):(" + third + "))";
            te = right;
            first = null;
            second = null;
            i = te.indexOf("If(");
        }
        s += right;
        return s;
    },
    /**
     * Replace an element's name in terms by an element's id.
     * @param {String} term Term containing names of elements.
     * @param {JXG.Board} board Reference to the board the elements are on.
     * @param {Boolean} [jc=false] If true, all id's will be surrounded by <tt>$('</tt> and <tt>')</tt>.
     * @returns {String} The same string with names replaced by ids.
     **/ replaceNameById: function(term, board, jc) {
        var end, elName, el, i, pos = 0, funcs = [
            "X",
            "Y",
            "L",
            "V"
        ], printId = function(id) {
            if (jc) {
                return "$('" + id + "')";
            }
            return id;
        };
        // Find X(el), Y(el), ...
        // All functions declared in funcs
        for(i = 0; i < funcs.length; i++){
            pos = term.indexOf(funcs[i] + "(");
            while(pos >= 0){
                if (pos >= 0) {
                    end = term.indexOf(")", pos + 2);
                    if (end >= 0) {
                        elName = term.slice(pos + 2, end);
                        elName = elName.replace(/\\(['"])?/g, "$1");
                        el = board.elementsByName[elName];
                        if (el) {
                            term = term.slice(0, pos + 2) + (jc ? "$('" : "") + printId(el.id) + term.slice(end);
                        }
                    }
                }
                end = term.indexOf(")", pos + 2);
                pos = term.indexOf(funcs[i] + "(", end);
            }
        }
        pos = term.indexOf("Dist(");
        while(pos >= 0){
            if (pos >= 0) {
                end = term.indexOf(",", pos + 5);
                if (end >= 0) {
                    elName = term.slice(pos + 5, end);
                    elName = elName.replace(/\\(['"])?/g, "$1");
                    el = board.elementsByName[elName];
                    if (el) {
                        term = term.slice(0, pos + 5) + printId(el.id) + term.slice(end);
                    }
                }
            }
            end = term.indexOf(",", pos + 5);
            pos = term.indexOf(",", end);
            end = term.indexOf(")", pos + 1);
            if (end >= 0) {
                elName = term.slice(pos + 1, end);
                elName = elName.replace(/\\(['"])?/g, "$1");
                el = board.elementsByName[elName];
                if (el) {
                    term = term.slice(0, pos + 1) + printId(el.id) + term.slice(end);
                }
            }
            end = term.indexOf(")", pos + 1);
            pos = term.indexOf("Dist(", end);
        }
        funcs = [
            "Deg",
            "Rad"
        ];
        for(i = 0; i < funcs.length; i++){
            pos = term.indexOf(funcs[i] + "(");
            while(pos >= 0){
                if (pos >= 0) {
                    end = term.indexOf(",", pos + 4);
                    if (end >= 0) {
                        elName = term.slice(pos + 4, end);
                        elName = elName.replace(/\\(['"])?/g, "$1");
                        el = board.elementsByName[elName];
                        if (el) {
                            term = term.slice(0, pos + 4) + printId(el.id) + term.slice(end);
                        }
                    }
                }
                end = term.indexOf(",", pos + 4);
                pos = term.indexOf(",", end);
                end = term.indexOf(",", pos + 1);
                if (end >= 0) {
                    elName = term.slice(pos + 1, end);
                    elName = elName.replace(/\\(['"])?/g, "$1");
                    el = board.elementsByName[elName];
                    if (el) {
                        term = term.slice(0, pos + 1) + printId(el.id) + term.slice(end);
                    }
                }
                end = term.indexOf(",", pos + 1);
                pos = term.indexOf(",", end);
                end = term.indexOf(")", pos + 1);
                if (end >= 0) {
                    elName = term.slice(pos + 1, end);
                    elName = elName.replace(/\\(['"])?/g, "$1");
                    el = board.elementsByName[elName];
                    if (el) {
                        term = term.slice(0, pos + 1) + printId(el.id) + term.slice(end);
                    }
                }
                end = term.indexOf(")", pos + 1);
                pos = term.indexOf(funcs[i] + "(", end);
            }
        }
        return term;
    },
    /**
     * Replaces element ids in terms by element this.board.objects['id'].
     * @param {String} term A GEONE<sub>x</sub>T function string with JSXGraph ids in it.
     * @returns {String} The input string with element ids replaced by this.board.objects["id"].
     **/ replaceIdByObj: function(term) {
        // Search for expressions like "X(gi23)" or "Y(gi23A)" and convert them to objects['gi23'].X().
        var expr = /(X|Y|L)\(([\w_]+)\)/g;
        term = term.replace(expr, "$('$2').$1()");
        expr = /(V)\(([\w_]+)\)/g;
        term = term.replace(expr, "$('$2').Value()");
        expr = /(Dist)\(([\w_]+),([\w_]+)\)/g;
        term = term.replace(expr, "dist($('$2'), $('$3'))");
        expr = /(Deg)\(([\w_]+),([ \w[\w_]+),([\w_]+)\)/g;
        term = term.replace(expr, "deg($('$2'),$('$3'),$('$4'))");
        // Search for Rad('gi23','gi24','gi25')
        expr = /Rad\(([\w_]+),([\w_]+),([\w_]+)\)/g;
        term = term.replace(expr, "rad($('$1'),$('$2'),$('$3'))");
        // it's ok, it will run through the jessiecode parser afterwards...
        /*jslint regexp: true*/ expr = /N\((.+)\)/g;
        term = term.replace(expr, "($1)");
        return term;
    },
    /**
     * Converts the given algebraic expression in GEONE<sub>x</sub>T syntax into an equivalent expression in JavaScript syntax.
     * @param {String} term Expression in GEONExT syntax
     * @param {JXG.Board} board
     * @returns {String} Given expression translated to JavaScript.
     */ geonext2JS: function(term, board) {
        var expr, newterm, i, from = [
            "Abs",
            "ACos",
            "ASin",
            "ATan",
            "Ceil",
            "Cos",
            "Exp",
            "Factorial",
            "Floor",
            "Log",
            "Max",
            "Min",
            "Random",
            "Round",
            "Sin",
            "Sqrt",
            "Tan",
            "Trunc"
        ], to = [
            "abs",
            "acos",
            "asin",
            "atan",
            "ceil",
            "cos",
            "exp",
            "factorial",
            "floor",
            "log",
            "max",
            "min",
            "random",
            "round",
            "sin",
            "sqrt",
            "tan",
            "ceil"
        ];
        // Hacks, to enable not well formed XML, @see JXG.GeonextReader#replaceLessThan
        term = term.replace(/&lt;/g, "<");
        term = term.replace(/&gt;/g, ">");
        term = term.replace(/&amp;/g, "&");
        // Convert GEONExT syntax to JavaScript syntax
        newterm = term;
        newterm = this.replaceNameById(newterm, board);
        newterm = this.replaceIf(newterm);
        // Exponentiations-Problem x^y -> Math(exp(x,y).
        newterm = this.replacePow(newterm);
        newterm = this.replaceIdByObj(newterm);
        for(i = 0; i < from.length; i++){
            // sin -> Math.sin and asin -> Math.asin
            expr = new RegExp([
                "(\\W|^)(",
                from[i],
                ")"
            ].join(""), "ig");
            newterm = newterm.replace(expr, [
                "$1",
                to[i]
            ].join(""));
        }
        newterm = newterm.replace(/True/g, "true");
        newterm = newterm.replace(/False/g, "false");
        newterm = newterm.replace(/fasle/g, "false");
        newterm = newterm.replace(/Pi/g, "PI");
        newterm = newterm.replace(/"/g, "'");
        return newterm;
    },
    /**
     * Finds dependencies in a given term and resolves them by adding the
     * dependent object to the found objects child elements.
     * @param {JXG.GeometryElement} me Object depending on objects in given term.
     * @param {String} term String containing dependencies for the given object.
     * @param {JXG.Board} [board=me.board] Reference to a board
     */ findDependencies: function(me, term, board) {
        var elements, el, expr, elmask;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(board)) {
            board = me.board;
        }
        elements = board.elementsByName;
        for(el in elements){
            if (elements.hasOwnProperty(el)) {
                if (el !== me.name) {
                    if (elements[el].elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_TEXT) {
                        if (!elements[el].evalVisProp('islabel')) {
                            elmask = el.replace(/\[/g, "\\[");
                            elmask = elmask.replace(/\]/g, "\\]");
                            // Searches (A), (A,B),(A,B,C)
                            expr = new RegExp("\\(([\\w\\[\\]'_ ]+,)*(" + elmask + ")(,[\\w\\[\\]'_ ]+)*\\)", "g");
                            if (term.search(expr) >= 0) {
                                elements[el].addChild(me);
                            }
                        }
                    } else {
                        elmask = el.replace(/\[/g, "\\[");
                        elmask = elmask.replace(/\]/g, "\\]");
                        // Searches (A), (A,B),(A,B,C)
                        expr = new RegExp("\\(([\\w\\[\\]'_ ]+,)*(" + elmask + ")(,[\\w\\[\\]'_ ]+)*\\)", "g");
                        if (term.search(expr) >= 0) {
                            elements[el].addChild(me);
                        }
                    }
                }
            }
        }
    },
    /**
     * Converts the given algebraic expression in GEONE<sub>x</sub>T syntax into an equivalent expression in JessieCode syntax.
     * @param {String} term Expression in GEONExT syntax
     * @param {JXG.Board} board
     * @returns {String} Given expression translated to JavaScript.
     */ gxt2jc: function(term, board) {
        var newterm;
        // from = ["Sqrt"],
        // to = ["sqrt"];
        // Hacks, to enable not well formed XML, @see JXG.GeonextReader#replaceLessThan
        term = term.replace(/&lt;/g, "<");
        term = term.replace(/&gt;/g, ">");
        term = term.replace(/&amp;/g, "&");
        newterm = term;
        newterm = this.replaceNameById(newterm, board, true);
        newterm = newterm.replace(/True/g, "true");
        newterm = newterm.replace(/False/g, "false");
        newterm = newterm.replace(/fasle/g, "false");
        return newterm;
    }
};
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeonextParser;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/parser/jessiecode.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 JessieCode Interpreter and Compiler

    Copyright 2011-2023
        Michael Gerhaeuser,
        Alfred Wassermann

    JessieCode is free software dual licensed under the GNU LGPL or MIT License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT

    JessieCode is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License and
    the MIT License along with JessieCode. If not, see <https://www.gnu.org/licenses/>
    and <https://opensource.org/licenses/MIT/>.
 */ /*global JXG: true, define: true, window: true, console: true, self: true, document: true, parser: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview JessieCode is a scripting language designed to provide a
 * simple scripting language to build constructions
 * with JSXGraph. It is similar to JavaScript, but prevents access to the DOM.
 * Hence, it can be used in community driven math portals which want to use
 * JSXGraph to display interactive math graphics.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/text.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/ia.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$statistics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/statistics.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/env.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
// IE 6-8 compatibility
if (!Object.create) {
    Object.create = function(o, properties) {
        if (typeof o !== 'object' && typeof o !== 'function') throw new TypeError('Object prototype may only be an Object: ' + o);
        else if (o === null) throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
        if (typeof properties != 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");
        function F() {}
        F.prototype = o;
        return new F();
    };
}
var priv = {
    modules: {
        'math': __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        'math/geometry': __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        'math/statistics': __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$statistics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        'math/numerics': __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Numerics
    }
};
/**
 * A JessieCode object provides an interface to the parser and stores all variables and objects used within a JessieCode script.
 * The optional argument <tt>code</tt> is interpreted after initializing. To evaluate more code after initializing a JessieCode instance
 * please use {@link JXG.JessieCode#parse}. For code snippets like single expressions use {@link JXG.JessieCode#snippet}.
 * @constructor
 * @param {String} [code] Code to parse.
 * @param {Boolean} [geonext=false] Geonext compatibility mode.
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].JessieCode = function(code, geonext) {
    // Control structures
    /**
     * The global scope.
     * @type Object
     */ this.scope = {
        id: 0,
        hasChild: true,
        args: [],
        locals: {},
        context: null,
        previous: null
    };
    /**
     * Keeps track of all possible scopes every required.
     * @type Array
     */ this.scopes = [];
    this.scopes.push(this.scope);
    /**
     * A stack to store debug information (like line and column where it was defined) of a parameter
     * @type Array
     * @private
     */ this.dpstack = [
        []
    ];
    /**
     * Determines the parameter stack scope.
     * @type Number
     * @private
     */ this.pscope = 0;
    /**
     * Used to store the property-value definition while parsing an object literal.
     * @type Array
     * @private
     */ this.propstack = [
        {}
    ];
    /**
     * The current scope of the object literal stack {@link JXG.JessieCode#propstack}.
     * @type Number
     * @private
     */ this.propscope = 0;
    /**
     * Store the left hand side of an assignment. If an element is constructed and no attributes are given, this is
     * used as the element's name.
     * @type Array
     * @private
     */ this.lhs = [];
    /**
     * lhs flag, used by JXG.JessieCode#replaceNames
     * @type Boolean
     * @default false
     */ this.isLHS = false;
    /**
     * The id of an HTML node in which innerHTML all warnings are stored (if no <tt>console</tt> object is available).
     * @type String
     * @default 'jcwarn'
     */ this.warnLog = 'jcwarn';
    /**
     * Store $log messages in case there's no console.
     * @type Array
     */ this.$log = [];
    /**
     * Built-in functions and constants
     * @type Object
     */ this.builtIn = this.defineBuiltIn();
    /**
     * List of all possible operands in JessieCode (except of JSXGraph objects).
     * @type Object
     */ this.operands = this.getPossibleOperands();
    /**
     * The board which currently is used to create and look up elements.
     * @type JXG.Board
     */ this.board = null;
    /**
     * Force slider names to return value instead of node
     * @type Boolean
     */ this.forceValueCall = false;
    /**
     * Keep track of which element is created in which line.
     * @type Object
     */ this.lineToElement = {};
    this.parCurLine = 1;
    this.parCurColumn = 0;
    this.line = 1;
    this.col = 1;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].CA) {
        this.CA = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].CA(this.node, this.createNode, this);
    }
    this.code = '';
    if (typeof code === 'string') {
        this.parse(code, geonext);
    }
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].JessieCode.prototype, /** @lends JXG.JessieCode.prototype */ {
    /**
     * Create a new parse tree node.
     * @param {String} type Type of node, e.g. node_op, node_var, or node_const
     * @param value The nodes value, e.g. a variables value or a functions body.
     * @param {Array} children Arbitrary number of child nodes.
     */ node: function(type, value, children) {
        return {
            type: type,
            value: value,
            children: children
        };
    },
    /**
     * Create a new parse tree node. Basically the same as node(), but this builds
     * the children part out of an arbitrary number of parameters, instead of one
     * array parameter.
     * @param {String} type Type of node, e.g. node_op, node_var, or node_const
     * @param value The nodes value, e.g. a variables value or a functions body.
     * @param children Arbitrary number of parameters; define the child nodes.
     */ createNode: function(type, value, children) {
        var n = this.node(type, value, []), i;
        for(i = 2; i < arguments.length; i++){
            n.children.push(arguments[i]);
        }
        if (n.type === 'node_const' && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(n.value)) {
            n.isMath = true;
        }
        n.line = this.parCurLine;
        n.col = this.parCurColumn;
        return n;
    },
    /**
     * Create a new scope.
     * @param {Array} args
     * @returns {Object}
     */ pushScope: function(args) {
        var scope = {
            args: args,
            locals: {},
            context: null,
            previous: this.scope
        };
        this.scope.hasChild = true;
        this.scope = scope;
        scope.id = this.scopes.push(scope) - 1;
        return scope;
    },
    /**
     * Remove the current scope and reinstate the previous scope
     * @returns {Object}
     */ popScope: function() {
        var s = this.scope.previous;
        // make sure the global scope is not lost
        this.scope = s !== null ? s : this.scope;
        return this.scope;
    },
    /**
     * Looks up an {@link JXG.GeometryElement} by its id.
     * @param {String} id
     * @returns {JXG.GeometryElement}
     */ getElementById: function(id) {
        return this.board.objects[id];
    },
    log: function() {
        this.$log.push(arguments);
        if (typeof console === 'object' && console.log) {
            console.log.apply(console, arguments);
        }
    },
    /**
     * Returns a element creator function which takes two parameters: the parents array and the attributes object.
     * @param {String} vname The element type, e.g. 'point', 'line', 'midpoint'
     * @returns {function}
     */ creator: function() {
        // stores the already defined creators
        var _ccache = {}, r;
        r = function(vname) {
            var f;
            // _ccache is global, i.e. it is the same for ALL JessieCode instances.
            // That's why we need the board id here
            if (typeof _ccache[this.board.id + vname] === 'function') {
                f = _ccache[this.board.id + vname];
            } else {
                f = function(that) {
                    return function(parameters, attributes) {
                        var attr;
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(attributes)) {
                            attr = attributes;
                        } else {
                            attr = {};
                        }
                        if (attr.name === undefined && attr.id === undefined) {
                            attr.name = that.lhs[that.scope.id] !== 0 ? that.lhs[that.scope.id] : '';
                        }
                        return that.board.create(vname, parameters, attr);
                    };
                }(this);
                f.creator = true;
                _ccache[this.board.id + vname] = f;
            }
            return f;
        };
        r.clearCache = function() {
            _ccache = {};
        };
        return r;
    }(),
    /**
     * Assigns a value to a variable in the current scope.
     * @param {String} vname Variable name
     * @param value Anything
     * @see JXG.JessieCode#sstack
     * @see JXG.JessieCode#scope
     */ letvar: function(vname, value) {
        if (this.builtIn[vname]) {
            this._warn('"' + vname + '" is a predefined value.');
        }
        this.scope.locals[vname] = value;
    },
    /**
     * Checks if the given variable name can be found in the current scope chain.
     * @param {String} vname
     * @returns {Object} A reference to the scope object the variable can be found in or null if it can't be found.
     */ isLocalVariable: function(vname) {
        var s = this.scope;
        while(s !== null){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(s.locals[vname])) {
                return s;
            }
            s = s.previous;
        }
        return null;
    },
    /**
     * Checks if the given variable name is a parameter in any scope from the current to the global scope.
     * @param {String} vname
     * @returns {Object} A reference to the scope object that contains the variable in its arg list.
     */ isParameter: function(vname) {
        var s = this.scope;
        while(s !== null){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].indexOf(s.args, vname) > -1) {
                return s;
            }
            s = s.previous;
        }
        return null;
    },
    /**
     * Checks if the given variable name is a valid creator method.
     * @param {String} vname
     * @returns {Boolean}
     */ isCreator: function(vname) {
        // check for an element with this name
        return !!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].elements[vname];
    },
    /**
     * Checks if the given variable identifier is a valid member of the JavaScript Math Object.
     * @param {String} vname
     * @returns {Boolean}
     */ isMathMethod: function(vname) {
        return vname !== 'E' && !!Math[vname];
    },
    /**
     * Returns true if the given identifier is a builtIn variable/function.
     * @param {String} vname
     * @returns {Boolean}
     */ isBuiltIn: function(vname) {
        return !!this.builtIn[vname];
    },
    /**
     * Looks up the value of the given variable. We use a simple type inspection.
     *
     * @param {String} vname Name of the variable
     * @param {Boolean} [local=false] Only look up the internal symbol table and don't look for
     * the <tt>vname</tt> in Math or the element list.
     * @param {Boolean} [isFunctionName=false] Lookup function of type builtIn, Math.*, creator.
     *
     * @see JXG.JessieCode#resolveType
     */ getvar: function(vname, local, isFunctionName) {
        var s;
        local = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].def(local, false);
        // Local scope has always precedence
        s = this.isLocalVariable(vname);
        if (s !== null) {
            return s.locals[vname];
        }
        // Handle the - so far only - few constants by hard coding them.
        if (vname === '$board' || vname === 'EULER' || vname === 'PI') {
            return this.builtIn[vname];
        }
        if (isFunctionName) {
            if (this.isBuiltIn(vname)) {
                return this.builtIn[vname];
            }
            if (this.isMathMethod(vname)) {
                return Math[vname];
            }
            // check for an element with this name
            if (this.isCreator(vname)) {
                return this.creator(vname);
            }
        }
        if (!local) {
            s = this.board.select(vname);
            if (s !== vname) {
                return s;
            }
        }
    },
    /**
     * Look up the value of a local variable.
     * @param {string} vname
     * @returns {*}
     */ resolve: function(vname) {
        var s = this.scope;
        while(s !== null){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(s.locals[vname])) {
                return s.locals[vname];
            }
            s = s.previous;
        }
    },
    /**
     * TODO this needs to be called from JS and should not generate JS code
     * Looks up a variable identifier in various tables and generates JavaScript code that could be eval'd to get the value.
     * @param {String} vname Identifier
     * @param {Boolean} [local=false] Don't resolve ids and names of elements
     * @param {Boolean} [withProps=false]
     */ getvarJS: function(vname, local, withProps) {
        var s, r = '', re;
        local = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].def(local, false);
        withProps = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].def(withProps, false);
        s = this.isParameter(vname);
        if (s !== null) {
            return vname;
        }
        s = this.isLocalVariable(vname);
        if (s !== null && !withProps) {
            return '$jc$.resolve(\'' + vname + '\')';
        }
        // check for an element with this name
        if (this.isCreator(vname)) {
            return '(function () { var a = Array.prototype.slice.call(arguments, 0), props = ' + (withProps ? 'a.pop()' : '{}') + '; return $jc$.board.create.apply($jc$.board, [\'' + vname + '\'].concat([a, props])); })';
        }
        if (withProps) {
            this._error('Syntax error (attribute values are allowed with element creators only)');
        }
        if (this.isBuiltIn(vname)) {
            // If src does not exist, it is a number. In that case, just return the value.
            r = this.builtIn[vname].src || this.builtIn[vname];
            // Get the "real" name of the function
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(r)) {
                return r;
            }
            // Search a JSXGraph object in board
            if (r.match(/board\.select/)) {
                return r;
            }
            /* eslint-disable no-useless-escape */ vname = r.split('.').pop();
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.board.mathLib)) {
                // Handle builtin case: ln(x) -> Math.log
                re = new RegExp('^Math\.' + vname);
                if (re.exec(r) !== null) {
                    return r.replace(re, '$jc$.board.mathLib.' + vname);
                }
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.board.mathLibJXG)) {
                // Handle builtin case: factorial(x) -> JXG.Math.factorial
                re = new RegExp('^JXG\.Math\.');
                if (re.exec(r) !== null) {
                    return r.replace(re, '$jc$.board.mathLibJXG.');
                }
                return r;
            }
            /* eslint-enable no-useless-escape */ return r;
        // return this.builtIn[vname].src || this.builtIn[vname];
        }
        if (this.isMathMethod(vname)) {
            return '$jc$.board.mathLib.' + vname;
        //                return 'Math.' + vname;
        }
        // if (!local) {
        //     if (Type.isId(this.board, vname)) {
        //         r = '$jc$.board.objects[\'' + vname + '\']';
        //     } else if (Type.isName(this.board, vname)) {
        //         r = '$jc$.board.elementsByName[\'' + vname + '\']';
        //     } else if (Type.isGroup(this.board, vname)) {
        //         r = '$jc$.board.groups[\'' + vname + '\']';
        //     }
        //     return r;
        // }
        if (!local) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isId(this.board, vname)) {
                r = '$jc$.board.objects[\'' + vname + '\']';
                if (this.board.objects[vname].elType === 'slider') {
                    r += '.Value()';
                }
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isName(this.board, vname)) {
                r = '$jc$.board.elementsByName[\'' + vname + '\']';
                if (this.board.elementsByName[vname].elType === 'slider') {
                    r += '.Value()';
                }
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isGroup(this.board, vname)) {
                r = '$jc$.board.groups[\'' + vname + '\']';
            }
            return r;
        }
        return '';
    },
    /**
     * Adds the property <tt>isMap</tt> to a function and sets it to true.
     * @param {function} f
     * @returns {function}
     */ makeMap: function(f) {
        f.isMap = true;
        return f;
    },
    functionCodeJS: function(node) {
        var p = node.children[0].join(', '), bo = '', bc = '';
        if (node.value === 'op_map') {
            bo = '{ return  ';
            bc = ' }';
        }
        return 'function (' + p + ') {\n' + 'var $oldscope$ = $jc$.scope;\n' + '$jc$.scope = $jc$.scopes[' + this.scope.id + '];\n' + 'var r = (function () ' + bo + this.compile(node.children[1], true) + bc + ')();\n' + '$jc$.scope = $oldscope$;\n' + 'return r;\n' + '}';
    },
    /**
     * Converts a node type <tt>node_op</tt> and value <tt>op_map</tt> or <tt>op_function</tt> into a executable
     * function. Does a simple type inspection.
     * @param {Object} node
     * @returns {function}
     * @see JXG.JessieCode#resolveType
     */ defineFunction: function(node) {
        var fun, i, that = this, list = node.children[0], scope = this.pushScope(list);
        if (this.board.options.jc.compile) {
            this.isLHS = false;
            // we currently need to put the parameters into the local scope
            // until the compiled JS variable lookup code is fixed
            for(i = 0; i < list.length; i++){
                scope.locals[list[i]] = list[i];
            }
            this.replaceNames(node.children[1]);
            /** @ignore */ fun = function(jc) {
                var fun, // str = 'var f = ' + $jc$.functionCodeJS(node) + '; f;';
                str = 'var f = function($jc$) { return ' + jc.functionCodeJS(node) + '}; f;';
                try {
                    // yeah, eval is evil, but we don't have much choice here.
                    // the str is well defined and there is no user input in it that we didn't check before
                    /*jslint evil:true*/ // fun = eval(str);
                    fun = eval(str)(jc);
                    /*jslint evil:false*/ scope.argtypes = [];
                    for(i = 0; i < list.length; i++){
                        scope.argtypes.push(that.resolveType(list[i], node));
                    }
                    return fun;
                } catch (e) {
                    // $jc$._warn('error compiling function\n\n' + str + '\n\n' + e.toString());
                    jc._warn("error compiling function\n\n" + str + "\n\n" + e.toString());
                    return function() {};
                }
            }(this);
            // clean up scope
            this.popScope();
        } else {
            /** @ignore */ fun = function(_pstack, that, id) {
                return function() {
                    var r, oldscope;
                    oldscope = that.scope;
                    that.scope = that.scopes[id];
                    for(r = 0; r < _pstack.length; r++){
                        that.scope.locals[_pstack[r]] = arguments[r];
                    }
                    r = that.execute(node.children[1]);
                    that.scope = oldscope;
                    return r;
                };
            }(list, this, scope.id);
        }
        fun.node = node;
        fun.scope = scope;
        fun.toJS = fun.toString;
        fun.toString = function(_that) {
            return function() {
                return _that.compile(_that.replaceIDs(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node)));
            };
        }(this);
        fun.deps = {};
        this.collectDependencies(node.children[1], node.children[0], fun.deps);
        return fun;
    },
    /**
     * Merge all attribute values given with an element creator into one object.
     * @param {Object} o An arbitrary number of objects
     * @returns {Object} All given objects merged into one. If properties appear in more (case sensitive) than one
     * object the last value is taken.
     */ mergeAttributes: function(o) {
        var i, attr = {};
        for(i = 0; i < arguments.length; i++){
            attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(attr, arguments[i], true);
        }
        return attr;
    },
    /**
     * Sets the property <tt>what</tt> of <tt>o</tt> to <tt>value</tt>
     * @param {JXG.Point|JXG.Text} o
     * @param {String} what
     * @param value
     */ setProp: function(o, what, value) {
        var par = {}, x, y;
        if (o.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_POINT && (what === 'X' || what === 'Y')) {
            // set coords
            what = what.toLowerCase();
            // we have to deal with three cases here:
            // o.isDraggable && typeof value === number:
            //   stay draggable, just set the new coords (e.g. via moveTo)
            // o.isDraggable && typeof value === function:
            //   convert to !o.isDraggable, set the new coords via o.addConstraint()
            // !o.isDraggable:
            //   stay !o.isDraggable, update the given coord by overwriting X/YEval
            if (o.isDraggable && typeof value === 'number') {
                x = what === 'x' ? value : o.X();
                y = what === 'y' ? value : o.Y();
                o.setPosition(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, [
                    x,
                    y
                ]);
            } else if (o.isDraggable && (typeof value === 'function' || typeof value === 'string')) {
                x = what === 'x' ? value : o.coords.usrCoords[1];
                y = what === 'y' ? value : o.coords.usrCoords[2];
                o.addConstraint([
                    x,
                    y
                ]);
            } else if (!o.isDraggable) {
                x = what === 'x' ? value : o.XEval.origin;
                y = what === 'y' ? value : o.YEval.origin;
                o.addConstraint([
                    x,
                    y
                ]);
            }
            this.board.update();
        } else if (o.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_TEXT && (what === 'X' || what === 'Y')) {
            if (typeof value === 'number') {
                o[what] = function() {
                    return value;
                };
            } else if (typeof value === 'function') {
                o.isDraggable = false;
                o[what] = value;
            } else if (typeof value === 'string') {
                o.isDraggable = false;
                o[what] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createFunction(value, this.board);
                o[what + 'jc'] = value;
            }
            o[what].origin = value;
            this.board.update();
        } else if (o.type && o.elementClass && o.visProp) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(o[o.methodMap[what]]) && typeof o[o.methodMap[what]] !== 'function') {
                o[o.methodMap[what]] = value;
            } else {
                par[what] = value;
                o.setAttribute(par);
            }
        } else {
            o[what] = value;
        }
    },
    /**
     * Generic method to parse JessieCode.
     * This consists of generating an AST with parser.parse,
     * apply simplifying rules from CA and
     * manipulate the AST according to the second parameter "cmd".
     * @param  {String} code      JessieCode code to be parsed
     * @param  {String} cmd       Type of manipulation to be done with AST
     * @param {Boolean} [geonext=false] Geonext compatibility mode.
     * @param {Boolean} [dontstore=false] If false, the code string is stored in this.code,
     *  i.e. in the JessieCode object, e.g. in board.jc.
     * @return {Object} Returns result of computation as directed in cmd.
     */ _genericParse: function(code, cmd, geonext, dontstore) {
        var i, setTextBackup, ast, result, ccode = code.replace(/\r\n/g, '\n').split('\n'), cleaned = [];
        if (!dontstore) {
            this.code += code + '\n';
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]) {
            setTextBackup = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].prototype.setText;
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].prototype.setText = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].prototype.setTextJessieCode;
        }
        try {
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(geonext)) {
                geonext = false;
            }
            for(i = 0; i < ccode.length; i++){
                if (geonext) {
                    ccode[i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].GeonextParser.geonext2JS(ccode[i], this.board);
                }
                cleaned.push(ccode[i]);
            }
            code = cleaned.join('\n');
            ast = parser.parse(code);
            if (this.CA) {
                ast = this.CA.expandDerivatives(ast, null, ast);
                ast = this.CA.removeTrivialNodes(ast);
            }
            switch(cmd){
                case 'parse':
                    result = this.execute(ast);
                    break;
                case 'manipulate':
                    result = this.compile(ast);
                    break;
                case 'getAst':
                    result = ast;
                    break;
                default:
                    result = false;
            }
        } catch (e) {
            // console.log(e);
            // We throw the error again,
            // so the user can catch it.
            throw e;
        } finally{
            // make sure the original text method is back in place
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].prototype.setText = setTextBackup;
            }
        }
        return result;
    },
    /**
     * Parses JessieCode.
     * This consists of generating an AST with parser.parse, apply simplifying rules
     * from CA and executing the ast by calling this.execute(ast).
     *
     * @param {String} code             JessieCode code to be parsed
     * @param {Boolean} [geonext=false] Geonext compatibility mode.
     * @param {Boolean} [dontstore=false] If false, the code string is stored in this.code.
     * @return {Object}                 Parse JessieCode code and execute it.
     */ parse: function(code, geonext, dontstore) {
        return this._genericParse(code, 'parse', geonext, dontstore);
    },
    /**
     * Manipulate JessieCode.
     * This consists of generating an AST with parser.parse,
     * apply simplifying rules from CA
     * and compile the AST back to JessieCode.
     *
     * @param {String} code             JessieCode code to be parsed
     * @param {Boolean} [geonext=false] Geonext compatibility mode.
     * @param {Boolean} [dontstore=false] If false, the code string is stored in this.code.
     * @return {String}                 Simplified JessieCode code
     */ manipulate: function(code, geonext, dontstore) {
        return this._genericParse(code, 'manipulate', geonext, dontstore);
    },
    /**
     * Get abstract syntax tree (AST) from JessieCode code.
     * This consists of generating an AST with parser.parse.
     *
     * @param {String} code
     * @param {Boolean} [geonext=false] Geonext compatibility mode.
     * @param {Boolean} [dontstore=false] If false, the code string is stored in this.code.
     * @return {Node}  AST
     */ getAST: function(code, geonext, dontstore) {
        return this._genericParse(code, 'getAst', geonext, dontstore);
    },
    /**
     * Parses a JessieCode snippet, e.g. "3+4", and wraps it into a function, if desired.
     * @param {String} code A small snippet of JessieCode. Must not be an assignment.
     * @param {Boolean} [funwrap=true] If true, the code is wrapped in a function.
     * @param {String} [varname=''] Name of the parameter(s)
     * @param {Boolean} [geonext=false] Geonext compatibility mode.
     * @param {Boolean} [forceValueCall=true] Force evaluation of value method of sliders.
     */ snippet: function(code, funwrap, varname, geonext, forceValueCall) {
        var c;
        funwrap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].def(funwrap, true);
        varname = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].def(varname, '');
        geonext = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].def(geonext, false);
        this.forceValueCall = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].def(forceValueCall, true);
        c = (funwrap ? ' function (' + varname + ') { return ' : '') + code + (funwrap ? '; }' : '') + ';';
        return this.parse(c, geonext, true);
    },
    /**
     * Traverses through the given subtree and changes all values of nodes with the replaced flag set by
     * {@link JXG.JessieCode#replaceNames} to the name of the element (if not empty).
     * @param {Object} node
     */ replaceIDs: function(node) {
        var i, v;
        if (node.replaced) {
            // These children exist, if node.replaced is set.
            v = this.board.objects[node.children[1][0].value];
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(v) && v.name !== "") {
                node.type = 'node_var';
                node.value = v.name;
                // Maybe it's not necessary, but just to be sure that everything is cleaned up we better delete all
                // children and the replaced flag
                node.children.length = 0;
                delete node.replaced;
            }
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(node)) {
            for(i = 0; i < node.length; i++){
                node[i] = this.replaceIDs(node[i]);
            }
        }
        if (node.children) {
            // assignments are first evaluated on the right hand side
            for(i = node.children.length; i > 0; i--){
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(node.children[i - 1])) {
                    node.children[i - 1] = this.replaceIDs(node.children[i - 1]);
                }
            }
        }
        return node;
    },
    /**
     * Traverses through the given subtree and changes all elements referenced by names through referencing them by ID.
     * An identifier is only replaced if it is not found in all scopes above the current scope and if it
     * has not been blacklisted within the codeblock determined by the given subtree.
     * @param {Object} node
     * @param {Boolean} [callValuePar=false] if true, uses $value() instead of $() in createReplacementNode
     */ replaceNames: function(node, callValuePar) {
        var i, v, callValue = false;
        if (callValuePar !== undefined) {
            callValue = callValuePar;
        }
        v = node.value;
        // We are interested only in nodes of type node_var and node_op > op_lhs.
        // Currently, we are not checking if the id is a local variable. in this case, we're stuck anyway.
        if (node.type === 'node_op' && v === 'op_lhs' && node.children.length === 1) {
            this.isLHS = true;
        } else if (node.type === 'node_var') {
            if (this.isLHS) {
                this.letvar(v, true);
            } else if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.getvar(v, true)) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.board.elementsByName[v])) {
                if (callValue && this.board.elementsByName[v].elType !== 'slider') {
                    callValue = false;
                }
                node = this.createReplacementNode(node, callValue);
            }
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(node)) {
            for(i = 0; i < node.length; i++){
                node[i] = this.replaceNames(node[i], callValue);
            }
        }
        if (node.children) {
            // Replace slider reference by call of slider.Value()
            if (this.forceValueCall && // It must be enforced, see snippet.
            (// 1. case: sin(a), max(a, 0), ...
            node.value === "op_execfun" && // Not in cases V(a), $(a)
            node.children[0].value !== 'V' && node.children[0].value !== '$' && // Function must be a math function. This ensures that a number is required as input.
            (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(Math[node.children[0].value]) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"][node.children[0].value])) && // node.children[1].length === 1 &&
            node.children[1][0].type === 'node_var' || node.value === "op_return" && node.children.length === 1 && node.children[0].type === 'node_var')) {
                callValue = true;
            }
            // Assignments are first evaluated on the right hand side
            for(i = node.children.length; i > 0; i--){
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(node.children[i - 1])) {
                    node.children[i - 1] = this.replaceNames(node.children[i - 1], callValue);
                }
            }
        }
        if (node.type === 'node_op' && node.value === 'op_lhs' && node.children.length === 1) {
            this.isLHS = false;
        }
        return node;
    },
    /**
     * Replaces node_var nodes with node_op&gt;op_execfun nodes, calling the internal $() function with the id of the
     * element accessed by the node_var node.
     * @param {Object} node
     * @param {Boolean} [callValue=undefined] if true, uses $value() instead of $()
     * @returns {Object} op_execfun node
     */ createReplacementNode: function(node, callValue) {
        var v = node.value, el = this.board.elementsByName[v];
        // If callValue: get handle to this node_var and call its Value method.
        // Otherwise return the object.
        node = this.createNode('node_op', 'op_execfun', this.createNode('node_var', callValue === true ? '$value' : '$'), [
            this.createNode('node_str', el.id)
        ]);
        node.replaced = true;
        return node;
    },
    /**
     * Search the parse tree below <tt>node</tt> for <em>stationary</em> dependencies, i.e. dependencies hard coded into
     * the function.
     * @param {Object} node
     * @param {Array} varnames List of variable names of the function
     * @param {Object} result An object where the referenced elements will be stored. Access key is their id.
     */ collectDependencies: function(node, varnames, result) {
        var i, v, e, le;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(node)) {
            le = node.length;
            for(i = 0; i < le; i++){
                this.collectDependencies(node[i], varnames, result);
            }
            return;
        }
        v = node.value;
        if (node.type === 'node_var' && varnames.indexOf(v) < 0 // v is not contained in the list of variables of that function
        ) {
            e = this.getvar(v);
            if (e && e.visProp && e.elType && e.elementClass && e.id) {
                result[e.id] = e;
            }
        }
        // The $()-function-calls are special because their parameter is given as a string, not as a node_var.
        if (node.type === 'node_op' && node.value === 'op_execfun' && node.children.length > 1 && (node.children[0].value === '$' || node.children[0].value === '$value') && node.children[1].length > 0) {
            e = node.children[1][0].value;
            result[e] = this.board.objects[e];
        }
        if (node.children) {
            for(i = node.children.length; i > 0; i--){
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(node.children[i - 1])) {
                    this.collectDependencies(node.children[i - 1], varnames, result);
                }
            }
        }
    },
    resolveProperty: function(e, v, compile) {
        compile = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].def(compile, false);
        // is it a geometry element or a board?
        if (e /*&& e.type && e.elementClass*/  && e.methodMap) {
            // yeah, it is. but what does the user want?
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(e.subs) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(e.subs[v])) {
                // a subelement it is, good sir.
                e = e.subs;
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(e.methodMap[v])) {
                // the user wants to call a method
                v = e.methodMap[v];
            } else {
                // the user wants to change an attribute
                e = e.visProp;
                v = v.toLowerCase();
            }
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(e)) {
            this._error('Accessing function properties is not allowed.');
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(e)) {
            this._error(e + ' is not an object');
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(e[v])) {
            this._error('unknown property ' + v);
        }
        if (compile && typeof e[v] === 'function') {
            return function() {
                return e[v].apply(e, arguments);
            };
        }
        return e[v];
    },
    /**
     * Type inspection: check if the string vname appears as function name in the
     * AST node. Used in "op_execfun". This allows the JessieCode examples below.
     *
     * @private
     * @param {String} vname
     * @param {Object} node
     * @returns 'any' or 'function'
     * @see JXG.JessieCode#execute
     * @see JXG.JessieCode#getvar
     *
     * @example
     *  var p = board.create('point', [2, 0], {name: 'X'});
     *  var txt = 'X(X)';
     *  console.log(board.jc.parse(txt));
     *
     * @example
     *  var p = board.create('point', [2, 0], {name: 'X'});
     *  var txt = 'f = function(el, X) { return X(el); }; f(X, X);';
     *  console.log(board.jc.parse(txt));
     *
     * @example
     *  var p = board.create('point', [2, 0], {name: 'point'});
     *  var txt = 'B = point(1,3); X(point);';
     *  console.log(board.jc.parse(txt));
     *
     * @example
     *  var p = board.create('point', [2, 0], {name: 'A'});
     *  var q = board.create('point', [-2, 0], {name: 'X'});
     *  var txt = 'getCoord=function(p, f){ return f(p); }; getCoord(A, X);';
     *  console.log(board.jc.parse(txt));
     */ resolveType: function(vname, node) {
        var i, t, type = 'any'; // Possible values: 'function', 'any'
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(node)) {
            // node contains the parameters of a function call or function declaration
            for(i = 0; i < node.length; i++){
                t = this.resolveType(vname, node[i]);
                if (t !== 'any') {
                    type = t;
                    return type;
                }
            }
        }
        if (node.type === 'node_op' && node.value === 'op_execfun' && node.children[0].type === 'node_var' && node.children[0].value === vname) {
            return 'function';
        }
        if (node.type === 'node_op') {
            for(i = 0; i < node.children.length; i++){
                if (node.children[0].type === 'node_var' && node.children[0].value === vname && (node.value === 'op_add' || node.value === 'op_sub' || node.value === 'op_mul' || node.value === 'op_div' || node.value === 'op_mod' || node.value === 'op_exp' || node.value === 'op_neg')) {
                    return 'any';
                }
            }
            for(i = 0; i < node.children.length; i++){
                t = this.resolveType(vname, node.children[i]);
                if (t !== 'any') {
                    type = t;
                    return type;
                }
            }
        }
        return 'any';
    },
    /**
     * Resolves the lefthand side of an assignment operation
     * @param node
     * @returns {Object} An object with two properties. <strong>o</strong> which contains the object, and
     * a string <strong>what</strong> which contains the property name.
     */ getLHS: function(node) {
        var res;
        if (node.type === 'node_var') {
            res = {
                o: this.scope.locals,
                what: node.value
            };
        } else if (node.type === 'node_op' && node.value === 'op_property') {
            res = {
                o: this.execute(node.children[0]),
                what: node.children[1]
            };
        } else if (node.type === 'node_op' && node.value === 'op_extvalue') {
            res = {
                o: this.execute(node.children[0]),
                what: this.execute(node.children[1])
            };
        } else {
            throw new Error('Syntax error: Invalid left-hand side of assignment.');
        }
        return res;
    },
    getLHSCompiler: function(node, js) {
        var res;
        if (node.type === 'node_var') {
            res = node.value;
        } else if (node.type === 'node_op' && node.value === 'op_property') {
            res = [
                this.compile(node.children[0], js),
                "'" + node.children[1] + "'"
            ];
        } else if (node.type === 'node_op' && node.value === 'op_extvalue') {
            res = [
                this.compile(node.children[0], js),
                node.children[1].type === 'node_const' ? node.children[1].value : this.compile(node.children[1], js)
            ];
        } else {
            throw new Error('Syntax error: Invalid left-hand side of assignment.');
        }
        return res;
    },
    /**
     * Executes a parse subtree.
     * @param {Object} node
     * @returns {Number|String|Object|Boolean} Something
     * @private
     */ execute: function(node) {
        var ret, v, i, e, l, undef, list, ilist, parents = [], // exec fun
        fun, attr, sc;
        ret = 0;
        if (!node) {
            return ret;
        }
        this.line = node.line;
        this.col = node.col;
        switch(node.type){
            case 'node_op':
                switch(node.value){
                    case 'op_none':
                        if (node.children[0]) {
                            this.execute(node.children[0]);
                        }
                        if (node.children[1]) {
                            ret = this.execute(node.children[1]);
                        }
                        break;
                    case 'op_assign':
                        v = this.getLHS(node.children[0]);
                        this.lhs[this.scope.id] = v.what;
                        if (v.o.type && v.o.elementClass && v.o.methodMap && v.what === 'label') {
                            this._error('Left-hand side of assignment is read-only.');
                        }
                        ret = this.execute(node.children[1]);
                        if (v.o !== this.scope.locals || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(v.o) && typeof v.what === 'number') {
                            // it is either an array component being set or a property of an object.
                            this.setProp(v.o, v.what, ret);
                        } else {
                            // this is just a local variable inside JessieCode
                            this.letvar(v.what, ret);
                        }
                        this.lhs[this.scope.id] = 0;
                        break;
                    case 'op_if':
                        if (this.execute(node.children[0])) {
                            ret = this.execute(node.children[1]);
                        }
                        break;
                    case 'op_conditional':
                    // fall through
                    case 'op_if_else':
                        if (this.execute(node.children[0])) {
                            ret = this.execute(node.children[1]);
                        } else {
                            ret = this.execute(node.children[2]);
                        }
                        break;
                    case 'op_while':
                        while(this.execute(node.children[0])){
                            this.execute(node.children[1]);
                        }
                        break;
                    case 'op_do':
                        do {
                            this.execute(node.children[0]);
                        }while (this.execute(node.children[1]))
                        break;
                    case 'op_for':
                        for(this.execute(node.children[0]); this.execute(node.children[1]); this.execute(node.children[2])){
                            this.execute(node.children[3]);
                        }
                        break;
                    case 'op_proplst':
                        if (node.children[0]) {
                            this.execute(node.children[0]);
                        }
                        if (node.children[1]) {
                            this.execute(node.children[1]);
                        }
                        break;
                    case 'op_emptyobject':
                        ret = {};
                        break;
                    case 'op_proplst_val':
                        this.propstack.push({});
                        this.propscope++;
                        this.execute(node.children[0]);
                        ret = this.propstack[this.propscope];
                        this.propstack.pop();
                        this.propscope--;
                        break;
                    case 'op_prop':
                        // child 0: Identifier
                        // child 1: Value
                        this.propstack[this.propscope][node.children[0]] = this.execute(node.children[1]);
                        break;
                    case 'op_array':
                        ret = [];
                        l = node.children[0].length;
                        for(i = 0; i < l; i++){
                            ret.push(this.execute(node.children[0][i]));
                        }
                        break;
                    case 'op_extvalue':
                        ret = this.execute(node.children[0]);
                        i = this.execute(node.children[1]);
                        if (typeof i === 'number' && Math.abs(Math.round(i) - i) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps) {
                            ret = ret[i];
                        } else {
                            ret = undef;
                        }
                        break;
                    case 'op_return':
                        if (this.scope === 0) {
                            this._error('Unexpected return.');
                        } else {
                            return this.execute(node.children[0]);
                        }
                        break;
                    case 'op_map':
                        if (!node.children[1].isMath && node.children[1].type !== 'node_var') {
                            this._error('execute: In a map only function calls and mathematical expressions are allowed.');
                        }
                        /** @ignore */ fun = this.defineFunction(node);
                        fun.isMap = true;
                        ret = fun;
                        break;
                    case 'op_function':
                        // parse the parameter list
                        // after this, the parameters are in pstack
                        /** @ignore */ fun = this.defineFunction(node);
                        fun.isMap = false;
                        ret = fun;
                        break;
                    case 'op_execfun':
                        // node.children:
                        //   [0]: Name of the function
                        //   [1]: Parameter list as a parse subtree
                        //   [2]: Properties, only used in case of a create function
                        this.dpstack.push([]);
                        this.pscope++;
                        // parameter parsing is done below
                        list = node.children[1];
                        // parse the properties only if given
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(node.children[2])) {
                            if (node.children[3]) {
                                ilist = node.children[2];
                                attr = {};
                                for(i = 0; i < ilist.length; i++){
                                    attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(attr, this.execute(ilist[i]), true);
                                }
                            } else {
                                attr = this.execute(node.children[2]);
                            }
                        }
                        // look up the variables name in the variable table
                        node.children[0]._isFunctionName = true;
                        fun = this.execute(node.children[0]);
                        delete node.children[0]._isFunctionName;
                        // determine the scope the function wants to run in
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(fun) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(fun.sc)) {
                            sc = fun.sc;
                        } else {
                            sc = this;
                        }
                        if (!fun.creator && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(node.children[2])) {
                            this._error('Unexpected value. Only element creators are allowed to have a value after the function call.');
                        }
                        // interpret ALL the parameters
                        for(i = 0; i < list.length; i++){
                            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(fun.scope) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(fun.scope.argtypes) && fun.scope.argtypes[i] === 'function') {
                                // Type inspection
                                list[i]._isFunctionName = true;
                                parents[i] = this.execute(list[i]);
                                delete list[i]._isFunctionName;
                            } else {
                                parents[i] = this.execute(list[i]);
                            }
                            //parents[i] = Type.evalSlider(this.execute(list[i]));
                            this.dpstack[this.pscope].push({
                                line: node.children[1][i].line,
                                // SketchBin currently works only if the last column of the
                                // parent position is taken. This is due to how I patched JS/CC
                                // to count the lines and columns. So, ecol will do for now
                                col: node.children[1][i].ecol
                            });
                        }
                        // check for the function in the variable table
                        if (typeof fun === 'function' && !fun.creator) {
                            ret = fun.apply(sc, parents);
                        } else if (typeof fun === 'function' && !!fun.creator) {
                            e = this.line;
                            // creator methods are the only ones that take properties, hence this special case
                            try {
                                ret = fun(parents, attr);
                                ret.jcLineStart = e;
                                ret.jcLineEnd = node.eline;
                                for(i = e; i <= node.line; i++){
                                    this.lineToElement[i] = ret;
                                }
                                ret.debugParents = this.dpstack[this.pscope];
                            } catch (ex) {
                                this._error(ex.toString());
                            }
                        } else {
                            this._error('Function \'' + fun + '\' is undefined.');
                        }
                        // clear parameter stack
                        this.dpstack.pop();
                        this.pscope--;
                        break;
                    case 'op_property':
                        e = this.execute(node.children[0]);
                        v = node.children[1];
                        ret = this.resolveProperty(e, v, false);
                        // set the scope, in case this is a method the user wants to call
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(ret) && [
                            'number',
                            'string',
                            'boolean'
                        ].indexOf(typeof ret) < 0) {
                            ret.sc = e;
                        }
                        break;
                    case 'op_use':
                        this._warn('Use of the \'use\' operator is deprecated.');
                        this.use(node.children[0].toString());
                        break;
                    case 'op_delete':
                        this._warn('Use of the \'delete\' operator is deprecated. Please use the remove() function.');
                        v = this.getvar(node.children[0]);
                        ret = this.del(v);
                        break;
                    case 'op_eq':
                        // == is intentional
                        /*jslint eqeq:true*/ /* eslint-disable eqeqeq */ ret = this.execute(node.children[0]) == this.execute(node.children[1]);
                        break;
                    case 'op_neq':
                        // != is intentional
                        /*jslint eqeq:true*/ /* eslint-disable eqeqeq */ ret = this.execute(node.children[0]) != this.execute(node.children[1]);
                        break;
                    case 'op_approx':
                        ret = Math.abs(this.execute(node.children[0]) - this.execute(node.children[1])) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].eps;
                        break;
                    case 'op_gt':
                        ret = this.execute(node.children[0]) > this.execute(node.children[1]);
                        break;
                    case 'op_lt':
                        ret = this.execute(node.children[0]) < this.execute(node.children[1]);
                        break;
                    case 'op_geq':
                        ret = this.execute(node.children[0]) >= this.execute(node.children[1]);
                        break;
                    case 'op_leq':
                        ret = this.execute(node.children[0]) <= this.execute(node.children[1]);
                        break;
                    case 'op_or':
                        ret = this.execute(node.children[0]) || this.execute(node.children[1]);
                        break;
                    case 'op_and':
                        ret = this.execute(node.children[0]) && this.execute(node.children[1]);
                        break;
                    case 'op_not':
                        ret = !this.execute(node.children[0]);
                        break;
                    case 'op_add':
                        ret = this.add(this.execute(node.children[0]), this.execute(node.children[1]));
                        break;
                    case 'op_sub':
                        ret = this.sub(this.execute(node.children[0]), this.execute(node.children[1]));
                        break;
                    case 'op_div':
                        ret = this.div(this.execute(node.children[0]), this.execute(node.children[1]));
                        break;
                    case 'op_mod':
                        // use mathematical modulo, JavaScript implements the symmetric modulo.
                        ret = this.mod(this.execute(node.children[0]), this.execute(node.children[1]), true);
                        break;
                    case 'op_mul':
                        ret = this.mul(this.execute(node.children[0]), this.execute(node.children[1]));
                        break;
                    case 'op_exp':
                        ret = this.pow(this.execute(node.children[0]), this.execute(node.children[1]));
                        break;
                    case 'op_neg':
                        ret = this.neg(this.execute(node.children[0]));
                        break;
                }
                break;
            case 'node_var':
                // node._isFunctionName is set in execute: at op_execfun.
                ret = this.getvar(node.value, false, node._isFunctionName);
                break;
            case 'node_const':
                if (node.value === null) {
                    ret = null;
                } else {
                    ret = Number(node.value);
                }
                break;
            case 'node_const_bool':
                ret = node.value;
                break;
            case 'node_str':
                //ret = node.value.replace(/\\'/, "'").replace(/\\"/, '"').replace(/\\\\/, '\\');
                /*jslint regexp:true*/ ret = node.value.replace(/\\(.)/g, '$1'); // Remove backslash, important in JessieCode tags
                break;
        }
        return ret;
    },
    /**
     * Compiles a parse tree back to JessieCode.
     * @param {Object} node
     * @param {Boolean} [js=false] Compile either to JavaScript or back to JessieCode (required for the UI).
     * @returns Something
     * @private
     */ compile: function(node, js) {
        var e, i, list, scope, ret = '';
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(js)) {
            js = false;
        }
        if (!node) {
            return ret;
        }
        switch(node.type){
            case 'node_op':
                switch(node.value){
                    case 'op_none':
                        if (node.children[0]) {
                            ret = this.compile(node.children[0], js);
                        }
                        if (node.children[1]) {
                            ret += this.compile(node.children[1], js);
                        }
                        break;
                    case 'op_assign':
                        //e = this.compile(node.children[0], js);
                        if (js) {
                            e = this.getLHSCompiler(node.children[0], js);
                            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(e)) {
                                ret = '$jc$.setProp(' + e[0] + ', ' + e[1] + ', ' + this.compile(node.children[1], js) + ');\n';
                            } else {
                                if (this.isLocalVariable(e) !== this.scope) {
                                    this.scope.locals[e] = true;
                                }
                                ret = '$jc$.scopes[' + this.scope.id + '].locals[\'' + e + '\'] = ' + this.compile(node.children[1], js) + ';\n';
                            }
                        } else {
                            e = this.compile(node.children[0]);
                            ret = e + ' = ' + this.compile(node.children[1], js) + ';\n';
                        }
                        break;
                    case 'op_if':
                        ret = ' if (' + this.compile(node.children[0], js) + ') ' + this.compile(node.children[1], js);
                        break;
                    case 'op_if_else':
                        ret = ' if (' + this.compile(node.children[0], js) + ')' + this.compile(node.children[1], js);
                        ret += ' else ' + this.compile(node.children[2], js);
                        break;
                    case 'op_conditional':
                        ret = '((' + this.compile(node.children[0], js) + ')?(' + this.compile(node.children[1], js);
                        ret += '):(' + this.compile(node.children[2], js) + '))';
                        break;
                    case 'op_while':
                        ret = ' while (' + this.compile(node.children[0], js) + ') {\n' + this.compile(node.children[1], js) + '}\n';
                        break;
                    case 'op_do':
                        ret = ' do {\n' + this.compile(node.children[0], js) + '} while (' + this.compile(node.children[1], js) + ');\n';
                        break;
                    case 'op_for':
                        //ret = ' for (' + this.compile(node.children[0], js) + '; ' + this.compile(node.children[1], js) + '; ' + this.compile(node.children[2], js) + ') {\n' + this.compile(node.children[3], js) + '\n}\n';
                        ret = ' for (' + this.compile(node.children[0], js) + // Assignment ends with ";"
                        this.compile(node.children[1], js) + '; ' + // Logical test comes without ";"
                        this.compile(node.children[2], js).slice(0, -2) + // Counting comes with ";" which has to be removed
                        ') {\n' + this.compile(node.children[3], js) + '\n}\n';
                        break;
                    case 'op_proplst':
                        if (node.children[0]) {
                            ret = this.compile(node.children[0], js) + ', ';
                        }
                        ret += this.compile(node.children[1], js);
                        break;
                    case 'op_prop':
                        // child 0: Identifier
                        // child 1: Value
                        ret = node.children[0] + ': ' + this.compile(node.children[1], js);
                        break;
                    case 'op_emptyobject':
                        ret = js ? '{}' : '<< >>';
                        break;
                    case 'op_proplst_val':
                        ret = this.compile(node.children[0], js);
                        break;
                    case 'op_array':
                        list = [];
                        for(i = 0; i < node.children[0].length; i++){
                            list.push(this.compile(node.children[0][i], js));
                        }
                        ret = '[' + list.join(', ') + ']';
                        break;
                    case 'op_extvalue':
                        ret = this.compile(node.children[0], js) + '[' + this.compile(node.children[1], js) + ']';
                        break;
                    case 'op_return':
                        ret = ' return ' + this.compile(node.children[0], js) + ';\n';
                        break;
                    case 'op_map':
                        if (!node.children[1].isMath && node.children[1].type !== 'node_var') {
                            this._error('compile: In a map only function calls and mathematical expressions are allowed.');
                        }
                        list = node.children[0];
                        if (js) {
                            ret = ' $jc$.makeMap(function (' + list.join(', ') + ') { return ' + this.compile(node.children[1], js) + '; })';
                        } else {
                            ret = 'map (' + list.join(', ') + ') -> ' + this.compile(node.children[1], js);
                        }
                        break;
                    case 'op_function':
                        list = node.children[0];
                        scope = this.pushScope(list);
                        if (js) {
                            ret = this.functionCodeJS(node);
                        } else {
                            ret = ' function (' + list.join(', ') + ') ' + this.compile(node.children[1], js);
                        }
                        this.popScope();
                        break;
                    case 'op_execfunmath':
                        console.log('op_execfunmath: TODO');
                        ret = '-1';
                        break;
                    case 'op_execfun':
                        // parse the properties only if given
                        if (node.children[2]) {
                            list = [];
                            for(i = 0; i < node.children[2].length; i++){
                                list.push(this.compile(node.children[2][i], js));
                            }
                            if (js) {
                                e = '$jc$.mergeAttributes(' + list.join(', ') + ')';
                            } else {
                                e = list.join(', ');
                            }
                        }
                        node.children[0].withProps = !!node.children[2];
                        list = [];
                        for(i = 0; i < node.children[1].length; i++){
                            list.push(this.compile(node.children[1][i], js));
                        }
                        ret = this.compile(node.children[0], js) + '(' + list.join(', ') + (node.children[2] && js ? ', ' + e : '') + ')' + (node.children[2] && !js ? ' ' + e : '');
                        if (js) {
                            // Inserting a newline here allows simultaneously
                            // - procedural calls like Q.moveTo(...); and
                            // - function calls in expressions like log(x) + 1;
                            // Problem: procedural calls will not be ended by a semicolon.
                            ret += '\n';
                        }
                        // save us a function call when compiled to javascript
                        if (js && node.children[0].value === '$') {
                            ret = '$jc$.board.objects[' + this.compile(node.children[1][0], js) + ']';
                        }
                        break;
                    case 'op_property':
                        if (js && node.children[1] !== 'X' && node.children[1] !== 'Y') {
                            ret = '$jc$.resolveProperty(' + this.compile(node.children[0], js) + ', \'' + node.children[1] + '\', true)';
                        } else {
                            ret = this.compile(node.children[0], js) + '.' + node.children[1];
                        }
                        break;
                    case 'op_use':
                        this._warn('Use of the \'use\' operator is deprecated.');
                        if (js) {
                            ret = '$jc$.use(\'';
                        } else {
                            ret = 'use(\'';
                        }
                        ret += node.children[0].toString() + '\');';
                        break;
                    case 'op_delete':
                        this._warn('Use of the \'delete\' operator is deprecated. Please use the remove() function.');
                        if (js) {
                            ret = '$jc$.del(';
                        } else {
                            ret = 'remove(';
                        }
                        ret += this.compile(node.children[0], js) + ')';
                        break;
                    case 'op_eq':
                        ret = '(' + this.compile(node.children[0], js) + ' === ' + this.compile(node.children[1], js) + ')';
                        break;
                    case 'op_neq':
                        ret = '(' + this.compile(node.children[0], js) + ' !== ' + this.compile(node.children[1], js) + ')';
                        break;
                    case 'op_approx':
                        ret = '(' + this.compile(node.children[0], js) + ' ~= ' + this.compile(node.children[1], js) + ')';
                        break;
                    case 'op_gt':
                        if (js) {
                            ret = '$jc$.gt(' + this.compile(node.children[0], js) + ', ' + this.compile(node.children[1], js) + ')';
                        } else {
                            ret = '(' + this.compile(node.children[0], js) + ' > ' + this.compile(node.children[1], js) + ')';
                        }
                        break;
                    case 'op_lt':
                        if (js) {
                            ret = '$jc$.lt(' + this.compile(node.children[0], js) + ', ' + this.compile(node.children[1], js) + ')';
                        } else {
                            ret = '(' + this.compile(node.children[0], js) + ' < ' + this.compile(node.children[1], js) + ')';
                        }
                        break;
                    case 'op_geq':
                        if (js) {
                            ret = '$jc$.geq(' + this.compile(node.children[0], js) + ', ' + this.compile(node.children[1], js) + ')';
                        } else {
                            ret = '(' + this.compile(node.children[0], js) + ' >= ' + this.compile(node.children[1], js) + ')';
                        }
                        break;
                    case 'op_leq':
                        if (js) {
                            ret = '$jc$.leq(' + this.compile(node.children[0], js) + ', ' + this.compile(node.children[1], js) + ')';
                        } else {
                            ret = '(' + this.compile(node.children[0], js) + ' <= ' + this.compile(node.children[1], js) + ')';
                        }
                        break;
                    case 'op_or':
                        ret = '(' + this.compile(node.children[0], js) + ' || ' + this.compile(node.children[1], js) + ')';
                        break;
                    case 'op_and':
                        ret = '(' + this.compile(node.children[0], js) + ' && ' + this.compile(node.children[1], js) + ')';
                        break;
                    case 'op_not':
                        ret = '!(' + this.compile(node.children[0], js) + ')';
                        break;
                    case 'op_add':
                        if (js) {
                            ret = '$jc$.add(' + this.compile(node.children[0], js) + ', ' + this.compile(node.children[1], js) + ')';
                        } else {
                            ret = '(' + this.compile(node.children[0], js) + ' + ' + this.compile(node.children[1], js) + ')';
                        }
                        break;
                    case 'op_sub':
                        if (js) {
                            ret = '$jc$.sub(' + this.compile(node.children[0], js) + ', ' + this.compile(node.children[1], js) + ')';
                        } else {
                            ret = '(' + this.compile(node.children[0], js) + ' - ' + this.compile(node.children[1], js) + ')';
                        }
                        break;
                    case 'op_div':
                        if (js) {
                            ret = '$jc$.div(' + this.compile(node.children[0], js) + ', ' + this.compile(node.children[1], js) + ')';
                        } else {
                            ret = '(' + this.compile(node.children[0], js) + ' / ' + this.compile(node.children[1], js) + ')';
                        }
                        break;
                    case 'op_mod':
                        if (js) {
                            ret = '$jc$.mod(' + this.compile(node.children[0], js) + ', ' + this.compile(node.children[1], js) + ', true)';
                        } else {
                            ret = '(' + this.compile(node.children[0], js) + ' % ' + this.compile(node.children[1], js) + ')';
                        }
                        break;
                    case 'op_mul':
                        if (js) {
                            ret = '$jc$.mul(' + this.compile(node.children[0], js) + ', ' + this.compile(node.children[1], js) + ')';
                        } else {
                            ret = '(' + this.compile(node.children[0], js) + ' * ' + this.compile(node.children[1], js) + ')';
                        }
                        break;
                    case 'op_exp':
                        if (js) {
                            ret = '$jc$.pow(' + this.compile(node.children[0], js) + ', ' + this.compile(node.children[1], js) + ')';
                        } else {
                            ret = '(' + this.compile(node.children[0], js) + '^' + this.compile(node.children[1], js) + ')';
                        }
                        break;
                    case 'op_neg':
                        if (js) {
                            ret = '$jc$.neg(' + this.compile(node.children[0], js) + ')';
                        } else {
                            ret = '(-' + this.compile(node.children[0], js) + ')';
                        }
                        break;
                }
                break;
            case 'node_var':
                if (js) {
                    ret = this.getvarJS(node.value, false, node.withProps);
                } else {
                    ret = node.value;
                }
                break;
            case 'node_const':
                ret = node.value;
                break;
            case 'node_const_bool':
                ret = node.value;
                break;
            case 'node_str':
                ret = '\'' + node.value + '\'';
                break;
        }
        if (node.needsBrackets) {
            ret = '{\n' + ret + ' }\n';
        }
        if (node.needsAngleBrackets) {
            if (js) {
                ret = '{\n' + ret + ' }\n';
            } else {
                ret = '<< ' + ret + ' >>\n';
            }
        }
        return ret;
    },
    /**
     * This is used as the global getName() function.
     * @param {JXG.GeometryElement} obj
     * @param {Boolean} useId
     * @returns {String}
     */ getName: function(obj, useId) {
        var name = '';
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(obj) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(obj.getName)) {
            name = obj.getName();
            if ((!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(name) || name === '') && useId) {
                name = obj.id;
            }
        } else if (useId) {
            name = obj.id;
        }
        return name;
    },
    /**
     * This is used as the global X() function.
     * @param {JXG.Point|JXG.Text} e
     * @returns {Number}
     */ X: function(e) {
        return e.X();
    },
    /**
     * This is used as the global Y() function.
     * @param {JXG.Point|JXG.Text} e
     * @returns {Number}
     */ Y: function(e) {
        return e.Y();
    },
    /**
     * This is used as the global V() function.
     * @param {Glider|Slider} e
     * @returns {Number}
     */ V: function(e) {
        return e.Value();
    },
    /**
     * This is used as the global L() function.
     * @param {JXG.Line} e
     * @returns {Number}
     */ L: function(e) {
        return e.L();
    },
    /**
     * This is used as the global area() function.
     * @param {JXG.Circle|JXG.Polygon} obj
     * @returns {Number}
     */ area: function(obj) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(obj) || !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(obj.Area)) {
            this._error('Error: Can\'t calculate area.');
        }
        return obj.Area();
    },
    /**
     * This is used as the global perimeter() function.
     * @param {JXG.Circle|JXG.Polygon} obj
     * @returns {Number}
     */ perimeter: function(obj) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(obj) || !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(obj.Perimeter)) {
            this._error('Error: Can\'t calculate perimeter.');
        }
        return obj.Perimeter();
    },
    /**
     * This is used as the global dist() function.
     * @param {JXG.Point} p1
     * @param {JXG.Point} p2
     * @returns {Number}
     */ dist: function(p1, p2) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(p1) || !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(p1.Dist)) {
            this._error('Error: Can\'t calculate distance.');
        }
        return p1.Dist(p2);
    },
    /**
     * This is used as the global radius() function.
     * @param {JXG.Circle|Sector} obj
     * @returns {Number}
     */ radius: function(obj) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(obj) || !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(obj.Radius)) {
            this._error('Error: Can\'t calculate radius.');
        }
        return obj.Radius();
    },
    /**
     * This is used as the global slope() function.
     * @param {JXG.Line} obj
     * @returns {Number}
     */ slope: function(obj) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(obj) || !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(obj.Slope)) {
            this._error('Error: Can\'t calculate slope.');
        }
        return obj.Slope();
    },
    /**
     * + operator implementation
     * @param {Number|Array|JXG.Point} a
     * @param {Number|Array|JXG.Point} b
     * @returns {Number|Array}
     */ add: function(a, b) {
        var i, len, res;
        a = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evalSlider(a);
        b = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evalSlider(b);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(a) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(b)) {
            res = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].add(a, b);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(a) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(b)) {
            len = Math.min(a.length, b.length);
            res = [];
            for(i = 0; i < len; i++){
                res[i] = a[i] + b[i];
            }
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(a) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(b)) {
            res = a + b;
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(a) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(b)) {
            res = a.toString() + b.toString();
        } else {
            this._error('Operation + not defined on operands ' + typeof a + ' and ' + typeof b);
        }
        return res;
    },
    /**
     * - operator implementation
     * @param {Number|Array|JXG.Point} a
     * @param {Number|Array|JXG.Point} b
     * @returns {Number|Array}
     */ sub: function(a, b) {
        var i, len, res;
        a = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evalSlider(a);
        b = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evalSlider(b);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(a) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(b)) {
            res = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].sub(a, b);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(a) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(b)) {
            len = Math.min(a.length, b.length);
            res = [];
            for(i = 0; i < len; i++){
                res[i] = a[i] - b[i];
            }
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(a) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(b)) {
            res = a - b;
        } else {
            this._error('Operation - not defined on operands ' + typeof a + ' and ' + typeof b);
        }
        return res;
    },
    /**
     * unary - operator implementation
     * @param {Number|Array|JXG.Point} a
     * @returns {Number|Array}
     */ neg: function(a) {
        var i, len, res;
        a = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evalSlider(a);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(a)) {
            res = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].negative(a);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(a)) {
            len = a.length;
            res = [];
            for(i = 0; i < len; i++){
                res[i] = -a[i];
            }
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(a)) {
            res = -a;
        } else {
            this._error('Unary operation - not defined on operand ' + typeof a);
        }
        return res;
    },
    /**
     * Multiplication of vectors and numbers
     * @param {Number|Array} a
     * @param {Number|Array} b
     * @returns {Number|Array} (Inner) product of the given input values.
     */ mul: function(a, b) {
        var i, len, res;
        a = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evalSlider(a);
        b = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evalSlider(b);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(a) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(b)) {
            // swap b and a
            i = a;
            a = b;
            b = a;
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(a) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(b)) {
            res = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].mul(a, b);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(a) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(b)) {
            len = Math.min(a.length, b.length);
            res = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].innerProduct(a, b, len);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(a) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(b)) {
            len = b.length;
            res = [];
            for(i = 0; i < len; i++){
                res[i] = a * b[i];
            }
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(a) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(b)) {
            res = a * b;
        } else {
            this._error('Operation * not defined on operands ' + typeof a + ' and ' + typeof b);
        }
        return res;
    },
    /**
     * Implementation of the / operator.
     * @param {Number|Array} a
     * @param {Number} b
     * @returns {Number|Array}
     */ div: function(a, b) {
        var i, len, res;
        a = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evalSlider(a);
        b = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evalSlider(b);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(a) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(b)) {
            res = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div(a, b);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(a) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(b)) {
            len = a.length;
            res = [];
            for(i = 0; i < len; i++){
                res[i] = a[i] / b;
            }
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(a) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(b)) {
            res = a / b;
        } else {
            this._error('Operation * not defined on operands ' + typeof a + ' and ' + typeof b);
        }
        return res;
    },
    /**
     * Implementation of the % operator.
     * @param {Number|Array} a
     * @param {Number} b
     * @returns {Number|Array}
     */ mod: function(a, b) {
        var i, len, res;
        a = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evalSlider(a);
        b = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evalSlider(b);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(a) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(b)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fmod(a, b);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(a) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(b)) {
            len = a.length;
            res = [];
            for(i = 0; i < len; i++){
                res[i] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].mod(a[i], b, true);
            }
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(a) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(b)) {
            res = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].mod(a, b, true);
        } else {
            this._error('Operation * not defined on operands ' + typeof a + ' and ' + typeof b);
        }
        return res;
    },
    /**
     * Pow function wrapper to allow direct usage of sliders.
     * @param {Number|Slider} a
     * @param {Number|Slider} b
     * @returns {Number}
     */ pow: function(a, b) {
        a = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evalSlider(a);
        b = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evalSlider(b);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(a) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(b)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pow(a, b);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pow(a, b);
    },
    lt: function(a, b) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(a) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(b)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lt(a, b);
        }
        return a < b;
    },
    leq: function(a, b) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(a) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(b)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].leq(a, b);
        }
        return a <= b;
    },
    gt: function(a, b) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(a) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(b)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].gt(a, b);
        }
        return a > b;
    },
    geq: function(a, b) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(a) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInterval(b)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].geq(a, b);
        }
        return a >= b;
    },
    randint: function(min, max, step) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(step)) {
            step = 1;
        }
        return Math.round(Math.random() * (max - min) / step) * step + min;
    },
    DDD: function(f) {
        console.log('Dummy derivative function. This should never appear!');
    },
    /**
     * Implementation of the ?: operator
     * @param {Boolean} cond Condition
     * @param {*} v1
     * @param {*} v2
     * @returns {*} Either v1 or v2.
     */ ifthen: function(cond, v1, v2) {
        if (cond) {
            return v1;
        }
        return v2;
    },
    /**
     * Implementation of the delete() builtin function
     * @param {JXG.GeometryElement} element
     */ del: function(element) {
        if (typeof element === 'object' && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(element.type) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(element.elementClass)) {
            this.board.removeObject(element);
        }
    },
    /**
     * Implementation of the eval() builtin function. Calls JXG.evaluate().
     * @param {String|Number|Function} v
     */ eval: function(v) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].evaluate(v);
    },
    /**
     * Implementation of the use() builtin function
     * @param {String} board
     */ use: function(board) {
        var b, ref, found = false;
        if (typeof board === 'string') {
            // search all the boards for the one with the appropriate container div
            for(b in __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].boards){
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].boards.hasOwnProperty(b) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].boards[b].container === board) {
                    ref = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].boards[b];
                    found = true;
                    break;
                }
            }
        } else {
            ref = board;
            found = true;
        }
        if (found) {
            this.board = ref;
            this.builtIn.$board = ref;
            this.builtIn.$board.src = '$jc$.board';
        } else {
            this._error('Board \'' + board + '\' not found!');
        }
    },
    /**
     * Find the first symbol to the given value from the given scope upwards.
     * @param v Value
     * @param {Number} [scope=-1] The scope, default is to start with current scope (-1).
     * @returns {Array} An array containing the symbol and the scope if a symbol could be found,
     * an empty array otherwise;
     */ findSymbol: function(v, scope) {
        var i, s;
        scope = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].def(scope, -1);
        if (scope === -1) {
            s = this.scope;
        } else {
            s = this.scopes[scope];
        }
        while(s !== null){
            for(i in s.locals){
                if (s.locals.hasOwnProperty(i) && s.locals[i] === v) {
                    return [
                        i,
                        s
                    ];
                }
            }
            s = s.previous;
        }
        return [];
    },
    /**
     * Import modules into a JessieCode script.
     * @param {String} module
     */ importModule: function(module) {
        return priv.modules[module.toLowerCase()];
    },
    /**
     * Defines built in methods and constants.
     * @returns {Object} BuiltIn control object
     */ defineBuiltIn: function() {
        var that = this, builtIn = {
            PI: Math.PI,
            EULER: Math.E,
            D: that.DDD,
            X: that.X,
            Y: that.Y,
            V: that.V,
            Value: that.V,
            L: that.L,
            Length: that.L,
            acosh: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].acosh,
            acot: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].acot,
            asinh: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].asinh,
            binomial: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].binomial,
            cbrt: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].cbrt,
            cosh: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].cosh,
            cot: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].cot,
            deg: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].trueAngle,
            A: that.area,
            area: that.area,
            Area: that.area,
            perimeter: that.perimeter,
            Perimeter: that.perimeter,
            dist: that.dist,
            Dist: that.dist,
            R: that.radius,
            radius: that.radius,
            Radius: that.radius,
            erf: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].erf,
            erfc: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].erfc,
            erfi: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].erfi,
            factorial: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].factorial,
            gcd: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].gcd,
            lb: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].log2,
            lcm: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lcm,
            ld: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].log2,
            lg: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].log10,
            ln: Math.log,
            log: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].log,
            log10: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].log10,
            log2: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].log2,
            ndtr: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].ndtr,
            ndtri: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].ndtri,
            nthroot: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].nthroot,
            pow: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].pow,
            rad: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].rad,
            ratpow: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].ratpow,
            trunc: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].trunc,
            sinh: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].sinh,
            slope: that.slope,
            Slope: that.slope,
            randint: that.randint,
            IfThen: that.ifthen,
            'import': that.importModule,
            'eval': that.eval,
            'use': that.use,
            'remove': that.del,
            '$': that.getElementById,
            '$value': function(e) {
                return that.getElementById(e).Value();
            },
            getName: that.getName,
            name: that.getName,
            '$board': that.board,
            '$log': that.log
        };
        // special scopes for factorial, deg, and rad
        builtIn.rad.sc = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
        builtIn.deg.sc = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
        builtIn.factorial.sc = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
        // set the javascript equivalent for the builtIns
        // some of the anonymous functions should be replaced by global methods later on
        // EULER and PI don't get a source attribute - they will be lost anyways and apparently
        // some browser will throw an exception when a property is assigned to a primitive value.
        builtIn.X.src = '$jc$.X';
        builtIn.Y.src = '$jc$.Y';
        builtIn.V.src = '$jc$.V';
        builtIn.Value.src = '$jc$.V';
        builtIn.L.src = '$jc$.L';
        builtIn.Length.src = '$jc$.L';
        builtIn.acosh.src = 'JXG.Math.acosh';
        builtIn.acot.src = 'JXG.Math.acot';
        builtIn.asinh.src = 'JXG.Math.asinh';
        builtIn.binomial.src = 'JXG.Math.binomial';
        builtIn.cbrt.src = 'JXG.Math.cbrt';
        builtIn.cot.src = 'JXG.Math.cot';
        builtIn.cosh.src = 'JXG.Math.cosh';
        builtIn.deg.src = 'JXG.Math.Geometry.trueAngle';
        builtIn.erf.src = 'JXG.Math.erf';
        builtIn.erfc.src = 'JXG.Math.erfc';
        builtIn.erfi.src = 'JXG.Math.erfi';
        builtIn.A.src = '$jc$.area';
        builtIn.area.src = '$jc$.area';
        builtIn.Area.src = '$jc$.area';
        builtIn.perimeter.src = '$jc$.perimeter';
        builtIn.Perimeter.src = '$jc$.perimeter';
        builtIn.dist.src = '$jc$.dist';
        builtIn.Dist.src = '$jc$.dist';
        builtIn.R.src = '$jc$.radius';
        builtIn.radius.src = '$jc$.radius';
        builtIn.Radius.src = '$jc$.radius';
        builtIn.factorial.src = 'JXG.Math.factorial';
        builtIn.gcd.src = 'JXG.Math.gcd';
        builtIn.lb.src = 'JXG.Math.log2';
        builtIn.lcm.src = 'JXG.Math.lcm';
        builtIn.ld.src = 'JXG.Math.log2';
        builtIn.lg.src = 'JXG.Math.log10';
        builtIn.ln.src = 'Math.log';
        builtIn.log.src = 'JXG.Math.log';
        builtIn.log10.src = 'JXG.Math.log10';
        builtIn.log2.src = 'JXG.Math.log2';
        builtIn.ndtr.src = 'JXG.Math.ndtr';
        builtIn.ndtri.src = 'JXG.Math.ndtri';
        builtIn.nthroot.src = 'JXG.Math.nthroot';
        builtIn.pow.src = 'JXG.Math.pow';
        builtIn.rad.src = 'JXG.Math.Geometry.rad';
        builtIn.ratpow.src = 'JXG.Math.ratpow';
        builtIn.trunc.src = 'JXG.trunc';
        builtIn.sinh.src = 'JXG.Math.sinh';
        builtIn.slope.src = '$jc$.slope';
        builtIn.Slope.src = '$jc$.slope';
        builtIn.randint.src = '$jc$.randint';
        builtIn['import'].src = '$jc$.importModule';
        builtIn.eval.src = '$jc$.eval';
        builtIn.use.src = '$jc$.use';
        builtIn.remove.src = '$jc$.del';
        builtIn.IfThen.src = '$jc$.ifthen';
        // usually unused, see node_op > op_execfun
        builtIn.$.src = '(function (n) { return $jc$.board.select(n); })';
        builtIn.$value.src = '(function (n) { return $jc$.board.select(n).Value(); })';
        builtIn.getName.src = '$jc$.getName';
        builtIn.name.src = '$jc$.getName';
        if (builtIn.$board) {
            builtIn.$board.src = '$jc$.board';
        }
        builtIn.$log.src = '$jc$.log';
        builtIn = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].merge(builtIn, that._addedBuiltIn);
        return builtIn;
    },
    _addedBuiltIn: {},
    addBuiltIn: function(name, func) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.builtIn)) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this.builtIn[name])) {
                return;
            }
            this.builtIn[name] = func;
            this.builtIn[name].src = '$jc$.' + name;
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(this._addedBuiltIn[name])) {
            return;
        }
        this._addedBuiltIn[name] = func;
        this._addedBuiltIn[name].src = '$jc$.' + name;
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].JessieCode.prototype[name] = func;
    },
    /**
     * Returns information about the possible functions and constants.
     * @returns {Object}
     */ getPossibleOperands: function() {
        var FORBIDDEN = [
            'E'
        ], jessiecode = this.builtIn || this.defineBuiltIn(), math = Math, jc, ma, merge, i, j, p, len, e, funcs, funcsJC, consts, operands, sort, pack;
        sort = function(a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        };
        pack = function(name, origin) {
            var that = null;
            if (origin === 'jc') that = jessiecode[name];
            else if (origin === 'Math') that = math[name];
            else return;
            if (FORBIDDEN.indexOf(name) >= 0) {
                return;
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isFunction(that)) {
                return {
                    name: name,
                    type: 'function',
                    numParams: that.length,
                    origin: origin
                };
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(that)) {
                return {
                    name: name,
                    type: 'constant',
                    value: that,
                    origin: origin
                };
            } else if (name.startsWith('$')) {
            // do nothing
            } else if (that !== undefined) {
                console.error('undefined type', that);
            }
        };
        jc = Object.getOwnPropertyNames(jessiecode).sort(sort);
        ma = Object.getOwnPropertyNames(math).sort(sort);
        merge = [];
        i = 0;
        j = 0;
        while(i < jc.length || j < ma.length){
            if (jc[i] === ma[j]) {
                p = pack(ma[j], 'Math');
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(p)) merge.push(p);
                i++;
                j++;
            } else if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(ma[j]) || jc[i].toLowerCase().localeCompare(ma[j].toLowerCase()) < 0) {
                p = pack(jc[i], 'jc');
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(p)) merge.push(p);
                i++;
            } else {
                p = pack(ma[j], 'Math');
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(p)) merge.push(p);
                j++;
            }
        }
        funcs = [];
        funcsJC = [];
        consts = [];
        operands = {};
        len = merge.length;
        for(i = 0; i < len; i++){
            e = merge[i];
            switch(e.type){
                case 'function':
                    funcs.push(e.name);
                    if (e.origin === 'jc') funcsJC.push(e.name);
                    break;
                case 'constant':
                    consts.push(e.name);
                    break;
            }
            operands[e.name] = e;
        }
        return {
            all: operands,
            list: merge,
            functions: funcs,
            functions_jessiecode: funcsJC,
            constants: consts
        };
    },
    /**
     * Output a debugging message. Uses debug console, if available. Otherwise an HTML element with the
     * id "debug" and an innerHTML property is used.
     * @param {String} log
     * @private
     */ _debug: function(log) {
        if (typeof console === 'object') {
            console.log(log);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isBrowser && document && document.getElementById('debug') !== null) {
            document.getElementById('debug').innerHTML += log + '<br />';
        }
    },
    /**
     * Throws an exception with the given error message.
     * @param {String} msg Error message
     */ _error: function(msg) {
        var e = new Error('Error(' + this.line + '): ' + msg);
        e.line = this.line;
        throw e;
    },
    /**
     * Output a warning message using {@link JXG#debug} and precedes the message with "Warning: ".
     * @param {String} msg
     */ _warn: function(msg) {
        if (typeof console === 'object') {
            console.log('Warning(' + this.line + '): ' + msg);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isBrowser && document && document.getElementById(this.warnLog) !== null) {
            document.getElementById(this.warnLog).innerHTML += 'Warning(' + this.line + '): ' + msg + '<br />';
        }
    },
    _log: function(msg) {
        if ("undefined" !== 'object' && typeof self === 'object' && self.postMessage) {
            self.postMessage({
                type: 'log',
                msg: 'Log: ' + msg.toString()
            });
        } else {
            console.log('Log: ', arguments);
        }
    }
});
/* parser generated by jison 0.4.18 */ /*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/ /**
 * @class
 * @ignore
 */ var parser = function() {
    var o = function(k, v, o, l) {
        for(o = o || {}, l = k.length; l--; o[k[l]] = v);
        return o;
    }, $V0 = [
        2,
        14
    ], $V1 = [
        1,
        13
    ], $V2 = [
        1,
        37
    ], $V3 = [
        1,
        14
    ], $V4 = [
        1,
        15
    ], $V5 = [
        1,
        21
    ], $V6 = [
        1,
        16
    ], $V7 = [
        1,
        17
    ], $V8 = [
        1,
        33
    ], $V9 = [
        1,
        18
    ], $Va = [
        1,
        19
    ], $Vb = [
        1,
        12
    ], $Vc = [
        1,
        59
    ], $Vd = [
        1,
        60
    ], $Ve = [
        1,
        58
    ], $Vf = [
        1,
        46
    ], $Vg = [
        1,
        48
    ], $Vh = [
        1,
        49
    ], $Vi = [
        1,
        50
    ], $Vj = [
        1,
        51
    ], $Vk = [
        1,
        52
    ], $Vl = [
        1,
        53
    ], $Vm = [
        1,
        54
    ], $Vn = [
        1,
        45
    ], $Vo = [
        1,
        38
    ], $Vp = [
        1,
        39
    ], $Vq = [
        5,
        7,
        8,
        14,
        15,
        16,
        17,
        19,
        20,
        21,
        23,
        26,
        27,
        50,
        51,
        58,
        65,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        82,
        91,
        93
    ], $Vr = [
        5,
        7,
        8,
        12,
        14,
        15,
        16,
        17,
        19,
        20,
        21,
        23,
        26,
        27,
        50,
        51,
        58,
        65,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        82,
        91,
        93
    ], $Vs = [
        8,
        10,
        16,
        32,
        34,
        35,
        37,
        39,
        41,
        42,
        43,
        45,
        46,
        47,
        48,
        50,
        51,
        53,
        54,
        55,
        57,
        64,
        65,
        66,
        83,
        86
    ], $Vt = [
        2,
        48
    ], $Vu = [
        1,
        72
    ], $Vv = [
        10,
        16,
        32,
        34,
        35,
        37,
        39,
        41,
        42,
        43,
        45,
        46,
        47,
        48,
        50,
        51,
        53,
        54,
        55,
        57,
        66,
        83,
        86
    ], $Vw = [
        1,
        78
    ], $Vx = [
        8,
        10,
        16,
        32,
        34,
        35,
        37,
        41,
        42,
        43,
        45,
        46,
        47,
        48,
        50,
        51,
        53,
        54,
        55,
        57,
        64,
        65,
        66,
        83,
        86
    ], $Vy = [
        1,
        82
    ], $Vz = [
        8,
        10,
        16,
        32,
        34,
        35,
        37,
        39,
        45,
        46,
        47,
        48,
        50,
        51,
        53,
        54,
        55,
        57,
        64,
        65,
        66,
        83,
        86
    ], $VA = [
        1,
        83
    ], $VB = [
        1,
        84
    ], $VC = [
        1,
        85
    ], $VD = [
        8,
        10,
        16,
        32,
        34,
        35,
        37,
        39,
        41,
        42,
        43,
        50,
        51,
        53,
        54,
        55,
        57,
        64,
        65,
        66,
        83,
        86
    ], $VE = [
        1,
        89
    ], $VF = [
        1,
        90
    ], $VG = [
        1,
        91
    ], $VH = [
        1,
        92
    ], $VI = [
        1,
        97
    ], $VJ = [
        8,
        10,
        16,
        32,
        34,
        35,
        37,
        39,
        41,
        42,
        43,
        45,
        46,
        47,
        48,
        53,
        54,
        55,
        57,
        64,
        65,
        66,
        83,
        86
    ], $VK = [
        1,
        103
    ], $VL = [
        1,
        104
    ], $VM = [
        8,
        10,
        16,
        32,
        34,
        35,
        37,
        39,
        41,
        42,
        43,
        45,
        46,
        47,
        48,
        50,
        51,
        57,
        64,
        65,
        66,
        83,
        86
    ], $VN = [
        1,
        105
    ], $VO = [
        1,
        106
    ], $VP = [
        1,
        107
    ], $VQ = [
        1,
        126
    ], $VR = [
        1,
        139
    ], $VS = [
        83,
        86
    ], $VT = [
        1,
        150
    ], $VU = [
        10,
        66,
        86
    ], $VV = [
        8,
        10,
        16,
        20,
        32,
        34,
        35,
        37,
        39,
        41,
        42,
        43,
        45,
        46,
        47,
        48,
        50,
        51,
        53,
        54,
        55,
        57,
        64,
        65,
        66,
        82,
        83,
        86
    ], $VW = [
        1,
        167
    ], $VX = [
        10,
        86
    ];
    /**
 * @class
 * @ignore
 */ var parser1 = {
        trace: function trace() {},
        yy: {},
        symbols_: {
            "error": 2,
            "Program": 3,
            "StatementList": 4,
            "EOF": 5,
            "IfStatement": 6,
            "IF": 7,
            "(": 8,
            "Expression": 9,
            ")": 10,
            "Statement": 11,
            "ELSE": 12,
            "LoopStatement": 13,
            "WHILE": 14,
            "FOR": 15,
            ";": 16,
            "DO": 17,
            "UnaryStatement": 18,
            "USE": 19,
            "IDENTIFIER": 20,
            "DELETE": 21,
            "ReturnStatement": 22,
            "RETURN": 23,
            "EmptyStatement": 24,
            "StatementBlock": 25,
            "{": 26,
            "}": 27,
            "ExpressionStatement": 28,
            "AssignmentExpression": 29,
            "ConditionalExpression": 30,
            "LeftHandSideExpression": 31,
            "=": 32,
            "LogicalORExpression": 33,
            "?": 34,
            ":": 35,
            "LogicalANDExpression": 36,
            "||": 37,
            "EqualityExpression": 38,
            "&&": 39,
            "RelationalExpression": 40,
            "==": 41,
            "!=": 42,
            "~=": 43,
            "AdditiveExpression": 44,
            "<": 45,
            ">": 46,
            "<=": 47,
            ">=": 48,
            "MultiplicativeExpression": 49,
            "+": 50,
            "-": 51,
            "UnaryExpression": 52,
            "*": 53,
            "/": 54,
            "%": 55,
            "ExponentExpression": 56,
            "^": 57,
            "!": 58,
            "MemberExpression": 59,
            "CallExpression": 60,
            "PrimaryExpression": 61,
            "FunctionExpression": 62,
            "MapExpression": 63,
            ".": 64,
            "[": 65,
            "]": 66,
            "BasicLiteral": 67,
            "ObjectLiteral": 68,
            "ArrayLiteral": 69,
            "NullLiteral": 70,
            "BooleanLiteral": 71,
            "StringLiteral": 72,
            "NumberLiteral": 73,
            "NULL": 74,
            "TRUE": 75,
            "FALSE": 76,
            "STRING": 77,
            "NUMBER": 78,
            "NAN": 79,
            "INFINITY": 80,
            "ElementList": 81,
            "<<": 82,
            ">>": 83,
            "PropertyList": 84,
            "Property": 85,
            ",": 86,
            "PropertyName": 87,
            "Arguments": 88,
            "AttributeList": 89,
            "Attribute": 90,
            "FUNCTION": 91,
            "ParameterDefinitionList": 92,
            "MAP": 93,
            "->": 94,
            "$accept": 0,
            "$end": 1
        },
        terminals_: {
            2: "error",
            5: "EOF",
            7: "IF",
            8: "(",
            10: ")",
            12: "ELSE",
            14: "WHILE",
            15: "FOR",
            16: ";",
            17: "DO",
            19: "USE",
            20: "IDENTIFIER",
            21: "DELETE",
            23: "RETURN",
            26: "{",
            27: "}",
            32: "=",
            34: "?",
            35: ":",
            37: "||",
            39: "&&",
            41: "==",
            42: "!=",
            43: "~=",
            45: "<",
            46: ">",
            47: "<=",
            48: ">=",
            50: "+",
            51: "-",
            53: "*",
            54: "/",
            55: "%",
            57: "^",
            58: "!",
            64: ".",
            65: "[",
            66: "]",
            74: "NULL",
            75: "TRUE",
            76: "FALSE",
            77: "STRING",
            78: "NUMBER",
            79: "NAN",
            80: "INFINITY",
            82: "<<",
            83: ">>",
            86: ",",
            91: "FUNCTION",
            93: "MAP",
            94: "->"
        },
        productions_: [
            0,
            [
                3,
                2
            ],
            [
                6,
                5
            ],
            [
                6,
                7
            ],
            [
                13,
                5
            ],
            [
                13,
                9
            ],
            [
                13,
                7
            ],
            [
                18,
                2
            ],
            [
                18,
                2
            ],
            [
                22,
                2
            ],
            [
                22,
                3
            ],
            [
                24,
                1
            ],
            [
                25,
                3
            ],
            [
                4,
                2
            ],
            [
                4,
                0
            ],
            [
                11,
                1
            ],
            [
                11,
                1
            ],
            [
                11,
                1
            ],
            [
                11,
                1
            ],
            [
                11,
                1
            ],
            [
                11,
                1
            ],
            [
                11,
                1
            ],
            [
                28,
                2
            ],
            [
                9,
                1
            ],
            [
                29,
                1
            ],
            [
                29,
                3
            ],
            [
                30,
                1
            ],
            [
                30,
                5
            ],
            [
                33,
                1
            ],
            [
                33,
                3
            ],
            [
                36,
                1
            ],
            [
                36,
                3
            ],
            [
                38,
                1
            ],
            [
                38,
                3
            ],
            [
                38,
                3
            ],
            [
                38,
                3
            ],
            [
                40,
                1
            ],
            [
                40,
                3
            ],
            [
                40,
                3
            ],
            [
                40,
                3
            ],
            [
                40,
                3
            ],
            [
                44,
                1
            ],
            [
                44,
                3
            ],
            [
                44,
                3
            ],
            [
                49,
                1
            ],
            [
                49,
                3
            ],
            [
                49,
                3
            ],
            [
                49,
                3
            ],
            [
                56,
                1
            ],
            [
                56,
                3
            ],
            [
                52,
                1
            ],
            [
                52,
                2
            ],
            [
                52,
                2
            ],
            [
                52,
                2
            ],
            [
                31,
                1
            ],
            [
                31,
                1
            ],
            [
                59,
                1
            ],
            [
                59,
                1
            ],
            [
                59,
                1
            ],
            [
                59,
                3
            ],
            [
                59,
                4
            ],
            [
                61,
                1
            ],
            [
                61,
                1
            ],
            [
                61,
                1
            ],
            [
                61,
                1
            ],
            [
                61,
                3
            ],
            [
                67,
                1
            ],
            [
                67,
                1
            ],
            [
                67,
                1
            ],
            [
                67,
                1
            ],
            [
                70,
                1
            ],
            [
                71,
                1
            ],
            [
                71,
                1
            ],
            [
                72,
                1
            ],
            [
                73,
                1
            ],
            [
                73,
                1
            ],
            [
                73,
                1
            ],
            [
                69,
                2
            ],
            [
                69,
                3
            ],
            [
                68,
                2
            ],
            [
                68,
                3
            ],
            [
                84,
                1
            ],
            [
                84,
                3
            ],
            [
                85,
                3
            ],
            [
                87,
                1
            ],
            [
                87,
                1
            ],
            [
                87,
                1
            ],
            [
                60,
                2
            ],
            [
                60,
                3
            ],
            [
                60,
                2
            ],
            [
                60,
                4
            ],
            [
                60,
                3
            ],
            [
                88,
                2
            ],
            [
                88,
                3
            ],
            [
                89,
                1
            ],
            [
                89,
                3
            ],
            [
                90,
                1
            ],
            [
                90,
                1
            ],
            [
                81,
                1
            ],
            [
                81,
                3
            ],
            [
                62,
                4
            ],
            [
                62,
                5
            ],
            [
                63,
                5
            ],
            [
                63,
                6
            ],
            [
                92,
                1
            ],
            [
                92,
                3
            ]
        ],
        /**
 * @class
 * @ignore
 */ performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */ , $$ /* vstack */ , _$ /* lstack */ ) {
            /* this == yyval */ var $0 = $$.length - 1;
            switch(yystate){
                case 1:
                    return $$[$0 - 1];
                    //TURBOPACK unreachable
                    ;
                case 2:
                    this.$ = AST.createNode(lc(_$[$0 - 4]), 'node_op', 'op_if', $$[$0 - 2], $$[$0]);
                    break;
                case 3:
                    this.$ = AST.createNode(lc(_$[$0 - 6]), 'node_op', 'op_if_else', $$[$0 - 4], $$[$0 - 2], $$[$0]);
                    break;
                case 4:
                    this.$ = AST.createNode(lc(_$[$0 - 4]), 'node_op', 'op_while', $$[$0 - 2], $$[$0]);
                    break;
                case 5:
                    this.$ = AST.createNode(lc(_$[$0 - 8]), 'node_op', 'op_for', $$[$0 - 6], $$[$0 - 4], $$[$0 - 2], $$[$0]);
                    break;
                case 6:
                    this.$ = AST.createNode(lc(_$[$0 - 6]), 'node_op', 'op_do', $$[$0 - 5], $$[$0 - 2]);
                    break;
                case 7:
                    this.$ = AST.createNode(lc(_$[$0 - 1]), 'node_op', 'op_use', $$[$0]);
                    break;
                case 8:
                    this.$ = AST.createNode(lc(_$[$0 - 1]), 'node_op', 'op_delete', $$[$0]);
                    break;
                case 9:
                    this.$ = AST.createNode(lc(_$[$0 - 1]), 'node_op', 'op_return', undefined);
                    break;
                case 10:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_return', $$[$0 - 1]);
                    break;
                case 11:
                case 14:
                    this.$ = AST.createNode(lc(_$[$0]), 'node_op', 'op_none');
                    break;
                case 12:
                    this.$ = $$[$0 - 1];
                    this.$.needsBrackets = true;
                    break;
                case 13:
                    this.$ = AST.createNode(lc(_$[$0 - 1]), 'node_op', 'op_none', $$[$0 - 1], $$[$0]);
                    break;
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 23:
                case 24:
                case 26:
                case 28:
                case 30:
                case 32:
                case 36:
                case 41:
                case 44:
                case 48:
                case 50:
                case 52:
                case 54:
                case 55:
                case 56:
                case 58:
                case 62:
                case 81:
                case 84:
                case 85:
                case 86:
                    this.$ = $$[$0];
                    break;
                case 22:
                case 65:
                case 93:
                    this.$ = $$[$0 - 1];
                    break;
                case 25:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_assign', $$[$0 - 2], $$[$0]);
                    this.$.isMath = false;
                    break;
                case 27:
                    this.$ = AST.createNode(lc(_$[$0 - 4]), 'node_op', 'op_conditional', $$[$0 - 4], $$[$0 - 2], $$[$0]);
                    this.$.isMath = false;
                    break;
                case 29:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_or', $$[$0 - 2], $$[$0]);
                    this.$.isMath = false;
                    break;
                case 31:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_and', $$[$0 - 2], $$[$0]);
                    this.$.isMath = false;
                    break;
                case 33:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_eq', $$[$0 - 2], $$[$0]);
                    this.$.isMath = false;
                    break;
                case 34:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_neq', $$[$0 - 2], $$[$0]);
                    this.$.isMath = false;
                    break;
                case 35:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_approx', $$[$0 - 2], $$[$0]);
                    this.$.isMath = false;
                    break;
                case 37:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_lt', $$[$0 - 2], $$[$0]);
                    this.$.isMath = false;
                    break;
                case 38:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_gt', $$[$0 - 2], $$[$0]);
                    this.$.isMath = false;
                    break;
                case 39:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_leq', $$[$0 - 2], $$[$0]);
                    this.$.isMath = false;
                    break;
                case 40:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_geq', $$[$0 - 2], $$[$0]);
                    this.$.isMath = false;
                    break;
                case 42:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_add', $$[$0 - 2], $$[$0]);
                    this.$.isMath = true;
                    break;
                case 43:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_sub', $$[$0 - 2], $$[$0]);
                    this.$.isMath = true;
                    break;
                case 45:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_mul', $$[$0 - 2], $$[$0]);
                    this.$.isMath = true;
                    break;
                case 46:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_div', $$[$0 - 2], $$[$0]);
                    this.$.isMath = true;
                    break;
                case 47:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_mod', $$[$0 - 2], $$[$0]);
                    this.$.isMath = true;
                    break;
                case 49:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_exp', $$[$0 - 2], $$[$0]);
                    this.$.isMath = true;
                    break;
                case 51:
                    this.$ = AST.createNode(lc(_$[$0 - 1]), 'node_op', 'op_not', $$[$0]);
                    this.$.isMath = false;
                    break;
                case 53:
                    this.$ = AST.createNode(lc(_$[$0 - 1]), 'node_op', 'op_neg', $$[$0]);
                    this.$.isMath = true;
                    break;
                case 57:
                case 63:
                case 64:
                case 66:
                case 67:
                case 68:
                case 97:
                    this.$ = $$[$0];
                    this.$.isMath = false;
                    break;
                case 59:
                case 91:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_property', $$[$0 - 2], $$[$0]);
                    this.$.isMath = true;
                    break;
                case 60:
                case 90:
                    this.$ = AST.createNode(lc(_$[$0 - 3]), 'node_op', 'op_extvalue', $$[$0 - 3], $$[$0 - 1]);
                    this.$.isMath = true;
                    break;
                case 61:
                    this.$ = AST.createNode(lc(_$[$0]), 'node_var', $$[$0]);
                    break;
                case 69:
                    this.$ = $$[$0];
                    this.$.isMath = true;
                    break;
                case 70:
                    this.$ = AST.createNode(lc(_$[$0]), 'node_const', null);
                    break;
                case 71:
                    this.$ = AST.createNode(lc(_$[$0]), 'node_const_bool', true);
                    break;
                case 72:
                    this.$ = AST.createNode(lc(_$[$0]), 'node_const_bool', false);
                    break;
                case 73:
                    this.$ = AST.createNode(lc(_$[$0]), 'node_str', $$[$0].substring(1, $$[$0].length - 1));
                    break;
                case 74:
                    this.$ = AST.createNode(lc(_$[$0]), 'node_const', parseFloat($$[$0]));
                    break;
                case 75:
                    this.$ = AST.createNode(lc(_$[$0]), 'node_const', NaN);
                    break;
                case 76:
                    this.$ = AST.createNode(lc(_$[$0]), 'node_const', Infinity);
                    break;
                case 77:
                    this.$ = AST.createNode(lc(_$[$0 - 1]), 'node_op', 'op_array', []);
                    break;
                case 78:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_array', $$[$0 - 1]);
                    break;
                case 79:
                    this.$ = AST.createNode(lc(_$[$0 - 1]), 'node_op', 'op_emptyobject', {});
                    this.$.needsAngleBrackets = true;
                    break;
                case 80:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_proplst_val', $$[$0 - 1]);
                    this.$.needsAngleBrackets = true;
                    break;
                case 82:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_proplst', $$[$0 - 2], $$[$0]);
                    break;
                case 83:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_prop', $$[$0 - 2], $$[$0]);
                    break;
                case 87:
                case 89:
                    this.$ = AST.createNode(lc(_$[$0 - 1]), 'node_op', 'op_execfun', $$[$0 - 1], $$[$0]);
                    this.$.isMath = true;
                    break;
                case 88:
                    this.$ = AST.createNode(lc(_$[$0 - 2]), 'node_op', 'op_execfun', $$[$0 - 2], $$[$0 - 1], $$[$0], true);
                    this.$.isMath = false;
                    break;
                case 92:
                    this.$ = [];
                    break;
                case 94:
                case 98:
                case 104:
                    this.$ = [
                        $$[$0]
                    ];
                    break;
                case 95:
                case 99:
                case 105:
                    this.$ = $$[$0 - 2].concat($$[$0]);
                    break;
                case 96:
                    this.$ = AST.createNode(lc(_$[$0]), 'node_var', $$[$0]);
                    this.$.isMath = true;
                    break;
                case 100:
                    this.$ = AST.createNode(lc(_$[$0 - 3]), 'node_op', 'op_function', [], $$[$0]);
                    this.$.isMath = false;
                    break;
                case 101:
                    this.$ = AST.createNode(lc(_$[$0 - 4]), 'node_op', 'op_function', $$[$0 - 2], $$[$0]);
                    this.$.isMath = false;
                    break;
                case 102:
                    this.$ = AST.createNode(lc(_$[$0 - 4]), 'node_op', 'op_map', [], $$[$0]);
                    break;
                case 103:
                    this.$ = AST.createNode(lc(_$[$0 - 5]), 'node_op', 'op_map', $$[$0 - 3], $$[$0]);
                    break;
            }
        },
        table: [
            o([
                5,
                7,
                8,
                14,
                15,
                16,
                17,
                19,
                20,
                21,
                23,
                26,
                50,
                51,
                58,
                65,
                74,
                75,
                76,
                77,
                78,
                79,
                80,
                82,
                91,
                93
            ], $V0, {
                3: 1,
                4: 2
            }),
            {
                1: [
                    3
                ]
            },
            {
                5: [
                    1,
                    3
                ],
                6: 6,
                7: $V1,
                8: $V2,
                9: 20,
                11: 4,
                13: 7,
                14: $V3,
                15: $V4,
                16: $V5,
                17: $V6,
                18: 8,
                19: $V7,
                20: $V8,
                21: $V9,
                22: 9,
                23: $Va,
                24: 11,
                25: 5,
                26: $Vb,
                28: 10,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                1: [
                    2,
                    1
                ]
            },
            o($Vq, [
                2,
                13
            ]),
            o($Vr, [
                2,
                15
            ]),
            o($Vr, [
                2,
                16
            ]),
            o($Vr, [
                2,
                17
            ]),
            o($Vr, [
                2,
                18
            ]),
            o($Vr, [
                2,
                19
            ]),
            o($Vr, [
                2,
                20
            ]),
            o($Vr, [
                2,
                21
            ]),
            o([
                7,
                8,
                14,
                15,
                16,
                17,
                19,
                20,
                21,
                23,
                26,
                27,
                50,
                51,
                58,
                65,
                74,
                75,
                76,
                77,
                78,
                79,
                80,
                82,
                91,
                93
            ], $V0, {
                4: 61
            }),
            {
                8: [
                    1,
                    62
                ]
            },
            {
                8: [
                    1,
                    63
                ]
            },
            {
                8: [
                    1,
                    64
                ]
            },
            {
                6: 6,
                7: $V1,
                8: $V2,
                9: 20,
                11: 65,
                13: 7,
                14: $V3,
                15: $V4,
                16: $V5,
                17: $V6,
                18: 8,
                19: $V7,
                20: $V8,
                21: $V9,
                22: 9,
                23: $Va,
                24: 11,
                25: 5,
                26: $Vb,
                28: 10,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                20: [
                    1,
                    66
                ]
            },
            {
                20: [
                    1,
                    67
                ]
            },
            {
                8: $V2,
                9: 69,
                16: [
                    1,
                    68
                ],
                20: $V8,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                16: [
                    1,
                    70
                ]
            },
            o($Vr, [
                2,
                11
            ]),
            o($Vs, [
                2,
                23
            ]),
            o($Vs, [
                2,
                24
            ]),
            o([
                8,
                10,
                16,
                34,
                35,
                37,
                39,
                41,
                42,
                43,
                45,
                46,
                47,
                48,
                50,
                51,
                53,
                54,
                55,
                64,
                65,
                66,
                83,
                86
            ], $Vt, {
                32: [
                    1,
                    71
                ],
                57: $Vu
            }),
            o([
                8,
                10,
                16,
                32,
                35,
                39,
                41,
                42,
                43,
                45,
                46,
                47,
                48,
                50,
                51,
                53,
                54,
                55,
                57,
                64,
                65,
                66,
                83,
                86
            ], [
                2,
                26
            ], {
                34: [
                    1,
                    73
                ],
                37: [
                    1,
                    74
                ]
            }),
            o($Vv, [
                2,
                54
            ], {
                88: 77,
                8: $Vw,
                64: [
                    1,
                    75
                ],
                65: [
                    1,
                    76
                ]
            }),
            o($Vv, [
                2,
                55
            ], {
                88: 79,
                8: $Vw,
                64: [
                    1,
                    81
                ],
                65: [
                    1,
                    80
                ]
            }),
            o($Vx, [
                2,
                28
            ], {
                39: $Vy
            }),
            o($Vs, [
                2,
                56
            ]),
            o($Vs, [
                2,
                57
            ]),
            o($Vs, [
                2,
                58
            ]),
            o($Vz, [
                2,
                30
            ], {
                41: $VA,
                42: $VB,
                43: $VC
            }),
            o($Vs, [
                2,
                61
            ]),
            o($Vs, [
                2,
                62
            ]),
            o($Vs, [
                2,
                63
            ]),
            o($Vs, [
                2,
                64
            ]),
            {
                8: $V2,
                9: 86,
                20: $V8,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: [
                    1,
                    87
                ]
            },
            {
                8: [
                    1,
                    88
                ]
            },
            o($VD, [
                2,
                32
            ], {
                45: $VE,
                46: $VF,
                47: $VG,
                48: $VH
            }),
            o($Vs, [
                2,
                66
            ]),
            o($Vs, [
                2,
                67
            ]),
            o($Vs, [
                2,
                68
            ]),
            o($Vs, [
                2,
                69
            ]),
            {
                20: $VI,
                72: 98,
                73: 99,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                83: [
                    1,
                    93
                ],
                84: 94,
                85: 95,
                87: 96
            },
            {
                8: $V2,
                20: $V8,
                29: 102,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                66: [
                    1,
                    100
                ],
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                81: 101,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            o($VJ, [
                2,
                36
            ], {
                50: $VK,
                51: $VL
            }),
            o($Vs, [
                2,
                70
            ]),
            o($Vs, [
                2,
                71
            ]),
            o($Vs, [
                2,
                72
            ]),
            o($Vs, [
                2,
                73
            ]),
            o($Vs, [
                2,
                74
            ]),
            o($Vs, [
                2,
                75
            ]),
            o($Vs, [
                2,
                76
            ]),
            o($VM, [
                2,
                41
            ], {
                53: $VN,
                54: $VO,
                55: $VP
            }),
            o($Vs, [
                2,
                44
            ]),
            o($Vs, [
                2,
                50
            ]),
            {
                8: $V2,
                20: $V8,
                31: 109,
                50: $Vc,
                51: $Vd,
                52: 108,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                20: $V8,
                31: 109,
                50: $Vc,
                51: $Vd,
                52: 110,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                20: $V8,
                31: 109,
                50: $Vc,
                51: $Vd,
                52: 111,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                6: 6,
                7: $V1,
                8: $V2,
                9: 20,
                11: 4,
                13: 7,
                14: $V3,
                15: $V4,
                16: $V5,
                17: $V6,
                18: 8,
                19: $V7,
                20: $V8,
                21: $V9,
                22: 9,
                23: $Va,
                24: 11,
                25: 5,
                26: $Vb,
                27: [
                    1,
                    112
                ],
                28: 10,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                9: 113,
                20: $V8,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                9: 114,
                20: $V8,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                9: 115,
                20: $V8,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                14: [
                    1,
                    116
                ]
            },
            o($Vr, [
                2,
                7
            ]),
            o($Vr, [
                2,
                8
            ]),
            o($Vr, [
                2,
                9
            ]),
            {
                16: [
                    1,
                    117
                ]
            },
            o($Vr, [
                2,
                22
            ]),
            {
                8: $V2,
                20: $V8,
                29: 118,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                20: $V8,
                31: 109,
                50: $Vc,
                51: $Vd,
                52: 119,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                20: $V8,
                29: 120,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                20: $V8,
                31: 109,
                36: 121,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                20: [
                    1,
                    122
                ]
            },
            {
                8: $V2,
                9: 123,
                20: $V8,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            o($Vs, [
                2,
                87
            ], {
                89: 124,
                90: 125,
                68: 127,
                20: $VQ,
                82: $Vn
            }),
            {
                8: $V2,
                10: [
                    1,
                    128
                ],
                20: $V8,
                29: 102,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                81: 129,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            o($Vs, [
                2,
                89
            ]),
            {
                8: $V2,
                9: 130,
                20: $V8,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                20: [
                    1,
                    131
                ]
            },
            {
                8: $V2,
                20: $V8,
                31: 109,
                38: 132,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                20: $V8,
                31: 109,
                40: 133,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                20: $V8,
                31: 109,
                40: 134,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                20: $V8,
                31: 109,
                40: 135,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                10: [
                    1,
                    136
                ]
            },
            {
                10: [
                    1,
                    137
                ],
                20: $VR,
                92: 138
            },
            {
                10: [
                    1,
                    140
                ],
                20: $VR,
                92: 141
            },
            {
                8: $V2,
                20: $V8,
                31: 109,
                44: 142,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                20: $V8,
                31: 109,
                44: 143,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                20: $V8,
                31: 109,
                44: 144,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                20: $V8,
                31: 109,
                44: 145,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            o($Vs, [
                2,
                79
            ]),
            {
                83: [
                    1,
                    146
                ],
                86: [
                    1,
                    147
                ]
            },
            o($VS, [
                2,
                81
            ]),
            {
                35: [
                    1,
                    148
                ]
            },
            {
                35: [
                    2,
                    84
                ]
            },
            {
                35: [
                    2,
                    85
                ]
            },
            {
                35: [
                    2,
                    86
                ]
            },
            o($Vs, [
                2,
                77
            ]),
            {
                66: [
                    1,
                    149
                ],
                86: $VT
            },
            o($VU, [
                2,
                98
            ]),
            {
                8: $V2,
                20: $V8,
                31: 109,
                49: 151,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                20: $V8,
                31: 109,
                49: 152,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                20: $V8,
                31: 109,
                50: $Vc,
                51: $Vd,
                52: 153,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                20: $V8,
                31: 109,
                50: $Vc,
                51: $Vd,
                52: 154,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                20: $V8,
                31: 109,
                50: $Vc,
                51: $Vd,
                52: 155,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            o($Vs, [
                2,
                51
            ]),
            o([
                8,
                10,
                16,
                32,
                34,
                35,
                37,
                39,
                41,
                42,
                43,
                45,
                46,
                47,
                48,
                50,
                51,
                53,
                54,
                55,
                64,
                65,
                66,
                83,
                86
            ], $Vt, {
                57: $Vu
            }),
            o($Vs, [
                2,
                52
            ]),
            o($Vs, [
                2,
                53
            ]),
            o([
                5,
                7,
                8,
                10,
                12,
                14,
                15,
                16,
                17,
                19,
                20,
                21,
                23,
                26,
                27,
                32,
                34,
                35,
                37,
                39,
                41,
                42,
                43,
                45,
                46,
                47,
                48,
                50,
                51,
                53,
                54,
                55,
                57,
                58,
                64,
                65,
                66,
                74,
                75,
                76,
                77,
                78,
                79,
                80,
                82,
                83,
                86,
                91,
                93
            ], [
                2,
                12
            ]),
            {
                10: [
                    1,
                    156
                ]
            },
            {
                10: [
                    1,
                    157
                ]
            },
            {
                16: [
                    1,
                    158
                ]
            },
            {
                8: [
                    1,
                    159
                ]
            },
            o($Vr, [
                2,
                10
            ]),
            o($Vs, [
                2,
                25
            ]),
            o($Vs, [
                2,
                49
            ]),
            {
                35: [
                    1,
                    160
                ]
            },
            o($Vx, [
                2,
                29
            ], {
                39: $Vy
            }),
            o($Vs, [
                2,
                59
            ]),
            {
                66: [
                    1,
                    161
                ]
            },
            o([
                8,
                10,
                16,
                32,
                34,
                35,
                37,
                39,
                41,
                42,
                43,
                45,
                46,
                47,
                48,
                50,
                51,
                53,
                54,
                55,
                57,
                64,
                65,
                66,
                83
            ], [
                2,
                88
            ], {
                86: [
                    1,
                    162
                ]
            }),
            o($Vs, [
                2,
                94
            ]),
            o($Vs, [
                2,
                96
            ]),
            o($Vs, [
                2,
                97
            ]),
            o($VV, [
                2,
                92
            ]),
            {
                10: [
                    1,
                    163
                ],
                86: $VT
            },
            {
                66: [
                    1,
                    164
                ]
            },
            o($Vs, [
                2,
                91
            ]),
            o($Vz, [
                2,
                31
            ], {
                41: $VA,
                42: $VB,
                43: $VC
            }),
            o($VD, [
                2,
                33
            ], {
                45: $VE,
                46: $VF,
                47: $VG,
                48: $VH
            }),
            o($VD, [
                2,
                34
            ], {
                45: $VE,
                46: $VF,
                47: $VG,
                48: $VH
            }),
            o($VD, [
                2,
                35
            ], {
                45: $VE,
                46: $VF,
                47: $VG,
                48: $VH
            }),
            o($Vs, [
                2,
                65
            ]),
            {
                25: 165,
                26: $Vb
            },
            {
                10: [
                    1,
                    166
                ],
                86: $VW
            },
            o($VX, [
                2,
                104
            ]),
            {
                94: [
                    1,
                    168
                ]
            },
            {
                10: [
                    1,
                    169
                ],
                86: $VW
            },
            o($VJ, [
                2,
                37
            ], {
                50: $VK,
                51: $VL
            }),
            o($VJ, [
                2,
                38
            ], {
                50: $VK,
                51: $VL
            }),
            o($VJ, [
                2,
                39
            ], {
                50: $VK,
                51: $VL
            }),
            o($VJ, [
                2,
                40
            ], {
                50: $VK,
                51: $VL
            }),
            o($Vs, [
                2,
                80
            ]),
            {
                20: $VI,
                72: 98,
                73: 99,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                85: 170,
                87: 96
            },
            {
                8: $V2,
                20: $V8,
                29: 171,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            o($Vs, [
                2,
                78
            ]),
            {
                8: $V2,
                20: $V8,
                29: 172,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            o($VM, [
                2,
                42
            ], {
                53: $VN,
                54: $VO,
                55: $VP
            }),
            o($VM, [
                2,
                43
            ], {
                53: $VN,
                54: $VO,
                55: $VP
            }),
            o($Vs, [
                2,
                45
            ]),
            o($Vs, [
                2,
                46
            ]),
            o($Vs, [
                2,
                47
            ]),
            {
                6: 6,
                7: $V1,
                8: $V2,
                9: 20,
                11: 173,
                13: 7,
                14: $V3,
                15: $V4,
                16: $V5,
                17: $V6,
                18: 8,
                19: $V7,
                20: $V8,
                21: $V9,
                22: 9,
                23: $Va,
                24: 11,
                25: 5,
                26: $Vb,
                28: 10,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                6: 6,
                7: $V1,
                8: $V2,
                9: 20,
                11: 174,
                13: 7,
                14: $V3,
                15: $V4,
                16: $V5,
                17: $V6,
                18: 8,
                19: $V7,
                20: $V8,
                21: $V9,
                22: 9,
                23: $Va,
                24: 11,
                25: 5,
                26: $Vb,
                28: 10,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                9: 175,
                20: $V8,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                9: 176,
                20: $V8,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                20: $V8,
                29: 177,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            o($Vs, [
                2,
                60
            ]),
            {
                20: $VQ,
                68: 127,
                82: $Vn,
                90: 178
            },
            o($VV, [
                2,
                93
            ]),
            o($Vs, [
                2,
                90
            ]),
            o($Vs, [
                2,
                100
            ]),
            {
                25: 179,
                26: $Vb
            },
            {
                20: [
                    1,
                    180
                ]
            },
            {
                8: $V2,
                9: 181,
                20: $V8,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                94: [
                    1,
                    182
                ]
            },
            o($VS, [
                2,
                82
            ]),
            o($VS, [
                2,
                83
            ]),
            o($VU, [
                2,
                99
            ]),
            o($Vq, [
                2,
                2
            ], {
                12: [
                    1,
                    183
                ]
            }),
            o($Vr, [
                2,
                4
            ]),
            {
                16: [
                    1,
                    184
                ]
            },
            {
                10: [
                    1,
                    185
                ]
            },
            o($Vs, [
                2,
                27
            ]),
            o($Vs, [
                2,
                95
            ]),
            o($Vs, [
                2,
                101
            ]),
            o($VX, [
                2,
                105
            ]),
            o($Vs, [
                2,
                102
            ]),
            {
                8: $V2,
                9: 186,
                20: $V8,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                6: 6,
                7: $V1,
                8: $V2,
                9: 20,
                11: 187,
                13: 7,
                14: $V3,
                15: $V4,
                16: $V5,
                17: $V6,
                18: 8,
                19: $V7,
                20: $V8,
                21: $V9,
                22: 9,
                23: $Va,
                24: 11,
                25: 5,
                26: $Vb,
                28: 10,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                8: $V2,
                9: 188,
                20: $V8,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            {
                16: [
                    1,
                    189
                ]
            },
            o($Vs, [
                2,
                103
            ]),
            o($Vr, [
                2,
                3
            ]),
            {
                10: [
                    1,
                    190
                ]
            },
            o($Vr, [
                2,
                6
            ]),
            {
                6: 6,
                7: $V1,
                8: $V2,
                9: 20,
                11: 191,
                13: 7,
                14: $V3,
                15: $V4,
                16: $V5,
                17: $V6,
                18: 8,
                19: $V7,
                20: $V8,
                21: $V9,
                22: 9,
                23: $Va,
                24: 11,
                25: 5,
                26: $Vb,
                28: 10,
                29: 22,
                30: 23,
                31: 24,
                33: 25,
                36: 28,
                38: 32,
                40: 40,
                44: 47,
                49: 55,
                50: $Vc,
                51: $Vd,
                52: 56,
                56: 57,
                58: $Ve,
                59: 26,
                60: 27,
                61: 29,
                62: 30,
                63: 31,
                65: $Vf,
                67: 34,
                68: 35,
                69: 36,
                70: 41,
                71: 42,
                72: 43,
                73: 44,
                74: $Vg,
                75: $Vh,
                76: $Vi,
                77: $Vj,
                78: $Vk,
                79: $Vl,
                80: $Vm,
                82: $Vn,
                91: $Vo,
                93: $Vp
            },
            o($Vr, [
                2,
                5
            ])
        ],
        defaultActions: {
            3: [
                2,
                1
            ],
            97: [
                2,
                84
            ],
            98: [
                2,
                85
            ],
            99: [
                2,
                86
            ]
        },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            } else {
                var error = new Error(str);
                error.hash = hash;
                throw error;
            }
        },
        /**
 * @class
 * @ignore
 */ parse: function parse(input) {
            var self1 = this, stack = [
                0
            ], tstack = [], vstack = [
                null
            ], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = {
                yy: {}
            };
            for(var k in this.yy){
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            } else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            _token_stack: var lex = function() {
                var token;
                token = lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    token = self1.symbols_[token] || token;
                }
                return token;
            };
            var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
            while(true){
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                } else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for(p in table[state]){
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    } else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch(action[0]){
                    case 1:
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        } else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [
                                lstack[lstack.length - (len || 1)].range[0],
                                lstack[lstack.length - 1].range[1]
                            ];
                        }
                        r = this.performAction.apply(yyval, [
                            yytext,
                            yyleng,
                            yylineno,
                            sharedState.yy,
                            action[1],
                            vstack,
                            lstack
                        ].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        }
    };
    var AST = {
        node: function(type, value, children) {
            return {
                type: type,
                value: value,
                children: children
            };
        },
        createNode: function(pos, type, value, children) {
            var i, n = this.node(type, value, []);
            for(i = 3; i < arguments.length; i++){
                n.children.push(arguments[i]);
            }
            n.line = pos[0];
            n.col = pos[1];
            n.eline = pos[2];
            n.ecol = pos[3];
            return n;
        }
    };
    var lc = function(lc1) {
        return [
            lc1.first_line,
            lc1.first_column,
            lc1.last_line,
            lc1.last_column
        ];
    };
    /* generated by jison-lex 0.3.4 */ var lexer = function() {
        var lexer = {
            EOF: 1,
            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                } else {
                    throw new Error(str);
                }
            },
            // resets the lexer, sets new input
            setInput: function(input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = [
                    'INITIAL'
                ];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [
                        0,
                        0
                    ];
                }
                this.offset = 0;
                return this;
            },
            // consumes and returns one char from the input
            input: function() {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                } else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }
                this._input = this._input.slice(1);
                return ch;
            },
            // unshifts one char (or a string) into the input
            unput: function(ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);
                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);
                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;
                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                };
                if (this.options.ranges) {
                    this.yylloc.range = [
                        r[0],
                        r[0] + this.yyleng - len
                    ];
                }
                this.yyleng = this.yytext.length;
                return this;
            },
            // When called from action, caches matched text and appends it on next action
            more: function() {
                this._more = true;
                return this;
            },
            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function() {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },
            // retain first n characters of the match
            less: function(n) {
                this.unput(this.match.slice(n));
            },
            // displays already matched input, i.e. for error messages
            pastInput: function() {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            // displays upcoming input, i.e. for error messages
            upcomingInput: function() {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function() {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },
            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function(match, indexed_rule) {
                var token, lines, backup;
                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }
                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [
                        this.offset,
                        this.offset += this.yyleng
                    ];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                } else if (this._backtrack) {
                    // recover context
                    for(var k in backup){
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },
            // return next match in input
            next: function() {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }
                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for(var i = 0; i < rules.length; i++){
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            } else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            } else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        } else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },
            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                } else {
                    return this.lex();
                }
            },
            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },
            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                } else {
                    return this.conditionStack[0];
                }
            },
            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                } else {
                    return this.conditions["INITIAL"].rules;
                }
            },
            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                } else {
                    return "INITIAL";
                }
            },
            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },
            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: {},
            /**
 * @class
 * @ignore
 */ performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch($avoiding_name_collisions){
                    case 0:
                        break;
                    case 1:
                        return 78 /* New 123.1234e+-12 */ ;
                        //TURBOPACK unreachable
                        ;
                    case 2:
                        return 78 /* Old 123.1234 or .1234 */ ;
                        //TURBOPACK unreachable
                        ;
                    case 3:
                        return 78 /* Old 123 */ ;
                        //TURBOPACK unreachable
                        ;
                    case 4:
                        return 77;
                        //TURBOPACK unreachable
                        ;
                    case 5:
                        return 77;
                        //TURBOPACK unreachable
                        ;
                    case 6:
                        break;
                    case 7:
                        break;
                    case 8:
                        return 7;
                        //TURBOPACK unreachable
                        ;
                    case 9:
                        return 12;
                        //TURBOPACK unreachable
                        ;
                    case 10:
                        return 14;
                        //TURBOPACK unreachable
                        ;
                    case 11:
                        return 17;
                        //TURBOPACK unreachable
                        ;
                    case 12:
                        return 15;
                        //TURBOPACK unreachable
                        ;
                    case 13:
                        return 91;
                        //TURBOPACK unreachable
                        ;
                    case 14:
                        return 93;
                        //TURBOPACK unreachable
                        ;
                    case 15:
                        return 19;
                        //TURBOPACK unreachable
                        ;
                    case 16:
                        return 23;
                        //TURBOPACK unreachable
                        ;
                    case 17:
                        return 21;
                        //TURBOPACK unreachable
                        ;
                    case 18:
                        return 75;
                        //TURBOPACK unreachable
                        ;
                    case 19:
                        return 76;
                        //TURBOPACK unreachable
                        ;
                    case 20:
                        return 74;
                        //TURBOPACK unreachable
                        ;
                    case 21:
                        return 80;
                        //TURBOPACK unreachable
                        ;
                    case 22:
                        return 94;
                        //TURBOPACK unreachable
                        ;
                    case 23:
                        return 94;
                        //TURBOPACK unreachable
                        ;
                    case 24:
                        return 82;
                        //TURBOPACK unreachable
                        ;
                    case 25:
                        return 83;
                        //TURBOPACK unreachable
                        ;
                    case 26:
                        return 26;
                        //TURBOPACK unreachable
                        ;
                    case 27:
                        return 27;
                        //TURBOPACK unreachable
                        ;
                    case 28:
                        return 16;
                        //TURBOPACK unreachable
                        ;
                    case 29:
                        return '#';
                        //TURBOPACK unreachable
                        ;
                    case 30:
                        return 34;
                        //TURBOPACK unreachable
                        ;
                    case 31:
                        return 35;
                        //TURBOPACK unreachable
                        ;
                    case 32:
                        return 79;
                        //TURBOPACK unreachable
                        ;
                    case 33:
                        return 64;
                        //TURBOPACK unreachable
                        ;
                    case 34:
                        return 65;
                        //TURBOPACK unreachable
                        ;
                    case 35:
                        return 66;
                        //TURBOPACK unreachable
                        ;
                    case 36:
                        return 8;
                        //TURBOPACK unreachable
                        ;
                    case 37:
                        return 10;
                        //TURBOPACK unreachable
                        ;
                    case 38:
                        return 58;
                        //TURBOPACK unreachable
                        ;
                    case 39:
                        return 57;
                        //TURBOPACK unreachable
                        ;
                    case 40:
                        return 57;
                        //TURBOPACK unreachable
                        ;
                    case 41:
                        return 53;
                        //TURBOPACK unreachable
                        ;
                    case 42:
                        return 54;
                        //TURBOPACK unreachable
                        ;
                    case 43:
                        return 55;
                        //TURBOPACK unreachable
                        ;
                    case 44:
                        return 50;
                        //TURBOPACK unreachable
                        ;
                    case 45:
                        return 51;
                        //TURBOPACK unreachable
                        ;
                    case 46:
                        return 47;
                        //TURBOPACK unreachable
                        ;
                    case 47:
                        return 45;
                        //TURBOPACK unreachable
                        ;
                    case 48:
                        return 48;
                        //TURBOPACK unreachable
                        ;
                    case 49:
                        return 46;
                        //TURBOPACK unreachable
                        ;
                    case 50:
                        return 41;
                        //TURBOPACK unreachable
                        ;
                    case 51:
                        return 43;
                        //TURBOPACK unreachable
                        ;
                    case 52:
                        return 42;
                        //TURBOPACK unreachable
                        ;
                    case 53:
                        return 39;
                        //TURBOPACK unreachable
                        ;
                    case 54:
                        return 37;
                        //TURBOPACK unreachable
                        ;
                    case 55:
                        return 32;
                        //TURBOPACK unreachable
                        ;
                    case 56:
                        return 86;
                        //TURBOPACK unreachable
                        ;
                    case 57:
                        return 5;
                        //TURBOPACK unreachable
                        ;
                    case 58:
                        return 20;
                        //TURBOPACK unreachable
                        ;
                    case 59:
                        return 'INVALID';
                        //TURBOPACK unreachable
                        ;
                }
            },
            rules: [
                /^(?:\s+)/,
                /^(?:[0-9]*\.?[0-9]+([eE][-+]?[0-9]+))/,
                /^(?:[0-9]+\.[0-9]*|[0-9]*\.[0-9]+\b)/,
                /^(?:[0-9]+)/,
                /^(?:"(\\["]|[^"])*")/,
                /^(?:'(\\[']|[^'])*')/,
                /^(?:\/\/.*)/,
                /^(?:\/\*(.|\n|\r)*?\*\/)/,
                /^(?:if\b)/,
                /^(?:else\b)/,
                /^(?:while\b)/,
                /^(?:do\b)/,
                /^(?:for\b)/,
                /^(?:function\b)/,
                /^(?:map\b)/,
                /^(?:use\b)/,
                /^(?:return\b)/,
                /^(?:delete\b)/,
                /^(?:true\b)/,
                /^(?:false\b)/,
                /^(?:null\b)/,
                /^(?:Infinity\b)/,
                /^(?:->)/,
                /^(?:=>)/,
                /^(?:<<)/,
                /^(?:>>)/,
                /^(?:\{)/,
                /^(?:\})/,
                /^(?:;)/,
                /^(?:#)/,
                /^(?:\?)/,
                /^(?::)/,
                /^(?:NaN\b)/,
                /^(?:\.)/,
                /^(?:\[)/,
                /^(?:\])/,
                /^(?:\()/,
                /^(?:\))/,
                /^(?:!)/,
                /^(?:\^)/,
                /^(?:\*\*)/,
                /^(?:\*)/,
                /^(?:\/)/,
                /^(?:%)/,
                /^(?:\+)/,
                /^(?:-)/,
                /^(?:<=)/,
                /^(?:<)/,
                /^(?:>=)/,
                /^(?:>)/,
                /^(?:==)/,
                /^(?:~=)/,
                /^(?:!=)/,
                /^(?:&&)/,
                /^(?:\|\|)/,
                /^(?:=)/,
                /^(?:,)/,
                /^(?:$)/,
                /^(?:[A-Za-z_\$][A-Za-z0-9_]*)/,
                /^(?:.)/
            ],
            conditions: {
                "INITIAL": {
                    "rules": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        12,
                        13,
                        14,
                        15,
                        16,
                        17,
                        18,
                        19,
                        20,
                        21,
                        22,
                        23,
                        24,
                        25,
                        26,
                        27,
                        28,
                        29,
                        30,
                        31,
                        32,
                        33,
                        34,
                        35,
                        36,
                        37,
                        38,
                        39,
                        40,
                        41,
                        42,
                        43,
                        44,
                        45,
                        46,
                        47,
                        48,
                        49,
                        50,
                        51,
                        52,
                        53,
                        54,
                        55,
                        56,
                        57,
                        58,
                        59
                    ],
                    "inclusive": true
                }
            }
        };
        return lexer;
    }();
    parser1.lexer = lexer;
    /**
 * @class
 * @ignore
 */ function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser1;
    parser1.Parser = Parser;
    return new Parser;
}();
// Work around an issue with browsers that don't support Object.getPrototypeOf()
parser.yy.parseError = parser.parseError;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].JessieCode;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/parser/prefix.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ /**
 * @fileoverview Simple prefix parser for measurements and expressions of measurements.
 * An expression is given as
 * <ul>
 * <li> array starting with an operator as first element, followed
 * by one or more operands,
 * <li> number.
 * </ul>
 * <p>
 * Possible operands are:
 * <ul>
 * <li> '+', '-', '*', '/'
 * </ul>
 *
 * @example
 *
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-ssr] (ecmascript)");
;
;
;
;
/**
 * Prefix expression parser, i.e. a poor man's parser.
 * This is a simple prefix parser for measurements and expressions of measurements,
 * see {@link Measurement}.
 * An expression is given as
 * <ul>
 * <li> array starting with an operator as first element, followed
 * by one or more operands,
 * <li> number.
 * </ul>
 * <p>
 * Possible operators are:
 * <ul>
 * <li> '+', '-', '*', '/': binary operators
 * <li> 'Area', 'Radius', 'Value', 'V', 'L': arbitrary methods of JSXGraph elements, supplied as strings.
 * <li> 'exec': call a function
 * </ul>
 * <p>
 * Possible operands are:
 * <ul>
 * <li> numbers
 * <li> strings
 * <li> JSXGraph elements in case the operator is a method. Example: ['Area', circle] calls
 * the method circle.Area().
 * <li> prefix expressions (for binary operators)
 * <li> 'exec': call functions. Example: ['exec', 'sin', ['V', slider]] computes 'Math.sin(slider.Value())'.
 * As functions only functions in Math or JXG.Math are allowed.
 * </ul>
 * @namespace
 *
 * @example
 *   ['+', 100, 200]
 * @example
 * var p1 = board.create('point', [1, 1]);
 * var p2 = board.create('point', [1, 3]);
 * var seg = board.create('segment', [[-2,-3], [-2, 3]]);
 *
 * // Valid prefix expression: ['L', seg]
 *
 * @example
 * var p1 = board.create('point', [1, 1]);
 * var p2 = board.create('point', [1, 3]);
 * var seg = board.create('segment', [[-2,-3], [-2, 3]]);
 * var ci = board.create('circle', [p1, 7]);
 *
 * // Valid prefix expression:  ['+', ['Radius', ci], ['L', seg]]
 *
 * @example
 * var ang = board.create('angle', [[4, 0], [0, 0], [2, 2]]);
 * // Valid prefix expression:  ['V', ang, 'degrees']);
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].PrefixParser = {
    /**
     * Parse a prefix expression and apply an action.
     * @param {array|number} term Expression
     * @param {String} action Determines what to do. So far, the only
     * action available is 'execute', which evaluates the expression.
     * @returns {Number} What ever the action does.
     */ parse: function(term, action) {
        var method, i, le, res, fun, v;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(term) || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(term)) {
            return term;
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(term) || term.length < 2) {
            throw new Error('prefixParser.parse: term is not an array, number or string');
        }
        method = term[0];
        le = term.length;
        if (action === 'execute') {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInArray([
                '+',
                '-',
                '*',
                '/'
            ], method)) {
                res = this.parse(term[1], action);
                for(i = 2; i < le; i++){
                    v = this.parse(term[i], action);
                    switch(method){
                        case '+':
                            res += v;
                            break;
                        case '-':
                            res -= v;
                            break;
                        case '*':
                            res *= v;
                            break;
                        case '/':
                            res /= v;
                            break;
                        default:
                    }
                }
            } else if (method === 'exec') {
                fun = term[1];
                v = [];
                for(i = 2; i < le; i++){
                    v.push(this.parse(term[i], action));
                }
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(Math[fun])) {
                    res = Math[fun].apply(this, v);
                } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"][fun])) {
                    res = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"][fun].apply(this, v);
                } else {
                    throw new Error("PrefixParser.parse: " + fun + " is not allowed");
                }
            } else {
                fun = term[0];
                // Allow shortcut 'V' for 'Value'
                if (fun === 'V') {
                    fun = 'Value';
                }
                // get coords always with z
                // (its visibility is controlled by the attribute function formatCoords)
                if (fun === 'Coords') {
                    term[2] = 'true';
                }
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(term[1][fun])) {
                    throw new Error("PrefixParser.parse: " + fun + " is not a method of " + term[1]);
                }
                v = [];
                for(i = 2; i < le; i++){
                    v.push(this.parse(term[i], action));
                }
                res = term[1][fun].apply(term[1], v);
            }
        }
        return res;
    },
    /**
     * Determine the dimension of the resulting value, i.e. ['L', obj] as well as
     * ['+', ['L', obj1], ['L', obj2]] have dimension 1.
     * <p>
     * ['+', ['Area', obj1], ['L', obj2]] will retrun NaN, because the two
     * operands have conflicting dimensions.
     * <p>
     * If an element is a measurement element, then it's dimension can be set as attribute.
     * This overrules the computed dimension.
     *
     * @param {Array|Number} term Prefix expression
     * @returns Number
     */ dimension: function(term) {
        var method, i, le, res, fun, d, v, unit;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(term)) {
            return 0;
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(term) || term.length < 2) {
            throw new Error('PrefixParser.dimension: term is not an array');
        }
        method = term[0];
        le = term.length;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInArray([
            '+',
            '-',
            '*',
            '/'
        ], method)) {
            res = this.dimension(term[1]);
            for(i = 2; i < le; i++){
                v = this.dimension(term[i]);
                switch(method){
                    case '+':
                        if (v !== res) {
                            res = NaN;
                        }
                        break;
                    case '-':
                        if (v !== res) {
                            res = NaN;
                        }
                        break;
                    case '*':
                        res += v;
                        break;
                    case '/':
                        res -= v;
                        break;
                    default:
                }
            }
        } else if (method === 'exec') {
            if (term[2].type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_MEASUREMENT) {
                res = term[2].Dimension();
                // If attribute "dim" is set, this overrules anything else.
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(term[2].visProp.dim)) {
                    d = term[2].evalVisProp('dim');
                    if (d !== null) {
                        res = d;
                    }
                }
            } else {
                res = 0;
            }
        } else {
            // Allow shortcut 'V' for 'Value'
            fun = term[0];
            switch(fun){
                case 'L':
                case 'Length':
                case 'Perimeter':
                case 'Radius':
                case 'R':
                    res = 1;
                    break;
                case 'Area':
                case 'A':
                    res = 2;
                    break;
                default:
                    if (term[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_MEASUREMENT) {
                        res = term[1].Dimension();
                        // If attribute "dim" is set, this overrules anything else.
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(term[1].visProp.dim)) {
                            d = term[1].evalVisProp('dim');
                            if (d !== null) {
                                res = d;
                            }
                        }
                    } else {
                        res = 0;
                        if (fun === 'Value' || fun === 'V') {
                            // The Value method of sector, angle and arc does not have the same dimension
                            // for all units.
                            if ([
                                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_ARC,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_SECTOR,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_ANGLE
                            ].indexOf(term[1].type) >= 0) {
                                unit = '';
                                if (term.length === 3 && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(term[2])) {
                                    unit = term[2].toLowerCase();
                                }
                                if (unit === '') {
                                    // Default values:
                                    if (term[1].type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_ANGLE) {
                                        // Default for angle.Value() is radians, i.e. dim 0
                                        res = 0;
                                    } else {
                                        // Default for sector|arc.Value() is length, i.e. dim 1
                                        res = 1;
                                    }
                                } else if (unit.indexOf('len') === 0) {
                                    // Length has dim 1
                                    res = 1;
                                } else {
                                    // Angles in various units has dimension 0
                                    res = 0;
                                }
                            }
                        }
                    }
            }
        }
        return res;
    },
    /**
     * Convert a prefix expression into a new prefix expression in which
     * JSXGraph elements have been replaced by their ids.
     *
     * @param {Array|Number} term
     * @returns {Array|Number}
     */ toPrefix: function(term) {
        var method, i, le, res;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(term)) {
            return term;
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(term) || term.length < 2) {
            throw new Error('PrefixParser.toPrefix: term is not an array');
        }
        method = term[0];
        le = term.length;
        res = [
            method
        ];
        for(i = 1; i < le; i++){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInArray([
                '+',
                '-',
                '*',
                '/'
            ], method)) {
                res.push(this.toPrefix(term[i]));
            } else {
                if (method === 'V' && term[i].type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_MEASUREMENT) {
                    res = term[i].toPrefix();
                } else if (method === 'exec') {
                    if (i === 1) {
                        res.push(term[i]);
                    } else {
                        res.push(this.toPrefix(term[i]));
                    }
                } else {
                    res = [
                        method,
                        term[i].id
                    ];
                }
            }
        }
        return res;
    },
    /**
     * Determine parent elements of a prefix expression.
     * @param {Array|Number} term prefix expression
     * @returns Array
     * @private
     */ getParents: function(term) {
        var method, i, le, res;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isNumber(term)) {
            return [];
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(term) || term.length < 2) {
            throw new Error('PrefixParser.getParents: term is not an array');
        }
        method = term[0];
        le = term.length;
        res = [];
        for(i = 1; i < le; i++){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isInArray([
                '+',
                '-',
                '*',
                '/'
            ], method)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(res, this.getParents(term[i]));
            } else {
                if (method === 'V' && term[i].type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_MEASUREMENT) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(res, term[i].getParents());
                } else if (method === 'exec') {
                    if (i > 1) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].concat(res, this.getParents(term[i]));
                    }
                } else {
                    res.push(term[i]);
                }
            }
        }
        return res;
    }
};
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].PrefixParser;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/parser/datasource.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, define: true, document: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview The JXG.DataSource is a helper class for data organization. Currently supported data sources are
 * javascript arrays and HTML tables.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].DataSource = function() {
    this.data = [];
    this.columnHeaders = [];
    this.rowHeaders = [];
    return this;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].DataSource.prototype, /** @lends JXG.DataSource.prototype */ {
    loadFromArray: function(table, columnHeader, rowHeader) {
        var i, j, cell;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(columnHeader)) {
            this.columnHeaders = columnHeader;
            columnHeader = false;
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(rowHeader)) {
            this.rowHeaders = rowHeader;
            rowHeader = false;
        }
        this.data = [];
        if (columnHeader) {
            this.columnHeaders = [];
        }
        if (rowHeader) {
            this.rowHeaders = [];
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(table)) {
            // extract the data
            this.data = [];
            for(i = 0; i < table.length; i++){
                this.data[i] = [];
                for(j = 0; j < table[i].length; j++){
                    cell = table[i][j];
                    if (parseFloat(cell).toString() === cell) {
                        this.data[i][j] = parseFloat(cell);
                    } else if (cell !== "-") {
                        this.data[i][j] = cell;
                    } else {
                        this.data[i][j] = NaN;
                    }
                }
            }
            if (columnHeader) {
                this.columnHeaders = this.data[0].slice(1);
                this.data = this.data.slice(1);
            }
            if (rowHeader) {
                this.rowHeaders = [];
                for(i = 0; i < this.data.length; i++){
                    this.rowHeaders.push(this.data[i][0]);
                    this.data[i] = this.data[i].slice(1);
                }
            }
        }
        return this;
    },
    loadFromTable: function(table, columnHeader, rowHeader) {
        var row, i, j, col, cell;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(columnHeader)) {
            this.columnHeaders = columnHeader;
            columnHeader = false;
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(rowHeader)) {
            this.rowHeaders = rowHeader;
            rowHeader = false;
        }
        this.data = [];
        if (columnHeader) {
            this.columnHeaders = [];
        }
        if (rowHeader) {
            this.rowHeaders = [];
        }
        // to adjust: examples in examples folder & wiki
        table = document.getElementById(table);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exists(table)) {
            // extract the data
            row = table.getElementsByTagName("tr");
            this.data = [];
            for(i = 0; i < row.length; i++){
                col = row[i].getElementsByTagName("td");
                this.data[i] = [];
                for(j = 0; j < col.length; j++){
                    cell = col[j].innerHTML;
                    if (parseFloat(cell).toString() === cell) {
                        this.data[i][j] = parseFloat(cell);
                    } else if (cell !== "-") {
                        this.data[i][j] = cell;
                    } else {
                        this.data[i][j] = NaN;
                    }
                }
            }
            if (columnHeader) {
                this.columnHeaders = this.data[0].slice(1);
                this.data = this.data.slice(1);
            }
            if (rowHeader) {
                this.rowHeaders = [];
                for(i = 0; i < this.data.length; i++){
                    this.rowHeaders.push(this.data[i][0]);
                    this.data[i] = this.data[i].slice(1);
                }
            }
        }
        return this;
    },
    addColumn: function(name, pos, data) {
        throw new Error("not implemented");
    },
    addRow: function(name, pos, data) {
        throw new Error("not implemented");
    },
    getColumn: function(col) {
        var i, result = [];
        // get column index if column is given as column header title
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(col)) {
            for(i = 0; i < this.columnHeaders.length; i++){
                if (col === this.columnHeaders[i]) {
                    col = i;
                    break;
                }
            }
        }
        // build column array
        for(i = 0; i < this.data.length; i++){
            if (this.data[i].length > col) {
                result[i] = parseFloat(this.data[i][col]);
            }
        }
        return result;
    },
    getRow: function(row) {
        var result, i;
        // get column index if column is given as column header title
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isString(row)) {
            for(i = 0; i < this.rowHeaders.length; i++){
                if (row === this.rowHeaders[i]) {
                    row = i;
                    break;
                }
            }
        }
        // allocate memory for result array
        result = [];
        // build column array. result = this.data[row] is a flat copy and will
        // destroy our local data copy, that's why we're copying it element wise.
        for(i = 0; i < this.data[row].length; i++){
            result[i] = this.data[row][i];
        }
        return result;
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].DataSource;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/parser/ca.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 JessieCode Computer algebra algorithms

    Copyright 2011-2019
        Michael Gerhaeuser,
        Alfred Wassermann

    JessieCode is free software dual licensed under the GNU LGPL or MIT License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT

    JessieCode is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License and
    the MIT License along with JessieCode. If not, see <https://www.gnu.org/licenses/>
    and <https://opensource.org/licenses/MIT/>.
 */ /*global JXG: true, define: true, window: true, console: true, self: true, document: true, parser: true*/ /*jslint nomen: true, plusplus: true*/ /*eslint eqeqeq: "off"*/ /**
 * @fileoverview Here, the computer algebra algorithms are implemented.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-ssr] (ecmascript)");
;
;
// import Const from "../base/constants.js";
// import Text from "../base/text.js";
// import Mat from "../math/math.js";
// import Geometry from "../math/geometry.js";
// import Statistics from "../math/statistics.js";
// import Env from "../utils/env.js";
/**
 * A JessieCode object provides an interface to the parser and stores all variables and objects used within a JessieCode script.
 * The optional argument <tt>code</tt> is interpreted after initializing. To evaluate more code after initializing a JessieCode instance
 * please use {@link JXG.JessieCode#parse}. For code snippets like single expressions use {@link JXG.JessieCode#snippet}.
 * @constructor
 * @param {String} [code] Code to parse.
 * @param {Boolean} [geonext=false] Geonext compatibility mode.
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].CA = function(node, createNode, parser) {
    this.node = node;
    this.createNode = createNode;
    this.parser = parser;
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].CA.prototype, /** @lends JXG.CA.prototype */ {
    findMapNode: function(mapname, node) {
        var i, len, ret;
        //console.log("FINDMAP", node);
        if (node.value === "op_assign" && node.children[0].value === mapname) {
            return node.children[1];
        } else if (node.children) {
            len = node.children.length;
            for(i = 0; i < len; ++i){
                ret = this.findMapNode(mapname, node.children[i]);
                if (ret !== null) {
                    return ret;
                }
            }
        }
        return null;
    },
    /**
         * Declare all subnodes as math nodes,
         * i.e recursively set node.isMath = true;
         */ setMath: function(node) {
        var i, len;
        if (node.type == "node_op" && (node.value == "op_add" || node.value == "op_sub" || node.value == "op_mul" || node.value == "op_div" || node.value == "op_neg" || node.value == "op_execfun" || node.value == "op_exp") || node.type == "node_var" || node.type == "node_const") {
            node.isMath = true;
        }
        if (node.children) {
            len = node.children.length;
            for(i = 0; i < len; ++i){
                this.setMath(node.children[i]);
            }
        }
    },
    deriveElementary: function(node, varname) {
        var fun = node.children[0].value, arg = node.children[1], newNode;
        switch(fun){
            case "abs":
                // x / sqrt(x * x)
                newNode = this.createNode("node_op", "op_div", arg[0], this.createNode("node_op", "op_execfun", this.createNode("node_var", "sqrt"), [
                    this.createNode("node_op", "op_mul", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0]), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0]))
                ]));
                break;
            case "sqrt":
                newNode = this.createNode("node_op", "op_div", this.createNode("node_const", 1.0), this.createNode("node_op", "op_mul", this.createNode("node_const", 2.0), this.createNode(node.type, node.value, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node.children[0]), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node.children[1]))));
                break;
            case "sin":
                newNode = this.createNode("node_op", "op_execfun", this.createNode("node_var", "cos"), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg));
                break;
            case "cos":
                newNode = this.createNode("node_op", "op_neg", this.createNode("node_op", "op_execfun", this.createNode("node_var", "sin"), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg)));
                break;
            case "tan":
                newNode = this.createNode("node_op", "op_div", this.createNode("node_const", 1.0), this.createNode("node_op", "op_exp", this.createNode("node_op", "op_execfun", this.createNode("node_var", "cos"), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg)), this.createNode("node_const", 2)));
                break;
            case "cot":
                newNode = this.createNode("node_op", "op_neg", this.createNode("node_op", "op_div", this.createNode("node_const", 1.0), this.createNode("node_op", "op_exp", this.createNode("node_op", "op_execfun", this.createNode("node_var", "sin"), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg)), this.createNode("node_const", 2))));
                break;
            case "exp":
                newNode = this.createNode(node.type, node.value, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node.children[0]), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node.children[1]));
                break;
            case "pow":
                // (f^g)' = f^g*(f'g/f + g' log(f))
                newNode = this.createNode("node_op", "op_mul", this.createNode("node_op", "op_execfun", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node.children[0]), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node.children[1])), this.createNode("node_op", "op_add", this.createNode("node_op", "op_mul", this.derivative(node.children[1][0], varname), this.createNode("node_op", "op_div", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node.children[1][1]), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node.children[1][0]))), this.createNode("node_op", "op_mul", this.derivative(node.children[1][1], varname), this.createNode("node_op", "op_execfun", this.createNode("node_var", "log"), [
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node.children[1][0])
                ]))));
                break;
            case "log":
            case "ln":
                newNode = this.createNode("node_op", "op_div", this.createNode("node_const", 1.0), // Attention: single variable mode
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0]));
                break;
            case "log2":
            case "lb":
            case "ld":
                newNode = this.createNode("node_op", "op_mul", this.createNode("node_op", "op_div", this.createNode("node_const", 1.0), // Attention: single variable mode
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0])), this.createNode("node_const", 1.4426950408889634) // 1/log(2)
                );
                break;
            case "log10":
            case "lg":
                newNode = this.createNode("node_op", "op_mul", this.createNode("node_op", "op_div", this.createNode("node_const", 1.0), // Attention: single variable mode
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0])), this.createNode("node_const", 0.43429448190325176) // 1/log(10)
                );
                break;
            case "asin":
                newNode = this.createNode("node_op", "op_div", this.createNode("node_const", 1.0), this.createNode("node_op", "op_execfun", this.createNode("node_var", "sqrt"), [
                    this.createNode("node_op", "op_sub", this.createNode("node_const", 1.0), this.createNode("node_op", "op_mul", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0]), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0])))
                ]));
                break;
            case "acos":
                newNode = this.createNode("node_op", "op_neg", this.createNode("node_op", "op_div", this.createNode("node_const", 1.0), this.createNode("node_op", "op_execfun", this.createNode("node_var", "sqrt"), [
                    this.createNode("node_op", "op_sub", this.createNode("node_const", 1.0), this.createNode("node_op", "op_mul", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0]), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0])))
                ])));
                break;
            //case 'atan2':
            case "atan":
                newNode = this.createNode("node_op", "op_div", this.createNode("node_const", 1.0), this.createNode("node_op", "op_add", this.createNode("node_const", 1.0), this.createNode("node_op", "op_mul", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0]), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0]))));
                break;
            case "acot":
                newNode = this.createNode("node_op", "op_neg", this.createNode("node_op", "op_div", this.createNode("node_const", 1.0), this.createNode("node_op", "op_add", this.createNode("node_const", 1.0), this.createNode("node_op", "op_mul", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0]), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0])))));
                break;
            case "sinh":
                newNode = this.createNode("node_op", "op_execfun", this.createNode("node_var", "cosh"), [
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0])
                ]);
                break;
            case "cosh":
                newNode = this.createNode("node_op", "op_execfun", this.createNode("node_var", "sinh"), [
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0])
                ]);
                break;
            case "tanh":
                newNode = this.createNode("node_op", "op_sub", this.createNode("node_const", 1.0), this.createNode("node_op", "op_exp", this.createNode("node_op", "op_execfun", this.createNode("node_var", "tanh"), [
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0])
                ]), this.createNode("node_const", 2.0)));
                break;
            case "asinh":
                newNode = this.createNode("node_op", "op_div", this.createNode("node_const", 1.0), this.createNode("node_op", "op_execfun", this.createNode("node_var", "sqrt"), [
                    this.createNode("node_op", "op_add", this.createNode("node_op", "op_mul", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0]), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0])), this.createNode("node_const", 1.0))
                ]));
                break;
            case "acosh":
                newNode = this.createNode("node_op", "op_div", this.createNode("node_const", 1.0), this.createNode("node_op", "op_execfun", this.createNode("node_var", "sqrt"), [
                    this.createNode("node_op", "op_sub", this.createNode("node_op", "op_mul", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0]), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0])), this.createNode("node_const", 1.0))
                ]));
                break;
            case "atanh":
                newNode = this.createNode("node_op", "op_div", this.createNode("node_const", 1.0), this.createNode("node_op", "op_sub", this.createNode("node_const", 1.0), this.createNode("node_op", "op_mul", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0]), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(arg[0]))));
                break;
            default:
                newNode = this.createNode("node_const", 0.0);
                console.log('Derivative of "' + fun + '" not yet implemented');
                throw new Error("Error(" + this.line + "): ");
        }
        return newNode;
    },
    derivative: function(node, varname) {
        var newNode;
        switch(node.type){
            case "node_op":
                switch(node.value){
                    /*
                        case 'op_map':
                            if (true) {
                                newNode = this.createNode('node_op', 'op_map',
                                        Type.deepCopy(node.children[0]),
                                        this.derivative(node.children[1], varname)
                                    );
                            } else {
                                newNode = this.derivative(node.children[1], varname);
                            }
                            break;
                        */ case "op_execfun":
                        // f'(g(x))g'(x)
                        if (node.children[0].value == "pow") {
                            newNode = this.deriveElementary(node, varname);
                        } else {
                            if (node.children[1].length === 0) {
                                newNode = this.createNode("node_const", 0.0);
                            } else {
                                newNode = this.createNode("node_op", "op_mul", this.deriveElementary(node, varname), // Warning: single variable mode
                                this.derivative(node.children[1][0], varname));
                            }
                        }
                        break;
                    case "op_div":
                        // (f'g − g'f )/(g*g)
                        newNode = this.createNode("node_op", "op_div", this.createNode("node_op", "op_sub", this.createNode("node_op", "op_mul", this.derivative(node.children[0], varname), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node.children[1])), this.createNode("node_op", "op_mul", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node.children[0]), this.derivative(node.children[1], varname))), this.createNode("node_op", "op_mul", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node.children[1]), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node.children[1])));
                        break;
                    case "op_mul":
                        // fg' + f'g
                        newNode = this.createNode("node_op", "op_add", this.createNode("node_op", "op_mul", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node.children[0]), this.derivative(node.children[1], varname)), this.createNode("node_op", "op_mul", this.derivative(node.children[0], varname), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node.children[1])));
                        break;
                    case "op_neg":
                        newNode = this.createNode("node_op", "op_neg", this.derivative(node.children[0], varname));
                        break;
                    case "op_add":
                    case "op_sub":
                        newNode = this.createNode("node_op", node.value, this.derivative(node.children[0], varname), this.derivative(node.children[1], varname));
                        break;
                    case "op_exp":
                        // (f^g)' = f^g*(f'g/f + g' log(f))
                        newNode = this.createNode("node_op", "op_mul", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node), this.createNode("node_op", "op_add", this.createNode("node_op", "op_mul", this.derivative(node.children[0], varname), this.createNode("node_op", "op_div", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node.children[1]), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node.children[0]))), this.createNode("node_op", "op_mul", this.derivative(node.children[1], varname), this.createNode("node_op", "op_execfun", this.createNode("node_var", "log"), [
                            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deepCopy(node.children[0])
                        ]))));
                        break;
                }
                break;
            case "node_var":
                //console.log('node_var', node);
                if (node.value === varname) {
                    newNode = this.createNode("node_const", 1.0);
                } else {
                    newNode = this.createNode("node_const", 0.0);
                }
                break;
            case "node_const":
                newNode = this.createNode("node_const", 0.0);
                break;
            case "node_const_bool":
                break;
            case "node_str":
                break;
        }
        return newNode;
    },
    /**
         * f = map (x) -> x*sin(x);
         * Usages:
         *   h = D(f, x);
         *   h = map (x) -> D(f, x);
         * or
         *   D(x^2, x);
         */ expandDerivatives: function(node, parent, ast) {
        var len, i, j, mapNode, codeNode, ret, node2, newNode, mapName, varname, vArray, order, isMap;
        ret = 0;
        if (!node) {
            return ret;
        }
        this.line = node.line;
        this.col = node.col;
        // First we have to go down in the tree.
        // This ensures that in cases like D(D(f,x),x) the inner D is expanded first.
        len = node.children.length;
        for(i = 0; i < len; ++i){
            if (node.children[i] && node.children[i].type) {
                node.children[i] = this.expandDerivatives(node.children[i], node, ast);
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(node.children[i])) {
                for(j = 0; j < node.children[i].length; ++j){
                    if (node.children[i][j] && node.children[i][j].type) {
                        node.children[i][j] = this.expandDerivatives(node.children[i][j], node, ast);
                    }
                }
            }
        }
        switch(node.type){
            case "node_op":
                switch(node.value){
                    case "op_execfun":
                        if (node.children[0] && node.children[0].value === "D") {
                            /*
                                 * Distinguish the cases:
                                 *   D(f, x) where f is map -> isMap = true
                                 * and
                                 *   D(2*x, x), D(sin(x), x), ...  -> isMap = false
                                 */ isMap = false;
                            if (node.children[1][0].type == "node_var") {
                                mapName = node.children[1][0].value;
                                mapNode = this.findMapNode(mapName, ast);
                                if (mapNode !== null) {
                                    isMap = true;
                                }
                            }
                            if (isMap) {
                                /*
                                     * Derivative of map, that is compute D(f,x)
                                     * where e.g. f = map (x) -> x^2
                                     *
                                     * First step: find node where the map is defined
                                     */ // Already done above
                                // mapName = node.children[1][0].value;
                                // mapNode = this.findMapNode(mapName, ast);
                                vArray = mapNode.children[0];
                                // Variable name for differentiation
                                if (node.children[1].length >= 2) {
                                    varname = node.children[1][1].value;
                                } else {
                                    varname = mapNode.children[0][0]; // Usually it's 'x'
                                }
                                codeNode = mapNode.children[1];
                            } else {
                                /*
                                     * Derivative of expression, e.g.
                                     *     D(2*x, x) or D(sin(x), x)
                                     */ codeNode = node.children[1][0];
                                vArray = [
                                    "x"
                                ];
                                // Variable name for differentiation and order
                                if (node.children[1].length >= 2) {
                                    varname = node.children[1][1].value;
                                } else {
                                    varname = "x";
                                }
                            }
                            // Differentiation order
                            if (node.children[1].length >= 3) {
                                order = node.children[1][2].value;
                            } else {
                                order = 1;
                            }
                            // Create node which contains the derivative
                            newNode = codeNode;
                            //newNode = this.removeTrivialNodes(newNode);
                            if (order >= 1) {
                                while(order >= 1){
                                    newNode = this.derivative(newNode, varname);
                                    newNode = this.removeTrivialNodes(newNode);
                                    order--;
                                }
                            }
                            // Replace the node containing e.g. D(f,x) by the derivative.
                            if (parent.type == "node_op" && parent.value == "op_assign") {
                                // If D is an assignment it has to be replaced by a map
                                // h = D(f, x)
                                node2 = this.createNode("node_op", "op_map", vArray, newNode);
                            } else {
                                node2 = newNode;
                            }
                            this.setMath(node2);
                            node.type = node2.type;
                            node.value = node2.value;
                            if (node2.children.length > 0) {
                                node.children[0] = node2.children[0];
                            }
                            if (node2.children.length > 1) {
                                node.children[1] = node2.children[1];
                            }
                        }
                }
                break;
            case "node_var":
            case "node_const":
            case "node_const_bool":
            case "node_str":
                break;
        }
        return node;
    },
    removeTrivialNodes: function(node) {
        var i, len, n0, n1, swap;
        // In case of 'op_execfun' the children[1] node is an array.
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isArray(node)) {
            len = node.length;
            for(i = 0; i < len; ++i){
                node[i] = this.removeTrivialNodes(node[i]);
            }
        }
        if (node.type != "node_op" || !node.children) {
            return node;
        }
        len = node.children.length;
        for(i = 0; i < len; ++i){
            this.mayNotBeSimplified = false;
            do {
                node.children[i] = this.removeTrivialNodes(node.children[i]);
            }while (this.mayNotBeSimplified)
        }
        switch(node.value){
            // Allow maps of the form
            //  map (x) -> x;
            case "op_map":
                n0 = node.children[0];
                n1 = node.children[1];
                if (n1.type == "node_var") {
                    for(i = 0; i < n0.length; ++i){
                        // Allow maps of the form map(x) -> x
                        if (n0[i] == n1.value) {
                            n1.isMath = true;
                            break;
                        }
                    }
                }
                break;
            // a + 0 -> a
            // 0 + a -> a
            case "op_add":
                n0 = node.children[0];
                n1 = node.children[1];
                if (n0.type == "node_const" && n0.value === 0.0) {
                    return n1;
                }
                if (n1.type == "node_const" && n1.value === 0.0) {
                    return n0;
                }
                // const + const -> const
                if (n0.type == "node_const" && n1.type == "node_const") {
                    n0.value += n1.value;
                    return n0;
                }
                break;
            // 1 * a = a
            // a * 1 = a
            // a * 0 = 0
            // 0 * a = 0
            // - * - = +
            // Order children
            case "op_mul":
                n0 = node.children[0];
                n1 = node.children[1];
                if (n0.type == "node_const" && n0.value == 1.0) {
                    return n1;
                }
                if (n1.type == "node_const" && n1.value == 1.0) {
                    return n0;
                }
                if (n0.type == "node_const" && n0.value === 0.0) {
                    return n0;
                }
                if (n1.type == "node_const" && n1.value === 0.0) {
                    return n1;
                }
                if (n1.type == "node_const" && n1.value === 0.0) {
                    return n1;
                }
                // (-a) * (-b) -> a*b
                if (n0.type == "node_op" && n0.value == "op_neg" && n1.type == "node_op" && n1.value == "op_neg") {
                    node.children = [
                        n0.children[0],
                        n1.children[0]
                    ];
                    this.mayNotBeSimplified = true;
                    return node;
                }
                // (-a) * b -> -(a*b)
                if (n0.value == "op_neg" && n1.value != "op_neg") {
                    node.type = "node_op";
                    node.value = "op_neg";
                    node.children = [
                        this.createNode("node_op", "op_mul", n0.children[0], n1)
                    ];
                    this.mayNotBeSimplified = true;
                    return node;
                }
                // a * (-b) -> -(a*b)
                if (n0.value != "op_neg" && n1.value == "op_neg") {
                    node.type = "node_op";
                    node.value = "op_neg";
                    node.children = [
                        this.createNode("node_op", "op_mul", n0, n1.children[0])
                    ];
                    this.mayNotBeSimplified = true;
                    return node;
                }
                // (1 / a) * b -> a / b
                if (n0.value == "op_div" && n0.children[0].type == "node_const" && n0.children[0].value == 1.0) {
                    node.type = "node_op";
                    node.value = "op_div";
                    node.children = [
                        n1,
                        n0.children[1]
                    ];
                    this.mayNotBeSimplified = true;
                    return node;
                }
                // a * (1 / b) -> a / b
                if (n1.value == "op_div" && n1.children[0].type == "node_const" && n1.children[0].value == 1.0) {
                    node.type = "node_op";
                    node.value = "op_div";
                    node.children = [
                        n0,
                        n1.children[1]
                    ];
                    this.mayNotBeSimplified = true;
                    return node;
                }
                // Order children
                // a * const -> const * a
                if (n0.type != "node_const" && n1.type == "node_const") {
                    node.children = [
                        n1,
                        n0
                    ];
                    this.mayNotBeSimplified = true;
                    return node;
                }
                // a + (-const) -> -const + a
                if (n0.type != "node_const" && n1.type == "node_op" && n1.value == "op_neg" && n1.children[0].type == "node_const") {
                    node.children = [
                        n1,
                        n0
                    ];
                    this.mayNotBeSimplified = true;
                    return node;
                }
                // a * var -> var * a
                // a * fun -> fun * a
                if (n0.type == "node_op" && n0.value != "op_execfun" && (n1.type == "node_var" || n1.type == "node_op" && n1.value == "op_execfun")) {
                    node.children = [
                        n1,
                        n0
                    ];
                    this.mayNotBeSimplified = true;
                    return node;
                }
                // a + (-var) -> -var  + a
                if (n0.type != "node_op" && n1.type == "node_op" && n1.value == "op_neg" && n1.children[0].type == "node_var") {
                    node.children = [
                        n1,
                        n0
                    ];
                    this.mayNotBeSimplified = true;
                    return node;
                }
                // a * (const * b) -> const * (a*b)
                // a * (const / b) -> const * (a/b)
                if (n0.type != "node_const" && n1.type == "node_op" && (n1.value == "op_mul" || n1.value == "op_div") && n1.children[0].type == "node_const") {
                    swap = n1.children[0];
                    n1.children[0] = n0;
                    node.children = [
                        swap,
                        n1
                    ];
                    this.mayNotBeSimplified = true;
                    return node;
                }
                // (const * a) * b -> const * (a * b)
                if (n1.type != "node_const" && n0.type == "node_op" && n0.value == "op_mul" && n0.children[0].type == "node_const") {
                    node.children = [
                        n0.children[0],
                        this.createNode("node_op", "op_mul", n0.children[1], n1)
                    ];
                    this.mayNotBeSimplified = true;
                    return node;
                }
                // const * const -> const
                if (n0.type == "node_const" && n1.type == "node_const") {
                    n0.value *= n1.value;
                    return n0;
                }
                // const * (const * a) -> const * a
                // const * (const / a) -> const / a
                if (n0.type == "node_const" && n1.type == "node_op" && (n1.value == "op_mul" || n1.value == "op_div") && n1.children[0].type == "node_const") {
                    n1.children[0].value *= n0.value;
                    return n1;
                }
                // a * a-> a^2
                n0.hash = this.parser.compile(n0);
                n1.hash = this.parser.compile(n1);
                if (n0.hash === n1.hash) {
                    node.value = "op_exp";
                    node.children[1] = this.createNode("node_const", 2.0);
                    return node;
                }
                if (n0.type == "node_const" && n1.type == "node_op" && (n1.value == "op_mul" || n1.value == "op_div") && n1.children[0].type == "node_const") {
                    n1.children[0].value *= n0.value;
                    return n1;
                }
                // a * a^b -> a^(b+1)
                if (n1.type == "node_op" && n1.value == "op_exp") {
                    if (!n0.hash) {
                        n0.hash = this.parser.compile(n0);
                    }
                    if (!n1.children[0].hash) {
                        n1.children[0].hash = this.parser.compile(n1.children[0]);
                    }
                    if (n0.hash === n1.children[0].hash) {
                        n1.children[1] = this.createNode("node_op", "op_add", n1.children[1], this.createNode("node_const", 1.0));
                        this.mayNotBeSimplified = true;
                        return n1;
                    }
                }
                // a^b * a^c -> a^(b+c)
                if (n0.type == "node_op" && n0.value == "op_exp" && n1.type == "node_op" && n1.value == "op_exp") {
                    n0.children[0].hash = this.parser.compile(n0.children[0]);
                    n1.children[0].hash = this.parser.compile(n1.children[0]);
                    if (n0.children[0].hash === n1.children[0].hash) {
                        n0.children[1] = this.createNode("node_op", "op_add", n0.children[1], n1.children[1]);
                        this.mayNotBeSimplified = true;
                        return n0;
                    }
                }
                break;
            // 0 - a -> -a
            // a - 0 -> a
            // a - a -> 0
            case "op_sub":
                n0 = node.children[0];
                n1 = node.children[1];
                if (n0.type == "node_const" && n0.value === 0.0) {
                    node.value = "op_neg";
                    node.children[0] = n1;
                    return node;
                }
                if (n1.type == "node_const" && n1.value === 0.0) {
                    return n0;
                }
                if (n0.type == "node_const" && n1.type == "node_const" && n0.value == n1.value) {
                    return this.createNode("node_const", 0.0);
                }
                if (n0.type == "node_var" && n1.type == "node_var" && n0.value == n1.value) {
                    return this.createNode("node_const", 0.0);
                }
                // const - const -> const
                if (n0.type == "node_const" && n1.type == "node_const") {
                    n0.value -= n1.value;
                    return n0;
                }
                // const * a - const * a -> const * a
                if (n0.type == "node_op" && n0.value == "op_mul" && n1.type == "node_op" && n1.value == "op_mul") {
                    n0.children[1].hash = this.parser.compile(n0.children[1]);
                    n1.children[1].hash = this.parser.compile(n1.children[1]);
                    if (n0.children[1].hash === n1.children[1].hash) {
                        node.value = "op_mul";
                        node.children = [
                            this.createNode("node_op", "op_sub", n0.children[0], n1.children[0]),
                            n0.children[1]
                        ];
                        this.mayNotBeSimplified = true;
                        return node;
                    }
                }
                // const * a - a -> (const - 1) * a
                if (n0.type == "node_op" && n0.value == "op_mul") {
                    n0.children[1].hash = this.parser.compile(n0.children[1]);
                    n1.hash = this.parser.compile(n1);
                    if (n0.children[1].hash === n1.hash) {
                        node.value = "op_mul";
                        node.children = [
                            this.createNode("node_op", "op_sub", n0.children[0], this.createNode("node_const", 1.0)),
                            n1
                        ];
                        this.mayNotBeSimplified = true;
                        return node;
                    }
                }
                // a - const*a -> (const - 1) * a
                if (n1.type == "node_op" && n1.value == "op_mul") {
                    n1.children[1].hash = this.parser.compile(n1.children[1]);
                    n0.hash = this.parser.compile(n0);
                    if (n1.children[1].hash === n0.hash) {
                        node.value = "op_mul";
                        node.children = [
                            this.createNode("node_op", "op_sub", this.createNode("node_const", 1.0), n1.children[0]),
                            n0
                        ];
                        this.mayNotBeSimplified = true;
                        return node;
                    }
                }
                break;
            // -0 -> 0
            // -(-b) = b
            case "op_neg":
                n0 = node.children[0];
                if (n0.type == "node_const" && n0.value === 0.0) {
                    return n0;
                }
                if (n0.type == "node_op" && n0.value == "op_neg") {
                    return n0.children[0];
                }
                break;
            // a / a -> 1, a != 0
            // 0 / a -> 0, a != 0
            // a / 0 -> Infinity, a != 0
            // 0 / 0 -> NaN, a == 0
            case "op_div":
                n0 = node.children[0];
                n1 = node.children[1];
                if (n0.type == "node_const" && n1.type == "node_const" && n0.value == n1.value && n0.value !== 0) {
                    n0.value = 1.0;
                    return n0;
                }
                if (n0.type == "node_const" && n0.value === 0 && n1.type == "node_const" && n1.value !== 0) {
                    n0.value = 0.0;
                    return n0;
                }
                // Risky: 0 / (something != 0) -> 0.0
                if (n0.type == "node_const" && n0.value === 0 && (n1.type == "node_op" || n1.type == "node_var")) {
                    node.type = "node_const";
                    node.value = 0.0;
                    return node;
                }
                if (n0.type == "node_var" && n1.type == "node_var" && n0.value == n1.value) {
                    return this.createNode("node_const", 1.0);
                }
                if (n0.type == "node_const" && n0.value !== 0 && n1.type == "node_const" && n1.value === 0) {
                    if (n0.value > 0.0) {
                        n0.value = Infinity;
                    } else {
                        n0.value = -Infinity; // Do we ever need this?
                    }
                    return n0;
                }
                // (-a) / (-b) -> a/b
                if (n0.type == "node_op" && n0.value == "op_neg" && n1.type == "node_op" && n1.value == "op_neg") {
                    node.children = [
                        n0.children[0],
                        n1.children[0]
                    ];
                    this.mayNotBeSimplified = true;
                    return node;
                }
                // (-a) / b -> -(a/b)
                if (n0.value == "op_neg" && n1.value != "op_neg") {
                    node.type = "node_op";
                    node.value = "op_neg";
                    node.children = [
                        this.createNode("node_op", "op_div", n0.children[0], n1)
                    ];
                    this.mayNotBeSimplified = true;
                    return node;
                }
                // a / (-b) -> -(a/b)
                if (n0.value != "op_neg" && n1.value == "op_neg") {
                    node.type = "node_op";
                    node.value = "op_neg";
                    node.children = [
                        this.createNode("node_op", "op_div", n0, n1.children[0])
                    ];
                    this.mayNotBeSimplified = true;
                    return node;
                }
                // a^b / a -> a^(b-1)
                if (n0.type == "node_op" && n0.value == "op_exp") {
                    if (!n1.hash) {
                        n1.hash = this.parser.compile(n1);
                    }
                    if (!n0.children[0].hash) {
                        n0.children[0].hash = this.parser.compile(n0.children[0]);
                    }
                    if (n1.hash === n0.children[0].hash) {
                        n0.children[1] = this.createNode("node_op", "op_sub", n0.children[1], this.createNode("node_const", 1.0));
                        this.mayNotBeSimplified = true;
                        return n0;
                    }
                }
                // (const * a) / b -> const * (a / b)
                if (n1.type != "node_const" && n0.type == "node_op" && n0.value == "op_mul" && n0.children[0].type == "node_const") {
                    node.value = "op_mul";
                    node.children = [
                        n0.children[0],
                        this.createNode("node_op", "op_div", n0.children[1], n1)
                    ];
                    this.mayNotBeSimplified = true;
                    return node;
                }
                // a^b / a^c -> a^(b-c)
                if (n0.type == "node_op" && n0.value == "op_exp" && n1.type == "node_op" && n1.value == "op_exp") {
                    n0.children[0].hash = this.parser.compile(n0.children[0]);
                    n1.children[0].hash = this.parser.compile(n1.children[0]);
                    if (n0.children[0].hash === n1.children[0].hash) {
                        n0.children[1] = this.createNode("node_op", "op_sub", n0.children[1], n1.children[1]);
                        this.mayNotBeSimplified = true;
                        return n0;
                    }
                }
                break;
            // a^0 = 1
            // a^1 -> a
            // 1^a -> 1
            // 0^a -> 0: a const != 0
            case "op_exp":
                n0 = node.children[0];
                n1 = node.children[1];
                if (n1.type == "node_const" && n1.value === 0.0) {
                    n1.value = 1.0;
                    return n1;
                }
                if (n1.type == "node_const" && n1.value == 1.0) {
                    return n0;
                }
                if (n0.type == "node_const" && n0.value == 1.0) {
                    return n0;
                }
                if (n0.type == "node_const" && n0.value === 0.0 && n1.type == "node_const" && n1.value !== 0.0) {
                    return n0;
                }
                // (a^b)^c -> a^(b*c)
                if (n0.type == "node_op" && n0.value == "op_exp") {
                    node.children = [
                        n0.children[0],
                        this.createNode("node_op", "op_mul", n0.children[1], n1)
                    ];
                    return node;
                }
                break;
        }
        switch(node.value){
            // const_1 + const_2 -> (const_1 + const_2)
            // a + a -> 2*a
            // a + (-b) = a - b
            case "op_add":
                n0 = node.children[0];
                n1 = node.children[1];
                if (n0.type == "node_const" && n1.type == "node_const" && n0.value == n1.value) {
                    n0.value += n1.value;
                    return n0;
                }
                if (n0.type == "node_var" && n1.type == "node_var" && n0.value == n1.value) {
                    node.children[0] = this.createNode("node_const", 2.0);
                    node.value = "op_mul";
                    return node;
                }
                if (n0.type == "node_op" && n0.value == "op_neg") {
                    node.value = "op_sub";
                    node.children[0] = n1;
                    node.children[1] = n0.children[0];
                    this.mayNotBeSimplified = true;
                    return node;
                }
                if (n1.type == "node_op" && n1.value == "op_neg") {
                    node.value = "op_sub";
                    node.children[1] = n1.children[0];
                    this.mayNotBeSimplified = true;
                    return node;
                }
                // const * a + const * a -> const * a
                if (n0.type == "node_op" && n0.value == "op_mul" && n1.type == "node_op" && n1.value == "op_mul") {
                    n0.children[1].hash = this.parser.compile(n0.children[1]);
                    n1.children[1].hash = this.parser.compile(n1.children[1]);
                    if (n0.children[1].hash === n1.children[1].hash) {
                        node.value = "op_mul";
                        node.children = [
                            this.createNode("node_op", "op_add", n0.children[0], n1.children[0]),
                            n0.children[1]
                        ];
                        this.mayNotBeSimplified = true;
                        return node;
                    }
                }
                // const * a + a -> (const + 1) * a
                if (n0.type == "node_op" && n0.value == "op_mul") {
                    n0.children[1].hash = this.parser.compile(n0.children[1]);
                    n1.hash = this.parser.compile(n1);
                    if (n0.children[1].hash === n1.hash) {
                        node.value = "op_mul";
                        node.children = [
                            this.createNode("node_op", "op_add", n0.children[0], this.createNode("node_const", 1.0)),
                            n1
                        ];
                        this.mayNotBeSimplified = true;
                        return node;
                    }
                }
                // a + const*a -> (const + 1) * a
                if (n1.type == "node_op" && n1.value == "op_mul") {
                    n1.children[1].hash = this.parser.compile(n1.children[1]);
                    n0.hash = this.parser.compile(n0);
                    if (n1.children[1].hash === n0.hash) {
                        node.value = "op_mul";
                        node.children = [
                            this.createNode("node_op", "op_add", this.createNode("node_const", 1.0), n1.children[0]),
                            n0
                        ];
                        this.mayNotBeSimplified = true;
                        return node;
                    }
                }
                break;
            // a - (-b) = a + b
            case "op_sub":
                n0 = node.children[0];
                n1 = node.children[1];
                if (n1.type == "node_op" && n1.value == "op_neg") {
                    node.value = "op_add";
                    node.children[1] = n1.children[0];
                    this.mayNotBeSimplified = true;
                    return node;
                }
                break;
            case "op_execfun":
                return this.simplifyElementary(node);
        }
        return node;
    },
    simplifyElementary: function(node) {
        var fun = node.children[0].value, arg = node.children[1];
        // Catch errors of the form sin()
        if (arg.length == 0) {
            return node;
        }
        switch(fun){
            // sin(0) -> 0
            // sin(PI) -> 0
            // sin (int * PI) -> 0
            // sin (PI * int) -> 0
            // Same for tan()
            case "sin":
            case "tan":
                if (arg[0].type == "node_const" && arg[0].value === 0) {
                    node.type = "node_const";
                    node.value = 0.0;
                    return node;
                }
                if (arg[0].type == "node_var" && arg[0].value == "PI") {
                    node.type = "node_const";
                    node.value = 0.0;
                    return node;
                }
                if (arg[0].type == "node_op" && arg[0].value == "op_mul" && arg[0].children[0].type == "node_const" && arg[0].children[0].value % 1 === 0 && arg[0].children[1].type == "node_var" && arg[0].children[1].value == "PI") {
                    node.type = "node_const";
                    node.value = 0.0;
                    return node;
                }
                break;
            // cos(0) -> 1.0
            // cos(PI) -> -1.0
            // cos(int * PI) -> +/- 1.0
            // cos(PI * int) -> +/- 1.0
            case "cos":
                if (arg[0].type == "node_const" && arg[0].value === 0) {
                    node.type = "node_const";
                    node.value = 1.0;
                    return node;
                }
                if (arg[0].type == "node_var" && arg[0].value == "PI") {
                    node.type = "node_op";
                    node.value = "op_neg";
                    node.children = [
                        this.createNode("node_const", 1.0)
                    ];
                    return node;
                }
                break;
            // exp(0) -> 1
            case "exp":
                if (arg[0].type == "node_const" && arg[0].value === 0) {
                    node.type = "node_const";
                    node.value = 1.0;
                    return node;
                }
                break;
            // pow(a, 0) -> 1
            case "pow":
                if (arg[1].type == "node_const" && arg[1].value === 0) {
                    node.type = "node_const";
                    node.value = 1.0;
                    return node;
                }
                break;
        }
        return node;
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].CA;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/parser/3dmodels.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, define: true, Float32Array: true */ /*jslint nomen: true, plusplus: true, bitwise: true*/ /**
 * @fileoverview In this file the namespace JXG.Parse3D is defined.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-ssr] (ecmascript)");
;
// import Type from "../utils/type.js";
/**
 * Namespace Parse3D. Contains parsers for 3D models like STL.
 * @namespace
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Parse3D = {
    /**
     * Parser for the ASCII STL format, see https://en.wikipedia.org/wiki/STL_(file_format).
     * STL stands for stereo-lithography.
     *
     * @param {String} str String containing STL file format
     * @returns {Array} [[vertices, faces], ...] as list of polyhedra. Each entry is the input for a polyhedron3d.
     * @example
     *         const board = JXG.JSXGraph.initBoard(
     *             'jxgbox',
     *             {
     *                 boundingbox: [-8, 8, 8, -8],
     *                 minimizeReflow: 'svg',
     *                 axis: false,
     *                 showNavigation: false,
     *                 zoom: {
     *                     enabled: false
     *                 },
     *                 pan: {
     *                     enabled: false
     *                 }
     *             }
     *         );
     *
     *         var bound = [-1, 2];
     *         var view = board.create(
     *             'view3d',
     *             [[-5, -3], [8, 8],
     *             [bound, bound, bound]],
     *             {
     * 	            axesPosition: 'none',
     *                 projection: 'central',
     *                 trackball: { enabled: true },
     *                 depthOrder: { enabled: true },
     *                 xPlaneRear: { visible: false },
     *                 yPlaneRear: { visible: false },
     *                 zPlaneRear: { fillOpacity: 0.2, visible: true },
     *                 az: {
     *                     slider: {
     *                         visible: true,
     *                         start: 1.54
     *                     }
     *                 }
     *
     *             }
     *         );
     *
     *  // Tetrahedron
     *  var model = `solid m
     *  facet normal 0 0 0
     *    outer loop
     *      vertex 0 0 0
     *      vertex 1 0 0
     *      vertex 1 1 0
     *    endloop
     *   endfacet
     *  facet normal 0 0 0
     *    outer loop
     *      vertex 0 0 0
     *      vertex 1 0 0
     *      vertex 0.5 0.5 1
     *    endloop
     *   endfacet
     *  facet normal 0 0 0
     *    outer loop
     *      vertex 0 0 0
     *      vertex 1 1 0
     *      vertex 0.5 0.5 1
     *    endloop
     *   endfacet
     *  facet normal 0 0 0
     *    outer loop
     *      vertex 1 0 0
     *      vertex 1 1 0
     *      vertex 0.5 0.5 1
     *    endloop
     *   endfacet
     * endsolid m`;
     *
     * var m = JXG.Parse3D.STL(model);
     *
     *  for (let i = 0; i < m.length; i++) {
     *      view.create('polyhedron3d', m[i], {
     *           fillColorArray: [], // ['yellow', 'red', 'green', 'blue'],
     *           layer: 12,
     *           strokeWidth: 0,
     *           shader: {
     *               enabled: true,
     *               type: 'angle',
     *               hue: 0 + 60 * i,
     *               saturation: 90,
     *               minlightness: 60,
     *               maxLightness: 80
     *           },
     *           fillOpacity: 0.8
     *       });
     *   }
     *
     * </pre><div id="JXG8fa8ce22-3613-452f-9775-69588a1c1e34" class="jxgbox" style="width: 300px; height: 300px;"></div>
     * <script type="text/javascript">
     *     (function() {
     *         var board = JXG.JSXGraph.initBoard('JXG8fa8ce22-3613-452f-9775-69588a1c1e34', {
     *                     showcopyright: false, shownavigation: false,
     *                     boundingbox: [-8, 8, 8, -8],
     *                     minimizeReflow: 'svg',
     *                     axis: false,
     *                     showNavigation: false,
     *                     zoom: {
     *                         enabled: false
     *                     },
     *                     pan: {
     *                         enabled: false
     *                     }
     *                 }
     *             );
     *
     *             var bound = [-1, 2]; // Tetrahedron
     *             var view = board.create(
     *                 'view3d',
     *                 [[-5, -3], [8, 8],
     *                 [bound, bound, bound]],
     *                 {
     *     	               axesPosition: 'none',
     *                     projection: 'central',
     *                     trackball: { enabled: true },
     *                     depthOrder: { enabled: true },
     *                     xPlaneRear: { visible: false },
     *                     yPlaneRear: { visible: false },
     *                     zPlaneRear: { fillOpacity: 0.2, visible: true },
     *                     az: {
     *                         slider: {
     *                             visible: true,
     *                             start: 1.54
     *                         }
     *                     }
     *
     *                 }
     *             );
     *
     *   // Tetrahedron
     *   var model = `solid m
     *      facet normal 0 0 0
     *        outer loop
     *          vertex 0 0 0
     *          vertex 1 0 0
     *          vertex 1 1 0
     *        endloop
     *       endfacet
     *      facet normal 0 0 0
     *        outer loop
     *          vertex 0 0 0
     *          vertex 1 0 0
     *          vertex 0.5 0.5 1
     *        endloop
     *       endfacet
     *      facet normal 0 0 0
     *        outer loop
     *          vertex 0 0 0
     *          vertex 1 1 0
     *          vertex 0.5 0.5 1
     *        endloop
     *       endfacet
     *      facet normal 0 0 0
     *        outer loop
     *          vertex 1 0 0
     *          vertex 1 1 0
     *          vertex 0.5 0.5 1
     *        endloop
     *       endfacet
     *     endsolid m`;
     *
     *             var m = JXG.Parse3D.STL(model);
     *
     *  for (let i = 0; i < m.length; i++) {
     *      view.create('polyhedron3d', m[i], {
     *           fillColorArray: [], // ['yellow', 'red', 'green', 'blue'],
     *           layer: 12,
     *           strokeWidth: 0,
     *           shader: {
     *               enabled: true,
     *               type: 'angle',
     *               hue: 0 + 60 * i,
     *               saturation: 90,
     *               minlightness: 60,
     *               maxLightness: 80
     *           },
     *           fillOpacity: 0.8
     *       });
     *   }
     *     })();
     *
     * </script><pre>
     *
     */ STL: function(str) {
        var i, j, pos, le, li, lines, coords, face_num, found, polyhedra = [], vertices = [], faces = [];
        lines = str.split('\n');
        le = lines.length;
        for(i = 0; i < le; i++){
            li = lines[i].trim();
            if (li.indexOf('solid') === 0) {
                // New model
                face_num = -1;
                vertices = [];
                faces = [];
            } else if (li.indexOf('endsolid') === 0) {
                polyhedra.push([
                    vertices.slice(),
                    faces.slice()
                ]);
            // break;
            } else if (li.indexOf('facet') === 0) {
                face_num++;
                faces.push([]);
            } else if (li.indexOf('outer loop') === 0 || li.indexOf('endloop') === 0) {
                continue;
            } else if (li.indexOf('vertex') === 0) {
                coords = li.split(' ').slice(1).map((x)=>parseFloat(x));
                found = false;
                for(j = 0; j < vertices.length; j++){
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Math.Geometry.distance(vertices[j], coords, 3) < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Math.eps) {
                        // Debug:
                        // console.log("Point already defined")
                        found = true;
                        pos = j;
                        break;
                    }
                }
                if (found === false) {
                    pos = vertices.length;
                    vertices.push(coords);
                }
                faces[face_num].push(pos);
            }
        }
        // console.log('v:', vertices.length, 'f:', faces.length)
        // return [vertices, faces];
        return polyhedra;
    }
};
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Parse3D;
}),
];

//# sourceMappingURL=c0305_jsxgraph_src_parser_493b84a0._.js.map