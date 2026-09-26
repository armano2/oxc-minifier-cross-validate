console.log(typeof function() {
    arguments += 0;
    return arguments[0];
}());
