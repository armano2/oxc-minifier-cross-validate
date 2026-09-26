"use strict";
function f() {
    let a = console.log("PASS");
    {
        var b;
        for (var c in b) {
            b;
            var c = function() {
                a;
            };
        }
    }
}
f();
