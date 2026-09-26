"use strict";
(async function() {
    var a = await 42;
    class A {
        static P = a && console.log(typeof this);
    }
})();
