var a = "FAIL";
try {
    (function() {
        var {} = (a = "PASS", null);
        return "PASS";
    })();
} catch (e) {
    console.log(a);
}
