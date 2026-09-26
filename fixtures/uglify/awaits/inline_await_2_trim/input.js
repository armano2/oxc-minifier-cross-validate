(async function() {
    async function f(a) {
        await a.log;
    }
    return await f(console);
})();
console.log("PASS");
