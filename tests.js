/**
 * ////////////////////////////////////////////////
 *     Object Literal Manipulator (olit) tests
 * ////////////////////////////////////////////////
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

describe('olit', function () {

    var element;

    beforeEach(function () {
        element = {
            a: 0,
            b: 1,
            c: 'hello'
        };
    });


    it('is clonnable', function () {
        var e1 = olit(element).clone().get();
        expect(e1.c).toEqual('hello');
        e1.c = 'Hi there!';
        expect(e1.c).not.toEqual(element.c);
    });

    it('is extendable', function () {
        olit(element).extend({abc: 5});
        expect(element.abc).toBeDefined();
    });

    it('can create classes', function () {
        var Klass = olit(
            {
                property: 7,

                method: function () {
                    this.property = 3;
                }
            }
        )
            .makeClass()
            .get();

        var a1 = new Klass();
        var a2 = new Klass();

        a1.property = 9;

        expect(a2.property).toEqual(7);

        a2.method();
        expect(a2.property).toEqual(3);
        expect(a1.property).toEqual(9);

    });

    it('can check types', function () {

        var e2 = olit(element).clone().get();
        expect(olit(e2).isImplementationOf(element)).toBeTruthy();
        //becouse "a" is string:
        expect(olit(e2).isImplementationOf({a: 'qqq', b: 5, c: 'hello'})).not.toBeTruthy();

    });


});