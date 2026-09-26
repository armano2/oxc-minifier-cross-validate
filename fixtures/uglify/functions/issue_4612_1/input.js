console.log(function() {
    function f() {
        return g();
    }
    function g(a) {
        return a || f();
    }
    return g("PASS");
}());
