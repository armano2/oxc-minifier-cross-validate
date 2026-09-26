function f(a, b) {
    return a || b || 42;
}
console.log(f("PASS", "FAIL"));
