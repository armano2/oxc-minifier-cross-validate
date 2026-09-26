"use strict";
try {
    let a = f(), b;
    console.log("FAIL");
    function f() {
        return b;
    }
} catch (e) {
    console.log("PASS");
}
