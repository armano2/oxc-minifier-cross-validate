"use strict";
console.log(function() {
    var i = 1;
    while (i--) {
        var a = function f(b) {
            console.log(b);
            var c = function(d) {
                console.log(typeof d);
            }(console);
        }();
        var e = 42;
    }
    return e;
}());
