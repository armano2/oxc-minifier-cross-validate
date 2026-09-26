function f(a, b, c) {
    return a || ((a && b) || c);
}
console.log(f(null, false), f(null, false, {}), f(null, true), f(null, true, {}));
console.log(f(42, false), f(42, false, {}), f(42, true), f(42, true, {}));
