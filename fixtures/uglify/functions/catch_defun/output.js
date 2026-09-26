try {
    throw 42;
} catch (o) {
    function t() {
        return typeof o;
    }
}
console.log(t());
