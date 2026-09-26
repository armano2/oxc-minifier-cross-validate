function f(a) {
    return a && console.log("foo") ? console.log("bar") : void 0;
}
f();
f(42);
