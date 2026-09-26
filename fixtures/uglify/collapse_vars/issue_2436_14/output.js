var a = "PASS";
var b = {};
(function() {
    a && function(c, d) {
        console.log(b, d);
    }(0, a);
})();
