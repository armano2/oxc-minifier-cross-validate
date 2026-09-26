console.log(function(a) {
    return function() {
        return 1;
    }() ? "PASS" : "FAIL";
}());
