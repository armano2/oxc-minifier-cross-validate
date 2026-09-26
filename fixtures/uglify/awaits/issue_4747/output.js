console.log(function(a) {
    (async function() {
        a = "PASS";
        null.p += "PASS";
    })();
    return a;
}("FAIL"));
