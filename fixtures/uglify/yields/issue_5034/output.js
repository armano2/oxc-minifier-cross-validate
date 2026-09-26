console.log(function() {
    var yield = function f() {
        return function*() {
            return f;
        };
    };
    return yield()().next().value === yield;
}() ? "PASS" : "FAIL");
