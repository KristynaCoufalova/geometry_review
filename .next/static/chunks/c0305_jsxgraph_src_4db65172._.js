(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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

 */ /*global JXG: true, define: true, jQuery: true, window: true, document: true, navigator: true, require: true, module: true, console: true */ /*jslint nomen:true, plusplus:true, forin:true*/ /**
 * @fileoverview The JSXGraph object is defined in this file. JXG.JSXGraph controls all boards.
 * It has methods to create, save, load and free boards. Additionally some helper functions are
 * defined in this file directly in the JXG namespace.
 */ /**
 * JXG is the top object of JSXGraph and defines the namespace
 *
 * @name JXG
 * @exports jxg as JXG
 * @namespace
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var jxg = {};
// Make sure JXG.extend is not defined.
// If JSXGraph is compiled as an amd module, it is possible that another JSXGraph version is already loaded and we
// therefore must not re-use the global JXG variable. But in this case JXG.extend will already be defined.
// This is the reason for this check.
// The try-statement is necessary, otherwise an error is thrown in certain imports, e.g. in deno.
try {
    if (typeof JXG === "object" && !JXG.extend) {
        jxg = JXG;
    }
} catch (e) {}
// We need the following two methods "extend" and "shortcut" to create the JXG object via JXG.extend.
/**
 * Copy all properties of the <tt>extension</tt> object to <tt>object</tt>.
 * @param {Object} object
 * @param {Object} extension
 * @param {Boolean} [onlyOwn=false] Only consider properties that belong to extension itself, not any inherited properties.
 * @param {Boolean} [toLower=false] If true the keys are convert to lower case. This is needed for visProp, see JXG#copyAttributes
 */ jxg.extend = function(object, extension, onlyOwn, toLower) {
    var e, e2;
    onlyOwn = onlyOwn || false;
    toLower = toLower || false;
    // the purpose of this for...in loop is indeed to use hasOwnProperty only if the caller
    // explicitly wishes so.
    for(e in extension){
        if (!onlyOwn || onlyOwn && extension.hasOwnProperty(e)) {
            if (toLower) {
                e2 = e.toLowerCase();
            } else {
                e2 = e;
            }
            object[e2] = extension[e];
        }
    }
};
/**
 * Set a constant <tt>name</tt> in <tt>object</tt> to <tt>value</tt>. The value can't be changed after declaration.
 * @param {Object} object
 * @param {String} name
 * @param {Number|String|Boolean} value
 * @param {Boolean} ignoreRedefine This should be left at its default: false.
 */ jxg.defineConstant = function(object, name, value, ignoreRedefine) {
    ignoreRedefine = ignoreRedefine || false;
    if (ignoreRedefine && jxg.exists(object[name])) {
        return;
    }
    Object.defineProperty(object, name, {
        value: value,
        writable: false,
        enumerable: true,
        configurable: false
    });
};
/**
 * Copy all properties of the <tt>constants</tt> object in <tt>object</tt> as a constant.
 * @param {Object} object
 * @param {Object} constants
 * @param {Boolean} [onlyOwn=false] Only consider properties that belong to extension itself, not any inherited properties.
 * @param {Boolean} [toUpper=false] If true the keys are convert to lower case. This is needed for visProp, see JXG#copyAttributes
 */ jxg.extendConstants = function(object, constants, onlyOwn, toUpper) {
    var e, e2;
    onlyOwn = onlyOwn || false;
    toUpper = toUpper || false;
    // The purpose of this for...in loop is indeed to use hasOwnProperty only if the caller explicitly wishes so.
    for(e in constants){
        if (!onlyOwn || onlyOwn && constants.hasOwnProperty(e)) {
            if (toUpper) {
                e2 = e.toUpperCase();
            } else {
                e2 = e;
            }
            this.defineConstant(object, e2, constants[e]);
        }
    }
};
jxg.extend(jxg, /** @lends JXG */ {
    /**
         * Store a reference to every board in this central list. This will at some point
         * replace JXG.JSXGraph.boards.
         * @type Object
         */ boards: {},
    /**
         * Store the available file readers in this structure.
         * @type Object
         */ readers: {},
    /**
         * Associative array that keeps track of all constructable elements registered
         * via {@link JXG.registerElement}.
         * @type Object
         */ elements: {},
    /**
         * This registers a new construction element to JSXGraph for the construction via the {@link JXG.Board.create}
         * interface.
         * @param {String} element The elements name. This is case-insensitive, existing elements with the same name
         * will be overwritten.
         * @param {Function} creator A reference to a function taking three parameters: First the board, the element is
         * to be created on, a parent element array, and an attributes object. See {@link JXG.createPoint} or any other
         * <tt>JXG.create...</tt> function for an example.
         */ registerElement: function(element, creator) {
        element = element.toLowerCase();
        this.elements[element] = creator;
    },
    /**
         * Register a file reader.
         * @param {function} reader A file reader. This object has to provide two methods: <tt>prepareString()</tt>
         * and <tt>read()</tt>.
         * @param {Array} ext
         */ registerReader: function(reader, ext) {
        var i, e;
        for(i = 0; i < ext.length; i++){
            e = ext[i].toLowerCase();
            if (typeof this.readers[e] !== "function") {
                this.readers[e] = reader;
            }
        }
    },
    /**
         * Creates a shortcut to a method, e.g. {@link JXG.Board#createElement} is a shortcut to {@link JXG.Board#create}.
         * Sometimes the target is undefined by the time you want to define the shortcut so we need this little helper.
         * @param {Object} object The object the method we want to create a shortcut for belongs to.
         * @param {String} fun The method we want to create a shortcut for.
         * @returns {Function} A function that calls the given method.
         */ shortcut: function(object, fun) {
        return function() {
            return object[fun].apply(this, arguments);
        };
    },
    /**
         * s may be a string containing the name or id of an element or even a reference
         * to the element itself. This function returns a reference to the element. Search order: id, name.
         * @param {JXG.Board} board Reference to the board the element belongs to.
         * @param {String} s String or reference to a JSXGraph element.
         * @returns {Object} Reference to the object given in parameter object
         * @deprecated Use {@link JXG.Board#select}
         */ getRef: function(board, s) {
        jxg.deprecated("JXG.getRef()", "Board.select()");
        return board.select(s);
    },
    /**
         * This is just a shortcut to {@link JXG.getRef}.
         * @deprecated Use {@link JXG.Board#select}.
         */ getReference: function(board, s) {
        jxg.deprecated("JXG.getReference()", "Board.select()");
        return board.select(s);
    },
    /**
         * s may be the string containing the id of an HTML tag that hosts a JSXGraph board.
         * This function returns the reference to the board.
         * @param  {String} s String of an HTML tag that hosts a JSXGraph board
         * @returns {Object} Reference to the board or null.
         */ getBoardByContainerId: function(s) {
        var b;
        for(b in JXG.boards){
            if (JXG.boards.hasOwnProperty(b) && JXG.boards[b].container === s) {
                return JXG.boards[b];
            }
        }
        return null;
    },
    /**
         * This method issues a warning to the developer that the given function is deprecated
         * and, if available, offers an alternative to the deprecated function.
         * @param {String} what Describes the function that is deprecated
         * @param {String} [replacement] The replacement that should be used instead.
         */ deprecated: function(what, replacement) {
        var warning = what + " is deprecated.";
        if (replacement) {
            warning += " Please use " + replacement + " instead.";
        }
        jxg.warn(warning);
    },
    /**
         * Outputs a warning via console.warn(), if available. If console.warn() is
         * unavailable this function will look for an HTML element with the id 'warning'
         * and append the warning to this element's innerHTML.
         * @param {String} warning The warning text
         */ warn: function(warning) {
        if (typeof window === "object" && window.console && console.warn) {
            console.warn("WARNING:", warning);
        } else if (typeof document === "object" && document.getElementById("warning")) {
            document.getElementById("debug").innerHTML += "WARNING: " + warning + "<br />";
        }
    },
    /**
         * Add something to the debug log. If available a JavaScript debug console is used. Otherwise
         * we're looking for a HTML div with id "debug". If this doesn't exist, too, the output is omitted.
         * @param s An arbitrary number of parameters.
         * @see JXG.debugWST
         */ debugInt: function(s) {
        var i, p;
        for(i = 0; i < arguments.length; i++){
            p = arguments[i];
            if (typeof window === "object" && window.console && console.log) {
                console.log(p);
            } else if (typeof document === "object" && document.getElementById("debug")) {
                document.getElementById("debug").innerHTML += p + "<br/>";
            }
        }
    },
    /**
         * Add something to the debug log. If available a JavaScript debug console is used. Otherwise
         * we're looking for a HTML div with id "debug". If this doesn't exist, too, the output is omitted.
         * This method adds a stack trace (if available).
         * @param s An arbitrary number of parameters.
         * @see JXG.debug
         */ debugWST: function(s) {
        var e = new Error();
        jxg.debugInt.apply(this, arguments);
        if (e && e.stack) {
            jxg.debugInt("stacktrace");
            jxg.debugInt(e.stack.split("\n").slice(1).join("\n"));
        }
    },
    /**
         * Add something to the debug log. If available a JavaScript debug console is used. Otherwise
         * we're looking for a HTML div with id "debug". If this doesn't exist, too, the output is omitted.
         * This method adds a line of the stack trace (if available).
         *
         * @param s An arbitrary number of parameters.
         * @see JXG.debug
         */ debugLine: function(s) {
        var e = new Error();
        jxg.debugInt.apply(this, arguments);
        if (e && e.stack) {
            jxg.debugInt("Called from", e.stack.split("\n").slice(2, 3).join("\n"));
        }
    },
    /**
         * Add something to the debug log. If available a JavaScript debug console is used. Otherwise
         * we're looking for a HTML div with id "debug". If this doesn't exist, too, the output is omitted.
         * @param s An arbitrary number of parameters.
         * @see JXG.debugWST
         * @see JXG.debugLine
         * @see JXG.debugInt
         */ debug: function(s) {
        jxg.debugInt.apply(this, arguments);
    },
    themes: {}
});
const __TURBOPACK__default__export__ = jxg;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/reader/file.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG:true, define: true, ActiveXObject:true, jxgBinFileReader:true, DOMParser:true, XMLHttpRequest:true, document:true, navigator:true*/ /*jslint nomen: true, plusplus: true*/ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/env.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/encoding.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$base64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/base64.js [app-client] (ecmascript)");
;
;
;
;
;
/**
 * The FileReader object bundles the file input capabilities of JSXGraph.
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].FileReader = {
    /**
     *
     * @param {String} url
     * @param {JXG.Board} board
     * @param {String} format
     * @param {Boolean} async
     * @param {Function} callback
     *
     * @private
     */ handleRemoteFile: function(url, board, format, async, encoding, callback) {
        var request = false;
        try {
            request = new XMLHttpRequest();
            if (format.toLowerCase() === "raw") {
                request.overrideMimeType("text/plain; charset=" + encoding);
            } else {
                request.overrideMimeType("text/xml; charset=" + encoding);
            }
        } catch (e) {
            try {
                request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (ex) {
                try {
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (exc) {
                    request = false;
                }
            }
        }
        if (!request) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug("AJAX not activated!");
            return;
        }
        request.open("GET", url, async);
        if (format.toLowerCase() === "raw") {
            this.cbp = function() {
                var req = request;
                if (req.readyState === 4) {
                    board(req.responseText);
                }
            };
        } else {
            this.cbp = function() {
                var req = request, text = "";
                if (req.readyState === 4) {
                    // Hack for ancient IEs:
                    // We use the Visual Basic stuff from below.
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(req.responseStream) && // PK: zip, geogebra
                    // 31: gzip, cinderella
                    (req.responseText.slice(0, 2) === "PK" || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].asciiCharCodeAt(req.responseText.slice(0, 1), 0) === 31)) {
                        // After this, text contains the binary? zip-compressed string
                        text = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$base64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].decode(jxgBinFileReader(req));
                    } else {
                        // This is for all browsers except ancient IEs.
                        text = req.responseText;
                    // console.log(text);
                    }
                    this.parseString(text, board, format, callback);
                }
            };
        }
        this.cb = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bind(this.cbp, this);
        // Old style
        request.onreadystatechange = this.cb;
        try {
            request.send(null);
        } catch (ex2) {
            throw new Error("JSXGraph: A problem occurred while trying to read remote file '" + url + "'.");
        }
    },
    /**
     *
     * @param {Blob} url The Blob or File from which to read
     * @param {JXG.Board} board
     * @param {String} format
     * @param {Boolean} async
     * @param {Function} callback
     *
     * @private
     */ handleLocalFile: function(url, board, format, async, encoding, callback) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(async)) {
            async = true;
        }
        if (format.toLowerCase() === "raw") {
            this.cbp = function(e) {
                board(e.target.result);
            };
        } else {
            this.cbp = function(e) {
                var text = e.target.result;
                //console.log(text);
                this.parseString(text, board, format, callback);
            };
        }
        this.cb = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bind(this.cbp, this);
        var reader = new FileReader();
        reader.onload = this.cb;
        if (format.toLowerCase() === "raw") {
            reader.readAsText(url);
        } else {
            reader.readAsText(url, encoding);
        }
    },
    /**
     * Opens a file using the given URL and passes the contents to {@link JXG.FileReader#parseString}
     * @param {String} url
     * @param {JXG.Board|function} board Either a board or in case <tt>format</tt> equals 'raw' this has to be a callback function.
     * @param {String} format The expected file format. Possible values are <dl>
     * <dt>raw</dt><dd>Raw text file. In this case <tt>board</tt> has to be a callback function.</dd>
     * <dt>geonext</dt><dd>Geonext File <a href="https://www.geonext.de">https://www.geonext.de</a></dd>
     * <dt>intergeo</dt><dd>Intergeo file format <a href="https://www.i2geo.net">https://www.i2geo.net</a></dd>
     * <dt>tracenpoche</dt><dd>Tracenpoche construction <a href="https://tracenpoche.sesamath.net/">https://tracenpoche.sesamath.net/</a></dd>
     * <dt>graph</dt><dd>Graph file</dd>
     * <dt>digraph</dt><dd>DiGraph file</dd>
     * <dt>geogebra</dt><dd>Geogebra File <a href="https://www.geogebra.org">https://www.geogebra.org</a></dd>
     * <dl><dt>cdy or cinderella</dt><dd>Cinderella (<a href="https://www.cinderella.de/">https://www.cinderella.de</a></dd>
     * </dl>
     * @param {Boolean} async Call ajax asynchonously.
     * @param {function} callback A function that is run when the board is ready.
     */ parseFileContent: function(url, board, format, async, encoding, callback) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(url) || FileReader === undefined) {
            this.handleRemoteFile(url, board, format, async, encoding, callback);
        } else {
            this.handleLocalFile(url, board, format, async, encoding, callback);
        }
    },
    /**
     * Parses a given string according to the file format given in format.
     * @param {String} str Contents of the file.
     * @param {JXG.Board} board The board the construction in the file should be loaded in.
     * @param {String} format Possible values are <dl>
     * <dt>raw</dt><dd>Raw text file. In this case <tt>board</tt> has to be a callback function.</dd>
     * <dt>geonext</dt><dd>Geonext File <a href="https://www.geonext.de">https://www.geonext.de</a></dd>
     * <dt>intergeo</dt><dd>Intergeo file format <a href="https://www.i2geo.net">https://www.i2geo.net</a></dd>
     * <dt>tracenpoche</dt><dd>Tracenpoche construction <a href="https://tracenpoche.sesamath.net/">https://tracenpoche.sesamath.net/</a></dd>
     * <dt>graph</dt><dd>Graph file</dd>
     * <dt>digraph</dt><dd>DiGraph file</dd>
     * <dt>geogebra</dt><dd>Geogebra File <a href="https://www.geogebra.org">https://www.geogebra.org</a></dd>
     * <dl><dt>cdy or cinderella</dt><dd>Cinderella (<a href="https://www.cinderella.de/">https://www.cinderella.de</a></dd>
     * </dl>
     * @param {function} callback
     */ parseString: function(str, board, format, callback) {
        var Reader, read;
        format = format.toLowerCase();
        Reader = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].readers[format];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(Reader)) {
            read = new Reader(board, str);
            read.read();
        } else if (format === "jessiecode") {} else {
            throw new Error("JSXGraph: There is no reader available for '" + format + "'.");
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isFunction(callback)) {
            callback(board);
        }
    }
};
// The following code is vbscript. This is a workaround to enable binary data downloads via AJAX in
// Microsoft Internet Explorer.
/*jslint evil:true, es5:true, white:true*/ /*jshint multistr:true*/ if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isMetroApp() && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isBrowser && typeof navigator === "object" && /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) && document && document.write) {
    document.write('<script type="text/vbscript">\n\
Function Base64Encode(inData)\n\
  Const Base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"\n\
  Dim cOut, sOut, I\n\
  For I = 1 To LenB(inData) Step 3\n\
    Dim nGroup, pOut, sGroup\n\
    nGroup = &H10000 * AscB(MidB(inData, I, 1)) + _\n\
      &H100 * MyASC(MidB(inData, I + 1, 1)) + MyASC(MidB(inData, I + 2, 1))\n\
    nGroup = Oct(nGroup)\n\
    nGroup = String(8 - Len(nGroup), "0") & nGroup\n\
    pOut = Mid(Base64, CLng("&o" & Mid(nGroup, 1, 2)) + 1, 1) + _\n\
      Mid(Base64, CLng("&o" & Mid(nGroup, 3, 2)) + 1, 1) + _\n\
      Mid(Base64, CLng("&o" & Mid(nGroup, 5, 2)) + 1, 1) + _\n\
      Mid(Base64, CLng("&o" & Mid(nGroup, 7, 2)) + 1, 1)\n\
    sOut = sOut + pOut\n\
  Next\n\
  Select Case LenB(inData) Mod 3\n\
    Case 1: \'8 bit final\n\
      sOut = Left(sOut, Len(sOut) - 2) + "=="\n\
    Case 2: \'16 bit final\n\
      sOut = Left(sOut, Len(sOut) - 1) + "="\n\
  End Select\n\
  Base64Encode = sOut\n\
End Function\n\
\n\
Function MyASC(OneChar)\n\
  If OneChar = "" Then MyASC = 0 Else MyASC = AscB(OneChar)\n\
End Function\n\
\n\
Function jxgBinFileReader(xhr)\n\
    Dim byteString\n\
    Dim b64String\n\
    Dim i\n\
    byteString = xhr.responseBody\n\
    ReDim byteArray(LenB(byteString))\n\
    For i = 1 To LenB(byteString)\n\
        byteArray(i-1) = AscB(MidB(byteString, i, 1))\n\
    Next\n\
    b64String = Base64Encode(byteString)\n\
    jxgBinFileReader = b64String\n\
End Function\n\
</script>\n');
}
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].FileReader;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/jsxgraph.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ /*global JXG: true, document:true, jQuery:true, define: true, window: true*/ /*jslint nomen: true, plusplus: true*/ /**
 * @fileoverview The JSXGraph object is defined in this file. JXG.JSXGraph controls all boards.
 * It has methods to create, save, load and free boards. Additionally some helper functions are
 * defined in this file directly in the JXG namespace.
 *
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/env.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
// import Mat from "./math/math.js";
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$board$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/board.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$reader$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/reader/file.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/options.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/renderer/svg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$vml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/renderer/vml.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$canvas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/renderer/canvas.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$no$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/renderer/no.js [app-client] (ecmascript)");
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
 * Constructs a new JSXGraph singleton object.
 * @class The JXG.JSXGraph singleton stores all properties required
 * to load, save, create and free a board.
 */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].JSXGraph = {
    /**
     * Stores the renderer that is used to draw the boards.
     * @type String
     */ rendererType: function() {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].board.renderer = "no";
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].supportsVML()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].board.renderer = "vml";
            // Ok, this is some real magic going on here. IE/VML always was so
            // terribly slow, except in one place: Examples placed in a moodle course
            // was almost as fast as in other browsers. So i grabbed all the css and
            // lib scripts from our moodle, added them to a jsxgraph example and it
            // worked. next step was to strip all the css/lib code which didn't affect
            // the VML update speed. The following five lines are what was left after
            // the last step and yes - it basically does nothing but reads two
            // properties of document.body on every mouse move. why? we don't know. if
            // you know, please let us know.
            //
            // If we want to use the strict mode we have to refactor this a little bit. Let's
            // hope the magic isn't gone now. Anywho... it's only useful in old versions of IE
            // which should not be used anymore.
            document.onmousemove = function() {
                var t;
                if (document.body) {
                    t = document.body.scrollLeft;
                    t += document.body.scrollTop;
                }
                return t;
            };
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].supportsCanvas()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].board.renderer = "canvas";
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].supportsSVG()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].board.renderer = "svg";
        }
        // we are inside node
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNode() && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].supportsCanvas()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].board.renderer = "canvas";
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNode() || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].renderer === "no") {
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].text.display = "internal";
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].infobox.display = "internal";
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].board.renderer;
    }(),
    /**
     * Initialize the rendering engine
     *
     * @param  {String} box        id of or reference to the div element which hosts the JSXGraph construction
     * @param  {Object} dim        The dimensions of the board
     * @param  {Object} doc        Usually, this is document object of the browser window.  If false or null, this defaults
     * to the document object of the browser.
     * @param  {Object} attrRenderer Attribute 'renderer', specifies the rendering engine. Possible values are 'auto', 'svg',
     *  'canvas', 'no', and 'vml'.
     * @returns {Object}           Reference to the rendering engine object.
     * @private
     */ initRenderer: function(box, dim, doc, attrRenderer) {
        var boxid, renderer;
        // Former version:
        // doc = doc || document
        if ((!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(doc) || doc === false) && typeof document === "object") {
            doc = document;
        }
        if (typeof doc === "object" && box !== null) {
            boxid = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(box) ? doc.getElementById(box) : box;
            // Remove everything from the container before initializing the renderer and the board
            while(boxid.firstChild){
                boxid.removeChild(boxid.firstChild);
            }
        } else {
            boxid = box;
        }
        // If attrRenderer is not supplied take the first available renderer
        if (attrRenderer === undefined || attrRenderer === "auto") {
            attrRenderer = this.rendererType;
        }
        // create the renderer
        if (attrRenderer === "svg") {
            renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](boxid, dim);
        } else if (attrRenderer === "vml") {
            renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$vml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](boxid);
        } else if (attrRenderer === "canvas") {
            renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$canvas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](boxid, dim);
        } else {
            renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$no$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
        }
        return renderer;
    },
    /**
     * Merge the user supplied attributes with the attributes in options.js
     *
     * @param {Object} attributes User supplied attributes
     * @returns {Object} Merged attributes for the board
     *
     * @private
     */ _setAttributes: function(attributes, options) {
        // merge attributes
        var attr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attributes, options, 'board'), // These attributes - which are objects - have to be copied separately.
        list = [
            'drag',
            'fullscreen',
            'intl',
            'keyboard',
            'logging',
            'pan',
            'resize',
            'screenshot',
            'selection',
            'zoom'
        ], len = list.length, i, key;
        for(i = 0; i < len; i++){
            key = list[i];
            attr[key] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attr, options, 'board', key);
        }
        attr.navbar = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes(attr.navbar, options, "navbar");
        // Treat moveTarget separately, because deepCopy will not work here.
        // Reason: moveTarget will be an HTML node and it is prevented that Type.deepCopy will copy it.
        attr.movetarget = attributes.moveTarget || attributes.movetarget || options.board.moveTarget;
        return attr;
    },
    /**
     * Further initialization of the board. Set some properties from attribute values.
     *
     * @param {JXG.Board} board
     * @param {Object} attr attributes object
     * @param {Object} dimensions Object containing dimensions of the canvas
     *
     * @private
     */ _fillBoard: function(board, attr, dimensions) {
        board.initInfobox(attr.infobox);
        board.maxboundingbox = attr.maxboundingbox;
        board.resizeContainer(dimensions.width, dimensions.height, true, true);
        board._createSelectionPolygon(attr);
        board.renderer.drawNavigationBar(board, attr.navbar);
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].boards[board.id] = board;
    },
    /**
     *
     * @param {String|Object} container id of or reference to the HTML element in which the board is painted.
     * @param {Object} attr An object that sets some of the board properties.
     *
     * @private
     */ _setARIA: function(container, attr) {
        var doc = attr.document, node_jsx;
        // Unused variables, made obsolete in db3e50f4dfa8b86b1ff619b578e243a97b41151c
        // doc_glob,
        // newNode,
        // parent,
        // id_label,
        // id_description;
        if (typeof doc !== 'object') {
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isBrowser) {
                return;
            }
            doc = document;
        }
        node_jsx = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString(container) ? doc.getElementById(container) : container;
        node_jsx.setAttribute("role", "region");
        node_jsx.setAttribute("aria-label", attr.title); // set by initBoard( {title:})
    // doc_glob = node_jsx.ownerDocument; // This is the window.document element, needed below.
    // parent = node_jsx.parentNode;
    },
    /**
     * Remove the two corresponding ARIA divs when freeing a board
     *
     * @param {JXG.Board} board
     *
     * @private
     */ _removeARIANodes: function(board) {
        var node, id, doc;
        doc = board.document || document;
        if (typeof doc !== "object") {
            return;
        }
        id = board.containerObj.getAttribute("aria-labelledby");
        node = doc.getElementById(id);
        if (node && node.parentNode) {
            node.parentNode.removeChild(node);
        }
        id = board.containerObj.getAttribute("aria-describedby");
        node = doc.getElementById(id);
        if (node && node.parentNode) {
            node.parentNode.removeChild(node);
        }
    },
    /**
     * Initialize a new board.
     * @param {String|Object} box id of or reference to the HTML element in which the board is painted.
     * @param {Object} attributes An object that sets some of the board properties. Most of these properties can be set via JXG.Options.
     * @param {Array} [attributes.boundingbox=[-5, 5, 5, -5]] An array containing four numbers describing the left, top, right and bottom boundary of the board in user coordinates
     * @param {Boolean} [attributes.keepaspectratio=false] If <tt>true</tt>, the bounding box is adjusted to the same aspect ratio as the aspect ratio of the div containing the board.
     * @param {Boolean} [attributes.showCopyright=false] Show the copyright string in the top left corner.
     * @param {Boolean} [attributes.showNavigation=false] Show the navigation buttons in the bottom right corner.
     * @param {Object} [attributes.zoom] Allow the user to zoom with the mouse wheel or the two-fingers-zoom gesture.
     * @param {Object} [attributes.pan] Allow the user to pan with shift+drag mouse or two-fingers-pan gesture.
     * @param {Object} [attributes.drag] Allow the user to drag objects with a pointer device.
     * @param {Object} [attributes.keyboard] Allow the user to drag objects with arrow keys on keyboard.
     * @param {Boolean} [attributes.axis=false] If set to true, show the axis. Can also be set to an object that is given to both axes as an attribute object.
     * @param {Boolean|Object} [attributes.grid] If set to true, shows the grid. Can also be set to an object that is given to the grid as its attribute object.
     * @param {Boolean} [attributes.registerEvents=true] Register mouse / touch events.
     * @returns {JXG.Board} Reference to the created board.
     *
     * @see JXG.AbstractRenderer#drawNavigationBar
     */ initBoard: function(box, attributes) {
        var originX, originY, unitX, unitY, w, h, offX = 0, offY = 0, renderer, dimensions, bbox, attr, axattr, axattr_x, axattr_y, options, theme = {}, board;
        attributes = attributes || {};
        // Merge a possible theme
        if (attributes.theme !== 'default' && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].themes[attributes.theme])) {
            theme = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].themes[attributes.theme];
        }
        options = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], theme, true);
        attr = this._setAttributes(attributes, options);
        dimensions = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getDimensions(box, attr.document);
        if (attr.unitx || attr.unity) {
            originX = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].def(attr.originx, 150);
            originY = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].def(attr.originy, 150);
            unitX = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].def(attr.unitx, 50);
            unitY = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].def(attr.unity, 50);
        } else {
            bbox = attr.boundingbox;
            if (bbox[0] < attr.maxboundingbox[0]) {
                bbox[0] = attr.maxboundingbox[0];
            }
            if (bbox[1] > attr.maxboundingbox[1]) {
                bbox[1] = attr.maxboundingbox[1];
            }
            if (bbox[2] > attr.maxboundingbox[2]) {
                bbox[2] = attr.maxboundingbox[2];
            }
            if (bbox[3] < attr.maxboundingbox[3]) {
                bbox[3] = attr.maxboundingbox[3];
            }
            // Size of HTML div.
            // If zero, the size is set to a small value to avoid
            // division by zero.
            // w = Math.max(parseInt(dimensions.width, 10), Mat.eps);
            // h = Math.max(parseInt(dimensions.height, 10), Mat.eps);
            w = parseInt(dimensions.width, 10);
            h = parseInt(dimensions.height, 10);
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(bbox) && attr.keepaspectratio) {
                /*
                 * If the boundingbox attribute is given and the ratio of height and width of the
                 * sides defined by the bounding box and the ratio of the dimensions of the div tag
                 * which contains the board do not coincide, then the smaller side is chosen.
                 */ unitX = w / (bbox[2] - bbox[0]);
                unitY = h / (bbox[1] - bbox[3]);
                if (Math.abs(unitX) < Math.abs(unitY)) {
                    unitY = Math.abs(unitX) * unitY / Math.abs(unitY);
                    // Add the additional units in equal portions above and below
                    offY = (h / unitY - (bbox[1] - bbox[3])) * 0.5;
                } else {
                    unitX = Math.abs(unitY) * unitX / Math.abs(unitX);
                    // Add the additional units in equal portions left and right
                    offX = (w / unitX - (bbox[2] - bbox[0])) * 0.5;
                }
            } else {
                unitX = w / (bbox[2] - bbox[0]);
                unitY = h / (bbox[1] - bbox[3]);
            }
            originX = -unitX * (bbox[0] - offX);
            originY = unitY * (bbox[1] + offY);
        }
        renderer = this.initRenderer(box, dimensions, attr.document, attr.renderer);
        this._setARIA(box, attr);
        // Create the board.
        // board.options will contain the user supplied board attributes
        board = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$board$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](box, renderer, attr.id, [
            originX,
            originY
        ], /*attr.zoomfactor * */ attr.zoomx, /*attr.zoomfactor * */ attr.zoomy, unitX, unitY, dimensions.width, dimensions.height, attr);
        board.keepaspectratio = attr.keepaspectratio;
        this._fillBoard(board, attr, dimensions);
        // Create elements like axes, grid, navigation, ...
        board.suspendUpdate();
        attr = board.attr;
        if (attr.axis) {
            axattr = typeof attr.axis === "object" ? attr.axis : {};
            // The defaultAxes attributes are overwritten by user supplied axis object.
            axattr_x = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(options.board.defaultaxes.x, axattr);
            axattr_y = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(options.board.defaultaxes.y, axattr);
            // The user supplied defaultAxes attributes are merged in.
            if (attr.defaultaxes.x) {
                axattr_x = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(axattr_x, attr.defaultaxes.x);
            }
            if (attr.defaultaxes.y) {
                axattr_y = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy(axattr_y, attr.defaultaxes.y);
            }
            board.defaultAxes = {};
            board.defaultAxes.x = board.create("axis", [
                [
                    0,
                    0
                ],
                [
                    1,
                    0
                ]
            ], axattr_x);
            board.defaultAxes.y = board.create("axis", [
                [
                    0,
                    0
                ],
                [
                    0,
                    1
                ]
            ], axattr_y);
        }
        if (attr.grid) {
            board.create("grid", [], typeof attr.grid === "object" ? attr.grid : {});
        }
        board.unsuspendUpdate();
        return board;
    },
    /**
     * Load a board from a file containing a construction made with either GEONExT,
     * Intergeo, Geogebra, or Cinderella.
     * @param {String|Object} box id of or reference to the HTML element in which the board is painted.
     * @param {String} file base64 encoded string.
     * @param {String} format containing the file format: 'Geonext' or 'Intergeo'.
     * @param {Object} attributes Attributes for the board and 'encoding'.
     *  Compressed files need encoding 'iso-8859-1'. Otherwise it probably is 'utf-8'.
     * @param {Function} callback
     * @returns {JXG.Board} Reference to the created board.
     * @see JXG.FileReader
     * @see JXG.GeonextReader
     * @see JXG.GeogebraReader
     * @see JXG.IntergeoReader
     * @see JXG.CinderellaReader
     *
     * @example
     * // Uncompressed file
     * var board = JXG.JSXGraph.loadBoardFromFile('jxgbox', 'filename', 'geonext',
     *      {encoding: 'utf-8'},
     *      function (board) { console.log("Done loading"); }
     * );
     * // Compressed file
     * var board = JXG.JSXGraph.loadBoardFromFile('jxgbox', 'filename', 'geonext',
     *      {encoding: 'iso-8859-1'},
     *      function (board) { console.log("Done loading"); }
     * );
     *
     * @example
     * // From <input type="file" id="localfile" />
     * var file = document.getElementById('localfile').files[0];
     * JXG.JSXGraph.loadBoardFromFile('jxgbox', file, 'geonext',
     *      {encoding: 'utf-8'},
     *      function (board) { console.log("Done loading"); }
     * );
     */ loadBoardFromFile: function(box, file, format, attributes, callback) {
        var attr, renderer, board, dimensions, encoding;
        attributes = attributes || {};
        attr = this._setAttributes(attributes);
        dimensions = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getDimensions(box, attr.document);
        renderer = this.initRenderer(box, dimensions, attr.document, attr.renderer);
        this._setARIA(box, attr);
        /* User default parameters, in parse* the values in the gxt files are submitted to board */ board = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$board$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](box, renderer, "", [
            150,
            150
        ], 1, 1, 50, 50, dimensions.width, dimensions.height, attr);
        this._fillBoard(board, attr, dimensions);
        encoding = attr.encoding || "iso-8859-1";
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$reader$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].parseFileContent(file, board, format, true, encoding, callback);
        return board;
    },
    /**
     * Load a board from a base64 encoded string containing a construction made with either GEONExT,
     * Intergeo, Geogebra, or Cinderella.
     * @param {String|Object} box id of or reference to the HTML element in which the board is painted.
     * @param {String} string base64 encoded string.
     * @param {String} format containing the file format: 'Geonext', 'Intergeo', 'Geogebra'.
     * @param {Object} attributes Attributes for the board and 'encoding'.
     *  Compressed files need encoding 'iso-8859-1'. Otherwise it probably is 'utf-8'.
     * @param {Function} callback
     * @returns {JXG.Board} Reference to the created board.
     * @see JXG.FileReader
     * @see JXG.GeonextReader
     * @see JXG.GeogebraReader
     * @see JXG.IntergeoReader
     * @see JXG.CinderellaReader
     */ loadBoardFromString: function(box, string, format, attributes, callback) {
        var attr, renderer, board, dimensions;
        attributes = attributes || {};
        attr = this._setAttributes(attributes);
        dimensions = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getDimensions(box, attr.document);
        renderer = this.initRenderer(box, dimensions, attr.document, attr.renderer);
        this._setARIA(box, attr);
        /* User default parameters, in parse* the values in the gxt files are submitted to board */ board = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$board$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](box, renderer, "", [
            150,
            150
        ], 1.0, 1.0, 50, 50, dimensions.width, dimensions.height, attr);
        this._fillBoard(board, attr, dimensions);
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$reader$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].parseString(string, board, format, true, callback);
        return board;
    },
    /**
     * Delete a board and all its contents.
     * @param {JXG.Board|String} board id of or reference to the DOM element in which the board is drawn.
     *
     */ freeBoard: function(board) {
        var el;
        if (typeof board === "string") {
            board = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].boards[board];
        }
        this._removeARIANodes(board);
        board.removeEventHandlers();
        board.suspendUpdate();
        // Remove all objects from the board.
        for(el in board.objects){
            if (board.objects.hasOwnProperty(el)) {
                board.objects[el].remove();
            }
        }
        // Remove all the other things, left on the board, XHTML save
        while(board.containerObj.firstChild){
            board.containerObj.removeChild(board.containerObj.firstChild);
        }
        // Tell the browser the objects aren't needed anymore
        for(el in board.objects){
            if (board.objects.hasOwnProperty(el)) {
                delete board.objects[el];
            }
        }
        // Free the renderer and the algebra object
        delete board.renderer;
        // clear the creator cache
        board.jc.creator.clearCache();
        delete board.jc;
        // Finally remove the board itself from the boards array
        delete __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].boards[board.id];
    },
    /**
     * @deprecated Use JXG#registerElement
     * @param element
     * @param creator
     */ registerElement: function(element, creator) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated("JXG.JSXGraph.registerElement()", "JXG.registerElement()");
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement(element, creator);
    }
};
// JessieScript/JessieCode startup:
// Search for script tags of type text/jessiecode and execute them.
if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isBrowser && typeof window === 'object' && typeof document === 'object') {
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].addEvent(window, 'load', function() {
        var type, i, j, div, id, board, txt, width, height, maxWidth, aspectRatio, cssClasses, bbox, axis, grid, code, src, request, postpone = false, scripts = document.getElementsByTagName("script"), init = function(code, type, bbox) {
            var board = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].JSXGraph.initBoard(id, {
                boundingbox: bbox,
                keepaspectratio: true,
                grid: grid,
                axis: axis,
                showReload: true
            });
            if (type.toLowerCase().indexOf("script") > -1) {
                board.construct(code);
            } else {
                try {
                    board.jc.parse(code);
                } catch (e2) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug(e2);
                }
            }
            return board;
        }, makeReload = function(board, code, type, bbox) {
            return function() {
                var newBoard;
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].JSXGraph.freeBoard(board);
                newBoard = init(code, type, bbox);
                newBoard.reload = makeReload(newBoard, code, type, bbox);
            };
        };
        for(i = 0; i < scripts.length; i++){
            type = scripts[i].getAttribute("type", false);
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(type) && (type.toLowerCase() === "text/jessiescript" || type.toLowerCase() === "jessiescript" || type.toLowerCase() === "text/jessiecode" || type.toLowerCase() === "jessiecode")) {
                cssClasses = scripts[i].getAttribute("class", false) || "";
                width = scripts[i].getAttribute("width", false) || "";
                height = scripts[i].getAttribute("height", false) || "";
                maxWidth = scripts[i].getAttribute("maxwidth", false) || "100%";
                aspectRatio = scripts[i].getAttribute("aspectratio", false) || "1/1";
                bbox = scripts[i].getAttribute("boundingbox", false) || "-5, 5, 5, -5";
                id = scripts[i].getAttribute("container", false);
                src = scripts[i].getAttribute("src", false);
                bbox = bbox.split(",");
                if (bbox.length !== 4) {
                    bbox = [
                        -5,
                        5,
                        5,
                        -5
                    ];
                } else {
                    for(j = 0; j < bbox.length; j++){
                        bbox[j] = parseFloat(bbox[j]);
                    }
                }
                axis = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].str2Bool(scripts[i].getAttribute("axis", false) || "false");
                grid = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].str2Bool(scripts[i].getAttribute("grid", false) || "false");
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(id)) {
                    id = "jessiescript_autgen_jxg_" + i;
                    div = document.createElement("div");
                    div.setAttribute("id", id);
                    txt = width !== "" ? "width:" + width + ";" : "";
                    txt += height !== "" ? "height:" + height + ";" : "";
                    txt += maxWidth !== "" ? "max-width:" + maxWidth + ";" : "";
                    txt += aspectRatio !== "" ? "aspect-ratio:" + aspectRatio + ";" : "";
                    div.setAttribute("style", txt);
                    div.setAttribute("class", "jxgbox " + cssClasses);
                    try {
                        document.body.insertBefore(div, scripts[i]);
                    } catch (e) {
                        // there's probably jquery involved...
                        if (typeof jQuery === "object") {
                            jQuery(div).insertBefore(scripts[i]);
                        }
                    }
                } else {
                    div = document.getElementById(id);
                }
                code = "";
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exists(src)) {
                    postpone = true;
                    request = new XMLHttpRequest();
                    request.open("GET", src);
                    request.overrideMimeType("text/plain; charset=x-user-defined");
                    /* jshint ignore:start */ request.addEventListener("load", function() {
                        if (this.status < 400) {
                            code = this.responseText + "\n" + code;
                            board = init(code, type, bbox);
                            board.reload = makeReload(board, code, type, bbox);
                        } else {
                            throw new Error("\nJSXGraph: failed to load file", src, ":", this.responseText);
                        }
                    });
                    request.addEventListener("error", function(e) {
                        throw new Error("\nJSXGraph: failed to load file", src, ":", e);
                    });
                    /* jshint ignore:end */ request.send();
                } else {
                    postpone = false;
                }
                if (document.getElementById(id)) {
                    code = scripts[i].innerHTML;
                    code = code.replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "");
                    scripts[i].innerHTML = code;
                    if (!postpone) {
                        // Do no wait for data from "src" attribute
                        board = init(code, type, bbox);
                        board.reload = makeReload(board, code, type, bbox);
                    }
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug("JSXGraph: Apparently the div injection failed. Can't create a board, sorry.");
                }
            }
        }
    }, window);
}
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].JSXGraph;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/options3d.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*global JXG:true, define: true*/ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/options.js [app-client] (ecmascript)");
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
    // infobox: {
    //     // strokeColor: 'black',
    //     // useKatex: false,
    //     // useMathjax: false
    // },
    axes3d: {
        /**#@+
         * @visprop
         */ /**
         * Position of the main axes in a View3D element. Possible values are
         * 'center', 'border' or 'none'. This attribute is immutable, i.e.
         * can not be changed during the lifetime of the construction.
         *
         * @type String
         * @name View3D#axesPosition
         * @default 'center'
         */ axesPosition: "center",
        // Main axes
        /**
         * Attributes of the centered 3D x-axis.
         *
         * @type Line3D
         * @name View3D#xAxis
         * @see View3D#axesPosition
         */ xAxis: {
            visible: true,
            point2: {
                name: "x"
            },
            strokeColor: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].palette.red
        },
        /**
         * Attributes of the centered 3D y-axis.
         *
         * @type Line3D
         * @name View3D#yAxis
         * @see View3D#axesPosition
         */ yAxis: {
            visible: true,
            point2: {
                name: "y"
            },
            strokeColor: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].palette.green
        },
        /**
         * Attributes of the centered 3D z-axis.
         *
         * @type Line3D
         * @name View3D#zAxis
         * @see View3D#axesPosition
         */ zAxis: {
            visible: true,
            point2: {
                name: "z"
            },
            strokeColor: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].palette.blue
        },
        /**
         * Attributes of the 3D x-axis at the border.
         *
         * @type Line3D
         * @name View3D#xAxisBorder
         * @see View3D#axesPosition
         * @default <pre>{
         *   name: 'x',
         *   withLabel: false,
         *   label: {
         *       position: '50% left',
         *       offset: [30, 0],
         *       fontsize: 15
         *   },
         *   strokeWidth: 1,
         *   lastArrow: false,
         *   ticks3d: {
         *       label: {
         *           anchorX: 'middle',
         *           anchorY: 'middle'
         *       }
         *   }
         *}
         *</pre>
         */ xAxisBorder: {
            name: 'x',
            visible: 'ìnherit',
            withLabel: false,
            label: {
                position: '50% left',
                offset: [
                    30,
                    0
                ],
                fontsize: 15
            },
            strokeWidth: 1,
            lastArrow: false,
            ticks3d: {
                visible: 'ìnherit',
                label: {
                    anchorX: 'middle',
                    anchorY: 'middle'
                }
            }
        },
        /**
         * Attributes of the 3D y-axis at the border.
         *
         * @type Line3D
         * @name View3D#yAxisBorder
         * @see View3D#axesPosition
         * @default <pre>{
         *   name: 'x',
         *   withLabel: false,
         *   label: {
         *       position: '50% right',
         *       offset: [0, -30],
         *       fontsize: 15
         *   },
         *   strokeWidth: 1,
         *   lastArrow: false,
         *   ticks3d: {
         *       label: {
         *           anchorX: 'middle',
         *       }
         *   }
         *}
         *</pre>
         */ yAxisBorder: {
            name: 'y',
            visible: 'ìnherit',
            withLabel: false,
            label: {
                position: '50% right',
                offset: [
                    0,
                    -30
                ],
                fontsize: 15
            },
            strokeWidth: 1,
            lastArrow: false,
            ticks3d: {
                visible: 'ìnherit',
                label: {
                    anchorX: 'middle'
                }
            }
        },
        /**
         * Attributes of the 3D z-axis at the border.
         *
         * @type Line3D
         * @name View3D#zAxisBorder
         * @see View3D#axesPosition
         * @default <pre>{
         *   name: 'z',
         *   withLabel: false,
         *   label: {
         *       position: '50% right',
         *       offset: [30, 0],
         *       fontsize: 15
         *   },
         *   strokeWidth: 1,
         *   lastArrow: false,
         *   ticks3d: {
         *       label: {
         *           anchorX: 'middle',
         *           anchorY: 'middle'
         *       }
         *   }
         *}
         *</pre>
         */ zAxisBorder: {
            name: 'z',
            visible: 'ìnherit',
            withLabel: false,
            label: {
                position: '50% right',
                offset: [
                    30,
                    0
                ],
                fontsize: 15
            },
            strokeWidth: 1,
            lastArrow: false,
            ticks3d: {
                visible: 'ìnherit',
                label: {
                    anchorX: 'middle',
                    anchorY: 'middle'
                }
            }
        },
        // Planes
        /**
         * Attributes of the 3D plane orthogonal to the x-axis at the "rear" of the cube.
         * @type Plane3D
         * @name View3D#xPlaneRear
         */ xPlaneRear: {
            visible: true,
            layer: 0,
            strokeWidth: 1,
            strokeColor: '#dddddd',
            fillColor: '#dddddd',
            mesh3d: {
                layer: 1
            }
        },
        /**
         * Attributes of the 3D plane orthogonal to the y-axis at the "rear" of the cube.
         * @type Plane3D
         * @name View3D#yPlaneRear
         */ yPlaneRear: {
            visible: true,
            strokeWidth: 1,
            strokeColor: '#dddddd',
            fillColor: '#dddddd',
            layer: 0,
            mesh3d: {
                layer: 1
            }
        },
        /**
         * Attributes of the 3D plane orthogonal to the z-axis at the "rear" of the cube.
         * @type Plane3D
         * @name View3D#zPlaneRear
         */ zPlaneRear: {
            visible: true,
            strokeWidth: 1,
            strokeColor: '#dddddd',
            fillColor: '#dddddd',
            layer: 0,
            mesh3d: {
                layer: 1
            }
        },
        /**
         * Attributes of the 3D plane orthogonal to the x-axis at the "front" of the cube.
         * @type Plane3D
         * @name View3D#xPlaneFront
         */ xPlaneFront: {
            visible: false,
            strokeWidth: 1,
            strokeColor: '#dddddd',
            fillColor: '#dddddd',
            layer: 0,
            mesh3d: {
                layer: 1
            }
        },
        /**
         * Attributes of the 3D plane orthogonal to the y-axis at the "front" of the cube.
         * @type Plane3D
         * @name View3D#yPlaneFront
         */ yPlaneFront: {
            visible: false,
            strokeWidth: 1,
            strokeColor: '#dddddd',
            fillColor: '#dddddd',
            layer: 0,
            mesh3d: {
                layer: 1
            }
        },
        /**
         * Attributes of the 3D plane orthogonal to the z-axis at the "front" of the cube.
         * @type Plane3D
         * @name View3D#zPlaneFront
         */ zPlaneFront: {
            visible: false,
            strokeWidth: 1,
            strokeColor: '#dddddd',
            fillColor: '#dddddd',
            layer: 0,
            mesh3d: {
                layer: 1
            }
        },
        // Axes on the planes
        /**
         * Attributes of the 3D y-axis on the 3D plane orthogonal to the x-axis at the "rear" of the cube.
         * @type Plane3D
         * @name View3D#xPlaneRearYAxis
         */ xPlaneRearYAxis: {
            visible: "inherit",
            strokeColor: "#888888",
            strokeWidth: 1
        },
        /**
         * Attributes of the 3D z-axis on the 3D plane orthogonal to the x-axis at the "rear" of the cube.
         * @type Plane3D
         * @name View3D#xPlaneRearZAxis
         */ xPlaneRearZAxis: {
            visible: "inherit",
            strokeColor: "#888888",
            strokeWidth: 1
        },
        /**
         * Attributes of the 3D y-axis on the 3D plane orthogonal to the x-axis at the "front" of the cube.
         * @type Plane3D
         * @name View3D#xPlaneFrontYAxis
         */ xPlaneFrontYAxis: {
            visible: "inherit",
            strokeColor: "#888888",
            strokeWidth: 1
        },
        /**
         * Attributes of the 3D z-axis on the 3D plane orthogonal to the x-axis at the "front" of the cube.
         * @type Plane3D
         * @name View3D#xPlaneFrontZAxis
         */ xPlaneFrontZAxis: {
            visible: "inherit",
            strokeColor: "#888888",
            strokeWidth: 1
        },
        /**
         * Attributes of the 3D x-axis on the 3D plane orthogonal to the y-axis at the "rear" of the cube.
         * @type Plane3D
         * @name View3D#yPlaneRearXAxis
         */ yPlaneRearXAxis: {
            visible: "inherit",
            strokeColor: "#888888",
            strokeWidth: 1
        },
        /**
         * Attributes of the 3D z-axis on the 3D plane orthogonal to the y-axis at the "rear" of the cube.
         * @type Plane3D
         * @name View3D#yPlaneRearZAxis
         */ yPlaneRearZAxis: {
            visible: "inherit",
            strokeColor: "#888888",
            strokeWidth: 1
        },
        /**
         * Attributes of the 3D x-axis on the 3D plane orthogonal to the y-axis at the "front" of the cube.
         * @type Plane3D
         * @name View3D#yPlaneFrontXAxis
         */ yPlaneFrontXAxis: {
            visible: "inherit",
            strokeColor: "#888888",
            strokeWidth: 1
        },
        /**
         * Attributes of the 3D z-axis on the 3D plane orthogonal to the y-axis at the "front" of the cube.
         * @type Plane3D
         * @name View3D#yPlaneFrontZAxis
         */ yPlaneFrontZAxis: {
            visible: "inherit",
            strokeColor: "#888888",
            strokeWidth: 1
        },
        /**
         * Attributes of the 3D x-axis on the 3D plane orthogonal to the z-axis at the "rear" of the cube.
         * @type Plane3D
         * @name View3D#zPlaneRearXAxis
         */ zPlaneRearXAxis: {
            visible: "inherit",
            strokeColor: "#888888",
            strokeWidth: 1
        },
        /**
         * Attributes of the 3D y-axis on the 3D plane orthogonal to the z-axis at the "rear" of the cube.
         * @type Plane3D
         * @name View3D#zPlaneRearYAxis
         */ zPlaneRearYAxis: {
            visible: "inherit",
            strokeColor: "#888888",
            strokeWidth: 1
        },
        /**
         * Attributes of the 3D x-axis on the 3D plane orthogonal to the z-axis at the "front" of the cube.
         * @type Plane3D
         * @name View3D#zPlaneFrontXAxis
         */ zPlaneFrontXAxis: {
            visible: "inherit",
            strokeColor: "#888888",
            strokeWidth: 1
        },
        /**
         * Attributes of the 3D y-axis on the 3D plane orthogonal to the z-axis at the "front" of the cube.
         * @type Plane3D
         * @name View3D#zPlaneFrontYAxis
         */ zPlaneFrontYAxis: {
            visible: "inherit",
            strokeColor: "#888888",
            strokeWidth: 1
        }
    },
    axis3d: {
        highlight: false,
        fixed: true,
        strokeColor: "black",
        strokeWidth: 1,
        tabindex: null,
        point1: {
            visible: false,
            name: "",
            withLabel: false
        },
        point2: {
            visible: false,
            name: "",
            withLabel: false,
            label: {
                visible: true
            }
        }
    },
    circle3d: {
        layer: 12,
        point: {
            visible: false,
            name: ""
        },
        needsRegularUpdate: true
    },
    curve3d: {
        /**#@+
         * @visprop
         */ layer: 12,
        highlight: false,
        tabindex: -1,
        strokeWidth: 1,
        numberPointsHigh: 200,
        needsRegularUpdate: true
    },
    face3d: {
        /**#@+
         * @visprop
         */ transitionProperties: [],
        layer: 12,
        highlight: false,
        tabindex: null,
        strokeWidth: 1,
        fillColor: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].palette.yellow,
        fillOpacity: 0.4,
        needsRegularUpdate: true,
        /**
         * Shading of faces. For this, the HSL color scheme is used.
         * Two types are possible: either by 'angle' or by 'zIndex'.
         * By default (i.e. type:'angle'), the angle between the camera axis and the normal of the
         * face determines the lightness value of the HSL color. Otherwise, the
         * zIndex of the face determines the lightness value of the HSL color.
         *
         * @type Object
         * @name Face3D#shader
         * @see View3D#depthOrder
         * @default <pre>{
         *  enabled: false,
         *  type: 'angle',   // 'angle', otherwise zIndex
         *  hue: 60,         // yellow
         *  saturation: 90,
         *  minLightness: 30,
         *  maxLightness: 90
         * }</pre>
         *
         * @example
         *         var view = board.create(
         *             'view3d',
         *             [[-5, -3], [8, 8],
         *             [[-3, 3], [-3, 3], [-3, 3]]],
         *             {
         *                 projection: 'central',
         *                 trackball: { enabled: true },
         *                 depthOrder: {
         *                     enabled: true
         *                 },
         *                 xPlaneRear: { visible: false },
         *                 yPlaneRear: { visible: false },
         *                 zPlaneRear: { fillOpacity: 0.2, visible: true }
         *             }
         *         );
         *
         *         let rho = 1.6180339887;
         *         let vertexList = [
         *             [0, -1, -rho], [0, +1, -rho], [0, -1, rho], [0, +1, rho],
         *             [1, rho, 0], [-1, rho, 0], [1, -rho, 0], [-1, -rho, 0],
         *             [-rho, 0, 1], [-rho, 0, -1], [rho, 0, 1], [rho, 0, -1]
         *         ];
         *         let faceArray = [
         *             [4, 1, 11],
         *             [11, 1, 0],
         *             [6, 11, 0],
         *             [0, 1, 9],
         *             [11, 10, 4],
         *             [9, 1, 5],
         *             [8, 9, 5],
         *             [5, 3, 8],
         *             [6, 10, 11],
         *             [2, 3, 10],
         *             [2, 10, 6],
         *             [8, 3, 2],
         *             [3, 4, 10],
         *             [7, 8, 2],
         *             [9, 8, 7],
         *             [0, 9, 7],
         *             [4, 3, 5],
         *             [5, 1, 4],
         *             [0, 7, 6],
         *             [7, 2, 6]
         *         ];
         *         var ico = view.create('polyhedron3d', [vertexList, faceArray], {
         *             fillColorArray: [],
         *             fillOpacity: 1,
         *             strokeWidth: 0.1,
         *             layer: 12,
         *             shader: {
         *                 enabled: true,
         *                 type: 'angle',
         *                 hue: 0,
         *                 saturation: 90,
         *                 minlightness: 60,
         *                 maxLightness: 80
         *             }
         *         });
         *
         * </pre><div id="JXGbf32b040-affb-4e03-a05b-abfe953f614d" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXGbf32b040-affb-4e03-a05b-abfe953f614d',
         *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false,
         *                pan: {enabled: false}, zoom: {enabled: false}});
         *             var view = board.create(
         *                 'view3d',
         *                 [[-5, -3], [8, 8],
         *                 [[-3, 3], [-3, 3], [-3, 3]]],
         *                 {
         *                     projection: 'central',
         *                     trackball: { enabled: true },
         *                     depthOrder: {
         *                         enabled: true
         *                     },
         *                     xPlaneRear: { visible: false },
         *                     yPlaneRear: { visible: false },
         *                     zPlaneRear: { fillOpacity: 0.2, visible: true }
         *                 }
         *             );
         *
         *             let rho = 1.6180339887;
         *             let vertexList = [
         *                 [0, -1, -rho], [0, +1, -rho], [0, -1, rho], [0, +1, rho],
         *                 [1, rho, 0], [-1, rho, 0], [1, -rho, 0], [-1, -rho, 0],
         *                 [-rho, 0, 1], [-rho, 0, -1], [rho, 0, 1], [rho, 0, -1]
         *             ];
         *             let faceArray = [
         *                 [4, 1, 11],
         *                 [11, 1, 0],
         *                 [6, 11, 0],
         *                 [0, 1, 9],
         *                 [11, 10, 4],
         *                 [9, 1, 5],
         *                 [8, 9, 5],
         *                 [5, 3, 8],
         *                 [6, 10, 11],
         *                 [2, 3, 10],
         *                 [2, 10, 6],
         *                 [8, 3, 2],
         *                 [3, 4, 10],
         *                 [7, 8, 2],
         *                 [9, 8, 7],
         *                 [0, 9, 7],
         *                 [4, 3, 5],
         *                 [5, 1, 4],
         *                 [0, 7, 6],
         *                 [7, 2, 6]
         *             ];
         *             var ico = view.create('polyhedron3d', [vertexList, faceArray], {
         *                 fillColorArray: [],
         *                 fillOpacity: 1,
         *                 strokeWidth: 0.1,
         *                 layer: 12,
         *                 shader: {
         *                     enabled: true,
         *                     type: 'angle',
         *                     hue: 0,
         *                     saturation: 90,
         *                     minlightness: 60,
         *                     maxLightness: 80
         *                 }
         *             });
         *
         *     })();
         *
         * </script><pre>
         *
         */ shader: {
            enabled: false,
            type: 'angle',
            hue: 60,
            saturation: 90,
            minLightness: 30,
            maxLightness: 90
        }
    },
    intersectionline3d: {
        point1: {
            visible: false,
            name: ""
        },
        point2: {
            visible: false,
            name: ""
        }
    },
    line3d: {
        /**#@+
         * @visprop
         */ layer: 12,
        strokeWidth: 1,
        strokeColor: "black",
        fixed: true,
        tabindex: null,
        // gradient: "linear",
        // gradientSecondColor: "#ffffff",
        needsRegularUpdate: true,
        /**
         * Attributes of the defining point in case the line is defined by [point, vector, [range]]
         * @type Point3D
         * @name Line3D#point
         * @default <pre>visible: false, name: ""</pre>
         */ point: {
            visible: false,
            name: ""
        },
        /**
         * Attributes of the first point in case the line is defined by [point, point].
         * @type Point3D
         * @name Line3D#point1
         * @default <pre>visible: false, name: ""</pre>
         */ point1: {
            visible: false,
            name: ""
        },
        /**
         * Attributes of the second point in case the line is defined by [point, point].
         * @type Point3D
         * @name Line3D#point2
         * @default <pre>visible: false, name: ""</pre>
         */ point2: {
            visible: false,
            name: ""
        },
        /**
         * If the 3D line is defined by two points and if this attribute is true,
         * the 3D line stretches infinitely in direction of its first point.
         * Otherwise it ends at point1.
         *
         * @name Line3D#straightFirst
         * @see Line3D#straightLast
         * @type Boolean
         * @default false
         */ straightFirst: false,
        /**
         * If the 3D line is defined by two points and if this attribute is true,
         * the 3D line stretches infinitely in direction of its second point.
         * Otherwise it ends at point2.
         *
         * @name Line3D#straightLast
         * @see Line3D#straightFirst
         * @type Boolean
         * @default false
         */ straightLast: false
    },
    mesh3d: {
        /**#@+
         * @visprop
         */ layer: 12,
        strokeWidth: 1,
        strokeColor: "#9a9a9a",
        strokeOpacity: 0.6,
        highlight: false,
        tabindex: null,
        needsRegularUpdate: true,
        /**
         * Step width of the mesh in the direction of the first spanning vector.
         * @type {Number}
         * @name Mesh3D#stepWidthU
         * @default 1
         *
         */ stepWidthU: 1,
        /**
         * Step width of the mesh in the direction of the second spanning vector.
         *
         * @type {Number}
         * @name Mesh3D#stepWidthV
         * @default 1
         *
         */ stepWidthV: 1
    },
    plane3d: {
        /**#@+
         * @visprop
         */ layer: 12,
        strokeWidth: 0,
        strokeColor: "black",
        strokeOpacity: 1,
        highlight: false,
        tabindex: null,
        needsRegularUpdate: true,
        visible: true,
        gradient: "linear",
        gradientSecondColor: "#ffffff",
        gradientAngle: Math.PI,
        fillColor: "#a7a7a7",
        fillOpacity: 0.6,
        /**
         * Optional 3D mesh of a finite plane.
         * It is not available if the plane is infinite (at initialization time) in any direction.
         *
         * @type Mesh3D
         * @name Plane3D#mesh3d
         * @default see {@link Mesh3D}
         */ mesh3d: {
            visible: "inherit"
        },
        /**
         * If the second parameter and the third parameter are given as arrays or functions and threePoints:true
         * then the second and third parameter are interpreted as point coordinates and not as directions, i.e.
         * the plane is defined by three points.
         *
         * @name Plane3D#threePoints
         * @type Boolean
         * @default false
         */ threePoints: false,
        /**
         * Attributes of the defining point in case the plane is defined by [point, direction1, direction2, [range1, [range2]]].
         * @type Point3D
         * @name Plane3D#point
         * @default <pre>visible: false, name: "", fixed: true</pre>
         */ point: {
            visible: false,
            name: "",
            fixed: true
        },
        /**
         * Attributes of the first point in case the plane is defined by [point, point, point].
         * @type Point3D
         * @name Plane3D#point1
         * @default <pre>visible: false, name: ""</pre>
         */ point1: {
            visible: false,
            name: ""
        },
        /**
         * Attributes of the second point in case the plane is defined by [point, point, point].
         * @type Point3D
         * @name Plane3D#point2
         * @default <pre>visible: false, name: ""</pre>
         */ point2: {
            visible: false,
            name: ""
        },
        /**
         * Attributes of the third point in case the plane is defined by [point, point, point].
         * @type Point3D
         * @name Plane3D#point3
         * @default <pre>visible: false, name: ""</pre>
         */ point3: {
            visible: false,
            name: ""
        } // Used in point/point/point
    },
    point3d: {
        layer: 13,
        infoboxDigits: "auto",
        strokeWidth: 0,
        gradient: "radial",
        gradientSecondColor: "#555555",
        fillColor: "yellow",
        highlightStrokeColor: "#555555",
        gradientFX: 0.7,
        gradientFY: 0.3,
        needsRegularUpdate: true
    },
    polygon3d: {
        /**#@+
         * @visprop
         */ layer: 12,
        highlight: false,
        tabindex: -1,
        strokeWidth: 1,
        fillColor: 'none',
        needsRegularUpdate: true
    },
    polyhedron3d: {
        /**#@+
         * @visprop
         */ /**
         * Color array to define fill colors of faces cyclically.
         * Alternatively, the fill color can be defined for each face individually.
         *
         * @type Array
         * @name Polyhedron3D#fillColorArray
         * @default ['white', 'black']
         */ fillColorArray: [
            'white',
            'black'
        ],
        needsRegularUpdate: true
    },
    sphere3d: {
        /**#@+
         * @visprop
         */ layer: 12,
        highlight: false,
        strokeWidth: 1,
        strokeColor: '#00ff80',
        fillColor: 'white',
        gradient: 'radial',
        gradientSecondColor: '#00ff80',
        gradientFX: 0.7,
        gradientFY: 0.3,
        fillOpacity: 0.4,
        needsRegularUpdate: true
    },
    surface3d: {
        /**#@+
         * @visprop
         */ layer: 12,
        highlight: false,
        tabindex: -1,
        strokeWidth: 1,
        /**
         * Number of intervals the mesh is divided into in direction of parameter u.
         * @type Number
         * @name ParametricSurface3D#stepsU
         */ stepsU: 30,
        /**
         * Number of intervals the mesh is divided into in direction of parameter v.
         * @type Number
         * @name ParametricSurface3D#stepsV
         */ stepsV: 30,
        needsRegularUpdate: true
    },
    text3d: {
        /**#@+
         * @visprop
         */ withLabel: false,
        needsRegularUpdate: true
    },
    ticks3d: {
        /**#@+
         * @visprop
         */ visible: true,
        ticksDistance: 1,
        majorHeight: 10,
        minorTicks: 0,
        tickEndings: [
            0,
            1
        ],
        drawLabels: true,
        needsRegularUpdate: true,
        label: {
            visible: true,
            withLabel: false
        }
    },
    vectorfield3d: {
        /**#@+
         * @visprop
         */ /**
         * Scaling factor of the vectors. This in contrast to slope fields, where this attribute sets the vector to the given length.
         * @name scale
         * @memberOf Vectorfield3D.prototype
         * @type {Number|Function}
         * @see Slopefield.scale
         * @default 1
         */ scale: 1,
        /**
         * Customize arrow heads of vectors. Be careful! If enabled this will slow down the performance.
         * Fields are:
         * <ul>
         *  <li> enabled: Boolean
         *  <li> size: length of the arrow head legs (in pixel)
         *  <li> angle: angle of the arrow head legs In radians.
         * </ul>
         * @name arrowhead
         * @memberOf Vectorfield3D.prototype
         * @type {Object}
         * @default <tt>{enabled: true, size: 5, angle: Math.PI * 0.125}</tt>
         */ arrowhead: {
            enabled: true,
            size: 5,
            angle: Math.PI * 0.125
        },
        needsRegularUpdate: true
    },
    view3d: {
        /**#@+
         * @visprop
         */ needsRegularUpdate: true,
        /**
         * When this attribute is enabled, elements closer to the screen are drawn
         * over elements further from the screen within the 3D layer. This affects
         * all elements which are in one of the layer specified in the sub-attribute 'layers'.
         * <p>
         * For each layer this depth ordering is done independently.
         * Sub-attributes:
         *      <ul>
         *          <li><tt>enabled</tt>: false/true
         *          <li><tt>layers</tt>: [12, 13]
         *      </ul>
         *
         * @name View3D#depthOrder
         * @type Object
         * @default <pre>{
         *   enabled: false,
         *   layers: [12, 13]
         * }
         * </pre>
         */ depthOrder: {
            enabled: false,
            layers: [
                12,
                13
            ]
        },
        /**
         * Choose the projection type to be used: `parallel` or `central`.
         * <ul>
         * <li> `parallel` is parallel projection, also called orthographic projection
         * <li> `central` is central projection, also called perspective projection
         * </ul>
         *
         *
         * @name View3D#projection
         * @type String
         * @default 'parallel'
         * @example
         *         var bound = [-5, 5];
         *         var view = board.create('view3d',
         *             [[-6, -3], [8, 8],
         *             [bound, bound, bound]],
         *             {
         *                 projection: 'parallel'
         *             });
         *
         * </pre><div id="JXG80d81b13-c604-4841-bdf6-62996440088a" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG80d81b13-c604-4841-bdf6-62996440088a',
         *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
         *             var bound = [-5, 5];
         *             var view = board.create('view3d',
         *                 [[-6, -3], [8, 8],
         *                 [bound, bound, bound]],
         *                 {
         *                     projection: 'parallel'
         *                 });
         *
         *     })();
         *
         * </script><pre>
         *
         * @example
         *         var bound = [-5, 5];
         *         var view = board.create('view3d',
         *             [[-6, -3], [8, 8],
         *             [bound, bound, bound]],
         *             {
         *                 projection: 'central'
         *             });
         *
         * </pre><div id="JXGdb7b7c99-631c-41d0-99bf-c0a8d0138218" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXGdb7b7c99-631c-41d0-99bf-c0a8d0138218',
         *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
         *             var bound = [-5, 5];
         *             var view = board.create('view3d',
         *                 [[-6, -3], [8, 8],
         *                 [bound, bound, bound]],
         *                 {
         *                     projection: 'central'
         *                 });
         *     })();
         *
         * </script><pre>
         *
         */ projection: 'parallel',
        /**
         * Allow vertical dragging of objects, i.e. in direction of the z-axis.
         * Subobjects are
         * <ul>
         *  <li>enabled: true
         *  <li>key: 'shift'
         * </ul>
         * <p>
         * Possible values for attribute <i>key</i>: 'shift' or 'ctrl'.
         *
         * @name View3D#verticalDrag
         * @type Object
         * @default <tt>{enabled: true, key: 'shift'}</tt>
         */ verticalDrag: {
            enabled: true,
            key: 'shift'
        },
        /**
         * Specify the user handling of the azimuth.
         * <ul>
         *  <li><tt>pointer</tt> sub-attributes:
         *      <ul>
         *          <li><tt>enabled</tt>: Boolean that specifies whether pointer navigation is allowed by azimuth.
         *          <li><tt>speed</tt>: Number indicating how many passes the range of the az_slider makes when the cursor crosses the entire board once in the horizontal direction.
         *          <li><tt>outside</tt>: Boolean that specifies whether the pointer navigation is continued when the cursor leaves the board.
         *          <li><tt>button</tt>: Which button of the pointer should be used? (<tt>'-1'</tt> (=no button), <tt>'0'</tt> or <tt>'2'</tt>)
         *          <li><tt>key</tt>: Should an additional key be pressed? (<tt>'none'</tt>, <tt>'shift'</tt> or <tt>'ctrl'</tt>)
         *      </ul>
         *  <li><tt>keyboard</tt> sub-attributes:
         *      <ul>
         *          <li><tt>enabled</tt>: Boolean that specifies whether the keyboard (left/right arrow keys) can be used to navigate the board.
         *          <li><tt>step</tt>: Size of the step per keystroke.
         *          <li><tt>key</tt>: Should an additional key be pressed? (<tt>'none'</tt>, <tt>'shift'</tt> or <tt>'ctrl'</tt>)
         *      </ul>
         *  <li><tt>continuous</tt>: Boolean that specifies whether the az_slider starts again from the beginning when its end is reached.
         *  <li><tt>slider</tt> attributes of the az_slider ({@link Slider}) with additional
         *      <ul>
         *          <li><tt>min</tt>: Minimum value.
         *          <li><tt>max</tt>: Maximum value.
         *          <li><tt>start</tt>: Start value.
         *      </ul>
         *      'min' and 'max' are used only if trackball is not enabled.
         *     Additionally, the attributes 'slider.point1.pos' and 'slider.point2.pos' control the position of the slider. Possible
         *     values are 'auto' or an array [x, y] of length 2 for the position in user coordinates (or a function returning such an array).
         * </ul>
         *
         * @name View3D#az
         * @type Object
         * @default <pre>{
         *      pointer: {enabled: true, speed: 1, outside: true, button: -1, key: 'none'},
         *      keyboard: {enabled: true, step: 10, key: 'ctrl'},
         *      continuous: true,
         *      slider: {
         *          visible: true,
         *          style: 6,
         *          point1: {
         *              pos: 'auto',
         *              frozen: false
         *          },
         *          point2: {
         *              pos: 'auto',
         *              frozen: false
         *          },
         *          min: 0,
         *          max: 2 * Math.PI,
         *          start: 1.0
         *      },
         * }</pre>
         *
         * @example
         *     var bound = [-4, 6];
         *     var view = board.create('view3d',
         *         [[-4, -3], [8, 8],
         *         [bound, bound, bound]],
         *         {
         *             projection: 'parallel',
         *             az: {
         *                 slider: {visible: true, start: 0.75 * Math.PI}
         *             }
         *         });
         *
         * </pre><div id="JXG4c381f21-f043-4419-941d-75f384c026d0" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG4c381f21-f043-4419-941d-75f384c026d0',
         *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
         *         var bound = [-4, 6];
         *         var view = board.create('view3d',
         *             [[-4, -3], [8, 8],
         *             [bound, bound, bound]],
         *             {
         *                 projection: 'parallel',
         *                 az: {
         *                     slider: {visible: true, start: 0.75 * Math.PI}
         *                 }
         *             });
         *
         *     })();
         *
         * </script><pre>
         *
         */ az: {
            pointer: {
                enabled: true,
                speed: 1,
                outside: true,
                button: -1,
                key: 'none'
            },
            keyboard: {
                enabled: true,
                step: 10,
                key: 'ctrl'
            },
            continuous: true,
            slider: {
                visible: 'inherit',
                style: 6,
                point1: {
                    pos: 'auto',
                    frozen: false
                },
                point2: {
                    pos: 'auto',
                    frozen: false
                },
                min: 0,
                max: 2 * Math.PI,
                start: 1.0
            }
        },
        /**
         * Specify the user handling of the elevation.
         * <ul>
         *  <li><tt>pointer</tt> sub-attributes:
         *      <ul>
         *          <li><tt>enabled</tt>: Boolean that specifies whether pointer navigation is allowed by elevation.
         *          <li><tt>speed</tt>: Number indicating how many passes the range of the el_slider makes when the cursor crosses the entire board once in the horizontal direction.
         *          <li><tt>outside</tt>: Boolean that specifies whether the pointer navigation is continued when the cursor leaves the board.
         *          <li><tt>button</tt>: Which button of the pointer should be used? (<tt>'-1'</tt> (=no button), <tt>'0'</tt> or <tt>'2'</tt>)
         *          <li><tt>key</tt>: Should an additional key be pressed? (<tt>'none'</tt>, <tt>'shift'</tt> or <tt>'ctrl'</tt>)
         *      </ul>
         *  <li><tt>keyboard</tt> sub-attributes:
         *      <ul>
         *          <li><tt>enabled</tt>: Boolean that specifies whether the keyboard (up/down arrow keys) can be used to navigate the board.
         *          <li><tt>step</tt>: Size of the step per keystroke.
         *          <li><tt>key</tt>: Should an additional key be pressed? (<tt>'none'</tt>, <tt>'shift'</tt> or <tt>'ctrl'</tt>)
         *      </ul>
         *  <li><tt>continuous</tt>: Boolean that specifies whether the el_slider starts again from the beginning when its end is reached.
         *  <li><tt>slider</tt> attributes of the el_slider ({@link Slider}) with additional
         *      <ul>
         *          <li><tt>min</tt>: Minimum value.
         *          <li><tt>max</tt>: Maximum value.
         *          <li><tt>start</tt>: Start value.
         *      </ul>
         *     'min' and 'max' are used only if trackball is not enabled.
         *     Additionally, the attributes 'slider.point1.pos' and 'slider.point2.pos' control the position of the slider. Possible
         *     values are 'auto' or an array [x, y] of length 2 for the position in user coordinates (or a function returning such an array).
         * </ul>
         *
         * @name View3D#el
         * @type Object
         * @default <pre>{
         *      pointer: {enabled: true, speed: 1, outside: true, button: -1, key: 'none'},
         *      keyboard: {enabled: true, step: 10, key: 'ctrl'},
         *      continuous: true,
         *      slider: {
         *          visible: true,
         *          style: 6,
         *          point1: {
         *              pos: 'auto',
         *              frozen: false
         *          },
         *          point2: {
         *              pos: 'auto',
         *              frozen: false
         *          },
         *          min: 0,
         *          max: 2 * Math.PI,
         *          start: 0.3
         *      },
         * }<pre>
         * @example
         *     var bound = [-4, 6];
         *     var view = board.create('view3d',
         *         [[-4, -3], [8, 8],
         *         [bound, bound, bound]],
         *         {
         *             projection: 'parallel',
         *             el: {
         *                 slider: {visible: true}
         *             }
         *         });
         *
         * </pre><div id="JXG8926f733-c42e-466b-853c-74feb795e879" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG8926f733-c42e-466b-853c-74feb795e879',
         *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
         *         var bound = [-4, 6];
         *         var view = board.create('view3d',
         *             [[-4, -3], [8, 8],
         *             [bound, bound, bound]],
         *             {
         *                 projection: 'parallel',
         *                 el: {
         *                     slider: {visible: true}
         *                 }
         *             });
         *
         *     })();
         *
         * </script><pre>
         *
         */ el: {
            pointer: {
                enabled: true,
                speed: 1,
                outside: true,
                button: -1,
                key: 'none'
            },
            keyboard: {
                enabled: true,
                step: 10,
                key: 'ctrl'
            },
            continuous: true,
            slider: {
                visible: 'inherit',
                style: 6,
                point1: {
                    frozen: false,
                    pos: 'auto'
                },
                point2: {
                    frozen: false,
                    pos: 'auto'
                },
                min: 0,
                max: 2 * Math.PI,
                start: 0.3
            }
        },
        /**
         * Specify the user handling of the bank angle.
         * <ul>
         *  <li><tt>pointer</tt> sub-attributes:
         *      <ul>
         *          <li><tt>enabled</tt>: Boolean that specifies whether pointer navigation is allowed by elevation.
         *          <li><tt>speed</tt>: Number indicating how many passes the range of the el_slider makes when the cursor crosses the entire board once in the horizontal direction.
         *          <li><tt>outside</tt>: Boolean that specifies whether the pointer navigation is continued when the cursor leaves the board.
         *          <li><tt>button</tt>: Which button of the pointer should be used? (<tt>'-1'</tt> (=no button), <tt>'0'</tt> or <tt>'2'</tt>)
         *          <li><tt>key</tt>: Should an additional key be pressed? (<tt>'none'</tt>, <tt>'shift'</tt> or <tt>'ctrl'</tt>)
         *      </ul>
         *  <li><tt>keyboard</tt> sub-attributes:
         *      <ul>
         *          <li><tt>enabled</tt>: Boolean that specifies whether the keyboard ('<', '>' keys) can be used to navigate the board.
         *          <li><tt>step</tt>: Size of the step per keystroke.
         *          <li><tt>key</tt>: Should an additional key be pressed? (<tt>'none'</tt>, <tt>'shift'</tt> or <tt>'ctrl'</tt>)
         *      </ul>
         *  <li><tt>continuous</tt>: Boolean that specifies whether the el_slider starts again from the beginning when its end is reached.
         *  <li><tt>slider</tt> attributes of the el_slider ({@link Slider}) with additional
         *      <ul>
         *          <li><tt>min</tt>: Minimum value.
         *          <li><tt>max</tt>: Maximum value.
         *          <li><tt>start</tt>: Start value.
         *      </ul>
         *      'min' and 'max' are used only if trackball is not enabled.
         *     Additionally, the attributes 'slider.point1.pos' and 'slider.point2.pos' control the position of the slider. Possible
         *     values are 'auto' or an array [x, y] of length 2 for the position in user coordinates (or a function returning such an array).
         * </ul>
         *
         * @name View3D#bank
         * @type Object
         * @default <pre>{
         *      pointer: {enabled: true, speed: 1, outside: true, button: -1, key: 'none'},
         *      keyboard: {enabled: true, step: 10, key: 'ctrl'},
         *      continuous: true,
         *      slider: {
         *          visible: true,
         *          style: 6,
         *          point1: {
         *              pos: 'auto',
         *              frozen: false
         *          },
         *          point2: {
         *              pos: 'auto',
         *              frozen: false
         *          },
         *          min: 0,
         *          max: 2 * Math.PI,
         *          start: 0.3
         *      },
         * }<pre>
         * @example
         *     var bound = [-4, 6];
         *     var view = board.create('view3d',
         *         [[-4, -3], [8, 8],
         *         [bound, bound, bound]],
         *         {
         *             projection: 'parallel',
         *             bank: {
         *                 slider: {visible: true}
         *             }
         *         });
         *
         * </pre><div id="JXGb67811ea-c1e3-4d1e-b13c-3537b3436f6c" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXGb67811ea-c1e3-4d1e-b13c-3537b3436f6c',
         *             {boundingbox: [-8, 8, 8,-8], axis: false, showcopyright: false, shownavigation: false});
         *         var bound = [-4, 6];
         *         var view = board.create('view3d',
         *             [[-4, -3], [8, 8],
         *             [bound, bound, bound]],
         *             {
         *                 projection: 'parallel',
         *                 bank: {
         *                     slider: {visible: true}
         *                 }
         *             });
         *
         *     })();
         *
         * </script><pre>
         *
         */ bank: {
            pointer: {
                enabled: true,
                speed: 0.08,
                outside: true,
                button: -1,
                key: 'none'
            },
            keyboard: {
                enabled: true,
                step: 10,
                key: 'ctrl'
            },
            continuous: true,
            slider: {
                visible: 'inherit',
                style: 6,
                point1: {
                    frozen: false,
                    pos: 'auto'
                },
                point2: {
                    frozen: false,
                    pos: 'auto'
                },
                min: -Math.PI,
                max: Math.PI,
                start: 0.0
            }
        },
        /**
         * Enable user handling by a virtual trackball that allows to move the 3D scene
         * with 3 degrees of freedom. If not enabled, direct user dragging (i.e. in the JSXGraph board, not manipulating the sliders) will only have
         * two degrees of freedom. This means, the z-axis will always be projected to a vertical 2D line.
         * <p>
         * Sub-attributes:
         *      <ul>
         *          <li><tt>enabled</tt>: Boolean that specifies whether pointer navigation is allowed by elevation.
         *          <li><tt>outside</tt>: Boolean that specifies whether the pointer navigation is continued when the cursor leaves the board.
         *          <li><tt>button</tt>: Which button of the pointer should be used? (<tt>'-1'</tt> (=no button), <tt>'0'</tt> or <tt>'2'</tt>)
         *          <li><tt>key</tt>: Should an additional key be pressed? (<tt>'none'</tt>, <tt>'shift'</tt> or <tt>'ctrl'</tt>)
         *      </ul>
         *
         * @name View3D#trackball
         * @type Object
         * @default <pre>{
         *   enabled: false,
         *   outside: true,
         *   button: -1,
         *   key: 'none'
         * }
         * </pre>
         */ trackball: {
            enabled: false,
            outside: true,
            button: -1,
            key: 'none'
        },
        /**
         * Distance of the camera to the center of the view.
         * If set to 'auto', r will be calculated automatically.
         *
         * @type {Number|String}
         * @default 'auto'
         */ r: 'auto',
        /**
         * Field of View defines the angle of view (in radians) of the camera, determining how much of the scene is captured within the frame.
         *
         * @type Number
         * @default 2/5*Math.PI
         */ fov: 1 / 5 * 2 * Math.PI,
        /**
         * Fixed values for the view, which can be changed using keyboard keys `picture-up` and `picture-down`.
         * Array of the form: [[el0, az0, r0], [el1, az1, r1, ...[eln, azn, rn]]
         *
         * @name View3D#values
         * @type Array
         * @default <tt>{[[0, 1.57], [0.78, 0.62], [0, 0], [5.49, 0.62], [4.71, 0], [3.93, 0.62], [3.14, 0], [2.36, 0.62], [1.57, 1.57]]}<tt>
         */ values: [
            [
                0,
                1.57
            ],
            [
                0.78,
                0.62
            ],
            [
                0,
                0
            ],
            [
                5.49,
                0.62
            ],
            [
                4.71,
                0
            ],
            [
                3.93,
                0.62
            ],
            [
                3.14,
                0
            ],
            [
                2.36,
                0.62
            ],
            [
                1.57,
                1.57
            ]
        ],
        infobox: {
            // strokeColor: '#888888',
            strokeColor: '#000000',
            fontSize: 16,
            useKatex: false,
            useMathjax: false,
            intl: {
                enabled: true,
                options: {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 3
                }
            }
        },
        /**
         * @class
         * @ignore
         */ _currentView: -1
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options;
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/themes/mono_thin.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
;
// Constants for this theme:
let size = 0.75, color = '#000';
__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].themes['mono_thin'] = {
    board: {
        showInfobox: false,
        showCopyright: true,
        defaultAxes: {
            x: {
                ticks: {
                    minorTicks: 0,
                    majorHeight: 10,
                    majorTickEndings: [
                        1,
                        0
                    ]
                }
            },
            y: {
                ticks: {
                    minorTicks: 0,
                    majorHeight: 10,
                    majorTickEndings: [
                        0,
                        1
                    ]
                }
            }
        }
    },
    navbar: {
        strokeColor: '#bbb',
        fillColor: 'none'
    },
    elements: {
        strokeColor: color,
        highlightStrokeColor: color,
        fillColor: 'none',
        highlightFillColor: 'none',
        strokeOpacity: 0.6,
        highlightStrokeOpacity: 1
    },
    angle: {
        strokeColor: color,
        fillColor: '#aaaaaa55',
        fillOpacity: 0.3,
        highlightFillColor: '#aaaaaa33',
        highlightFillOpacity: 0.3,
        label: {
            strokeColor: color
        }
    },
    arc: {
        strokeColor: color,
        strokeWidth: size,
        highlightStrokeColor: color,
        highlightStrokeWidth: size
    },
    axis: {
    },
    boxplot: {
        strokeWidth: size,
        strokeColor: color,
        fillColor: color,
        fillOpacity: 0.2,
        highlightStrokeWidth: size,
        highlightStrokeColor: color,
        highlightFillColor: color,
        highlightFillOpacity: 0.1
    },
    circle: {
        strokeWidth: size,
        highlightStrokeWidth: 1.5 * size,
        strokeColor: color,
        highlightFillColor: 'none',
        highlightStrokeColor: color,
        center: {
            size: size,
            fillColor: color,
            strokeColor: color,
            highlightStrokeWidth: 4 * size,
            highlightFillColor: color,
            highlightStrokeColor: color
        },
        point2: {
            size: size,
            fillColor: color,
            strokeColor: color,
            highlightStrokeWidth: 4 * size,
            highlightFillColor: color,
            highlightStrokeColor: color
        }
    },
    circumcircle: {
        strokeWidth: size,
        highlightStrokeWidth: 1.5 * size,
        strokeColor: color,
        highlightFillColor: 'none',
        highlightStrokeColor: color,
        center: {
            size: size,
            fillColor: color,
            strokeColor: color,
            highlightStrokeWidth: 4 * size,
            highlightFillColor: color,
            highlightStrokeColor: color
        }
    },
    circumcirclearc: {
        strokeColor: color,
        strokeWidth: size,
        highlightStrokeColor: color,
        highlightStrokeWidth: size
    },
    circumcirclesector: {
        strokeColor: color,
        fillColor: '#aaaaaa55',
        fillOpacity: 0.3,
        highlightFillColor: '#aaaaaa33',
        highlightFillOpacity: 0.3
    },
    comb: {
        strokeColor: color,
        strokeWidth: size
    },
    conic: {
        strokeWidth: size,
        highlightStrokeWidth: 1.5 * size,
        strokeColor: color,
        highlightStrokeColor: color,
        fillColor: 'none',
        highlightFillColor: 'none'
    },
    curve: {
        strokeColor: color,
        strokeWidth: size,
        highlightStrokeColor: color,
        highlightStrokeWidth: size
    },
    grid: {
        strokeWidth: size
    },
    hatch: {
        strokeColor: color,
        strokeWidth: size
    },
    incircle: {
        strokeWidth: size,
        highlightStrokeWidth: 1.5 * size,
        strokeColor: color,
        highlightFillColor: 'none',
        highlightStrokeColor: color,
        center: {
            size: size,
            fillColor: color,
            strokeColor: color,
            highlightStrokeWidth: 4 * size,
            highlightFillColor: color,
            highlightStrokeColor: color
        }
    },
    inequality: {
        fillColor: '#aaaaaa55',
        fillOpacity: 0.2
    },
    integral: {
        fillColor: '#aaaaaa55',
        highlightFillColor: '#aaaaa33',
        fillOpacity: 0.3,
        highlightFillOpacity: 0.3,
        curveLeft: {
            color: color
        },
        baseLeft: {
            color: color
        },
        curveRight: {
            color: color
        },
        baseRight: {
            color: color
        }
    },
    label: {
        strokeColor: color
    },
    line: {
        strokeColor: color,
        strokeWidth: size,
        highlightStrokeColor: color,
        highlightStrokeWidth: size,
        point1: {
            size: size,
            fillColor: color,
            strokeColor: color,
            highlightStrokeWidth: 4 * size,
            highlightFillColor: color,
            highlightStrokeColor: color
        },
        point2: {
            size: size,
            fillColor: color,
            strokeColor: color,
            highlightStrokeWidth: 4 * size,
            highlightFillColor: color,
            highlightStrokeColor: color
        }
    },
    normal: {
        strokeColor: color
    },
    parallel: {
        strokeColor: color
    },
    perpendicular: {
        strokeColor: color
    },
    perpendicularsegment: {
        strokeColor: color
    },
    point: {
        size: size,
        fillColor: color,
        strokeColor: color,
        highlightStrokeWidth: 4 * size,
        highlightFillColor: color,
        highlightStrokeColor: color
    },
    polygon: {
        fillColor: '#aaaaaa55',
        highlightFillColor: '#aaaaaa33',
        fillOpacity: 0.3,
        highlightFillOpacity: 0.3,
        vertices: {
            size: size,
            fillColor: color,
            strokeColor: color,
            highlightStrokeWidth: 4 * size,
            highlightFillColor: color,
            highlightStrokeColor: color
        },
        borders: {
            strokeColor: color,
            strokeWidth: size,
            highlightStrokeColor: color,
            highlightStrokeWidth: size
        }
    },
    sector: {
        strokeColor: color,
        fillColor: '#aaaaaa55',
        fillOpacity: 0.3,
        highlightFillColor: '#aaaaaa33',
        highlightFillOpacity: 0.3
    },
    semicircle: {
        center: {
            size: size,
            fillColor: color,
            strokeColor: color,
            highlightStrokeWidth: 4 * size,
            highlightFillColor: color,
            highlightStrokeColor: color
        }
    },
    slider: {
        size: size,
        fillColor: color,
        strokeColor: color,
        highlightStrokeWidth: 4 * size,
        highlightFillColor: color,
        highlightStrokeColor: color,
        baseline: {
            strokeWidth: size,
            strokeColor: color,
            highlightStrokeColor: color
        },
        label: {
            strokeColor: color
        },
        highline: {
            strokeWidth: 3 * size,
            name: '',
            strokeColor: color,
            highlightStrokeColor: color
        },
        ticks: {
            strokeColor: color
        }
    },
    slopefield: {
        strokeWidth: 0.75 * size,
        highlightStrokeWidth: size,
        highlightStrokeColor: color,
        highlightStrokeOpacity: 0.8
    },
    tapemeasure: {
        strokeColor: color,
        strokeWidth: size,
        highlightStrokeColor: color,
        highlightStrokeWidth: size,
        point1: {
            size: size,
            fillColor: color,
            strokeColor: color,
            highlightStrokeWidth: 4 * size,
            highlightFillColor: color,
            highlightStrokeColor: color
        },
        point2: {
            size: size,
            fillColor: color,
            strokeColor: color,
            highlightStrokeWidth: 4 * size,
            highlightFillColor: color,
            highlightStrokeColor: color
        },
        ticks: {
            strokeWidth: size
        }
    },
    text: {
        strokeColor: color
    },
    tracecurve: {
        strokeColor: color
    },
    turtle: {
        strokeWidth: size,
        strokeColor: color,
        arrow: {
            strokeWidth: 2 * size,
            strokeColor: '#aaaaaa55'
        }
    },
    vectorfield: {
        strokeWidth: 0.75 * size,
        highlightStrokeWidth: size,
        highlightStrokeColor: color,
        highlightStrokeOpacity: 0.8
    }
};
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/Documents/geometry_review/node_modules/jsxgraph/src/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable one-var */ __turbopack_context__.s([
    "Board",
    ()=>Board,
    "COORDS_BY_SCREEN",
    ()=>COORDS_BY_SCREEN,
    "COORDS_BY_USER",
    ()=>COORDS_BY_USER,
    "Chart",
    ()=>Chart,
    "Circle",
    ()=>Circle,
    "Complex",
    ()=>Complex,
    "Composition",
    ()=>Composition,
    "Coords",
    ()=>Coords,
    "CoordsElement",
    ()=>CoordsElement,
    "Curve",
    ()=>Curve,
    "Dump",
    ()=>Dump,
    "Expect",
    ()=>Expect,
    "GeometryElement",
    ()=>GeometryElement,
    "Group",
    ()=>Group,
    "Image",
    ()=>Image,
    "JSXGraph",
    ()=>JSXGraph,
    "JessieCode",
    ()=>JessieCode,
    "LMS2rgb",
    ()=>LMS2rgb,
    "Line",
    ()=>Line,
    "Mat",
    ()=>Mat,
    "Options",
    ()=>Options,
    "Point",
    ()=>Point,
    "Polygon",
    ()=>Polygon,
    "Prefix",
    ()=>Prefix,
    "Text",
    ()=>Text,
    "Ticks",
    ()=>Ticks,
    "Transformation",
    ()=>Transformation,
    "Turtle",
    ()=>Turtle,
    "View3D",
    ()=>View3D,
    "addEvent",
    ()=>addEvent,
    "autoDigits",
    ()=>autoDigits,
    "autoHighlight",
    ()=>autoHighlight,
    "bind",
    ()=>bind,
    "boards",
    ()=>boards,
    "capitalize",
    ()=>capitalize,
    "clearVisPropOld",
    ()=>clearVisPropOld,
    "clone",
    ()=>clone,
    "cloneAndCopy",
    ()=>cloneAndCopy,
    "cmpArrays",
    ()=>cmpArrays,
    "coordsArrayToMatrix",
    ()=>coordsArrayToMatrix,
    "copyAttributes",
    ()=>copyAttributes,
    "createEvalFunction",
    ()=>createEvalFunction,
    "createFunction",
    ()=>createFunction,
    "createHTMLSlider",
    ()=>createHTMLSlider,
    "darkenColor",
    ()=>darkenColor,
    "debug",
    ()=>debug,
    "debugInt",
    ()=>debugInt,
    "debugLine",
    ()=>debugLine,
    "debugWST",
    ()=>debugWST,
    "deepCopy",
    ()=>deepCopy,
    "def",
    ()=>def,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deprecated",
    ()=>deprecated,
    "elements",
    ()=>elements,
    "eliminateDuplicates",
    ()=>eliminateDuplicates,
    "escapeHTML",
    ()=>escapeHTML,
    "evalSlider",
    ()=>evalSlider,
    "evaluate",
    ()=>evaluate,
    "filterElements",
    ()=>filterElements,
    "getBoardByContainerId",
    ()=>getBoardByContainerId,
    "getCSSTransform",
    ()=>getCSSTransform,
    "getCSSTransformMatrix",
    ()=>getCSSTransformMatrix,
    "getDimensions",
    ()=>getDimensions,
    "getOffset",
    ()=>getOffset,
    "getPosition",
    ()=>getPosition,
    "getProp",
    ()=>getProp,
    "hex2rgb",
    ()=>hex2rgb,
    "hsv2rgb",
    ()=>hsv2rgb,
    "isAndroid",
    ()=>isAndroid,
    "isApple",
    ()=>isApple,
    "isArray",
    ()=>isArray,
    "isBoard",
    ()=>isBoard,
    "isDesktop",
    ()=>isDesktop,
    "isInArray",
    ()=>isInArray,
    "isInObject",
    ()=>isInObject,
    "isMetroApp",
    ()=>isMetroApp,
    "isMobile",
    ()=>isMobile,
    "isMozilla",
    ()=>isMozilla,
    "isName",
    ()=>isName,
    "isNode",
    ()=>isNode,
    "isNumber",
    ()=>isNumber,
    "isObject",
    ()=>isObject,
    "isPoint",
    ()=>isPoint,
    "isPoint3D",
    ()=>isPoint3D,
    "isPointType",
    ()=>isPointType,
    "isPointType3D",
    ()=>isPointType3D,
    "isString",
    ()=>isString,
    "isTouchDevice",
    ()=>isTouchDevice,
    "isTransformationOrArray",
    ()=>isTransformationOrArray,
    "isWebWorker",
    ()=>isWebWorker,
    "isWebkitAndroid",
    ()=>isWebkitAndroid,
    "isWebkitApple",
    ()=>isWebkitApple,
    "keys",
    ()=>keys,
    "lightenColor",
    ()=>lightenColor,
    "merge",
    ()=>merge,
    "normalizePointFace",
    ()=>normalizePointFace,
    "palette",
    ()=>palette,
    "paletteWong",
    ()=>paletteWong,
    "providePoints",
    ()=>providePoints,
    "registerElement",
    ()=>registerElement,
    "registerReader",
    ()=>registerReader,
    "removeAllEvents",
    ()=>removeAllEvents,
    "removeElementFromArray",
    ()=>removeElementFromArray,
    "removeEvent",
    ()=>removeEvent,
    "rgb2LMS",
    ()=>rgb2LMS,
    "rgb2bw",
    ()=>rgb2bw,
    "rgb2cb",
    ()=>rgb2cb,
    "rgb2css",
    ()=>rgb2css,
    "rgb2hex",
    ()=>rgb2hex,
    "rgb2hsv",
    ()=>rgb2hsv,
    "rgb2rgba",
    ()=>rgb2rgba,
    "rgb2rgbo",
    ()=>rgb2rgbo,
    "rgbParser",
    ()=>rgbParser,
    "sanitizeHTML",
    ()=>sanitizeHTML,
    "shortcut",
    ()=>shortcut,
    "strBool",
    ()=>strBool,
    "supportsCanvas",
    ()=>supportsCanvas,
    "supportsPointerEvents",
    ()=>supportsPointerEvents,
    "supportsSVG",
    ()=>supportsSVG,
    "supportsVML",
    ()=>supportsVML,
    "swap",
    ()=>swap,
    "timeChunk",
    ()=>timeChunk,
    "toFixed",
    ()=>toFixed,
    "toFullscreen",
    ()=>toFullscreen,
    "toJSON",
    ()=>toJSON,
    "trim",
    ()=>trim,
    "trimNumber",
    ()=>trimNumber,
    "truncate",
    ()=>truncate,
    "unescapeHTML",
    ()=>unescapeHTML,
    "uniqueArray",
    ()=>uniqueArray,
    "useBlackWhiteOptions",
    ()=>useBlackWhiteOptions,
    "useStandardOptions",
    ()=>useStandardOptions,
    "warn",
    ()=>warn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jxg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/env.js [app-client] (ecmascript)"); // Needed below
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/type.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$xml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/xml.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$expect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/expect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$math$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/math.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$probfuncs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/probfuncs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$ia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/ia.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$extrapolate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/extrapolate.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$qdt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/qdt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$bqdt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/bqdt.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$numerics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/numerics.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$nlp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/nlp.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$plot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/plot.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$implicitplot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/implicitplot.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$metapost$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/metapost.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$statistics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/statistics.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$geometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/geometry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$clip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/clip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$poly$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/poly.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$math$2f$complex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/math/complex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$abstract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/renderer/abstract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$reader$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/reader/file.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$parser$2f$geonext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/parser/geonext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$board$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/board.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/options.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jsxgraph$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/jsxgraph.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coords.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$coordselement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/coordselement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$point$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/point.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$group$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/group.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/circle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$element$2f$conic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/conic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$polygon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/polygon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$curve$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/curve.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$element$2f$arc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/arc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$element$2f$sector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/sector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$composition$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/composition.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$element$2f$composition$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/composition.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$element$2f$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/grid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$element$2f$slider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/slider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$element$2f$measure$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/measure.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/chart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$transformation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/transformation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$turtle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/turtle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/color.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$ticks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/ticks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$zip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/zip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$base64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/base64.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$uuid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/uuid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/encoding.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$parser$2f$datasource$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/parser/datasource.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$parser$2f$jessiecode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/parser/jessiecode.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$parser$2f$prefix$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/parser/prefix.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$parser$2f$ca$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/parser/ca.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$dump$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/utils/dump.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$svg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/renderer/svg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$vml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/renderer/vml.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$canvas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/renderer/canvas.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$renderer$2f$no$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/renderer/no.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$element$2f$comb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/comb.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$element$2f$slopetriangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/slopetriangle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$element$2f$checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/checkbox.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$element$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/input.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$element$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$element$2f$vectorfield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/vectorfield.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$element$2f$smartlabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/element/smartlabel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$base$2f$foreignobject$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/base/foreignobject.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$options3d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/options3d.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$3d$2f$view3d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/view3d.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$3d$2f$element3d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/element3d.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$3d$2f$box3d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/box3d.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$3d$2f$circle3d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/circle3d.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$3d$2f$point3d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/point3d.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$3d$2f$curve3d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/curve3d.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$3d$2f$linspace3d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/linspace3d.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$3d$2f$text3d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/text3d.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$3d$2f$ticks3d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/ticks3d.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$3d$2f$polygon3d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/polygon3d.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$3d$2f$face3d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/face3d.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$3d$2f$polyhedron3d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/polyhedron3d.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$3d$2f$sphere3d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/sphere3d.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$3d$2f$surface3d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/3d/surface3d.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$parser$2f$3dmodels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/parser/3dmodels.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$themes$2f$mono_thin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/geometry_review/node_modules/jsxgraph/src/themes/mono_thin.js [app-client] (ecmascript)");
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
const COORDS_BY_SCREEN = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_SCREEN;
const COORDS_BY_USER = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].COORDS_BY_USER;
const Dump = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Dump;
const Expect = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Expect;
const JSXGraph = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].JSXGraph;
const Mat = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Math;
const Options = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Options;
const boards = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].boards;
const elements = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].elements;
const palette = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].palette;
const paletteWong = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].paletteWong;
const Board = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Board;
const Chart = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Chart;
const Circle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Circle;
const Complex = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Complex;
const Composition = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Composition;
const Coords = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Coords;
const CoordsElement = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].CoordsElement;
const Curve = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Curve;
const GeometryElement = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].GeometryElement;
const Group = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Group;
const Image = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Image;
const JessieCode = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].JessieCode;
const Prefix = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].PrefixParser;
const Line = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Line;
const Point = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Point;
const Polygon = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Polygon;
const Text = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Text;
const Ticks = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Ticks;
const Transformation = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Transformation;
const Turtle = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Turtle;
const View3D = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].View3D;
const LMS2rgb = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].LMS2rgb;
const addEvent = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].addEvent;
const autoDigits = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].autoDigits;
const autoHighlight = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].autoHighlight;
const bind = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bind;
const capitalize = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].capitalize;
const clearVisPropOld = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].clearVisPropOld;
const clone = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].clone;
const cloneAndCopy = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cloneAndCopy;
const cmpArrays = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cmpArrays;
const coordsArrayToMatrix = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].coordsArrayToMatrix;
const copyAttributes = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].copyAttributes;
const createEvalFunction = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createEvalFunction;
const createFunction = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createFunction;
const createHTMLSlider = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createHTMLSlider;
const darkenColor = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].darkenColor;
const debug = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debug;
const debugInt = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debugInt;
const debugLine = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debugLine;
const debugWST = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debugWST;
const deepCopy = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deepCopy;
const def = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].def;
const deprecated = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deprecated;
const eliminateDuplicates = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].eliminateDuplicates;
const escapeHTML = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].escapeHTML;
const evalSlider = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].evalSlider;
const evaluate = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].evaluate;
const filterElements = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].filterElements;
const getBoardByContainerId = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getBoardByContainerId;
const getCSSTransformMatrix = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getCSSTransformMatrix;
const getCSSTransform = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getCSSTransform;
const getDimensions = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getDimensions;
const getOffset = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getOffset;
const getPosition = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getPosition;
const getProp = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getProp;
const hex2rgb = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hex2rgb;
const hsv2rgb = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hsv2rgb;
const isAndroid = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isAndroid;
const isApple = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isApple;
const isArray = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isArray;
const isDesktop = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isDesktop;
const isInArray = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isInArray;
const isInObject = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isInObject;
const isMetroApp = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isMetroApp;
const isMobile = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isMobile;
const isMozilla = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isMozilla;
const isBoard = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isBoard;
const isName = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isName;
const isNode = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNode;
const isNumber = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isNumber;
const isObject = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isObject;
const isPoint = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint;
const isPoint3D = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPoint3D;
const isPointType = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPointType;
const isPointType3D = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isPointType3D;
const isString = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isString;
const isTouchDevice = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isTouchDevice;
const isTransformationOrArray = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isTransformationOrArray;
const isWebWorker = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isWebWorker;
const isWebkitAndroid = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isWebkitAndroid;
const isWebkitApple = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isWebkitApple;
const keys = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].keys;
const lightenColor = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].lightenColor;
const merge = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].merge;
const normalizePointFace = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].normalizePointFace;
const providePoints = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].providePoints;
const registerElement = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerElement;
const registerReader = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerReader;
const removeAllEvents = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].removeAllEvents;
const removeElementFromArray = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].removeElementFromArray;
const removeEvent = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].removeEvent;
const rgb2LMS = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgb2LMS;
const rgb2bw = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgb2bw;
const rgb2cb = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgb2cb;
const rgb2css = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgb2css;
const rgb2hex = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgb2hex;
const rgb2hsv = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgb2hsv;
const rgbParser = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgbParser;
const rgb2rgbo = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgba2rgbo;
const rgb2rgba = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].rgbo2rgba;
const sanitizeHTML = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].sanitizeHTML;
const shortcut = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].shortcut;
const strBool = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].str2Bool;
const supportsCanvas = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].supportsCanvas;
const supportsPointerEvents = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].supportsPointerEvents;
const supportsSVG = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].supportsSVG;
const supportsVML = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].supportsVML;
const swap = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].swap;
const timeChunk = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].timedChunk;
const toFixed = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].toFixed;
const toFullscreen = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].toFullscreen;
const toJSON = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].toJSON;
const trim = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].trim;
const trimNumber = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].trimNumber;
const truncate = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].truncate;
const unescapeHTML = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].unescapeHTML;
const uniqueArray = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].uniqueArray;
const useBlackWhiteOptions = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useBlackWhiteOptions;
const useStandardOptions = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useStandardOptions;
const warn = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].warn;
// We're in the browser, export JXG to the global JXG symbol for backwards compatibility
if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isBrowser) {
    window.JXG = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
// In node there are two cases:
// 1) jsxgraph is used without requirejs (e.g. as jsxgraphcore.js)
// 2) jsxgraph is loaded using requirejs (e.g. the dev version)
//
// Nodejs compatibility is handled by webpack
// OLD: in case 2) module is undefined, the export is set in src/jsxgraphnode.js using
// the return value of this factory function
// } else if (Env.isNode() && typeof module === 'object') {
//     module.exports = JXG;
} else if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$utils$2f$env$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isWebWorker()) {
    self.JXG = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
}
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$geometry_review$2f$node_modules$2f$jsxgraph$2f$src$2f$jxg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
}),
]);

//# sourceMappingURL=c0305_jsxgraph_src_4db65172._.js.map