console.log(function() {
    var a = "PASS";
    function g(b) {
        return b;
    }
    g.p = a;
    function h(c) {
        return c;
    }
    h.p = a;
    return h;
}().p);
