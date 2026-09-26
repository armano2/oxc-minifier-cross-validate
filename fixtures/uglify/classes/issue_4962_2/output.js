console.log(function f() {}(function g() {
    function h() {
        f;
    }
    (class {
        static c = h();
    });
}));
