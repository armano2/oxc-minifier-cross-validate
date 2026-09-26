var a = {}, b;
({ p: { q: b } } = {
    p: a,
    r: a.q = "PASS",
});
console.log(b);
