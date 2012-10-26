/**
 * /////////////////////////////////////////
 *     Object Literal Manipulator (olit)
 * /////////////////////////////////////////
 *
 * Copyright (C) <2012> <finalclass.net Szymon Wygnański>
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * @licence MIT
 * @author Szymon Wygnański
 */

/*global window, exports*/
(function (exports) {

    'use strict';

    exports.olit = function (obj) {
        var InternalOlit, context;

        InternalOlit = function () {};
        context = obj;

        InternalOlit.prototype = {
            constructor: InternalOlit,
            clone: function () {
                var attr, copy;
                if (context === null || typeof context !== "object") {
                    return this;
                }
                copy = context.constructor();
                for (attr in context) {
                    if (context.hasOwnProperty(attr)) {
                        copy[attr] = context[attr];
                    }
                }
                context = copy;
                return this;
            },
            extend: function (extension) {
                var i;
                for (i in extension) {
                    if (extension.hasOwnProperty(i)) {
                        context[i] = extension[i];
                    }
                }
                return this;
            },

            get: function () {
                return context;
            },

            makeClass: function () {
                var k = function () {};
                k.prototype = context;
                context = k;
                return this;
            },

            isImplementationOf: function (iface) {
                var i;
                for (i in iface) {
                    if (iface.hasOwnProperty(i)) {
                        if (context[i] === undefined || typeof context[i] != typeof iface[i]) {
                            return false;
                        }
                    }
                }
                return true;
            }
        };

        return new InternalOlit();
    };

}(typeof exports === 'undefined' ? window : exports));