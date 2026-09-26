(function() {
    try {
        throw 1;
    } catch (a) {
        try {
            const a = FAIL;
        } finally {
            if (!b)
                return console.log("aaaa");
        }
    }
    var b;
})();
