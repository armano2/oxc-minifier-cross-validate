"use strict";
(function(a, c) {
    var b = a, c;
    {
        let a = c = b;
        console.log(c());
    }
})(function() {
    return "PASS";
});
