function f() {
    console.log("FAIL");
}
(function(a) {
    function g() {
        if ((a = 0) || f(0)) {
            f();
        } else {
            f();
        }
        if (h(a = 0));
    }
    function h() {
        g();
    }
})();
console.log("PASS");
