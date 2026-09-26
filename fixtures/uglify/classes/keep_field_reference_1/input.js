"use strict";
function f() {}
class A {
    p = f;
}
console.log(new A().p === new A().p ? "PASS" : "FAIL");
