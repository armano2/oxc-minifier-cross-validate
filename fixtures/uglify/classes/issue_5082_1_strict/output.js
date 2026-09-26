"use strict";
(function() {
    class A {
        p = console.log("PASS");
        q() {}
    }
    new A();
})();
