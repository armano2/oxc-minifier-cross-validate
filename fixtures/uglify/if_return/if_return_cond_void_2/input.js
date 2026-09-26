function f(a) {
    if (a)
        return console.log("foo") ? void 0 : console.log("bar");
}
f();
f(42);
