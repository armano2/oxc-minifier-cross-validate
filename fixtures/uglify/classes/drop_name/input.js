"use strict";
try {
    console.log(class A extends 42 {})
} catch (e) {
    console.log("PASS");
}
