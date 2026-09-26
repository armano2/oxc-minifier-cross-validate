try {
    throw 42;
} catch (NaN) {
    var a = 0 / 0;
}
console.log(a, NaN, NaN);
