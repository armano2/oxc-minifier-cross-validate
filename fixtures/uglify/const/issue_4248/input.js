var a = "FAIL";
try {
    (function() {
        a = "PASS";
        b[a];
        const b = 0;
    })();
} catch (e) {
    console.log(a);
}
