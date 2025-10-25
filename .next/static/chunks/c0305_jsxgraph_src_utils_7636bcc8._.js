(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, define: true, html_sanitize: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview type.js contains several functions to help deal with javascript's weak types.
 * This file mainly consists of detector functions which verify if a variable is or is not of
 * a specific type and converter functions that convert variables to another type or normalize
 * the type of a variable.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-client] (ecmascript)");
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], /** @lends JXG */ {
    /**
         * Checks if the given object is an JSXGraph board.
         * @param {Object} v
         * @returns {Boolean}
         */ isBoard: function(v) {
        return v !== null && typeof v === "object" && this.isNumber(v.BOARD_MODE_NONE) && this.isObject(v.objects) && this.isObject(v.jc) && this.isFunction(v.update) && !!v.containerObj && this.isString(v.id);
    },
    /**
         * Checks if the given string is an id within the given board.
         * @param {JXG.Board} board
         * @param {String} s
         * @returns {Boolean}
         */ isId: function(board, s) {
        return typeof s === "string" && !!board.objects[s];
    },
    /**
         * Checks if the given string is a name within the given board.
         * @param {JXG.Board} board
         * @param {String} s
         * @returns {Boolean}
         */ isName: function(board, s) {
        return typeof s === "string" && !!board.elementsByName[s];
    },
    /**
         * Checks if the given string is a group id within the given board.
         * @param {JXG.Board} board
         * @param {String} s
         * @returns {Boolean}
         */ isGroup: function(board, s) {
        return typeof s === "string" && !!board.groups[s];
    },
    /**
         * Checks if the value of a given variable is of type string.
         * @param v A variable of any type.
         * @returns {Boolean} True, if v is of type string.
         */ isString: function(v) {
        return typeof v === "string";
    },
    /**
         * Checks if the value of a given variable is of type number.
         * @param v A variable of any type.
         * @param {Boolean} [acceptStringNumber=false] If set to true, the function returns true for e.g. v='3.1415'.
         * @param {Boolean} [acceptNaN=true] If set to false, the function returns false for v=NaN.
         * @returns {Boolean} True, if v is of type number.
         */ isNumber: function(v, acceptStringNumber, acceptNaN) {
        var result = typeof v === 'number' || Object.prototype.toString.call(v) === '[Object Number]';
        acceptStringNumber = acceptStringNumber || false;
        acceptNaN = acceptNaN === undefined ? true : acceptNaN;
        if (acceptStringNumber) {
            result = result || '' + parseFloat(v) === v;
        }
        if (!acceptNaN) {
            result = result && !isNaN(v);
        }
        return result;
    },
    /**
         * Checks if a given variable references a function.
         * @param v A variable of any type.
         * @returns {Boolean} True, if v is a function.
         */ isFunction: function(v) {
        return typeof v === "function";
    },
    /**
         * Checks if a given variable references an array.
         * @param v A variable of any type.
         * @returns {Boolean} True, if v is of type array.
         */ isArray: function(v) {
        var r;
        // use the ES5 isArray() method and if that doesn't exist use a fallback.
        if (Array.isArray) {
            r = Array.isArray(v);
        } else {
            r = v !== null && typeof v === "object" && typeof v.splice === "function" && typeof v.join === "function";
        }
        return r;
    },
    /**
         * Tests if the input variable is an Object
         * @param v
         */ isObject: function(v) {
        return typeof v === "object" && !this.isArray(v);
    },
    /**
         * Tests if the input variable is a DOM Document or DocumentFragment node
         * @param v A variable of any type
         */ isDocumentOrFragment: function(v) {
        return this.isObject(v) && (v.nodeType === 9 || // Node.DOCUMENT_NODE
        v.nodeType === 11 // Node.DOCUMENT_FRAGMENT_NODE
        );
    },
    /**
         * Checks if a given variable is a reference of a JSXGraph Point element.
         * @param v A variable of any type.
         * @returns {Boolean} True, if v is of type JXG.Point.
         */ isPoint: function(v) {
        if (v !== null && typeof v === "object" && this.exists(v.elementClass)) {
            return v.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_POINT;
        }
        return false;
    },
    /**
         * Checks if a given variable is a reference of a JSXGraph Point3D element.
         * @param v A variable of any type.
         * @returns {Boolean} True, if v is of type JXG.Point3D.
         */ isPoint3D: function(v) {
        if (v !== null && typeof v === "object" && this.exists(v.type)) {
            return v.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_POINT3D;
        }
        return false;
    },
    /**
         * Checks if a given variable is a reference of a JSXGraph Point element or an array of length at least two or
         * a function returning an array of length two or three.
         * @param {JXG.Board} board
         * @param v A variable of any type.
         * @returns {Boolean} True, if v is of type JXG.Point.
         */ isPointType: function(board, v) {
        var val, p;
        if (this.isArray(v)) {
            return true;
        }
        if (this.isFunction(v)) {
            val = v();
            if (this.isArray(val) && val.length > 1) {
                return true;
            }
        }
        p = board.select(v);
        return this.isPoint(p);
    },
    /**
         * Checks if a given variable is a reference of a JSXGraph Point3D element or an array of length three
         * or a function returning an array of length three.
         * @param {JXG.Board} board
         * @param v A variable of any type.
         * @returns {Boolean} True, if v is of type JXG.Point3D or an array of length at least 3, or a function returning
         * such an array.
         */ isPointType3D: function(board, v) {
        var val, p;
        if (this.isArray(v) && v.length >= 3) {
            return true;
        }
        if (this.isFunction(v)) {
            val = v();
            if (this.isArray(val) && val.length >= 3) {
                return true;
            }
        }
        p = board.select(v);
        return this.isPoint3D(p);
    },
    /**
         * Checks if a given variable is a reference of a JSXGraph transformation element or an array
         * of JSXGraph transformation elements.
         * @param v A variable of any type.
         * @returns {Boolean} True, if v is of type JXG.Transformation.
         */ isTransformationOrArray: function(v) {
        if (v !== null) {
            if (this.isArray(v) && v.length > 0) {
                return this.isTransformationOrArray(v[0]);
            }
            if (typeof v === "object") {
                return v.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_TRANSFORMATION;
            }
        }
        return false;
    },
    /**
         * Checks if v is an empty object or empty.
         * @param v {Object|Array}
         * @returns {boolean} True, if v is an empty object or array.
         */ isEmpty: function(v) {
        return Object.keys(v).length === 0;
    },
    /**
         * Checks if a given variable is neither undefined nor null. You should not use this together with global
         * variables!
         * @param v A variable of any type.
         * @param {Boolean} [checkEmptyString=false] If set to true, it is also checked whether v is not equal to ''.
         * @returns {Boolean} True, if v is neither undefined nor null.
         */ exists: function(v, checkEmptyString) {
        /* eslint-disable eqeqeq */ var result = !(v == undefined || v === null);
        /* eslint-enable eqeqeq */ checkEmptyString = checkEmptyString || false;
        if (checkEmptyString) {
            return result && v !== "";
        }
        return result;
    },
    // exists: (function (undef) {
    //     return function (v, checkEmptyString) {
    //         var result = !(v === undef || v === null);
    //         checkEmptyString = checkEmptyString || false;
    //         if (checkEmptyString) {
    //             return result && v !== '';
    //         }
    //         return result;
    //     };
    // }()),
    /**
         * Handle default parameters.
         * @param v Given value
         * @param d Default value
         * @returns <tt>d</tt>, if <tt>v</tt> is undefined or null.
         */ def: function(v, d) {
        if (this.exists(v)) {
            return v;
        }
        return d;
    },
    /**
         * Converts a string containing either <strong>true</strong> or <strong>false</strong> into a boolean value.
         * @param {String} s String containing either <strong>true</strong> or <strong>false</strong>.
         * @returns {Boolean} String typed boolean value converted to boolean.
         */ str2Bool: function(s) {
        if (!this.exists(s)) {
            return true;
        }
        if (typeof s === "boolean") {
            return s;
        }
        if (this.isString(s)) {
            return s.toLowerCase() === "true";
        }
        return false;
    },
    /**
         * Converts a given CSS style string into a JavaScript object.
         * @param {String} styles String containing CSS styles.
         * @returns {Object} Object containing CSS styles.
         */ cssParse: function(styles) {
        var str = styles;
        if (!this.isString(str)) return {};
        str = str.replace(/\s*;\s*$/g, '');
        str = str.replace(/\s*;\s*/g, '","');
        str = str.replace(/\s*:\s*/g, '":"');
        str = str.trim();
        str = '{"' + str + '"}';
        return JSON.parse(str);
    },
    /**
         * Converts a given object into a CSS style string.
         * @param {Object} styles Object containing CSS styles.
         * @returns {String} String containing CSS styles.
         */ cssStringify: function(styles) {
        var str = '', attr, val;
        if (!this.isObject(styles)) return '';
        for(attr in styles){
            if (!styles.hasOwnProperty(attr)) continue;
            val = styles[attr];
            if (!this.isString(val) && !this.isNumber(val)) continue;
            str += attr + ':' + val + '; ';
        }
        str = str.trim();
        return str;
    },
    /**
         * Convert a String, a number or a function into a function. This method is used in Transformation.js
         * @param {JXG.Board} board Reference to a JSXGraph board. It is required to resolve dependencies given
         * by a JessieCode string, thus it must be a valid reference only in case one of the param
         * values is of type string.
         * @param {Array} param An array containing strings, numbers, or functions.
         * @param {Number} n Length of <tt>param</tt>.
         * @returns {Function} A function taking one parameter k which specifies the index of the param element
         * to evaluate.
         */ createEvalFunction: function(board, param, n) {
        var f = [], func, i, e, deps = {};
        for(i = 0; i < n; i++){
            f[i] = this.createFunction(param[i], board);
            for(e in f[i].deps){
                deps[e] = f[i].deps;
            }
        }
        func = function(k) {
            return f[k]();
        };
        func.deps = deps;
        return func;
    },
    /**
         * Convert a String, number or function into a function.
         * @param {String|Number|Function} term A variable of type string, function or number.
         * @param {JXG.Board} board Reference to a JSXGraph board. It is required to resolve dependencies given
         * by a JessieCode/GEONE<sub>X</sub>T string, thus it must be a valid reference only in case one of the param
         * values is of type string.
         * @param {String} variableName Only required if function is supplied as JessieCode string or evalGeonext is set to true.
         * Describes the variable name of the variable in a JessieCode/GEONE<sub>X</sub>T string given as term.
         * @param {Boolean} [evalGeonext=false] Obsolete and ignored! Set this true
         * if term should be treated as a GEONE<sub>X</sub>T string.
         * @returns {Function} A function evaluating the value given by term or null if term is not of type string,
         * function or number.
         */ createFunction: function(term, board, variableName, evalGeonext) {
        var f = null;
        // if ((!this.exists(evalGeonext) || evalGeonext) && this.isString(term)) {
        if (this.isString(term)) {
            // Convert GEONExT syntax into  JavaScript syntax
            //newTerm = JXG.GeonextParser.geonext2JS(term, board);
            //return new Function(variableName,'return ' + newTerm + ';');
            //term = JXG.GeonextParser.replaceNameById(term, board);
            //term = JXG.GeonextParser.geonext2JS(term, board);
            f = board.jc.snippet(term, true, variableName, false);
        } else if (this.isFunction(term)) {
            f = term;
            f.deps = this.isObject(term.deps) ? term.deps : {};
        } else if (this.isNumber(term) || this.isArray(term)) {
            /** @ignore */ f = function() {
                return term;
            };
            f.deps = {};
        // } else if (this.isString(term)) {
        //     // In case of string function like fontsize
        //     /** @ignore */
        //     f = function () { return term; };
        //     f.deps = {};
        }
        if (f !== null) {
            f.origin = term;
        }
        return f;
    },
    /**
         *  Test if the parents array contains existing points. If instead parents contains coordinate arrays or
         *  function returning coordinate arrays
         *  free points with these coordinates are created.
         *
         * @param {JXG.Board} board Board object
         * @param {Array} parents Array containing parent elements for a new object. This array may contain
         *    <ul>
         *      <li> {@link JXG.Point} objects
         *      <li> {@link JXG.GeometryElement#name} of {@link JXG.Point} objects
         *      <li> {@link JXG.GeometryElement#id} of {@link JXG.Point} objects
         *      <li> Coordinates of points given as array of numbers of length two or three, e.g. [2, 3].
         *      <li> Coordinates of points given as array of functions of length two or three. Each function returns one coordinate, e.g.
         *           [function(){ return 2; }, function(){ return 3; }]
         *      <li> Function returning coordinates, e.g. function() { return [2, 3]; }
         *    </ul>
         *  In the last three cases a new point will be created.
         * @param {String} attrClass Main attribute class of newly created points, see {@link JXG#copyAttributes}
         * @param {Array} attrArray List of subtype attributes for the newly created points. The list of subtypes is mapped to the list of new points.
         * @returns {Array} List of newly created {@link JXG.Point} elements or false if not all returned elements are points.
         */ providePoints: function(board, parents, attributes, attrClass, attrArray) {
        var i, j, len, lenAttr = 0, points = [], attr, val;
        if (!this.isArray(parents)) {
            parents = [
                parents
            ];
        }
        len = parents.length;
        if (this.exists(attrArray)) {
            lenAttr = attrArray.length;
        }
        if (lenAttr === 0) {
            attr = this.copyAttributes(attributes, board.options, attrClass);
        }
        for(i = 0; i < len; ++i){
            if (lenAttr > 0) {
                j = Math.min(i, lenAttr - 1);
                attr = this.copyAttributes(attributes, board.options, attrClass, attrArray[j].toLowerCase());
            }
            if (this.isArray(parents[i]) && parents[i].length > 1) {
                points.push(board.create("point", parents[i], attr));
                points[points.length - 1]._is_new = true;
            } else if (this.isFunction(parents[i])) {
                val = parents[i]();
                if (this.isArray(val) && val.length > 1) {
                    points.push(board.create("point", [
                        parents[i]
                    ], attr));
                    points[points.length - 1]._is_new = true;
                }
            } else {
                points.push(board.select(parents[i]));
            }
            if (!this.isPoint(points[i])) {
                return false;
            }
        }
        return points;
    },
    /**
         *  Test if the parents array contains existing points. If instead parents contains coordinate arrays or
         *  function returning coordinate arrays
         *  free points with these coordinates are created.
         *
         * @param {JXG.View3D} view View3D object
         * @param {Array} parents Array containing parent elements for a new object. This array may contain
         *    <ul>
         *      <li> {@link JXG.Point3D} objects
         *      <li> {@link JXG.GeometryElement#name} of {@link JXG.Point3D} objects
         *      <li> {@link JXG.GeometryElement#id} of {@link JXG.Point3D} objects
         *      <li> Coordinates of 3D points given as array of numbers of length three, e.g. [2, 3, 1].
         *      <li> Coordinates of 3D points given as array of functions of length three. Each function returns one coordinate, e.g.
         *           [function(){ return 2; }, function(){ return 3; }, function(){ return 1; }]
         *      <li> Function returning coordinates, e.g. function() { return [2, 3, 1]; }
         *    </ul>
         *  In the last three cases a new 3D point will be created.
         * @param {String} attrClass Main attribute class of newly created 3D points, see {@link JXG#copyAttributes}
         * @param {Array} attrArray List of subtype attributes for the newly created 3D points. The list of subtypes is mapped to the list of new 3D points.
         * @returns {Array} List of newly created {@link JXG.Point3D} elements or false if not all returned elements are 3D points.
         */ providePoints3D: function(view, parents, attributes, attrClass, attrArray) {
        var i, j, len, lenAttr = 0, points = [], attr, val;
        if (!this.isArray(parents)) {
            parents = [
                parents
            ];
        }
        len = parents.length;
        if (this.exists(attrArray)) {
            lenAttr = attrArray.length;
        }
        if (lenAttr === 0) {
            attr = this.copyAttributes(attributes, view.board.options, attrClass);
        }
        for(i = 0; i < len; ++i){
            if (lenAttr > 0) {
                j = Math.min(i, lenAttr - 1);
                attr = this.copyAttributes(attributes, view.board.options, attrClass, attrArray[j]);
            }
            if (this.isArray(parents[i]) && parents[i].length > 0 && parents[i].every((x)=>this.isArray(x) && this.isNumber(x[0]))) {
                // Testing for array-of-arrays-of-numbers, like [[1,2,3],[2,3,4]]
                for(j = 0; j < parents[i].length; j++){
                    points.push(view.create("point3d", parents[i][j], attr));
                    ;
                    points[points.length - 1]._is_new = true;
                }
            } else if (this.isArray(parents[i]) && parents[i].every((x)=>this.isNumber(x) || this.isFunction(x))) {
                // Single array [1,2,3]
                points.push(view.create("point3d", parents[i], attr));
                points[points.length - 1]._is_new = true;
            } else if (this.isPoint3D(parents[i])) {
                points.push(parents[i]);
            } else if (this.isFunction(parents[i])) {
                val = parents[i]();
                if (this.isArray(val) && val.length > 1) {
                    points.push(view.create("point3d", [
                        parents[i]
                    ], attr));
                    points[points.length - 1]._is_new = true;
                }
            } else {
                points.push(view.select(parents[i]));
            }
            if (!this.isPoint3D(points[i])) {
                return false;
            }
        }
        return points;
    },
    /**
         * Generates a function which calls the function fn in the scope of owner.
         * @param {Function} fn Function to call.
         * @param {Object} owner Scope in which fn is executed.
         * @returns {Function} A function with the same signature as fn.
         */ bind: function(fn, owner) {
        return function() {
            return fn.apply(owner, arguments);
        };
    },
    /**
         * If <tt>val</tt> is a function, it will be evaluated without giving any parameters, else the input value
         * is just returned.
         * @param val Could be anything. Preferably a number or a function.
         * @returns If <tt>val</tt> is a function, it is evaluated and the result is returned. Otherwise <tt>val</tt> is returned.
         */ evaluate: function(val) {
        if (this.isFunction(val)) {
            return val();
        }
        return val;
    },
    /**
         * Search an array for a given value.
         * @param {Array} array
         * @param value
         * @param {String} [sub] Use this property if the elements of the array are objects.
         * @returns {Number} The index of the first appearance of the given value, or
         * <tt>-1</tt> if the value was not found.
         */ indexOf: function(array, value, sub) {
        var i, s = this.exists(sub);
        if (Array.indexOf && !s) {
            return array.indexOf(value);
        }
        for(i = 0; i < array.length; i++){
            if (s && array[i][sub] === value || !s && array[i] === value) {
                return i;
            }
        }
        return -1;
    },
    /**
         * Eliminates duplicate entries in an array consisting of numbers and strings.
         * @param {Array} a An array of numbers and/or strings.
         * @returns {Array} The array with duplicate entries eliminated.
         */ eliminateDuplicates: function(a) {
        var i, len = a.length, result = [], obj = {};
        for(i = 0; i < len; i++){
            obj[a[i]] = 0;
        }
        for(i in obj){
            if (obj.hasOwnProperty(i)) {
                result.push(i);
            }
        }
        return result;
    },
    /**
         * Swaps to array elements.
         * @param {Array} arr
         * @param {Number} i
         * @param {Number} j
         * @returns {Array} Reference to the given array.
         */ swap: function(arr, i, j) {
        var tmp;
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
        return arr;
    },
    /**
         * Generates a copy of an array and removes the duplicate entries. The original
         * Array will be altered.
         * @param {Array} arr
         * @returns {Array}
         */ uniqueArray: function(arr) {
        var i, j, isArray, ret = [];
        if (arr.length === 0) {
            return [];
        }
        for(i = 0; i < arr.length; i++){
            isArray = this.isArray(arr[i]);
            if (!this.exists(arr[i])) {
                arr[i] = "";
                continue;
            }
            for(j = i + 1; j < arr.length; j++){
                if (isArray && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cmpArrays(arr[i], arr[j])) {
                    arr[i] = [];
                } else if (!isArray && arr[i] === arr[j]) {
                    arr[i] = "";
                }
            }
        }
        j = 0;
        for(i = 0; i < arr.length; i++){
            isArray = this.isArray(arr[i]);
            if (!isArray && arr[i] !== "") {
                ret[j] = arr[i];
                j++;
            } else if (isArray && arr[i].length !== 0) {
                ret[j] = arr[i].slice(0);
                j++;
            }
        }
        arr = ret;
        return ret;
    },
    /**
         * Checks if an array contains an element equal to <tt>val</tt> but does not check the type!
         * @param {Array} arr
         * @param val
         * @returns {Boolean}
         */ isInArray: function(arr, val) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].indexOf(arr, val) > -1;
    },
    /**
         * Converts an array of {@link JXG.Coords} objects into a coordinate matrix.
         * @param {Array} coords
         * @param {Boolean} split
         * @returns {Array}
         */ coordsArrayToMatrix: function(coords, split) {
        var i, x = [], m = [];
        for(i = 0; i < coords.length; i++){
            if (split) {
                x.push(coords[i].usrCoords[1]);
                m.push(coords[i].usrCoords[2]);
            } else {
                m.push([
                    coords[i].usrCoords[1],
                    coords[i].usrCoords[2]
                ]);
            }
        }
        if (split) {
            m = [
                x,
                m
            ];
        }
        return m;
    },
    /**
         * Compare two arrays.
         * @param {Array} a1
         * @param {Array} a2
         * @returns {Boolean} <tt>true</tt>, if the arrays coefficients are of same type and value.
         */ cmpArrays: function(a1, a2) {
        var i;
        // trivial cases
        if (a1 === a2) {
            return true;
        }
        if (a1.length !== a2.length) {
            return false;
        }
        for(i = 0; i < a1.length; i++){
            if (this.isArray(a1[i]) && this.isArray(a2[i])) {
                if (!this.cmpArrays(a1[i], a2[i])) {
                    return false;
                }
            } else if (a1[i] !== a2[i]) {
                return false;
            }
        }
        return true;
    },
    /**
         * Removes an element from the given array
         * @param {Array} ar
         * @param el
         * @returns {Array}
         */ removeElementFromArray: function(ar, el) {
        var i;
        for(i = 0; i < ar.length; i++){
            if (ar[i] === el) {
                ar.splice(i, 1);
                return ar;
            }
        }
        return ar;
    },
    /**
         * Truncate a number <tt>n</tt> after <tt>p</tt> decimals.
         * @param {Number} n
         * @param {Number} p
         * @returns {Number}
         */ trunc: function(n, p) {
        p = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].def(p, 0);
        return this.toFixed(n, p);
    },
    /**
         * Decimal adjustment of a number.
         * From https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/round
         *
         * @param    {String}    type    The type of adjustment.
         * @param    {Number}    value    The number.
         * @param    {Number}    exp        The exponent (the 10 logarithm of the adjustment base).
         * @returns    {Number}            The adjusted value.
         *
         * @private
         */ _decimalAdjust: function(type, value, exp) {
        // If the exp is undefined or zero...
        if (exp === undefined || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split("e");
        value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
        // Shift back
        value = value.toString().split("e");
        return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
    },
    /**
         * Round a number to given number of decimal digits.
         *
         * Example: JXG._toFixed(3.14159, -2) gives 3.14
         * @param  {Number} value Number to be rounded
         * @param  {Number} exp   Number of decimal digits given as negative exponent
         * @return {Number}       Rounded number.
         *
         * @private
         */ _round10: function(value, exp) {
        return this._decimalAdjust("round", value, exp);
    },
    /**
         * "Floor" a number to given number of decimal digits.
         *
         * Example: JXG._toFixed(3.14159, -2) gives 3.14
         * @param  {Number} value Number to be floored
         * @param  {Number} exp   Number of decimal digits given as negative exponent
         * @return {Number}       "Floored" number.
         *
         * @private
         */ _floor10: function(value, exp) {
        return this._decimalAdjust("floor", value, exp);
    },
    /**
         * "Ceil" a number to given number of decimal digits.
         *
         * Example: JXG._toFixed(3.14159, -2) gives 3.15
         * @param  {Number} value Number to be ceiled
         * @param  {Number} exp   Number of decimal digits given as negative exponent
         * @return {Number}       "Ceiled" number.
         *
         * @private
         */ _ceil10: function(value, exp) {
        return this._decimalAdjust("ceil", value, exp);
    },
    /**
         * Replacement of the default toFixed() method.
         * It does a correct rounding (independent of the browser) and
         * returns "0.00" for toFixed(-0.000001, 2) instead of "-0.00" which
         * is returned by JavaScript's toFixed()
         *
         * @memberOf JXG
         * @param  {Number} num    Number tp be rounded
         * @param  {Number} digits Decimal digits
         * @return {String}        Rounded number is returned as string
         */ toFixed: function(num, digits) {
        return this._round10(num, -digits).toFixed(digits);
    },
    /**
         * Truncate a number <tt>val</tt> automatically.
         * @memberOf JXG
         * @param val
         * @returns {Number}
         */ autoDigits: function(val) {
        var x = Math.abs(val), str;
        if (x >= 0.1) {
            str = this.toFixed(val, 2);
        } else if (x >= 0.01) {
            str = this.toFixed(val, 4);
        } else if (x >= 0.0001) {
            str = this.toFixed(val, 6);
        } else {
            str = val;
        }
        return str;
    },
    /**
         * Convert value v. If v has the form
         * <ul>
         * <li> 'x%': return floating point number x * percentOfWhat * 0.01
         * <li> 'xfr': return floating point number x * percentOfWhat
         * <li> 'xpx': return x * convertPx or convertPx(x) or x
         * <li> x or 'x': return floating point number x
         * </ul>
         * @param {String|Number} v
         * @param {Number} percentOfWhat
         * @param {Function|Number|*} convertPx
         * @returns {String|Number}
         */ parseNumber: function(v, percentOfWhat, convertPx) {
        var str;
        if (this.isString(v) && v.indexOf('%') > -1) {
            str = v.replace(/\s+%\s+/, '');
            return parseFloat(str) * percentOfWhat * 0.01;
        }
        if (this.isString(v) && v.indexOf('fr') > -1) {
            str = v.replace(/\s+fr\s+/, '');
            return parseFloat(str) * percentOfWhat;
        }
        if (this.isString(v) && v.indexOf('px') > -1) {
            str = v.replace(/\s+px\s+/, '');
            str = parseFloat(str);
            if (this.isFunction(convertPx)) {
                return convertPx(str);
            } else if (this.isNumber(convertPx)) {
                return str * convertPx;
            } else {
                return str;
            }
        }
        // Number or String containing no unit
        return parseFloat(v);
    },
    /**
         * Parse a string for label positioning of the form 'left pos' or 'pos right'
         * and return e.g.
         * <tt>{ side: 'left', pos: 'pos' }</tt>.
         * @param {String} str
         * @returns {Obj}  <tt>{ side, pos }</tt>
         */ parsePosition: function(str) {
        var a, i, side = '', pos = '';
        str = str.trim();
        if (str !== '') {
            a = str.split(/[ ,]+/);
            for(i = 0; i < a.length; i++){
                if (a[i] === 'left' || a[i] === 'right') {
                    side = a[i];
                } else {
                    pos = a[i];
                }
            }
        }
        return {
            side: side,
            pos: pos
        };
    },
    /**
         * Extracts the keys of a given object.
         * @param object The object the keys are to be extracted
         * @param onlyOwn If true, hasOwnProperty() is used to verify that only keys are collected
         * the object owns itself and not some other object in the prototype chain.
         * @returns {Array} All keys of the given object.
         */ keys: function(object, onlyOwn) {
        var keys = [], property;
        // the caller decides if we use hasOwnProperty
        /*jslint forin:true*/ for(property in object){
            if (onlyOwn) {
                if (object.hasOwnProperty(property)) {
                    keys.push(property);
                }
            } else {
                keys.push(property);
            }
        }
        /*jslint forin:false*/ return keys;
    },
    /**
         * This outputs an object with a base class reference to the given object. This is useful if
         * you need a copy of an e.g. attributes object and want to overwrite some of the attributes
         * without changing the original object.
         * @param {Object} obj Object to be embedded.
         * @returns {Object} An object with a base class reference to <tt>obj</tt>.
         */ clone: function(obj) {
        var cObj = {};
        cObj.prototype = obj;
        return cObj;
    },
    /**
         * Embeds an existing object into another one just like {@link #clone} and copies the contents of the second object
         * to the new one. Warning: The copied properties of obj2 are just flat copies.
         * @param {Object} obj Object to be copied.
         * @param {Object} obj2 Object with data that is to be copied to the new one as well.
         * @returns {Object} Copy of given object including some new/overwritten data from obj2.
         */ cloneAndCopy: function(obj, obj2) {
        var r, cObj = function() {
            return undefined;
        };
        cObj.prototype = obj;
        // no hasOwnProperty on purpose
        /*jslint forin:true*/ /*jshint forin:true*/ for(r in obj2){
            cObj[r] = obj2[r];
        }
        /*jslint forin:false*/ /*jshint forin:false*/ return cObj;
    },
    /**
         * Recursively merges obj2 into obj1 in-place. Contrary to {@link JXG#deepCopy} this won't create a new object
         * but instead will overwrite obj1.
         * <p>
         * In contrast to method JXG.mergeAttr, merge recurses into any kind of object, e.g. DOM object and JSXGraph objects.
         * So, please be careful.
         * @param {Object} obj1
         * @param {Object} obj2
         * @returns {Object}
         * @see JXG.mergeAttr
         *
         * @example
         * JXG.Options = JXG.merge(JXG.Options, {
         *     board: {
         *         showNavigation: false,
         *         showInfobox: true
         *     },
         *     point: {
         *         face: 'o',
         *         size: 4,
         *         fillColor: '#eeeeee',
         *         highlightFillColor: '#eeeeee',
         *         strokeColor: 'white',
         *         highlightStrokeColor: 'white',
         *         showInfobox: 'inherit'
         *     }
         * });
         *
         * </pre><div id="JXGc5bf0f2a-bd5a-4612-97c2-09f17b1bbc6b" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXGc5bf0f2a-bd5a-4612-97c2-09f17b1bbc6b',
         *             {boundingbox: [-8, 8, 8,-8], axis: true, showcopyright: false, shownavigation: false});
         *     JXG.Options = JXG.merge(JXG.Options, {
         *         board: {
         *             showNavigation: false,
         *             showInfobox: true
         *         },
         *         point: {
         *             face: 'o',
         *             size: 4,
         *             fillColor: '#eeeeee',
         *             highlightFillColor: '#eeeeee',
         *             strokeColor: 'white',
         *             highlightStrokeColor: 'white',
         *             showInfobox: 'inherit'
         *         }
         *     });
         *
         *
         *     })();
         *
         * </script><pre>
         */ merge: function(obj1, obj2) {
        var i, j, o, oo;
        for(i in obj2){
            if (obj2.hasOwnProperty(i)) {
                o = obj2[i];
                if (this.isArray(o)) {
                    if (!obj1[i]) {
                        obj1[i] = [];
                    }
                    for(j = 0; j < o.length; j++){
                        oo = obj2[i][j];
                        if (typeof obj2[i][j] === 'object') {
                            obj1[i][j] = this.merge(obj1[i][j], oo);
                        } else {
                            obj1[i][j] = obj2[i][j];
                        }
                    }
                } else if (typeof o === 'object') {
                    if (!obj1[i]) {
                        obj1[i] = {};
                    }
                    obj1[i] = this.merge(obj1[i], o);
                } else {
                    if (typeof obj1 === 'boolean') {
                        // This is necessary in the following scenario:
                        //   lastArrow == false
                        // and call of
                        //   setAttribute({lastArrow: {type: 7}})
                        obj1 = {};
                    }
                    obj1[i] = o;
                }
            }
        }
        return obj1;
    },
    /**
         * Creates a deep copy of an existing object, i.e. arrays or sub-objects are copied component resp.
         * element-wise instead of just copying the reference. If a second object is supplied, the two objects
         * are merged into one object. The properties of the second object have priority.
         * @param {Object} obj This object will be copied.
         * @param {Object} obj2 This object will merged into the newly created object
         * @param {Boolean} [toLower=false] If true the keys are convert to lower case. This is needed for visProp, see JXG#copyAttributes
         * @returns {Object} copy of obj or merge of obj and obj2.
         */ deepCopy: function(obj, obj2, toLower) {
        var c, i, prop, i2;
        toLower = toLower || false;
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
        // Missing hasOwnProperty is on purpose in this function
        if (this.isArray(obj)) {
            c = [];
            for(i = 0; i < obj.length; i++){
                prop = obj[i];
                // Attention: typeof null === 'object'
                if (prop !== null && typeof prop === "object") {
                    // We certainly do not want to recurse into a JSXGraph object.
                    // This would for sure result in an infinite recursion.
                    // As alternative we copy the id of the object.
                    if (this.exists(prop.board)) {
                        c[i] = prop.id;
                    } else {
                        c[i] = this.deepCopy(prop, {}, toLower);
                    }
                } else {
                    c[i] = prop;
                }
            }
        } else {
            c = {};
            for(i in obj){
                if (obj.hasOwnProperty(i)) {
                    i2 = toLower ? i.toLowerCase() : i;
                    prop = obj[i];
                    if (prop !== null && typeof prop === "object") {
                        if (this.exists(prop.board)) {
                            c[i2] = prop.id;
                        } else {
                            c[i2] = this.deepCopy(prop, {}, toLower);
                        }
                    } else {
                        c[i2] = prop;
                    }
                }
            }
            for(i in obj2){
                if (obj2.hasOwnProperty(i)) {
                    i2 = toLower ? i.toLowerCase() : i;
                    prop = obj2[i];
                    if (prop !== null && typeof prop === "object") {
                        if (this.isArray(prop) || !this.exists(c[i2])) {
                            c[i2] = this.deepCopy(prop, {}, toLower);
                        } else {
                            c[i2] = this.deepCopy(c[i2], prop, toLower);
                        }
                    } else {
                        c[i2] = prop;
                    }
                }
            }
        }
        return c;
    },
    /**
         * In-place (deep) merging of attributes. Allows attributes like `{shadow: {enabled: true...}}`
         * <p>
         * In contrast to method JXG.merge, mergeAttr does not recurse into DOM objects and JSXGraph objects. Instead
         * handles (pointers) to these objects are used.
         *
         * @param {Object} attr Object with attributes - usually containing default options - that will be changed in-place.
         * @param {Object} special Special option values which overwrite (recursively) the default options
         * @param {Boolean} [toLower=true] If true the keys are converted to lower case.
         * @param {Boolean} [ignoreUndefinedSpecials=false] If true the values in special that are undefined are not used.
         *
         * @see JXG.merge
         *
         */ mergeAttr: function(attr, special, toLower, ignoreUndefinedSpecials) {
        var e, e2, o;
        toLower = toLower || true;
        ignoreUndefinedSpecials = ignoreUndefinedSpecials || false;
        for(e in special){
            if (special.hasOwnProperty(e)) {
                e2 = toLower ? e.toLowerCase() : e;
                // Key already exists, but not in lower case
                if (e2 !== e && attr.hasOwnProperty(e)) {
                    if (attr.hasOwnProperty(e2)) {
                        // Lower case key already exists - this should not happen
                        // We have to unify the two key-value pairs
                        // It is not clear which has precedence.
                        this.mergeAttr(attr[e2], attr[e], toLower);
                    } else {
                        attr[e2] = attr[e];
                    }
                    delete attr[e];
                }
                o = special[e];
                if (this.isObject(o) && o !== null && // Do not recurse into a document object or a JSXGraph object
                !this.isDocumentOrFragment(o) && !this.exists(o.board) && // Do not recurse if a string is provided as "new String(...)"
                typeof o.valueOf() !== 'string') {
                    if (attr[e2] === undefined || attr[e2] === null || !this.isObject(attr[e2])) {
                        // The last test handles the case:
                        //   attr.draft = false;
                        //   special.draft = { strokewidth: 4}
                        attr[e2] = {};
                    }
                    this.mergeAttr(attr[e2], o, toLower);
                } else if (!ignoreUndefinedSpecials || this.exists(o)) {
                    // Flat copy
                    // This is also used in the cases
                    //   attr.shadow = { enabled: true ...}
                    //   special.shadow = false;
                    // and
                    //   special.anchor is a JSXGraph element
                    attr[e2] = o;
                }
            }
        }
    },
    /**
         * Convert a n object to a new object containing only
         * lower case properties.
         *
         * @param {Object} obj
         * @returns Object
         * @example
         * var attr = JXG.keysToLowerCase({radiusPoint: {visible: false}});
         *
         * // return {radiuspoint: {visible: false}}
         */ keysToLowerCase: function(obj) {
        var key, val, keys = Object.keys(obj), n = keys.length, newObj = {};
        if (typeof obj !== 'object') {
            return obj;
        }
        while(n--){
            key = keys[n];
            if (obj.hasOwnProperty(key)) {
                // We recurse into an object only if it is
                // neither a DOM node nor an JSXGraph object
                val = obj[key];
                if (typeof val === 'object' && val !== null && !this.isArray(val) && !this.exists(val.nodeType) && !this.exists(val.board)) {
                    newObj[key.toLowerCase()] = this.keysToLowerCase(val);
                } else {
                    newObj[key.toLowerCase()] = val;
                }
            }
        }
        return newObj;
    },
    /**
         * Generates an attributes object that is filled with default values from the Options object
         * and overwritten by the user specified attributes.
         * @param {Object} attributes user specified attributes
         * @param {Object} options defaults options
         * @param {String} s variable number of strings, e.g. 'slider', subtype 'point1'. Must be provided in lower case!
         * @returns {Object} The resulting attributes object
         */ copyAttributes: function(attributes, options, s) {
        var a, arg, i, len, o, isAvail, primitives = {
            circle: 1,
            curve: 1,
            foreignobject: 1,
            image: 1,
            line: 1,
            point: 1,
            polygon: 1,
            text: 1,
            ticks: 1,
            integral: 1
        };
        len = arguments.length;
        if (len < 3 || primitives[s]) {
            // Default options from Options.elements
            a = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(options.elements, null, true);
        } else {
            a = {};
        }
        // Only the layer of the main element is set.
        if (len < 4 && this.exists(s) && this.exists(options.layer[s])) {
            a.layer = options.layer[s];
        }
        // Default options from the specific element like 'line' in
        //     copyAttribute(attributes, board.options, 'line')
        // but also like in
        //     Type.copyAttributes(attributes, board.options, 'view3d', 'az', 'slider');
        o = options;
        isAvail = true;
        for(i = 2; i < len; i++){
            arg = arguments[i];
            if (this.exists(o[arg])) {
                o = o[arg];
            } else {
                isAvail = false;
                break;
            }
        }
        if (isAvail) {
            a = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(a, o, true);
        }
        // Merge the specific options given in the parameter 'attributes'
        // into the default options.
        // Additionally, we step into a sub-element of attribute like line.point1 -
        // in case it is supplied as in
        //     copyAttribute(attributes, board.options, 'line', 'point1')
        // In this case we would merge attributes.point1 into the global line.point1 attributes.
        o = typeof attributes === 'object' ? this.keysToLowerCase(attributes) : {};
        isAvail = true;
        for(i = 3; i < len; i++){
            arg = arguments[i].toLowerCase();
            if (this.exists(o[arg])) {
                o = o[arg];
            } else {
                isAvail = false;
                break;
            }
        }
        if (isAvail) {
            this.mergeAttr(a, o, true);
        }
        if (arguments[2] === "board") {
            // For board attributes we are done now.
            return a;
        }
        // Special treatment of labels
        o = options;
        isAvail = true;
        for(i = 2; i < len; i++){
            arg = arguments[i];
            if (this.exists(o[arg])) {
                o = o[arg];
            } else {
                isAvail = false;
                break;
            }
        }
        if (isAvail && this.exists(o.label)) {
            a.label = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(o.label, a.label, true);
        }
        a.label = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(options.label, a.label, true);
        return a;
    },
    /**
         * Copy all prototype methods from object "superObject" to object
         * "subObject". The constructor of superObject will be available
         * in subObject as subObject.constructor[constructorName].
         * @param {Object} subObj A JavaScript object which receives new methods.
         * @param {Object} superObj A JavaScript object which lends its prototype methods to subObject
         * @returns {String} constructorName Under this name the constructor of superObj will be available
         * in subObject.
         * @private
         */ copyPrototypeMethods: function(subObject, superObject, constructorName) {
        var key;
        subObject.prototype[constructorName] = superObject.prototype.constructor;
        for(key in superObject.prototype){
            if (superObject.prototype.hasOwnProperty(key)) {
                subObject.prototype[key] = superObject.prototype[key];
            }
        }
    },
    /**
         * Create a stripped down version of a JSXGraph element for cloning to the background.
         * Used in {JXG.GeometryElement#cloneToBackground} for creating traces.
         *
         * @param {JXG.GeometryElement} el Element to be cloned
         * @returns Object Cloned element
         * @private
         */ getCloneObject: function(el) {
        var obj, key, copy = {};
        copy.id = el.id + "T" + el.numTraces;
        el.numTraces += 1;
        copy.coords = el.coords;
        obj = this.deepCopy(el.visProp, el.visProp.traceattributes, true);
        copy.visProp = {};
        for(key in obj){
            if (obj.hasOwnProperty(key)) {
                if (key.indexOf('aria') !== 0 && key.indexOf('highlight') !== 0 && key.indexOf('attractor') !== 0 && key !== 'label' && key !== 'needsregularupdate' && key !== 'infoboxdigits') {
                    copy.visProp[key] = el.eval(obj[key]);
                }
            }
        }
        copy.evalVisProp = function(val) {
            return copy.visProp[val];
        };
        copy.eval = function(val) {
            return val;
        };
        copy.visProp.layer = el.board.options.layer.trace;
        copy.visProp.tabindex = null;
        copy.visProp.highlight = false;
        copy.board = el.board;
        copy.elementClass = el.elementClass;
        this.clearVisPropOld(copy);
        copy.visPropCalc = {
            visible: el.evalVisProp('visible')
        };
        return copy;
    },
    /**
         * Converts a JavaScript object into a JSON string.
         * @param {Object} obj A JavaScript object, functions will be ignored.
         * @param {Boolean} [noquote=false] No quotes around the name of a property.
         * @returns {String} The given object stored in a JSON string.
         * @deprecated
         */ toJSON: function(obj, noquote) {
        var list, prop, i, s, val;
        noquote = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].def(noquote, false);
        // check for native JSON support:
        if (JSON !== undefined && JSON.stringify && !noquote) {
            try {
                s = JSON.stringify(obj);
                return s;
            } catch (e) {
            // if something goes wrong, e.g. if obj contains functions we won't return
            // and use our own implementation as a fallback
            }
        }
        switch(typeof obj){
            case "object":
                if (obj) {
                    list = [];
                    if (this.isArray(obj)) {
                        for(i = 0; i < obj.length; i++){
                            list.push(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].toJSON(obj[i], noquote));
                        }
                        return "[" + list.join(",") + "]";
                    }
                    for(prop in obj){
                        if (obj.hasOwnProperty(prop)) {
                            try {
                                val = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].toJSON(obj[prop], noquote);
                            } catch (e2) {
                                val = "";
                            }
                            if (noquote) {
                                list.push(prop + ":" + val);
                            } else {
                                list.push('"' + prop + '":' + val);
                            }
                        }
                    }
                    return "{" + list.join(",") + "} ";
                }
                return "null";
            case "string":
                return "'" + obj.replace(/(["'])/g, "\\$1") + "'";
            case "number":
            case "boolean":
                return obj.toString();
        }
        return "0";
    },
    /**
         * Resets visPropOld.
         * @param {JXG.GeometryElement} el
         * @returns {GeometryElement}
         */ clearVisPropOld: function(el) {
        el.visPropOld = {
            cssclass: "",
            cssdefaultstyle: "",
            cssstyle: "",
            fillcolor: "",
            fillopacity: "",
            firstarrow: false,
            fontsize: -1,
            lastarrow: false,
            left: -100000,
            linecap: "",
            shadow: false,
            strokecolor: "",
            strokeopacity: "",
            strokewidth: "",
            tabindex: -100000,
            transitionduration: 0,
            top: -100000,
            visible: null
        };
        return el;
    },
    /**
         * Checks if an object contains a key, whose value equals to val.
         * @param {Object} obj
         * @param val
         * @returns {Boolean}
         */ isInObject: function(obj, val) {
        var el;
        for(el in obj){
            if (obj.hasOwnProperty(el)) {
                if (obj[el] === val) {
                    return true;
                }
            }
        }
        return false;
    },
    /**
         * Replaces all occurences of &amp; by &amp;amp;, &gt; by &amp;gt;, and &lt; by &amp;lt;.
         * @param {String} str
         * @returns {String}
         */ escapeHTML: function(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },
    /**
         * Eliminates all substrings enclosed by &lt; and &gt; and replaces all occurences of
         * &amp;amp; by &amp;, &amp;gt; by &gt;, and &amp;lt; by &lt;.
         * @param {String} str
         * @returns {String}
         */ unescapeHTML: function(str) {
        // This regex is NOT insecure. We are replacing everything found with ''
        /*jslint regexp:true*/ return str.replace(/<\/?[^>]+>/gi, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    },
    /**
         * Makes a string lower case except for the first character which will be upper case.
         * @param {String} str Arbitrary string
         * @returns {String} The capitalized string.
         */ capitalize: function(str) {
        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    },
    /**
         * Make numbers given as strings nicer by removing all unnecessary leading and trailing zeroes.
         * @param {String} str
         * @returns {String}
         */ trimNumber: function(str) {
        str = str.replace(/^0+/, "");
        str = str.replace(/0+$/, "");
        if (str[str.length - 1] === "." || str[str.length - 1] === ",") {
            str = str.slice(0, -1);
        }
        if (str[0] === "." || str[0] === ",") {
            str = "0" + str;
        }
        return str;
    },
    /**
         * Filter an array of elements.
         * @param {Array} list
         * @param {Object|function} filter
         * @returns {Array}
         */ filterElements: function(list, filter) {
        var i, f, item, flower, value, visPropValue, pass, l = list.length, result = [];
        if (typeof filter !== "function" && typeof filter !== "object") {
            return result;
        }
        for(i = 0; i < l; i++){
            pass = true;
            item = list[i];
            if (typeof filter === "object") {
                for(f in filter){
                    if (filter.hasOwnProperty(f)) {
                        flower = f.toLowerCase();
                        if (typeof item[f] === "function") {
                            value = item[f]();
                        } else {
                            value = item[f];
                        }
                        if (item.visProp && typeof item.visProp[flower] === "function") {
                            visPropValue = item.visProp[flower]();
                        } else {
                            visPropValue = item.visProp && item.visProp[flower];
                        }
                        if (typeof filter[f] === "function") {
                            pass = filter[f](value) || filter[f](visPropValue);
                        } else {
                            pass = value === filter[f] || visPropValue === filter[f];
                        }
                        if (!pass) {
                            break;
                        }
                    }
                }
            } else if (typeof filter === "function") {
                pass = filter(item);
            }
            if (pass) {
                result.push(item);
            }
        }
        return result;
    },
    /**
         * Remove all leading and trailing whitespaces from a given string.
         * @param {String} str
         * @returns {String}
         */ trim: function(str) {
        // str = str.replace(/^\s+/, '');
        // str = str.replace(/\s+$/, '');
        //
        // return str;
        return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    },
    /**
         * Convert a floating point number to a string integer + fraction.
         * Returns either a string of the form '3 1/3' (in case of useTeX=false)
         * or '3 \\frac{1}{3}' (in case of useTeX=true).
         *
         * @param {Number} x
         * @param {Boolean} [useTeX=false]
         * @param {Number} [order=0.001]
         * @returns {String}
         * @see JXG.Math.decToFraction
         */ toFraction: function(x, useTeX, order) {
        var arr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].decToFraction(x, order), str = '';
        if (arr[1] === 0 && arr[2] === 0) {
            // 0
            str += '0';
        } else {
            // Sign
            if (arr[0] < 0) {
                str += '-';
            }
            if (arr[2] === 0) {
                // Integer
                str += arr[1];
            } else if (!(arr[2] === 1 && arr[3] === 1)) {
                // Proper fraction
                if (arr[1] !== 0) {
                    // Absolute value larger than 1
                    str += arr[1] + ' ';
                }
                // Add fractional part
                if (useTeX === true) {
                    str += '\\frac{' + arr[2] + '}{' + arr[3] + '}';
                } else {
                    str += arr[2] + '/' + arr[3];
                }
            }
        }
        return str;
    },
    /**
         * Concat array src to array dest.
         * Uses push instead of JavaScript concat, which is much
         * faster.
         * The array dest is changed in place.
         * <p><b>Attention:</b> if "dest" is an anonymous array, the correct result is returned from the function.
         *
         * @param {Array} dest
         * @param {Array} src
         * @returns Array
         */ concat: function(dest, src) {
        var i, le = src.length;
        for(i = 0; i < le; i++){
            dest.push(src[i]);
        }
        return dest;
    },
    /**
         * Convert HTML tags to entities or use html_sanitize if the google caja html sanitizer is available.
         * @param {String} str
         * @param {Boolean} caja
         * @returns {String} Sanitized string
         */ sanitizeHTML: function(str, caja) {
        if (typeof html_sanitize === "function" && caja) {
            return html_sanitize(str, function() {
                return undefined;
            }, function(id) {
                return id;
            });
        }
        if (str && typeof str === "string") {
            str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
        return str;
    },
    /**
         * If <tt>s</tt> is a slider, it returns the sliders value, otherwise it just returns the given value.
         * @param {*} s
         * @returns {*} s.Value() if s is an element of type slider, s otherwise
         */ evalSlider: function(s) {
        if (s && s.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_TYPE_GLIDER && typeof s.Value === "function") {
            return s.Value();
        }
        return s;
    },
    /**
         * Convert a string containing a MAXIMA /STACK expression into a JSXGraph / JessieCode string
         * or an array of JSXGraph / JessieCode strings.
         * <p>
         * This function is meanwhile superseded by stack_jxg.stack2jsxgraph.
         *
         * @deprecated
         *
         * @example
         * console.log( JXG.stack2jsxgraph("%e**x") );
         * // Output:
         * //    "EULER**x"
         *
         * @example
         * console.log( JXG.stack2jsxgraph("[%pi*(x**2 - 1), %phi*(x - 1), %gamma*(x+1)]") );
         * // Output:
         * //    [ "PI*(x**2 - 1)", "1.618033988749895*(x - 1)", "0.5772156649015329*(x+1)" ]
         *
         * @param {String} str
         * @returns String
         */ stack2jsxgraph: function(str) {
        var t;
        t = str.replace(/%pi/g, 'PI').replace(/%e/g, 'EULER').replace(/%phi/g, '1.618033988749895').replace(/%gamma/g, '0.5772156649015329').trim();
        // String containing array -> array containing strings
        if (t[0] === '[' && t[t.length - 1] === ']') {
            t = t.slice(1, -1).split(/\s*,\s*/);
        }
        return t;
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/env.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, define: true, window: true, document: true, navigator: true, module: true, global: true, self: true, require: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview The functions in this file help with the detection of the environment JSXGraph runs in. We can distinguish
 * between node.js, windows 8 app and browser, what rendering techniques are supported and (most of the time) if the device
 * the browser runs on is a tablet/cell or a desktop computer.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extendConstants(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], /** @lends JXG */ {
});
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], /** @lends JXG */ {
    /**
         * Determines whether evt is a touch event.
         * @param evt {Event}
         * @returns {Boolean}
         */ isTouchEvent: function(evt) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(evt['touches']); // Old iOS touch events
    },
    /**
         * Determines whether evt is a pointer event.
         * @param evt {Event}
         * @returns {Boolean}
         */ isPointerEvent: function(evt) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(evt.pointerId);
    },
    /**
         * Determines whether evt is neither a touch event nor a pointer event.
         * @param evt {Event}
         * @returns {Boolean}
         */ isMouseEvent: function(evt) {
        return !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isTouchEvent(evt) && !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPointerEvent(evt);
    },
    /**
         * Determines the number of touch points in a touch event.
         * For other events, -1 is returned.
         * @param evt {Event}
         * @returns {Number}
         */ getNumberOfTouchPoints: function(evt) {
        var n = -1;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isTouchEvent(evt)) {
            n = evt['touches'].length;
        }
        return n;
    },
    /**
         * Checks whether an mouse, pointer or touch event evt is the first event of a multitouch event.
         * Attention: When two or more pointer device types are being used concurrently,
         *            it is only checked whether the passed event is the first one of its type!
         * @param evt {Event}
         * @returns {boolean}
         */ isFirstTouch: function(evt) {
        var touchPoints = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getNumberOfTouchPoints(evt);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPointerEvent(evt)) {
            return evt.isPrimary;
        }
        return touchPoints === 1;
    },
    /**
         * A document/window environment is available.
         * @type Boolean
         * @default false
         */ isBrowser: typeof window === "object" && typeof document === "object",
    /**
         * Features of ECMAScript 6+ are available.
         * @type Boolean
         * @default false
         */ supportsES6: function() {
        // var testMap;
        /* jshint ignore:start */ try {
            // This would kill the old uglifyjs: testMap = (a = 0) => a;
            new Function("(a = 0) => a");
            return true;
        } catch (err) {
            return false;
        }
    /* jshint ignore:end */ },
    /**
         * Detect browser support for VML.
         * @returns {Boolean} True, if the browser supports VML.
         */ supportsVML: function() {
        // From stackoverflow.com
        return this.isBrowser && !!document.namespaces;
    },
    /**
         * Detect browser support for SVG.
         * @returns {Boolean} True, if the browser supports SVG.
         */ supportsSVG: function() {
        var svgSupport;
        if (!this.isBrowser) {
            return false;
        }
        svgSupport = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
        return svgSupport;
    },
    /**
         * Detect browser support for Canvas.
         * @returns {Boolean} True, if the browser supports HTML canvas.
         */ supportsCanvas: function() {
        var hasCanvas = false;
        // if (this.isNode()) {
        //     try {
        //         // c = typeof module === "object" ? module.require("canvas") : $__canvas;
        //         c = typeof module === "object" ? module.require("canvas") : import('canvas');
        //         hasCanvas = !!c;
        //     } catch (err) {}
        // }
        if (this.isNode()) {
            //try {
            //    JXG.createCanvas(500, 500);
            hasCanvas = true;
        // } catch (err) {
        //     throw new Error('JXG.createCanvas not available.\n' +
        //         'Install the npm package `canvas`\n' +
        //         'and call:\n' +
        //         '    import { createCanvas } from "canvas.js";\n' +
        //         '    JXG.createCanvas = createCanvas;\n');
        // }
        }
        return hasCanvas || this.isBrowser && !!document.createElement("canvas").getContext;
    },
    /**
         * True, if run inside a node.js environment.
         * @returns {Boolean}
         */ isNode: function() {
        // This is not a 100% sure but should be valid in most cases
        // We are not inside a browser
        /* eslint-disable no-undef */ return !this.isBrowser && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].release.name.search(/node|io.js/) !== -1;
    },
    /**
         * True if run inside a webworker environment.
         * @returns {Boolean}
         */ isWebWorker: function() {
        return !this.isBrowser && typeof self === "object" && typeof self.postMessage === "function";
    },
    /**
         * Checks if the environments supports the W3C Pointer Events API {@link https://www.w3.org/TR/pointerevents/}
         * @returns {Boolean}
         */ supportsPointerEvents: function() {
        return !!(this.isBrowser && window.navigator && (window.PointerEvent || // Chrome/Edge/IE11+
        window.navigator.pointerEnabled || // IE11+
        window.navigator.msPointerEnabled)) // IE10-
        ;
    },
    /**
         * Determine if the current browser supports touch events
         * @returns {Boolean} True, if the browser supports touch events.
         */ isTouchDevice: function() {
        return this.isBrowser && window.ontouchstart !== undefined;
    },
    /**
         * Detects if the user is using an Android powered device.
         * @returns {Boolean}
         * @deprecated
         */ isAndroid: function() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(navigator) && navigator.userAgent.toLowerCase().indexOf("android") > -1;
    },
    /**
         * Detects if the user is using the default Webkit browser on an Android powered device.
         * @returns {Boolean}
         * @deprecated
         */ isWebkitAndroid: function() {
        return this.isAndroid() && navigator.userAgent.indexOf(" AppleWebKit/") > -1;
    },
    /**
         * Detects if the user is using a Apple iPad / iPhone.
         * @returns {Boolean}
         * @deprecated
         */ isApple: function() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(navigator) && (navigator.userAgent.indexOf("iPad") > -1 || navigator.userAgent.indexOf("iPhone") > -1);
    },
    /**
         * Detects if the user is using Safari on an Apple device.
         * @returns {Boolean}
         * @deprecated
         */ isWebkitApple: function() {
        return this.isApple() && navigator.userAgent.search(/Mobile\/[0-9A-Za-z.]*Safari/) > -1;
    },
    /**
         * Returns true if the run inside a Windows 8 "Metro" App.
         * @returns {Boolean}
         * @deprecated
         */ isMetroApp: function() {
        return typeof window === "object" && window.clientInformation && window.clientInformation.appVersion && window.clientInformation.appVersion.indexOf("MSAppHost") > -1;
    },
    /**
         * Detects if the user is using a Mozilla browser
         * @returns {Boolean}
         * @deprecated
         */ isMozilla: function() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(navigator) && navigator.userAgent.toLowerCase().indexOf("mozilla") > -1 && navigator.userAgent.toLowerCase().indexOf("apple") === -1;
    },
    /**
         * Detects if the user is using a firefoxOS powered device.
         * @returns {Boolean}
         * @deprecated
         */ isFirefoxOS: function() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(navigator) && navigator.userAgent.toLowerCase().indexOf("android") === -1 && navigator.userAgent.toLowerCase().indexOf("apple") === -1 && navigator.userAgent.toLowerCase().indexOf("mobile") > -1 && navigator.userAgent.toLowerCase().indexOf("mozilla") > -1;
    },
    /**
         * Detects if the user is using a desktop device, see <a href="https://stackoverflow.com/a/61073480">https://stackoverflow.com/a/61073480</a>.
         * @returns {boolean}
         *
         * @deprecated
         */ isDesktop: function() {
        return true;
    // console.log("isDesktop", screen.orientation);
    // const navigatorAgent =
    //     navigator.userAgent || navigator.vendor || window.opera;
    // return !(
    //     /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series([46])0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
    //         navigatorAgent
    //     ) ||
    //     /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br([ev])w|bumb|bw-([nu])|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do([cp])o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly([-_])|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-([mpt])|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c([- _agpst])|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac([ \-/])|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja([tv])a|jbro|jemu|jigs|kddi|keji|kgt([ /])|klon|kpt |kwc-|kyo([ck])|le(no|xi)|lg( g|\/([klu])|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t([- ov])|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30([02])|n50([025])|n7(0([01])|10)|ne(([cm])-|on|tf|wf|wg|wt)|nok([6i])|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan([adt])|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c([-01])|47|mc|nd|ri)|sgh-|shar|sie([-m])|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel([im])|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c([- ])|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
    //         navigatorAgent.substr(0, 4)
    //     )
    // );
    },
    /**
         * Detects if the user is using a mobile device, see <a href="https://stackoverflow.com/questions/25542814/html5-detecting-if-youre-on-mobile-or-pc-with-javascript">https://stackoverflow.com/questions/25542814/html5-detecting-if-youre-on-mobile-or-pc-with-javascript</a>.
         * @returns {boolean}
         *
         * @deprecated
         *
         */ isMobile: function() {
        return true;
    // return Type.exists(navigator) && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    /**
         * Internet Explorer version. Works only for IE > 4.
         * @type Number
         * @deprecated
         */ ieVersion: function() {
        var div, all, v = 3;
        if (typeof document !== "object") {
            return 0;
        }
        div = document.createElement("div");
        all = div.getElementsByTagName("i");
        do {
            div.innerHTML = "<!--[if gt IE " + ++v + "]><" + "i><" + "/i><![endif]-->";
        }while (all[0])
        return v > 4 ? v : undefined;
    }(),
    /**
         * Reads the width and height of an HTML element.
         * @param {String|Object} elementId id of or reference to an HTML DOM node.
         * @returns {Object} An object with the two properties width and height.
         */ getDimensions: function(elementId, doc) {
        var element, display, els, originalVisibility, originalPosition, originalDisplay, originalWidth, originalHeight, style, pixelDimRegExp = /\d+(\.\d*)?px/;
        if (!this.isBrowser || elementId === null) {
            return {
                width: 500,
                height: 500
            };
        }
        doc = doc || document;
        // Borrowed from prototype.js
        element = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(elementId) ? doc.getElementById(elementId) : elementId;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(element)) {
            throw new Error("\nJSXGraph: HTML container element '" + elementId + "' not found.");
        }
        display = element.style.display;
        // Work around a bug in Safari
        if (display !== "none" && display !== null) {
            if (element.clientWidth > 0 && element.clientHeight > 0) {
                return {
                    width: element.clientWidth,
                    height: element.clientHeight
                };
            }
            // A parent might be set to display:none; try reading them from styles
            style = window.getComputedStyle ? window.getComputedStyle(element) : element.style;
            return {
                width: pixelDimRegExp.test(style.width) ? parseFloat(style.width) : 0,
                height: pixelDimRegExp.test(style.height) ? parseFloat(style.height) : 0
            };
        }
        // All *Width and *Height properties give 0 on elements with display set to none,
        // hence we show the element temporarily
        els = element.style;
        // save style
        originalVisibility = els.visibility;
        originalPosition = els.position;
        originalDisplay = els.display;
        // show element
        els.visibility = "hidden";
        els.position = "absolute";
        els.display = "block";
        // read the dimension
        originalWidth = element.clientWidth;
        originalHeight = element.clientHeight;
        // restore original css values
        els.display = originalDisplay;
        els.position = originalPosition;
        els.visibility = originalVisibility;
        return {
            width: originalWidth,
            height: originalHeight
        };
    },
    /**
         * Adds an event listener to a DOM element.
         * @param {Object} obj Reference to a DOM node.
         * @param {String} type The event to catch, without leading 'on', e.g. 'mousemove' instead of 'onmousemove'.
         * @param {Function} fn The function to call when the event is triggered.
         * @param {Object} owner The scope in which the event trigger is called.
         * @param {Object|Boolean} [options=false] This parameter is passed as the third parameter to the method addEventListener. Depending on the data type it is either
         * an options object or the useCapture Boolean.
         *
         */ addEvent: function(obj, type, fn, owner, options) {
        var el = function() {
            return fn.apply(owner, arguments);
        };
        el.origin = fn;
        // Check if owner is a board
        if (typeof owner === 'object' && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(owner.BOARD_MODE_NONE)) {
            owner['x_internal' + type] = owner['x_internal' + type] || [];
            owner['x_internal' + type].push(el);
        }
        // Non-IE browser
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj.addEventListener)) {
            options = options || false; // options or useCapture
            obj.addEventListener(type, el, options);
        }
        // IE
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj.attachEvent)) {
            obj.attachEvent("on" + type, el);
        }
    },
    /**
         * Removes an event listener from a DOM element.
         * @param {Object} obj Reference to a DOM node.
         * @param {String} type The event to catch, without leading 'on', e.g. 'mousemove' instead of 'onmousemove'.
         * @param {Function} fn The function to call when the event is triggered.
         * @param {Object} owner The scope in which the event trigger is called.
         */ removeEvent: function(obj, type, fn, owner) {
        var i;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(owner)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug("no such owner");
            return;
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(owner["x_internal" + type])) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug("removeEvent: no such type: " + type);
            return;
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(owner["x_internal" + type])) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug("owner[x_internal + " + type + "] is not an array");
            return;
        }
        i = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].indexOf(owner["x_internal" + type], fn, "origin");
        if (i === -1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug("removeEvent: no such event function in internal list: " + fn);
            return;
        }
        try {
            // Non-IE browser
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj.removeEventListener)) {
                obj.removeEventListener(type, owner["x_internal" + type][i], false);
            }
            // IE
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj.detachEvent)) {
                obj.detachEvent("on" + type, owner["x_internal" + type][i]);
            }
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug("removeEvent: event not registered in browser: (" + type + " -- " + fn + ")");
        }
        owner["x_internal" + type].splice(i, 1);
    },
    /**
         * Removes all events of the given type from a given DOM node; Use with caution and do not use it on a container div
         * of a {@link JXG.Board} because this might corrupt the event handling system.
         * @param {Object} obj Reference to a DOM node.
         * @param {String} type The event to catch, without leading 'on', e.g. 'mousemove' instead of 'onmousemove'.
         * @param {Object} owner The scope in which the event trigger is called.
         */ removeAllEvents: function(obj, type, owner) {
        var i, len;
        if (owner["x_internal" + type]) {
            len = owner["x_internal" + type].length;
            for(i = len - 1; i >= 0; i--){
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].removeEvent(obj, type, owner["x_internal" + type][i].origin, owner);
            }
            if (owner["x_internal" + type].length > 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug("removeAllEvents: Not all events could be removed.");
            }
        }
    },
    /**
         * Cross browser mouse / pointer / touch coordinates retrieval relative to the documents's top left corner.
         * This method might be a bit outdated today, since pointer events and clientX/Y are omnipresent.
         *
         * @param {Object} [e] The browsers event object. If omitted, <tt>window.event</tt> will be used.
         * @param {Number} [index] If <tt>e</tt> is a touch event, this provides the index of the touch coordinates, i.e. it determines which finger.
         * @param {Object} [doc] The document object.
         * @returns {Array} Contains the position as x,y-coordinates in the first resp. second component.
         */ getPosition: function(e, index, doc) {
        var i, len, evtTouches, posx = 0, posy = 0;
        if (!e) {
            e = window.event;
        }
        doc = doc || document;
        evtTouches = e['touches']; // iOS touch events
        // touchend events have their position in "changedTouches"
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(evtTouches) && evtTouches.length === 0) {
            evtTouches = e.changedTouches;
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(index) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(evtTouches)) {
            if (index === -1) {
                len = evtTouches.length;
                for(i = 0; i < len; i++){
                    if (evtTouches[i]) {
                        e = evtTouches[i];
                        break;
                    }
                }
            } else {
                e = evtTouches[index];
            }
        }
        // Scrolling is ignored.
        // e.clientX is supported since IE6
        if (e.clientX) {
            posx = e.clientX;
            posy = e.clientY;
        }
        return [
            posx,
            posy
        ];
    },
    /**
         * Calculates recursively the offset of the DOM element in which the board is stored.
         * @param {Object} obj A DOM element
         * @returns {Array} An array with the elements left and top offset.
         */ getOffset: function(obj) {
        var cPos, o = obj, o2 = obj, l = o.offsetLeft - o.scrollLeft, t = o.offsetTop - o.scrollTop;
        cPos = this.getCSSTransform([
            l,
            t
        ], o);
        l = cPos[0];
        t = cPos[1];
        /*
             * In Mozilla and Webkit: offsetParent seems to jump at least to the next iframe,
             * if not to the body. In IE and if we are in an position:absolute environment
             * offsetParent walks up the DOM hierarchy.
             * In order to walk up the DOM hierarchy also in Mozilla and Webkit
             * we need the parentNode steps.
             */ o = o.offsetParent;
        while(o){
            l += o.offsetLeft;
            t += o.offsetTop;
            if (o.offsetParent) {
                l += o.clientLeft - o.scrollLeft;
                t += o.clientTop - o.scrollTop;
            }
            cPos = this.getCSSTransform([
                l,
                t
            ], o);
            l = cPos[0];
            t = cPos[1];
            o2 = o2.parentNode;
            while(o2 !== o){
                l += o2.clientLeft - o2.scrollLeft;
                t += o2.clientTop - o2.scrollTop;
                cPos = this.getCSSTransform([
                    l,
                    t
                ], o2);
                l = cPos[0];
                t = cPos[1];
                o2 = o2.parentNode;
            }
            o = o.offsetParent;
        }
        return [
            l,
            t
        ];
    },
    /**
         * Access CSS style sheets.
         * @param {Object} obj A DOM element
         * @param {String} stylename The CSS property to read.
         * @returns The value of the CSS property and <tt>undefined</tt> if it is not set.
         */ getStyle: function(obj, stylename) {
        var r, doc = obj.ownerDocument;
        // Non-IE
        if (doc.defaultView && doc.defaultView.getComputedStyle) {
            r = doc.defaultView.getComputedStyle(obj, null).getPropertyValue(stylename);
        // IE
        } else if (obj.currentStyle && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].ieVersion >= 9) {
            r = obj.currentStyle[stylename];
        } else {
            if (obj.style) {
                // make stylename lower camelcase
                stylename = stylename.replace(/-([a-z]|[0-9])/gi, function(all, letter) {
                    return letter.toUpperCase();
                });
                r = obj.style[stylename];
            }
        }
        return r;
    },
    /**
         * Reads css style sheets of a given element. This method is a getStyle wrapper and
         * defaults the read value to <tt>0</tt> if it can't be parsed as an integer value.
         * @param {DOMElement} el
         * @param {string} css
         * @returns {number}
         */ getProp: function(el, css) {
        var n = parseInt(this.getStyle(el, css), 10);
        return isNaN(n) ? 0 : n;
    },
    /**
         * Correct position of upper left corner in case of
         * a CSS transformation. Here, only translations are
         * extracted. All scaling transformations are corrected
         * in {@link JXG.Board#getMousePosition}.
         * @param {Array} cPos Previously determined position
         * @param {Object} obj A DOM element
         * @returns {Array} The corrected position.
         */ getCSSTransform: function(cPos, obj) {
        var i, j, str, arrStr, start, len, len2, arr, t = [
            "transform",
            "webkitTransform",
            "MozTransform",
            "msTransform",
            "oTransform"
        ];
        // Take the first transformation matrix
        len = t.length;
        for(i = 0, str = ""; i < len; i++){
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj.style[t[i]])) {
                str = obj.style[t[i]];
                break;
            }
        }
        /**
             * Extract the coordinates and apply the transformation
             * to cPos
             */ if (str !== "") {
            start = str.indexOf("(");
            if (start > 0) {
                len = str.length;
                arrStr = str.substring(start + 1, len - 1);
                arr = arrStr.split(",");
                for(j = 0, len2 = arr.length; j < len2; j++){
                    arr[j] = parseFloat(arr[j]);
                }
                if (str.indexOf("matrix") === 0) {
                    cPos[0] += arr[4];
                    cPos[1] += arr[5];
                } else if (str.indexOf("translateX") === 0) {
                    cPos[0] += arr[0];
                } else if (str.indexOf("translateY") === 0) {
                    cPos[1] += arr[0];
                } else if (str.indexOf("translate") === 0) {
                    cPos[0] += arr[0];
                    cPos[1] += arr[1];
                }
            }
        }
        // Zoom is used by reveal.js
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj.style.zoom)) {
            str = obj.style.zoom;
            if (str !== "") {
                cPos[0] *= parseFloat(str);
                cPos[1] *= parseFloat(str);
            }
        }
        return cPos;
    },
    /**
         * Scaling CSS transformations applied to the div element containing the JSXGraph constructions
         * are determined. In IE prior to 9, 'rotate', 'skew', 'skewX', 'skewY' are not supported.
         * @returns {Array} 3x3 transformation matrix without translation part. See {@link JXG.Board#updateCSSTransforms}.
         */ getCSSTransformMatrix: function(obj) {
        var i, j, str, arrstr, arr, start, len, len2, st, doc = obj.ownerDocument, t = [
            "transform",
            "webkitTransform",
            "MozTransform",
            "msTransform",
            "oTransform"
        ], mat = [
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
        // This should work on all browsers except IE 6-8
        if (doc.defaultView && doc.defaultView.getComputedStyle) {
            st = doc.defaultView.getComputedStyle(obj, null);
            str = st.getPropertyValue("-webkit-transform") || st.getPropertyValue("-moz-transform") || st.getPropertyValue("-ms-transform") || st.getPropertyValue("-o-transform") || st.getPropertyValue("transform");
        } else {
            // Take the first transformation matrix
            len = t.length;
            for(i = 0, str = ""; i < len; i++){
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj.style[t[i]])) {
                    str = obj.style[t[i]];
                    break;
                }
            }
        }
        // Convert and reorder the matrix for JSXGraph
        if (str !== "") {
            start = str.indexOf("(");
            if (start > 0) {
                len = str.length;
                arrstr = str.substring(start + 1, len - 1);
                arr = arrstr.split(",");
                for(j = 0, len2 = arr.length; j < len2; j++){
                    arr[j] = parseFloat(arr[j]);
                }
                if (str.indexOf("matrix") === 0) {
                    mat = [
                        [
                            1,
                            0,
                            0
                        ],
                        [
                            0,
                            arr[0],
                            arr[1]
                        ],
                        [
                            0,
                            arr[2],
                            arr[3]
                        ]
                    ];
                } else if (str.indexOf("scaleX") === 0) {
                    mat[1][1] = arr[0];
                } else if (str.indexOf("scaleY") === 0) {
                    mat[2][2] = arr[0];
                } else if (str.indexOf("scale") === 0) {
                    mat[1][1] = arr[0];
                    mat[2][2] = arr[1];
                }
            }
        }
        // CSS style zoom is used by reveal.js
        // Recursively search for zoom style entries.
        // This is necessary for reveal.js on webkit.
        // It fails if the user does zooming
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(obj.style.zoom)) {
            str = obj.style.zoom;
            if (str !== "") {
                mat[1][1] *= parseFloat(str);
                mat[2][2] *= parseFloat(str);
            }
        }
        return mat;
    },
    /**
         * Process data in timed chunks. Data which takes long to process, either because it is such
         * a huge amount of data or the processing takes some time, causes warnings in browsers about
         * irresponsive scripts. To prevent these warnings, the processing is split into smaller pieces
         * called chunks which will be processed in serial order.
         * Copyright 2009 Nicholas C. Zakas. All rights reserved. MIT Licensed
         * @param {Array} items to do
         * @param {Function} process Function that is applied for every array item
         * @param {Object} context The scope of function process
         * @param {Function} callback This function is called after the last array element has been processed.
         */ timedChunk: function(items, process, context, callback) {
        //create a clone of the original
        var todo = items.slice(), timerFun = function() {
            var start = +new Date();
            do {
                process.call(context, todo.shift());
            }while (todo.length > 0 && +new Date() - start < 300)
            if (todo.length > 0) {
                window.setTimeout(timerFun, 1);
            } else {
                callback(items);
            }
        };
        window.setTimeout(timerFun, 1);
    },
    /**
         * Scale and vertically shift a DOM element (usually a JSXGraph div)
         * inside of a parent DOM
         * element which is set to fullscreen.
         * This is realized with a CSS transformation.
         *
         * @param  {String} wrap_id  id of the parent DOM element which is in fullscreen mode
         * @param  {String} inner_id id of the DOM element which is scaled and shifted
         * @param  {Object} doc      document object or shadow root
         * @param  {Number} scale    Relative size of the JSXGraph board in the fullscreen window.
         *
         * @private
         * @see JXG.Board#toFullscreen
         * @see JXG.Board#fullscreenListener
         *
         */ scaleJSXGraphDiv: function(wrap_id, inner_id, doc, scale) {
        var w, h, b, wi, hi, wo, ho, inner, scale_l, vshift_l, f = scale, ratio, pseudo_keys = [
            ":fullscreen",
            ":-webkit-full-screen",
            ":-moz-full-screen",
            ":-ms-fullscreen"
        ], len_pseudo = pseudo_keys.length, i;
        b = doc.getElementById(wrap_id).getBoundingClientRect();
        h = b.height;
        w = b.width;
        inner = doc.getElementById(inner_id);
        wo = inner._cssFullscreenStore.w;
        ho = inner._cssFullscreenStore.h;
        ratio = ho / wo;
        // Scale the div such that fits into the fullscreen.
        if (wo > w * f) {
            wo = w * f;
            ho = wo * ratio;
        }
        if (ho > h * f) {
            ho = h * f;
            wo = ho / ratio;
        }
        wi = wo;
        hi = ho;
        // Compare the code in this.setBoundingBox()
        if (ratio > 1) {
            // h > w
            if (ratio < h / w) {
                scale_l = w * f / wo;
            } else {
                scale_l = h * f / ho;
            }
        } else {
            // h <= w
            if (ratio < h / w) {
                scale_l = w * f / wo;
            } else {
                scale_l = h * f / ho;
            }
        }
        vshift_l = (h - hi) * 0.5;
        // Set a CSS properties to center the JSXGraph div horizontally and vertically
        // at the first position of the fullscreen pseudo classes.
        for(i = 0; i < len_pseudo; i++){
            try {
                inner.style.width = wi + 'px !important';
                inner.style.height = hi + 'px !important';
                inner.style.margin = '0 auto';
                // Add the transform to a possibly already existing transform
                inner.style.transform = inner._cssFullscreenStore.transform + ' matrix(' + scale_l + ',0,0,' + scale_l + ',0,' + vshift_l + ')';
                break;
            } catch (err) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug("JXG.scaleJSXGraphDiv:\n" + err);
            }
        }
        if (i === len_pseudo) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug("JXG.scaleJSXGraphDiv: Could not set any CSS property.");
        }
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/xml.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, define: true, DOMParser: true, ActiveXObject: true*/ /*jslint nomen: true, plusplus: true*/ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
;
;
/**
 * Holds browser independent xml parsing routines. Won't work in environments other than browsers.
 * @namespace
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].XML = {
    /**
     * Cleans out unneccessary whitespaces in a chunk of xml.
     * @param {Object} el
     */ cleanWhitespace: function(el) {
        var cur = el.firstChild;
        while(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(cur)){
            if (cur.nodeType === 3 && !/\S/.test(cur.nodeValue)) {
                el.removeChild(cur);
            } else if (cur.nodeType === 1) {
                this.cleanWhitespace(cur);
            }
            cur = cur.nextSibling;
        }
    },
    /**
     * Converts a given string into a XML tree.
     * @param {String} str
     * @returns {Object} The xml tree represented by the root node.
     */ parse: function(str) {
        var parser, tree, DP;
        // DOMParser is a function in all browsers, except older IE and Safari.
        // In IE it does not exists (workaround in else branch), in Safari it's an object.
        if (typeof DOMParser === "function" || typeof DOMParser === "object") {
            DP = DOMParser;
        } else {
            // IE workaround, since there is no DOMParser
            DP = function() {
                this.parseFromString = function(str) {
                    var d;
                    if (typeof ActiveXObject === "function") {
                        d = new ActiveXObject("MSXML.DomDocument");
                        d.loadXML(str);
                    }
                    return d;
                };
            };
        }
        parser = new DP();
        tree = parser.parseFromString(str, "text/xml");
        this.cleanWhitespace(tree);
        return tree;
    }
};
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].XML;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/event.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 * @fileoverview In this file the EventEmitter interface is defined.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
;
;
/**
 * Event namespace
 * @namespace
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].EventEmitter = {
    /**
     * Holds the registered event handlers.
     * @type Object
     */ eventHandlers: {},
    /**
     * Events can be suspended to prevent endless loops.
     * @type Object
     */ suspended: {},
    /**
     * Triggers all event handlers of this element for a given event.
     * @param {Array} event
     * @param {Array} args The arguments passed onto the event handler
     * @returns Reference to the object.
     */ trigger: function(event, args) {
        var i, j, h, evt, len1, len2;
        len1 = event.length;
        for(j = 0; j < len1; j++){
            evt = this.eventHandlers[event[j]];
            if (!this.suspended[event[j]]) {
                this.suspended[event[j]] = true;
                if (evt) {
                    len2 = evt.length;
                    for(i = 0; i < len2; i++){
                        h = evt[i];
                        h.handler.apply(h.context, args);
                    }
                }
                this.suspended[event[j]] = false;
            }
        }
        return this;
    },
    /**
     * Register a new event handler. For a list of possible events see documentation
     * of the elements and objects implementing
     * the {@link EventEmitter} interface.
     *
     * As of version 1.5.0, it is only possible to access the element via "this" if the event listener
     * is supplied as regular JavaScript function and not as arrow function.
     *
     * @param {String} event
     * @param {Function} handler
     * @param {Object} [context] The context the handler will be called in, default is the element itself.
     * @returns Reference to the object.
     */ on: function(event, handler, context) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(this.eventHandlers[event])) {
            this.eventHandlers[event] = [];
        }
        context = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].def(context, this);
        this.eventHandlers[event].push({
            handler: handler,
            context: context
        });
        return this;
    },
    /**
     * Unregister an event handler.
     * @param {String} event
     * @param {Function} [handler]
     * @returns Reference to the object.
     */ off: function(event, handler) {
        var i;
        if (!event || !__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(this.eventHandlers[event])) {
            return this;
        }
        if (handler) {
            i = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].indexOf(this.eventHandlers[event], handler, "handler");
            if (i > -1) {
                this.eventHandlers[event].splice(i, 1);
            }
            if (this.eventHandlers[event].length === 0) {
                delete this.eventHandlers[event];
            }
        } else {
            delete this.eventHandlers[event];
        }
        return this;
    },
    /**
     * @description Implements the functionality from this interface in the given object.
     * All objects getting their event handling
     * capabilities from this method should document it by adding
     * the <tt>on, off, triggerEventHandlers</tt> via the
     * borrows tag as methods to their documentation:
     * <pre>@borrows JXG.EventEmitter#on as this.on</pre>
     * @param {Object} o
     */ eventify: function(o) {
        o.eventHandlers = {
            clicks: 0 // Needed to handle dblclicks
        };
        o.on = this.on;
        o.off = this.off;
        o.triggerEventHandlers = this.trigger;
        o.trigger = this.trigger;
        o.suspended = {};
    }
};
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].EventEmitter;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/expect.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, define: true, html_sanitize: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview expect.js provides utilities for parameter magic by normalizing multi-type parameters.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coords.js [app-client] (ecmascript)");
;
;
;
;
/**
 * The JXG.Expect namespace provides method to normalize access on coordinates,
 * i.e. provides utilities for parameter magic by normalizing multi-type parameters.
 * @namespace
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Expect = {
    /**
     * Apply an expect method on every element of an array.
     *
     * @param {Array} a
     * @param {function} format
     * @param {Boolean} [copy=false]
     *
     * @returns {Array}
     */ each: function(a, format, copy) {
        var i, len, r = [];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(a.length)) {
            len = a.length;
            for(i = 0; i < len; i++){
                r.push(format.call(this, a[i], copy));
            }
        }
        return r;
    },
    /**
     * Normalize points and coord objects into a coord object.
     *
     * @param {JXG.Point|JXG.Coords} c
     * @param {Boolean} [copy=false] Return a copy, not a reference
     *
     * @returns {JXG.Coords}
     */ coords: function(c, copy) {
        var coord = c;
        if (c && c.elementClass === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].OBJECT_CLASS_POINT) {
            coord = c.coords;
        } else if (c.usrCoords && c.scrCoords && c.usr2screen) {
            coord = c;
        }
        if (copy) {
            coord = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER, coord.usrCoords, coord.board);
        }
        return coord;
    },
    /**
     * Normalize points, coordinate arrays and coord objects into a coordinate array.
     *
     * @param {JXG.Point|JXG.Coords|Array} c
     * @param {Boolean} [copy=false] Return a copy, not a reference
     *
     * @returns {Array} Homogeneous coordinates
     */ coordsArray: function(c, copy) {
        var coord;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(c)) {
            coord = this.coords(c).usrCoords;
        } else {
            coord = c;
        }
        if (coord.length < 3) {
            coord.unshift(1);
        }
        if (copy) {
            coord = [
                coord[0],
                coord[1],
                coord[2]
            ];
        }
        return coord;
    }
};
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Expect;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/color.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, define: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * Functions for color conversions. This was originally based on a class to parse color values by
 * Stoyan Stefanov <sstoo@gmail.com> (see https://www.phpied.com/rgb-color-parser-in-javascript/)
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-client] (ecmascript)");
;
;
;
// private constants and helper functions
// simple colors contains string color constants that can be used in various browser
// in javascript
var simpleColors = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "00ffff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000000",
    blanchedalmond: "ffebcd",
    blue: "0000ff",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "00ffff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dodgerblue: "1e90ff",
    feldspar: "d19275",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "ff00ff",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgrey: "d3d3d3",
    lightgreen: "90ee90",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslateblue: "8470ff",
    lightslategray: "778899",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "00ff00",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "ff00ff",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370d8",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "d87093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    red: "ff0000",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    venetianred: "ae181e",
    violet: "ee82ee",
    violetred: "d02090",
    wheat: "f5deb3",
    white: "ffffff",
    whitesmoke: "f5f5f5",
    yellow: "ffff00",
    yellowgreen: "9acd32"
}, // array of color definition objects
colorDefs = [
    {
        re: /^\s*rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d.]{1,3})\s*\)\s*$/,
        example: [
            "rgba(123, 234, 45, 0.5)",
            "rgba(255,234,245,1.0)"
        ],
        process: function(bits) {
            return [
                parseInt(bits[1], 10),
                parseInt(bits[2], 10),
                parseInt(bits[3], 10)
            ];
        }
    },
    {
        re: /^\s*rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)\s*$/,
        example: [
            "rgb(123, 234, 45)",
            "rgb(255,234,245)"
        ],
        process: function(bits) {
            return [
                parseInt(bits[1], 10),
                parseInt(bits[2], 10),
                parseInt(bits[3], 10)
            ];
        }
    },
    {
        re: /^(\w{2})(\w{2})(\w{2})$/,
        example: [
            "#00ff00",
            "336699"
        ],
        process: function(bits) {
            return [
                parseInt(bits[1], 16),
                parseInt(bits[2], 16),
                parseInt(bits[3], 16)
            ];
        }
    },
    {
        re: /^(\w{1})(\w{1})(\w{1})$/,
        example: [
            "#fb0",
            "f0f"
        ],
        process: function(bits) {
            return [
                parseInt(bits[1] + bits[1], 16),
                parseInt(bits[2] + bits[2], 16),
                parseInt(bits[3] + bits[3], 16)
            ];
        }
    }
];
/**
 * Converts a valid HTML/CSS color string into a rgb value array. This is the base
 * function for the following wrapper functions which only adjust the output to
 * different flavors like an object, string or hex values.
 * @param {String|Array|Number} color A valid HTML or CSS styled color value, e.g. '#12ab21', '#abc', 'black'
 * or 'rgb(12, 132, 233)'. This can also be an array containing three color values either from 0.0 to 1.0 or
 * from 0 to 255. They will be interpreted as red, green, and blue values. In case this is a number this method
 * expects the parameters ag and ab.
 * @param {Number} ag
 * @param {Number} ab
 * @returns {Array} RGB color values as an array [r, g, b] with values ranging from 0 to 255.
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgbParser = function(color, ag, ab) {
    var color_string, channels, re, processor, bits, i, r, g, b, values = color, testFloat;
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(color)) {
        return [];
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(ag) && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(ab)) {
        values = [
            color,
            ag,
            ab
        ];
    }
    color_string = values;
    testFloat = false;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(color_string)) {
        for(i = 0; i < 3; i++){
            testFloat = testFloat || /\./.test(values[i].toString());
        }
        for(i = 0; i < 3; i++){
            testFloat = testFloat && values[i] >= 0.0 && values[i] <= 1.0;
        }
        if (testFloat) {
            return [
                Math.ceil(values[0] * 255),
                Math.ceil(values[1] * 255),
                Math.ceil(values[2] * 255)
            ];
        }
        return values;
    }
    if (typeof values === "string") {
        color_string = values;
    }
    // strip any leading #
    if (color_string.charAt(0) === "#") {
        // remove # if any
        color_string = color_string.slice(1, 7);
    }
    color_string = color_string.replace(/ /g, "").toLowerCase();
    // before getting into regexps, try simple matches
    // and overwrite the input
    color_string = simpleColors[color_string] || color_string;
    // search through the colorDefs definitions to find a match
    for(i = 0; i < colorDefs.length; i++){
        re = colorDefs[i].re;
        processor = colorDefs[i].process;
        bits = re.exec(color_string);
        if (bits) {
            channels = processor(bits);
            r = channels[0];
            g = channels[1];
            b = channels[2];
        }
    }
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
        return [];
    }
    // validate/cleanup values
    r = r < 0 || isNaN(r) ? 0 : r > 255 ? 255 : r;
    g = g < 0 || isNaN(g) ? 0 : g > 255 ? 255 : g;
    b = b < 0 || isNaN(b) ? 0 : b > 255 ? 255 : b;
    return [
        r,
        g,
        b
    ];
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isColor = function(strColor) {
    var s = new Option().style;
    s.color = strColor;
    return s.color !== '';
};
/**
 * Converts a valid HTML/CSS color string into a string of the 'rgb(r, g, b)' format.
 * @param {String|Array|Number} color A valid HTML or CSS styled color value, e.g. '#12ab21', '#abc', 'black'
 * or 'rgb(12, 132, 233)'. This can also be an array containing three color values either from 0.0 to 1.0 or
 * from 0 to 255. They will be interpreted as red, green, and blue values. In case this is a number this method
 * expects the parameters ag and ab.
 * @param {Number} ag
 * @param {Number} ab
 * @returns {String} A 'rgb(r, g, b)' formatted string
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgb2css = function(color, ag, ab) {
    var r;
    r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgbParser(color, ag, ab);
    return "rgb(" + r[0] + ", " + r[1] + ", " + r[2] + ")";
};
/**
 * Converts a valid HTML/CSS color string into a HTML rgb string.
 * @param {String|Array|Number} color A valid HTML or CSS styled color value, e.g. '#12ab21', '#abc', 'black'
 * or 'rgb(12, 132, 233)'. This can also be an array containing three color values either from 0.0 to 1.0 or
 * from 0 to 255. They will be interpreted as red, green, and blue values. In case this is a number this method
 * expects the parameters ag and ab.
 * @param {Number} ag
 * @param {Number} ab
 * @returns {String} A '#rrggbb' formatted string
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgb2hex = function(color, ag, ab) {
    var r, g, b;
    r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgbParser(color, ag, ab);
    g = r[1];
    b = r[2];
    r = r[0];
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    if (r.length === 1) {
        r = "0" + r;
    }
    if (g.length === 1) {
        g = "0" + g;
    }
    if (b.length === 1) {
        b = "0" + b;
    }
    return "#" + r + g + b;
};
/**
 * Converts a valid HTML/CSS color string from the '#rrggbb' format into the 'rgb(r, g, b)' format.
 * @param {String} hex A valid HTML or CSS styled color value, e.g. '#12ab21', '#abc', or 'black'
 * @deprecated Use {@link JXG#rgb2css} instead.
 * @returns {String} A 'rgb(r, g, b)' formatted string
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hex2rgb = function(hex) {
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("JXG.hex2rgb()", "JXG.rgb2css()");
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgb2css(hex);
};
/**
 * Converts HSV color to RGB color.
 * Based on C Code in "Computer Graphics -- Principles and Practice,"
 * Foley et al, 1996, p. 593.
 * See also https://www.had2know.org/technology/hsv-rgb-conversion-formula-calculator.html
 * @param {Number} H value between 0 and 360
 * @param {Number} S value between 0.0 (shade of gray) to 1.0 (pure color)
 * @param {Number} V value between 0.0 (black) to 1.0 (white)
 * @returns {String} RGB color string
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hsv2rgb = function(H, S, V) {
    var R, G, B, f, i, hTemp, p, q, t;
    H = (H % 360.0 + 360.0) % 360;
    if (S === 0) {
        if (isNaN(H) || H < __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eps) {
            R = V;
            G = V;
            B = V;
        } else {
            return "#ffffff";
        }
    } else {
        if (H >= 360) {
            hTemp = 0.0;
        } else {
            hTemp = H;
        }
        // h is now IN [0,6)
        hTemp = hTemp / 60;
        // largest integer <= h
        i = Math.floor(hTemp);
        // fractional part of h
        f = hTemp - i;
        p = V * (1.0 - S);
        q = V * (1.0 - S * f);
        t = V * (1.0 - S * (1.0 - f));
        switch(i){
            case 0:
                R = V;
                G = t;
                B = p;
                break;
            case 1:
                R = q;
                G = V;
                B = p;
                break;
            case 2:
                R = p;
                G = V;
                B = t;
                break;
            case 3:
                R = p;
                G = q;
                B = V;
                break;
            case 4:
                R = t;
                G = p;
                B = V;
                break;
            case 5:
                R = V;
                G = p;
                B = q;
                break;
        }
    }
    R = Math.round(R * 255).toString(16);
    R = R.length === 2 ? R : R.length === 1 ? "0" + R : "00";
    G = Math.round(G * 255).toString(16);
    G = G.length === 2 ? G : G.length === 1 ? "0" + G : "00";
    B = Math.round(B * 255).toString(16);
    B = B.length === 2 ? B : B.length === 1 ? "0" + B : "00";
    return [
        "#",
        R,
        G,
        B
    ].join("");
};
/**
 * Converts a color from the RGB color space into the HSV space. Input can be any valid HTML/CSS color definition.
 * @param {String|Array|Number} color A valid HTML or CSS styled color value, e.g. '#12ab21', '#abc', 'black'
 * or 'rgb(12, 132, 233)'. This can also be an array containing three color values either from 0.0 to 1.0 or
 * from 0 to 255. They will be interpreted as red, green, and blue values. In case this is a number this method
 * expects the parameters ag and ab. See <a href="https://www.had2know.org/technology/hsv-rgb-conversion-formula-calculator.html">https://www.had2know.org/technology/hsv-rgb-conversion-formula-calculator.html</a>.
 * @param {Number} ag
 * @param {Number} ab
 * @returns {Array} Contains the h, s, and v value in this order.
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgb2hsv = function(color, ag, ab) {
    var r, g, b, fr, fg, fb, fmax, fmin, h, s, v, max, min;
    r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgbParser(color, ag, ab);
    g = r[1];
    b = r[2];
    r = r[0];
    fr = r / 255.0;
    fg = g / 255.0;
    fb = b / 255.0;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    fmax = max / 255.0;
    fmin = min / 255.0;
    v = fmax;
    s = 0.0;
    if (v > 0) {
        s = (v - fmin) / v;
    }
    h = 1.0 / (fmax - fmin);
    if (s > 0) {
        if (max === r) {
            h = (fg - fb) * h;
        } else if (max === g) {
            h = 2 + (fb - fr) * h;
        } else {
            h = 4 + (fr - fg) * h;
        }
    }
    h *= 60;
    if (h < 0) {
        h += 360;
    }
    if (max === min) {
        h = 0.0;
    }
    return [
        h,
        s,
        v
    ];
};
/**
 * Converts a color from the RGB color space into the LMS space. Input can be any valid HTML/CSS color definition.
 * @param {String|Array|Number} color A valid HTML or CSS styled color value, e.g. '#12ab21', '#abc', 'black'
 * or 'rgb(12, 132, 233)'. This can also be an array containing three color values either from 0.0 to 1.0 or
 * from 0 to 255. They will be interpreted as red, green, and blue values. In case this is a number this method
 * expects the parameters ag and ab.
 * @param {Number} ag
 * @param {Number} ab
 * @returns {Array} Contains the l, m, and s value in this order.
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgb2LMS = function(color, ag, ab) {
    var r, g, b, l, m, s, ret, // constants
    matrix = [
        [
            0.05059983,
            0.08585369,
            0.0095242
        ],
        [
            0.01893033,
            0.08925308,
            0.01370054
        ],
        [
            0.00292202,
            0.00975732,
            0.07145979
        ]
    ];
    r = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgbParser(color, ag, ab);
    g = r[1];
    b = r[2];
    r = r[0];
    // de-gamma
    // Maybe this can be made faster by using a cache
    r = Math.pow(r, 0.476190476);
    g = Math.pow(g, 0.476190476);
    b = Math.pow(b, 0.476190476);
    l = r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2];
    m = r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2];
    s = r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2];
    ret = [
        l,
        m,
        s
    ];
    ret.l = l;
    ret.m = m;
    ret.s = s;
    return ret;
};
/**
 * Convert color information from LMS to RGB color space.
 * @param {Number} l
 * @param {Number} m
 * @param {Number} s
 * @returns {Array} Contains the r, g, and b value in this order.
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].LMS2rgb = function(l, m, s) {
    var r, g, b, ret, // constants
    matrix = [
        [
            30.830854,
            -29.832659,
            1.610474
        ],
        [
            -6.481468,
            17.715578,
            -2.532642
        ],
        [
            -0.37569,
            -1.199062,
            14.273846
        ]
    ], // re-gamma, inspired by GIMP modules/display-filter-color-blind.c:
    // Copyright (C) 2002-2003 Michael Natterer <mitch@gimp.org>,
    //                         Sven Neumann <sven@gimp.org>,
    //                         Robert Dougherty <bob@vischeck.com> and
    //                         Alex Wade <alex@vischeck.com>
    // This code is an implementation of an algorithm described by Hans Brettel,
    // Francoise Vienot and John Mollon in the Journal of the Optical Society of
    // America V14(10), pg 2647. (See http://vischeck.com/ for more info.)
    lut_lookup = function(value) {
        var offset = 127, step = 64;
        while(step > 0){
            if (Math.pow(offset, 0.476190476) > value) {
                offset -= step;
            } else {
                if (Math.pow(offset + 1, 0.476190476) > value) {
                    return offset;
                }
                offset += step;
            }
            step /= 2;
        }
        /*  the algorithm above can't reach 255  */ if (offset === 254 && 13.994955247 < value) {
            return 255;
        }
        return offset;
    };
    // transform back to rgb
    r = l * matrix[0][0] + m * matrix[0][1] + s * matrix[0][2];
    g = l * matrix[1][0] + m * matrix[1][1] + s * matrix[1][2];
    b = l * matrix[2][0] + m * matrix[2][1] + s * matrix[2][2];
    r = lut_lookup(r);
    g = lut_lookup(g);
    b = lut_lookup(b);
    ret = [
        r,
        g,
        b
    ];
    ret.r = r;
    ret.g = g;
    ret.b = b;
    return ret;
};
/**
 * Splits a RGBA color value like #112233AA into it's RGB and opacity parts.
 * @param {String} rgba A RGBA color value
 * @returns {Array} An array containing the rgb color value in the first and the opacity in the second field.
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgba2rgbo = function(rgba) {
    var opacity;
    if (rgba.length === 9 && rgba.charAt(0) === "#") {
        opacity = parseInt(rgba.slice(7, 9).toUpperCase(), 16) / 255;
        rgba = rgba.slice(0, 7);
    } else {
        opacity = 1;
    }
    return [
        rgba,
        opacity
    ];
};
/**
 * Generates a RGBA color value like #112233AA from it's RGB and opacity parts.
 * @param {String|Array} rgb A valid HTML or CSS styled color value, e.g. '#12ab21', '#abc', 'black'
 * or 'rgb(12, 132, 233)'. This can also be an array containing three color values either from 0.0 to 1.0 or
 * from 0 to 255. They will be interpreted as red, green, and blue values.
 * @param {Number} o The desired opacity >=0, <=1.
 * @returns {String} The RGBA color value.
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgbo2rgba = function(rgb, o) {
    var rgba;
    if (rgb === "none" || rgb === "transparent") {
        return rgb;
    }
    rgba = Math.round(o * 255).toString(16);
    if (rgba.length === 1) {
        rgba = "0" + rgba;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgb2hex(rgb) + rgba;
};
/**
 * Decolorizes the given color.
 * @param {String} color HTML string containing the HTML color code.
 * @returns {String} Returns a HTML color string
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgb2bw = function(color) {
    var x, tmp, arr, HexChars = "0123456789ABCDEF";
    if (color === "none") {
        return color;
    }
    arr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgbParser(color);
    x = Math.floor(0.3 * arr[0] + 0.59 * arr[1] + 0.11 * arr[2]);
    // rgbParser and Math.floor ensure that x is 0 <= x <= 255.
    // Bitwise operators can be used.
    /*jslint bitwise: true*/ tmp = HexChars.charAt(x >> 4 & 0xf) + HexChars.charAt(x & 0xf);
    color = "#" + tmp + tmp + tmp;
    return color;
};
/**
 * Converts a color into how a colorblind human approximately would see it.
 * @param {String} color HTML string containing the HTML color code.
 * @param {String} deficiency The type of color blindness. Possible
 * options are <i>protanopia</i>, <i>deuteranopia</i>, and <i>tritanopia</i>.
 * @returns {String} Returns a HTML color string
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgb2cb = function(color, deficiency) {
    var rgb, l, m, s, lms, tmp, a1, b1, c1, a2, b2, c2, inflection, HexChars = "0123456789ABCDEF";
    if (color === "none") {
        return color;
    }
    lms = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgb2LMS(color);
    l = lms[0];
    m = lms[1];
    s = lms[2];
    deficiency = deficiency.toLowerCase();
    switch(deficiency){
        case "protanopia":
            a1 = -0.06150039994295001;
            b1 = 0.08277001656812001;
            c1 = -0.013200141220000003;
            a2 = 0.05858939668799999;
            b2 = -0.07934519995360001;
            c2 = 0.013289415272000003;
            inflection = 0.6903216543277437;
            tmp = s / m;
            if (tmp < inflection) {
                l = -(b1 * m + c1 * s) / a1;
            } else {
                l = -(b2 * m + c2 * s) / a2;
            }
            break;
        case "tritanopia":
            a1 = -0.00058973116217;
            b1 = 0.007690316482;
            c1 = -0.01011703519052;
            a2 = 0.025495080838999994;
            b2 = -0.0422740347;
            c2 = 0.017005316784;
            inflection = 0.8349489908460004;
            tmp = m / l;
            if (tmp < inflection) {
                s = -(a1 * l + b1 * m) / c1;
            } else {
                s = -(a2 * l + b2 * m) / c2;
            }
            break;
        default:
            a1 = -0.06150039994295001;
            b1 = 0.08277001656812001;
            c1 = -0.013200141220000003;
            a2 = 0.05858939668799999;
            b2 = -0.07934519995360001;
            c2 = 0.013289415272000003;
            inflection = 0.5763833686400911;
            tmp = s / l;
            if (tmp < inflection) {
                m = -(a1 * l + c1 * s) / b1;
            } else {
                m = -(a2 * l + c2 * s) / b2;
            }
            break;
    }
    rgb = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].LMS2rgb(l, m, s);
    // LMS2rgb returns an array of values ranging from 0 to 255 (both included)
    // bitwise operators are safe to use.
    /*jslint bitwise: true*/ tmp = HexChars.charAt(rgb[0] >> 4 & 0xf) + HexChars.charAt(rgb[0] & 0xf);
    color = "#" + tmp;
    tmp = HexChars.charAt(rgb[1] >> 4 & 0xf) + HexChars.charAt(rgb[1] & 0xf);
    color += tmp;
    tmp = HexChars.charAt(rgb[2] >> 4 & 0xf) + HexChars.charAt(rgb[2] & 0xf);
    color += tmp;
    return color;
};
/**
 * Lightens (percent > 0) or darkens (percent < 0) the color by the specified factor.
 * @param {String} color
 * @param {Number} percent
 * @returns {String}
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].shadeColor = function(color, percent) {
    var arr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgbParser(color), r = arr[0], g = arr[1], b = arr[2];
    r = parseInt(r + 255 * percent);
    g = parseInt(g + 255 * percent);
    b = parseInt(b + 255 * percent);
    r = r > 0 ? r : 0;
    g = g > 0 ? g : 0;
    b = b > 0 ? b : 0;
    r = r < 255 ? r : 255;
    g = g < 255 ? g : 255;
    b = b < 255 ? b : 255;
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgb2hex([
        r,
        g,
        b
    ]);
};
/**
 * Lightens the color by the specified factor.
 * @param {String} color
 * @param {Number} percent
 * @returns {String}
 *
 * @see JXG.shadeColor
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lightenColor = function(color, percent) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].shadeColor(color, percent);
};
/**
 * Darkens the color by the specified factor.
 * @param {String} color
 * @param {Number} percent
 * @returns {String}
 *
 * @see JXG.shadeColor
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].darkenColor = function(color, percent) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].shadeColor(color, -1 * percent);
};
/**
 * Determines highlight color to a given color. Done by reducing (or increasing) the opacity.
 * @param {String} color HTML RGBA string containing the HTML color code.
 * @returns {String} Returns a HTML RGBA color string
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].autoHighlight = function(colstr) {
    var col = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgba2rgbo(colstr), c = col[0], opa = col[1];
    if (colstr.charAt(0) === "#") {
        if (opa < 0.3) {
            opa *= 1.8;
        } else {
            opa *= 0.4;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgbo2rgba(c, opa);
    }
    return colstr;
};
/**
 * Calculate whether a light or a dark color is needed as a contrast.
 * Especially useful to determine whether white or black font goes
 * better with a given background color.
 * @param {String} hexColor HEX value of color.
 * @param {String} [darkColor="#000000"] HEX string for a dark color.
 * @param {String} [lightColor="#ffffff"] HEX string for a light color.
 * @param {Number} [threshold=8]
 * @returns {String} Returns darkColor or lightColor.
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].contrast = function(hexColor, darkColor, lightColor, threshold) {
    var rgb, black = "#000000", rgbBlack, l1, l2, contrastRatio;
    darkColor = darkColor || "#000000";
    lightColor = lightColor || "#ffffff";
    threshold = threshold || 7;
    // hexColor RGB
    rgb = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgbParser(hexColor);
    // Black RGB
    rgbBlack = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgbParser(black);
    // Calc contrast ratio
    l1 = 0.2126 * Math.pow(rgb[0] / 255, 2.2) + 0.7152 * Math.pow(rgb[1] / 255, 2.2) + 0.0722 * Math.pow(rgb[2] / 255, 2.2);
    l2 = 0.2126 * Math.pow(rgbBlack[0] / 255, 2.2) + 0.7152 * Math.pow(rgbBlack[1] / 255, 2.2) + 0.0722 * Math.pow(rgbBlack[2] / 255, 2.2);
    if (l1 > l2) {
        contrastRatio = Math.floor((l1 + 0.05) / (l2 + 0.05));
    } else {
        contrastRatio = Math.floor((l2 + 0.05) / (l1 + 0.05));
    }
    contrastRatio = contrastRatio - 1;
    // If contrast is more than threshold, return darkColor
    if (contrastRatio > threshold) {
        return darkColor;
    }
    // if not, return lightColor.
    return lightColor;
};
/**
 * Use the color scheme of JSXGraph up to version 1.3.2.
 * This method has to be called before JXG.JSXGraph.initBoard();
 *
 * @see JXG.palette
 * @see JXG.paletteWong
 *
 * @example
 *
 * JXG.setClassicColors();
 * var board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-5, 5, 5,-5]});
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].setClassicColors = function() {
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.elements.strokeColor = "blue";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.elements.fillColor = "red";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.hatch.strokeColor = "blue";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.angle.fillColor = "#ff7f00";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.angle.highlightFillColor = "#ff7f00";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.angle.strokeColor = "#ff7f00";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.angle.label.strokeColor = "blue";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.arc.strokeColor = "blue";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.circle.center.fillColor = "red";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.circle.center.strokeColor = "blue";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.circumcircle.strokeColor = "blue";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.circumcircle.center.fillColor = "red";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.circumcircle.center.strokeColor = "blue";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.circumcirclearc.strokeColor = "blue";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.circumcirclesector.strokeColor = "blue";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.circumcirclesector.fillColor = "green";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.circumcirclesector.highlightFillColor = "green";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.conic.strokeColor = "blue";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.curve.strokeColor = "blue";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.incircle.strokeColor = "blue";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.incircle.center.fillColor = "red";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.incircle.center.strokeColor = "blue";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.inequality.fillColor = "red";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.integral.fillColor = "red";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.integral.curveLeft.color = "red";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.integral.curveRight.color = "red";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.line.strokeColor = "blue";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.point.fillColor = "red";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.point.strokeColor = "red";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.polygon.fillColor = "green";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.polygon.highlightFillColor = "green";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.polygon.vertices.strokeColor = "red";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.polygon.vertices.fillColor = "red";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.regularpolygon.fillColor = "green";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.regularpolygon.highlightFillColor = "green";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.regularpolygon.vertices.strokeColor = "red";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.regularpolygon.vertices.fillColor = "red";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.riemannsum.fillColor = "yellow";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.sector.fillColor = "green";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.sector.highlightFillColor = "green";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.semicircle.center.fillColor = "red";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.semicircle.center.strokeColor = "blue";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.slopetriangle.fillColor = "red";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.slopetriangle.highlightFillColor = "red";
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.turtle.arrow.strokeColor = "blue";
};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], /** @lends JXG */ {
    /**
         * Bang Wong color palette,
         * optimized for various type
         * of color blindness.
         * It contains values for
         * <ul>
         * <li> 'black'
         * <li> 'orange'
         * <li> 'skyblue'
         * <li> 'bluishgreen'
         * <li> 'yellow'
         * <li> 'darkblue'
         * <li> 'vermillion'
         * <li> 'reddishpurple'
         * </ul>
         *
         * As substitutes for standard colors, it contains the following aliases:
         *
         * <ul>
         * <li> black (= #000000)
         * <li> blue (= darkblue)
         * <li> green (= bluishgreen)
         * <li> purple (= reddishpurple)
         * <li> red (= vermillion)
         * <li> white (= #ffffff)
         * </ul>
         *
         * See <a href="https://www.nature.com/articles/nmeth.1618">Bang Wong: "Points of view: Color blindness"</a>
         * and
         * <a href="https://davidmathlogic.com/colorblind/">https://davidmathlogic.com/colorblind/</a>.
         *
         * @name JXG.paletteWong
         * @type Object
         * @see JXG.palette
         * @example
         * var p = board.create('line', [[-1, 1], [2, -3]], {strokeColor: JXG.paletteWong.yellow});
         */ paletteWong: {
        black: "#000000",
        orange: "#E69F00",
        skyblue: "#56B4E9",
        bluishgreen: "#009E73",
        yellow: "#F0E442",
        darkblue: "#0072B2",
        vermillion: "#D55E00",
        reddishpurple: "#CC79A7",
        blue: "#0072B2",
        red: "#D55E00",
        green: "#009E73",
        purple: "#CC79A7",
        white: "#ffffff"
    }
});
/**
 * Default color palette.
 * Contains at least color values for
 * <ul>
 * <li> black
 * <li> blue
 * <li> green
 * <li> purple
 * <li> red
 * <li> white
 * <li> yellow
 * </ul>
 *
 * @name JXG.palette
 * @type Object
 * @default JXG.paletteWong
 * @see JXG.paletteWong
 *
 * @example
 *
 * var p = board.create('line', [[-1, 1], [2, -3]], {strokeColor: JXG.palette.yellow});
 *
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].palette = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].paletteWong;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/encoding.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*global JXG: true, define: true, escape: true, unescape: true*/ /*jslint nomen: true, plusplus: true, bitwise: true*/ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
;
// constants
var UTF8_ACCEPT = 0, // UTF8_REJECT = 12,
UTF8D = [
    // The first part of the table maps bytes to character classes that
    // to reduce the size of the transition table and create bitmasks.
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    9,
    9,
    9,
    9,
    9,
    9,
    9,
    9,
    9,
    9,
    9,
    9,
    9,
    9,
    9,
    9,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    8,
    8,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    10,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    4,
    3,
    3,
    11,
    6,
    6,
    6,
    5,
    8,
    8,
    8,
    8,
    8,
    8,
    8,
    8,
    8,
    8,
    8,
    // The second part is a transition table that maps a combination
    // of a state of the automaton and a character class to a state.
    0,
    12,
    24,
    36,
    60,
    96,
    84,
    12,
    12,
    12,
    48,
    72,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    0,
    12,
    12,
    12,
    12,
    12,
    0,
    12,
    0,
    12,
    12,
    12,
    24,
    12,
    12,
    12,
    12,
    12,
    24,
    12,
    24,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    24,
    12,
    12,
    12,
    12,
    12,
    24,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    24,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    36,
    12,
    36,
    12,
    12,
    12,
    36,
    12,
    12,
    12,
    12,
    12,
    36,
    12,
    36,
    12,
    12,
    12,
    36,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12
];
// Util namespace
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Util = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Util || {};
/**
 * UTF8 encoding routines
 * @namespace
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Util.UTF8 = {
    /**
     * Encode a string to utf-8.
     * @param {String} string
     * @returns {String} utf8 encoded string
     */ encode: function(string) {
        var n, c, utftext = "", len = string.length;
        string = string.replace(/\r\n/g, "\n");
        // See
        // http://ecmanaut.blogspot.ca/2006/07/encoding-decoding-utf8-in-javascript.html
        if (typeof unescape === "function" && typeof encodeURIComponent === "function") {
            return unescape(encodeURIComponent(string));
        }
        for(n = 0; n < len; n++){
            c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if (c > 127 && c < 2048) {
                utftext += String.fromCharCode(c >> 6 | 192);
                utftext += String.fromCharCode(c & 63 | 128);
            } else {
                utftext += String.fromCharCode(c >> 12 | 224);
                utftext += String.fromCharCode(c >> 6 & 63 | 128);
                utftext += String.fromCharCode(c & 63 | 128);
            }
        }
        return utftext;
    },
    /**
     * Decode a string from utf-8.
     * @param {String} utftext to decode
     * @returns {String} utf8 decoded string
     */ decode: function(utftext) {
        /*
                 The following code is a translation from C99 to JavaScript.

                 The original C99 code can be found at
                    https://bjoern.hoehrmann.de/utf-8/decoder/dfa/

                 Original copyright note:

                 Copyright (c) 2008-2009 Bjoern Hoehrmann <bjoern@hoehrmann.de>

                 License: MIT License (see LICENSE.MIT)
            */ var i, charCode, type, j = 0, codepoint = 0, state = UTF8_ACCEPT, chars = [], len = utftext.length, results = [];
        for(i = 0; i < len; i++){
            charCode = utftext.charCodeAt(i);
            type = UTF8D[charCode];
            if (state !== UTF8_ACCEPT) {
                codepoint = charCode & 0x3f | codepoint << 6;
            } else {
                codepoint = 0xff >> type & charCode;
            }
            state = UTF8D[256 + state + type];
            if (state === UTF8_ACCEPT) {
                if (codepoint > 0xffff) {
                    chars.push(0xd7c0 + (codepoint >> 10), 0xdc00 + (codepoint & 0x3ff));
                } else {
                    chars.push(codepoint);
                }
                j++;
                if (j % 10000 === 0) {
                    results.push(String.fromCharCode.apply(null, chars));
                    chars = [];
                }
            }
        }
        results.push(String.fromCharCode.apply(null, chars));
        return results.join("");
    },
    /**
     * Extends the standard charCodeAt() method of the String class to find the ASCII char code of
     * a character at a given position in a UTF8 encoded string.
     * @param {String} str
     * @param {Number} i position of the character
     * @returns {Number}
     */ asciiCharCodeAt: function(str, i) {
        var c = str.charCodeAt(i);
        if (c > 255) {
            switch(c){
                case 8364:
                    c = 128;
                    break;
                case 8218:
                    c = 130;
                    break;
                case 402:
                    c = 131;
                    break;
                case 8222:
                    c = 132;
                    break;
                case 8230:
                    c = 133;
                    break;
                case 8224:
                    c = 134;
                    break;
                case 8225:
                    c = 135;
                    break;
                case 710:
                    c = 136;
                    break;
                case 8240:
                    c = 137;
                    break;
                case 352:
                    c = 138;
                    break;
                case 8249:
                    c = 139;
                    break;
                case 338:
                    c = 140;
                    break;
                case 381:
                    c = 142;
                    break;
                case 8216:
                    c = 145;
                    break;
                case 8217:
                    c = 146;
                    break;
                case 8220:
                    c = 147;
                    break;
                case 8221:
                    c = 148;
                    break;
                case 8226:
                    c = 149;
                    break;
                case 8211:
                    c = 150;
                    break;
                case 8212:
                    c = 151;
                    break;
                case 732:
                    c = 152;
                    break;
                case 8482:
                    c = 153;
                    break;
                case 353:
                    c = 154;
                    break;
                case 8250:
                    c = 155;
                    break;
                case 339:
                    c = 156;
                    break;
                case 382:
                    c = 158;
                    break;
                case 376:
                    c = 159;
                    break;
                default:
                    break;
            }
        }
        return c;
    }
};
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Util.UTF8;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/base64.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, define: true*/ /*jslint nomen: true, plusplus: true, bitwise: true*/ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/encoding.js [app-client] (ecmascript)");
;
;
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", pad = "=";
// Util namespace
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Util = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Util || {};
/**
 * Base64 routines
 * @namespace
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Util.Base64 = {
    // Local helper functions
    /**
     * Extracts one byte from a string and ensures the result is less than or equal to 255.
     * @param {String} s
     * @param {Number} i
     * @returns {Number} <= 255
     * @private
     */ _getByte: function(s, i) {
        return s.charCodeAt(i) & 0xff;
    },
    /**
     * Determines the index of a base64 character in the base64 alphabet.
     * @param {String} s
     * @param {Number} i
     * @returns {Number}
     * @throws {Error} If the character can not be found in the alphabet.
     * @private
     */ _getIndex: function(s, i) {
        return alphabet.indexOf(s.charAt(i));
    },
    /**
     * Encode the given string.
     * @param {String} input
     * @returns {string} base64 encoded version of the input string.
     */ encode: function(input) {
        var i, bin, len, padLen, encInput, buffer = [];
        encInput = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].encode(input);
        len = encInput.length;
        padLen = len % 3;
        for(i = 0; i < len - padLen; i += 3){
            bin = this._getByte(encInput, i) << 16 | this._getByte(encInput, i + 1) << 8 | this._getByte(encInput, i + 2);
            buffer.push(alphabet.charAt(bin >> 18), alphabet.charAt(bin >> 12 & 63), alphabet.charAt(bin >> 6 & 63), alphabet.charAt(bin & 63));
        }
        switch(padLen){
            case 1:
                bin = this._getByte(encInput, len - 1);
                buffer.push(alphabet.charAt(bin >> 2), alphabet.charAt(bin << 4 & 63), pad, pad);
                break;
            case 2:
                bin = this._getByte(encInput, len - 2) << 8 | this._getByte(encInput, len - 1);
                buffer.push(alphabet.charAt(bin >> 10), alphabet.charAt(bin >> 4 & 63), alphabet.charAt(bin << 2 & 63), pad);
                break;
        }
        return buffer.join("");
    },
    /**
     * Decode from Base64
     * @param {String} input Base64 encoded data
     * @param {Boolean} utf8 In case this parameter is true {@link JXG.Util.UTF8.decode} will be applied to
     * the result of the base64 decoder.
     * @throws {Error} If the string has the wrong length.
     * @returns {String}
     */ decode: function(input, utf8) {
        var encInput, i, len, padLen, bin, output, result = [], buffer = [];
        // deactivate regexp linting. Our regex is secure, because we replace everything with ''
        /*jslint regexp:true*/ encInput = input.replace(/[^A-Za-z0-9+/=]/g, "");
        /*jslint regexp:false*/ len = encInput.length;
        if (len % 4 !== 0) {
            throw new Error("JSXGraph/utils/base64: Can't decode string (invalid input length).");
        }
        if (encInput.charAt(len - 1) === pad) {
            padLen = 1;
            if (encInput.charAt(len - 2) === pad) {
                padLen = 2;
            }
            // omit the last four bytes (taken care of after the for loop)
            len -= 4;
        }
        for(i = 0; i < len; i += 4){
            bin = this._getIndex(encInput, i) << 18 | this._getIndex(encInput, i + 1) << 12 | this._getIndex(encInput, i + 2) << 6 | this._getIndex(encInput, i + 3);
            buffer.push(bin >> 16, bin >> 8 & 255, bin & 255);
            // flush the buffer, if it gets too big fromCharCode will crash
            if (i % 10000 === 0) {
                result.push(String.fromCharCode.apply(null, buffer));
                buffer = [];
            }
        }
        switch(padLen){
            case 1:
                bin = this._getIndex(encInput, len) << 12 | this._getIndex(encInput, len + 1) << 6 | this._getIndex(encInput, len + 2);
                buffer.push(bin >> 10, bin >> 2 & 255);
                break;
            case 2:
                bin = this._getIndex(encInput, i) << 6 | this._getIndex(encInput, i + 1);
                buffer.push(bin >> 4);
                break;
        }
        result.push(String.fromCharCode.apply(null, buffer));
        output = result.join("");
        if (utf8) {
            output = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].decode(output);
        }
        return output;
    },
    /**
     * Decode the base64 input data as an array
     * @param {string} input
     * @returns {Array}
     */ decodeAsArray: function(input) {
        var i, dec = this.decode(input), ar = [], len = dec.length;
        for(i = 0; i < len; i++){
            ar[i] = dec.charCodeAt(i);
        }
        return ar;
    }
};
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Util.Base64;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/uuid.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Generate a random uuid.
 * Written by https://www.broofa.com (robert@broofa.com)
 *
 * Copyright (c) 2010 Robert Kieffer
 * Dual licensed under the MIT and GPL licenses.
 * @returns {String}
 * @example
 *   var uuid = JXG.Util.genUUID();
 *   > uuid = '92329D39-6F5C-4520-ABFC-AAB64544E172'
 */ /*global JXG: true, define: true*/ /*jslint nomen: true, plusplus: true, bitwise: true*/ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
;
// constants
var uuidCharsStr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", uuidChars = uuidCharsStr.split("");
/**
 * General utility routines
 * @namespace
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Util = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Util || {};
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Util.genUUID = function(prefix) {
    var r, i, uuid = [], rnd = 0;
    prefix = prefix || "";
    if (prefix !== "" && prefix.slice(prefix.length - 1) !== "-") {
        prefix = prefix + "-";
    }
    for(i = 0; i < 36; i++){
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            uuid[i] = "-";
        } else if (i === 14) {
            uuid[i] = "4";
        } else {
            if (rnd <= 0x02) {
                rnd = 0x2000000 + Math.random() * 0x1000000 | 0;
            }
            r = rnd & 0xf;
            rnd = rnd >> 4;
            uuid[i] = uuidChars[i === 19 ? r & 0x3 | 0x8 : r];
        }
    }
    return prefix + uuid.join("");
};
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Util;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/zip.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
    Copyright 2008-2025
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph and JSXCompressor.

    JSXGraph is free software dual licensed under the GNU LGPL or MIT License.
    JSXCompressor is free software dual licensed under the GNU LGPL or Apache License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT
      OR
      * Apache License Version 2.0

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License, Apache
    License, and the MIT License along with JSXGraph. If not, see
    <https://www.gnu.org/licenses/>, <https://www.apache.org/licenses/LICENSE-2.0.html>,
    and <https://opensource.org/licenses/MIT/>.
 */ /*global JXG: true, define: true*/ /*jslint nomen: true, plusplus: true, bitwise: true*/ /**
 * @fileoverview Utilities for uncompressing and base64 decoding
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
;
// Zip routine constants
var bitReverse = [
    0x00,
    0x80,
    0x40,
    0xc0,
    0x20,
    0xa0,
    0x60,
    0xe0,
    0x10,
    0x90,
    0x50,
    0xd0,
    0x30,
    0xb0,
    0x70,
    0xf0,
    0x08,
    0x88,
    0x48,
    0xc8,
    0x28,
    0xa8,
    0x68,
    0xe8,
    0x18,
    0x98,
    0x58,
    0xd8,
    0x38,
    0xb8,
    0x78,
    0xf8,
    0x04,
    0x84,
    0x44,
    0xc4,
    0x24,
    0xa4,
    0x64,
    0xe4,
    0x14,
    0x94,
    0x54,
    0xd4,
    0x34,
    0xb4,
    0x74,
    0xf4,
    0x0c,
    0x8c,
    0x4c,
    0xcc,
    0x2c,
    0xac,
    0x6c,
    0xec,
    0x1c,
    0x9c,
    0x5c,
    0xdc,
    0x3c,
    0xbc,
    0x7c,
    0xfc,
    0x02,
    0x82,
    0x42,
    0xc2,
    0x22,
    0xa2,
    0x62,
    0xe2,
    0x12,
    0x92,
    0x52,
    0xd2,
    0x32,
    0xb2,
    0x72,
    0xf2,
    0x0a,
    0x8a,
    0x4a,
    0xca,
    0x2a,
    0xaa,
    0x6a,
    0xea,
    0x1a,
    0x9a,
    0x5a,
    0xda,
    0x3a,
    0xba,
    0x7a,
    0xfa,
    0x06,
    0x86,
    0x46,
    0xc6,
    0x26,
    0xa6,
    0x66,
    0xe6,
    0x16,
    0x96,
    0x56,
    0xd6,
    0x36,
    0xb6,
    0x76,
    0xf6,
    0x0e,
    0x8e,
    0x4e,
    0xce,
    0x2e,
    0xae,
    0x6e,
    0xee,
    0x1e,
    0x9e,
    0x5e,
    0xde,
    0x3e,
    0xbe,
    0x7e,
    0xfe,
    0x01,
    0x81,
    0x41,
    0xc1,
    0x21,
    0xa1,
    0x61,
    0xe1,
    0x11,
    0x91,
    0x51,
    0xd1,
    0x31,
    0xb1,
    0x71,
    0xf1,
    0x09,
    0x89,
    0x49,
    0xc9,
    0x29,
    0xa9,
    0x69,
    0xe9,
    0x19,
    0x99,
    0x59,
    0xd9,
    0x39,
    0xb9,
    0x79,
    0xf9,
    0x05,
    0x85,
    0x45,
    0xc5,
    0x25,
    0xa5,
    0x65,
    0xe5,
    0x15,
    0x95,
    0x55,
    0xd5,
    0x35,
    0xb5,
    0x75,
    0xf5,
    0x0d,
    0x8d,
    0x4d,
    0xcd,
    0x2d,
    0xad,
    0x6d,
    0xed,
    0x1d,
    0x9d,
    0x5d,
    0xdd,
    0x3d,
    0xbd,
    0x7d,
    0xfd,
    0x03,
    0x83,
    0x43,
    0xc3,
    0x23,
    0xa3,
    0x63,
    0xe3,
    0x13,
    0x93,
    0x53,
    0xd3,
    0x33,
    0xb3,
    0x73,
    0xf3,
    0x0b,
    0x8b,
    0x4b,
    0xcb,
    0x2b,
    0xab,
    0x6b,
    0xeb,
    0x1b,
    0x9b,
    0x5b,
    0xdb,
    0x3b,
    0xbb,
    0x7b,
    0xfb,
    0x07,
    0x87,
    0x47,
    0xc7,
    0x27,
    0xa7,
    0x67,
    0xe7,
    0x17,
    0x97,
    0x57,
    0xd7,
    0x37,
    0xb7,
    0x77,
    0xf7,
    0x0f,
    0x8f,
    0x4f,
    0xcf,
    0x2f,
    0xaf,
    0x6f,
    0xef,
    0x1f,
    0x9f,
    0x5f,
    0xdf,
    0x3f,
    0xbf,
    0x7f,
    0xff
], cplens = [
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    13,
    15,
    17,
    19,
    23,
    27,
    31,
    35,
    43,
    51,
    59,
    67,
    83,
    99,
    115,
    131,
    163,
    195,
    227,
    258,
    0,
    0
], cplext = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    99,
    99
], cpdist = [
    0x0001,
    0x0002,
    0x0003,
    0x0004,
    0x0005,
    0x0007,
    0x0009,
    0x000d,
    0x0011,
    0x0019,
    0x0021,
    0x0031,
    0x0041,
    0x0061,
    0x0081,
    0x00c1,
    0x0101,
    0x0181,
    0x0201,
    0x0301,
    0x0401,
    0x0601,
    0x0801,
    0x0c01,
    0x1001,
    0x1801,
    0x2001,
    0x3001,
    0x4001,
    0x6001
], cpdext = [
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13
], border = [
    16,
    17,
    18,
    0,
    8,
    7,
    9,
    6,
    10,
    5,
    11,
    4,
    12,
    3,
    13,
    2,
    14,
    1,
    15
], NAMEMAX = 256;
// Util namespace
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Util = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Util || {};
/**
 * @class Unzip class
 * Class for gunzipping, unzipping and base64 decoding of files.
 * It is used for reading GEONExT, Geogebra and Intergeo files.
 *
 * Only Huffman codes are decoded in gunzip.
 * The code is based on the source code for gunzip.c by Pasi Ojala
 * @see http://www.cs.tut.fi/~albert/Dev/gunzip/gunzip.c
 * @see http://www.cs.tut.fi/~albert
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Util.Unzip = function(barray) {
    var gpflags, // SIZE,
    fileout, flens, fmax, outputArr = [], files = 0, unzipped = [], buf32k = new Array(32768), bIdx = 0, modeZIP = false, barraylen = barray.length, bytepos = 0, bb = 1, // bits = 0,
    literalTree = new Array(288), distanceTree = new Array(32), treepos = 0, Places = null, // crc,
    // output = "",
    // debug = false,
    // bitpos = 0,
    // Places2 = null,
    // impDistanceTree = new Array(64),
    // impLengthTree = new Array(64),
    len = 0, fpos = new Array(17), nameBuf = [];
    fpos[0] = 0;
    function readByte() {
        // bits += 8;
        if (bytepos < barraylen) {
            return barray[bytepos++];
        }
        return -1;
    }
    function byteAlign() {
        bb = 1;
    }
    function readBit() {
        var carry;
        // Prevent problems on iOS7 with >>
        try {
            // bits++;
            carry = bb & 1;
            bb >>= 1;
            if (bb === 0) {
                bb = readByte();
                carry = bb & 1;
                bb = bb >> 1 | 0x80;
            }
        } catch (e) {
            console.log("Probably problems on iOS7 with >>");
            throw e;
        }
        return carry;
    }
    function readBits(a) {
        var res = 0, i = a;
        // Prevent problems on iOS7 with >>
        try {
            while(i--){
                res = res << 1 | readBit();
            }
            if (a) {
                res = bitReverse[res] >> 8 - a;
            }
        } catch (e) {
            console.log("Probably problems on iOS7 with >>");
            throw e;
        }
        return res;
    }
    function flushBuffer() {
        bIdx = 0;
    }
    function addBuffer(a) {
        // SIZE++;
        buf32k[bIdx++] = a;
        outputArr.push(String.fromCharCode(a));
        if (bIdx === 0x8000) {
            bIdx = 0;
        }
    }
    function HufNode() {
        this.b0 = 0;
        this.b1 = 0;
        this.jump = null;
        this.jumppos = -1;
    }
    function isPat() {
        var endless = true;
        while(endless){
            if (fpos[len] >= fmax) {
                return -1;
            }
            if (flens[fpos[len]] === len) {
                return fpos[len]++;
            }
            fpos[len]++;
        }
    }
    function rec() {
        var curplace = Places[treepos], tmp;
        if (len === 17) {
            return -1;
        }
        treepos++;
        len++;
        tmp = isPat();
        if (tmp >= 0) {
            /* leaf cell for 0-bit */ curplace.b0 = tmp;
        } else {
            /* Not a Leaf cell */ curplace.b0 = 0x8000;
            if (rec()) {
                return -1;
            }
        }
        tmp = isPat();
        if (tmp >= 0) {
            /* leaf cell for 1-bit */ curplace.b1 = tmp;
            /* Just for the display routine */ curplace.jump = null;
        } else {
            /* Not a Leaf cell */ curplace.b1 = 0x8000;
            curplace.jump = Places[treepos];
            curplace.jumppos = treepos;
            if (rec()) {
                return -1;
            }
        }
        len--;
        return 0;
    }
    function createTree(currentTree, numval, lengths, show) {
        var i;
        Places = currentTree;
        treepos = 0;
        flens = lengths;
        fmax = numval;
        for(i = 0; i < 17; i++){
            fpos[i] = 0;
        }
        len = 0;
        if (rec()) {
            return -1;
        }
        return 0;
    }
    function decodeValue(currentTree) {
        var len, i, b, endless = true, xtreepos = 0, X = currentTree[xtreepos];
        /* decode one symbol of the data */ while(endless){
            b = readBit();
            if (b) {
                if (!(X.b1 & 0x8000)) {
                    /* If leaf node, return data */ return X.b1;
                }
                X = X.jump;
                len = currentTree.length;
                for(i = 0; i < len; i++){
                    if (currentTree[i] === X) {
                        xtreepos = i;
                        break;
                    }
                }
            } else {
                if (!(X.b0 & 0x8000)) {
                    /* If leaf node, return data */ return X.b0;
                }
                xtreepos++;
                X = currentTree[xtreepos];
            }
        }
    }
    function deflateLoop() {
        var last, c, type, i, j, l, ll, ll2, len, blockLen, dist, cSum, n, literalCodes, distCodes, lenCodes, endless = true;
        do {
            last = readBit();
            type = readBits(2);
            if (type === 0) {
                // Stored
                byteAlign();
                blockLen = readByte();
                blockLen |= readByte() << 8;
                cSum = readByte();
                cSum |= readByte() << 8;
                if ((blockLen ^ ~cSum) & 0xffff) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug("BlockLen checksum mismatch\n");
                }
                while(blockLen--){
                    c = readByte();
                    addBuffer(c);
                }
            } else if (type === 1) {
                /* Fixed Huffman tables -- fixed decode routine */ while(endless){
                    /*
                         256    0000000        0
                         :   :     :
                         279    0010111        23
                         0   00110000    48
                         :    :      :
                         143    10111111    191
                         280 11000000    192
                         :    :      :
                         287 11000111    199
                         144    110010000    400
                         :    :       :
                         255    111111111    511

                         Note the bit order!
                         */ j = bitReverse[readBits(7)] >> 1;
                    if (j > 23) {
                        j = j << 1 | readBit(); /* 48..255 */ 
                        if (j > 199) {
                            /* 200..255 */ j -= 128; /*  72..127 */ 
                            j = j << 1 | readBit(); /* 144..255 << */ 
                        } else {
                            /*  48..199 */ j -= 48; /*   0..151 */ 
                            if (j > 143) {
                                j = j + 136; /* 280..287 << */ 
                            /*   0..143 << */ }
                        }
                    } else {
                        /*   0..23 */ j += 256; /* 256..279 << */ 
                    }
                    if (j < 256) {
                        addBuffer(j);
                    } else if (j === 256) {
                        break;
                    } else {
                        j -= 256 + 1; /* bytes + EOF */ 
                        len = readBits(cplext[j]) + cplens[j];
                        j = bitReverse[readBits(5)] >> 3;
                        if (cpdext[j] > 8) {
                            dist = readBits(8);
                            dist |= readBits(cpdext[j] - 8) << 8;
                        } else {
                            dist = readBits(cpdext[j]);
                        }
                        dist += cpdist[j];
                        for(j = 0; j < len; j++){
                            c = buf32k[bIdx - dist & 0x7fff];
                            addBuffer(c);
                        }
                    }
                } // while
            } else if (type === 2) {
                // "static" just to preserve stack
                ll = new Array(288 + 32);
                // Dynamic Huffman tables
                literalCodes = 257 + readBits(5);
                distCodes = 1 + readBits(5);
                lenCodes = 4 + readBits(4);
                for(j = 0; j < 19; j++){
                    ll[j] = 0;
                }
                // Get the decode tree code lengths
                for(j = 0; j < lenCodes; j++){
                    ll[border[j]] = readBits(3);
                }
                len = distanceTree.length;
                for(i = 0; i < len; i++){
                    distanceTree[i] = new HufNode();
                }
                if (createTree(distanceTree, 19, ll, 0)) {
                    flushBuffer();
                    return 1;
                }
                //read in literal and distance code lengths
                n = literalCodes + distCodes;
                i = 0;
                // z = -1;
                while(i < n){
                    // z++;
                    j = decodeValue(distanceTree);
                    // length of code in bits (0..15)
                    if (j < 16) {
                        ll[i++] = j;
                    // repeat last length 3 to 6 times
                    } else if (j === 16) {
                        j = 3 + readBits(2);
                        if (i + j > n) {
                            flushBuffer();
                            return 1;
                        }
                        l = i ? ll[i - 1] : 0;
                        while(j--){
                            ll[i++] = l;
                        }
                    } else {
                        // 3 to 10 zero length codes
                        if (j === 17) {
                            j = 3 + readBits(3);
                        // j == 18: 11 to 138 zero length codes
                        } else {
                            j = 11 + readBits(7);
                        }
                        if (i + j > n) {
                            flushBuffer();
                            return 1;
                        }
                        while(j--){
                            ll[i++] = 0;
                        }
                    }
                }
                // Can overwrite tree decode tree as it is not used anymore
                len = literalTree.length;
                for(i = 0; i < len; i++){
                    literalTree[i] = new HufNode();
                }
                if (createTree(literalTree, literalCodes, ll, 0)) {
                    flushBuffer();
                    return 1;
                }
                len = literalTree.length;
                for(i = 0; i < len; i++){
                    distanceTree[i] = new HufNode();
                }
                ll2 = [];
                for(i = literalCodes; i < ll.length; i++){
                    ll2[i - literalCodes] = ll[i];
                }
                if (createTree(distanceTree, distCodes, ll2, 0)) {
                    flushBuffer();
                    return 1;
                }
                while(endless){
                    j = decodeValue(literalTree);
                    // In C64: if carry set
                    if (j >= 256) {
                        j -= 256;
                        if (j === 0) {
                            break;
                        }
                        j -= 1;
                        len = readBits(cplext[j]) + cplens[j];
                        j = decodeValue(distanceTree);
                        if (cpdext[j] > 8) {
                            dist = readBits(8);
                            dist |= readBits(cpdext[j] - 8) << 8;
                        } else {
                            dist = readBits(cpdext[j]);
                        }
                        dist += cpdist[j];
                        while(len--){
                            c = buf32k[bIdx - dist & 0x7fff];
                            addBuffer(c);
                        }
                    } else {
                        addBuffer(j);
                    }
                }
            }
        }while (!last)
        flushBuffer();
        byteAlign();
        return 0;
    }
    /**
     * nextFile:
     * Extract the next file from the compressed archive.
     * Calls skipdir() to proceed recursively.
     *
     * @return {Boolean}  false if the end of files' data section has baseElement
     * reached. Then, then all recursive functions are stopped immediately.
     *
     */ function nextFile() {
        /* eslint-disable no-unused-vars */ var i, c, extralen, filelen, size, compSize, crc, method, tmp = [];
        // Prevent problems on iOS7 with >>
        try {
            outputArr = [];
            modeZIP = false;
            tmp[0] = readByte();
            tmp[1] = readByte();
            //GZIP
            if (tmp[0] === 0x78 && tmp[1] === 0xda) {
                deflateLoop();
                unzipped[files] = [
                    outputArr.join(""),
                    "geonext.gxt"
                ];
                files++;
            }
            //GZIP
            if (tmp[0] === 0x1f && tmp[1] === 0x8b) {
                skipdir();
                unzipped[files] = [
                    outputArr.join(""),
                    "file"
                ];
                files++;
            }
            //ZIP
            if (tmp[0] === 0x50 && tmp[1] === 0x4b) {
                modeZIP = true;
                tmp[2] = readByte();
                tmp[3] = readByte();
                if (tmp[2] === 0x03 && tmp[3] === 0x04) {
                    //MODE_ZIP
                    tmp[0] = readByte();
                    tmp[1] = readByte();
                    gpflags = readByte();
                    gpflags |= readByte() << 8;
                    method = readByte();
                    method |= readByte() << 8;
                    readByte();
                    readByte();
                    readByte();
                    readByte();
                    crc = readByte();
                    crc |= readByte() << 8;
                    crc |= readByte() << 16;
                    crc |= readByte() << 24;
                    compSize = readByte();
                    compSize |= readByte() << 8;
                    compSize |= readByte() << 16;
                    compSize |= readByte() << 24;
                    size = readByte();
                    size |= readByte() << 8;
                    size |= readByte() << 16;
                    size |= readByte() << 24;
                    filelen = readByte();
                    filelen |= readByte() << 8;
                    extralen = readByte();
                    extralen |= readByte() << 8;
                    i = 0;
                    nameBuf = [];
                    while(filelen--){
                        c = readByte();
                        if (c === "/" | c === ":") {
                            i = 0;
                        } else if (i < NAMEMAX - 1) {
                            nameBuf[i++] = String.fromCharCode(c);
                        }
                    }
                    if (!fileout) {
                        fileout = nameBuf;
                    }
                    i = 0;
                    while(i < extralen){
                        c = readByte();
                        i++;
                    }
                    // SIZE = 0;
                    if (method === 8) {
                        deflateLoop();
                        unzipped[files] = new Array(2);
                        unzipped[files][0] = outputArr.join("");
                        unzipped[files][1] = nameBuf.join("");
                        files++;
                    }
                    if (skipdir()) {
                        // We are beyond the files' data in the zip archive.
                        // Let's get out immediately...
                        return false;
                    }
                }
                return true;
            }
        } catch (e) {
            console.log("Probably problems on iOS7 with >>");
            throw e;
        }
        return false;
    /* eslint-enable no-unused-vars */ }
    /**
     * Test if the end of the files' data part of the archive has baseElement
     * reached. If not, uncompressing is resumed.
     *
     * @return {Boolean}  true if the end of the files' data sections have
     * been reached.
     *
     * @private
     */ function skipdir() {
        /* eslint-disable no-unused-vars */ var crc, compSize, size, os, i, c, tmp = [];
        if (gpflags & 8) {
            tmp[0] = readByte();
            tmp[1] = readByte();
            tmp[2] = readByte();
            tmp[3] = readByte();
            // signature for data descriptor record: 0x08074b50
            // 12 bytes:
            //  crc 4 bytes
            //  compressed size 4 bytes
            // uncompressed size 4 bytes
            if (tmp[0] === 0x50 && tmp[1] === 0x4b && tmp[2] === 0x07 && tmp[3] === 0x08) {
                crc = readByte();
                crc |= readByte() << 8;
                crc |= readByte() << 16;
                crc |= readByte() << 24;
            } else {
                crc = tmp[0] | tmp[1] << 8 | tmp[2] << 16 | tmp[3] << 24;
            }
            compSize = readByte();
            compSize |= readByte() << 8;
            compSize |= readByte() << 16;
            compSize |= readByte() << 24;
            size = readByte();
            size |= readByte() << 8;
            size |= readByte() << 16;
            size |= readByte() << 24;
        }
        if (modeZIP) {
            if (nextFile()) {
                // A file has been decompressed, we have to proceed
                return false;
            }
        }
        tmp[0] = readByte();
        if (tmp[0] !== 8) {
            // It seems, we are beyond the files' data in the zip archive.
            // We'll skip the rest..
            return true;
        }
        // There is another file in the zip file. We proceed...
        gpflags = readByte();
        readByte();
        readByte();
        readByte();
        readByte();
        readByte();
        os = readByte();
        if (gpflags & 4) {
            tmp[0] = readByte();
            tmp[2] = readByte();
            len = tmp[0] + 256 * tmp[1];
            for(i = 0; i < len; i++){
                readByte();
            }
        }
        if (gpflags & 8) {
            i = 0;
            nameBuf = [];
            c = readByte();
            while(c){
                if (c === "7" || c === ":") {
                    i = 0;
                }
                if (i < NAMEMAX - 1) {
                    nameBuf[i++] = c;
                }
                c = readByte();
            }
        }
        if (gpflags & 16) {
            c = readByte();
            while(c){
                c = readByte();
            }
        }
        if (gpflags & 2) {
            readByte();
            readByte();
        }
        deflateLoop();
        crc = readByte();
        crc |= readByte() << 8;
        crc |= readByte() << 16;
        crc |= readByte() << 24;
        size = readByte();
        size |= readByte() << 8;
        size |= readByte() << 16;
        size |= readByte() << 24;
        if (modeZIP) {
            if (nextFile()) {
                // A file has been decompressed, we have to proceed
                return false;
            }
        }
        // We are here in non-ZIP-files only,
        // In that case the eturn value doesn't matter
        return false;
    /* eslint-enable no-unused-vars */ }
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Util.Unzip.prototype.unzipFile = function(name) {
        var i;
        this.unzip();
        for(i = 0; i < unzipped.length; i++){
            if (unzipped[i][1] === name) {
                return unzipped[i][0];
            }
        }
        return "";
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Util.Unzip.prototype.unzip = function() {
        nextFile();
        return unzipped;
    };
};
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Util;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/dump.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 * @fileoverview The JXG.Dump namespace provides methods to save a board to javascript.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
;
;
/**
 * The JXG.Dump namespace provides classes and methods to save a board to javascript.
 * @namespace
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Dump = {
    /**
     * Adds markers to every element of the board
     * @param {JXG.Board} board
     * @param {Array|String} markers
     * @param {Array} values
     */ addMarkers: function(board, markers, values) {
        var e, l, i;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(markers)) {
            markers = [
                markers
            ];
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(values)) {
            values = [
                values
            ];
        }
        l = Math.min(markers.length, values.length);
        markers.length = l;
        values.length = l;
        for(e in board.objects){
            if (board.objects.hasOwnProperty(e)) {
                for(i = 0; i < l; i++){
                    board.objects[e][markers[i]] = values[i];
                }
            }
        }
    },
    /**
     * Removes markers from every element on the board.
     * @param {JXG.Board} board
     * @param {Array|String} markers
     */ deleteMarkers: function(board, markers) {
        var e, l, i;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(markers)) {
            markers = [
                markers
            ];
        }
        l = markers.length;
        markers.length = l;
        for(e in board.objects){
            if (board.objects.hasOwnProperty(e)) {
                for(i = 0; i < l; i++){
                    delete board.objects[e][markers[i]];
                }
            }
        }
    },
    /**
     * Stringifies a string, i.e. puts some quotation marks around <tt>s</tt> if it is of type string.
     * @param {*} s
     * @returns {String} " + s + "
     */ str: function(s) {
        if (typeof s === "string" && s.slice(0, 7) !== "function") {
            s = '"' + s + '"';
        }
        return s;
    },
    /**
     * Eliminate default values given by {@link JXG.Options} from the attributes object.
     * @param {Object} instance Attribute object of the element
     * @param {Object} s Arbitrary number of objects <tt>instance</tt> will be compared to. Usually these are
     * sub-objects of the {@link JXG.Board#options} structure.
     * @returns {Object} Minimal attributes object
     */ minimizeObject: function(instance, s) {
        var p, pl, i, def = {}, copy = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(instance), defaults = [];
        for(i = 1; i < arguments.length; i++){
            defaults.push(arguments[i]);
        }
        def = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(def, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options.elements, true);
        for(i = defaults.length; i > 0; i--){
            def = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(def, defaults[i - 1], true);
        }
        for(p in def){
            if (def.hasOwnProperty(p)) {
                pl = p.toLowerCase();
                if (typeof def[p] !== "object" && def[p] === copy[pl]) {
                    // console.log("delete", p);
                    delete copy[pl];
                }
            }
        }
        return copy;
    },
    /**
     * Prepare the attributes object for an element to be dumped as JavaScript or JessieCode code.
     * @param {JXG.Board} board
     * @param {JXG.GeometryElement} obj Geometry element which attributes object is generated
     * @returns {Object} An attributes object.
     */ prepareAttributes: function(board, obj) {
        var a, s;
        a = this.minimizeObject(obj.getAttributes(), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options[obj.elType]);
        for(s in obj.subs){
            if (obj.subs.hasOwnProperty(s)) {
                a[s] = this.minimizeObject(obj.subs[s].getAttributes(), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options[obj.elType][s], __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options[obj.subs[s].elType]);
                a[s].id = obj.subs[s].id;
                a[s].name = obj.subs[s].name;
            }
        }
        a.id = obj.id;
        a.name = obj.name;
        return a;
    },
    setBoundingBox: function(methods, board, boardVarName) {
        methods.push({
            obj: boardVarName,
            method: "setBoundingBox",
            params: [
                board.getBoundingBox(),
                board.keepaspectratio
            ]
        });
        return methods;
    },
    /**
     * Generate a save-able structure with all elements. This is used by {@link JXG.Dump#toJessie} and
     * {@link JXG.Dump#toJavaScript} to generate the script.
     * @param {JXG.Board} board
     * @returns {Array} An array with all metadata necessary to save the construction.
     */ dump: function(board) {
        var e, obj, element, s, props = [], methods = [], elementList = [], len = board.objectsList.length;
        this.addMarkers(board, "dumped", false);
        for(e = 0; e < len; e++){
            obj = board.objectsList[e];
            element = {};
            if (!obj.dumped && obj.dump) {
                element.type = obj.getType();
                element.parents = obj.getParents().slice();
                // Extract coordinates of a point
                if (element.type === "point" && element.parents[0] === 1) {
                    element.parents = element.parents.slice(1);
                }
                for(s = 0; s < element.parents.length; s++){
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(element.parents[s]) && element.parents[s][0] !== "'" && element.parents[s][0] !== '"') {
                        element.parents[s] = '"' + element.parents[s] + '"';
                    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(element.parents[s])) {
                        element.parents[s] = "[" + element.parents[s].toString() + "]";
                    }
                }
                element.attributes = this.prepareAttributes(board, obj);
                if (element.type === "glider" && obj.onPolygon) {
                    props.push({
                        obj: obj.id,
                        prop: "onPolygon",
                        val: true
                    });
                }
                elementList.push(element);
            }
        }
        this.deleteMarkers(board, "dumped");
        return {
            elements: elementList,
            props: props,
            methods: methods
        };
    },
    /**
     * Converts an array of different values into a parameter string that can be used by the code generators.
     * @param {Array} a
     * @param {function} converter A function that is used to transform the elements of <tt>a</tt>. Usually
     * {@link JXG.toJSON} or {@link JXG.Dump.toJCAN} are used.
     * @returns {String}
     */ arrayToParamStr: function(a, converter) {
        var i, s = [];
        for(i = 0; i < a.length; i++){
            s.push(converter.call(this, a[i]));
        }
        return s.join(", ");
    },
    /**
     * Converts a JavaScript object into a JCAN (JessieCode Attribute Notation) string.
     * @param {Object} obj A JavaScript object, functions will be ignored.
     * @returns {String} The given object stored in a JCAN string.
     */ toJCAN: function(obj) {
        var i, list, prop;
        switch(typeof obj){
            case "object":
                if (obj) {
                    list = [];
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray(obj)) {
                        for(i = 0; i < obj.length; i++){
                            list.push(this.toJCAN(obj[i]));
                        }
                        return "[" + list.join(",") + "]";
                    }
                    for(prop in obj){
                        if (obj.hasOwnProperty(prop)) {
                            list.push(prop + ": " + this.toJCAN(obj[prop]));
                        }
                    }
                    return "<<" + list.join(", ") + ">> ";
                }
                return "null";
            case "string":
                return "'" + obj.replace(/\\/g, "\\\\").replace(/(["'])/g, "\\$1") + "'";
            case "number":
            case "boolean":
                return obj.toString();
            case "null":
                return "null";
        }
    },
    /**
     * Saves the construction in <tt>board</tt> to JessieCode.
     * @param {JXG.Board} board
     * @returns {String} JessieCode
     */ toJessie: function(board) {
        var i, elements, id, dump = this.dump(board), script = [];
        dump.methods = this.setBoundingBox(dump.methods, board, "$board");
        elements = dump.elements;
        for(i = 0; i < elements.length; i++){
            if (elements[i].attributes.name.length > 0) {
                script.push("// " + elements[i].attributes.name);
            }
            script.push("s" + i + " = " + elements[i].type + "(" + elements[i].parents.join(", ") + ") " + this.toJCAN(elements[i].attributes).replace(/\n/, "\\n") + ";");
            if (elements[i].type === "axis") {
                // Handle the case that remove[All]Ticks had been called.
                id = elements[i].attributes.id;
                if (board.objects[id].defaultTicks === null) {
                    script.push("s" + i + ".removeAllTicks();");
                }
            }
            script.push("");
        }
        for(i = 0; i < dump.methods.length; i++){
            script.push(dump.methods[i].obj + "." + dump.methods[i].method + "(" + this.arrayToParamStr(dump.methods[i].params, this.toJCAN) + ");");
            script.push("");
        }
        for(i = 0; i < dump.props.length; i++){
            script.push(dump.props[i].obj + "." + dump.props[i].prop + " = " + this.toJCAN(dump.props[i].val) + ";");
            script.push("");
        }
        return script.join("\n");
    },
    /**
     * Saves the construction in <tt>board</tt> to JavaScript.
     * @param {JXG.Board} board
     * @returns {String} JavaScript
     */ toJavaScript: function(board) {
        var i, elements, id, dump = this.dump(board), script = [];
        dump.methods = this.setBoundingBox(dump.methods, board, "board");
        elements = dump.elements;
        for(i = 0; i < elements.length; i++){
            script.push('board.create("' + elements[i].type + '", [' + elements[i].parents.join(", ") + "], " + __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].toJSON(elements[i].attributes) + ");");
            if (elements[i].type === "axis") {
                // Handle the case that remove[All]Ticks had been called.
                id = elements[i].attributes.id;
                if (board.objects[id].defaultTicks === null) {
                    script.push('board.objects["' + id + '"].removeTicks(board.objects["' + id + '"].defaultTicks);');
                }
            }
        }
        for(i = 0; i < dump.methods.length; i++){
            script.push(dump.methods[i].obj + "." + dump.methods[i].method + "(" + this.arrayToParamStr(dump.methods[i].params, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].toJSON) + ");");
            script.push("");
        }
        for(i = 0; i < dump.props.length; i++){
            script.push(dump.props[i].obj + "." + dump.props[i].prop + " = " + __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].toJSON(dump.props[i].val) + ";");
            script.push("");
        }
        return script.join("\n");
    }
};
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Dump;
}),
]);

//# sourceMappingURL=c0305_jsxgraph_src_utils_7636bcc8._.js.map