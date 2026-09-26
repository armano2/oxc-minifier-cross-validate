"use strict";
try {
    (function() {
        var a;
        for (; 1;)
            a = function() {
                (function f([ b ] = []) {
                    b;
                    throw "PASS";
                })();
            }();
    })();
} catch (e) {
    console.log(e);
}
