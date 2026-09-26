function f(a) {
    return [ a.g() ];
}
console.log(f({
    g: function() {
        return "PASS";
    }
})[0]);
