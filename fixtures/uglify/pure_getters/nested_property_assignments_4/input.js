var n, o = { p: { q: { r: "PASS" } } };
(n = o.p).r = n.q.r;
console.log(o.p.r);
