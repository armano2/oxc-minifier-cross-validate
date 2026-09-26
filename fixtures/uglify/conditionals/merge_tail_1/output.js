function f(a) {
    var b = "foo";
    if (a)
        while (console.log("bar"));
    else
        while (console.log("baz"));
    console.log(b);
}
f();
f(42);
