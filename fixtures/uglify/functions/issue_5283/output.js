var a = "FAIL 1";
(function() {
    a = "PASS";
    console || function(a) {
        console.log("FAIL 2");
        a.p;
    }();
})();
console.log(a);
