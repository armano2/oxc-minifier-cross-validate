console.log(function() {
    if (!console)
        var a = "FAIL 1";
    else if (a) {
        while (console.log("FAIL 2"));
        return;
    } else
        return void 0;
    throw "FAIL 3";
}());
