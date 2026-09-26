var a = "PASS";
(async function() {
    try {
        await function() {
            while (!console);
        }();
    } catch (e) {
        a = "FAIL";
    }
})();
console.log(a);
