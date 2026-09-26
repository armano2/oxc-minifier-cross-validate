(function() {
    try {
        throw 42;
    } catch (NaN) {
        a = 0 / 0;
    }
})();
console.log(a, NaN, NaN);
