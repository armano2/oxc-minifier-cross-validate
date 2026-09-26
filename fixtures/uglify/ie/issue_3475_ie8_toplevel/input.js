"ooooo ddddd";
var a = "FAIL";
try {
    throw 42;
} catch (b) {
    (function f() {
        a = "PASS";
    })();
}
console.log(a);
