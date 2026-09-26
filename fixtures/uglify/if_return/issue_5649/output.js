console.log(function() {
    try {
        throw new Error("FAIL");
    } catch (e) {
        return "PASS";
    }
    throw new Error("FAIL");
}());
