function f(a) {
    var b = a(), c = a();
    return c.p(c, b);
}
console.log(f(function() {
    return {
        p: function() {
            return "PASS";
        }
    };
}));
