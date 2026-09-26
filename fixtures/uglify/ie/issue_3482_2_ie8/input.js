(function() {
    try {
        throw 42;
    } catch (NaN) {
        a = +"a";
    }
})();
console.log(a, NaN, 0 / 0);
