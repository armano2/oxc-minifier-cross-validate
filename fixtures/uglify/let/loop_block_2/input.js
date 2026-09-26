"use strict";
do {
    let o = {};
    (function() {
        console.log(typeof this, o.p++);
    })();
} while (!console);
