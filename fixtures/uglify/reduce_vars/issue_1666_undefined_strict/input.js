"use strict";
var undefined = 42;
{
    undefined();
    function undefined() {
        console.log("foo");
    }
}
console.log(typeof undefined);
