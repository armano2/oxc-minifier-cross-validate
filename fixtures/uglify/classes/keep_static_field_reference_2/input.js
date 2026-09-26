"use strict";
function f() {}
var A = class {
    static P = f;
};
console.log(A.P === A.P ? "PASS" : "FAIL");
