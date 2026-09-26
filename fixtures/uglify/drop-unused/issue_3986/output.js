var a = 0, b = 0;
(function() {
    try {
        throw 42;
    } catch (e) {
        a++;
    }
    b = b && 0;
})(b *= a);
console.log(b);
