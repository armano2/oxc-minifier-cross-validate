var o = {
    f() {
        console.log(this === o ? "FAIL" : "PASS");
    },
};
(42, o.f)``;
