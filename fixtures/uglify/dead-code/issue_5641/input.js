function f(a) {
    if (a || b) {
        var b = "PASS", c = b && console.log(b);
    } else
        var d = a || b;
}
f(42);
