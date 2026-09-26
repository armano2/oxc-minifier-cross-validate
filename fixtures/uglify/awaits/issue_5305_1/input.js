var a = "PASS";
(async function() {
    try {
        return await function() {
            while (!console);
        }();
    } finally {
        a = "FAIL";
    }
})();
console.log(a);
