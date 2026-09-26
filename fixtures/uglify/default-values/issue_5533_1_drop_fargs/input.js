"use strict";
try {
    (function() {
        var a;
        for (; 1;)
            a = function() {
                (function f(b = 42) {
                    b;
                    throw "PASS";
                })();
            }();
    })();
} catch (e) {
    console.log(e);
}
