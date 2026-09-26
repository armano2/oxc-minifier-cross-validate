"use strict";
var A = class {};
var B = class {
    p = A;
};
console.log(new B().p === new B().p ? "PASS" : "FAIL");
