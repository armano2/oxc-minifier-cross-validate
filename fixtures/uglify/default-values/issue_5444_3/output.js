function f(a, b = function(c = a *= this) {
    return c;
}()) {
    return b;
}
console.log(f("FAIL") || "PASS");
