var a = "FAIL";
(async function() {
    await function() {
        try {
            try {
                return console;
            } finally {
                a = "PASS";
            }
        } catch (e) {}
        FAIL;
    }();
})();
console.log(a);
