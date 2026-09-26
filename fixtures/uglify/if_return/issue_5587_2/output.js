function f(a) {
    return console && a ? console.log("PASS") : void 0;
}
f();
f(42);
