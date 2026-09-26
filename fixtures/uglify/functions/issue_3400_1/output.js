void console.log(function g() {
    function h(u) {
        var o = {
            p: u
        };
        return console.log(o[g]), o;
    }
    function e() {
        return [ 42 ].map(h);
    }
    return e();
}()[0].p);
