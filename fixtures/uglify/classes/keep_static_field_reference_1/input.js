"use strict";
function f() {}
class A {
    static P = f;
}
console.log(A.P === A.P ? "PASS" : "FAIL");
