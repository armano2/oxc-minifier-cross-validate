var a = true;
(function() {
    b = (i = a, console.log("foo") && i),
    d = function*() {
        c = null;
    }(),
    e = function() {
        if (c) console.log(typeof d);
        while (b);
    }(),
    void 0;
    var b, c, d, e;
    var i;
})();
