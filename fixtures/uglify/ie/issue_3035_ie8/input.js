var c = "FAIL";
(function(a) {
    try {
        throw 1;
    } catch (b) {
        try {
            throw 0;
        } catch (a) {
            b && (c = "PASS");
        }
    }
})();
console.log(c);
