"ooooo ddddd";
var o = "FAIL";
try {
    throw 42;
} catch (d) {
    (function c() {
        o = "PASS";
    })();
}
console.log(o);
