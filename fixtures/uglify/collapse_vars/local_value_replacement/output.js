function f(a, b) {
    b && g(b);
}
function g(c) {
    console.log(c);
}
f("FAIL", "PASS");
