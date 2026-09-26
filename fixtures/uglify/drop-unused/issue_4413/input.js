console.log(function f(arguments) {
    var arguments = function() {};
    return arguments.length;
}());
