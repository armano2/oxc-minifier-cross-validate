"use strict";
console.log(function() {
    return this;
}() ? "FAIL" : "PASS");
