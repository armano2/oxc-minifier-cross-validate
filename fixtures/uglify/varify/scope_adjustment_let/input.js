"use strict";
for (var k in [ 42 ])
    console.log(function f() {
        if (k) {
            let a = 0;
        }
    }());
