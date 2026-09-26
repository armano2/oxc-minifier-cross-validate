var b, a = {};
({ p: b } = [ a, a.p = "PASS" ][0]);
console.log(b);
