var a = [ "FAIL", "PASS" ];
(function(b) {
    var c = b[0];
    b[0] = b[1];
    b[1] = c;
})(a);
console.log(a[0]);
