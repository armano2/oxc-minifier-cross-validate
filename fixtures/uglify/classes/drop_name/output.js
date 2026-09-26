"use strict";
try {
    console.log(class extends 42 {})
} catch (e) {
    console.log("PASS");
}
