var a = "FAIL";
try {
    a = "PASS";
    (function() {
        throw 0;
    })();
    a = 1 + a;
} catch (e) {
}
console.log(a);
