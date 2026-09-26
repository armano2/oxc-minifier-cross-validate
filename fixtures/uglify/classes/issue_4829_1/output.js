"use strict";
try {
    class A extends [ () => {} ][0] {}
} catch (e) {
    console.log("PASS");
}
