console.log(function(n) {
    var c = 0;
    for (var k in [0, 1])
        if (c += 1, k == n) return c;
}(1));
