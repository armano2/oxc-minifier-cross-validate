var a = "FAIL";
(function() {
    for (a in { PASS: 0 });
})()
console.log(a);
