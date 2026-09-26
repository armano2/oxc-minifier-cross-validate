(function f(a) {
    f && (console, 42) && (f && (a = [])) && console.log("PASS");
    f = 42;
})();
