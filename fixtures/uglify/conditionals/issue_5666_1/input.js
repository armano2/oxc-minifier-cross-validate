var a;
(function() {
    var b = a;
    a ? a = b : (b++, a = b);
})();
console.log(a);
