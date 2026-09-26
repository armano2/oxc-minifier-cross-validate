"use strict";
let a = "foo";
var b = "bar";
for (let c of [ a, b ])
    console.log(c);
function f() {
    return b;
}
console.log(f(f));
