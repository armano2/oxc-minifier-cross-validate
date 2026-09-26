"use strict";
function f(a) {
    return "foo" in a;
}
class A {
    foo() {}
}
console.log(f(new A()) ? "PASS" : "FAIL");
