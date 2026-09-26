A = console;
(function() {
    if ("undefined" != typeof A) {
        var a = A, i = 2;
        do {
            console.log(void 0 === A, (a, false));
            A = void 0;
        } while (--i);
    }
})();
