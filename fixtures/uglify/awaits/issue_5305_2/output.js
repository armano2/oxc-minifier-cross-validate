var a = "PASS";
(async function() {
    try {
        throw null;
    } catch (e) {
        while (!console);
        return await void 0;
    } finally {
        a = "FAIL";
    }
})();
console.log(a);
