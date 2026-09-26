var a = [ "FAIL", "PASS" ];
console.log(function(b, ...[ c = a.pop() ]) {
    return b;
}(a.pop()));
