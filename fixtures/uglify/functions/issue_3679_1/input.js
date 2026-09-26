(function() {
    var f = function() {};
    f.g = function() {
        console.log("PASS");
    };
    f.g();
})();
