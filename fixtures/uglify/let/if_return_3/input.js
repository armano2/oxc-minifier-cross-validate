"use strict";
var a = "PASS";
function f(b) {
    if (console) {
        let b = a;
        return b;
    } else
        while (console.log("FAIL 1"));
    return b;
}
console.log(f("FAIL 2"));
