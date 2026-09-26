(function() {
    var await = function f() {
        return async function() {
            return f;
        };
    };
    await()().then(function(value) {
        console.log(value === await ? "PASS" : "FAIL");
    });
})();
