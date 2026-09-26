function f(a) {
    return +a.toExponential(1);
}
function g(b) {
    return 0 + b.toFixed(2);
}
function h(c) {
    return 1 * c.toPrecision(3);
}
console.log(typeof f(45), typeof g(67), typeof h(89));
