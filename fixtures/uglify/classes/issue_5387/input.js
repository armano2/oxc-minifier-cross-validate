"use strict";
(function(a) {
    try {
        class A extends a {}
    } catch (e) {
        console.log("PASS");
    }
})({
    f() {
        return this;
    }
}.f);
