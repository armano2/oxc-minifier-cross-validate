"use strict";
try {
    console.log(new class A {
        constructor() {
            A = 42;
        }
    }());
} catch (e) {
    console.log("PASS");
}
