A = console;
(function() {
    if ("undefined" == typeof A)
        return;
    var a = A, i = 2;
    do {
        console.log(void 0 === A, void 0 === a);
        A = void 0;
    } while (--i);
})();
