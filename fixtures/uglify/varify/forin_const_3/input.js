"use strict";
const o = {
    p: 42,
    q: "PASS",
};
for (const k in o)
    (function f() {
        console.log(k, o[k]);
    })();
