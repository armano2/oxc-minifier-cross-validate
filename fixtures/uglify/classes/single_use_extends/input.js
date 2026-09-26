"use strict";
class A extends class B {
    f() {
        return "PASS";
    }
} {}
console.log(new A().f());
