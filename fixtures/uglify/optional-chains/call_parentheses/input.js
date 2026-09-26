(function(o) {
    console.log(o.f("FAIL"), (o.f)("FAIL"), (0, o.f)(42));
    console.log(o?.f("FAIL"), (o?.f)("FAIL"), (0, o?.f)(42));
})({
    a: "PASS",
    f(b) {
        return this.a || b;
    },
});
