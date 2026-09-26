{
    const a = function() {
        return function() {};
    };
    var b = a();
}
b();
console.log(typeof a);
