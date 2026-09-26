var o = {
    p: function() {
        return 6;
    },
};
(function(a, b) {
    a = o.p();
    console.log(a * (a / a + a));
})();
