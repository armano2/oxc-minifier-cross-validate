function test(a, b) {
    console.log(a, b);
}
var a = "FAIL", b;
b = a = "PASS";
test(a, b);
