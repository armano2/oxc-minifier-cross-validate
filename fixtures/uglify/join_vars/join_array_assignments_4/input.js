console.log(function () {
    var a = [ "foo" ];
    a[0] = "bar";
    a[1] = a;
    a[2] = "baz";
    return a;
}().join());
