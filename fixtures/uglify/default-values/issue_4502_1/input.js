(function() {
    var a = "PASS";
    (function(b = a++) {
        var a;
    })(void 0, console.log(a));
})();
