"use strict";
var a = "foo";
let b = "bar";
for (var c of [ a, b ])
    console.log(c);
function f() {
    return a;
}
console.log(f(f));
