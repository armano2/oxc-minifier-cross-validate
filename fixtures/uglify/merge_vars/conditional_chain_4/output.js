function f(a, b) {
    var c, d;
    if (a && b ? c = a : d = b)
        console.log(c);
    else
        console.log(d);
}
f("", null);
f("", true);
f(42, null);
f(42, true);
