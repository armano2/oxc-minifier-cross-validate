var a = "foo";
(function() {
    var b = a;
    a ? (b++, a = b) : a = b;
})();
console.log(a);
