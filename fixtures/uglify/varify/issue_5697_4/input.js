"use strict";
console.log(function() {
    f();
    return typeof a;
    function f() {
        (function() {
            for (var k in { foo: 42 }) {
                let a = k;
                console.log(a);
            }
        })();
    }
}());
