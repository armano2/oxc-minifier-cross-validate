function f(a) {
    return !console || a ? void 0 : console.log("PASS");
}
f();
f(42);
