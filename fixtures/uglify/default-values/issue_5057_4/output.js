(function(a) {
    var b = "FAIL 2";
    (function(a = console.log("FAIL 1")) {})(b);
    console.log(a);
})("PASS");
