function f(a) {
    return (a = false) || a;
}
console.log(f(null), f(42));
