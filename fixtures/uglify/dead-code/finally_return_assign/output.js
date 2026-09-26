console.log(function(a) {
    try {
        throw "FAIL";
    } finally {
        return "PASS";
    }
}());
