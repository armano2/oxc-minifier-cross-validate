(function f() {
    try {
        (function() {
            var a = "FAIL 1";
            null;
            console.log(a);
        })(function() {
            console.log(1 / 0);
            a;
        }());
    } finally {
        return f;
    }
})();
