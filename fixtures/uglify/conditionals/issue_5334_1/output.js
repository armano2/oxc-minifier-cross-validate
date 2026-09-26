(function() {
    var o;
    console.log("PASS") && (o = true, o = {
        p: o += console.log("FAIL"),
    });
})();
