(function() {
    arguments.slice = function() {
        console.log("PASS");
    };
    arguments[42];
    arguments.length;
    arguments.slice();
})();
