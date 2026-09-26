var a;
(function() {
    var b = a;
    a = (a ? 0 : b++, b);
})();
console.log(a);
