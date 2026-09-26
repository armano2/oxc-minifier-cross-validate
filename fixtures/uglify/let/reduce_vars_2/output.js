"use strict";
(function() {
    function f() {
        console.log(typeof a);
    }
    for (let a in [ 42 ])
        f();
})();
