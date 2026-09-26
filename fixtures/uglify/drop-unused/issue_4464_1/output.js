function f(a) {
    a = function() {};
    return [ arguments, a ];
}
console.log(typeof f()[1]);
