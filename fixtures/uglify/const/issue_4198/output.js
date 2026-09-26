console.log(function() {
    try {
        throw "PASS";
    } catch (e) {
        {
            const e = "FAIL";
        }
        return function() {
            return e;
        }();
    }
}());
