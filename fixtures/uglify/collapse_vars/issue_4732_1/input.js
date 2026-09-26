var a = 0;
(function(b) {
    var b = a++;
    var c = b ? b && console.log("PASS") : 0;
})(a++);
