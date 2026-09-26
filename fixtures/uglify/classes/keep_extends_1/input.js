"use strict";
try {
    class A extends 42 {}
} catch (e) {
    console.log("PASS");
}
