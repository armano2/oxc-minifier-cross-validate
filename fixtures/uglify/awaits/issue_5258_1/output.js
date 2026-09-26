(async function() {
    (async function() {
        throw "FAIL";
    })();
    return "PASS";
})().catch(console.log).then(console.log);
