function f(b, c, d) {
    var a = c ? d : b;
    return a;
}
function g(b, c, d) {
    var a = c ? b : d;
    return a;
}
console.log(f("FAIL", 1, "PASS"), g("PASS", 1, "FAIL"));
