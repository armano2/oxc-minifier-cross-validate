"use strict";
(function f(a, b) {
    class A {
        [a.log("PASS")]() {
            b.log("FAIL");
        }
    }
})(console, console);
