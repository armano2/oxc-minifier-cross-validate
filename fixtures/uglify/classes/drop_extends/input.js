"use strict";
try {
    (function() {
        var f = () => {};
        class A extends f {
            get p() {}
        }
        A.q = 42;
        return class B extends A {};
    })();
} catch (e) {
    console.log("PASS");
}
