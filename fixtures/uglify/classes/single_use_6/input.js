"use strict";
class A {
    [(console.log("foo"), "f")]() {
        console.log("bar");
    }
}
console.log("baz");
new A().f();
