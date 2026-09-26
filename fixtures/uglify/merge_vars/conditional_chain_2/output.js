function f(a, b) {
    var c, a;
    if (a && (c = a))
        console.log(c);
    else
        b || (a = b) ? console.log(c) : console.log(a);
}
f("", null);
f("", true);
f(42, null);
f(42, true);
