function f(a) {
    if (console)
        return a ? console.log("PASS") : void 0;
}
f();
f(42);
