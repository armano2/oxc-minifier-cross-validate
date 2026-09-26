(async function() {
    async function f(a) {
        await a;
    }
    return await f(console);
})();
console.log("PASS");
