for (var a in [ 1, 2 ]) {
    (function() {
        try {
            (function f() {});
        } finally {
            var b = f, f = "FAIL";
            console.log(b || "PASS");
        }
    })();
}
