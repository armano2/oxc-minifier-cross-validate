var o = {
    f: function() {
        return this === o ? "FAIL" : "PASS";
    },
};
console.log(function(a) {
    return a;
}(o.f)());
