function f(a, b) {
    function g(c) {
        return c >> 1;
    }
    return g(a) + g(b);
}
console.log(f(13, 31));
