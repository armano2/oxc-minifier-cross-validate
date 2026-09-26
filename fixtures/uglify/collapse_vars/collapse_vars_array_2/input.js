function f(a) {
    var b;
    return [ (b = a, b.g()) ];
}
console.log(f({
    g: function() {
        return "PASS";
    }
})[0]);
