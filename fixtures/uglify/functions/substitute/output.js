var o = {};
function f(a) {
    return a === o ? "PASS" : "FAIL";
}
[
    function() {
        return f;
    },
    function() {
        return f;
    },
    function() {
        "use strict";
        return f;
    },
    function() {
        return f;
    },
    function() {
        return function(d, e) {
            return f(d, e);
        };
    },
].forEach(function(g) {
    console.log(g()(o), g().call(o, o), g().length);
});
