var o = {
    p: function() {
        return 6;
    },
};
(function(a, b) {
    b = a = o.p();
    console.log(a * (b / a + b));
})();
