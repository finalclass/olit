/*global window, exports*/
(function (exports) {

    'use strict';

    exports.olm = function (obj) {
        var InternalOlm, context;

        InternalOlm = function () {};
        context = obj;

        InternalOlm.prototype = {
            constructor: InternalOlm,
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

        return new InternalOlm();
    };

}(typeof exports === 'undefined' ? window : exports));