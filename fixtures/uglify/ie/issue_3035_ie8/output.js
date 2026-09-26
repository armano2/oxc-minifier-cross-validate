var c = "FAIL";
(function(t) {
    try {
        throw 1;
    } catch (o) {
        try {
            throw 0;
        } catch (t) {
            o && (c = "PASS");
        }
    }
})();
console.log(c);
