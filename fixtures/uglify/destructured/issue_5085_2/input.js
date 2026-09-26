var a = "PASS";
(function(b) {
    [ b ] = [ 42, a ];
    var c = b ? 0 : a = "FAIL";
})();
console.log(a);
