"use strict";
class A {
    f() {
        return A;
    }
}
console.log(typeof new A().f());
