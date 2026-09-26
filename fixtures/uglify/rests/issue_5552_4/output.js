var a = [ "FAIL", "PASS" ];
console.log(function(b, ...{ [a.pop()]: c }) {
    return b;
}(a.pop()));
