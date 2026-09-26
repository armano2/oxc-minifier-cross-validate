var o = {
    f: function(a) {
        console.log(a ? this.p : "FAIL 1");
    },
    p: "FAIL 2",
}, p = "PASS";
(0, o.f)(42);
