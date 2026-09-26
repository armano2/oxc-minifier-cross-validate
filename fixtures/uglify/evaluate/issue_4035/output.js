var a = 0;
(function() {
    var b = --a;
    console.log((0 + b, true));
    console.log((1 * b, true));
    console.log((0 + b, true));
    console.log((b - 0, true));
    console.log((b / 1, true));
})();
