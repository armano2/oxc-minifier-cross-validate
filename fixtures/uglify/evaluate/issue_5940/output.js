(function f(a) {
    f && (console, 42) && (f && []) && console.log("PASS"),
    f = 42;
})();
