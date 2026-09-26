function f(a) {
    var b = "foo";
    if (a)
        while (console.log("bar"));
    else {
        c = "baz";
        while (console.log(c));
        console.log("bar");
        var c;
    }
    console.log(b);
}
f();
f(42);
