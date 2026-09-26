"use strict";
let f = function() {
    console.log(a, b);
};
let a = "foo", b = 42;
f();
b = "bar";
f();
