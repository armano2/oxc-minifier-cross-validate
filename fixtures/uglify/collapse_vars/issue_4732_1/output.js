var a = 0;
(function(b) {
    (b = a++) && console.log("PASS");
})(a++);
