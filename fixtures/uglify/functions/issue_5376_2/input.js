"use strict";
var a;
for (;42;)
    var b = function() {
        var c;
        c++;
        throw new Error("PASS");
    }();
