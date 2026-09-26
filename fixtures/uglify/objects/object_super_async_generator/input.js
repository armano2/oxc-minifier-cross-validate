var o = {
    async *f() {
        return super.p;
    },
    p: "FAIL",
};
Object.setPrototypeOf(o, { p: "PASS" });
o.f().next().then(function(v) {
    console.log(v.value, v.done);
});
