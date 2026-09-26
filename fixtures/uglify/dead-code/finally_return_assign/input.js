console.log(function(a) {
    try {
        throw "FAIL";
    } finally {
        return a = "PASS";
    }
}());
