console.log(function f() {
    var a = "bar";
    for ((a, f)[a] in console.log("foo"));
    return a;
}());
