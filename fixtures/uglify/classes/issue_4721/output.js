"use strict";
var a = "foo";
try {
    (class extends 42 {
        [a = "bar"]() {}
    });
} catch (e) {
    console.log(a);
}
