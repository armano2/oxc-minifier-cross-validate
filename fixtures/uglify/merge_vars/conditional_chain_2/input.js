function f(a, b) {
    var c, d;
    if (a && (c = a))
        console.log(c);
    else
        b || (d = b) ? console.log(c) : console.log(d);
}
f("", null);
f("", true);
f(42, null);
f(42, true);
