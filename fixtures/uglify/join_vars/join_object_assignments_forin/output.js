console.log(function() {
    var o = { a: "PASS" }, a;
    for (a in o)
        return o[a];
}());
