(function(f) {
    f();
})(function() {
    return (function(t) {
        return function() {
            t();
        };
    })(function() {
        'use strict';
        function e() {
            return arguments[0];
        }
        e();
        e();
    })();
});
