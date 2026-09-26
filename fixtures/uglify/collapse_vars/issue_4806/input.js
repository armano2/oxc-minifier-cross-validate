var a, o = {
    f: function() {
        console.log(this === o ? "FAIL" : "PASS");
    },
};
(a = 42, o.f)(42);
