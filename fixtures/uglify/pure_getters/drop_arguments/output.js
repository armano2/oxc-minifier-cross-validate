(function() {
    arguments.slice = function() {
        console.log("PASS");
    };
    arguments.slice();
})();
