!function() {
    console.log(arguments[0]);
    delete arguments[0];
    console.log(arguments[0]);
}(42);
