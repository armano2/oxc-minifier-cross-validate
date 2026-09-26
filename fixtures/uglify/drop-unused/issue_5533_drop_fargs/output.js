"use strict";
try {
    (function() {
        for (;;)
            throw "PASS";
    })();
} catch (e) {
    console.log(e);
}
