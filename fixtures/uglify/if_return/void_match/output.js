function f(a) {
    if (a)
        console.log("foo");
    else {
        while (console.log("bar"));
        console.log("baz"),
        console.log("moo");
    }
}
f();
f(42);
