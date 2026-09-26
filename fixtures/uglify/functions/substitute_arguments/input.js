var o = {};
function f(a) {
    return arguments[0] === o ? "PASS" : "FAIL";
}
[
    function() {
        return f;
    },
    function() {
        return function(b) {
            return f(b);
        };
    },
    function() {
        "use strict";
        return function(c) {
            return f(c);
        };
    },
    function() {
        return function(c) {
            "use strict";
            return f(c);
        };
    },
    function() {
        return function(d, e) {
            return f(d, e);
        };
    },
].forEach(function(g) {
    console.log(g()(o), g().call(o, o), g().length);
});
