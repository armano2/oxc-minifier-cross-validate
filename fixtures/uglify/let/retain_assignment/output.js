"use strict";
function f() {
    return a = 0;
    let a;
}
try {
    f();
} catch (e) {
    console.log("PASS");
}
