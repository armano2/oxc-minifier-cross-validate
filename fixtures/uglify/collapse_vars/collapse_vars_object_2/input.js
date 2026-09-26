function f(a) {
    var b;
    return {
        p: (b = a, b.g())
    };
}
console.log(f({
    g: function() {
        return "PASS";
    }
}).p);
