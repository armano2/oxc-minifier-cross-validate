var c = "FAIL";
(function(o) {
    try {
        throw 1;
    } catch (t) {
        try {
            throw 0;
        } catch (o) {
            t && (c = "PASS");
        }
    }
})();
console.log(c);
