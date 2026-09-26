"use strict";
var a = "foo", c;
let b = "bar";
for (c of [ a, b ])
    console.log(c);
function f() {
    return a;
}
console.log(f(f));
