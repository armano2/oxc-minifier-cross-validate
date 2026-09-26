"use strict";
class A {
    static P = function() {};
}
console.log(A.P === A.P ? "PASS" : "FAIL");
