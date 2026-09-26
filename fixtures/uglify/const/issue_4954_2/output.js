"use strict";
const a = null;
(function(o) {
    for (const n in null);
    for (const n in o)
        console.log("PASS");
})([ null ]);
