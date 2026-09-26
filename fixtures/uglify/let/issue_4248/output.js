var a = "FAIL";
try {
    (function() {
        "use strict";
        a = "PASS";
        b[a];
        let b;
    })();
} catch (e) {
    console.log(a);
}
