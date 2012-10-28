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

    /**
     * Create new olit instance.
     *
     * @example
     * var object = olit({foo: "bar"});
     *
     * @param {Object} [context={}] the context object to manipulate.
     * @return {InternalOlit}
     */
    exports.olit = function (context) {

        context = context || {};

        /**
         * internal version of olit. This class will be instantiated and returned
         * @constructor
         */
        var InternalOlit = function () {};

        InternalOlit.prototype = {
            /**
             * for type checking
             */
            constructor: InternalOlit,

            /**
             * Make a copy of the context
             *
             * @example
             * var obj = {foo: "bar"};
             * var obj1 = olit(obj).clone().get();
             * obj.foo = "baz";
             * obj.foo == obj1.foo;
             * false
             *
             * @return {Object|Function}
             */
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


            /**
             * Add properties to existing context
             *
             * @example
             * var obj = olit({foo: 'bar'}).extend({extension: 'baz'}).get();
             * obj.extension == 'baz'
             * true
             *
             * @param {Object} extension
             * @return {Object|Function}
             */
            extend: function (extension) {
                var i;
                for (i in extension) {
                    if (extension.hasOwnProperty(i)) {
                        context[i] = extension[i];
                    }
                }
                return this;
            },

            /**
             * Returns current context
             *
             * @example
             *
             * var obj = olit({foo: 'baz'}).get();
             * obj.foo == 'baz';
             * true
             *
             * @return {Object} current context
             */
            get: function () {
                return context;
            },

            /**
             * Does somethink similar to Object.create
             *
             * @example:
             * var Klass = olit({foo: 'bar'}).makeClass().get();
             * var a = new Klass();
             * var b = new Klass();
             * b.foo = 'baz';
             * a.foo == b.foo;
             * false
             *
             * var Klass2 = olit({foo: 'bar'}).makeClass(function () {
             *     this.foo = 'baz';
             * }).get();
             *
             * var c = new Klass2();
             *
             * c.foo == 'baz';
             * true
             *
             * @param {Function} classConstructor
             * @return {olit}
             */
            makeClass: function (classConstructor) {
                classConstructor = classConstructor || function () {};
                classConstructor.prototype = context;
                context = classConstructor;
                return this;
            },

            /**
             * Loops through the iface and checks if all variable types are same
             * in context
             *
             * @example
             *
             * var obj1 = {foo: 'bar'};
             * var obj2 = {foo: 2};
             *
             * olit(obj1).isImplementationOf(obj2)
             * false
             *
             * obj2.foo = 'baz';
             * olit(obj1).isImplementationOf(obj2)
             * true //becouse types are the same
             *
             * @param {Object} iface
             * @return {Boolean} true if all the fields has the same type as context
             */
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