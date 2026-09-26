"use strict";
var o = {
    f: function(a, b, c) {
        var a = a.d;
        var b = b.e;
        var c = c.f;
        this.g(arguments);
        if (a)
            console.log(b, c);
    },
    g: function(args) {
        console.log(args[0], args[1], args[2]);
    },
};
o.f("PASS", true, 42);
