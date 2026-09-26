function f(a) {
    if (a) {
        console.log("foo");
        return console.log("bar");
    }
    while (console.log("baz"));
    return console.log("moo"), console.log("bar");
}
f();
f(42);
