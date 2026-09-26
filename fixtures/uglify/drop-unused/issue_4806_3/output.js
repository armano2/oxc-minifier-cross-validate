O = {
    f: function() {
        console.log(this === O ? "FAIL" : "PASS");
    },
};
(0, O.f)();
