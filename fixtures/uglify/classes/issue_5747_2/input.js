"use strict";
(async function() {
    var a = await 42;
    class A {
        static {
            a && console.log(typeof this);
        }
    }
})();
