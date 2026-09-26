"use strict";
(function() {
    try {
        throw "PASS";
    } catch (e) {
        return function() {
            console.log(e);
            {
                const e = "FAIL 1";
            }
        }();
    } finally {
        const e = "FAIL 2";
    }
})();
