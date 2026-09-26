var a = "FAIL";
while (!console);
a++;
(function() {
    while (!console);
    a = "PASS";
})();
console.log(a);
