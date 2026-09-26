"use strict";
var a;
(function() {
    {
        const a = console.log("PASS");
    }
    try {} catch (e) {
        const a = console.log("FAIL");
    }
})();
