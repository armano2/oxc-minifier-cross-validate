function f(a, b) {
    var c, d;
    if (a && (c = a) || b || (d = b))
        console.log(c);
    else
        console.log(d);
}
f("", null);
f("", true);
f(42, null);
f(42, true);
