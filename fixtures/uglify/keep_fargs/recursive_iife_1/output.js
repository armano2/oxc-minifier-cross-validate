console.log(function f(a, b) {
    return b || f(0, "PASS");
}());
