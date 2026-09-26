function f(a, b = a++) {
    return b;
}
console.log(f("FAIL") || "PASS");
