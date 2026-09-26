console.log(function arguments(...a) {
    return arguments;
    try {} catch (e) {
        var arguments;
    }
}());
