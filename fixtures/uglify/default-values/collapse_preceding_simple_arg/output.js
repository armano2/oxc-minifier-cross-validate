var a = "foo";
console.log(function(b, c = "bar") {
    return a + c;
}(0, a));
