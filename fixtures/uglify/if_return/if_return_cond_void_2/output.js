function f(a) {
    return !a || console.log("foo") ? void 0 : console.log("bar");
}
f();
f(42);
