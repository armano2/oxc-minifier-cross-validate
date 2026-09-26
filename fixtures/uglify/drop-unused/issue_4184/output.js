(function() {
    var b = [ function() {}, 1 && b, {} ];
    try {
        throw 42;
    } catch (a) {
        console.log(a);
    }
})();
