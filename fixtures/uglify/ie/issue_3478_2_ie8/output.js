"bbbbbbb";
var c = "FAIL";
(function f() {
    (function f() {
        var b = function n() {
            f && (c = "PASS");
        }();
    })();
})();
console.log(c);
