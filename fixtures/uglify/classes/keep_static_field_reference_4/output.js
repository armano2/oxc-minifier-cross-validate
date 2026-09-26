"use strict";
var B = class {
    static P = class {};
};
console.log(B.P === B.P ? "PASS" : "FAIL");
