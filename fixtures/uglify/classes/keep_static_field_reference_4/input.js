"use strict";
var A = class {};
var B = class {
    static P = A;
};
console.log(B.P === B.P ? "PASS" : "FAIL");
