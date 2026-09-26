try {
    console.log(function() {
        var a, b = console;
        return {
            [a = b]: a.p,
        } = "foo";
    }());
} catch (e) {
    console.log("bar");
}
