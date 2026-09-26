"ooooo ddddd";
var d = "FAIL";
try {
    throw 42;
} catch (o) {
    (function o() {
        d = "PASS";
    })();
}
console.log(d);
