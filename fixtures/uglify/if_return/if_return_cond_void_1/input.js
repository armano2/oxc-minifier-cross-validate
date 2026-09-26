function f(a) {
    if (a)
        return console.log("foo") ? console.log("bar") : void 0;
}
f();
f(42);
