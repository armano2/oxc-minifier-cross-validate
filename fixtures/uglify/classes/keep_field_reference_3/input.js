"use strict";
class A {}
class B {
    p = A;
}
console.log(new B().p === new B().p ? "PASS" : "FAIL");
