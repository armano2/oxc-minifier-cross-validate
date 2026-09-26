var await = "PASS";
(async function() {
    console.log(function() {
        return await;
    }());
})();
