"use strict";
do {
    (function() {
        let a = console.log;
        a && a("foo");
    })();
} while (console.log("bar"));
