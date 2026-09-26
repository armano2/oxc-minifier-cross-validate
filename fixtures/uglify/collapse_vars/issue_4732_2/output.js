var a = 0;
(function(b) {
    (b = a++) && b && console.log("PASS");
})(a++);
