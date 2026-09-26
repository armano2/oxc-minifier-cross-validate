"use strict";
function f() {
    if (console) {
        let g = function() {
            e;
        }, e;
        (function() {
            if (console) {
                console.log(e);
                var e = "FAIL";
            }
        })(console.log(e));
    }
}
f();
