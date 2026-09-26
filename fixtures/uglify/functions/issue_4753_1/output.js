for (var i in [ 1, 2 ])
    f = function() {},
    void (f && console.log(f.p ^= 42));
var f;
