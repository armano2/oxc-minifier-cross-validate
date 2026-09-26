console.log(function f() {
    function g() {}
    return f.p = ++g.p;
}());
