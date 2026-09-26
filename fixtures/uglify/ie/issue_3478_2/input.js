"bbbbbbb";
var c = "FAIL";
(function f() {
    (function f() {
        var b = function g() {
            f && (c = "PASS");
        }();
    })();
})();
console.log(c);
