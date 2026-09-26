var a = "PASS";
(function() {
    var b;
    var c = function() {
        a = "FAIL";
    };
    a ? b |= c : b.p;
})();
console.log(a);
