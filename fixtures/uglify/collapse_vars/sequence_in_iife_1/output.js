var a = "foo", b = 42;
(function() {
    var c = b = a;
})();
console.log(a, b);
