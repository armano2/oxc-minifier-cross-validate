(function() {
    try {
        console;
    } finally {
        var b = a;
    }
    for (var a in "foo");
    console.log(b);
})();
