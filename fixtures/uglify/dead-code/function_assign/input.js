console.log(function() {
    var a = "PASS";
    function h(c) {
        return c;
    }
    h.p = function(b) {
        return b;
    }.p = a;
    return h;
}().p);
