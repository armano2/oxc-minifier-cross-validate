console.log(function f() {
    var a;
    for (console in a = [ f ]) {
        const b = a;
    }
}());
