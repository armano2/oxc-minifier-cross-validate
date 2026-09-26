console.log(function(f, g) {
    f = function() {};
    f.p = {};
    g = f.p.q = function() {};
    g.r = "PASS";
    return f;
}().p.q.r);
