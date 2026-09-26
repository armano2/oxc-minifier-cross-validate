"use strict";
console.log(f()());
function f() {
    const a = "PASS";
    return function() {
        return a;
    };
}
