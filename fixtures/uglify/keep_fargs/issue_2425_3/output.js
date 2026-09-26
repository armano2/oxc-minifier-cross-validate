var a = 8;
(function() {
    (a |= 10).toString();
})(--a);
console.log(a);
