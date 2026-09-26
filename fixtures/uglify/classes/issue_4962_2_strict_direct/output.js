console.log(function f() {}(function g() {
    (class {
        static c = function() {
            "use strict";
            f;
        }();
    });
}));
