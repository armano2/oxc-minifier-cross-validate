console.log(function(a) {
    return function(b) {
        return b && (b[0] = 0), "PASS";
    }(a);
}(42));
