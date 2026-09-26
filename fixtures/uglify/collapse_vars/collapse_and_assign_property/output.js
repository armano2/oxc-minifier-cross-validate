console.log(function f() {
    return f.p = f ? "PASS" : f.p;
}());
