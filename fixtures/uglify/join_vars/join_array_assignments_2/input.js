console.log(function () {
    var a = [ "foo" ];
    a[1] = "bar";
    a[7] = "baz";
    a[2] = "moo";
    return a;
}().join());
