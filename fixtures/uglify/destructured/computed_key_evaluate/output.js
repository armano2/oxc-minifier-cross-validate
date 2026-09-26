var a = 0, {
    [1]: b,
} = [ "FAIL 1", 0 ? "FAIL 2" : "PASS" ];
console.log(b);
