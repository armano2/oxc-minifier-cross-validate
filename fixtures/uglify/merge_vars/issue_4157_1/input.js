(function() {
    try {
        for (var a = "FAIL"; a; a++)
            return;
        var b = 0;
    } finally {
        console.log(b);
    }
})();
