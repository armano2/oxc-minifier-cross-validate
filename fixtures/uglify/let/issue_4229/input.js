"use strict";
try {
    (function f() {
        f;
        let f;
    })();
} catch (e) {
    console.log("PASS");
}
