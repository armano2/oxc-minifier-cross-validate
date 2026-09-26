console.log(function(a) {
    var b = a;
    {
        const a = ++b;
    }
}());
