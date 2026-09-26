function f(a, b) {
    return a ? a : b ? b : 42;
}
console.log(f("PASS", "FAIL"));
