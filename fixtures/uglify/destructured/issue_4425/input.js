var a;
console.log(function() {
    try {
        try {
            throw 42;
        } catch ({
            [a]: a,
        }) {}
        return "FAIL";
    } catch (e) {
        return "PASS";
    }
}());
