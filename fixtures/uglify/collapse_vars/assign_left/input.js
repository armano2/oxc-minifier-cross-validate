console.log(function(a, b) {
    (b = a, b.p).q = "PASS";
    return a.p.q;
}({p: {}}));
