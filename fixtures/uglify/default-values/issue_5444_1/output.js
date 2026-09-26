var a = 42;
var b = function({} = setImmediate(function() {
    console.log(a++);
})) {
    return this;
}();
console.log(typeof b);
