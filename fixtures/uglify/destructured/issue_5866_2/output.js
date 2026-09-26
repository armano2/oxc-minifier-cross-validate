var b, a = {};
({ q: b } = {
    p: a,
    r: a.q = "PASS",
}.p);
console.log(b);
