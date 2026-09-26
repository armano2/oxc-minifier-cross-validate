var await = "PASS";
(async function() {
    class A {
        static p = console.log(await);
    }
})();
