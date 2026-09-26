"use strict";
{
    let f = function() {
        return f && "PASS";
    }, a = f();
    a;
    console.log(a);
}
