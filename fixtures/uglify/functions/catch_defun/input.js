try {
    throw 42;
} catch (a) {
    function f() {
        return typeof a;
    }
}
console.log(f());
