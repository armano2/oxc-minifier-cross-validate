(function(a, b) {
    a = b = function() {};
    b.p = b;
    b = a = function() {};
    a.q = a;
})();
