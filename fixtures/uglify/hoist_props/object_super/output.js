var o = {
    f(a) {
        return a ? console.log("PASS") : super.log("PASS");
    },
};
o.f(42);
