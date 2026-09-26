var o = {
    p: function() {
        return 6;
    },
};
(function() {
    var a;
    a = o.p();
    console.log(a * (a / a + a));
})();
