console.log(typeof function() {
    try {
        throw 42;
    } catch (e) {
        var o = e;
        for (e in o);
        function a() {}
        console.log(typeof a);
        return a;
    }
}());
