var o = {
    f: function() {
        return this === o ? "FAIL" : "PASS";
    },
};
console.log((0, o.f)());
