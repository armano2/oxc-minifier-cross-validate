console.log(function f() {}(function g() {
    function h() {
        "use strict";
        f;
    }
    class A {
        static p = h();
    }
}, typeof g));
