(function(a, b) {
    if (b = a.shift())
        console.log("foo"),
        console.log(b);
    else {
        if (b = a.shift())
            while (console.log("bar"));
        console.log(b);
    }
})([ false, "baz" ]);
