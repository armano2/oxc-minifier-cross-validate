var a, o = {
    f: function() {
        console.log(this === o ? "FAIL" : "PASS");
    },
};
(0, o.f)(a = 42);
