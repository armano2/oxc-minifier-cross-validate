function f(a) {
    var b = "foo";
    if (a) {
        console.log("bar");
        console.log(b);
    } else {
        c = "baz";
        while (console.log(c));
        console.log("bar"),
        console.log(b);
        var c;
    }
}
f();
f(42);
