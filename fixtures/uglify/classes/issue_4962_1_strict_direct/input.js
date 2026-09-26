(function() {
    function f() {
        "use strict";
        while (console.log(typeof g));
    }
    class A {
        static p = f();
    }
})(function g() {});
