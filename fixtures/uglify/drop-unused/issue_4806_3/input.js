O = {
    f: function() {
        console.log(this === O ? "FAIL" : "PASS");
    },
};
var a;
(a = 42, O.f)();
a;
