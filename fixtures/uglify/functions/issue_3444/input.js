(function(h) {
    return f;
    function f() {
        g();
    }
    function g() {
        h("PASS");
    }
})(console.log)();
