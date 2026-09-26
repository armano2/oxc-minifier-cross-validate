"use strict";
(function() {
    f = function g(a) {
        a.p;
    }();
    f && f();
    {
        const a = 42;
        var b = false;
        var f;
    }
})();
