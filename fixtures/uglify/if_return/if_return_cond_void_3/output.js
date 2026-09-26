function f(a) {
    if (a)
        return console.log("foo") ? void console.log("bar") : void console.log("baz");
}
f();
f(42);
