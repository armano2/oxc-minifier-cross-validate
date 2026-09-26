var a = 1, b = "FAIL";
(function f(c, d) {
    function g() {
        d && (b = "PASS", 0 <= --a && g());
        0 <= --a && f(0, "function");
    }
    g();
})();
console.log(b);
