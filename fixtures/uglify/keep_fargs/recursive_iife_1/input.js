console.log(function f(a, b) {
    return b || f("FAIL", "PASS");
}());
