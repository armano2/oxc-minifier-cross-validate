try {
    (function() {
        return function(a) {
            return function(b) {
                throw b;
            }(a);
        };
    })()("PASS");
} catch (e) {
    console.log(e);
}
