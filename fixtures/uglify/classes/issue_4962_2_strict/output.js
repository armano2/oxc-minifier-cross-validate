"use strict";
console.log(function f() {}(function g() {
    f;
}));
