console.log(function f() {
    f && (f.p = "PASS");
    return f.p;
}());
