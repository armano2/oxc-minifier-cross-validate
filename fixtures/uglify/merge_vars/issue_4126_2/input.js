try {
    var a = function() {
        var b = 0;
        function f() {
            b;
        }
        THROW(b);
    }();
} catch (e) {
    console.log(a);
}
