"use strict";
(function(a, c) {
    var b = a, c = b;
    {
        let a = c;
        console.log(c());
    }
})(function() {
    return "PASS";
});
