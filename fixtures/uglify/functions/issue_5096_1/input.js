var a, b = "FAIL", c = 1;
do {
    a && a();
    a = function() {
        b = "PASS";
    };
} while (c--);
console.log(b);
