console.log(function() {
    return function() {
        if (console)
            console.log("PASS");
        else {
            var a = null;
            return "FAIL";
        }
    };
}()());
