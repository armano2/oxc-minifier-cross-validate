console.log(function() {
    var a;
    (f = a) && f();
    {
        const a = 42;
        var f;
    }
}());
