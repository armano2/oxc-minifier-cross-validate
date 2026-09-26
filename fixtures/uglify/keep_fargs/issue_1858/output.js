console.log(function() {
    var a = {}, b = a.b = 1;
    return a.b + b;
}());
