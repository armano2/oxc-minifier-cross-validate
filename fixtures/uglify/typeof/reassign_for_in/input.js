(A = console) && "undefined" != typeof A && function(a) {
    for (var k in [ a = A, 42 ]) {
        console.log(void 0 === A, void 0 === a);
        A = void 0;
    }
}();
