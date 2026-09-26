var a = "FAIL";
try {
    a = "PASS";
    (function({}) {})();
    throw "PASS";
} catch (e) {
    console.log(a);
}
