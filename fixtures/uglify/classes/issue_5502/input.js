"use strict";
var a = "FAIL";
class A {
    static p = a;
    [a = "PASS"];
}
try {
    b++;
} finally {
    var a, b = 42;
}
console.log(a, b);
