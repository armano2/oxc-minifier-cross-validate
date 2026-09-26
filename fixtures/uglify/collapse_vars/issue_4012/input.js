(function(a) {
    try {
        throw 2;
    } catch (b) {
        a = "PASS";
        if (--b)
            return;
        if (3);
    } finally {
        console.log(a);
    }
})();
