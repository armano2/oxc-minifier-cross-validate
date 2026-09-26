"use strict";
(function() {
    function f() {
        while (console.log(typeof g));
    }
    class A {
        static p = f();
    }
})(function g() {});
