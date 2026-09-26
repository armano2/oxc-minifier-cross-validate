void console.log(function g() {
    return [ 42 ].map(function(u) {
        var o = {
            p: u
        };
        return console.log(o[g]), o;
    });
}()[0].p);
