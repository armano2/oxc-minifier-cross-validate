console.log(function() {
    function fn() {
        return h();
    }
    function g() {
        return fn();
    }
    function h(a) {
        return a || fn();
    }
    return h("PASS");
}());
