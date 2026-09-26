var a = 0, b;
[ ...{
    [a++]: b,
} ] = [ "PASS" ];
console.log(b);
