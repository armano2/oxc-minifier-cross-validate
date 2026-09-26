"bbbbbbb";
var o = "FAIL";
(function b() {
    (function n() {
        var b = function b() {
            n && (o = "PASS");
        }();
    })();
})();
console.log(o);
