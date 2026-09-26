"use strict";
console.log(typeof new class {
    f() {
        return function g() {
            return g;
        }();
    }
}().f());
