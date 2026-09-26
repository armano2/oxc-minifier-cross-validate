console.log(function(a) {
    do {
        var b, b_c = a++;
    } while (b_c && a);
    return a;
}(0));
