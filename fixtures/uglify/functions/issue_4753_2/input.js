do {
    (function() {
        var a = f();
        function f() {
            return "PASS";
        }
        f;
        function g() {
            console.log(a);
        }
        g();
    })();
} while (0);
