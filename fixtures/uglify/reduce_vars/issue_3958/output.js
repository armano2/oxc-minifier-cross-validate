var a;
(function(b) {
    (function(c) {
        console.log(c[0] = 1);
    })(a = []);
    --a;
})();
console.log(a);
