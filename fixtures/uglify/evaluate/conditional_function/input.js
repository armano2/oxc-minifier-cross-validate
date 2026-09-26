function f(a) {
    return a && "undefined" != typeof A ? A : 42;
}
console.log(f(0), f(1));
