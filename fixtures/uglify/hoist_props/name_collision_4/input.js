console.log(function() {
    var o = {
        p: 0,
        q: "PASS",
    };
    return function(o_p) {
        if (!o.p) return o_p;
    }(o.q);
}());
