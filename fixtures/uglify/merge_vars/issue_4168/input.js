var o = {
    f: function(a, b, c) {
        var d = a.d;
        var e = b.e;
        var f = c.f;
        this.g(arguments);
        if (d)
            console.log(e, f);
    },
    g: function(args) {
        console.log(args[0], args[1], args[2]);
    },
};
o.f("PASS", true, 42);
