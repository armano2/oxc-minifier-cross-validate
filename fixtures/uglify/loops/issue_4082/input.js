var a = "PASS";
(function(a) {
    for (a in "foo")
        var b;
})();
console.log(a);
