"use strict";
(function f(a, b) {
    class A {
        static [a.log("PASS")]() {
            b.log("FAIL");
        }
    }
})(console, console);
