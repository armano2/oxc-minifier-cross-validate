function f(a) {
    return a && "undefined" != typeof A ? A : 42;
}
console.log(42, f(1));
