"use strict";
{
    let f = function() {
        return f && "PASS";
    };
    var a = f();
}
a;
console.log(a);
