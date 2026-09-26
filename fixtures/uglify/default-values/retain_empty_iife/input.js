var a;
try {
    (function(a = a) {})();
} catch (e) {
    console.log("PASS");
}
