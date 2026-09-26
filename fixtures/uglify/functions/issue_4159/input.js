var a = 42, c = function(b) {
    (b = a) && console.log(a++, b);
}(c = a);
