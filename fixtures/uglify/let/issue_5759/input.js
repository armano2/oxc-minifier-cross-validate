"use strict";
function f() {
    for (var a in [ true ]) {
        let b;
        (function() {
            var c = void 0;
            b;
            console.log(c);
            var d = null;
            console.log(c);
        })();
    }
}
f();
