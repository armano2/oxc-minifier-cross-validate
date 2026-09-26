console.log(function(a) {
    a = 42, a = {
        p: [ a ] = [],
    };
    return "PASS";
}());
