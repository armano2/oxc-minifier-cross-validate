"use strict";
{
    let a;
    if (console.log("PASS")) {
        var b = function() {
            a;
        }, c = b;
    }
}
