"use strict";
var a;
(function() {
    try {
        throw 42;
    } catch (e) {
        let a = typeof e;
        console.log(a);
    } finally {
        return a = "foo";
    }
})();
console.log(typeof a);
