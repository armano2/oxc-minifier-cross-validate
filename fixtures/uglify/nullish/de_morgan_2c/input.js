function f(a, b) {
    return a ?? (a || b);
}
console.log(f(null), f(null, {}));
console.log(f(42), f(42, {}));
