"use strict";
function A() {}
A.prototype.f = function() {
    if (this) {
        let a = "PA";
        [ "SS" ].forEach(function(c) {
            g(c);
        });
        function g(b) {
            h(a + b);
        }
    }
};
function h(d) {
    console.log(d);
}
new A().f();
