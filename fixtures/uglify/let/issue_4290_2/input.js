"use strict";
try {
    console.log(function(a) {
        a = c;
        let c;
        return a;
    }());
} catch (e) {
    console.log("PASS");
}
