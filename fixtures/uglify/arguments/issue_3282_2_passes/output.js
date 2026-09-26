(function() {
    (function() {
        return function(t) {
            return function() {
                t();
            };
        }(function() {
            "use strict";
            function e(argument_0) {
                return argument_0;
            }
            e();
            e();
        })();
    })();
})();
