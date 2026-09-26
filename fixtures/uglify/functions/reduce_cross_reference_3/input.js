(function(a, b) {
    a = b = function() {};
    a.p = b;
    b = a = function() {};
    b.q = a;
})();
