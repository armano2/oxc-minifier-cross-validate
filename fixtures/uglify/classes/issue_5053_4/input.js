"use strict";
class A {
    constructor() {
        A = 42;
    }
}
try {
    console.log(new A());
} catch (e) {
    console.log("PASS");
}
