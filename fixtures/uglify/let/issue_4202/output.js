"use strict";
{
    let o = {};
    function f() {
        o.p = 42;
    }
    f(f);
    console.log(o.p++);
}
