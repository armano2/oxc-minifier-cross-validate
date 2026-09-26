"use strict";
var a = {};
a[42] = "FAIL";
a[a.PASS = 42] = "PASS";
console.log(a[42], a.PASS);
