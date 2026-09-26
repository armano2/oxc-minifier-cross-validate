var a = "PASS";
(async function() {
    try {
        throw null;
    } catch (e) {
        return await function() {
            while (!console);
        }();
    } finally {
        a = "FAIL";
    }
})();
console.log(a);
