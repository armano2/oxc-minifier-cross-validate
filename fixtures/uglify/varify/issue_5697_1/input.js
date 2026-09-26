console.log(function() {
    f();
    return typeof a;
    function f() {
        (function() {
            for (var k in { foo: 42 }) {
                const a = k;
                console.log(a);
            }
        })();
    }
}());
