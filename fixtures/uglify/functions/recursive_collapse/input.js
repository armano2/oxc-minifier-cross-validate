console.log(function f(a) {
    var b = a && f();
    return b;
}("FAIL") || "PASS");
