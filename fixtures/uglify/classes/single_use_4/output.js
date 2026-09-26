"use strict";
console.log(new class A {
    f() {
        return typeof A;
    }
}().f());
