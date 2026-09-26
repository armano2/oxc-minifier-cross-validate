function f(a, b) {
    (a = b) && g(a);
}
function g(c) {
    console.log(c);
}
f("FAIL", "PASS");
