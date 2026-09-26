var a = {};
var { q: b } = {
    p: a,
    r: a.q = "PASS",
}.p;
console.log(b);
