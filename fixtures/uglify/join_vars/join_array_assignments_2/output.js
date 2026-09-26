console.log(function () {
    var a = [ "foo", "bar" ];
    a[7] = "baz";
    a[2] = "moo";
    return a;
}().join());
