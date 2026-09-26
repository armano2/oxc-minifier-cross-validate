function f(a) {
    console.log("PASS", a);
}
function g(b) {
    console.log("FAIL", b);
}
var h;
var c;
c = console ? (h = f, "PASS") : (h = g, "FAIL"),
h(c);
