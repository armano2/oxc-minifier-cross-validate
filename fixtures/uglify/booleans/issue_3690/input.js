console.log(function(a) {
    return function() {
        return a = [ this ];
    }() ? "PASS" : "FAIL";
}());
