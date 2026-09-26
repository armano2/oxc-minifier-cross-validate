(function() {
    try {
        var b = function(c) {
            if (c)
                return FAIL;
            var d = 42;
        }(...[ null, A = 0 ]);
    } catch (e) {
        b();
    }
})();
console.log(A);
