function f(a) {
    var b = "foo";
    if (!a) {
        c = "baz";
        while (console.log(c));
        var c;
    }
    while (console.log("bar"));
    console.log(b);
}
f();
f(42);
