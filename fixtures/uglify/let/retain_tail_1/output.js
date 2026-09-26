"use strict";
function f(a) {
    var b = "foo";
    if (a) {
        let b = "bar";
        while (console.log("baz"));
        console.log(b);
    } else {
        while (console.log("moo"));
        console.log(b);
    }
}
f();
f(42);
