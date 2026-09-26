var f = function(a) {
    return /*@__PURE__*/ function(b) {
        console.log(b);
    }(a);
};
var a = f("PASS");
console.log(a);
