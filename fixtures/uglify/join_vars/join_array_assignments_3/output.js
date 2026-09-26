console.log(function () {
    var a = [ "foo", "bar" ];
    a.b = "baz";
    a[2] = "moo";
    return a;
}().join());
