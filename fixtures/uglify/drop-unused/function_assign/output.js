console.log(function() {
    var a = "PASS";
    function h(c) {
        return c;
    }
    h.p = a;
    return h;
}().p);
