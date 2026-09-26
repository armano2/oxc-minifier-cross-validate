(function() {
    try {
        throw 42;
    } catch (e) {
        const a = typeof e;
        console.log(a);
    } finally {
        return a = "foo";
    }
})();
console.log(typeof a);
