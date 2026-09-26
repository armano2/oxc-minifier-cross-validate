function f(g) {
    console.log(g.length);
    g(null, "FAIL");
}
f(function(a, b) {
    var c = a;
    do {
        console.log("PASS");
    } while (c);
});
