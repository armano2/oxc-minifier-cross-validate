"use strict";
function f(a) {
    let b = a, c = b;
    0 && c.p++;
}
console.log(f());
