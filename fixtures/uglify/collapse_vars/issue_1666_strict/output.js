"use strict";
var x = 42;
{
    x();
    function x() {
        console.log("foo");
    }
}
console.log(typeof x);
