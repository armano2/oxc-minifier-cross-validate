console.log(function foo() {
    var bar = function bar(name) {
        return "FAIL";
    };
    try {
        moo;
    } catch (e) {
        bar = function bar(name) {
            return "PASS";
        };
    }
    return bar;
}()());
