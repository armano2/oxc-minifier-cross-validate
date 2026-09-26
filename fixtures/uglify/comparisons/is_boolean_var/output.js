console.log(function(a, b) {
    for (var i = 0, c = !b; i < a.length; i++)
        if (!a[i] == c)
            return i;
}([ false, true ], 42));
