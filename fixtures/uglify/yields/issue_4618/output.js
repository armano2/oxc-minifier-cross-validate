console.log(typeof function() {
    var yield = function* f() {
        console || f();
    };
    console.log;
    return yield;
}());
