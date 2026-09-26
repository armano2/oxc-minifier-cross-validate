function f(a) {
    var a = function() {};
    return [ arguments, a ];
}
console.log(typeof f()[1]);
