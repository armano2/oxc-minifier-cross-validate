function f() {
    throw "FAIL";
}
(async function() {
    (async function() {
        f();
    })();
    return "PASS";
})().catch(console.log).then(console.log);
