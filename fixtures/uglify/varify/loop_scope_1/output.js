"use strict";
var o = { foo: 1, bar: 2 };
for (var i in o)
    console.log(i);
for (const j in o)
    setTimeout(() => console.log(j), 0);
for (let k in o)
    setTimeout(function() {
        console.log(k);
    }, 0);
