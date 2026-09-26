try {
    throw 42;
} catch (NaN) {
    var a = +"a";
}
// IE8: NaN 42 NaN
console.log(a, NaN, 0 / 0);
