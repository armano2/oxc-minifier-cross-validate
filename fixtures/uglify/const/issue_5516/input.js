console.log(typeof function() {
    try {} catch (a) {
        (function f() {
            a;
        })();
    }
    {
        const a = function() {};
        return a;
    }
}());
