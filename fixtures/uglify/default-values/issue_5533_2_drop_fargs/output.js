"use strict";
try {
    (function() {
        for (;;) {
            var [ [ , ] = [] ] = [];
            throw "PASS";
        }
    })();
} catch (e) {
    console.log(e);
}
