function f(g) {
    console.log(g.length);
    g(null, "FAIL");
}
f(function() {
    return function(a, b) {
        return function(c) {
            do {
                console.log("PASS");
            } while (c);
        }(a, b);
    };
}());
