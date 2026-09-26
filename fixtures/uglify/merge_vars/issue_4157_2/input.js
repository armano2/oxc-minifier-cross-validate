(function() {
    try {
        throw "FAIL";
    } catch (e) {
        for (var a = e; a; a++)
            return;
        var b = 0;
    } finally {
        console.log(b);
    }
})();
