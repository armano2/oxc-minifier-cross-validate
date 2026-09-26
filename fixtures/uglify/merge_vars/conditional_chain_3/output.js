function f(a, b) {
    var c, a;
    if (a && (c = a) || b || (a = b))
        console.log(c);
    else
        console.log(a);
}
f("", null);
f("", true);
f(42, null);
f(42, true);
