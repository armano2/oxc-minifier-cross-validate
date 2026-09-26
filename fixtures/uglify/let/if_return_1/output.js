"use strict";
function f(a) {
    function g() {
        return b = "PASS";
    }
    if (a)
        return g();
    let b;
    return g();
};
console.log(f());
