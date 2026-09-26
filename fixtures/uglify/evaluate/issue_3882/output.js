var b = function(a) {
    return console.log(a++), a && this;
}();
console.log(b);
