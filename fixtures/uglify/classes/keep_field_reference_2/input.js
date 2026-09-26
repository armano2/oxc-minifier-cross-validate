"use strict";
function f() {}
var A = class {
    p = f;
};
console.log(new A().p === new A().p ? "PASS" : "FAIL");
