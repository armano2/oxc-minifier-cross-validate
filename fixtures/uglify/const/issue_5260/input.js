"use strict";
var a = "foo", o;
while (console.log("bar"));
o = {
    baz: function(b) {
        console.log(a, b);
    },
};
for (const a in o)
    o[a](a);
