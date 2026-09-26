"use strict";
var a = 0;
try {
    let b = function() {
        a = 1;
        b[1];
    }();
} catch (e) {
    console.log(a);
}
