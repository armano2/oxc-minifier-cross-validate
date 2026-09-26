"use strict";
var a = 0;
class A {
    [(a++, 0)]() {}
}
console.log(a);
