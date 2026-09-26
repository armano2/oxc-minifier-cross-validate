console.log(function() {
    if (console)
        var a = function(){}, b = (!1 === console || a)();
}());
