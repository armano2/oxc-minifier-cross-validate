(async function() {
    return await (a = "PASS", b = console.log, await b(a));
    var a, b;
})();
