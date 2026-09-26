"use strict";
function f() {
    return { a: !0 };
}
console.log(function(b) {
    b = !1;
    return f();
}().a, f.call().a);
