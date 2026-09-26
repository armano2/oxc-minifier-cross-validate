"use strict";
function f(a) {
    var b = "foo";
    if (a) {
        while (console.log("bar"));
        console.log(b);
    } else {
        let b = "baz";
        while (console.log("moo"));
        console.log(b);
    }
}
f();
f(42);
