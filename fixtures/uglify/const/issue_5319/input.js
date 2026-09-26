(function(a, c) {
    var b = a, c = b;
    {
        const a = c;
        console.log(c());
    }
})(function() {
    return "PASS";
});
