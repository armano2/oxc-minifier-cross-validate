(function f(a) {
    var b;
    (a ?? (b = 0)) && console.log(b || "PASS");
})("FAIL");
