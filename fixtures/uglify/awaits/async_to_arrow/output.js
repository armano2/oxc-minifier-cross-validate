(async () => {
    console.log(await (async (a, b, c) => b + a + c + c)("A", "P", "S"));
})();
