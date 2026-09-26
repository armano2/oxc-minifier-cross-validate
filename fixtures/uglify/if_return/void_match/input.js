function f(a) {
    if (a) {
        console.log("foo");
        return;
    }
    while (console.log("bar"));
    return console.log("baz"), void console.log("moo");
}
f();
f(42);
