(function(n) {
    var o = function o() {
        console.log(this instanceof o);
    };
    new o(n);
})();
