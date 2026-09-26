async function f() {
    throw "FAIL";
}
(async function() {
    try {
        return await f();
    } catch (e) {
        return "PASS";
    }
})().then(console.log);
