for (var i = "foo", a = new Array(i, "bar"), i = 2; --i >= 0;) {
    console.log(a[i]);
    for (var a in i);
}
