var b = "FAIL", c = 1;
do {
    a && a();
    var a = function() {
        b = "PASS";
    };
} while (c--);
console.log(b);
