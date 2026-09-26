"use strict";
try {
    class A extends { f() {} }.f {}
} catch (e) {
    console.log("PASS");
}
