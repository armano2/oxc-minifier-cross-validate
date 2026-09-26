function f() {
    (function() {
        var a = {};
        function g() {
            a.p;
        }
        g(console.log("PASS"));
        var b = function h(c) {
            c && c.q;
        }();
    })();
}
f();
