(function f() {
    return function() {
        return f();
    }();
})();
