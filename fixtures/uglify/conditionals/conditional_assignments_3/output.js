console.log(function(a, b) {
    return a = "PASS", b && (a = a), a;
}(0, 1));
