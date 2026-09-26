(function(a) {
    function f(b) {
        console.log(b);
        a = 1;
    }
    var c = f(c += 0);
    (function(d) {
        console.log(d);
    })(console.log(a) ^ 1, c);
})();
