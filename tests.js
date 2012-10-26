describe('olm', function () {

    var element;

    beforeEach(function () {
        element = {
            a: 0,
            b: 1,
            c: 'hello'
        };
    });


    it('is clonnable', function () {
        var e1 = olm(element).clone().get();
        expect(e1.c).toEqual('hello');
        e1.c = 'Hi there!';
        expect(e1.c).not.toEqual(element.c);
    });

    it('is extendable', function () {
        olm(element).extend({abc: 5});
        expect(element.abc).toBeDefined();
    });

    it('can create classes', function () {
        var Klass = olm(
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

        var e2 = olm(element).clone().get();
        expect(olm(e2).isImplementationOf(element)).toBeTruthy();
        //becouse "a" is string:
        expect(olm(e2).isImplementationOf({a: 'qqq', b: 5, c: 'hello'})).not.toBeTruthy();

    });


});