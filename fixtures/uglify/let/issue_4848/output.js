"use strict";
function f(a) {
    a(function() {
        console.log(b);
    });
    if (!console)
        return;
    let b = "PASS";
}
var g;
f(function(h) {
    g = h;
});
g();
