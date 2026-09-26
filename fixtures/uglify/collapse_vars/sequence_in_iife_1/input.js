var a = "foo", b = 42;
(function() {
    var c = (b = a, b);
})();
console.log(a, b);
