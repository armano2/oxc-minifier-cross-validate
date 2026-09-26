var o = console;
log = o.log;
o = {
    p: function(a) {
        console.log(a ? "PASS" : "FAIL");
        return a;
    },
};
log(o.p(42));
