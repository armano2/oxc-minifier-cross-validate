"use strict";
var a = "FAIL";
(() => (() => {
    a = "PASS";
})())();
console.log(a);
