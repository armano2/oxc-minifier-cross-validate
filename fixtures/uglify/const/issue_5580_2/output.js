"use strict";
(function() {
    try {
        throw "PASS";
    } catch (e) {
        console.log(e);
        {
            const e = "FAIL 1";
        }
        return;
    } finally {
        var e = "FAIL 2";
    }
})();
