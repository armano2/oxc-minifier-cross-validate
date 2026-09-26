(async function() {
    async function f() {
        await 42;
    }
    return await f();
})();
console.log("PASS");
