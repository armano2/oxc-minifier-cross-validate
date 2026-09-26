(function(x) {
    x();
})(function() {
    (function(i) {
        if (i)
            return console.log("PASS");
        throw "FAIL";
    })(Object());
});
