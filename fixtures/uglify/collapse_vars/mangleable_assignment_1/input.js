var o = {
    p: function() {
        return 6;
    },
};
(function() {
    var a, b = a = o.p();
    console.log(a * (b / a + b));
})();
