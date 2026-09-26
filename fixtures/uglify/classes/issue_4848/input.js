"use strict";
function f(a) {
    a(function() {
        new A();
    });
    if (!console)
        return;
    class A {
        constructor() {
            console.log("PASS");
        }
    }
}
var g;
f(function(h) {
    g = h;
});
g();
