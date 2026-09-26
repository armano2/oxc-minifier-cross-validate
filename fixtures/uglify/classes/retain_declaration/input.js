"use strict";
var a = "FAIL";
try {
    console.log(function() {
        return a;
        class a {}
    }());
} catch (e) {
    console.log("PASS");
}
