function f(a) {
    var b, c, d;
    (a || b) && (b = "PASS") && console.log(b);
}
f(42);
