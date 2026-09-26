function f(a) {
    return a || a;
}
console.log(f(null), f(42));
