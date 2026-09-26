"bbbbbbb";
var c = "FAIL";
(function b() {
    (function n() {
        var b = function b() {
            n && (c = "PASS");
        }();
    })();
})();
console.log(c);
