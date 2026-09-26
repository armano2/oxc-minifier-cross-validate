console.log(function(a) {
    for (var i = 0; i < 2; i++) {
        var b = "FAIL";
        f && f();
        a = b;
        var f = function() {
            b = "PASS";
        };
    }
    return a;
}());
