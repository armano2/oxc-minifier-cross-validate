(function(a, b) {
    a = b = function() {};
    a.p = a;
    b = a = function() {};
    b.q = b;
})();
