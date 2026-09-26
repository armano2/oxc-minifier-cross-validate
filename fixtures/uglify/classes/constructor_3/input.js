"use strict";
console.log(new class {
    ["constructor"](a) {
        this.a = a;
    }
}("FAIL").a || "PASS");
