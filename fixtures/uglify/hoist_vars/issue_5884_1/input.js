try {
    var f = function() {
        var a = [ "PASS" ];
        for (b in a)
            console.log(a[b]);
    };
    f();
} finally {
    var b;
}
