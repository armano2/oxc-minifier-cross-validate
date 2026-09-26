function log(m, n) {
    console.log(m, n);
}
var a = log;
class A {
    [a = "FAIL"] = a = "PASS";
}
var b = new A();
log(a, b.FAIL);
