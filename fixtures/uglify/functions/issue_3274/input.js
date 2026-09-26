(function() {
    var g = function(a) {
        var c = a.p, b = c;
        return b != c;
    };
    while (g(1))
        console.log("FAIL");
    console.log("PASS");
})();
