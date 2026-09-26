!function(a) {
    "aaaaaaaaaa";
    a();
    var b = function c() {
        var c = 42;
        console.log("FAIL");
    };
}(function() {
    console.log("PASS");
});
