var o = {
    f: function(a) {
        console.log(a ? this.p : "FAIL 1");
    },
    p: "FAIL 2",
}, p = "PASS";
Object(o.f)(42);
