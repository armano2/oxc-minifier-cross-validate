"use strict";
try {
    (class extends 42 {});
} catch (e) {
    console.log("PASS");
}
