console.log(function n() {
    var o = function n(o) {
        return "FAIL";
    };
    try {
        moo;
    } catch (n) {
        o = function n(o) {
            return "PASS";
        };
    }
    return o;
}()());
