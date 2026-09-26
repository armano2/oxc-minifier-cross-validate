var await = "PASS";
(async function() {
    (class {
        static c = console.log(await);
    });
})();
