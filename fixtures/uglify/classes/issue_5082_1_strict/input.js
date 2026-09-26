"use strict";
(function() {
    class A {
        p = console.log("PASS");
        q() {}
    }
    class B {
        static P = new A();
    }
})();
