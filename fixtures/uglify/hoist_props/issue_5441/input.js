console.log(function(a) {
    (function() {
        a = { p: this };
    })();
    return typeof a;
}());
