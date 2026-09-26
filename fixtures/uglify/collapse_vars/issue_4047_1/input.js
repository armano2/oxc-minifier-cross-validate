var b = 1;
console.log(+function(a) {
    b = a;
    (a >>= 0) && console.log("PASS");
}(--b + (0 !== typeof A)));
