console.log(function() {
    return function() {
        var a;
        if (!console)
            return a = null, "FAIL";
        console.log("PASS");
    };
}()());
