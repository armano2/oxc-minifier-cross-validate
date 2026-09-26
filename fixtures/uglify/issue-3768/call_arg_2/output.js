function n() {
    console.log("PASS");
}
var o = "foo";
(function() {
    var o = false;
    (function(o) {
        var n = 42;
        o("console.log(typeof z)");
    })(n);
})();
