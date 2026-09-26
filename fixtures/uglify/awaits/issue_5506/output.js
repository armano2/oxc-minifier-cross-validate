console.log(function(a) {
    (async function() {
        a = null in (a = "PASS");
    })();
    return a;
}("FAIL"));
