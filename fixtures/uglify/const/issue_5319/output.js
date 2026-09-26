(function(a, c) {
    var b = a, c;
    {
        const a = c = b;
        console.log(c());
    }
})(function() {
    return "PASS";
});
