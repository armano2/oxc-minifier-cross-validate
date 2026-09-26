var a = {};
var { p: { q: b } } = {
    p: a,
    r: a.q = "PASS",
};
console.log(b);
