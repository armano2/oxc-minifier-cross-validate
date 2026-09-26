"use strict";
const a = null;
(function(b) {
    for (const a in null);
    for (const a in b)
        console.log("PASS");
})([ null ]);
