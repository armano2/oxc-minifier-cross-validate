var b;
try {
    (function() {
        var a = [ "PASS" ];
        for (b in a)
            console.log(a[b]);
    })();
} finally {}
