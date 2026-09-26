var a = 1;
try {
    throw 2;
} catch (a) {
    function g() {
        return a;
    }
}
console.log(g());
