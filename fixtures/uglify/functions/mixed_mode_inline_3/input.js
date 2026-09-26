function f() {
    return this;
}
console.log(function() {
    "use strict";
    return f();
}() ? "PASS" : "FAIL");
