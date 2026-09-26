"use strict";
var a = "FAIL";
(class {
    static {
        a = "PASS";
    }
});
console.log(a);
