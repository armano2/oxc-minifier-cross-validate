function f(a) {
    var b = a(), c = a(), d = b;
    return c.p(c, d);
}
console.log(f(function() {
    return {
        p: function() {
            return "PASS"
        },
    };
}));
