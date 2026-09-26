(function(a) {
    (function(b) {
        b[0] += 0;
        console.log(+a);
    })(a);
})([]);
