"use strict";
try {
    class A extends {
        f() {
            return arguments;
        },
    }.f {}
} catch (e) {
    console.log("PASS");
}
