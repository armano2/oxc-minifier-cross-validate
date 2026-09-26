"use strict";
let o = {
    p: 42,
    q: "PASS",
};
for (let k in o)
    (function f() {
        console.log(k, o[k]);
    })();
