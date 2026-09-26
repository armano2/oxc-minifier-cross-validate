!function(a) {
    "aaaaaaaaaa";
    a();
    var o = function n() {
        var n = 42;
        console.log("FAIL");
    };
}(function() {
    console.log("PASS");
});
