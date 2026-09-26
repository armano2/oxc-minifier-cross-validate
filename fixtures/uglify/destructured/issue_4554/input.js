A = "PASS";
var a = "FAIL";
try {
    (function({}, b) {
        return b;
    })(void 0, a = A);
} catch (e) {
    console.log(a);
}
