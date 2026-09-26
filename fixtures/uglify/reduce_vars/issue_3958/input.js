var a;
(function(b) {
    (function(c) {
        console.log(c[0] = 1);
    })(a = b);
    --a;
})([]);
console.log(a);
