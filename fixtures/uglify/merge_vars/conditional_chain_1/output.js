function f(a, b) {
    var a, a;
    if (a && (a = a))
        console.log(a);
    else
        b || (a = b) ? console.log("foo") : console.log(a);
}
f("", null);
f("", true);
f(42, null);
f(42, true);
