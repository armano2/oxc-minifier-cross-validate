var o = {
    f() {
        console.log(this === o ? "FAIL" : "PASS");
    },
};
(0, o.f)``;
