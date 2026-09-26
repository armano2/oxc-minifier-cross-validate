for (var i = 0; i < 2; i++) (function() {
    while (console.log(i));
    (function(a) {
        console.log(a) && a,
        a++;
    })();
})();
