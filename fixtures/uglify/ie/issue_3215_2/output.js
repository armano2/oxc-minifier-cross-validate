console.log(function foo() {
    var o = function o(n) {
        return "PASS";
    };
    try {
        "moo";
    } catch (n) {
        o = function o(n) {
            return "FAIL";
        };
    }
    return o;
}()());
