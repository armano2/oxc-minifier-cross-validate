(async function() {
    try {
        return await async function() {
            throw "FAIL";
        }();
    } catch (e) {
        return "PASS";
    }
})().then(console.log);
