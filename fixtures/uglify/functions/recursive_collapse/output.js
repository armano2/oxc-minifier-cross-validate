console.log(function f(a) {
    var b;
    return a && f();
}("FAIL") || "PASS");
