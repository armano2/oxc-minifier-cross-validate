function await() {
    return "PASS";
}
(async function() {
    (function() {
        console.log(await("FAIL"));
    })();
})();
