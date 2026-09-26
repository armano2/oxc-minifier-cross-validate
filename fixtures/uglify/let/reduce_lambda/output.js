"use strict";
function f() {
    console.log("foo", b);
}
let b = 42;
f();
b = "bar";
f();
