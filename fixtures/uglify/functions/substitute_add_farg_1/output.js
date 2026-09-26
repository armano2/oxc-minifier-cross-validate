function f(g) {
    console.log(g.length);
    g(null, "FAIL");
}
f(function(c, argument_1) {
    do {
        console.log("PASS");
    } while (c);
});
