var z = "foo";
(function() {
    var o = false;
    (function(o) {
        var a = 42;
        o("console.log(typeof z)");
    })(eval);
})();
