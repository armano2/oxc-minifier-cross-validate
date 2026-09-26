"use strict";
var a = 0;
(function() {
    var b = function f() {
        let c = a && f;
        c.var += 0;
    }();
    console.log(b);
})(1 && --a);
