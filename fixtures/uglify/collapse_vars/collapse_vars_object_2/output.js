function f(a) {
    return {
        p: a.g()
    };
}
console.log(f({
    g: function() {
        return "PASS";
    }
}).p);
