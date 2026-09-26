"use strict";
function f() {
    "use strict";
    return this;
}
console.log(function() {
    return f();
}() ? "FAIL" : "PASS");
