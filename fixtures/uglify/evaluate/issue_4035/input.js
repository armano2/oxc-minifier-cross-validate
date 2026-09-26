var a = 0;
(function() {
    var b = --a;
    console.log(delete (0 + b));
    console.log(delete (1 * b));
    console.log(delete (b + 0));
    console.log(delete (b - 0));
    console.log(delete (b / 1));
})();
