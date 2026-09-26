var a;
console.log(function() {
    try {
        try {
            throw 42;
        } catch ({
            [b]: b,
        }) {}
        return "FAIL";
    } catch (c) {
        return "PASS";
    }
}());
