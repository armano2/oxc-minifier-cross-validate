console.log(function foo() {
    var bar = function bar(name) {
        return "PASS";
    };
    try {
        "moo";
    } catch (e) {
        bar = function bar(name) {
            return "FAIL";
        };
    }
    return bar;
}()());
