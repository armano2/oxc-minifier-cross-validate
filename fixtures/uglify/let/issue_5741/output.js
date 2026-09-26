"use strict";
(function(a) {
    let b = (c = a, void console.log(c));
    var c;
    function g() {
        a++;
        b;
    }
})("PASS");
