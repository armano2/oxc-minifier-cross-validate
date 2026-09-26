log = function(a) {
    console.log(typeof a);
};
do {
    try {
        function f() {}
        log(f);
    } catch (e) {}
} while (0);
