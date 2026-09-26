"use strict";
(function(a) {
    let i = 1;
    function f() {
        i = 0;
    }
    for (let i = 0, x = 0; i < a.length; i++, x++) {
        if (x != i) {
            console.log("FAIL");
            break;
        }
        f();
        console.log(a[i]);
    }
    console.log(i);
})([ 4, 2 ]);
