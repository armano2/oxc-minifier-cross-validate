try {
    throw 42;
} catch (NaN) {
    var a = +"a";
}
console.log(a, NaN, 0 / 0);
