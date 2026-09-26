console.log(function(a) {
    var b = a;
    b++;
    {
        const a = b;
    }
}());
