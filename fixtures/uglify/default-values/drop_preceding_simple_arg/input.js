var a = "foo";
console.log(function(b, c = "bar") {
    return b + c;
}(a, a));
