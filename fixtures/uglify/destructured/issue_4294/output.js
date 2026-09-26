A = "PASS";
(function() {
    var a = function({
        [a]: {},
    }) {}({
        [a]: 0,
    });
    var b = A;
    console.log(b);
})();
