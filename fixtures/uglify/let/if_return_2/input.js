"use strict";
function f(a) {
    function g() {
        return b = "FAIL";
    }
    if (a)
        return g();
    let b;
    return g();
};
try {
    console.log(f(42));
} catch (e) {
    console.log("PASS");
}
