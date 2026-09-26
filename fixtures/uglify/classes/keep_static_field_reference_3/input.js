"use strict";
class A {}
class B {
    static P = A;
}
console.log(B.P === B.P ? "PASS" : "FAIL");
