(function() {
    try {
        var a = "FAIL";
        if (a)
            return;
        var b = 0;
    } finally {
        console.log(b);
    }
})();
