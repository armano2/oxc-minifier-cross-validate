console.log(function*() {
    return function() {
        return yield => "PASS";
    }();
}().next().value());
