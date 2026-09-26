"ooooo ddddd";
var a = "FAIL";
try {
    throw 42;
} catch (o) {
    (function o() {
        a = "PASS";
    })();
}
console.log(a);
