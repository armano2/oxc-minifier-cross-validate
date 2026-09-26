function f(a) {
    if (a)
        console.log("foo");
    else {
        while (console.log("baz"));
        console.log("moo");
    }
    return console.log("bar");
}
f();
f(42);
