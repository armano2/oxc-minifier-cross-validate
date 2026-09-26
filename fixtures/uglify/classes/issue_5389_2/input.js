function log(m, n) {
    console.log(m, n);
}
var a = log;
var A = class {
    [a = "FAIL"] = a = "PASS";
};
var b = new A();
log(a, b.FAIL);
