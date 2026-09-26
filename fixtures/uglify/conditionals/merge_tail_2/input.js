function f(a) {
    var b = "foo";
    if (a) {
        while (console.log("bar"));
        console.log(b);
    } else {
        c = "baz";
        while (console.log(c));
        while (console.log("bar"));
        console.log(b);
        var c;
    }
}
f();
f(42);
