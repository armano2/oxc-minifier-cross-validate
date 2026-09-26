console.log(function() {
    for (arguments in [ 42 ]);
    for (var a in arguments[0])
        return "PASS";
}());
