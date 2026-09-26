console.log(function(a) {
    do {
        var b = a++;
        if (b)
            return "FAIL";
        continue;
        var c = 42;
    } while ("undefined" != typeof c);
    return "PASS";
}(0));
