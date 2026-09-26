var a = 0;
(function([ b = a && console.log("PASS") ], c) {
    return c;
})([], a++);
