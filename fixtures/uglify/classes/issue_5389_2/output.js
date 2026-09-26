function log(m, n) {
    console.log(m, n);
}
var a = log;
var A;
var b = new class {
    [a = "FAIL"] = a = "PASS";
}();
log(a, b.FAIL);
