function f(a) {
    console.log("PASS", a);
}
function g(b) {
    console.log("FAIL", b);
}
var h;
var c;
if (console) {
    h = f;
    c = "PASS";
} else {
    h = g;
    c = "FAIL";
}
h(c);
