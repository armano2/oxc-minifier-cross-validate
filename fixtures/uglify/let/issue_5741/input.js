"use strict";
(function(a) {
    let b = function() {
        var c = a;
        console.log(c);
    }();
    function g() {
        a++;
        b;
    }
})("PASS");
