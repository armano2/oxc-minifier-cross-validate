L: {
    var o = typeof console;
    for (var k in o)
        break L;
    var a = 0;
}
console.log(typeof a);
