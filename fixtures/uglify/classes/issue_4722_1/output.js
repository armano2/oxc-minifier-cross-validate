"use strict";
try {
    (class extends function*() {} {});
} catch (e) {
    console.log("PASS");
}
