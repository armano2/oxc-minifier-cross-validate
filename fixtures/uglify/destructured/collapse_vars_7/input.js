var a = "FAIL";
try {
    (function() {
        [] = (a = "PASS", null);
        return "PASS";
    })();
} catch (e) {
    console.log(a);
}
