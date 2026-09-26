"use strict";
console.log(function() {
    (function() {
        for (var k in { foo: 42 }) {
            var a = k;
            console.log(a);
        }
    })();
    return typeof a;
}());
