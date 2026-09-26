"use strict";
var A = class {
    static P = function() {};
};
console.log(A.P === A.P ? "PASS" : "FAIL");
