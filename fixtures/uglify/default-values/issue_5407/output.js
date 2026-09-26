(function(a) {
    for (var i = 0; i < 2; i++)
        (function(b = 4) {
            console.log(b);
            a = 2;
        })(a);
})();
