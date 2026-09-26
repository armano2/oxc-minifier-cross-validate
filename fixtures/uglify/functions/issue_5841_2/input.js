var a = 42;
(function() {
    f();
    var b = f();
    function f() {
        if (console && a)
            g && g();
    }
    function g() {
        var c;
        for (;console.log("foo"););
        (function h(d) {
            d && d.p;
        })();
    }
})();
