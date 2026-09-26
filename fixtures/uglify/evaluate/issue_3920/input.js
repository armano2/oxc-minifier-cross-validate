var a = function(b) {
    return (b[b = 0] = 0) >= (b ? 0 : 1);
}("foo");
console.log(a);
