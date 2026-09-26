"use strict";
class A {
    static foo() {}
}
var a = "foo" in A;
console.log(a);
