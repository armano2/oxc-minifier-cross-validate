function f(a) {
    if (a)
        a = console.log("foo");
    else {
        console.log("bar");
        a = console.log("baz");
    }
}
f(42);
f(null);
