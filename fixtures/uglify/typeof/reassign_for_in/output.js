(A = console) && "undefined" != typeof A && function(a) {
    for (var k in [ a = A, 42 ]) {
        console.log(void 0 === A, (a, false));
        A = void 0;
    }
}();
