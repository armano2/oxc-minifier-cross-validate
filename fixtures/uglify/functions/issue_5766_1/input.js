log = function(a) {
    console.log(typeof a);
};
do {
    (function() {
        try {
            var f = function() {};
            log(f && f);
        } catch (e) {}
    })();
} while (0);
