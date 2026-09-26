(async function() {
    async function f(a, b) {
        return await b(a);
    }
    return await f("PASS", console.log);
})();
