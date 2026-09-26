"use strict";
console.log(function(r, n, t) {
    try {
        FAIL;
    } catch (o) {
        return function() {
            var n = o, t, c;
            {
                const o = c;
            }
            return r;
        }();
    } finally {
        const c = 42;
    }
}("PASS"));
