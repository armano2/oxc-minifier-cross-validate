"use strict";
try {
    new class A {
        [(A, 42)]() {}
    }();
} catch (e) {
    console.log("PASS");
}
