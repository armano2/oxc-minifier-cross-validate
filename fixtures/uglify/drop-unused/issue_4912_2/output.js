console.log(function() {
    var g, f = function() {};
    f.p = {};
    (f.p.q = function() {}).r = "PASS";
    return f;
}().p.q.r);
