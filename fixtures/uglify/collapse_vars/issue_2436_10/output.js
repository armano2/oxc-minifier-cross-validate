function f(n) {
    ({ b: 3 });
    return n;
}
console.log([
    (c = {
        a: 1,
        b: 2,
    }).a,
    f(c.b),
    c.b,
].join(" "));
var c;
