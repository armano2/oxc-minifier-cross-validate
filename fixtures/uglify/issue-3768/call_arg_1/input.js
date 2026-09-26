var z = "foo";
(function() {
    var z = false;
    (function(e) {
        var z = 42;
        e("console.log(typeof z)");
    })(eval);
})();
