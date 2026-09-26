console.log(function f() {}(function g() {
    function h() {
        f;
    }
    class A {
        static p = h();
    }
}, typeof g));
