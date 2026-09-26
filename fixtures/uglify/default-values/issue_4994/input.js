var a = "FAIL";
(function(b = function() {
    for (a in { PASS: 42 });
}()) {
    var a;
})();
console.log(a);
