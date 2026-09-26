var p = new Promise(function(resolve, reject) {
    reject("FAIL");
});
(async function() {
    try {
        return await p;
    } catch (e) {
        return "PASS";
    }
})().then(console.log);
