console.log(function() {
    try {
        throw "FAIL";
    } catch (e) {
        return "PASS";
    }
}());
