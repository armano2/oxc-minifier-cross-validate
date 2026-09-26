"use strict";
try {
    (class extends async function*() {} {});
} catch (e) {
    console.log("PASS");
}
