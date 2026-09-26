console.log(function n() {
    var o = function n(o) {
        return "PASS";
    };
    try {
        "moo";
    } catch (n) {
        o = function n(o) {
            return "FAIL";
        };
    }
    return o;
}()());
