console.log(function f() {
    function g() {}
    g.p++;
    return f.p = g.p;
}());
