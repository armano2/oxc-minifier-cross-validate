"use strict";
console.log(function(a, b, c) {
    try {
        FAIL;
    } catch (e) {
        return function() {
            var d = e, i, j;
            {
                const e = j;
            }
            return a;
        }();
    } finally {
        const e = 42;
    }
}("PASS"));
