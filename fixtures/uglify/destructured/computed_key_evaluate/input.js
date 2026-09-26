var a = 0, {
    [++a]: b,
} = [ "FAIL 1", a ? "FAIL 2" : "PASS" ];
console.log(b);
