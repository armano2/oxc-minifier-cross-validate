!function(a) {
    "aaaaaaaaaa";
    a();
    var o = function a() {
        var a = 42;
        console.log("FAIL");
    };
}(function() {
    console.log("PASS");
});
