(function() {
    try {
        throw 1;
    } catch (a) {
        try {
            const a = FAIL;
        } finally {
            if (!t)
                return console.log("aaaa");
        }
    }
    var t;
})();
