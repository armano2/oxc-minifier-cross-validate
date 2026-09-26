console.log(function() {
    if (!console)
        var a = "FAIL 1";
    else
        return void (a && function() {
            while (console.log("FAIL 2"));
        }());
    throw "FAIL 3";
}());
