console.log(function () {
    var a = [ "foo", , "bar" ];
    a[1] = "baz";
    a[7] = "moo";
    a[0] = "moz";
    return a;
}().join());
