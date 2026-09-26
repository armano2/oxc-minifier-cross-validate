function log(a, b) {
    console.log(b);
}
function f(c) {
    var d = arguments[0];
    log(c = "FAIL", d);
}
f();
f("PASS");
