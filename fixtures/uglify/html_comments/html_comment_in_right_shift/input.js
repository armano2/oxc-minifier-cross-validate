(function(a, b, c) {
    console.log(
        a-- >> b,
        a-- >> b + c,
        a + b-- >> c,
        a, b, c
    );
})(1, 2, 3);
