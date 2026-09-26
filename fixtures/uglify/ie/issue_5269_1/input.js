"use strict";
do {
    (function() {
        try {
            throw "PASS";
        } catch (e) {
            console.log(e);
        }
    })();
} while (!console);
