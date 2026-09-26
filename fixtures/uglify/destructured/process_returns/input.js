console.log(function({ length }) {
    return length ? "FAIL" : "PASS";
}(function() {
    return 42;
}));
