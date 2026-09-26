"use strict";
function f(o) {
    return "o" in o;
}
class A {
    o() {}
}
console.log(f(new A()) ? "PASS" : "FAIL");
