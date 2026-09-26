console.log(function() {
    return function() {
        return arguments[0];
    };
}().length);
