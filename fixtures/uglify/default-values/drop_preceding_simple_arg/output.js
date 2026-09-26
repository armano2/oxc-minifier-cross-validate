var a = "foo";
console.log(function(c = "bar") {
    return a + c;
}(a));
