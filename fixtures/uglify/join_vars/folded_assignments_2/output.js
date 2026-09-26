"use strict";
var a = {
    42: "FAIL",
    PASS: 42,
};
a[42] = "PASS";
console.log(a[42], a.PASS);
