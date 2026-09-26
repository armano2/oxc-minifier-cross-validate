"use strict";
var o = {
    a: 1,
    b: 2,
    a: 3,
};
for (var k in o)
    console.log(k, o[k]);
