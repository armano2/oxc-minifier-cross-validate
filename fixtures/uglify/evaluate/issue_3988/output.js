var a = function(b) {
    return ("" + (b &= 0))[b && this];
}();
console.log(a);
