"use strict";
console.log(typeof new class A {
    f() {
        return A;
    }
}().f());
