(function() {
    function f() {
        while (function() {
            var a = 0 == (b && b.p), b = console.log(a);
        }());
        f;
    }
    f();
})();
