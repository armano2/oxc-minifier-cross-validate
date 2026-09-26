for (var a in [ 1, 2 ]) {
    b = void 0;
    f = void 0;
    try {
        (function f() {});
    } finally {
        var b = f, f = "FAIL";
        console.log(b || "PASS");
    }
}
