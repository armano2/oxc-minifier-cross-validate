(async function() {
    console.log(function() {
        function await() {}
        return "PASS";
    }());
})();
