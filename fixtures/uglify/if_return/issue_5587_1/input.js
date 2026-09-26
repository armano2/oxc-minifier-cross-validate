function f(a) {
    if (console)
        return a ? void 0 : console.log("PASS");
}
f();
f(42);
