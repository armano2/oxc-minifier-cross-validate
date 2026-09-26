var c = "FAIL";
(function() {
    var a = 1;
    if (function(a) {
        a && a();
    }(), a) c = "PASS";
})(),
console.log(c);
