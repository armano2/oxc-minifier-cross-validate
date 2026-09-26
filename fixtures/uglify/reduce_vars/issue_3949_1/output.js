(function f(a) {
    var a = void (a = 0, g);
    function g() {
        console.log(typeof a);
    }
    g();
})();
