var o = "PASS";
try {
    throw 0;
} catch (o) {
    // prints "FAIL" if inlined on Node.js v4-
    (function() {
        function f() {
            o = "FAIL";
        }
        f(), f();
    })();
}
console.log(o);
