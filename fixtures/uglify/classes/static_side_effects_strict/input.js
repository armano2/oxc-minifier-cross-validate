"use strict";
var a = "FAIL 1";
class A {
    static p = a = "PASS";
    q = a = "FAIL 2";
}
console.log(a);
