"use strict";
class B {
    static P = class {};
}
console.log(B.P === B.P ? "PASS" : "FAIL");
