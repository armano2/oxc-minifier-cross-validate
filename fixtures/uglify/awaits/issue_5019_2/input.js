console.log("sync", function(a) {
    (async function() {
        console.log(await "async", a);
    })();
    return a = "PASS";
}("FAIL"));
