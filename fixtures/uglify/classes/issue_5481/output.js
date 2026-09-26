"use strict";
var a = "FAIL 1", log = console.log;
try {
    a = "PASS";
    (class extends 42 {});
    log("FAIL 2", a);
} catch (e) {
    log(a);
}
