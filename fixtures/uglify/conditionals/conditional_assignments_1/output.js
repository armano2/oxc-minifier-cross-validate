function f(a, b, c, d) {
    return a = c ? d : b, a;
}
function g(a, b, c, d) {
    return a = c ? b : d, a;
}
console.log(f(0, "FAIL", 1, "PASS"), g(0, "PASS", 1, "FAIL"));
