(function() {
    try {
        throw "FAIL";
    } catch (e) {
        var a = e;
        if (a)
            return;
        var b = 0;
    } finally {
        console.log(b);
    }
})();
