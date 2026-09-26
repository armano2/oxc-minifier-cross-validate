[
    42,
    null,
    false,
    void 0,
    "FAIL",
].forEach(function (a) {
    a ?? function() {
        while (console.log(a));
    }();
});
