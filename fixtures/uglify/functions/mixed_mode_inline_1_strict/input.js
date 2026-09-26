"use strict";
function f() {
    return this;
}
console.log(function() {
    return f();
}() ? "FAIL" : "PASS");
