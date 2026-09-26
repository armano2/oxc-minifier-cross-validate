var a;
(function(b) {
    a[0] += 0;
    console.log(+b + 1 ? "FAIL" : "PASS");
})(a = []);
