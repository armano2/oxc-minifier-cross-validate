console.log(function () {
    var a = [ "bar" ];
    a[1] = a;
    a[2] = "baz";
    return a;
}().join());
