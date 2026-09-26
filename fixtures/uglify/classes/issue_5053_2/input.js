"use strict";
try {
    console.log(new class A {
        f() {
            A = 42;
        }
    }().f());
} catch (e) {
    console.log("PASS");
}
