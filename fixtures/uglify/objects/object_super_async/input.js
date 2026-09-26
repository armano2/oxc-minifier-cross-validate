var o = {
    async f() {
        return super.p;
    },
    p: "FAIL",
};
Object.setPrototypeOf(o, { p: "PASS" });
o.f().then(console.log);
