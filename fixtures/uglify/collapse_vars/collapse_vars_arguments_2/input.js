function log(a, b) {
    console.log(b);
}
function f(c) {
    var d = arguments[0];
    c = "FAIL";
    log(c, d);
}
f();
f("PASS");
