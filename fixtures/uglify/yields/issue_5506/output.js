console.log(function(a) {
    var b = function*() {
        a = null in (a = "PASS");
    }();
    try {
        b.next();
    } catch (e) {
        return a;
    }
}("FAIL"));
