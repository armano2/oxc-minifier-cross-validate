var a = "foo";
(function() {
    var b = a;
    a = (a ? b++ : 0, b);
})();
console.log(a);
