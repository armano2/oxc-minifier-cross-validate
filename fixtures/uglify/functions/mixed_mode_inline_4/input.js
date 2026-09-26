function f() {
    "use strict";
    return this;
}
console.log(function() {
    "use strict";
    return f();
}() ? "FAIL" : "PASS");
