console.log(function(a) {
    return a && (a[0] = 0), "PASS";
}(42));
