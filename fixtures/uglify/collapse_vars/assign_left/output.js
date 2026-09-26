console.log(function(a, b) {
    a.p.q = "PASS";
    return a.p.q;
}({p: {}}));
