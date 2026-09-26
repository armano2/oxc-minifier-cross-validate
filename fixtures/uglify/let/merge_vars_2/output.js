"use strict";
var a = 0;
1 && --a,
b = function f() {
    let c = a && f;
    c.var += 0;
}(),
void console.log(b);
var b;
