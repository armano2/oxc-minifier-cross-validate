"use strict";
var a;
{
    let a = function() {};
    var b = 0 * a;
}
console.log(typeof a, b);
