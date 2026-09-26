console.log(function foo() {
    var o = function o(n) {
        return "FAIL";
    };
    try {
        moo;
    } catch (n) {
        o = function o(n) {
            return "PASS";
        };
    }
    return o;
}()());
