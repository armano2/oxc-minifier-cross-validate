function f(a, b) {
    return (a && b) && b;
}
console.log(f(null), f(null, {}));
console.log(f(42), f(42, {}));
