var a = "PASS";
(async function() {
    try {
        while (!console);
        return await void 0;
    } finally {
        a = "FAIL";
    }
})();
console.log(a);
