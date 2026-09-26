try {
    throw null;
} catch (a) {
    var a;
    (function() {
        for (a in "foo");
    })();
    console.log(a);
}
