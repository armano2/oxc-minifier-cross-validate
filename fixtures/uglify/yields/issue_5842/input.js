var a = "FAIL";
(async function*() {
    (function() {
        try {
            try {
                return console;
            } finally {
                a = "PASS";
            }
        } catch (e) {}
        FAIL;
    })();
})().next();
console.log(a);
